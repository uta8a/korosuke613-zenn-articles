---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-05-08)
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

## OpenTofu 1.7.0 is out with State Encryption, Dynamic Provider-Defined Functions, and more | OpenTofu
https://opentofu.org/blog/opentofu-1-7-0/

## Dependabot pull requests jobs are now available to run on self hosted GitHub Actions runners - The GitHub Blog
https://github.blog/changelog/2024-05-02-dependabot-pull-requests-jobs-are-now-available-to-run-on-self-hosted-actions-runners/

## GitHub Copilot Chat in GitHub Mobile is now generally available - The GitHub Blog
https://github.blog/2024-05-07-github-copilot-chat-in-github-mobile/

## Actions: New region support for Azure private networking - The GitHub Blog
https://github.blog/changelog/2024-05-07-actions-new-region-support-for-azure-private-networking/

GitHub Actions の Azure private networking で新しいリージョンがサポートされ、東京リージョンも含まれています。
Azure private networking については以前も Productivity Weekly で紹介したので、気になる方は[こちら](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231108#azure-private-networking-for-github-hosted-runners---public-beta---the-github-blog)の記事を参照してください。

Azure と GitHub Actions を利用している方には待望のアップデートでしょうか。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

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

## ast-grepでReact 19に移行する
https://zenn.dev/hd_nvim/articles/dc2f174d890cb8

## Cloud Storageバケット名を知っていれば、EDoS攻撃を仕掛けられるのか？
https://blog.g-gen.co.jp/entry/cloud-storage-edos-risks

2024 年 4 月当時、Amazon S3 では API リクエストに対して課金が発生していました。そのため、ステータスコードが `403 AccessDenied` を返すようなリクエストにも課金が発生してしまうため、EDoS 攻撃を受けるリスクがあるということが話題になっていました([参考](https://medium.com/@maciej.pocwierz/how-an-empty-s3-bucket-can-make-your-aws-bill-explode-934a383cb8b1))。

この記事では、Cloud Storage においても同様のリスクがあるかどうかを検証しています。
結論としては、Cloud Storage では 307、4xx、5xx レスポンスを返す場合は課金が発生しないため、S3 に比べると EDoS 攻撃を受けるリスクは低いとのことです。
ただし、静的ホスティングを行っており、404 レスポンスで表示させるコンテンツを設定している場合は課金が発生するそうです。また、データアクセス監査ログを有効化していると、ログの肥大化によるコストがかかることもあるので注意が必要とありました。

リスクや注意事項をまとめてくれていて、参考になりました。

なお、2024 年 5 月 13 日に[アップデート](https://aws.amazon.com/jp/about-aws/whats-new/2024/05/amazon-s3-no-charge-http-error-codes/)があり、S3 で `403 AccessDenied` でも課金が発生しないようになりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Linux Foundation、継続的デリバリーコミュニティに関するアニュアルレポートの日本語版を公開
https://codezine.jp/article/detail/19462
https://cd.foundation/wp-content/uploads/sites/78/2024/04/Annual_Report_2023_CDFoundation_JP.pdf

# tool 🔨

## Octo STS 入門
https://zenn.dev/shunsuke_suzuki/books/octo-sts-introduction

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
