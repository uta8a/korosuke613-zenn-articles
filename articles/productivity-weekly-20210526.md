---
title: "Productivity Weekly (2021-05-26号)"
emoji: "🌚"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 27 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Introducing Developer Velocity Lab – A Research Initiative to Amplify Developer Work and Well-Being - Microsoft Tech Community
https://techcommunity.microsoft.com/t5/azure-developer-community-blog/introducing-developer-velocity-lab-a-research-initiative-to/ba-p/2333140

Microsoft と GitHub による、開発者の仕事と幸福の向上にを目的とした取り組みをする Developer Velocity Lab の紹介記事です。生産性、コミュニティ、幸福（well-being）の分野を重点的に調査したとのことです。

この記事ではまず、SPACE という、個人、チーム、組織が開発者の生産性を測定するためのフレームワークが紹介されています。その後、GitHub による「[The Good Day Project](https://github.blog/2021-05-25-octoverse-spotlight-good-day-project/)」の概要とまとめが紹介されています。

このプロジェクトは、SPACE フレームワークを用いてアンケートを作成し GitHub の開発者に対してそのアンケートを実施することで「良い日」を過ごすためのパターンや習慣を明らかにしようとするものです。

主な発見として以下の事柄があったとのことです。確かにこれはありそうですね。

- フローが重要、中断はよくない
- 会議は素晴らしいものでもあるし恐ろしいものでもある
- 1 日 2 分の振り返りは開発者の日々を向上させるのに役立つ

面白い実験をしているなと思いました。生産性を高めるためにこういった研究結果も参考にしていきたいです。今後も期待したいですね。

## Dependabot version updates can now ignore major/minor/patch releases
https://github.blog/changelog/2021-05-21-dependabot-version-updates-can-now-ignore-major-minor-patch-releases/

Dependabot において特定の依存関係の major、minor、patch リリースを無視できるようになりました。これで、アップデート頻度が高い依存関係からのプルリクエストを抑えることができます。

もし security updates を有効にしている場合は、ignore を無視してセキュリティアップデートのプルリクエストを作成するようなので、脆弱性が発見された場合でも引き続き dependabot の恩恵を受けることができます。


# know-how 🎓

## GitHub Actionsに「強い」AWSの権限を渡したい / AWS credentials on Actions - Speaker Deck
https://speakerdeck.com/fujiwara3/aws-credentials-on-actions

GitHub Actions で `terraform apply` する際に、少しでも安全に強い AWS の権限を渡す方法の話です。

`terraform apply`は必要なリソースを作成するために複数リソースの強い権限を必要とします。これを CI/CD ツールで実行する場合、強い権限を持った IAM ユーザを使用するためのシークレットをツールに持たせる必要があります。万が一の時を考えるとあまり強い権限を CI/CD ツールに持たせたくありません。

この記事では、`workflow_dispatch` で長く使えないトークンを入力することで必要最低限に強い権限を GitHub Actions に渡すよう方法を解説しています。AssumeRole を行うようにして MFA トークンを渡すという作戦と AWS Cloud Shell が持ってるトークンを渡すという作戦を考案し、それぞれの pros と cons を紹介してくれています。

個人的にどちらの方法もとても面白く、そんな方法があったかと思いました。ただ、どちらの方法もけっこう面倒くさかったり、懸念事項があったりと、実用していくのはちょっと辛そうだとも思いました。

# tool 🔨

## mercari/tfnotify: A CLI command to parse Terraform execution result and notify it to GitHub
https://github.com/mercari/tfnotify

`terraform plan` などの結果を GitHub にコメントしたり Slack に通知したりしてくれる CLI ツールです。`plan`, `apply`, `fmt`に対応しています。

plan 結果にはさまざまな情報が表示されるため、自力でこの結果をパースして人間が読みやすい形に変えるのは面倒です。また、その結果を各ツールに送信するコードを書くのも面倒です。

このツールを使えばそこらへんの面倒をしなくてもコマンド結果の通知を飛ばせることができるので便利ですね。

## Whimsical: Think Together
https://whimsical.com/

Whimsical はナレッジマネジメントツールと図形描画ツールを融合させたようなサービスです。このサービスを紹介してくれた @\_\_sakito\_\_ さんによると、[Confluence](https://www.atlassian.com/ja/software/confluence) と [draw.io](https://www.diagrams.net/) の融合に近いそうです。

https://twitter.com/\_\_sakito\_\_/status/1397433961651916802?s=20

早速実際に使ってみました。公開設定にしたので以下のリンクから閲覧できます。

https://whimsical.com/productivity-weekly-U42YciF65kNFwnPXPPjxo1

使ってみた感想としては、確かに 2 つのサービスが融合したかのような印象でした。ドキュメントを描きつつ、必要であればすぐに図を書いて埋め込むことができます。例えば Confluence に図を埋め込みたい時は外部サービスなどで図を書いて、画像でエクスポートして、貼り付けて...という風にする必要があります。少なくとも Confluence 上では図は書けません。同サービス上で完結するのはとても嬉しいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。
- [［速報］Azure Functions、Azure App ServiceなどがAWSやGoogle Cloud、オンプレミスなどで実行可能に、Kubernetes対応で。Microsoft Build 2021](https://www.publickey1.jp/blog/21/azure_functionsazure_app_serviceawsgoogle_cloudkubernetesmicrosoft_build_2021.html)
  - Azure Functions などが AWS やオンプレミスなどで実行可能になりました。ただし Kubernetes 対応が必要です。普段から Azure を触っている人にとっては嬉しいかもしれませんね。

# あとがき
色々忙しかったのと（水木金土立て続けに予定が詰まってた）、僕のコンディションの問題で投稿までとても時間がかかってしまいました。すみません。毎週楽しみにしている方には申し訳ないです。もっと自分自身の生産性を高めていかなければ..。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

## 自動化大好きエンジニアLT会 - vol.3 - connpass
https://rakus.connpass.com/event/211175/

株式会社ラクスさん主催の「自動化が大好きなエンジニア」が集まる LT 会に参加してきました（視聴のみ）。今回で第 3 回でした。（僕はつい最近存在を知ったのでこれが初参加です。）

発表内容はどれも自動化に関することで、僕みたいな人間にドンピシャな LT 会でした。また、参加者が 100 人を超えており、Twitter、Zoom チャットが非常に盛り上がっている非常に賑やかな会でもありました。すごい。また参加したいと思いました。

残念ながらこの記事を書いてる時点ではすでに終わっています。が、おそらく数ヶ月後にまた開催すると思いますので、connpass のグループを要チェックだ！
