---
title: "Productivity Weekly (2022-06-08号) 簡易版"
emoji: "🤓"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220608"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 77 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今月多忙のため Weekly を書く時間が取れないので、**いつもより分量少なめの簡易版**とします。
ご了承ください。
:::

# news 📺

## View commit history across file renames and moves | GitHub Changelog
https://github.blog/changelog/2022-06-06-view-commit-history-across-file-renames-and-moves/

- GitHub のファイル単位のコミットヒストリーにおいて、ファイルのリネームや移動前の履歴も追えるようになった
- `git log --follow` と同様の動きをする
- 例：https://github.com/korosuke613/zenn-articles/commits/3832eb7f5d30cfe443a50a3f09962b796ccd8181/generate-productivity-weekly-template.sh?browsing_rename_history=true&new_path=generate-productivity-weekly-from-template.sh&original_branch=main
  - `Renamed to generate-productivity-weekly-from-template.sh (Browse History)` をクリックするとリネーム後からの履歴が表示される
  - `Renamed from articles/template/generate-productivity-weekly-template.sh (Browse History)` をクリックするとリネーム前の履歴が表示される

## Dependency graph adds vulnerability alerting support for Rust | GitHub Changelog
https://github.blog/changelog/2022-06-06-dependency-graph-adds-vulnerability-alerting-support-for-rust/

- GitHub の Dependency graph が Rust に対応
- `Cargo.{toml,lock}` ファイルを検出

## Announcing Cypress 10 with Component Testing Beta!
https://www.cypress.io/blog/2022/06/01/cypress-10-release

- E2E テストフレームワーク Cypress の最新バージョン、Cypress 10 がリリースされた
- コンポーネントテスト機能がベータ版になった
  - コンポーネント単独でテストできる機能
  - まずは React、Vue に対応
  - [Playwright との争いを感じる](https://zenn.dev/korosuke613/articles/productivity-weekly-20220518#release-v1.22.0-%C2%B7-microsoft%2Fplaywright)（解釈）

## AWS IAM が WebAuthn と Safari ブラウザをサポートし、セキュリティキーによる多要素認証が可能になりました
https://aws.amazon.com/jp/about-aws/whats-new/2022/05/aws-iam-supports-webauthn-safari-browser-multi-factor-authentication-security-keys/

- AWS IAM の多要素認証の要素として WebAuthn を選択できるようになった
- また、Safari でもセキュリティキー（yubikey など）が使えるようになった

# know-how 🎓

## Merpay Tech Talk ~開発者向け社内サービス事例とOSSカルチャーへの還元~ を開催しました！ #merpay_techtalk | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20220606-a9a14ee450/

- 先日開催されたメルペイさんの「Merpay Tech Talk ~開発者向け社内サービス事例とOSSカルチャーへの還元~」のイベント紹介記事
- 組織横断で技術的な課題を解決したりマイクロサービス周りやったりする Architect チームから、社内向けシステム開発・運用の部分を切り出して Engineering Productivity チームが誕生した
- どんな課題解決のためのツールを開発してきたかや、どういう効果を上げたのかやなどが書かれている
- サイボウズの生産性向上チームと似ている部分を多く感じたが、一方異なる部分もあって面白かった
- OSS 活動がすごいと思った（小並感）

## Terraform Cloud Run Tasks (GA) と自前の Open Policy Agent サーバーを連携して遊んでみる
https://zenn.dev/jrsyo/articles/9eb449b7170896

- Terraform Cloud において `plan` と `apply` の間に任意の処理を挟めるようになったので、OPA(Open Policy Agent) を使ったマニフェストのバリデーションをやってみたという記事
- 自前でサーバ建てる手間はあるが、やってみると便利そう
- > 「Terraform Cloud/Enterprise で OPA をネイティブにサポートしてほしい！」というリクエストは数多く寄せられていて、時期こそお伝えできないものの、サポートする動きは進んでいるようです。
  - Hashicorp Sentinel と思いっきり競合しそうという話が Weekly で出ました

## 「達人が教えるWebパフォーマンスチューニング」という本を執筆しました #ISUCON本 #isucon
https://note.com/catatsuy/n/nae62e6b7f710

- Web アプリケーションのパフォーマンスチューニングを競う競技である ISUCON に長年参加しておられる方々が、考え方やノウハウを本として出版したとのこと
- 6/4 発売で、gihyo で DRM フリーな PDF で買える
- ISUCON 参加者に限らず Web サービスを高速化したい人には参考になりそう
- ちなみに今年の ISUCON 参加枠は応募開始数分で全て埋まったとか

## Repro のサーバーサイド開発環境を M1 Mac に対応させるまでの道のり(再始動編) - Repro Tech Blog
https://tech.repro.io/entry/2022/06/03/090000

- Repro さんによるサーバサイド開発環境 M1 Mac 対応記事。その 3（再始動編）
- これまでの記事では一部どうしても M1 が厳しいコンポーネントがいくつかあったが、いつの間にか M1 でも動くようになってたとか
- 今後の課題として CI でも x86_64、arm64 の両方を使うようにして開発環境が壊れてもわかるようにしたいとのこと
  - そこまでやるのはめちゃ大変そう

# tool 🔨

## Connect: A better gRPC
https://buf.build/blog/connect-a-better-grpc

- gRPC 互換の HTTP API を構築するためのフレームワーク Connect をリリース（ベータ）したという記事
- Weekly 参加者「*gRPC は Protocol Buffer を採用し、Protobuf といえばこれという感じになっています。ただ gRPC がめちゃくちゃ難しいのも事実で、非常に複雑になりつつあります。これを解決するスリムなプロトコルを提唱するぜというのが、これのやりたいことのようです。*」
- gRPC は HTTP/2 を利用するためブラウザで使うには間に何か挟む必要があるが、Connect protocol は POST オンリーの HTTP/1.1 または HTTP/2 で動くため、gRPC と gRPC-Web に互換性があると謳われている
- デフォルトで JSON かバイナリエンコードされた protobuf の両方がサポートされている
- ストリーミング含めて gRPC の機能を全てサポートするという方針っぽい
- gRPC は既存のエコシステムが非常に強力なので、正直このプロトコルがどれくらいその辺に強くなれるのかは疑問だが、単純に TypeScript とかから使いやすくなるなら良さそうという話が Weekly では出ました

## minamijoyo/tfedit: A refactoring tool for Terraform
https://github.com/minamijoyo/tfedit

- Terraform ファイルのリファクタリングを楽にするためのツール
- AWS Provider v3 から v4 へのマイグレーションに対応
  - 背景）AWS Provider v4 で S3 関連リソースの破壊的変更が入った（[参考](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#terraform%E3%81%AEaws-provider-v4%E3%83%A1%E3%82%B8%E3%83%A3%E3%83%BC%E3%82%A2%E3%83%83%E3%83%97%E3%83%87%E3%83%BC%E3%83%88%E3%81%AF%E7%A0%B4%E5%A3%8A%E7%9A%84%E5%A4%89%E6%9B%B4%E3%81%82%E3%82%8A---qiita)）
    - その後マイナーアップデートで以前の書き方でも動くようになったけど（[参考](https://zenn.dev/korosuke613/articles/productivity-weekly-20220413#terraform-aws-provider-4.9.0-%E3%81%8C%E3%83%AA%E3%83%AA%E3%83%BC%E3%82%B9%E3%81%95%E3%82%8C%E3%80%81s3-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E4%B8%80%E9%83%A8%E3%81%AE%E3%82%A8%E3%83%A9%E3%83%BC%E3%81%8C%E8%AD%A6%E5%91%8A%E3%81%AB%E5%A4%89%E3%82%8F%E3%82%8A%E3%81%BE%E3%81%97%E3%81%9F)）
- 最初の目標は AWS Provider v4 関連のリファクタリングだが、プロジェクト自体は特定のユースケースに縛られないとのこと
- 今後また新しいフィルターが追加されるかもしれない

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを~~一言程度で~~書くコーナーです（今週はタイトルだけ）。

- **news 📺**
  - [Custom repository roles are now GA | GitHub Changelog](https://github.blog/changelog/2022-06-06-custom-repository-roles-are-now-ga/)


# あとがき
色々あって今月は大変忙しいので簡易版ということで普段より分量を少なくしました。おそらく 7 月上旬か中旬くらいまで簡易版で行くと思います🙇

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::
