---
title: Artifact AttestationsやEDoS攻撃に関する話など｜Productivity Weekly(2024-05-08)
emoji: 🌱
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240508
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
今週は 2024-05-08 単独号です。

今回が第 151 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Introducing Artifact Attestations–now in public beta - The GitHub Blog
https://github.blog/2024-05-02-introducing-artifact-attestations-now-in-public-beta/

GitHub Actions において、ソフトウェア成果物が特定のワークフローで作られたことを証明するための機能である Artifact Attestations がパブリックベータとしてリリースされました（public beta）。

Artifact Attestations は、GitHub Actions 上でソフトウェア成果物に署名し、利用時にその署名を検証することで、その成果物が特定のワークフローで作られたことを証明できます。これにより、サプライチェーン攻撃にさらされるリスクを減らせます。署名と検証には、OSS である Sigstore が利用されています。

去年公開された、[npm registry に provenance の情報を追加する機能](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426#npm-provenance-public-beta-%7C-github-changelog)に似ていますね。

専用のカスタムアクションが用意されており、簡単に署名できます。生成された証明書は自動で保存され GitHub 上で参照可能であるため、保存場所を考える必要はありません。
検証は、GitHub CLI を使って簡単に検証できます。また、証明書をあらかじめダウンロードしておくことで、オフラインでの検証も可能です。

:::message
パブリックリポジトリの場合は Sigstore Public Good インスタンスに署名した情報が保存されるとのことです。プライベートリポジトリの場合はプライベートなデータベースに保存されるとのことです。

ただ、ブログ記事では「private repositories on GitHub Enterprise plans」と書かれているなか、ドキュメントでは「Private repositories」と書かれており、整合性が取れてないように思えます。利用前にしっかり確認することをおすすめします。
:::

なお、コンテナイメージにも対応しており、SBOM との関連付けができるカスタムアクションも用意されています。

さっそく試してみました。どんなコードでどんな感じになるか、気になる人は見てみてください。

- [try: artifact attestations by korosuke613 · Pull Request #57 · korosuke613/playground](https://github.com/korosuke613/playground/pull/57)

これまでも独自の方法で署名し、利用時に検証することでリスクは軽減できましたが、それを GitHub の機能として手軽に利用できるようになったのが特に嬉しいポイントかと思います。
成果物の署名と検証のハードルが下がり、今後、個人か組織かに関わらず、ソフトウェア成果物を署名・検証するケースが増えていくかもしれません。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## OpenTofu 1.7.0 is out with State Encryption, Dynamic Provider-Defined Functions, and more | OpenTofu
https://opentofu.org/blog/opentofu-1-7-0/

OpenTofu v1.7.0 がリリースされました。OpenTofu は OSS の頃の Terraform からフォークされた Terraform 代替ツールになります。

v1.6.0 までは Terraform との互換性が重視されていましたが、v1.7 では OpenTofu 独自の機能が追加されています。

- state ファイルの E2E 暗号化
  - **Terraform には無い機能**
- プロバイダ定義関数の追加
  - [Terraform v1.8 で同様の機能が追加済み](https://www.hashicorp.com/blog/terraform-1-8-improves-extensibility-with-provider-defined-functions#provider-defined-functions)
  - ただし、利用できるプロバイダには差異がありそう
- `removed` ブロックの追加
  - [Terraform v1.7 で同様の機能が追加済み](https://www.hashicorp.com/blog/terraform-1-7-adds-test-mocking-and-config-driven-remove#config-driven-remove)
- `import` ブロックがループ可能に
  - [Terraform v1.7 で同様の機能が追加済み](https://www.hashicorp.com/blog/terraform-1-7-adds-test-mocking-and-config-driven-remove#import-block-for-_each)

state ファイルの E2E 暗号化機能はそもそも Terraform には無いですし、プロバイダ定義関数については Terraform v1.8 で追加された機能であり、同じバージョンだから同じコードが動くわけではないことに注意が必要です。
（早くもどっちでどの機能が使えるのかわからなくなってきた）

OpenTofu と Terraform の競争がこれから激しくなっていきそうです。まだまだ Terraform が主流ですが、今後 OpenTofu に便利機能が追加されていくと、いつか逆転するかもしれませんね。
また、次の意見のように、競争が活発になることで両者の開発が加速することによるユーザーへのメリットもあると思います。

> OpenTofuは明確にコミュニティからリクエストが多い機能を優先的に実装する方針を打ち出してるので、結果的に競合であるTerraformにもその圧力がかかって開発が加速するという構図になっており、よいことじゃないかなと思うなど
https://twitter.com/minamijoyo/status/1793079469605109850

今後も両者の動向に注目したいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Dependabot pull requests jobs are now available to run on self hosted GitHub Actions runners - The GitHub Blog
https://github.blog/changelog/2024-05-02-dependabot-pull-requests-jobs-are-now-available-to-run-on-self-hosted-actions-runners/

## GitHub Copilot Chat in GitHub Mobile is now generally available - The GitHub Blog
https://github.blog/2024-05-07-github-copilot-chat-in-github-mobile/

GitHub Copilot Chat が GitHub のモバイルアプリこと GitHub Mobile 上で使えるようになりました。

Individual ライセンスのユーザは、デフォルトで設定が有効化されているので、GitHub Mobile 上ですぐに使えます。
Business、Enterprise ライセンスのユーザは、Enterprise 上での有効化や、ライセンスを割り当てている Organization 上での有効化が必要になるので、別途管理者に連絡しましょう。

次のツイートのように試してみたのですが、Copilot Chat がすでに知っているリポジトリについてはリポジトリに関する質問が可能です。有名どころのリポジトリは知っていそうでした。僕のリポジトリは知ってませんでした。
リポジトリに限らない一般的な技術の質問はやりやすそうです。

https://x.com/Shitimi_613/status/1793884909561688147

また、画像は貼ってないのですが、GitHub のドキュメントに関する質問には古い回答が返ってきたため、GitHub に関する質問は、サポートページでできる Copilot で聞くのがいいかもしれません。

- [Copilot in GitHub SupportがGA！GitHubの仕様に関するわからないことをすばやく解決できやすくなったよ](https://zenn.dev/korosuke613/articles/copilot-in-github-support)

Copilot Chat をスマホで使いたいぞ！という方は触ってみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Actions: New region support for Azure private networking - The GitHub Blog
https://github.blog/changelog/2024-05-07-actions-new-region-support-for-azure-private-networking/

GitHub Actions の Azure private networking で新しいリージョンがサポートされ、東京リージョンも含まれています。
Azure private networking については以前も Productivity Weekly で紹介したので、気になる方は[こちら](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231108#azure-private-networking-for-github-hosted-runners---public-beta---the-github-blog)の記事を参照してください。

Azure と GitHub Actions を利用している方には待望のアップデートでしょうか。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

## Cloud Storageバケット名を知っていれば、EDoS攻撃を仕掛けられるのか？
https://blog.g-gen.co.jp/entry/cloud-storage-edos-risks

2024 年 4 月当時、Amazon S3 では API リクエストに対して課金が発生していました。そのため、ステータスコードが `403 AccessDenied` を返すようなリクエストにも課金が発生してしまうので、EDoS 攻撃を受けるリスクがあるということが話題になっていました([参考](https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1))。

この記事では、Cloud Storage においても同様のリスクがあるかどうかを検証しています。
結論としては、Cloud Storage では 307、4xx、5xx レスポンスを返す場合は課金が発生しないため、S3 に比べると EDoS 攻撃を受けるリスクは低いとのことです。
ただし、静的ホスティングを行っており、404 レスポンスで表示させるコンテンツを設定している場合は課金が発生するそうです。また、データアクセス監査ログを有効化していると、ログの肥大化によるコストがかかることもあるので注意が必要とありました。

リスクや注意事項をまとめてくれていて、参考になりました。

なお、2024 年 5 月 13 日に[アップデート](https://aws.amazon.com/jp/about-aws/whats-new/2024/05/amazon-s3-no-charge-http-error-codes/)があり、S3 で `403 AccessDenied` でも課金が発生しないようになりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 002号（2024/05/01） - SRE Magazine
https://sre-magazine.net/magazines/2/

有志の方々で作られている SRE Magazine の 002 号が公開されました。
SLO や OpenTelemetry といったサービスの運用にまつわる技術的な話題からちょっとした読み物まで、幅広い内容が掲載されています。

個人的には、[この春SREになったあなたに贈る、心を折らないための読み物](https://sre-magazine.net/articles/2/vtryo/)が良いなと思いました。新年度始まって、疲れやツラみを感じている方には特におすすめです。

開発生産性関連だと、[巻頭言：Four keysの"Change lead time"をちょっと深堀る](https://sre-magazine.net/articles/2/syossan27/)という記事がありました。
なにかと話題になりがちな Change lead time の定義について振り返っており、勉強になりました。

これからの連載にも期待です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## actions/cache@v4ではヒットしなかったときcache-hit=='false'にならない - ぽよメモ
https://poyo.hatenablog.jp/entry/2024/05/04/094730

`actions/cache@v4` ではキャッシュがヒットしなかった場合、`cache-hit` が `false` ではなく空文字列が返される仕様になっているようです。
そのため、`if: steps.cache.outputs.cache-hit == 'false'` という条件でキャッシュがヒットしなかった場合の処理を書いていると、意図通りに動作しないため、`if: steps.cache.outputs.cache-hit != 'true'` という条件で書き換える必要があるとのことです。

v3 から v4 へのアップデートにおける Breaking Change には記載されていなかったらしく、自分も知らなかったです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->

- **know-how 🎓**
  - [ast-grepでReact 19に移行する](https://zenn.dev/hd_nvim/articles/dc2f174d890cb8)
    - ast-grep を使って、複雑な置換を行い、React 19 への移行を行う例を紹介する話です
    - ast-grep を使うと何ができるのか参考になります
  - [Linux Foundation、継続的デリバリーコミュニティに関するアニュアルレポートの日本語版を公開](https://codezine.jp/article/detail/19462)
    - PDF: https://cd.foundation/wp-content/uploads/sites/78/2024/04/Annual_Report_2023_CDFoundation_JP.pdf
    - Linux Foundation が継続的デリバリーに関するコミュニティの活動をまとめた 2023 年レポートの日本語版を公開しました
    - 現在活動中の 8 つの CDF（Continuous Delivery Foundation）オープンソースプロジェクトの 2023 年のハイライトがまとめられており、それらのプロジェクトにどのような変更があったのかわかりやすくて良いです
    - 他にも、ファウンデーションの新たなメンバーやコミュニティのハイライト、イベント情報、出版物などが紹介されています
- **tool 🔨**
  - [Octo STS 入門](https://zenn.dev/shunsuke_suzuki/books/octo-sts-introduction)
    - Octo STS という GitHub のアクセストークンをよりセキュアに扱うためのツールの紹介本です
    - Octo STS の説明、使い方、なぜ必要なのか、使う上での課題、コードリーディング内容などが載っています
    - セルフホストもできそうなので気になりますが、まだ開発途上らしいので、今後も注力していきたいです

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

<!-- textlint-enable ja-technical-writing/ja-no-redundant-expression -->

# あとがき
暑くなってきましたね。今週号でした。
実は今週号から一部 GPT-4o による自動レビューを導入しています（[例](https://github.com/korosuke613/zenn-articles/pull/686#discussion_r1614776389)）。面白いです。

そういえば、生産性向上チームでは夏の学生インターンを募集しています。なんと[ 5/17 より二次募集を開始](https://x.com/cybozu_recruit/status/1791349532854546744)しています。
興味ある方はぜひエントリーしてみてください。

https://cybozu.co.jp/company/job/recruitment/intern/improvement.html

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
