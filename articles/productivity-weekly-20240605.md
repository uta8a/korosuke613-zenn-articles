---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-06-05)
emoji: 🕌
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240605
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
今週は 2024-06-05 単独号です。

今回が第 155 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Actions: Arm-based linux and windows runners are now in public beta - The GitHub Blog
https://github.blog/changelog/2024-06-03-actions-arm-based-linux-and-windows-runners-are-now-in-public-beta/

ついに GitHub Acttions の GitHub がホストしているランナーに Arm64 アーキテクチャのマシンが追加されました！！🎉

まずはパブリックベータとして Team と Enterprise Cloud プランでのみ利用可能です。今年の終わりまでには OSS プロジェクト向けに使えるようにしたいとのことなので、その頃には GA になるのかもしれません。

料金面では x64 の同性能のランナーよりも 37%安いとのことです。Larger Runner の料金ページに Linux と Windows の Arm64 ランナーの料金が追加されているので詳細はこちらから確認できます。
https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates-for-arm64-powered-larger-runners

アナウンスでは特に明記されていませんでしたが、Larger Runner のためパブリックベータ中でも課金されると思われます[^beta_m1_price]。

[^beta_m1_price]: 過去に M1 macOS ランナーがパブリックベータで追加された際にはベータ期間中でも課金が発生していました。

Arm64 ランナーの使い道として現時点でニーズが高いのは Docker のマルチプラットフォームビルドだと思います。生産性向上チームの [@miyajan](https://twitter.com/miyajan) が早速 Arm64 ランナーを利用した Docker のマルチプラットフォームイメージのビルドを試していました。
従来の x86 ランナーで QEMU を利用して Arm 版のイメージをビルドするのに比べてビルド時間がかなり短縮できるようです。Arm 版イメージのビルドを GitHub Actions で行っている方はぜひ新しい Arm64 ランナーを試してみてください。

https://zenn.dev/cybozu_ept/articles/build-multi-platform-image-with-arm64-runner

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## New Enterprise accounts have metered billing for Git LFS - The GitHub Blog
https://github.blog/changelog/2024-06-03-new-enterprise-accounts-have-metered-billing-for-git-lfs/

## terraform plan -light
https://www.bejarano.io/terraform-plan-light/

## Best practices for using the Terraform AWS Provider
https://docs.aws.amazon.com/ja_jp/prescriptive-guidance/latest/terraform-aws-provider-best-practices/introduction.html

## Buf - Connect RPC joins CNCF: gRPC you can bet your business on
https://buf.build/blog/connect-rpc-joins-cncf

## PodmanでRosettaを使う - 赤帽エンジニアブログ
https://rheb.hatenablog.com/entry/podman-rosetta

## カスペルスキーがLinux専用の無料アンチウイルスソフト「Kaspersky Virus Removal Tool for Linux」公開 － Publickey
https://www.publickey1.jp/blog/24/linuxkaspersky_virus_removal_tool_for_linux.html

# know-how 🎓

## 開発生産性 超入門 / development productivity introduction
https://speakerdeck.com/igsr5/development-productivity-introduction

## ユニットテストってもう言わない！ CI/CD時代のテスト分類に最適なテストサイズという考え方
https://zenn.dev/koduki/articles/e0f8824adbe0e9

## Playwrightを使ったE2Eテストを導入した話 - インフラ編 Playwright × Allure Report × AWS
https://tech.uzabase.com/entry/2024/05/31/153530

## npmに公開していたパッケージをjsrにもpublishしてみた
https://zenn.dev/kesin11/articles/20240530_publish_jsr

## 1Passwordを利用したSSH時のToo many authentication failuresを回避する | DevelopersIO
https://dev.classmethod.jp/articles/ssh-1password-avoiding-too-many-authentication-failures/

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

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
