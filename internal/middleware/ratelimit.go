package middleware

import (
	"net"
	"net/http"
	"sync"
	"time"

	"golang.org/x/time/rate"
)

// RateLimiter enforces a per-key rate limit using token buckets.
type RateLimiter struct {
	mu       sync.Mutex
	visitors map[string]*rate.Limiter
	limit    rate.Limit
	burst    int
	ttl      time.Duration
}

// NewRateLimiter constructs a RateLimiter for the given requests-per-minute and burst size.
func NewRateLimiter(requestsPerMinute int, burst int) *RateLimiter {
	return &RateLimiter{
		visitors: make(map[string]*rate.Limiter),
		limit:    rate.Limit(float64(requestsPerMinute) / 60.0),
		burst:    burst,
		ttl:      5 * time.Minute,
	}
}

// Middleware returns an HTTP middleware that applies the rate limiter.
func (rl *RateLimiter) Middleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			key := clientKeyFromRequest(r)
			limiter := rl.getLimiter(key)
			if !limiter.Allow() {
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusTooManyRequests)
				_, _ = w.Write([]byte(`{"status":429,"error":"rate limit exceeded"}`))
				return
			}
			next.ServeHTTP(w, r)
		})
	}
}

func (rl *RateLimiter) getLimiter(key string) *rate.Limiter {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	limiter, exists := rl.visitors[key]
	if !exists {
		limiter = rate.NewLimiter(rl.limit, rl.burst)
		rl.visitors[key] = limiter
		go rl.cleanupVisitorAfter(key, rl.ttl)
	}
	return limiter
}

func (rl *RateLimiter) cleanupVisitorAfter(key string, d time.Duration) {
	timer := time.NewTimer(d)
	defer timer.Stop()
	<-timer.C
	rl.mu.Lock()
	delete(rl.visitors, key)
	rl.mu.Unlock()
}

func clientKeyFromRequest(r *http.Request) string {
	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return ip
}
