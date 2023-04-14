---
title: "Renovate のログぜんぶ読む"
emoji: "🤯"
type: "tech"
topics: ["Renovate"]
published: false
---


生のログはこちら。

https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8

ソースコードは v34.100.1。

## DEBUG: Using RE2 as regex engine
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L1](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L1)

### 実装
https://github.com/renovatebot/renovate/blob/3b72d500983036ec76d33e70a1a177f800321d78/lib/util/regex.ts#L15

/lib/util/regex.ts のトップレベルで書かれているので、regex.ts をインポートするたびに呼び出されそう。でもこのメッセージは 1 回しか出てないので案外呼び出されてない？

### 見解
正規表現を使うときに出てくる。失敗すると別のエラーメッセージが出てくる。

## DEBUG: Parsing configs

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2)

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

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L3](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L3)

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

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L4](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L4)

## DEBUG: File config

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L5](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L5)

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

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L30](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L30)

```json
"config": {
    "repositories": ["korosuke613/homepage-2nd"],
    "dryRun": "full",
    "requireConfig": "ignored",
    "schedule": []
}
```       

## DEBUG: Env config

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L37](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L37)

```json
"config": {
    "hostRules": [],
    "token": "***********",
    "username": "renovate[bot]",
    "gitAuthor": "renovate[bot] <29139614+renovate[bot]@users.noreply.github.com>"
}
```

## DEBUG: Combined config

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L44](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L44)

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

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L77](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L77)

## DEBUG: Using default github endpoint: https://api.github.com/

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L78](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L78)

## DEBUG: Platform config

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L79](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L79)

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

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L87](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L87)

## DEBUG: Adding token authentication for api.github.com to hostRules

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L88](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L88)

## DEBUG: Using *Dir

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L89-L91](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L89-L91)

```
DEBUG: Using baseDir: /tmp/renovate
DEBUG: Using cacheDir: /tmp/renovate/cache
DEBUG: Using containerbaseDir: /tmp/renovate/cache/containerbase
```

## DEBUG: Initializing Renovate internal cache into /tmp/renovate/cache/renovate/renovate-cache-v1

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L92](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L92)

## DEBUG: Commits limit = null

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L93](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L93)

## DEBUG: Setting global hostRules

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L94](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L94)

## DEBUG: Adding token authentication for api.github.com to hostRules

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L95](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L95)

## DEBUG: validatePresets()

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L96](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L96)

## DEBUG: Reinitializing hostRules for repo

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L97](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L97)

## DEBUG: Clearing hostRules

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L98](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L98)

## DEBUG: Adding token authentication for api.github.com to hostRules

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L99](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L99)

##  INFO: Repository started (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L100](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L100)

```json
       "renovateVersion": "34.100.1"
```

## DEBUG: Using localDir: /tmp/renovate/repos/github/korosuke613/homepage-2nd (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L102](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L102)

## DEBUG: PackageFiles.clear() - Package files deleted (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L103](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L103)

## DEBUG: initRepo("korosuke613/homepage-2nd") (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L104](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L104)

## DEBUG: korosuke613/homepage-2nd default branch = main (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L105](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L105)

## DEBUG: Using app token for git init (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L106](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L106)

## DEBUG: Resetting npmrc (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L107](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L107)

## DEBUG: checkOnboarding() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L108](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L108)

## DEBUG: isOnboarded() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L109](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L109)

## DEBUG: Config file will be ignored (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L110](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L110)

## DEBUG: Repo is onboarded (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L111](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L111)

## DEBUG: migrateAndValidate() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L112](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L112)

## DEBUG: No config migration necessary (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L113](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L113)

## DEBUG: massaged config (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L114](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L114)

```json
       "config": {
         "extends": [
           "config:base",
           ":label(renovate)",
           ":timezone(Asia/Tokyo)",
           ":enableVulnerabilityAlertsWithLabel(security)",
           ":semanticCommitTypeAll(chore)",
           "schedule:weekly"
         ]
       }
```

## DEBUG: migrated config (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L125](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L125)

```json
       "config": {
         "extends": [
           "config:base",
           ":label(renovate)",
           ":timezone(Asia/Tokyo)",
           ":enableVulnerabilityAlertsWithLabel(security)",
           ":semanticCommitTypeAll(chore)",
           "schedule:weekly"
         ]
       }
```       

## DEBUG: Setting hostRules from config (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L136](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L136)

## DEBUG: Found repo ignorePaths (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L137](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L137)

```json
       "ignorePaths": [
         "**/node_modules/**",
         "**/bower_components/**",
         "**/vendor/**",
         "**/examples/**",
         "**/__tests__/**",
         "**/test/**",
         "**/tests/**",
         "**/__fixtures__/**"
       ]
```       

## DEBUG: No vulnerability alerts found (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L148-L149](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L148-L149)

## DEBUG: findIssue(Dependency Dashboard) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L150](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L150)

## DEBUG: Retrieving issueList (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L151](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L151)

## DEBUG: Retrieved 1 issues (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L152](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L152)

## DEBUG: Found issue 47 (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L153](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L153)

## DEBUG: No baseBranches (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L154](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L154)

## DEBUG: extract() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L155](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L155)

## DEBUG: Setting current branch to main (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L156](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L156)

## DEBUG: Initializing git repository into /tmp/renovate/repos/github/korosuke613/homepage-2nd (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L157](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L157)

## DEBUG: Performing blobless clone (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L158](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L158)

## DEBUG: git clone completed (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L159](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L159)

```json
       "durationMs": 776
```

## DEBUG: latest repository commit (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L161](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L161)

```json
       "latestCommit": {
         "hash": "8f149fe592fe36cbb3fd61d895e62c369d113789",
         "date": "2023-01-13T14:14:36+09:00",
         "message": "Merge pull request #116 from korosuke613/add-dry-run-renovate-workflow",
         "refs": "HEAD -> main, origin/main, origin/HEAD",
         "body": "ci: add dry-run renovate workflow",
         "author_name": "Futa HIRAKOBA",
         "author_email": "korosuke613@users.noreply.github.com"
       }
```

## DEBUG: latest commit (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L171](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L171)

```json
       "branchName": "main",
       "latestCommitDate": "2023-01-13T14:14:36+09:00"
```

## DEBUG: Using file match: <正規表現> for manager <manager 名> (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L174-L262](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L174-L262)

## DEBUG: Matched <ファイル数> file(s) for manager <manager 名>: <ファイル名> (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L263-L265](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L263-L265)

## DEBUG: npm file <package.json のパス> has name "<package.json に指定されたパッケージ名>" (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L266-L267](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L266-L267)

## DEBUG: Detecting pnpm Workspaces (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L268](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L268)

## DEBUG: Detecting Lerna and Yarn Workspaces (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L269](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L269)

## DEBUG: Finding locked versions (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L270](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L270)

## DEBUG: Found <package-lock.json のパス> for <package.json のパス> (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L271-L272](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L271-L272)

## DEBUG: Found <manager 名> package files (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L273-L275](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L273-L275)

## DEBUG: Found 9 package file(s) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L276](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L276)

##  INFO: Dependency extraction complete (repository=korosuke613/homepage-2nd, baseBranch=main)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L277](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L277)

```json
       "stats": {
         "managers": {
           "asdf": {"fileCount": 1, "depCount": 1},
           "github-actions": {"fileCount": 6, "depCount": 20},
           "npm": {"fileCount": 2, "depCount": 70}
         },
         "total": {"fileCount": 9, "depCount": 91}
       }
```

## DEBUG: Setting npmrc (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L286](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L286)

## DEBUG: PackageFiles.add() - Package file saved for base branch (repository=korosuke613/homepage-2nd, baseBranch=main)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L287](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L287)

## DEBUG: Package releases lookups complete (repository=korosuke613/homepage-2nd, baseBranch=main)


[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L288](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L288)

## DEBUG: branchifyUpgrades (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L289](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L289)

## DEBUG: Using group branchName template (repository=korosuke613/homepage-2nd)

下の見出しとセット。

## DEBUG: Dependency @docsearch/css is part of group npm-root (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L290-L329](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L290-L329)

## DEBUG: detectSemanticCommits() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L330](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L330)

## DEBUG: getCommitMessages (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L331](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L331)

## DEBUG: semanticCommits: detected "angular" (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L332](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L332)

## DEBUG: semanticCommits: enabled (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L333]([https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L333])

## DEBUG: 21 flattened updates found: node, @docsearch/css, @docsearch/react, @commitlint/cli, @commitlint/config-conventional, @tailwindcss/typography, @typescript-eslint/eslint-plugin, @typescript-eslint/parser, astro, astro-compress, astro-eslint-parser, astro-robots-txt, eslint-plugin-import, eslint-plugin-jsx-a11y, eslint-plugin-react, prettier, prettier-plugin-astro, rimraf, textlint, jsdom, prettier (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L334](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L334)

## DEBUG: Returning 7 branch(es) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L335](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L335)

## DEBUG: config.repoIsOnboarded=true (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L336](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L336)

## DEBUG: packageFiles with updates (repository=korosuke613/homepage-2nd, baseBranch=main)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L337](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L337)

:::details 中身

```json
       "config": {
         "asdf": [
           {
             "packageFile": ".tool-versions",
             "deps": [
               {
                 "currentValue": "18.12.1",
                 "depName": "node",
                 "datasource": "node",
                 "packageName": "node",
                 "versioning": "node",
                 "depIndex": 0,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "v18.13.0",
                     "newValue": "18.13.0",
                     "releaseTimestamp": "2023-01-05T00:00:00.000Z",
                     "newMajor": 18,
                     "newMinor": 13,
                     "updateType": "minor",
                     "branchName": "renovate/node-18.x"
                   }
                 ],
                 "warnings": [],
                 "sourceUrl": "https://github.com/nodejs/node",
                 "registryUrl": "https://nodejs.org/dist",
                 "homepage": "https://nodejs.org",
                 "currentVersion": "18.12.1",
                 "isSingleVersion": true,
                 "fixedVersion": "18.12.1"
               }
             ]
           }
         ],
         "github-actions": [
           {
             "packageFile": ".github/workflows/ci.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 2,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/compare-renovate.yaml",
             "deps": [
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/renovate.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/renovate.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 0,
                 "updates": []
               }
             ]
           },
           {
             "packageFile": ".github/workflows/dry-renovate.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "korosuke613/renovate-dry-run-action",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/renovate-dry-run-action@v1",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v1",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/korosuke613/renovate-dry-run-action",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v1",
                 "fixedVersion": "v1"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/pages.yml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/upload-pages-artifact",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/upload-pages-artifact@v1",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v1",
                 "depIndex": 2,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/upload-pages-artifact",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v1",
                 "fixedVersion": "v1"
               },
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/configure-pages",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/configure-pages@v2",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v2",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/configure-pages",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v2",
                 "fixedVersion": "v2"
               },
               {
                 "depName": "actions/deploy-pages",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/deploy-pages@main",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 5,
                 "updates": []
               },
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/notify-to-slack.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/notify-to-slack.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 6,
                 "updates": []
               }
             ]
           },
           {
             "packageFile": ".github/workflows/scraping.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               }
             ]
           },
           {
             "packageFile": ".github/workflows/update-blogs-data.yaml",
             "deps": [
               {
                 "depName": "actions/checkout",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/checkout@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/checkout",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "actions/setup-node",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "actions/setup-node@v3",
                 "autoReplaceStringTemplate": "{{depName}}@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "v3",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "sourceUrl": "https://github.com/actions/setup-node",
                 "registryUrl": "https://github.com",
                 "currentVersion": "v3",
                 "fixedVersion": "v3"
               },
               {
                 "depName": "korosuke613/actions",
                 "commitMessageTopic": "{{{depName}}} action",
                 "datasource": "github-tags",
                 "versioning": "docker",
                 "depType": "action",
                 "replaceString": "korosuke613/actions/.github/workflows/notify-to-slack.yaml@main",
                 "autoReplaceStringTemplate": "{{depName}}/.github/workflows/notify-to-slack.yaml@{{#if newDigest}}{{newDigest}}{{#if newValue}} # {{newValue}}{{/if}}{{/if}}{{#unless newDigest}}{{newValue}}{{/unless}}",
                 "currentValue": "main",
                 "skipReason": "invalid-version",
                 "depIndex": 2,
                 "updates": []
               }
             ]
           }
         ],
         "npm": [
           {
             "packageFile": "package.json",
             "deps": [
               {
                 "depType": "dependencies",
                 "depName": "@astrojs/image",
                 "currentValue": "0.12.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.12.1",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/image",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/image/",
                 "currentVersion": "0.12.1",
                 "fixedVersion": "0.12.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "@docsearch/css",
                 "currentValue": "3.3.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.3.1",
                 "depIndex": 1,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "3.3.2",
                     "newValue": "3.3.2",
                     "releaseTimestamp": "2023-01-10T11:06:42.433Z",
                     "newMajor": 3,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/algolia/docsearch",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://docsearch.algolia.com/",
                 "currentVersion": "3.3.1",
                 "isSingleVersion": true,
                 "fixedVersion": "3.3.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "@docsearch/react",
                 "currentValue": "3.3.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.3.1",
                 "depIndex": 2,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "3.3.2",
                     "newValue": "3.3.2",
                     "releaseTimestamp": "2023-01-10T11:06:43.917Z",
                     "newMajor": 3,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/algolia/docsearch",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://docsearch.algolia.com/",
                 "currentVersion": "3.3.1",
                 "isSingleVersion": true,
                 "fixedVersion": "3.3.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "astro-imagetools",
                 "currentValue": "0.7.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.7.0",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/RafidMuhymin/astro-imagetools",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.7.0",
                 "fixedVersion": "0.7.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "date-fns",
                 "currentValue": "2.29.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "2.29.3",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/date-fns/date-fns",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.29.3",
                 "fixedVersion": "2.29.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "eastasianwidth",
                 "currentValue": "0.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "0.2.0",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/komagata/eastasianwidth",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.2.0",
                 "fixedVersion": "0.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "emoji-regex",
                 "currentValue": "10.2.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.2.1",
                 "depIndex": 6,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/mathiasbynens/emoji-regex",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://mths.be/emoji-regex",
                 "currentVersion": "10.2.1",
                 "fixedVersion": "10.2.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "glob",
                 "currentValue": "8.0.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "8.0.3",
                 "depIndex": 7,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/isaacs/node-glob",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.0.3",
                 "fixedVersion": "8.0.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "react",
                 "currentValue": "18.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "18.2.0",
                 "depIndex": 8,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/react",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "18.2.0",
                 "fixedVersion": "18.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "react-dom",
                 "currentValue": "18.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "18.2.0",
                 "depIndex": 9,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/react-dom",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "18.2.0",
                 "fixedVersion": "18.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "react-icons",
                 "currentValue": "4.7.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.7.1",
                 "depIndex": 10,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/react-icons/react-icons",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.7.1",
                 "fixedVersion": "4.7.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "rehype-external-links",
                 "currentValue": "2.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "2.0.1",
                 "depIndex": 11,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/rehypejs/rehype-external-links",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.0.1",
                 "fixedVersion": "2.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "rehype-stringify",
                 "currentValue": "9.0.3",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "9.0.3",
                 "depIndex": 12,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/rehypejs/rehype",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "9.0.3",
                 "fixedVersion": "9.0.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-extract-frontmatter",
                 "currentValue": "3.2.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.2.0",
                 "depIndex": 13,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/mrzmmr/remark-extract-frontmatter",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.2.0",
                 "fixedVersion": "3.2.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-frontmatter",
                 "currentValue": "4.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.0.1",
                 "depIndex": 14,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-frontmatter",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.0.1",
                 "fixedVersion": "4.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-gfm",
                 "currentValue": "3.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.0.1",
                 "depIndex": 15,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-gfm",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.0.1",
                 "fixedVersion": "3.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-parse",
                 "currentValue": "10.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.0.1",
                 "depIndex": 16,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://remark.js.org",
                 "currentVersion": "10.0.1",
                 "fixedVersion": "10.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "remark-rehype",
                 "currentValue": "10.1.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.1.0",
                 "depIndex": 17,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/remarkjs/remark-rehype",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "10.1.0",
                 "fixedVersion": "10.1.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "strip-ansi",
                 "currentValue": "7.0.1",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "7.0.1",
                 "depIndex": 18,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/chalk/strip-ansi",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.0.1",
                 "fixedVersion": "7.0.1"
               },
               {
                 "depType": "dependencies",
                 "depName": "unified",
                 "currentValue": "10.1.2",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "10.1.2",
                 "depIndex": 19,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/unifiedjs/unified",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://unifiedjs.com",
                 "currentVersion": "10.1.2",
                 "fixedVersion": "10.1.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/partytown",
                 "currentValue": "1.0.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.0.2",
                 "depIndex": 20,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/partytown",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/partytown/",
                 "currentVersion": "1.0.2",
                 "fixedVersion": "1.0.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/react",
                 "currentValue": "1.2.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.2.2",
                 "depIndex": 21,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/react",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/react/",
                 "currentVersion": "1.2.2",
                 "fixedVersion": "1.2.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/rss",
                 "currentValue": "2.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.0.0",
                 "depIndex": 22,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro-rss",
                 "homepage": "https://astro.build",
                 "currentVersion": "2.0.0",
                 "fixedVersion": "2.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/sitemap",
                 "currentValue": "1.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.0.0",
                 "depIndex": 23,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/sitemap",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/sitemap/",
                 "currentVersion": "1.0.0",
                 "fixedVersion": "1.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@astrojs/tailwind",
                 "currentValue": "2.1.3",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.1.3",
                 "depIndex": 24,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/integrations/tailwind",
                 "homepage": "https://docs.astro.build/en/guides/integrations-guide/tailwind/",
                 "currentVersion": "2.1.3",
                 "fixedVersion": "2.1.3"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@commitlint/cli",
                 "currentValue": "17.3.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.3.0",
                 "depIndex": 25,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "17.4.2",
                     "newValue": "17.4.2",
                     "releaseTimestamp": "2023-01-12T14:37:19.866Z",
                     "newMajor": 17,
                     "newMinor": 4,
                     "updateType": "minor",
                     "branchName": "renovate/commitlint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/conventional-changelog/commitlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "@commitlint/cli",
                 "homepage": "https://commitlint.js.org/",
                 "currentVersion": "17.3.0",
                 "isSingleVersion": true,
                 "fixedVersion": "17.3.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@commitlint/config-conventional",
                 "currentValue": "17.3.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.3.0",
                 "depIndex": 26,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "17.4.2",
                     "newValue": "17.4.2",
                     "releaseTimestamp": "2023-01-12T14:37:20.468Z",
                     "newMajor": 17,
                     "newMinor": 4,
                     "updateType": "minor",
                     "branchName": "renovate/commitlint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/conventional-changelog/commitlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "@commitlint/config-conventional",
                 "homepage": "https://commitlint.js.org/",
                 "currentVersion": "17.3.0",
                 "isSingleVersion": true,
                 "fixedVersion": "17.3.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@proofdict/textlint-rule-proofdict",
                 "currentValue": "3.1.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.1.2",
                 "depIndex": 27,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/proofdict/proofdict",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://github.com/proofdict/proofdict/tree/master/packages/%40proofdict/textlint-rule-proofdict",
                 "currentVersion": "3.1.2",
                 "fixedVersion": "3.1.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@tailwindcss/aspect-ratio",
                 "currentValue": "0.4.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.4.2",
                 "depIndex": 28,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindlabs/tailwindcss-aspect-ratio",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.4.2",
                 "fixedVersion": "0.4.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@tailwindcss/typography",
                 "currentValue": "0.5.8",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.5.8",
                 "depIndex": 29,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.5.9",
                     "newValue": "0.5.9",
                     "releaseTimestamp": "2023-01-10T16:14:23.354Z",
                     "newMajor": 0,
                     "newMinor": 5,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindcss/typography",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.5.8",
                 "isSingleVersion": true,
                 "fixedVersion": "0.5.8"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@types/react",
                 "currentValue": "18.0.26",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "18.0.26",
                 "depIndex": 30,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/DefinitelyTyped/DefinitelyTyped",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "types/react",
                 "homepage": "https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react",
                 "currentVersion": "18.0.26",
                 "fixedVersion": "18.0.26"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@typescript-eslint/eslint-plugin",
                 "currentValue": "5.48.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.48.0",
                 "depIndex": 31,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "5.48.1",
                     "newValue": "5.48.1",
                     "releaseTimestamp": "2023-01-09T17:19:12.478Z",
                     "newMajor": 5,
                     "newMinor": 48,
                     "updateType": "patch",
                     "branchName": "renovate/typescript-eslint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typescript-eslint/typescript-eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/eslint-plugin",
                 "currentVersion": "5.48.0",
                 "isSingleVersion": true,
                 "fixedVersion": "5.48.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@typescript-eslint/parser",
                 "currentValue": "5.48.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.48.0",
                 "depIndex": 32,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "5.48.1",
                     "newValue": "5.48.1",
                     "releaseTimestamp": "2023-01-09T17:18:38.891Z",
                     "newMajor": 5,
                     "newMinor": 48,
                     "updateType": "patch",
                     "branchName": "renovate/typescript-eslint-monorepo"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typescript-eslint/typescript-eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/parser",
                 "currentVersion": "5.48.0",
                 "isSingleVersion": true,
                 "fixedVersion": "5.48.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro",
                 "currentValue": "1.8.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.8.0",
                 "depIndex": 33,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.9.2",
                     "newValue": "1.9.2",
                     "releaseTimestamp": "2023-01-11T18:38:16.700Z",
                     "newMajor": 1,
                     "newMinor": 9,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro",
                 "homepage": "https://astro.build",
                 "currentVersion": "1.8.0",
                 "isSingleVersion": true,
                 "fixedVersion": "1.8.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-compress",
                 "currentValue": "1.1.24",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.1.24",
                 "depIndex": 34,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "1.1.25",
                     "newValue": "1.1.25",
                     "releaseTimestamp": "2023-01-07T10:53:09.154Z",
                     "newMajor": 1,
                     "newMinor": 1,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/astro-community/astro-compress",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "1.1.24",
                 "isSingleVersion": true,
                 "fixedVersion": "1.1.24"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-eslint-parser",
                 "currentValue": "0.9.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.9.2",
                 "depIndex": 35,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.9.4",
                     "newValue": "0.9.4",
                     "releaseTimestamp": "2023-01-12T01:32:30.374Z",
                     "newMajor": 0,
                     "newMinor": 9,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/ota-meshi/astro-eslint-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.9.2",
                 "isSingleVersion": true,
                 "fixedVersion": "0.9.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "astro-robots-txt",
                 "currentValue": "0.3.10",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.3.10",
                 "depIndex": 36,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.3.11",
                     "newValue": "0.3.11",
                     "releaseTimestamp": "2023-01-09T18:21:56.317Z",
                     "newMajor": 0,
                     "newMinor": 3,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/alextim/astro-lib",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/astro-robots-txt",
                 "homepage": "https://github.com/alextim/astro-lib/tree/main/packages/astro-robots-txt#readme",
                 "currentVersion": "0.3.10",
                 "isSingleVersion": true,
                 "fixedVersion": "0.3.10"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint",
                 "currentValue": "8.31.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.31.0",
                 "depIndex": 37,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/eslint/eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://eslint.org",
                 "currentVersion": "8.31.0",
                 "fixedVersion": "8.31.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-airbnb-base",
                 "currentValue": "15.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "15.0.0",
                 "depIndex": 38,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/airbnb/javascript",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "15.0.0",
                 "fixedVersion": "15.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-airbnb-typescript",
                 "currentValue": "17.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "17.0.0",
                 "depIndex": 39,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/iamturns/eslint-config-airbnb-typescript",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "17.0.0",
                 "fixedVersion": "17.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-config-prettier",
                 "currentValue": "8.6.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.6.0",
                 "depIndex": 40,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/eslint-config-prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.6.0",
                 "fixedVersion": "8.6.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-import",
                 "currentValue": "2.26.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.26.0",
                 "depIndex": 41,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.27.4",
                     "newValue": "2.27.4",
                     "releaseTimestamp": "2023-01-12T07:16:54.707Z",
                     "newMajor": 2,
                     "newMinor": 27,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/import-js/eslint-plugin-import",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.26.0",
                 "isSingleVersion": true,
                 "fixedVersion": "2.26.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-jsx-a11y",
                 "currentValue": "6.6.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "6.6.1",
                 "depIndex": 42,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "6.7.1",
                     "newValue": "6.7.1",
                     "releaseTimestamp": "2023-01-12T04:19:36.937Z",
                     "newMajor": 6,
                     "newMinor": 7,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "6.6.1",
                 "isSingleVersion": true,
                 "fixedVersion": "6.6.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-prettier",
                 "currentValue": "4.2.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.2.1",
                 "depIndex": 43,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/eslint-plugin-prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.2.1",
                 "fixedVersion": "4.2.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-react",
                 "currentValue": "7.31.11",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "7.31.11",
                 "depIndex": 44,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "7.32.0",
                     "newValue": "7.32.0",
                     "releaseTimestamp": "2023-01-11T06:32:23.127Z",
                     "newMajor": 7,
                     "newMinor": 32,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsx-eslint/eslint-plugin-react",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.31.11",
                 "isSingleVersion": true,
                 "fixedVersion": "7.31.11"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-react-hooks",
                 "currentValue": "4.6.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.6.0",
                 "depIndex": 45,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/facebook/react",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "packages/eslint-plugin-react-hooks",
                 "homepage": "https://reactjs.org/",
                 "currentVersion": "4.6.0",
                 "fixedVersion": "4.6.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-simple-import-sort",
                 "currentValue": "8.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.0.0",
                 "depIndex": 46,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/lydell/eslint-plugin-simple-import-sort",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "8.0.0",
                 "fixedVersion": "8.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-tailwindcss",
                 "currentValue": "3.8.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.8.0",
                 "depIndex": 47,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/francoismassart/eslint-plugin-tailwindcss",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.8.0",
                 "fixedVersion": "3.8.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint-plugin-unused-imports",
                 "currentValue": "2.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.0.0",
                 "depIndex": 48,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/sweepline/eslint-plugin-unused-imports",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.0.0",
                 "fixedVersion": "2.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "husky",
                 "currentValue": "8.0.3",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.0.3",
                 "depIndex": 49,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/typicode/husky",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://typicode.github.io/husky",
                 "currentVersion": "8.0.3",
                 "fixedVersion": "8.0.3"
               },
               {
                 "depType": "devDependencies",
                 "depName": "lint-staged",
                 "currentValue": "13.1.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "13.1.0",
                 "depIndex": 50,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/okonet/lint-staged",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "13.1.0",
                 "fixedVersion": "13.1.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier",
                 "currentValue": "2.8.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.8.1",
                 "depIndex": 51,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.8.2",
                     "newValue": "2.8.2",
                     "releaseTimestamp": "2023-01-07T11:19:41.659Z",
                     "newMajor": 2,
                     "newMinor": 8,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://prettier.io",
                 "currentVersion": "2.8.1",
                 "isSingleVersion": true,
                 "fixedVersion": "2.8.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier-plugin-astro",
                 "currentValue": "0.7.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "0.7.1",
                 "depIndex": 52,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "0.7.2",
                     "newValue": "0.7.2",
                     "releaseTimestamp": "2023-01-04T14:48:04.415Z",
                     "newMajor": 0,
                     "newMinor": 7,
                     "updateType": "patch",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/withastro/prettier-plugin-astro",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "0.7.1",
                 "isSingleVersion": true,
                 "fixedVersion": "0.7.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "rimraf",
                 "currentValue": "3.0.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.0.2",
                 "depIndex": 53,
                 "updates": [
                   {
                     "bucket": "major",
                     "newVersion": "4.0.4",
                     "newValue": "4.0.4",
                     "releaseTimestamp": "2023-01-13T01:41:09.677Z",
                     "newMajor": 4,
                     "newMinor": 0,
                     "updateType": "major",
                     "branchName": "renovate/major-npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/isaacs/rimraf",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.0.2",
                 "isSingleVersion": true,
                 "fixedVersion": "3.0.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "tailwindcss",
                 "currentValue": "3.2.4",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "3.2.4",
                 "depIndex": 54,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/tailwindlabs/tailwindcss",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://tailwindcss.com",
                 "currentVersion": "3.2.4",
                 "fixedVersion": "3.2.4"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint",
                 "currentValue": "12.4.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "12.4.0",
                 "depIndex": 55,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "12.5.1",
                     "newValue": "12.5.1",
                     "releaseTimestamp": "2023-01-04T11:51:49.604Z",
                     "newMajor": 12,
                     "newMinor": 5,
                     "updateType": "minor",
                     "branchName": "renovate/npm-root"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint/textlint",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "12.4.0",
                 "isSingleVersion": true,
                 "fixedVersion": "12.4.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-filter-rule-comments",
                 "currentValue": "1.2.2",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "1.2.2",
                 "depIndex": 56,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint/textlint-filter-rule-comments",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "1.2.2",
                 "fixedVersion": "1.2.2"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-preset-ja-spacing",
                 "currentValue": "2.2.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.2.0",
                 "depIndex": 57,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint-ja/textlint-rule-preset-ja-spacing",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "2.2.0",
                 "fixedVersion": "2.2.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-preset-ja-technical-writing",
                 "currentValue": "7.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "7.0.0",
                 "depIndex": 58,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/textlint-ja/textlint-rule-preset-ja-technical-writing",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "7.0.0",
                 "fixedVersion": "7.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "textlint-rule-spellcheck-tech-word",
                 "currentValue": "5.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "5.0.0",
                 "depIndex": 59,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/azu/textlint-rule-spellcheck-tech-word",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "5.0.0",
                 "fixedVersion": "5.0.0"
               }
             ],
             "packageJsonName": "korosuke613-homepage",
             "packageFileVersion": "1.0.0",
             "npmrc": "***********",
             "npmLock": "package-lock.json",
             "managerData": {"yarnZeroInstall": false, "hasPackageManager": false},
             "skipInstalls": true,
             "constraints": {"npm": "<9"},
             "lockFiles": ["package-lock.json"]
           },
           {
             "packageFile": "tools/package.json",
             "deps": [
               {
                 "depType": "dependencies",
                 "depName": "axios",
                 "currentValue": "^1.0.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "1.1.3",
                 "depIndex": 0,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/axios/axios",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://axios-http.com",
                 "currentVersion": "1.1.3",
                 "fixedVersion": "1.1.3"
               },
               {
                 "depType": "dependencies",
                 "depName": "fast-xml-parser",
                 "currentValue": "^4.0.9",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "4.0.9",
                 "depIndex": 1,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/NaturalIntelligence/fast-xml-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "4.0.9",
                 "fixedVersion": "4.0.9"
               },
               {
                 "depType": "dependencies",
                 "depName": "jsdom",
                 "currentValue": "^20.0.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "20.0.0",
                 "depIndex": 2,
                 "updates": [
                   {
                     "bucket": "major",
                     "newVersion": "21.0.0",
                     "newValue": "^21.0.0",
                     "releaseTimestamp": "2023-01-07T14:04:09.668Z",
                     "newMajor": 21,
                     "newMinor": 0,
                     "updateType": "major",
                     "isRange": true,
                     "branchName": "renovate/major-npm-tools"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/jsdom/jsdom",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "20.0.0",
                 "isSingleVersion": false,
                 "fixedVersion": "20.0.0"
               },
               {
                 "depType": "dependencies",
                 "depName": "rss-parser",
                 "currentValue": "^3.12.0",
                 "datasource": "npm",
                 "prettyDepType": "dependency",
                 "lockedVersion": "3.12.0",
                 "depIndex": 3,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/bobby-brennan/rss-parser",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "3.12.0",
                 "fixedVersion": "3.12.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@cybozu/eslint-config",
                 "currentValue": "18.0.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "18.0.0",
                 "depIndex": 4,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/cybozu/eslint-config",
                 "registryUrl": "https://registry.npmjs.org",
                 "currentVersion": "18.0.0",
                 "fixedVersion": "18.0.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "@types/jsdom",
                 "currentValue": "20.0.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "20.0.1",
                 "depIndex": 5,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/DefinitelyTyped/DefinitelyTyped",
                 "registryUrl": "https://registry.npmjs.org",
                 "sourceDirectory": "types/jsdom",
                 "homepage": "https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/jsdom",
                 "currentVersion": "20.0.1",
                 "fixedVersion": "20.0.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "eslint",
                 "currentValue": "8.31.0",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "8.31.0",
                 "depIndex": 6,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/eslint/eslint",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://eslint.org",
                 "currentVersion": "8.31.0",
                 "fixedVersion": "8.31.0"
               },
               {
                 "depType": "devDependencies",
                 "depName": "prettier",
                 "currentValue": "2.8.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "2.8.1",
                 "depIndex": 7,
                 "updates": [
                   {
                     "bucket": "non-major",
                     "newVersion": "2.8.2",
                     "newValue": "2.8.2",
                     "releaseTimestamp": "2023-01-07T11:19:41.659Z",
                     "newMajor": 2,
                     "newMinor": 8,
                     "updateType": "patch",
                     "branchName": "renovate/npm-tools"
                   }
                 ],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/prettier/prettier",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://prettier.io",
                 "currentVersion": "2.8.1",
                 "isSingleVersion": true,
                 "fixedVersion": "2.8.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "ts-node",
                 "currentValue": "10.9.1",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "10.9.1",
                 "depIndex": 8,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/TypeStrong/ts-node",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://typestrong.org/ts-node",
                 "currentVersion": "10.9.1",
                 "fixedVersion": "10.9.1"
               },
               {
                 "depType": "devDependencies",
                 "depName": "typescript",
                 "currentValue": "4.9.4",
                 "datasource": "npm",
                 "prettyDepType": "devDependency",
                 "lockedVersion": "4.9.4",
                 "depIndex": 9,
                 "updates": [],
                 "warnings": [],
                 "versioning": "npm",
                 "sourceUrl": "https://github.com/Microsoft/TypeScript",
                 "registryUrl": "https://registry.npmjs.org",
                 "homepage": "https://www.typescriptlang.org/",
                 "currentVersion": "4.9.4",
                 "fixedVersion": "4.9.4"
               }
             ],
             "packageJsonName": "tools",
             "packageFileVersion": "1.0.0",
             "npmLock": "tools/package-lock.json",
             "managerData": {"yarnZeroInstall": false, "hasPackageManager": false},
             "skipInstalls": true,
             "constraints": {"npm": "<9"},
             "lockFiles": ["tools/package-lock.json"]
           }
         ]
       }
```

## DEBUG: detectSemanticCommits() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2165](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2165)

## DEBUG: semanticCommits: returning "enabled" from cache (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2166](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2166)

## DEBUG: processRepo() (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2167](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2167)

## DEBUG: Processing 7 branches: renovate/commitlint-monorepo, renovate/major-npm-root, renovate/major-npm-tools, renovate/node-18.x, renovate/npm-root, renovate/npm-tools, renovate/typescript-eslint-monorepo (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2168](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2168)

## DEBUG: Calculating hourly PRs remaining (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2169](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2169)

## DEBUG: getPrList success (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2170](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2170)

```json
       "pullsTotal": 17,
       "requestsTotal": 1,
       "apiQuotaAffected": true
```

## DEBUG: currentHourStart=2023-01-13T05:00:00.000+00:00 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2174](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2174)

## DEBUG: PR hourly limit remaining: 2 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2175](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2175)

## DEBUG: Calculating prConcurrentLimit (10) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2176](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2176)

## DEBUG: getBranchPr(renovate/npm-tools) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2177](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2177)

## DEBUG: findPr(renovate/npm-tools, undefined, open) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2178](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2178)

## DEBUG: Found PR #107 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2179](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2179)

## DEBUG: 4 PRs are currently open (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2198](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2198)

## DEBUG: PR concurrent limit remaining: 6 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2199](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2199)

## DEBUG: Calculated maximum PRs remaining this run: 2 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2200](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2200)

## DEBUG: PullRequests limit = 2 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2201](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2201)

## DEBUG: Calculating hourly PRs remaining (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2202](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2202)

## DEBUG: currentHourStart=2023-01-13T05:00:00.000+00:00 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2203](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2203)

## DEBUG: PR hourly limit remaining: 2 (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2204](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2204)

## DEBUG: Calculating branchConcurrentLimit (10) (repository=korosuke613/homepage-2nd)

## DEBUG: GitHub failure: Resource not accessible by integration (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2229](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2229)

:::details 中身

```json
       "err": {
         "name": "HTTPError",
         "code": "ERR_NON_2XX_3XX_RESPONSE",
         "timings": {
           "start": 1673586971786,
           "socket": 1673586971786,
           "lookup": 1673586971789,
           "connect": 1673586971791,
           "secureConnect": 1673586971795,
           "upload": 1673586971796,
           "response": 1673586971896,
           "end": 1673586971897,
           "phases": {
             "wait": 0,
             "dns": 3,
             "tcp": 2,
             "tls": 4,
             "request": 1,
             "firstByte": 100,
             "download": 1,
             "total": 111
           }
         },
         "message": "Response code 403 (Forbidden)",
         "stack": "HTTPError: Response code 403 (Forbidden)\n    at Request.<anonymous> (/home/runner/.npm/_npx/05eeecd92f4e18e0/node_modules/got/dist/source/as-promise/index.js:118:42)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (node:internal/process/task_queues:96:5)",
         "options": {
           "headers": {
             "user-agent": "RenovateBot/34.100.1 (https://github.com/renovatebot/renovate)",
             "accept": "application/json, application/vnd.github.machine-man-preview+json",
             "authorization": "***********",
             "accept-encoding": "gzip, deflate, br"
           },
           "url": "https://api.github.com/repos/korosuke613/homepage-2nd/branches/main/protection",
           "hostType": "github",
           "username": "",
           "password": "",
           "method": "GET",
           "http2": false
         },
         "response": {
           "statusCode": 403,
           "statusMessage": "Forbidden",
           "body": {
             "message": "Resource not accessible by integration",
             "documentation_url": "https://docs.github.com/rest/branches/branch-protection#get-branch-protection"
           },
           "headers": {
             "server": "GitHub.com",
             "date": "Fri, 13 Jan 2023 05:16:11 GMT",
             "content-type": "application/json; charset=utf-8",
             "transfer-encoding": "chunked",
             "x-github-media-type": "github.v3; param=machine-man-preview",
             "x-github-api-version-selected": "2022-11-28",
             "x-ratelimit-limit": "1000",
             "x-ratelimit-remaining": "752",
             "x-ratelimit-reset": "1673590303",
             "x-ratelimit-used": "248",
             "x-ratelimit-resource": "core",
             "access-control-expose-headers": "ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset",
             "access-control-allow-origin": "*",
             "strict-transport-security": "max-age=31536000; includeSubdomains; preload",
             "x-frame-options": "deny",
             "x-content-type-options": "nosniff",
             "x-xss-protection": "0",
             "referrer-policy": "origin-when-cross-origin, strict-origin-when-cross-origin",
             "content-security-policy": "default-src 'none'",
             "vary": "Accept-Encoding, Accept, X-Requested-With",
             "content-encoding": "gzip",
             "x-github-request-id": "1C02:28A6:7EB540F:102220AB:63C0E91B",
             "connection": "close"
           },
           "httpVersion": "1.1",
           "retryCount": 0
         }
       }
```

:::

## DEBUG: Branch protection: Do not have permissions to detect branch protection (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2305](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2305)

## DEBUG: Skipping behind base branch check due to rebaseWhen=auto (repository=korosuke613/homepage-2nd, branch=renovate/npm-tools)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2306](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2306)

## DEBUG: Branch lists (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2721](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2721)

```json
       "branchList": [
         "renovate/commitlint-monorepo",
         "renovate/major-npm-root",
         "renovate/major-npm-tools",
         "renovate/node-18.x",
         "renovate/npm-root",
         "renovate/npm-tools",
         "renovate/typescript-eslint-monorepo"
       ],
       "renovateBranches": [
         "renovate/major-npm-tools",
         "renovate/node-18.x",
         "renovate/npm-root",
         "renovate/npm-tools"
       ]
```

## DEBUG: Branch summary (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2741](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2741)

```json
       "cacheModified": undefined,
       "baseBranches": [{"branchName": "main", "sha": "8f149fe592fe36cbb3fd61d895e62c369d113789"}],
       "branches": [
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/npm-tools",
           "branchSha": "b741f794ffb461ea26c5adb54efe3b3c68d18be7",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/npm-root",
           "branchSha": "f1ed0f9946e4e3c6f7d45310ddda804ae6fdc9ab",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/node-18.x",
           "branchSha": "97ca1aab753b9bbb545d09392d114a61f4f32cce",
           "isModified": false,
           "isPristine": false
         },
         {
           "automerge": false,
           "baseBranch": "main",
           "baseBranchSha": "8f149fe592fe36cbb3fd61d895e62c369d113789",
           "branchName": "renovate/major-npm-tools",
           "branchSha": "61c8e2e8f6ee19bf3719ca1a27c34ccd9376bebc",
           "isModified": false,
           "isPristine": false
         }
       ],
       "inactiveBranches": [
         "renovate/typescript-eslint-monorepo",
         "renovate/commitlint-monorepo",
         "renovate/major-npm-root"
       ]
```

## DEBUG: Renovate repository PR statistics (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2787](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2787)

```json
       "stats": {"total": 17, "open": 4, "closed": 2, "merged": 11}
```

## DEBUG: Repository result: done, status: activated, enabled: true, onboarded: true (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2789](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2789)

## DEBUG: Repository timing splits (milliseconds) (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2790](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2790)

```json
       "splits": {
         "init": 1232,
         "extract": 2323,
         "lookup": 17213,
         "onboarding": 2,
         "update": 31906
       },
       "total": 52992
```

## DEBUG: Package cache statistics (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2799](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2799)

```json
       "get": {"count": 133, "avgMs": 13, "medianMs": 1, "maxMs": 227},
       "set": {"count": 120, "avgMs": 243, "medianMs": 62, "maxMs": 4140}
```

## DEBUG: http statistics (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2802](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2802)

```json
       "urls": {
         "https://api.github.com/graphql (POST,200)": 12,
         "https://api.github.com/repos/alextim/astro-lib (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/git/blobs/76bbc47f373c18f3b245ff81f82a337fa451caec (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/alextim/astro-lib/tags (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/git/blobs/df2d78c08a16bfa6f7c154bf04ced1613eb0a451 (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/algolia/docsearch/tags (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/git/blobs/bfdfe5bdb39e6da30f51f98b7e48b0383db62fce (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/astro-community/astro-compress/tags (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/git/blobs/48bf738e0b31defbac5bdb9b189c0df5ca5dfcb8 (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/import-js/eslint-plugin-import/tags (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/git/blobs/db09a302eaa0ba986d987c593ec3b07848661816 (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/jsdom/jsdom/tags (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/git/blobs/d6badd6e1e5369ea0fb07cb297209a5df0497e9a (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-jsx-a11y/tags (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/git/blobs/73fe1726c96201debc5a6014ecdc6e8ae17117df (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/jsx-eslint/eslint-plugin-react/tags (GET,200)": 1,
         "https://api.github.com/repos/korosuke613/homepage-2nd/branches/main/protection (GET,403)": 1,
         "https://api.github.com/repos/korosuke613/homepage-2nd/issues/47 (GET,200)": 2,
         "https://api.github.com/repos/korosuke613/homepage-2nd/pulls (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/git/blobs/4b5d9904dc9b6044126e64328ca46ab73262e223 (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/releases (GET,200)": 1,
         "https://api.github.com/repos/nodejs/node/tags (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/git/blobs/20038d15d81dcdb6bc10643b03a4632a048b82b4 (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/ota-meshi/astro-eslint-parser/tags (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/git/blobs/df1b8030f0418ccf92e994c7d3e92520733e3b15 (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/prettier/prettier/tags (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/git/blobs/bcffe48bde801302e83545af4a9a4d02dbabbea4 (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/tailwindcss/typography/tags (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/git/blobs/c088eb4f85788dcef7005aa7252d11bece7bf9f2 (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/git/trees/master (GET,200)": 1,
         "https://api.github.com/repos/textlint/textlint/tags (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/git/blobs/b7387a0281daaa351de899160e749de42e7cf39e (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/releases (GET,200)": 1,
         "https://api.github.com/repos/withastro/astro/tags (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/git/blobs/4cb73bee88378030ff8ebc44e08d6cdff14a36cc (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/git/trees/main (GET,200)": 1,
         "https://api.github.com/repos/withastro/prettier-plugin-astro/tags (GET,200)": 1,
         "https://api.github.com/repositories/27193779/releases (GET,200)": 3,
         "https://api.github.com/repositories/27193779/tags (GET,200)": 7,
         "https://api.github.com/repositories/28061676/tags (GET,200)": 1,
         "https://api.github.com/repositories/28478929/tags (GET,200)": 9,
         "https://api.github.com/repositories/32238354/tags (GET,200)": 1,
         "https://api.github.com/repositories/348060227/releases (GET,200)": 8,
         "https://api.github.com/repositories/348060227/tags (GET,200)": 9,
         "https://api.github.com/repositories/478584/tags (GET,200)": 2,
         "https://api.github.com/repositories/523625263/pulls (GET,200)": 1,
         "https://api.github.com/repositories/75104123/tags (GET,200)": 1,
         "https://nodejs.org/dist/index.json (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fimage (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fpartytown (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Frss (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Fsitemap (GET,200)": 1,
         "https://registry.npmjs.org/@astrojs%2Ftailwind (GET,200)": 1,
         "https://registry.npmjs.org/@commitlint%2Fcli (GET,200)": 1,
         "https://registry.npmjs.org/@commitlint%2Fconfig-conventional (GET,200)": 1,
         "https://registry.npmjs.org/@cybozu%2Feslint-config (GET,200)": 1,
         "https://registry.npmjs.org/@docsearch%2Fcss (GET,200)": 1,
         "https://registry.npmjs.org/@docsearch%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@proofdict%2Ftextlint-rule-proofdict (GET,200)": 1,
         "https://registry.npmjs.org/@tailwindcss%2Faspect-ratio (GET,200)": 1,
         "https://registry.npmjs.org/@tailwindcss%2Ftypography (GET,200)": 1,
         "https://registry.npmjs.org/@types%2Fjsdom (GET,200)": 1,
         "https://registry.npmjs.org/@types%2Freact (GET,200)": 1,
         "https://registry.npmjs.org/@typescript-eslint%2Feslint-plugin (GET,200)": 1,
         "https://registry.npmjs.org/@typescript-eslint%2Fparser (GET,200)": 1,
         "https://registry.npmjs.org/astro (GET,200)": 1,
         "https://registry.npmjs.org/astro-compress (GET,200)": 1,
         "https://registry.npmjs.org/astro-eslint-parser (GET,200)": 1,
         "https://registry.npmjs.org/astro-imagetools (GET,200)": 1,
         "https://registry.npmjs.org/astro-robots-txt (GET,200)": 1,
         "https://registry.npmjs.org/axios (GET,200)": 1,
         "https://registry.npmjs.org/date-fns (GET,200)": 1,
         "https://registry.npmjs.org/eastasianwidth (GET,200)": 1,
         "https://registry.npmjs.org/emoji-regex (GET,200)": 1,
         "https://registry.npmjs.org/eslint (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-airbnb-base (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-airbnb-typescript (GET,200)": 1,
         "https://registry.npmjs.org/eslint-config-prettier (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-import (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-jsx-a11y (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-prettier (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-react (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-react-hooks (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-simple-import-sort (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-tailwindcss (GET,200)": 1,
         "https://registry.npmjs.org/eslint-plugin-unused-imports (GET,200)": 1,
         "https://registry.npmjs.org/fast-xml-parser (GET,200)": 1,
         "https://registry.npmjs.org/glob (GET,200)": 1,
         "https://registry.npmjs.org/husky (GET,200)": 1,
         "https://registry.npmjs.org/jsdom (GET,200)": 1,
         "https://registry.npmjs.org/lint-staged (GET,200)": 1,
         "https://registry.npmjs.org/prettier (GET,200)": 1,
         "https://registry.npmjs.org/prettier-plugin-astro (GET,200)": 1,
         "https://registry.npmjs.org/react (GET,200)": 1,
         "https://registry.npmjs.org/react-dom (GET,200)": 1,
         "https://registry.npmjs.org/react-icons (GET,200)": 1,
         "https://registry.npmjs.org/rehype-external-links (GET,200)": 1,
         "https://registry.npmjs.org/rehype-stringify (GET,200)": 1,
         "https://registry.npmjs.org/remark-extract-frontmatter (GET,200)": 1,
         "https://registry.npmjs.org/remark-frontmatter (GET,200)": 1,
         "https://registry.npmjs.org/remark-gfm (GET,200)": 1,
         "https://registry.npmjs.org/remark-parse (GET,200)": 1,
         "https://registry.npmjs.org/remark-rehype (GET,200)": 1,
         "https://registry.npmjs.org/rimraf (GET,200)": 1,
         "https://registry.npmjs.org/rss-parser (GET,200)": 1,
         "https://registry.npmjs.org/strip-ansi (GET,200)": 1,
         "https://registry.npmjs.org/tailwindcss (GET,200)": 1,
         "https://registry.npmjs.org/textlint (GET,200)": 1,
         "https://registry.npmjs.org/textlint-filter-rule-comments (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-preset-ja-spacing (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-preset-ja-technical-writing (GET,200)": 1,
         "https://registry.npmjs.org/textlint-rule-spellcheck-tech-word (GET,200)": 1,
         "https://registry.npmjs.org/ts-node (GET,200)": 1,
         "https://registry.npmjs.org/typescript (GET,200)": 1,
         "https://registry.npmjs.org/unified (GET,200)": 1
       },
       "hostStats": {
         "api.github.com": {"requestCount": 116, "requestAvgMs": 276, "queueAvgMs": 0},
         "nodejs.org": {"requestCount": 1, "requestAvgMs": 42, "queueAvgMs": 1},
         "registry.npmjs.org": {
           "requestCount": 68,
           "requestAvgMs": 620,
           "queueAvgMs": 0
         }
       },
       "totalRequests": 185
```

## DEBUG: dns cache (repository=korosuke613/homepage-2nd)

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2956](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2956)

```json
       "hosts": []
```

##  INFO: Repository finished (repository=korosuke613/homepage-2nd)
[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2958](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2958)

```json
       "cloned": true,
       "durationMs": 52992
```

## DEBUG: Renovate exiting

[https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2961](https://gist.github.com/korosuke613/449f19c3cc1572835f84f1da16a3b5d8#file-renovate-log-json-L2961)
