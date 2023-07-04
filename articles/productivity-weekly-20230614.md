---
title: "Productivity Weekly (2023-06-14号)"
emoji: "🧁"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230614"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-14 単独号です。

今回が第 116 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

:::message
2023/06/21 号は、生産性向上チームが福岡出張に行っていたためお休みです。
次回は 2023/06/28 号を予定しています。
:::

# news 📺

## Announcing Live Tail in Amazon CloudWatch Logs, providing real-time exploration of logs
https://aws.amazon.com/jp/about-aws/whats-new/2023/06/live-tail-amazon-cloudwatch-logs/

CloudWatch Logs で最新のログをリアルタイムで閲覧できる機能「Live Tail」が追加されました。

ロググループの閲覧時に「自動再試行」というボタンを押すと数秒おきにリロードしてくれる機能がありますが、ロググループやログストリームを複数跨いで取得することはできませんでした。

今回追加された「Live Tail」では、指定したロググループにフィルターを適用することで、フィルターに合致したログをリアルタイムに取得できます。

試しに Live Tail を使ってみました。
WebSocket でフィルターに合致するログが飛んできていることを確認しました。ロググループを跨いで取得できています。

そこで流れてきたログの直前・直後のログを見たい時は、ログストリームのリンクをクリックすると、そのログの記録されたログストリームが開かれ、確認できるようになります。

なお、Live Tail 機能は従量課金で使用できます。
執筆時点（2023-06-26）では、無料枠があり、毎月 1,800 分の利用が無料です。
それを超えると、1 分あたり $0.01 かかります。

https://aws.amazon.com/cloudwatch/pricing/
※ 2023-06-26 現在、日本語のドキュメントでは Live Tail の記述がまだ無いので注意が必要です

便利そうですが、お金がかかるので停止するのを忘れないようにしましょう。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Release v3.5.3 · actions/checkout
https://github.com/actions/checkout/releases/tag/v3.5.3

actions/checkout、v3.5.3 がリリースされました。

このリリースでは、`sparse-checkout` オプションが追加されています。
https://github.com/actions/checkout/pull/1369

指定したディレクトリやファイルのみチェックアウトできます。

また、cone モードの有効化・無効化を選択できるよう、`sparse-checkout-cone-mode` オプションが追加されています。
というのも、cone モードを有効化すると、ディレクトリの指定しかできません。
cone モードを無効化すると、パターンによってディレクトリやファイルを指定できるようになります。

ただし cone モードを無効化するとパフォーマンスが低下するため、基本的に有効化することが推奨されています [^cone] 。

[^cone]: [Git - git-sparse-checkout Documentation](https://git-scm.com/docs/git-sparse-checkout#_internalsnon_cone_problems)

巨大モノレポで全部チェックアウトすると時間がかかる場合、`sparse-checkout` オプションは有用そうです。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Copilot Product Specific Terms の第三者から訴えられた場合は GitHub が最大 50 万ドルまで保護する話が消えている件

> 今見たら、GitHub Copilot Product Specific Terms 変更されてますね。。
第三者から訴えられた場合は GitHub が最大 50 万ドルまで保護する話が書かれていたのですが、消えてます。
https://twitter.com/miyajan/status/1668433255924891649

かつて、GitHub Copilot は第三者から訴えられた場合に、最大 50 万ドルまで保護する規約がありましたが、規約からその文言が消えていました。

完全に保護がなくなったのかと Twitter が盛り上がっていましたが、[@miyajan](https://twitter.com/miyajan) さんが GitHub の中の人に質問したところ、どうやら GitHub 本体の規約に準ずるようになっただけで、保護がなくなったわけではないとのことです。

> GitHub の中の人に質問したところ、GitHub 本体の規約に準ずるようになっただけで、保護がなくなったわけではないとのことです。自分はまだ詳細を確認してないですが、GitHub 本体の規約に第三者からの訴訟の保護について書かれており、顧客にとってプラスとなる変更のはずとのことです。
https://twitter.com/miyajan/status/1668864479826939908

気になって規約を確認しました（規約を一言一句読破したわけではない＆規約読むのは素人なので参考程度に捉えてください）。

GitHub の「[GitHub Customer Agreement / GitHub General Terms](https://github.com/customer-terms/general-terms)」に 6 章では第三者からの訴訟について書かれています（以下は [GitHub Customer Agreement / GitHub General Terms](https://github.com/customer-terms/general-terms) から引用）。

> (a) By GitHub. GitHub will defend Customer against any third-party claim that a Product made available by GitHub for a fee and used within the scope of this Agreement (unmodified as provided by GitHub and not combined with anything else), misappropriated a trade secret or directly infringes a patent, copyright, trademark, or other proprietary right of a third party. If GitHub is unable to resolve a claim of misappropriation or infringement, it may, at its option, either (1) modify or replace the Product with a functional equivalent or (2) terminate Customer’s　license and refund any license fees, including amounts paid in advance for any usage period after the termination date. GitHub will not be liable for any claims or damages due to Customer’s continued use of a Product after being notified to stop due to a third-party claim.

確かに、著作権侵害等で訴えられた際に GitHub が顧客を防御する旨が書かれていますが、元々 GitHub Copilot Product Specific Terms に書かれていた最大 50 万ドルまで保護するという文言はありません（文書内の他からも見つけられませんでした）。
また、「defend」が具体的に何をしてくれるかは規約からはあまり読み取れませんでした。

規約の確認日は日本時間の 2023/07/04 AM 10:48 です。

本当に顧客にとってプラスの変更なのかは正直よくわかりませんでした。
規約などに強い方、調べてみてください。

## Release v1.5.0 · hashicorp/terraform
https://github.com/hashicorp/terraform/releases/tag/v1.5.0

Terraform 1.5 が正式にリリースされました。
以前 Weekly でも紹介した `import` ブロック、`-generate-config-out` オプションが利用できます。

- [Terraform 1.5 で追加予定の import ブロック、-generate-config-out オプションの話](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230531#terraform-1.5-%E3%81%A7%E8%BF%BD%E5%8A%A0%E4%BA%88%E5%AE%9A%E3%81%AE-import-%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%E3%80%81-generate-config-out-%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E8%A9%B1)

もう 1 つの目玉機能？の `check` ブロックについては、クラメソさんが試した記事を出してれています。

- [Terraform v1.5.0 で追加された import ブロックと check ブロックを試してみた | DevelopersIO](https://dev.classmethod.jp/articles/terraform-v1-5-0-import-and-check-sample/)

アサーションをリソース横断でまとめて書けるのが便利という感じですかね。強制力を持たないのは少し気になります。

新しくリリースされた v1.5、従来の手動でのインポートをしている人などは特に早速使ってみるのが良いと思います。大変便利です。
最新バージョンは [v1.5.2](https://github.com/hashicorp/terraform/releases/tag/v1.5.2) になるので、使うならバグフィックスの入った最新バージョンをお勧めします。

# know-how 🎓

## 社内用GitHub Actionsのセキュリティガイドラインを公開します | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20230609-github-actions-guideline/

メルカリさんによる、メルカリ社内での GitHub Actions 利用ガイドラインを公開する記事です。

実際に使われているガイドラインの一部が記されています。
大きく 3 部に分かれており、GitHub Actions を使う際の脅威、対策、チェックリストが書かれています。

:::details メモ：各見出し

- 脅威を知る
  - 権限設定の不備を突く攻撃
    - Pull Request を契機に起動するトリガー
  - インジェクションによる攻撃
    - インジェクションによる攻撃例 1
    - インジェクションによる攻撃例 2
    - インジェクションによる攻撃の影響
- 対策を考える
  - 最小権限の原則に従う
  - シークレットの利用について
  - イベントトリガー
  - Job / Step の単位
  - Dependabot / Renovate を利用した GitHub Actions の更新
  - サードパーティの Action を利用する場合の対応
  - Action のソースコードを監査する
  - 不要なワークフローや Job は削除する
  - インジェクションを防ぐ
    - actionlint によるインジェクションの検知
  - その他
- セルフチェックリスト
  - CODEOWNERS の設定を見直す
  - GITHUB_TOKEN の Permissions を見直す
  - GitHub Actions Secrets を見直す
  - ワークフロートリガーを見直す
  - サードパーティの Actions を見直す
  - インジェクション対策を見直す

:::

僕も読んでみました。個人的には次のことが印象に残りました。

- > PRの処理には `pull_request` イベントを使えるなら使う
  > リポジトリへの write はできないよう制限されている
  > `on: push` を PR 用に使っていたら見直す
  - `pull_request` イベントはリポジトリへの write が制限されているんですね。知りませんでした
  - 普通にプルリクでの検証目的に `on: push` 使ってたので改めたいです
- > GitHub Actions は全文をマスクデータとして扱ってくれるが部分文字列はマスクされないため
  - これも知りませんでした。json などでシークレットをまとめる運用はやったことがないのですが、気をつけたいです
- > 信頼されない式の入力値を中間環境変数(intermediate environment variable)に設定する。
  > これによって `${{ github.event.issue.title }}` 式の値はスクリプトの生成に影響するのではなく、メモリに保存されて変数として使用される
  - あまり意識したことはなかったです。確かにインジェクション対策として有効であるため、コンテキストから取得する場合などは一度変数に入れたいですね

とてもわかりやすく、とても参考になりました。
GitHub Actions を使う前に知っておきたいですし、GitHub Actions に関する規約を作る際の参考になると思います。
GitHub Actions などの CI を使う際は、権限を最小にするやサードパーティの依存を固定するなど、なるべく安全になるよう気をつけているつもりでしたが、まだまだ硬くできるなと思いました。

GitHub Actions を使う方はぜひご一読してみてください。

## Developer experience: what is it and why should you care? | The GitHub Blog
https://github.blog/2023-06-08-developer-experience-what-is-it-and-why-should-you-care/

より良い開発者体験への投資が、開発者の生産性に大きく影響することが書かれています。
以下に重要そうだなと思ったところを書き出してみました。

- 開発者体験を最適化するには、開発者が生産的で影響力があり、満足できるコラボレーション環境を作ること
- 今日のソフトウェア開発には様々なツール、テクノロジー、サービスが関わっており、開発者は複雑な環境を管理する必要がある
- 優れた DevEx は環境・プロセス・ワークフローの一貫性を高め、面倒な手動プロセスを自動化する
  - 結果、開発者の生産性向上、セキュリティの強化に繋がる
- [Forrester opportunity Snapshot](https://humanitec.com/blog/key-findings-from-forrester-opportunity-snapshot) によれば、回答者の 74% が「Dev Ex の向上は、開発者の生産性を向上させることができる」と回答している

生産性向上の恩恵がわかりやすく書かれています。

もし生産性向上がもたらす恩恵を他の人に伝えたい時は、この記事を見るよう薦めてみると良いかもしれません。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# tool 🔨

## OrbStack
https://orbstack.dev/

新たな Docker Desktop 代替が登場しました。その名は OrbStack です。
macOS 向けのアプリケーションであり、Docker コンテナと Linux VM を高速、軽量、シンプルに実行することを謳っています。

実際インストールしてみると、非常に簡単に Docker コンテナの実行環境を用意できました。起動、終了も他のものと比べて確かに速いです。

OrbStack は Linux VM 環境も構築できます。こちらに関しては他の Docker Desktop 代替では珍しい機能ですね。
個人的に Linux 環境はたまに欲しくなるので、手元でささっと動かせるのは嬉しいです。

とても期待できるアプリケーションですが、現在ベータ版となっており、ベータ期間が終了したら有償製品となることが [FAQ](https://docs.orbstack.dev/faq#free) に書かれています。

> OrbStack is completely free to use during beta, but it will become a paid product afterwards. We're still working out the details (personal vs. business use, subscription vs. perpetual license, pricing, OSS and student discounts, etc.) and will share more information as we get closer to launch.

とにかく軽快であるため、Rancher Desktop を使っていたのですが、OrbStack に乗り換えました。
今のところは問題なく使えています。

将来的に有償化することが書かれていますが、個人的には Docker Desktop 代替として有償であっても十分に価値があると思っています[^docker_desktop]。
正式版リリースを待ちたいです。

[^docker_desktop]: Docker Desktop (というか Docker Team や Docker Business)よりもお金を払いたいです。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [プログラミングのためのBGMなど、仕事や勉強の邪魔にならない無料で使えそうなBGM集。2023年版 － Publickey](https://www.publickey1.jp/blog/23/bgmbgm2023.html)
    - ある意味生産性向上ネタですね。BGM は集中力を高めるためにも重要です
    - よくある 24 時間 365 日ライブ配信の音楽配信チャンネルをまとめており、それぞれの特徴も述べています
    - 作業 BGM として流すとなんかカフェとかにいるみたいでテンション上がりますね

# あとがき
今週号の投稿が大変遅くなってしまいすみません...
僕の誕生日（6/13）の週で毎日忙しかったり、チームで福岡出張したり、FF16 をずっと遊んでいたり、ICL という目の手術を行ったりと、あまり時間が取れずにこんな遅くなってしまいました。

ICL はなかなか良いです。手術は怖かったですが、メガネ無しで視力がめちゃ良くてなんかすごいです。僕はコンタクトがダメなので、裸眼で外を歩けるのは素晴らしいことです。
なかなかお高いですが、お金が余ってるメガネ民の人はやってみてください。

:::message
2023/06/21 号は、生産性向上チームが福岡出張に行っていたためお休みです。
次回は 2023/06/28 号を予定しています。
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
