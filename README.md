
<div align="right">
  <details>
    <summary >🌐 Language</summary>
    <div>
      <div align="center">
        <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=en">English</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=zh-CN">简体中文</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=zh-TW">繁體中文</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=ja">日本語</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=ko">한국어</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=hi">हिन्दी</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=th">ไทย</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=fr">Français</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=de">Deutsch</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=es">Español</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=it">Italiano</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=ru">Русский</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=pt">Português</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=nl">Nederlands</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=pl">Polski</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=ar">العربية</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=fa">فارسی</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=tr">Türkçe</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=vi">Tiếng Việt</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=id">Bahasa Indonesia</a>
        | <a href="https://openaitx.github.io/view.html?user=torikushiii&project=BlueArchiveAPI&lang=as">অসমীয়া</
      </div>
    </div>
  </details>
</div>


# Blue Archive API

## *This API provides data for both the global and Japanese versions of Blue Archive.*

- [Blue Archive EN](https://bluearchive.nexon.com/home): Official EN Website
- [Blue Archive JP](https://bluearchive.jp/): Official JP Website

API that provides various data from the game Blue Archive. If you want to contribute to this project, feel free to open a pull request or an issue. If you want to support me, you can donate to my [Ko-Fi](https://ko-fi.com/torikushiii).

**Hosted API at https://api.ennead.cc/buruaka**

## Prerequisites

- [Go](https://go.dev/dl/): 1.24 or newer
- MongoDB instance reachable by the API (the default URI is `mongodb://localhost:27017`)

## Configuration

Runtime options are loaded from a YAML file. By default the server reads `config.yaml` in the project root. Set the `CONFIG_PATH` environment variable to point to an alternate configuration file if needed.

See `config.yaml` for an example that matches the local defaults.

## Running the API

Build dependencies and start the server using Go:

```bash
go run ./cmd/server
```

The listener address is controlled through configuration (default `0.0.0.0:9999`). All REST endpoints are served under the `/buruaka` base path (e.g. `/buruaka/character`), and the server connects to MongoDB using the configured URI to deliver character, raid, and banner data.

To produce a standalone binary:

```bash
go build -o server ./cmd/server
```

Run tests with:

```bash
go test ./...
```

## REST API Documentation

Endpoint details are in the [docs](https://github.com/torikushiii/BlueArchiveAPI/tree/main/docs) folder.
