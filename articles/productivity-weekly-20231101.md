---
title: "＜ここにタイトルを入力＞：Productivity Weekly (2023-11-01号)"
emoji: "🎴"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231101"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-01 単独号です。

今回が第 131 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Accelerate your CI/CD with Arm-based hosted runners in GitHub Actions - The GitHub Blog
https://github.blog/changelog/2023-10-30-accelerate-your-ci-cd-with-arm-based-hosted-runners-in-github-actions/

## Run your ML workloads on GitHub Actions with GPU runners - The GitHub Blog
https://github.blog/changelog/2023-10-31-run-your-ml-workloads-on-github-actions-with-gpu-runners/


## Serverless Framework V4: A New Model
https://www.serverless.com/blog/serverless-framework-v4-a-new-model

今後リリースされる Serverless Framework v4 の紹介記事です。Serverless Framework v4 で予定していることが載っています。

- 破壊的変更無し
- FaaS とサーバーレスコンテナを簡単に切り替えられる
- 新たに Serverless Framework を拡張するエクステンションが登場
- 重要なエクステンションのコントリビューターには報酬が支払われる
- 年間収益が 200 万ドルを超える組織で利用する場合は有料になる
- 新しいパートナープログラムの提供

色々気になるトピックはありますが、特に利用者に影響があるのは年間収益が 200 万ドルを超える組織で利用する場合は有料となる点です。
（「FaaS とサーバーレスコンテナを簡単に切り替えられる」の部分は詳細が気になるところですが、まだ詳細は発表されていません。エクステンションは雑に言うとコンテナ化されたプラグインっぽい）

> **New Fee Structure**: For organizations with annual revenue exceeding $2M, we're introducing some fees that apply to V.4 and beyond. We're a small team. We need to fuel further innovation, and this is a step in that direction. This also helps kick-start a new ecosystem.

今後の価格変更については詳細に色々載っています（ただし具体的な計算方法はまだ）。

- v3 は無料のまま
- v3 は 2024 年まで保守が継続される
- インスタンスとエクステンションの数に応じて段階的に料金が設定される
  - インスタンスはデプロイされた Serverless Framework を指す（AWS アカウント ID、service、stage、region のセット）
    - 当月内で 5 日以上デプロイされた状態にある場合のみ適用
  - エクステンションは v4 からの新しい概念
- 最低の月額料金は $49 から
- ボリュームライセンスが提供される

まだ実際に v4 がリリースされたわけではないので、記事に載っている内容は変更される可能性があります。
また、具体的な課金の計算方法が不明瞭であるなど、今後新たな情報が出ることが予想されます。
料金計算が面倒になるなら人為的コストを減らすために他のツールに移行するや、v3 を独自に保守するという選択肢もあるかもしれませんね。

身構えつつ v4 のリリースをお祝いしたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Requiring workflows with rulesets now supports the pull_request_target trigger - The GitHub Blog
https://github.blog/changelog/2023-10-26-requiring-workflows-with-rulesets-now-supports-the-pull_request_target-trigger/

## Dependabot user-defined rules for security updates and alerts; enforcement of auto-triage rules and presets for organizations (public beta) - The GitHub Blog
https://github.blog/changelog/2023-10-26-dependabot-user-defined-rules-for-security-updates-and-alerts-enforcement-of-auto-triage-rules-and-presets-for-organizations-public-beta/

## Introducing HAR Sanitizer: secure HAR sharing
https://blog.cloudflare.com/introducing-har-sanitizer-secure-har-sharing/

## Announcing remote cache support in Amazon ECR for BuildKit clients | Containers
https://aws.amazon.com/jp/blogs/containers/announcing-remote-cache-support-in-amazon-ecr-for-buildkit-clients/

# know-how 🎓

## RailsアプリのCI高速化
https://r7kamura.com/articles/2023-10-31-rails-ci

Rails アプリの CI にかかる時間を 8 分から 3 分半に短縮するまでに行った改善が書かれています。

以下のように地道な改善がなされています。

- Larger runner の利用
- テストを並列に実行するために [`parallel_tests`](https://github.com/grosser/parallel_tests) を利用
- [`r7kamura/split-tests-by-timings`](https://github.com/r7kamura/split-tests-by-timings) を用いたテスト配分の調整
- GitHub Container Registry を利用してカスタムの Docker イメージを持ってくることで依存関係のインストールを skip する
- gem group を整理して、ジョブで必要な gem のみインストールする

「テストを並列に行う」「依存関係は事前にまとめておく」「そのジョブで必要な依存のみを入れる」など、Rails 以外の場面でも大切な CI 高速化 Tips が書かれています。
Rails アプリ開発者の方も、そうでない方もぜひ参考にしてみてはいかがでしょうか。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Four Keysと開発生産性について取り組んできたこと - Chatwork Creator's Note
https://creators-note.chatwork.com/entry/four_keys_and_dev_productivity

## [プレビュー]Google CloudリソースをTerraformにエクスポートしてみた。(+Cloud ConsoleからリソースのHCLを確認する小ネタ) | DevelopersIO
https://dev.classmethod.jp/articles/202310_googlecloud_exporthcl/

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->
