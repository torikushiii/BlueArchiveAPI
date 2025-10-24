package api

import (
	"context"
	"log"
	"net/http"
	"sort"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"

	"go-archive/internal/http/respond"
)

const queryTimeout = 5 * time.Second

// RaidSeason mirrors the MongoDB raid document structure.
type RaidSeason struct {
	ID       int    `bson:"id" json:"id"`
	Boss     string `bson:"boss" json:"boss"`
	StartAt  int64  `bson:"startAt" json:"startAt"`
	EndAt    int64  `bson:"endAt" json:"endAt"`
	SettleAt int64  `bson:"settleAt,omitempty" json:"settleAt,omitempty"`
}

// RaidResponse groups raid seasons by lifecycle.
type RaidResponse struct {
	Current  []RaidSeason `json:"current"`
	Upcoming []RaidSeason `json:"upcoming"`
	Ended    []RaidSeason `json:"ended"`
}

// NewRaidHandler returns an HTTP handler backed by MongoDB raid collections.
func NewRaidHandler(client *mongo.Client, database string) http.HandlerFunc {
	if client == nil {
		return func(w http.ResponseWriter, _ *http.Request) {
			respond.Error(w, http.StatusInternalServerError, "database client not configured")
		}
	}

	empty := RaidResponse{
		Current:  []RaidSeason{},
		Upcoming: []RaidSeason{},
		Ended:    []RaidSeason{},
	}

	collectionByRegion := map[string]string{
		"global": "global.RaidData",
		"japan":  "japan.RaidData",
	}

	return func(w http.ResponseWriter, r *http.Request) {
		region := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("region")))
		if region == "" {
			region = "global"
		}
		collectionName, ok := collectionByRegion[region]
		if !ok {
			respond.Error(w, http.StatusBadRequest, "invalid region; use global or japan")
			return
		}

		ctx, cancel := context.WithTimeout(r.Context(), queryTimeout)
		defer cancel()

		collection := client.Database(database).Collection(collectionName)
		cursor, err := collection.Find(ctx, bson.M{})
		if err != nil {
			log.Printf("raid find error (%s): %v", region, err)
			respond.Error(w, http.StatusInternalServerError, "failed to load raid data")
			return
		}
		defer cursor.Close(ctx)

		var records []RaidSeason
		if err := cursor.All(ctx, &records); err != nil {
			log.Printf("raid decode error (%s): %v", region, err)
			respond.Error(w, http.StatusInternalServerError, "failed to decode raid data")
			return
		}

		if len(records) == 0 {
			respond.JSON(w, http.StatusOK, empty)
			return
		}

		now := time.Now().UnixMilli()
		response := RaidResponse{
			Current:  make([]RaidSeason, 0),
			Upcoming: make([]RaidSeason, 0),
			Ended:    make([]RaidSeason, 0),
		}

		for _, raid := range records {
			switch {
			case raid.StartAt <= now && raid.EndAt >= now:
				response.Current = append(response.Current, raid)
			case raid.StartAt > now:
				response.Upcoming = append(response.Upcoming, raid)
			default:
				response.Ended = append(response.Ended, raid)
			}
		}

		sort.Slice(response.Current, func(i, j int) bool {
			return response.Current[i].StartAt < response.Current[j].StartAt
		})
		sort.Slice(response.Upcoming, func(i, j int) bool {
			return response.Upcoming[i].StartAt < response.Upcoming[j].StartAt
		})
		sort.Slice(response.Ended, func(i, j int) bool {
			return response.Ended[i].StartAt > response.Ended[j].StartAt
		})

		respond.JSON(w, http.StatusOK, response)
	}
}
