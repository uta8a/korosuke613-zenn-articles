---
title: GitHub Universe 2024、API insightsなど｜Productivity Weekly(2024-10-30)
emoji: 👻
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241030
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
今週は 2024-10-30 単独号です。

今回が第 167 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## View an organization’s REST API activity with API insights in public preview - GitHub Changelog
https://github.blog/changelog/2024-10-29-view-an-organizations-rest-api-activity-with-api-insights-in-public-preview/

GitHub Enterprise Cloud において、organization owner は REST API アクティビティを視覚化したダッシュボード、API Insights を使用できるようになりました（public preview）。また、org で `View organization API insights` 権限を持つカスタムロールを作成することで、owner 以外のユーザーにもアクセス権限を与えることができます。

リクエスト数と primary rate limit に到達したリクエスト数を可視化して見ることができるほか、ユーザ・アプリ単位でどういった API を使用しているかがわかるようになっています。

organization が大きくなってくると、リクエストが rate limit で弾かれた時にどのユーザ・アプリが原因なのかを特定するのが難しいです。この機能があれば、rate limit の原因を分析しやすくなるので、大規模な organization は特に便利な機能だと思います。また、何らかの自動化をしたい際に、rate limit が心配になる場合でもどれだけ許容できるかを把握するのにも役立ちそうです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Universe 2024: GitHub Copilotのモデルの選択、アプリ構築ツールGitHub Spark、AIネイティブ開発者体験でソフトウェア開発者の選択肢を広げる - GitHubブログ
https://github.blog/jp/2024-10-30-press-releases-github-universe-2024/

はい。今年もやって参りました。GitHub Universe 2024 です。この記事は GitHub Universe 2024 の公式日本語まとめ記事です。とにかく AI 系の発表が多い回でした。
主に 10/29、30 に公開された Changelog を箇条書きでざっくりと紹介します。

- GitHub Copilot
  - マルチモデル対応（GPT-4o、o1-*、Gemini 1.5 Pro、Claude 3.5 Sonnet...）
    - [OpenAI o1 is now available in GitHub Copilot Chat in public preview - GitHub Changelog](https://github.blog/changelog/2024-10-29-openai-o1-is-now-available-in-github-copilot-chat-in-public-preview/)
  - VSCode での Copilot のカスタマイズ機能＆マルチファイル編集機能
    - [Multi-file editing, code review, custom instructions, and more for GitHub Copilot in VS Code October release (v0.22) - GitHub Changelog](https://github.blog/changelog/2024-10-29-multi-file-editing-code-review-custom-instructions-and-more-for-github-copilot-in-vs-code-october-release-v0-22/)
  - Xcode 対応
    - [GitHub Copilot code completion in Xcode is now available in public preview - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-copilot-code-completion-in-xcode-is-now-available-in-public-preview/)
  - Copilot によるプルリクエストのレビュー
    - [Refine and validate code review suggestions with Copilot Workspace (public preview) - GitHub Changelog](https://github.blog/changelog/2024-10-29-refine-and-validate-code-review-suggestions-with-copilot-workspace-public-preview/)
    - [GitHub Copilot code review in Visual Studio Code (public preview) - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-copilot-code-review-in-visual-studio-code-public-preview/)
    - [GitHub Copilot code review in GitHub.com (public preview) - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-copilot-code-review-in-github-com-public-preview/)
  - GitHub Mobile の Copilot Chat で Copilot Extension が利用可能に
    - [GitHub Copilot Extensions on GitHub Mobile now in public preview - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-copilot-extensions-on-github-mobile-and-jetbrains-now-in-public-preview/)
  - Copilot Autofix が ESLint のエラーを修正可能に
    - [Copilot Autofix now supports partner code scanning tools - GitHub Changelog](https://github.blog/changelog/2024-10-29-copilot-autofix-now-supports-partner-code-scanning-tools/)
  - Copilot Autofix on Dependabot が TypeScript で利用可能に。依存関係の更新による破壊的変更などへの対応を自動化
    - [Copilot Autofix for Dependabot が TypeScript リポジトリで利用可能に (プライベート プレビュー) - GitHub Changelog](https://github.blog/changelog/2024-10-29-copilot-autofix-for-dependabot-now-available-for-typescript-repositories-private-preview/)
  - Copilot Individual の Copilot Chat で Bing を使ったウェブ情報の参照が可能に
    - [Web search in GitHub Copilot Chat now available for Copilot Individual - GitHub Changelog](https://github.blog/changelog/2024-10-29-web-search-in-github-copilot-chat-now-available-for-copilot-individual/)
  - Windows Terminal で Copilot Chat が利用可能に
    - [GitHub Copilot is now available in Windows Terminal - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-copilot-is-now-available-in-windows-terminal/)
  - Copilot Metrics API が GA に。変更点あり
    - [GitHub Copilot Metrics API GA release now available - GitHub Changelog](https://github.blog/changelog/2024-10-30-github-copilot-metrics-api-ga-release-now-available/)
- GitHub Spark 登場、自然言語でアプリを構築してくれるツール
  - [GitHub Next | GitHub Spark](https://githubnext.com/projects/github-spark)
- GitHub Models がパブリックプレビューに
  - [GitHub Models is now available in public preview - GitHub Changelog](https://github.blog/changelog/2024-10-29-github-models-is-now-available-in-public-preview/)

いやー多すぎますね。ちょっと把握しきれてないです。
気になる人はリンク先を見てみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## 約9000個の自動テストの 時間を50分->10分に短縮 Flakyテストを1%以下に抑えた話 - Speaker Deck
https://speakerdeck.com/hatsu38/yue-9000ge-nozi-dong-tesutono-shi-jian-wo50fen-10fen-niduan-suo-flakytesutowo1-percent-yi-xia-niyi-etahua

GitHub Actions 上の自動テスト時間を 54 分から約 11 分に縮め、Flaky なテストを 30 個から 3 個に減らした事例の紹介スライドです。取り組まれた課題としては、テスト時間の長さやテスト前のビルド時間の長さ、Flaky なテストの多さの 3 つが挙げられており、それぞれの課題に対して主に次のアプローチを取っています:

- vs テスト時間の長さ
  - GUI テストにおいて、要素の出現をポーリングして sleep を削除
  - テストデータを使い回し
  - テストファイルのサイズがほぼ均等になるようテストファイルをグルーピングし、グループごとにテストを並列実行
- vs テスト前のビルド時間の長さ
  - キャッシュを使用
- vs Flaky なテストの多さ
  - [Allure Report](https://allurereport.org/) や Playwright を用いて Flaky さの原因調査を楽にし、地道に修正

時系列に沿って説明されているので、どのアプローチが効いているのかわかりやすいです。また、課題が明確に設定されているので、アプローチの納得感も高いです。改善がチョモランマ！
個人的には、Allure Report の存在や活用事例が知れたのを特に面白かったです。テストレポートを生成するツールとのことで、テストのタイムライン表示や Flaky さの自動判定など、テスト結果をグラフィカルに表示してくれます。グラフから得られる情報はたくさんあるので、ぜひ使ってみたいですね。

（めっちゃ余談ですが、並列実行時のテストファイルのグルーピングは [Subset Sum Problem](https://ja.wikipedia.org/wiki/%E9%83%A8%E5%88%86%E5%92%8C%E5%95%8F%E9%A1%8C) っぽいなと感じました。厳密に解こうとすると時間がかかりがちなので、今回は Greedy に近似解を求めているみたいです。）

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## GitHub を活用したソフトウェアサプライチェーン下流のセキュリティ強化 - GitHubブログ
https://github.blog/jp/2024-10-24-the-second-half-of-software-supply-chain-security-on-github/

GitHub による、GitHub のアーティファクト証明書を活用したサプライチェーンのセキュリティ強化に関するブログです。

昨今サプライチェーンのセキュリティが注目されている背景、ソフトウェアサプライチェーンの概要（SLSA）、GitHub を利用することでどうサプライチェーンセキュリティを向上させるかの簡単な説明が紹介されています。

GitHub の機能については、artifact attestations（GitHub Actions 上で作った artifacts に署名をする仕組み）を用いることで、SLSA ビルドトラックにおけるレベル 0 からレベル 2 への到達が可能になることを説明しています。
さらに、組織内の reusable workflow によるビルド手順の制御も実施することで、レベル 3 へ到達可能であることも書かれており、ドキュメントと共に紹介されています。

[Artifact Attestations 機能](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240626#artifact-attestations-is-generally-available---the-github-blog)は今年 GA となった新機能です。有意義な機能である反面、まだまだ広く活用されているようには主観ですが思えません。なぜあると嬉しいのかや活用事例を出してくれるのは個人的に嬉しいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## なんとなくから脱却する GitHub Actionsグッドプラクティス11選
https://gihyo.jp/article/2024/10/good-practices-for-github-actions

[書籍「GitHub CI/CD実践ガイド」](https://gihyo.jp/book/2024/978-4-297-14173-8)の著者による、GitHub Actions に関するグッドプラクティスの紹介記事です。この書籍のお試し版みたいな内容になっています。

「Concurrency で古いワークフローを自動キャンセルする」など、なるほどなーとなる知見がたくさんありました。GitHub Actions の応用は意外と知らないことが多そうだなと思い、つい僕も「GitHub CI/CD 実践ガイド」買っちゃいました。読み込んで開発生産性を爆上げしていくぞ！！

（めっちゃしょーもないですが、「グッドプラクティス」という単語が使われている点が好きです。ベストプラクティスと言った場合、より良いプラクティスが存在する可能性があると「ベストじゃないやん！」となるので。）

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# tool 🔨

## Goのnil panicを防ぐ静的解析ツール：nilaway
https://zenn.dev/sho_hata/articles/1a70781e5a0b95

Go プログラムに対するぬるぽ（にるぽ）の静的解析ツール NilAway の紹介記事です。標準で入っている [nilness](https://pkg.go.dev/golang.org/x/tools/go/analysis/passes/nilness) というツールでもぬるぽの静的解析が可能ですが、NilAway はそれより検出可能なぬるぽが多いとのことです。NilAway で検出可能なぬるぽを紹介記事から以下に引用します:

```go
type MyInterface interface {
	Method() int
}

func MyFunc() MyInterface {
	return nil
}

func main() {
	obj := MyFunc()
	result := obj.Method() // panic: runtime error: invalid memory address or nil pointer dereference
	fmt.Println(result)
}
```

紹介記事ではこの静的解析手法自体も説明されています。NilAway では、プログラムのフローをグラフとして表現し、`nil` となりうる点（e.g. 未初期化変数 `x` に対する `return x`）からポインタを dereference する点（e.g. `*x`）までのパスが存在していたらエラーとして報告するとのことです。検査手法の健全性と完全性は諦めていて、報告されるエラーは偽陽性・偽陰性があります。代わりに検査時間の短縮や全自動化を狙っているとのことです。

ツールの使い方に関する紹介に留まらず、その手法まで説明されている点がめちゃくちゃ嬉しいですね。こういう話は大好物です。
大好物なので[元ブログ](https://www.uber.com/en-JP/blog/nilaway-practical-nil-panic-detection-for-go/)も読んでみました。アルゴリズムの詳細は説明されていなかったのですが、プログラムの全てのフローをグラフとして表現すると計算量が爆発する問題に対しては、呼び出す関数（またはメソッド）はそのフローまで踏み込まずに `nil` の可能性があるかそうでないかの 2 値として扱っているのかなという雰囲気を感じています。（あんまり正確に理解できていない。）NilAway の前身 [NullAway](https://github.com/uber/NullAway) は[論文も公開されている](https://dl.acm.org/doi/abs/10.1145/3338906.3338919)ので、こちらから深掘りするとよいかもです。
健全性・完全性に関しては、以下に引用するようにぬるぽの静的解析は決定不能との噂がある[^extended-static-checking-for-java]ので、これらを満たすのは難しいのかもしれません。（ぬるぽの静的解析が決定不能と示す文献が見つけられなかったので、もしご存じの方がいらっしゃったら教えていただきたいです🙏）とはいえ、完全性はともかく、TypeScript の型システムのように健全性は満たさないけれども便利なツールはたくさんあると思うので、この領域にはその辺りの塩梅をエンジニアリングしていく面白さがありそうです。もっと探求していきたいですね。

> the well-known fact that the static detection of many errors of engineering importance (including array bounds errors, null dereferences, etc.) is undecidable.

[^extended-static-checking-for-java]: Flanagan, Cormac, et al. "Extended static checking for Java." ACM SIGPLAN 2002 Conference on Programming language design and implementation. 2002.

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
  - [githubnext/copilot-workspace-user-manual: 📖 The user manual for GitHub Copilot Workspace](https://github.com/githubnext/copilot-workspace-user-manual)
    - GitHub Copilot Workspace のユーザーマニュアルです。実はリポジトリで管理されています
    - 使い方がわかって良いのですが、特に嬉しいのは [Change log](https://github.com/githubnext/copilot-workspace-user-manual/blob/416c09f96b68d7fa2bc192d5b937449f118d87af/changes.md) のファイルです。いつどういう更新がされたのか事細かに書かれており、久々に触った際に変更点を追えやすいです
  - [Go with Bazel](https://zenn.dev/pddg/books/go-with-bazel)
    - Go と Bazel を使ってモノレポを構築する方法が書かれた Zenn Book です
    - Bazel の基本的な使い方から、コンテナ化やリリースなどの実践的内容までワンパッケージでまとまっており、Bazel 気になってるぜって方や、Bazel もっといい感じに使いたいぜって方にちょうど良さそうな入門書という感じです
    - 僕もちょっとずつ読み進めています。ハンズオン形式なのもいいですね
  - [Nx Agentsを導入してフロントエンドのCIを約40%高速化しました - Findy Tech Blog](https://tech.findy.co.jp/entry/2024/10/28/070000)
    - Findy さんによる、モノレポ管理ツール Nx のクラウドサービスである Nx Agents を使ってフロントエンドの CI を高速化した事例です
    - Nx Agents は新しいサービスなので、どういう感じかわかって良いです
    - また、Nx に限らない高速化のためのテクニックも書かれてて良いです
    - ちょっと気になったのが、18 分が 11 分になって 40% 削減ということで、もともとそこまで時間がかかってなさそうなので、キャッチアップにかかるコストや料金的コストの変化はどう考慮されたか気になりました
- **tool 🔨**
  - [lock 機構のための GitHub Action を作った](https://zenn.dev/shunsuke_suzuki/articles/github-lock-action)
    - suzuki-shunsuke さんの新作です。今回は GitHub Actions で lock 機構を実現するためのアクションを作成した話です
    - github の branch を使って lock を実現しており、そういう方法もあるのかと思いました（github が持っているアクションも同じような仕組みらしい）
    - だいぶ柔軟に lock/unlock ができそうです。ユースケースとしては一時的に terraform の何らかの作業中に terraform apply を禁止したい場合が紹介されていました
    - 最初は concurrency 機能ではダメなのかなと思ったのですが、おそらくワークフローの実行状態に関わらず手動で lock/unlock できるのが嬉しそうだと思いました。そう考えると何らかの作業中にデプロイワークフローは動かしたくないといった場合にも使えそうですね

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->
毎度毎度遅くなってしまいすみません。マジで昔より平木場の余裕がなくなっちゃいました。ハッピーハロウィン 🎃
<!-- textlint-enable ja-technical-writing/ja-no-successive-word -->

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

## Sansan VS サイボウズ - 品質向上 Tips 冬祭り - connpass
そういえば、またもや Sansan さんとサイボウズでバトルします（？）。今回は「品質向上 Tips 冬祭り」というテーマで LT 回＆座談会をやります。場所は Sansan さんのオフィスです。興味がある方はぜひご参加ください！

Sansan VS サイボウズ - 品質向上 Tips 冬祭り - connpass
https://sansan.connpass.com/event/335070/

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
