---
title: "Productivity Weekly (2021-12-01号)"
emoji: "🍺"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211201"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 53 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message alert
公開が遅くなってしまい申し訳ありません。[アドベントカレンダー](https://korosuke613.hatenablog.com/entry/history-of-github-actions)や[アドベントカレンダー](https://zenn.dev/korosuke613/articles/productivity-weekly-1st-aniversary)を書いてたりしてました。
:::

# news 📺

## Fleet へようこそ！ | JetBrains News
https://blog.jetbrains.com/ja/blog/2021/11/29/welcome-to-fleet/

JetBrains が次世代 IDE である Fleet を発表しました。

Fleet にはフル機能エディタとして動作する Editor Mode とスマート補完やナビゲーションといった IDE 機能を追加で利用可能できる Smart Mode があります。そのため、Fleet は軽量エディタとしても、高機能 IDE としても利用可能となっています。

また、Fleet の各コンポーネントは分散させることができます。インデックス作成を行うバックエンド部分のみリモートで実行させ、非力なローカルマシンでも快適にコーディングするということが可能です。また、VSCode Live Share や Code with Me のようなコラボレーション機能がネイティブで組み込まれており、共同作業に力を入れていることがわかります。

従来のエディタや IDE と違った興味深い機能を持っており、早く触ってみたいです。発表当時は早期リリースの申請ができたのですが、1 週間も待たずに登録を打ち切っていました。

https://twitter.com/Shitimi_613/status/1466712696519524355

早期リリースに申請していなかった人は気長に待ちましょう...申請してた人もまだあまり invite が届いていないみたいなので気長に待ちましょう[^me]...


[^me]: 僕も発表してすぐ登録したのですが残念ながらまだ届いていません...

## GitHub Actions: Workflows triggered by Dependabot receive dependabot secrets | GitHub Changelog
https://github.blog/changelog/2021-11-30-github-actions-workflows-triggered-by-dependabot-receive-dependabot-secrets/

Dependabot のプルリクエストにより実行される GitHub Actions のワークフローへ Dependabot に設定したシークレットが渡るようになりました。

[2021/03/01](https://zenn.dev/korosuke613/articles/productivity-weekly-20210224#github-actions%3A-workflows-triggered-by-dependabot-prs-will-run-with-read-only-permissions---github-changelog) の変更から、リポジトリなどに設定したシークレットは Dependabot に渡らないようになっていました。そのため、CI が落ちて困る場面などがありました。

これからは、Dependabot の設定に登録したシークレットをワークフロー内で利用できます。ようやくシークレットが必要な場面でも楽に Dependabot を利用できますね。

## Release Adding Node.js version file support · actions/setup-node
https://github.com/actions/setup-node/releases/tag/v2.5.0

GitHub Actions の actions/setup-node アクションで `.node-version` や `.npmrc` のバージョンを指定できるようになりました。対象のファイル名を `node-version-file` パラメータで渡します。

`.node-version` などで Node.js のバージョン管理をしていた場合、管理ファイルを自前でパースして actions/setup-node に渡したり、バージョンの記述を二重管理する必要がありました。この変更でそういった面倒ごとをなくすことができます。

ただ、[asdf](https://zenn.dev/korosuke613/articles/productivity-weekly-20210331#asdf-%E3%81%AE%E3%82%B9%E3%82%B9%E3%83%A1---esm-%E3%82%A2%E3%82%B8%E3%83%A3%E3%82%A4%E3%83%AB%E4%BA%8B%E6%A5%AD%E9%83%A8%E9%96%8B%E7%99%BA%E8%80%85%E3%83%96%E3%83%AD%E3%82%B0) の管理ファイルである `.tool-versions`[^tool-version] には対応していませんでした。しかし、現在 `.tool-versions` に対応させるためのプルリクエストが開いています。

- [Add support for asdf format as Node.js version file by ganta · Pull Request #373 · actions/setup-node](https://github.com/actions/setup-node/pull/373)

対応してほしい人は Vote 👍 しましょう。

[^tool-version]: Node.js だけでなく、複数ツールのバージョン情報が載っている。

## GitHub Actions: Reusable workflows are generally available | GitHub Changelog
https://github.blog/changelog/2021-11-24-github-actions-reusable-workflows-are-generally-available/

[以前紹介した再利用可能なワークフロー(reusable workflow)](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#github-actions%3A-dry-your-github-actions-configuration-by-reusing-workflows-%7C-github-changelog)が正式リリースされました[^reusable]。

正式リリースに伴い、発表当時と比較して以下の改善が行なわれました。

- 再利用可能なワークフローから呼び出し元ワークフロー内の他のジョブにデータを渡すための output が利用できるように
- 再利用可能なワークフローに環境変数を渡せるように
- 利用された再利用可能なワークフローが監査ログに記録されるように

環境変数が渡せたり output を伝播できるようになったのは嬉しいですね。

わかりやすい日本語の記事も出ていました。こちらもご参照ください。

- [[github actions] Reusable workflowsが実装されたのでざっとまとめ](https://zenn.dev/jerome/articles/618af7cc934f2f)

[^reusable]:ていうかまだパブリックベータだったんですね。

## Docker 公式イメージが Amazon Elastic Container Registry Public で利用可能になりました | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/docker-official-images-now-available-on-amazon-elastic-container-registry-public/

https://www.docker.com/press-release/docker-official-images-available-amazon-elastic-container-registry

Docker 公式イメージ（Docker Hub の [`Official Image`](https://docs.docker.com/docker-hub/official_images/) とついているイメージ）を Amazon ECR Public レジストリから pull できるようになりました[^official]。今のところ Docker 公式イメージは全て `library` という名前空間内に存在するようです。

これにより、AWS 利用者は Docker Hub の rate limit を気にせずに Docker 公式イメージを利用できます。さらに、AWS のネットワーク内で Amazon ECR Public からイメージを pull する場合は帯域に課金がされないので、AWS 利用者は積極的に Amazon ECR Public 経由で Docker 公式イメージを pull するようにした方がコストを減らせます（しかも高速に落とせる）。

AWS 利用者必見なニュースですね。

[^official]: `library/*` となっていることもあってか、[`Verified Publisher`](https://docs.docker.com/docker-hub/publish/) イメージはありませんでした。

## AWS re:Invent 2021
https://aws.amazon.com/jp/about-aws/events/2021/reinvent/

毎年恒例、AWS re:Invent 2021 が開催されました。去年は 3 週間くらいやってたと思うのですが、今年は 4 日間でした。今年もさまざまな新サービスや新機能が発表されていましたね。

僕は今年全くウォッチできてなかったので、どういうニュースがあったのかこれを書いている今もよくわかっていません（詳しく知ってるのは Amazon ECR Public で Docker 公式イメージが使えるようになったことや M1 Mac インスタンスが増えたことくらい）。

そんな人たちのために、今年も情報をまとめてくれている方たちがいます。僕もこれからこれらをちゃんと読んで re:Invent 2021 について知っとこうと思っています。

### 週刊 AWS – re:Invent 2021 特別号（2021/11/29 週）| Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/aws-weekly-20211129/

週間 AWS という毎週 AWS 関連のニュースをお届けしてくれる AWS 公式の週刊連載があります。それの 2021/11/29 週号が re:Invent 2021 特別号として主要なアップデートをまとめてくれています。AWS ブログ上の記事なのでまず間違いない情報であるのが嬉しいですね。

### AWS re:Invent 2021 で発表された新サービス/アップデートまとめ - Qiita
https://qiita.com/nasuvitz/items/6dd55f9dd2fb40d27abd

こちらは TIS 株式会社の方による新サービス/アップデートまとめです。上で紹介した週刊 AWS ではカテゴリでのまとめでしたが、こちらは時系列でのまとめとなっています。また、1 トピックあたりの情報量が多いです。最後に会場の様子をまとめてくれています。

この方は[去年もリアルタイム更新をしていました](https://qiita.com/nasuvitz/items/a191d96549b0d0a955dc)。リアルタイムで書くのはすごいですね。

## IntelliJ IDEA 2021.3 Is Out!
https://blog.jetbrains.com/idea/2021/11/intellij-idea-2021-3/

https://www.jetbrains.com/ja-jp/idea/whatsnew/

IntelliJ IDEA 2021.3 がリリースされました。相変わらずさまざまな更新がありますが、やはり一番気になるのはリモート開発機能（Beta）でしょうか。

https://blog.jetbrains.com/ja/blog/2021/11/29/introducing-remote-development-for-jetbrains-ides/

リモート開発機能では、リモートサーバーに IDE バックエンドなどをホストして、軽快にローカルマシンから JetBrains IDE を利用できるようになるというものです。JetBrains IDE は高性能なマシンでも重くなりがちなので、こういった仕組みで軽くできるのは良いですね。昨今は M1 Mac の登場で、AMD と ARM の 2 つの開発環境をサポートしないといけなくなってきましたが、リモートマシンで動作させることによりアーキテクチャの違いをあまり考えずに開発をしていくこともできそうです。

冒頭の Fleet でもそうでしたが、JetBrains は開発環境を分散させていきたいのかもしれませんね。僕はまだ触れていないので、早いうちに触ってみたいと思います。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [aws_iam_openid_connect_providerのthumbprint_listの計算方法 - Qiita](https://qiita.com/minamijoyo/items/eac99e4b1ca0926c4310)
  - OIDC を使う際に出てくる ThumbprintList の計算方法を解説している記事です
  - よく計算しようと思ったなと思いました。勉強になります
  - 「これで突然証明書がなんらかの理由でローテーションされてハッシュ値が変わっても自分で再計算できて安心ですね。」で笑いました
- [AWS のイベント申込を 2 秒で終わらせる！ 1password で入力フォームを自動補完してみた | DevelopersIO](https://dev.classmethod.jp/articles/aws-event-autofill/)
  - 1Password を使って AWS のイベント申込フォームを自動補完するという記事です
  - 同じ会社のイベントやセミナーに参加するたびフォーム埋めるの面倒ですよね
  - GitHub とか他社のイベント申し込みにも使えそうです

# あとがき
2021/11/24 号に引き続き 2021/12/01 号も遅くなってしまいすみません。冒頭でも触れましたが 12 月前半でアドベントカレンダーを 2 つも書いてしまい大変忙しかったです。

|カレンダー|日付|内容|
|---|---|---|
|GitHub Actions Advent Calendar 2021|1st|[GitHub Actionsの歴史](https://korosuke613.hatenablog.com/entry/history-of-github-actions)|
|Cybozu Advent Calendar 2021|8th|[Productivity Weekly 記事 1 周年 🎉 〜続けてみてのアレコレ〜](https://zenn.dev/korosuke613/articles/productivity-weekly-1st-aniversary)|

良ければ読んでみてください。
いやー12 月忙しすぎる。Weekly 記事合わせると 4 本もこの 2 週間で書いていることになります。（ちなみに[チーム紹介 note 記事](https://note.com/cybozu_dev/n/n1c1b44bf72f6)も最近出しました。）

僕の今年はもう終わったようなものです。嘘です。終わってません。まだ 2021/12/08 号の記事を出せていないのでこれから書きます。

---

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### ファイルパーミッションでスロットがしたい - Qiita
https://qiita.com/jiro4989/items/2530c4f789916521a47a

おもしろコマンドです。

ファイルのパーミッションを使ってスロットゲームができます。パーミッションをメチャクチャにできます。sudo 権限が無いと最悪何もできなくなるので注意が必要です。

揃えるの楽しくて無限に遊べちゃいますね。目押しの練習にもなりそうです（？）
