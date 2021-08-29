---
title: "Productivity Weekly (2021-08-25号)"
emoji: "🧑‍💻"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 40 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub CLI 2.0 includes extensions! | The GitHub Blog
https://github.blog/2021-08-24-github-cli-2-0-includes-extensions/

GitHub CLI(`gh` コマンド) 2.0 がリリースされ、拡張機能(extensions)を使えるようになりました。拡張機能は自身で作成するだけでなく、他人が作った拡張機能の利用もできます。

既にブランチの切り替えに便利な `gh-branch` やコントリビューションしやすい Issue を探すのに便利な `gh-contribute` といった実用的な拡張機能が公開されており、すぐに利用できます。`gh extension install <OWNER>/<REPO>` でインストールできます。作成する際は、`gh extension create <EXTENSION-NAME>` を叩くと雛形をすぐに用意できます。

僕もさっそく拡張機能を試してみました。気になる人は参考にしてください。
- [GitHub CLI 2.0 で追加された Extensions 機能を使ってみる](https://zenn.dev/korosuke613/scraps/5024ca81623aa0)

また、ログインユーザが Star したリポジトリ一覧を取得する拡張機能も作ってみました。
https://github.com/korosuke613/gh-user-stars

gh コマンドが持つ権限を使って API を叩けるため、パーソナルアクセストークンを別途払い出す必要がありません。簡単に GitHub の権限が必要な API を叩くようなスクリプトを配布できるのがいいですね。

## GitHub Actions: Reduce duplication with action composition | GitHub Changelog
https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/

GitHub Actions の [composite action（複合実行アクション）](https://docs.github.com/en/actions/creating-actions/creating-a-composite-action)で `uses` が使えるようになりました。

composite action はワークフローの複数のステップをまとめたアクションです。頻出する一連の処理を関数化することで、ワークフローの記述量、変更にかかるコストを減らすことができます。しかし、これまで composite action では `uses` を使って他のアクションを呼び出すということができませんでした。そのため結局複数ワークフローに同じような処理が直書きされている状況のリポジトリは多かったかと思います。

これからは composite action 内で `uses` が使えます。記事では `docker/setup-buildx-action@v1`、`docker/login-action@v1`、`docker/build-push-action@v2` を組み合わせて、Docker イメージのビルドからプッシュまでを楽に行えるようにした例が載っています。

僕も試しに [go のセットアップからキャッシュの設定までをアクションにまとめてみました](https://github.com/korosuke613/playground/pull/7/files)。便利ですね。

あらゆるワークフローの処理を関数化できるようなって、ワークフローを書くのが楽になりました。これは生産性が上がりますね。

:::message
実は今週の Weekly があった 8/25 時点ではまだ GitHub から公式のアナウンス（Changelog）は出ていなかったため、下の Issue が Weekly で取り上げられました。
[The uses keyword is now live on Github.com for composite actions 🎉 🎉 ](https://github.com/actions/runner/issues/646#issuecomment-901336347)
:::

## Amazon EC2 M6i instances are now available in 2 additional regions
https://aws.amazon.com/jp/about-aws/whats-new/2021/08/amazon-ec2-m6i-instances-us-west-asia-pacific/

[先週ちらっと Amazon EC2 で新しく M6i インスタンスが登場した話を紹介しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210818#koneta-%F0%9F%8D%98)が、この M6i インスタンスが早くも東京リージョンでも使えるようになりました。

M6i インスタンスは M5 インスタンスの後継です（`i` は Intel プロセッサであるという意味）。M5 インスタンスと比べてパフォーマンスが向上していたり、新たなインスタンスサイズが追加されていたりします。

同じインスタンスサイズであれば M5 インスタンスと比べて料金は変わらないので、特にこだわりがなければアップデートしておきたいですね。

# tool 🔨

## Otter｜Otterは英語音声の文字起こしアプリです
https://otter.ai/jp

英語音声を文字起こししてくれるアプリです。リアルタイムで文字起こしして、テキスト+音声で保存してくれます。毎月 600 分、1 回のセッションにつき 40 分までなら無料で利用できます。

英語のポッドキャストや字幕のない英語のニュースを見る際などに使えそうです。また、録音した音声を再生すると話したワードがハイライトされるので、英語学習にも利用できるかもしれません。

僕の場合は、[先日の Weekly で紹介した Alibaba Cloud の Podcast](https://zenn.dev/korosuke613/articles/productivity-weekly-20210811#koneta-%F0%9F%8D%98) を聴くために使いました。結構認識率が高い印象です。また、この後 DeepL 翻訳にかけました。（録音する必要があるので面倒ではありますが...[^import]）

![](/images/productivity-weekly-20210825/otter.png =250x)

残念ながら僕は英語が苦手なので英語の Podcast を聴くのは実質できませんでした。Alibaba Cloud の Podcast についても紹介はしつつ自分では聴けないななんて考えていたのですが、Otter を知って自分でも英語の Podcast を楽しめるようになりました。（自動翻訳機能までつけてくれるとなおありがたいですね。）

[^import]: 軽く調べた感じだと、無料版の場合 3 ファイルまでならファイルから音声を import できるようです。本格利用したいならお金を払いましょう。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Do you wiki?  We just added an automatic table of contents to the sidebar to help with navigation 🧭 📖](https://twitter.com/github/status/1428466581554745352)
  - GitHub の wiki で目次が自動生成されるようになりました。
  - これまでは手動で目次を作る必要があったようです。ようやくまともに wiki として使えそうですね。
- [Block users on GitHub Mobile | GitHub Changelog](https://github.blog/changelog/2021-08-24-block-users-on-github-mobile/)
  - GitHub Mobile からユーザをブロックできるようになりました。
  - それよりも自分は GitHub に[ユーザをブロックする機能](https://docs.github.com/en/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account)があることをよく知りませんでした。
  - github もある意味 SNS みたいなものなのでスパムアカウントや嫌がらせアカウントをブロックできるのは良いですね
  - ちなみに、ちょうど Weekly の次の日あたりに初めて僕もスパム被害を受けたので、ブロックしました。タイムリー。
    - https://twitter.com/Shitimi_613/status/1431314510023774210?s=20

# あとがき
今週は土曜日に [ODC](https://event.ospn.jp/odc2021-online) での発表がありました。生産性向上チームで外部で発表するっていうのは珍しかったのですが、これからますます露出を増やしていきたいですね。発表資料は[こちら](https://event.ospn.jp/odc2021-online/session/376878)にまとめているので、気になる方は読んでいただけると幸いです。

ちなみに 8/30-9/2 までインターン受け入れがあります。がんばるぞ！

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### samuelmarina/is-even: Is a number even?
https://github.com/samuelmarina/is-even

数字が偶数かどうかを判定するための npm ライブラリです。

なんと `if(number === 18 || number === "18" || number === "eighteen" || number === "Eighteen" || number === "EIGHTEEN") return true;` というように if 文を大量に並べて判断しています。おかげで [`index.js`](https://github.com/samuelmarina/is-even/blob/316732ff0f41a49cf439cb704e0d491d5b6e4963/index.js) のファイルサイズは 90MB を超えています。

https://twitter.com/mattn_jp/status/1428544072327729152?s=20

狂気に満ちていますね。

こんなリポジトリですが現時点で Star 数は 1.1k を超えており、100 を超えるプルリクエストが寄せられています。（~~プログラマは悪ふざけがお好き~~）

```text:作者はこのプロジェクトの早急な完成を望んでいます。
PLEASE, MAKE A PULL REQUEST SO WE CAN FINISH THIS PROJECT ASAP. Also, give it a star, for the sake of God.
```
*[README.mdより](https://github.com/samuelmarina/is-even/blob/316732ff0f41a49cf439cb704e0d491d5b6e4963/README.md#contributing)*

色々と謎なリポジトリですが、ちょっと調べた感じだと存在理由がよくわかりませんでした。`why` という Issue すらありますがまだ謎は解けていません。
https://github.com/samuelmarina/is-even/issues/158

README.md にもリンクがありますが、作者の Samuel Miller 氏は Youtuber のようなので、知名度向上のためのリポジトリなのかもしれませんね（知らんけど）。

ちなみに奇数かどうかを判定するための `is-odd` というライブラリもあります。奇数を知りたい人にも安心！
https://github.com/samuelmarina/is-odd

暇な人は貢献してみると暇を潰せると思います。