---
title: "ここにタイトルを入力|Productivity Weekly (2023-12-20号)"
emoji: "🦶"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231220"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-12-20 単独号です。

今回が第 137 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## GitHub Actions - Artifacts v4 is now Generally Available - The GitHub Blog
https://github.blog/changelog/2023-12-14-github-actions-artifacts-v4-is-now-generally-available/

## GitHub Next • Technical Preview Sunsets
https://gist.github.com/idan/325676d192b32f169b032fde2d866c2c

GitHub Next[^gh_next]が提供するいくつかのテクニカルプレビューが 2023/12/15 で終了しました。この連絡はプレビュー利用者に対してメールで送られてきました。上記リンクはそのメールの内容を GitHub Next の中の人が Gist に残したものですね。

実際に終了した機能は以下です。

- [Copilot for PRs](https://githubnext.com/projects/copilot-for-pull-requests)
- [Copilot for Docs](https://githubnext.com/projects/copilot-for-docs)
- [Copilot Labs](https://githubnext.com/projects/copilot-labs)
- [Blocks](https://blocks.githubnext.com/)

Copilot for PRs は GitHub Copilot によるプルリクエストのレビューやテスト生成、PR 自体を作る機能で、Docs の方は React などの技術ドキュメントを学習した GitHub Copilot とチャットできる機能でした。
これらは [GitHub Universe 2023 で発表された](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231115?redirected=1#universe-2023%3A-copilot%E3%81%8Cgithub%E3%82%92ai%E3%82%92%E9%A7%86%E4%BD%BF%E3%81%97%E3%81%9F%E9%96%8B%E7%99%BA%E8%80%85%E3%83%97%E3%83%A9%E3%83%83%E3%83%88%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%B8%E3%81%A8%E5%A4%89%E8%B2%8C%E3%81%95%E3%81%9B%E3%82%8B---github%E3%83%96%E3%83%AD%E3%82%B0) GitHub Copilot Enterprise や GitHub Copilot Workspace の機能として生まれ変わったように思います。

Copilot Labs は VSCode 向けの拡張機能で、GitHub Copilot にテストを書かせたりコードを説明させたりといった応用的な機能でした。これらは GitHub Copilot Chat の GA でその役目を終えたように思います。

Blocks に関しては残念ながら代替機能がリリースされるわけではないようです。ただ、今後 GitHub.com を拡張する上でこの実験記録は参考にしていくようです。

テクニカルプレビュー自体は終了しましたが、Blocks 以外は今後も使っていくことが可能です。今後もどんどん実験的機能を出していってほしいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^gh_next]: GitHub Next は次世代のソフトウェア開発を担う実験的機能を開発・提供するための GitHub の組織です。

## コストで差をつけろ！！re:Invent 2023 で発表された AWS Cost Optimization Hub を紹介！ |
DevelopersIO 
https://dev.classmethod.jp/articles/introduction-to-aws-cost-optimization-hub/

## Code scanning default setup is now available for self-hosted runners on GitHub.com - The GitHub Blog
https://github.blog/changelog/2023-12-19-code-scanning-default-setup-is-now-available-for-self-hosted-runners-on-github-com/

## Docker社がTestcontainersの開発元AtomicJar社の買収を発表。Dockerでの統合テスト環境を強化 － Publickey
https://www.publickey1.jp/blog/23/dockertestcontainersatomicjardocker.html

## HashiCorp Vaultもフォークへ、「OpenBao」がLinux Foundation傘下で進行中
https://www.publickey1.jp/blog/23/hashicorp_vaultopenbaolinux_foundation.html

[HashiCorp の OSS 製品が Business Source License になった](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816#hashicorp-adopts-business-source-license)こと、[Terraform の fork であり MPL-2.0 を維持する OpenTofu が爆誕した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230913#the-opentf-fork-is-now-available!)ことはまだ記憶に新しいと思います。

HashiCorp の Business Source License 製品は Terraform の他に Nomad や Vault がありますが、Terraform に続き Vault も新たに fork された新プロジェクト OpenBao が誕生していることが明らかになりました。

まだ OpenTofu ほどプロジェクトは進んでいないようですが、今後に期待ですね。

> ロゴもすでに公開されており、下記のおまんじゅうがそれです（JavaScriptランタイムのBunのロゴにそっくりな気がします...）。

そっくり過ぎて笑いました。Bun と混同するからやめてほしい。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Large Runner + リモートキャッシュで爆速 Bazel のフルテスト | by 松原信忠 | Dec, 2023 | MIXI DEVELOPERS
https://mixi-developers.mixi.co.jp/github-actions-large-runner-and-bazel-remote-cache-94e0d52e664a

## CircleCI関連の月額コストを1日で10%削減する - freee Developers Hub
https://developers.freee.co.jp/entry/2023/12/18/110000

Freee さんの CircleCI のコスト削減事例です。お手軽にコスト削減ができる施策を紹介しています。

1 つ目はストレージの保存期間を短くすることです。
キャッシュ、ワークスペース、アーティファクトの保存期間を短くすることで、ストレージの使用量を減らしています。

2 つ目は、ECR のリージョンを変更することです。
CircleCI は AWS の [us-east-1 で動いている](https://support.circleci.com/hc/en-us/articles/18232867121819-Best-Practices-for-Minimizing-AWS-Data-Transfer-Costs-with-CircleCI-and-ECR)ため、ECR のリージョンを us-east-1 にすることで、データ転送料を削減しています。
また、これによりイメージ取得時間も短縮されて、一石二鳥な施策です。

感想として、ストレージ保存期間を変更することは、コストや容量が気になって初めて意識する事が多いですが、要件に応じてあらかじめ保存期間を短くしてしまうのはいい手だなと思いました。
また、CircleCI 公式で AWS のデータ転送におけるベストプラクティスが公開されていることを知り、勉強になりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 【OpenTelemetry】CLIでトレースが送れるotel-cliが便利そうだったので触ってみる
https://ryuichi1208.hateblo.jp/entry/2023/12/17/005818

スクリプトから OpenTelemetry トレースを送信するツール otel-cli の紹介記事です。

otel-cli のドキュメントでは OpenTelemerty Collector や各種 OTEL 対応しているサービスのトレーシングの動作確認の用例と、
さらに面白い使い方として CI パイプラインに組み込む例が示されていました。
[Instrumenting CI Pipelines using otel-cli](https://pokgak.xyz/articles/instrument-your-ci/)
CI パイプラインのボトルネックを探すことにも使えそうですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## Terraform v1.7.0で久々にアップデートのあったグラフ機能でイイ感じにTerraformを可視化したい人生だった - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2023/12/14/140255

Terraform v1.7.0 でリソースの依存関係をグラフで可視化するコマンド `terraform graph` に更新があったことを機に、Terraform リソースの可視化方法について考えられた記事です。

v1.7.0 以前と以降で `terraform graph` の出力結果を確認していますが、正直なところ相変わらずで見やすくなっているとは言い難く、結論としては、v1.7.0 の `terraform graph` は今後に期待という感じでした。

そこで、[Pluralith](https://www.pluralith.com/) という可視化サービスが紹介されています。
Pluralith はローカルでの実行は無料で、CI 上での実行は plan 回数に応じた料金設定となっています。(API Key を払い出して CI 上でセットアップスクリプトを書けば無料で使えてしまいそうなのですが、どうなのでしょうか)
出力される画像は、リソースグループや仮想ネットワークなどが階層構造で表示されていたり、リソースが新規作成か削除かが色分けされていて見やすいです。
また、コストの概算も表示されるのが既存の可視化ツールよりも嬉しいですね。

Terraform 可視化ツールは他にもいくつかあるみたいなので、興味がある方は調べてみるといいかもしれません。参考：https://gkzz.dev/posts/alternative-terraform-graph/

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## パスキーの基本とそれにまつわる誤解を解きほぐす
https://blog.agektmr.com/2023/12/passkey-mythbusting.html

# tool 🔨

## AlexSim93/pull-request-analytics-action: Generates detailed PR analytics reports within GitHub, focusing on review efficiency and team performance.
https://github.com/AlexSim93/pull-request-analytics-action

## Wave Terminal
https://www.waveterm.dev/

## 【Rust製構成管理ツール】JetPorch とは【次世代Ansible？】 #Rust - Qiita
https://qiita.com/pollenjp/items/aa54c7b236e40faae776

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
