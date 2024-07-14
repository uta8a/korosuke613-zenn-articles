---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-06-26)
emoji: 🏷️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240626
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
今週は 2024-06-26 単独号です。

今回が第 158 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2024-07-03 号の Productivity Weekly は社内イベントのためお休みです。
:::

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Artifact Attestations is generally available - The GitHub Blog
https://github.blog/changelog/2024-06-25-artifact-attestations-is-generally-available/

## Anthropic’s Claude 3.5 Sonnet model now available in Amazon Bedrock: Even more intelligence than Claude 3 Opus at one-fifth the cost | AWS News Blog 
https://aws.amazon.com/jp/blogs/aws/anthropics-claude-3-5-sonnet-model-now-available-in-amazon-bedrock-the-most-intelligent-claude-model-yet/

Amazon Bedrock で使用できる学習モデルに Anthropic の Claude 3.5 Sonnet が追加されました。
Anthropic の出した学習モデルの中で最も性能スコアの高かった Claude 3 Opus よりも性能スコアが高く、それでいてコストは 80% 安いそうです。

GPT-4o や Gemini との比較も載っており、興味深いです。
試しに触ってみましたが、日本語であっても非常に明解な文章を出力してくれている感じがします。

どんどん性能が高くなりコストは低くなる流れは、利用者にとって非常に嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## GitHub Actions: Ubuntu 24.04 image now available for arm64 runners - The GitHub Blog
https://github.blog/changelog/2024-06-24-github-actions-ubuntu-24-04-image-now-available-for-arm64-runners/

## New JavaScript Set methods | MDN Blog 
https://developer.mozilla.org/en-US/blog/javascript-set-methods/

JavaScript には集合を扱うことができる Set オブジェクトが 2014 年くらいからありますが、2 つの集合の差分や共通の値を出すメソッドは無く、サードパーティーのライブラリを使用するか自前で実装する必要がありました。
あれから時が経ち、2023 年後半から主要ブラウザに集合の差分や共通の値を出すメソッドが実装されるようになり、2024 年 6 月についに Firefox にも実装されました。これによりこれらメソッドの Baseline では Widely supported と表示され、開発者は安心して使用できます。

ようやくという気がしますが、便利になって嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Help us test OpenTofu 1.8.0-alpha1
https://opentofu.org/blog/help-us-test-opentofu-1-8-0-alpha1/

## Fastlyが開発者向けの無料プランを提供開始。CDNやDDoS対策、Wasm対応ランタイム、KVストアなど提供 － Publickey
https://www.publickey1.jp/blog/24/fastlycdnddoswasmkv.html

# know-how 🎓

## 開発生産性指標を向上させるためにやってはいけないアンチパターン - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/06/24/090000

## 継続的テスト（continuous testing）とシフトレフトな活動をアジャイルにどう取り入れるか？／風間裕也・執筆 - Agile Journey
https://agilejourney.uzabase.com/entry/2024/06/25/103000

## feature flag と OpenTelemetry - Speaker Deck
https://speakerdeck.com/biwashi/feature-flag-to-opentelemetry

## Gobra で見る形式検証 (mercari.go #26) - Speaker Deck
https://speakerdeck.com/artoy/gobra-dejian-ruxing-shi-jian-zheng-mercari-dot-go-number-26

## CUR による AWS コスト構造の継続的モニタリング
https://zenn.dev/simpleform_blog/articles/20240617-aws-cost-structure-monitoring

## GitHub からの AWS CloudFormation デプロイ自動化 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/automate-safe-aws-cloudformation-deployments-from-github-jp/

2023 年の末頃に CloudFormation のスタックを各種 Git のホスティングサービスを介してデプロイできるようになりました。GitHub, GitHub Enterprise Server, GitLab, BitBucket に対応しているようです。
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/aws-cloudformation-git-management-stacks/

このブログ記事では、GitHub に一からリポジトリを作り、GitHub Actions を使って lint を導入し、CloudFormation と同期するところまで紹介しています。
GitHub Codespace を使っていたり、GitHub Actions を使って CI を組んだりと、昨今のモダンな開発フローを学ぶことができそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## GitLab、ソフトウェア開発の現状に関する企業調査レポートを発表 ―経営幹部と実務担当者の間にAI、セキュリティ、生産性に対する意識の差 | gihyo.jp
https://gihyo.jp/article/2024/06/gitlab-research2024

## AWS Summit Japan 2024セッションレポートまとめ（6/25 13:30更新） | DevelopersIO
https://dev.classmethod.jp/articles/aws-summit-japan-2024-matome/

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


:::message
2024-07-03 号の Productivity Weekly は社内イベントのためお休みです。
:::


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
