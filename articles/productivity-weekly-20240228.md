---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-02-28)
emoji: 📸
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240228
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
今週は 2024-02-28 単独号です。

今回が第 144 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Catch-up! GitHub Copilot Enterpriseの祝GA🎉（GitHub Changelogのクイック和訳）
https://zenn.dev/dzeyelid/articles/ffb49a893d6544

## New limits on scoped token creation for GitHub Apps - The GitHub Blog
https://github.blog/changelog/2024-02-22-new-limits-on-scoped-token-creation-for-github-apps/

## Repository Rules - configure merge queue rule - public beta - The GitHub Blog
https://github.blog/changelog/2024-02-27-repository-rules-configure-merge-queue-rule-public-beta/

Merge Queue のための設定が Branch Protection に代わる新しい Repository Rules でも可能になったようです。

Merge Queue 自体については過去に Productivity Weekly でも何度か解説記事を紹介しています[^weekly-20230726][^weekly-20240214]が、この機能を有効をにするためには Branch Protection の設定で Merge Queue を有効にする必要がありました。一方、最近では Branch Protection よりも柔軟に設定できる上位互換の[Repository Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository)（あるいは rulesets とも呼ばれることがある）も提供されており、ブランチへの force push の禁止や直接 push を禁止して pull-request を必須にするなどの設定は既に可能だったのですが、Merge Queue の設定は今まで Branch Protection でしか行えませんでした。

[^weekly-20230726]: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230726
[^weekly-20240214]: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214

今回の機能追加により、Merge Queue を利用する場合でも Repository Rules だけで完結することが可能になったのでまた１つ Branch Protection を利用し続ける理由がなくなったと言えそうです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Deno 1.41: smaller deno compile binaries
https://deno.com/blog/v1.41

Deno v1.41 がリリースされました。今回の目玉はタイトルにもあるように `deno compile` で生成されるバイナリのサイズが小さくなったことで、記事中では今まで"Hello world"のシンプルなプログラムでも ARM の macOS 用バイナリで 116Mb だったものが、**58Mb** にまで縮小されたようです。

早速、拙作の Deno 製の CLI ツールを Deno v1.41 で `deno compile` し直してみたところ、ARM の macOS 用のバイナリで 101Mb -> **69Mb**、x86_64 の Linux 用のバイナリで 119Mb -> **80Mb** とおおよそ 30 - 40Mb 程度のサイズ削減が見られました！  

https://github.com/Kesin11/gh-workflow-ls/releases/tag/v1.0.1

Go や Rust などで作成されたバイナリと比較するとまだまだ大きいですが、100Mb 以下で提供できると心理的なハードルが一段階低くなった気がします。個人的には TypeScript でシングルバイナリのツールを開発したい場合に Deno はかなり有力な選択肢になってきました。

また、記事中ではバイナリサイズをさらに減らすプランとして、必要な機能だけに絞った Deno をカスタムビルドするという方法も見当しているとのことなので今後さらに期待できそうです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Highlights from Git 2.44 - The GitHub Blog
https://github.blog/2024-02-23-highlights-from-git-2-44/

## AWS Systems Manager Parameter Store now supports cross-account sharing
https://aws.amazon.com/jp/about-aws/whats-new/2024/02/aws-systems-manager-parameter-store-cross-account-sharing/


# know-how 🎓

## GitHub OAuthアプリを使ったスパム攻撃を停止させる
https://zenn.dev/azu/articles/3a312d432ebc98

## ENOG81: AWSのIPv6とPublic IPv4のおはなし - Speaker Deck
https://speakerdeck.com/yukihirokikuchi/enog81-aws-ipv6-public-ipv4

## Go1.22 リリース連載 HTTPルーティングの強化
https://future-architect.github.io/articles/20240202a

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information
