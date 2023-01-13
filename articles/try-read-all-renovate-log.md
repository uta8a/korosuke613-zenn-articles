---
title: "Renovate の実行ログぜんぶ読んでみる"
emoji: "🤯"
type: "tech"
topics: ["Renovate"]
published: false
---


生のログはこちら。

https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8

ソースコードは v34.100.1。

## DEBUG: Using RE2 as regex engine

### 利用箇所
https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/util/regex.ts#L15

/lib/util/regex.ts のトップレベルで書かれているので、regex.ts をインポートするたびに呼び出されそう。でもこのメッセージは 1 回しか出てないので案外呼び出されてない？

### 見解
正規表現を使うときに出てくる。失敗すると別のエラーメッセージが出てくる。

## DEBUG: Parsing configs

### 利用箇所

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

## DEBUG: File config

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

```json
"config": {
    "repositories": ["korosuke613/homepage-2nd"],
    "dryRun": "full",
    "requireConfig": "ignored",
    "schedule": []
}
```       

## DEBUG: Env config

```json
"config": {
    "hostRules": [],
    "token": "***********",
    "username": "renovate[bot]",
    "gitAuthor": "renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>"
}
```

## DEBUG: Combined config

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
