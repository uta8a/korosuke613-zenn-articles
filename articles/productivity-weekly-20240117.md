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

AWS コンテナサービスに関するアーキテクチャ選択の最適化について解説している記事です。
インスタンスとコンテナ、ECS と EKS、EC2 上の ECS/EKS と Fargate という基盤選択の大きめなところから、ロードバランサーやデプロイ戦略、ログと監視などの運用上のトピックまで幅広く解説しています。

記事内では筆者の方が過去に調査した結果やリファレンスをもとに、意見が述べられており、説得力がある内容です。
個人的には [Fargate の CPU 性能と特徴についての記事](https://blog.father.gedow.net/2023/10/02/aws-ecs-fargate-cpu-2023/)が各 CPU の特徴を比較と整理されていてわかりやすかったし学びでした。これは Arm 一択ですね。
記事内のリファレンスもすべて目を通したら、書籍並みのボリュームになりそうですが、それだけ読む価値があると思います。(自分も全ては読めてないので、少しずつ読み進めます...！)

タイトルには AWS とありますが、クラウドネイティブなアーキテクチャの選択について考える上で、AWS 以外のクラウドでも参考になると思います！

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## AWS側の目線から理解する、Google Cloud ロードバランサの世界 - How elegant the tech world is...!
https://iselegant.hatenablog.com/entry/google-cloud-load-balancer

Google Cloud のロードバランサーの種類と特徴について解説している記事です。
Google Cloud のロードバランサーは AWS のロードバランサーと比べて種類が多く、一見複雑です。
そこでまず、 Google Cloud のネットワークについての思想を確認し、ネットワーク設計の思想を踏まえたうえで、ステップ・バイ・ステップで各ロードバランサーの種類を解説しています。
各ステップ、図を提示しているので、ロードバランサーの種類を理解するのに役立ちます。

結局のところ、L7/L4 、内部/外部、グローバル/リージョン、プロキシ/パススルー といった区別が理解できれば、ロードバランサーの種類を理解できるということがわかりました。
記事の最後の図がわかりやすいので、そこだけでも見てみる価値があります。

自分自身、これまでは主に AWS を使っていましたが Google Cloud を使う場面がありました。
その際、AWS と異なり、VPC がグローバルリソースという所から、ロードバランサー含めネットワーク周りの理解が難しかったのですが、こちらの記事のおかげで理解が深まりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## テストプロセスが自走するチーム体制をめざして QA が取り組んでいること - Techtouch Developers Blog
https://techtouch.hatenablog.jp/entry/qa_test_it_yourself

## 実録レガシーコード改善 / Working with Legacy Code: the True Record - Speaker Deck
https://speakerdeck.com/twada/working-with-legacy-code-the-true-record

## 雰囲気でbuildx/BuildKitを使っていたので調べました
https://zenn.dev/fraim/articles/98ad17f9ed140e

# tool 🔨

## eBPFを使った自動テストツール「Keploy」がすごい
https://zenn.dev/jambowrd/articles/3ee00f61c0b827

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
