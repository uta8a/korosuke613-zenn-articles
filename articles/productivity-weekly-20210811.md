---
title: "Productivity Weekly (2021-08-11号)"
emoji: "🥷"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 38 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Release Support caching for mono repos and repositories with complex structure · actions/setup-node
https://github.com/actions/setup-node/releases/tag/v2.4.0
[先日 actions/setup-node アクションにキャッシュ機能が追加されました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210707#github-actions%3A-setup-node-now-supports-dependency-caching-%7C-github-changelog)。キャッシュの設定しなくてよくなるからめちゃ楽になるぞ。と思いましたが、ロックファイル（`package-lock.json`、`yarn.lock`）がリポジトリルートになければいけなかったため、モノレポでは使えませんでした（[参考](https://twitter.com/Shitimi_613/status/1411236295418863617?s=20)）。

が、v2.4.0 でモノレポをサポートする変更が入りました。`cache-dependency-path` にロックファイルがあるディレクトリのパスを設定することでリポジトリルート以外のロックファイルを参照できます。

また、以下のように書くことで複数ディレクトリのロックファイルのキャッシュを扱うことができます[^wild]（[参考](https://github.com/actions/setup-node/blob/25316bbc1f10ac9d8798711f44914b1cf3c4e954/docs/advanced-usage.md#caching-packages-dependencies)）。

```yaml: 複数ディレクトリを指定
- uses: actions/setup-node@v2
  with:
    node-version: '14'
    cache: 'npm'
    cache-dependency-path: |
      javascript/mswjs
      javascript/strykerjs
```

僕も実際に実行してみました。結果は[こちら](https://github.com/korosuke613/playground/pull/5/checks?check_run_id=3348612718)です。

モノレポ対応してますます使いやすくなりましたね。ワークフローの記述量が減って良いです。

[^wild]: `**/package-lock.json` のようにワイルドカードでの指定もできるようです。

## IP アドレスの範囲のオープン プレビューを有料プラン ユーザー向けに開始
https://circleci.com/ja/changelog/#ip-アドレスの範囲のオープン-プレビューを有料プラン-ユーザー向けに開始

CircleCI Cloud において、ジョブから発生するネットワークトラフィックの IP アドレス範囲[^range]を限定できる IP ranges という機能が公開されました。（有料プランユーザ向けプレビュー）

IP ranges を有効にすることで、[あらかじめ用意された IP アドレス範囲リスト](https://circleci.com/docs/2.0/ip-ranges/#listofipaddressranges)のいずれかの IP アドレス範囲がジョブで利用されます。

これにより、社内ネットワークなどへのインバウンドを CircleCI のジョブからのみに限定できます。例えば CircleCI から社内ネットワーク内サーバにアクセスしなければいけないなどの場合に、一時的にポートを解放するなどの方法をどこかの事例で見たことがありますが、リスト内のアドレスのみ許可することで、よりセキュアにできます。

ただ、IP アドレス範囲リストは他の CircleCI ユーザも利用できるため、IP アドレス範囲リストからのアクセスだから絶対安全というわけではないことに注意が必要です。

[^range]: ところで IP アドレス範囲と書かれていますが、リストは CIDR 表記というわけでもなくサブネット数の記述も見当たりません。多分 CircleCI 目線だとジョブを実行する VM 群が外向きには IP アドレス範囲リストの IP アドレスを使うから IP アドレス範囲と呼んでいるのだと思ったのですが、ユーザ目線だと結局のところ IP アドレスってことですよね？詳しい人教えて〜

## GitHub Next | Visualizing a codebase
:::message alert
集合体がたくさんあります。トライポフォビア（集合体恐怖症）の人は注意してください。
:::
https://next.github.com/projects/repo-visualization


GitHub Next からリポジトリのコードベースの構造をダイアグラムで可視化するサイト [Visualizing Codebases](https://octo-repo-visualization.vercel.app/)、および、ツール [repo-visualizer](https://github.com/githubocto/repo-visualizer) が公開されました。

:::message
GitHub Next はテクノロジーとソフトウェアの未来を探究するチームを謳っており、以前紹介した [Flat Data](https://zenn.dev/korosuke613/articles/productivity-weekly-20210519#github-octo-%7C-flat-data) を開発しています。もともと GitHub OCTO という名でした。少なくとも先週水曜日の時点では...
この記事を執筆しているときに GitHub Next へ名前が変わっていることに気づきました。

> 👋 We moved, come see our tweets @GitHubNext!
> https://twitter.com/GithubOcto/status/1427770624756224007?s=20
:::


Visualizing Codebases を使うことで、コードベースを「指紋」として構造を構造を一目で確認できます。ただ、冒頭でも述べましたが、ブツブツがたくさんあるので、トライポフォビア（集合体恐怖症）にはきついかもしれません。

とりあえず気になるリポジトリを調べたいならば、記事中の [Explore for yourself!](https://next.github.com/projects/repo-visualization#explore-for-yourself) または [Visualizing Codebases](https://octo-repo-visualization.vercel.app/) ですぐに確認できます。

また、[githubocto/repo-visualizer](https://github.com/githubocto/repo-visualizer) アクションを使うことで、簡単に CI に組み込んでリポジトリ上に画像を置けます。僕も実際に[自分のリポジトリ](https://github.com/korosuke613/playground/blob/1fa589e339ee3b8a2cc3488fdb764f0b5b227101/.github/workflows/repo-visualizer.yaml)に組み込んでみました。とても簡単でした。

大規模な OSS などのリポジトリでは、どういうファイルがどこに配置されているか、大元のソースコードがどこにあるのかといったコードベースを把握するのは大変です。そういったリポジトリにコミットしたい場合に活用できそうです。

# know-how 🎓

## Continuous Integration Benchmark Metrics
https://failfastmoveon.blogspot.com/2021/08/continuous-integration-benchmark-metrics.html

CircleCI 社の CI に関するメトリクス、データを基に図を作ってみたという記事です。

Continuous Integration - Benchmark Metric と名付けられた図にはコミットからデプロイまでの一連の流れと、それぞれのフェーズやスパンで最適とされる時間、レートが載っています。

例えば Build Time の場合、Build Time の範囲（ビルドから CI の通過まで）と、最適とされる時間（Best: 0:02 min、Median: 3:27 min、Bottom: 28:00 min+）が図上に載っています。

CI の改善点を共有する場合などでこういう図があると便利かもしれません。

## JavaScript で文字数を length で数えるのはやめようの実例
https://zenn.dev/sosukesuzuki/articles/d21d69a5914a03

JavaScript で文字数を length で取得すると期待した値が得られないことを実例を通して説明している記事です。

例えば漢字の `𠮟` は見た目上 1 文字ですが `"𠮟".length` は `2` を返します。この記事では Prettier が文字数を length で数えていたために起きたバグとどうやって解決したのかも書かれており、対策方法を参考にできます。

正直なところ僕は `length` が文字数ではなく Unicode コードユニットの数を数えることを知らなかったので普通に length で文字数を数えちゃってました。（[MDN Web Docs にも普通に載ってた](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/length#unicode)。）これから気をつけていこうと思います。

# tool 🔨

## ブラウザ拡張機能を作成するためのテンプレートをつくった
https://zenn.dev/sqer/articles/5a3d1cc0e00a30872a3f

以前ブラウザ拡張を作るためのリポジトリテンプレートである [antfu/vitesse-webext](https://zenn.dev/korosuke613/articles/productivity-weekly-20210728#antfu%2Fvitesse-webext%3A-%E2%9A%A1%EF%B8%8F-webextension-vite-starter-template) を紹介しました。こちらは Vue3、Windi CSS などのフレームワークが同梱済みで正に今すぐ拡張機能を作れるスターターという感じでした。便利な反面一部のフレームワークを取り替えたいという場合に面倒だったり、もっとシンプルなテンプレートが欲しいと思ったりしました。

この記事で紹介されている [HikaruEgashira/browser-extension-ts-template](https://github.com/HikaruEgashira/browser-extension-ts-template) はもっとシンプルで最小構成と言えるブラウザ拡張機能テンプレートです。

もともと有名なブラウザ拡張テンプレートとして [fregante/browser-extension-template](https://github.com/fregante/browser-extension-template) がありますが、これを TypeScript 化したとのことです。

シンプルな拡張機能テンプレートを求めている場合はこちらの方が使い勝手が良いかもしれません。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [GitHub Actions: Self-hosted runner events are now included in the Audit Log | GitHub Changelog](https://github.blog/changelog/2021-08-04-github-actions-self-hosted-runner-events-are-now-included-in-the-audit-log/)
  - GitHub Actions の Self-hosted runner でジョブを実行したり停止して処理が止まった場合、監査ログへ記録されるようになりました。
  - Enterprise プランのユーザのみが利用可能です。
- [The Cloud Forward Podcast by Alibaba Cloud: Our Newly Launched Podcast Series! - Alibaba Cloud Community](https://www.alibabacloud.com/blog/the-cloud-forward-podcast-by-alibaba-cloud-our-newly-launched-podcast-series_597877)
  - Alibaba Cloud がクラウドコンピューティングがデジタル世界を変革する革新的な方法について議論するためのポッドキャストを始めました。
  - 第 1 回は 2021 年のテクノロジートレンド TOP10 がテーマとのこと。
  - Spotify と Apple Podcasts で聞くことができます（英語ですが）。

# あとがき
先週号です。またもや遅くなってすみません。先週はずっとお休みだったので、今週の月曜日に仕事を始めた時感覚を取り戻すのが大変でした。ちなみに僕は早起きができなくなってしまいました。直したい。

---

8/28（土）に Open Developers Conference 2021 Online というカンファレンスがあるのですが、生産性向上チームが登壇します！生産性向上チームの活動に興味のある方はぜひお越しください。他のセッションも面白そうなのが揃っています。楽しみですね。

https://twitter.com/Shitimi_613/status/1427547370976268292?s=20

---

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

:::message
すみません。今週のおまけもお休みです
:::
