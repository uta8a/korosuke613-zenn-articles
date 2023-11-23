---
title: "GitHub Universe 2023 開催！：Productivity Weekly (2023-11-15号)"
emoji: "🧑‍🎨"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231115"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-15 単独号です。

今回が第 133 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Universe 2023: CopilotがGitHubをAIを駆使した開発者プラットフォームへと変貌させる - GitHubブログ
https://github.blog/jp/2023-11-09-universe-2023-copilot-transforms-github-into-the-ai-powered-developer-platform/

毎年恒例 GitHub Universe 2023 が先日開かれました。GitHub Copilot に関する新発表が多くありました。
上記記事は GitHub Japan による Universe 2023 の日本語まとめ記事です。
主に次のようなことが書かれていました。

- **GitHub Copilot Chat が 2023 年 12 月に GA 予定**
  - GA に伴い、次の機能改善がされる
    - GPT-4 モデルの利用
    - JetBrains IDE 対応
- **GitHub Copilot Chat が GitHub.com と GitHub Mobile で使えるように (要 waiting list 登録)**
  - GitHub.com 上のリポジトリやドキュメントについて Copilot Chat に手軽に質問できるようになる
  - おそらく waitlist は `Join the GitHub Copilot code referencing waitlist` になる
    - 残念ながら Copilot Business ユーザは対象外
    - > As a Copilot Business user, you are not currently eligible to join the waitlist.
- **GitHub Copilot Enterprise が登場（要 waiting list 登録）**
  - 内部コードベース全体を把握したり PR のレビューやサマリー作成ができるように
  - 価格は驚異の $39/user/month（！）
  - 2024 年 2 月に GA 予定
- **GitHub Copilot をサードパーティツールやサービスと統合する GitHub Copilot パートナープログラム登場**
  - 早くも HashiCorp や Datadog などの 25 社以上を最初のパートナーとしてスタート予定とのこと
- **GitHub Advanced Security で AI を活用（要 waiting list 登録）**
  - Code scanning の自動修正や AI によるスキャンなど
- **GitHub Copilot Workspace 登場（2024 年提供予定）**
  - Issue を元にコードを書いてくれる夢のような機能
  - まずは実装方針を示し、承認したら PR を作成するっぽい
  - しかもビルド、実行、テストも自動で行ってくれるとか（？）

だいぶ夢のある発表でしたね。特に GitHub Copilot Workspace はワクワクが止まりません。
GitHub Copilot Enterprise は流石に高すぎないか？とちょっと思いましたが使ってみたいですね。Business と併用して一部のユーザにのみ適用できたら安く抑えられそうですが...

今回の発表ではこういう未来が待っているという内容が多く、今すぐ使えるものは少なかったです。
早く使えるようになりたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Copilot in the CLI now in public beta - The GitHub Blog
https://github.blog/changelog/2023-11-08-github-copilot-in-the-cli-now-in-public-beta/

[これまで private beta だった GitHub Copilot CLI](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221207?redirected=1#github-next-%7C-github-copilot-cli) が public beta になりました。正式名称は GitHub Copilot in the CLI となるようです。

public beta にあたり、これまで npm でインストールする必要があったものが GitHub CLI 拡張機能として提供されるようになりました。
private beta とは違い、GitHub.com の設定から `GitHub Copilot in the CLI` の利用を有効化する必要があります。もし Copilot Business ユーザであるなら、管理者による操作が必要です。

private beta 時代から触っていますが、たまにシェル芸をしたいときに役立ちます。気になる方は使ってみましょう。

:::message
なお、private beta 時代の Copilot CLI は 2023/11/23 時点でまだ利用可能ですが、12/15 でテクニカルプレビューを終了する旨のメールが届きました。

> We want to let you know that on December 15th, we will conclude the following GitHub Next technical previews:
>
> - GitHub Copilot Labs
> - Copilot in the CLI
> - Copilot for Docs
> - Copilot for Pull Requests
> - GitHub Blocks

Docs、Pull Requests なども終了するようですね（結局 waiting list のまま使えなかった）。
「テクニカルプレビュー終了＝利用できなくなる」かはわかりませんが、覚悟の準備をしておきましょう。
:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Code security insights on the organization-level Security tab (Beta) - The GitHub Blog
https://github.blog/changelog/2023-11-08-code-security-insights-on-the-organization-level-security-tab-beta/

## New – Multi-account search in AWS Resource Explorer | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-multi-account-search-in-aws-resource-explorer/

## AWS CodeBuild の実行環境に AWS Lambda が選択出来るようになりました | DevelopersIO
https://dev.classmethod.jp/articles/codebuild-lambda-compute/

## Amazon CodeCatalyst now supports Terraform
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/amazon-codecatalyst-supports-terraform/

## Deploying sidecar containers to your Cloud Run service is now at general availability (GA). Console UI and CLI are also now available for this feature.
https://cloud.google.com/run/docs/release-notes#November_13_2023

## Actions Usage Metrics · Issue #833 · github/roadmap
https://github.com/github/roadmap/issues/833

# know-how 🎓

## Talk about CI and testing of the STORES - Speaker Deck
https://speakerdeck.com/hogelog/talk-about-ci-and-testing-of-the-stores

## t_wadaさんと「単体テストの使い方/考え方」の疑問点についてディスカッションしました - DeNA Testing Blog
https://swet.dena.com/entry/2023/11/13/170000

## GitHub Actionsにおける一部環境変数の特殊な可視性について
https://zenn.dev/okazu_dm/articles/583d6821677f64

<!-- textlint-disable prh -->

## Github Actions Security Best Practices - Salesforce Engineering Blog
https://engineering.salesforce.com/github-actions-security-best-practices-b8f9df5c75f5/

<!-- textlint-enable prh -->

## A Comprehensive Guide to Testing in Terraform: Keep your tests, validations, checks, and policies in order :: mattias.engineer a blog about cloud architecture and development
https://mattias.engineer/posts/terraform-testing-and-validation/

## 内部実装から理解するRenovateの処理の流れ - orangain flavor
https://orangain.hatenablog.com/entry/renovate-execution-steps

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# tool 🔨

## Introducing GPTs
https://openai.com/blog/introducing-gpts

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

