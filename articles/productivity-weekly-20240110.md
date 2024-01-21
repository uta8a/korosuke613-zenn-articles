---
title: "<ここにタイトルを入力>|Productivity Weekly (2024-01-10号)"
emoji: "🚅"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20240110"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-10 単独号です。

今回が第 138 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## GitHub Copilot Chat now generally available for organizations and individuals - The GitHub Blog
https://github.blog/2023-12-29-github-copilot-chat-now-generally-available-for-organizations-and-individuals/

## GitHub Certifications are generally available - The GitHub Blog
https://github.blog/2024-01-08-github-certifications-are-generally-available/

GitHub が認定資格を提供するようになったようです。現時点では次の 4 つの資格が提供されています。

- GitHub Foundations Certification[^gh_foundations]
- GitHub Actions Certification[^gh_actions]
- GitHub Advanced Security Certification[^gh_security]
- GitHub Administration Certification[^gh_admin]

[学習ガイド](https://github.com/LadyKerr/github-certification-guide)や[トレーニング](https://learn.microsoft.com/ja-jp/collections/n5p4a5z7keznp5?WT.mc_id=%3Fwt.mc_id%3Dstudentamb_260352)が提供されています。

試しに GitHub Actions のトレーニングを眺めてみたところ、基本的なワークフローの書き方から始まり、カスタムアクションの作り方、アプリケーションの Azure へのデプロイ、Self Hosted Runner の設定など、かなり実践的な内容が含まれていました。

試験を受けないとしても、トレーニングを受けるだけでも知識が身につきそうです。公式トレーニングがあるとキャッチアップやオンボーディングに役立ちそうでいいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

[^gh_foundations]: 平木場注: GitHub、git 全般の基礎知識
[^gh_actions]: 平木場注: GitHub Actions の基礎知識
[^gh_security]: 平木場注: GitHub Advanced Security の基礎知識
[^gh_admin]: 平木場注: GitHub の管理者としての基礎知識

# know-how 🎓

## メルコインにおけるGitHub Actions活用術 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20231223-mercoin-github-actions/

メルコインさんの GitHub Actions で利用している Action やリリースフローに関する自動化の紹介記事です。

Auto Correct というワークフローを用意して format、lint、コード生成を CI で実行しているとのことです。
GitHub App のトークンを用いたコミット署名や、`concurrency` を利用して無駄な CI の実行を防いでいたりと、作り込まれているなと感じました。
この記事で、Action のバージョンをハッシュで固定化する [pinact](https://github.com/suzuki-shunsuke/pinact) という Action を知りましたが、地味に便利な Action ですね。
様々な CLI ツールを aqua でインストールしているので、lazy install が効いていそうで、aqua の良さが活きていそうです。

GitHub Actions での自動化を検討している方は参考になると思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## CircleCI の費用が突如 1.5 倍になった話 | Wantedly Engineer Blog
https://www.wantedly.com/companies/wantedly/post_articles/879561

CircleCI の費用が増加した原因調査とその対応について書かれた記事です。

原因としては、Renovate の rebase だったそうです。これに対して、開発生産性は落とさずに費用を抑える際の考えが述べられていました。
CI ワークフローをチューニングすることでもさらに費用を抑えられるかもしれないが、費用対効果を考えるとそこまでの労力をかけるのは難しいということで、ある程度の費用は受け入れるという判断もされていて、なるほどなと思いました。

CircleCI API からユーザーの pipeline の実行履歴を集計して分析されている点や、時には費用をかけても開発生産性を上げることも大事だという点が印象的でした。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## DenoとFreshでペアプロ・モブプロ用タイマー『timer.team』を開発して得た知見⏰
https://zenn.dev/lef237/articles/8e4eb3112928d6

## JavaScriptの組み込みAPIのIntlが凄いので紹介してみた。
https://zenn.dev/ame_x/articles/e314ce3a84ad1f

## GitHub Actionsのサードパーティーマネージドランナーの紹介 - いけだや技術ノート
https://ikesyo.hatenablog.com/entry/github-actions-managed-runners

GitHub Actions でジョブを実行するためのランナーは、GitHub が管理してくれるものとユーザーが自身で管理するセルフホストランナーの 2 種類が存在するのですが、第 3 の選択肢として GitHub 以外がホスティングしているセルフホストランナーを紹介している記事です。

紹介されているほとんどのサービスでは GitHub がホスティングしているランナーより価格と性能に優れていることをアピールしており、X86 に加えて ARM のランナーを提供しているサービスもあるようです[^arm_runner]。また、サービスによってはキャッシュの高速化に力を入れていたり、SSH デバッグ可能だったりと単に GitHub のランナーよりコスパに優れているだけではないことも紹介されています。

[^arm_runner]: 記事中でも紹介されていますが、[GitHubもARMのランナーを提供する予定を公開しています](https://github.blog/changelog/2023-10-30-accelerate-your-ci-cd-with-arm-based-hosted-runners-in-github-actions/)（現在は private beta）


個人的に一番興味深かったのは最後に紹介されている Cirrus Runners でした。近年の CI サービスではビルドに使用した時間に応じた従量課金が一般的となるなか、Apple Silicon の mac が$150/month の固定料金で利用できるというのはかなりの格安だと思います。

実は自分は Cirrus という会社自体は以前から知っており[Cirrus CI](https://cirrus-ci.org/)という GitHub Actions とは異なる独自の CI サービスの運用元で、そこで利用されている基盤技術である macOS の VM を動かす[tart](https://github.com/cirruslabs/tart/)をかつては OSS[^tart_license]として公開していた企業として覚えていました。その Cirrus が GitHub Actions 用のランナーも提供しているので、記事中で ikesyo さんが述べられているように他サービスよりも技術的な優位性がありそうだと自分も思いました。

[^tart_license]: 以前は AGPL-3.0 として公開されていましたが、[2023/03/01のpull-req](https://github.com/cirruslabs/tart/pull/415)以降は Fair Source ライセンスに変更されています。

GitHub も M1 のランナーを既に public beta で提供し始めておりサイボウズでも既にいくつかのチームが利用し始めていますが、やはりお値段はそこそこするという印象です。今後 CI の費用が問題となってきた場合に自前でセルフホストランナーを運用する以外の選択肢として今回紹介されているサービスは覚えておきたいと思いました。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# tool 🔨

## mise (旧 rtx) で脱 node-build (asdf)
https://zenn.dev/teppeis/articles/2024-01-introduce-mise

複数のツールのバージョン管理ツール [mise](https://mise.jdx.dev/) が盛り上がっていますね！この記事では主に node を利用する視点から asdf と比較をしています。

メリットとして以下が挙げられています。

- 動作が速い
  - 実際に手元で `mise install node@20` のように実行してみたところ、1.5 秒で完了しました。(asdf でも同様のコマンドを実行してみたところ 4.5 秒ほど)
  - 正確な計測はできていませんが、ちょっと使った感じでは確かに動作が軽快だと感じます。
- node の最新バージョンの反映が早い
  - asdf は [nodenv/node-build](https://github.com/nodenv/node-build) を内部で利用していたが、 mise は https://mise-versions.jdx.dev/node のように自前で配信しているため
- asdf のような shim 方式ではなく mise は PATH 方式なので shim 周りで詰まることがない

デメリットとして古い node(v14 以前)を入れる際の x64 バイナリが入れづらい、などが挙げられていますが、通常使う分には mise で問題になることはあまりなさそうです。ぜひ一度試してみましょう。

個人では volta を使っていたので volta とも比較してみたいです。また、バージョン管理ツールの仕組みも初めて知ったので、他の言語のバージョン管理ツールの仕組みも気になりました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 大規模コードベース向けASTツールのast-grepについて
https://zenn.dev/makotot/articles/ea823805582e5c

AST を用いて検索・置換を高速に行えるツール ast-grep の公式ドキュメントに沿って理解を深めている記事です。

grep と名前がついていますが、実際には想像される grep の単純な使い方よりも多機能で、検索や置換、Lint や Codemod に利用できます。
(Codemod: 大規模コードのリファクタリングに用いられる、コードを AST や構造体レベルまで変換した後に別のコードに変換する手法)

対象言語について、個人的には TypeScript や Rust のように、すでに高機能な Linter がある言語ではユースケースがないのでは？と思ったのですが、試してみると検索や置換が気軽に行える点で高機能 Linter より有用なケースがありそうです。

また、高速に動作するとあったので大規模なコードベースで ast-grep を試しに使ってみました。対象は rust-lang/rust の `compiler/` ディレクトリ以下、調べた時のコミットハッシュは 3071aefdb2821439e2e6f592f41a4d28e40c1e79 です。

`compiler/` ディレクトリ以下にはコードが 532058 行あります。
次のクエリを投げて、rust のコンパイラで let-else 構文が使われている箇所を検索しました。

```rust
let Some($$$) = $$$ else {
    $$$
};
```

実行してみるとたくさんマッチします(出力は省略)

```text
$ time ast-grep --pattern 'let Some($$$) = $$$ else {
    $$$
};' --lang rs compiler

...
compiler/rustc_span/src/lib.rs
2441│        let Some((file, line_lo, col_lo, line_hi, col_hi)) = ctx.span_data_to_lines_and_cols(&span)
2442│        else {
2443│            Hash::hash(&TAG_INVALID_SPAN, hasher);
2444│            return;
2445│        };
...

ast-grep --pattern 'let Some($$$) = $$$ else {     $$$ };' --lang rs compiler  3.42s user 0.18s system 528% cpu 0.680 total
```

今回のケースに関しては $10^5$ オーダの行数に対して 1 秒オーダで動作することが確かめられました。

参考として、単純に grep をかけた様子は次のとおりです。text ベースの方が早いのはそうなんですが、個人的には AST 変換を通しても思ったより高速だなと感じました。

```text
Program : grep -R 'let Some' compiler
CPU     : 27%
user    : 0.044s
system  : 0.053s
total   : 0.354s
```

大規模コードベースで検索や置換に困った際には ast-grep による AST ベースのアプローチも試してみてはいかがでしょうか。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 最近気に入っているOSSを淡々と紹介する
https://zenn.dev/noplan_inc/articles/3a623b2eb6d42d

気に入っている OSS をツール・フレームワーク問わず紹介していく記事です。僕はこの中では sheldon, lima(Rancher Desktop のバックエンドとして使用), ghq, fzf を利用していたので、この機会に star していないものはお世話になっていますという気持ちを込めて star しておきました。ghq も fzf もいいぞ。

使っていないものだと aicommits が気になりました。軽く見た感じ OpenAI の API Key を用いているようです。GitHub Copilot に去年搭載された [Commit message generation using Copilot in VS Code](https://github.blog/changelog/2023-11-30-github-copilot-november-30th-update/#commit-message-generation-using-copilot-in-vs-code) 機能と比較してみたいですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

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
