---
title: CodeBuildでマネージドなActionsのランナーを使えるように｜Productivity Weekly(2024-05-01)
emoji: 👶
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240501
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
今週は 2024-05-01, 2024-04-24 合併号です。

今回が第 150 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## AWS CodeBuild がマネージド型の GitHub Action ランナーのサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2024/04/aws-codebuild-managed-github-action-runners/

AWS CodeBuild がマネージドな GitHub Actions のセルフホストランナーを提供するようになりました。

GitHub Actions のジョブ要求時に GitHub から Webhook を受け取り、エフェメラルなランナーを起動する仕組みとなります。AWS CodeBuild で動くため、他の AWS リソースの連携がしやすい他、様々なスペックのインスタンスを利用できたり、AWS の料金体系に従って課金されるなどのメリットがあります。

すでに様々な先駆者様が検証してくれています。

- [AWS CodeBuildのGitHub Actions runnerサポートでLambdaが実行できるようになったので検証しました | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/47677/)
- [GitHub ActionsのセルフホステッドランナーとしてAWS CodeBuildを使う | 豆蔵デベロッパーサイト](https://developer.mamezou-tech.com/blogs/2024/04/29/githubactions-codebuild-runner/)

自分も個人の AWS アカウントで試してみました。

- [Self-hosted GitHub Actions runners in AWS CodeBuild を試す](https://zenn.dev/korosuke613/scraps/6f307e8e565cec)

個人的には複数リポジトリをまたいでセルフホストランナーをオーケストレーションできる既存ツール、[actions/actions-runner-controller](https://github.com/actions/actions-runner-controller) や [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) の代替にできそうかどうかが気になっていました。

結論としては、1 リポジトリごとに CodeBuild プロジェクトを作成する必要があったり、GitHub への認証方法に OAuth Apps か Personal Access Token しか使えなかったりと、まだまだ単一プロジェクト内でしか利用シーンは見出せないかなという印象でした。

今後に期待したいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Copilot Workspace：GitHub Copilotネイティブの開発環境へようこそ - GitHubブログ
https://github.blog/jp/2024-04-30-github-copilot-workspace/

GitHub Copilot Workspace がテクニカルプレビューとなりました。GitHub Copilot Workspace は GitHub の Web UI にある Issue で実装したい機能の要件を自然言語で記述すると、その要件に基づいたコードを生成し、提案してくれる機能です。
詳しくは、GitHub のブログを参照していただくと、スクリーンショット付きで紹介されているのでイメージが持ちやすいかと思います。提案されたコードは Web UI 上から Pull Request の作成まで行ったり、Codespace を利用して動作確認も行えるようです。
[GitHub Galaxy Tokyo 2024](https://github.registration.goldcast.io/events/34954e71-1f5f-4f11-800b-0e329c97007d) にてデモを見たところ、自然言語は日本語入力でも対応しているようでした。しかし、レスポンスは英語だったので、今後の日本語対応に期待したいです。また、GitHub の人いわく、ドキュメントの生成と修正にも対応しているそうです。

現時点ではテクニカルプレビューのため、試したい方は Waiting List に登録する必要があります。自分も Waiting List に登録していますが、本記事執筆時点(2024/05/15)では、まだメールは来ていないので気長に待ちたいと思います。

要件定義をしたらコード生成されるのはすごいですね。Copilot Workspace と Codespace を使えば、1 行もコードを書かず、開発マシンも用意せずにアプリケーションを作成できる時代が来るかもしれないですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Push rules public beta - The GitHub Blog
https://github.blog/changelog/2024-04-18-push-rules-public-beta/

Push rules という Rulesets が Public Beta としてリリースされました。特定の拡張子が付くファイルやパスに対して、プッシュを禁止させます。
例えば `*.env` を Push rules に設定して、秘密情報が含まれるファイルをリポジトリにプッシュすることを防いだり、`.github/workflows/*` パスを Push rules に設定して、デプロイメントワークフローを保護することが出来ます。

セキュリティやガバナンスの整備に役立つ機能だと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Copilot Metrics API now available in public beta - The GitHub Blog
https://github.blog/changelog/2024-04-23-github-copilot-metrics-api-now-available-in-public-beta/

GitHub Copilot の Metrics が確認できる API が Public Beta としてリリースされました。
API では、Enterprise 内の Copilot にアクセスできるユーザーを対象として、日毎に、Copilot と Copilot Chat についておおよそ次の項目を確認できます。

- アクティブユーザー数
- コード提案がされた回数と行数
- コード提案が採用された回数と行数
- 上記のデータを IDE や言語ごとに分類したもの

完全なレスポンスについては API ドキュメントの[スキーマ](https://docs.github.com/en/rest/copilot/copilot-usage?apiVersion=2022-11-28#get-a-summary-of-copilot-usage-for-enterprise-members)を確認してください。

さらに、集計したデータを可視化するツールが OSS として公開されています。API と組み合わせて使うことで、Copilot の利用状況を可視化できるようです。開発生産性や Copilot の投資対効果を評価する際に役立つかもしれません。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions: UI Improvements - The GitHub Blog
https://github.blog/changelog/2024-04-30-github-actions-ui-improvements/

GitHub Actions の UI アップデートです。
ワークフローの一覧タブにおいて、最大 5 つのワークフローをピン留め出来るようになりました。また、ワークフローを Disable にすると一覧の一番下に表示されるようになりました。
これにより、例えば、手動実行するワークフローや頻繁に結果を確認したいワークフローをピン留めし、使われなくなったり、テスト用に作成したワークフローは Disable にすることで、一覧を整理しやすくなりました。

また、ジョブのログ表示のストリーミングが改善されたそうです。

個人的に地味に嬉しいアップデートです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions - Deployment views across environments (GA) - The GitHub Blog
https://github.blog/changelog/2024-04-25-github-actions-deployment-views-across-environments-ga/

Deployment の新しい一覧ページが GA になりました。

Deployment の機能自体は GitHub Actions のワークフローyaml で `environment` を指定したジョブを実行するか、Deployment API を使うことでデプロイ情報を記録可能でした。Deployment の機能自体はかなり昔から存在していたので、記録したデプロイ情報を GitHub 上で確認できる UI も長らく最低限の表示だけだったのですが、それが今回パワーアップして表示がリッチになったのに加えてフィルター機能なども追加されました。

生産性向上チームでもクラウド上にデプロイが必要なツールの一部でデプロイの記録に利用しており、どの環境にどのコミットを最後にデプロイしたかを GitHub 上で確認できるのでとても便利です。デプロイが必要なタイプのサービスを管理しているリポジトリでぜひ使ってみてください。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS CloudFormation の ChangeSets でデプロイメントの変更の可視性が向上
https://aws.amazon.com/jp/about-aws/whats-new/2024/04/aws-cloudformation-changesets-enhanced-change-visibility-deployments/

AWS CloudFormation の変更セット（ChangeSets）上で、リソースのプロパティの変更を確認できるようになりました。これまでは、どのリソースが変更されるかのみ確認可能でした。これにより、意図せぬ変更がないかを確認しやすくなります。

すぐにクラメソさんが検証し、記事を出してくれています。

- [AWS CloudFormationの変更セットの差分がプロパティレベルで確認できるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/cloudformation-change-set-support-property-level-diff/)

実際に試した例が載っており、どのような変更でどのような表示がされるかがスクリーンショット付きで紹介されています。参考になります。

似たようなツールである Terraform では当たり前のように変更の詳細を確認できていたので、CloudFormation でも似たような機能が追加されたのは嬉しいですね。活用していきたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Amazon Q Developer, now generally available, includes previews of new capabilities to reimagine developer experience | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/amazon-q-developer-now-generally-available-includes-new-capabilities-to-reimagine-developer-experience/

AWS において、Amazon Q Developer が GA となりました。Amazon Q 自体は AWS の生成 AI アシスタントの総称のようで、Amazon Q Developer はその中の AWS 開発者向けの機能を提供するサービスです。

- [AI コーディングアシスタント - Amazon Q Developer - AWS](https://aws.amazon.com/jp/q/developer/)

Amazon Q Developer では、チャットによる AWS のサポートを受けたり、コードの提案や生成をしたりでき、GitHub Copilot の AWS 版という感じです。
さらに今回、次の追加機能がプレビューとして提供されることが発表されました。

- チャット機能において、AWS アカウントの実際のリソースを知るようになった
  - 使用例）全ての AWS リソース一覧を表示、特定のリソースへの変更を提案
- チャット機能において、AWS アカウントでかかっているコストを知るようになった
  - 使用例）第一四半期にかかったコストを表示、最もコストの高いサービス一覧を表示

AWS アカウントの状況を知っているのはとても嬉しいですね。
サービスの料金体系や機能がややこしくて腰が重い感じはありますが、詳しく調べてみたくなりました。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## LLM校正CIを自社のブログに導入してみた - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2024/04/17/084103
NTT Communications さんによる LLM を使った校正 CI を自社ブログ用に導入した話です。

自社ブログのデータ管理やレビューに GitHub を使っているおり、今回校正を強化するために LLM を使った校正の CI を構築・導入したとのことです。

記事では、背景、LLM 校正 CI の詳細、プロンプトの試行錯誤などが書かれています。ノイズを減らすための工夫も入ったプロンプトを紹介してくれているため、マネしやすいです。reviewdog を利用されており、Pull Request に対してコメントをつける形で校正しているようです。

生産性向上チームで書いている本記事（Productivity Weekly）もレビューは行っていますが、人の手を使っています。僕も LLM を使った校正 CI を導入してみたいと思いました。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS知見共有会でTerraformのCI/CDパイプラインのセキュリティ等について発表してきました + GitHub新機能Push rulesについて
https://tech.layerx.co.jp/entry/scalable-and-secure-infrastructure-as-code-pipeline-for-a-compound-startup

LayerX さんによる、Terraform の CI/CD パイプライン話＆GitHub の push rules についての記事です。

Terraform の CI/CD に関する話はスライドおよび動画が公開されています。

認証には OIDC を使うや、`on: pull_request` で terraform plan しないようにするや、外部ツールの利用に関する tips などが書かれています。

記事自体には push rules に関することも書かれており、ユースケースや、`on: pull_request` の代わりに `on: pull_request_target` を使うことでレビュー済みのワークフローを実行させるようにする方法との関係などが書かれています。

個人的には、ワークフローの変更に関する push を admin のみに制限するというアイデアが良いなと思いました。admin 以外からのコントリビューションは難しくなりますが、リスクの高い処理をするワークフローを扱う際に有効だと思います。

セキュアなワークフローを作る上で参考にしたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Developer eXperience Day 2024
https://cto-a.org/dxd2024

日本 CTO 協会が主催する Developer eXperience Day 2024 が 7/16-7/17 に開催されます。

オフライン開催（浅草橋）とオンライン開催の両方があり、どちらも無料のようです。まだタイムテーブルは出ていませんが、登壇者はすでに複数人発表されており、いろいろな会社の CTO や CEO が登壇されるようです。

t-wada さんも登壇されるらしく、話を聞いてみたいので参加しようかなって考えています。

タイムテーブルの発表が楽しみです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [HashiCorp joins IBM to accelerate multi-cloud automation](https://www.hashicorp.com/blog/hashicorp-joins-ibm)
    - Terraform でおなじみの HashiCorp 社が IBM に買収されました
    - これにより HashiCorp 製品のライセンスがまた変更されたりするのでしょうか
    - 今後の動向が気になります
  - [Repository Updates April 30th, 2024 - The GitHub Blog](https://github.blog/changelog/2024-04-30-repository-updates-april-30th-2024/)
    - GitHub のリポジトリに関するいくつかのアップデートがありました
    - 1 つ目が repository rules のバイパス対象に deploy keys が追加されたことです
      - 個人的には `GITHUB_TOKEN` でのアクセス制御ができるようになると嬉しいです
    - 2 つ目が 5000 以上のブランチを持つリポジトリの場合、GitHub Actions の push イベントが起こらなくなったことです
      - おそらくほとんど影響を受ける人はいないでしょう
  - [Enterprise enablement trends for security products (public beta) - The GitHub Blog](https://github.blog/changelog/2024-04-25-enterprise-enablement-trends-for-security-products-public-beta/)
    - GitHub において、Enterprise レベルで GitHub のセキュリティ機能が有効化されているかを確認する機能が追加されました（public beta）
    - これまでも Organization レベルでの確認はできましたが、今回 Enterprise レベルで Organization を横断して確認できるようになりました
  - [GitHub Issues & Projects – Auto-close issue project workflow - The GitHub Blog](https://github.blog/changelog/2024-04-25-github-issues-projects-auto-close-issue-project-workflow/)
    - GitHub Projects において、Projects 上で Issue を「Done」のステータスに持っていった場合に、自動で Issue がクローズされるようになりました
      - 逆（Issue をクローズした際に Projects 上で Done になる）はこれまでもできたようです
  - [4/8リリースのDocker Desktop v4.29.0で、WindowsおよびMac向けDocker DesktopでもHost networkが試験的にサポートされるようになっていました](https://docs.docker.com/desktop/release-notes/#4290)
    - https://docs.docker.com/network/drivers/host/#docker-desktop
    - コンテナをホストマシンのネットワークに配置することで、コンテナからホストマシンのネットワークにアクセスできるようになります
    - TCP および UDP のみ対応しており、IPv6 はサポートされていません。まだベータ版の機能です
    - Docker Desktop の機能であるため、Docker Desktop がインストールされている環境でのみ利用可能です
  - [AWS supports dynamically removing and adding auto assigned public IPv4 address](https://aws.amazon.com/jp/about-aws/whats-new/2024/04/removing-adding-auto-assigned-public-ipv4-address/)
    - AWS において、EC2 インスタンスへのパブリック IPv4 アドレスの追加・削除を EC2 インスタンスの再起動なしで行えるようになりました
      - 個人的にはそもそも EC2 インスタンスへのパブリック IP 割り当てはよっぽどのことがないと行わないので、割とどうでもいいです
  - [Node.js、ロケットに乗った亀「Rocket Turtle」が正式マスコットに － Publickey](https://www.publickey1.jp/blog/24/nodejsrocket_turtle.html)
    - Node.js のマスコットキャラクターが「Rocket Turtle」に決定しました
    - 非公式なカメのキャラクターが元々いたみたいですが、デザインが変わって正式マスコットになったようです
    - 議論の issue を見ると、いろんなデザインのロケットとカメが提案されていますが、急に最終的なデザインが出てきてそのまま issue が閉じられていてちょっと面白かったです

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
イヤー大変遅くなってしまい申し訳ありません。最近文章を書く仕事があって忙しかったのと、GW で体調を崩してしまって 1 週間ほど死んでました。

そういえば、生産性向上チームでは夏の学生インターンを募集しています。なんと[ 5/17 より二次募集を開始](https://x.com/cybozu_recruit/status/1791349532854546744)しています。
興味ある方はぜひエントリーしてみてください。

https://cybozu.co.jp/company/job/recruitment/intern/improvement.html

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
