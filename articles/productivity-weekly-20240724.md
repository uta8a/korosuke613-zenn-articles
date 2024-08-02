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
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
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

## 開発生産性を上げる"改善"は儲かるのか？──その問いに答えられるようにするには
https://codezine.jp/article/detail/19739

## Four Keys(デリバリー能力)とアウトカムはどちらも大事！！両方高めて最高の開発組織にしよう！！｜ham
https://note.com/hamchance/n/ne4f35886150a

## tfcmtのいい感じのテンプレート
https://zenn.dev/bm_sms/articles/b1e4778f5b40e9

# tool 🔨

## Terramateを使えばIaCは豊かになれるのか?
https://zenn.dev/yuta28/articles/terramate-empower-iac

## GrizzlyとGrafonnetで始めるGrafana Dashboards as Code - ださろぐ@はてな
https://dasalog.hatenablog.jp/entry/2024/07/16/100252

## GitHub Actions Cache Server
https://gha-cache-server.falcondev.io/


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
