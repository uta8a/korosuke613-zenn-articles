---
title: ActionsのArm64ランナーがパブリックベータに。LFS料金体系変更｜Productivity Weekly(2024-06-05)
emoji: 🕌
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240605
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-06-26 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-06-05 単独号です。

今回が第 155 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Actions: Arm-based linux and windows runners are now in public beta - The GitHub Blog
https://github.blog/changelog/2024-06-03-actions-arm-based-linux-and-windows-runners-are-now-in-public-beta/

ついに GitHub Acttions の GitHub がホストしているランナーに Arm64 アーキテクチャのマシンが追加されました！！🎉

まずはパブリックベータとして Team と Enterprise Cloud プランでのみ利用可能です。今年の終わりまでには OSS プロジェクト向けに使えるようにしたいとのことなので、その頃には GA になるのかもしれません。

料金面では x64 の同性能のランナーよりも 37%安いとのことです。Larger Runner の料金ページに Linux と Windows の Arm64 ランナーの料金が追加されているので詳細はこちらから確認できます。
https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#per-minute-rates-for-arm64-powered-larger-runners

アナウンスでは特に明記されていませんでしたが、Larger Runner のためパブリックベータ中でも課金されると思われます[^beta_m1_price]。

[^beta_m1_price]: 過去に M1 macOS ランナーがパブリックベータで追加された際にはベータ期間中でも課金が発生していました。

Arm64 ランナーの使い道として現時点でニーズが高いのは Docker のマルチプラットフォームビルドだと思います。生産性向上チームの [@miyajan](https://twitter.com/miyajan) が早速 Arm64 ランナーを利用した Docker のマルチプラットフォームイメージのビルドを試していました。
従来の x86 ランナーで QEMU を利用して Arm 版のイメージをビルドするのに比べてビルド時間がかなり短縮できるようです。Arm 版イメージのビルドを GitHub Actions で行っている方はぜひ新しい Arm64 ランナーを試してみてください。

https://zenn.dev/cybozu_ept/articles/build-multi-platform-image-with-arm64-runner

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## New Enterprise accounts have metered billing for Git LFS - The GitHub Blog
https://github.blog/changelog/2024-06-03-new-enterprise-accounts-have-metered-billing-for-git-lfs/

GitHub の LFS の料金体系が変わります。

6/2 以降に作成された GitHub Enterprise Cloud のアカウントおよび所属 Org はすでに新体系となっています。それ以外のアカウントは数ヶ月以内に新体系に移行される予定です。

これまでの LFS は前払いのプリペイド方式でしたが、新しい料金体系では後払いの従量課金方式に変更されます。

- 従来の料金体系
  - プリペイドでデータパックを購入する方式
  - ストレージ: $5 / 50 GiB / month
  - 帯域: $5 / 50 GiB / month
- 新しい料金体系
  - 後払いの従量課金方式
  - ストレージ: $0.07 / 1 GiB / month
  - 帯域: $0.0875 / 1 GiB / month
  - 無料枠（ストレージ・帯域ともに同じ数字）
    - Free・Pro・Org（Free）: 10 GiB
    - Team・Enterprise: 250 GiB

なお、新しい課金体系と共に課金プラットフォームも新しくなるらしく、より細かく利用状況を把握できるようになるとのことです。
1 GiB あたりの料金は下がることとなりますが、従量課金となることで、予期せぬ課金が発生してしまう恐れがあります。LFS 利用者は確認しておきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## terraform plan -light
https://www.bejarano.io/terraform-plan-light/

Terraform に `-light` オプションを追加しようという提案です。

`-light` オプションはコードで変更されたリソースとそれに依存するリソースのみを plan の対象とすることを示します。`-target` オプションに近いですが、`-target` は指定するリソースを自分で考える必要があります。

個人的には、基本的に全てのリソースをプラン対象とするべきだとは思っていますが、大量のモジュールを使っているなどの理由で対象のリソース数がとても多い場合はやはり待ち時間がつらいです。僕も大量のリソースを持つ Terraform モジュールを扱うことがあり、`-target` オプションで対象のリソースを絞りたい場合はやはりあります。

デカモジュールを扱う人にはあると嬉しいと思うので、追加されてほしいです。Terraform と OpenTofu の両方で Issue が立っているので、同じく追加されてほしい人は up vote してみましょう。

- [terraform plan -light · Issue #35290 · hashicorp/terraform](https://github.com/hashicorp/terraform/issues/35290)
- [tofu plan -light · Issue #1703 · opentofu/opentofu](https://github.com/opentofu/opentofu/issues/1703)

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Best practices for using the Terraform AWS Provider
https://docs.aws.amazon.com/ja_jp/prescriptive-guidance/latest/terraform-aws-provider-best-practices/introduction.html

AWS 公式のドキュメントで、Terraform の AWS Provider を使う上でのベストプラクティスがまとまったページが登場しました。
セキュリティ、ディレクトリ構造、バージョン管理の観点などで、AWS 公式が考えるベストプラクティスが書かれています。
読んでいていくつか自分が重要そうと思ったものを挙げてみます。

- IAM ポリシーは最小限に
  - Terraform を利用しているユーザーとしてやはり気になるのは、Terraform の実行の時の IAM ポリシー
  - 最小限のポリシーを設定するべき
  - ポリシーを組む際は IAM Access Analyzer を使って、必要・不必要なポリシーを特定できる
- IAM ユーザーより IAM ロールを使う
  - AWS の他のサービスでもよく聞く
  - 静的なアクセスキーより、一時的な認証情報を使う
  - CI/CD の場合は OIDC を使うこと、とも書かれている
- remote state はセキュアに
  - S3 を使用している場合は、きちんと暗号化を設定し、パブリックアクセスが禁止になっていることを確認する

他にもディレクトリ構造のベストプラクティスや、モジュール化の話、バージョン管理の話など、幅広くベストプラクティスが書かれていますので、AWS Provider を使用している方はぜひ一度読んでみると良いかと思います。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## 開発生産性 超入門 / development productivity introduction
https://speakerdeck.com/igsr5/development-productivity-introduction

プロダクト開発や開発生産性の定義に立ち返り、そこから開発生産性を向上させるための改善と改革について解説しています。
発表の中では Wantedly さんの実際の改善事例を「把握->分析->対応」という改善サイクルに合わせて紹介されており、分かりやすかったです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## ユニットテストってもう言わない！ CI/CD時代のテスト分類に最適なテストサイズという考え方
https://zenn.dev/koduki/articles/e0f8824adbe0e9

従来の「単体テスト」や「結合テスト」といった分類方法は曖昧さを含んでいます。例えば、単体テストは「単体」が何を指すのか、DB へのアクセスを含むかどうかなどです。
そこで、CI/CD の文脈では実行時間に基づく「テストサイズ」で分類することが有効だと述べています。Google では、Small、Medium、Large の 3 つのテストサイズに分類し、それぞれに応じた実行時間やリソースの基準を設定しており、テスト比率としては 70:20:10 のピラミッド型が望ましいとされています。これにより、テストの効率性と明確さが向上し、適切なタイミングでのテスト実行が可能となります。

Small テストや Medium テストといった呼び方は、単に方言だと思っており気にしていませんでしたが、背景を知れました。
テストサイズを提唱した Google の記事は 14 年前のもので、以前から提唱されていた考え方だったのですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Playwrightを使ったE2Eテストを導入した話 - インフラ編 Playwright × Allure Report × AWS
https://tech.uzabase.com/entry/2024/05/31/153530

Playwright を使った E2E テストを AWS 上で実行している事例紹介です。
具体的には、テスト実行のタイミングや、Slack コマンドを用いたデプロイとテスト実行のフロー、インフラのアーキテクチャ、Allure Report によるレポート生成、そして CodeBuild や CloudFront、Route53 の設定について詳しく解説しています。インフラ管理は AWS CDK で行っているそうで、そちらの紹介もされています。

自分はこれまで、GitHub Actions で E2E テストを実行し、テストレポートを S3 にアップロードした経験がありますが、E2E テストの実行環境を AWS に寄せると、権限まわりで考えることが減り、テストのためのインフラ構成がシンプルになりそうでいいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## npmに公開していたパッケージをjsrにもpublishしてみた
https://zenn.dev/kesin11/articles/20240530_publish_jsr

npm レジストリに公開しているパッケージを jsr にも公開する方法について紹介している記事です。

記事では、JSR 上でのパッケージ作成から始まり、publish 方法や、npm と jsr でバージョンを揃えての publish、公開したパッケージの Deno、Node.js での動作確認、GitHub Actions 上での publish 時の provenance についてなどが書かれています。

JSR のことはあまりよく知らなかったので、認証方法や利用方法、npm にも公開する際の工夫などが参考になりました。僕も JSR にも公開していきたいです。

（実はこの記事はこの Productivity Weekly の共同執筆者である Kesin11 さんが書いた記事です）

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 1Passwordを利用したSSH時のToo many authentication failuresを回避する | DevelopersIO
https://dev.classmethod.jp/articles/ssh-1password-avoiding-too-many-authentication-failures/

1Password には SSH のエージェントが付属しており、秘密鍵を 1Password に安全に保管したまま他のマシンと共有できます。ただ複数の鍵を登録している場合、Too many authentication failures が発生することがあります。
この記事ではそれがどうして発生するのか、どう解決できるかが詳しく載っています。

私も仕事とプライベートの鍵 2 つを切り替えて使っているのですが、`~/.ssh/config` で公開鍵を指定することで切り替えて運用できるのは知りませんでした。
記事中にもある通り、1Password のエージェントは `~/.config/1Password/ssh/agent.toml` に登録している鍵の分だけログインを試行します。2 回鍵の解除を求められて面倒だなと思っていたのですが、公開鍵を指定する方法ならホスト名を工夫するだけで上手く切り替えられそうです。

設定を上手く工夫して、少しでも開発生産性を上げていきたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_


# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [PodmanでRosettaを使う - 赤帽エンジニアブログ](https://rheb.hatenablog.com/entry/podman-rosetta)
    - Docker Desktop 代替ツール Podman で Rosetta が使えるようになったとのことです
    - 昔から Podman を使っている人は新たな仮想マシンを作成する必要があるようなので、Podman 使いで Mac の人は試してみてください

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
大変遅くなってしまいすみません。色々と忙しくて気づいたら 6 月も終わる時期になってしまいました。

そういえば、サイボウズの生産性向上チームで、Software Design 2024 年 7 月号に寄稿させていただきました。GitHub Actions 実践講座というテーマです。気になる方はぜひ読んでみてください。

https://x.com/gihyosd/status/1802904736037011849

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
