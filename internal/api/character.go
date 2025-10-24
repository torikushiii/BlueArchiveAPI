package api

import (
	"context"
	"errors"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"go-archive/internal/http/respond"
	svc "go-archive/internal/service/character"
)

const characterQueryTimeout = 5 * time.Second

// NewCharacterListHandler returns an HTTP handler that lists characters for a region.
func NewCharacterListHandler(service *svc.Service) http.HandlerFunc {
	if service == nil {
		panic("character service must not be nil")
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

		ctx, cancel := context.WithTimeout(r.Context(), characterQueryTimeout)
		defer cancel()

		summaries, err := service.List(ctx, region)
		if err != nil {
			switch {
			case errors.Is(err, svc.ErrNotFound):
				respond.Error(w, http.StatusNotFound, "no character data available")
			default:
				log.Printf("character list error (%s): %v", region, err)
				respond.Error(w, http.StatusInternalServerError, "failed to load character data")
			}
			return
		}

		respond.JSON(w, http.StatusOK, summaries)
	}
}

// NewCharacterDetailHandler returns a handler that fetches a single character by ID or name.
func NewCharacterDetailHandler(service *svc.Service) http.HandlerFunc {
	if service == nil {
		panic("character service must not be nil")
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

		identifier := strings.TrimSpace(chi.URLParam(r, "character"))
		if identifier == "" {
			respond.Error(w, http.StatusBadRequest, "character identifier is required")
			return
		}

		useID := strings.EqualFold(r.URL.Query().Get("id"), "true")
		if useID {
			if _, err := strconv.ParseInt(identifier, 10, 64); err != nil {
				respond.Error(w, http.StatusBadRequest, "character id must be numeric")
				return
			}
		}

		ctx, cancel := context.WithTimeout(r.Context(), characterQueryTimeout)
		defer cancel()

		character, err := service.Find(ctx, region, identifier, useID)
		if err != nil {
			switch {
			case errors.Is(err, svc.ErrNotFound):
				respond.Error(w, http.StatusNotFound, "character not found")
			default:
				log.Printf("character detail error (%s:%s): %v", region, identifier, err)
				respond.Error(w, http.StatusInternalServerError, "failed to load character data")
			}
			return
		}

		respond.JSON(w, http.StatusOK, character)
	}
}
