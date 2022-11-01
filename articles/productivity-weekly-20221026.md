---
title: "Productivity Weekly (2022-10-26号)"
emoji: "🗳"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221026"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 97 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions: larger hosted runners are now automatically created for customers | GitHub Changelog
https://github.blog/changelog/2022-10-20-github-actions-larger-hosted-runners-are-now-automatically-created-for-customers/

先日 GitHub Actions において、[よりパワフルな GitHub-hosted Runner が使える機能 larger runners がパブリックベータで登場](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20220907?redirected=1#github-actions-larger-runners---are-now-in-public-beta-%7C-github-changelog)しましたが、よく使われる組み合わせを GitHub がデフォルトで用意してくれる Default Larger Runners が今回さらに登場しました。

larger runners はユーザが自分達であらかじめカスタムしたランナーを登録しておく必要がありました。Default Larger Runners はランナーグループであり、4 種類のランナーがあらかじめ用意されています。

- 4-cores Ubuntu Runner
- 8-cores Ubuntu Runner
- 16-cores Ubuntu Runner
- 8-cores Windows Runner

ubuntu-latest-4-cores のようなあらかじめ用意されたラベルをワークフローに書くだけで使えるようになるため利用者からするとパワフルなランナーを簡単に使えて嬉しいですね。

この機能を使うためには、ベータプログラムへのサインアップが必要です。また、GitHub Teams および GitHub Enterprise Cloud ユーザ向けの機能となっています。

さっそく僕も使ってみようと思ったのですが、ラベルを指定してもいつまで経ってもジョブが始まりませんでした...そもそも Default Larger Runners というランナーグループがありませんでした。ベータプログラムにはサインアップできているのですが...

> Note that this change only applies to customers who are onboarded to the beta on October 20, 2022 and later.

上記記事を見ると、どうやら記事の発表日である 2022 年 10 月 20 日以降にベータ版にオンボーディングしたユーザのみに適用されているようです。なんでかわかりませんがそれより前にオンボーディングしたユーザにはこの機能は解放されていないのかもしれません...なぜ...

まだまだパブリックベータなのでなんとも言えませんが、先にパワフルなランナーが用意されているのは嬉しいですね。必要な場面で使いたいです。

## Explicitly Set the Latest Release | GitHub Changelog
https://github.blog/changelog/2022-10-21-explicitly-set-the-latest-release/

GitHub Releases において、リリース作成時にそのリリースが `latest` かどうかを指定できるようになりました。

これまでは最新の日付（同じ日付の場合セマンティックバージョンの新しい順）のリリースが `latest` でした。

これにより例えば古いメジャーバージョンのマイナーリリースを行う場合でも、既存の新しいメジャーバージョンを `latest` にし続けることができます。

ユーザから見てもどれが本当の `latest` なのかわかりやすくなるのはいいですね。活用していきたいです。

## Manage caches in your Actions workflows from Web Interface | GitHub Changelog
https://github.blog/changelog/2022-10-20-manage-caches-in-your-actions-workflows-from-web-interface/

GitHub Actions のキャッシュが WebUI 上で削除可能になりました。

actions/cache のキャッシュはときたまおかしなことになるため、たまーにキャッシュを削除したい場面があります。[ちょっと前に API 経由で actions/cache のキャッシュを削除できるようになりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220629#list-and-delete-caches-in-your-actions-workflows-%7C-github-changelog)が、WebUI 上からは削除できなかったため使い勝手は決して良くありませんでした。

この度 WebUI 上からキャッシュの削除ができるようになったため、とても楽になりましたね。キャッシュを消したい場面は滅多にないと思いますが、覚えておきたいです。

# know-how 🎓

## GitHubのIssueやPull requestsにアップロードした画像の削除
https://tech.coincheck.blog/entry/2022/10/21/113906

GitHub の Issue やプルリクエストに貼った画像を削除するためにやったことをまとめた記事です。

> GitHubのIssueやPull requestsに添付した画像はWebにアップロードされ、パブリックなURLが割り当てられます。このURLは外部に対して公開されており、そのリポジトリがPrivateであったとしても誰でも自由にアクセスが可能です

とあるように、GitHub の Issue やプルリクに添付した画像は認証なしで誰でもアクセスできます（上記引用内容が端的にまとまっててまとめて引用してしまった）。

この記事では、背景、対応（公式ドキュメントの確認、削除方法の調査、削除依頼）、補足などが載っています。実際に削除する場合のサポートとのやり取りの概要も載っており、同じ場面に直面したとき参考になります。

GitHub のこの仕様は中々知らない人も多そうです。著者の組織のように画像貼り付けに関するルールを決めてもいいかもしれませんね。

## GitHub Actions / GitHub CLI を使った PR レビューをサポートする取り組み - Uzabase for Engineers
https://tech.uzabase.com/entry/2022/10/24/180306

GitHub において、プルリクエストに特定の文字列が含まれていたら、注意を促すコメントを書き込む手法を紹介した記事です。

`ALTER TABLE` を含んだスクリプトが原因で過去に障害が起こったことから、再発防止のためにコメントにて注意喚起を行いたいという背景から、GitHub Actions と GitHub CLI を使って仕組みを実装したとのことです。

この記事では、背景、使用ツール、フロー、実装（ワークフロー）、挙動などが載っています。わかりやすいアクティビティ図と動くワークフローが載っていて良いです。

たった数十行で効果的な対策ができそうでお手軽だと思いました。アクション化や reusable workflow 化して使いまわせるようにするのもアリですね。
ポストモーテムのような過去の障害事例は記録しても参照されなければ意味がない（と思う）ので、こういうふうに過去の障害事例を知らない人、忘れてしまった人も機械的に気付ける仕組みは良いですよね。真似したいです。

## Github actions のコスパについて考えた - たゆたふ。
https://hero.hatenablog.jp/entry/2022/05/github-action-cost-performance

GitHub Actions をクラウドで動かす場合とセルフホストする場合で、どれだけコスパに差があるかを考えたという記事です。

GitHub Actions（GitHub-hosted Runner）は簡単に利用できるし無料枠はあるしでとても便利ですが、実際のところセルフホスティングするのと比べてどれくらいコスパが良いのかは気になるところです。

この記事では、同じようなスペックで GitHub-hosted Runner と複数のセルフホストランナーの実行環境を比べて、どれくらいの使用量でどれくらいのコストがかかるかを調べています。比較対象は AWS のサービス（大まかに Fargete、EC2）となっています。

それぞれの環境の「利用料($) * 利用時間(Hour)[^traffic]」を比べたグラフが貼られており、一目でどれくらいの利用時間でどの環境が一番安いかがわかります。グラフを基にどういう選択をするのが良さそうかの考察も載っています。

前々から多分こうだろうなーろ考えたことはあるけどしっかりは考えたことがなかったので、とてもありがたい記事でした。もちろんコンピューティング費用だけでなく運用にかかるコスト（手間）や常時起動台数やスケーラビリティなども考えなければいけませんが、もし GitHub-hosted Runner をヘビーユーズしているのであれば他の環境への乗り換えを考える価値は十分にあるなと思いました。

[^traffic]: 通信量などの細かい課金要素は含まず。

## Lint Night #1 - connpass
https://lintnight.connpass.com/event/263931/

Lint をテーマにしたイベントが開催されます。主催は DeNA の [SWET](https://engineering.dena.com/team/quality/swet/) さんです。

> Lint Nightはプログラミング言語不問でLintに関するトピックを取り扱う勉強会です。ここでLintとはソースコードや文書を静的に解析して問題をみつけるツールのことです。ただ、どこまでをLintとするかには幅があるようです。

Lint に関するトピックを取り扱う勉強会で、[RuboCop](https://github.com/rubocop/rubocop)（Ruby の代表的な Linter）の core team メンバーである [koic](https://twitter.com/koic) さんと [textlint](https://github.com/textlint/textlint) の開発者である [azu](https://twitter.com/azu_re) さんが発表されるとのことです。

オフライン（渋谷）とオンラインの両方で開催されるとのことなので、興味のある方は参加してみましょう。オフラインイベントはまだまだ珍しい感じあるのでワクワクですね。

:::message
僕も行きたかったんですけど、既に別予定が入ってしまっていました...😢
第 2 回は参加したいですね。
:::

# tool 🔨

## Introducing Turbopack: Rust-based successor to webpack
https://vercel.com/blog/turbopack

有名なバンドラーと言えば webpack、esbuild ですが、この度 Vercel が新しい Web のバンドラー Turbopack を発表しました（アルファ）。

Turbopack は Rust 製であり、大規模なアプリケーションにおいて webpack や esbuild と比べて非常に高速であることを謳っています。なぜとても速いかについてはキャッシュを使用して同じ作業を 2 回実行しないことに重点を置いていることが大きな理由のようです。

また、Turbopack は高速な dev server を実現するために Lazy bundling を取り入れています。
dev server を起動すると最初にビルドされるのは最初に表示されるページ（とそれに必要な物）だけで、それ以降はアクセスするたびに必要なコードがバンドルされるという仕組みのようです。

なんで Turbopack を作ったかや高速である仕組みの詳細は次のドキュメントに載っています。

- [Why Turbopack? – Turbopack](https://turbo.build/pack/docs/why-turbopack)
- [Core Concepts – Turbopack](https://turbo.build/pack/docs/core-concepts)

アルファ版であるため本格利用はまだ厳しいと思いますが、大規模アプリケーションにおいては劇的に開発環境およびデプロイにかかる速度が高速になるかもしれませんね。今後も動向をチェックしていきたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Docker DesktopがWebAssemblyランタイムを統合。コンテナと同様にWebAssemblyイメージを実行可能に － Publickey](https://www.publickey1.jp/blog/22/docker_desktopwebassemblywebassembly.html)
  - [Wasm Labsが「Wasm Worker Server」をオープンソースで公開。Node.jsやDenoのようにWebAssemblyのWorkerをイベントドリブンに実行 － Publickey](https://www.publickey1.jp/blog/22/wasm_labswasm_worker_servernodejsdenowebassemblyworker.html)
- **know-how 🎓**
- **tool 🔨**
  - [nachoaldamav/ultra: JavaScript package manager](https://github.com/nachoaldamav/ultra)
    - 新手の Node.js パッケージマネージャ ultra です
    - 高速であることを謳っており、pnpm と同じ仕組みを使って高速化を実現しているとのことですが、それなら pnpm で良いのでは？とちょっとだけ思ってしまいました

# あとがき
最近投稿が遅くてすみません。相変わらず色々なことに時間を割いてしまっています。

紹介できていなかったのですが、またしてもインターンに参加してくれたインターン生が参加ブログを書いてくれました🎉
今回は第一タームの参加者です。参加できて良さげだったようで嬉しいのですが、やはり CI/CD 周りもやれればよかったな〜と反省しています😇

https://zenn.dev/yutyan/articles/64f578e132a4d7

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
