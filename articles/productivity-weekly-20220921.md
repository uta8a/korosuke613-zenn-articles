---
title: "Productivity Weekly (2022-09-21号) 簡易版"
emoji: "🎤"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220921"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 92 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Improved control over Personal Access Tokens (PATs) · Issue #184 · github/roadmap
https://github.com/github/roadmap/issues/184

- GitHub において、Personal Access Token (PAT) のスコープをリポジトリや Organization に絞ることができるようになる新たな PAT 機能が登場する予定です
- また、Organization 管理者は Organization へのアクセス権を持つ PAT をレビュー、承認できるようにもなる予定とのこと
  - 既存の PAT をブロックすることも可能です
- 一応ロードマップ的には 2022 年の 10〜12 月に対応予定です
- 既存の PAT は特定の機能に対しては細かくパーミッションを設定できますが、アクセスできる場所を指定できません
  - SAML などによる認証が必要な Enterprise に対しては個別に許可する必要があります
- 特定のリポジトリに対する PAT の生成はできないため、PAT の扱いには慎重になる必要がありました
  - GitHub Apps を作ればいいけど正直めんどい
- めちゃ嬉しい機能ですね。既存の PAT は権限が強すぎるのであまり使いたくありませんでした。早くほしいです

## renovatebot/renovate: feat(manager/asdf): add support for .tools-versions as used by asdf
https://github.com/renovatebot/renovate/pull/17166

- 依存関係更新のプルリクエストを自動で作ってくれる Renovate が [asdf](https://asdf-vm.com/) の .tool-versions に対応しました
- ただし今の所対応プラグインは Node.js のみです
- これまでは [`regexManagers`](https://docs.renovatebot.com/modules/manager/regex/) などを使って更新していました
- asdf の特性上プラグインごとに対応が必要なので、他のプラグインに対応するプルリクエストを送るチャンスですね

## Introducing the CircleCI Config SDK | CircleCI
https://circleci.com/blog/config-sdk/

- TypeScript/JavaScript で CircleCI の設定ファイルが書ける CircleCI Config SDK が公開されました
- Dynamic Config と組み合わせて使うことを想定しているようです
- ワークフローを動的に生成するのに活用できますが、他にも、ワークフローのテンプレートとして npm パッケージを作り、複数リポジトリでワークフローを使い回すという活用もできるようです
- ちょっと触ってみました。SDK の開発体験は良いです。
- しかし、CI/CD ワークフローを書くために Node.js プロジェクトを作らないといけないのは重い気がしました
  - ワークフロー自体の可読性が下がる（と思っている）のも気になる
  - YAML で書くのと比べて管理コストが大きく増える気がする
- 個人的にはこういうワークフローみたいなものは宣言的な言語で書きたいため、自分にはあってなさそうでした
- 非常に複雑なワークフローを書く場合や、Dynamic Config を使う必要がある場合は役に立ちそうです

# know-how 🎓

## 特定のユーザーのイベントによるGitHub ActionsのActionを保留状態にしておき、後で手動実行できるようにする - その手の平は尻もつかめるさ
https://moznion.hatenadiary.com/entry/2022/09/14/172613

- Renovate や Dependabot による依存関係更新時の CI はチェック時だけ回せばコンピューティングリソース削減につながるのでは？と思った著者が実際にそれを試したという記事です
- GitHub の Environments 機能を使って、Renovate からの PR に対して承認しないと Actions が実行できないようにすることで、上記の希望を実現しています
- Bot 用のワークフローとそれ以外のワークフローで似たようなものを用意する必要がありますが、最近は reusable workflow もあるためあまり大変ではなさそうです
- Environments 機能を使って Actions の実行をブロックできることは知っていましたが、Bot に対して適用する発想はありませんでした
- 個人的には Renovate がマージされるまで延々と PR をリベースして CI を走らせるのは気になっていたため、ちょっと試してみたいなという気持ちです
  - プライベートリポジトリの場合は使用料金の削減にもつながりますね
- コンピューティングリソースを節約して地球環境や他の利用者に優しくなりたいです（SDGs）

## ossf/package-manager-best-practices: Collection of security best practices for package managers.
https://github.com/ossf/package-manager-best-practices

- OSS のセキュリティに関していろいろやってる組織である Open Source Security Foundation (OpenSSF)が、パッケージマネージャのベストプラクティス集を作成中です
- ただ、現状 [npm](https://github.com/ossf/package-manager-best-practices/blob/f51988aee8a9a1ab0436bbba61c1e94d7270683a/published/npm.md) しかないです
  - README を見る限り少なくとも pip や gem は対応予定っぽい
- あまりパッケージマネージャに焦点を当てたベストプラクティスは見たことがなかったので参考にできる部分は多そうです
- npm だけでもまあまあな文量があります。npm を使っている人は一読しておいて良いと思います
- npm 以外のパッケージマネージャに関する文章はまだありませんが、今後増えることに期待したいですね


## 有志と #ソフトウェアテスト読書マップ を作りました！ - ソフトウェアの品質を学びまくる2.0
https://www.kzsuzuki.com/entry/2022/09/17/114249

- ソフトウェアテストに関する本の属性をまとめたスプレッドシート「ソフトウェアテスト読書マップ」を作ったという記事です
- ソフトウェアテストを学ぶ人が、「どの本に何が書いてあるか」をざっくりつかめるようにすることを目的として作ったそうです
- 初級者向け、上級者向けと言ったレベル情報の他に、テストに関する各トピック（テスト計画や境界値分析など）についてどれくらい載っているかがわかる表となっています
- 何かを学ぶときにどの本から読むべきかを知るのは大変なので、こう言ったマップは嬉しいですね


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [インシデント発生時のチーム対応を支援する「Grafana Incident」、無料でGrafana Cloudが提供。SlackやGitHubなどと連携 － Publickey](https://www.publickey1.jp/blog/22/grafana_incidentgrafana_cloudslackgithub.html)
    - ログ・データ可視化ツール Grafana の SaaS である Grafana Cloud に Grafana Incident が追加されました
    - > Grafana Incidentは、これらのインシデント時に要求される担当者のアサインとそれぞれの業務の支援、進捗の共有などを支援し管理できるクラウドサービスです。
    - 自動で Zoom などのオンライン会議室や Slack チャンネル作成をやってくれたりと、スムーズにインシデント対応するために色々やってくれるそうです
    - インシデント対応時って割とわちゃわちゃしがちで準備がめんどかったり焦って対応手順書を守らなかったりするのでこういうのがあると嬉しいですね
  - [Slack、まとめ機能「Slack Canvas」提供へ。複数チャンネルにまたがる情報を整理・集約して表示可能 - INTERNET Watch](https://internet.watch.impress.co.jp/docs/news/1441236.html)
    - https://twitter.com/SlackHQ/status/1572381339273367552
    - Slack に、情報を集約して表示する機能 Slack Canvas が追加される予定です
    - リリースは来年になりそうとのことです
    - Canvas には Slack のワークフローをまとめたりもできるので、とりあえずここを見に行けばいいという場所になりそうですね
- **know-how 🎓**
  - [Easy way to Create your own API for FREE - DEV Community 👩‍💻👨‍💻](https://dev.to/varshithvhegde/easy-way-to-create-your-own-api-for-free-1mbc)
    - Google スプレッドシートを簡易 API として使う記事です
      - ネタ要素強め
    - 規約的に怪しい気がしますが面白いですね
- **tool 🔨**
  - [JavaScriptのメモリリークを検出するフレームワーク「MemLab」、メタがオープンソースで公開 － Publickey](https://www.publickey1.jp/blog/22/javascriptmemlab.html) 
    - JS のメモリリークを検出するツール、ライブラリである OSS Mamlab を Meta(Facebook)が公開しました
    - 実際に動いている Web サイトを検証するだけでなく、Jest のようなテストランナーと組み合わせて、Node.js 向けプログラムのメモリリークの検証もできます
    - CI にも組み込めそうなので使ってみたいですね。正直僕は Node.js 向けプログラムでメモリリークを気にしたことがほぼ無いのでいい機会になりそうです
  - [fosslife/devtools-x: Collection of offline first developer utilities available as desktop application. all in one place, cross-platform!](https://github.com/fosslife/devtools-x)
    - 開発に便利なツールがまとまったクロスプラットフォーム対応なネイティブアプリ OSS devtools-x です
    - [以前](https://zenn.dev/korosuke613/articles/productivity-weekly-20220126#koneta-%F0%9F%8D%98)、Windows 向けの十徳ナイフのようなツールである DevToys が話題になりましたが、それのクロスプラットフォーム版です
      - 似たようなアプリとして [DevBox](https://www.dev-box.app/) や [DevUtils](https://devutils.com/) がありますが、それらは OSS ではありません
    - カラーコード出すやつとか Diff 見るやつとかは個人的によく使いそうです

# あとがき
くぅ〜最近記事が遅れがちですみません。また今週号はネタ少なめでした。最近はダーツ、スプラ、後は単純に遊びに誘われたりで遊びがちです。1 日が 30 時間くらいあれば...！

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: サイボウズ生産性向上チームインターン2022の参加レポ | sasakiy.net
https://blog.sasakiy84.net/articles/cybozu-intern-2022/

今週のおまけです。

僕のいる生産性向上チームは今年の夏にサマーインターンを開催したのですが、参加してくれたインターン生が早速参加したよ記事を書いてくれました。

選考の話から懇親会の話まで隅々の話を書いてくれています。文量がなんかすごいです。
記事では、生産性向上チームの紹介、参加するまでの流れ、実際にやったタスクについて、障害対応について、感想などが書かれています。

実はこのインターン生が参加しているときは、僕たちが管理している開発環境においてやばい障害（クラウド破産につながる系）が発生してしまって、予期せずインターン生にも障害対応をしてもらいました。
我々としては泥臭い作業をインターン生にさせてしまったため、やっちまったなーという感じではあったのですが、参加してくれたインターン生は結構楽しんでくれたらしいので、まあいい経験になったならいいかという感じでした。
（さすがに狙って起こすのはできないのでインターン期間中に障害対応できるのはめちゃレアケースです。）

この記事ではタスクに関する話だけでなく、開発環境の話とかモブの話とかも書いてくれてて外から見るとどういう感じなのか知れたのも嬉しいですね。

生産性向上チームが何やってるか知りたい方や来年インターンワンチャンあるなという方はぜひ参考にしてみてください。
