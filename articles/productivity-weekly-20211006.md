---
title: "Productivity Weekly (2021-10-06号)"
emoji: "🏋️‍♀️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 46 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions: DRY your GitHub Actions configuration by reusing workflows | GitHub Changelog
https://github.blog/changelog/2021-10-05-github-actions-dry-your-github-actions-configuration-by-reusing-workflows/

GitHub Actions にワークフローを再利用する機能が追加されました（パブリックベータ）。同じリポジトリ、public リポジトリ、設定でアクセスが許可された internal リポジトリのワークフローを呼び出せます。

最近複合アクションで uses が使えるようになり、再利用がしやすくなりましたが、アクションはジョブレベルの再利用となるのでワークフローの再利用とは使う場面が異なってきそうです。

実際に試してみました。
https://zenn.dev/korosuke613/scraps/dc18529983a95e

再利用可能なワークフローは他の再利用可能なワークフローを呼び出せない、env は引き継がれないなどの制約が色々あるので使う前にちゃんとドキュメントを読むことをお勧めします。

なかなか使い勝手が良さそうなのですが、再利用可能ワークフローを呼び出す際に、同じリポジトリ内でもブランチ名かコミットハッシュを指定する必要があり、そこがどうしようとなる場合が多そうです（再利用可能ワークフローの開発中は main ブランチを指定できないため）。とりあえずタグを生やして使うのがいいかもしれません。

典型的なワークフローの共通化だけでなく、ジョブが失敗したときに Slack へ通知したり、ワークフローからワークフローを呼び出す[^dispatch]のが楽になりそうです。有効に使っていきたいですね。

[^dispatch]: 今までは `repository_dispatch` かなんかして別ワークフローとしないといけなかったし。

## A new public beta of GitHub Releases: How we’re improving the release experience | The GitHub Blog
https://github.blog/2021-10-04-beta-github-releases-improving-release-experience/

GitHub Releases のパブリックベータが公開されました。リリースノートの自動生成や UI 改善などが含まれています。

![](/images/productivity-weekly-20211006/releases_beta.png =450x)
*右上のユーザアイコンをクリックすると出てくる吹き出しにある「Feature preview」をクリックした際に出てくるモーダルから有効にできます*

自動生成されるリリースノートには、リリースに含まれるプルリクエスト一覧と初めてのコントリビューターが含まれます。設定ファイルを用意することでカスタマイズが可能です。また、WebUI からだけでなく、API が用意されているため、リリースを自動化している場合も利用できます。ただ、自動化する際にコミットメッセージを見て major リリース、minor リリースを判断しているような場合は既存の方法を使い続けるのが良いかもしれません。

リリースノートの自動生成は既存のツールがいくつかありました[^changelog]が、GitHub 公式が用意してくれるのは嬉しいですね。リリースノート作成にかける手間も減らしていきたいです。

[^changelog]: [conventiolnal-changelog](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli) など。

## Set up Tracing on a CircleCI Workflow
https://docs.datadoghq.com/continuous_integration/setup_pipelines/circleci/

[ちょっと前に登場した CircleCI の Webhooks 機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20210728#%E3%82%A6%E3%82%A7%E3%83%96%E3%83%95%E3%83%83%E3%82%AF(webhooks)-%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E9%96%8B%E5%A7%8B---community---circleci-discuss)を利用して Datadog で CI ダッシュボード的なやつを簡単に作れるようになってました。いつからできるようになったのかはちょっとわからなかったです[^when]。

利用したい Project の Webhooks に Datadog の API キーを含めた Webhook URL を設定するだけ（詳しくはリンク先）で利用できます。

試しに適当なワークフローを用意して使ってみました。

![](/images/productivity-weekly-20211006/datadog-ci-visibility.png =500x)
*CI Visibility の Pipeline 可視化画面*

![](/images/productivity-weekly-20211006/datadog-ci-visibility-dashboard.png =500x)
*Pipeline のダッシュボードもあった*

:::message alert
Datadog CI Visibility は現在ベータ版であり、機能自体は無料で使えるとのことです[^free]。しかし、いつ有料になるかわからないことと、まだベータ版であることは注意しておきましょう。
:::

CircleCI にも Insights 機能があり、どのワークフロー、ジョブが不安定かやボトルネックになっているかが調査できますが、Datadog に親しみのある方にとっては Datadog 上でも分析できた方が嬉しいかもしれません。個人的にはとにかく簡単に設定できるのが良かったです。

[^when]: もしかしたら 9/2 の時点で使えるようになってたかも -> [CircleCI、ソフトウェア開発者の生産性を高める Webhook 機能を発表: Datadog、Sumo Logic などのテクノロジー パートナーとの連携が可能に ｜CircleCI合同会社のプレスリリース](https://prtimes.jp/main/html/rd/p/000000014.000045056.html)

[^free]: > CI Visibility はベータ版です。この期間中にパイプラインやテストをトレースしても、請求内容には影響しません。https://docs.datadoghq.com/ja/continuous_integration/

## Enterprise managed users are now generally available for GitHub Enterprise Cloud | The GitHub Blog
https://github.blog/2021-09-30-enterprise-managed-users-generally-available-github-enterprise-cloud/

GitHub Enterprise Cloud において、エンタープライズ管理ユーザー (EMU: Enterprise Managed Users) アカウントの作成と管理ができるようになりました。EMU は各種 Identity Provider (Azure AD、Okta)と連携して管理できる、会社用の GitHub アカウントのようなものになります。

EMU には以下のような特徴を持つことが記事中や[ドキュメント](https://docs.github.com/en/github/setting-up-and-managing-your-enterprise/managing-your-enterprise-users-with-your-identity-provider/about-enterprise-managed-users)から読み解けます。他にも色々あるので詳細はドキュメントをお読みください。
- IdP と連携したユーザアカウント作成・更新・削除の自動化
- ユーザログインイベントなどアカウントに対する追加の監査ログ
- IdP で定義されたメールアドレス、表示名と同じアカウント（であるため、知らないユーザもすぐに誰かわかる）
- EMU が作成できるリポジトリは private のみ（であるため、誤って公開される可能性を減らせる）
- EMU は所属エンタープライズ以外のユーザやリポジトリに干渉できない
- EMU は所属エンタープライズが所有するリポジトリを EMU が所有するリポジトリとして private に fork できる[^internal]

とまあこのように、エンタープライズに所属させるユーザの管理を簡単にするだけでなく、ユーザの権限を大幅に制限することでソースコードの流出など事故の可能性を減らせることができそうです。

さまざまな理由で fork が禁止されているエンタープライズにおいては、社内 OSS（innersource）の実現が難しいと考えます。EMU を使うことで fork を許可されて、社内 OSS（innersource）を加速させられるかもしれません。個人的にはここが一番気になっています。しかし、私物アカウントと完全に切り離されることでいわゆる草(Contribution graphs)を生やせなくなるかもしれません。個人的には草は生やしたいですね。

まだまだわからないことが多いので、試してみたいところですが、簡単に試せるような代物ではないため、やってみた系記事が出たら読みたいところです。

[^internal]: private として fork したら同エンタープライズの他ユーザから read できないと思うけど、internal にはできないのだろうか？

## AWS Step Functions が、ワークフローの自動化を容易にする 200 の AWS サービスのサポートを開始
https://aws.amazon.com/jp/blogs/news/now-aws-step-functions-supports-200-aws-services-to-enable-easier-workflow-automation/

AWS Step Functions において、サポートされるサービスの数が 17 から 200 以上に拡大しました。それに伴い、利用できる API の数が 46 から 9000 以上に拡大しました。AWS Step Functions は AWS のいろいろなサービスを組み合わせてワークフローを作ることができるサービスです。

これまではサポートされてないサービスに関しては API を叩く処理をラップした AWS Lambda 関数を用意する必要があり面倒でしたが、そういった Lambda 関数を減らすことができて開発、保守がよりしやすくなります。

アップデートに伴うデモを早速クラメソさんが記事にしていました。
\[UPDATE]AWS Step Functions が 200 以上の AWS サービスと連携できるようになりました
https://dev.classmethod.jp/articles/aws-step-functions-200-aws-sdk-integration/

これまでは利用できるサービス・API 数があまりなかったため AWS Step Functions を使ってみようという気があまり起きませんでしたが、今回の拡張で使ってみたい欲が高まってきました。

## AWS とサードパーティーのサービスにアクセスするための統一された API である AWS クラウドコントロール API
https://aws.amazon.com/jp/blogs/news/announcing-aws-cloud-control-api/

AWS の各リソースの作成、取得、更新、削除、一覧表示(CRUDL[^crudl])を同じインターフェイスで実行できる AWS Cloud Control API がリリースされました。

既存の API とは別に開発されているものであり、既存の API と比べて、入力と出力のインターフェースが統一されています[^interface]。既存の API はインターフェースが統一されていないため、個別の API の学習や管理が困難になっているという課題があったと記事中で述べられています。また、Terraform や Pulumi など、AWS の API を大量に扱うプロダクトにおいては CloudControl API を利用することにより開発や保守が行いやすくなるというメリットがあるようです。

また、CloudControl API は API コールに `client-token`（UUID を渡すなどリクエストごとに常に一意となる値がお勧めされている）を渡すことで冪等性を保証するための仕組みがあります。こちらで冪等性の仕組みを用意する手間が省けそうです。

CloudControl API を使うことによる追加料金はなく、ほぼ全てのリージョンで利用できます。対応リソースも今後さらに拡大していく予定とのことです。API 利用が楽になりそうで良いですね。

[^crudl]: Create、Read、Update、Delete、List の略。CRUD はよく聞くけど一覧表示(List)も加えるのは初めて見た。
[^interface]: サービスやリソースによって入力は全く違うものとなりそうだけどどこまで統一できるのだろうか。（出力の細かいフィールドは `.ResourceDescription.Properties` に JSON として入るらしい。）

# know-how 🎓

## 「それ、どこに出しても恥ずかしくないTerraformコードになってるか？」 / Terraform AWS Best Practices - Speaker Deck
https://speakerdeck.com/yuukiyo/terraform-aws-best-practices

AWS の中の人による Terraform で AWS を管理する際のプラクティス紹介スライドです。本番環境で Terraform を用いたチーム開発手法などを学ぶことができます。Terraform 概要、State 管理ベストプラクティス、ファイル構成の基本、ファイル構成プラクティスなどがわかりやすく載っています。

説明がとてもわかりやすかったです。Terraform 触りたての人にステート管理やファイル構成を説明するときに使えそうだと思いました。Terraform x AWS のプラクティスの 1 つとして知っておきたいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Let's EncryptのルートCA期限切れで OpenSSL 1.0.2が思わぬ事故を起こす件 | ワルブリックス株式会社](https://www.walbrix.co.jp/article/openssl-102-letsencrypt-crisis.html)
  - 2021 年 10 月 1 日、Let's Encrypt 発行の証明書が期限切れてないのに何故か信頼されなくなる問題が各地で発生しました。この記事はその問題の原因と対策を解説しています。非常にわかりやすいです。
  - 僕も古いマシンで wget できなくなって有効期限大丈夫なのになんで〜となっていたのですが、この記事のおかげで救われました。
- [Google Cloud Storage（GCS）でうっかり30万以上溶かした話 - のんびりしているエンジニアの日記](https://nonbiri-tereka.hatenablog.com/entry/2021/10/02/092824)
  - Google Cloud Storage（GCS）でクラウド死した話です。
  - GCS はどこから利用するかで課金額が変わるため、うっかり高額課金されてしまったようです。この記事では詳細の原因と対策が記されています。
  - 皆さんもクラウド死には気をつけましょう。
- [Protect your privacy with 1Password and Fastmail | 1Password](https://blog.1password.com/fastmail-masked-email/)
  - 1Password とメールホスティングサービスの [Fastmail](https://www.fastmail.com/) が提携し、1Password に[「Apple でサインイン」や iCloud+ のような](https://support.apple.com/ja-jp/HT210425)ランダムなメールアドレスを生成する機能が追加されました。
  - 1Password でログイン情報を作成する際、シームレスにランダムなメールアドレスを生成できます。
  - ただし、あくまで Fastmail との連携機能であるため、Fastmail との契約も必要になります。Fastmail は月額$3、年額$30 から利用可能です。
- [GitHub で Markdown ファイルのビューを切り替えられるようになりました](https://twitter.com/github/status/1443572280924147717)
  - 以前 [GitHub の Markdown をレンダリングするかどうかをクエリパラメータで設定できるようになった話](https://zenn.dev/korosuke613/articles/productivity-weekly-20210707#parameter-to-disable-markdown-rendering)をしましたが、これがボタンでできるようになりました。

# あとがき
最近、あさかつ！と称して競技プログラミングを毎朝やる活動を同期と始めました。アルゴリズム力はそもそも全く無いのでなかなか苦戦しています。しかも普段使わない Rust で挑戦しているのでますます苦戦しています。でも普段書くコードと全く異なってくるのでなかなか楽しいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### PROJECT COMP
https://project-comp.com/

PROJECT COMP はエンジニア向けの給与データベースサービスです。「給与市場を透明に。キャリアをもっと自由に。」を目的としています。去年くらいから存在していたのですが、[最近リニューアルした](https://project-comp.com/news/20210907.01)ので紹介します。

有志が登録した給与の情報から、各企業や各職種、各年次のデータを閲覧でき、自身の給与がどれくらいの位置に存在するかを知ることができます。統計情報の作成に必要なデータ数が集まるまで統計情報は公開されないため、身バレする可能性がある程度低いようになっています。また、平均だけじゃなく中央値も見られるのが嬉しいですね。中央値やその他の詳細を見るには登録する必要があります。

僕が働いてるサイボウズ株式会社のデータもあります。登録する人が増えれば増えるほど精度が増すので、もっと色んな人に登録してほしいですね。自身の給与の位置を知りたい人は登録してみてください。
