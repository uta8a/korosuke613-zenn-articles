---
title: "Productivity Weekly (2022-01-26号)"
emoji: "🇪🇬"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220126"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 60 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Share GitHub Actions within your enterprise | GitHub Changelog
https://github.blog/changelog/2022-01-21-share-github-actions-within-your-enterprise/

GitHub Actions において、Internal リポジトリに置いたアクションを Enterprise/Organization 内で共有できるようになりました[^public]。

これまでは共有できなかったため Public リポジトリに置くなり各リポジトリに置くなりする必要がありました（または Reusable workflows を使う）。

この変更で組織内アクションを作りやすくなったため、再利用性が増して良いですね。

[^public]: 当たり前ですが Enterprise/Organization が同じでも Public リポジトリからは利用できません。

## GitHub Actions: Reusable workflows can be referenced locally | GitHub Changelog
https://github.blog/changelog/2022-01-25-github-actions-reusable-workflows-can-be-referenced-locally/

GitHub Actions において、ローカルにある Reusable workflows 指定が単純になりました。

以前はたとえローカルリポジトリ内でも他のリポジトリを参照するときと同じく ref の指定が必要だったため使い勝手（特に開発時）があまり良くありませんでした（[参考](https://zenn.dev/link/comments/ba12781f8c3048)）。

ref の指定が必要なくなったため Reusable workflows の開発・利用がしやすくなりました。適材適所で使っていきたいですね。

## Toggle outlier values - Track CircleCI Updates
https://circleci.com/changelog/#toggle-outlier-values

CircleCI の [Insights](https://circleci.com/docs/ja/2.0/insights/) において、Most Recent Workflow Runs のグラフでデータの外れ値を除外できるようになりました。

Insights はワークフローやジョブ、テストの実行時間や成功率、クレジット使用率などのメトリクスを分析できる機能です。どのワークフローやジョブが不安定なのかなどを調べられます。

![](/images/productivity-weekly-20220126/circleci_insights.png =500x)
*実際の Insights の画面*

Insights に Most Recent Workflow Runs という直近のワークフロー実行時間を棒グラフで出してくれる機能があるのですが、今回その Most Recent Workflow Runs にて外れ値を除外できるようになり、グラフを見やすくできるようになりました。

パネル内にある `Hide X detected outliers`（`X` には数字が入る）を有効にすることで外れ値を除外してくれます。

![](/images/productivity-weekly-20220126/circleci_insights_before.png =500x)
*外れ値を含むグラフ*

![](/images/productivity-weekly-20220126/circleci_insights_after.png =500x)
*外れ値を除外したグラフ*


## New Insights public APIs - Track CircleCI Updates
https://circleci.com/changelog/#new-insights-public-apis

CircleCI の Insights に API が追加されました。

ワークフロー、ジョブの実行時間等の時系列データや Flaky テスト一覧などを取得できます。詳しい API ドキュメントもあるので利用のハードルは低そうです。

Insights に API が生えたことで Flaky テストの有無を監視して検出したら Slack に通知したり、ジョブ実行時間を定期的に保存[^job_store]して分析に使ったりなどができるようになります。

[^job_store]: CircleCI Insights のデータは 90 日間しか保管されない（たぶん）ため、それ以上の期間持っておきたい場合に使えそうという話。

## Audit log streaming is generally available | GitHub Changelog
https://github.blog/changelog/2022-01-20-audit-log-streaming-is-generally-available/

GitHub Enterprise の監査ログを Amazon S3 などに自動で流せる機能（Audit log streaming）が一般公開（GA）になりました。

Audit log streaming は去年の 9 月にパブリックベータとして登場した機能で、監査ログと Git イベント[^audit]をほぼリアルタイムで外部サービスに転送できます。Enterprise の管理者が Enterprise 単位で設定可能です。

参考：[Audit log streaming is now in public beta | The GitHub Blog](https://github.blog/2021-09-16-audit-log-streaming-public-beta/)

こういった権限や設定変更のログは何かあった時などに見たくなりますが、GitHub の Audit log は 90 日間しか保存しないため、見たい時に見られない場合があるという問題がありました。外部オブジェクトストレージに Audit log を流せると保存期間を自分たちでコントロールできるので良いですね。

[^audit]: Org や Repo の設定変更、パーミッションの変更、ユーザの追加や変更、admin の変更、GitHub App のパーミッション変更、Git event(clone, fetch, push)など。

## Secure your GitHub account with GitHub Mobile 2FA | The GitHub Blog
https://github.blog/2022-01-25-secure-your-github-account-github-mobile-2fa/

GitHub の 2 要素認証を GitHub Mobile でできるようになりました。

[2FA を設定することでアカウントを乗っ取られるリスクがだいぶ減るというデータ](https://jp.techcrunch.com/2019/05/21/2019-05-20-google-data-two-factor-security/)もあります。2FA を有効にしていない方はモバイルでも 2FA できるようになったし今すぐ有効にしましょう。

## Allow to upload .svg files to Markdown | GitHub Changelog
https://github.blog/changelog/2022-01-21-allow-to-upload-svg-files-to-markdown/

GitHub の Issue やコメントなどのマークダウンに SVG を貼れる（アップロードできる）ようになりました。これまで Issue やコメントなどで SVG を出すには事前に SVG をどこかへアップロードし URL を貼り付ける必要がありました。

これでだいぶ SVG を Issue やコメントで共有しやすくなりました。良いですね。

# know-how 🎓

## Reducing security risk in open source software with GitHub Actions and OpenSSF Scorecards V4 | The GitHub Blog
https://github.blog/2022-01-19-reducing-security-risk-oss-actions-opensff-scorecards-v4/

OSS プロジェクトがサプライチェーン攻撃に対して安全かどうかをスコア化する Scorecards を GitHub Actions で実行して、Code Scanning のアラートとして可視化する話です。

[Scorecards](https://github.com/ossf/scorecard)[^scorecards] は OpenSSF[^openssf]が進めているプロジェクトおよび開発しているツールで、サプライチェーン攻撃に対して安全かどうかが簡単に判断できます。

この記事ではこの Scorecards の結果を GitHub の Code scanning アラートに表示する方法が載っています。実は GitHub Actions の Workflow template に雛形が用意されているので簡単に設定できます（Personal Access Token の発行は必要）。

![](/images/productivity-weekly-20220126/scorecards.png =300x)
*使ってみたらすごい量のアラートが表示されました*

![](/images/productivity-weekly-20220126/scorecards_detail.png =300x)
*詳細を開くと対処方法も出てくる*

実際に使ってみた例が上の画像です。Code scanning で確認できると対処法がすぐにわかるのも便利です。

OSS 向けとされていますが、OSS プロジェクトじゃなくてもセキュリティを高めるために使ってみたいツールですね。

:::message
Code scanning を GitHub Enterprise で使うには GitHub Advaced Security を別途契約する必要があるため出力を工夫して Scorecards のみ使うというのもありかもしれません。
:::

[^openssf]: Open Source Security Foundation の略。
[^scorecards]: [以前使ってみた時のログ](https://zenn.dev/korosuke613/scraps/5fd242b7f76aa7)。半年前は v2 だったのに今見たら v4 になってた。

## Git で会社のリポジトリとかは自動で別のメアドを使うようにする - 宇宙行きたい
https://yoshiori.hatenablog.com/entry/2022/01/24/213448

Git の `user.email` をディレクトリで切り替える方法を説明した記事です。

`.gitconfig` で `includeIf` を設定すると特定のディレクトリ以下で読み込む設定ファイルを切り替えられる（設定が上書きされる？）ので、それを使ったテクニックのようです。詳しい設定方法は記事に載っています。

僕も `includeIf` を知らなかったので特定リポジトリで `git config --local user.email <メアド>` を叩く運用をしていました。例えば GitHub Enterprise Server でメールアドレスが組織のものしか使えない場合などは特に重宝しそうです。`user.email` に限らず `includeIf` は色々便利に使えそうですね。

## Automation of Terraform for AWS | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20220124-automation-of-terraform-for-aws/

メルカリでの AWS アカウント作成自動化事例です。

記事では、メルカリ内で AWS をアカウントをどのように分けているか、アカウント作成に関する課題、CI/CD 環境の構成（アカウント作成の自動化、監査ログ収集パイプライン、高権限奪取リスクの抑制＆影響範囲削減）などが解説されています。

ただ自動化したのではなく、権限が奪取された時に備えてアクセスキー、シークレットを使わないような構成を実現しており、どうしてその選択をしたのかも丁寧に解説されています。AWS マルチアカウント運用を行なっていこうとした時に CI/CD 環境の構成もリスクを減らすための考え方もとても参考となる記事だと思いました。

# tool 🔨

## あたらしいテストフレームワークVitestをReactで試してみた | DevelopersIO
https://dev.classmethod.jp/articles/intro-vitest/

:::message
こちらまだ開発中のフレームワークです。
:::

Jest に代わる[^kamo]新しいフレームワーク Vitest を試してみたという記事です。Vitest は Vite[^vite] 環境で動作するテストフレームワークです。Vite と同じく高速で動作します。

この記事では Vite 環境の構築、Vitest のセットアップ、テスト実行、速度比較などが説明されています。環境構築が丁寧に書かれており、すぐに手元で試すことができます。テストコードを見ると確かに使い勝手は Jest と変わらなそうです。Jest との速度も比較して表にまとめており、Vitest がいかに速いかがわかります。

実際に、[公式ドキュメントの Getting Started にオンライン上(StackBlitz)で試せるリンク](https://vitest.dev/guide/#trying-vitest-online)が張ってあります。実際に試したところすごい速さで驚きました。もうちょっと大きいコードベースで試してみたくなりましたね。

記事中にも載っていますが、現在開発中なので試す程度に使うのが良いです。要チェックですね。

https://twitter.com/antfu7/status/1468233216939245579

[^kamo]: かもしれない
[^vite]: バイトって読むのかと思ったけど元々フランス語の言葉らしくてヴィートって読むらしい。ツール的にはどっちで読むのかは知らない。https://zenn.dev/sykmhmh/articles/ff09bea2cf7026

## tfaction - GitHub Actions で良い感じの Terraform Workflow を構築
https://zenn.dev/shunsuke_suzuki/articles/tfaction-introduction

:::message
こちらまだ開発中のアクションです。
:::

GitHub Actions で Terraform の典型的なワークフローを実現するためのアクション tfaction の作者による紹介記事です。

suzuki-shunsuke/tfaction は Terraform に関するアクションの集まりです。記事では、概要、tfaction で定める要件、tfaction が持つ機能（アクション）、セットアップ方法が載ったリンク、Example が載っています。

Terraform の性質上ユースケースが多岐に渡るのもあってか、どのユースケースでも適用できるのではなく、tfaction で定める要件（記事中に細かく書かれてる）を満たす場合に適用できるアクションであると説明されています。ただ、1 つのアクションに全てが詰まっているのではなく、用途ごとにアクションが存在するため、一部分のみ利用するという使い方も可能だと思います。

多機能なのはもちろんのこと、Renovate での変更で plan 差分が出たら fail させることと、モノレポを想定して作られているのが個人的に特に嬉しいです。まだまだ開発中とのことですが使いたくなるアクションだと思いました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [開発者の日々の作業をサポートする様々なミニツールを集約したオープンソースのデスクトップアプリ・「DevToys」 | かちびと.net](http://kachibito.net/useful-resource/devtoys)
  - 開発者のための十徳ナイフのような便利ツールがたくさん入ったアプリ。
  - ただし Windows 専用。
    - クロスプラットフォーム対応の [Issue](https://github.com/veler/DevToys/issues/156) はある。
    - 作者によると似たようなツールが win になかったため作ったとか。クロプラ対応は全く可能性がないわけではないらしい。
  - 作者が提示した似たようなツール
    - [DevBox - Offline tools for developers](https://www.dev-box.app/)
    - [DevUtils.app - Offline Toolbox for Developers](https://devutils.app/)

# あとがき
遊戯王マスターデュエルにうつつを抜かしてたら投稿が遅くなってしまいました。僕は電脳堺と時械神を使ってプラチナまでは順調に行けたのですが、プラチナになった途端周りが強すぎてダイレクトアタックを受けました。いやー時間が溶けていってよろしくないですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message
すみません。今週号のおまけはお休みです。
:::
