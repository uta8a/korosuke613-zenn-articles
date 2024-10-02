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
- [@ajfAfg](https://zenn.dev/arjef)


:::

# news 📺

## アップグレードされたDockerプランの発表: よりシンプルに、より価値を、より優れた開発と生産性を実現  | Docker
https://www.docker.com/ja-jp/blog/november-2024-updated-plans-announcement/

## Notice of upcoming deprecations and changes in GitHub Actions services - GitHub Changelog
https://github.blog/changelog/2024-09-16-notice-of-upcoming-deprecations-and-changes-in-github-actions-services/

GitHub Actions に今後半年かけて入る変更についての告知。github.com のみに影響があり、GitHub Enterprise Server には影響なし。

1 つめは Incoming Webhook のレートリミット。2024 年 10 月 1 日から 1 リポジトリあたり、GitHub Actions に対する Incoming Webhook に 1250 リクエスト/10 秒のレートリミットが入ります。変更が入る前、bot が cron で動く場合に短時間で GitHub Actions へ Webhook を送ってレートリミットにかかる可能性もなくはないか、と考えていました。しかし今のところ弊社では問題になっていないので、GitHub も `no customers will be impacted by this change` と言っているように、ほとんどの方は気にする必要がない変更だと思います。

:::message
"Incoming Webhook" が何を指すのかはよく分かっていないです。チームでは GitHub Actions で webhook と言えば [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch) もしくは GitHub の内部的な webhook(例: `pull_request` イベントが発生したら、GitHub Actions のシステムの方にイベントの webhook が飛ぶ)の 2 つだろうと言う話になりました。"Incoming Webhook"についての記述はドキュメントや Discussion 等を探しても見つけられていません。おそらく内部的な用語なのではないかと推測しています。
何かご存知の方がいたらご一報よろしくお願いします。
:::

2 つめは [`actions/cache`](https://github.com/actions/cache) の v1, v2 の deprecation のお知らせ。2025 年 2 月 1 日から GitHub Actions のキャッシュストレージが新しいアーキテクチャに変更される影響で、v1, v2 が deprecation となります。アーキテクチャの変更以降に v1, v2 を使うとワークフローが失敗するようなのでアップデートを済ませておきましょう。actions/cache の最新は 2024 年 10 月 12 日執筆時点で v4.1.1 です。Copilot に GitHub Actions の補完を任せると古いバージョンを提案してくることがあるので、最新版の確認と、Renovate 等を用いた継続的な actions のバージョン更新をやっていきましょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 【Terraform】aws_iam_role リソースの inline_policy ブロックが非推奨になった
https://zenn.dev/terraform_jp/articles/tf-aws-iam-role-inline-policy-deprecation

## Now available for free on all public repositories: Copilot Autofix for CodeQL code scanning alerts - GitHub Changelog
https://github.blog/changelog/2024-09-18-now-available-for-free-on-all-public-repositories-copilot-autofix-for-codeql-code-scanning-alerts/

Copilot Autofix for Code QL code scanning alerts が Public リポジトリで無料で利用可能になりました。Private リポジトリでは Advanced Security が必要です。

この機能自体は Advanced Security 向けにすでに GA となっており、今回は public リポジトリで GA になったアナウンスです。GitHub Copilot を契約していなくても GitHub Copilot Autofix を無料で試せるという点で、まだ AI 機能を使ったことがない方はぜひ試してみると良いでしょう。(参考: [`You do not need a subscription to GitHub Copilot to use GitHub Copilot Autofix.`](https://docs.github.com/en/code-security/code-scanning/managing-code-scanning-alerts/responsible-use-autofix-code-scanning))

実際に試してみた様子を紹介します。

パブリックリポジトリの Settings から Security セクションの Code Scanning を選択します。

Code QL analysis を Setup して、Copilot Autofix を ON にします。Setup では Default を選択しました。

![autofix-codeql-setup](/images/productivity-weekly-20240925/autofix-codeql-setup.png)
*Code QL analysis を設定する画面*

脆弱なコードをテストで作ります。今回は [Arbitrary file access during archive extraction (”Zip Slip”) — CodeQL query help documentation](https://codeql.github.com/codeql-query-help/go/go-zipslip/) を取ってきました。

次のファイルをコミット。

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

このコードは Zip ファイルを開いた時に、Zip ファイル内に細工されたファイル名があれば任意のファイルに書き込みされてしまう可能性があります(ZipSlip)

コミットをプッシュすると Code QL が回ってアラートが出ました。(これは Code QL の機能であり、Copilot Autofix の機能ではない)
検出画面にある "Generate fix" が Copilot Autofix for Code QL の機能です。

![autofix-generate-fix](/images/productivity-weekly-20240925/autofix-generate-fix.png)
*Copilot Autofix の機能である、PRを生成するボタン*

ボタンを押すと改善案が提示されました。`..` を弾く形に修正されています。

![autofix-suggestion](/images/productivity-weekly-20240925/autofix-suggestion.png)
*Copilot Autofix によって提案された改善案*

改善案から Pull Request が作成できます。コミットメッセージ、Pull Request のメッセージも提案されます。

![autofix-pull-request](/images/productivity-weekly-20240925/autofix-pull-request.png)
*Copilot Autofix の提案から作成したPull Request*

コミットメッセージ含めてやってくれるのは便利だなと感じました。ぜひ利用してみてください。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Copilot Chat in GitHub.com is now aware of common support scenarios and GitHub’s documentation - GitHub Changelog
https://github.blog/changelog/2024-09-10-copilot-chat-in-github-com-is-now-aware-of-common-support-scenarios-and-githubs-documentation/

GitHub Copilot Chat in GitHub.com が GitHub のドキュメントやサポートシナリオを基にトレーニングされるようになりました。これにより、GitHub の機能に関する質問やトラブルシューティングへの回答精度の向上が見込めます。

お知らせには、「Copilot Individual で Copilot ナレッジベースを使用できるか？」、「SSH の設定方法」、「ジョブがビルド後のクリーンアップでスタックしキャンセルやタイムアウトを拒否する。どうすれば停止できるか」という質問が例で挙げられています。これらの質問はドキュメントを読めばわかることですが、Copilot へ問い合わせることですばやく知ることができるのは嬉しいですね。

似たような機能として、サポート問い合わせ時に先に Copilot へ問い合わせられる Copilot in GitHub Support という機能もあります[^copilot_support]。適材適所で使っていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^copilot_support]: [Copilot in GitHub SupportがGA！GitHubの仕様に関するわからないことをすばやく解決できやすくなったよ](https://zenn.dev/korosuke613/articles/copilot-in-github-support)

## Announcing the Public Beta of GitHub Copilot Extensions 🎉 - GitHub Changelog
https://github.blog/changelog/2024-09-17-announcing-the-public-beta-of-github-copilot-extensions-%F0%9F%8E%89/

ブログ版
Enhancing the GitHub Copilot ecosystem with Copilot Extensions, now in public beta - The GitHub Blog
https://github.blog/news-insights/product-news/enhancing-the-github-copilot-ecosystem-with-copilot-extensions-now-in-public-beta/

今年 5 月に limited public beta として提供が始まった GitHub Copilot Extensions が、今回 Public beta として提供開始になりました。利用には Copilot individual, Business, Enterprise いずれかのサブスクリプションが必要です。Business, Enterprise については Organization/Enterprise で Settings から許可が必要になっています。

Copilot Extensions は GitHub Copilot Chat に `@EXTENSION_NAME` で質問することで、`EXTENSION_NAME` に対応するデータソースを元に回答を生成できるような拡張機能です。実際には回答を生成する以外にも、拡張機能ごとに豊富な機能があります。例えば Docker の extension を入れて `@docker` を使って Chat へ入力すると、リポジトリを読んでコンテナ化する PR を自動で作成してくれるようです。(参考: [`docker/copilot-issues` のデモ動画](https://github.com/docker/copilot-issues))
[GitHub Marketplace > Copilot](https://github.com/marketplace?type=apps&copilot_app=true) から拡張機能の一覧が見られます。
簡単に言うと、GitHub Copilot Chat に対してサービス独自のドキュメント等の情報をデータソースとして足した RAG のような機能を簡単に利用・作成できる点が Copilot Extensions の特徴です。
今回、新しく Copilot Extensions Toolkit が提供されました。感覚的には VS Code の extensions を作るように、提供された SDK を用いて独自の GitHub Copilot Extensions を作成できるようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Google Workspace Updates: NotebookLM now available as an Additional Service
https://workspaceupdates.googleblog.com/2024/09/notebooklm-now-available-as-additional-service.html

Google NotebookLM が Early Access App から正式に Additional Service に追加されました。
NotebookLM は指定したデータを元に AI とチャットしたりノートを作成できるツールです。読み込めるデータは Google Doc, Google Slide, PDF, URL, テキストファイルとなっています。信頼できるソースを自分で指定して、そこを元に会話が行えて、保存しておきたい回答はノートに変換できます。また、ノートのタイトルを書いたら勝手に内容を埋めてくれる機能もあります。
今回正式に Additional Services に追加されたことで Google Workspace の管理者が設定を有効にすればメンバーも利用可能になったようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## ZennにDocswellのスライドが埋め込めるようになりました | What's New in Zenn
https://info.zenn.dev/2024-09-18-embed-docswell-slides

Zenn の記事、Book、Scrap に Docswell のスライドが埋め込み可能になりました。次の記法で埋め込むことができます。

```
@[docswell](https://www.docswell.com/s/ku-suke/LK7J5V-hello-docswell)
```

Docswell を使っている方には嬉しい機能ですね！試しに僕の Docswell のスライドを貼ってみます。

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

[GitHub CI/CD実践ガイド](https://gihyo.jp/book/2024/978-4-297-14173-8) の著者の方が Forkwell で発表された時の資料。GitHub CI/CD 実践ガイドの一部を紹介されていて、GitHub Actions を学ぶ意欲が湧く網羅性の高い発表でした。ぜひライブ配信のアーカイブも見てみてください。

個人的には GitHub Actions に関する知識は断片的になりがちなので、この資料のように CI/CD とは？や GitHub Actions ってセキュリティとしてはサプライチェーンのどこに位置づけられるんだっけ？といった俯瞰的な視点から GitHub Actions の位置付けを確認する観点の知識は貴重だなと感じました。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## terrraformを使ったGoのLambdaの管理 - カンムテックブログ
https://tech.kanmu.co.jp/entry/2024/09/17/130305

Terraform だけで AWS Lambda のビルド・デプロイを完結させる方法として、自作 Terraform プロバイダーを用いるアプローチが紹介されています。話のコンテキストがやや大きいので、このアプローチを説明する前に参考記事で取り組まれている課題を軽く説明します。AWS Lambda のリソースをデプロイする際、その Lambda 上で動作するプログラムは実行可能な形式で ZIP ファイルに詰める必要があります。実行可能な形式であればよいので、プログラムがスクリプト（e.g. Python）の場合はそのまま ZIP ファイルに詰めればよいのですが、例えば Go の場合はビルド結果を詰める必要があります。しかし、Terraform で AWS Lambda をデプロイするためのリソース [`aws_lambda_function`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/lambda_function) はビルドを行わないので、一連のインフラのデプロイにそのビルドを組み込むには工夫が必要です。命令セットアーキテクチャの差異により、ローカルのビルド結果は必ずしも Lambda 上では動かない点にも気を配る必要があります。リソース [`null_resource`](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) を用いれば任意のシェルコマンドを Terraform 内で実行できますが、この方法による問題点として参考記事では以下が挙げられています:

> - archive_fileがデータソースであるため、terraformを実行するたびにzipファイルが作成される *1
> - 特にCIやAtlantis*2でterraformを実行する場合、意図しないタイミングでLambdaの更新が実行される
> - npm installやpip installなどzipファイル作成前の処理の定義が複雑になる

この辺りの問題は開発者の頭を長年悩ませていて、様々なアプローチで解決が試みられています。例えば、[Terraform 外でビルドを除く Lambda の管理を行うツール lambroll を用いる方法](https://tech.toreta.in/entry/2020/12/05/000000)や、[Lambda（とそれに依存するリソース）を AWS SAM で定義する方法](https://zenn.dev/cybozu_ept/articles/migrate-from-serverless-framework)があります。参考記事の新しさは何と言っても自作プロバイダーを用いる点です。自作プロバイダーならリソースを作り直すタイミングをプロバイダーで制御できるため、必要なときだけ ZIP ファイルを作り直すことも容易に実現できます。使用技術が Terraform だけな点も嬉しいです。

ちょうど僕もこの問題に取り組んでいて、自作プロバイダーの道も考えていたので、先を越された悔しさと仲間を見つけた嬉しさの両方があります。このアプローチで気になった点としては、ZIP ファイル作成の前処理の定義方法の複雑さは変わっていないのではという点と、ビルドが必要かどうかの判断はビルドツールの責務ではという点です。自作プロバイダーの強みはリソースを作り直すタイミングをプロバイダーで制御できる点だと考えているので、既存のビルドツールといい感じに組み合わせられるとこの辺りを綺麗に解決可能なんじゃないかと感じています。

個人的にはまだ物足りなさを感じるものの、こういうのは手を動かして形にすることが一番尊くてえらいので、成果物を OSS や記事として公開していただけてめちゃくちゃ嬉しいです。僕の取り組みの中でもし今後自作プロバイダーの方向に進んだら真っ先に参考になる記事でした。僕も負けじとこの問題の解決を狙っていきたいです💪

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## GitHub Actions の実行履歴に基づいて自動で timeout-minutes を設定
https://zenn.dev/shunsuke_suzuki/articles/ghatm-auto-timeout-minutes

2024 年 6 月に公開された [GitHub Actions の timeout-minutes の linter 及び一括設定ツール](https://zenn.dev/shunsuke_suzuki/articles/github-actions-timeout-minutes) の一括設定ツール [ghatm](https://github.com/suzuki-shunsuke/ghatm) に新しく入った機能の紹介。

従来は `ghatm set -t 60` のように自分で分数を設定する必要がありましたが、今回入った機能によって過去の GitHub Actions の実行ログを読んで job に対し最適な分数を決めてくれるようになりました。

試しに自分のリポジトリに対して使ってみました。記事にあるように、一番長い時間 + 10 分が設定されてそうです。

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

私は過去に CI でパッケージのインストール先が存在しない時にパッケージマネージャが何度もリトライをするバグを引いたことがあり、その時に GitHub Actions の 6 時間上限を何度か超えてしまい、private リポジトリで使える個人アカウントの時間上限に達したことがあります。上限 6 時間は結構大きいので、timeout-minutes は適切に設定しておきたいですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 独自YAMLファイルをJSON SchemaでLSP補完する
https://songmu.jp/riji/entry/2024-09-23-lsp-support-of-custom-yaml-files-using-json-schema.html

GitHub Actions の YAML を書いている時にエディタがいい感じに補完を出してくれるのは、yaml-language-server が JSON Schema を元に支援してくれるおかげです。ではその JSON Schema はどこで管理されているのかというと JSON Schema Store で、今回のブログはその JSON Schema Store は結構カジュアルにマイナーOSS の Schema も PR 受け付けてくれるよ、という話。

実際にはブログにあるように、YAML ファイル冒頭で Schema を指定することで補完が効くようになるので、JSON Schema Store に登録せずとも個人範囲で補完の恩恵を受けることが可能です。ただ他の人も使う OSS では補完が効くと喜ばれそうなので、JSON Schema Store への登録も手段として覚えておきたいですね。

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/Songmu/podbard/main/schema.yaml
```

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## サイバー攻撃への備えを！「SBOM」（ソフトウェア部品構成表）を活用してソフトウェアの脆弱性を管理する具体的手法についての改訂手引を策定しました （METI/経済産業省）
https://www.meti.go.jp/press/2024/08/20240829001/20240829001.html

ソフトウェアを構成するコンポーネントの来歴の一覧である SBOM について、2023 年 7 月に公開された SBOM の手引き ver1.0 の後継として ver2.0 が出ました。この手引きには、ソフトウェアの脆弱性を管理する上での SBOM 利用に関する 3 つの項目として「SBOM 解説」、「導入効果とコストを考える上でのフレームワーク」、「委託先との契約周り」が盛り込まれています。
ver1.0 では SBOM の概要の解説がメインでしたが、ver2.0 では実際の契約はどうしたらいいのか、脆弱性を発見してから対応するまでのプロセスはどのように進めたら良いかといった実践的な内容が含まれています。運用を考える上でそれらのモデルが参考になるでしょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# tool 🔨

## Nushell - 型付きシェルの基本とコマンド定義
https://zenn.dev/estra/articles/nu-typed-shell

誰もが夢見る型付きシェルスクリプトの紹介記事です。言語仕様の解説だけでなく、利便性向上のために必要な環境構築法も紹介されています。Nushell の型システムには、File-sizes 型（値は `64mb` など）や Durations 型（値は `2min + 12sec` など）のような特徴的な型が存在するとのことです。TypeScript のような Any 型も存在しており、プログラム実行前に型検査できない部分は実行時に型検査します。また、部分的型付けが導入されているとのことで、例えば `{x: int}` というレコード型の値を引数として受け取る関数に `{x: 1, y: 1}` を与えられます。

型付きシェルスクリプトといえば [Cotowali](https://zenn.dev/zakuro9715/articles/mitou-2021-cotowali) とかもありますが、Nushell はインタラクティブシェルとしても使えるのが利点そうです。一方で、POSIX に準拠していない点は少し気になりました。

僕はプログラミング言語オタクなので Nushell の型システムが壊れていないか少し試してみたのですが、嬉しいことに壊れている箇所は見つけられませんでした。部分型付けと Mutable 変数どちらもサポートしている点で悪さができそう（Java では次のプログラムのように、型検査は通るが型の不整合起因のランタイムエラーが出る場合があります）だと思ったんですが、少し変なことをしようとすると Any 型に丸められて実行時に型検査されるので、この壁を突破するのはなかなか難しかったです。しっかり型安全そうなので、安心して Nushell プログラムが書けますね。

```java
class A { int x; A(int x){this.x = x;} }
class B extends A { int y; B(int x, int y){super(x); this.y = y;} }

B[] foo = {new B(1,1)};
A[] bar = foo;
bar[0] = new A(1);
System.out.println(foo[0].y); // ArrayStoreException
```

型システムの表現力がまだあまり高くなかったり、エコシステムも発展途上そうなので仕事で使うのは難しいかもしれませんが、プライベートで使い込んでいきたいプログラミング言語でした。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

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
