---
title: "Productivity Weekly (2022-11-16号)"
emoji: "💯"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221116"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 100 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
なんと、Productivity Weekly もとうとう 2 周年、第 100 回を記録しました。よく続いてますね。
せっかくなので記念イベントの開催を計画しています。気になる人は [Productivity Weekly 第100回記念イベント開催のお知らせ](#productivity-weekly-第-100-回記念イベント開催のお知らせ) をご覧ください。
:::

# news 📺

## Podman expands to the Desktop | Red Hat Developer
https://developers.redhat.com/articles/2022/10/24/podman-expands-desktop#

Docker 互換であるコンテナエンジンである [Podman](https://podman.io/) を GUI で管理できる OSS、[Podman Desktop](https://podman-desktop.io/) がリリースされました。開発元は Podman と同じ RedHat です。

Podman Desktop を使うことで、Podman のインストール、設定、アップデートを GUI で行えます。また、Docker Desktop のように、稼働中のコンテナ一覧やイメージ一覧を操作できます。また、Kubernetes クラスタの立ち上げ、管理も可能です。

また、[以前 Docker Desktop で使えるようになった Extensions 機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20220511#docker-extensions%3A-discover%2C-build-%26-integrate-new-tools-into-docker-desktop---docker)も利用でき、既存の Extension を使いまわせます（[Extend capabilities with Docker Desktop extensions.](https://podman-desktop.io/extend)）。

Podman が GUI で管理できるようになり、これまで GUI がなかったため敬遠していた方にとっても Docker Desktop に変わるコンテナエンジンとしての選択肢に入ってくるようになったのではないでしょうか？[Rancher Desktop](https://rancherdesktop.io/) に続き、Docker Desktop 代替ツールが増えてきましたね。選択肢が増えることは良いことです。今後も期待したいですね。

## Introducing an all-new code search and code browsing experience | GitHub Changelog
https://github.blog/changelog/2022-11-09-introducing-an-all-new-code-search-and-code-browsing-experience/

GitHub において、新たなコード検索と新たなコードブラウジング機能が登場しました（ベータ）。

新しいコード検索機能では、検索入力中に候補が表示されたり補完してくれたり、検索結果が型なのか関数なのか表示したりしてくれます。
この検索機能は、以前[紹介した cs.github.com](https://zenn.dev/korosuke613/articles/productivity-weekly-20211215#improving-github-code-search-%7C-the-github-blog) の内容に近いです。

新しいコードブラウジング機能では、GitHub 上でのコード閲覧時に、サイドバーにファイルツリーや選択肢たシンボルの依存を出してくれたり、ファイルツリーからファイルを検索できたりしてくれます。

これらの新機能を使うにはウェイティングリストへの登録が必要です。僕は両方とももう使っていますが、以前に比べてとてもコード検索やブラウジングがしやすくなりました。特にファイルツリーは常々欲しいと思ってたので嬉しいですね。

## Codespaces for Free and Pro Accounts | GitHub Changelog
https://github.blog/changelog/2022-11-09-codespaces-for-free-and-pro-accounts/

GitHub Codespaces が Free、Pro プランでも使えるようになりました。これまでもベータで参加していたユーザは無料で使えていましたが、同じタイミングで[ベータ版は終了しました](https://github.blog/changelog/2022-11-09-codespaces-individual-beta-end/)[^beta]。

無料枠は存在し、次のようになります。

|プラン|CPU|ストレージ|
|---|---|---|
|Free|120 core hours/month|15 GB/month|
|Pro |180 core hours/month|20 GB/month|

例えば Free プランだと、2 コア CPU が 60 時間が毎月無料で利用できます。

無料枠を上回った場合は、例えば 2 コア CPU1 時間につき$0.18、1GB ストレージにつき$0.07 請求されます。詳しくは [Pricing for paid usage](https://docs.github.com/en/billing/managing-billing-for-github-codespaces/about-billing-for-github-codespaces#pricing-for-paid-usage) をご覧ください。

とうとう誰でも Codespaces が使えるようになって嬉しいですね。逆に、今までベータ版を使ってた人からすると料金が発生するため注意が必要ですね。有料になったけど Codespaces をゴリゴリ使っていくぞという人は、Billing から spending limit の上限を上げましょう（おそらくデフォルトは$0 のはず）。

[^beta]: 僕も個人で普通に使っていたのですが、まだベータ版であることをすっかり忘れていました。確かに料金決まってなかったもんな。ちなみにベータ版が終了した途端、ストレージが一杯一杯だよみたいなメールが大量に届きました😇

## GitHub Codespaces with JetBrains IDEs (Public Beta) | GitHub Changelog
https://github.blog/changelog/2022-11-09-github-codespaces-with-jetbrains-ides-public-beta/

GitHub Codespaces に対して、JetBrains 系の IDE から JetBrains Gateway を経由して接続できるようになりました（パブリックベータ）。

Codespaces の環境作成後に JetBrains Gateway から Codespaces へ接続しようとすると、JetBrains IDE がリモート環境へインストールされ、ローカルの JetBrains シンクライアントアプリを介して JetBrains IDE を操作できるという流れになります（[Using GitHub Codespaces in your JetBrains IDE](https://docs.github.com/en/codespaces/developing-in-codespaces/using-github-codespaces-in-your-jetbrains-ide)）。したがって、リモートの Codespaces 環境はある程度大きいマシンスペックが必要になります（自分が試した際は 4 コアマシン推奨と表示されました）。

![](/images/productivity-weekly-20221116/jetbrains_codespaces.png =600x)
*JetBrains IDE から Codespaces へ接続して開発している様子。CPU 使用率などがわかります*

VSCode ではなく、JetBrains IDE を使って開発したい場面は多々あるため、Codespaces が JetBrains IDE に対応したのは嬉しいですね。しかし、VSCode で動かす場合と違い、要求されるマシンスペックは決して低くないのと、ブラウザからの利用はできない点は注意が必要です。まだまだパブリックベータなので、今後に期待ですね。

## GitHub Universe 2022における新発表のすべて - GitHubブログ
https://github.blog/jp/2022-11-10-everything-new-from-github-universe-2022/

GitHub Universe 2022 で発表された内容のまとめの日本語訳記事です。

上で紹介したトピックも含めて、主に次の内容が発表されました（既に過去発表された内容除く）。

- Copilot の企業向け契約を計画中
- 「Hey, GitHub!」で GitHub Copilot を音声操作（実験的機能）
- Codespaces が個人ユーザ（Free、Pro）で利用可能に
- 新しいコードビュー（プライベートベータ）
- Projects にロードマップ機能が追加（プライベートベータ）
- マークダウン上でのタスクリスト形式（`[tasklist]`）をサポート（プライベートベータ）
- GitHub Mobile での Projects で編集機能やビューの切り替え機能を強化（ベータ）
- 従来の CI/CD ツールから Actions へ移行しやすくする GitHub Actions Importer のパブリックプレビュー開始
  - これまでは特定顧客に対してベータ版が展開されていた

今年は例年に比べてそこまで目玉発表はなかったかなという印象でしたが、地味に嬉しい改善がされているのは嬉しいですね。Hey, GitHub! は使い所はほとんどないと思いますが、体の不自由な方には嬉しい機能かもしれません。音声操作が充実するのはいいですね。

## [新機能] タイムゾーン指定でスケジュール起動できるAmazon EventBridge Schedulerがリリースされました | DevelopersIO
https://dev.classmethod.jp/articles/amazon-eventbridge-scheduler-new-way-to-launch-tasks/

AWS Lambda などをスケジュール実行するための Amazon EventBridge Scheduler がリリースされました。

従来の Amazon EventBridge rules[^event_bridge]と比べると、クォータ[^quota]が緩いこと、タイムゾーンを指定できることが嬉しいです。また、1 回限りのスケジュール実行もやりやすくなっています。

やはりタイムゾーンを指定できるのが嬉しいですね。日本では日をまたがないけど、UTC だと日をまたぐパターンとか面倒だったので。新しいルールを作る際は EventBridge Scheduler を使いたいですね。

[^event_bridge]: Amazon EventBridge rules は旧 CloudWatch Events のことです。名前が変わっていたのを知りませんでした。Web コンソールから触る機会ないし。（[CloudWatch EventsはAmazon EventBridgeになるらしい](https://regent0ro.blogspot.com/2020/07/cloudwatch-events-and-amazon-eventbridge.html)）


[^quota]: サービスの利用制限。

# know-how 🎓

## Git の最新アップデートから考える開発手法の潮流 - Speaker Deck
https://speakerdeck.com/yuukiyo/trends-in-development-methodology-from-the-latest-git-updates

今年の Git のアップデートまとめと、Scalar、Partial clone、File system monitor の紹介スライドです。

次の内容が載っています。

- 2022 年の git の更新まとめ
- Scalar の紹介
- Partial clone の紹介
- File system monitor の紹介
- ブランチ戦略の紹介

Scalar で有効になる Git の機能や利用有無によるパフォーマンスの比較、各 Partial clone で何がダウンロードされるかの比較などがわかりやすいです。ここら辺がまとまっている日本語ページはあまり見ないため、参考になります。

Git の今年のアップデート（特に大規模リポジトリ関連）を追えていない人にお勧めしたいスライドです。

## GitHub Actionsで並列処理を作っていてヒヤッとした話
https://khasegawa.hatenablog.com/entry/2022/11/14/100000

GitHub Actions において、`matrix` 利用時にヒヤッとした話です。

著者は数十秒ほどで終わるジョブを `matrix` を使って 200 並列で実行しようとしていたとのことです。例えば 12 秒ほどで終わるジョブを 200 並列で実行するとなると、全部で 2400 秒=40 分の課金となりそうですが、実はそうではありません。

Actions の仕様として、実行時間が 0 秒以外の場合、単位が分になるように切り上げ（12 秒なら 1 分）られるため、もし 12 秒ほどで終わるジョブを 200 並列で実行すると、課金対象の時間は 200 分となります。

記事では、課金に関する特徴だけでなく、GitHub 上での Billable time の表示に関する落とし穴の実際の画像例も載っています。

こんなにジョブを並列で動かすこともそうそうないのですが、この仕様は知りませんでした。気をつけたいですね。

## Amazon ECS と AWS Lambda で汎用 self-hosted runner を提供する基盤 - クックパッド開発者ブログ
https://techlife.cookpad.com/entry/2022/11/07/124025

最近はやりのオートスケールする GitHub Actions、セルフホストランナー記事です。今回はクックパッドさんの事例になります。

クックパッドさんの場合、ECS 上で ephemeral なセルフホストランナーをオートスケールするための ghe-actions という仕組みを内製したとのことです。ECS 上で動かすパターンは（自分の観測範囲において）珍しい構成です。

記事では、基盤構成、利用の流れ、構成要素の説明、汎用的なランナーを用意するための工夫、AWS 利用料金の節約や GitHub-hosted runner と比べた制約などが載っています。

個人的には、DinD(Docker in Docker)のセキュリティ上の懸念をどう解決したかが載っている「汎用的なランナーを用意するための工夫」の部分がとても参考になりました。こういう方法があるのですね。また、この構成の欠点である制約事項が載っているのもよかったです。僕も Self-hosted runner 環境を構築していますが、EC2 上ランナーを動かしているため、コンテナ内ランナーでは Service containers が使えない話は全く知りませんでした。

GitHub Actions のセルフホストランナー構築事例として参考になると思うので、構築を考えている人にお勧めしたい記事です。色々な記事が出始めてなんか最近ホットですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Blocks](https://blocks.githubnext.com/)
    - GitHub 上のファイルやフォルダを Blocks という新しい方式で可視化する試みです（テクニカルプレビュー）
    - ファイルの種類に応じてカスタマイズされたビューやインタラクティブなビューが提供されます
    - 自分でカスタムブロックを作ることもできるようです
    - 使い所はいまいちわかってないけど、遊ぶ分には面白そうですね
- **tool 🔨**
  - [Route53のAレコードで所有していないEIP、パブリックIPが設定されていないか「Ghostbuster」を使って把握してみた](https://dev.classmethod.jp/articles/route53-ghostbuster/)
    - AWS において、Elastic IP を Route53 の A レコードに設定した場合、Elastic IP の開放時に A レコードを修正し忘れる場合があります。そうなるとドメインの乗っ取りにつながるため、そんな A レコードを見つけようというツールです
    - 手動で IP アドレス割り当てをしていたら、確かに起こり得る問題です
      - Terraform なんかを使ってたら未然に防げそう
    - 怖い人は使ってみましょう

# あとがき
2022-11-16 号もめちゃ遅くなってしまいました。すみません。
ちなみに、**2022-11-23 号**は祝日だったためお休み、**2022-11-30 号**は生産性向上チームが別の外せない予定があったためお休みとなります。**次回は 2022-12-07 号になります**。

なんと Productivity Weekly の記事も今回で第 100 回となりました。驚きですね。
[次のセクション](#productivity-weekly-第-100-回記念イベント開催のお知らせ)もみてみてください。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## Productivity Weekly 第 100 回記念イベント開催のお知らせ

Productivity Weekly の記事が第 100 回を迎えたので、せっかくだから記念イベントをやろうということになりました。
というわけで、オフラインで LT 会と懇親会を開催します（予定）。

connpass で募集する予定ですが、connpass ページがまだ完成していないため、完成したら別途 Twitter ハッシュタグ（[#cybozu_productivity_weekly](https://twitter.com/hashtag/cybozu_productivity_weekly)）などでお知らせするつもりです（このページにも追記すると思います）。

みなさまふるってご参加ください！

詳細やタイムテーブルは次のようになる予定です（予告なく変更される可能性があります）。

- 日時: 2023/01/25（水）19:00-21:00
- 場所: サイボウズ株式会社　東京オフィス（日本橋駅近く）
- オフラインオンリー
- 軽食と飲み物（アルコール除く）を提供

タイムテーブル

| 時間          | 内容                                                       | 発表者                                          |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------- |
| 18:30 - 19:00 | 開場・受付                                                 |                                                 |
| 19:00 - 19:05 | オープニング・会場説明                                     |                                                 |
| 19:05 - 19:20 | Productivity Weekly 記事 2 周年 🎉 〜続けてみてのアレコレ〜（仮） | [@shitimi_613](https://twitter.com/shitimi_613) |
| 19:20 - 19:30 | LT枠①                                                      |                                                 |
| 19:30 - 19:40 | LT枠②                                                      |                                                 |
| 19:40 - 19:50 | LT枠③                                                      |                                                 |
| 19:50 - 21:00 | 懇親会                                                     |                                                 |

