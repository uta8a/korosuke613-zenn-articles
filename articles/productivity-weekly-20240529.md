---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-05-29)
emoji: 👷‍♂️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240529
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-05-29 単独号です。

今回が第 154 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Sunset Notice - Projects (classic) - The GitHub Blog
https://github.blog/changelog/2024-05-23-sunset-notice-projects-classic/

## Runner now supports spot instances
https://circleci.com/changelog/runner-3-0-22-release/

## Application Load Balancer がインターネットクライアント向けに IPv6 のみでのサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2024/05/application-load-balancer-ipv6-internet-clients/

AWS の Application Load Balancer（ALB）のクライアント向け IP アドレスのタイプには今まで IPv4 のみか、IPv4 と IPv6 のデュアルスタックを選択できましたが、いずれもパブリックな IPv4 アドレスが必要でした。
パブリック IPv4 アドレスには 2024 年 2 月から課金が発生するようになっており[^aws_ipv4]、さらに ALB に割り当てるサブネットごとにパブリック IPv4 アドレスが必要になるため、意外とお金がかかっています。

[^aws_ipv4]: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802#%E6%96%B0%E7%9D%80%E6%83%85%E5%A0%B1-%E2%80%93-%E3%83%91%E3%83%96%E3%83%AA%E3%83%83%E3%82%AF-ipv4-%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%81%AE%E5%88%A9%E7%94%A8%E3%81%AB%E5%AF%BE%E3%81%99%E3%82%8B%E6%96%B0%E3%81%97%E3%81%84%E6%96%99%E9%87%91%E4%BD%93%E7%B3%BB%E3%82%92%E7%99%BA%E8%A1%A8-%2F-amazon-vpc-ip-address-manager-%E3%81%8C-public-ip-insights-%E3%81%AE%E6%8F%90%E4%BE%9B%E3%82%92%E9%96%8B%E5%A7%8B-%7C-amazon-web-services-%E3%83%96%E3%83%AD%E3%82%B0

今回、ALB のクライアント向け IP アドレスのタイプに IPv6 のみが加わり、これを選択した場合パブリック IPv4 アドレスの割り当てが不要になります。
嬉しいことに ALB とターゲット間は IPv4, IPv6 いずれでも接続できるため、例えばターゲットの EC2 との通信は IPv4 のままにできます。

これにより、インフラの構成は大きく変えることなく、コスト削減が可能です。
ただし当然 ALB のクライアントで IPv4 は利用できなくなります。
ユースケースとしては Cloudflare など外部の CDN を利用している場合に有効かと思います。Cloudflare は IPv6 に対応しているため、ALB と Cloudflare は IPv6 で通信し、Cloudflare とクライアントは IPv4, IPv6 両方で通信できます。

クラウドのコストはチリツモなので、こういった変更でパブリックな IPv4 アドレスをどんどん減らしていきたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Truly fast container filesystems on macOS
https://orbstack.dev/blog/fast-filesystem

OrbStack v1.6 のアップデートでファイルシステムが新しくなり、パフォーマンスを 2~5 倍に向上させ、macOS ネイティブの 75~95% のパフォーマンスを実現したそうです。アップデート前に念のため Issue を確認するのが良いかもしれません。
公式ブログにネイティブとのベンチマーク結果の比較がありますので、気になる方はご覧ください。

OrbStack は速さという観点では圧倒的ですね。
自分も早速アップデートしましたが、アップデート前から文句なく速いと感じていたので、どれだけ速くなったのかはよくわかりませんでした(笑)

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

## Findyの爆速開発を支えるテクニック - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/05/27/090000

Findy さんの開発組織において、開発スピードを継続し、さらに加速させるために取り入れているテクニックについて紹介されています。
テストや CI/CD の高速化、自動化、通知など技術的な話題だけでなく、タスクの進め方やタスクの粒度の設定といったソフトスキル的な話題も含まれていて勉強になりました。

個人的には [Nx](https://nx.dev/) を使ったビルドの高速化について、更に詳しく知りたいと思いました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## esbuild 最適化芸人 - Speaker Deck
https://speakerdeck.com/exoego/esbuild-zui-shi-hua-yun-ren

## Making EC2 boot time 8x faster
https://depot.dev/blog/faster-ec2-boot-time

EC2 の起動時間を早めるテクニックが紹介されています。

ユーザーが EC2 を起動する時、AWS は AMI から EBS ボリュームを作成しますが、この時初めてデータブロックにアクセスする場合は、バックグラウンドで S3 から読み込まれ、ボリュームに書き込まれます。
これには時間がかかるので、あらかじめインスタンスを起動し S3 から EBS ボリュームを作成した後にシャットダウンしておいて（記事中ではこれを「ウォーミング」と呼んでいます）、必要な時にあらためて立ち上げることで、時間を削減する手法が紹介されています。

EC2 のシャットダウン中は EC2 自体の料金は発生しないため、EC2 インスタンスをずっと立ち上げっぱなしにして待機させるよりよほどお得です。
ただし、シャットダウン中も EBS の利用料金は発生する点には注意が必要です。

また、ウォーミング時と必要な時に再度立ち上げる時でインスタンスタイプを変更可能です。これによりコストの最適化を図ることができるとも記事に書かれています。

これによりインスタンス起動に 40 秒以上かかっていたところを 5 秒以下に短縮できたとのことです。
もし EC2 の起動時間にお困りの方がいらっしゃったら、参考にしてみてはいかがでしょうか。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWA AndroidチームのCI/CD | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/48038/

# tool 🔨

## awslim - Goで実装された高速なAWS CLIの代替品を作った - 酒日記 はてな支店
https://sfujiwara.hatenablog.com/entry/2024/05/27/091630

## ニューラルかな漢字変換エンジン「Zenzai」をazooKey on macOSに搭載します
https://zenn.dev/azookey/articles/ea15bacf81521e

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
