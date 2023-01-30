# Zenn Contents for korosuke613

* [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)
* [📘 Markdown guide](https://zenn.dev/zenn/articles/markdown-guide)

Preview
```
npm run start
```

## Productivity Weekly
### 新しく記事を書く

#### 単独号の場合
```
./generate-productivity-weekly-template.sh <西暦> <月> <日>
```

#### 隔週号の場合
```
./generate-productivity-weekly-template.sh <西暦> <月> <日> <前回の西暦> <前回の月> <前回の日>
```

タイトル等には `<西暦>`、`<月>`、`<日>` が入ります。

### 記事公開
1. 作成されたプルリクエストをマージ（[例](https://github.com/korosuke613/zenn-articles/pull/199)）
2. zenn.dev のダッシュボード (https://zenn.dev/dashboard) で内容確認
3. `published: true` にするプルリクエストをマージ（[例](https://github.com/korosuke613/zenn-articles/pull/200)）

### 記事宣伝
Revue で自動的に生まれている Issue を編集 (https://www.getrevue.co/app/issues/current) する。

1. `SUBJECT`: Productivity Weekly (<日付>号) を公開しました
2. `Type your introductory text here`: <空白>
3. Link の作成
   1. `Link` をクリック
   2. 公開した記事の URL を入力
   3. `Add link` をクリック
4. 本文の作成
   1. `Text` をクリック
   2. ラインナップの作成
      1. 「ラインナップ」と入力
      2. 「ラインナップ」を選択
      3. `H2` をクリック
      4. 改行
   3. 目次の作成
      1. 公開した記事の目次をコピー
      2. ラインナップの真下にペースト
5. 公開
   1. `Schedule Issue` をクリック
   2. `Twitter` にチェック
   3. ツイートしたい内容を入力
   4. `Send now` をクリック

#### ツイート本文例   
```
今週号です。夏かってくらい暑いですね #cybozu_productivity_weekly
<記事URL>
```
