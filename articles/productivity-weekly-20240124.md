---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2024-01-24号)"
emoji: "🎾"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240124"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-24 単独号です。

今回が第 140 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub-hosted runners: Double the power for open source - The GitHub Blog
https://github.blog/2024-01-17-github-hosted-runners-double-the-power-for-open-source/

## Copilot Content Exclusions Feature Update - The GitHub Blog
https://github.blog/changelog/2024-01-18-copilot-content-exclusions-feature-update/

## Release v4.0.0 · actions/cache
https://github.com/actions/cache/releases/tag/v4.0.0

## Terraform 1.7 adds test mocking and config-driven remove
https://www.hashicorp.com/blog/terraform-1-7-adds-test-mocking-and-config-driven-remove

2024 年 1 月に Terraform 1.7 が GA になりましたね。

Terraform v1.6 でテストが導入されましたが、さらに v1.7 ではテストのモックが追加されました。
v1.6 でのテストでは plan または apply を使用して、実際のプロバイダを呼び出すことによって実行されていました。
しかし、`resource`, `data source`, `module`, `provider` のモックが利用できるようになり、認証することなくテストを実行できるようになります。
また、実際に API を叩かないので、プロビジョニングに時間がかかるリソース (データベースインスタンスなど) をモックすれば、テスト・スイートを実行するのに必要な時間を削減できる利点があります。

[公式ドキュメント](https://developer.hashicorp.com/terraform/tutorials/configuration-language/test#mock-tests)にも mock のチュートリアルが追加されていたので、興味がある方はそちらも参照してみてください。

個人的にテストのモックが目玉だと感じましたが、config-driven remove や import block 内で `for_each` が使えるようになったり地味に嬉しい変更もあります。

詳しくは[リリースノート](https://github.com/hashicorp/terraform/releases/tag/v1.7.0)をご覧ください。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Amazon ECS enables easier EC2 capacity management, with managed instance draining | Containers
https://aws.amazon.com/jp/blogs/containers/amazon-ecs-enables-easier-ec2-capacity-management-with-managed-instance-draining/

## GitHub Actions - Repository Actions Runners List is now generally available - The GitHub Blog
https://github.blog/changelog/2024-01-17-github-actions-repository-actions-runners-list-is-now-generally-available/

# know-how 🎓

## リリース頻度を毎週から毎日にしてみた - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2024/01/19/094639

## TerraformとCloud RunとCloud Load BalancingでCI/CDを突き詰めた
https://devblog.pirika.org/entry/2023/07/26/113000

Google Cloud のインフラを IaC と CI/CD で整備する方法を紹介しています。
Google App Engine で構築されていたアプリケーションを Cloud Run に移行し、Terraform や Cloud Build を使って自動デプロイを実現したそうです。

Terraform で Cloud Run アプリケーションをどのように管理するか問題は、自分も直面したことがあるので共感する内容でした。
こちらのブログでは、Terraform にはダミーのイメージを定義し、イメージ更新の際は更新用に用意したシェルスクリプトから `gcloud` コマンドを使うという方法をとっています。
フロントエンド、バックエンドなど各アプリケーションを逐次的にデプロイすると時間がかかるため、バックグラウンドでデプロイコマンドを行い、wait で待機するという方法をとっている点が特徴的です。

デプロイされた Cloud Run アプリケーションは、Cloud Load Balancing でリビジョンタグに基づいてルーティングするようにしているそうです。
このリビジョンタグは git ブランチ名やタグから自動的に生成しているため、開発用にデプロイした環境にも簡単にアクセスできるとのことで、開発者以外にとっても便利そうです。

殆ど全てのインフラが自動デプロイされており、快適な職場だと感じました。
また、ローカル開発環境も整備しているそうで、 Google が公式で提供する Cloud Pub/Sub エミュレーターはもちろんのこと、Cloud Storage, Cloud Tasks などのエミュレーターも使っているとのこと。サードパーティ製ですが、Cloud Storage のエミュレーターがあるのは知りませんでした。
余談ですが、Google Cloud にも Localstack のようなまとまったエミュレーターがあると嬉しい...

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## プラットフォーム エンジニアリングのキャリアを積むための基盤づくり
https://cloud.google.com/blog/ja/products/application-development/how-to-become-a-platform-engineer/

Google がプラットフォームエンジニアの業務内容や必要なスキルの紹介を含む、プラットフォームエンジニアリング分野の概要を紹介しています。

DevOps 革命やクラウドネイティブの発展、観測可能性と SRE の進歩から得られた教訓がある一方で、認知負荷の増加やセキュリティの複雑さが増していると指摘されています。
この課題に対して、プラットフォームエンジニアというロールを定義し、プラットフォームエンジニアに共通の特性や設計ループと顧客重視の重要性を紹介しています。

これまでも、しばしばプラットフォームエンジニアリングについての記事はいくつか見かけていました。
今回の記事はプラットフォームエンジニアが重視するべきトピックや、プラットフォームエンジニアが避けるべきことなど、具体的な話が含まれているのが特徴的です。

我々サイボウズ生産性向上チームもプラットフォームエンジニアリングに近しい活動をしているので、これからもこの分野の情報には注目していきたいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 1分で出来る Android Lint と GitHub code scanning の連動
https://zenn.dev/yumemi_inc/articles/8d1603b5a8ea26

# tool 🔨

## superwhisperでの音声入力を試す | Web Scratch
https://efcl.info/2024/01/17/superwhisper/

## Findy Tools
https://findy-tools.io/

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
