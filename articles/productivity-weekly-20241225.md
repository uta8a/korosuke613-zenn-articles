---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-12-25)
emoji: 🩻
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241225
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-12-25 単独号です。

今回が第 173 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821)
- [@takamin55](https://zenn.dev/takamin55)

:::

# news 📺

## Copilot Chat on GitHub is now generally available for all users - GitHub Changelog
https://github.blog/changelog/2024-12-18-copilot-chat-on-github-is-now-generally-available-for-all-users/

Copilot Chat in github.com が一般提供開始(GA)になりました。

ブラウザ上で [github.com/copilot](https://github.com/copilot) という URL から Copilot とチャットを開始できたり、Issue, Pull Request, コードの画面で Copilot ボタンを押すことで要約や解説をしてもらうことができるようです。

できることの一覧は [Currently available skills](https://docs.github.com/en/copilot/using-github-copilot/asking-github-copilot-questions-in-github#currently-available-skills) にまとまっています。Release や discussion の要約は役立ちそうですね。

また、GA に伴い index できるリポジトリの数の制限が解除されたようです。多くのリポジトリを扱う場合であっても、Copilot は制限なくそれらのリポジトリを読んで回答を返してくれます。

注意点として、Copilot Chat in github.com は GA になりましたが、opt in できる機能には Preview のものが含まれます。(具体的には preview features のテキスト補完と、workflow が失敗した理由を説明してくれる機能の 2 つ)
また、Pull Request の要約は GA ですが、Pull Request を Copilot と協力して作る機能は Copilot Workspace が関連するので Preview です。
Copilot は GA と Preview で規約が異なっていたりするので、組織で有効化する際にはどの機能を有効化すべきか注意してください。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Announcing GitHub Copilot Free - GitHub Changelog
https://github.blog/changelog/2024-12-18-announcing-github-copilot-free/

Announcing GitHub Copilot Free - GitHub Changelog
https://github.blog/changelog/2024-12-18-announcing-github-copilot-free/

GitHub Copilot に無料プランがやってきました。
無料プランでは、月あたり 2000 回の補完と 50 件のチャットが使えます。
また、複数ファイルを同時に編集する[Copilot Edits](https://code.visualstudio.com/docs/copilot/copilot-edits)や、Copilot Extensions も利用できます。

月あたり 2000 回の補完の制限がどれくらいのものなのかが気になりますが、
気軽に無料で GitHub Copilot を試せるのは嬉しいですね。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## OpenAI’s latest o1 model now available in GitHub Copilot and GitHub Models - The GitHub Blog
https://github.blog/news-insights/openais-o1-model-available-in-copilot-chat-and-github-models/

OpenAI’s latest o1 model now available in GitHub Copilot and GitHub Models - The GitHub Blog
https://github.blog/news-insights/openais-o1-model-available-in-copilot-chat-and-github-models/ 

GitHub Copilot で、OpenAI の最新モデル o1 が使えるようになりました。
ただし、Copilot Business と Copilot Enterprise では、管理者が o1 モデルへのアクセスを有効化する必要があります。

まだ手元では試せていませんが、コーディングを含む複雑なタスクがぐっと得意になったと噂の o1 モデルを使ったコード補完の品質がどれほどなのか気になります。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## REST API insights for organizations is now generally available - GitHub Changelog
https://github.blog/changelog/2024-12-20-rest-api-insights-for-organizations-is-now-generally-available/

GitHub.com の REST API Insights 機能が Enterprise Cloud プランで利用可能になりました。この機能は組織（Organization）で利用でき、デフォルトでは組織のオーナー権限が必要です。ただし、View Organization API insights 権限をカスタムロールに割り当て、その後メンバーやチームに割り当てることで、オーナー以外にもアクセス権を付与できます。

API アクセスが時間軸、アプリ、API エンドポイントごとに可視化されます。例えば「API レートリミットにかかったのでは？」と疑いがある際に、API Insights で素早く確認できるのは嬉しいですね。

ある組織における私の過去 7 日間のアクセスは、Visual Studio Code が 120、GitHub CLI が 5 でした。同じ組織でのトップアクセスはセルフホステッドランナーで 123.7k でした。

_本項の執筆者: [@naotama](https://zenn.dev/naotama)_

## Release v6.0.0 · philips-labs/terraform-aws-github-runner
https://github.com/philips-labs/terraform-aws-github-runner/releases/tag/v6.0.0

# know-how 🎓

## マルチプロダクト開発の現場でAWS Security Hubを1年以上運用して得た教訓やあれこれ - ANDPAD Tech Blog
https://tech.andpad.co.jp/entry/2024/12/19/100000

## CI/CD基盤のコスト削減とDocker Hubのレートリミットを回避するためのミラーサーバーを導入した話
https://swet.dena.com/entry/2024/12/19/120000

GitHub Actions セルフホストランナーを AWS 上で運用しているチームが、Docker ミラーサーバーを立てることで大幅なコスト削減を実現した記事です。
計算上だと週あたり 1600 GB の通信量の削減を実現したと記事では紹介されていました。月ではなく週ですので驚きの削減量ですね。

勝手ながら計算させていただいたのですが、NAT Gateway は 1GB あたり 0.062 USD の料金がかかるため、0.062 × 1600 × 4 = 毎月約 400 USD の節約になっています。記事中では 1vCPU 2GB の Fargate 5 台程度でパフォーマンスが出せると検証されていますので、十分にお釣りが来ています。

ミラーサーバーを導入するにあたって考慮するべき観点や、技術選定、パフォーマンス検証、取得メトリクスなどの詳細情報が紹介されているため、AWS 上で大規模な CI 環境を提供している場合はとても参考になりそうです。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## 2024年のDenoのまとめと今後について
https://zenn.dev/uki00a/articles/whats-new-for-deno-in-2024

## 質の高いブログを素早く書く | Wantedly Engineer Blog
https://www.wantedly.com/companies/wantedly/post_articles/945876

業務で技術ブログを書く方も多いのではないでしょうか。この記事では技術ブログの質を担保しながら素早く書く方法が紹介されています。

内容の 1 つに、ブログを書く前に発散と収束のプロセスを設けるという方法がありました。いわゆるブレインストーミングですね。構成は考えるものの、記事の要素をブレインストーミングすることは今までなかったため勉強になりました。

なお、この Productivity Weekly でも執筆の生産性を高める取り組みとして、GitHub を使った共同編集、リンターを使った校正の自動化、AI によるレビュー機能などを活用しています。

# tool 🔨

## HTTP Lambdaをルーティングする lamux - fujiwara-ware 2024 day 24
https://zenn.dev/fujiwara/articles/fujiwara-ware-2024-lamux

HTTP リクエストを適した Lambda 関数にルーティング（リバースプロキシ）するライブラリの紹介記事です。Lambda 関数にはエイリアス（e.g. `foo`, `bar`）がつけられるので、例えば `foo.example.com` というエンドポイントにリクエストが来ると、`foo` というエイリアスがつけられた Lambda 関数にルーティングされるといった仕組みになっています。ユースケースとしては、ブランチごとにプレビュー環境を作る場合が紹介されています。このユースケースで lamux を使う場合のアーキテクチャ図を、紹介記事からいかに引用します:

![lamux でブランチごとにプレビュー環境を作る場合のアーキテクチャ図](https://res.cloudinary.com/zenn/image/fetch/s--pT1xUOi9--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_1200/https://storage.googleapis.com/zenn-user-upload/deployed-images/02102443c6480fed1be96698.png%3Fsha%3D1bc89bb3af136f4a0807ff63a7ac26dd62957b71)

面白いアイディアだなと感じました。個人的にプレビュー環境がちょっと盛り上がって来ているので、参考になりそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## tfmv - Terraform のリソース名のリファクタリング
https://zenn.dev/shunsuke_suzuki/articles/tfmv-terraform-resource-renaming

Terraform のリソース名を一括して置換し、加えて `moved` ブロックを作ってくれるツールの紹介記事です。
親の顔より見た 🐧
単純な文字列の置換なら `sed` で十分ですが、`tfmv` は `moved` ブロックも作ってくれる点が嬉しそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

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
