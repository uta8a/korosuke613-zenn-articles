---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-04-03)
emoji: 🎲
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240403
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
今週は 2024-04-03 単独号です。

今回が第 148 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Actions Usage Metrics public beta - The GitHub Blog
https://github.blog/changelog/2024-03-28-actions-usage-metrics-public-beta/

## macOS 14 (Sonoma) is generally available - The GitHub Blog
https://github.blog/changelog/2024-04-01-macos-14-sonoma-is-generally-available-and-the-latest-macos-runner-image/

## GitHub Actions: Hardware accelerated Android virtualization now available - The GitHub Blog
https://github.blog/changelog/2024-04-02-github-actions-hardware-accelerated-android-virtualization-now-available/

## What's new for GitHub Actions hosted runners - The GitHub Blog
https://github.blog/changelog/2024-04-02-whats-new-for-github-actions-hosted-runners/


## Dependabot grouped security updates generally available - The GitHub Blog
https://github.blog/changelog/2024-03-28-dependabot-grouped-security-updates-generally-available/

## Code security configurations let organizations easily roll out GitHub security products at scale - The GitHub Blog
https://github.blog/changelog/2024-04-02-code-security-configurations-let-organizations-easily-roll-out-github-security-products-at-scale/

## 脆弱性の検出から修正提案まで：GitHub CopilotとCodeQLを利用したCode Scanningの自動修正機能 - GitHubブログ
https://github.blog/jp/2024-03-28-found-means-fixed-introducing-code-scanning-autofix-powered-by-github-copilot-and-codeql/

## Style Guide - Configuration Language | Terraform | HashiCorp Developer
https://developer.hashicorp.com/terraform/language/style

Terraform 公式がスタイルガイドを出したので読んで要約した
https://qiita.com/ogatango/items/9cd57fe8c48b1c03b2bd

## GitHub Copilot Enterprise - March 2024 update - The GitHub Blog
https://github.blog/changelog/2024-03-29-github-copilot-enterprise-march-2024-update/

## デジタル社会推進標準ガイドラインに CI／CDパイプラインにおけるセキュリティの留意点に関する技術レポートが追加されました
https://www.digital.go.jp/resources/standard_guidelines

## Linux Foundation Launches Open Source Valkey Community
https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community

背景として、NoSQL として広く知られ使われている Redis は、現在 Redis Ltd によってホストされ、マネタイズされています。
Redis Ltd の 3 月のこのブログ記事によって、Redis のライセンスが BSD License 2.0 から RSALv2（Redis Source Available License）と SSPLv1（Server Side Public License）のデュアルライセンスに変更されることが発表され、大きな話題を呼んだことは記憶に新しいですね。
https://redis.io/blog/redis-adopts-dual-source-available-licensing/

Redis を使った商用サービスを提供している大手クラウドベンダーらは Redis Ltd と別途契約を結ぶ必要があるとのことです。
Microsoft は先のブログ記事中で Redis Ltd と協力していく旨コメントしていますが、AWS や GCP は特にコメントが無く、今後どのように Redis を使っているサービスが提供されるのか注目されていました。

今回 Linux Foundation が Redis のライセンス変更前である 7.2.4 の時点からフォークし、Valkey の名でオープンソースとして開発を継続し提供していくことを発表しました。
発表の記事中で AWS や GCP（の中にいる元 Redis コントリビューター）などがコメントを寄せており、これらクラウドベンダーが提供する Redis を使っているサービスが今後 Valkey に置き換わっていくことが想定されます。

あの Linux Foundation がフォークするとのことで、今後も安定して続いていきそうな安心感がありますね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## The Wrong Way to Use DORA Metrics - The New Stack
https://thenewstack.io/the-wrong-way-to-use-dora-metrics/

## 一日30回リリースを可能にするpixiv開発 - Speaker Deck
https://speakerdeck.com/picopico/ri-30hui-ririsuwoke-neng-nisurupixivkai-fa

## どのようにして Findy Team+フロントエンドチームは高速な開発をしているか 〜開発フロー編〜 - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/04/01/080000

## Fargate Spotを本番運用するための監視の実践 - KAYAC engineers' blog
https://techblog.kayac.com/monitor-fargate-spot-prod

Farget Spot は Amazon ECS で選べるプロバイダの 1 つで、Fargate とは違って予備のコンピュートキャパシティで動作し、安く使用できますが AWS の都合でタスクの中断が発生し得ます。

この記事では、いかにして Spot のタスクの使用率や中断率をモニタリングできるようにしたかが詳しく書かれています。
個人的には、ECS タスクの停止理由を CloudWatch Logs に保存し、そこから Fargate Spot の中断を検出するのが面白いと思いました。

個人のプライベートプロジェクトで運用している ECS でも、この記事を参考にさらなる監視を導入してみます。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

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
