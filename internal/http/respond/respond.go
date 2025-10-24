package respond

import (
	"encoding/json"
	"log"
	"net/http"
)

// JSON writes the provided payload as JSON with the supplied status code.
func JSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	encoder := json.NewEncoder(w)
	encoder.SetEscapeHTML(false)
	if err := encoder.Encode(payload); err != nil {
		log.Printf("respond JSON encode error: %v", err)
	}
}

// Error sends a JSON error payload with a status code and message.
func Error(w http.ResponseWriter, status int, message string) {
	JSON(w, status, map[string]any{
		"status": status,
		"error":  message,
	})
}
