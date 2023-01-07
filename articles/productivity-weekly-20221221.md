---
title: "Productivity Weekly (2022-12-21号)"
emoji: "🏂"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221221"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 103 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Granular control over cache restore and save · Discussion #1020 · actions/cache
https://github.com/actions/cache/discussions/1020#discussioncomment-4472962

GitHub Actions の actions/cache アクションにおいて、restore と save の処理が独立したアクション actions/cache/restore と actions/cache/save が登場しました。[v3.2.0](https://github.com/actions/cache/releases/tag/v3.2.0) から利用可能です。

元々 actions/cache のキャッシュのリストアと保存処理は切り離せないものであり、例えばトピックブランチでは保存は行わずリストアのみを行うという場合に実現するのが難しかったです。今回、これらが切り分けられたことで簡単に片方のみを実行できるようになりました。

もちろん actions/cache アクション自体はこれまでと変わらずに使えます。

さっそくニーズや使い方をまとめてくれた方がいました。詳しくは次の記事を読むのが手っ取り早いです。

- [GitHub Actions のキャッシュをより細かく制御する actions/cache/restore と actions/cache/save - ぽよメモ](https://poyo.hatenablog.jp/entry/2022/12/21/090000)

キャッシュを常に保存したい場合や常にリストアだけ行いたい場合は僕としてもこれまでたまにあったため、地味に嬉しいです。使っていきたいですね。

## Leaked a secret? Check your GitHub alerts...for free | The GitHub Blog
https://github.blog/2022-12-15-leaked-a-secret-check-your-github-alerts-for-free/

GitHub において、リポジトリへのシークレットのコミットを検知する secret scanning が、すべてのパブリックリポジトリにおいて無料で利用可能になります。徐々にロールアウトしていき、2023 年の 1 月末には全体に行き渡る予定とのこと。

secret scanning 自体はこれまでもありましたが、GitHub Advanced Security に契約している GitHub Enterprise 利用組織または、secret scanning に協力しているサービスプロバイダへのみ通知を行なっていました。（したがって、これまでもサービスプロバイダからシークレットがコミットされてるよという通知を受け取ったことのある人がいるかもしれません。）

今回から secret scanning 全てのパブリックリポジトリに対してもアラートが通知されるようになるため、サービスプロバイダからの通知よりも素早くシークレットのコミットを発見・対応できるようになります。

secret scanning が利用可能になっても即有効となるわけではありません。有効化が必要となるため、利用したい方はリポジトリ設定から有効にしましょう。

[revoke 済みのトークンを使って試してみた](https://github.com/korosuke613/playground/pull/44#issuecomment-1374432130)ところ、しっかりと secret scanning の通知が来ました。

また、secret scanning にはコミットの push 時にシークレットを検知して push を防止する機能[^dentsu]もあるのですが、特に push 時に怒られなかったため、そちらの機能はまだ Advanced Security 向けの機能のようです。

[^dentsu]: [公式 Changelog はこちら](https://github.blog/changelog/2022-04-04-secret-scanning-prevents-secret-leaks-with-protection-on-push/)。どういう機能なのかは電通デジタルさんの記事が参考になります。-> [GitHubの新機能Push protectionを試してみた｜Dentsu Digital Tech Blog｜note](https://note.com/dd_techblog/n/n0ae6a0b9cdc4)

## Docker Desktop 4.15: Improved Usability and Performance
https://www.docker.com/blog/docker-desktop-4-15-improved-usability-and-performance

Docker Desktop for Mac v4.15 において、ファイル同期の選択肢である VirtioFS が GA となりました。これまでは Experimental な機能でした。

Docker Desktop for Mac はファイル同期が遅いという話は昔からありました[^slow]が、2022 年初めにファイル同期の選択肢として VirtioFS が実験的に使えるようになり、[gRPC FUSE と比べて 4 倍高速化したとも言われていました](https://www.jeffgeerling.com/blog/2022/new-docker-mac-virtiofs-file-sync-4x-faster)。

そんな VirtioFS が GA になったことで、機能として安定したと考えて良さそうです。Docker Desktop for Mac 利用者には嬉しいニュースですね。

ちなみに、僕の確認した限りではデフォルトのファイルシステムは gRPC FUSE のままのようなので、利用したい方は手動で VirtioFS に変えましょう。

[^slow]: 例: [Docker Desktop for Mac の遅い問題を解決 2022 - Qiita](https://qiita.com/ryuring/items/47d52e6c07f1ac24d065)

# know-how 🎓

## git push -f が更に安全になる --force-if-includes - id:onk のはてなブログ
https://onk.hatenablog.jp/entry/2022/12/18/000000

`git push --force` を安全に行う方法として `--force-if-includes` があるぞという記事です。

`--force` はそのまま使うと問答無用でリモートブランチを上書きしてしまうため危険ですが、時として使う必要が出てくるオプションです。これを比較的安全にするオプションとして `--force-with-lease` がありますが、これをさらに安全にするオプション `--force-if-includes` がこの記事では紹介しています。

記事では、`--force` の危険性、`--force-with-lease` の紹介、`--force-if-includes` の紹介がされています。それぞれ、なぜ危険なのか、なぜ嬉しいのかがわかりやすくて良いです。

僕は `--force-with-lease` は知っていたのですが、`--force-if-includes` はさっぱり知りませんでした。比較的新しめなオプションなのですね。`--force-if-includes` をつけて困る場面は基本無さそうなので、常につけるようにしました[^enough]。

みなさんもチーム開発時は他人のコミットを消してしまわないように注意し、`--force-if-includes` の利用を検討してみましょう。

:::message
> 口では push -f と言っているけど、安全なチーム開発を意識している人は --force-with-lease --force-if-includes のことを指していて、本当に push -f していることは無いんだよ、という説明でした。

めちゃ同意します。
:::

[^enough]: ところで、`--force-if-includes` は `--force-with-lease` がチェックしてくれることを包含してそうなので、つけるオプションとしては `--force-if-includes` のみでも良さそうと思いました。知らんけど。

## GitHub Codespacesの導入とその設計 - Speee DEVELOPER BLOG
https://tech.speee.jp/entry/2022/12/14/111247

Speee さんによる GitHub Codespaces 事例です。GitHub Codespaces を使う上での工夫や導入して嬉しかったことなどが記されています。

記事では GitHub Codespaces の説明、利用背景、工夫（イメージのビルド高速化、Docker 利用時の対策、シークレット管理）、導入の成果などが書かれています。

個人的にはカスタムイメージのビルド高速化と DinD の実現について特に参考になりました。

GitHub Codespaces はインターンやチーム体験時に環境構築を高速化できる方法として気になっているため、こういった工夫を載せてくれているのはありがたいです。導入する上で導入の成果も参考になると思います。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Actions - Sharing actions and reusable workflows from private repositories is now GA | GitHub Changelog](https://github.blog/changelog/2022-12-14-github-actions-sharing-actions-and-reusable-workflows-from-private-repositories-is-now-ga/)
    - GitHub Actions において、private リポジトリ内のアクションや reusable workflows を、同一 org や enterprise 内の別リポジトリで利用可能になりました
      - public リポジトリからは利用できません
    - Enterprise 利用者にとっては Internal リポジトリにすれば良い話だったため、GitHub Team プランの利用者には嬉しいかもしれません
    - もしくはなんらかの理由で private リポジトリにしたい場合（あんまり思いつかない）
      - どうせ uses する際にリポジトリを落としてくるはずなので、やはり private にしたい理由があまり思いつかない
- **know-how 🎓**
  - [GitHub Actions上でgit commitするときにgit userをどうするか](https://qiita.com/thaim/items/3d1a4d09ec4a7d8844ce)
    - actions-user っていうのは知らなかった。

# あとがき
今週号も投稿が非常に遅くなってしまいすみません。年末年始遊び呆けてました。
僕は 1/10（火）から仕事始めなので、僕の年末年始は 1/9（月）までです。なんとか年末年始で投稿できてない Weekly を投稿できましたね 😇

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

