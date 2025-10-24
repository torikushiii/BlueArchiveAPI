package character

import (
	"context"
	"errors"
	"fmt"
	"strconv"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// Store provides Mongo-backed access to character collections.
type Store struct {
	db *mongo.Database
}

// New creates a character store for the given database name.
func New(client *mongo.Client, database string) *Store {
	return &Store{db: client.Database(database)}
}

// DataDoc represents the core character document.
type DataDoc struct {
	ID              int64       `bson:"id"`
	LocalizeEtcID   int64       `bson:"localizeEtcId"`
	Released        bool        `bson:"released"`
	Playable        bool        `bson:"playable"`
	BaseStar        interface{} `bson:"baseStar"`
	Rarity          interface{} `bson:"rarity"`
	Position        string      `bson:"position"`
	Role            string      `bson:"role"`
	ArmorType       string      `bson:"armorType"`
	BulletType      string      `bson:"bulletType"`
	WeaponType      string      `bson:"weaponType"`
	SquadType       string      `bson:"squadType"`
	School          string      `bson:"school"`
	Club            string      `bson:"club"`
	ImageIdentifier string      `bson:"imageIdentifier"`
}

// LocalizationDoc captures character localization metadata.
type LocalizationDoc struct {
	ID           int64       `bson:"id"`
	FullName     interface{} `bson:"fullName"`
	Introduction interface{} `bson:"introduction"`
	Age          interface{} `bson:"age"`
	BirthDate    interface{} `bson:"birthDate"`
	Height       interface{} `bson:"height"`
	ArtistName   interface{} `bson:"artistName"`
	SchoolYear   interface{} `bson:"schoolYear"`
	VoiceActor   interface{} `bson:"voiceActor"`
}

// StatDoc holds character terrain moods.
type StatDoc struct {
	ID          int64       `bson:"id"`
	StreetMood  interface{} `bson:"streetMood"`
	OutdoorMood interface{} `bson:"outdoorMood"`
	IndoorMood  interface{} `bson:"indoorMood"`
}

// ListData returns all playable + released characters for the region.
func (s *Store) ListData(ctx context.Context, region string) ([]DataDoc, error) {
	filter := bson.M{
		"playable": true,
		"released": true,
	}

	opts := options.Find().SetProjection(bson.M{
		"id":              1,
		"localizeEtcId":   1,
		"released":        1,
		"playable":        1,
		"baseStar":        1,
		"rarity":          1,
		"position":        1,
		"role":            1,
		"armorType":       1,
		"bulletType":      1,
		"weaponType":      1,
		"squadType":       1,
		"school":          1,
		"club":            1,
		"imageIdentifier": 1,
	})

	cursor, err := s.collection(region, "CharacterData").Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	var docs []DataDoc
	if err := cursor.All(ctx, &docs); err != nil {
		return nil, err
	}

	return docs, nil
}

// GetDataByID returns a single character data document.
func (s *Store) GetDataByID(ctx context.Context, region string, id int64) (*DataDoc, error) {
	filter := bson.M{"id": id}
	opts := options.FindOne().SetProjection(bson.M{
		"id":              1,
		"localizeEtcId":   1,
		"released":        1,
		"playable":        1,
		"baseStar":        1,
		"rarity":          1,
		"position":        1,
		"role":            1,
		"armorType":       1,
		"bulletType":      1,
		"weaponType":      1,
		"squadType":       1,
		"school":          1,
		"club":            1,
		"imageIdentifier": 1,
	})

	var doc DataDoc
	if err := s.collection(region, "CharacterData").FindOne(ctx, filter, opts).Decode(&doc); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}
	return &doc, nil
}

// FetchNames returns a map of LocalizeEtcID to localized character names.
func (s *Store) FetchNames(ctx context.Context, region string, etcIDs []int64) (map[int64]string, error) {
	if len(etcIDs) == 0 {
		return map[int64]string{}, nil
	}

	filter := bson.M{"key": bson.M{"$in": etcIDs}}
	opts := options.Find().SetProjection(bson.M{"key": 1, "name": 1})

	cursor, err := s.collection(region, "LocalizeEtc").Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	type doc struct {
		Key  int64  `bson:"key"`
		Name string `bson:"name"`
	}

	names := make(map[int64]string, len(etcIDs))
	for cursor.Next(ctx) {
		var d doc
		if err := cursor.Decode(&d); err != nil {
			return nil, err
		}
		names[d.Key] = d.Name
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return names, nil
}

// FetchLocalization returns character localization records keyed by ID.
func (s *Store) FetchLocalization(ctx context.Context, region string, ids []int64) (map[int64]LocalizationDoc, error) {
	if len(ids) == 0 {
		return map[int64]LocalizationDoc{}, nil
	}

	filter := bson.M{"id": bson.M{"$in": ids}}
	opts := options.Find().SetProjection(bson.M{
		"id":           1,
		"fullName":     1,
		"introduction": 1,
		"age":          1,
		"birthDate":    1,
		"height":       1,
		"artistName":   1,
		"schoolYear":   1,
		"voiceActor":   1,
	})

	cursor, err := s.collection(region, "CharacterLocalize").Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	docs := make(map[int64]LocalizationDoc, len(ids))
	for cursor.Next(ctx) {
		var doc LocalizationDoc
		if err := cursor.Decode(&doc); err != nil {
			return nil, err
		}
		docs[doc.ID] = doc
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return docs, nil
}

// FetchStats loads character terrain moods keyed by character ID.
func (s *Store) FetchStats(ctx context.Context, region string, ids []int64) (map[int64]StatDoc, error) {
	if len(ids) == 0 {
		return map[int64]StatDoc{}, nil
	}

	filter := bson.M{"id": bson.M{"$in": ids}}
	opts := options.Find().SetProjection(bson.M{
		"id":          1,
		"streetMood":  1,
		"outdoorMood": 1,
		"indoorMood":  1,
	})

	cursor, err := s.collection(region, "CharacterStat").Find(ctx, filter, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[int64]StatDoc, len(ids))
	for cursor.Next(ctx) {
		var doc StatDoc
		if err := cursor.Decode(&doc); err != nil {
			return nil, err
		}
		stats[doc.ID] = doc
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return stats, nil
}

// FetchStatDocuments returns raw stat documents keyed by ID.
func (s *Store) FetchStatDocuments(ctx context.Context, region string, ids []int64) (map[int64]map[string]any, error) {
	if len(ids) == 0 {
		return map[int64]map[string]any{}, nil
	}

	filter := bson.M{"id": bson.M{"$in": ids}}

	cursor, err := s.collection(region, "CharacterStat").Find(ctx, filter, options.Find())
	if err != nil {
		return nil, err
	}
	defer cursor.Close(ctx)

	stats := make(map[int64]map[string]any, len(ids))
	for cursor.Next(ctx) {
		var doc bson.M
		if err := cursor.Decode(&doc); err != nil {
			return nil, err
		}
		if idAny, ok := doc["id"]; ok {
			if id, ok := toInt64(idAny); ok {
				delete(doc, "_id")
				stats[id] = doc
			}
		}
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return stats, nil
}

func toInt64(value interface{}) (int64, bool) {
	switch v := value.(type) {
	case int64:
		return v, true
	case int32:
		return int64(v), true
	case int:
		return int64(v), true
	case float64:
		return int64(v), true
	case string:
		if i, err := strconv.ParseInt(v, 10, 64); err == nil {
			return i, true
		}
	}
	return 0, false
}

// collection resolves the fully-qualified collection name for a region.
func (s *Store) collection(region, suffix string) *mongo.Collection {
	return s.db.Collection(fmt.Sprintf("%s.%s", region, suffix))
}
