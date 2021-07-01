---
title: "Productivity Weekly (2021-06-30号)"
emoji: "🍜"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 32 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Issues · Project planning for developers
https://github.com/features/issues
https://twitter.com/github/status/1407731478096756739

GitHub の Issue が強化されます。ボードビュー、テーブルビューが追加されるなどさまざまな機能が追加されます。他にも、カスタムビューを作れたり、コマンドパレットが用意されたりといった嬉しい機能が追加される予定です。

まだ Beta 版なので、サインアップすると waitlist に追加されます。waitlist に登録するとそのうち使えるようになると思いますが、残念ながら僕はまだ使えるようになっていません...早く使いたいですね。気になる人はとりあえずサインアップしておきましょう。

## Issues forms beta for public repositories | GitHub Changelog
https://github.blog/changelog/2021-06-23-issues-forms-beta-for-public-repositories/

GitHub の Issue をフォーム化できるようになりました（Beta）。Issue テンプレートに [yaml](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms) を配置することでフォームとなった Issue テンプレートを使えるようになります。

最初に紹介した Issue の更新とは違い、こちらは全ての Public リポジトリで利用できます。
Issue 駆動で開発していたり、OSS を運用してたりする場合に役立ちそうです。

## GitHub Copilot · Your AI pair programmer
https://copilot.github.com/
GitHub が OpenAI と協力し、機械学習を基に関数名やコメントからコードを提案する GitHub Copilot[^copilot]を発表しました（プレビュー）。OpenAI のシステムにより何十億行といったパブリックコードを学習し、コーディング中、コンテキストにあったコードを提案してくれるようです。

まだ Technical Preview であり、サインアップすることで waitlist に追加されます（僕はまだ使えてません..）。現在は Python、JavaScript、TypeScript、Ruby、Go をサポートしており、VSCode と GitHub Codespaces で利用可能です。

また、[Copilot を使った研究の詳細](https://docs.github.com/en/github/copilot/research-recitation)も公開されています。（まだ読めてない）

Copilot は GitHub のサーバを利用しているため、どういうデータが送られてどう利用されるかという点が気になりますが、それについては「Frequently asked questions」の「Telemetry」や「[About GitHub Copilot telemetry](https://docs.github.com/en/github/copilot/about-github-copilot-telemetry)」に載っています。

> How is the data that GitHub Copilot collects used?
> In order to generate suggestions, GitHub Copilot transmits part of the file you are editing to the service.（一部抜粋）

Copilot では編集中のファイルの一部がサービスに送られるとのことです。業務で利用したい場合はしかるべき部署への確認が必要になるかと思います。

> Will my private code be shared with other users?
> We do not reference your private code when generating code for other users.（一部抜粋）

また、プライベートなコードは他のユーザのコード生成に参照されないとのことです。（自身のコード生成には利用される？）

なお Copilot が学習した何十億行のパブリックコードの中に GPL が含まれている場合、GPL のコードを基に生成されたコードも GPL になるんじゃないかという話が話題です。GitHub のことだからうまくやっているだろうと思いたいところですが、もうちょっと利用には慎重になった方がよいかもしれません。

https://twitter.com/shyouhei/status/1410239448135081989?s=20

機械学習による提案なので、必ずしも最適なコードが提案されるとは限りません。結局のところコードが意図したものかどうかは人間が確認しないといけないことを忘れてはいけません。それはそれとして、純粋に面白そうなので早く試してみたいものです[^hash]。触ってみたい人はサインアップして気長に待ちましょう。

[^copilot]: Copilot とは副操縦士という意味です。コーディングしている我々（操縦士）の支援をしてくれる存在ということでしょうね。
[^hash]: Twitter ハッシュタグ「[#GitHubCopilot](https://twitter.com/hashtag/GitHubCopilot)」にはすでに Copilot を使用しているユーザによる GIF がいくつか投稿されています。どんなものか気になる人はこちらもチェックです。

## Tech Preview: Docker Dev Environments
https://www.docker.com/blog/tech-preview-docker-dev-environments/

https://youtu.be/9TM4Ry986oY

[先日 DockerCon で発表された Docker Dev Environments](https://docker.events.cube365.net/dockercon-live/2021/content/Videos/NiRakLLKzeghyGkon) のテクニカルプレビューがリリースされました。Docker Desktop 3.5 より誰でも利用可能です。（これまでは Early Access にサインアップする必要がありました。）

Docker Dev Environments は GitHub リポジトリなどの URL を指定すると、コードに応じて開発環境に最適なイメージを用意し、VSCode 上で編集できる[^remote]という機能になります。さらに、Docker Hub を介した開発環境の共有が可能となります。

コンテナに開発環境を作って VSCode 上で編集すること自体はこれまでもできていましたがコンテナイメージは自分で選択する必要がありました（場合によっては用意も）。コードに応じて最適なイメージを用意してくれるのは試しにコードを触ったりするのが容易になってよいですね。なお、イメージの指定も可能です。

GUI 上でボタンをワンクリックするだけで現在のコンテナがイメージ化され、DockerHub にデプロイされます。その時払い出される URL をチームメンバーに共有することで簡単に他のメンバーの開発環境を手元に用意できます。チームメンバー間での環境の差異をなくせることや、Git ブランチの移動に悩まされなくなることがメリットとして謳われています。

使い方や詳細は下のドキュメントを見るのがおすすめです。
https://docs.docker.com/desktop/dev-environments/

気になる方は Docker Desktop3.5 から利用可能なので利用してみましょう。僕もまだちゃんと触れてないのでちゃんと触りたいです。

# tool 🔨

## textlint 12リリース、ブラウザで動くtextlint editorをベータリリース | Web Scratch
https://efcl.info/2021/05/27/textlint-12-editor/

https://github.com/textlint/editor

文章校正ツール textlint をブラウザで使うことができる拡張機能、textlint editor がベータリリースされました。作者は textlint の生みの親である azu さんです。

ブラウザ上での文章校正ツールとしては他にもありますが、例えば Grammarly の場合、文章の内容をサーバに送るので外に漏らしたくない文章には使えないという場合がしばしばあったと思います。しかし textlint editor を使えばブラウザ上で校正するため、外に漏らしたくないような文章でも手軽に使うことができます。もちろん今までも校正したい文章をローカルの textlint で校正できましたが、ブラウザ拡張機能となったことでさらに手軽に使えるようになります。

さっそく使ってみました。

https://zenn.dev/korosuke613/scraps/dcb0bd4f27284c

拡張機能を入れるだけでは使えず、textlint ワーカースクリプトをインストールする必要があります。ワーカースクリプトは[すでに azu さんが公開している](https://azu.github.io/textlintrc/)ものを利用してもよいですが、自分が普段から利用しているルールを使いたい場合は自前で用意する必要があります。一見大変そうですが、リポジトリテンプレート（[@textlint/editor-script-template](https://github.com/textlint/editor-script-template)）を利用することで簡単に自前のワーカースクリプトを用意できます。

ブラウザで textlint が使えるようになってすでに生産性の向上を感じます。また、

> また、ベータなので@textlint/editorにバグレポートやドキュメントのPRとか待っています。

とあるので、使ってみて気になる点があった方は貢献しましょう。

## six-ddc/plow: A high-performance HTTP benchmarking tool with real-time web UI and terminal displaying
https://github.com/six-ddc/plow

plow は HTTP(S)のベンチマークツールです。指定した URL に対して HTTP(S)リクエストを大量に送り、サーバの性能検証ができます。それだけでなくリッチなリアルタイムチャートをブラウザで見ることも可能です。

自身が作った Web サイトや Web アプリの性能を測りたい場合にサクッと使えそうです。

:::message alert
こういったベンチマークツールは DoS 攻撃にも利用できてしまいます。他者に迷惑がかからない、自身が管理するネットワーク、サーバに対して利用してください。（AWS などのクラウドサービスでの利用は攻撃とみなされる可能性があるので利用する前に調査してください。）
:::

ちなみに Productivity Weekly 記事を書くのに使用している Zenn CLI のプレビューに対してベンチマークを測った結果が以下です。この例では 10 並列で 200000 リクエストを飛ばしています。

:::details Zenn CLI のプレビューに対して plow 使ってみた

```md:実行結果
❯ plow http://localhost:8000 -c 10 -n 200000
Benchmarking http://localhost:8000 with 200000 request(s) using 10 connection(s).
@ Real-time charts is listening on http://0.0.0.0:18888

Summary:
  Elapsed    37.147s
  Count       200000
    2xx       200000
  RPS       5383.887
  Reads    6.711MB/s
  Writes   0.298MB/s

Statistics    Min     Mean    StdDev    Max
  Latency   1.213ms  1.854ms  594µs   25.733ms
  RPS       1862.36  5385.06  663.28  5676.78

Latency Percentile:
  P50        P75      P90      P95     P99     P99.9    P99.99
  1.672ms  1.887ms  2.226ms  2.679ms  4.27ms  8.304ms  17.223ms

Latency Histogram:
  1.666ms   123006  61.50%
  1.935ms    56613  28.31%
  2.454ms    15636   7.82%
  3.406ms     4004   2.00%
  4.911ms      663   0.33%
  11.321ms      49   0.02%
  15.88ms       21   0.01%
  24.923ms       8   0.00%
```

![](https://storage.googleapis.com/zenn-user-upload/028a4655790e96e2eafd6b43.png)
*http://0.0.0.0:18888*

:::

## Lima: Linux virtual machines (on macOS, in most cases)
https://github.com/AkihiroSuda/lima

Lima は macOS 向けの自動ファイル共有、ポートフォワーディング、containerd を備えた Linux 仮想マシンです。Lima の目的は Docker CLI 互換である nerdctl を含む containerd を Mac ユーザに普及することであり、Docker for Mac の代替となることが期待できます。

Docker for Mac はファイル共有が遅いという話がしばしば話題になります。

- [MacでDockerが遅いとお嘆きの人たちへ | GENDOSU@NET](https://gendosu.jp/archives/3439)
- [docker for macのファイルioが遅い問題に終止符を打つ](https://zenn.dev/diwamoto/articles/e8425c256dccd6#%E6%AC%A1%E3%81%AF%E3%81%A9%E3%81%86%E3%81%99%E3%82%8B%E3%81%8B)
- etc..

また、[README](https://github.com/AkihiroSuda/lima#advantages-compared-to-docker-for-mac)には、Docker for Mac が Moby を使っているため、containerd のいくつかの機能が使えないことについて書いてあります。

Lima を使うことでそういった Docker for Mac の問題とはおさらばできるかもしれません。そういった問題に困っている方は試してみてください。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [AWS、ローコード開発ツール「AWS Step Functions Workflow Studio」リリース。サーバレスアプリをビジュアルプログラミング](https://www.publickey1.jp/blog/21/awsaws_step_functions_workflow_studio.html)
  - AWS のサービスをフローチャートを作るように組み合わせることで AWS Step Funtions のワークフローを作ることができる AWS Step Functions Workflow Studio がリリースされました。
- [dotenv-linter/dotenv-linter: ⚡️Lightning-fast linter for .env files. Written in Rust 🦀](https://github.com/dotenv-linter/dotenv-linter)
  - `.env` ファイルの linter です。重複した環境変数や文法の間違いを指摘してくれます。dotenv のヘビーユーザにおすすめです。
- [nottheswimmer/pytago: Transpiles some Python into human-readable Golang.](https://github.com/nottheswimmer/pytago)
  - Python スクリプトをヒューマンリーダブルな Go コードにトランスパイルするツールです。
  - どこまでできるかは不明ですが、README にある大量の例を見ると結構幅広く対応してそうです。
  - ちなみに、Python のコードをそのまま Go に持ってくると Python の思想を Go のコードに落とし込むことになるから結局つらくなるみたいな話で盛り上がりました。

# あとがき
いや〜最近やりたいことが多いけどなかなか時間が取れないです。もっと探求したりブログ書いたりしたいんですけどね。無限の時間がほしい。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### Windows 11プレビューが配布開始　CPUやTPM 2.0など要件緩和 - Engadget 日本版
https://japanese.engadget.com/windows-11-preview-230550598.html

Windows 11 のプレビュー版が配布開始されましたね。僕は新しい物好きなのですぐにインストールを試みました。

https://twitter.com/Shitimi_613/status/1409874235397398528?conversation=none

僕の Windows PC は 2014 年くらいに発売したモデルなので動くのか大変不安でしたが、とりあえずプレビュー版はインストールできました。動きもそんなに 10 の頃と変わりません。（10 の頃からもうモッサリしてた）

今のところ目新しい機能はそんなにないですが（ウィジェットくらい？）、ウィンドウの角が丸くなったり、全体的に UI がスタイリッシュな感じになったりと見た目の変化はいろいろありました。どうやらまだ Android は動かないようです。そもそもスペック的に僕の PC でまともに動くのか怪しいですが。

そろそろ Windows のデスクトップ PC 良いやつほしいなと思い続けて 4 年くらい経ちました。そろそろほしい。
