---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-02-12)
emoji: 🍼
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250212
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
    _本項の執筆者: [@naotama](https://zenn.dev/naotama)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-02-12 単独号です。

今回が第 178 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->
<!-- - [@takoeight0821](https://zenn.dev/takoeight0821) -->
<!-- - [@takamin55](https://zenn.dev/takamin55) -->
<!-- - [@naotama](https://zenn.dev/naotama) -->
:::

# news 📺

## GitHub Copilot: The agent awakens - The GitHub Blog
https://github.blog/news-insights/product-news/github-copilot-the-agent-awakens/

## 自分のOSSのマルウェア入り偽物を作られたので通報した - 酒日記 はてな支店
https://sfujiwara.hatenablog.com/entry/2025/02/11/094755

タイトルの通り、自作 OSS の偽物（しかもマルウェア入り）が公開される被害に遭われた話です。攻撃者は偽物を公開するだけでなく、捨て垢でその偽物のスター数を稼いでいたとのことです。

fujiwara さんの注意喚起の通り、スター数だけで OSS の信頼度を評価するとうっかり被害に遭ってしまいそうです。[LayerX さんも似た被害に遭われており](https://x.com/LayerX_tech/status/1889225974547636719)、今一度 OSS のコード読みやバージョン固定を徹底していきたいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Announcing TypeScript 5.8 Beta - TypeScript
https://devblogs.microsoft.com/typescript/announcing-typescript-5-8-beta/

## Copilot Language Server SDK is now available - GitHub Changelog
https://github.blog/changelog/2025-02-10-copilot-language-server-sdk-is-now-available/

## Linux Foundation、無料オンラインコース「Kubernetes入門」の提供を開始
https://www.linuxfoundation.jp/press-release/2025/01/free-online-course-introduction-to-kubernetes-now-available-in-japanese/

Linux Foundation が CNCF と共同で作っているオンライン学習コースの日本語版が公開されました。
https://training.linuxfoundation.org/ja/training/introduction-to-kubernetes-lfs158-jp/

## Actions Get workflow usage and Get workflow run usage endpoints closing down - GitHub Changelog
https://github.blog/changelog/2025-02-02-actions-get-workflow-usage-and-get-workflow-run-usage-endpoints-closing-down/

## Edit and validate Copilot Autofix suggestions with Copilot Workspace - GitHub Changelog
https://github.blog/changelog/2025-01-31-edit-and-validate-copilot-autofix-suggestions-with-copilot-workspace/

## Larger hosted runner enhancements: Edit runner size and Windows Server 4vCPU runner availability - GitHub Changelog
https://github.blog/changelog/2025-01-30-larger-hosted-runner-enhancements-edit-runner-size-and-windows-server-4vcpu-runner-availability/

## Oracle justified its JavaScript trademark with Node.js—now it wants that ignored
https://deno.com/blog/deno-v-oracle2

# know-how 🎓

## re:Invent2024で広がった AWS Verified Accessの可能性を探る - Speaker Deck
https://speakerdeck.com/maimyyym/reinvent-2024-verified-access-update-potentiality

## Terraform v1.11 の Write-Only Attributes を試してみる
https://zenn.dev/terraform_jp/articles/tf-write-only-attributes

## Datadogダッシュボードをスクショして毎日Slackに送る
https://zenn.dev/babarot/articles/datadog-dashboard-to-slack-channel

## Four Keys導入からはじめる開発プロセスの改善 - enechain Tech Blog
https://techblog.enechain.com/entry/four-keys

## GoアプリのCI/CDを4倍高速化した汎用的手法まとめ【txdb】
https://zenn.dev/jcat/articles/323ce8b4e4744d

## APIリファレンスを生成するプロンプトを考える (Dart/Flutter)
https://zenn.dev/szktty/articles/flutter-generate-api-doc

## いかにしてココナラはCursor Businessを導入したのか? 〜生成AIツール導入のための社内調整術〜
https://zenn.dev/coconala/articles/coconala-cursor-business-introduction

# tool 🔨

## Terraform State をビジュアルで確認できるOSS「terraform-tui」の紹介 | DevelopersIO
https://dev.classmethod.jp/articles/hands-on-terraform-visual-state-explorer/

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
