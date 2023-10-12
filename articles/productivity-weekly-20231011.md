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



## Terraform 1.6 adds a test framework for enhanced code validation
https://www.hashicorp.com/blog/terraform-1-6-adds-a-test-framework-for-enhanced-code-validation

## 🤖Ask AIがCircleCI Discuss(http://discuss.circleci.com )に登場！
https://twitter.com/CircleCIJapan/status/1709362246852517907

試してみた例 https://x.com/Kesin11/status/1709582126205849946

circleci.yml の分割と checkout の高速化という CircleCI の中でも高度な使い方を質問してみたところ、3rd 製の orbs も紹介しつつ自分的には正しい答えが返ってきたのでなかなかすごい。
ある程度の信ぴょう性はあると考えてもいいかもしれない。


## AWS、マネジメントコンソールへのrootでのサインインに多要素認証を必須に。2024年半ばから － Publickey
https://www.publickey1.jp/blog/23/awsroot2024.html

# know-how 🎓

## GitHub Actions のコスト戦略 - GeekFactory
https://int128.hatenablog.com/entry/2023/10/07/214726

## Actions Runner Controller Deep Dive！- コード解説 後編 - - APC 技術ブログ 
https://techblog.ap-com.co.jp/entry/2023/09/29/182024

actions/actions-runner-controller の最新機能である scale set のコード解説。いよいよ本丸とも言える github へのロングポーリングとランナーのオートスケール機能の解説。

前半・後半と合わせるとかなりの長編記事ですが、これを見ると ARC の k8s 上のコンポーネントがどの機能に対応していて、どういう仕組みでランナーがスケールアウト、スケールインしているかが分かります。

（ここから個人の感想。めちゃ長い記事なのですが、体感で長い理由の 7 割ぐらいが k8s のコンポーネントが親子構造で複雑であることと、Go のコードがエラーハンドリングなどによって長いのが理由。GitHub の API を叩く部分は別として、ランナーのスケールイン・スケールアウト処理は philips-labs とやってることに大差はないと思ったし Lambda の TypeScript の方が圧倒的に読みやすかった）

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
