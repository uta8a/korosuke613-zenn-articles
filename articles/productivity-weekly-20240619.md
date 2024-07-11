---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-06-19)
emoji: 🤿
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240619
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
今週は 2024-06-19 単独号です。

今回が第 157 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Repository updates June 12th 2024 - The GitHub Blog
https://github.blog/changelog/2024-06-12-repository-updates-june-12th-2024/

GitHub のリポジトリに関する 6 月のアップデート情報です。custom properties と push rules (public beta)の機能強化が紹介されています。

- custom properties
  - 新しいプロパティの種類を追加
    - `Multi select`: 複数選択できるプロパティ
    - `True/False`: 真偽値を持つプロパティ
  - ルールセットのターゲット対象に絞り込む条件としていくつかのプロパティが利用可能に
    - `fork`: fork したリポジトリかどうか
    - `language`: プライマリ言語
    - `visibility`: リポジトリの可視性（`public`, `private`, `internal`）
- push rules (public beta)
  - 新しいバイパスフローの追加
    - バイパスリストに載ってないユーザが push rules にブロックされた場合、バイパスリストに載っているユーザに対して一時的なバイパスを要求できるようになった
    - 詳しくは検証したのでこっちを参照ください〜
      - [GitHub の Delegated bypass for push rules を試す](https://zenn.dev/korosuke613/scraps/244af7e2a97423)

custom properties も push rules もますます使いやすくなりましたね。

特に push rules のバイパスを要求できる機能はとても嬉しいかなと思います。push rules でブロックされるファイルに対してコントリビューションしたい場合、プルリクエストを送ることすらできません。一時的に push を許可するフローができたのは嬉しいですね。ただ、僕が調べた限り、この機能はファイル差分を見られなかったので、それが見られるようになるともっと使いやすくなるのかなと思いました。今後に期待ですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## The GitHub Enterprise Server 3.13 is generally available - The GitHub Blog
https://github.blog/changelog/2024-06-18-the-github-enterprise-server-3-13-is-generally-available/

GitHub Enterprise Server 3.13 が GA になりました 🎉
今回は今までに比べて追加された機能の中で面白いものは少ないのですが、[custom properties](https://docs.github.com/en/enterprise-server@3.13/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)の追加は個人的に要チェックです。最近 github.com の方では[リポジトリ一覧画面のフィルタリング](https://github.blog/changelog/2023-12-06-new-organization-repositories-list-feature-preview/)や、[Rulesetとの連携](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-organization-settings/creating-rulesets-for-repositories-in-your-organization)が強化されており、1 つの Organization の内のリポジトリ数が増えた場合に管理するためのパーツとして custom properties が機能し始めています。

GHES も今後のアップデートで custom properties を活用できる場面が増えると思われるので、今のうちから整備しておくと良いかもしれません。

リリースノート全体はこちらです。

https://docs.github.com/en/enterprise-server@3.13/admin/release-notes


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## New Copilot Enterprise features in VS Code (preview) - The GitHub Blog
https://github.blog/changelog/2024-06-14-new-copilot-enterprise-features-in-vs-code-preview/

GitHub Copilot Enterprise のユーザは VSCode 上で Copilot ナレッジベースと Bing 検索結果によるコンテキストを強化したチャット機能を利用できるようになりました。

[Copilot ナレッジベース](https://docs.github.com/en/enterprise-cloud@latest/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-github-copilot-features-in-your-organization/managing-copilot-knowledge-bases)は Copilot のコンテキストに含める任意の GitHub リポジトリのリストを作成・管理できる機能です。これまでは、作成したナレッジベースを利用して GitHub.com 上で GitHub Copilot Chat とチャットができましたが、今回のアップデートで VSCode 上でも同様の機能が利用できるようになりました。

また、Bing の検索結果をコンテキストとして利用する機能も GitHub.com 上での Copilot Chat で利用できましたが、今回 VSCode 上のチャットでも利用できるようになりました。

どんどん Copilot Enterprise が便利になっていきますね。良いですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Docker DesktopからGitHub Actionsビルドの詳細が参照可能に。Windows on Arm版も登場したDocker Desktop 4.31正式版リリース － Publickey
https://www.publickey1.jp/blog/24/docker_desktopgithub_actionswindows_on_armdocker_desktop_431.html

## IAM Access Analyzer Update: Extending custom policy checks & guided revocation | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/iam-access-analyzer-update-extending-custom-policy-checks-guided-revocation/

日本語: [IAM Access Analyzer の最新情報: カスタムポリシーチェックとガイド付き取り消しを拡張する | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/iam-access-analyzer-update-extending-custom-policy-checks-guided-revocation/)

AWS IAM Access Analyzer において、新たなカスタムポリシーチェックと未使用アクセス権の取り消しガイド機能が追加されました。

新しいカスタムポリシーチェックは、ローカルに用意したポリシーが特定のリソースのパブリックアクセスを許可してるかどうか(`CheckNoNewAccess`)、アクセス権を有してるかどうか(`CheckAccessNotGranted`)を検出できる機能です。これを使うとポリシーをデプロイする前に意図せぬアクセス権を検出できるます。記事では CI に組み込んで継続的にチェックすることもおすすめされています。

カスタムポリシーチェックについては、クラメソさんが解説と実演をブログにまとめてますので、大変参考になります。

- [IAM Access Analyzerのカスタムポリシーチェックでパブリックアクセスと重要リソースアクセスのチェックが追加されました！ #AWSreInforce | DevelopersIO](https://dev.classmethod.jp/articles/iam-access-analyzer-check-public-access-and-resource-access/)

未使用アクセス権の取り消しガイド機能は、IAM Access Analyzer で「Unused access」を検出したときに役立つ機能です。「Unused access」の検出では、利用していないアクセスキーや IAM ロールを検出できます。検出自体はこれまでもあった機能ですが、今回、検出結果に対してどういうアクションが推奨されているかが「Recommendations」に表示されるようになりました。
検出されたはいいけどどうすればいいかわからない人には嬉しい機能ですね。

IAM Access Analyzer を使うと IAM の棚卸しができたりセキュリティを向上できたりして良いですね。今後も機能を増やしていってほしいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## モノレポでマージキューと必須ステータスチェックを運用するためのTips - ROUTE06 Tech Blog
https://tech.route06.co.jp/entry/2024/06/12/121511

ROUTE06 さんによる、GitHub のマージキューと必須ステータスチェックを運用するための Tips 紹介です。

マージキューはそれぞれ便利な機能ですが、マージキューは複雑な仕様をしており（平木場の考え）、思った通りに設定をするのが大変です。
この記事では、マージキューを運用するのにかかせない必須ステータスチェックをモノレポでうまく設定する方法が載っています。動的にジョブをスキップしたり、マトリックスジョブの後続ジョブをステータスチェック対象にしたりと、モノレポで嬉しい必須ステータスチェックと GitHub Actions の使い方が紹介されており参考になります。
マージキューを運用し始めた感想も載っており、マージキュー利用の参考になります。

マージキューのノウハウはまだまだ少ない気がするので、マージキュー関連の記事が出てくると嬉しいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## クラウドロックインされないアーキテクチャ「Cloud Agnostic Architecture」のすすめ | フューチャー技術ブログ
https://future-architect.github.io/articles/20240617b/

# tool 🔨

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
