---
title: "Productivity Weekly (2023-11-08号)"
emoji: "🤡"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231108"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-08 単独号です。

今回が第 132 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## GitHub Actions - Enforcing workflow scope when creating a release - The GitHub Blog
https://github.blog/changelog/2023-11-02-github-actions-enforcing-workflow-scope-when-creating-a-release/

## Secret scanning expands detection to include non-provider patterns (beta) - The GitHub Blog
https://github.blog/changelog/2023-11-06-secret-scanning-expands-detection-to-include-non-provider-patterns-beta/

## Azure private networking for GitHub-hosted runners - Public Beta - The GitHub Blog
https://github.blog/changelog/2023-11-01-github-hosted-runners-private-networking-with-azure-virtual-networks-public-beta/

GitHub がホスティングするランナーを Azure Virtual Networks（VNET）と接続させる機能がβ版でリリースされました。

Azure を利用した経験は無いのですが、VNET は AWS における VPC 相当の機能だと思いました。

ランナーを VNET に接続させることで Azure のサービスにアクセス可能にしたり、VNET 経由でオンプレミスにホスティングした artifactory のようなサービスにアクセス可能とすることを想定しているようです。また、セキュリティのために Network Security Group（NSG）を利用してランナーのネットワークを制御できることもメリットのようです。

Azure に詳しい方はおそらくドキュメントを見て頂く方がより詳しく理解できるかと思います。こちらのドキュメントに GitHub がホスティングするランナーがどのようにして VNET に接続されるかを表した図もあります。

https://docs.github.com/en/enterprise-cloud@latest/admin/configuration/configuring-private-networking-for-hosted-compute-products/about-using-github-hosted-runners-in-your-azure-virtual-network


Larger runner と呼ばれる強いスペックのランナーは[以前からIPレンジを固定できる機能](https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners/about-larger-runners#additional-features-for-larger-runners)が提供されていましたが、Azure を利用している場合にはより密にプライベートなネットワークに統合できるようになったのだと思います。Azure のみとなっていることが残念ではありますが、エンタープライズ用途向きの機能が増えてきているのは嬉しいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS Fargate now enables Amazon ECS tasks to selectively leverage SOCI
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/aws-fargate-amazon-ecs-tasks-selectively-leverage-soci/

[Productivity Weekly 2023-08-20号で紹介した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802)SOCI インデックスによるコンテナイメージの遅延読み込みが ECS で使いやすくなる機能追加がありました。

どう便利になるのかについて、有識者の X のポストが大変参考になりましたのでこちらを引用します。

https://twitter.com/toricls/status/1721877821872873533?s=20


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Docker Desktop、Appleシリコン上でx86-64バイナリをほぼネイティブな速度で実行可能にする「Rosetta for Linux」が正式版に
https://www.publickey1.jp/blog/23/docker_desktopapplex86-64rosetta_for_linux.html

## AWS が iOS 向けの AWS コンソールモバイルアプリケーションでサインインエクスペリエンスを強化したことを発表
https://aws.amazon.com/jp/about-aws/whats-new/2023/10/aws-console-mobile-app-ios-enhanced-sign-in/

# know-how 🎓

## O'Reilly Japan - 詳解 Terraform 第3版
https://www.oreilly.co.jp/books/9784814400522/


## リアーキテクトと開発生産性について - Speaker Deck
https://speakerdeck.com/yosuke_furukawa/riakitekutotokai-fa-sheng-chan-xing-nituite

2023 年 10 月 31 日(火)にサイボウズのフロントエンドエンジニア主催で「BAR フロントえんどう」という勉強会が開催されました。
その中で、Japan Node.js Association の方が「リアーキテクトと開発生産性について」というタイトルで発表されていました。

まず、よくある開発生産性における誤解として、開発生産性とは単一のメトリクスだけでは測れないもので、複数の要素を組み合わせて測る必要があるということを述べています。

では、具体的に複数の指標とは何かというと、ここでは以下の 5 つのカテゴリからなる SPACE フレームワークを挙げています。

- Satisfaction and well being
- Performance
- Activity
- Communication and collaboration
- Efficiency and flow

SPACE フレームワークについては[こちら](https://www.swarmia.com/blog/space-framework/?utm_term=space%20productivity&utm_campaign=SRH-SPACE-ANZ-EN&utm_source=adwords&utm_medium=ppc&hsa_acc=6644081770&hsa_cam=19643105953&hsa_grp=145044306959&hsa_ad=646939742387&hsa_src=g&hsa_tgt=kwd-1949610128781&hsa_kw=space%20productivity&hsa_mt=e&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=EAIaIQobChMIwZHH1q_NggMVLV0PAh0A0Qv6EAAYASAAEgI7M_D_BwE)を参照してください。

開発生産性指標を SPACE フレームワークと定義した際に、リアーキテクトがどのように開発生産性に貢献できるかと、一方でリアーキテクトによるコストがどのように発生すかを述べています。
そして、実際にフロントエンドにおいてリアーキテクトを行う方法を 3 つ解説しています。

全体として、開発生産性とリアーキテクトどちらについても具体例を挙げて説明しているので、わかりやすいスライドでした。

BAR フロントえんどうのその他の発表については[こちら](https://blog.cybozu.io/entry/2023/11/10/131530)をご覧ください。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Developer Productivity Engineering at Netflix - The New Stack
https://thenewstack.io/developer-productivity-engineering-at-netflix/

Netfilx における開発生産性エンジニアリングについての記事です。特にプラットフォームチームについて紹介されています。

Netfilx の製品管理および内部顧客サポートを含むプラットフォームチームは約 150 人で、2,500 人以上のエンジニア組織と 500 人のデータチームを支援し、
開発者体験（Developer Experience）に焦点を当てており、ビルド、テスト、CI などの開発プロセス全体を管理しているそうです。

プラットフォームチームは開発者の生産性を測定する際に SPACE フレームワークを活用し、定量的な指標だけでなく、定性的な指標も活用しているらしく、
定性的な指標を計測するために、四半期に一度程度で社内の開発者に対してアンケートを実施しているそうです。

例えば、社内のツールやプラットフォームチームが提供するプラットフォームについて、以下のような具体的な質問をしているとあります。

- ツールを楽しいと感じるか
- ツールのおかげで仕事がどれだけ効果的だと感じるか
- どれくらい頻繁にデプロイし、デプロイしているものに自信を持てるか
- アプリケーションの起動時間はどれくらいか
- ビルド時間はどれくらいか
- テストスイートの実行にどのくらいかかるか

誰がフィードバックを提供しているのかを知ることが重要と考えているため、これらのアンケートは匿名でなく、意図的に情報を公開、共有されているそうです。

心理的安全性を高め、エンジニア同士の情報共有やフィードバックを適切に行うことで、開発者体験がより良い組織にしていくというのは、Netfilx 規模の企業でも重要視されていることが分かる記事でした。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# tool 🔨

## Microsoft、各種シェルに600を超えるコマンド補完を掲げる「inshellisense」
https://news.mynavi.jp/techplus/article/20231107-inshellisense/

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
