---
title: "Productivity Weekly (2023-10-04号)"
emoji: "🐑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined:
  {
    "publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231004",
  }
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-04 単独号です。

今回が第 127 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。

- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## GitHub Actions: Apple silicon (M1) macOS runners are now available in public beta! - The GitHub Blog

https://github.blog/changelog/2023-10-02-github-actions-apple-silicon-m1-macos-runners-are-now-available-in-public-beta/

GitHub Actions でやっと Apple Silicon（M1）のランナーが利用可能になりました。ただし Larger runner なので通常の macOS ランナーとは異なり無料枠はありません。[値段](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates)を見ると従来の macOS の Larger runner であった Intel 12 コアより割高な値段設定に見えるのですが、実はこのタイミングで Intel 12 コアの値段が下がっているので[^mac_price_diff]新しい M1 は Intel 12 コアの従来の価格設定と比べると半額の$0.16/分になっています。

[^mac_price_diff]: 値段変化の diff: https://github.com/github/docs/commit/76f7e40122db0ba541ce6729596287ab08b22d0a

通常の macOS ランナーと比べると割高ではありますが、Apple Silicon のアーキテクチャになったことで Xcode ビルドなどにかかる時間が短縮されれば課金される時間も短くなるため、実際に使ってみてコスト検証してみると良いでしょう。

ちなみに細かい注意点として新しい Larger runner が Apple Silicon アーキテクチャであることに由来してコミュニティ製の action が動く保証はなかったり、ネストされた仮想化は不可能といった制限があるようです。
https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners/about-larger-runners#limitations-for-macos-larger-runners

弊チームの [@miyajan](https://zenn.dev/miyajan) が Arm アーキテクチャの docker が使えることを期待して試したのですが、残念ながら使えなかったことを[discussion にて報告](https://github.com/orgs/community/discussions/69211#discussioncomment-7197681)したところ返信の中で仮想化の制約について言及されていました。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## How GitHub uses GitHub Actions and Actions larger runners to build and test GitHub.com - The GitHub Blog

https://github.blog/2023-09-26-how-github-uses-github-actions-and-actions-larger-runners-to-build-and-test-github-com/

GitHub 社自身の CI に Larger Runner を活用するためにどのような機能を追加していったかの記事です。その中で GitHub 社の CI の要件に合うようにいくつかの機能を追加したという内容ですが、自分の知る限りでは一般向けには初出の機能がいくつか存在したので面白い記事でした。

#### VM のカスタムイメージ

ランナーには元々様々なツールがプリインストールされていますが、足りないツールを追加でインストールする必要がある場合は CI の時間を消費してしまいます。そこで GitHub の CI に必要なツールや、ソースコードやビルドアーティファクトをキャッシュとして初めから追加済みのカスタム VM イメージを用意しておくことで今まで 50 分かかっていたワークフローを 12 分まで短縮できたようです。

このカスタム VM イメージに関しては、公開ロードマップの issue として一般向けにも公開されていました。
https://github.com/github/roadmap/issues/826

#### 前ビルドの結果を使ってスキップ

前回のビルドからファイルの中身が変わっていない場合、再度ビルドしても同じ結果になるはずであることから前回ビルドで生成された内容を再利用することで実際の CI 実行をスキップさせたようです。これにより 1 日あたり 300 から 500 のワークフロー実行が節約されたとのことです。

これについて自分の感想としては、最近のビルドツールに搭載されている[ファイルのハッシュ値などを見て変化がなければ自動でスキップする機能](https://monorepo.tools/#local-computation-caching)と同様だと思いました。今でもこれらのビルドツールを利用すれば同様のことは可能ですが、もしも GitHub Actions 自体にこういった機能が組み込まれたら相当に便利だと思います。自分の記憶では今回が初出の機能ですが、ぜひ一般向けにも公開されることを期待したいです。

#### OIDC でプライベートネットワークに接続

Larger runner は GitHub 社の社内ネットワークとは隔離されたところで動いているため、社内ネットワークへ疎通させるために GitHub Actions 内で生成した OIDC トークンを使って社内ネットワークへのゲートウェイ認証しているとのことです。これを実現するための[サンプルリポジトリ](https://github.com/github/actions-oidc-gateway-example)も公開されてます。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Release 6.0.0: Introducing Renovate Community Edition and Renovate Enterprise Edition · mend/renovate-ce-ee

https://github.com/mend/renovate-ce-ee/releases/tag/6.0.0

Renovate CE/EE 登場。

マイグレーション
https://github.com/mend/renovate-ce-ee/blob/6.0.0/docs/migrating-to-renovate-ce.md

compose.yaml
https://github.com/mend/renovate-ce-ee/blob/6.0.0/examples/docker-compose-github.yml

## Release v1.3.0 · actions/create-github-app-token

https://github.com/actions/create-github-app-token/releases/tag/v1.3.0

先日、GitHub 公式で GitHub Apps のトークンを払い出すアクション actions/create-github-app-token が公開された件を[紹介しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230913?redirected=1#actions%2Fcreate-github-app-token%3A-github-action-for-creating-a-github-app-installation-access-token)。その際、アクションを実行しているリポジトリのオーナーに関する権限しか取得できない話をしました。

> ただ、v1.2.1 時点だと、[アクションを実行しているリポジトリのオーナーに関する権限しか取れない](https://github.com/actions/create-github-app-token/issues/4)ようです。トークンを取得したいオーナーが異なる場合は、機能追加されるまで 3rd party アクションを利用するのが良さそうです。

しかし、v1.3.0 で対象 owner を変更できるようになりました。また、対象リポジトリも指定することで、権限に制限をかけられるようになりました。
新たに追加された inputs は `owner` と `repositories` です。

- `owner`
  - App のインストール先の owner を指定する
  - 空の場合は、現在のリポジトリの owner が指定される
- `repositories`: Optional: Comma-separated list of repositories to grant access to. If empty, defaults to all repositories. If owner is set and repositories is empty, access will be scoped to all repositories in the provided repository owner's installation. If owner and repositories are empty, access will be scoped to only the current repository.
  - App にアクセス権限を与えるリポジトリを指定する
  - `owner` が指定されており、`repositories` が空の場合は、`owner` の全てのインストールされたリポジトリが対象になる
  - `owner` と `repositories` が空の場合は、現在のリポジトリのみが対象になる

詳しくは [v1.3.0 の README.md](https://github.com/actions/create-github-app-token/tree/v1.3.0?tab=readme-ov-file#inputs) を参照ください。

他の owner のトークンが払い出せるようになったりリポジトリの制限ができるようになったりと、かなり便利になりましたね。
ちなみに、本項目執筆時点では v1.4.0 と v1.5.0 がすでにリリースされています。

- [v1.4.0](https://github.com/actions/create-github-app-token/releases/tag/v1.4.0)
  - `inputs.skip_token_revoke` でジョブ終了時にトークンを revoke するかの制御ができるようになりました
- [v1.5.0](https://github.com/actions/create-github-app-token/releases/tag/v1.5.0)
  - `inputs` の各パラメータ名で `-` 区切りが推奨になりました（例: `skip-token-revoke`）
  - `_` 区切りも引き続き使えますが、非推奨のメッセージが出るようです
  - 気づいたら `-` 区切りにするのが良さそうです

皆さんもどんどん公式アクションに置き換えていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## npm provenance general availability - The GitHub Blog

https://github.blog/changelog/2023-09-26-npm-provenance-general-availability/

[半年前に public beta として登場した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426?redirected=1#npm-provenance-public-beta-%7C-github-changelog) `npm provenance` が GA になりました。また、登場当初は GitHub Actions のみ対応されていましたが、他の CI サービスとして GitLab CI/CD でも対応されました。

GitHub Actions、GitLab CI/CD から npm に publish している人は npm publish --provenance していきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 「サーバーレス VPC アクセス コネクタ」 から 「ダイレクト VPC」へ置き換えてみました

https://zenn.dev/rescuenow/articles/c694cbacd34039

前もウィで話題になってた GCP の Direct VPC がプレビューになったらしい．
サーバーレス VPC アクセス コネクタからの移行の記事も出てた．
はよ GA になってほしいね．

## Amazon Bedrock Is Now Generally Available – Build and Scale Generative AI Applications with Foundation Models | AWS News Blog

https://aws.amazon.com/jp/blogs/aws/amazon-bedrock-is-now-generally-available-build-and-scale-generative-ai-applications-with-foundation-models/
AWS での生成系 AI のリソースが出た話。

Workers AI: serverless GPU-powered inference on Cloudflare’s global network
https://blog.cloudflare.com/workers-ai/
Cloudflare もエッジで AI 走らせるやつが来ましたね。

# know-how 🎓

## Technology Radar Vol.29 が公開

https://www.thoughtworks.com/radar

PDF へのリンク: https://www.thoughtworks.com/content/dam/thoughtworks/documents/radar/2023/09/tr_technology_radar_vol_29_en.pdf

毎度おなじみ、Thoughtworks 社の Technology Radar、最新の Vol.29 が公開されました。

Technology Radar の読み方を知らない人は次の記事が参考になります。

- [テクノロジーレーダーをざっと読んだので紹介](https://zenn.dev/miyataka/articles/technology-radar-vol-27)

全部紹介すると時間がないので、平木場が気になったものをピックアップします。

- Technique
  - Trial（追求する価値はある）
    - **New**) Automatic merging of dependency update PRs
      - 適切な状況下（あらゆるテストが実行されている、広範なカバレッジを得ている、セキュリティスキャンを経ている、など）では Renovate や Dependabot による依存関係の更新 PR は自動的にマージされるようにしよう
    - **New**) Provision monitors and alerts with Terraform
      - Splunk や Datadog などのモニタリングツールの設定を Terraform で管理しよう
    - **New**) Unit testing for alerting rules
      - アラートルールをユニットテストしよう。Prometheus はユニットテストツールをサポートしてるよ
      - きば）アラートルールのユニットテストツールなんてあるんすね
    - **Moved in**) Zero trust security for CI/CD
      - CI/CD パイプラインにおいて、ゼロトラストセキュリティを適用しよう。OIDC のような統合された ID メカニズムを通じてパイプラインとクラウドプロバイダを認証するや、神ユーザーアカウントを使わずに適切な権限を与えるなど。内部ネットワークの CI/CD パイプラインでは忘れられがちだから注意
      - きば）こいつは Adopt でもいい気がする
- Platforms
  - Adopt (採用しよう)
    - **Moved in**) Colima
      - macOS 上の Docker Desktop 代替ツール
      - きば）Colima、そんなに成熟してたのか。登場当時は単なる ShellScript だったのに
- Tools
  - Adopt (採用しよう)
    - **Moved in**) Mermaid
      - 独自のマークアップ言語から図を生成するツール。GitHub や GitLab などでネイティブサポートされ始めた
      <!-- textlint-disable ja-technical-writing/no-doubled-joshi -->
      - きば）GitHub が採用して以来、だいぶエコシステムが拡充された気がする
      <!-- textlint-enable ja-technical-writing/no-doubled-joshi -->
  - Trial（追求する価値はある）
    - **New**) Container Structure Tests
      - コンテナイメージの構造をテストするツール。Google 製（ただし公式にはサポートされてないらしい）。ファイルの有無や内容、特定のコマンド内の出力やエラーの確認ができる
      - きば）こんなツールが出てたとは。便利そう
    - **New**) IntelliJ HTTP Client plugin
      - エディタ内で HTTP リクエストを作成、編集、実行できる JetBrains IDE 向けプラグイン
      - きば）便利そう
    - **Moved in**) mob
      - モブプログラミングにおいてシームレスに git を引き渡すためのコマンドラインツール
      - きば）どうやらモブが終わった際に[自動で `Co-authored-by` が付くらしい](https://github.com/remotemobprogramming/mob/issues/250#issuecomment-1084314231)。これ欲しかったかも
- Languages & Frameworks
  - Adopt (採用しよう)
    - **Moved in**) Playwright
      - ブラウザを使った E2E テストツール
      - きば）とうとう Adopt 入り

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## aqua CLI Version Manager 入門

https://zenn.dev/shunsuke_suzuki/books/aqua-handbook


# read more 🍘

Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**
  - [OpenAI 創業者も認めたタスク管理ツール「Linear」が評価額 4 億ドルに | Forbes JAPAN 公式サイト（フォーブス ジャパン）](https://forbesjapan.com/articles/detail/66394)
    - プロジェクト管理ツール Linear が評価額 4 億ドルになったそうです
    - 僕も Linear 使ってますが、コマンドパレットが優秀だったり自動化しやすかったりめちゃおすすめです

# あとがき

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## Engineering Productivity Meetup #1 in Tokyo - connpass

https://cybozu.connpass.com/event/298452/

サイボウズの東京オフィスで開発者の日々の生産性を高めるための知見や技術を語り合うイベントを開催されます（宣伝）。
発表・質問・交代含む 10 分程度の LT 形式です。簡単な自動化でもなんかすごい改革でも、「開発生産性の向上」に関する内容であればなんでもいいので、みなさんどしどし参加してください。

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏:

今週のおまけです。
