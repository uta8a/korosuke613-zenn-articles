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
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
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

## Truly fast container filesystems on macOS
https://orbstack.dev/blog/fast-filesystem

OrbStack v1.6 のアップデートでファイルシステムが新しくなり、パフォーマンスを 2~5 倍に向上させ、macOS ネイティブの 75~95% のパフォーマンスを実現したそうです。アップデート前に念の Issue を確認するのが良いかもしれません。
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
