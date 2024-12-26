---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-12-11)
emoji: 🐩
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
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
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

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

## GitHub Copilot is now available on your GitHub dashboard in public preview - GitHub Changelog
https://github.blog/changelog/2024-12-05-github-copilot-is-now-available-on-your-github-dashboard-in-public-preview/

GitHub Copilot in github.com において、GitHub のダッシュボードから GitHub Copilot Chat に全画面で尋ねることができるようになりました。

僕はまだ GitHub Copilot in github.com が使えてないので正直今までの GitHub 上での Copilot Chat とどれだけ体験が違うのかよくわかりませんが、でかい画面で Copilot とお話しできるのは良いですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Pull request merge method rule – Public Preview - GitHub Changelog
https://github.blog/changelog/2024-12-04-pull-request-merge-method-rule-public-preview/

GitHub の rulesets において、プルリクエストのマージ方式（merge commit、squash、rebase）を制限できるようになりました。
これまでもリポジトリ全体の設定としてマージ方式は制限できましたが、rulesets による制限ができるようになったことで、例えばデフォルトブランチに対するプルリクエストのみ squash を強制するなど、より柔軟にマージ方式を強制できるようになりました。

大規模なリポジトリだと一部ブランチでのみマージ方式を制限したいなどの要望があるかもしれません。使っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Enterprise repository properties, policies and rulesets – Public Preview - GitHub Changelog
https://github.blog/changelog/2024-12-04-enterprise-repository-properties-policies-and-rulesets-public-preview/

GitHub において、enterprise レベルのカスタムプロパティ、enterprise レベルのリポジトリポリシー、rulesets を使えるようになりました（public preview）。

### Enterprise custom properties 
これまでは org レベルで custom properties を設定できましたが、enterprise レベルはなかったため、enterprise 全体で利用する custom properties を使いたい場合は org ごとに同じ custom properties の設定が必要でした。

### Enterprise rulesets


### Enterprise repository policy

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Copilot Chat now has a 64k context window with OpenAI GPT-4o - GitHub Changelog
https://github.blog/changelog/2024-12-06-copilot-chat-now-has-a-64k-context-window-with-openai-gpt-4o/

GitHub Copilot Chat の GPT-4o において 64k トークンまでコンテキストを扱えるようになりました。これにより、より大きい、多くのファイルの情報を元に回答を引き出せるようになります。

また、64k じゃ足りないという人は VSCode Insiders を使うとさらに大きい 128k トークンを扱えるようです。すでに Insiders Build で 128k 扱えるのであれば、近いうちにさらに扱えるコンテキスト数が増えそうですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_


# know-how 🎓

## GuardDuty Malware Protection for S3 本番導入の手引き - Nealle Developer's Blog
https://nealle-dev.hatenablog.com/entry/2024/12/09/01

## Google CloudからGitHub PATと秘密鍵をなくす – Token ServerのGoogle Cloudへの拡張 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20241203-token-server-google-cloud/

## UbieにおけるLLMを活用した不具合分析とテスト戦略立案プロセス
https://zenn.dev/ubie_dev/articles/6b73f18420861f

## スタディサプリの開発運用を支える GitHub Actions - スタディサプリ Product Team Blog 
https://blog.studysapuri.jp/entry/2024/12/10/070000

## バックエンドもフロントエンドもインフラも Terraform でつくってみた
https://zenn.dev/terraform_jp/articles/tftftf-introduction

# tool 🔨

## GitHub Skyline CLI extension now available - GitHub Changelog
https://github.blog/changelog/2024-12-09-github-skyline-cli-extension/

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [AWS、生成AIがVMware環境をAWS環境へ自動変換してくれる「Q Developer for VMware workloads」発表 － Publickey](https://www.publickey1.jp/blog/24/awsaivmwareawsq_developer_for_vmware_workloads.html)
  - [Herokuが次世代プラットフォーム「Fir」発表。OCIコンテナ、Kubernetes、OpenTelemetryなど業界標準の組み合わせで構築](https://www.publickey1.jp/blog/24/herokufirocikubernetesopentelemetry.html)
  - [AppleがFirefox向けのiCloudパスワード自動入力拡張機能を買収しFirefox向けに「iCloud Passwords」をリリース](https://gigazine.net/news/20241209-apple-buy-passwords-autofill-extension-firefox/#google_vignette)
- **know-how 🎓**
  - [#isucon チーム「ウー馬場ーイーツ・ザ・ファイナル」でISUCON14本選に参加し21位になりました](https://netmark.jp/2024/12/2024-12-09-20-51.html)
  - [趣味開発Webアプリケーションのほぼ0円インフラ構成](https://qiita.com/mazrean/items/f4a48d43b2d680a92216)
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
