---
title: "Productivity Weekly (2021-09-22号)"
emoji: "🌺"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 44 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions: Ephemeral self-hosted runners & new webhooks for auto-scaling | GitHub Changelog
https://github.blog/changelog/2021-09-20-github-actions-ephemeral-self-hosted-runners-new-webhooks-for-auto-scaling/

GitHub Actions において、ランナーを使い捨てにする `--ephemeral` オプションの追加と、新しい Webhook `workflow_job` が追加されたお知らせです。[`--ephemeral` については先週の記事で取り上げました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210915#support-the---ephemeral-flag-(%23660)-%C2%B7-actions%2Frunner)（なお、[GitHub Enterprise Server はまだ対応されていません](https://github.com/actions/runner/pull/660#issuecomment-924006410)）。

`workflow_job` はワークフローのジョブの状態ごとに飛んでくる Webhook で、ジョブの状態やランナーラベル(`runs-on` キーの情報)、発生したリポジトリなどが含まれています。

これまでセルフホストランナーをオートスケールために [`check_run` という Webhook](https://docs.github.com/en/developers/webhooks-and-events/webhooks/webhook-events-and-payloads#check_run) を活用する方法がありましたが、セルフホストランナーかどうかの区別が難しかったため、使い勝手が悪かったです（例えば GitHub-hosted ランナーを使うジョブに対してもセルフホストランナーを起動させてしまうといった問題がありました）。

`--ephemeral` オプションと `workflow_job`Webhook が登場したことで、オートスケールするクリーンな環境のセルフホストランナーの構築がしやすくなりました[^toiuka]。セルフホストランナー利用がますます便利になりましたね。早く Enterprise Server でも使えるようになってほしいです。

[^toiuka]: というかできるようになりました。ランナーの使い捨てがほぼ不可能だったので...

## GitHub Actions: Experience refresh for the management of self-hosted runners | GitHub Changelog
https://github.blog/changelog/2021-09-20-github-actions-experience-refresh-for-the-management-of-self-hosted-runners/

GitHub Actions において、セルフホストランナー管理画面が更新され、ランナーグループの管理やランナーの状態の確認が容易になりました。

また、どのランナーがどのジョブを実行中かも確認できるようになりました。今まで良い方法がなかったので、特にそれが嬉しいかもしれません。

![](/images/productivity-weekly-20210922/runner-detail.png)
*こんなふうにランナーが実行中のジョブがわかる*

## Quickly copy the contents of a file to the clipboard | GitHub Changelog
https://github.blog/changelog/2021-09-20-quickly-copy-the-contents-of-a-file-to-the-clipboard/

GitHub の WebUI 上でファイルの中身を簡単にクリップボードへコピーできるようになりました。今までは手動で選択してコピーするか、`Raw` を開いて全選択してコピーするなどをしていてちょっと面倒でした。これからは UI 上のボタンを押すだけでクリップボードにファイルの中身をコピーできます。

細かいですが地味に嬉しい変更ですね。

:::message

ちなみに内部的には `raw.githubusercontent.com` を GET して JS でクリップボードにコピーしているようです（`Raw` ボタンを押したらここに飛ぶ）。
![](/images/productivity-weekly-20210922/copy_internal.png =500x)
*https://raw.githubusercontent.com/actions/runner/main/LICENSE を GET していた*

また、Changelog の動画にあるアイコンと実際のアイコンが異なりました。

![](/images/productivity-weekly-20210922/copy_expected.png =450x)
*動画内で登場するコピーボタン（クリップボード感ある）*

![](/images/productivity-weekly-20210922/copy_actual.png =350x)
*実際のコピーボタン（複製する感ある）*
:::

## AWS federation comes to GitHub Actions | Aidan Steele’s blog (usually about AWS)
https://awsteele.com/blog/2021/09/15/aws-federation-comes-to-github-actions.html

GitHub Actions において、ジョブ実行ごとに OpenID Connect[^oidc] のトークンを付与する仕組みが追加されていました。

:::message alert
正式アナウンスはまだです。
:::

これによって、AWS などで OIDC Identity Provider を登録して IAM ロールを許可することで、一時トークンで AWS アカウントへアクセスできるようになるので、クレデンシャルを直接 GitHub に登録しなくてよくなります（クレデンシャルの登録が無くなるのでサプライチェーン攻撃等でクレデンシャルが漏れる心配を無くせる）。

とても嬉しいのですが、まだ正式に使えるようになったわけではありません（[GitHub Roadmap には追加されています。](https://github.com/github/roadmap/issues/249)）ので、業務での利用はもうちょっと待った方が良さそうです。

[^oidc]: OpenID Connect の詳細について正しく説明できる自信がないので詳しくはググってもらうのが早いです。こことかわかりやすかったです。-> [一番分かりやすい OpenID Connect の説明 - Qiita](https://qiita.com/TakahikoKawasaki/items/498ca08bbfcc341691fe#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)

# know-how 🎓

## SmartHR UI のリリース作業を GitHub Actions で自動化した話 - SmartHR Tech Blog
https://tech.smarthr.jp/entry/2021/09/17/170237

GitHub へのリリース作業（タグ付け、`npm publish`）を GitHub Actions で自動化した事例の話です。これまではリリースに必要な作業(7 工程)を手作業で行っており、ミスや作業漏れが発生する懸念があったため、自動化したいとなったようです。

この記事では、これまでのリリース作業、自動化方法、実際のワークフロー、自動化した結果が書かれています。リリース内容の事前確認のために dry run した結果を載せた Issue を作成するワークフローと、実際にリリースするワークフローの二段構えとなっており、作成された Issue に承認ラベルを付与することでリリースされるという流れになっています。

リリース前の確認に Issue を、承認にラベルを利用している点が珍しいなと思いました。権限をそこまで絞らなくてもいいなら仕組みを手軽に作れそうでいいですね。（プルリクエストを利用する方法と比較してどうかも探究してみたいですね）

## Docker Desktop 無しで Docker を使う with lima on Mac - cangoxina
https://korosuke613.hatenablog.com/entry/2021/09/18/docker-on-lima

Docker Desktop を使わずに macOS 上で Docker を使う方法を紹介した記事です。実現方法として[以前紹介した lima](https://zenn.dev/korosuke613/articles/productivity-weekly-20210630#lima%3A-linux-virtual-machines-(on-macos%2C-in-most-cases)) を使っています。

この記事では Docker 環境の構築方法、使いやすくする設定、どこまでできるか色々調査した結果が載せられています。

初期設定はいくつか必要ですが、記事を見た感じは割と Docker Desktop の代替として使えそうな感じがしますね。Docker Desktop の代替方法はこれからも色々出てくると思います。探究していきたいですね。

:::message
実はこの記事を書いたのは僕です。が、チームメンバの方が紹介してくれました。lima + Docker + macOS の記事は他にも書いてる人がいるのでそちらもご参照ください。
- [Docker Desktop for Macの実用的な代替手段: lima + Docker - Qiita](https://qiita.com/yoichiwo7/items/44aff38674134ad87da3)
- [macOSでもWSLみたいなLinux環境を手に入れる - Qiita](https://qiita.com/chibiegg/items/eede37345f7058ce604d)
- [Lima で Intel on ARM やる](https://zenn.dev/sasasin/articles/46540925aecc4e)
:::

# tool 🔨

## google-github-actions/auth: GitHub Action for authenticating to Google Cloud with GitHub Actions OIDC tokens and Workload Identity Federation.
https://github.com/google-github-actions/auth

上で紹介した [GitHub Actions で OIDC トークンが使えるようになった件](#aws-federation-comes-to-github-actions--aidan-steeles-blog-usually-about-aws)に関するアクションです。

google-github-actions/auth は Actions 上の OIDC トークンを Google Cloud のアクセストークンに交換するアクションです。これにより GitHub 側に GCP のアクセストークンを保存しなくてよくなります。

このアクションの良いところは Google 謹製であるところです。AWS でも似たようなアクションがすでにありますが、公式ではまだ提供されていません。こういった認証を肩代わりするツールの導入は慎重に行う必要があると思うのですが、GCP を作っている Google が開発しているため、他の 3rd Party ツールに比べて信頼しやすいです。

他のクラウドサービスでも今後公式からアクションを提供してほしいですね。GitHub 側が OIDC に正式対応したら使っていきたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Accelerating New Features in Docker Desktop - Docker Blog](https://www.docker.com/blog/accelerating-new-features-in-docker-desktop/)
  - Docker 社が Docker Desktop for Linux の開発を進めていることを明らかにしました
  - 開発者プレビュープログラムに登録することで早期アクセスできます
  - ただ、Linux でわざわざ Docker Desktop を使いたいケースってほとんどないんじゃないかと思いました
- [オラクル、Oracle JDKを再び無料提供へ、本番環境でも利用可。昨日リリースのJava 17から － Publickey](https://www.publickey1.jp/blog/21/oracle_jdkjava_17.html)
  - Oracle JDK がまた無料になったらしい

# あとがき
今週は GitHub Actions の話題がとにかく多かったですね。セルフホストランナー周りの機能拡張は特に嬉しいです。

そうこうしているうちに連休が終わってしまいました...僕は主にガンプラを作っていました。

https://twitter.com/Shitimi_613/status/1442325118194110467?s=20

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

:::message
すみません。今週のおまけは休みです
:::
