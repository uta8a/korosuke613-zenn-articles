---
title: "Productivity Weekly (2021-04-08号)"
emoji: "🍖"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 21 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## Secret scanning for private repositories is generally available! - The GitHub Blog
https://github.blog/changelog/2021-04-01-secret-scanning-for-private-repositories-is-generally-available/
GitHub の secret scanning が GA[^ga]になりました。（ただし [AdvancedSecurity ライセンス](https://github.com/features/security)を持った組織のみ利用可能です。）

secret scanning 機能とは、[外部サービス](https://docs.github.com/en/code-security/secret-security/about-secret-scanning#about-secret-scanning-for-private-repositories)で利用するためのシークレットがソースコードにそのまま埋め込まれてしまっている場合に GitHub がアラートを出してくれる機能です。シークレットが公開されていることを早期に発見できるので、シークレットが不正使用される可能性を減らすことができます。

[去年の5月ごろ](https://github.blog/changelog/2020-05-06-github-advanced-security-secret-scanning-for-private-repositories-now-available-in-limited-public-beta/)[^syazai]からベータ版ですが、 Private リポジトリでも利用できるようになりました。検知できる外部サービスが増えたり、コミット作成者への通知が増えたりなど、ベータ版リリースからいくつかの新機能や修正が追加されたようです。ベータ版リリースから知識のアップデートができていない方は再確認してもいいかもしれません。

[^ga]: Generally Available
[^syazai]: Productivity Weekly 記事を毎週読んでいただけている方は「ん？」となったかもしれません。実は、[3/10 の Productivity Weekly 記事](https://zenn.dev/korosuke613/articles/productivity-weekly-20210310#secret-scanning%3A-notifications-for-commit-authors-on-private-repositories---github-changelog)では、最近使えるようになった旨を書いてしまっていました。僕の知識不足、調査不足でした。申し訳ございませんでした。すでに当該記事は修正しました。

## Announcing Preview of Microsoft Build of OpenJDK | Java at Microsoft
https://devblogs.microsoft.com/java/announcing-preview-of-microsoft-build-of-openjdk/

 https://www.publickey1.jp/blog/21/javamicrosoft_build_of_openjdk.html

Microsoft が Microsoft Build of OpenJDK の提供を発表しました（プレビュー）。Microsoft Build of OpenJDK は LTS かつ無償で利用できます。また、今年の後半には Azure 全体において、Java11 のデフォルトが Microsoft Build of OpenJDK になるようです。

さまざまな企業が OpenJDK ディストリビューションを提供していますが、これに Microsoft が加わったことになります。選択肢が増えることは良いですね。

## Amazon Lex が日本語に対応。東京リージョンでお使いいただけます | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/amazon-lex-tokyo/

Amazon Lex が日本語に対応しました。Amazon Lex を使うことで、対話型インターフェースを構築でき、チャットボットの作成などに利用できます。

今まで日本語での利用はできませんでしたが、4/2 から日本語を使った対話方インターフェースの構築ができるようになりました。簡単なチャットボットを作りたいときに重宝しそうですね。

# know-how

## Behind GitHub's new authentication token formats - The GitHub Blog
https://github.blog/2021-04-05-behind-githubs-new-authentication-token-formats/

[最近、GitHub が発行する認証用トークンのフォーマットが変更されました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210310#authentication-token-format-updates---github-changelog)。

:::message
Personal Access Token の管理画面に行くと、トークンが新しい形式になったから再発行しろと表示されてました。
![](https://storage.googleapis.com/zenn-user-upload/mbpo3z3e3ly71j7s5ciu448ake17)

再発行すると、確かに `ghp_` から始まる文字列のトークンが発行されました。
:::

この記事では、新しい形式へ変更するに至った背景を説明しています。

古いトークンの形式は 40 文字の文字列でした。したがって、SHA ハッシュなどと見分けがつかないことから secret scanning での発見が効率的でなかったり、誤った検出をしてしまったりといった問題があったそうです。そのため、トークンの種類ごとに prefix を付けることにより、それらの問題の解決が期待できるとのことです。さらに、トークンにチェックサムを加えることにより、データベースにアクセスすることなくトークンの誤検知を無くせるようになったり、文字の種類が増えたことによりセキュリティが向上[^mojisuu]したりと言った変更も加わっているとか。

気になるのが古い形式のトークンが今後使えなくなるのかについてですが、これについては特に情報を見つけられませんでした。可能ならば早めに再発行することをおすすめします。

[^mojisuu]: 実は、現在新しい形式のトークンの長さは 30 文字（プレフィックスとチェックサムを除く）です。古い形式から 10 文字減っています。しかし、使える文字の種類が `[a-z0-9]` から `[a-zA-Z0-9]` となったため、エントロピーは新しい形式の方が大きいようです。なお、[トークンの長さは今後さらに長くなる可能性がある](https://github.blog/changelog/2021-03-31-authentication-token-format-updates-are-generally-available/)ようなので、さらにエントロピーは大きくなりそうです。

## The worst so-called “best practice” for Docker
https://pythonspeed.com/articles/security-updates-in-docker/

Dockerfile のベストプラクティスとしてセキュリティ更新のアップデートをしないようにするということが多くの場所で言われているが、それは悪いベストプラクティスであるという記事です。この記事ではなぜそのようなアドバイスがされてしまうのかと、その根拠が誤りである理由が記述されています。

以前 docker 公式ドキュメントのベストプラクティスでは、`apt-get upgrade`や `dist-upgrade` は避けるように書かれていたため、多くの人が `apt-get upgrade` などを Dockerfile 内でしてはいけないと認識していたと思います。（僕もその一人です。）しかし、現在の[ベストプラクティスのページ](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#run)にそのような記述はありません。

そういった認識が今まであったので、セキュリティアップデートは FROM イメージのメンテナに任せていましたが、これからは考えを改めて自分でセキュリティ更新をしていくことを頭に止めておく必要がありそうです。

ただ、レイヤーがキャッシュされているマシンでビルドをした場合、セキュリティ更新があったとしてもキャッシュが効いてしまうので、イメージを配布する場合や開発以外で利用する場合は `--no-cache` オプションをつけるべきでしょう。また、CI などで定期的にビルド&プッシュし、最新版のイメージが利用できるようにしておくことも大事かもしれません。

## 〜その意思決定を刻め〜「アーキテクチャ・デシジョン・レコード(ADR)」を利用した設計の記録 - Quipper Product Team Blog
https://quipper.hatenablog.com/entry/architecture_decision_records

Architecture Decision Records (ADR) の紹介記事です。開発チームでの利用例や利用してみて何がよかったのかが記されています。

ADR は設計判断を文書化したものです。背景、判断材料、決まったこと、選択肢とそれら選択肢それぞれの長所短所などを記します。この記事では、ADR の紹介だけでなく、ADR を書くようにして何が良くなったかが記されています。さらに、利用するためのテンプレート集や利用例も載せているので、ADR を試しに描いてみたいとなった場合に参考にできます。

僕もちょっと前に記事と同じく「Design It!」と言う本で ADR を知って最近書いてみたりもしてます。設計判断を未来のアーキテクトのために記録するだけでなく、設計判断を決定するための判断材料や長所短所を明確にできるところが嬉しいところかなと思っています（慣れるのには時間がかかります。もうちょっとライトに素早く書けるようになりたいですね。）。

気になる方は設計する際に試してみてください。

# あとがき
今週は面白い生産性向上ネタがちょっと少なかったです。4 月入社の新入社員の方が僕が書いてる Productivity Weekly 記事を読んでくださってるという話を耳にしました。ちょっと嬉しいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

## GraphQL の話

最近 GraphQL を触る機会が増えました。例えば [GitHub は API v4 に GraphQL を選択した](https://docs.github.com/en/graphql/overview/about-the-graphql-api#why-github-is-using-graphql)ので、v4 にしか存在しない API が一部あります。他にも[Linear.app](https://linear.app/)と言う僕が最近推してるプロジェクト管理サービスも GraphQL を採用しています。こういったことから GraphQL を触る機会が増えたのですが、正直 REST と全然使い方が違うので、最初は使い方がさっぱりわかりませんでした。だんだんと使い方がわかってきたのですが、やっぱり利点もよくわからずなんとなくで使ってたため、そろそろ勉強したいなと言う気持ちでした。

そんな時にこの記事を見つけました。

https://zenn.dev/saboyutaka/articles/07f1351a6b0049

この記事では GraphQL が作られた理由、解決したいことや、ユースケース、GraphQL が向いてるケースなどを詳しく説明しています。利点がわかりやすくて良かったです。GraphQL のことなんも知らないと言う人におすすめしたいです。

ちなみに、GraphQL を軽く叩きたい場合に僕は Insomnia と言う API クライアントを使っています。

https://insomnia.rest/

エンドポイントを指定したらスキーマを取得するため、ドキュメントがその場で開けたり、補完が効きます。

https://twitter.com/Shitimi_613/status/1371749871770689536?s=20

GraphQL をパパッと叩いてみたい人は利用してみてください。GraphQL を叩きたい場合のドキュメントは[こちら](https://support.insomnia.rest/article/176-graphql-queries)。


