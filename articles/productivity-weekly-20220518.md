---
title: "Productivity Weekly (2022-05-18号)"
emoji: "🦖"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220518"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 74 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message 
**2022/05/28**
公開が大変遅くなってしまいすみません🙇
色々と忙しく、書く時間が全然取れませんでした。
:::

# news 📺

## github/gh-valet: Valet helps facilitate the migration of Azure DevOps, CircleCI, GitLab CI, Jenkins, and Travis CI pipelines to GitHub Actions.
https://github.com/github/gh-valet

既存の CI ツールから GitHub Actions へマイグレーションするための GitHub 謹製ツール、github/gh-valet が登場しました（private beta）。Azure DevOps、CircleCI、GitLab CI、Jenkins、Travis CI をサポートしています。

GitHub CLI 拡張として作られており、インストールは簡単です。しかし、現在は private preview となっているので、試すには GitHub Sales に問い合わせる必要があります（ちなみに僕はまだ使えていません）。

> Valet is currently private and customers must be onboarded prior to using the gh-valet CLI extension. Please reach out to GitHub Sales to inquire about being granted access.

ソースコードや README を読む感じ、どうやら OSS の gh-valet 自体はインターフェイスに過ぎないようで、変換などの処理は `ghcr.io/valet-customers/valet-cli` で行っているようです[^valet-cli]。そしてこのイメージの pull は private preview のリストに入っている人しか許可されていないということのようですね。なので、github/gh-valet のソースコードを書き換えて利用制限を回避するといったことはできなさそうです。

```text:unauthorized となる
❯ docker pull ghcr.io/valet-customers/valet-cli
Using default tag: latest
Error response from daemon: unauthorized
```

gh-valet の面白いところはただのワークフローファイル変換ツールではなさそうなところです。`gh valet audit` コマンドで変換元の CI サーバにアクセスし、パイプラインのサマリーを出力したり、`gh valet forecast` コマンドで過去のパイプラインの利用状況から GitHub Actions 移行後の利用状況を予測したりと、移行の助けとなる機能が入っています。

正直こういう移行ツールって結局大規模なワークフローに対応できないイメージが強いのです。しかし、gh-valet は CI サーバに情報を取りに行くことや、GitHub 内に Valet チームという専門のチームができている[^valet-team]ことから、将来的には大規模なワークフローであっても利用でしていけるのではないかと希望を持てました。

現在 private beta なので、気になる人は社内の GitHub 管理者に問い合わせましょう。
  
[^valet-cli]: https://github.com/github/gh-valet/blob/cc04762e8b37d77ca2e876ac8accc73d0f160321/src/Valet/App.cs#L7
[^valet-team]: https://github.com/github/gh-valet/blob/cc04762e8b37d77ca2e876ac8accc73d0f160321/README.md?plain=1#L9


## github/gh-gei: GitHub Enterprise Importer CLI
https://github.com/github/gh-gei

GitHub Enterprise Server、Azure DevOps から GitHub Enterprise Cloud へ Organization、リポジトリを移行するための GitHub 謹製ツール github/gh-gei が登場しました（public beta）。

GitHub CLI 拡張として作られており、簡単にインストールできます。

git リポジトリを移すだけであれば新しいリポジトリを作って古いリポジトリの対象ブランチを push するだけで良いのですが、それでは Issue やプルリクエストは引き継げませんでした。

gh-gei は移行元、移行先の Organization（またはリポジトリ）の権限を持ったトークンがあれば誰でも実行でき、Issue やプルリクエストに加え、Wiki やブランチ保護、その他諸々の情報を移行できます。どういったデータが移行できるかは [Migration support for GitHub Enterprise Importer - GitHub Docs](https://docs.github.com/en/early-access/github/migrating-with-github-enterprise-importer/understanding-github-enterprise-importer/migration-support-for-github-enterprise-importer) をご覧ください。

コミットにひもづくユーザは良いとして、Issue やプルリクエストにひもづくユーザはどうなるのかと思ったのですが、どうやら移行時に移行元のユーザは Mannequin という概念になるようです（[参考](https://docs.github.com/en/early-access/github/migrating-with-github-enterprise-importer/running-a-migration-with-github-enterprise-importer/reclaiming-mannequins)）。Mannequin については、GitHub の管理画面からどの GitHub ユーザーに対応するかを割り当てることができます。

これまでも似たような公式移行ツールはあったのですが、OSS でない、GHES の場合サーバー側でスクリプトを実行しないといけなかったため、サーバ管理者との連携が必須である、といったことから、正直なところ使いづらかったです。

まだ試せてないのですが、クラウド移行する上でなかなか便利なツールそうです。Organization 単位で移行できるのも嬉しいですね。詳しい移行方法等は[ドキュメント](https://docs.github.com/en/early-access/github/migrating-with-github-enterprise-importer)を参照ください[^gh-gei-doc]。

[^gh-gei-doc]: GHES->GHEC や GHEC->GHEC、GHEC->GHAE など、いろいろなパターンがあって最初混乱しました。

## Consistently allow GitHub Apps as exceptions to branch protection rules | GitHub Changelog
https://github.blog/changelog/2022-05-17-consistently-allow-github-apps-as-exceptions-to-branch-protection-rules/

GitHub の branch protection において、プルリクエストを強制する設定(`Restrict who can push to matching branches`)の例外に GitHub Apps を追加できるようになりました。これまではユーザとチームに対してのみ例外を許可できました。

この変更により、例えば、GitHub Apps を使って自動でコミットを main ブランチに追加させたいが、main ブランチはプルリクエストを強制したい...といったケースに対応できます。柔軟に安全に開発をしやすくなる変更ですね。覚えておきたいです。

## Release v1.22.0 · microsoft/playwright
https://github.com/microsoft/playwright/releases/tag/v1.22.0

Playwright v1.22.0 がリリースされ、React、Vue、Svelte に対するコンポーネントテスト機能が追加されました（プレビュー）。ページを開いてテストするのではなく、コンポーネント単独てテストできる機能で、例えば他のテスティングフレームワークだと cypress が対応しています（[Introduction | Cypress Documentation](https://docs.cypress.io/guides/component-testing/introduction#What-is-Component-Testing)）。

まだ試験的な機能であるため、インポート方法が通常と異なりますが、test メソッドに渡すコールバック関数の引数（関数）への引数としてコンポーネントを渡すことでインスタンス化できるため、使い勝手は良さそうです。詳しくは[ドキュメント](https://playwright.dev/docs/test-components)を読みましょう。正式機能となるのが楽しみですね。

# know-how 🎓

## 開発チームとプロダクトのデリバリープロセスを効率化＆成果を最大化する業務を担当しているチームを紹介します
https://engineering.linecorp.com/ja/interview/effective-team-and-delivery/

LINE さんによる、様々な開発組織やプロジェクトやプロダクトのデリバリープロセスをより効果的にするプロフェッショナル集団 Effective Team & Delivery 室（ETD 室）の紹介記事です。

主にはアジャイルコーチングやプロジェクトマネジメントのコンサルティングを行なっており、支援先の現場にその時必要だと考えるソリューションを提案することを大事にしているとのことです。

また直接的な支援だけでなく、大きく分けて以下の活動内容があるとのことです。

- 組織やプロジェクトへの直接的支援
- トレーニング、ドキュメント、ツールキットなどを通してノウハウの提供
- 社内コミュニティの創造、運営
- ETD 室自体のパフォーマンスを上げるための活動

この記事では、活動事例も紹介されており、具体的な業務内容がイメージしやすいです。

デリバリープロセスを効率化するためのチームということで技術的支援が多いのかと最初は思ったのですが、コーチングやチームビルディングなど、人や組織を成長させるところにも重きを置いているんだなと思いました。大まかな活動内容は生産性向上チームと近い部分があるなと思ったので参考にしたいです。


## ITエンジニア採用入門
https://zenn.dev/tbpgr/books/214cd4a0052a92

Web エンジニア、エンジニア採用担当を経験した方による IT エンジニア採用に関する情報をまとめた Zenn Books です。

そのボリュームに驚きます。2022/05/28 時点で 60000 文字を超えており、Chapter は 55 まであります。

大まかな目次としては、本の概要、前提知識、採用マーケティング、求人要件定義、求人票、カジュアル面談、ダイレクトリクルーティング、選考、候補者体験、その他＆活用事例となっています。範囲としては採用の始まりから終わりまでを網羅しています。

普段の開発のみをやっていければ幸せですが、現実はチームをスケールするために採用活動を欠かすことはできません。この本は効率よく効果的に採用活動を行うための参考にできそうです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Changelog summarized on user dashboards | GitHub Changelog](https://github.blog/changelog/2022-05-11-changelog-summarized-on-user-dashboards/)
    - GitHub の Changelog が GitHub のダッシュボードに表示されるようになりました
    - 何日前のトピックかがわかって良いです
  - [Node.js 16.x runtime now available in AWS Lambda | AWS Compute Blog](https://aws.amazon.com/jp/blogs/compute/node-js-16-x-runtime-now-available-in-aws-lambda/)
    - 先週の weekly でまことしやかにささやかれていた Lambda の Node.js 16 対応が正式に来ました
    - 先週の記事にも書いたので小ネタ枠
  - [Secret scanning: Dry runs for enterprise-level custom patterns | GitHub Changelog](https://github.blog/changelog/2022-05-12-secret-scanning-dry-runs-for-enterprise-level-custom-patterns/)
    - GitHub において、secret scanning のカスタムパターンの dry run が enterprise レベルでできるようになりました
  - [Dependabot alerts show all affected files for vulnerable function calls (Python Beta) | GitHub Changelog](https://github.blog/changelog/2022-05-16-dependabot-alerts-show-all-affected-files-for-vulnerable-function-calls-python-beta/)
    - [以前紹介した Dependabot alerts の脆弱性のある関数呼び出し検出機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20220420#dependabot-alerts-now-surface-if-your-code-is-calling-a-vulnerability-%7C-the-github-blog)について、1 つの呼び出し部分のみ強調されていましたが、全ての呼び出し部分が強調されるようになりました
- **know-how 🎓**
  - [GitHub Actions Job Summariesを使うならactions/github-scriptが便利](https://zenn.dev/jrsyo/articles/279fb2c65cd8b2)
    - [先日紹介した GitHub Actions のジョブサマリ機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20220511#supercharging-github-actions-with-job-summaries-%7C-the-github-blog)について、actions/github-script アクションを使うのが便利ですよという記事です
    - 普通は echo で `$GITHUB_STEP_SUMMARY` へ追記をしますが、actions/github-script アクションで JavaScript からサマリへの書き込みを行うことで複雑な内容を簡単に送れるようです
    - `@actions/core` に `core.summary` が生えているのは知らなかったです。使えそう
    - ただ、YAML 内に JS を書くのは数行程度にしないとメンテナンス性が低くなりそうなので気をつけたいです
    - どうでもいいけど YAML 内の JS にシンタックスハイライトが適用されているのに驚いた。どういう仕組みなんだ
- **tool 🔨**
  - [fugue/regula: Regula checks infrastructure as code templates (Terraform, CloudFormation, k8s manifests) for AWS, Azure, Google Cloud, and Kubernetes security and compliance using Open Policy Agent/Rego](https://github.com/fugue/regula)
    - terraform、cfn、k8s マニフェストのセキュリティ・コンプライアンスチェックツール
    - AWS、Azure、GCP に対応
    - ただ、既存ルールはそこまで多くなさそう https://regula.dev/rules.html
  - [ソフトウェアテスト関係者くらいしか使わない絵文字　第一弾 | グッズ | 株式会社MagicPod](https://www.trident-qa.com/goods/emoji01/)
    - Slack 絵文字に使える絵文字一覧
    - ソフトウェアテストに関する絵文字がたくさん
  - [Cloudflare D1 がヤバい](https://zenn.dev/mizchi/articles/cloudflare-d1)
    - 最近発表された Cloudflare D1 がなんかすごいらしい
    - CDN Edge 上に Read Replica がバラ撒かれた SQLite だとか
    - 気になる
  - [プログラマブルなMQTTベースのメッセージング](https://blog.cloudflare.com/ja-jp/announcing-pubsub-programmable-mqtt-messaging-ja-jp/)
    - Cloudflare が Pub/Sub サービスを開始するようです
    - 利用を開始したい人はプライベートベータに登録しましょう

# あとがき
今週号がとても遅くなってしまいすみません。最近プライベートも仕事も色々あって忙しかったです。そういえばシンウルトラマンを見てきました。ウルトラマンは子供の頃に当時 TV でやってたのを見てたくらいで、ほとんど詳しくありませんが、そんな自分でも楽しめました。見終わった後に色々調べると、結構元ネタがある描写が多かったみたいでもう 1 回見にいきたくなりましたね。

そういえば、Revue を試験的に始めてみました。Subscribe すると、Productivity Weekly 最新号が出たらメールが届きます。よかったら登録してみてください。
https://www.getrevue.co/profile/korosuke613_productivity_weekly

:::message
生産性向上チームの夏のインターンのエントリーが 6/3 から始まっています。興味がある方はぜひエントリーしてください。エントリー期間は 5/23〜6/3 までです。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::

