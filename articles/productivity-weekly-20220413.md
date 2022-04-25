---
title: "Productivity Weekly (2022-04-13号)"
emoji: "💷"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220413"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 70 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message 
**2022/04/25**
公開が大変遅くなってしまいすみません🙇
色々と忙しく、書く時間が全然取れませんでした。
（したがって koneta 多めです。）
:::

# news 📺

## AWS Lambda 関数 URL: Lambda 関数用の組み込み HTTPS エンドポイント
https://aws.amazon.com/jp/about-aws/whats-new/2022/04/aws-lambda-function-urls-built-in-https-endpoints/


AWS Lambda だけで HTTPS エンドポイントを用意できるようになりました（API Gateway いらず）。IAM によるアクセス制限や CORS などを設定できます。別途でかかる費用はありません。東京リージョンですでに利用できます。

URL の形式は `https://<ランダム文字列>.lambda-url.<リージョン>.on.aws/` になります[^lambda_url]。

クラメソさんの記事が詳しいです。パラメータの受け取り方や cookie、CORS、IAM 制限の設定方法などを載せてくれています。

https://dev.classmethod.jp/articles/aws-lambda-function-urls-built-in-https-endpoints/

ちなみに、Serverless Framework は既に AWS Lambda Function URLs に対応しているらしく、こちらもクラメソさんがすぐに記事にしていました（どちらも対応が早い）。
https://dev.classmethod.jp/articles/serverless-framework-function-urls/

Lambda の Webhook が簡単に用意できるようになって良いですね。新規で関数を作る場合に使っていきたいです。

[^lambda_url]: トップレベルドメインに `aws` ってあるんですね。[How Tech Giants Like Amazon And Google Are Playing The Icann Domain Game | TechCrunch](https://techcrunch.com/2012/06/13/how-tech-giants-are-playing-the-icann-domain-game/) によると 2012 年時点で取ってたみたいですね。

## GitHub Action for dependency review enforcement | GitHub Changelog
https://github.blog/changelog/2022-04-06-github-action-for-dependency-review-enforcement/

GitHub Actions において、依存関係をレビューする公式アクション [actions/dependency-review-action](https://github.com/actions/dependency-review-action) が登場しました（パブリックベータ）。

プルリクエストで変更される依存関係をスキャンし、もし依存関係に脆弱性があればそれを警告してくれます。[Dependency graph が対応しているパッケージエコシステム](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph#supported-package-ecosystems)に対応しているとのことです。ちなみに、内部的には [dependency-graph/compare という API](https://docs.github.com/en/rest/reference/dependency-graph#get-a-diff-of-the-dependencies-between-commits) を利用しているようです。

全てのパブリックリポジトリおよび GitHub Advanced Security のライセンスを持つ組織のプライベートリポジトリで利用できます。GitHub Advanced Security の付加価値が上がりましたね。

Dependabot でも脆弱性を持つ依存関係を見つけられますが、Dependabot ではマージ前に検知できません[^dependa_check]。PR のマージ前に検知したいというユースケースに対応するのが actions/dependency-review-action となるわけですね。

[僕も実際に試してみました](https://github.com/korosuke613/playground/pull/19)。わざと脆弱性がある npm パッケージ(async@2.6.3)を入れてみたところ、無事怒ってくれましたね。

![](/images/productivity-weekly-20220413/dependency_action.png)
*実際に試してみた図：`Dependency review detected vulnerable packages.` と怒られてる*

やはりマージ前に検知できるのが嬉しいですね。例えば npm のようにインストール時に警告してくれるパッケージマネージャもありますが、そうではないパッケージマネージャを使っていたり、しっかりとマージを阻止したい場合に活用できそうです。

[^dependa_check]: がんばればできるのかもしれない。

## Required Deployments | GitHub Changelog
https://github.blog/changelog/2022-04-12-required-deployments/

GitHub において、Branch protection の条件に Deployment を指定できるようになりました。これにより、プルリクエストのマージ前に Deployment が成功したことを保証できます。

Deployment を使ってる人にとっては嬉しい変更ですね。自分は Deployment（というか Environments）をあまり触ったことがなかったため Branch protection の条件に入れられないことを知りませんでした。Enviroments もちゃんと触りたい。

## terraform-aws-provider 4.9.0 がリリースされ、S3 に関する一部のエラーが警告に変わりました
https://github.com/hashicorp/terraform-provider-aws/blob/main/CHANGELOG.md#490-april-07-2022

Terraform v4.0 において、[`aws_s3_bucket` リソースに関する破壊的変更](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#terraform%E3%81%AEaws-provider-v4%E3%83%A1%E3%82%B8%E3%83%A3%E3%83%BC%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88%E3%81%AF%E7%A0%B4%E5%A3%8A%E7%9A%84%E5%A4%89%E6%9B%B4%E3%81%82%E3%82%8A---qiita)が追加されました。そのため v3 から v4 へ移行する際に S3 関連のエラーを潰していく必要がありましたが、v4.9 からは `aws_s3_bucket` に関する破壊的変更によるエラーが警告となるようになりました。

すでにこの挙動に関してクラメソさんが調査記事を出しており、こちらの記事も参照するのがおすすめです[^other]。

- [【Terraform】AWS Provider v4.9.0のS3リファクタリングの挙動を試してみた | DevelopersIO](https://dev.classmethod.jp/articles/terraform-s3-v4-9-0-refactoring/)

v4.8.0 への更新と v4.9.0 への更新の 2 つを比較してくれており、また、既存の書き方と新しい書き方の 2 つを両方書いた時の挙動も調べられております。どうやらドリフト検出で無限ループとなるようです。

S3 バケットを多く扱っているプロジェクトにおいては移行作業がなかなか億劫でやる気が出なかったかもしれませんが、Warning 扱いとなったことでとりあえず v4 系に上げようという気持ちになれるかもしれません。しかし、警告だから放置でいいやとはならないので、みなさん早く移行していきましょう。

[^other]: 他にもアプデを試した方が記事を出しているので、こちらも参考になると思います。[[Changes to S3 Bucket Drift Detection] Terraform AWS Provider 4.9のaws_s3_bucketリソースにおけるアップデート内容 | gkzz.dev](https://gkzz.dev/posts/changes-to-s3-bucket-drift-detection-with-aws-provider-v4/)

# know-how 🎓
## 「システム運用アンチパターン」という書籍を翻訳しました｜yuichielectric｜note
https://note.com/yuichielectric/n/n45b907b9dd93

最近発売した「システム運用アンチパターン」という書籍の翻訳をした方による書籍の紹介記事です。

原本「Operations Anti-Patterns, DevOps Solutions」はいくつかの企業で DevOps 改革に取り組んできた Jeffery D. Smith さんという方が書かれた本です。翻訳した田中さんによると DevOps による変革を実践する人のための一冊であり、組織の末端エンジニアが取り組めることについてまとめられているとのことです。

この記事では、どういった本かと各章（2 章〜12 章）の概要が書かれており、どういった内容が学べそうな本かがわかります。

個人的には開発者（運用もするかもしれない）の生産性を上げて製品の価値を素早くデリバリーするという点で結構気になってる本です。気になる方はとりあえずこの記事を読んでみるとよいと思います。

# tool 🔨

## Pull RequestをKubernetesで気軽に試せるOSS、KubeTempuraをリリースしました
https://engineering.mercari.com/blog/entry/20220408-99abbab0d0/

プルリクエストの作成をトリガーに自動で k8s リソースをデプロイしてくれる Kubernetes Operator KubeTempura の紹介記事です。KubeTempura はメルカリが開発している OSS であり、QA などが変更されたコードを簡単に試せるとのことです。

記事では、概要、開発の動機（フレキシビリティーの確保、Operator にした理由）、使い方（構成、基本的な使い方、外部からのアクセス方法）が詳しく説明されています。

プルリクエストの環境が自動で作成されるのは嬉しいですね。本番でも使う k8s リソースから環境を作ってくれるため、自分でアプリケーションの検証用環境をわざわざ用意しなくても良いのが楽で良さそうです（もちろん多少の調整は必要でしょうが）。まだ OSS として出たばかりでバージョンが v0 系だったりとすぐに業務で利用するのは難しいかもしれませんが、面白いアプローチで気になるので触ってみたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Datadog CI Visibility が値下げされてました](https://twitter.com/Shitimi_613/status/1513768940027379717)
    - 以前は Pipeline Visibility と Testing Visibility それぞれが $20/user/month(年額払い)でした
    - Pipeline Visibility が直接値下げされ、それぞれが Per user から Per committer になり実質値下げになってます
    - ~~やっぱ前の価格が高いと思った人多かったのかな。~~
  - [You can now name your fork when creating it | GitHub Changelog](https://github.blog/changelog/2022-04-12-you-can-now-name-your-fork-when-creating-it/)  
    - GitHub で fork 時にリポジトリ名を変更できるようになりました
    - 以前は fork 後にリポジトリ名を変更できました
- **know-how 🎓**
  - [YouTube のチャンネルの更新通知を受け取って Lambda を実行する](https://zenn.dev/meihei/articles/01cd06f729056a)
    - YouTube のチャンネルの通知を受け取る方法として、 YouTube Data API のドキュメントでは Google PubSubHubbub Hub を使った方法が紹介されています
    - [PubSubHubub](https://pubsubhubbub.github.io/PubSubHubbub/pubsubhubbub-core-0.4.html) の仕組みが面白い。名前も
    - Google PubSubHubbub Hub は無料で使えるっぽい。すごい
- **tool 🔨**
  - [Introducing DuckDuckGo for Mac: A Private, Fast, and Secure Browsing App](https://spreadprivacy.com/introducing-duckduckgo-for-mac/)
    - DuckDuckGo が macOS 向けブラウザ DuckDuckGo for Mac を出しました
    - ロード前にトラッカーをブロックすることで高速なブラウジングが得られるとか
    - レンダリングエンジンは macOS 付属の WebKit を利用。
    - まだプライベートベータなので気になる人はウェイトリストに登録しよう
  - [Mizu - API Traffic viewer for Kubernetes](https://getmizu.io/)
    - kubernetes 向けの API トラフィックビューワツールです
    - 複数プロトコルの通信に対応しています
    - トラブルシューティングなどに使えそう。
    - 見るだけでも面白そう 

# あとがき
冒頭にも書きましたが、公開が大変遅くなってしまいすみません。色々と忙しく書く時間が全然取れませんでした。最近リアル勉強会みたいなのに幾つか参加したのですが、やっぱりリアルはいいですね。他の人との交流という観点で。この記事を読んでくださっている方ともお話しできたので、ますます頑張りたいです。

:::message
生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（~~4/22 エントリー開始~~→生産性向上コースのインターンは 5/23 からでした。すみません）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::

## omake 🃏
今週のおまけです。
