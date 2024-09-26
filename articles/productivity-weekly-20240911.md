---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-09-11, 2024-09-04)
emoji: 🍷
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240911
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
今週は 2024-09-11, 2024-09-04 合併号です。

今回が第 163 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## GitHub Actions: arm64 Linux and Windows runners are now generally available - GitHub Changelog
https://github.blog/changelog/2024-09-03-github-actions-arm64-linux-and-windows-runners-are-now-generally-available/

## GitHub Enterprise Server 3.14 is generally available - GitHub Changelog
https://github.blog/changelog/2024-08-29-github-enterprise-server-3-14-is-generally-available/

GitHub Enterprise Server（GHES）3.14 が GA になりました。目玉としては SCIM への対応（public beta）のようですが、自分自身 SCIM についてシングルサインオン関連であることくらいしか分からないため解説できませんでした・・・社内で ID 管理をしている部署の方などは待望の機能だったのかもしれません。

それ以外で個人的に注目したアップデートは以下です。

- Dependabot でセキュリティアップデートのグループ化が可能になった
- Organization でのセキュリティダッシュボードが追加
- 任意の GitHub Actions ワークフローで GitHub Pages のデプロイが可能になった
- 新 GitHub Projects で issue の自動クローズが可能になった

3.14 のリリースノートは[こちら](https://docs.github.com/en/enterprise-server@3.14/admin/release-notes)なので全てのアップデートを確認したい方はこちらを参照してください。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Copilot Chat in GitHub.com now can search across GitHub entities - GitHub Changelog
https://github.blog/changelog/2024-08-29-copilot-chat-in-github-com-now-can-search-across-github-entities/

## Add repository permissions to custom organization roles - GitHub Changelog
https://github.blog/changelog/2024-08-29-add-repository-permissions-to-custom-organization-roles/

Organization 全体でのカスタムロールに対してより細かいリポジトリの権限設定が可能になりました。

[以前のアップデート](https://github.blog/changelog/2024-07-10-pre-defined-organization-roles-that-grant-access-to-all-repositories/)で Organization 全体で事前に定義された read, write, triage, maintain, admin の 5 つのロールが追加されました。triage, maintain はこの時点では特殊なロールで、例えば triage ロールではリポジトリの issue に関しては操作する権限が与えられるなど、リポジトリの細かい権限が設定されていました。

今回のアップデートではこのリポジトリの細かい権限を独自のカスタムロールでも設定できるようになりました。良い例が思いつかなかったのですが、例えば次の図のように Read ロールをベースにしつつ pull-request のクローズとリオープンだけは可能というような謎なロールも作成可能です。

![repository-permission-to-custom-org-roles](/images/productivity-weekly-20240911/repository-permission-to-custom-org-roles.png)
*Readをベースにしつつ個別の権限を追加したカスタムロールの作成画面*

まだ全ての権限を付与できるわけではないように見えますが、例えば webhook の設定や wiki の設定など今までは admin が必要だった権限も一部設定できるようです。GitHub でユーザーの権限管理を検討する場合には単に Read, Write, Admin の 3 択だけではなくカスタムロールも検討してみるといいかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Push Rules are now generally available, and updates to custom properties - GitHub Changelog
https://github.blog/changelog/2024-09-10-push-rules-are-now-generally-available-and-updates-to-custom-properties/

Push Rules が GA になったのと、リポジトリの作成時に必須として設定されている Custom Properties を設定できるようになりました。

Push Rules は特定の拡張子や特定のパスのファイルなど[^push-rules]を変更するコミットの push を禁止できる機能で、例えば `.github/workflows/**/*` を変更可能なユーザーを限定することなどが可能です。この機能が beta から GA になりました。

[^push-rules]: 他にも制限可能な設定があります。詳しくは[ドキュメント](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)を参照してください。

Push Rules の話とは別で、[Custom Properties](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)をリポジトリの作成時に設定可能になりました。Custom Properties 自体については何度か紹介しているため[過去のProductivity Weeklyの記事](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231018?redirected=1#github-repository-custom-properties-beta---the-github-blog)を参照してもらえればと思います。

Custom Properties は任意または必須が選択可能で、必須にした場合はデフォルト値が設定されます。今まではリポジトリ作成後に別画面から Custom Properties の設定が必要だったため、設定を忘れてしまうことが多かったかもしれません。今後はリポジトリ作成画面にて必須の Custom Properties の設定が可能になるため忘れずに設定できそうですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Announcing TypeScript 5.6 - TypeScript
https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/

## Visual Studio Code August 2024
https://code.visualstudio.com/updates/v1_93

## Amazon ECS now supports AWS Graviton-based Spot compute with AWS Fargate - AWS 
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/amazon-ecs-graviton-based-spot-compute-fargate/

## Version support policy and ESLint v8.x end of life - ESLint - Pluggable JavaScript Linter
https://eslint.org/blog/2024/09/eslint-v8-eol-version-support/

# know-how 🎓

## Terraformで不要になったmoved/import/removedブロックを楽に削除する - repl.info
https://repl.info/archives/2024/08/

## node v22.7.x で TypeScript をそのまま実行する
https://zenn.dev/mizchi/articles/experimental-node-typescript

## 開発者体験を意識した開発チームの生産性向上の取り組み - Speaker Deck
https://speakerdeck.com/ham0215/kai-fa-zhe-ti-yan-woyi-shi-sitakai-fa-timunosheng-chan-xing-xiang-shang-noqu-rizu-mi

## 目標設定と習慣化で今よりも一歩生産性を上げる - Speaker Deck
https://speakerdeck.com/sansantech/sansan-20240829

## Findy Team+に追加されたSPACEを計測できるチームサーベイ機能が良かった
https://zenn.dev/pharmax/articles/62b126836f12dd

## モブプログラミングは、なぜ5人が1台のPCで仕事をしているのに生産的になれるのか（前編）。モブプログラミングの生みの親が解説するその理由と効果とは？ － Publickey
https://www.publickey1.jp/blog/24/51pc.html

## 円安を乗り越えるための Arm アーキテクチャへの移行が完了！ そのプロセスを公開します - カミナシ エンジニアブログ
https://kaminashi-developer.hatenablog.jp/entry/2024/09/09/migration-to-arm-architecture

## GitHub ActionsのJobが落ちたときに何をするべきかを記述するPlaybookの仕組みを作って運用している話
https://tech.newmo.me/entry/2024/09/04/130000

# tool 🔨

## LLM-Term
https://github.com/dh1011/llm-term

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [RIP 2024年こそ corepack を使おうとしたら終わった](https://zenn.dev/monicle/articles/b7a9314f9f1efb)
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
