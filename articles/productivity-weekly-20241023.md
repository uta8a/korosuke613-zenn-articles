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

AWS Lambda で Amazon S3 をイベントソースとして設定していて、再帰ループが発生した場合には自動で停止するようになりました。

例えば、S3 に画像が保存されると Lambda で画像処理して S3 に保存し直すソリューションを考えてみます。
イベントの設定方法によっては、S3 に保存し直したタイミングでまた Lambda が発火してしまい、再帰ループが発生することが容易に考えられます。

今回の変更により、AWS はデフォルトでこの再帰ループを検出し、停止するようになりました。
迂闊な設定をしてしまっても、少なくともクラウド破産は逃れることができそうです。

なお、この再帰ループ検出・停止を止める方法もドキュメントに書かれていますが、余程のケースでない限りはデフォルトの停止で良いかと思います。
https://docs.aws.amazon.com/lambda/latest/dg/invocation-recursion.html

最近 AWS Lambda はこのような再帰ループの検出・停止に力を入れてくれていて、開発者としては安全側に倒してくれてありがたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## ウェブアプリケーション用 Storage Browser for Amazon S3 の発表 (アルファリリース) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/storage-browser-amazon-s3-alpha-release/

Amplify UI で構築できる S3 のストレージブラウザが開発されているようです。

次の GitHub の Issue 上で積極的に意見交換が行われている段階のようで、まだすぐ使えるコンポーネントになっているわけではないようです。
https://github.com/aws-amplify/amplify-ui/issues/5731

S3 内のオブジェクトを横断して操作するような社内用のアプリケーションなどを、AWS 公式のコンポーネントを使ってサクッと作れるようになるのは嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWS Lambda console now features a new code editor based on Code-OSS (VS Code - Open Source) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-lambda-code-editor-based-code-oss/

AWS マネジメントコンソールでの AWS Lambda のエディタが、Code-OSS（VSCode の OSS 版）に置き換わるようです。
現在（2024-11-08）AWS マネジメントコンソールで Lambda の編集を試みると、Code-OSS に変わっていることが確認できます。

以前までのエディタは、ベースに Cloud9 を使用していました。
現在 AWS Cloud9 は新しいユーザーにはサービスを停止しており、縮小の傾向にあります。
https://x.com/jeffbarr/status/1818461689920344321
https://aws.amazon.com/jp/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/

その一環として、Lambda のエディタも別のものに変更する必要があったものと推察します。

以前のエディタを使用したい場合は「Switch to the old editor」をクリックすることで Cloud9 のものを使用できますが、いずれ Code-OSS のみとなることが予想されます。
マネジメントコンソールでコード編集している方は、今のうちに Code-OSS に慣れると良いかもしれません。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Terraform Stacks, explained
https://www.hashicorp.com/blog/terraform-stacks-explained
https://developer.hashicorp.com/terraform/language/stacks

Terraform Stacks の機能と使い方を紹介 - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2024/10/21/190000

## AWS、コンソールの操作をコードに変換してくれる「AWS Console-to-Code」正式リリース － Publickey
https://www.publickey1.jp/blog/24/awsaws_console-to-code.html

AWS マネージドコンソールで操作した内容を、生成系 AI を使用してコードとして出力してくれるサービスがリリースされました。

出力されるコードの形式は AWS CDK か、CloudFormation です。Terraform は無いので、今後に期待しています。
また使用できる AWS のサービスは Amazon EC2、Amazon VPC、Amazon RDS のみです。これもおそらく今後増えることでしょう。

料金体系としては無料枠が存在し、その上限に到達以降は Amazon Q Developer Pro の契約が必要とのことです。
無料枠についての具体的な数値について、筆者は見つけられませんでした...
https://aws.amazon.com/q/developer/pricing/

IaC 初学者の人にとって非常に役立ちそうなサービスだと感じました。
これを機に IaC を始める人が増えてくれると嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

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

Amazon EC2 で稼働しているウェブアプリケーションを、AWS Fargate にダウンタイムゼロで移行した事例が紹介されています。

Route53 のルーティングポリシーで加重に変更し、徐々に Fargate の方にトラフィック量を増やしていきます。
すべてのトラフィックを Fargate に変更してから EC2 インスタンスを削除することで、慎重な移行が実現されています。

Route53 の加重ルーティングは他にもいろんなサービスの移行で使用できそうなので、参考になりました。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## tfaction でトランスパイルした JS をコミットするのを止めた
https://zenn.dev/shunsuke_suzuki/articles/tfaction-stop-transpile-local

## zsh + fzf で「あの時作業していたあのブランチ」を快適に探す
https://www.mizdra.net/entry/2024/10/19/172323

## 「攻めた」AWS Fargate Spot比率の見直し時
https://developer.hatenastaff.com/entry/2024/10/11/163931

オンデマンドインスタンスとスポットインスタンスの比率についてのお話です。

オンデマンドインスタンスを使用することでコストは高くなりますが、中断のリスクが無いため可用性を担保できます。
スポットインスタンスを使用することでコストは低くなります、中断のリスクがあり可用性が下がります。
この 2 つのインスタンスタイプの比率を上手く調整できれば、可用性とコストの天秤を釣り合わせることができます。

記事によれば、中断のリスクが低いと判断してスポットインスタンスの比率を上げて「攻めた」比率にしていたそうです。
しかし直近数ヶ月で東京リージョンでのスポットインスタンスの中断が増えており、コンピューティング能力が低下する事態が発生したとのことです。

キャパシティ低下による中断をモニタリングして、適宜調整する必要があるという学びを得ることができました。
ちなみに筆者はプライベートで ECS クラスタを運用しており、ap-northeast-1 の amd64 のスポットインスタンスを利用しているのですが、確かにここ数ヶ月で中断が増えた気がします。
プライベートではこの中断をきちんとモニタリングしていないので、モニタリングしようと決意を新たにしました。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWSのARNに日本語文字や絵文字が入ることがあるのを知っていましたか？ - Diary of a Perpetual Student 
https://blog.arthur1.dev/entry/2024/10/16/110000

AWS のサービスによっては ARN に非 ASCII 文字を設定できるものがあるようです。
記事では AWS Step Functions のステートマシン名で指定できることが記載されています。

筆者が他に無いか調べてみると、S3 のオブジェクト名には UTF-8 の文字を使用可能であることを見つけました。
https://docs.aws.amazon.com/en_us/amazonq/latest/qdeveloper-ug/console-to-code.html
しかしドキュメントにも書かれている通り、非 ASCII 文字の使用は不具合の元になるため、避けるべきでしょう。

筆者は ARN に非 ASCII 文字を設定できるサービスがあるということを今回初めて知りました。
ARN は API などでよく使うので、設定可能な文字は特に制限されているイメージがありました。
非 ASCII 文字を使用した ARN について（おそらく）実用性は無く、記事で指摘されているようにむしろ他のサービスとの連携に問題が発生するので、ARN に影響する場合は ASCII 文字のみ使用するように気をつけた方が良さそうです。

ただ絵文字の入った ARN を思うと面白いですね🐟🐡🐠

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

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
