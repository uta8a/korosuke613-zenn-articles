---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-10-23,16)
emoji: 🛋️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241023
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-10-23, 2024-10-16 合併号です。

今回が第 166 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef) -->

:::

# news 📺

## Enterprises can create GitHub Apps for use within the Enterprise - GitHub Changelog
https://github.blog/changelog/2024-10-22-enterprises-can-create-github-apps-for-use-within-the-enterprise/

## New PAT rotation policies preview and optional expiration for fine-grained PATs - GitHub Changelog
https://github.blog/changelog/2024-10-18-new-pat-rotation-policies-preview-and-optional-expiration-for-fine-grained-pats/

## New Terminology for GitHub Previews - GitHub Changelog
https://github.blog/changelog/2024-10-18-new-terminology-for-github-previews/

## Announcing Deno 2
https://deno.com/blog/v2.0

## Announcing TypeScript 5.7 Beta
https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-beta/

## AWS CDK で cdk rollback コマンドが利用可能になりました | DevelopersIO
https://dev.classmethod.jp/articles/aws-cdk-rollback/

## AWS Lambda now detects and stops recursive loops between Lambda and Amazon S3 - AWS 
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-lambda-detects-stops-recursive-loops-lambda-s3/

## ウェブアプリケーション用 Storage Browser for Amazon S3 の発表 (アルファリリース) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/storage-browser-amazon-s3-alpha-release/

## AWS Lambda console now features a new code editor based on Code-OSS (VS Code - Open Source) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-lambda-code-editor-based-code-oss/

## Terraform Stacks, explained
https://www.hashicorp.com/blog/terraform-stacks-explained
https://developer.hashicorp.com/terraform/language/stacks

Terraform Stacks の機能と使い方を紹介 - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2024/10/21/190000

## AWS、コンソールの操作をコードに変換してくれる「AWS Console-to-Code」正式リリース － Publickey
https://www.publickey1.jp/blog/24/awsaws_console-to-code.html

## feat: add spot termination handler by npalm · Pull Request #4176 · philips-labs/terraform-aws-github-runner
https://github.com/philips-labs/terraform-aws-github-runner/pull/4176

## Terraform v1.10 からは S3 Backend の State Lock に DynamoDB が必要なくなる
https://zenn.dev/terraform_jp/articles/terraform-s3-state-lock

## Go 1.24 から go.mod でのツール管理がより簡潔になるかもしれない 
https://zenn.dev/uji/articles/adding-tool-dependencies-to-go-mod

# know-how 🎓

## 「Self-hosted GitHub Actions runners in AWS CodeBuild」を使ったバッチ実行基盤 - エス・エム・エス エンジニア テックブログ
https://tech.bm-sms.co.jp/entry/batch-platform-with-self-hosted-runner-in-codebuild

## 2024 State of DevOps Report | Google Cloud
https://cloud.google.com/resources/devops/state-of-devops?hl=ja

## ゼロダウンタイムで Amazon EC2 で稼働している nginx を AWS Fargate に移行した - 弁護士ドットコム株式会社 Creators’ blog
https://creators.bengo4.com/entry/2024/10/22/073000

## tfaction でトランスパイルした JS をコミットするのを止めた
https://zenn.dev/shunsuke_suzuki/articles/tfaction-stop-transpile-local

## zsh + fzf で「あの時作業していたあのブランチ」を快適に探す
https://www.mizdra.net/entry/2024/10/19/172323

## 「攻めた」AWS Fargate Spot比率の見直し時
https://developer.hatenastaff.com/entry/2024/10/11/163931

## AWSのARNに日本語文字や絵文字が入ることがあるのを知っていましたか？ - Diary of a Perpetual Student 
https://blog.arthur1.dev/entry/2024/10/16/110000

## terraform の細かすぎて伝わらない小ネタ GHAR Ubuntu 24.04 には Terraform が入ってない
https://zenn.dev/terraform_jp/articles/2024-10-14_terraform_not_installed_github_runner

# tool 🔨

## 不要なGitHub Actionsのキャッシュを削除するdelete-action-cacheを作った | toshimaru/blog
https://blog.toshimaru.net/delete-action-cache/

## Stengo/DeskPad: A virtual monitor for screen sharing
https://github.com/Stengo/DeskPad

## denoland/nextgen-install
https://github.com/denoland/nextgen-install

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