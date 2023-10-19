---
title: "Productivity Weekly (2023-10-11号)"
emoji: "🍵"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231011"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-10-11 単独号です。

今回が第 128 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## Amazon EKS extended support for Kubernetes versions available in preview | Containers
https://aws.amazon.com/jp/blogs/containers/amazon-eks-extended-support-for-kubernetes-versions-available-in-preview/

EKS の Kubernetes バージョン延長サポートオプションがプレビュー。

サポート延長は 12 ヶ月まで。
EKS 1.23 (2023/10 サポート終了) から適用され、オプトインではなく自動で適用される。
一応 EKS 1.23 の 12 ヶ月サポート延長は無料らしいけど、以降は勝手に 1 時間あたりで課金されるので要注意では？

## Actions - Secure deployment rollouts to protected environments based on select tag patterns - The GitHub Blog 
https://github.blog/changelog/2023-10-06-actions-secure-deployment-rollouts-to-protected-environments-based-on-select-tag-patterns/

GitHub Actions の Environments の設定でデプロイ可能なブランチを制限することは以前から可能だったようですが、今回からタグでも同様の制限が可能になりました。

デプロイのルールとして先にタグを打ってからデプロイするようなフローを強制したい場合などに使えそうです。個人的にはさらにデプロイに必要なトークンなどを Environments に紐づいた Secret と保存しておくことで、GitHub Actions からデプロイするフローにさらに強制力を持たせることが可能になると思いました。

実際にデプロイ可能なタグを制限したときの挙動を実験してみたので、興味がある方はこちらのスクラップも見てみてください。

https://zenn.dev/kesin11/scraps/046fdf7f9eba65

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_



## Terraform 1.6 adds a test framework for enhanced code validation
https://www.hashicorp.com/blog/terraform-1-6-adds-a-test-framework-for-enhanced-code-validation

## 🤖Ask AIがCircleCI Discuss(http://discuss.circleci.com )に登場！
https://twitter.com/CircleCIJapan/status/1709362246852517907

CircleCI Discuss で AI に質問できる機能が追加されました。百聞は一見にしかずなので AI がどれぐらいのレベルの回答をしてくれるのか早速試してみました。

> Config.ymlを分割したい

https://twitter.com/Kesin11/status/1709582126205849946?conversation=none

[Dynamic Configuration](https://circleci.com/docs/ja/dynamic-config/) を利用すれば分割できるのは正しいですね。その先が驚きで、さらに発展形として [bufferings/split-config](https://circleci.com/developer/orbs/orb/bufferings/split-config)というサードパーティの Orb を利用することも提案してくれました。Dynamic Configuration は公式ドキュメントが存在しますが、サードパーティの Orb はさすがにドキュメントには存在しないはずなので AI はドキュメント以外も情報源にしていそうですね。

> リポジトリが巨大なのでcheckoutに数十分もかかります。なんとか高速化する方法はないでしょうか？

https://twitter.com/Kesin11/status/1709584713722310844?conversation=none

次の質問はちょっといじわるな内容で、CircleCI では自分の知る限り `checkout` では `git clone --depth=1` などのオプションを追加できないので標準機能では対応できないはずなのです。これに対する回答は `checkout` を使う代わりに `git clone --depth` を使うか、[issmirnov/fast-checkout](https://circleci.com/developer/ja/orbs/orb/issmirnov/fast-checkout) というサードパーティの Orb を提案してくれました。こちらの Orb は自分も初めて知ったのですが、中身を見ると Git の Partial Clone と Sparse Checkout を実行していたので AI の回答文は正しいと思います。

個人的には今回試した質問に対する AI の回答は技術的にも文章も妥当な回答だと思いました。もちろん AI の回答が 100%正しいとは限らないのですが、ググって発見した情報も 100%正しいとは限らないので、今後は AI と検索の両方で見つけた情報から総合的に判断していく時代になるかもしれないと感じました。

反響がさみしいと早々に引っ込んでしまうかもしれないらしいので、皆さんもぜひ AI に質問してみましょう！

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_


## AWS、マネジメントコンソールへのrootでのサインインに多要素認証を必須に。2024年半ばから － Publickey
https://www.publickey1.jp/blog/23/awsroot2024.html

# know-how 🎓

## GitHub Actions のコスト戦略 - GeekFactory
https://int128.hatenablog.com/entry/2023/10/07/214726

## Actions Runner Controller Deep Dive！- コード解説 後編 - - APC 技術ブログ 
https://techblog.ap-com.co.jp/entry/2023/09/29/182024

[actions/actions-runner-controller](https://github.com/actions/actions-runner-controller) の最新機能である Scale Set のコード解説。いよいよ本丸とも言える GitHub へのロングポーリングとランナーのオートスケール機能の解説編です。

前半・後半と合わせるとかなりの長編記事ですが、ARC の k8s 上のコンポーネントがどの機能に対応していて、どういう仕組みでランナーがスケールアウト、スケールインしているかが解説されています。生産性向上チームでは k8s を使わない [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) を利用しているので ARC のコードはあまり読んだことがなかったのですが、行っていることはやはり何となく似ているという印象を受けました。

Scale Set の機能に関しては API ドキュメントがまだ公開されていないので詳しくは分からないことが多く、早く公開してほしいなと思っています。

次回は ARC のメトリクス監視についての解説が予告されているので楽しみにしましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 仕様が読めるようになるOAuth2.0、OpenID Connect 入門 - Speaker Deck
https://speakerdeck.com/authyasan/shi-yang-gadu-meruyouninaruoauth2-dot-0-openid-connect-ru-men

## 2023 State of DevOps Report  |  Google Cloud
https://cloud.google.com/devops/state-of-devops?hl=en

State of DevOps Report の 2023 年版が公開。（日本語ページだと 2022 年の日本語版のレポートに飛ばされるので注意）
まだちゃんと読めてない。

## Hyperdrive：データベースをあたかもグローバルであるかのように感じさせる
https://blog.cloudflare.com/ja-jp/hyperdrive-making-regional-databases-feel-distributed-ja-jp/

既存のデータベースとの接続に Hyperdrive を経由させることで、接続プール維持 + 読み取りクエリキャッシュによる待ち時間短縮が図れるという話。
エッジコンピューティングとかでありがたい。

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## Engineering Productivity Meetup #1 in Tokyo - connpass
https://cybozu.connpass.com/event/298452/

サイボウズの東京オフィスで開発者の日々の生産性を高めるための知見や技術を語り合うイベントを開催されます（宣伝）。
発表・質問・交代含む 10 分程度の LT 形式です。簡単な自動化でもなんかすごい改革でも、「開発生産性の向上」に関する内容であればなんでもいいので、みなさんどしどし参加してください。


## omake 🃏: 
今週のおまけです。
