---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-03-13)
emoji: 🧅
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240313
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
今週は 2024-03-13 単独号です。

今回が第 146 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## The GitHub Enterprise Server 3.12 is generally available - The GitHub Blog
https://github.blog/changelog/2024-03-05-the-github-enterprise-server-3-12-is-generally-available/

GitHub Enterprise Server（GHES）3.12 が GA になりました。大きな機能は記事中で紹介されているものになるのですが、個人的に注目している機能を 3 つほどピックアップしてみます。

- [マージキュー機能が追加](https://github.blog/2023-07-12-github-merge-queue-is-generally-available/)
- [Dependabotの脆弱性アラートの自動トリアージ機能が追加](https://github.blog/2023-09-14-introducing-auto-triage-rules-for-dependabot/)
- [Markdownの新しいハイライト構文が追加](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/)（公式には Alerts と呼ばれている）

中でもマージキューの機能追加が要注目です。これは github.com を利用していてもプランによっては利用できない機能なので、GHES ならおそらくどのリポジトリであっても利用できるのは嬉しいですね。マージキューについては実際に利用された方の記事を Productivity Weekly でも何度か紹介したこと[^20240214][^20230222]がありますが、クセは強いものの使いこなせると特に大規模な開発チームでの運用において非常に便利な機能なようです。GHES で大規模な開発をされているチームは検討してみると良いかもしれません。

[^20240214]: [旧artifact actions廃止告知、マージキューやデプロイ頻度の話等｜Productivity Weekly(2024-02-14)](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214)
[^20230222]: [Productivity Weekly (2023-02-22号)](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230222)

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Actions Fine Grained Permissions - The GitHub Blog
https://github.blog/changelog/2024-03-06-actions-fine-grained-permissions/

GitHub の Custom Organization Roles において、GitHub Actions の細かい権限設定が可能になりました。[Custom Organization Roles](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231122#custom-organization-roles-are-now-ga---the-github-blog) は、Organization に対する権限を付与可能なロールで、例えばあるユーザに webhook 管理の権限だけ与えるなどが可能です。Enterprise の顧客のみが利用できます。

今回新たに追加された権限は次の通りです。（[ドキュメント参照](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/about-custom-organization-roles)）

|Permission|Description|
|---|---|
|Manage organization Actions policies|Actions 全般の設定の管理権限（Self-hosted runner の設定を除く）|
|Manage organization runners and runner groups|ランナーとランナーグループの作成・管理権限、Self-hosted runner 作成可能リポジトリの管理権限|
|Manage organization Actions secrets|Org レベルの Actions secrets の作成と管理権限|
|Manage organization Actions variables|Org レベルの Actions variables の作成と管理権限|

これで、Organization 管理者は全ての権限を付与することなく、個人やチームに Org レベルの Actions の管理権限のみを与えることができるようになりました。
権限は細かく絞っていきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Actions; All Actions will run on Node20 instead of Node16 by default - The GitHub Blog
https://github.blog/changelog/2024-03-07-github-actions-all-actions-will-run-on-node20-instead-of-node16-by-default/

GitHub Actions で JavaScript の actions を動かすための Node.js のバージョンについては既に EOL の Node.js v16 から v20 に移行するようにアナウンスされていた件の続報です。既に v16 を利用している Action を呼び出した場合は warning のメッセージが表示されていますが、いよいよ 2024/05/13 から v20 が強制的に利用されることが予告されました。

この挙動は `FORCE_JAVASCRIPT_ACTIONS_TO_NODE20` の環境変数をセットすることで前もってオプトインできるようです。逆に `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` をセットすることで v20 が強制される挙動をオプトアウトすることも可能とのことですが、それが可能なのもランナーに内蔵されている Node.js v16 が削除されるまでの間だけとのことなので無期限にオプトアウト可能ではないようです。

GitHub Actions を実行した結果画面で Node.js v16 を利用している warning が表示されている場合は、該当の action を Node.js v20 対応のバージョンまでアップデートするか、最悪別の action に乗り換えることをそろそろ検討する時期だと思います。

ちなみに GHES に関しては最新の v3.12 のリリースノートでもこの件に関して言及されていなかったため、現時点では移行スケジュールは不明なままです。v3.13 のリリースノートを待ちましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Copilot Chat General Availability in JetBrains IDE - The GitHub Blog
https://github.blog/changelog/2024-03-07-github-copilot-chat-general-availability-in-jetbrains-ide/

JetBrains IDE 上の GitHub Copilot Chat が GA されました。

Copilot Individual ユーザはすぐに使えますが、Copilot Business、Enterprise ユーザは、管理者が Chat 機能を有効化する必要があります。VSCode で Chat 機能が有効化されていればそのまま JetBrains IDE でも使えるはずです。
そもそも Chat 機能が有効化されていなさそうであれば、管理者にお願いしましょう。

なお、Copilot Chat の機能としては VSCode と比べて遅れて機能がやってきがちです。例えば、[`@workspace`](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants) や、[`#file`](https://code.visualstudio.com/docs/copilot/copilot-chat#_use-chat-variables) は使えなさそうでした（プラグインバージョン: 1.5.0.5148）[^somosomo]。

JetBrains IDE では使えないと思っていた方は、ぜひ試してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^somosomo]: そもそも JetBrains IDE の Copilot Chat で使える機能はどこに羅列されてるのかわかってない。

## BigQuery Emulator をアップデートしました - Route54
https://goccy54.hatenablog.com/entry/2024/03/11/022640

## How we sped up AWS CloudFormation deployments with optimistic stabilization
https://aws.amazon.com/jp/blogs/devops/how-we-sped-up-aws-cloudformation-deployments-with-optimistic-stabilization/

## Free data transfer out to internet when moving out of AWS | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/free-data-transfer-out-to-internet-when-moving-out-of-aws/

## Sponsor your dependencies for recurring sponsorships in one checkout - The GitHub Blog
https://github.blog/changelog/2024-03-06-sponsor-your-dependencies-for-recurring-sponsorships-in-one-checkout/


# know-how 🎓

## 【翻訳】テスト駆動開発の定義 - t-wadaのブログ
https://t-wada.hatenablog.jp/entry/canon-tdd-by-kent-beck

## UnityのアプリビルドをGitHub Actionsに移行した話【CAGC2024】 - Speaker Deck
https://speakerdeck.com/cyberagentdevelopers/unitynoapuribirudowogithub-actionsniyi-xing-sitahua-cagc2024

Unity のモバイルゲーム開発におけるビルド基盤を Jenkins から GitHub Actions に移行した事例の紹介です。

Jenkins からの移行において GitHub Actions の `workflow_dispatch`（手動トリガー）のパラメータ数の上限が 10 という制約が問題になってしまったところを、パラメータを JSON 化した上で GitHub から実行する代わりに Slack App でリッチなフォームを提供して解決したという内容でした。

実は自分も過去に Unity 開発のビルド基盤運用に関わった経験があるのですが、ゲーム開発の現場ではエンジニア以外の職種の方々も大勢開発に関わるため必ずしも全員が Jenkins や GitHub の使い方に習熟しているというわけではないことがあります。そのため、チャット bot など簡単に使える UI を提供してほしいという要望を頂く機会が多かったのですが、当時の自分はここまでリッチな機能を提供できませんでした。今回の事例はこういった要望に対する 1 つの完成形を見た気がして感慨深かったです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Configuration Options - Renovate Docs | Renovate Docs
https://docs.renovatebot.com/configuration-options/#configmigration

実例。regexManger -> customManagers に書き換えてくれている
https://github.com/Kesin11/actions-timeline/commit/23224a70c8d83226bdc14cfdd84fe296ba044268

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
