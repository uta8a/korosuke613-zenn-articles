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
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub-hosted runners: Double the power for open source - The GitHub Blog
https://github.blog/2024-01-17-github-hosted-runners-double-the-power-for-open-source/

GitHub がホストしている GitHub Actions ランナーについて、**パブリックリポジトリに限り** Linux と Windows でそれぞれ vCPU が 2 倍、メモリが 2 倍、ストレージが 10 倍になりました。

CPU 4 vCPU,メモリ 16 GB、ストレージ 150 GB で使用できます。
macOS は今回の記事では言及されておらず、変わりないようです。

使用にあたってワークフロー中のランナーのラベルを編集する必要は無く、そのままでスペックの上がったランナーが使用されます。

なお、記事中で「2023 年の GitHub Actions の総実行時間は 70 億分」とあります...！
よりビルド時間が短くなると開発者の生産性も上がりますし、GitHub 側のコスト削減にもなると思われるので、一石二鳥ですね！
パブリックリポジトリでのビルドに関してはありがたく使わせていただきます。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Copilot Content Exclusions Feature Update - The GitHub Blog
https://github.blog/changelog/2024-01-18-copilot-content-exclusions-feature-update/

## Release v4.0.0 · actions/cache
https://github.com/actions/cache/releases/tag/v4.0.0

## Terraform 1.7 adds test mocking and config-driven remove
https://www.hashicorp.com/blog/terraform-1-7-adds-test-mocking-and-config-driven-remove

## Amazon ECS enables easier EC2 capacity management, with managed instance draining | Containers
https://aws.amazon.com/jp/blogs/containers/amazon-ecs-enables-easier-ec2-capacity-management-with-managed-instance-draining/

Amazon ECS on EC2 で、EC2 インスタンスの draining をマネージドにやってくれる機能が追加されました。

今まで ECS で使用している EC2 インスタンスが何らかの理由で終了した際に、ECS のタスクが要求数を満たさず、可用性が犠牲になるということがありました。
それを避けるために、ECS 利用者はこのようなブログ記事を参考に、自分たちで EC2 インスタンスの draining を実装したりして可用性を確保していました。
https://aws.amazon.com/jp/blogs/compute/how-to-automate-container-instance-draining-in-amazon-ecs/

今回、ECS 側に EC2 インスタンスをマネージドドレインする機能が追加されたことで、ユーザーが独自に実装することなくタスク数が前もって確保されるようになりました。
次のような流れで、可用性を保ちながら EC2 インスタンスを終了させることができるようになるようです。

1. なんらかの理由で AutoScaling が EC2 インスタンスが終了しようとすると、ECS がインスタンスをドレインモードに設定し、一時的にインスタンスの終了を遅らせます
2. ドレインモードにある EC2 インスタンスで新たにタスクが立ち上がることはなくなり、新しいタスクは EC2 インスタンスのキャパシティに空きがあればそこに増やし、無ければキャパシティプロバイダが EC2 インスタンスを増やせるようイベントを発火します
3. その後、ドレインモードになっている EC2 インスタンスを終了させるようです

とてもありがたいですね。ちなみに、私はこの公式のブログが出る前にマネージドインスタンスドレインのオプションがあることに気付きました...！なんか嬉しいです！
@[tweet](https://twitter.com/defaultcf/status/1747544937179353439)

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## GitHub Actions - Repository Actions Runners List is now generally available - The GitHub Blog
https://github.blog/changelog/2024-01-17-github-actions-repository-actions-runners-list-is-now-generally-available/

# know-how 🎓

## リリース頻度を毎週から毎日にしてみた - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2024/01/19/094639

## TerraformとCloud RunとCloud Load BalancingでCI/CDを突き詰めた
https://devblog.pirika.org/entry/2023/07/26/113000

## プラットフォーム エンジニアリングのキャリアを積むための基盤づくり
https://cloud.google.com/blog/ja/products/application-development/how-to-become-a-platform-engineer/

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
