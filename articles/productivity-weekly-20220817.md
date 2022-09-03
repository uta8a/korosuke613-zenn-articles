---
title: "Productivity Weekly (2022-08-17号)"
emoji: "🥟"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220817"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 87 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## New for Trivy: CSPM Identifies Misconfigurations of Your AWS Services
https://blog.aquasec.com/now-you-can-scan-your-aws-services-for-security-issues-with-trivy

https://dev.classmethod.jp/articles/aws-security-scan-by-trivy/

セキュリティスキャンツール trivy の v0.31 から AWS アカウントをセキュリティスキャンできるようになりました。

AWS CLI と同じ認証方法を利用でき、認証が通った環境で `trivy aws --region <REGION>` するだけでスキャンできます。権限は ReadOnlyAccess[^read] ポリシーが付与されたユーザ/ロールの利用がおすすめされています。
IaC 設定のスキャンを行う `trivy config` と同じルールが使われるようです（[おそらくこれ](https://avd.aquasec.com/misconfig/aws/)）。

さっそくいくつかの解説記事が出ていました。

- [Scanning for AWS Security Issues With Trivy | liamg](https://lia.mg/posts/trivy-aws/)
  - この人は Trivy のコントリビューターっぽい
- [TrivyでAWSアカウントのセキュリティスキャンができるようになりました | DevelopersIO](https://dev.classmethod.jp/articles/aws-security-scan-by-trivy/)
  - 記事では Cloud9 の環境を作成していますが、CloudShell でも実行できました。手っ取り早く試したいのであれば、ReadOnlyAccess なユーザでログインして CloudShell 上で試すのが楽です

僕も個人の環境で試したところ、いろいろと古のカスタム IAM ポリシーなどがよろしくないと引っかかって面白かったです（消しました）。また、[ネットワーク ACL がすべてのポートを許可しちゃってるぞと怒られた](https://avd.aquasec.com/misconfig/aws/ec2/avd-aws-0105/)りもしたのですが、結局セキュリティグループ側でポートの制限するしな〜とも思いました。

チェックまでの行程が楽なのが嬉しいです。気づかず AWS のセキュリティがよろしくなくなってることもあるので、たまにチェックしてみたいですね。

[^read]: `arn:aws:iam::aws:policy/ReadOnlyAccess` のことかと思われる。

# know-how 🎓

## 開発環境のセキュリティおよびCI/CDパイプラインのセキュア化
https://speakerdeck.com/rung/training-devenv-security-ja

本番環境を直接狙うのではなく、開発環境や CI/CD パイプラインを狙った攻撃と対処方法などを背景含めて説明しているスライドです。

このスライドでは、開発環境の変化と攻撃の流れ、開発環境が攻撃された場合に何が起こるか、CI/CD パイプラインへの攻撃・対策などが解説されています。また、演習もいくつか用意されているので、手を動かしながら理解できます。

本番環境への攻撃を解説した資料は世の中に数多くあると思いますが、開発環境に焦点を当てて解説している資料は比較的少ないと思います。最近は本番環境へのデプロイを人手で行わなくなってきたのもあり、本番環境やアプリケーションだけでなく、デプロイパイプラインをいかにセキュアにするかは個人的にとても興味のあるトピックでした。

開発者の端末が侵害された場合にどのようなクレデンシャルが取られるか、CI/CD パイプラインの守り方当たりが特に個人的に参考になりました。なかなかの文量なので読むのが大変かもしれませんが、ぜひ読むことをお勧めします。

## 開発者のための GitHub Organization の安全な運用と 継続的なモニタリング
https://speakerdeck.com/flatt_security/kai-fa-zhe-falsetamefalse-github-organization-falsean-quan-nayun-yong-to-ji-sok-de-namonitaringu

Flatt Security さんによる GitHub Organization を安全に運用するためのノウハウを紹介したスライドです。

スライドでは、なぜ Organization のセキュリティが大事か、安全に運用するための観点、継続的なモニタリング手法、モニタリングサービスの紹介などが書かれています。

モニタリングツール、サービスの Allstar や Shisho Cloud は知りませんでした。自前でモニタリングの仕組みを作るより楽でよさそうですね。Organization を安全に運用していきたいです。

## Earthly を GitHub Actions で使ってみよう
https://zenn.dev/emiksk/articles/ba3b0183c3f895

Earthly を GitHub Actions で使ってみようという記事です。前回紹介した gRPC サーバのビルドに Earthly を使ってみる話の続きです。

CI 上で実行する際はローカルでの実行と違ってキャッシュのことを考える必要があります。この記事では、Earthly がもつキャッシュ周りの機能が解説されており、`--push` や `--ci`、`--remote-cache` などのオプションのどれを選ぶのが良いかが学べます。トピックブランチにおいてトピックブランチのキャッシュを先に探し、なければ main ブランチのキャッシュを使うようなオプション `--cache-from` を追加したという話もあります。こういう機能はあると嬉しいですね。

また、余談には Earthly が今後提供を計画している Earthly Satellites、Earthly CI の話が出てきます。リモートでの Earthly 実行環境を提供してくれるようです。気になりますね。

CI とキャッシュの話は複雑なのでこういう解説記事があるのはありがたいです。Earthly 流行れ〜

## ここさえ抑えればGitHub API v4がわかる! GraphQL入門
https://zenn.dev/hsaki/articles/github-graphql

GitHub の GraphQL API（旧 GitHub API v4[^graphql]）を使うための GraphQL の仕組みや使い方を解説した記事です。REST API との違いや操作の種類、query、mutation の書き方、変数や型の説明などなど、大ボリュームとなっています。

GraphQL は REST と比べて必要なフィールドを指定しなきゃいけないため、個人的には叩くのがめんどくさくてたまにしか触ることがありません。こういう記事があるとたまに触る時に参照できて良いですね。

[^graphql]: かつて GitHub GraphQL API は GitHub API v4 と呼ばれており、従来の REST API は GitHub API v3 と呼ばれていました。しかし、ちょっと前に v4 という名前は消え、GitHub GraphQL API と呼ばれるようになりました。v3 は GitHub REST API。GitHub としては今後は GraphQL API 一本でやっていきたかったのかもしれませんが現実は厳しかったのかもしれませんね。

# tool 🔨

## IAMの権限昇格を可視化する「PMapper」
https://shinobe179.hatenablog.com/entry/2022/08/09/233421

指定した AWS アカウントを分析し、IAM の権限昇格可能なパスを可視化してくれるツール PMapper の紹介記事です。

この記事では実行方法とグラフの見方を説明してくれています。権限昇格可能な組み合わせをすぐに発見でき、どこのロールが侵害されると危ないかがすぐにわかりそうです。

ロールが複雑になるとどういう関係性があるかわからなくなってくるのでこういうツールでたまに全体像を確認したいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Big Changes Ahead for Deno](https://deno.com/blog/changes)
    - Deno で npm から npm パッケージを直接インポートできるようになる予定らしい。
  - [Specify theme context for images in Markdown GA | GitHub Changelog](https://github.blog/changelog/2022-08-15-specify-theme-context-for-images-in-markdown-ga/)
    - GitHub の Markdown で `<picture>` と `prefers-color-scheme` を組み合わせることでライトテーマやダークテーマに合わせた画像を選択できるようになりました
    - たまにダークモードだとジャギジャギになってる OSS とかあるからそういうとこに良さそう
  - [Webhook を使用した GitHub、Stripe、Twilio からのイベント受信に Amazon EventBridge が対応](https://aws.amazon.com/jp/about-aws/whats-new/2022/08/amazon-eventbridge-supports-receiving-events-github-stripe-twilio-using-webhooks/)
    - EventBridge が GitHub などの Webhook に対応
    - 任意の Webhook を受け取りたくなる

# あとがき
2 週間ぶりくらいに投稿しました。インターン受け入れ準備やら登壇資料作成やらでなかなか書く時間が取れず遅れてしまいすみません。今年も優秀な学生がインターンに来ていて最近の学生はすげーってなってました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
