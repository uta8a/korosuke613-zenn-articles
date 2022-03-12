---
title: "Productivity Weekly (2022-03-09号)"
emoji: "🏦"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220309"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 65 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Pull Request File Tree Feedback · Discussion #12341 · github/feedback
https://github.com/github/feedback/discussions/12341

GitHub でプルリクエストの差分にファイルツリーを出せるようになりました（Feature Preview）。ユーザごとに「Feature preview」から有効にすることで利用できます。

![](/images/productivity-weekly-20220309/gh_file_tree.png =400x)
*Feature preview*

ファイルの階層がわかりやすくなり、手軽にジャンプもできるようになったのでだいぶレビューが捗りそうですね。

## Dormant user reports for GitHub Enterprise Cloud (Beta) | GitHub Changelog
https://github.blog/changelog/2022-03-04-dormant-user-reports-for-github-enterprise-cloud-beta/

GitHub Enterprise Cloud において、90 日以上アクティブじゃないユーザー一覧をダウンロードできるようになりました（ベータ）。

[ドキュメント](https://docs.github.com/en/enterprise-cloud@latest/admin/user-management/managing-users-in-your-enterprise/managing-dormant-users)によると、アクティブには以下の行動が含まれるようです。

- GHEC へのサインイン
- Issue、Pull Request へのコメント
- リポジトリ作成、削除、Watch への追加、スターの追加
- コミットのプッシュ
- Personal Access Token や SSH キーを使用したリソースへのアクセス

GHEC へのサインインはともかく、その他の行動は該当 Enterprise への行動に限定されているのでしょうか。PAT や SSH キーの利用も含まれているのは良いですね。

GHEC はユーザ数課金（事前にシートを購入する）[^ghec_price]なので、長く利用していない人を定期的に Remove することで幾分かのコスト削減が見込めますね[^ghec_cost]。また、不要な権限を与えないという点においても定期的に棚卸しやすくなるのは嬉しいです。ただ、90 日という期間が少し短いような気もしますね。もうちょっと長い期間でも出せるようになると使い勝手は上がりそうです。

まだこの機能はベータ版なので、正式リリースを待ちたいですね。

[^ghec_price]: https://github.com/pricing によると、2022/03/11 時点で $21 per user/month となっています。
[^ghec_cost]: とはいえ雀の涙程度かもしれませんが...特に年契約しててディスカウントも効いてるとかだと余り効果はないかも。更新時に棚卸するのはアリかもしれません。

## Try Insights Snapshot in your GH repo - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/try-insights-snapshot-in-your-gh-repo/43169

CircleCI において、Insights のバッジが登場しました。ワークフロー * ブランチごとに直近 30 日以内のスループットの平均、95%tile の実行時間、成功率を SVG として取得できます。

`https://dl.circleci.com/insights-snapshot/gh/<org_name>/<project_name>/<branch_name>/<workflow_name>/badge.svg` の `<>` それぞれに値を入れることで画像を出せます（WebUI 上からスニペットを生成することはまだできなさそうです）。

例えば、[cybozu/neco-containers](https://github.com/cybozu/neco-containers) の main ワークフローの main ブランチの場合は以下のようになります。

[![](https://dl.circleci.com/insights-snapshot/gh/cybozu/neco-containers/main/main/badge.svg)](https://app.circleci.com/insights/github/cybozu/neco-containers/workflows/main?branch=main)

画像だけだとブランチ名、ワークフロー名がわからないのがちょっと気になりますね[^repo]。

使い所はまだあまり想像できませんが、リポジトリの README.md に貼ってあるとテストにどのくらいの時間がかかるのかなどがすぐわかるのは良いですね。早く WebUI から簡単にスニペットを生成できるようになってほしいです[^feedback]。

[^repo]: README.md などリポジトリに貼ることが多いと思うのでプロジェクト名（≒リポジトリ名）は無くて良いかなと思います。
[^feedback]: 一応フィードバック送っといた。https://discuss.circleci.com/t/try-insights-snapshot-in-your-gh-repo/43169/2


## Github Actions の actions/* アクションに軒並みメジャーアップデートが来た
GitHub Actions の公式アクションこと [actions organization](https://github.com/actions) 下のアクションが軒並みメジャーアップデートしました。

例
- [actions/checkout v3.0.0](https://github.com/actions/checkout/releases/tag/v3.0.0)
- [actions/setup-node v3.0.0](https://github.com/actions/setup-node/releases/tag/v3.0.0)
- [actions/labeler v4.0.0](https://github.com/actions/labeler/releases/tag/v4.0.0)
- など

一部例外はありますが[^cache]、多くの actions 配下アクションがメジャーアップデートされ、ランタイムに Node.js 16 が使われるようになりました。[先日 JavaScript action で `node16` が指定できるようになりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#javascript-actions%E3%82%92node16%E3%81%A7%E5%8B%95%E3%81%8B%E3%81%99%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B---kengo's-blog)。これに対応したアップデートと言えます。

Node.js 12 のサポートは近々切れる予定なので、actions 配下のアクションを使っている方は早めに更新作業をしておきましょう。また、JavaScript action を開発している方も Node.js 16 対応しましょう。

[^cache]: 例えば [actions/cache](https://github.com/actions/cache) は 2022/03/12 時点の最新版が v2.1.7 とまだ最新リリースにおいては `node12` が使われている。

# know-how 🎓

## GitHubセキュリティ Organization運用のベストプラクティス
https://zenn.dev/tmknom/books/github-organization-security

GitHub の Organization 運用におけるベストプラクティスを開設する記事群です。Zenn の「本」形式となっており、無料で閲覧できます。

アカウント管理やデータ保護、モニタリングなどトピックごとにやっておくべき設定や取り組みが書かれています。[Actions がプルリクエストを Approve するのを禁ずるオプション](https://zenn.dev/tmknom/books/github-organization-security/viewer/github-actions#github-actions%E3%81%AB%E3%82%88%E3%82%8B%E8%87%AA%E5%8B%95approve%E7%A6%81%E6%AD%A2)に関する話や、[Audit ログのストリーミング](https://zenn.dev/tmknom/books/github-organization-security/viewer/monitoring#audit%E3%83%AD%E3%82%B0%E3%81%AE%E4%BF%9D%E5%AD%98%EF%BC%88enterprise%E9%99%90%E5%AE%9A%EF%BC%89)に関する話も載っているなど、最近の事情に追随した内容となっていて良いです。

Organization/Enterprise 管理者にはもちろんのこと、一般ユーザにもおすすめしたい内容となっています。なかなかのボリュームなのに無料で公開してくれているのは嬉しいですね。僕も読んだのですが、知らない設定やなるほどと思うノウハウを知れてとても良かったです[^chinami]。

:::message
以下の注釈で笑いました。とてもわかります（危険手当はともかく）。僕も正直強い権限なんて滅多に持ちたくないですね 😇

> 個人的にはGitHubに限らず、ハイリスクなシステム管理権限の保有者には危険手当とか出してほしいぐらいです。特権管理なんてやるもんじゃないですよ、ホントに。 ↩︎
> *https://zenn.dev/tmknom/books/github-organization-security/viewer/pam*
:::

[^chinami]: ちなみにこれを書いたのは[クラウド破産を回避するInfrastructure as Code実践ガイド](https://booth.pm/ja/items/2366365)を執筆した tmknom さんです。パブリッククラウドを扱う人におすすめしたい本です。

## リファクタDays - 開発生産性を上げる取り組み - - LIFULL Creators Blog
https://www.lifull.blog/entry/2022/03/01/100000

技術的負債を解消を確実に進めていくために、明示的に技術的負債を解消するための時間・期間（リファクタ Days）を設けた、という取り組みに関する記事です。この記事では、技術的負債を解消する上での課題、リファクタ Days の概要、効果などが載っています。

リファクタ Days は 3 週ごとに 3 日間負債解消に取り組むというもので、これを半年間行ったとのことです。また、効果も定量的に示すことができており、リファクタ Days が一定の開発生産性向上に寄与したことがわかります。

僕が驚いたのは原則リファクタ Days 実施中はプロジェクトに関する活動をしないという部分です。実施中は本来の開発が進まなくなるのでなかなか周りの理解を得るのが大変だったんじゃないかなと思います（周りの協力を得ることに関しては記事中にも載っている）。それでも半年間行ったのはすごいです。

あらゆる開発組織が技術的負債とそれの解消に苦しめられてると思います。LIFULL さんの取り組みはとても参考になりそうです。これくらい思い切ったことをしないと負債解消は進まないかもしれませんね。

## ESLint の設定を ESLint でテストする | スタディスト開発ブログ
https://studist.tech/test-eslint-config-by-eslint-8d03870a23d9

ESLint の設定を ESLint でテストすることで設定周りの課題を解決したという記事です。記事には、課題、解決策、導入後などが載っています。

ESLint の設定が複雑化し、意図通りに設定が反映されているのかどうか検証しづらい、バージョンアップで挙動が変わるかの確認が難しいなどといった課題から、ESLint が意図通りに振る舞うかどうかを検証するためのテスト対象コードを作成し、それに違反があるかどうかを ESLint で検証するという内容になっています。

検証時にわざと違反を起こして違反内容を確認するのではなく、わざと違反を ignore するコメントを書いてそれが有効に機能しているかどうかを確認するというのが面白いです（`reportUnusedDisableDirectives`、知りませんでした）。この方法だと検証が簡単になります。

こんな方法があったのかと思う内容でした。ESLint の設定をカスタマイズしている人におすすめです。

## カンムにおけるGitHub Projects Beta活用方法 - カンムテックブログ
https://tech.kanmu.co.jp/entry/2022/03/02/105111

GitHub Projects (Beta) の活用事例です。記事では、背景、導入の目的、導入前に行った実験（下準備に近い？）、学びなどが載っています。

Projects (Beta) が持つ各機能をどう使っているかやなぜ導入するのかは Projects (Beta) は事例として特に参考にできそうだと思いました[^priority]。

GitHub Projects (Beta)が気になってる、導入を考えてるという方も、すでに利用されている方にもおすすめしたい記事です。

[^priority]: ちなみに個人的には Priority の定義が参考になりました。

# tool 🔨

## TerraformのCI/CD基盤を自動構築してくれるサービスSpaceliftを触ってみた
https://zenn.dev/yuta28/articles/spacelift-tutorial

IaC のための CI/CD プラットフォーム Spacelift を触ってみたという記事です。記事では、Spacelift について、ハンズオンの内容、Policy as Code について、所感などが書かれています。

Terraform や Pulumi、CloudFormation に対応しており、Terraform Cloud や Atlantis のような IaC の自動適用などを行うサービスに近そうです。また、Policy as Code に対応しており、Spacelift に関するポリシー（何を実行できるかや誰が実行できるかなど）を設定できるようになっています。

自前で IaC の CI/CD 基盤構築に疲れている方や Terraform Cloud などをすでに利用されている方も参考にできそうな記事だと思いました。僕は Spacelift を知らなかったので参考になりました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Actions: Publish custom summary documents (Cloud) · Issue #470 · github/roadmap](https://github.com/github/roadmap/issues/470)
  - GitHub Actions でジョブ実行結果に Markdown でサマリーを追加できるようにする機能が計画されています
  - テスト結果のレポートとかを表示しやすくなりそうでいいですね

# あとがき
今週号はなんとか今週中に出すことができました（？）。

最近現金を振り込むイベントが個人的にあったのですが、振込先を間違えてしまって面倒なことになりました。
普段はちゃんと振込先を確認して振込手続きをするのですが、今回なぜか確認せずに実行してしまいました。悲しい。

振込は取り消せず、振り込まれた後にそれを返金するという組戻し手続きをしないといけませんでした。
この組戻し手続きは振り込まれた側が返金を拒否できるようで、最悪お金は帰って来ません 😇
しかも手数料が 800 円強必要でした。返ってきてもこなくても手数料はかかります（勉強代として割り切る他ない）。
振り込んだのは 10000 円強なので返ってこなくても死ぬわけではありませんが、やはり返ってきてほしいですね。
お相手の慈悲に期待です。みなさんもお気をつけください。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message
すみません、今週のおまけはお休みです。
:::

## 宣伝
:::message
生産性向上チームで宣伝したいことがあるので宣伝させてください。
内容は先週号のものと同じです。
:::

### Productivity Weekly の内容を自由に話す会をやります。

https://cybozu.connpass.com/event/241131/

Productivity Weekly で出てきたネタについて生産性向上チームが自由に話す Cybozu Productivity News を初開催します🎉 

事前に収録・編集した映像を YouTube でプレミア公開します。配信後も見られるようにするのでこの時間に合わないという人もいつでも見られます。その時間に Twitter ハッシュタグ([#cybozu_productivity_news](https://twitter.com/hashtag/cybozu_productivity_news?f=live))で質問とか来たらリアルタイムで答える予定ではあります。

初開催なので今後どうなるかさっぱりわかりません😇
良ければ見てください。

### 生産性向上チーム、今年もサマーインターン開催するってよ

https://twitter.com/Shitimi_613/status/1501360726966878212

**生産性向上チームは今年もサマーインターンを開催するので、興味のある方は是非エントリーください！**（エントリーは 4/25 開始の予定）

去年のインターン生が参加ブログも書いてくれたので気になる方はそちらもご覧ください。

https://note.com/hysrtr/n/nd13916204c6c

