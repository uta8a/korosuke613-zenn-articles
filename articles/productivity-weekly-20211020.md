---
title: "Productivity Weekly (2021-10-20号)"
emoji: "🍃"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211020"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 48 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺
## New resource and data source `aws_cloudcontrolapi_resource` by ewbankkit · Pull Request #21110 · hashicorp/terraform-provider-aws
https://github.com/hashicorp/terraform-provider-aws/pull/21110

[先日紹介した AWS Cloud Control API](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#aws-%E3%81%A8%E3%82%B5%E3%83%BC%E3%83%89%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3%E3%83%BC%E3%81%AE%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E7%B5%B1%E4%B8%80%E3%81%95%E3%82%8C%E3%81%9F-api-%E3%81%A7%E3%81%82%E3%82%8B-aws-%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%AB-api) が Terraform AWS Provider v3.61.0 から使えるようになりました。

Cloud Control API は AWS の各リソースの作成、取得、更新、削除、一覧表示(CRUDL[^crudl])を同じインターフェイスで実行できる API になります。今回の AWS Provider の対応により、Terraform 上では `aws_cloudcontrolapi_resource` という Resource/Data で Cloud Control API に対応した AWS リソースを管理できるようになりました。

基本的には既存の Resource/Data を使えば良いと思います。しかし、新しく登場した AWS リソースやパラメータが AWS Provider ではまだ対応されていない場合やそもそも Terraform で対応されてない AWS リソースを管理したい場合は便利そうです（例えば Amazon Chatbot も Terraform で管理できないため、もし Cloud Control API 側が対応すれば Terraform で管理できるようになります。）。

また、すでにクラメソさんが記事を作成しているので、気になる方はそちらもご参照ください。利用方法や感想、ユースケースなどが載っています。
https://dev.classmethod.jp/articles/20211010-cloud-control-api-with-terraform/

## AWS and HashiCorp Collaborate on New Terraform Modules
https://www.hashicorp.com/blog/aws-hashicorp-collaborate-new-terraform-modules

Terraform で新規に AWSCC Provider が登場しました（technical preview）。[先日紹介した AWS Cloud Control API](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#aws-%E3%81%A8%E3%82%B5%E3%83%BC%E3%83%89%E3%83%91%E3%83%BC%E3%83%86%E3%82%A3%E3%83%BC%E3%81%AE%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AB%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E7%B5%B1%E4%B8%80%E3%81%95%E3%82%8C%E3%81%9F-api-%E3%81%A7%E3%81%82%E3%82%8B-aws-%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AD%E3%83%BC%E3%83%AB-api) を利用するプロバイダのようです。今までの AWS Provider とは全くの別物となります。

AWSCC Provider は AWS CloudFormation のスキーマからリソース定義などが自動生成されるため、新しい機能やサービスが登場してもすぐに Terraform で管理できるというメリットがあります（AWS Provider の場合はコントリビュータによって手動で追加、更新されます。）。このことについては `terraform-provider-awscc/contributing/FAQ.md` に記述されています（以下参照）。

> The Cloud Control provider is wholly generated from AWS CloudFormation schema. This means no manual work is required to add new features or services to the provider, and practitioners can expect to use AWS services within days of the AWS's launch rather than potentially wait for community support to prioritize that feature for inclusion. The standard AWS Provider is manually written and is the product of thousands of contributors and years of work.
https://github.com/hashicorp/terraform-provider-awscc/blob/a9fc5de4b03fa98660a4ba6172ee2cee29d123b4/contributing/FAQ.md#how-is-this-provider-different-from-the-existing-aws-provider

また、AWS CloudFormation のスキーマから自動生成されるため、CloudFormation のスキーマ通りにリソースを定義できます[^tautology]。AWS Provider ではリソース名やパラメータ名が異なるため、混乱するということがありました。

まだまだ technical preview であることと、AWS CloudControl API の対応サービスがまだ少ないことから、まだ利用するまではいかないかもしれませんが、これからに期待したいです。

[^tautology]: トートロジーっぽことを言っていますが...

## Announcing Selenium 4 | Selenium
https://www.selenium.dev/blog/2021/announcing-selenium-4/

Selenium 4 がいよいよ正式にリリースされました（識者によるとα版登場からすでに 2 年以上経過してるとのこと）。今回のアップデートでは、パブリック API をできる限り安定させることに注力したとのことです。しかし、一部破壊的変更もあるようなので、アップグレードには注意する必要があります。

色々と新機能や変更がありますが、同チームの [@miyajan](https://twitter.com/miyajan) が日本語でまとめたので、こちらをご参照ください。

https://zenn.dev/miyajan/articles/whats-new-in-selenium-4

Selenium 使いには外せないニュースですね。4 移行がんばっていきましょう。

## Announcing the Public Beta of HCP Packer
https://www.hashicorp.com/blog/announcing-the-public-beta-of-hcp-packer

Packer をクラウド上で実行するサービスが登場
Packer で作ったイメージを一元管理できることと、イメージの動的な更新に terraform を対応させられる？のがウリらしい

## Actions: Re-run improvements · Issue #271 · github/roadmap
https://github.com/github/roadmap/issues/271

GitHub Actions の Re-run の改善が github/roadmap の 2021/Q4（10 月から 12 月の間）に追加されていました。Re-run しても前回のワークフロー実行結果が確認できるようになるのと、失敗したジョブや 1 つのジョブだけ Re-run できるようになる予定のようです。

僕の持つリポジトリではすでに古い実行結果が見られるようになっていました[^old]。特定ジョブのみ Re-run する機能も早くほしいですね。

https://twitter.com/Shitimi_613/status/1451200883346132992?s=20

[^old]: 人によって有効かどうか異なるかもしれません。

## Actions: Cache support on GHES · Issue #273 · github/roadmap
https://github.com/github/roadmap/issues/273

GitHub Actions の actions/cache アクションが GitHub Enterprise Server(GHES) をサポートする予定が github/roadmap の 2022/Q2（来年の 4 月から 6 月）に追加されていました。

現状、GHES の GitHub Actions では actions/cache を利用できません。対応は来年とまだ先ですが、自前でキャッシュの仕組みを整えようとしている方は待ってみてもいいかもしれません。

# know-how 🎓

## AWSアカウントを作ったら最初にやるべきこと 〜2021年版〜 #devio2021 | DevelopersIO
https://dev.classmethod.jp/articles/aws-1st-step-2021/

AWS アカウントを作ったら最初にやるべきことをまとめたクラメソさんの記事です。

記事には、やるべきこと一覧とそれらの詳細、その他が書かれています。また、一覧表は「ログ・モニタリング」「セキュリティ」「契約・コスト」という観点ごとにまとめており、項目ごとに「MUST」「SHOULD」「MAY」「INFO」のレベルが設定されています。そのため、どの部分から対応していくかがとても考えやすいです。

とてもわかりやすくまとまった記事だと思います。すでにアカウントを持っている方も頻繁にアカウントを作成される方も要チェックです。

:::message
余談ですが、Weekly の会では AWS 側にデフォルトで設定しておいてほしい項目もいくつかあるな〜という話になりました。
:::

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Google Forms API 登場。プログラミングで Google フォームの作成や編集が可能](https://www.publickey1.jp/blog/21/google_forms_apigoogle_forms.html)
  - Google フォームを API 経由で操作できる Google Formas API が登場しました。
  - 似たようなフォームを大量に作っている人にとってはとても嬉しいかも
  - むしろ今まで手動でしか作れなかったんですね。
- [EC2 Linuxを起動するたびに同じコマンドを実行させる | DevelopersIO](https://dev.classmethod.jp/articles/execute-ec2-cloud-init-user-data-for-every-start/)
  - Amazon EC2 では、インスタンス起動時に特定の処理を走らせる仕組みとして cloud-init[^cloud-init] が利用できます。
  - この記事では、cloud-init を使って（初回起動時だけでなく）起動のたびに特定の処理を実行させる方法が説明されています。
  - cloud-init でこんなことできるんだという感じです。初回起動時にサービスを定義すればいいような気もしますが、どこかで使い所があるかもしれません。


[^cloud-init]: [cloud-init](https://github.com/canonical/cloud-init) は Canonical 社が開発している OSS で、クラウドインスタンス初期化のためのツールです。AWS だけでなく、GCP や Azure のインスタンスにも対応しています。

# あとがき
今週（先週）は新型 MacBook Pro が発表されて楽しい 1 週間でしたね。あと最近は色々忙しくてなかなか Weekly を書く時間が確保できませんでした...（土曜日は逆求人イベントのため働いてたし）

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 新型 MacBook Pro(M1 PRO、M1 MAX) 発表！！
https://www.apple.com/jp/macbook-pro-14-and-16/

いや〜とうとう出ましたね。新型 MacBook Pro が。

今回のイベントでは 14 インチと 16 インチの Apple Silicon 搭載 MBP が発表されたのですが、既存の M1 チップを遥かに凌駕する M1 PRO と M1 MAX を搭載していました。Apple の発表を見た感じまさにモンスターチップという感じで、にわかには信じがたいパフォーマンスを出していましたね。

既存の 16 インチ Intel Mac と比べてでかい変更としては以下のようなものがありましたね。
- Apple Silicon 搭載
- ノッチができた
- MagSafe 端子、HDMI 端子、SD カードスロットが追加
- **タッチバー廃止**

正直いまさら MagSafe とか SD カードスロットなんて使うかよという感じはしました(HDMI 端子はあってもいいと思う)。USB-C で色々揃えたのに...

あと、タッチバー廃止は個人的に悲しいですね。喜んでいる方もいますが。割とタッチバーを Fn キー以外で使う場面があったんですよね。Zoom ミーティングの退出や PC のロックや音量調整などを素早く行うのとかで。廃止ってことは評判良くなかったんでしょうね。

とにかくこれで 16 インチかつメモリ 32GB 以上の ARM 搭載 Mac が使えるようになったので、とても嬉しいですね。値段も予想の 1.5 倍くらい安くて驚きました。もっと法外な値段かと思った。僕は入社してまだ浅いのでもうちょっとしたら PC のリプレイスが可能になります。早く業務利用したいです。

また、驚いたのですが Intel 搭載 MacBook は Apple 公式ストアから購入できないようになってました（Mac mini なんかにはある）。つまりこれから入社する人なんかが支給される Mac はもう Intel ではない可能性が高く、開発環境の M1 Mac 対応が必須となってくるわけですね（もう Linux で良くねっていう人もそろそろで始めるのかも）。Rosetta 2 がどこまで優秀かはわかりませんが、これからまた忙しくなりそうです。

早くほし〜