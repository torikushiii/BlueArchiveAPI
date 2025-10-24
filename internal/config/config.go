package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

// Config captures runtime settings sourced from YAML.
type Config struct {
	API       APIConfig       `yaml:"api"`
	Database  DatabaseConfig  `yaml:"database"`
	RateLimit RateLimitConfig `yaml:"rate_limit"`
}

// APIConfig describes the HTTP listener.
type APIConfig struct {
	Host string `yaml:"host"`
	Port string `yaml:"port"`
}

// DatabaseConfig defines MongoDB connectivity.
type DatabaseConfig struct {
	URI  string `yaml:"uri"`
	Name string `yaml:"name"`
}

// RateLimitConfig defines request limiting rules.
type RateLimitConfig struct {
	RequestsPerMinute int `yaml:"requests_per_minute"`
	Burst             int `yaml:"burst"`
}

// LoadFromEnv loads configuration from CONFIG_PATH or the default path.
func LoadFromEnv() (*Config, error) {
	path := os.Getenv("CONFIG_PATH")
	if path == "" {
		path = "config.yaml"
	}
	return Load(path)
}

// Load reads YAML configuration from disk.
func Load(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read config: %w", err)
	}
	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}
	cfg.applyDefaults()
	return &cfg, nil
}

func (c *Config) applyDefaults() {
	if c.API.Host == "" {
		c.API.Host = "0.0.0.0"
	}
	if c.API.Port == "" {
		c.API.Port = "9999"
	}
	if c.Database.URI == "" {
		c.Database.URI = "mongodb://localhost:27017"
	}
	if c.Database.Name == "" {
		c.Database.Name = "BlueArchive"
	}
	if c.RateLimit.RequestsPerMinute <= 0 {
		c.RateLimit.RequestsPerMinute = 100
	}
	if c.RateLimit.Burst <= 0 {
		c.RateLimit.Burst = c.RateLimit.RequestsPerMinute
	}
}
