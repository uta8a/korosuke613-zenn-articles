---
title: "Productivity Weekly (2021-4-14号)"
emoji: "🎪"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 22 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## アクセスアクティビティに基づく IAM ポリシー生成を通して最低権限の実装を IAM Access Analyzer で容易に
https://aws.amazon.com/jp/about-aws/whats-new/2021/04/iam-access-analyzer-easier-implement-least-privilege-permissions-generating-iam-policies-access-activity/

AWS の IAM ポリシーを実際の操作履歴から生成できるようになりました。IAM ポリシーには必要最低限の権限しかつけたくないところですが、実際に必要最低限の権限を持った IAM ポリシーを作ろうとすると結構大変です。今後は、IAM Access Analyzer のポリシー生成機能を使うことで必要最低限の権限を持った IAM ポリシーが作りやすくなります。

https://dev.classmethod.jp/articles/iam-access-analyzer-easier-implement-least-privilege-permissions-generating-iam-policies-access-activity-2/

クラメソさんが早速やってみた記事を投稿していました。「1 日の IAM ポリシーの生成は 5 回まで」というのが本格的に使おうとするとつらそうですね..。

まだまだ以前紹介した[iamlive](https://zenn.dev/korosuke613/articles/productivity-weekly-20210317#iann0036%2Fiamlive%3A-generate-an-iam-policy-from-aws-calls-using-client-side-monitoring-(csm)-or-embedded-proxy)の方が使い勝手が良さそうです。ただ、iamlive はローカル環境で実行する必要があるので、AWS コンソールの操作から IAM ポリシーを作りたいとなった場合は IAM Access Analyzer を使うのが良さそうですね。


## Amazon EC2 Auto Scaling でコストの節約を実現しながらスケールアウトを加速する Warm Pools が利用可能に
https://aws.amazon.com/jp/about-aws/whats-new/2021/04/amazon-ec2-auto-scaling-introduces-warm-pools-accelerate-scale-out-while-saving-money/

Amazon EC2 Auto Scaling において、スケールアウトを高速化するためにあらかじめインスタンスを停止状態でおいておく事が可能になりました。

高速起動できるようになるのは嬉しいですね。さらに最短 30 秒でトラフィックを処理できるようになるため、それを許容できるなら常時起動インスタンス数を減らすことも可能になるかと思います。停止状態のインスタンスはコンピューティングリソースの課金が発生しない[^kakin]ので、大幅なコスト削減につなげられそうです。

[^kakin]: 停止中でもインスタンスに紐付けられた EBS ボリュームと Elastic IP アドレスの課金は発生します。

## JetBrains Toolbox 2021.1 がリリースされました | JetBrains News
https://blog.jetbrains.com/ja/blog/2021/04/14/jetbrains-toolbox-2021-1-ja/

JetBrains IDE 群および JetBrains Toolbox のメジャーアップデートである 2021.1 がリリースされました。

共通する大きな変更として JetBrains Space との連携機能が追加、 Code With Me が標準搭載、ホットリロードに対応した HTML プレビューが追加されました。個々の IDE に関する変更ですが、この記事では個々の変更が良い感じにまとまっています。複数の製品を利用している方や IntelliJ IDEA Ultimate を利用している方には嬉しい記事ですね。

Windows 勢の方によると IntelliJ IDEA と GoLand が WSL2 に対応したのが特に嬉しいとのことでした。どんどん便利になって良いですね。

:::message
ちなみに[今回の Change Log](https://www.jetbrains.com/ja-jp/idea/whatsnew/2021-1/#collaborative-development) を読んだときに Code With Me 上でビデオ通話できることを知って驚きました。Space も使うようになればいよいよ JetBrains IDE だけでチーム開発が完結するようになりそうですね。
:::

## Cloudflare Pages is now Generally Available
https://blog.cloudflare.com/cloudflare-pages-ga/

CloudFlare が静的サイトホスティングサービスを正式版として提供開始しました。似たようなサービスとしては GitHub Pages や Netlify、AWS Amplify などがあります。

ただ静的サイトをホスティングできるだけではなく、リッチな Analytics ダッシュボードを利用できたり、コミットごとにプレビューURL を生成できたりと嬉しい機能も備えています。また、[将来的にはフルスタックアプリケーション(フロントエンド、API、ストレージ、データ)をデプロイできるようにすることを目標](https://blog.cloudflare.com/cloudflare-pages-ga/#the-future-full-stack-applications-with-cloudflare-workers-and-durable-objects)としているようです。

静的サイトホスティングサービスに新たな選択肢が出てきて良いですね。

## Announcing Relay’s General Availability Launch | Puppet
https://puppet.com/blog/announcing-relays-general-availability-launch/

さまざまな開発者向け製品を作っている puppet がローコードの監視ツール兼タスクランナーサービス relay の一般提供を始めました。

relay はクラウドサービスが出すアラートやイベントを拾ってワークフロー（Slack で対応チームを調整したり EC2 インスタンスを終了させたりなど）を実行できます。この仕組みをローコードで作ることができるようです。利用できるワークフロー一覧は [library](https://relay.sh/library/)で確認できます。

今までこういったケースごとにイベントを受け取るサーバを立てて〜API を叩くスクリプトを書いて〜という風に作る必要がありすぐには作れませんでしたが、クラウドサービスを利用する場合は relay を使うことで高速にそういったワークフローを作れるようになりそうです。


# know-how

## GitHub Actions Self-hosted Runner の導入と安定運用に向けた軌跡 - Quipper Product Team Blog
https://quipper.hatenablog.com/entry/2021/04/14/github-actions-self-hosted-runner

GitHub Actions セルフホストランナーの事例です。

Quipper さんでは、オートスケール可能で宣言的に管理ができ、k8s の Custom Controller である summerwind/actions-runner-controller を利用してセルフホストランナー環境を構築したらしいです。この記事では、オートスケールの仕組みや構成管理例などを紹介しています。

ランナーの増減には GitHub から送られてくる webhook を利用しており、それに関する課題と対策も書かれています。記事中で紹介されている philips-labs/terraform-aws-github-runner は僕も利用したことがあるのですが、こちらも webhook でスケールアップを実現しており、同じような課題(GitHub-hosted か Self-hosted か区別がつかない)と対策がされていました。

オートスケール可能な Self-hosted runner 環境を構築したい場合(特に actions-runner-controller を使う場合)に参考になると思います。

## The State of Developer Ecosystem in 2020 Infographic | JetBrains: Developer Tools for Professionals and Teams
https://www.jetbrains.com/lp/devecosystem-2020/

JetBrains による 2020 年の開発者エコシステムの調査結果です。どういった言語やフレームワーク、ツールなどが多く使われているかやどういう種類のソフトウェアが多く開発されているかなどがまとまっています。

個人的には「今後どの言語に移行する予定ですか？（Do you plan to adopt or migrate to other languages in the next 12 months? If so, to which ones?）」の項目が面白かったです。各言語の移行先として一番人気なのは Go のようです。そして、Go 利用者の 17%は Rust への移行を考えているようですね。来年はどうなってるのか楽しみですね。

他にも色々な調査結果が公開されているので、気になる人は読んでみてください。

# 小ネタ
:::message
今回の Weekly はネタが大量に多かったことと、僕が忙しくて疲れてしまったことから、全てのネタを書くことができませんでした。残りのネタを一言で下に載せます。
:::

- [Technology Radar | An opinionated guide to technology frontiers | ThoughtWorks](https://www.thoughtworks.com/rada)
  - [以前紹介した](https://note.com/korosuke613/n/n3973feebf201#VArMe)ThoughtWorks の Technology Radar ですが、Volume 24 が公開されました。トレンドが気になる人は読んでみてください。
- [GitHub supports Web Authentication (WebAuthn) for security keys - The GitHub Blog](https://github.blog/2019-08-21-github-supports-webauthn-for-security-keys/)
  - 2 年くらい前から GitHub のブラウザでの認証に WebAuthn が使えるようになってました。知らなかった..
- [Custom amounts and one time payments rolling out to GitHub Sponsors - GitHub Changelog](https://github.blog/changelog/2021-04-06-custom-amounts-and-one-time-payments-rolling-out-to-github-sponsors/)
  - GitHub Sponsors で 1 回限りの寄付、および、好きな金額の寄付が可能になりました。
- [Back-tick code blocks are now supported in titles - GitHub Changelog](https://github.blog/changelog/2021-04-13-back-tick-code-blocks-are-now-supported-in-titles/)
  - GitHub の Issue、Pull Request のタイトルにコードブロックが使えるようになりました。
- [Table of Contents support in Markdown files - GitHub Changelog](https://github.blog/changelog/2021-04-13-table-of-contents-support-in-markdown-files/)
  - GitHub で Markdown ファイルを表示した時に上部に自動で目次が生成されるようになりました。しかもスクロールしたら追従してくれる。

# あとがき
今週は[DevOpsDays Tokyo 2021](https://www.devopsdaystokyo.org/)に参加し、2 日間ひたすらタイピングしてメモってたら全く体力が残りませんでした。その上今週はネタがとにかく多かったため、投稿が遅くなってしまいました。（結局全てのネタを拾えなかった）

また、先週の土曜日は[Developer eXperience Day 2021](https://dxd2021.cto-a.org/)に参加したのですが、面白い話がたくさんあってよかったです。こちらに関しては録画が Youtube で公開されているので今からでも視聴できます。

https://twitter.com/zaki___yama/status/1381485314753982464?s=20

さらに、いい感じの表にまとめた方が現れました。便利でありがたいですね。
個人的には「[エンジニアの人材不足について本気で考える 〜増やし、育てるためのDeveloper eXperienceとは〜](https://dxd2021.cto-a.org/program/time-table/d-4)」が面白かったです。
エンジニアの人材不足、なんとかしていきたいですね。

---

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### AirPodsをMacに強制的に接続する - 宇宙行きたい
https://yoshiori.hatenablog.com/entry/2021/04/13/171405

読んで字のごとく、AirPods を Mac に強制的に接続する方法です。

僕も AirPods Pro を持っているのですが、例えば Mac で動画を見ている時に iPhone を開くとそっちに AirPods が接続されてしまって、動画が止まってしまうんですよね。普段は自動切り替えがとても便利なのですが、Mac + iPhone のように複数台を同時に使う場合は困ります。

動画の場合は止まったらすぐ気づけてまた動画を流せば良いのですが（むしろ止めない方法が機能オフしかなさそう）、記事にもあるとおり Mac につながってると思ったらつながってなかったってなるといやですね。簡単に強制的に Mac に切り替えるために Mac から音を出すっていうのは面白いと思いました。僕もやってみようと思います。

### ガチ勢のケーブル保護チューブを導入したら、大嫌いなケーブル整理が快感に変わった話｜山下義弘／ドケットストア店主｜note
https://note.com/tyari/n/nfaeaf4b6bd24

ケーブルをまとめるためにくるくるした筒にケーブルをひたすら通していく...という経験は誰しもあるかと思いますが、あれ面倒ですよね。
この記事では業務用のもっと簡単にまとめられる筒を紹介しています。それだけじゃなく、少ない数でも他の人が買えるように業者から卸して販売もしてくれています。僕の家も結構ケーブルだらけでひどいのでそろそろまとめたいですね。買ってみよう。