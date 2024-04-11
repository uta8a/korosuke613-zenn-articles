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
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
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

Terraform がスタイルガイドを公開しました。スタイルガイドは 2 つのセクションに分かれています。

最初のセクションでは、書式やリソースの構成などコードのスタイルに関する推奨事項が扱われています。
例えば、リソースの命名規則、定義の順序、コメントの書き方などが解説されています。

2 つ目のセクションでは、ライフサイクル管理、バージョン管理、機密データ管理など、運用とワークフローに関する推奨事項が扱われています。
例えば、プロバイダ・モジュールのバージョンを固定することやシークレットの管理方法などが解説されています。
v1.6 から導入された `terraform test` における Unit Test にも触れられています。

全体として、違和感がある内容は無く、リソース定義の順序や `description` と `validation` はちゃんと書かねば…という気持ちになりました。

これまで、有力な Terraform のスタイルガイドは [Google Cloud が公開しているもの](https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja)しかありませんでした。
公式でスタイルガイドが公開されたことでクラウドベンダーに依らないスタイルが統一されそうでいいですね。

次の記事では日本語で要約を書いてくださっているので、英語がつらい場合はこちらを見るとよさそうです。
https://qiita.com/ogatango/items/9cd57fe8c48b1c03b2bd

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Copilot Enterprise - March 2024 update - The GitHub Blog
https://github.blog/changelog/2024-03-29-github-copilot-enterprise-march-2024-update/

## デジタル社会推進標準ガイドラインに CI／CDパイプラインにおけるセキュリティの留意点に関する技術レポートが追加されました
https://www.digital.go.jp/resources/standard_guidelines

デジタル庁から [CI/CD パイプラインにおけるセキュリティの留意点に関する技術レポート](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/33f31336/20240329_resources_standard_guidelines_guideline_01.pdf)が公開されています。

近年のアジャイル的な開発手法の普及により、迅速な変更要求に応えて効率的に変更差分をリリースできる体制が求められ、それに伴い CI/CD パイプラインの重要性が高まっています。
CI/CD パイプラインは高い権限を持つため、セキュリティの観点からも注意が必要です。そこで、本レポートではローカル作業フェーズ、ビルドフェーズ、デリバリフェーズの 3 つのフェーズに分けて、それぞれのフェーズでのセキュリティの留意点を解説しています。

最小権限の原則やトークンの管理とローテーションなど基本的なセキュリティ対策から、OpenID Connect を用いるべきといった具体的なアドバイスまで幅広くカバーしています。
CI/CD パイプラインを構築する人は必読の内容です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Linux Foundation Launches Open Source Valkey Community
https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community

# know-how 🎓

## The Wrong Way to Use DORA Metrics - The New Stack
https://thenewstack.io/the-wrong-way-to-use-dora-metrics/

近年、組織の開発生産性指標としてよく使われる DORA Metrics(Four Keys) が定着してきました。
Four Keys に基づいて組織の課題を把握したり、改善活動を行うことがあると思います。
その際に気をつけるべき誤用やメトリクスハック・キャンベルの法則などについて、具体例を交えて解説されており、分かりやすかったです。

パフォーマンスが良い組織は Four Keys 指標が高くても、逆に Four Keys 指標が高いからといってパフォーマンスが良いわけでは無かったり、Four Keys 指標が悪くてもビジネス的価値を生み出している場合もあるということには注意しておきたいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 一日30回リリースを可能にするpixiv開発 - Speaker Deck
https://speakerdeck.com/picopico/ri-30hui-ririsuwoke-neng-nisurupixivkai-fa

## どのようにして Findy Team+フロントエンドチームは高速な開発をしているか 〜開発フロー編〜 - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/04/01/080000

## Fargate Spotを本番運用するための監視の実践 - KAYAC engineers' blog
https://techblog.kayac.com/monitor-fargate-spot-prod

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
