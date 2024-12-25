---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-12-18)
emoji:
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241218
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
今週は 2024-12-18 単独号です。

今回が第 172 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
- [@uta8a](https://zenn.dev/uta8a)
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

:::

# news 📺

## Find and fix Actions workflows vulnerabilities with CodeQL (Public Preview) - GitHub Changelog
https://github.blog/changelog/2024-12-17-find-and-fix-actions-workflows-vulnerabilities-with-codeql-public-preview/

## GitHub Issues & Projects – Close issue as a duplicate, REST API for sub-issues, and more! - GitHub Changelog
https://github.blog/changelog/2024-12-12-github-issues-projects-close-issue-as-a-duplicate-rest-api-for-sub-issues-and-more/

## Copilot Autofix can now be generated with the REST API (Public Preview) - GitHub Changelog
https://github.blog/changelog/2024-12-17-copilot-autofix-can-now-be-generated-with-the-rest-api-public-preview/

## Bun's new text-based lockfile | Bun Blog
https://bun.sh/blog/bun-lock-text-lockfile

## Go Protobuf: The new Opaque API - The Go Programming Language
https://go.dev/blog/protobuf-opaque

## Google、Web IDE上で自然言語を適切なコマンドラインに変換して実行できる「Interactive Chat」プレビュー公開。Project IDXの新機能として － Publickey
https://www.publickey1.jp/blog/24/googleweb_ideinteractive_chatproject_idx.html

# know-how 🎓

## STORESのAWSルートユーザーを全部削除しました - STORES Product Blog 
https://product.st.inc/entry/2024/12/16/090000

## LINEのアプリ開発を支えるコードオーナー管理
https://techblog.lycorp.co.jp/ja/20241217a

## myshoesとCycloud-hosted runner 2024年総まとめ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/52815/

## NilAway による静的解析で「10 億ドル」を節約する #kyotogo / Kyoto Go 56th - Speaker Deck
https://speakerdeck.com/ytaka23/kyoto-go-56th

## GitHub Actionsのガードを高くする - Techouse Developers Blog
https://developers.techouse.com/entry/high-robustness-github-actions

## 自作キーボードのキーマップ最適化のためにキー入力分析基盤を作ってみた（前編）
https://zenn.dev/tacoms/articles/7c35fdb78ee16e

分割キーボード Keyball44 のキーマップを、実際の打鍵データに基づいて可視化するためにデータ収集・分析・可視化の基盤を作ったそうです。
これは前半として、PC でローカルに動作するキーロガーの実装を紹介されています。
キー入力を ELK スタック(Elasticsearch, Logstash, Kibana)でリアルタイムに Kibana に反映されるようにしていて、ヒートマップのような図が面白いです。バックスペース、エンター、母音が多いのは納得ですね。
DuckDB を使ったらどうなるだろうかとか、キーロガーをキーボード側に実装できないだろうかとか、色々興味が湧きました。僕も自分の持っている分割キーボードでできないか調べてみます。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# tool 🔨

## ワークフローの完了をローカルに通知する GitHub CLI 拡張機能を作りました
https://zenn.dev/kmtym1998/articles/202412160900

## テストの sharding を効率化する Tenbin というツールを作った
https://zenn.dev/cybozu_frontend/articles/create-tenbin

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
