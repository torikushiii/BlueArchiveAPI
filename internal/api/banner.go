package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"go-archive/internal/http/respond"
)

const bannerQueryTimeout = 5 * time.Second

type bannerDocument struct {
	ID        int64   `bson:"id"`
	Type      string  `bson:"type"`
	StartAt   int64   `bson:"startAt"`
	EndAt     int64   `bson:"endAt"`
	RateupIDs []int64 `bson:"rateup"`
}

// Banner represents the public gacha payload.
type Banner struct {
	ID        int64    `json:"id"`
	GachaType string   `json:"gachaType"`
	StartedAt int64    `json:"startedAt"`
	EndedAt   int64    `json:"endedAt"`
	RateUps   []string `json:"rateups"`
}

// BannerResponse groups banners by lifecycle.
type BannerResponse struct {
	Current  []Banner `json:"current"`
	Upcoming []Banner `json:"upcoming"`
	Ended    []Banner `json:"ended"`
}

// NewBannerHandler returns an HTTP handler backed by MongoDB gacha collections.
func NewBannerHandler(client *mongo.Client, database string) http.HandlerFunc {
	if client == nil {
		return func(w http.ResponseWriter, _ *http.Request) {
			respond.Error(w, http.StatusInternalServerError, "database client not configured")
		}
	}

	empty := BannerResponse{
		Current:  []Banner{},
		Upcoming: []Banner{},
		Ended:    []Banner{},
	}

	return func(w http.ResponseWriter, r *http.Request) {
		region := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("region")))
		if region == "" {
			region = "global"
		}
		if region != "global" && region != "japan" {
			respond.Error(w, http.StatusBadRequest, "invalid region; use global or japan")
			return
		}

		ctx, cancel := context.WithTimeout(r.Context(), bannerQueryTimeout)
		defer cancel()

		collection := client.Database(database).Collection(fmt.Sprintf("%s.GachaData", region))
		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			log.Printf("banner find error (%s): %v", region, err)
			respond.Error(w, http.StatusInternalServerError, "failed to load banner data")
			return
		}
		defer cursor.Close(ctx)

		var documents []bannerDocument
		if decodeErr := cursor.All(ctx, &documents); decodeErr != nil {
			log.Printf("banner decode error (%s): %v", region, decodeErr)
			respond.Error(w, http.StatusInternalServerError, "failed to decode banner data")
			return
		}

		if len(documents) == 0 {
			respond.JSON(w, http.StatusOK, empty)
			return
		}

		names, err := resolveRateupNames(ctx, client.Database(database), region, documents)
		if err != nil {
			log.Printf("banner rateup resolution error (%s): %v", region, err)
			respond.Error(w, http.StatusInternalServerError, "failed to resolve rateup names")
			return
		}

		now := time.Now().UnixMilli()
		response := BannerResponse{
			Current:  make([]Banner, 0),
			Upcoming: make([]Banner, 0),
			Ended:    make([]Banner, 0),
		}

		for _, doc := range documents {
			banner := Banner{
				ID:        doc.ID,
				GachaType: doc.Type,
				StartedAt: doc.StartAt,
				EndedAt:   doc.EndAt,
				RateUps:   make([]string, 0, len(doc.RateupIDs)),
			}

			for _, rateupID := range doc.RateupIDs {
				if name, ok := names[rateupID]; ok {
					banner.RateUps = append(banner.RateUps, name)
				}
			}

			switch {
			case banner.StartedAt <= now && banner.EndedAt >= now:
				response.Current = append(response.Current, banner)
			case banner.StartedAt > now:
				response.Upcoming = append(response.Upcoming, banner)
			default:
				response.Ended = append(response.Ended, banner)
			}
		}

		sort.Slice(response.Current, func(i, j int) bool {
			return response.Current[i].StartedAt < response.Current[j].StartedAt
		})
		sort.Slice(response.Upcoming, func(i, j int) bool {
			return response.Upcoming[i].StartedAt < response.Upcoming[j].StartedAt
		})
		sort.Slice(response.Ended, func(i, j int) bool {
			return response.Ended[i].StartedAt > response.Ended[j].StartedAt
		})

		respond.JSON(w, http.StatusOK, response)
	}
}

func resolveRateupNames(ctx context.Context, db *mongo.Database, region string, docs []bannerDocument) (map[int64]string, error) {
	idSet := make(map[int64]struct{})
	for _, doc := range docs {
		for _, id := range doc.RateupIDs {
			idSet[id] = struct{}{}
		}
	}

	if len(idSet) == 0 {
		return map[int64]string{}, nil
	}

	ids := make([]int64, 0, len(idSet))
	for id := range idSet {
		ids = append(ids, id)
	}

	charCollection := db.Collection(fmt.Sprintf("%s.CharacterData", region))
	charCursor, err := charCollection.Find(ctx, bson.M{"id": bson.M{"$in": ids}})
	if err != nil {
		return nil, err
	}
	defer charCursor.Close(ctx)

	type characterDoc struct {
		ID            int64 `bson:"id"`
		LocalizeEtcID int64 `bson:"localizeEtcId"`
	}

	characters := make([]characterDoc, 0, len(ids))
	localizeIDsSet := make(map[int64]struct{})
	for charCursor.Next(ctx) {
		var doc characterDoc
		if decodeErr := charCursor.Decode(&doc); decodeErr != nil {
			return nil, decodeErr
		}
		characters = append(characters, doc)
		localizeIDsSet[doc.LocalizeEtcID] = struct{}{}
	}

	if cursorErr := charCursor.Err(); cursorErr != nil {
		return nil, cursorErr
	}

	if len(characters) == 0 {
		return map[int64]string{}, nil
	}

	localizeIDs := make([]int64, 0, len(localizeIDsSet))
	for id := range localizeIDsSet {
		localizeIDs = append(localizeIDs, id)
	}

	localizeCollection := db.Collection(fmt.Sprintf("%s.LocalizeEtc", region))
	locCursor, err := localizeCollection.Find(ctx, bson.M{"key": bson.M{"$in": localizeIDs}})
	if err != nil {
		return nil, err
	}
	defer locCursor.Close(ctx)

	type localizeDoc struct {
		Key  int64  `bson:"key"`
		Name string `bson:"name"`
	}

	localizeMap := make(map[int64]string, len(localizeIDs))
	for locCursor.Next(ctx) {
		var doc localizeDoc
		if decodeErr := locCursor.Decode(&doc); decodeErr != nil {
			return nil, decodeErr
		}
		localizeMap[doc.Key] = doc.Name
	}

	if cursorErr := locCursor.Err(); cursorErr != nil {
		return nil, cursorErr
	}

	result := make(map[int64]string, len(characters))
	for _, character := range characters {
		if name, ok := localizeMap[character.LocalizeEtcID]; ok {
			result[character.ID] = name
		}
	}

	return result, nil
}
