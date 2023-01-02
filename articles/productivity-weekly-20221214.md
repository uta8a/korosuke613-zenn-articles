---
title: "Productivity Weekly (2022-12-14号)"
emoji: "🧧"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221214"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 102 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
読んでくれているみなさん、明けましておめでとうございます。
今年もよろしくお願いいたします🐰
:::

# news 📺

## actions-runner-controller is moving to a new home! · Discussion #2072 · actions/actions-runner-controller
https://github.com/actions/actions-runner-controller/discussions/2072

GitHub Actions のセルフホストランナー環境を構築するための OSS として、actions-runner-controller/actions-runner-controller というものがありますが、このリポジトリが、GitHub の持つ Organization (actions) へ移動しました。

移動に関する話は上記ディスカッションに書かれており、Actions Runner Controller を GitHub の製品とするための作業を開始したとのことです。また、今後はまずオートスケーリングの仕組みを新しくし、現在のスケーリングに関する問題を解消していくと書かれています。

以前、GitHub のロードマップに「[オートスケールするセルフホストランナー環境を k8s で構築するためのツール類を提供する](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20220831#actions%3A-self-hosted-runner-auto-scaling-support-for-kubernetes-%C2%B7-issue-%23555-%C2%B7-github%2Froadmap)」というものが追加された話をしました。まだ当該ロードマップは Open のままとなっていますが、今回のネームスペースの移動は Actions Runner Controller でオートスケール環境を公式に提供するということなのかもしれません。

もう 1 つ有名な OSS として [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) がありますが、こちらは AWS が対象です。今回 actions-runner-controller が公式となったのはプラットフォームに依存しないことが大きかったのかもしれません。

依然としてまだ正式な告知は出てないので、公式の製品として使うにはまだ早いかもしれません。正式発表を待ちたいです。

ちなみにリポジトリ移動のログは [⚠️ actions-runner-controller repository transfer notice · Issue #2089 · actions/actions-runner-controller](https://github.com/actions/actions-runner-controller/issues/2089) で見れます。

## Out-of-the-box support for non-POSIX shells (Node and Ruby) - CircleCI Changelog
https://circleci.com/changelog/#out-of-the-box-support-for-non-posix-shells-node-and-ruby

CircleCI において、シェルのコマンドの代わりに Node.js と Ruby のコマンドを使えるようになりました。

`steps.shell` に `node` もしくは `ruby` を指定することで実現できます。ちなみに、既存の機能として、`python3` を指定することで Python も使えます。

:::message
ちなみに、僕は Python が使えることを知らなかったので、「Python は昔からあったのかな」という旨のツイートをしたところ、公式 Twitter の人から Yes と返事が来ました。

> Yesです(中の人も知らなかった)。
> https://twitter.com/CircleCIJapan/status/1603045657266520064

中の人も知らなかったようです。
:::

使い所が難しい機能な気がしますが、シェルのコマンドでやるには面倒な作業を Node.js や Ruby で 1 行程度で実行できるといった場面では便利そうです。覚えておきたいですね。（さすがに 10 数行のコードになりそうならシェルスクリプトに外出しする方がメンテナンスやデバッグのしやすさという面で良いかと思います。）

# know-how 🎓


## 100人規模のエンジニア組織で DevOps Four Keys を導入し、アジリティー向上を目指した取り組み - MonotaRO Tech Blog
https://tech-blog.monotaro.com/entry/2022/12/13/090000

モノタロウさんによる Four Keys を導入してアジリティ[^agility]向上を目指した話です。

Four Keys、最近非常によく耳にしますね（主観）。開発生産性を分析するためのフレームワーク・メトリクスとしてトレンドな感じがしますが、実際に計測しようとすると、それぞれのメトリクスの定義を組織・製品にあったものにしなければいけなかったり、開発・運用に合った方法を考えたりしなければいけません。

モノタロウさんの記事では、Four Keys をそのまんま使うのではなく、製品開発・運用に合わせて再定義しており、そのプロセスが事例として嬉しいと思います。また、Four Keys 改善のためにどのようなことをしたかも書かれており、改善につなげる方法の例も載っているのが良いです。

記事では、背景・課題、Four Keys 基盤の構成・PoC、Four Keys の再考・深掘り、Four Keys の改善、やってみて得られたもの、難しい部分などが書かれています。

ただなんとなく Four Keys を始めるのではなく、しっかりと意味を持って始め、改善につなげている部分が Four Keys に興味のある方に参考になると思います。

僕たち生産性向上チームも最近は生産性の定量評価に興味があり、色々調べているところなのでこの記事の内容はとても参考になります。

[^agility]: 機敏さとか素早さとかを表す言葉。ビジネス的には「[目まぐるしい環境変化に即応するために欠かせない、経営や組織運営のあり方における機敏性を表す](https://jinjibu.jp/keyword/detl/880/)」...らしい。僕はこの言葉を聞く機会はたまにあるのですが、正直まだ慣れていません。


## GoogleCloudPlatform/fourkeys を使って Four Keys を計測する｜Showcase Gig Product Team Blog｜note
https://note.com/scg_tech/n/n720466ca7317

引き続き Four Keys の記事です。こちらは Showcase Gig さんによる GoogleCloudPlatform/fourkeys を使って Four Keys を計測するという記事です。Showcase Gig さんの記事では、Four Keys の計測を手助けする OSS として GoogleCloudPlatform/fourkeys の紹介をしています。

この記事では、Four Keys の説明、GoogleCloudPlatform/fourkeys の概要・仕組み・ダッシュボードの説明・セットアップ・deployment/incident 収集例、Grafana の認証設定・フィルタリング例などが載っています。

GoogleCloudPlatform/fourkeys が気になっている人はどんなものなのかなんとなく知れますし、そのままの運用では不十分な部分を解決するノウハウはすでに使っている人にも参考になりそうです。

僕たち生産性向上チームも最近は生産性の定量評価に興味があり、Four Keys 計測ってどうするのがいいんだろうと考えているところなのでこの記事の内容はとても参考になります。

## Transit Gateway で AWS を社内ネットワークの延長として使う - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2022/12/14/104414

:::message
この記事は僕が所属する生産性向上チームのメンバーがサイボウズ アドベントカレンダー 2022 で書いた記事です。なので半分宣伝です。
:::

サイボウズによる、AWS と社内ネットワーク間で VPN 接続をするという話です。（この記事の仕組み自体は 3 年以上前から構築しており、今回それをブログにしたというものになります。）

サイボウズでは、開発時に社内ネットワーク上のオンプレシステム（GitHub Enterprise Server など）に依存する製品がいくつかあります。したがって、開発・CI 等で AWS を活用するといったことが難しいという背景が過去ありました。そこで、AWS の VPC と社内ネットワークを VPN 接続する仕組みを AWS Transit Gateway を使って実現しました。というのがこの記事の内容です。

記事では、Transit Gateway の説明、簡単なネットワーク構成図、社内ネットワーク側での設定、Terraform 化、Resource Access Manager を使った他の AWS アカウントへの共有、プレフィックスリストを使った CIDR の共有、トラフィック分析などについて書かれています。

社内ネットワーク（イントラネット）を活用している組織はパブリッククラウドの活用が難しいことがありますが、AWS についてはネットワークをつなげることが可能です（多分 GCP や Azure も似たような仕組みはあるだろう）。やってみたい方はぜひご参考ください。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Highlights from Git 2.39 | The GitHub Blog](https://github.blog/2022-12-12-highlights-from-git-2-39/)
    - Git 2.39 がリリースされました
      - `git shortlog` でフォーマット指定子(`format:`)を使えるようになりました
      - `git repack` でリポジトリから削除されるオブジェクトの外部コピーを作成できるようになりました
      - sparse index 利用時に `git grep --cached` をするときの性能が向上しました
      - Git のサーバ側においてオブジェクトの接続性チェックが高速化されました
    - 個人的にはあまり意識する必要がありそうな変更はありませんでしたが、性能向上は嬉しいですね

# あとがき
新年初 Productivity Weekly ですが、残念ながら 2022-12-14 号となってしまいました。~~年末年始は遊んでばっかです。~~ 読んでくれているみなさん、明けましておめでとうございます。今年もよろしくお願いいたします🎍

年末は初めてのコミックマーケットへ参加したのですが、人の多さと熱量に大変驚きました。ちなみに僕のお目当てはちいかわが麻雀をするちい雀という同人誌でした。

https://twitter.com/Shitimi_613/status/1609200236353974272?conversation=none



そういえば、1/25 にサイボウズ株式会社で「Cybozu Productivity Weekly 100 回記念」という謎のオフラインイベントを開催する予定です。なんか話そうと思います（ついでに読んでる人に色々質問したい）。オフラインイベントであるため枠が存在しており、2023/01/02 14:00 時点で残り 3 人くらいしか参加できませんが、興味があれば滑り込みください。

https://cybozu.connpass.com/event/268442/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
