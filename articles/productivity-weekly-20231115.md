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

Organization 全体でのセキュリティアラートの状況を確認できるダッシュボードが Enterprise ユーザーに提供されるようになりました（β）。Enterprise のユーザーであれば Organization のページの Security タブから確認できます[^security_dashboard]。

[^security_dashboard]: 詳しい場所は[ドキュメント参照](https://docs.github.com/en/enterprise-cloud@latest/code-security/security-overview/viewing-security-insights-for-your-organization)

ダッシュボードでは Organization 全体のリポジトリの脆弱性アラートの数とその深刻度の内訳の推移のグラフや、どのリポジトリにどれだけの脆弱性が残っているかの一覧などを確認できます。日々Dependabot の脆弱性アラートに即座に対応することで 0 件を維持するのが理想ではありますが、それなりの数が溜まってしまった場合にどのリポジトリから対応していくかの優先度決めや、対応完了の推移を確認するのに便利そうだと思いました。

GitHub がこういったダッシュボードを提供してくれるのは珍しい印象ですが、自分たちでデータを収集して可視化の基盤を作成しなくても済むのでありがたいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## New – Multi-account search in AWS Resource Explorer | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-multi-account-search-in-aws-resource-explorer/

## AWS CodeBuild の実行環境に AWS Lambda が選択出来るようになりました | DevelopersIO
https://dev.classmethod.jp/articles/codebuild-lambda-compute/

## Amazon CodeCatalyst now supports Terraform
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/amazon-codecatalyst-supports-terraform/

## Deploying sidecar containers to your Cloud Run service is now at general availability (GA). Console UI and CLI are also now available for this feature.
https://cloud.google.com/run/docs/release-notes#November_13_2023

Google Cloud Run のサイドカーコンテナのサポートが GA になりました。公式ドキュメントは[こちら](https://cloud.google.com/run/docs/deploying?hl=ja#sidecars)。
サイドカーコンテナ機能を用いた Cloud Run では HTTPS リクエストを処理する Ingress コンテナと 1 つ以上のサイドカーコンテナが存在します。サイドカーコンテナは外部からの HTTP リクエストを受信できませんが、localhost ポートを使用して Ingress コンテナと通信できます。これにより、アプリケーション用のコンテナとは別に、アプリケーションのモニタリング、ロギング、トレース用のコンテナを配置したり、プロキシコンテナを配置してアプリケーションのトラフィックを制御したりできます。

サイドカーコンテナ機能を用いることで Cloud Run 上でより柔軟で複雑なアプリケーションを実現できるようになるかと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Actions Usage Metrics · Issue #833 · github/roadmap
https://github.com/github/roadmap/issues/833

GitHub Roadmap において  `Actions Usage Metrics` が 2024 Q1 のプロジェクトとしてオープンされています。

Actions におけるワークフローの頻度、期間、および総消費量に関する詳細な情報が提供されるようになるとのことです。これにより、ワークフローの非効率箇所やボトルネック、コストの高いワークフローを特定できるようになりそうです。

ワークフローファイル、リポジトリ、ランナーOS、ランナータイプごとに、詳細を確認できるそうなので、様々な切り口からの最適化に役立ちそうですね。続報を待ちましょう。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

## Talk about CI and testing of the STORES - Speaker Deck
https://speakerdeck.com/hogelog/talk-about-ci-and-testing-of-the-stores

Rails の CI でのテストの改善、特に不安定なテストへの対策や高速化の工夫についての紹介がされています。

主に以下の内容が紹介されていました。

- E2E テストに不安定なテスト対策のためのオプション
- 不安定なテストの集計と可視化
- CI ジョブの並列化 + rspec 自体の並列化によるテスト分割
- プロファイルによる遅いテストの分析、CircleCI Insights の活用

最近、CI でのテスト実行を工夫することで高速化したりコストを最適化する記事をよく見かけるようになってきた気がします。言語やフレームワークによって細かい方法は異なりますが、分割並列実行や必要なテストだけをリトライさせるなどの戦略は共通しているように思うので、違う環境の場合であっても参考にしていきたいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## t_wadaさんと「単体テストの使い方/考え方」の疑問点についてディスカッションしました - DeNA Testing Blog
https://swet.dena.com/entry/2023/11/13/170000

DeNA の SWET チームが [t_wada](https://twitter.com/t_wada) さんをお招きして[「単体テストの使い方/考え方」](https://book.mynavi.jp/ec/products/detail/id=134252)の書籍の内容をテーマにディスカッションした内容を公開されました（なんと羨ましい・・・）。

記事中の議論の内容はどれも自動テストの高いレベルの知識、書籍の深いコンテキストに基づくものだったので書籍すでに読んでいる人向けの内容でした。
（自分は書籍を購入済みであるものの、数ヶ月前にやっと 5 章を読み終えたところな上に大半を忘れてしまっていることも相まって、記事の内容も半分ぐらいしか理解できませんでした・・・）

「単体テストの考え方/使い方」の書籍自体のレベルも高い印象ですが、自動テストに関して深く考えている人達の考えを理解するという意味で書籍も記事もオススメです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Actionsにおける一部環境変数の特殊な可視性について
https://zenn.dev/okazu_dm/articles/583d6821677f64

GitHub Actions の `run` ステップでは GitHub Actions の内部に関する一部の環境変数が公開されていないため、例えば `docker buildx build --cache-to=type=gha,mode=max --cache-from=type=gha` といった本来は GitHub Actions のキャッシュに保存する挙動が正しく動作しないことを解説してる記事です。

実はこの現象自体については解説されていないものの docker の公式ドキュメントでも一応触れられており、今回の記事中でも紹介されている [crazy-max/ghaction-github-runtime](https://github.com/crazy-max/ghaction-github-runtime) を利用することでこの問題を解決可能であることが書かれています。

https://docs.docker.com/build/cache/backends/gha/#authentication

今回の記事ではこの問題が発生するそもそも理由と、 `crazy-max/ghaction-github-runtime` を利用するとなぜそれが解決されるのかについて詳しく解説されています。GitHub Actions の深淵に興味がある方はぜひ読んでみてください。

ちなみに、この問題は `run` のステップの中で自分で `docker buildx build --cache-to=type=gha,mode=max --cache-from=type=gha` のようなコマンドを実行した場合のみ発生する問題です。 `docker buildx build` を簡単に実行できるようにした [docker/build-push-action](https://github.com/docker/build-push-action) を利用している場合にはこの問題は発生しません。このようなコマンドをラップした Action を利用したいかどうかは好みの問題ですが、GitHub Actions と密に関連した機能の場合はこういった問題が発生することもあることを覚えておくと良いかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

<!-- textlint-disable prh -->

## Github Actions Security Best Practices - Salesforce Engineering Blog
https://engineering.salesforce.com/github-actions-security-best-practices-b8f9df5c75f5/

セールスフォース社のエンジニアリングブログにて、GitHub Actions のセキュリティに関するベストプラクティスが紹介されています。

まず、GitHub Actions において、以下の懸念を挙げています。

- サードパーティのアクション：使用されるサードパーティのアクションによっては、悪意のあるコードが実行される可能性がある
- シークレットおよびその他の機密情報：アクションはシークレットへのアクセスが必要になる場合があり、これらは安全に保存し、安全に参照する必要がある
- ワークフロー実行の副産物：ワークフロー実行の副産物（アーティファクト、キャッシュ）へのアクセスは監査されるべき
- フォークされたリポジトリ：フォークされたリポジトリを通じたログやシークレットへのアクセスは検討されるべき
- 悪意のある Docker image：アクションは悪意のある Docker image 上で構築される可能性がある
- サービスコンテナ：デフォルトの認証情報の使用とサービスコンテナ（redis、postgres）へのアクセスは監査されるべき
- ワークフローコマンド：ワークフローで使用されるコマンドは、期待される通りに機能しない可能性がある
- セルフホストランナーの不適切な設定：アクションを通じてランナー（リモートコード実行、特権昇格）への攻撃は、組織の環境内での横方向の移動につながる可能性がある
- アクション内のサードパーティ製品の脆弱性：アクションに使用されるパッケージには、複数のオープンソースの脆弱性が存在する可能性がある

これらの懸念に対して、ベストプラクティスを公開しています。ここではその一部を紹介します。

### サードパーティアクションの利用

以下の基準でアクションを利用することを検討する。

- https://github.com/actions にある GitHub 公式アクションを利用するべき
- GitHub に verify されているアクションを利用するべき
- 信頼できるベンダーや組織が提供するべき

それでもサードパーティのアクションを利用するならば、使用前にセキュリティ評価やコードレビューを実施すること。

### セキュアなワークフローの記述

- ワークフローファイルでアクションを呼び出す際は、安定したバージョンタグまたはコミットハッシュで指定し、`@master` タグは使わない
  - Good: `actions/checkout@v2`, `actions/download-artifact@1de1dea89c32dcb1f37183c96fe85cfe067b682a`
  - Bad: `actions/checkout@master`
- Docker コンテナでジョブを実行する際には、公式または Docker 認定のイメージのみを使用する
- Docker image を pull する際には、バージョンタグ（できればメジャーバージョン）を使用する
  - 例： `node:10`
  - `node:latest` よりもバージョンタグが推奨される
- ワークフローログで機密値がプレーンテキストとして表示されないようにするために `add::mask` コマンドを使用しない
  - 環境変数と一緒に使用すると、プレーンテキストの値がログに実行環境の一部として表示される
    - 訳注：[こちらの記事](https://zenn.dev/hankei6km/articles/add-mask-command-in-github-actions#%E3%82%A2%E3%83%B3%E3%83%81%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%EF%BC%9F)が参考になります
- `GITHUB_` という接頭辞がつく GitHub のデフォルト変数を上書きしない
- キャッシュパス内のファイルにアクセストークンなどの機密値を保存しない
  - キャッシュに `<home>/.docker/config.json` ファイルを含めない。このファイルには暗号化されていない `Docker` の資格情報が含まれる可能性がある
- キャッシュを識別するユニークなキーを作成するために、コンテキストデータを使用する
  - しかし、`github.token` や `github.actor` などの機密値をキー生成に使用しない
  - 代わりに、`runner.os` などのシステム関連情報と組み合わせて、`requirements.txt` や `package-lock.json` などのファイルのハッシュを使用する
- 機密情報を含む可能性があるため、github context データをログにダンプしない
- リポジトリへのアクセス権を持つ人なら誰でも利用できるため、アーティファクトに機密情報を保存しない
- アーティファクトは 90 日後に自動的に削除されるため、その時間を超えて必要な場合は、安全に S3 バケットにアップロードする
- [ジョブ実行の制限](https://docs.github.com/en/actions/reference/usage-limits-billing-and-administration#usage-limits)に注意
- 外部のコラボレーターを追加する際には注意が必要
  - 読み取り権限を持つユーザーは、ワークフローの失敗に関するログを表示し、ワークフローの履歴を表示し、ログを検索してダウンロードすることができる
  - リポジトリへの書き込みアクセス権を持つ外部のコラボレーターは、`GITHUB_TOKEN` に関連する権限を変更できる
    - これにより権限が拡大し、他の攻撃の可能性が生じる
  - 外部のコラボレーターを追加する必要がある場合は、最小限の権限の原則に従い、最小限の開示のために読み取り権限のみを割り当てる

この他にも GitHub Secrets の安全な使用方法や、Organization やリポジトリレベルの便利な設定などが紹介されています。
GitHub Actions を利用する方は一度目を通しておくべき内容だと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

<!-- textlint-enable prh -->

## A Comprehensive Guide to Testing in Terraform: Keep your tests, validations, checks, and policies in order :: mattias.engineer a blog about cloud architecture and development
https://mattias.engineer/posts/terraform-testing-and-validation/

Terraform v1.5 で導入された `check` ブロックや v1.6 で導入された `terraform test` を交えた Terraform のテストと検証に関する記事です。

`check`, `validation` ブロックや  `test` コマンドで、サードパーティのツールを使用せず、HCL で完結したテストと検証を実現できるようになりました。
この記事では、これらの機能を使ったテストと検証の実装方法や、それぞれの違いについて解説しています。

サンプルコードとパラメータの説明が充実しているので、最近の Terraform のテストと検証について追えていない方におすすめです。

自分は `precondition`, `postcondition` ブロックについて知らなかったので、これらのブロックを使ったテストの実装方法が参考になりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 内部実装から理解するRenovateの処理の流れ - orangain flavor
https://orangain.hatenablog.com/entry/renovate-execution-steps

依存関係更新プルリクエストを作ってくれる Renovate が内部的にどういう流れで動いているかを解説した記事です。
著者が Renovate のドキュメントや実行時ログ、ソースコードを元に、分析した内容が書かれています。

記事では Renovate の処理を大きく 3 つのフェーズに分類し、コア部分となるリポジトリごとの処理フェーズではさらに大まかな処理ごとに内容を説明してくれています。
該当するソースコードのリンクも合わせて記述されており、もっと深掘りしたい場合はリンクを辿っていけて良いです。

Renovate の内部処理を知ることで、設定した config で想定通りに動かなかった場合や、Renovate を利用したツールを作る際などに役立ちます。ログを読む能力も付くと僕は考えています。

簡潔にまとめられており、とても読みやすくわかりやすい記事でした。Renovate の動作に興味がある方や、Renovate がうまく動かなくて困った方は読んでみるのをオススメします。

:::message
ちなみに、記事の公開は 2023/08/03 で最近の記事ではないのですが、エゴサしてたら僕の記事（[Renovate config の変更が想定通りか確認する 〜真の dry-run を求めて〜](https://zenn.dev/cybozu_ept/articles/compare-renovate-dry-run)）が参考にされていたため見つけることができました。

自分の書いた記事が役に立ってくれて嬉しいですね。
:::

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

