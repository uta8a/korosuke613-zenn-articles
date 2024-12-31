---
title: CodeQLの対象にActions追加、bun.lock登場など｜Productivity Weekly(2024-12-18)
emoji: 🕋
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
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
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
published_at: 2025-01-01 10:00
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
- [@defaultcf](https://zenn.dev/defaultcf)
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821) **← NEW!!**
- [@takamin55](https://zenn.dev/takamin55) **← NEW!!**

！？
なんと、新たに二人の共同著者がやってきました。やばいっすね。
:::

# news 📺

## Find and fix Actions workflows vulnerabilities with CodeQL (Public Preview) - GitHub Changelog
https://github.blog/changelog/2024-12-17-find-and-fix-actions-workflows-vulnerabilities-with-codeql-public-preview/

GitHub Code scanning の CodeQL において、GitHub Actions のワークフローがサポートされました（public preview）。

CodeQL はコードを走査して脆弱性につながる記述を教えてくれる静的解析ツールです。これまで JS/TS や Go などがサポートされていましたが、今回 GitHub Actions のワークフローもサポートされました。

利用するには各リポジトリの CodeQL 設定で `GitHub Actions` を有効化する必要があります。CodeQL をすでに有効化している場合でも改めて設定が必要です。たくさんリポジトリを持っていると面倒ですね。

試しに自分のホームページを管理しているリポジトリで有効化してみました。怒られすぎ。

![](/images/productivity-weekly-20241218/code-scanning.png)
*一覧画面*

![](/images/productivity-weekly-20241218/code-scanning-details.png)
*詳細の一つ*

permission をしっかり設定しろとか、non-immutable なアクションの指定はやめろとか当たり前だけど大事なことを言っていますね。（permission に関してはリポジトリのデフォルトを read にしているから設定していなかった。google-github-action はめんどくてやれていなかった...）

みなさんも有効化してみてはいかがでしょうか。もちろん private/internal リポジトリにおいては GitHub Advanced Security が必要で有料です。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Issues & Projects – Close issue as a duplicate, REST API for sub-issues, and more! - GitHub Changelog
https://github.blog/changelog/2024-12-12-github-issues-projects-close-issue-as-a-duplicate-rest-api-for-sub-issues-and-more/

GitHub Issues、Projects において、Issue を重複（duplicate）扱いにしてクローズできるようになりました。これまで重複であることを明示的に示したい場合は label を付与するなどのユーザー側の工夫が必要でした。
これにより、なぜクローズされたかがますます分かりやすくなりましたね。

なお、上記記事では他のアップデートも書かれています。
- Sub Issue に関する REST API が利用可能に
- Sub Issue と Issue Type の制限値が緩和
  - Parent Issue ごとに最大 100 件の Sub Issue を付与可能に（+50 件）
  - Organization 内で利用できる Issue Type が最大 25 件に（+15 件）
- GitHub Mobile で Issue Type の表示、追加、更新が可能に
- Sub Issue と Issue Type のフィルタリングに `has:` と `no:` が使えるように
- その他もろもろ

GitHub の Issue 管理がますます柔軟にできるようになってきましたね。活用していきたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Bun's new text-based lockfile | Bun Blog
https://bun.sh/blog/bun-lock-text-lockfile

Bun のロックファイルをテキスト形式で扱えるようになりました 🎉

可愛いキャラクターでお馴染みの JavaScript ランタイムである Bun ですが、`bun install` コマンドを使ってインストールしたパッケージの情報を記載した `bun.lockb` ファイルはバイナリ形式で書かれており、プルリクエストのレビューがしづらい問題や、コンフリクト発生時に解決しにくい問題など、いくつか可愛くない問題を抱えていました。

しかし今回新たに `--save-text-lockfile` オプションが登場し、このオプションを使うことでロックファイルを bun.lock というテキスト形式のファイルで表現することが可能になりました！

こちらが実際の中身の様子です。json 形式で書かれているので、`package-lock.json` を扱っていた人にとっては今までに近い見た目で嬉しいですね。

```json
{
  "lockfileVersion": 0,
  "workspaces": {
    "": {
      "dependencies": {
        "uWebSocket.js": "uNetworking/uWebSockets.js#v20.51.0",
      },
    },
  },
  "packages": {
    "uWebSocket.js": ["uWebSockets.js@github:uNetworking/uWebSockets.js#6609a88", {}, "uNetworking-uWebSockets.js-6609a88"],
  }
}
```

`bun install --save-text-lockfile` コマンドは `bun.lockb` や `package-lock.json` がある場合はそちらに書かれた内容をもとにテキストファイルを生成してくれます。npm や yarn などの他のパッケージマネージャーからの移行もスムーズになりそうです。

この機能は 2024 年 12 月 17 日にリリースされた Bun v.1.1.39 から使用でき、Bun v1.2 からはテキストファイルでのロックファイル管理をデフォルトにすることを計画しているようです。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## Go Protobuf: The new Opaque API - The Go Programming Language
https://go.dev/blog/protobuf-opaque

Go の Protocol Buffers 実装である [google.golang.org/protobuf](https://pkg.go.dev/google.golang.org/protobuf)で、従来よりも効率的なコード生成を行うための新しい API が導入されました。

従来の実装では、Protocol Buffers 上の message に対応する Go の構造体が生成され、プログラマはその構造体のフィールドを直接自由に操作できました。
新しい Opaque API では、構造体の各フィールドはエクスポートされず、代わりに `GetFoo()` や `SetHoo()` などのアクセサメソッドを介してのみアクセスできます。
Opaque API では構造体の詳細が隠蔽されるため、bit field や遅延読み込みなどの最適化が可能になります。
また、アクセサメソッドを介することで、誤った使い方を防ぐ狙いもあるようです。

従来の API は引き続き利用可能で、移行の必要はありませんが、新規開発では Opaque API を利用することが推奨されています。
従来の API と Opaque API の間を取り持つ Hybrid API も提供されており、これを用いた[移行ツールと移行ガイド](https://protobuf.dev/reference/go/opaque-migration/)も公開されています。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

# know-how 🎓

## STORESのAWSルートユーザーを全部削除しました - STORES Product Blog 
https://product.st.inc/entry/2024/12/16/090000

2024 年 11 月に登場した Root access management を使うことで、AWS ルートユーザーしかできなかった操作の一部が他のユーザーでできるようになりました。この記事では、AWS Organizations 下の AWS ルートユーザー全てを削除（正確にはルートユーザーの認証情報を削除）したこと、およびそこまでの意思決定の様子が書かれています。

これによりセキュリティ向上と、ルートユーザーの認証情報の管理の煩雑さからの解放というメリットが得られたとのことです。

ただし、Security Hub で警告が出るようになってしまうとのこと。ルートユーザーには MFA が設定されているべきですが、今回の認証情報を削除したことでこのルールに抵触してしまうそうです。これは AWS 側の対応が待たれますね。

https://docs.aws.amazon.com/securityhub/latest/userguide/iam-controls.html#iam-6

認証情報削除などの具体的な手順については記事に書かれていません。DeveloperIO さんの記事が詳しいので、そちらをご覧になると良いかもしれません。

- [待望！管理アカウントでメンバーアカウントのルートユーザ操作禁止などが設定できるRoot access managementがリリースされました！ | DevelopersIO](https://dev.classmethod.jp/articles/root-access-management/)

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## NilAway による静的解析で「10 億ドル」を節約する #kyotogo / Kyoto Go 56th - Speaker Deck
https://speakerdeck.com/ytaka23/kyoto-go-56th

Go プログラムに `nil` が存在しないか検査する静的解析ツール NilAway の紹介スライドです。
[以前に Productivity Weekly でも紹介した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241030#go%E3%81%AEnil-panic%E3%82%92%E9%98%B2%E3%81%90%E9%9D%99%E7%9A%84%E8%A7%A3%E6%9E%90%E3%83%84%E3%83%BC%E3%83%AB%EF%BC%9Anilaway) NilAway 再来です。

実は社内の LT 会で似た内容を喋ろうと考えていたので、先を越された……！という気持ちです。10 億ドルのくだりも同じで草。アルゴリズムの詳細でも喋ろうかな……。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## GitHub Actionsのガードを高くする - Techouse Developers Blog
https://developers.techouse.com/entry/high-robustness-github-actions

Techouse さんによる GitHub Actions のセキュリティリスクを減らすガード策の紹介記事です。

GitHub Actions は便利で自由度が高い反面、さまざまなセキュリティリスクが存在します。この記事では、セキュリティリスクごとのリスクを軽減できるツールと、それらを用いてワークフローを監査するワークフロー例が紹介されています。

取り上げられているセキュリティリスクは次の 3 つです。

- 使用している action が汚染されないか
- GITHUB_TOKEN の権限が広く設定されていないか
- シェルスクリプトの実装ミスがないか

それぞれなぜリスクたり得るのかと対策ツールの何が嬉しいのかが説明されており、GitHub Actions のセキュリティを高めたい場合に参考になると思います。また、対抗策を適用できるすぐに使えるワークフローも MIT ライセンスで用意されているので、どのように実践すれば良いのかすぐにわかることも嬉しいですね。

皆さんも GitHub Actions のセキュリティ意識を高めて安心安全な開発ライフを送っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

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

ワークフローの完了をローカルで音と通知で知らせてくれる Mac 向けの GitHub CLI 拡張機能を作ったそうです。
実際に動かしてみました。

![gh-prowl-waiting](/images/productivity-weekly-20241218/gh-prowl-waiting.png)
*gh prowl コマンドを打って待っている間の画面*

![gh-prowl-done](/images/productivity-weekly-20241218/gh-prowl-done.png)
*check が success になった時の画面*

ワークフローが完了すると「ピロリン」と音が鳴ります。CI 終わらないかな〜と Pull Request の画面を見に行くのをやめられそうでいいですね。
記事の内容としては実装についても触れられていたのが良かったです。CLI から音を出す方法や Mac での通知の出し方など参考になりそうです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## テストの sharding を効率化する Tenbin というツールを作った
https://zenn.dev/cybozu_frontend/articles/create-tenbin

ここで言う Sharding とは、ある単位（e.g. 実行時間）でテストを均等に分割することです。分割されたテストを並列に実行して、テストにかかる時間を短縮することが目的です。紹介記事では、この Sharding を従来手法よりいい感じにできる実装と、それを Jest/Vitest/Playwright に組み込む方法が紹介されています。（「いい感じにできる実装」という部分をより詳しく話すと、Sharding から帰着できる数分割問題という計算問題の近似解を求めるアルゴリズムを実装したよ、という感じです。）

Sharding をちゃんと解こうとするのはあんまり見かけないのでいいね！！！！という気持ちです。ちゃんとした姿勢で近似解を求めるならその精度も気になるところですが、今回実装されている手法は、最適値の $\frac{4}{3}-frac{1}{3m}$ 倍以下なのでいい感じです（$m$ は分割する個数）（c.f. [数分割問題 | opt100](https://scmopt.github.io/opt100/76npp.html#%E8%A4%87%E6%95%B0%E8%A3%85%E7%BD%AE%E3%82%B9%E3%82%B1%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E5%95%8F%E9%A1%8C)）。計算量も $\mathcal{O}(n \log n)$（$n$ は分割前の個数）です。

Greedy に解くより大抵全然いい結果が得られるので、どんどん取り入られてほしい（取り入れていきたい）ですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Copilot Autofix can now be generated with the REST API (Public Preview) - GitHub Changelog](https://github.blog/changelog/2024-12-17-copilot-autofix-can-now-be-generated-with-the-rest-api-public-preview/)
    - Copilot Autofix が REST API 経由で生成を要求できるようになりました
    - 使い道としてはアラートができたら速攻で autofix させる...とか？
  - [Google、Web IDE上で自然言語を適切なコマンドラインに変換して実行できる「Interactive Chat」プレビュー公開。Project IDXの新機能として － Publickey](https://www.publickey1.jp/blog/24/googleweb_ideinteractive_chatproject_idx.html)
    - Google が開発している IDE、Project IDX に「Interactive Chat」機能が追加されました
    - 自然言語の指示を元にコマンドラインのコマンドを生成して実行できるようです

# あとがき
年の瀬ですね。紅白を見ながらこのあとがきを書いています。あと一個今年の分も残ってるので、それまで出してから年を越したい。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
