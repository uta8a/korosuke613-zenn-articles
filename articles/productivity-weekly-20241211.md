---
title: Actionsの破壊的変更予告やGitHubのガバナンス強化など｜Productivity Weekly(2024-12-11)
emoji: 🐩
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241211
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
published_at: 2024-12-30 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-12-11 号です。

今回が第 171 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
:::

# news 📺

## Notice of upcoming releases and breaking changes for GitHub Actions - GitHub Changelog
https://github.blog/changelog/2024-12-05-notice-of-upcoming-releases-and-breaking-changes-for-github-actions/

GitHub Actions において、今後の breaking changes がまとまって発表されています。

- `ubuntu-latest` ランナーが Ubuntu 22 から Ubuntu 24 へ
  - 2024/12/05〜2025/01/17 の間に徐々に変わっていく予定
- `ubuntu-20.04` ランナーが廃止（2025/04/01 予定）
- `actions/upload-artifact`、`actions/download-artifact` の v3 のブラウンアウト[^brownout]開始
  - 2025/01/09 17:00-18:00 (UTC)
  - 2025/01/16 15:00-19:00 (UTC)
  - 2025/01/23 14:00-22:00 (UTC)
- `actions/cache` v1、v2 および actions/toolkit の cache npm パッケージ v4.0.0 以前が廃止（2025/02/01 から徐々に）
- セルフホストランナーおよび Azure private network 内ランナーにおけるネットワーク許可リストの更新
  - [Immutable Actions](https://github.com/github/roadmap/issues/592) GA に向けた変更
  - Immutable Actions は GitHub Container Registry に保存されるため、`pkg.actions.githubusercontent.com` へのトラフィック許可が必要
    - 将来的には `ghcr.io` へのトラフィック許可も必要になってくる
  - GitHub Enterprise Server で github.com からカスタムアクションを取るようにしている場合はこちらでも許可が必要
  - Azure private network についても許可 IP リストが更新

めちゃくちゃまとめて来ましたね。どの項目も先に大丈夫そうか確認しておきたいですね。Immutable Actions、早く GA になってほしいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^brownout]: サービス廃止に向けて、あらかじめ決められたスケジュールにそのサービスの利用を不可とすることで、利用者にサービスの移行を促す手法

## Enterprise repository properties, policies and rulesets – Public Preview - GitHub Changelog
https://github.blog/changelog/2024-12-04-enterprise-repository-properties-policies-and-rulesets-public-preview/

GitHub において、enterprise レベルのカスタムプロパティ、enterprise レベルのリポジトリポリシー、rulesets を使えるようになりました（public preview）。

### Enterprise custom properties 
これまでは org レベルで custom properties を設定できましたが、enterprise レベルはなかったため、enterprise 全体で利用する custom properties を使いたい場合は org ごとに同じ custom properties の設定が必要でした。

プロパティ設定が容易になりますね。

### Enterprise rulesets
こちらも org レベルでの rulesets しかなかったため、enterprise 全体で利用する rulesets を使いたい場合は org ごとに同じ rulesets の設定が必要でした。
そういった設定の使い回しを容易にするというメリットもありますが、先ほどの custom properties と違い、enterprise の権限で各 org に特定の rulesets を強制できる機能でもあります。
custom properties と組み合わせ、production に関わるリポジトリは org 問わずタグの push やマージ前の特定のチェックを強制するなどのガバナンスを強める使い方が浮かびますね。

### Enterprise repository policy
repository policy ですが、この機能はおそらく全く新しい機能です。リポジトリの操作に関する統制を強化できる機能で、次の項目を各 org に強制出来ます。

- 可視性の制限
  - public、internal、private を複数選択可能
- 作成の制限
- 削除の制限
- 移譲（transfer）の制限
- リポジトリ名の制限
  - 正規表現で指定

制限項目と同時に許可するロールや App、Team を指定できます。例えば特定のチームのみリポジトリ削除を許可することも可能です。
使いこなすのはむずそうですが、上手く使うと高い自由と高いガバナンスの両立もできそうで面白いです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Copilot is now available on your GitHub dashboard in public preview - GitHub Changelog
https://github.blog/changelog/2024-12-05-github-copilot-is-now-available-on-your-github-dashboard-in-public-preview/

GitHub Copilot in github.com において、GitHub のダッシュボード画面上で GitHub Copilot Chat に尋ねることができるようになりました。

僕はまだ GitHub Copilot in github.com が使えてないので正直今までの GitHub 上での Copilot Chat とどれだけ体験が違うのかよくわかりませんが、すぐに Copilot とお話しできるのは良いですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Pull request merge method rule – Public Preview - GitHub Changelog
https://github.blog/changelog/2024-12-04-pull-request-merge-method-rule-public-preview/

GitHub の rulesets において、プルリクエストのマージ方式（merge commit、squash、rebase）を制限できるようになりました。
これまでもリポジトリ全体の設定としてマージ方式は制限できましたが、rulesets による制限ができるようになったことで、例えばデフォルトブランチに対するプルリクエストのみ squash を強制するなど、より柔軟にマージ方式を強制できるようになりました。

大規模なリポジトリだと一部ブランチでのみマージ方式を制限したいなどの要望があるかもしれません。使っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Copilot Chat now has a 64k context window with OpenAI GPT-4o - GitHub Changelog
https://github.blog/changelog/2024-12-06-copilot-chat-now-has-a-64k-context-window-with-openai-gpt-4o/

GitHub Copilot Chat の GPT-4o において 64k トークンまでコンテキストを扱えるようになりました。これにより、より大きい、多くのファイルの情報を元に回答を引き出せるようになります。

また、64k じゃ足りないという人は VSCode Insiders を使うとさらに大きい 128k トークンを扱えるようです。すでに Insiders Build で 128k 扱えるのであれば、近いうちにさらに扱えるコンテキスト数が増えそうですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_


# know-how 🎓

## GuardDuty Malware Protection for S3 本番導入の手引き - Nealle Developer's Blog
https://nealle-dev.hatenablog.com/entry/2024/12/09/01
ニーリーさんによる GuardDuty Malware Protection for S3 の導入記事です。
検出されたオブジェクトのアクセス制御の自動化ができる話やアラートをどのように受け取るか、検知時の対応などの話が書かれています。
（個人的には導入対象バケットの選定についての基準をもっと詳しく知りたかったです）

GuardDuty Malware Protection for S3 が気になっている人は参考になりそうですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# tool 🔨

## GitHub Skyline CLI extension now available - GitHub Changelog
https://github.blog/changelog/2024-12-09-github-skyline-cli-extension/

GitHub CLI 拡張機能に GitHub Skyline が登場しました。GitHub Skyline は GitHub のコミット数を可視化するツールです。CUI 形式で年ごとに表示したり、stl ファイルを吐き出して 3D で楽しんだり 3D プリントしたりもできるようです。

僕も試してみました。みんなもあそぼう！
https://x.com/Shitimi_613/status/1866726009644711952

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [AWS、生成AIがVMware環境をAWS環境へ自動変換してくれる「Q Developer for VMware workloads」発表 － Publickey](https://www.publickey1.jp/blog/24/awsaivmwareawsq_developer_for_vmware_workloads.html)
    - AWS が生成 AI を使って VMware 環境を AWS 環境へ自動変換するサービスを発表しました
    - VMWare から移行したい人は嬉しいかもですね
    - 生成 AI が必要だったのかは正直わかりません。移行の仕組みを組むのも大変なんでしょう
  - [Herokuが次世代プラットフォーム「Fir」発表。OCIコンテナ、Kubernetes、OpenTelemetryなど業界標準の組み合わせで構築](https://www.publickey1.jp/blog/24/herokufirocikubernetesopentelemetry.html)
    - Heroku が次世代プラットフォームを謳う「Fir」を発表しました
    - OCI コンテナや k8s、OpenTelemetry などクラウドネイティブな技術を採用した基盤なようです
- **know-how 🎓**
  - [Google CloudからGitHub PATと秘密鍵をなくす – Token ServerのGoogle Cloudへの拡張 | メルカリエンジニアリング](https://engineering.mercari.com/blog/entry/20241203-token-server-google-cloud/)
    - メルカリさんによる短命な GitHub トークンを払い出すトークンサーバを Google Cloud でも使えるようにした話です
    - GitHub App を利用しているようで、rate limit 対策をどうやっているんだろうと思いましたが、installation access token の発行回数を抑えるなどの工夫をしているようです
  - [バックエンドもフロントエンドもインフラも Terraform でつくってみた](https://zenn.dev/terraform_jp/articles/tftftf-introduction)
    - 前回紹介した [JS.tf](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241204#%E3%80%90javascript-%C3%97-terraform%E3%80%91%E6%AC%A1%E4%B8%96%E4%BB%A3%E3%81%AE%E3%83%A2%E3%83%80%E3%83%B3-altjs%E3%80%8Cjs.tf%E3%80%8D%E3%81%AE%E7%B4%B9%E4%BB%8B) ですが、バックエンド、フロントエンド、インフラを全て Terraform で構築する話です
    - 実用性は置いておいて、ロマンあふれてて面白いです。HTML.tf なんてのもあるのか...

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
いやはや、年の瀬ですね。これも実家で寝ながら書いてます。
今年の Productivity Weekly は残すところ 2024-12-18 号、2024-12-25 号の 2 回です。多分明日明後日に投稿すると思います。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
