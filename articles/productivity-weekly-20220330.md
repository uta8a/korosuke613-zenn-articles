---
title: "Productivity Weekly (2022-03-30号)"
emoji: "🐡"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220330"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 68 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## ジョブにおける OIDC トークン - CircleCI に関する最新情報
https://circleci.com/ja/changelog/#%E3%82%B8%E3%83%A7%E3%83%96%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B-oidc-%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3

CircleCI が OIDC に対応しました。AWS や GCP などの認証時にシークレットが必要なくなるので、シークレットを CircleCI 上に保管しなくてもよくなります。

詳細は公式ドキュメントに載っています[^oidc_link]。

- [Using OpenID Connect Tokens in Jobs - CircleCI](https://circleci.com/docs/ja/2.0/openid-connect-tokens/)


また、クラメソさんの試してみた記事が既に出ていました。画像を混じえて丁寧に方法を載せてくれています。

https://dev.classmethod.jp/articles/circleci-supported-oidc-so-i-tried-linking-it-with-aws/

まだ [circleci/aws-cli](https://circleci.com/developer/ja/orbs/orb/circleci/aws-cli) や [circleci/gcp-cli](https://circleci.com/developer/ja/orbs/orb/circleci/gcp-cli) といった CircleCI 公式の Orb などでは対応されてないようで、OIDC トークンを使った認証は手動で行う必要があります。例えば GitHub Actions では AWS が開発している [aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) アクションで簡単に OIDC を使った認証ができます。

Orb による対応に関しては CircleCI Japan が vote してくれと言っているので、vote することで対応の優先順位が上がるかもしれません（余裕がある人は該当 Orb にプルリクエストを送るのもありだと思います）。

https://twitter.com/CircleCIJapan/status/1509025350860255234

[^oidc_link]: なぜか日本語の Changelog には [GitHub Actions の OIDC ドキュメント](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)へのリンクが貼っており、CircleCI のドキュメントへのリンクが貼られていなかった。2022/04/02 確認したら英語版の Changelog は CircleCI のドキュメントがリンクされてた。

## Ignore commits in the blame view (Beta) | GitHub Changelog
https://github.blog/changelog/2022-03-24-ignore-commits-in-the-blame-view-beta/

GitHub の blame 画面において、`.git-blame-ignore-revs` ファイルに書かれたコミットを無視して表示できるようになりました（ベータ）。

`git blame` は任意のファイルの各行がどのコミットによって変更されたかを調べるためのコマンドです。~~よく意図のわからないコードがどのコミットで追加されたかを特定するために使われます。~~`git blame` は Git のコマンドですが、GitHub 上でも同じようなことができます。

Git コマンドの方では、`git blame --ignore-revs-file <ignoreしたいコミットが載ったファイル> <対象ファイル>` で blame に出すコミットを無視できます。今回の GitHub の変更も同じようなもののようです。

実際に自分のブログのリポジトリで試してみました。最近[巨大なリファクタリングをした](https://github.com/korosuke613/myHomepage/pull/155)ので、そのコミットを無視するようにしてみます。

![](/images/productivity-weekly-20220330/blame-ignore-before.png =500x)
*`.git-blame-ignore-revs` 設置前。`refactor: respects the lint` というコミットが表示されている*

![](/images/productivity-weekly-20220330/blame-ignore-after.png =500x)
*`.git-blame-ignore-revs` 設置後。`refactor: respects the lint` というコミットが消えている*

確かに該当コミットが見た目上消え去り、過去のコミットを追いやすくなりましたね。今回の使い方のようなフォーマッタ系の巨大なコミットを無視したいときとか便利かもしれません。

## Following organizations | GitHub Changelog
https://github.blog/changelog/2022-03-23-following-organizations/

GitHub において Organization をフォローできるようになりました。ユーザをフォローした時と似たような情報が出てくるようです。フォローした Organization に関する情報はダッシュボードの[新しい「For you」フィード](https://zenn.dev/korosuke613/articles/productivity-weekly-20220323#improving-your-github-feed-%7C-the-github-blog)に流れるようになります。この Organization に関する情報は見逃したくないという方はフォローしてみてください。

# know-how 🎓

## Docker Compose V2で変わったdocker-compose.ymlの書き方
https://zenn.dev/miroha/articles/whats-docker-compose-v2

去年秋頃 Docker Compose v2（`docker compose`）がリリースされましたが、従来の Docker Compose v1（`docker-compose`）と違い、v2 では Compose Spec に準拠しているため `docker-compose.yaml` の書き方が新しくなっているという記事です。

Compose Spec では Compose ファイルの仕様が定義されています。この記事では、Compose Spec が従来の v1 の書き方とどう違うのかが書かれています（後方互換性がある為、v1 の記法はそのまま使えます）。

個人的には、Compose Spec ではファイル名を `compose.yaml` とするのがデフォルトとなっていることに驚きました。全く知りませんでした。新しく `compose.yaml` を書く際は最新の書き方に則って書きたいですね。

:::message
小ネタです。v2 は GitHub Releases 上でリリースされ、Docker Desktop にも搭載されるなど、公式アナウンスは無いが正式リリースされたものかと思われていました。しかし、docker/roadmap の 2022/04/05 の以下のコメントを見るに、まだ GA は発表されてなかったようです（マジか）。

> We're very close to the announcement on GA (about a month or so)
> https://github.com/docker/roadmap/issues/256#issuecomment-1087780909
:::

## Introducing Real World Testing with Cypress
https://cypress-io.ghost.io/blog/2022/03/28/real-world-testing-with-cypress/

E2E テストツール Cypress の公式学習サイト「Real World Testing with Cypress」の紹介記事です。テストの基礎、Cypress の基礎、高度な使い方を学ぶことができます。他にも実際のアプリケーションに近いアプリのテスト例が 30 個あったり、より実際のアプリケーションに近い Shopify ストアの構築とテストに関するチュートリアルがあったりします。

面白いのが、この学習サイト自体が GitHub で公開されており、しっかりと Cypress でテストされていることです[^m1]。

https://github.com/cypress-io/cypress-realworld-testing

Cypress の学習だけじゃなく、E2E テストノウハウを学ぶのにも使えそうです。

[^m1]: 手元の M1 Mac で動かしたところ、Node.js 14 だからかわかりませんが Wasm 関連のエラーが出てしまいました。Node.js 16 で実行したところうまく動きました。

# tool 🔨

## The secret of the macOS Monterey network quality tool
https://danpetrov.xyz/macos/2021/11/14/analysing-network-quality-macos.html

macOS Monterey にネットワーク帯域の速度を測るコマンド `networkQuality` が追加されていると言う話です。端末で `networkQuality` を叩くだけで実行できます。

デフォルトで上り下りを同時に測定するので実際のユースケースに近いと筆者は述べています。

自分も実際に測ってみたら以下のようになりました。

```
❯ networkQuality
==== SUMMARY ====
Upload capacity: 522.864 Mbps
Download capacity: 502.196 Mbps
Upload flows: 16
Download flows: 12
Responsiveness: High (1344 RPM)
```

`Responsiveness: High` という結果になりました。[公式のサポートドキュメント](https://support.apple.com/ja-jp/HT212313)によると、`High` は「高い：ネットワークを共有しているデバイスや App の数に関係なく、App やサービスは安定した接続を維持できます。」を意味してるようです。

こういう計測ツールはたくさんありますが、デフォルトでインストールされているのが嬉しいですね。覚えておきたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Google アナリティクスが 2023 年に旧バージョンを廃止すると発表、「GA4」への移行方法はこんな感じ - GIGAZINE](https://gigazine.net/news/20220317-prepare-with-google-analytics-4/)
    - Google アナリティクスの古いタグが使えなくなるので、新しいタグへの移行と GA4 プロパティの作成が必要です
    - 2023 年までに移行すればいいのですが、新しいプロパティでは 0 からデータが記録されていくので早めに移行しておくのが良いです
    - 自分もはてブやホームページのタグを更新しました
      - [nuxt 使ってたのでプラグイン入れるだけで済んだ](https://github.com/korosuke613/myHomepage/pull/149)
  - [Compose with Markdown in Google Docs on web](https://workspaceupdates.googleblog.com/2022/03/compose-with-markdown-in-google-docs-on.html)
    - Google Docs で Markdown が使えるようになった
    - 現在は一部の構文のみ対応
  - [GitLab.com、SaaS 版の無料枠を最大ユーザー5 人までに制限。6 月から － Publickey](https://www.publickey1.jp/blog/22/gitlabcomsaas56.html)
    - GitLab.com が無料プランにおいてネームスペース当たりのユーザ数を制限した
    - むしろ今までなかったんだ
  - [機密性の高い自社データを取り扱う社内システムを簡単に作成できるローコードサービス「BaseMachina（ベースマキナ）」が正式ローンチ。](https://prtimes.jp/main/html/rd/p/000000001.000098195.html)
    - SQL や API を叩く作業をするための GUI を作成できるローコードサービス
    - 権限設定や監査ログ周りなどが作り込んである
      - 特定のアクションだけ明示的に許可するなどが簡単にできる
    - [gRPC にも対応しており](https://docs.basemachina.com/grpc_integration/)、サーバリフレクションや protobuf 定義を利用できる
- **tool 🔨**
  - [手元の環境変数をいい感じに管理するzenv](https://zenn.dev/mizutani/articles/8af10c54b7feca)
    - dotenv と envchain を混ぜて強化したようなツールです
    - `.env` ファイルから環境変数を読み込むだけでなく、シークレットを Keychain に保存できます（macOS のみ）
    - zsh 関連のツールっぽい名前ですが、zsh は関係ないです

# あとがき
4 月になって新卒社員が入ってきたのでウキウキしてます。
最近あんまり Weekly 書く時間が取れてないので、ちょっと小ネタが多くなってしまいました。

生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（4/22 エントリー開始）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6


:::message
すみません、今週のおまけはお休みです...
:::
