---
title: "Productivity Weekly (2021-02-10号)"
emoji: "🙇‍♂️"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 13 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message alert
今週とても忙しかったのと気づいたら時間経っててしまったことから今週号がとても遅くなってしまいました。
毎週楽しみにしている方はすみません。もはや新鮮なネタでは無いので書こうか迷ったのですが、途切れるのも嫌だったので書きました。
お許しください〜🙇‍♂️
:::

# news
## Early Preview - New Android Machine Image - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/early-preview-new-android-machine-image/39016

CircleCI（おそらくCloud）でUbuntuベースのAndroidマシンイメージが使えるようになりました（アーリープレビューですが）。
イメージと書いていますが、Docker Executor で使うための Docker イメージではなく、これは Machine Executor で使うための VM[^1] のイメージとなります。(Executor については[こちら](https://circleci.com/docs/ja/2.0/executor-types))

また、このページにあるイメージ名は`android:202102-01`となっていますが、Android がそのまま VM として使えるわけではありません。
実際は、Android エミュレータや Android SDK などがプリインストールされ、CircleCI に最適化された Ubuntu 20.04 の VM となります[^2]。
これを使えば Android の UI テストが可能とのことなので、Android アプリの自動テストを CircleCI で簡単に行えるようになりそうです。

[^1]: Virtual Machine
[^2]: 最初は Android の docker イメージかと勘違いしました。

## GitHub Actions: Skip pull request and push workflows with [skip ci] - GitHub Changelog
https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/

GitHub Actions において、`push`と`pull_request`トリガーで発火するワークフローをスキップできるようになりました。
HEAD のコミットメッセージに`[skip ci]`などの文字列が含まれている場合に、`push`と`pull_request`トリガーで発火するワークフローがスキップされます。CircleCI や Travis CI ではお馴染みの機能でした。

README.md などのソフトウェアの動作に影響を与えないような変更に対しては、テストをする必要がない場合があります。
これまではそういった場合でもワークフローが走っていたため、マージするためにワークフローの完了を待たなければなりませんでした[^3][^4]。

さっさとマージしたい場合や、非常に時間のかかるワークフローを無駄に走らせて GitHub Actions の利用時間を消費したくない場合にこの機能が役立つかもしれません。

余談ですが、下のツイートを見て、一理あると思いました。
https://twitter.com/\_\_gfx\_\_/status/1358973762662617090?s=20

ソフトウェアの動作に影響を与えない変更であるかどうかの判断を誤って CI をスキップしてしまうと、本当は見つけられたバグを見逃してしまう可能性があるのは事実です。
コスト削減と信頼性の向上はトレードオフの関係にあると思うので、こういう機能を利用する場合は何を重視するかを考えた上で、使うかどうかや利用ルールを決めておくことをおすすめします。

[^3]: ブランチを保護してない場合や、リポジトリの管理者権限を持つ人がマージする場合は完了を待つ必要がありません。
[^4]: 待たなければいけないと書いてはいますが、最近 auto-merge 機能が GA になったため、これからは待つ必要がなくなるかもしれません。

## Pull request auto-merge is now generally available - GitHub Changelog
https://github.blog/changelog/2021-02-04-pull-request-auto-merge-is-now-generally-available/

GitHub において、プルリクエストの自動マージ機能(auto-merge)が Generally Available になりました。これにより、レビューや CI のステータスが完了になるのをパソコンの前で待ち続ける必要がなくなりました。

auto-merge を有効にするためにはリポジトリの Settings にある`Allow auto-merge`にチェックを入れて有効にする必要があります。また、マージ先ブランチに [Branch protection rules](https://docs.github.com/en/github/administering-a-repository/defining-the-mergeability-of-pull-requests) を設定する必要があります[^5]。(`Require pull request reviews before merging`または`Require status checks to pass before merging`の設定が必要だと思われる。)

上記設定をすることで、プルリクエストのマージボタンが以下の画像のようになります。`Enable auto-merge`をクリックしていつものマージ時のようにサブミットすることで、Required が満たされた時に自動でマージされます。

![](https://storage.googleapis.com/zenn-user-upload/kzwayzibywibey2pdu5sjvythn48)

非常に便利な機能なので、積極的に使っていきたいですね。

[^5]: 最初試した時に、`main`ブランチでこれらの設定をしていなかったため、プルリクエストに auto-merge ボタンが表示されず「あれ〜？」となってました。


## AWS Lambda が Node.js 14 のサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2021/02/aws-lambda-now-supports-node-js-14/

AWS Lambda で Node.js 14 が使えるようになりました。

（Node.js 14 が去年の 10 月に LTS になったことを考えると、対応が少し遅いような気もしますが...）
![](https://storage.googleapis.com/zenn-user-upload/19kwzax8wdcpqbhayrycsrc1zuvs)
*[Releases | Node.js](https://nodejs.org/ja/about/releases/) より*

これを機にサポート対象外のランタイムで動作してしまっている Lambda 関数を棚卸ししていきたいですね。

# know-how
## GitHub Actionsを使ったDDoSに巻き込まれた
https://blog.utgw.net/entry/2021/02/05/133642

フォーク先からのプルリクエストで自分のリポジトリで GitHub Actions のワークフローがめちゃくちゃ走らされたという記事です。

別に自分のリポジトリで行えばいいのでは？と考えましたが、フォーク元でワークフローを実行することで自分の GitHub Actions の利用時間を消費せずにワークフローを動かすことができるため、ほぼ無限に無料で GitHub Actions を使えるようですね。確かに DDoS 攻撃と相性が良いと思います。

[Disabling or limiting GitHub Actions for a repository](https://docs.github.com/en/github/administering-a-repository/disabling-or-limiting-github-actions-for-a-repository) に書いてあるような設定を施すことで対策できるのかなと考えたのですが、自分が調べた限りだと、パブリックリポジトリにおいてフォーク先からのプルリクエストでワークフローを動かさない設定は現在できないようなので、GitHub 側の対策を待つ必要がありそうです。

GitHub の中の人も反応しているようなので、今後何かしらの対策がされるかもしれません。

## Deployment reliability at GitHub - The GitHub Blog
https://github.blog/2021-02-03-deployment-reliability-at-github/

GitHub のデプロイの速度や信頼性を高めるための取り組みを紹介した記事です。
大まかには「指標を測定できるようにした」、「デプロイの進捗やエラー時の情報を増やし手軽に見られるようにした」、「SLO を設定した」という取り組みを行ったとのこと。

GitHub のようなどデカい企業がこう言った取り組みを紹介してくれるのは嬉しいですね。参考にしたいところです。

## ググるのはデベロッパーにとって最も重要なスキルの1つ、知っておくと便利なGoogle検索のテクニック
https://coliss.com/articles/build-websites/operation/work/use-google-like-a-pro.html

Google 検索で使えるテクニックの紹介記事 [Use Google like a pro](https://denic.hashnode.dev/use-google-like-a-pro) を日本語訳した記事です。

訳者の方も言っていますが、`..`と`*`は僕も知りませんでした。特に`*`によるワイルドカードはエラーメッセージで検索する際に重宝しそうだと思いました。

検索時間を減らして生産性を上げていきたいですね。

# あとがき
冒頭にも書きましたが、投稿が遅くなってしまいすみませんでした🙇‍♂️。この記事を書くのに毎週1~2時間は平気でかかっているので、体力が無い時はなかなかすぐに書けないんですよね。それでも無理のない範囲でやっていきたい限りです。

今回は CI 周りのネタが多かったですね。どんどん活用して人間の仕事を減らしていきたいです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

# omake
おまけです。以前時間が余った時におまけを書いたら[一部の人に好評だった](https://twitter.com/\_\_sakito\_\_/status/1357240101391142916?s=20)ので、時間が余ってない時も僕が独断と偏見で選んだネタを自由にプチコーナーとして書こうと思います。

https://www.buddha-machine.org/

スイッチひとつでお経が聞ける、持ち運び可能な電子念仏機です。

電子念仏機(またの名をブッダマシーン)とは、念仏や仏教ソングが収録されたジュークボックスらしく、「天界」は初の日本オリジナルなブッダマシーンとのことです。念仏だけではなく、著名アーティストの書き下ろし楽曲や人気楽曲も聞けるのが嬉しいですね[^6]。

携帯電話やパソコンで音楽を聴く時代に、わざわざ限られた楽曲しか聴けない専用の機械を使うのはイマドキではないと思いますが、だからこそ一つ一つの念仏や曲をじっくりありがたく聴こうという気持ちになるのかなと思いました。しかも再生が容易。

買いたかったのですが、現在は売り切れていました......いつか再販して欲しいですね。

[^6]: どうでもいいですが、僕はいわゆる多宗教家です。