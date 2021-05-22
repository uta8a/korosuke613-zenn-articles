---
title: "Zennで連載記事を書くときの生産性を上げるアレコレ"
emoji: "🦾"
type: "tech"
topics: ["ProductivityWeekly", "生産性向上", "gomplate", "shellscript"]
published: true
---

こんにちは。僕は Zenn で [Productivity Weekly](https://zenn.dev/topics/productivityweekly) という記事を連載しています。毎回記事の構成やタイトルなどはほぼ固定されているため、記事の中身を書き始めるまでの準備作業は定型化されています。今回は、記事を書く準備作業を半自動化し、記事を書き始めるまでのスピードを上げた話をします。

# TL;DR
- 対象 (and)
  - Zenn の記事を GitHub で管理している
  - Zenn 上で書く記事の構成やタイトルがある程度決まっている
- 内容
  - 記事の構成をテンプレート化したよ
  - gomplate を使って記事のテンプレートから記事の雛形を簡単に作成できるようにしたよ
  - 各コマンドをシェルスクリプトにまとめたよ
  - 記事を書く準備作業が半自動化されて、生産性が上がったよ

# 背景
僕が毎週執筆している Productivity Weekly の記事は構成やタイトル、前置きなど、いくつか固定化されている要素があります。

![](https://storage.googleapis.com/zenn-user-upload/x925mbz4tkxifq3uisli2za3mmoq)

タイトルは毎回 `Productivity Weekly (<開催した日付>号)` となっています。

構成は現在以下のようになっています。

- news 📺
- know-how 🎓
- tool 🔨
- koneta 🍘
- あとがき
  - omake

また、冒頭とあとがきに書く文は定型分となっております。

![](https://storage.googleapis.com/zenn-user-upload/z06qgwxrbwkefn9a7qesbpajb0ri =400x)
*冒頭文*

![](https://storage.googleapis.com/zenn-user-upload/ww5j4ax4toujyzie9b5mrep2d0ee =400x)
*あとがき文*

こういった固定されている部分を毎回手作業で書くのは骨が折れます。そのため、記事の内容をテンプレートとして毎回使いまわしたくなりました。

# やったこと
実際やったことを書いていきます。

## 記事の内容をテンプレート化する
まずは各記事に共通する部分を切り出してテンプレートを作りました。

[背景](#背景)で書いた要素から以下のテンプレートを作りました。

```markdown:./articles/template/productivity-weekly-template.md
---
title: "Productivity Weekly (xxxx-xx-xx号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 x 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

# know-how 🎓

# tool 🔨

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

# あとがき

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。
```

おお！毎回一緒である要素を抜き出せましたね。これを毎回**コピペ**して、**ファイル名**を変えて、**テンプレート内にある日付などを修正する**ことで記事を書けますね！

...

まだまだ面倒ですね...そうです。固定化された要素を抜き出したファイルを作るだけでは、まだまだ定型作業が発生してしまいます。

*残りの問題*
- ~~定型文のコピーペースト~~
- テンプレートのコピーペースト（`articles`以下に配置）***👈 new***
- ファイルの名前変更（`productivity-weekly-<日付>.md`）***👈 new***
- テンプレート内にある変動する値の修正（タイトル内日付、第何回目か）***👈 new***

**もっと自動化しましょう**

## テンプレート内の変数を自動で埋める

次はテンプレート内にある変数を自動で埋めるようにします。

テンプレート内の変数を毎回変更するのは面倒だし、変更を忘れてしまう可能性があります。いやですね。

テンプレート内には 2 つの変数があります。

- タイトルに埋め込む年
- タイトルに埋め込む月
- タイトルに埋め込む日
- 記事ナンバリングの数

`sed`などを使って毎回コピーペースト後に置換する方法もありますが、置き換える変数が多いためちょっと面倒です。

そのため、今回僕は go 製のテンプレートレンダリング CLI ツールである gomplate を使用することにしました。

https://github.com/hairyhenderson/gomplate

gomplate を使うことで、テンプレート内に埋め込んだ変数の置き換えやテンプレート内での計算、分岐ができます。(分岐は今回必要ありませんが)

先程用意したテンプレートを gomplate が処理できる形式にします。

```diff markdown:./articles/template/productivity-weekly-template.md.tmpl
---
- title: "Productivity Weekly (xxxx-xx-xx号)"
+ title: "Productivity Weekly ({{ .Env.PW_YEAR }}-{{ .Env.PW_MONTH }}-{{ .Env.PW_DAY }}号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

+ 今回が第 {{ .Env.PW_COUNT }} 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。
- 今回が第 x 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

=== 以下変更ないので省略 ===
```

今まで `x` となっていた部分がそれぞれ `{{ .Env.PW_YEAR }}` 、`{{ .Env.PW_MONTH }}`、`{{ .Env.PW_DAY }}`、`{{ .Env.PW_COUNT }}`に置き換わりました。

gomplate（というより go の `text/template`）では `{{`と `}}` で囲った部分に処理を書くことで、その部分を任意の文字列に変換できます。また、`.Env.HOGE`で、環境変数の `HOGE` を参照できます。

なので、4 つの環境変数を gomplate 実行時に設定しておくことでテンプレート内の変数に値を入れることができるわけですね。

先程のテンプレート（`productivity-weekly-template.md.tmpl`）に対して gomplate を実行してみましょう。

```
❯ export PW_YEAR=2021 PW_MONTH=05 PW_DAY=22 PW_COUNT=25 

❯ gomplate -f productivity-weekly-template.md.tmpl
---
title: "Productivity Weekly (2021-05-22号)"
emoji: ""
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 25 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

以下省略
```

おお〜しっかり変数が置き換わりましたね。

gomplate は標準出力に結果を出力するので、リダイレクトでファイルに出力できます。

```sh
gomplate -f productivity-weekly-template.md.tmpl > productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}.md
```

これで、ファイルをコピペする必要もなくなりました！

これで毎回**記事ナンバリングの数を計算**して、**環境変数を設定**して、**gomplate を実行**することで記事を書けますね！

...

まだまだ面倒ですね...そういえば記事のナンバリング数を毎回数えないといけません。各環境変数の設定も面倒です。いくつか面倒ごとは消えましたが、新たな面倒ごとも浮上しましたね。

*残りの問題*
- ~~定型文のコピーペースト~~
- ~~テンプレートのコピーペースト（`articles`以下に配置）~~
- ~~ファイルの名前変更（`productivity-weekly-<日付>.md`）~~
- ~~テンプレート内にある変動する値の修正（タイトル内日付、第何回目か）~~
- 記事ナンバリング数計算（`PW_COUNT`）***👈 new***
- 各環境変数の設定 ***👈 new***

**もっと自動化しましょう**

## これらの処理をシェルスクリプトにまとめる
複数の処理をまとめるのに手っ取り早いのはシェルスクリプトを作ることです。個人的にシェルスクリプトはあまり書きたくありませんが、小規模ならシェルスクリプトがちょうど良いです。

各変数は引数で渡すことにしました。環境変数を設定するよりは楽ですね。

```sh:./generate-productivity-weekly-from-template.sh
#!/usr/bin/env bash

set -euxo pipefail

export PW_YEAR=$1
export PW_MONTH=$2
export PW_DAY=$3
export PW_COUNT=$4

# テンプレから本文を出力する
gomplate -f ./articles/template/productivity-weekly-template.md.tmpl > ./articles/productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}.md
```

以下のコマンドで実行できます。

```sh
./generate-productivity-weekly-from-template.sh 2021 05 22 25
```

楽になりましたね。やることはシェルのパスと引数を書くだけです。

しかし、まだ「記事ナンバリング数計算（`PW_COUNT`）」を自分でやらなきゃいけない問題は解決してませんね。正規表現をゴリゴリ書くことで最新の記事からこの数字を抽出しても良いですが、大変面倒です。

そこで僕は記事ナンバリング数をファイルに書き出して、記事作成時に値を読み込み、+1 した数で更新する方法を取りました。

```sh:./articles/template/productivity-weekly-count.txt
24
```

```diff sh:./generate-productivity-weekly-from-template.sh
#!/usr/bin/env bash

set -euxo pipefail

export PW_YEAR=$1
export PW_MONTH=$2
export PW_DAY=$3
- export PW_COUNT=$4

+ # ProductivityWeekly何回目かを計算する
+ export PW_COUNT=$(($(cat ./articles/template/productivity-weekly-count.txt) + 1))

# テンプレから本文を出力する
gomplate -f ./articles/template/productivity-weekly-template.md.tmpl > ./articles/productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}.md

+ # カウントを更新する
+ echo $PW_COUNT > ./articles/template/productivity-weekly-count.txt
```

```sh:実行コマンド（カウント数を引数に入れる必要がなくなった）
./generate-productivity-weekly-from-template.sh 2021 05 22
```

これにより、シェル実行時に `productivity-weekly-count.txt` にある値を読み込み、+1 し、記事の雛形作成後に `productivity-weekly-count.txt` を更新してくれるようになりました。

**これでもう「この記事何回目だっけ？」と悩む必要はありません！**

# やってみた結果
今回の取り組みによって、1 コマンドでテンプレートファイルから記事の雛形を作り、各変数も埋め込んでくれるようになりました。

僕が記事を書く前にやることは `./generate-productivity-weekly-from-template.sh <西暦> <月> <日>` を実行することだけです。

連載記事を書く準備作業を半自動化したことにより、記事を書き始めるまでのスピードが上がりました。さらに、**記事の内容に集中できるようになった**ため、**連載記事を書き始めるまでの心理的ハードルも低くなりました**。**生産性アゲアゲ** 💪 💪 です。

今回紹介したコードは以下のリポジトリにあります。

https://github.com/korosuke613/zenn-articles

*解決した問題*
- 定型文のコピーペースト
- テンプレートのコピーペースト（`articles`以下に配置）
- ファイルの名前変更（`productivity-weekly-<日付>.md`）
- テンプレート内にある変動する値の修正（タイトル内日付、第何回目か）
- 記事ナンバリング数計算（`PW_COUNT`）
- 各環境変数の設定

# おわりに
**連載記事を書く準備作業を半自動化することで生産性が上がりました**。この記事が Zenn で連載記事を書くような方の参考になれば嬉しいです。

冒頭で紹介した[Productivity Weekly](https://zenn.dev/topics/productivityweekly) は「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」のまとめ的なやつです。**今回の取り組みで執筆スピードが上がり、執筆者の僕の腰も軽くなりました**。気になった人は Productivity Weekly 記事もぜひご覧ください。

そんな僕が所属するサイボウズの生産性向上チームは、今回の記事のような **（社内）エンジニアの生産性を向上させるためのお仕事**をしています。気になった方は以下の記事をご覧ください！！！！！！

https://blog.cybozu.io/entry/2020/08/31/080000