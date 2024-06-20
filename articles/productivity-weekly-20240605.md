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
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
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

GitHub の LFS の料金体系が変わります。

6/2 以降に作成された GitHub Enterprise Cloud のアカウントおよび所属 Org はすでに新体系となっています。それ以外のアカウントは数ヶ月以内に新体系に移行される予定です。

これまでの LFS は前払いのプリペイド方式でしたが、新しい料金体系では後払いの従量課金方式に変更されます。

- 従来の料金体系
  - プリペイドでデータパックを購入する方式
  - ストレージ: $5 / 50 GiB / month
  - 帯域: $5 / 50 GiB / month
- 新しい料金体系
  - 後払いの従量課金方式
  - ストレージ: $0.07 / 1 GiB / month
  - 帯域: $0.0875 / 1 GiB / month
  - 無料枠（ストレージ・帯域ともに同じ数字）
    - Free・Pro・Org（Free）: 10 GiB
    - Team・Enterprise: 250 GiB

なお、新しい課金体系と共に課金プラットフォームも新しくなるらしく、より細かく利用状況を把握できるようになるとのことです。
1 GiB あたりの料金は下がることとなりますが、従量課金となることで、予期せぬ課金が発生してしまう恐れがあります。LFS 利用者は確認しておきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

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

プロダクト開発や開発生産性の定義に立ち返り、そこから開発生産性を向上させるための改善と改革について解説しています。
発表の中では Wantedly さんの実際の改善事例を「把握->分析->対応」という改善サイクルに合わせて紹介されており、分かりやすかったです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ユニットテストってもう言わない！ CI/CD時代のテスト分類に最適なテストサイズという考え方
https://zenn.dev/koduki/articles/e0f8824adbe0e9

従来の「単体テスト」や「結合テスト」といった分類方法は曖昧さを含んでいます。例えば、単体テストは「単体」が何を指すのか、DB へのアクセスを含むかどうかなどです。
そこで、CI/CD の文脈では実行時間に基づく「テストサイズ」で分類することが有効だと述べています。Google では、Small、Medium、Large の 3 つのテストサイズに分類し、それぞれに応じた実行時間やリソースの基準を設定しており、テスト比率としては 70:20:10 のピラミッド型が望ましいとされています。これにより、テストの効率性と明確さが向上し、適切なタイミングでのテスト実行が可能となります。

Small テストや Medium テストといった呼び方は、単に方言だと思っており気にしていませんでしたが、背景を知れました。
テストサイズを提唱した Google の記事は 14 年前のもので、以前から提唱されていた考え方だったのですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Playwrightを使ったE2Eテストを導入した話 - インフラ編 Playwright × Allure Report × AWS
https://tech.uzabase.com/entry/2024/05/31/153530

Playwright を使った E2E テストを AWS 上で実行している事例紹介です。
具体的には、テスト実行のタイミングや、Slack コマンドを用いたデプロイとテスト実行のフロー、インフラのアーキテクチャ、Allure Report によるレポート生成、そして CodeBuild や CloudFront、Route53 の設定について詳しく解説しています。インフラ管理は AWS CDK で行っているそうで、そちらの紹介もされています。

自分はこれまで、GitHub Actions で E2E テストを実行し、テストレポートを S3 にアップロードした経験がありますが、E2E テストの実行環境を AWS に寄せると、権限まわりで考えることが減り、テストのためのインフラ構成がシンプルになりそうでいいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

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
