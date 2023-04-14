---
title: "Renovateのセットアップ"
---

## 雑多なもの

```json
DEBUG: Using RE2 as regex engine
DEBUG: Parsing configs
DEBUG: Checking for config file in /home/runner/work/homepage-2nd/homepage-2nd/renovate.json5
 WARN: cli config dryRun property has been changed to full
```

- `DEBUG: Using RE2 as regex engine` [#L1](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L1)
  - 正規表現を使うときに出てくる。失敗すると別のエラーメッセージが出てくる。
- `DEBUG: Parsing configs` [#L2](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L2)
  - コンフィグの parse を始めますよというメッセージ。
  - おそらくリモートリポジトリのコンフィグ、ローカルのコンフィグ、CLI のコンフィグ（引数）、環境変数のコンフィグを全てロードしてる。
  - https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/workers/global/config/parse/index.ts#L17
  - `parseConfigs()` という関数を呼び出すと出てくるらしい。
    ```ts:19-23行目
    // Get configs
    const defaultConfig = defaultsParser.getConfig();
    const fileConfig = await fileParser.getConfig(env);
    const cliConfig = cliParser.getConfig(argv);
    const envConfig = envParser.getConfig(env);
    ```
- `DEBUG: Checking for config file in <configのパス>` [#L3](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L3)
  - ローカルのコンフィグを手に入れようとしたメッセージっぽいですね。
  - https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/workers/global/config/parse/file.ts#L49
  - file.ts の `getConfig()` という関数を呼び出すと出てくる。
    ```ts:36行目
    let configFile = env.RENOVATE_CONFIG_FILE ?? 'config.js';
    ```
  - 指定されるファイル名は環境変数で指定されたファイルまたは `config.js` っぽい。
- `WARN: cli config dryRun property has been changed to full` [#L4](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L4)
  - cli の config（引数）で dry-run をしているため、それのメッセージ。



## config 確認

### `DEBUG: File config`

[#L5](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L5)

```json
"config": {
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
        "config:base",
        ":label(renovate)",
        ":timezone(Asia/Tokyo)",
        ":enableVulnerabilityAlertsWithLabel(security)",
        ":semanticCommitTypeAll(chore)",
        "schedule:weekly"
    ],
    "separateMajorMinor": true,
    "packageRules": [
        {
            "matchManagers": ["npm"],
            "matchPaths": ["tools/package.json"],
            "groupName": "npm-tools"
        },
        {
            "matchManagers": ["npm"],
            "matchPaths": ["+(package.json)"],
            "groupName": "npm-root"
        }
    ]
}
```       

### `DEBUG: CLI config`

[#L30](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L30)

```json
"config": {
    "repositories": ["korosuke613/homepage-2nd"],
    "dryRun": "full",
    "requireConfig": "ignored",
    "schedule": []
}
```       

### `DEBUG: Env config`

[#L37](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L37)

```json
"config": {
    "hostRules": [],
    "token": "***********",
    "username": "renovate[bot]",
    "gitAuthor": "renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>"
}
```

### `DEBUG: Combined config`

[#L44](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L44)

```json
"config": {
    "$schema": "https://docs.renovatebot.com/renovate-schema.json",
    "extends": [
        "config:base",
        ":label(renovate)",
        ":timezone(Asia/Tokyo)",
        ":enableVulnerabilityAlertsWithLabel(security)",
        ":semanticCommitTypeAll(chore)",
        "schedule:weekly"
    ],
    "separateMajorMinor": true,
    "packageRules": [
        {
            "matchManagers": ["npm"],
            "matchPaths": ["tools/package.json"],
            "groupName": "npm-tools"
        },
        {
            "matchManagers": ["npm"],
            "matchPaths": ["+(package.json)"],
            "groupName": "npm-root"
        }
    ],
    "hostRules": [],
    "token": "***********",
    "username": "renovate[bot]",
    "gitAuthor": "renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>",
    "repositories": ["korosuke613/homepage-2nd"],
    "dryRun": "full",
    "requireConfig": "ignored",
    "schedule": []
}
```

## 雑多なもの

### `DEBUG: Found valid git version: 2.39.0`

[#L77](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L77)


### `DEBUG: Using default github endpoint: https://api.github.com/`

[#L78](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L78)


## Platform (ex: GitHub) の config 確認

### `DEBUG: Platform config`

[#L79](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L79)

```json
       "platformConfig": {
         "hostType": "github",
         "endpoint": "https://api.github.com/",
         "isGHApp": true,
         "isGhe": false
       },
       "renovateUsername": "renovate[bot]"
```


### `DEBUG: Using configured gitAuthor (renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>)`

[#L87](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L87)


### `DEBUG: Adding token authentication for api.github.com to hostRules`

[#L88](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L88)


## ディレクトリの確認

### `DEBUG: Using <役割>: <パス>`

[#L89-L91](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L89-L91)

```
DEBUG: Using baseDir: /tmp/renovate
DEBUG: Using cacheDir: /tmp/renovate/cache
DEBUG: Using containerbaseDir: /tmp/renovate/cache/containerbase
```

### `DEBUG: Initializing Renovate internal cache into /tmp/renovate/cache/renovate/renovate-cache-v1`

[#L92](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L92)

## 雑多なもの

### `DEBUG: Commits limit = null`

[#L93](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L93)

### `DEBUG: Setting global hostRules`

[#L94](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L94)

### `DEBUG: Adding token authentication for api.github.com to hostRules`

[#L95](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L95)


### `DEBUG: validatePresets()`

[#L96](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L96)


### `DEBUG: Reinitializing hostRules for repo`

[#L97](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L97)

### `DEBUG: Clearing hostRules`

[#L98](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L98)


### `DEBUG: Adding token authentication for api.github.com to hostRules`

[#L99](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/#L99)

