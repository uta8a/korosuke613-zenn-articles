---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-07-10)
emoji: 🔊
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240710
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-07-10 単独号です。

今回が第 159 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub Issues & Projects - GraphQL and webhook support for project status updates and more! - The GitHub Blog
https://github.blog/changelog/2024-06-27-github-issues-projects-graphql-and-webhook-support-for-project-status-updates-and-more/

GitHub Project の webhook で対応するイベントが増えたり、中身の JSON が少し改良されたりしたようです。

1 つは最近追加された [Status updates](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/sharing-project-updates) に対応する webhook が追加されたという内容で、もう 1 つは Project 内のアイテムが更新されたときの webhook についてカスタムフィールドの情報が含まれるようになりました。

個人的には後者のカスタムフィールドの情報が含まれるようになったことが嬉しいです。個人開発の TODO 管理に GitHub Projects を利用しており、アイテムを `In progress` や `Done` に移動させたとき（Status フィールドに変更があったとき）に別のカスタムフィールドの値を自動的に更新するための bot を自作しているのですが、今までは Status フィールドに更新があったことしか webhook に含まれていませんでした。

今までは GraphQL API で Status フィールドの値を取得して初めて `Done` に移動されたことなどを検知していたのですが、今回のアップデートで webhook 内にカスタムフィールドが `from` から `to` の値に更新されたという情報も含まれるようになったため、bot の処理をより簡単にできそうです。

地味なアップデートですが、GitHub Project の bot を自作している人には嬉しいアップデートだと思います。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Dependabot auto-triage rules are generally available - The GitHub Blog
https://github.blog/changelog/2024-06-26-dependabot-auto-triage-rules-are-generally-available/

## GitHub Actions: GPU hosted runners are now generally available - The GitHub Blog
https://github.blog/changelog/2024-07-08-github-actions-gpu-hosted-runners-are-now-generally-available/

GitHub が提供する GitHub Actions のランナーに GPU が搭載された Linux と Windows のランナーが追加されました。

自分自身は CI で GPU を使う処理を実行した経験はあまりないのですが、機械学習やゲームの開発など GPU を必要とする処理のために今までどうしてもセルフホストランナーを使わざるを得なかった人にとっては朗報かもしれません。

GPU 付きのランナーは Larger runner として用意されているため、利用するためには最初に Larger runner としてセットアップする必要があります。ちなみにスペックと価格はこのあたりのドキュメントに記載されています。

https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners/about-larger-runners
https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates-for-gpu-powered-larger-runners

気になるお値段を比較しやすいように近い金額のものを並べてみました[^runner_price]。近い金額で比較すると、GPU 付きの Linux や Windows は 16 コアより若干高め、macOS のランナーより若干安いぐらいなお値段になっています。

[^runner_price]: 2024 年 7 月時点の価格です。詳細はリンク先のドキュメントを参照してください。

|ランナー種別|OS, スペック|価格（USD/分）|
|----|---|---|
|x64 LargerRunner|Linux 16-core|$0.064|
|**GPU付きLargerRunner**| **Linux 4-core**|$0.07|
|StandardRunner| macOS 3 or 4 (M1 or Intel)|$0.08|
|x64 LargerRunner|Windows 16-core|$0.128|
|**GPU付きLargerRunner** |**Windows 4-core**|$0.14|
|Arm LargerRunner|macOS 6-core (M1)|$0.16|

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Copilot Enterprise on GPT-4o - The GitHub Blog
https://github.blog/changelog/2024-07-05-github-copilot-enterprise-on-gpt-4o/

## Visual Studio Code June 2024
https://code.visualstudio.com/updates/v1_91

## AWS Lambda で、Lambda 関数のログの検索、フィルタリング、集計を容易にする新しいコントロールを新たに導入
https://aws.amazon.com/jp/about-aws/whats-new/2024/07/aws-lambda-search-filter-aggregate-function-logs/

2023 年 11 月から、AWS Lambda のログの出力に JSON 形式を選択できるようになっています。
JSON 形式で出力することで、ログを機械的に分析できるようになります。
また関数側ではログ出力を別途ライブラリに任せることなく、直接メッセージを出力するだけで良いことになります。

CloudWatch Logs に出力されるログレベルも、関数、プラットフォームでそれぞれ変更可能になっています。デフォルトではどちらも INFO となっていますが、これを変更すると INFO かそれより下のログレベルのみが出力されるようになります。例えば WARN に変更すると、CloudWatch Logs にはログレベルが WARN, ERROR, FATAL のログが出力されます。

また出力先のロググループも変更可能になっています。以前までは関数名で自動的に決まっていました。

[以前出たブログ記事](https://aws.amazon.com/jp/blogs/compute/introducing-advanced-logging-controls-for-aws-lambda-functions/)と比較すると、特に新しい情報は無さそうに思います。
テキストで自由に出力されるより JSON 形式の方が検索などで便利ですので、使っていきたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## GitHub ActionsでDockerイメージをビルド&プッシュしてCloud Run Jobsを更新するパイプラインを考えてみた - G-gen Tech Blog
https://blog.g-gen.co.jp/entry/docker-image-pipeline-with-github-actions

## terraform importで数年やってきたがImport blockの良さに気づきました
https://zenn.dev/aeonpeople/articles/d63e84494d9e2c

2023 年 6 月にリリースされた Terraform v1.5.0 から、import ブロックが登場しています。

この記事では、terraform import コマンドから import ブロックへの移行のメリットが詳しく書かれています。
特に CI/CD パイプライン上で terraform plan, apply をしている場合、そのパイプライン上で import が可能になります。個人のマシンにクラウドまわりの強い権限を渡す必要が無くなり、また state を意識してインポートする必要が（ほぼ）無くなります。

なにより、terraform import 実行時に state に変更が入ってしまうため、そこから実環境と差分が無いように設定を直してリポジトリに急いで push する必要がありました。その間に CI/CD のワークフローなどで apply が動いてしまったら、下手したらリソースが消えてしまいます。
それが import ブロックを使うことで CI/CD のフローに載せることができるようになり、事前に検証が可能になりました。ワークフローの競合も解決します。

import ブロックを使っていきましょう。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

<!-- textlint-disable prh -->

## Github Actionsで複数環境のterraform planを自動化する
https://zenn.dev/makoto1995/articles/65de69bdaa34b3

<!-- textlint-enable prh -->

# tool 🔨

## GitHub Actions の timeout-minutes の linter 及び一括設定ツール
https://zenn.dev/shunsuke_suzuki/articles/github-actions-timeout-minutes

## 暗号化に対応した次世代dotenvツールdotenvxを使う
https://zenn.dev/moozaru/articles/edb09434f0680b

dotenv の作者の方が新たに作った dotenvx が登場しました。
dotenv と同じことを解決するツールですが、いくつか新たな機能があるようです。

dotenv と同じように、アプリケーションにライブラリを組み込んで使うこともできますし、実行時に dotenvx コマンドでラップしてやることで環境変数を読み込んでくれる機能が追加されています。
また、dotenv ファイルを暗号化して運用できるようになっており、Git でバージョン管理して運用できそうです。

今はアプリケーションをコンテナで実行することが増え、直接環境変数で渡すことが多くなっているように感じますが、dotenvx もまだまだ需要がありそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## 次世代のMarkdownみたいなDjotの話
https://zenn.dev/sorairolake/articles/nextgen-markdown-djot

## Forests and trees of evergreen notes
https://www.jonmsterling.com/tfmt-000R.xml


# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
