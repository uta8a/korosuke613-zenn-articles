---
title: "Productivity Weekly (2023-04-26号, 2023-04-12号)"
emoji: "🐓"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230426"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-04-26, 2023-04-12 合併号です。

:::message
2023-04-19 の回は DevOpsDays Tokyo 2023 と被ってて開催されませんでした。
:::

今回が第 111 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## API requests are available via audit log streaming - Public Beta | GitHub Changelog
https://github.blog/changelog/2023-04-03-api-requests-are-available-via-audit-log-streaming-public-beta/

先日利用可能になった [GitHub Enterprise Cloud の Audit Log Streaming](https://zenn.dev/korosuke613/articles/productivity-weekly-20220126#audit-log-streaming-is-generally-available-%7C-github-changelog)において、API リクエストのログを追加できるようになりました（public beta）

Enterprise の private/internal リポジトリに対する REST API 呼び出しがストリーミングされます。
これにより、API の rate limit 調査やフォレンジック調査などに役立ちます。

なお、API リクエストのログストリーミングは設定から有効化する必要があります。管理者の皆様は有効化を検討しましょう。

## Announcing New Tools for Building with Generative AI on AWS | AWS Machine Learning Blog
https://aws.amazon.com/jp/blogs/machine-learning/announcing-new-tools-for-building-with-generative-ai-on-aws/

[以前紹介した、生成型 AI のスーパーパワーで次のコードを提案する Amazon CodeWhisperer](https://zenn.dev/korosuke613/articles/productivity-weekly-20220706#now-in-preview-%E2%80%93-amazon-codewhisperer--ml-powered-coding-companion-%7C-aws-news-blog) が GA になりました。

コードの提案だけでなく、開いているコードに対するセキュリティスキャンも機能に含まれています。
プランは Individual（個人向け）と Professional の 2 つがあります。

気になる料金ですが、個人ユーザーはなんと**無料**で利用可能です。セキュリティスキャンについては月 50 回までという制約があります。また、AWS のアカウントも不要です（メールアドレスで AWS Builder ID というアカウントを作成する必要はあります）。

さっそくクラメソさんが記事にしていました。

- [Amazon CodeWhisperer が GA となりました | DevelopersIO](https://dev.classmethod.jp/articles/amazon-codewhisperer-ga/)

気になる Individual と Professional との違いが書かれていたり、利用状況データの送信周りの話が書かれていたり、実際に使ってみる話が載っていたりします。

Professional 機能はどこまで差別化出来るものなのかもう少し評価したいところです。

もっと有名な似たようなサービスの GitHub Copilot と比べると、無料で使えることやセキュリティスキャンが付随するところが CodeWhisperer の良いところでしょうか。

実際に使ってみた感想が次のとおりです。
- GitHub Copilot と比べてもっさりしてると感じた
- GitHub Copilot は Markdown や未対応言語にも補完を出してくれるが、CodeWhisperer は対応言語にしか補完を出してくれない
  - [対応言語一覧](https://docs.aws.amazon.com/codewhisperer/latest/userguide/language-ide-support.html)
- セキュリティスキャンは対応言語がそんなに多くないと思った
  - TypeScript、ShellScript は非対応

生成型 AI によるコーディング支援が活発化してきててワクワクしますね。無料で利用できるので興味のある人は使ってみましょう。

:::message
セキュリティスキャンについてはどの言語に対応しているものなのか文書で見つけられなかったのですが、セキュリティスキャンの裏側は Amazon CodeGuru とされています。

> CodeWhisperer's security scan is integrated with Amazon CodeGuru. 
> https://docs.aws.amazon.com/codewhisperer/latest/userguide/security-scans.html

おそらく Amazon CodeGuru Reviewer Security Detector の対応言語が CodeWhisperer の対応言語になると考えられます。

[CodeGuru の FAQ](https://aws.amazon.com/jp/codeguru/faqs/) によると、Java と Python しか対応してなさそうでした。

> Q: Amazon CodeGuru Reviewer Security Detector でサポートされているプログラミング言語は何ですか?
>
> Amazon CodeGuru Reviewer Security Detector は、Java 8 から Java 11、Python 3 以上をサポートします。 

ただ、JavaScript のファイルを開いてセキュリティスキャンすると普通にスキャンしてくれました。しかし、TypeScript は未対応でした。
対応言語一覧にある「In terms of the quality of the training data, the programming languages with the most support are:」に該当する 5 つの言語はセキュリティスキャンできるというわけでもなさそうです。（TypeScript は 5 つの言語に含まれています。）

対応言語がいまいちわかんないですね。
セキュリティスキャン機能についてはおまけ程度の機能かもしれません。

:::

## Introducing Repository Rules Public Beta | GitHub Changelog
https://github.blog/changelog/2023-04-17-introducing-repository-rules-public-beta/

GitHub においてブランチ保護を今後置き換えそうな機能、Repository Rules が public beta になりました。

branch protection rules や protected tags よりも柔軟に、そして強力に保護をかけることが可能です。また、GitHub Enterprise Cloud の顧客であれば Organization 全体でルールを適用できます。

また、従来の branch protection rules でできたような設定の他に、コミット名やブランチ名にも制限をかけることができるため、conventional commit を強制するなんてことも可能です（ただし GHEC のみ）。

実際に使ってみてどんな感じだったかをスクラップに書いています。どんな感じか興味ある方は読んでみてください。

- [GitHub の Repository Rules を試してみる](https://zenn.dev/korosuke613/scraps/84794d9baed038)

特に嬉しいのはやっぱり GHEC 契約者ですかね。ブランチやタグの保護を Organization で共通化できるのは嬉しいです。また、ルールをいきなり適用するのではなく、現状ルールに違反しているアクションがあるかどうかなどをチェックできる Evaluate モードがあるのが組織向けでいいですね。

活用していきたいです。

## npm provenance public beta | GitHub Changelog
https://github.blog/changelog/2023-04-19-npm-provenance-public-beta/

npm registry において、npm パッケージがどこで何をソースに作られたかを意味する provenance を付与した状態で npm registry にパッケージを公開できるようになりました（public beta）。

:::message
provenance 自体は起源とか由来っていう意味らしい[^provenance_imi]ですが、個人的には出自とか血統証明書って考える方がしっくりきました。

> 「出自」とか？

https://twitter.com/gorohash/status/1651239846730686464

> お〜
> 来歴よりもしっくりきますね！
>
> 現実のものだと血統証明書って考えるとわかりやすいかも
>
> 「このnpmパッケージは、かの著名リポジトリのソースコードを元に新頼あるGitHub Actionsで生まれた由緒正しいパッケージなのじゃ...」
 
https://twitter.com/Shitimi_613/status/1651396096630095872

[^provenance_imi]: ソースは weblio。https://ejje.weblio.jp/content/provenance
:::

OIDC を使って provenance に当たる情報を Sigstore のサーバに送り、返ってくる署名の証明書をパッケージと一緒にレジストリに送るという仕組みらしいです。

GitHub Actions が対応しているということで、サンプルのワークフローが載っています。おそらく OIDC 対応してる CI/CD サービスなら対応できると思うのですが、現状 GitHub Actions 以外はどこまで対応してそうなのかは分かりませんでした（誰か調べてほしい）。

方法としては OIDC を使えるようにして `npm publish` に `--provenance` をつけるだけでできるので、割と簡単です。

実際に試してみました。

https://twitter.com/Shitimi_613/status/1653232912043765760

- リポジトリ: [korosuke613/demo-release-please-for-npm](https://github.com/korosuke613/demo-release-please-for-npm)
- npm: [demo-release-please-for-npm](https://www.npmjs.com/package/demo-release-please-for-npm)

行った変更は次です。

- [ci: describe provenance in npm](https://github.com/korosuke613/demo-release-please-for-npm/commit/fc87557511c732a08fefc2b065399f11f18ec348)
  - `--provenance` の付与
- [ci: fix release permissions](https://github.com/korosuke613/demo-release-please-for-npm/commit/c647918ca80f6ade1c586d96778bb90ab265d30d)
  - ワークフローの `permissions.id-token` で `write` を指定し忘れたので修正
- [ci: fix release provenance](https://github.com/korosuke613/demo-release-please-for-npm/commit/d59303346be26740c8a6c5b217fbc414cb79a9af)
  - `package.json` の `repository.url` にリポジトリ url を指定する必要があったので修正
  - `repository.url` に言及したエラー 
    > npm ERR! 422 Unprocessable Entity - PUT https://registry.npmjs.org/demo-release-please-for-npm - Failed to validate repository information: package.json: "repository.url" is "undefined", expected to match "git+https://github.com/korosuke613/demo-release-please-for-npm" from provenance

パッケージのページには次の情報が載ります。

- ビルドサマリーのページへのリンク (`View build summary`)
- ビルド時のコミットへのリンク (`Source Commit`)
- ビルドに使ったワークフローファイルへのリンク (`Build File`)
- rekor という Sigstore の情報を見るサイト（？）(`Public Ledger`)

簡単に血統証明書を残すことができるので、とりあえず設定してみても良いかと思います。気になる人は試してみてください。

## GitHub Actions: Create and share your own deployment protection rules for safe and controlled deployments | GitHub Changelog
https://github.blog/changelog/2023-04-20-github-actions-create-and-share-your-own-deployment-protection-rules-for-safe-and-controlled-deployments/

GitHub Environments の protection rules において、GitHub Apps によるデプロイの承認/拒否ができるようになりました(public beta)。GHEC のみ対応しているようです。

これにより、外部サービスの診断結果に応じてデプロイをコントロールできるようになり、リスクが軽減できるようになります。
すでにいくつかのパートナー企業がデプロイ保護のための GitHub Apps をリリースしており、すぐにそれらを利用できます（もちろん対象サービスが使える必要があります）。また、自ら GitHub Apps を作って独自の保護の仕組みを作ることもできます。

GitHub Blog の [Announcing GitHub Actions Deployment Protection Rules, now in public beta | The GitHub Blog](https://github.blog/2023-04-20-announcing-github-actions-deployment-protection-rules-now-in-public-beta/#partner-implementations) によると、次のサービスがデプロイ保護に対応しています。

- Datadog
- Honeycomb
- New Relic
- NodeSource
- Sentry
- ServiceNow

サービスによって確認する内容は異なりますが、ユースケースに合うものが見つかれば使いたいですね。
自ら GitHub Apps を作る場合、デプロイ保護の仕組みを Organization で共通化することもできます。

デプロイしても良いかの判断を機械に任せやすくなり、更なるデプロイの自動化をができそうですね。

## GitHub Actions: Faster macOS runners are now available in open public beta! | GitHub Changelog
https://github.blog/changelog/2023-04-24-github-actions-faster-macos-runners-are-now-available-in-open-public-beta/

[以前紹介した GitHub Actions の強い macOS ランナー](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230308#github-actions%3A-introducing-faster-github-hosted-x64-macos-runners-%7C-the-github-blog)が public beta になりました。

通常の macOS ランナーは 3 コアですが、今回広く使えるようになった XL サイズのランナーは 12 コアです。

実際に `system_profiler SPHardwareDataType` でスペックを確認したところ、次のようになりました。

:::details `macos-12` と `macos-12-xl` のスペックの比較


```text:macos-12
$ system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: Mac
      Model Identifier: VMware7,1
      Processor Name: Unknown
      Processor Speed: 3.33 GHz
      Number of Processors: 1
      Total Number of Cores: 3
      L2 Cache (per Core): 256 KB
      L3 Cache: 12 MB
      Memory: 14 GB
...
```

```text:macos-12-xl
$ system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: Mac mini
      Model Identifier: Macmini6,2
      Processor Name: Unknown
      Processor Speed: 3.19 GHz
      Number of Processors: 1
      Total Number of Cores: 12
      L2 Cache (per Core): 256 KB
      L3 Cache: 12 MB
      Memory: 30 GB
...
```
:::

気になる料金ですが、[Billing のドキュメント](https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates)によると、コア数に比例して 4 倍の価格となるようです。

|OS|コア数|価格（USD/分）|
|---|---|---|
|macOS|3|$ 0.08|
|macOS|12|$ 0.32|

スペックが上がって iOS のテストやビルドなどの時間を大幅に短縮できるかもしれませんね。
気になる方はぜひ通常盤と比較してみてください。

# know-how 🎓

## Node.js v20 の主な変更点 - 別にしんどくないブログ
https://shisama.hatenablog.com/entry/2023/04/24/083000

Node.js の新メジャーバージョンがリリースされる時期ですね。
というわけで、毎半期恒例の shisama さんによる Node.js メジャーバージョンの主な変更点解説です。今回は Node.js v20 です。

色々気になる変更が書かれていますが、やはり気になるのは Deno のような新しいパーミッションモデル(experimental)でしょうか。
`--allow-fs-read` を引数にしないとファイルの読み込みができない、みたいな機能です。

Deno が出た頃から個人的にはとても好きな機能で、権限を制限することで悪意ある処理を未然に防げやすいので Node.js にも欲しいと思っていました。

新しいパーミッションモデルの機能に関しては次の記事も参考になります。こちらにはモジュール単位で権限を指定できる機能についても載っています。

- [Node.js v20.0.0 の新機能 Process-based Permissions](https://zenn.dev/cybozu_frontend/articles/nodejs-model-based-permissions)

また、Node.js v18 から experimental として追加されていた Node.js 組み込みのテストランナー `node:test` が stable になったというのも気になるトピックでした。
Jest などのインストール・設定をがんばらなくても使える組み込みテストランナーというのは個人的には小規模に使いたい場合に嬉しいです。
v18 の頃と比べてどういう機能が追加されたかなどは、ブログ記事の方に載っています。

毎度思いますが、毎回メジャーアップデートの主な変更点をわかりやすく解説してくれるのはとても助かりますね。
他にもたくさんの変更点がブログの方に載っているので、ぜひ記事の方をチェックしてください。

## GitHub Actions Self-Hosted Runner Observability and Monitoring
https://cbui.dev/github-actions-self-hosted-runner-observability-and-monitoring/

ちょっと古いですが、GitHub Actions Self-hosted Runner ネタです。

GitHub Actions セルフホストランナーのオブザーバビリティ（可観測性）を高めるぞという内容になっています。

著者は Venmo という決済サービスの会社で Jenkins から GitHub Actions への移行を進めたという方です。セルフホストランナーの課題として、ランナーを監視するための機能が用意されていないという背景があったそうです。
そのため、どのようにオブザーバビリティを高めていったかという方法がこの記事には書かれています。

最初に github-actions-exporter という GitHub Apps の API を定期的に叩いて prometheus で見れるようにする OSS の紹介がされています。この OSS は GitHub API を定期的に叩き、ランナーやワークフローのメトリクスを取得するため、API を叩く回数が多いという問題があったそうです。

次に試したのがランナーをインストールするインスタンスに Datadog エージェントをインストールし、CPU やメモリ使用率のメトリクスを取るという方法でした。
また、ランナーのログディレクトリに新しいログがあるかどうかを監視することで、ワークフロー割り当て状況のメトリクスも取得できるようになったようです。
これらのメトリクスを分析することで、ワークフローの使用スペックに対してオーバースペックなランナーを使っている場合に警告を飛ばすということも可能になったとのことです。

また、現在は workflow_job イベントの解析でどれくらいのジョブがキューされているかやジョブの実行までにどれくらいの時間がかかるかがわかるようになったという話も書かれています（こちらでいい感じに解析する必要はやはりあります）。

最後に定期実行ワークフローを使ってシステムが機能しているかを監視する synthetic monitoring の仕組みについての話がされています。

GitHub Actions Self-hosted Runner の可観測性についての方法がいくつかまとまった面白い記事でした。特にオーバースペックなランナーを検知するという手法は真似したくなりました。

また、この記事を読んでる際に、実はセルフホストランナーには起動時・起動後にスクリプトを流す機能が追加されていることを思い出しました。次の記事はとてもその機能についてためになります。

- [GitHub Actionsセルフホストランナーのhookスクリプトを試す](https://zenn.dev/dena/articles/20220808_github_actions_hooks)

すっかり忘れていました。これを使うことでもっと簡単にメトリクスを取得できるかもしれません。探求したいですね。

## S3 ストレージクラスの選択に迷った時みるチャートを作ってみた（2023年度版） | DevelopersIO
https://dev.classmethod.jp/articles/should_i_choice_s3_storage_class_2023/

Amazon S3 には多くのストレージクラスがあります。毎回どれを使おうかなと迷いますが、いかんせんいろんな差分があってパッとは出てきません。

このクラメソさんの記事には、どのストレージクラスを使うと良さそうかを素早く判断できるいい感じのチャートが書かれています。また、それぞれのストレージクラスの説明も載っています。

こういうまとめが上がると嬉しいですね。ストレージクラスの判断に大いに役立ちそうです。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [AWS Lambdaでストリーミングな応答が可能になりました | DevelopersIO](https://dev.classmethod.jp/articles/aws-lambda-can-streaming-response/)
    - AWS Lambda の Node.js runtime において、`Transfer-Encoding: chunked` なレスポンスができるようになりました
    - これまでは Lambda の処理が完了するまでレスポンスを飛ばすことが難しかったですが、今回の変更で徐々にレスポンスを返すことが可能となりました
    - また、この方式だとレスポンスサイズの上限が 20MB まで拡張（通常は 6MB まで）されます
    - Weekly 参加者の声「ただし ALB 経由ではできないとか、Lambda 統合 API Gateway ではできないとか、追加料金がかかるとか……なんか色々大変っぽいです。」
  - [Export your sponsorable dependencies and sponsor many in one checkout | GitHub Changelog](https://github.blog/changelog/2023-04-04-export-your-sponsorable-dependencies-and-sponsor-many-in-one-checkout/)
     - GitHub において、自分が依存しがちなスポンサーとなるユーザを見つけやすくなりました
     - たぶん dependency graph の機能あたりで出してると思います
     - お世話になっている方がいたら寄付を検討してみましょう
  - [Redesigned navigation available in Public Beta | GitHub Changelog](https://github.blog/changelog/2023-04-05-redesigned-navigation-available-in-public-beta/)
    - GitHub のナビゲーションバーの新デザインが公開されました(public beta)
    - issues や pull requests へのジャンプはしづらくなったように見えるけど、シンプルなのは嫌いじゃないです
  - [GitHub Actions: macOS 13 is now available | GitHub Changelog](https://github.blog/changelog/2023-04-24-github-actions-macos-13-is-now-available/)
    - GitHub Actions において macos 13 ランナーが使えるようになりました
    - また、スペックの高い XL なランナーもすでに用意されています
  - [GitHub Actions Importer Feature Flags | GitHub Changelog](https://github.blog/changelog/2023-04-24-github-actions-importer-feature-flags/)
    - GitHub Actions Importer の変換時の github actions の機能を feature flag でオンオフできるようになりました
    - 2023/04/26 時点だと、設定項目は 4 つでした
      ```
      gh actions-importer configure --features
      ? Which features would you like to configure?: <スペース> で選択、<ctrl+a> ですべて選択、<ctrl+i> で選択を反転
      ◯ actions/cache
      ◯ composite-actions
      ◯ reusable-workflows
      ◯ workflow-concurrency-option-allowed
      ```
    - また、全部デフォルトで enable でした
  - [One Click Into GitHub Codespaces | GitHub Changelog](https://github.blog/changelog/2023-04-24-one-click-into-github-codespaces/)
    - GitHub Codespaces にいくつかの新機能が追加されました
      - Codespaces 作成時に推奨する secret の追加をうながす機能
      - Codespaces の設定共有用リンクを生成できるように
      - dev container 設定ファイルに名前をつけられるように
      - `,` キーでリポジトリから Codespaces に飛べるように
    - 推奨シークレットの追加をうながす機能は嬉しいかもです
  - [ChatGPTに“シークレットモード”機能追加　企業向けプランも計画中 - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2304/26/news075.html)
    - ChatGPT に履歴が残らないシークレットモードが追加されたり、企業向けプランが計画中らしいです
    - 企業として契約できるのは嬉しいですね
- **know-how 🎓**
  - [GitHub に漏れ出た内部コードを探す ~ 上場企業 3900社編 ~](https://brutalgoblin.hatenablog.jp/entry/2023/04/05/164920)
    - GitHub に漏れ出た社外秘なコードを探すという記事です
    - どのように探していくかの詳細が載ってて面白いです
    - 自社に特化させて同じ方法で定期的にチェックすることで社外秘コードが漏洩していないかを定期的にチェックできそうです
      - そこまでやるか感は否めない。会社の性質によりそう
  - [GitHub Copilot 導入して1ヶ月経ったので振り返ってみた - Gaudiy Tech Blog](https://techblog.gaudiy.com/entry/2023/04/20/162647)
    - 実際に製品開発に GitHub Copilot を 1 ヶ月使ったが、社内ではどんな感じかという記事です
    - ちゃんとレビューしないとという感じだけど、やはり便利そうですね
- **tool 🔨**
  - [5分の設定でAWSの料金を最大57％カットしてくれるサービス「Usage」の仕組み＆レビュー - GIGAZINE](https://gigazine.net/news/20230408-usage/)
    - Amazon EC2 のオンデマンドインスタンスを、リザーブドインスタンスみたいに年間固定契約せずに、リザーブドインスタンスと同等の料金で使えるようにするサービスです
    - 削減できた料金の 20% を手数料として Usage に支払うという仕組みのため、基本的に損することがなさそうです
    - > 要するに、Usageは3年固定の料金で仕入れたEC2インスタンスを再販するサービスというわけ
    - ということらしいです
    - サービス化してるってことは多分規約的には大丈夫なのでしょうが、このサービスがちゃんと使われないとサービス提供者は赤字になるため、実際どれくらいの利用者が来るかってのは重要かもしれません（知らんけど）
    - 面白いサービスですが、なかなか本番利用したい気持ちにならないのが不思議です。個人で使う分にはいいかも
  - [TabbyML/tabby: Self-hosted AI coding assistant](https://github.com/TabbyML/tabby)
    - セルフホストが可能なオープンソースの GitHub Copilot 代替らしいです
    - NVIDIA GPU が必要とのこと
    - どっから学習してるのかはいまいちわかりませんでした
    - Docker イメージのサイズは 12.61GB あるので、学習自体はされてそうです
      - https://hub.docker.com/r/tabbyml/tabby/tags
      - モデルは公開されてなさそう。ていうかそんなに学習されてなさそう。
        - [Model open-source releases · Issue #51 · TabbyML/tabby](https://github.com/TabbyML/tabby/issues/51)

# あとがき
遅くなりましたが 2023-04-26, 2023-04-12 合併号でした。1 週間飛んだのもあって実質 3 週分となってしまったため、GitHub のリリースが多すぎてほとんど GitHub の話になっちゃいましたね。
皆さんはゴールデンウィークはいかがお過ごしでしょうか？僕は野球の試合見たりキャンプしたりします。楽しみですね。

そういえばサイボウズの夏のインターンシップのエントリーが開始されましたね（唐突）
今回は 15 コースもあります。多い。
僕のいる生産性向上チームのコースは募集開始が 5/15 からなのでまだ始まっていません。

https://cybozu.co.jp/company/job/recruitment/intern/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
