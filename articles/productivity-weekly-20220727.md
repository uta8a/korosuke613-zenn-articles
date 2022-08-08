---
title: "Productivity Weekly (2022-07-27号) 簡易版"
emoji: "🎁"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220727"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 84 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
最近多忙のためなかなか Weekly を書く時間が取れないので、今月は**いつもより分量少なめの簡易版**とします。
ご了承ください。
:::

# news 📺

## GitLab に CircleCI が対応
https://circleci.com/ja/blog/announcing-gitlab-support/

- CircleCI のクラウド版が GitLab.com に対応しました
- 新しくアカウントを作ってもいいですが既存アカウントを GitLab リポジトリと連携することもできます
- GitLab には GitLab CI/CD という CI/CD サービスもありますが、CircleCI も使えるようになって選択肢が増えていいですね
- また、CircleCI に新トリガーが登場予定らしいです
  - コードリポジトリ以外の変更ソース (サードパーティのプラットフォームや API、イメージリポジトリなど) でもパイプラインをトリガーできるようにしようとしてるとか
  - 詳細は不明ですがけっこう嬉しいかもしれません

## Neco Weeklyとは · neco-weekly
https://cybozu-neco.github.io/neco-weekly/

- Neco Weekly というサイボウズの Neco チームによる「最近気になる Cloud Native 関連のネタを共有する会」の社外発信が始まりました
- Neco チームはサイボウズの新インフラ基盤 Neco の開発・運用を行なっているチームです。たぶん社内で一番クラウドネイティブ関連技術の知見を持ってます
- 2022/07/22 から始まり、今日時点（2022/08/08）で 3 つ記事が投稿されています
- クラウドネイティブ関連ネタに興味がある人たちはぜひ見てみてください
- 同じ毎週投稿してる仲間として応援していきたいです[^ref_pw]

[^ref_pw]: どうやらこの Productivity Weekly も参考にしてくれたみたいです。ちなみに Productivity Weekly も Cybozu Frontend Weekly を参考にはじめました。https://cybozu-neco.github.io/neco-weekly/2022/07/2022-07-22.html#%E3%81%8A%E3%82%8F%E3%82%8A%E3%81%AB

## Announcing LocalStack 1.0 General Availability! - LocalStack
https://localstack.cloud/blog/2022-07-13-announcing-localstack-v1-general-availability/

- AWS の主要サービスをローカルでエミュレートしてくれてテストなどの役に立つツール LocalStack の 1.0 が正式リリースされました
- 1.0 になって多くの新機能が追加されています
- メジャーバージョンを 1 にしたことの意味はあまり読み取れませんでした
  - > LocalStack now satisfied the requirements we laid out in our previous blog to fix the broken cloud software development model.
    - とあるのでなんらかの条件を満たしたってことなのかなと思うけど、肝心の our previous blog へのリンクがなくてなんなのかわからなかった
  - 破壊的変更を滅多に行わなくなくても済むようになったということなのか、多くのサービスをカバーできるようになったという意味なのか
  - [例えば HashiCorp は 1.0 という数字に意味を持たせています](https://dev.classmethod.jp/articles/terraform-1-0-general-availability/#toc-5)
- 僕はこういうエミュレート系はかゆいところに手が届きづらいという偏見から LocalStack を使ったことがないのですが、1.0 になったので触ってみたくなりました
  - [Community と Pro 版で API 数が違うけどそんなに差がなさそう](https://docs.localstack.cloud/aws/feature-coverage/)

## Microsoft open sources its software bill of materials (SBOM) generation tool - Engineering@Microsoft
https://devblogs.microsoft.com/engineering-at-microsoft/microsoft-open-sources-software-bill-of-materials-sbom-generation-tool/

- マイクロソフトが SBOM (Software Bill Of Materials)というソフトウェアがどういう依存ソフトウェアを持っているかなどの構成を表すデータを生成するためのツール SBOM Tool を公開しました
- マルチプラットフォームで、SPDX (Software Package Data Exchange) という形式でデータを出力できます
- 主要言語のパッケージに対応しているだけでなく、Linux のパッケージにも対応してるっぽいです
- SBOM 自体がアメリカ政府も関わってるようなので依存関係を表すものとして今後主流になるかもしれませんね。試してみたいです

# know-how 🎓

## gRPC サーバのビルドに Earthly を使ってみよう
https://zenn.dev/emiksk/articles/f45c5fd771e90a

- Earthly というビルドツールを使って gRPC サーバをビルドするぜという内容の記事です
- ディレクトリ構成、実際に使う Earthfile の中身の説明、その他便利機能の説明が載っています
- 具体例を用いて説明してくれているため実践的な内容となっており、どういうふうに使うんだろうと思ってた人には参考になると思います

## Terraform を使用するためのベスト プラクティス  |  Google Cloud
https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja

- Google による Terraform を使うためのベストプラクティス紹介です
- 結構な量のトピックが載っており良いです
- 各トピックごとに推奨例と非推奨例が載っており、理解しやすいです
- 余談ですが `alias terrafrom="terraform"` を追加しようという内容があって面白かったです。やっぱみんな terraform って typo するんすね

## ベストプラクティス・ドリフトについて
https://zenn.dev/hodagi/articles/52d80908745f18
- ベストプラクティスというものは陳腐化していくものであり、それに対してどう立ち向かっていくかを紹介した記事です
- 著者は陳腐化したベストプラクティスを採用してしまうこと（意訳）をベストプラクティス・ドリフトと定義しています
- 記事では、ベストプラクティス・ドリフトとは何か、ウィナーズサークルについて、ドリフトによりどう言った不都合が起きるか、ドリフトに抗うためにはどうするかを説明しています
- ベストプラクティス・ドリフトという概念が面白いなと思いました。また、ウィナーズサークルを作成してアップデートしていくというのも良いなと思いました
- 今のベストプラクティスってなんだ？ってなりがちなんでここさえ見にいけばいいというのがあるといいっすね

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [AWSが運営するQ&Aサイト「AWS re:Post」で、ユーザー自身による記事の投稿が可能に － Publickey](https://www.publickey1.jp/blog/22/awsqaaws_repost.html)
    - AWS が運営する Q&A サイトで記事を公開できるようになりました
    - 評判高いライターにはバッジが付くらしい
  - [First look at Joy UI 🥳](https://mui.com/blog/first-look-at-joy/)
    - Material Design ではない MUI、Joy UI なるものが出たらしい
    - MUI の使い心地で異なるデザインのものになるらしい

# あとがき
今週号も遅くなってしまいすみません。しかも簡易版。ここ最近土日に予定が入りすぎてよろしくないです 😫

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::
