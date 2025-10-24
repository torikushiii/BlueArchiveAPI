package middleware

import (
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
)

const (
	colorReset  = "\033[0m"
	colorGreen  = "\033[32m"
	colorYellow = "\033[33m"
	colorRed    = "\033[31m"
	colorBlue   = "\033[34m"
	colorCyan   = "\033[36m"
)

// RequestLogger logs basic request telemetry with ANSI color.
func RequestLogger(logger *log.Logger) func(http.Handler) http.Handler {
	if logger == nil {
		logger = log.Default()
	}
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			rec := &statusRecorder{ResponseWriter: w, status: http.StatusOK}
			start := time.Now()

			next.ServeHTTP(rec, r)

			elapsed := time.Since(start)
			methodColor := colorizeMethod(r.Method)
			statusColor := colorizeStatus(rec.status)
			route := routePattern(r)

			logger.Printf(
				"%s%s%s %s%d%s %s%s%s %s",
				methodColor, r.Method, colorReset,
				statusColor, rec.status, colorReset,
				colorCyan, route, colorReset,
				formatLatency(elapsed),
			)
		})
	}
}

type statusRecorder struct {
	http.ResponseWriter
	status int
}

func (rec *statusRecorder) WriteHeader(code int) {
	rec.status = code
	rec.ResponseWriter.WriteHeader(code)
}

func (rec *statusRecorder) Write(b []byte) (int, error) {
	if rec.status == 0 {
		rec.status = http.StatusOK
	}
	return rec.ResponseWriter.Write(b)
}

func colorizeStatus(status int) string {
	switch {
	case status >= 200 && status < 300:
		return colorGreen
	case status >= 300 && status < 400:
		return colorBlue
	case status >= 400 && status < 500:
		return colorYellow
	default:
		return colorRed
	}
}

func colorizeMethod(method string) string {
	switch method {
	case http.MethodGet:
		return colorGreen
	case http.MethodPost:
		return colorBlue
	case http.MethodPut, http.MethodPatch:
		return colorYellow
	case http.MethodDelete:
		return colorRed
	default:
		return colorCyan
	}
}

func routePattern(r *http.Request) string {
	if routeCtx := chi.RouteContext(r.Context()); routeCtx != nil {
		pattern := routeCtx.RoutePattern()
		if pattern != "" {
			return pattern
		}
	}
	return r.URL.Path
}

func formatLatency(duration time.Duration) string {
	switch {
	case duration < time.Microsecond:
		return "0µs"
	case duration < time.Millisecond:
		return duration.Truncate(10 * time.Microsecond).String()
	case duration < time.Second:
		return duration.Round(100 * time.Microsecond).String()
	default:
		return duration.Round(time.Millisecond).String()
	}
}
