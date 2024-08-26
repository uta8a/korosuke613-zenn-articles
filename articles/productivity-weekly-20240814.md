---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-08-14,08-07)
emoji: 🕯️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240814
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
今週は 2024-08-14, 2024-08-07 合併号です。

今回が第 162 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Docker ビルドチェックの紹介: ベストプラクティスによるDockerfileの最適化 | Docker
https://www.docker.com/ja-jp/blog/introducing-docker-build-checks/

## Revised release plan for Copilot subscription-based network routing - The GitHub Blog
https://github.blog/changelog/2024-08-06-revised-release-plan-for-copilot-subscription-based-network-routing/

## What’s new with GitHub Copilot: July 2024 - The GitHub Blog
https://github.blog/ai-and-ml/github-copilot/whats-new-with-github-copilot-july-2024/

## GitHub Copilot Chat and pull request summaries are now powered by GPT-4o - The GitHub Blog
https://github.blog/changelog/2024-07-31-github-copilot-chat-and-pull-request-summaries-are-now-powered-by-gpt-4o/

## Enterprise Team Metrics Now Available on the Copilot Metrics API - GitHub Changelog
https://github.blog/changelog/2024-08-08-enterprise-team-metrics-now-available-on-the-copilot-metrics-api/

Copilot Metrics API Organization Team Metrics - GitHub Changelog
https://github.blog/changelog/2024-08-09-copilot-metrics-api-organization-team-metrics/

## Sign-up for the GitHub Copilot Extensions waitlist - GitHub Changelog
https://github.blog/changelog/2024-08-13-sign-up-for-the-github-copilot-extensions-waitlist/

## GitHub Modelsのご紹介：GitHub上に新世代AIエンジニアを - GitHubブログ
https://github.blog/jp/2024-08-02-introducing-github-models/

## Introducing Structured Outputs in the API | OpenAI
https://openai.com/index/introducing-structured-outputs-in-the-api/

## Enhanced Repo Insights Views - GitHub Changelog
https://github.blog/changelog/2024-08-12-enhanced-repo-insights-views/

## 【新機能】BigQuery で JSON オブジェクトのキーの一覧を取得できるようになりました | DevelopersIO
https://dev.classmethod.jp/articles/gcp-bigquery-json-object-keys/

## Go 1.23 Release Notes
https://go.dev/doc/go1.23

## AWS Weekly Roundup: Amazon Q Business, AWS CloudFormation, Amazon WorkSpaces update, and more (Aug 5, 2024) | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/aws-weekly-roundup-amazon-q-business-aws-cloudformation-amazon-workspaces-update-and-more-aug-5-2024/

## Publication Free でもメンバー同士の記事レビューを体験できるようになりました | What's New in Zenn
https://info.zenn.dev/2024-08-05-publication-free-review

# know-how 🎓

## GitHub Actions arm runnerはじめました - KAKEHASHI Tech Blog
https://kakehashi-dev.hatenablog.com/entry/2024/08/05/100000

GitHub Actions の larger runner において、パブリックベータとなった Arm ランナーのメリット・デメリットについて紹介しています。
メリットとしては x86 の同性能のランナーと比較して 37% 料金が安いこと、Arm アーキテクチャ用のアプリケーションのビルドがネイティブに行えるため高速化が期待できることです。
ちなみに、チームメンバーの @miyajan が Arm ランナーで Docker マルチプラットフォームビルドを検証してくださっていますので、[こちら](https://zenn.dev/cybozu_ept/articles/build-multi-platform-image-with-arm64-runner)も合わせてご覧ください。注意点としては、Arm バイナリが提供されていないツールやライブラリ、Action を利用している場合は、そのままではワークフローを利用できないことがあるため、事前に確認が必要です。

larger runner なので Team または Enterprise プランが必要ですが、利用できる場合はメリットが大きいので、ぜひ検討してみてください。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Terraformでセキュアに開発するwith 1Password - スタディスト Tech Blog
https://studist.tech/terraform-1password-dev-87891a4497af

ローカル端末から Terraform コマンドを実行する際の認証情報の管理について、1Password CLI を利用してセキュアに管理する方法を紹介しています。
具体的には、1Password CLI を利用してシークレットを取得するコマンドを、direnv の `.envrc` に記述することで、ディレクトリ事に環境変数への export と unset を自動化しつつ、ローカル端末のクリップボードや history に認証情報が残らないようにしています。

自分は 1Password CLI で都度コマンドを実行していたので、direnv と組み合わせるのはなるほどなと思い参考にさせていただきました。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ChatGPTを活用したブログレビューシステム | QualiArtsエンジニアブログ
https://technote.qualiarts.jp/article/79/

GitHub で記事を管理している技術ブログにおいて、GitHub Actions で ChatGPT を利用したレビューの仕組みを導入した事例を紹介しています。
数ある LLM のうち、なぜ ChatGPT を選択したのか選定理由や、ChatGPT に送るプロンプト、リクエストのパラメータも共有されており参考になります。レビュー結果はプルリクエストの suggestion として表示させるのが、地味にレビュイー体験が向上するポイントですね。

実はこの Productivity Weekly も AI レビューを導入していて、かなり似た構成で運用しています。そちらについては @korosuke613 が記事を書いているので、興味がある方は[こちら](https://zenn.dev/cybozu_ept/articles/ai-blog-review-on-github)をご覧ください。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## E2Eテストの部分実行によるテスト時間短縮 - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2024/08/13/110000

サイボウズの kintone 開発チームにおける E2E テストの部分実行によるテスト時間短縮の取り組みについて紹介しています。
Gradle の TestFilter には `includeTestsMatching` という機能があり、これを利用してテストクラスやメソッドを指定して部分実行することで、テスト時間を短縮しています。
機能ごとにテストを実行する仕組みを導入できた理由として、プロダクトが大きくなったことに伴い機能ごとにサブチームに分割しており、さらにそれぞれのサブチーム内に QA がテストを整理していたことを挙げています。今回の取り組みではフロントエンドのでのテスト部分実行について述べられており、今後の課題として、サーバーサイドのテストにも適用できるかどうかが挙げられています。次回作が楽しみです。

 _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## プラットフォームエンジニアリングのためのセルフサービス基盤の実装 | ドクセル
https://www.docswell.com/s/yaegashi/KN1R1G-gamt4

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
