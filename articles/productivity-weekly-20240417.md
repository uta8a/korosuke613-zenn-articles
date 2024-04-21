---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-04-17)
emoji: 📓
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240417
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-04-17 単独号です。

今回が第 149 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Deprecation notice: v3 of the artifact actions - The GitHub Blog
https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/

## Terraform 1.8 improves extensibility with provider-defined functions
https://www.hashicorp.com/blog/terraform-1-8-improves-extensibility-with-provider-defined-functions

Terraform 1.8 が GA となり、公式から機能紹介記事が公開されました。

目玉機能は Provider-defined functions という、プロバイダーが提供する関数を利用できるようになったことでしょうか。`provider::<provider_name>::<function_name>([arguments])` という形式で呼び出すことができます。
例えば、公式の `time` プロバイダーでは `rfc3339_parse` という関数が提供されています。Terraform 1.8 以降で `provider::time::rfc3339_parse("2023-07-25T23:43:16Z")` のように書くと、RFC3339 形式の timestamp をパースして year, month, day などのオブジェクトが得られます。
既に AWS,Google Cloud, Azure プロバイダーといった公式プロバイダーで Provider-defined functions が提供されています。

その他、resource の種類を超えたリファクタリングが `moved` ブロックでできるようになったなど、嬉しい変更があります。どんどん便利になっていく Terraform に期待です。

Change log は[こちら](https://github.com/hashicorp/terraform/releases/tag/v1.8.0)から確認できます。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## HashiCorp、TerraformをフォークしたOpenTofuに対しコードの不正コピーを警告。OpenTofuは完全否定 － Publickey
https://www.publickey1.jp/blog/24/hashicorpterraformopentofuopentofu.html

## Google Cloud Next '24セッションレポート - G-gen Tech Blog

https://blog.g-gen.co.jp/archive/category/Google%20Cloud%20Next%20%2724

Google Cloud Next '24 が開催され、そのセッションレポートを G-gen さんがまとめてくれています。

全体として、生成 AI 系のプラットフォームの話や既存サービスに AI 機能が組み込まれる話が多いように思いました。

我々、生産性向上チームが Google Cloud でよく使っている Cloud Run にも Cloud Run application canvas という AI を使ったアプリケーションの設計支援機能が追加されるようです。
自然言語でアプリケーションの概要を記述すると、その概要に基づいてアプリケーションの構成図を提示し、デプロイしてくれます。サクッとアプリケーションを動かしたいときに良さそうですね。

一方で、Direct VPC Egress が GA になり、Cloud NAT 対応したことなど、AI 以外の着実な嬉しいアップデートも公開されています。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ［速報］Google、同社初の独自Armプロセッサ「Google Axion」発表。x86ベースの仮想マシンより50％高速と。Google Cloud Next '24 － Publickey
https://www.publickey1.jp/blog/24/googlearmgoogle_axionx8650google_cloud_next_24.html

## Biome v1.7 | Biome
https://biomejs.dev/blog/biome-v1-7/

## GitHub Enterprise Importer's new git source migrator improves reliability of large repo migrations - The GitHub Blog
https://github.blog/changelog/2024-04-16-github-enterprise-importers-new-git-source-migrator-improves-reliability-of-large-repo-migrations/

## Amazon CloudWatch Internet Weather Map – View and analyze internet health | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/amazon-cloudwatch-internet-weather-map-view-and-analyze-internet-health/

# know-how 🎓

## Next.js 製アプリケーションの CI の実行時間削減や安定性向上のために取り組んだこと - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2024/04/08/100000

サイボウズ Office というプロダクトのフロントエンド刷新チームが行った CI の改善事例です。
無駄なテスト実行を減らす、build と lint で重複している型チェックを省く、極力キャッシュを活用する、flaky なテストの対処、などの改善手法が紹介されています。

自分は Next.js(というかフロントエンド) の知見は無いのですが、どの改善手法もアプリケーションの特性に依らずに適用できるものが多く紹介されていると感じ、参考になりました。
CI 高速化の総合格闘技感があって面白かったです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## なぜ我々は GitHub Copilot Enterprise の導入を見送ったのか - 一休.com Developers Blog
https://user-first.ikyu.co.jp/entry/2024/04/15/150249

## RenovateのBest Practicesから学ぶ依存関係管理の考え方
https://zenn.dev/da1chi/articles/939f27321ba016

Renovate 公式で提供されている `best-practices` preset からセキュリティ観点での依存関係管理の考え方を紹介しています。
[`best-practices` preset](https://docs.renovatebot.com/presets-config/#configbest-practices) の中身は次の通りです。

```json
{
  "configMigration": true,
  "extends": [
    "config:recommended",
    "docker:pinDigests",
    "helpers:pinGitHubActionDigests",
    ":pinDevDependencies"
  ]
}
```

このうち、`docker:pinDigests`、`helpers:pinGitHubActionDigests`、`:pinDevDependencies` について解説してくださっています。

自分はこちらの記事で `best-practices` preset を知りました。公式がベストプラクティスを提供しているのはありがたいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## AWS活用の自由度を上げる「Lambda」を「Rust」で活用　メモリの使用量を抑えつつ、プログラムの作成も簡単に - ログミーTech
https://logmi.jp/tech/articles/330395

## 単体テストを書かない技術 #phpcon_odawara - Speaker Deck
https://speakerdeck.com/o0h/how-not-to-write-unit-tests

## Technology Radar v30 が出たよ
https://www.thoughtworks.com/radar

Technology Radar の説明は t-wada さんの説明がわかりやすいので引用
https://twitter.com/t_wada/status/1775733175299588148

## 開発生産性が上がるって分かったので GitHub Copilot Business を積極活用しています - Money Forward Developers Blog
https://moneyforward-dev.jp/entry/2024/04/17/130000

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
