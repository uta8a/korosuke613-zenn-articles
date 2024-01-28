---
title: "＜ここにタイトルを入力＞｜Productivity Weekly (2024-01-17号)"
emoji: "🎞️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20240117"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-17 単独号です。

今回が第 139 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## OpenTofu Announces General Availability
https://www.linuxfoundation.org/press/opentofu-announces-general-availability

## Amazon ECS and AWS Fargate now integrate with Amazon EBS
https://aws.amazon.com/jp/about-aws/whats-new/2024/01/amazon-ecs-fargate-integrate-ebs/

## Our move to generated SDKs - The GitHub Blog
https://github.blog/2024-01-03-our-move-to-generated-sdks/

# know-how 🎓

## GitHub Actionsのcomposite actionを使ってinternalリポジトリのファイルを配布する - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2024/01/11/000000

## AWSコンテナ系アーキテクチャの選択肢を最適化する | 外道父の匠
https://blog.father.gedow.net/2024/01/12/aws-container-architecture-watershed/

## AWS側の目線から理解する、Google Cloud ロードバランサの世界 - How elegant the tech world is...!
https://iselegant.hatenablog.com/entry/google-cloud-load-balancer

## テストプロセスが自走するチーム体制をめざして QA が取り組んでいること - Techtouch Developers Blog
https://techtouch.hatenablog.jp/entry/qa_test_it_yourself

Four Keys の Elite チーム[^elite]に向かうためには...？という目線で、チーム体制が刻々と変化するという固有の事情も踏まえて、E2E テスト改善をしていくために QA チームがチームトポロジーの用語で言うイネーブリングチームとして機能するようになるための取り組みが語られています。

Four Keys の文脈では CI/CD 高速化等のビルドパイプラインの改善の話が出てくることが多いので、品質保証観点からの記事は珍しいと感じました。組織の話、テストマネジメントツールの導入など取り組みの全体像が見えて面白かったです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

[^elite]: 平木場注: DORA のレポートによると Four Keys ではチームのパフォーマンスによって Elite、High、Medium、Low の 4 つのグループに分類できる。もっともパフォーマンスの高いチーム群が Elite とされる。2023 年の State of DevOps Report においては、変更のリードタイムが 1 日以内、デプロイの頻度がオンデマンド（毎日複数回）、変更のエラー率が 5% 以下、デプロイ失敗の復旧までの時間が 1 時間以内のチームが Elite とされている。https://cloud.google.com/blog/ja/products/devops-sre/announcing-the-2023-state-of-devops-report

## 実録レガシーコード改善 / Working with Legacy Code: the True Record - Speaker Deck
https://speakerdeck.com/twada/working-with-legacy-code-the-true-record

## 雰囲気でbuildx/BuildKitを使っていたので調べました
https://zenn.dev/fraim/articles/98ad17f9ed140e

buildx, BuildKit, build driver, ... といった Docker のビルドプラグイン周りの用語を整理してくださっている記事。docker は普段 build, run といったコマンドを叩くだけなので裏側まで意識したことがあまりなく、この記事で違いを理解できました。

個人的には BuildKit に多くの Key feature があるというのを知らなくて探究してみたいと思いました。Extendable frontend formats の項目で、LLB のフロントエンドに Nix が使えたりするというのは初耳でした。また、Build cache import/export の項目にある cache exporter の gha(GitHub Actions)や S3 はよく聞くので活用してコンテナのビルド時間を短縮していきたいですね！

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# tool 🔨

## eBPFを使った自動テストツール「Keploy」がすごい
https://zenn.dev/jambowrd/articles/3ee00f61c0b827

eBPF という、カーネルに手を加えることなくカーネルランドで安全に処理を実行できる仮想マシンを用いたアイデアは近年いくつか登場しています。主に Observability や Security 用途が有名ですが、この記事では eBPF を用いた自動テストツール Keploy の紹介がされています。

元記事を書かれた方が [epli2/keploy-minimal-example: A sample project for Keploy](https://github.com/epli2/keploy-minimal-example) というミニマルな構成のサンプルを用意してくださっていたので、私も Ubuntu マシン上でなぞってみました。

実際に Keploy を立ち上げて curl でエンドポイントを叩くだけで録画されたかのようにリクエストが YAML に記録されて、それを元にテストを行うことができます。動作確認用の curl 集のようなものがある場合は、Keploy を使えばコードを書くことなくテストケース化できるので、テストを追加する際のハードルが低くなって良いと感じました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## whisper.cppがいつのまにかmacOS用文字起こしの決定版になっていた
https://zenn.dev/muo/articles/ffa37618c0427f

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
