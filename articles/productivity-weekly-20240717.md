---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-07-17)
emoji: 🫗
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240717
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
今週は 2024-07-17 単独号です。

今回が第 159 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)

:::

# news 📺

## Code security configurations are now GA - The GitHub Blog
https://github.blog/changelog/2024-07-10-code-security-configurations-are-now-ga/

GitHub において、code security configurations 機能が GA となりました。この機能は今年 4 月にパブリックベータとしてリリースされました。

code security configurations は、リポジトリに対してセキュリティ設定を一括で適用するための機能です。これにより、リポジトリごとに異なるセキュリティ設定を手動で設定する必要がなくなります。詳しくは[以前の記事](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240403#code-security-configurations-let-organizations-easily-roll-out-github-security-products-at-scale---the-github-blog)をご参照ください。

パブリックベータからの変更点としては、以下が挙げられています。

- [Code security configurations can now be enforced - The GitHub Blog](https://github.blog/changelog/2024-06-06-code-security-configurations-can-now-be-enforced/)
  - code security configurations を強制できるように
  - 強制しない場合はリポジトリ側で設定を変更できる
- [Manage code security configurations via API - The GitHub Blog](https://github.blog/changelog/2024-06-20-manage-code-security-configurations-via-api/)
  - REST API を使用して構成の作成・管理・アタッチが可能に
- [Sunsetting security settings default parameters in the organization REST APIs - The GitHub Blog](https://github.blog/changelog/2024-07-09-sunsetting-security-settings-defaults-parameters-in-the-organizations-rest-api/)
  - （おそらく）これまでのセキュリティ設定の更新・取得をする API が廃止
  - これまでは次の API を使ってセキュリティ設定の更新・取得が可能だった。あくまでセキュリティ設定に限らない API であり、セキュリティ設定の更新・取得以外は引き続き利用可能っぽい
    - `GET /orgs/{org}`: [Get an organization](https://docs.github.com/en/enterprise-cloud@latest/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization)
      - いくつかのレスポンス[^deprecated_api]の description に廃止の旨が書かれている。ただし、`secret_scanning_push_protection_custom_link_enabled`, `secret_scanning_push_protection_custom_link` に関しては description に注意書きなし
      - > **Deprecated.** Please use [code security configurations](https://docs.github.com/enterprise-cloud@latest//rest/code-security/configurations) instead.\n\nWhether GitHub Advanced Security is enabled for new repositories and repositories transferred to this organization.\n\nThis field is only visible to organization owners or members of a team with the security manager role.
    - `PATCH /orgs/{org}`: [Update an organization](https://docs.github.com/en/enterprise-cloud@latest/rest/orgs/orgs?apiVersion=2022-11-28#update-an-organization)
      - 廃止の旨が書かれている
      - > Parameter deprecation notice: Code security product enablement for new repositories through the organization API is deprecated. Please use [code security configurations](https://docs.github.com/enterprise-cloud@latest//rest/code-security/configurations#set-a-code-security-configuration-as-a-default-for-an-organization) to set defaults instead. For more information on setting a default security configuration, see the [changelog](https://github.blog/changelog/2024-07-09-sunsetting-security-settings-defaults-parameters-in-the-organizations-rest-api/).
  - なお、次のバージョンの REST API[^next_version]で完全に削除されるとのこと

GA になったので導入しやすくなりましたね。複数リポジトリに設定を一括で適用できて便利です。すでに古い API を使っている方は新しい API に移行しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^deprecated_api]: `advanced_security_enabled_for_new_repositories`, `dependabot_alerts_enabled_for_new_repositories`, `dependabot_security_updates_enabled_for_new_repositories`, `dependency_graph_enabled_for_new_repositories`, `secret_scanning_enabled_for_new_repositories`, `secret_scanning_push_protection_enabled_for_new_repositories`, `secret_scanning_validity_checks_enabled`, 

[^next_version]: 次のバージョンの REST API がいつくるかは不明ですね。現在の API Version は `2022-11-28` です。GitHub が API Version を日付にしてからまだ新しいバージョンは出ていません。また、[latest でなくなったバージョンを最低 24 ヶ月サポートする](https://github.blog/developer-skills/github/to-infinity-and-beyond-enabling-the-future-of-githubs-rest-api-with-api-versioning/#how-often-will-you-release-new-versions-and-how-long-will-they-last)とのことなので、思ったより長生きするかもですね。

## Dependabot migration to GitHub Actions for Enterprise Cloud and Free, Pro, and Teams accounts with Actions enabled - The GitHub Blog
https://github.blog/changelog/2024-07-10-dependabot-migration-to-github-actions-for-enterprise-cloud-and-free-pro-and-teams-accounts-with-actions-enabled/

GitHub の Dependabot において、Dependabot で pull request を生成する処理が GitHub Actions として実行されるようになります（actions 有効リポジトリにおいて）。今後数週間でだんだんと移行されるようです。

GitHub Actions として実行されることで、実行の高速化、トラブルシューティングの容易化、セルフホストランナーのサポートなどのメリットがあるとのことです。
**Dependabot による GitHub Actions の実行は課金対象にならないため、無料です。**

なお、順次移行を待たずに Actions 上で実行するようにしたい場合は、リポジトリ、organization 設定で有効化することで即時移行が可能とのことです。

Dependabot 利用者はなぜか Dependabot によるプルリクエスト作成ができない場合などに原因を調査しやすくなって嬉しいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Ubie における、小さく泥臭くはじめる開発生産性改善
https://zenn.dev/ubie_dev/articles/53308d1458c44a

Ubie さんによる、開発生産性改善のためにやってきた・きていることを紹介する記事です。

取り組みのゴール定義、計測（アンケート調査、GitHub の開発アクティビティデータ収集・可視化）、分析、開発メンバーの巻き込み、継続的に関心を引くための定期的な施策が紹介されています。
開発生産性改善の一連のサイクル全体と、サイクルを回し続けるための工夫が載っており、開発生産性改善の進め方の参考になりそうです。

個人的には開発メンバの巻き込み、継続的に関心を引くという部分を悩み事としてる組織は多そうだなと思っており、こういった事例は大変助かると思っています。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 組織横断支援チームによるFour Keys計測基盤構築と活用に向けた取り組み | ドクセル
https://www.docswell.com/s/r4mimu/KEN6J6-2024-06-29-164917

サイボウズの組織横断支援チームによる Four Keys 計測基盤構築と活用に向けた取り組みについてのスライドです。
開発生産性カンファレンス 2024 で発表されたものになります。

開発生産性を上げたい（インパクトを増やしたい）背景や、インパクトを増やすために何が必要か、開発チームへのヒアリング、Four Keys 計測基盤をどのように構築して展開するか、提供してからの気づきや課題などが書かれています。

開発生産性を高めるために活動しているチームならではの悩みが載ってそうだなと思いました。似たような活動をしている方々の参考になりそうと思います。

なお、このスライドはいつも Productivity Weekly を一緒に書いてくれている生産性向上チームの [@r4mimu](https://zenn.dev/r4mimu) さんが発表されたものです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 「開発生産性の教科書」という本を執筆しました - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/07/11/090000

開発生産性計測・可視化基盤 Findy Team+ を作っていたり、開発生産性カンファレンスを開催しているなど、開発生産性に関する活動を多く行っている Findy さんの CTO の方が「開発生産性の教科書」という本を執筆したとのことです。

入門から実践までを網羅した本のことで、次の特徴が挙げられています。

- 体系的に整理された開発生産性の知識が学べる
- 実践への第一歩として、始めやすさにフォーカスした
- 成功へのヒントとして事例を 5 社集めまとめた

[目次](https://gihyo.jp/book/2024/978-4-297-14249-0)を読むと、開発生産性とは何か、開発生産性向上のためのステップ、開発生産性向上の取り組みを阻害する要因とその対策、パフォーマンスを測るための指標、各社事例が書かれているようです。

特に各社事例が気になりますが、個人的に「体系的に整理された開発生産性の知識が学べる」というのも気になってます。
気になる方は読んでみるといいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# tool 🔨

## GitHub Actionsの脅威検知ツール tracee-action を触ってみる
https://zenn.dev/melonattacker/articles/7a6d6128b0f788

Tracee という eBPF を使った Linux 上のシステムコール検出ツールを GitHub Actions で使うためのアクション tracee-action を紹介した記事です。
tracee-action の概要、検知ルール作成例、検知結果例が書かれています。

こういうツールがあるのは知りませんでした。検知ルール作成が大変そうですが、脅威検知のために利用できそうですね。僕も調べてみたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [アーキテクチャレベルで考える開発生産性 / architecture-and-productivity - Speaker Deck](https://speakerdeck.com/minodriven/architecture-and-productivity)
    - 開発生産性を上げるためにアーキテクチャをどう設計するかというスライドです
    - ただ開発生産性を上げるのではなく、収益を上げるために競争優位性を高める、そのために機能性と変更用意性を高めるのが重要であり、それを実現するためにドメイン駆動設計が紹介されています
  - [GitHub Actions でプライベートなネットワークにアクセスしたい | ドクセル](https://www.docswell.com/s/ussvgr/5EX4L7-gitHub-actions-private-network#p1)
    - GitHub Actions の GitHub-hosted runner を Azure VNet[^vnet]内で実行する方法を紹介したスライドです
    - 先日 Azure VNet 内で GitHub-hosted runner を実行できるようになりましたが、あまり事例を見かけませんでした。Azure をよく使う人は参考になりそうですね
    - APCommunications さんの動作確認記事も参考になりそうです
      - [GitHub ActionsとAzureのPrivate Networkとの統合がサポートされましたよ - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2023/12/08/120000)
  - [Apple シリコンの macOS で “Docker Desktop vs OrbStack” を検証してみた - PLAY DEVELOPERS BLOG](https://developers.play.jp/entry/2023/12/28/154822)
    - Apple Silicon の macOS で Docker Desktop (QEMU、Rosetta for Linux) と OrbStack の速度を比較した記事です
    - Apple Silicon の macOS 上では OrbStack が速いイメージを僕は持っていましたが、今の Docker Desktop も速いんですね
    - 個人的に Rancher Desktop との比較も気になりました
  - [GCP という呼び名はもう古いので気をつける](https://zenn.dev/kou_pg_0131/articles/gcp-to-google-cloud)
    - Google Cloud Platform は実は Google Cloud に変わっているという話です
    - 知っていましたが、Google Cloud は略語が安定してないので個人的には普通に GCP と呼んでます
- **tool 🔨**
  - [Linuxメモ : あると便利かもしれないRust製コマンドラインツール](https://wonderwall.hatenablog.com/entry/rust-command-line-tools)
    - 様々な Rust 製コマンドラインツールの紹介記事です
    - めちゃたくさんありますね。

[^vnet]: AWS VPC に相当する Azure のサービス、という認識。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
