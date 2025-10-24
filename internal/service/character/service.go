package character

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"strconv"
	"strings"

	store "go-archive/internal/store/character"
)

// ErrNotFound indicates character data could not be located.
var ErrNotFound = errors.New("character not found")

// Service coordinates character data assembly.
type Service struct {
	store *store.Store
}

// New creates a character service backed by the supplied store.
func New(store *store.Store) *Service {
	return &Service{store: store}
}

// Summary represents the reduced character payload exposed by the list endpoint.
type Summary struct {
	ID         int64        `json:"id"`
	Name       string       `json:"name"`
	Profile    string       `json:"profile"`
	Rarity     string       `json:"rarity"`
	BaseStar   int          `json:"baseStar"`
	Position   string       `json:"position"`
	Role       string       `json:"role"`
	ArmorType  string       `json:"armorType"`
	BulletType string       `json:"bulletType"`
	WeaponType string       `json:"weaponType"`
	SquadType  string       `json:"squadType"`
	School     string       `json:"school"`
	Terrain    TerrainBlock `json:"terrain"`
}

// TerrainBlock mirrors the legacy terrain response.
type TerrainBlock struct {
	Urban   TerrainBonus `json:"urban"`
	Outdoor TerrainBonus `json:"outdoor"`
	Indoor  TerrainBonus `json:"indoor"`
}

// TerrainBonus contains modifiers for a terrain grade.
type TerrainBonus struct {
	DamageDealt     string `json:"DamageDealt"`
	ShieldBlockRate string `json:"ShieldBlockRate"`
}

// Detail represents the full character payload for the detail endpoint.
type Detail struct {
	ID         int64          `json:"id"`
	IsReleased bool           `json:"isReleased"`
	IsPlayable bool           `json:"isPlayable"`
	Character  CharacterCore  `json:"character"`
	Info       CharacterInfo  `json:"info"`
	Stat       map[string]any `json:"stat"`
	Terrain    TerrainBlock   `json:"terrain"`
}

// CharacterCore captures headline character details.
type CharacterCore struct {
	Name       string `json:"name"`
	FullName   string `json:"fullname"`
	BaseStar   int    `json:"baseStar"`
	Rarity     string `json:"rarity"`
	ArmorType  string `json:"armorType"`
	BulletType string `json:"bulletType"`
	Position   string `json:"position"`
	Role       string `json:"role"`
	SquadType  string `json:"squadType"`
	WeaponType string `json:"weaponType"`
	Profile    string `json:"profile"`
}

// CharacterInfo mirrors the metadata block from the legacy API.
type CharacterInfo struct {
	Age        string `json:"age"`
	BirthDate  string `json:"birthDate"`
	Height     string `json:"height"`
	Artist     string `json:"artist"`
	Club       string `json:"club"`
	School     string `json:"school"`
	SchoolYear string `json:"schoolYear"`
	VoiceActor string `json:"voiceActor"`
}

// List returns all playable, released characters for the region.
func (s *Service) List(ctx context.Context, region string) ([]Summary, error) {
	dataDocs, err := s.store.ListData(ctx, region)
	if err != nil {
		return nil, err
	}
	if len(dataDocs) == 0 {
		return nil, ErrNotFound
	}

	ids := uniqueIDs(dataDocs)
	etcIDs := uniqueLocalizeEtcIDs(dataDocs)

	localization, err := s.store.FetchLocalization(ctx, region, ids)
	if err != nil {
		return nil, err
	}

	names, err := s.store.FetchNames(ctx, region, etcIDs)
	if err != nil {
		return nil, err
	}

	stats, err := s.store.FetchStats(ctx, region, ids)
	if err != nil {
		return nil, err
	}

	summaries := make([]Summary, 0, len(dataDocs))
	for _, doc := range dataDocs {
		locDoc := localization[doc.ID]

		name := names[doc.LocalizeEtcID]
		if name == "" {
			name = stringFromValue(locDoc.FullName)
		}
		if name == "" {
			continue
		}

		profile := stringFromValue(locDoc.Introduction)

		statDoc, ok := stats[doc.ID]
		if !ok {
			statDoc = store.StatDoc{}
		}

		summary := Summary{
			ID:         doc.ID,
			Name:       name,
			Profile:    profile,
			Rarity:     stringFromValue(doc.Rarity),
			BaseStar:   intFromValue(doc.BaseStar),
			Position:   doc.Position,
			Role:       normalizeRole(doc.Role),
			ArmorType:  normalizeArmor(doc.ArmorType),
			BulletType: normalizeBullet(doc.BulletType),
			WeaponType: doc.WeaponType,
			SquadType:  doc.SquadType,
			School:     doc.School,
			Terrain: TerrainBlock{
				Urban:   resolveTerrain("Urban", statDoc.StreetMood),
				Outdoor: resolveTerrain("Desert", statDoc.OutdoorMood),
				Indoor:  resolveTerrain("Indoor", statDoc.IndoorMood),
			},
		}

		summaries = append(summaries, summary)
	}

	if len(summaries) == 0 {
		return nil, ErrNotFound
	}

	sort.Slice(summaries, func(i, j int) bool {
		return summaries[i].ID < summaries[j].ID
	})

	return summaries, nil
}

// Detail returns the full character payload for a given ID.
func (s *Service) Detail(ctx context.Context, region string, id int64) (*Detail, error) {
	dataDoc, err := s.store.GetDataByID(ctx, region, id)
	if err != nil {
		return nil, err
	}
	if dataDoc == nil {
		return nil, ErrNotFound
	}

	names, err := s.store.FetchNames(ctx, region, []int64{dataDoc.LocalizeEtcID})
	if err != nil {
		return nil, err
	}
	localizationDocs, err := s.store.FetchLocalization(ctx, region, []int64{id})
	if err != nil {
		return nil, err
	}
	locDoc, ok := localizationDocs[id]
	if !ok {
		locDoc = store.LocalizationDoc{}
	}

	name := names[dataDoc.LocalizeEtcID]
	if name == "" {
		name = stringFromValue(locDoc.FullName)
	}

	introduction := stringFromValue(locDoc.Introduction)

	statsRaw, err := s.store.FetchStatDocuments(ctx, region, []int64{id})
	if err != nil {
		return nil, err
	}
	statMap := statsRaw[id]
	if statMap == nil {
		statMap = map[string]any{}
	}

	moods, err := s.store.FetchStats(ctx, region, []int64{id})
	if err != nil {
		return nil, err
	}
	statDoc := moods[id]

	detail := &Detail{
		ID:         dataDoc.ID,
		IsReleased: dataDoc.Released,
		IsPlayable: dataDoc.Playable,
		Character: CharacterCore{
			Name:       name,
			FullName:   stringFromValue(locDoc.FullName),
			BaseStar:   intFromValue(dataDoc.BaseStar),
			Rarity:     stringFromValue(dataDoc.Rarity),
			ArmorType:  normalizeArmor(dataDoc.ArmorType),
			BulletType: normalizeBullet(dataDoc.BulletType),
			Position:   dataDoc.Position,
			Role:       normalizeRole(dataDoc.Role),
			SquadType:  dataDoc.SquadType,
			WeaponType: dataDoc.WeaponType,
			Profile:    introduction,
		},
		Info: CharacterInfo{
			Age:        stringFromValue(locDoc.Age),
			BirthDate:  stringFromValue(locDoc.BirthDate),
			Height:     stringFromValue(locDoc.Height),
			Artist:     stringFromValue(locDoc.ArtistName),
			Club:       dataDoc.Club,
			School:     dataDoc.School,
			SchoolYear: stringFromValue(locDoc.SchoolYear),
			VoiceActor: stringFromValue(locDoc.VoiceActor),
		},
		Stat:    statMap,
		Terrain: TerrainBlock{},
	}

	detail.Terrain = TerrainBlock{
		Urban:   resolveTerrain("Urban", statDoc.StreetMood),
		Outdoor: resolveTerrain("Desert", statDoc.OutdoorMood),
		Indoor:  resolveTerrain("Indoor", statDoc.IndoorMood),
	}

	return detail, nil
}

// Find locates a single character by ID or localized name.
func (s *Service) Find(ctx context.Context, region, identifier string, treatAsID bool) (*Detail, error) {
	if treatAsID {
		id, convErr := strconv.ParseInt(identifier, 10, 64)
		if convErr != nil {
			return nil, convErr
		}
		return s.Detail(ctx, region, id)
	}

	summaries, err := s.List(ctx, region)
	if err != nil {
		return nil, err
	}

	normalized := strings.ToLower(identifier)
	for _, summary := range summaries {
		if strings.ToLower(summary.Name) == normalized || strings.EqualFold(summary.Name, identifier) {
			return s.Detail(ctx, region, summary.ID)
		}
	}

	return nil, ErrNotFound
}

func uniqueIDs(docs []store.DataDoc) []int64 {
	result := make([]int64, 0, len(docs))
	seen := make(map[int64]struct{}, len(docs))
	for _, doc := range docs {
		if _, ok := seen[doc.ID]; ok {
			continue
		}
		seen[doc.ID] = struct{}{}
		result = append(result, doc.ID)
	}
	return result
}

func uniqueLocalizeEtcIDs(docs []store.DataDoc) []int64 {
	result := make([]int64, 0, len(docs))
	seen := make(map[int64]struct{}, len(docs))
	for _, doc := range docs {
		if _, ok := seen[doc.LocalizeEtcID]; ok {
			continue
		}
		seen[doc.LocalizeEtcID] = struct{}{}
		result = append(result, doc.LocalizeEtcID)
	}
	return result
}

func intFromValue(value interface{}) int {
	switch v := value.(type) {
	case nil:
		return 0
	case int:
		return v
	case int32:
		return int(v)
	case int64:
		return int(v)
	case float32:
		return int(v)
	case float64:
		return int(v)
	case string:
		if i, err := strconv.Atoi(v); err == nil {
			return i
		}
		if f, err := strconv.ParseFloat(v, 64); err == nil {
			return int(f)
		}
		return 0
	default:
		return 0
	}
}

func stringFromValue(value interface{}) string {
	switch v := value.(type) {
	case nil:
		return ""
	case string:
		return v
	case fmt.Stringer:
		return v.String()
	default:
		return fmt.Sprint(v)
	}
}

var terrainTypes = map[string]map[string]TerrainBonus{
	"Urban": {
		"SS": {DamageDealt: "130%(1.3x)", ShieldBlockRate: "75%"},
		"S":  {DamageDealt: "120%(1.2x)", ShieldBlockRate: "60%"},
		"A":  {DamageDealt: "110%(1.1x)", ShieldBlockRate: "45%"},
		"B":  {DamageDealt: "100%(1x)", ShieldBlockRate: "30%"},
		"C":  {DamageDealt: "90%(0.9x)", ShieldBlockRate: "15%"},
		"D":  {DamageDealt: "80%(0.8x)", ShieldBlockRate: "0%"},
	},
	"Desert": {
		"SS": {DamageDealt: "130%(1.3x)", ShieldBlockRate: "75%"},
		"S":  {DamageDealt: "120%(1.2x)", ShieldBlockRate: "60%"},
		"A":  {DamageDealt: "110%(1.1x)", ShieldBlockRate: "45%"},
		"B":  {DamageDealt: "100%(1x)", ShieldBlockRate: "30%"},
		"C":  {DamageDealt: "90%(0.9x)", ShieldBlockRate: "15%"},
		"D":  {DamageDealt: "80%(0.8x)", ShieldBlockRate: "0%"},
	},
	"Indoor": {
		"SS": {DamageDealt: "130%(1.3x)", ShieldBlockRate: "75%"},
		"S":  {DamageDealt: "120%(1.2x)", ShieldBlockRate: "60%"},
		"A":  {DamageDealt: "110%(1.1x)", ShieldBlockRate: "45%"},
		"B":  {DamageDealt: "100%(1x)", ShieldBlockRate: "30%"},
		"C":  {DamageDealt: "90%(0.9x)", ShieldBlockRate: "15%"},
		"D":  {DamageDealt: "80%(0.8x)", ShieldBlockRate: "0%"},
	},
}

func resolveTerrain(category string, value interface{}) TerrainBonus {
	key := stringFromValue(value)
	if key == "" {
		return TerrainBonus{}
	}
	if mapping, ok := terrainTypes[category]; ok {
		if resolved, ok := mapping[key]; ok {
			return resolved
		}
	}
	return TerrainBonus{DamageDealt: key}
}

func normalizeRole(role string) string {
	switch role {
	case "DamageDealer":
		return "Dealer"
	case "Tanker":
		return "Tank"
	case "Healer":
		return "Healer"
	case "Supporter":
		return "Support"
	case "Vehicle":
		return "T.S."
	default:
		return role
	}
}

func normalizeBullet(bullet string) string {
	switch bullet {
	case "Explosion":
		return "Explosive"
	case "Mystic":
		return "Mystic"
	case "Penetration":
		return "Piercing"
	default:
		return bullet
	}
}

func normalizeArmor(armor string) string {
	switch armor {
	case "Unarmed":
		return "Special"
	case "HeavyArmor":
		return "Heavy"
	case "LightArmor":
		return "Light"
	case "ElasticArmor":
		return "Elastic"
	default:
		return armor
	}
}
