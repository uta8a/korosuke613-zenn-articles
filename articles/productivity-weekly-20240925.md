---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-09-25, 2024-09-18)
emoji: 🐸
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240925
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-09-25, 2024-09-18 合併号です。

今回が第 164 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
- [@uta8a](https://zenn.dev/uta8a)
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

:::

# news 📺

## アップグレードされたDockerプランの発表: よりシンプルに、より価値を、より優れた開発と生産性を実現  | Docker
https://www.docker.com/ja-jp/blog/november-2024-updated-plans-announcement/

## Notice of upcoming deprecations and changes in GitHub Actions services - GitHub Changelog
https://github.blog/changelog/2024-09-16-notice-of-upcoming-deprecations-and-changes-in-github-actions-services/

GitHub Actionsに今後半年かけて入る変更についての告知。github.comのみに影響があり、GitHub Enterprise Serverには影響なし。

1つめはIncoming Webhookのレートリミット。2024年10月1日から1リポジトリあたり、GitHub Actionsに対するIncoming Webhookに1250リクエスト/10秒のレートリミットが入ります。変更が入る前、botがcronで動く場合に短時間でGitHub ActionsへWebhookを送ってレートリミットにかかる可能性もなくはないか、と考えていました。しかし今のところ弊社では問題になっていないので、GitHubも `no customers will be impacted by this change` と言っているように、ほとんどの方は気にする必要がない変更だと思います。

2つめは [`actions/cache`](https://github.com/actions/cache) のv1, v2のdeprecationのお知らせ。2025年2月1日からGitHub Actionsのキャッシュストレージが新しいアーキテクチャに変更される影響で、v1, v2がdeprecationとなります。アーキテクチャの変更以降にv1, v2を使うとワークフローが失敗するようなのでアップデートを済ませておきましょう。actions/cacheの最新は2024年10月12日執筆時点で v4.1.1 です。CopilotにGitHub Actionsの補完を任せると古いバージョンを提案してくることがあるので、最新版の確認と、Renovate等を用いた継続的なactionsのバージョン更新をやっていきましょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 【Terraform】aws_iam_role リソースの inline_policy ブロックが非推奨になった
https://zenn.dev/terraform_jp/articles/tf-aws-iam-role-inline-policy-deprecation

## Now available for free on all public repositories: Copilot Autofix for CodeQL code scanning alerts - GitHub Changelog
https://github.blog/changelog/2024-09-18-now-available-for-free-on-all-public-repositories-copilot-autofix-for-codeql-code-scanning-alerts/

Copilot Autofix for Code QL code scanning alerts がPublicリポジトリで無料で利用可能になりました。PrivateリポジトリではAdvanced Securityが必要です。

この機能自体はAdvanced Security向けにすでにGAとなっており、今回はpublicリポジトリでGAになったアナウンスです。GitHub Copilotを契約していなくてもGitHub Copilot Autofixを無料で試せるという点で、まだAI機能を使ったことがない方はぜひ試してみると良いでしょう。(参考: [`You do not need a subscription to GitHub Copilot to use GitHub Copilot Autofix.`](https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/responsible-use-autofix-code-scanning))

実際に試したみた様子を紹介します。

パブリックリポジトリのSettingsからSecurityセクションのCode Scanningを選択します。

Code QL analysisをSetupして、Copilot AutofixをONにします。SetupではDefaultを選択しました。

![autofix-codeql-setup](/images/productivity-weekly-20240925/autofix-codeql-setup.png)
*Code QL analysis を設定する画面*

脆弱なコードをテストで作ります。今回は [Arbitrary file access during archive extraction (”Zip Slip”) — CodeQL query help documentation](https://codeql.github.com/codeql-query-help/go/go-zipslip/) を取ってきました。

以下のファイルをコミット

```go
package main
import (
	"archive/zip"
	"os"
	"path/filepath"
)
func unzip(f string) {
	r, _ := zip.OpenReader(f)
	for _, f := range r.File {
		p, _ := filepath.Abs(f.Name)
		// BAD: This could overwrite any file on the file system
		os.WriteFile(p, []byte("present"), 0666)
	}
}
```

このコードはZipファイルを開いた時に、Zipファイル内に細工されたファイル名があれば任意のファイルに書き込みされてしまう可能性があります(ZipSlip)

コミットをプッシュするとCode QLが回ってアラートが出ました。(これはCode QLの機能であり、Copilot Autofixの機能ではない)
検出画面にある "Generate fix" がCopilot Autofix for Code QLの機能です。

![autofix-generate-fix](/images/productivity-weekly-20240925/autofix-generate-fix.png)
*Copilot Autofix の機能である、PRを生成するボタン*

ボタンを押すと改善案が提示されました。`..` を弾く形に修正されています。

![autofix-suggestion](/images/productivity-weekly-20240925/autofix-suggestion.png)
*Copilot Autofix によって提案された改善案*

改善案からPull Requestが作成できます。コミットメッセージ、Pull Requestのメッセージも提案されます。

![autofix-pull-request](/images/productivity-weekly-20240925/autofix-pull-request.png)
*Copilot Autofix の提案から作成したPull Request*

コミットメッセージ含めてやってくれるのは便利だなと感じました。ぜひ利用してみてください。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Copilot Chat in GitHub.com is now aware of common support scenarios and GitHub’s documentation - GitHub Changelog
https://github.blog/changelog/2024-09-10-copilot-chat-in-github-com-is-now-aware-of-common-support-scenarios-and-githubs-documentation/

## Announcing the Public Beta of GitHub Copilot Extensions 🎉 - GitHub Changelog
https://github.blog/changelog/2024-09-17-announcing-the-public-beta-of-github-copilot-extensions-%F0%9F%8E%89/

ブログ版
Enhancing the GitHub Copilot ecosystem with Copilot Extensions, now in public beta - The GitHub Blog
https://github.blog/news-insights/product-news/enhancing-the-github-copilot-ecosystem-with-copilot-extensions-now-in-public-beta/

今年5月にlimited public betaとして提供が始まったGitHub Copilot Extensionsが、今回Public betaとして提供開始になりました。利用にはCopilot individual, Business, Enterpriseいずれかのサブスクリプションが必要です。Business, EnterpriseについてはOrganization/EnterpriseでSettingsから許可が必要になっています。

Copilot ExtensionsはGitHub Copilot Chatに `@EXTENSION_NAME` で質問を行うことで、`EXTENSION_NAME` に対応するデータソースを元に回答が生成できるような拡張機能です。実際には回答を生成する以外にも、拡張機能ごとに豊富な機能があります。例えばDockerのextensionを入れて `@docker` を使ってChatへ入力すると、リポジトリを読んでコンテナ化するPRを自動で作成してくれるようです。(参考: [`docker/copilot-issues` のデモ動画](https://github.com/docker/copilot-issues))
[GitHub Marketplace > Copilot](https://github.com/marketplace?type=apps&copilot_app=true) から拡張機能の一覧が見られます。
簡単に言うと、GitHub Copilot Chatに対してサービス独自のドキュメント等の情報をデータソースとして足したRAGのような機能を簡単に利用・作成できる点がCopilot Extensionsの特徴です。
今回、新しくCopilot Extensions Toolkitが提供されました。感覚的にはVS Codeのextensionsを作るように、提供されたSDKを用いて独自のGitHub Copilot Extensionsを作成することができるようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Google Workspace Updates: NotebookLM now available as an Additional Service
https://workspaceupdates.googleblog.com/2024/09/notebooklm-now-available-as-additional-service.html

Google NotebookLMがEarly Access Appから正式にAdditional Serviceに追加されました。
NotebookLMは指定したデータを元にAIとチャットしたりノートを作成できるツールです。読み込めるデータはGoogle Doc, Google Slide, PDF, URL, テキストファイルとなっています。信頼できるソースを自分で指定して、そこを元に会話が行えて、保存しておきたい回答はノートに変換できます。また、ノートのタイトルを書いたら勝手に内容を埋めてくれる機能もあります。
今回正式にAdditional Servicesに追加されたことでGoogle Workspaceの管理者が設定を有効にすればメンバーも利用可能になったようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## ZennにDocswellのスライドが埋め込めるようになりました | What's New in Zenn
https://info.zenn.dev/2024-09-18-embed-docswell-slides

Zennの記事、Book、ScrapにDocswellのスライドが埋め込み可能になりました。以下の記法で埋め込むことができます。

```
@[docswell](https://www.docswell.com/s/ku-suke/LK7J5V-hello-docswell)
```

Docswellを使っている方には嬉しい機能ですね！試しに僕のDocswellのスライドを貼ってみます。

```
@[docswell](https://www.docswell.com/s/uta8a/KYDW9P-2024-08-22-github-actions-tips)
```

@[docswell](https://www.docswell.com/s/uta8a/KYDW9P-2024-08-22-github-actions-tips)

正しく表示できているでしょうか？

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# know-how 🎓

## 持続可能なソフトウェア開発を支える『GitHub CI/CD実践ガイド』 - Speaker Deck
https://speakerdeck.com/tmknom/github-cicd-book

ライブ配信の方: https://www.youtube.com/watch?v=tU4oUp4Ym08

[GitHub CI/CD実践ガイド](https://gihyo.jp/book/2024/978-4-297-14173-8) の著者の方がForkwellで発表された時の資料。GitHub CI/CD実践ガイドの一部を紹介されていて、GitHub Actionsを学ぶ意欲が湧く網羅性の高い発表でした。ぜひライブ配信のアーカイブも見てみてください。

個人的にはGitHub Actionsに関する知識は断片的になりがちなので、この資料のようにCI/CDとは？やGitHub Actionsってセキュリティとしてはサプライチェーンのどこに位置づけられるんだっけ？といった俯瞰的な視点からGitHub Actionsの位置付けを確認する観点の知識は貴重だなと感じました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## terrraformを使ったGoのLambdaの管理 - カンムテックブログ
https://tech.kanmu.co.jp/entry/2024/09/17/130305

## GitHub Actions の実行履歴に基づいて自動で timeout-minutes を設定
https://zenn.dev/shunsuke_suzuki/articles/ghatm-auto-timeout-minutes

2024年6月に公開された [GitHub Actions の timeout-minutes の linter 及び一括設定ツール](https://zenn.dev/shunsuke_suzuki/articles/github-actions-timeout-minutes) の一括設定ツール [ghatm](https://github.com/suzuki-shunsuke/ghatm) に新しく入った機能の紹介。

従来は `ghatm set -t 60` のように自分で分数を設定する必要がありましたが、今回入った機能によって過去のGitHub Actionsの実行ログを読んでjobに対し最適な分数を決めてくれるようになりました。

試しに自分のリポジトリに対して使ってみました。記事にあるように、一番長い時間 + 10分が設定されてそうです。

```shell
$ ghatm set -repo OWNER/REPO -auto
```

```diff
 jobs:
   actions-timeline:
+    timeout-minutes: 11
     needs: [publish]
     runs-on: ubuntu-latest

   publish:
+    timeout-minutes: 17
     runs-on: ubuntu-latest
```

私は過去にCIでパッケージのインストール先が存在しない時にパッケージマネージャが何度もリトライをするバグを引いたことがあり、その時にGitHub Actionsの6時間上限を何度か引いてしまい、privateリポジトリで使える個人アカウントの時間上限に達したことがあります。上限6時間は結構大きいので、timeout-minutesは適切に設定しておきたいですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 独自YAMLファイルをJSON SchemaでLSP補完する
https://songmu.jp/riji/entry/2024-09-23-lsp-support-of-custom-yaml-files-using-json-schema.html

GitHub ActionsのYAMLを書いている時にエディタがいい感じに補完を出してくれるのは、yaml-language-serverがJSON Schemaを元に支援してくれるおかげです。ではそのJSON Schemaはどこで管理されているのかというとJSON Schema Storeで、今回のブログはそのJSON Schema Storeは結構カジュアルにマイナーOSSのSchemaもPR受け付けてくれるよ、という話。

実際にはブログにあるように、YAMLファイル冒頭でSchemaを指定することで補完が効くようになるので、JSON Schema Storeに登録せずとも個人範囲で補完の恩恵を受けることが可能です。ただ他の人も使うOSSでは補完が効くと喜ばれそうなので、JSON Schema Storeへの登録も手段として覚えておきたいですね。

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/Songmu/podbard/main/schema.yaml
```

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## サイバー攻撃への備えを！「SBOM」（ソフトウェア部品構成表）を活用してソフトウェアの脆弱性を管理する具体的手法についての改訂手引を策定しました （METI/経済産業省）
https://www.meti.go.jp/press/2024/08/20240829001/20240829001.html

ソフトウェアを構成するコンポーネントの来歴の一覧であるSBOMについて、2023年7月に公開されたSBOMの手引きver1.0の後継としてver2.0が出ました。この手引きには、ソフトウェアの脆弱性を管理する上でのSBOM利用に関する3つの項目として「SBOM解説」、「導入効果とコストを考える上でのフレームワーク」、「委託先との契約周り」が盛り込まれています。
ver1.0ではSBOMの概要の解説がメインでしたが、ver2.0では実際の契約はどうしたらいいのか、脆弱性を発見してから対応するまでのプロセスはどのように進めたら良いかといった実践的な内容が含まれています。運用を考える上でそれらのモデルが参考になるでしょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# tool 🔨

## Nushell - 型付きシェルの基本とコマンド定義
https://zenn.dev/estra/articles/nu-typed-shell

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
