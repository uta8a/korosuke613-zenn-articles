---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-05-01,2024-04-24)
emoji: 👶
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240501
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
今週は 2024-05-01, 2024-04-24 合併号です。

今回が第 150 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## AWS CodeBuild がマネージド型の GitHub Action ランナーのサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2024/04/aws-codebuild-managed-github-action-runners/

AWS CodeBuild がマネージドな GitHub Actions のセルフホストランナーを提供するようになりました。

GitHub Actions のジョブ要求時に GitHub から Webhook を受け取り、エフェメラルなランナーを起動する仕組みとなります。AWS CodeBuild で動くため、他の AWS リソースの連携がしやすい他、様々なスペックのインスタンスを利用できたり、AWS の料金体系に従って課金されるなどのメリットがあります。

すでに様々な先駆者様が検証してくれています。

- [AWS CodeBuildのGitHub Actions runnerサポートでLambdaが実行できるようになったので検証しました | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/47677/)
- [GitHub ActionsのセルフホステッドランナーとしてAWS CodeBuildを使う | 豆蔵デベロッパーサイト](https://developer.mamezou-tech.com/blogs/2024/04/29/githubactions-codebuild-runner/)

自分も個人の AWS アカウントで試してみました。

- [Self-hosted GitHub Actions runners in AWS CodeBuild を試す](https://zenn.dev/korosuke613/scraps/6f307e8e565cec)

個人的には複数リポジトリをまたいでセルフホストランナーをオーケストレーションできる既存ツール、[actions/actions-runner-controller](https://github.com/actions/actions-runner-controller) や [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) の代替にできそうかどうかが気になっていました。

結論としては、1 リポジトリごとに CodeBuild プロジェクトを作成する必要があったり、GitHub への認証方法に OAuth Apps か Personal Access Token しか使えなかったりと、まだまだ単一プロジェクト内でしか利用シーンは見出せないかなという印象でした。

今後に期待したいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Copilot Workspace：GitHub Copilotネイティブの開発環境へようこそ - GitHubブログ
https://github.blog/jp/2024-04-30-github-copilot-workspace/

GitHub Copilot Workspace がテクニカルプレビューとなりました。GitHub Copilot Workspace は GitHub の Web UI にある Issue で実装したい機能の要件を自然言語で記述すると、その要件に基づいたコードを生成し、提案してくれる機能です。
詳しくは、GitHub のブログを参照していただくと、スクリーンショット付きで紹介されているのでイメージが持ちやすいかと思います。提案されたコードは Web UI 上から Pull Request の作成まで行ったり、Codespace を利用して動作確認も行えるようです。
[GitHub Galaxy Tokyo 2024](https://github.registration.goldcast.io/events/34954e71-1f5f-4f11-800b-0e329c97007d) にてデモを見たところ、自然言語は日本語入力でも対応しているようでした。しかし、レスポンスは英語だったので、今後の日本語対応に期待したいです。また、GitHub の人いわく、ドキュメントの生成と修正にも対応しているそうです。

現時点ではテクニカルプレビューのため、試したい方は Waiting List に登録する必要があります。自分も Waiting List に登録していますが、本記事執筆時点(2024/05/15)では、まだメールは来ていないので気長に待ちたいと思います。

要件定義をしたらコード生成されるのはすごいですね。Copilot Workspace と Codespace を使えば、1 行もコードを書かず、開発マシンも用意せずにアプリケーションを作成できる時代が来るかもしれないですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Push rules public beta - The GitHub Blog
https://github.blog/changelog/2024-04-18-push-rules-public-beta/

Push rules という Rulesets が Public Beta としてリリースされました。特定の拡張子が付くファイルやパスに対して、プッシュを禁止させます。
例えば `*.env` を Push rules に設定して、秘密情報が含まれるファイルをリポジトリにプッシュすることを防いだり、`.github/workflows/*` パスを Push rules に設定して、デプロイメントワークフローを保護することが出来ます。

セキュリティやガバナンスの整備に役立つ機能だと思います。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Copilot Metrics API now available in public beta - The GitHub Blog
https://github.blog/changelog/2024-04-23-github-copilot-metrics-api-now-available-in-public-beta/

GitHub Copilot の Metrics が確認できる API が Public Beta としてリリースされました。
API では、Enterprise 内の Copilot にアクセスできるユーザーを対象として、日毎に、Copilot と Copilot Chat についておおよそ次の項目を確認できます。

- アクティブユーザー数
- コード提案がされた回数と行数
- コード提案が採用された回数と行数
- 上記のデータを IDE や言語ごとに分類したもの

完全なレスポンスについては API ドキュメントの[スキーマ](https://docs.github.com/en/rest/copilot/copilot-usage?apiVersion=2022-11-28#get-a-summary-of-copilot-usage-for-enterprise-members)を確認してください。

さらに、集計したデータを可視化するツールが OSS として公開されています。API と組み合わせて使うことで、Copilot の利用状況を可視化できるようです。開発生産性や Copilot の投資対効果を評価する際に役立つかもしれません。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions: UI Improvements - The GitHub Blog
https://github.blog/changelog/2024-04-30-github-actions-ui-improvements/

GitHub Actions の UI アップデートです。
ワークフローの一覧タブにおいて、最大 5 つのワークフローをピン留め出来るようになりました。また、ワークフローを Disable にすると一覧の一番下に表示されるようになりました。
これにより、例えば、手動実行するワークフローや頻繁に結果を確認したいワークフローをピン留めし、使われなくなったり、テスト用に作成したワークフローは Disable にすることで、一覧を整理しやすくなりました。

また、ジョブのログ表示のストリーミングが改善されたそうです。

個人的に地味に嬉しいアップデートです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Actions - Deployment views across environments (GA) - The GitHub Blog
https://github.blog/changelog/2024-04-25-github-actions-deployment-views-across-environments-ga/

## Repository Updates April 30th, 2024 - The GitHub Blog
https://github.blog/changelog/2024-04-30-repository-updates-april-30th-2024/

## Dependabot Updates on Actions for GitHub Enterprise Cloud and Free, Pro, and Teams Users - The GitHub Blog
https://github.blog/changelog/2024-04-22-dependabot-updates-on-actions-for-github-enterprise-cloud-and-free-pro-and-teams-users/

## Enterprise enablement trends for security products (public beta) - The GitHub Blog
https://github.blog/changelog/2024-04-25-enterprise-enablement-trends-for-security-products-public-beta/

## GitHub Issues & Projects – Auto-close issue project workflow - The GitHub Blog
https://github.blog/changelog/2024-04-25-github-issues-projects-auto-close-issue-project-workflow/

## AWS CloudFormationの変更セットの差分がプロパティレベルで確認できるようになりました | DevelopersIO
https://dev.classmethod.jp/articles/cloudformation-change-set-support-property-level-diff/

## Amazon Q Developer, now generally available, includes previews of new capabilities to reimagine developer experience | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/amazon-q-developer-now-generally-available-includes-new-capabilities-to-reimagine-developer-experience/

## AWS supports dynamically removing and adding auto assigned public IPv4 address
https://aws.amazon.com/jp/about-aws/whats-new/2024/04/removing-adding-auto-assigned-public-ipv4-address/

## 4/8リリースのDocker Desktop v4.29.0で、WindowsおよびMac向けDocker DesktopでもHost networkが試験的にサポートされるようになっていました。
https://docs.docker.com/desktop/release-notes/#4290

https://docs.docker.com/network/drivers/host/#docker-desktop

Host networking is also supported on Docker Desktop version 4.29 and later for Mac, Windows, and Linux as a beta feature.

TCP および UDP のみ対応。

## HashiCorp joins IBM to accelerate multi-cloud automation
https://www.hashicorp.com/blog/hashicorp-joins-ibm

## Node.js、ロケットに乗った亀「Rocket Turtle」が正式マスコットに － Publickey
https://www.publickey1.jp/blog/24/nodejsrocket_turtle.html

# know-how 🎓

## How an empty S3 bucket can make your AWS bill explode | by Maciej Pocwierz | Apr, 2024 | Medium
https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1

## AWS知見共有会でTerraformのCI/CDパイプラインのセキュリティ等について発表してきました + GitHub新機能Push rulesについて
https://tech.layerx.co.jp/entry/scalable-and-secure-infrastructure-as-code-pipeline-for-a-compound-startup

## LLM校正CIを自社のブログに導入してみた - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2024/04/17/084103

## 日本CTO協会、「Developer eXperience Day 2024」の登壇者・第1弾を発表
https://codezine.jp/article/detail/19401

# tool 🔨

## 知的・技術的進歩のスピードを限界まで加速するノートアプリ『Heptabase』 #新人プログラマ応援 - Qiita
https://qiita.com/YUM_3/items/7d656e175302ee0a1142

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
