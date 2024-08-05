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
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
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

## AWS 上で大規模な GitHub Actions のセルフホステッドランナーを使用する際のベストプラクティス | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/best-practices-working-with-self-hosted-github-action-runners-at-scale-on-aws/

## ShellScriptで自動化を楽にしたい時に知っておいても良いこと | sreake.com | 株式会社スリーシェイク
https://sreake.com/blog/shellscript-good-practices/

## 完全ペアプロは「やりすぎ」だった。失敗を経て辿り着いた、ペアプロ×開発組織の最適解【Tebiki渋谷】 - レバテックラボ（レバテックLAB）
https://levtech.jp/media/article/interview/detail_485/

## Four Keys(デリバリー能力)とアウトカムはどちらも大事！！両方高めて最高の開発組織にしよう！！｜ham
https://note.com/hamchance/n/ne4f35886150a

開発生産性の文脈で何かと目にする Four Keys ですが、「Four Keys 良くすれば開発生産性が上がる」や「Four Keys なんかよりも大事なのはアウトカム」のように捉えられてしまうことがあります。
そのような誤解や対立構造と捉えられてしまうことに対して、本記事では Four Keys とアウトカムの関係性を説明し、どちらも大事であることを紹介しています。

> Four Keysは開発チームのデリバリー能力を示しており、結果指標である。と認識すると良いと思っています。Four Keysを上げると開発生産性が上がるのではなく、開発生産性が上がるとFour Keysが上がるのです。

こちらの表現はわかりやすいと思いました。指標のハックのような話題にも通じますが、指標の定義や成り立ち、アウトカムやその他指標との因果関係を理解して正しく活用することが重要だと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## tfcmtのいい感じのテンプレート
https://zenn.dev/bm_sms/articles/b1e4778f5b40e9

Terraform 差分を見やすく加工してくれる tfcmt において、変更内容ごとに色付けしたり、折りたたみをするテンプレートを紹介しています。こういったカスタマイズはなかなか自分で調べるきっかけがないので、ありがたいです！！

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# tool 🔨

## Terramateを使えばIaCは豊かになれるのか?
https://zenn.dev/yuta28/articles/terramate-empower-iac

Terraform や OpenTofu といった IaC のオーケストレーションツールである Terramate の紹介記事です。マネージドサービスとしても提供されているそうですが、本記事では CLI 版の使い方が紹介されています。
Terraform で長く運用をしていると state ファイルが肥大化してしまい、変更の確認・適用に時間がかかることがあります。Terramate は git と連携してブランチ内での変更を検知し、必要な state のみを取得して適用することで、運用を効率化できるようです。この点が Terraform のラッパーである Terragrunt との違いとして挙げられており、その他の IaC ツールにも適用でき所以とのことです。詳しくは [Terramate のブログ](https://terramate.io/rethinking-iac/terramate-and-terragrunt/)を参照してみてください。

CI 上の Terraform の運用効率化に使えそうなので今後も要チェックです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GrizzlyとGrafonnetで始めるGrafana Dashboards as Code - ださろぐ@はてな
https://dasalog.hatenablog.jp/entry/2024/07/16/100252

Grafana ダッシュボードは JSON で定義されるため、コードで管理できますが、メタデータが多いためレビューが大変です。そこで、Grafana Dashboards as Code を実現するためのツールとして Grizzly と Grafonnet が紹介されています。
[Grizzly](https://github.com/grafana/grizzly) は Grafana ダッシュボードなどを管理する CLI ツールで、公式から提供されています。
serve コマンドを使うことでリモートのデータソースに対してローカルでダッシュボードが立ち上がり、試行錯誤しながらダッシュボードを作成したら、作成内容が手元のファイルに保存されます。
[Grafonnet](https://github.com/grafana/grafonnet) は Jsonnet のライブラリで、Grafana ダッシュボードを Jsonnet で記述するためのライブラリです。Kubernetes 関連で Jsonnet を使っている人には馴染みやすいかもしれません。

便利そうですが、情報が少ない上に開発途上なようです。個人的にはまだ JSON で頑張るかなという感じですが、興味がある方は試してみてはいかがでしょうか。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions Cache Server
https://gha-cache-server.falcondev.io/

GitHub Actions self hosted runner のキャッシュサーバーをセルフホストするツールです。ランナーのソースコードを読むと、キャッシュの保存先は外部から上書き出来ません。
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
