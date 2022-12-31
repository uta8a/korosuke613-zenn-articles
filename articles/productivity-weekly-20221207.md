---
title: "Productivity Weekly (2022-12-07号)"
emoji: "🐹"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221208"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 101 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
投稿がたいへん遅くなってしまいすみません...
また、2022-11-23 号、2022-11-30 号はお休みだったため、全体的にネタが古いです！
:::

# news 📺

## Node.js 18.x runtime now available in AWS Lambda | AWS Compute Blog
https://aws.amazon.com/jp/blogs/compute/node-js-18-x-runtime-now-available-in-aws-lambda/

AWS Lambda において、Node.js v18 ランタイムが使えるようになりました。

また、同梱されている AWS SDK for JavaScript が v2 から v3 へと更新されました。
したがって、AWS SDK をバンドルせずに Lambda 関数内で v2 を使用している場合は、v3 のインターフェイスを使うように直す必要があります（もしくは v2 をバンドルしなければいけません）。

Node.js v18 が LTS となったことで、v16 は Maintenance となりましたが、[これまでと異なり EOL が半年早い](https://nodejs.org/en/blog/announcements/nodejs16-eol/)ため、早めに Lambda のランタイムを更新しておきましょう。

そういえば Node.js v18 が LTS になってから一ヶ月くらいで Lambda が対応しましたね。これまでは LTS から半年遅れとかだったため、だいぶ対応が早くなりました。嬉しい限りです。

## コンテナ開発用のオープンソースクライアント「Finch」のご紹介 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/introducing-finch-an-open-source-client-for-container-development/

新しい Docker Desktop 代替になりそうな OSS、Finch を Amazon が発表しました。Finch は OCI コンテナの開発・実行環境、およびそのクライアントを提供します。

内部的には Lima、nerdctl、containerd、BuildKit を利用しており、基本的なこと機能は備えているとのことです。今のところ Mac のみ対応されており、今後 Windows や Linux への対応も予定しているようです。

実際使ってみたところ、インストールは 1 コマンドで済み、いろいろなコンテナを実行しましたが特に問題は踏みませんでした。compose も標準で使えます。

まだまだプロジェクトは始まったばかりですが、すでにある程度は使える印象です。業務利用はまだ厳しいと思いますが、GA に期待したいですね。Docker Desktop 代替としては Rancher Desktop、Podman が有名ですが、ここにさらに Finch が加わることになりますね。個人的には Docker Desktop の代替が増えるのは嬉しいです。

## GitHub Actions workflow notifications in Slack and Microsoft Teams | GitHub Changelog
https://github.blog/changelog/2022-12-06-github-actions-workflow-notifications-in-slack-and-microsoft-teams/

GitHub の Slack アプリにおいて、GitHub Actions の通知を受け取れるようになりました（あと Microsoft Teams にも）。

どの `pull_request` イベントによるワークフローのみを通知するなど、細かくフィルタリングできます。

実際に使ってみた画面を以下に示します（なぜか Changelog に載ってるスクショが荒い）。

![](/images/productivity-weekly-20221208/notify_example.png =500x)
*Slack 通知の例。ワークフローの実行開始、進捗、実行終了ごとにメッセージが来る*

![](/images/productivity-weekly-20221208/update_permission_1.png =400x)
*既存の App を使ってる場合、初回実行時に GitHub App の権限更新を求められる*

![](/images/productivity-weekly-20221208/update_permission_2.png =400x)
*GitHub に遷移し、Actions(read/write) 権限を追加する画面が表示される*

これは嬉しいと最初思ったのですが、個人的には Actions 失敗時に Slack 通知してほしいため、あまり使う場面はなさそうと思ってしまいました（成功失敗前から通知が飛ぶ）。デプロイワークフローの場合は進捗を教えてもらえて嬉しそうです。

## スポットインスタンスの中断に対し、AWS Fault Injection Simulator 統合を経由して、Amazon EC2 コンソールで直接テスト可能に
https://aws.amazon.com/jp/about-aws/whats-new/2022/10/spot-instance-interruptions-tested-amazon-ec2-console-fault-injection-simulator-integration/

Amazon EC2 において、スポットインスタンスの中断を EC2 コンソール上から実行できるようになりました。これまでは AWS Fault Injection Simulator (AWS FIS)を使う必要がありました。

スポットインスタンスはオンデマンドインスタンスと比べて安い代わりに、AWS 側の都合でインスタンスを終了されることがあります[^spot]。実際に終了される 2 分前に中断通知が飛んでくるので、耐障害性を考慮するなら中断通知を監視してなにかしらの処理をしてあげる必要があります。

これまでも AWS FIS を使うことでスポットインスタンスの中止を実験できていましたが、EC2 のコンソール上から実行できるようになり、実験をしやすくなりました。

クラメソさんが実際に実行してみた過程を記事にしていました。こちらも参照ください。

- [AWS FIS のスポットインスタンスの中断が EC2 コンソールから簡単に実行出来るようになりました | DevelopersIO](https://dev.classmethod.jp/articles/aws-fis-spot-instance-interruptions-ec2-console/)
  - あくまで実験がしやすくなっただけで、AWS FIS を利用することは変わらないため、AWS FIS が使えないリージョン(大阪リージョンなど)ではまだ使えないようです

スポットインスタンスの中断対策がしやすくなっていいですね。活用していきたいです。

[^spot]: ちなみに僕たちはよく「回収される」と言ってます。

## You can now assign multiple MFA devices in IAM | AWS Security Blog
https://aws.amazon.com/jp/blogs/security/you-can-now-assign-multiple-mfa-devices-in-iam/

AWS において、1 ユーザーにつき MFA デバイスが、最大 8 つまで登録できるようになりました。これまでは 1 ユーザにつき登録は 1 つまででした。

これまでは 1:1 となっていたため、物理キー（Yubikey など）を使っている場合は特定の拠点に行ける人しか認証ができなかったり、デバイスの紛失・故障といったケースに対する冗長化ができないといった問題がありました。しかし、今回の変更により解決できそうです。

## 週刊AWS – re:Invent 2022 特別号
- [週刊 AWS – re:Invent 2022 特別号 part 1 (2022/11/28 週) | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/aws-weekly-20221128-1/)
- [週刊 AWS – re:Invent 2022 特別号 part 2 (2022/11/28 週) | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/aws-weekly-20221128-2/)

AWS Japan 公式ブログによる AWS re:Invent 2022 新機能まとめです。

今年も多岐に渡る発表があったため、内容を追っかけるのが大変だと思いますが、このまとめでは各発表の概要が載っており、網羅的に概要を知ることができます。

個人的には AWS Supply Chain と Amazon CodeCatalyst がちょっと気になりました。

ちなみに週刊 AWS は AWS Japan の人によるその週の AWS の主要なアップデートを紹介する週刊記事です。定期的に見に行くと AWS の最新情報を逃しにくいので、気になる人は RSS などで購読してみるとよいです。

# know-how 🎓

## 未知の脅威に対抗するメルカリのCI再設計 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20220203-defense-against-novel-threats-redesigning-ci-at-mercari/

メルカリさんによる、CI/CD パイプラインのセキュリティについての記事です。サプライチェーン攻撃による CI/CD パイプラインへの攻撃が年々増えており、新しい攻撃手法に対するセキュリティ向上を目的とした CI システム再設計プロジェクトを行なったとのことです。

この記事では、背景、CI 再設計の主な目的、目指すビジョン、攻撃シナリオの研究、仕様策定、CI/CD プラットフォーム選定、アーキテクチャの説明などが書かれています。大変盛りだくさんの内容です。

僕は特に、サプライチェーンセキュリティの計測（SLSA）、Egress 制限に興味を惹かれました。

> SLSAの非常に優れている点は、なんといっても中間的なマイルストーンを設定しつつ、段階的なセキュリティの適用・向上を計測しながら行えることです。

いい感じのマイルストーンがあるのは嬉しいですね。

Egress 制限は、ランナーから外向きの通信を制限するというものです。セキュリティ的に非常に強力である反面、ホワイトリストの管理が大変難しそうだと思いました。これに関する記事を書きそうなことが書いてあるので、期待したいです。

CI/CD への攻撃は増えている中、まだまだ CI/CD のセキュリティについての注目度は低いと感じます（主観）。まだまだ僕も探求が足りていません。メルカリさんはそこらへんについて最先端なことをしていると思うので、大変参考になります。CI/CD のセキュリティ、上げていきたいです。

## Retty の Terraform CI/CD 解体新書 - Retty Tech Blog
https://engineer.retty.me/entry/2022/11/18/130000

Retty さんによる Terraform の CI/CD ノウハウをまとめた記事です。非常に盛りだくさんです。

この記事では**大きく分けて**、CI を整備するにあたって意識したこと、Terraform のディレクトリ構成、リポジトリ運用フロー、ジョブ関連、バージョン管理と更新、安全に CI を利用するための取り組みが載っています。

個人的には、「ラベルに応じた matrix の生成」が面白かったです。

どの環境に対する CI を行いたいかを GitHub のラベルで指定できるのは便利だなと思いました。（全ての環境で行えばよいのでは？とも思いましたが、デプロイに関しては限定したいとも思いました。）

また、「PR の close イベントはたまに発火しない時がある」には驚きました。そんなことあるんか。「aqua を活用したツールのバージョンアップ」も興味深かったですね。Renovate による更新に対応してるんですね。

とても勉強になりました。Terraform の CI/CD 環境がだいぶ整備されており、Terraform に疎い方でも安心して利用できそうでした。参考にしていきたいです。

## ソフトウェアを安全に届けるための最新動向 2022
https://zenn.dev/google_cloud_jp/articles/5a67f61a7e43ab

サプライチェーンに関するセキュリティを向上するための選択肢と、Google Cloud のソフトウェアデリバリーシールドの紹介記事です。

この記事では、サプライチェーンに対する攻撃が増えているという背景、オープンな対策方法（SLSA、SBOM、GUAC）の紹介、Google Cloud のソフトウェアデリバリーシールドの紹介がされています。

ソフトウェアデリバリーシールドはサプライチェーンのセキュリティを強化する各種サービス・機能の総称らしいです。記事では例として Cloud Workstations、Cloud Code、Container Analysis、Cloud Build、Binary Authorization、GKE & Cloud Run の関連する機能が紹介されています。

個人的には、Cloud Build で SLSA レベルや脆弱性などの分析情報が出せる（preview）のが良いなと感じました。

サプライチェーンの各要素のどこでどのような攻撃がされるか（11 パターン）の図がとてもわかりやすかったです。対策を考える上で何回も使いまわせそうです。ソフトウェアデリバリーシールドは、それに乗っかることでサプライチェーン全体（11 パターン）を保護できるというソリューションのようです。

Google Cloud を使っている人にはなかなか強力そうな仕組みでした。こういった対策に力を入れていることはあまり知りませんでしたね。安全なソフトウェアを作っていきたいです。

## philips-labs/terraform-aws-github-runner でオートスケールするセルフホストランナーの構築・運用 - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2022/12/01/102842

:::message
この記事は僕が所属する生産性向上チームのメンバーが、サイボウズ アドベントカレンダー 2022 で書いた記事です。なので半分宣伝です。
:::

サイボウズによる、オートスケールする GitHub Actions のセルフホストランナー環境構築事例です。

最近セルフホストランナー事例が増えてきましたが、この記事では philips-labs/terraform-aws-github-runner という OSS の Terraform モジュールを使っています。当該モジュールを利用することで、簡単に AWS 上にオートスケールするランナー環境を構築できます。

記事では、背景、Terraform モジュールの説明、ランナーを起動するまでの仕組み、サイボウズでの運用方法（デプロイフロー、AMI のビルド、ephemeral ランナー設定、リポジトリ単位でランナーを許可する方法、ラベル設定、システムのデバッグ、メトリクス収集＆モニタリング）などが書かれています。

Terraform モジュールをそのまま使うだけでは決まりきっていない運用方法についてが載っているので、philips-labs/terraform-aws-github-runner を使って GitHub Actions のセルフホストランナー環境を構築しようとしている方は参考にしてみてください。

## 新卒入社としてサイボウズ生産性向上チームにジョインしました - ペペロンチーノ街道
https://chimpan.hateblo.jp/entry/2022/12/02/103407

:::message
この記事は僕が所属する生産性向上チームのメンバーがサイボウズ アドベントカレンダー 2022 で書いた記事です。なので半分宣伝です。
:::

開発者の生産性を向上することを目的としたチーム、生産性向上チームに新卒 1 年目でジョインした [@r4mimu](https://twitter.com/r4mimu) による、ジョインしてどんな感じかを紹介した記事です。

コンテキストスイッチがすごい話やインターン受け入れの話、チームの何が良いのかなどが赤裸々に書かれています。

あまり外に出ない部類の話が載っているので、生産性向上チームに興味のある方や、似たようなチームにいる方はぜひご参考ください。

# tool 🔨

## GitHub Next | GitHub Copilot CLI
https://githubnext.com/projects/copilot-cli/

AI の力で自然言語からシェルのコマンドを提案する GitHub Copilot CLI が登場しました（テクニカルプレビュー）。現在はテクニカルプレビューなので waitlist への登録が必要です。ちなみに、GitHub Next は実験的なことをする部門？なので、GitHub Copilot CLI が正式にリリースされるかどうかはまだわかりません。

記事の GIF を見るのが早いですが、例えば `?? list ts files` と叩くと、「`find . -name "*.ts"` ではないか？」というような旨のレスポンスが得られます。

GitHub Copilot CLI は汎用的なコマンドを尋ねる `??`、git のコマンドを尋ねる `git?`、GitHub CLI のコマンドを尋ねる `gh?` を提供するようです。

GitHub Copilot と言えば、[OSS ライセンスに関する訴訟の可能性](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221019?redirected=1#github-copilot-investigation-%C2%B7-joseph-saveri-law-firm-%26-matthew-butterick)があったり、[それを回避するためかライセンスなどの一覧を表示する機能を追加予定](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221102?redirected=1#preview%3A-referencing-public-code-in-github-copilot-%7C-the-github-blog)だったりと、なかなかきな臭い部分がありますが、シェルのコマンドを提案する分に関してはそういったライセンス問題は回避できそうなので利用者としても安心して利用できるかもしれません。

僕はすぐに waitlist に登録しましたが、まだ連絡は来ていません。便利そうなので早く使ってみたいですね。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Next | AI for Pull Requests](https://githubnext.com/projects/ai-for-pull-requests/)
    - AI のスーパーパワーで Issue からプルリクを自動生成するという GitHub Next の取り組みです
    - status が WIP なのでまだ開発中っぽいです
    - 使ってみたい
  - [［速報］AWS上で開発環境一式、フレームワーク、初期コード、IDE、ビルド環境、CI/CDなど提供する「Amazon CodeCatalyst」発表。AWS re:Invent 2022](https://www.publickey1.jp/blog/22/awsidecicdamazon_codecatalystaws_reinvent_2022.html)
    - GitHub Codespaces のような開発環境を提供するサービスが AWS にも登場しました
    - しかし、CI/CD パイプラインに関する機能も含まれているようです
    - フリーティアも用意されており、結構充実してそうなので、個人利用であれば無料の範囲内で十分に使えるかもしれません
  - [WebdriverIO v8 Released | WebdriverIO](https://webdriver.io/blog/2022/12/01/webdriverio-v8-released)
    - WebdriverIO の v8 がリリースされました
    - 大きな変更一覧（[@akihisa1210](https://twitter.com/akihisa1210) が調べました！）
      - Node.js v14 までのサポートの終了
      - ESM をサポート
      - ブラウザ上でのコンポーネント用の新ランナーを追加
      - ブラウザ操作用の新しい API（New Action Interface）を追加
      - WebDriver BiDi（WebDriver の新しいプロトコル）をサポート
      - グローバル汚染を防ぐ機構を追加
- **know-how 🎓**
  - [生産性指標を可視化してチームのワークフローを改善したら生産性が爆上がりした話](https://tech.buysell-technologies.com/entry/adventcalendar2022-12-02)
    - バイセルテクノロジーズさんによる Findy Team+ を導入して、生産性のメトリクスを可視化し、アクションを起こして生産性を上げたという記事です
    - 記事では、背景、具体的な改善ポイント（生産性の指標決め、指標の計測方法決め、PR の目標やルール決め、PR の通知方法改善、時間のかかった PR の振り返り）、結果などが載っています
  - [1年で内定承諾率が8倍に。エンジニア採用は「開発者体験」と「候補者体験」を良くすれば上手くいく！ - Uzabase for Engineers](https://tech.uzabase.com/entry/newspicks-engineer-2022)
    - ユーザベースさんによるエンジニア採用に関する記事です
    - 以前は内定承諾率が悪かったため、給与を上げたりカジュアル面談を見直したり、ワークショップ面接を導入したりしたところ、内定承諾率が結構上がったそうです
    - 僕のいるチームはモブプログラミングをしているため、ワークショップ面接が気になりました。おそらく以下の記事が説明の記事かな？ちゃんと読みたいです
      - [面接の感想はお互い「楽しかった！」に。モブプロ型のコーディング面接で「候補者体験」と「内定承諾率」を両方向上した話 - Uzabase for Engineers](https://tech.uzabase.com/entry/alphadrive-coding-interview-1)
      - [候補者体験を最高にするためのライブコーディング面接の進め方と評価すべき観点 - Uzabase for Engineers](https://tech.uzabase.com/entry/alphadrive-coding-interview-2)
- **tool 🔨**
  - [開発の生産性をアゲていきたい（ツール編）](https://zenn.dev/defaultcf/articles/my-engineering-productivity-tool)
    - この記事は僕が所属する生産性向上チームのメンバーがサイボウズ アドベントカレンダー 2022 で書いた記事です。なので半分宣伝です
    - 開発生産性を上げられる、かもしれないツール紹介記事です
    - Amethyst は昔使っていたのですが、動作が不安定でためにおかしくなることがあったため使うのをやめました😢
  - [マネコン起動もできるAWSのスイッチロール用CLIツール「AWSume」の紹介 | DevelopersIO](https://dev.classmethod.jp/articles/awsume/)
    - AWS のクレデンシャルを管理し、CLI 上での assume role を楽にする CLI ツールです（AWS 公式ではない）
    - pip でインストールしなきゃいけないのがちょっとなーと思いました
    - マネジメントコンソールを開く機能は嬉しいですね

# あとがき
投稿がたいへん遅くなってしまいすみません...冒頭にも書きましたが、2022-11-23 号、2022-11-30 号はお休みだったため、全体的にネタが古いです！
年末年始で残りの 2022-12-14 号、2022-12-21 号も出そうと思っています。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

