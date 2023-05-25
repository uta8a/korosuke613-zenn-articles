---
title: "Productivity Weekly (2023-05-17号)"
emoji: "🫨"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230517"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-05-17 単独号です。

今回が第 113 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Private Access to the AWS Management Console is generally available
https://aws.amazon.com/jp/about-aws/whats-new/2023/05/aws-management-console-private-access/

AWS マネジメントコンソールへのアクセスを制限できる機能が GA となりました。
これは組織内のアカウントに限定できるというものです。
つまり誤って意図していない AWS アカウントへのサインインを防ぐことができます。

なお、マネジメントコンソール内の各種アセット（CSS, Stylesheet, JavaScript）へのアクセスはインターネットを経由する必要があり、閉域網からのアクセスを実現するものではありません。
また現在は東京リージョン（ap-northeast-1）をサポートしていません。

ユースケースとしては、操作ミスによる情報漏洩を防ぐといったところでしょうか。
こういった手段もあると覚えておくと、今後便利かもしれません。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Actions - Actions Runner Controller Public Beta | GitHub Changelog
https://github.blog/changelog/2023-05-10-github-actions-actions-runner-controller-public-beta/

[先日、GitHub が Actions Runner Controller を自社のものとしました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221214?redirected=1#actions-runner-controller-is-moving-to-a-new-home!-%C2%B7-discussion-%232072-%C2%B7-actions%2Factions-runner-controller)が、その Actions Runner Controller が public beta となりました。
Actions Runner Controller は k8s 上でオートスケールする GitHub Actions セルフホストランナーを構築するための OSS です。

この Changelog には、「the actions runner controller and runner scale sets is now in public beta」と書かれており、従来の Actions Runner Controller だけでなく、runner scale sets というものも public beta となったことがわかります。

runner scale sets の詳細は Changelog には載っていません。
しかし、当時の GitHub 配下へ移ることを示した Discussions には、今後はまず新しいオートスケーリングモードの導入に取り組む旨が載っており、これのことを示していると思われます。

> Looking ahead, we will be working on first introducing a new auto scaling mode which will hopefully eliminate some of the over and under scaling issues in the current approaches. 
https://github.com/actions/actions-runner-controller/discussions/2072

正式名称、Autoscaling Runner Scale Sets mode の詳細や利用方法は次のドキュメントに載っています。

- [Deploying runner scale sets with Actions Runner Controller - GitHub Docs](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners-with-actions-runner-controller/deploying-runner-scale-sets-with-actions-runner-controller)
- [actions-runner-controller/docs/preview/gha-runner-scale-set-controller at 032443fcfd4cf7b6e8bb09ed9dca639bcba9f8a4 · actions/actions-runner-controller · GitHub](https://github.com/actions/actions-runner-controller/tree/032443fcfd4cf7b6e8bb09ed9dca639bcba9f8a4/docs/preview/gha-runner-scale-set-controller)

僕も手元のマシンで実際に試してみました。

- [GitHub Actions の actions-runner-controller の Autoscaling Runner Scale Sets mode を試す](https://zenn.dev/korosuke613/scraps/703218980ddc5d)

まだまだ試しに動かしてみただけではありますが、とても簡単にセットアップできました。
どうやら GitHub 内部で新しい専用の仕組みができたようで、オートスケールが Webhook の方式よりも効率良さそうな感じです。

まだ public beta 段階なので実運用は厳しいかもしれませんが、興味ある人は試しに触ってみましょう。

## Terraform Cloud updates plans with an enhanced Free tier and more flexibility
https://www.hashicorp.com/blog/terraform-cloud-updates-plans-with-an-enhanced-free-tier-and-more-flexibility

Terraform Cloud の無料版がより便利になりました。
具体的には次の変更があります。

- 500 リソースまでは無料で扱えるようになりました。
    - 以前は最大 5 ユーザーという制限でしたが、それが撤廃されリソースによる制限となりました。
    - スモールスタートのチームにとっては有り難い変更のように思います。
- 無料枠でも使えるようになった機能
    - SSO
        - 企業で導入する際に気にするポイントだったかと思いますので、対応されて嬉しいですね。
    - HashiCorp Sentinel と OPA（Open Policy Agent）
        - Policy as Code を実現できる機能です。
        - Policy as Code を初期から導入できるのは、個人にとってはもちろん、企業にとってメリットが大きいですね。
    - Run Task
        - Terraform Cloud の run の任意のタイミングでタスクを実行できる機能です。
            - [Policy Enforcement | Terraform Cloud](https://developer.hashicorp.com/terraform/cloud-docs/policy-enforcement)
        - 使用できるサービスは [Terraform Registry](https://registry.terraform.io/browse/run-tasks) から調べることができます。
    - Terraform Cloud Agent
        - オンプレで Terraform の Plan, Apply を実行できる機能です。
            - [Run Tasks | Terraform Cloud](https://developer.hashicorp.com/terraform/cloud-docs/workspaces/settings/run-tasks)
        - 社内ネットワークからしかアクセスできないリソースの管理に非常に便利そうです。

企業で導入する際に便利な機能が無料枠に追加されて、嬉しいですね。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Container Registry deprecation  |  Container Registry documentation  |  Google Cloud
https://cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation

2023 年 5 月 15 日から、Container Registry は非推奨となりました。
今後は Artifact Registry を使用する必要があります。

Container Registry を使用している開発者は、2024 年 5 月 15 日までに次のいずれかの操作が必要になるそうです。

- Artifact Registry の標準リポジトリに移行する
  - 標準リポジトリを作成して、コンテナイメージをプッシュし直す
  - 詳しくは https://cloud.google.com/artifact-registry/docs/transition/setup-repo?hl=ja
- gcr.io をサポートするリポジトリを作成する
  - まだ gcr.io ドメインから移行するのが難しい場合、こちらの選択肢を採ることになると思われます。
  - 詳しくは https://cloud.google.com/artifact-registry/docs/transition/setup-gcr-repo?hl=ja

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Google Cloud、クラウドで開発環境を提供する「Cloud Workstations」正式リリース。ゼロトラストのBeyondCorpとの統合など新機能 － Publickey
https://www.publickey1.jp/blog/23/google_cloudcloud_workstationsbeyondcorp.html

GCP のコンテナ上で実行される開発環境で、開発者は CODE-OSS や各種 JetBrains の IDE の中から IDE を選択して開発できます。

Cloud shell の上位互換という感じでしょうか。

- 特定の VPC 上に環境を立てることができ、固定 IP アドレスを使用できる
- IAM によるアクセス制御ができる
- IDE を選択できる

AWS CodeCatalyst や GitHub Codespaces の対抗馬という感じがして、今後の動向が気になりますね。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## DevEx: What Actually Drives Productivity - ACM Queue
https://queue.acm.org/detail.cfm?id=3595878

DX 社（Four Keys の Nicole Forsgren とかプロダクティビティ界隈の人たちが集まって作られた会社）が出した、開発生産性を測定するための新しいアプローチについての論文です。

内容ピックアップ。
- 開発生産性を測定するための開発者体験にフォーカスした新しいフレームワークを提案（フレームワークに名前はない）
- このフレームワークでは、DevEx[^devex]を、フィードバックループ、認知負荷、フロー状態[^flow]という 3 つの次元で測定する
- 3 つの次元それぞれを、perceptions（開発者の認識）と workflows（システムやプロセスに関する客観的なデータ）の 2 つの軸で把握する
  - perceptions の例: 自動テストのスピードとアウトプットの満足度（フィードバックループ）
  - workflows の例: 技術的な質問に対する回答が得られるまでの時間（認知不可）
- この手法をファイザーや eBay などの企業で実地検証した
- eBay では、リードタイムを 6 倍短縮し、リリースを 2 倍早くした

似たようなものとして four keys が有名ですが、こちらは開発者体験にフォーカスしているのが特徴的だと思いました。
開発生産性の向上するために開発者体験にフォーカスを当てていること、定量評価と定性評価の両方を行っていることなどが面白いなと感じました。

正直なところ KPI についてなど、まだ読んでもよくわからなかった部分が多く、実際にやった際のデータがほしいなと思いました。
まだまだ研究が進んでいくと思うので、今後の動向が気になりますね。

[^flow]: 「ゾーンに入る」的な状態を指すらしい。
[^devex]: Developer Experience (開発者体験) の略として使われている。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Edit workflow files on GitHub Mobile | GitHub Changelog](https://github.blog/changelog/2023-05-11-edit-workflow-files-on-github-mobile/)
    - GitHub Mobile で GitHub Actions のワークフローを編集できるようになりました
      - むしろ今までできなかったんだという感じはある
    - これで、出先で CI がこけて歯がゆい思いをしてもすぐにワークフロー間違いを修正できるようになります
      - ~~これでどこでも働けるね！~~
  - [CloudflareスタックにAIをもたらすConstellationの紹介](https://blog.cloudflare.com/ja-jp/introducing-constellation-ja-jp/)
    - Cloudflare Workers 上でトレーニング済みの機械学習モデルを使って推論できる機能 Constellation が登場しました（private beta）
    - トレーニング済みのモデルを使って例えば以下のようなことができるとのことです
      - 画像や音声の分類や物体検出
      - データ異常検知
      - 他にも色々
    - 料金については見つけられませんでした。private beta 中は無料なのかも
    - トレーニングが不必要なので、気軽に機械学習アプリケーションを作れるのは嬉しいですね
      - カスタマイズしたくなったら厳しいかも
- **know-how 🎓**
  - [CTOの視点から見たAzure OpenAI ServiceとOpenAIのChatGPT APIの深堀り比較 - Qiita](https://qiita.com/lazy-kz/items/32e8e7c86bdce67beb48)
    - OpenAI の API は Azure で提供されているもの(Azure OpenAI Service)と OpenAI が提供しているもの(OpenAI API)があります
    - この記事ではそれらのプランがどのように違うのかを、ただの利用者としてではなく、管理者の目線で様々な観点から比較しています
    - やはり、Azure OpenAI Service の方が、可用性やセキュリティ、どこの国の法律に準拠するかなどの点で、企業向けに優れているという印象です
    - ChatGPT をサービスに組み込みたい場合などは特に、Azure OpenAI Service を使うのが良さそうだなと思いました
    - ちなみに、Azure OpenAI Service の Chat Completion は最近 GA になりました
      - [Azure OpenAI Chat Completion General Availability (GA) | Microsoft Learn](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/whats-new#azure-openai-chat-completion-general-availability-ga)
  - [君はVS Codeのデバッグの知られざる機能について知っているか](https://qiita.com/_ken_/items/c5aa4841be74b06530b4)
    - VS Code のデバッガの便利機能紹介記事です
    - 基本 JetBrains IDE を使ってるので、VSCode のデバッガはあまり触ったことがなかったのですが、インラインブレークポイント機能はやり方知らなかったので嬉しいです
- **tool 🔨**
  - [ellie/atuin: 🐢 Magical shell history](https://github.com/ellie/atuin)
    - Rust 実装のシェル履歴管理ツールです
    - SQLite でシェルの履歴を保存して，インタラクティブに検索したり統計情報出したりできるとか
    - リモートに保存して異なる端末間で同期もでき、E2E で暗号化してるらしい
      - 保管場所はセルフホストできるようです
    - 検索機能が優れていそうで気になりますね
      - それはそれとして、リモート同期機能はなんとなく怖いイメージがあるから有効化しないかも

# あとがき
はい。今週号でした。みなさん 5 月病は大丈夫ですか？私は大丈夫です。
最近は、仕事もプラベも楽しいんですけど、ふとした瞬間に俺何やってるんだろ？ってなることがあるので、ボーっとしがちかもしれません。
もうちょっと考えながら生きていきたいですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->
