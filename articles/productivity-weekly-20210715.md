---
title: "Productivity Weekly (2021-07-15号)"
emoji: "🥇"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 34 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions のワークフローをチェックする actionlint をつくった - はやくプログラムになりたい
https://rhysd.hatenablog.com/entry/2021/07/11/214313

GitHub Actions ワークフローを lint するための CLI ツール actionlint を作ったという記事です。記事内では、ワークフローに lint が必要な理由やツールの使い方、チェック項目などが細かく書かれています。

GitHub Actions ワークフローが想定通り作られているかは実際にワークフローを push してワークフローを動かさないと確認ができません。また、GitHub Actions は最小限のチェックしかしてくれないため、意図しない処理をするのに pass になってしまう場合もあります。式内で `matrix` のプロパティを参照する際に、存在しないキーを指定してもエラーとはならずに `null` が返ってきてしまう、という例が記事で紹介されています。こういったプロパティの有無によるミスは自分で間違いを見つける必要があります。

actionlint を使うことで、push しないとわからない、push してもわからないようなミスを、push 前に見つけることが可能となります。必須キーのチェックや型チェックなどは [json-schema](https://github.com/SchemaStore/schemastore/blob/40aff61cfc227c9fe92f64cbd51c3070fbebeb5f/src/schemas/json/github-workflow.json) によるバリデーション[^intellij]によりこれまでも検知可能でしたが、actionlint はそれ以上のチェックをしてくれます。

もしどんなものか試してみたい人は、[actionlint playground](https://rhysd.github.io/actionlint/) が提供されているので、手軽にブラウザで試してみてください。

さっそく僕も手元で Zenn の記事を管理している[リポジトリ](https://github.com/korosuke613/zenn-articles/tree/7404522eeb005cb6ce3400a006f43197f8c25c24/.github/workflows)に対して試してみました。

```text:korosuke613/zenn-articles
❯ actionlint       
.github/workflows/create-published-true-pr.yml:11:15: this expression must be contained within ${{ }} like `if: ${{ ... }}` since it contains operator ".". see https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idif for more details [expression]
   |
11 |     if: github.event.pull_request.merged == true
   |               ^~~~~~~~~~~~~~~~~~~~~~~~~~
```

式に `.` 演算子が含まれているため `${{ }}` で囲めと言われました。便利ですね[^yodan]。

Productivity Weekly では、「これを毎回ターミナルでチェックするのは面倒だから VSCode や JetBrains IDE のエディター上でチェックしてほしい（そういうプラグインがほしい）。」という話が出ました。すでに誰か作り始めているかもしれませんが、知見があればどなたか作ってほしいですね。

push して確認、修正してまた push して確認...を繰り返す手間を減らせそうです。とても生産性が上がりそうでいいですね。

[^intellij]: VSCode や Jetbrains 製品などでは自動で json-schema によるバリデーションを行ってくれたと思います。
[^yodan]: [GitHub のドキュメント](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idif)には「If the expression contains any operators, the expression must be contained within ${{ }} to explicitly mark it for evaluation.」とあるため、確かに `${{ }}` で囲まないと行けないんですよね。ただ、囲まなくても特に GitHub Actions には怒られないし、想定通り動作します。他に何か意味があるんだったかな？

## Terraform, Dockerfile, KubernetesなどIaCの脆弱な設定をCI/CDで検知する - knqyf263's blog
https://knqyf263.hatenablog.com/entry/2021/07/13/063729

コンテナイメージの脆弱性スキャナーOSS である [Trivy が企業に買収された話](https://knqyf263.hatenablog.com/entry/2019/08/20/120713)はまだ記憶に新しいです[^kioku]。その Trivy を買収した Aqua Security は Terraform の静的解析スキャナーである tfsec を買収して Trivy に統合しました。

この記事では、Trivy の生みの親である knqyf263 さんが Trivy が tfsec を統合した話と、他にもバイナリや Dockerfile などのスキャン対象が増えている話、config ファイルの設定ミス検知にも対応している話、使い方等についてを説明されています。

僕も Trivy をコンテナイメージの脆弱性チェックに使うことがありますが、まさかその他の脆弱性チェックや設定ミスにも対応してたということは全く知りませんでした。

なお、設定チェックにも対応したことについては議論があったようです。

> さすがに脆弱性と設定ミスではまるで異なる機能なのでTrivyに実装する必要はないだろうと思い別ツールの開発を強く主張したのですが、何やかんやあって議論に敗北しました（恒例）。ツールは小さく作りたいという自分の哲学には反しますが、より多くの人がTrivy使ってくれるなら良いかと自分を強引に納得させました。

有効活用していきたいですね。

[^kioku]: 「記憶に新しい」と言いつつもう 2 年前になるんですね...時が経つのは早い。

## Julia Reda – GitHub Copilot is not infringing your copyright
https://juliareda.eu/2021/07/github-copilot-is-not-infringing-your-copyright/

先日登場した GitHub Copilot はまさにコーディング時の相棒になりえそうな面白いサービスですが、コピーレフト型ライセンスのコードを学習していることや、GPL ライセンスのコードをそのまま出力する可能性があることなどが波紋を呼んでいます。（[「コードの無断流用を助長」GitHubのAIプログラミング機能に反発、コード引き上げも](https://internet.watch.impress.co.jp/docs/yajiuma/1336119.html)）

そんな中、元欧州議会議員で著作権の改革に関わった Julia Reda さんが、GitHub Copilot は著作権侵害ではないという見解を出しました。

この記事では、「テキスト＆データマイニングは著作権侵害ではない」、「生成される短いコードスニペットは独創性を認められない可能性が高い」という主張と理由が書かれています。また、著作権を拡大解釈することにより、機械的に大量のパターンのコードスニペットを生成して著作権を主張されるといった危険性出てくるので、拡大解釈は危険という話も書かれています。

ちなみに Productivity Weekly では、Copilot の学習データとして使われることをオプトアウトする仕組みはあっていいんじゃないかという話も出てきました。確かにそういうのはコードの著者がコントロールできてもいい気がしますね。

# know-how 🎓

## 大きなGitリポジトリをクローンするときの工夫を図解します - DeNA Testing Blog
https://swet.dena.com/entry/2021/07/12/120000

巨大 Git リポジトリをクローンするときのノウハウを紹介した記事です。

歴史の長いリポジトリは開発が進むにつれて大きくなっていきます。記事中では巨大リポジトリの例が示されています。

> とあるタイトルのアセットリポジトリは、そのままクローンすると .git が 17GiB、チェックアウトした部分も含めると 45GiB 程度になっています。

非常に大きいですね。クローンに何十分かかるんだろ...開発マシンでクローンする分には 1 回クローンすれば終わりですが、1 日に何回もクローンすることになる CI においてはクローンするときの工夫を真面目に考える必要があります。

この記事では、リポジトリのサイズが大きくなってしまう原因、大きくなって困ること、クローン時のディスク・ダウンロード節約方法が書かれています。

クローン時のディスク・ダウンロード節約方法のボリュームが大きく、クローン方法の工夫、チェックアウト時の工夫、LFS の活用について、それぞれの方法やメリットデメリットなどが事細かに説明されています。まさに巨大リポジトリをなんとかするためのノウハウが詰まっており、色々な方法を研究したことがわかります。

僕はシャロークローンと LFS くらいしかクローン時のノウハウを知らなかったため、大変勉強になりました。特に必要な blob ファイルのみ取得するブロブレスクローンは手軽にサイズを節約できそうで便利だと思いました。

巨大リポジトリのクローンに困っている方にとても参考になると思います。

## Migrating from Capybara to Puppeteer
https://eng.wealthfront.com/2021/06/25/migrating-from-capybara-to-puppeteer/

Wealthfront と言うサービスのテストフレームワークを Selenium(Capybara) から Puppeteer に移行した話です。

この記事では、移行する理由、Puppeteer を選択した理由、移行プロセス、移行した結果が紹介されています。

移行する理由としては、アプリケーションとテストスイートの言語を統一するため、テストスイートの不安定率(flaky test)を SLO[^slo]に適合させるため、テストスイートの実行時間を削減するためといった理由が挙げられていました。そして移行してみた結果、テストスイートの実行時間は短縮され、不安定率も SLO に収まったようです（わかりやすいグラフがある）。

Puppeteer に移行するだけで全てがうまくいくというわけではありませんが、フレームワークの選択理由や移行プロセスはテストフレームワーク移行を考える際に 1 つの事例として参考にできそうです。

[^slo]: Service Level Order の略。サービスレベルの目標値のこと。たぶんこの場合は不安定さの上限が決まっていたってことだと思う。flaky test に対する SLO が新鮮だった。

## Check! GitHub の監査ログを知る
https://zenn.dev/dzeyelid/articles/d378dfc30affa0

GitHub の監査ログの種類、閲覧と検索方法、外部連携についてをまとめた記事です。Organization と Enterprise、Enterprise Cloud と Enterprise Server ごとにまとまっており、それぞれで何ができるのかがわかりやすいです。

GitHub の監査ログ（Audit log）では色々な情報を閲覧できますが、一体どういう情報を閲覧できるのかよくわかってる人は少ないのではないでしょうか？（自分はよくわかっていません）

何か問題が起きたときスムーズに調査ができるように、監査ログについて学んでおいて損はないと思います。権限を持っている方は確認しておきましょう。

## TypeScriptプロジェクトのCIでやってること
https://zenn.dev/daikik/articles/b1a2061162ed83

TypeScript プロジェクトの CI で筆者がやっていることを紹介する記事です。

ユニットテストはもちろんのこと、マークダウンの Dead link チェックや Storybook のアクセシビリティチェックなど、色々なチェック項目と実現するためのツールが紹介されています。

TypeScript プロジェクトとタイトルにはありますが、汎用的に使える項目も多々あるので TS 使わんという人にもおすすめしたい記事です。

知らないツールを知るきっかけになり、いくつかのツールは CI に取り入れたいと思いました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [The GitHub Releases Markdown Editor now has an editor toolbar | GitHub Changelog](https://github.blog/changelog/2021-07-13-the-github-releases-markdown-editor-now-has-an-editor-toolbar/)
  - GitHub の Releases を作成・編集する際のマークダウンエディタにツールバーが追加されました。
  - Markdown 初心者や GitHub のマークダウンエディタで何ができるか知らない人には嬉しいかも？
  - マークダウンエディタに対するツールバーはこれまでも Issue などの作成・編集画面で利用できていました。

# あとがき
**なんと今回で Productivity Weekly は一周年です。**（記事はまだ一年も経ってない）

社内 kintone で確認すると、第 1 回は 2020/07/15 でした。ちなみに記念すべき一番最初のネタは [alexjs](https://alexjs.com/) という、master, slave のような不適切と言われる単語をチェックするツールでした。~~全然覚えてない。~~「git のメインブランチ名が master でけしからん」みたいな議論が巻き起こってた時期だったような。Productivity Weekly を振り返ると過去のトレンドがなんとなく見えてきますね。たぶん。

Productivity Weekly 記事は平木場のベストエフォートで書いてるので今後どういうふうに変化していくか全くわかりませんが、今後も書いていこうと思います。 **いつも読んでいただきありがとうございます！** 今後ともよろしくお願いします🙇

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### IIJmio:「IIJmioモバイルサービス ギガプラン」専用スマホアプリ「My IIJmio」を提供開始
https://www.iijmio.jp/info/iij/1626136417.html

僕は最近私物スマホの回線を IIJmio に変更しました。（高校の頃から使っている Docomo とは袂を別った）
家と会社にいることが多いのでモバイル回線をあまり使わなかったため、格安でもいいやとなった次第ですね。
IIJmio のギガプランは 4GB 電話機能付きで月 1000 円くらいですでに安いのですが、さらに僕は家のインターネット回線も IIJmio であるため、ギガプランも契約すると 600 円くらい安くなるんですよね。したがって携帯代を月 500 円くらいにできました。これは安い！

とまあ前置きはそれくらいにして、その IIJmio のギガプランのデータ利用状況や契約内容照会を行えるアプリ「My IIJmio」が 7/15 にリリースされたんですよね。
もともとは 6 月以降リリース予定とあった（「以降」とついてるのが面白い）ので、ちょっと予定より遅れたのかな？という感じでした。

とりあえず速攻でダウンロードしてログインしてみたのですが、アクセスが集中しすぎてまともに使える状態ではありませんでした。
https://twitter.com/iijmio/status/1415571749815521283?s=20

まあ最初はそんなもんだろうと気長に待ってたのですが、なかなかメンテナンスが終わりませんでした。
https://twitter.com/iijmio/status/1415869170655191040?s=20

そんな中、以下のお知らせが...

IIJmio:「My IIJmio」における情報セキュリティ事故のご報告とご利用停止について
https://www.iijmio.jp/info/iij/1626425153.html

My IIJmio 上でログインしている本人ではないアカウントの情報（お客様情報）が表示されてしまった事故が発生したようです...7 月 17 日の更新によると 254 名のお客様情報が流出したとか。とんでもないやばい事故が起こってしまいましたね...期待していただけに残念です。

そしてもちろん My IIJmio アプリは必要な改修が完了するまで一旦提供停止。もう事故を起こさないためにも改めて色々検証するだろうし、そんなすぐには再開しないでしょうね。

気長に待ちましょう。とほほ...