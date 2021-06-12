---
title: "Productivity Weekly (2021-06-09号)"
emoji: "🌏"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 29 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Terraform 1.0 General Availability
https://www.hashicorp.com/blog/announcing-hashicorp-terraform-1-0-general-availability

Terraform 1.0 が正式リリースされました。機能的には 0.x 系の最新バージョンである [0.15.5 からの大きな変更はありません](https://github.com/hashicorp/terraform/releases/tag/v1.0.0)。ただ、1.x は最低でも 18 ヶ月間メンテナンスされることが決められました。（これまでは特に決まってなかったと認識しています。）

Terraform はすでに様々な組織で広く利用されており、なぜ今更 1.0 となったのかが気になったのですが、これも記事中で説明されています。HashiCorp 社は製品バージョン 1.0 とするための以下の 4 つの要件を決めています。

- deployed broadly (広く普及している)
- major use cases are understood and well-supported (主要なユースケースが理解され、十分にサポートされている)
- a well-defined user experience (明確なユーザーエクスペリエンスがある)
- the product’s technical architecture is mature and stable (製品の技術的アーキテクチャが成熟し、安定している)

Terraform はこの 4 つの要件を満たしたと判断されたということですね。1.0 になるための要件は面白いと思いました。プロダクトをリリースする上で参考にできそうですね。

さらに安定した Terraform に今後も期待していきたいです。

## Xcode Cloud Overview - Apple Developer
https://developer.apple.com/xcode-cloud/

Apple が CI/CD サービスの Xcode Cloud を発表しました。クラウド上でのビルド、テスト、TestFright へのデプロイを自動で行えます。これまで Apple 製品のネイティブアプリの CI/CD には CircleCI や GitHub Actions を使って macOS インスタンスを使ったり、[Bitrise](https://www.bitrise.io/)などのモバイルアプリに特化した CI/CD サービスを利用するのが一般的でしたが、macOS インスタンスは他の OS と比べて利用料金が高く、コスト面で考えると辛いものがありました。

XCode Cloud はまだベータ版であり、サインアップが必要です。また、正式版の具体的な料金はまだ発表されていません。気になる方はベータ版へのアクセスをリクエストしてみましょう[^beta]。

また、Bitrise 社が Xcode Cloud と Bitrise の比較や Xcode Cloud について考えることを記事にしていました。こちらも合わせて読んでみると良いかと思います。
https://blog.bitrise.io/post/apple-unveils-xcode-cloud-what-it-means-and-what-we-know-so-far-jp

[^beta]: 余談ですが、僕も触ってみたくてベータ版にサインアップしたところ、Apple Developer Program に入ってないとダメとのことでした...まあそうですよね。


## Open Source Insights
https://deps.dev/

Google が OSS ライブラリの依存関係を調査するためのサービス Open Source Insights を公開しました。Open Source Insights では npm パッケージ、go モジュール、maven アーティファクトなどを横断し、依存関係グラフやセキュリティ警告、依存ライセンスなどを確認できます。

利用したい OSS を使うかどうか判断したい時に利用できそうです。

## CI/CD Conference 2021 by CloudNative Days
https://event.cloudnativedays.jp/cicd2021

CI/CD カンファレンスが 2021/09/03 にオンライン開催されます。

現在はセッション公募(CFP: Call For Proposal)の段階で、6/30 まで受け付けるようです。CI/CD に関する知見を共有したい人は応募してみましょう。僕もなんか良いネタあったかなーと考えてるところです。

開催当日が楽しみですね。

## Changes to Docker Hub Autobuilds
https://www.docker.com/blog/changes-to-docker-hub-autobuilds/

Docker Hub の無料枠での Autobuilds が終了します。Docker Hub では、 GitHub 連携などで用意した Dockerfile からのイメージ作成を Docker Hub 上で行うことができます。これまでは無料で Autobuilds を行うことができていましたが、6/18 からは有料プランを契約しないと Autobuild が行えなくなります。（Docker Open Source program に入っている場合は配慮されるようです。）

原因は Autobuild を利用して暗号通貨マイニングを行う悪意あるユーザがここ数ヶ月で急激に増えたことによる運用コストが増加したためです。暗号通貨マイニングについては、他にもコンピュータリソースを無料で提供している CircleCI や GitHub Actions も同様の被害を受けており、対策にコストをかけていることがわかっています。

- [Preventing cryptomining on CircleCI | CircleCI](https://circleci.com/blog/how-we-find-block-and-prevent-cryptomining-at-circleci/)
- [GitHub Actions update: Helping maintainers combat bad actors | The GitHub Blog](https://github.blog/2021-04-22-github-actions-update-helping-maintainers-combat-bad-actors/)

ちょっと前まで自分は暗号通貨について良いイメージも悪いイメージも大して持ってなかったのですが、こういった例が増えたことで今では暗号通貨自体に悪いイメージを持つようになってしまいました。~~元取れないくらいまで暗号通貨暴落しないかなーと日々思っています。~~

悲しいですが、Docker Hub の Autobuilds を無料で使っていた方は他の CI/CD サービスに移行するなり有料プランを契約するなり考えた方が良さそうです。僕は学生の頃 Autobuilds のお世話になっていました。7 年近く無料で Autobuilds を提供してくれてた Docker Hub に感謝したいです。

# know-how 🎓

## 新しい docker compose
https://zenn.dev/skanehira/articles/2021-06-03-new-docker-compose

docker-compose の Go 実装である Docker Compose CLI の解説記事です。Compose CLI の特徴や、旧来の Python 実装である docker-compose との比較・移行についてなどが説明されています。

Docker Compose CLI についてまだよく知らない方におすすめしたい記事です。

# tool 🔨

## minamijoyo/tfupdate: Update version constraints in your Terraform configurations
https://github.com/minamijoyo/tfupdate

terraform 本体や provider のバージョンを楽に上げることができる CLI ツールです。

指定したディレクトリ以下のディレクトリを再帰的に更新できるので、大規模なリポジトリのバージョン更新作業が楽にできるのが特に嬉しいです。また、更新するバージョンは latest で指定でき、バージョンのリストを出力する機能もあるので、最新のバージョンがなんであるかをわざわざ調べにいく必要がないのも個人的に嬉しいですね。

terraform 更新作業を行うときに使っていきたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [GitHub Enterprise Server 3.1 is now generally available](https://github.blog/changelog/2021-06-04-github-enterprise-server-3-1-is-now-generally-available/)
  - GitHub Enterprise Server 3.1 が正式リリースされました。
  - Actions のワークフロー可視化機能や auto merge が Server 版でも使えるようになります。
- [devongovett/dprint-node: A node API for the dprint TypeScript and JavaScript code formatter](https://github.com/devongovett/dprint-node)
  - Rust 製のコードフォーマッターである dprint の TypeScript/JavaScript プラグインです。
  - TS/JS のフォーマッターと言えば Prettier が浮かびますが、dprint は Prettier の 30 倍近く高速に動作するようです。（[ベンチマーク](https://github.com/devongovett/dprint-node#benchmark)）

# あとがき
最近なかなか休めてない感じがします。朝なかなか布団から出られません。土日にがんばりすぎてるのかも？やっぱ休むのって大事ですね🛏
でもやりたいことたくさんあるんだよな〜Oracle Cloud で遊ぶのとか途中だし...
1 日が 36 時間くらいあると良いんですけど。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### [2021/06/11] 今週のKubernetes + Cloud Native + その他ニュース
https://zenn.dev/bells17/articles/k8s-cloud-native-and-other-20210611

[kubenews](https://kubenews.connpass.com/)という毎週の Kubernetes や Cloud Native 界隈で気になったニュースや記事についてを語る配信の内容を、配信者の一人である [bells17](https://twitter.com/bells17_) さんがまとめた記事です。kubenews 自体は 6/11 時点で 22 回目のようですが、記事については今回が初めてっぽいです。（ちなみに kubenews 自体はじめて知りました。）

表題の通り、kubernetes や Cloud Native、それに関連する技術などのニュースが数多く紹介されています。kubenews 自体は動画なので、記事にまとめてくれることで手軽に情報をキャッチアップできて良いですね。特に気になった話題は動画の方で確認したいです。

[試験的に行った](https://github.com/kubernetes-internal/kubenews/commit/23cef841f95e9efc8bd29e11ba1e64a9751f8776#diff-6dd30587dc5867cc94b55043ac06051b051633f8bb684aba335b6fbffd022855R17-R19)とのことなので今後どうなるかわかりませんが、継続的に読んでいきたいなと思いました。