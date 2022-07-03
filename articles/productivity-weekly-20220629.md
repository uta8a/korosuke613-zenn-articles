---
title: "Productivity Weekly (2022-06-29号)"
emoji: "💎"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220629"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 80 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Improved innersource collaboration and enterprise fork policies | GitHub Changelog
https://github.blog/changelog/2022-06-27-improved-innersource-collaboration-and-enterprise-fork-policies/

GitHub における fork について、いくつかの新機能が追加されました。

- リポジトリが所属する Organization 内で同リポジトリを fork できるようになった
  - これまでは別 Organization やユーザにしか fork できなかった
- internal リポジトリを Enterprise 内組織に internal なまま fork できるようになった
  - これまで internal なリポジトリはユーザに対してのみ private リポジトリとして fork できた[^internal_private]
- Enterprise の Owner は Enterprise 内リポジトリ(private or internal)が fork される場所を制限できるようになった
  - 同 Enterprise 内 Organization のみや所属 Organization のみなど柔軟な選択肢がある
  - これまでは Organization またはリポジトリ単位で fork の許可または禁止しかできなかった

これまで internal リポジトリはユーザに対してのみ fork 可能だったため、情報流出阻止の観点からそもそも fork を禁止する組織が多かったと思います。しかし、それにより Enterprise 内 OSS（[GitHub はインナーソースと呼んでる](https://zenn.dev/korosuke613/articles/productivity-weekly-20210324#solving-the-innersource-discovery-problem---the-github-blog)）へのコントリビューションがとてもしづらかったです（リポジトリへの Write 権限を与えないといけないため）。セキュリティ的にしょうがなかったのですが、今回の変更によりセキュリティを担保しつつインナーソースへのコントリビューションがしやすくなりました。

機能としては既にリリースされていますが、インナーソースへのコントリビューションを実現するためには Enterprise 側での fork ポリシーの設定と各 Organization やリポジトリでの fork の許可が必要です。これまでヤキモキしていた方はがんばって設定を促していきましょう。

[^internal_private]: たぶん同 Enterprise 内別 Org への fork は全くできなかったんじゃないかな

## List and delete caches in your Actions workflows | GitHub Changelog
https://github.blog/changelog/2022-06-27-list-and-delete-caches-in-your-actions-workflows/

GitHub Actions において、actions/cache によるキャッシュを API 経由で削除できるようになりました。

今回できるようになったのはキャッシュのリストアップと特定キャッシュの削除です。これまではキャッシュがおかしくなった際にキャッシュキーを変更したりキーに使うハッシュ値を無理やり変えたりする必要がありました（[参考](https://github.community/t/how-to-clear-cache-in-github-actions/129038/5)）。

これによりキャッシュがおかしくなってもすぐに簡単に対応できるようになって良いですね。WebUI での対応も今後してほしいですね。

:::details 実行例

### cache のリストアップ

https://docs.github.com/en/rest/actions/cache#list-github-actions-caches-for-a-repository

```text:コマンド - List GitHub Actions caches for a repository
❯ gh api \
    -H "Accept: application/vnd.github+json" \
    /repos/korosuke613/zenn-articles/actions/caches
```

```json:レスポンス - List GitHub Actions caches for a repository
{
  "total_count": 6,
  "actions_caches": [
    {
      "id": 443,
      "ref": "refs/pull/217/merge",
      "key": "node-cache-Linux-npm-1578f344bdc8c549eb1664964725b896b513cbf9fb69fd5c997f12eb33997397",
      "version": "04d00cc68e25ee34fd8b04095d0a46a28244d98af53e6925e47ed311d487b1d6",
      "last_accessed_at": "2022-07-01T01:52:24.083333300Z",
      "created_at": "2022-07-01T01:47:10.520000000Z",
      "size_in_bytes": 51689100
    },
    ...
  ]
}
```

### cache の削除

https://docs.github.com/en/rest/actions/cache#delete-a-github-actions-cache-for-a-repository-using-a-cache-id

```text:コマンド - Delete a GitHub Actions cache for a repository (using a cache ID)
❯ gh api \
    --method DELETE \
    -H "Accept: application/vnd.github+json" \
    /repos/korosuke613/zenn-articles/actions/caches/443
```

レスポンス無し

cache id ではなく cache key による削除もできるが、今回 GitHub CLI で試した時になんかうまくいかなかった。

https://docs.github.com/en/rest/actions/cache#delete-github-actions-caches-for-a-repository-using-a-cache-key

```text:コマンドとレスポンス
❯ gh api \
  --method DELETE \
  -H "Accept: application/vnd.github+json" \
  /repos/:owner/:repo/actions/caches \
  -F key='node-cache-Linux-npm-1578f344bdc8c549eb1664964725b896b513cbf9fb69fd5c997f12eb33997397'
{
  "message": "Invalid request.\n\nMissing required query parameter key",
  "documentation_url": "https://docs.github.com/rest/actions/cache#delete-github-actions-caches-for-a-repository-using-a-cache-key"
}
gh: Invalid request.

Missing required query parameter key (HTTP 422)
```
:::


## Highlights from Git 2.37 | The GitHub Blog
https://github.blog/2022-06-27-highlights-from-git-2-37/

Git 2.37 がリリースされました。主に以下の変更があります。

- 到達不能(unreachable)オブジェクトの掃除の処理を改善
- 組み込みのファイルシステム監視による差分検知の高速化設定の追加
  - これまでは、例えば `git status` 時に作業ディレクトリ全体をなめる必要がありファイル数が膨大である場合にパフォーマンスに問題があった
  - 管理対象の各ファイルを監視することにより上のようなパフォーマンスの問題が改善できる
  - このファイルシステムのモニタ機能を組み込みにした
  - `core.fsmonitor` を `true` にすることで有効化できる
    - Weekly では全リポジトリの全ファイルを監視するとヤバそうだから、グローバルに有効化するより必要なリポジトリごとに有効化した方がよさそうという話が出ました
- sparse-index 機能が Git 本体に完全に統合
  - [以前紹介した sparse-index 機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20211117#make-your-monorepo-feel-small-with-git%E2%80%99s-sparse-index-%7C-the-github-blog)に git のすべてのコマンドが対応しました

でかいモノレポでは `core.fsmonitor` を有効化したり sparse-checkout することで、作業の高速化、無駄なディスクの節約が見込めます。使っていきたいですね。

## GitHub Enterprise Cloud customers can configure audit log streaming to AWS S3 with OpenID Connect (OIDC)
https://github.blog/changelog/2022-06-28-github-enterprise-cloud-customers-can-configure-audit-log-streaming-to-aws-s3-with-openid-connect-oidc/

[以前 GitHub において、Amazon S3 などのストレージサービスへの監査ログストリーミングができるようになったことを紹介しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220126#audit-log-streaming-is-generally-available-%7C-github-changelog)。今回 Amazon S3 への監査ログストリーミングを設定の認証に OpenID Connect（OIDC）を使えるようになりました。

OIDC 利用できる場面がだんだんと増えてきましたね。サービスアカウントを使うよりも管理が楽で安全性が高いので S3 へのストリーミング設定をしている方は OIDC 利用を検討しましょう。

# tool 🔨

## Release v1.23.0 · microsoft/playwright
https://github.com/microsoft/playwright/releases/tag/v1.23.0

Web アプリ向けテストフレームワークである Playwright (v1.23.0) において、HAR ファイルを使ったネットワークのキャプチャ・リプレイ機能が追加されました。

ユースケースがすぐには浮かばないのですが、例えばスタブに対するネットワーク越しの入力を簡単に設定できる（他サービスからのリクエストならばモック化の手間が減るとかも）というメリットがあるのでしょうか？誰か教えてください。

## 高速で設定しやすいZsh/BashプラグインマネージャーSheldonの紹介
https://zenn.dev/ganta/articles/e1e0746136ce67

Zsh のプラグインマネージャといえば zplug や Zinit だと思っているのですが、この記事では Rust 製の後発プラグインマネージャである sheldon を紹介しています。

この記事では、インストール、初期設定、設定ファイルやプラグインについて、実行速度の比較が紹介されています。

従来のプラグインマネージャと比べて、設定ファイルが TOML 形式で可読性が高かったり、テンプレート機能が便利だったり、実行速度が高速だったりで使い勝手が良いとのことなので、既存のプラグインマネージャに不満がある方は乗り換えを検討しても良いかもしれませんね。

ちなみに僕は以前 zplug か Zinit を使ってたのですが、Zsh の起動が遅くなったり時たま壊れたりしたのでプラグインマネージャを完全に取り除きました。手動でプラグインを管理するのも面倒なので時間がある時に試してみたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **tool 🔨**
  - [「Visual Studio Code」向けの「1Password」拡張機能が公開 - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1419513.html)
    - Node.js 向けに、ソースコード内に 1Password の URL を埋め込むことで 1Password 管理のシークレットをプログラムから参照できるライブラリ op-js というものがあるのですが、VSCode での op-js を使った開発をしやすくするための拡張機能である 1Password for VS Code が公開されました
    - シークレットを一元管理できるのはやはり嬉しいのでこういった機能は気になっています
      - [Hashicorp Vault](https://www.hashicorp.com/products/vault) なんかでもできそうだけど、1Password の方がお手軽なのかもしれない。大規模になってくるとまた変わってきそう

# あとがき

先週、[宝石の国という漫画が 10000 分無料で読めた](https://nijimen.net/topics/316717)んですけど、結構おもしろかったです。単行本が欲しくなりました。もう無料で読める期間は終わったのでなんともアレですが、気になる人は読んでみてください。

デブサミ 2022 サマーにおいて、「生産性向上は一筋縄でいかない ～改善を進める上で生じる課題との付き合い方～」というタイトルで登壇するので、興味ある人はぜひ見にきてください。
https://event.shoeisha.jp/devsumi/20220721/session/3841/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::
