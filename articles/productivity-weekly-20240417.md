---
title: artifact系アクションがdeprecateに。他TF1.8など｜Productivity Weekly(2024-04-17)
emoji: 📓
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240417
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-05-07 10:00
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
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Deprecation notice: v3 of the artifact actions - The GitHub Blog
https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/

[actions/upload-artifact](https://github.com/actions/upload-artifact), [actions/download-artifact](https://github.com/actions/download-artifact)は v4 からパフォーマンスが大幅に向上した一方で、以前の v3 は 2024/11/30 から利用できなくなることが予告されました。

ちなみにさらに古い v1, v2 は以前から予告されているように 2024/6/30 から利用できなくなるようなので、まだ利用されている場合は早めに v4 にアップデートした方が良いでしょう。

GitHub 上でのコード検索も正規表現が利用可能なので、例えばこのようなクエリで upload, download の v1,v2,v3 を利用しているコードをまとめて検索可能です。ぜひ活用してみてください。
`org:{YOUR_ORG} /actions\/(upload|download)-artifact@v(1|2|3)/`
[`actions` のOrganizationに対して検索してみた例](https://github.com/search?q=org%3Aactions+%2Factions%5C%2F%28upload%7Cdownload%29-artifact%40v%281%7C2%7C3%29%2F&type=code)


また、今回の予告は GitHub Enterprise Server（GHES）には適用されないとのことです。一方で、GHES の現在の最新バージョンである v3.12 においても未だに v4 が利用できないため、このままだと actions/upload-artifact, actions/download-artifact を利用している場合に github.com と GHES で同一コードが使えない事態になりそうです。2024/11/30 までに GHES 側がどう対応されるのか気になっています。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Terraform 1.8 improves extensibility with provider-defined functions
https://www.hashicorp.com/blog/terraform-1-8-improves-extensibility-with-provider-defined-functions

Terraform 1.8 が GA となり、公式から機能紹介記事が公開されました。

目玉機能は Provider-defined functions という、プロバイダーが提供する関数を利用できるようになったことでしょうか。`provider::<provider_name>::<function_name>([arguments])` という形式で呼び出すことができます。
例えば、公式の `time` プロバイダーでは `rfc3339_parse` という関数が提供されています。Terraform 1.8 以降で `provider::time::rfc3339_parse("2023-07-25T23:43:16Z")` のように書くと、RFC3339 形式の timestamp をパースして year, month, day などのオブジェクトが得られます。
既に AWS,Google Cloud, Azure プロバイダーといった公式プロバイダーで Provider-defined functions が提供されています。

その他、resource の種類を超えたリファクタリングが `moved` ブロックでできるようになったなど、嬉しい変更があります。どんどん便利になっていく Terraform に期待です。

Change log は[こちら](https://github.com/hashicorp/terraform/releases/tag/v1.8.0)から確認できます。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Google Cloud Next '24セッションレポート - G-gen Tech Blog

https://blog.g-gen.co.jp/archive/category/Google%20Cloud%20Next%20%2724

Google Cloud Next '24 が開催され、そのセッションレポートを G-gen さんがまとめてくれています。

全体として、生成 AI 系のプラットフォームの話や既存サービスに AI 機能が組み込まれる話が多いように思いました。

我々、生産性向上チームが Google Cloud でよく使っている Cloud Run にも Cloud Run application canvas という AI を使ったアプリケーションの設計支援機能が追加されるようです。
自然言語でアプリケーションの概要を記述すると、その概要に基づいてアプリケーションの構成図を提示し、デプロイしてくれます。サクッとアプリケーションを動かしたいときに良さそうですね。

一方で、Direct VPC Egress が GA になり、Cloud NAT 対応したことなど、AI 以外の着実な嬉しいアップデートも公開されています。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

## Next.js 製アプリケーションの CI の実行時間削減や安定性向上のために取り組んだこと - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2024/04/08/100000

サイボウズ Office というプロダクトのフロントエンド刷新チームが行った CI の改善事例です。
無駄なテスト実行を減らす、build と lint で重複している型チェックを省く、極力キャッシュを活用する、flaky なテストの対処、などの改善手法が紹介されています。

自分は Next.js(というかフロントエンド) の知見は無いのですが、どの改善手法もアプリケーションの特性に依らずに適用できるものが多く紹介されていると感じ、参考になりました。
CI 高速化の総合格闘技感があって面白かったです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

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

## Technology Radar v30 が出たよ
https://www.thoughtworks.com/radar

PDF へのリンク: https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2024/04/tr_technology_radar_vol_30_en.pdf

毎度おなじみ、Thoughtworks 社の Technology Radar、最新の Vol.30 が公開されました。[前回は 2023/10 頃に出ていましたね](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231004#technology-radar-vol.29-%E3%81%8C%E5%85%AC%E9%96%8B)。

Technology Radar の説明は t-wada さんの説明がわかりやすいです。

https://twitter.com/t_wada/status/1775733175299588148

レポートの全部に目を通せてはいませんが、個人的には RAG が Adopt になったり、広範な統合テスト(Broad integration tests)が Hold で登場したり、Renovate がようやく Trial で登場したりといったトピックが気になりました。

気になるトピックに目を通してみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## なぜ我々は GitHub Copilot Enterprise の導入を見送ったのか - 一休.com Developers Blog
https://user-first.ikyu.co.jp/entry/2024/04/15/150249

一休さんによる、GitHub Copilot Enterprise の導入を見送った理由についての記事です。
最近 GitHub Copilot Enterprise を導入した系の記事が出てる中、本記事は導入しませんでしたという内容になります。

まず GitHub Copilot Enterprise を評価目的で導入し、プロジェクトメンバが各自で考えた、開発体験にインパクトを与えられるユースケースが実現できるかという観点で評価したようです。

本記事では一部のユースケースを抜粋して紹介してくれています。

- ドキュメントを集約する場として knowledge bases は Confluence からの移行に値するか？
- レガシーコードの理解にあたり認知負荷をどれぐらい軽減してくれるか？
- PR サマリーの自動生成で開発プロセスがどの程度改善されるか？

紹介されているユースケースはどれも大きな開発組織のある企業では考えた方が良さそうな内容だと思いました。

GitHub Copilot Enterprise は $39/user/month という価格設定であり、GitHub Copilot Business の 2 倍近い価格となっています。現状、Business と Enterprise は共存できないため、Copilot ユーザー数が多い企業（つまりは大企業）ほど、導入のインパクトは凄まじいです。
したがって、そういう企業ほど導入を検討する際はコストに見合うリターンがどれだけあるかを真面目に考える必要性が増しますが、一休さんの場合はしっかりと評価目的の導入をした上で検討し、それを記事として外部発信しているのはとても素晴らしいと思いました。

他社さんの導入しなかったときの検討内容を知れることはとても貴重であり、大変参考になる内容でした。
うちも GitHub Copilot Enterprise 導入迷っている...という企業の担当者の方はぜひ読んでみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 開発生産性が上がるって分かったので GitHub Copilot Business を積極活用しています - Money Forward Developers Blog
https://moneyforward-dev.jp/entry/2024/04/17/130000

マネーフォワードさんによる、GitHub Copilot の効果測定に関する記事です。

マネーフォワードさんでは GitHub Copilot Business を半年以上導入しており、半年経過してどのような効果があったのかを Findy Team+ で集めた指標を元に分析したとのことです。

様々な指標（プルリク作成数やオープンからレビューまでの平均時間、他者へのレビュー数など様々）を Copilot 利用者群、Copilot 非利用者群で比較し、それらの結果と分析がまとめられています。

割とわかりやすい違いが多く出ていて、Copilot の導入が開発生産性にどのような影響を与えるかがわかってとても面白いです。

個人の指標だけでなく、Four Keys も比較しており、それを元にしたまとめの次の文章はなるほどなとなりました。

> あくまでも Copilot は開発者個人を支援するツールであり、チーム全体の生産性向上には別の施策が必要 になると考えています。

とても興味深い記事でした。ちなみに個人的に一番驚いたのは Findy Team+ で取れる指標の多さ、細かさです。ユーザ単位でオープンからマージまでの平均時間や平均コメント数などが取れるのは多機能で驚きました。
分析の参考にしていきたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Enterprise Importer's new git source migrator improves reliability of large repo migrations - The GitHub Blog](https://github.blog/changelog/2024-04-16-github-enterprise-importers-new-git-source-migrator-improves-reliability-of-large-repo-migrations/)
    - GitHub Enterprise Importer が更新され、大規模なリポジトリの移行の信頼性が向上したようです
    - また、新しい IP レンジが追加されたようです
  - [Biome v1.7 | Biome](https://biomejs.dev/blog/biome-v1-7/)
    - Biome 1.7 に、ESLint、Prettier からのマイグレーション機能が入りました
    - なるべくルールをそのまま持ってきたい方は試してみましょう
  - [Amazon CloudWatch Internet Weather Map – View and analyze internet health | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/amazon-cloudwatch-internet-weather-map-view-and-analyze-internet-health/)
    - Amazon CloudWatch Internet Weather Map が登場しました
    - 世界中のインターネットのパフォーマンスや歌詞性を可視化できるマップです
    - 障害調査に役立ちそうですね
- **know-how 🎓**
  - [AWS活用の自由度を上げる「Lambda」を「Rust」で活用　メモリの使用量を抑えつつ、プログラムの作成も簡単に - ログミーTech](https://logmi.jp/tech/articles/330395)
    - AWS Lambda 上で Rust を活用し、メモリ使用量削減と高速な実行を実現している事例の記事です
    - 上記のメリットに加え、AWS SDK for Rust が GA になったことで SDK も充実しているようです

# あとがき
いやー大変遅れてしまって申し訳ないです。GW もあってちょっと最近忙しくて 😇

そういえば、生産性向上チームでは夏の学生インターンを募集しています。エントリー期間は 4 月 22 日(月)10:00 〜 5 月 7 日(火)10:00 です（これ、午前なのか午後なのか？）。
興味ある方はぜひエントリーしてみてください。

https://cybozu.co.jp/company/job/recruitment/intern/improvement.html

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
