---
title: "Productivity Weekly (2023-02-08号)"
emoji: "🍫"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230208"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-02-08 単独号です。（2023-02-01 号はお休みでした。）

今回が第 106 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions - Updating the default GITHUB_TOKEN permissions to read-only | GitHub Changelog
https://github.blog/changelog/2023-02-02-github-actions-updating-the-default-github_token-permissions-to-read-only/

GitHub Actions において、`GITHUB_TOKEN` のデフォルト権限が `contents` と `packages` の read only になりました。

ただし、既存の Enterprise、Organization、リポジトリの設定には影響がありません。また、新規に organization やリポジトリを作成する場合も、既存の上位組織の設定を引き継ぐようです。

例えば、Organization の `Workflow permissions` が `Read and write permissions` になっている場合、その Organization 配下に新規リポジトリを作っても `Workflow permissions` は `Read and write permissions` を引き継ぎます。`Read repository contents and packages permissions` とはなりません。

しかし、個人リポジトリについては `Read repository contents and packages permissions` がデフォルト値となります。

既存顧客に影響を与えないように上位組織の設定を引き継ぐようになっていると思われます。正直なところ、既存組織内に新規作成する場合は `Read repository contents and packages permissions` となってほしかったです。

:::message alert
ちなみに、Organization の設定を `Read repository contents and packages permissions` に変えた場合、配下の既存リポジトリの設定は一律で `Read repository contents and packages permissions` と変わるので注意が必要です。
:::

デフォルト権限を絞ること自体はとても賛成です。元々の権限が大きすぎるとは思っていました。これを機に既存リポジトリの権限設定も見直していきたいですね。


## Audit log streaming to AWS S3 integration with AWS CloudTrail Lake | GitHub Changelog
https://github.blog/changelog/2023-01-31-audit-log-streaming-to-aws-s3-integration-with-aws-cloudtrail-lake/

GitHub の Audit log streaming 機能において、Amazon S3 から AWS CloudTrail Lake に取り込んで、クエリで分析できるようになりました。厳密に言うと、GitHub 側で対応されたというよりかは、[AWS CloudTrail Lake 側の変更](https://aws.amazon.com/jp/blogs/news/new-aws-cloudtrail-lake-supports-ingesting-activity-events-from-non-aws-sources/)により上記が実現できるようになりました。

AWS CloudTrail Lake は AWS CloudTrail[^cloudtrail] で集めた Audit Log を分析するためのサービスですが、最近、CloudTrail 以外のイベントを取り込めるようになりました。それによって S3 に溜めた GitHub の Audit log も分析できるようになったという話になります。

さっそくクラメソさんが記事にしてくれています。さすがすぎる。

- [CloudTrail Lake で AWS 以外のアクティビティイベントをデータストアへ取り込めるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/cloudtraillake-ingestion-activity-events-non-aws-sources/)

クラメソさんの場合、サンプルコードをそのまま使わず、手動でデータ送信をして検証しています[^ghec]。

サンプルコードは AWS が用意しており、Terraform モジュールまで用意してくれています。

- [aws-cloudtrail-lake-github-audit-log/terraform/terraform-aws-cloudtrail-lake-github-audit-log/README.md](https://github.com/aws-samples/aws-cloudtrail-lake-github-audit-log/blob/53093ff6c85222eecb07156eb78d62658a356100/terraform/terraform-aws-cloudtrail-lake-github-audit-log/README.md)

S3 に溜めたログを分析するには Athena なんかでがんばんないといけなくてめんどかったので、CloudTrail Lake で分析できるようになったのは嬉しいですね。皆さんちゃんと Audit Log はすぐに分析できるようにしておきましょう。

[^cloudtrail]: AWS の Audit log を収集する仕組み。
[^ghec]: 実際、GHEC の Audit log を試しに使うには強い権限が必要になるのでいきなり生の Audit log で試すのはむずいでしょうね。

## Terraform Cloud Adds Dynamic Provider Credentials for Vault and Official Cloud Providers
https://www.hashicorp.com/blog/terraform-cloud-adds-dynamic-provider-credentials-vault-official-cloud-providers

Terraform をクラウド上で実行する HashiCorp のサービス Terraform Cloud において、OIDC を使った Vault およびクラウドプロバイダーの認証が可能となりました(public beta)。その名も Dynamic Provider Credentials です。なお主要なクラウドベンダの公式 Terraform プロバイダに対応してるとのことです。

これにより、短命のシークレットを動的に生成できるようになるため、Terraform Cloud 上にクラウドプロバイダのシークレットを保存する必要がなくなり、万が一動的に生成したシークレットが漏れても被害を抑えられやすいです。

こちらもさっそくクラメソさんが記事にしています。すごいですね。

- [Terraform CloudがValutやAWS,Azure,Google Cloudに対してOIDCで動的なクレデンシャル生成に対応 | DevelopersIO](https://dev.classmethod.jp/articles/terraform-cloud-dynamic-provider-credentials/)

個人的にはとっくに対応しているものかと思っていたため、少し驚きました。Terraform Cloud ユーザはぜひ使っていきたいですね。

## Amazon VPC Announces General Availability of Resource Map in AWS Management Console
https://aws.amazon.com/jp/about-aws/whats-new/2023/02/amazon-vpc-resource-map-aws-management-console/

Amazon VPC において、VPC とその他サブネットや NAT ゲートウェイなどがどのように接続されているかを可視化したリソースマップ機能が追加されました。VPC の詳細画面からマップを開くことができます。

さっそくクラメソさんが記事にしてくれていました。リソースマップの例も載せてくれており、それぞれのリソースがどのように接続されているかが載っていてわかりやすいです。

- [VPC内のサブネットやルートテーブルなどのリソースを可視化するリソースマップが追加されました | DevelopersIO](https://dev.classmethod.jp/articles/vpc-resource-map/)

また、線がたくさんつながっててどれがどれにつながってるかパッと見わかんないのですが、リソースにカーソルを持っていくと、そのリソースとつながっているリソース、線が光るのでどうつながっているかがわかるようになっています。

複雑なネットワークを構築している場合、とにかくどことどこが接続されているかの把握が難しいです。AWS 公式でどのネットワーク関連リソースがつながっているかがわかりやすくなるのはとても嬉しいですね。

## docker/build-push-action@v3.3.0 で `provenance=true` となる破壊的変更について
:::message
この節で出てくる SBOM、SLSA Provenance の仕組みについては正直理解しきれていません。間違った内容を伝えていたらすみません。
:::

https://www.docker.com/blog/generate-sboms-with-buildkit/

[Buildkit v0.11](https://github.com/moby/buildkit/releases/tag/v0.11.0) からコンテナイメージのビルド時に SBOM、SLSA Provenance を生成、追加できるようになりました。それぞれソフトウェアの構成を証明するものになります。

この SLSA Provenance が GitHub Actions の [docker/build-push-action@v3.3.0](https://github.com/docker/build-push-action/releases/tag/v3.3.0) アクションにおいてデフォルト有効化されました。

しかし、少なくとも Google Cloud Run、AWS Lambda は SLSA Provenance に対応していないようで、ビルドが成功するけど実際に壊れるなどの現象が起き、さまざまな悲鳴が上がっていました（[参考](https://github.com/docker/buildx/issues/1533)）。
その結果、多数の悲鳴が Issue に上がっていました（下に上げる例以外にも色々上がっているが、たくさんあって把握しきれていない）。

- [Docker push creates multiple images on GCR, some with creation timestamp equal to 0 epoch · Issue #771 · docker/build-push-action](https://github.com/docker/build-push-action/issues/771)
- [Breaking change included in subversion release · Issue #778 · docker/build-push-action](https://github.com/docker/build-push-action/issues/778)
- [Fail to push image to registry after 2023.01.21 · Issue #780 · docker/build-push-action](https://github.com/docker/build-push-action/issues/780)
- [Cloud RunがImage not foundと言ったときの原因事例集 - Kengo's blog](https://blog.kengo-toda.jp/entry/2023/01/21/204504)
- [docker/build-push-action@v3 + GCP のデプロイエラーを何とかした覚書](https://zenn.dev/monicle/articles/docker-build-push-action-incident)

おそらく Docker 社管理のアクションだし、マイナー・パッチアップデートで破壊的変更は入らないだろうということで `docker/build-push-action@v3` という風にタグを指定している人が多かったでしょう。その結果、マイナーアップデートに `provenance=true` が入り悲鳴があがったのだと思われます。

その後、パッチアップデートで[v3.3.1](https://github.com/docker/build-push-action/releases/tag/v3.3.1)にデフォルト値を `provenance=false` とする変更が入りました。

- [Disable provenance by default if not set by crazy-max · Pull Request #781 · docker/build-push-action](https://github.com/docker/build-push-action/pull/781)

これにより、`docker/build-push-action@v3` を使っている限り同じ現象は起きなくなると思われます。

しかし、[v4.0.0](https://github.com/docker/build-push-action/releases/tag/v4.0.0) がすでにリリースされており、こちらは[上記プルリクエストの一部を Revert](https://github.com/docker/build-push-action/pull/784) し、再度 `provenance=true` がデフォルトになっています。
したがって、安易に v4 が来ているから v4 を使うと痛い目を見るかもしれません。Renovate などで自動更新するようにしている場合も気をつけましょう。

正直なところ、なんでマイナーアップデートに破壊的変更を入れたのだろうという気持ちです。メジャーアップデートにした方が良かったと思います。少なくとも著名レジストリが対応できているかの確認をしておくべきだと思いました。
アクションを利用する際はタグの指定にも気をつけないといけないですね。少なくとも Docker 社のアクションは安易にメジャーバージョンを指定しないようにしようと思いました。

# know-how 🎓

## GitHub Actions関連機能とGHESリリースノートの対応表（随時更新予定）
https://zenn.dev/kesin11/articles/gha_releasenote_ghes

GitHub.com における GitHub Actions の新機能リリースが GitHub Enterprise Server(GHES) のどのバージョンで利用できるかをまとめた対応表記事です。

GitHub Actions はスパスパ新機能をリリースしています。しかし、クラウド版 GitHub こと GitHub.com とオンプレ版 GitHub こと GHES には機能が使えるタイミングに差があります。したがって、GHES の管理者やユーザは新機能がもう使えるのか、いつから使えるようになったのかを都度調べなければいけないことがあります。

この記事の対応表では、次の項目を Changelog ごとに行としています。

- Changelog の概要
- GitHub.com におけるリリース日
- ドキュメント
- 対応した GHES のバージョン

これを見るとそれぞれの機能がどこまで使えるか、どのバージョンで使えるのかが一目瞭然です。

ただ、当たり前ながらこれは著者の Kesin11 さんによる手動更新であるので、常に最新の情報で更新されているとは限りません。
もしも反映されていない更新が見つかったら、コメントを飛ばしてみてもいいかもしれませんね。

GHES 利用ユーザとしてとても助かる表です。更新もとても大変だと思います。
モチベが続く限りは無理のない範囲でがんばってほしいですね。

# tool 🔨

## update-github-actions-permissions v2をリリース: 500種類のGitHub Actionsのpermissionsに対応 | Web Scratch
https://efcl.info/2023/02/01/update-github-actions-permissions-v2/

GitHub Actions のワークフローファイルを解析して `permissions` を追加する update-github-actions-permissions というツールの v2 がリリースされました。

GitHub Actions のワークフローはある程度細かく権限を設定できますが、どのアクションがどの権限を必要としているかを把握するのは大変です。面倒だからまとめて `write-all` にしている方も少なくないのではないでしょうか[^write-all]？

このツールを使うことで、著名アクションが必要とする `permissions` を自動で追加してくれます。とても便利ですね。今回 v2 となり、対応アクションが約 50 種類から 500 種類以上に増えたようです。

記事には、使い方やどうやって対応アクションの `permissions` を取得しているかの話が書かれています。

[上記](#github-actions---updating-the-default-github_token-permissions-to-read-only--github-changelog)にも書いたとおり、これからは `read-only` がデフォルトとなるため、細かく権限を設定する機運が高まっていると思います。必要最低限の権限にすることはとても大事ですが大変なので、このツールを使って効率よくセキュアにしていきたいですね。

[^write-all]: 実際最近までデフォルト `write-all` だったので、ほとんどの人は大して設定してないでしょう。知らんけど。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Git archive checksums may change | GitHub Changelog](https://github.blog/changelog/2023-01-30-git-archive-checksums-may-change/)
    - GitHub の Git アーカイブ（`Source code (zip)` とかでダウンロードできるやつ）の checksum を変更したらいろいろあって切り戻された件。
    - [Bazel のビルドが Git アーカイブの checksum に依存してて盛り上がってたっぽい](https://github.com/bazel-contrib/SIG-rules-authors/issues/11)です
    - GitHub の言い分もわからなくはないですが、先にこういう問題が起こることは想定できてなかったのかなーとも考えてしまいます
      - せめて先に予告しておけば未然に防げたのでは？という感じ
  - [Roadmap in Projects (public beta) | GitHub Changelog](https://github.blog/changelog/2023-01-31-roadmap-in-projects-public-beta/)
    - GitHub Projects において、Roadmap 機能がパブリックベータとなりました
    - ロードマップは Table と Board に続くビューの 1 つで、開始日、終了日を設定した Issue を時系列的に見ることができます
    - プロジェクト管理、タスク管理が GitHub 上で完結する未来も近いかもしれません
- **know-how 🎓**
  - [1Passwordを使って、ローカルにファイル(~/.configや.env)として置かれてる生のパスワードなどを削除した | Web Scratch](https://efcl.info/2023/01/31/remove-secret-from-local/)
    - 1Password から動的にシークレットを取得することで、生のパスワードをファイルで持たないようにするという話です
    - やっぱり平文でシークレットを置いておきたくないので、真似したいですね
  - [どのように1Passwordへのログイン方法を管理しているか](https://zenn.dev/st1t/articles/2f584ccc62754a)
    - 1Password 自体へのログインをどのようにするかという話です
    - 1Password にシークレットを保管して安心していても、保管庫の認証が突破されてしまうと元も子もありません
    - この記事では YubiKey をうまく使って頑丈にマスターパスワードを管理していたり、そもそも何で 1Password がいいのかが書いてあったり、1Password 使いには参考になると思います
  - [Linuxコンテナの「次」としてのWebAssembly、の解説](https://zenn.dev/koduki/articles/9f86d03cd703c4)
    - Wasm がサーバサイドのランタイムとして注目されてきている雰囲気です。そこら辺をまとめてくれている記事です
    - 「Wasm？ブラウザで C++かなんかのバイナリ実行できるんでしょ？」くらいの知識の人（僕です）には刺さりそうだと思いました
    - Weekly 参加者によるコメント：「文中のネイティブバイナリに匹敵する速度で実行されますみたいなあたりには色んな人が色んな意見を持っているイメージがあります。」
- **tool 🔨**
  - [Mailosaurでメール送信のE2Eテスト - febc技術メモ](https://febc-yamamoto.hatenablog.jp/entry/2023/02/07/204947)
    - メール送信を E2E テストするのに役立つクラウドサービス
    - SDK もちゃんと用意されています
    - メールに関する機能を提供しているサービスなんかにはとても良さそうですね

# あとがき
遅くなりましたが今週号です。2023-02-01 は会自体が休みだったので、今週号は単独号です。

プライベートでは最近 Twitter API が有料化するとかしないとかでてんやわんやしてます。

https://twitter.com/Shitimi_613/status/1621038298939674627

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
