---
title: "Productivity Weekly (2021-07-07号)"
emoji: "🎋"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 33 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions: Setup-node now supports dependency caching | GitHub Changelog
https://github.blog/changelog/2021-07-02-github-actions-setup-node-now-supports-dependency-caching/

https://github.com/actions/setup-node/pull/272

GitHub Actions で使える actions/setup-node アクションにキャッシュ機能が追加されました。

actions/setup-node アクションはランナー上に指定したバージョンの Node をインストールして使えるようにしてくれます。これまでは、それとは別に actions/cache アクションを使うなどして npm や yarn でインストールした依存関係をキャッシュしていましたが、今回の変更により actions/cache アクションを使わずともキャッシュの保存、リストアが可能となりました。

早速試してみました。便利でしたが、モノレポ構成にはまだ非対応でした。（リポジトリルートのロックファイルしか見てくれないっぽいです。）
https://twitter.com/Shitimi_613/status/1411236295418863617?s=20

actions/cache ほどの自由度もないため、actions/setup-node 側の変更を待つかプルリクエストを送るしかなさそうです。

すでに指摘している Issue がいくつかありました。
- [Accept a working-directory as an input argument · Issue #282 · actions/setup-node](https://github.com/actions/setup-node/issues/282)
- [Support cache dependencies for cases where package lock files are located in subfolders · Issue #275 · actions/setup-node](https://github.com/actions/setup-node/issues/275)

しかし、assignee の設定やプルリクエストは見つけられなかったので、プルリクエストチャンスかもしれません[^why]。

今回の機能追加を皮切りに、これからいろんな setup 系アクションに同等の機能が追加されていくことが予想されます。楽しみですね。

[^why]: 逆に、すでに数日経ってるのに一個もプルリクエストが作られていないことが気になりますね。結構難しい問題を孕んでいるのかも。

## Parameter to disable markdown rendering
https://github.blog/changelog/2021-06-30-parameter-to-disable-markdown-rendering/

GitHub で Markdown をレンダリングするかどうかをクエリパラメータ（`plain=1`）で制御できるようになりました。クエリパラメータに `plain=1` を追加することでレンダリングされていない状態の Markdown を GUI 上で表示できるようになります[^plain]。

![](https://storage.googleapis.com/zenn-user-upload/72ac91ec61b422901c0c19f3.png =600x)
*[左](https://github.com/cybozu/assam/blob/7e323949de9460696a2e40f1224f2232f03823ef/README.md)はレンダリングされている。[右](https://github.com/cybozu/assam/blob/7e323949de9460696a2e40f1224f2232f03823ef/README.md?plain=1)はレンダリングされていない（`plain=1` を付与）*

これまでレンダリングされていない Markdown を GUI で表示したい場合は `Raw` ボタンをクリックする必要がありました。GUI でレンダリングされていない Markdown が見られるようになって何が嬉しいんだい？と思うかもしれませんが、実はこの変更によってコードの行を指定したリンクの生成が Markdown でも可能になりました。

> You can link to a specific line in the Markdown file the same way you can in code. Append #L with the line number or numbers at the end of the url. For example, github.com/<organization>/<repository>/blob/<branch_name>/README.md?plain=1#L14 will highlight line 14 in the plain README.md file.
> [Creating a permanent link to a code snippet - GitHub Docs](https://docs.github.com/en/github/writing-on-github/working-with-advanced-formatting/creating-a-permanent-link-to-a-code-snippet#linking-to-markdown)

すでにドキュメントにも載ってました。方法としては URL 末尾に `?plain=1#行番号` を追加するだけです。

![](https://storage.googleapis.com/zenn-user-upload/2f580b43ce72f20b58813faa.png =600x)
*https://github.com/cybozu/assam/blob/7e323949de9460696a2e40f1224f2232f03823ef/README.md?plain=1#L4*

これまでは見出しなどをアンカーで指定することでしか箇所の共有はできませんでした。もっと詳細に共有したい箇所を指定できるようになったのは良いですね。

ただ、わざわざ URL に `plain=1` を手動で追加するのは面倒なのでボタンを追加してほしいですね。おそらくそのうち追加されることでしょう。

[^plain]: 余談ですが、`plain=1` ではなく `plain=true` でも同じ結果を得ることができました。

## Webhook Deliveries API | GitHub Changelog
https://github.blog/changelog/2021-06-30-webhook-deliveries-api/

GitHub が送った Webhook の履歴を API で取得できるようになりました。これまでは GUI 上でしか Webhook の履歴を取得できませんでした。

例えば、CircleCI を使っている場合、コミットがプッシュされた際、それを知らせるために Webhook が使われてます。何らかの問題で Webhook の送信に失敗してしまった場合、GUI から送信した Webhook 一覧を見にいって、失敗している Webhook を再送することがあります。Webhook の送信に失敗しているかどうかも GUI で確認するしかありませんでした。

Webhook 一覧を API で取得できるようになったため、今後は定期的に Webhook 一覧を取得し、失敗していたら Slack などで通知するということが可能になります。

https://twitter.com/mumoshu/status/1410776946724671494?s=20

さらに、この API を利用することにより、Webhook サーバーを公開しないというアイデアも出ています。ただし Webhook 自体を有効化するためのダミーサーバーが必要です。

これ面白いアイデアだと思いました。普通に Webhook を受け取るサーバを用意するよりセキュアかもしれませんね。さらに、インターネットからアクセスできないネットワーク内のマシンが Webhook を取得するのにも使えそうです。~~GitHubからすると溜まったもんじゃないかもしれませんが...~~

## Google Online Security Blog: Measuring Security Risks in Open Source Software: Scorecards Launches V2
https://security.googleblog.com/2021/07/measuring-security-risks-in-open-source.html
OSS のリスクを測るための指標群、および、リスクスコアを生成するツールである ossf/scorecard[^score] に新たな指標が加わりました。

ossf/scorecard を使うことで OSS の採用判断に利用できます。今回 v2 がリリースされました。v2 ではブランチ保護が有効になっているかどうかや、依存関係のバージョンを固定しているかどうかなどといったチェックが追加されています。（なお一部、リポジトリオーナーじゃないとチェックできない項目もあります。例えばブランチ保護を確認する API はリポジトリオーナーしか叩けません。）

https://zenn.dev/korosuke613/scraps/5fd242b7f76aa7

さっそく触ってみました。色々制約があり、なかなか癖のあるツールだと思いました。

余談ですが、Productivity Weekly では、チェック項目の 1 つである Active が OSS の EOL[^eol] チェックに使えるのではないか？という話で盛り上がりました。（何を持って EOL と判断するか、どう確認するかって難しいですよね）

> Active Did the project get any commits in the last 90 days?
https://github.com/ossf/scorecard

[^eol]: End Of Life の略。開発もメンテももうやんないよってことですね。おそらく。

[^score]: [実は Scorecard 自体はいにしえの Productivity Weekly で紹介しています](https://note.com/korosuke613/n/nc50daec1a988#:~:text=OSS%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%81%AE%E3%82%BB%E3%82%AD%E3%83%A5%E3%83%AA%E3%83%86%E3%82%A3%E3%81%B8%E3%81%AE%E5%A7%BF%E5%8B%A2%E3%82%92%E5%88%86%E6%9E%90%E3%81%99%E3%82%8B%E3%83%84%E3%83%BC%E3%83%AB)。


## Release 3.1.0 - CircleCI Server Changelog
https://circleci.com/server/changelog/#release-3-1-0

[3 月ごろに CircleCI Server 3.0 がリリースされました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210324#introducing-circleci-server-3.x%3A-enterprise-focused-kubernetes-for-self-hosted-circleci-installations---circleci)が、先日これの 3.1.0 がリリースされました。

3.0 系に比べて、いくつかの新機能や構成の変更などが追加されています。特に大きな機能としては[セットアップワークフロー](https://zenn.dev/korosuke613/articles/productivity-weekly-20210331#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%83%BB%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC(%E3%83%A2%E3%83%8E%E3%83%AC%E3%83%9D%E5%AF%BE%E5%BF%9C)-%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%82%88%E3%81%86%EF%BC%81---community---circleci-discuss)による動的な config 生成ができるようになったことと、[セルフホストランナー](https://note.com/korosuke613/n/nc50daec1a988#4RmnD#:~:text=CircleCI%20Cloud%E3%81%A7%E3%82%BB%E3%83%AB%E3%83%95%E3%83%9B%E3%82%B9%E3%83%88%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%8C%E4%BD%BF%E3%81%88%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F)が利用できることになったことでしょうか。

セルフホストランナーについてはそもそも CircleCI Server がオンプレ何だから別途セルフホストランナー用意するメリットあるか？となるかもしれませんが、[ランナーが使えることで、マシンスペックを柔軟に決めることができたり、macOS が使えるようになったりできます](https://circleci.com/docs/2.0/runner-overview/?section=executors-and-images)。（しかし、セルフホストランナーを利用するには Scale プランの契約が必要です。）

CircleCI Server 3 系は四半期ごとに Feature Release を行うとのことなので、次は 10 月ごろに大きなアップデートが来るかもしれません。やっぱり 2 系に比べてクラウド版の機能が活発に入りそうなので嬉しいですね。

# know-how 🎓

## Blazing fast TypeScript with webpack and ESBuild - DEV Community 👩‍💻👨‍💻
https://dev.to/karanpratapsingh/blazing-fast-typescript-with-webpack-and-esbuild-4mhh

webpack で TypeScript をビルドする際、loader に ts-loader ではなく ESBuild を使うことで高速化できるというお話です。

ESBuild は go で書かれていることと、TypeScript の型チェックをしないことから ts-loader よりも高速に動作します。esbuild-loader を介して Webpack で使い、別途型チェックをするために fork-ts-checker-webpack-plugin という Webpack のプラグインを使うことが紹介されています。

僕はまだ試せていませんが、Productivity Weekly 参加者が試してみたところ、「割と簡単に導入できたが、大きいプロジェクトでは試していないので、ちゃんと動くか・高速化できているかは未確認」とのことでした。

僕も webpack を使う大きめのプロジェクトではビルド時にコーヒー☕️を用意するくらいに待たされることがあるので、ちょっと試してみたいです。

# know-how 🎓
## シェルスクリプトで GitHub App のインストールアクセストークンを取得する
https://zenn.dev/gorohash/articles/e2c5f6ce50f4e6

作成した GitHub App の権限を使って API を実行する場合、JWT(JSON Web Token)を発行し、インストールアクセストークンを取得し、API を実行する必要があり、なかなか面倒です。GitHub の公式ドキュメントには Ruby のサンプルコードしかなく、他の方法で行いたい場合は自分でコードを作る必要があり、ちょっと面倒です。

この記事では、ShellScript(Bash) を使って GitHub App の権限で API トークンを叩くためのサンプルコードが示されています。ただ、やはり比較的高級な言語である Ruby と比べると色々と自前で行う必要があり、なかなかのコード量になっています。

それでもやはり Bash なら Ruby より多くの環境に最初からインストールされていると思う（たぶん）ので、より使いやすくて良いですね。

# tool 🔨

## quicktype/quicktype: Generate types and converters from JSON, Schema, and GraphQL
https://github.com/quicktype/quicktype

JSON Scheme や GraphQL のクエリー、TypeScript の型定義から各言語のモデルのコードを生成してくれる CLI ツールです。ターゲットの言語は多岐にわたっています。

TypeScript の SDK はあるけど、この言語の SDK や CLI はないから作りたいなーといった際の走り出しに使えそうです。ただこういうコード生成や変換系のツールってどこまで使い物になるか分からないので、僕も何かで試してみたいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [macOSで *.localhost を 127.0.0.1 に解決する](https://zenn.dev/ichiban/articles/a2c124f036ec72)
  - *.localhost を 127.0.0.1 に解決するのを楽にする方法を説明した記事です。
  - `/etc/resolver` 配下にドメイン名のファイルを置いてネームサーバー設定を書くと、そのドメインの名前解決は指定されたネームサーバーで行ってくれる仕組みを利用しています。
  - ここでは自前で Go の DNS サーバーを用意していますが、[Unbound](https://github.com/NLnetLabs/unbound)などを使うのもアリかもしれません。
  - ただやはり設定が面倒なので、あまり量が無ければ `/etc/hosts` を書き換える方が楽そうです。
- [im2nguyen/rover: Interactive Terraform visualization. State and configuration explorer.](https://github.com/im2nguyen/rover)
  - terraform を図で可視化するツールです。
  - 最近生まれたツールであり、まだまだ開発途中のようです。
  - ちょくちょく動作が不安定なのでまだ本格的に使うには厳しいかもしれません。
- [CircleCI Cloud の「パイプラインの手動実行ボタン (manual pipeline run button)」を試す](https://zenn.dev/gorohash/scraps/f45b21ccf8a427)
  - 以前紹介した[CircleCI の Run pipeline](https://zenn.dev/korosuke613/articles/productivity-weekly-20210616#manual-pipeline-run-button---circleci-changelog)についてやってみた系スクラップです。
  - Run pipeline の使い方が詳細に載っています。
  - また以前は、パラメータの付与に関するポップアップが出る場合があったそうです。

# あとがき

今週も生産性が上がりそうな面白いネタがたくさんありましたね。Productivity Weekly ですが実は来週で 1 周年です（記事自体は去年の 11 月から始めたのでまだですが😇）。

会自体は記事に書いてないような面白い話がたくさん出るので、本当は会自体を Youtube で公開したかったりもするのですが、やはり社内の話に頻繁に出てくるので簡単にはできません。とりあえずは記事の方を強化していきたいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### Thanks mindstorms EV3-教育版レゴ® マインドストーム® EV3 ありがとうキャンペーン
![](https://storage.googleapis.com/zenn-user-upload/a44a81f1e3bb02398c9ff454.png =600x)

https://afrel.co.jp/thanks-mindstorms-ev3

教育版レゴのマインドストームが 7 月末で販売終了になることが発表されました。マインドストーム（EV3）には入力端子と出力端子が 4 つずつあり、センサやサーボモータをつなげてプログラムを作ると、コースを走らせたりモノを移動させたりということができました。

僕は大学一年生の頃にマインドストームと出会い、修士課程を修了するまでの 6 年間（！）も苦楽を共に過ごしました。

僕が入った学部（宮崎大学工学部情報システム工学科）では研究室体験という適当な研究室に 1 週間の間お世話になるというイベントが一年生であります。この時お世話になった片山徹郎研究室では、体験に来た一年生に EV3 でライントレースバトルをしてもらうんですよね。僕は高校の頃にマイコンカーラリーというロボコンに出ていたのもあって、組み込み系が好きだったためとても楽しく行うことができました。コードを書いて CygWin でビルドしてケーブルをつないで転送して動かして...というのを繰り返し試行錯誤しながら行うのは辛いながらも楽しいものです。

https://www.youtube.com/watch?v=B2mNQrfGa5c
*↑ 研究室体験の様子*

その後 3 年生になり片山徹郎研究室に配属されました。ここでは毎年 ET ロボコンというマインドストームを使ったロボットコンテストに出場しています。僕は修士課程に進んだので、修了するまでの約 3 年間毎年 EV3 と格闘していました。EV3 は 5,6 体あったのですが、やっぱり経年劣化等で個体差があるんですよね。こいつはボタンがおかしい、こいつはなんか知らんけどたまに変な挙動をするとか。モータも個体差があるので真っ直ぐに走らせるのが大変だったり。

https://www.youtube.com/watch?v=B5q6JaPYoss
*↑ ET ロボコンの練習風景*

https://korosuke613.hatenablog.com/entry/2019/12/08/205203

https://korosuke613.hatenablog.com/archive/category/ET%E3%83%AD%E3%83%9C%E3%82%B3%E3%83%B3
*↑ 記事も色々書きました。*

大会の経験や組み込み系の経験は、研究や就活時、就職した今でもとても役に立っています。マインドストームにはとてもおせわになりました。

個人で遊ぶ分には十分すぎるほどボリュームがあるので、今から買うのも全然アリだと思います。7 月末までは販売している上、お得なセットがあるのでお買い求めはお早めに。

**RIP Mindstorm ⚰**, **Thanks!**
