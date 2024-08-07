---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-07-24)
emoji: 🍮
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240724
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
今週は 2024-07-24 単独号です。

今回が第 160 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Google、オープンソースのメンテナの負担をAIなどで軽減する「Project Oscar」を発表 － Publickey
https://www.publickey1.jp/blog/24/googleaiproject_oscar.html

## Security overview dashboards, secret scanning metrics and enablement trends reports are now generally available - The GitHub Blog
https://github.blog/changelog/2024-07-19-security-overview-dashboards-secret-scanning-metrics-and-enablement-trends-reports-are-now-generally-available/

## Cloud Run でデフォルト URL を無効化する機能が Preview
https://cloud.google.com/run/docs/securing/ingress?hl=en#disable-url

## Google Docs、Markdown形式でのドキュメントのエクスポート、インポートなど可能に － Publickey
https://www.publickey1.jp/blog/24/google_docsmarkdow.html

## On October 22, 2024, Monitoring Query Language (MQL) will no longer be a recommended query language for Cloud Monitoring.
https://cloud.google.com/stackdriver/docs/deprecations/mql

# know-how 🎓

## 自分が管理する全 OSS の Issue や Pull Request を 1 つの GitHub Project に集約
https://zenn.dev/shunsuke_suzuki/articles/add-github-issue-pr-to-project

複数 Owner、リポジトリまたがる OSS の Issue や Pull Request を単一の GitHub Projects に集約する方法を紹介した記事です。筆者の suzuki-shunsuke さんは多くの OSS を開発・メンテしており、それぞれの Issue や PR を巡回してハンドリングするのが困難であったため、単一の GitHub Project に集約して管理することにしたようです。

記事では、GitHub Project に Issue、PR を自動追加する方法、この手法を実現するための認証方法、item 数上限回避のためのワークアラウンド、実際の GitHub Actions ワークフロー例などが載っています。

また、自動追加をするための OSS、suzuki-shunsuke/ghproj を新たに作り、公開されています。Issue、PR を取得する GraphQL API を叩くためのクエリを詳細に設定でき、簡単にこの手法を実現できそうで良いですね。

自動追加する方法、認証方法に関して、複数の方法とそのメリデメを書いてくれているのがとても参考になりました。「この認証方法でもいけるのでは？」と思って試したくなるので、先に書いてくれているのは嬉しいですね。

> GitHub Project には 異なる GitHub Organizations や User の Issue や PR を追加できないと思いこんでいましたが、実は出来るということに気づきました。

これ知りませんでした。Projects 便利ですね。

僕は別にそんなに外向けの OSS を作っていませんが、自分で使うための OSS はいくつか持っているので、ghproj を使って集約を試してみたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS 上で大規模な GitHub Actions のセルフホステッドランナーを使用する際のベストプラクティス | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/best-practices-working-with-self-hosted-github-action-runners-at-scale-on-aws/

AWS 上での大規模な GitHub Actions セルフホストランナー使用のベストプラクティスが AWS ブログで紹介されています。
AWS 上で構築している前提となっていますが、大まかな考え方は他の方法にも通じるものがあると思います。

ベストプラクティスとして次の 8 つが紹介されています。気になった方はぜひ記事を読んでください。

- セキュリティにおける責任を理解する
- 認証情報は一時的なものを利用する
- ephemeral ランナー（使い捨て）を使用する
- セキュリティ要件に基づいてランナーグループでランナーを分離する
- Amazon EC2 インスタンスをプールしてランナーの起動時間を最適化する
- 最適化された AMI を使用してランナーの起動時間を最適化する
- スポットインスタンスを利用してコストを最適化する
- Amazon CloudWatch を使用してランナーのメトリクスを記録、監視する

個人的には確かにと思える部分がよくまとまっていて良かったです。僕たち生産性向上チームでも AWS 上で大規模なセルフホストランナー環境を構築している[^kotiku]のですが、割とこのプラクティスを実践できているな[^philips]という話になりました（隙自語）。


[^kotiku]: [philips-labs/terraform-aws-github-runner による GitHub Actions セルフホストランナーの大規模運用 | ドクセル](https://www.docswell.com/s/miyajan/ZW1XJX-large-scale-github-actions-self-hosted-runner-by-philips-terraform-module)

[^philips]: というのも、どうやら僕たちがベースとして使っている [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) を参考として記事に載せていたので、まあ実践できているってなるよなという感じ。

## 完全ペアプロは「やりすぎ」だった。失敗を経て辿り着いた、ペアプロ×開発組織の最適解【Tebiki渋谷】 - レバテックラボ（レバテックLAB）
https://levtech.jp/media/article/interview/detail_485/

Tebiki 社のペアプロ導入の経緯からその後の方針転換と、ペアプロ導入を成功させるためのポイントが紹介されている記事です。

レビュー作業に時間がかかっているという課題を解決するため、全てのコーディングをペアプロに切り替えてから１年間は順調に進んでいたようです。しかし、一部のメンバーからペアプロでの作業が合わないという声が上がってきたことで、現在ではペアプロか従来のソロプロか好きな方を自由に選ぶという方向に転換されたようです。

記事の後半ではペアプロ導入を成功させるための 4 つのポイントが紹介されているので、チーム開発においてペアプロ導入を考えている方は参考になると思います。

----

実は自分たち生産性向上チームでは基本的に毎日 13:30 - 17:00 の間はモブプロ[^mob_programming]で作業しているため、この記事は非常に共感できる内容でした。生産性向上チームのモブプロは数年前から続いており、その間にチームから離れたり、逆に中途や新卒入社で新しく加わる人など、メンバーは常に入れ替わってきました。現在では昔よりもメンバーが増えたことで、さすがに全員でのモブプロは効率が悪すぎるため最大でも 4 人のチームごとにモブプロを行うスタイルに変更されているものの、モブプロのスタイル自体は現在でも継続されています。

こちらの記事を読んだ後に自分たちのモブプロの方法を振り返ってみると、紹介されていた 4 つのポイントのうち特に「休憩のルールを作ること」と「開発中の意思決定をペアの中に閉じること」の 2 点をかなり意識したモブプロを行っていると気が付きました。
自分たちのモブプロは 25 分作業・5 分休憩のポモドーロテクニックをベースにしているので、休憩時間が自然と確保されています。また、5 分の休憩明けにモブ外のメンバーに相談するための時間を設けていることで、非同期の質問に対して回答を待つという無駄な時間が発生しにくいと感じています。

ペアプロ・モブプロが上手くいくかどうかはチームの体制やメンバーの状況にもよるので一概には言えませんが、自分たちのチームのモブプロがこの記事で紹介されているポイントと一致していることを確認できたのは興味深かったです。

[^mob_programming]: 2 人のペアプロに対して、3 人以上でプログラミングを行う場合は一般的にモブプロと呼ばれる

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Four Keys(デリバリー能力)とアウトカムはどちらも大事！！両方高めて最高の開発組織にしよう！！｜ham
https://note.com/hamchance/n/ne4f35886150a

開発生産性の文脈で何かと目にする Four Keys ですが、「Four Keys 良くすれば開発生産性が上がる」や「Four Keys なんかよりも大事なのはアウトカム」のように捉えられてしまうことがあります。
そのような誤解や対立構造と捉えられてしまうことに対して、本記事では Four Keys とアウトカムの関係性を説明し、どちらも大事であることを紹介しています。

> Four Keysは開発チームのデリバリー能力を示しており、結果指標である。と認識すると良いと思っています。Four Keysを上げると開発生産性が上がるのではなく、開発生産性が上がるとFour Keysが上がるのです。

こちらの表現はわかりやすいと思いました。指標のハックのような話題にも通じますが、指標の定義や成り立ち、アウトカムやその他指標との因果関係を理解して正しく活用することが重要だと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ShellScriptで自動化を楽にしたい時に知っておいても良いこと | sreake.com | 株式会社スリーシェイク
https://sreake.com/blog/shellscript-good-practices/

スリーシェイクさんによる ShellScript を使って自動化を行う際に、より効率よく、信頼性高く実行するためのベストプラクティス、パターンを紹介した記事です。

まずは自動化候補を出すための toil の判別方法からはじまり、その後に次のようなベストプラクティス、パターンが様々な観点から紹介されています。

- エラーハンドリング：失敗に備える
  - エラーで即時に停止
  - トラップを使用したクリーンアップ
  - 構造化ログの実装
  - 再実行可能なスクリプトを書く
- パフォーマンス最適化
  - ループの最適化
  - パイプラインを使用
- セキュリティの考慮事項
  - 入力のサニタイズ
  - 変数の適切な引用
  - 最小権限の原則
  - 一時ファイルの安全な作成
- クロスプラットフォームの考慮
  - 可搬性のある shebang
  - OS 依存の処理
- テストとデバッグ
  - ユニットテストの導入
  - デバッグモード
- バージョン管理との統合
  - Git フックの活用

ShellScript は僕もよく書くため、こういうまとめは嬉しいですね。エラーハンドリング系とセキュリティ系はちゃんとやることが多いですが、パフォーマンス最適化や構造化ログやユニットテストはあまり意識したことがなかったので勉強になりました。
実践していきたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## tfcmtのいい感じのテンプレート
https://zenn.dev/bm_sms/articles/b1e4778f5b40e9

Terraform 差分を見やすく加工してくれる tfcmt において、変更内容ごとに色付けしたり、折りたたみをするテンプレートを紹介しています。こういったカスタマイズはなかなか自分で調べるきっかけがないので、ありがたいです！！

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# tool 🔨

## Terramateを使えばIaCは豊かになれるのか?
https://zenn.dev/yuta28/articles/terramate-empower-iac

Terraform や OpenTofu といった IaC のオーケストレーションツールである Terramate の紹介記事です。マネージドサービスとしても提供されているそうですが、本記事では CLI 版の使い方が紹介されています。
Terraform で長く運用をしていると state ファイルが肥大化してしまい、変更の確認・適用に時間がかかることがあります。Terramate は git と連携してブランチ内での変更を検知し、必要な state のみを取得して適用することで、運用を効率化できるようです。この点が Terraform のラッパーである Terragrunt との違いとして挙げられており、その他の IaC ツールにも適用できるとのことです。詳しくは [Terramate のブログ](https://terramate.io/rethinking-iac/terramate-and-terragrunt/)を参照してみてください。

CI 上の Terraform の運用効率化に使えそうなので今後も要チェックです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GrizzlyとGrafonnetで始めるGrafana Dashboards as Code - ださろぐ@はてな
https://dasalog.hatenablog.jp/entry/2024/07/16/100252

Grafana ダッシュボードは JSON で定義されるため、コードで管理できますが、メタデータが多いためレビューが大変です。そこで、Grafana Dashboards as Code を実現するためのツールとして Grizzly と Grafonnet が紹介されています。
[Grizzly](https://github.com/grafana/grizzly) は Grafana ダッシュボードなどを管理する CLI ツールで、公式から提供されています。
serve コマンドを使うことでリモートのデータソースに対してローカルでダッシュボードが立ち上がり、試行錯誤しながらダッシュボードを作成したり、作成内容が手元のファイルに保存されます。
[Grafonnet](https://github.com/grafana/grafonnet) は Jsonnet のライブラリで、Grafana ダッシュボードを Jsonnet で記述するためのライブラリです。Kubernetes 関連で Jsonnet を使っている人には馴染みやすいかもしれません。

便利そうですが、情報が少ない上に開発途上なようです。個人的にはまだ JSON で頑張るかなという感じですが、興味がある方は試してみてはいかがでしょうか。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions Cache Server
https://gha-cache-server.falcondev.io/

GitHub Actions self hosted runner のキャッシュサーバーをセルフホストするツールです。ランナーのソースコードを読むと、キャッシュの保存先は外部から上書きできません。
そこで、ランナーのバイナリのうち、キャッシュの保存先を指定している箇所を sed で書き換えて無理やりキャッシュの保存先を変更するリバースエンジニアリングをしています。バックエンドにはメモリ、ディスク、S3 などの保存先を指定できるようになっています。

`actions/cache` を利用しているワークフロー自体に変更を加えることなく簡単に導入出来ますが、ご利用は自己責任でお願いします。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
