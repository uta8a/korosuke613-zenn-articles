---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-01-22)
emoji: 💢
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250122
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
    _本項の執筆者: [@naotama](https://zenn.dev/naotama)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-01-22 単独号です。

今回が第 176 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
- [@ajfAfg](https://zenn.dev/arjef)
<!-- - [@takoeight0821](https://zenn.dev/takoeight0821) -->
<!-- - [@takamin55](https://zenn.dev/takamin55) -->
<!-- - [@naotama](https://zenn.dev/naotama) -->
:::

# news 📺

## GitHub Actions: Ubuntu 20 runner image brownout dates and other breaking changes - GitHub Changelog
https://github.blog/changelog/2025-01-15-github-actions-ubuntu-20-runner-image-brownout-dates-and-other-breaking-changes/

## Linux arm64 hosted runners now available for free in public repositories (Public Preview) - GitHub Changelog
https://github.blog/changelog/2025-01-16-linux-arm64-hosted-runners-now-available-for-free-in-public-repositories-public-preview/

## Copilot Users Can Ask About A Failed Actions Job (GA) - GitHub Changelog
https://github.blog/changelog/2025-01-15-copilot-users-can-ask-about-a-failed-actions-job-ga/

GitHub Actions のジョブが失敗した原因を Copilot に質問できる機能が GA になりました。ブラウザ上でボタンをワンポチするだけで原因を説明してくれます。

GitHub の中でスムーズに原因究明できて嬉しいですね。サイボウズ社内では、「Jenkins おじさんの仕事が供養された」や「LLM の良い使われ方だな」といった絶賛の声が上がっていました。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Code scanning caches dependencies for Java, Go & C# - GitHub Changelog
https://github.blog/changelog/2025-01-21-code-scanning-caches-dependencies-for-java-go-c/

## The AWS Management Console now supports simultaneous sign-in for multiple AWS accounts - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-management-console-simultaneous-sign-in-multiple-accounts/

## AWS CodeBuild now supports test splitting and parallelism - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-codebuild-test-splitting-parallelism/

## Announcing AWS User Notifications GA on AWS CloudFormation - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-user-notifications-ga-cloudformation/

## Go1.24 New Features
https://zenn.dev/koya_iwamura/articles/ca9ab62ff760c2

# know-how 🎓

## Deno in 2024
https://deno.com/blog/deno-in-2024

## 誤解されがちなnever型の危険性: 「存在しない」について #TypeScript - Qiita
https://qiita.com/uhyo/items/97941f855b2df0a99c60

`never` 型の値は存在しちゃいけないので、`as never` すると型検査に大きな穴を作りかねないよという啓蒙的な話です。
流石に `as never` をやる人は少ないと思いますが、例えば Branded Type を `type UserId = string & { __userIdBrand: never };` と定義してしまうと、`(foo as UserId).__userIdBrand : never` という形で `never` 型の値が得られてしまいます。このケースでは、`never` 型の代わりに `unknown` を使うとよいとされています。例を「[Branded Type ベストプラクティス 検索](https://qiita.com/uhyo/items/de4cb2085fdbdf484b83)」から次に引用します:

```ts
const userIdBrand = Symbol();

export type UserId = string & { [userIdBrand]: unknown };
```

気をつけましょう！

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## スタディストではCursor Businessを導入しました - スタディスト Tech Blog
https://studist.tech/introducing-cursor-business-33d53346e603

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
