---
title: "Productivity Weekly (2023-10-25号)"
emoji: "🚕"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231025"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-25 単独号です。

今回が第 130 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Actions - Prevent self-reviews for secure deployments across Actions environments - The GitHub Blog 
https://github.blog/changelog/2023-10-16-actions-prevent-self-reviews-for-secure-deployments-across-actions-environments/

GitHub Actions は[environmentへのデプロイに対してレビューを必要とする設定](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment#required-reviewers)が以前から可能でした。レビュワーには個人やチームを設定可能で、実はジョブをトリガーした本人がレビュワーに含まれていた場合はセルフレビューで通すことも可能だったのですが、今回それを禁止するオプションが追加されました。

デプロイ実行時に必ず本人とは別人による確認が必要と考える場合には、今回追加された `Prevent self-review` のオプションを追加すると良いでしょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Rate limits for /rate_limit REST API endpoint - The GitHub Blog 
https://github.blog/changelog/2023-10-18-rate-limits-for-rate_limit-rest-api-endpoint/

GitHub において、API のレートリミットを確認するための `GET /rate_limit` エンドポイントがレートリミットの対象になりました。これまでは `GET /rate_limit` はレートリミットの対象外でした。

GitHub のレートリミットにはプライマリとセカンダリの二種類があります。今回 `GET /rate_limit` がレートリミットの対象となるのはセカンダリレートリミットになります。プライマリレートリミットの制限は引き続きありません。

:::message

[プライマリレートリミット](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#rate-limits)はざっくり言うと長い期間内での制限となります。例えば個人アカウントの単純なアクセストークンによるリクエストは 1 時間あたり 5000 に制限されています。（エンドポイントによっては異なる値が設定されていたりしますが、今回は割愛します。そこについて詳しく知りたい方は [`GET /rate_limit` のドキュメント](https://docs.github.com/en/rest/rate-limit/rate-limit?apiVersion=2022-11-28#get-rate-limit-status-for-the-authenticated-user)を読むのが良いです。）

[セカンダリレートリミット](https://docs.github.com/en/rest/overview/resources-in-the-rest-api?apiVersion=2022-11-28#secondary-rate-limits)はざっくり言うと短い期間内での制限となります。短い期間内で大量にリクエストを送るようなことをすると制限にかかります。明確にどれくらい送れば制限にかかるかの数字は定義されていません。どのようにすれば回避できるかは [Best practices for using the REST API](https://docs.github.com/en/rest/guides/best-practices-for-using-the-rest-api?apiVersion=2022-11-28#dealing-with-secondary-rate-limits) に載っています。各リクエストの間は少なくとも 1 秒開けてね、など。
:::

この変更の目的は悪用されるパターンを防ぐためとのことです。`GET /rate_limit` をめちゃくちゃ呼び出して GitHub API に負荷をかけるようなことをされたんですかね？（想像）

今回の変更で `GET /rate_limit` はセカンダリレートリミットの制限がかかるようになりましたが、常識的な使い方をしている人々には影響しないと思います。不安な方は [Best practices for using the REST API](https://docs.github.com/en/rest/guides/best-practices-for-using-the-rest-api?apiVersion=2022-11-28#dealing-with-secondary-rate-limits) に則れているか確認しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Rotate Your SSL/TLS Certificates Now – Amazon RDS and Amazon Aurora Expire in 2024 | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/rotate-your-ssl-tls-certificates-now-amazon-rds-and-amazon-aurora-expire-in-2024/


# know-how 🎓

## pull_request_target で GitHub Actions の改竄を防ぐ 
https://zenn.dev/shunsuke_suzuki/articles/secure-github-actions-by-pull-request-target

`pull_request_target` イベントを用いて、仮に workflow ファイルへの悪意ある変更を含むプルリクエストが送られたとしても、CI を安全に実行したいという記事。

プライベートリポジトリで複数人で開発している状況で、仮に bot、もしくは開発メンバーのアカウントが侵害されてしまった状況といったかなり高度なセキュリティを想定しているように感じられます。記事にもあるように、試しに検証した後に、Terraform のモノレポで terraform plan/apply をしているような強い権限を扱うリポジトリに対して検討すると良いでしょう。`pull_request` から `pull_request_target` に変更する流れに関しても実例を交えて丁寧に解説されています。

記事を書かれた Shunsuke Suzuki さんの [GitHub Actions の Workflow の改変を防ぐ](https://zenn.dev/shunsuke_suzuki/articles/gha-trigger-action) の記事も併せて読むと、便利な GitHub Actions を使いたい気持ちと、Terraform のモノレポのような強い権限を渡す CI をどうセキュアに実行するかという 2 点の両立は工夫しないと結構難しいのだろうと感じます。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Goの自動テスト高速化のための調査と改善手法 - Cluster Tech Blog
https://tech-blog.cluster.mu/entry/2023/10/19

CircleCI 上で回る Go の自動テストが 10 分ほどかかっていたのを 5 分ほどに改善する過程が書かれています。

CircleCI の TIMING タブを活用して実行時間の割合の大部分を占める `make test` ステップから順に対処していき、結果としてどのステップがどの程度短縮されたか書かれています。計測、改善の効果の評価、改善を加えるかどうか決定、という一連の流れが参考になります。

具体的には、以下のように Go のテストコードに直接手を加えず CI レベルでの改善を入れる方針でした。

- `go generate` の生成物のコミットを行って CI の `go generate` を行う過程を省略する。
- [gotesplit](https://songmu.jp/riji/entry/2020-10-23-gotesplit.html) を用いて CircleCI レベルでの並列化を入れる。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## AWSでの法令に則ったログ設計及び実装/分析 - Adwaysエンジニアブログ 
https://blog.engineer.adways.net/entry/2023/10/20/140000

IPA がまとめている関連する法令・ガイドラインを参考に、監査ログとアクセスログの保持期間を決め、AWS 上でログの保存と分析ができるように実装する流れが書かれています。

記事では以下のログを S3 に保管します。

- AWS で取得できるログ(CloudTrail、VPC フローログ、ALB・NLB のアクセスログ)
- OS のログ( `/var/log/messages`, `/var/log/secure` )
- アプリケーションのログ(監査ログ、アクセスログ)

さらに、OS やアプリケーションのログを fluentbit を用いて S3 に転送する方法と、AWS で取得できるログを S3 へ保管するための設定について説明されています。
どういったログを残せばいいか、ログの保持期間をどう決めたらいいか悩むことがあれば参考にしていきましょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 【書き起こし】社内用GitHub Actionsのセキュリティガイドラインを作成した話 – Toshiki Kawamura【Merpay & Mercoin Tech Fest 2023】 | メルカリエンジニアリング 
https://engineering.mercari.com/blog/entry/20231023-mmtf2023-day2-11/

## Hatamoto 〜モバイルアプリに関する情報を一元管理するためのWebアプリケーション〜 - クックパッド開発者ブログ 
https://techlife.cookpad.com/entry/hatamoto

iOS の開発時に必要な各種証明書の有効期限の管理と、アプリで使われているライブラリのバージョンを Web アプリケーションで一元管理するというノウハウの紹介記事です。

開発規模が小さいうちは証明書の期限管理はチームのカレンダーに登録するだけで十分だと思いますが、万が一見逃してしまった場合の影響範囲は大きいため、開発規模が大きい組織ではこのように一元管理して運用をなるべく自動化するメリットがあるのだろうと思います。

記事中で紹介されている Hatamoto という Web アプリケーションは公開されていないようですが、内部の仕組みは紹介されているので興味を持った方は似たようなツールを自前で作成するのも良いかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## OpenTelemetryのここ4年の流れ / OpenTelemetry in last 4+ years - Speaker Deck 
https://speakerdeck.com/ymotongpoo/opentelemetry-in-last-4-plus-years

10/19 に開催された OpenTelemetry Meetup 2023-10 で発表された内容のスライドです。

https://opentelemetry.connpass.com/event/296353/

OpenTelemetry は、分散トレーシング、メトリクス、ログ、プロファイルの計装とログの標準仕様および実装を提供するプロジェクトです。複数の領域を扱うプロジェクトであることから成り立ちが少々複雑なのですが、この発表では、OpenTelemetry の歴史と現在の状況、そして今後の展望について解説されているのでこの発表を見ることで大まかな状況を把握できると思います。

自分自身、OpenTelemetry を過去に調査した際に Jaeger, OpenTracing, OpenCensus などの様々な OSS やプロジェクト名が登場してきたので、どれがどのように関係していて今現在でも有効な話なのかどうかを整理するのに苦労した経験があります。これから OpenTelemetry について調べる予定がある方はまずこの発表で歴史と全体像を把握しておくと混乱せずに済むのでオススメです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 【コードリーディング】Terraform が Core と Provider との間で RPC 通信するところを覗いてみた👀 - サーバーワークスエンジニアブログ
https://blog.serverworks.co.jp/2023/10/20/153424


# tool 🔨

## より高速なRubyのWebAssembly実装「Ruvy」、Shopifyがオープンソースで公開。Ruby仮想マシンとRubyアプリを組み合わせてビルド － Publickey 
https://www.publickey1.jp/blog/23/rubywebassemblyruvyshopifyrubyruby.html



# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
