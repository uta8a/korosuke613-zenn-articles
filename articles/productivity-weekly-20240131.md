---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2024-01-31号)"
emoji: "🌭"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240131"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-31 単独号です。

今回が第 141 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

<!-- _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_ -->
<!-- _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_ -->
<!-- _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_ -->
<!-- _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_ -->
<!-- _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_ -->

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub Actions: Introducing the new M1 macOS runner available to open source! - The GitHub Blog
https://github.blog/changelog/2024-01-30-github-actions-introducing-the-new-m1-macos-runner-available-to-open-source/

GitHub Actions: macOS 14 (Sonoma) is now available - The GitHub Blog
https://github.blog/changelog/2024-01-30-github-actions-macos-14-sonoma-is-now-available/


GitHub Actions の M1 macOS 14 (Sonoma) ランナーが追加されて、macos-14 は public リポジトリで無料に使えるようになった話。
他にもいろいろ話が混ざっててややこしいけど、変更点をまとめると以下のような感じ？

- macos-11: deprecated で 2024/6 終了予定
- macos-13, macos-13-large: Intel CPU（今回特に変更なし）
- macos-13-xlarge: M1 CPU、beta が外れて GA に
- macos-14: 今回追加、M1 CPU、public リポジトリ無料、beta
- macos-14-large, macos-14-xlarge: 今回追加、M1 CPU、有料のみ、beta
- macos-latest, macos-latest-large: 今は macOS 12 系を指すけど、2024/4-6 に macOS 14 系を指すように変更予定
- macos-latest-xlarge: 今は macOS 13 を指すけど、↑と同じ認識でよい？

なお、billing API はまだ対応してない雰囲気

## Dockerのビルドが最大40倍高速になる「Docker Build Cloud」提供開始。Appleシリコン/AWS Graviton用のビルドにも対応
https://www.publickey1.jp/blog/24/docker40docker_build_cloudappleaws_graviton.html

## Dependabot Version Updates Support devcontainers - The GitHub Blog
https://github.blog/changelog/2024-01-24-dependabot-version-updates-support-devcontainers/

## [Product Update] Speeding up code checkout - Build Environment - CircleCI Discuss
https://discuss.circleci.com/t/product-update-speeding-up-code-checkout/50317/3

## Do you know if all your repositories have up-to-date dependencies? - The GitHub Blog
https://github.blog/2024-01-25-do-you-know-if-all-your-repositories-have-up-to-date-dependencies/

## Code faster and better with GitHub Copilot’s new features in Visual Studio - The GitHub Blog
https://github.blog/changelog/2024-01-30-code-faster-and-better-with-github-copilots-new-features-in-visual-studio/

# know-how 🎓

## 品質の可視化への取り組み：バグ管理の事例紹介 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20240122-7865286e4d/

## Go 1.22リリース連載始まります & ループの変化とTinyGo 0.31
https://future-architect.github.io/articles/20240129a/

## Googleの新スパムメール対策への対応状況の調査と今後の対応方針について / 開発者向けブログ・イベント | GMO Developers 
https://developers.gmo.jp/42677/


# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
