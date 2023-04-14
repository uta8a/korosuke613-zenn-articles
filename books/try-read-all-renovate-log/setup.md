---
title: "Renovateのセットアップ"
---


## DEBUG: Using RE2 as regex engine
[renovate.log.json#L1](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L1)

### 実装
https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/util/regex.ts#L15

/lib/util/regex.ts のトップレベルで書かれているので、regex.ts をインポートするたびに呼び出されそう。でもこのメッセージは 1 回しか出てないので案外呼び出されてない？

### 見解
正規表現を使うときに出てくる。失敗すると別のエラーメッセージが出てくる。


## DEBUG: Parsing configs

[renovate.log.json#L2](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L2)

### 実装

https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/workers/global/config/parse/index.ts#L17

`parseConfigs()` という関数を呼び出すと出てくるらしい。

```ts:19-23行目
  // Get configs
  const defaultConfig = defaultsParser.getConfig();
  const fileConfig = await fileParser.getConfig(env);
  const cliConfig = cliParser.getConfig(argv);
  const envConfig = envParser.getConfig(env);
```

おそらくリモートリポジトリのコンフィグ、ローカルのコンフィグ、CLI のコンフィグ（引数）、環境変数のコンフィグを全てロードしてる。

### 見解
コンフィグの parse を始めますよというメッセージ。


## DEBUG: Checking for config file in <configのパス>

[renovate.log.json#L3](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L3)

### 利用箇所

https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/workers/global/config/parse/file.ts#L49

file.ts の `getConfig()` という関数を呼び出すと出てくる。

```ts:36行目
  let configFile = env.RENOVATE_CONFIG_FILE ?? 'config.js';
```

指定されるファイル名は環境変数で指定されたファイルまたは `config.js` っぽい。

### 見解
ローカルのコンフィグを手に入れようとしたメッセージっぽいですね。

## WARN: cli config dryRun property has been changed to full
cli の config（引数）で dry-run をしているため、それのメッセージ。

[renovate.log.json#L4](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L4)


## DEBUG: File config

[renovate.log.json#L5](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L5)

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

## DEBUG: CLI config

[renovate.log.json#L30](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L30)

```json
"config": {
    "repositories": ["korosuke613/homepage-2nd"],
    "dryRun": "full",
    "requireConfig": "ignored",
    "schedule": []
}
```       

## DEBUG: Env config

[renovate.log.json#L37](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L37)

```json
"config": {
    "hostRules": [],
    "token": "***********",
    "username": "renovate[bot]",
    "gitAuthor": "renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>"
}
```

## DEBUG: Combined config

[renovate.log.json#L44](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L44)

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

## DEBUG: Found valid git version: 2.39.0

[renovate.log.json#L77](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L77)


## DEBUG: Using default github endpoint: https://api.github.com/

[renovate.log.json#L78](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L78)


## DEBUG: Platform config

[renovate.log.json#L79](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L79)

```json
       "platformConfig": {
         "hostType": "github",
         "endpoint": "https://api.github.com/",
         "isGHApp": true,
         "isGhe": false
       },
       "renovateUsername": "renovate[bot]"
```


## DEBUG: Using configured gitAuthor (renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>)

[renovate.log.json#L87](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L87)


## DEBUG: Adding token authentication for api.github.com to hostRules

[renovate.log.json#L88](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L88)


## DEBUG: Using *Dir

[renovate.log.json#L89-L91](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L89-L91)

```
DEBUG: Using baseDir: /tmp/renovate
DEBUG: Using cacheDir: /tmp/renovate/cache
DEBUG: Using containerbaseDir: /tmp/renovate/cache/containerbase
```


## DEBUG: Initializing Renovate internal cache into /tmp/renovate/cache/renovate/renovate-cache-v1

[renovate.log.json#L92](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L92)

## DEBUG: Commits limit = null

[renovate.log.json#L93](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L93)

## DEBUG: Setting global hostRules

[renovate.log.json#L94](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L94)

## DEBUG: Adding token authentication for api.github.com to hostRules

[renovate.log.json#L95](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L95)


## DEBUG: validatePresets()

[renovate.log.json#L96](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L96)


## DEBUG: Reinitializing hostRules for repo

[renovate.log.json#L97](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L97)

## DEBUG: Clearing hostRules

[renovate.log.json#L98](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L98)


## DEBUG: Adding token authentication for api.github.com to hostRules

[renovate.log.json#L99](https://github.com/korosuke613/zenn-articles/blob/read-all-renovate-log/books/try-read-all-renovate-log/renovate.log.json#L99)

