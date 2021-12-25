---
title: "Productivity Weekly (2021-12-22号)"
emoji: "🎅"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211222"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 56 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message
この日は休みの人が多かったりネタを仕入れ忘れてたりしたのが理由で紹介できるネタが少ないです🙇
年末ということで許してください。
:::

# news 📺

## GitHub Pages: using GitHub Actions for builds and deployments for public repositories | GitHub Changelog
https://github.blog/changelog/2021-12-16-github-pages-using-github-actions-for-builds-and-deployments-for-public-repositories/

GitHub Pages のビルドとデプロイのログが GitHub Actions で見られるようになりました。

Pages 用に設定したブランチへ push すると `pages build and deployment` というワークフローが起動し、ビルド、デプロイのログを確認できます（[例](https://github.com/korosuke613/korosuke613.github.io/actions/runs/1620396505)）。これまではログが全く見られなかったため、デプロイに失敗した際の理由は不明でした。

今のところはログが見れるようになったくらいですが、記事によると今後は Pages のビルドとデプロイをカスタマイズできるようにしていくとのことです。

いつからかわかりませんが、GitHub Pages の処理は GitHub Actions のプラットフォーム上で動くようになったんですね。今後の機能追加も期待です。

## Restrict renaming protected branches to admins | GitHub Changelog
https://github.blog/changelog/2021-12-16-restrict-renaming-protected-branches-to-admins/

GitHub において、保護されたブランチを名前変更できるユーザが Admin のみに制限されました。

これまでは（おそらく）Write 権限を持ったユーザはデフォルトブランチ以外の全てのブランチの名前を変更できました。名前変更に合わせてブランチ保護ルールも自動で変更されていたようです。しかし、そもそもブランチ保護ルールを変更できるのは管理者のみであるため、保護されたブランチの名前を変更できるのも管理者のみとなったようです。

これまでのルールが厳密でなかったようなのでそれを正したような変更ですね（セキュリティの向上もありそう？）。頭に留めておきたいです。

## Specify who can force push to a repository | GitHub Changelog
https://github.blog/changelog/2021-12-21-specify-who-can-force-push-to-a-repository/

GitHub のブランチ保護において、force push の制限を柔軟に行えるようになりました。具体的には、特定ユーザ、チームのみ force push を許可できるようになりました。これまでは force push を完全に禁止するか完全に許可するかの 2 択しかありませんでした。

あまり使い道はないかもしれませんが、訳あってこのユーザのみ force push を許可したい場合やコアに開発しているチームは force push できるようにしたいといった要望に対応できそうです。

## ワークフローとしての SSH での再実行
https://circleci.com/ja/changelog/#%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE-ssh-%E3%81%A7%E3%81%AE%E5%86%8D%E5%AE%9F%E8%A1%8C

※[原文はこちら](https://circleci.com/changelog/#ssh-reruns-as-workflows)。

CircleCI において、SSH を使用したジョブの再実行(`Rerun job with SSH`)時に、ジョブが実行元のワークフローに接続されるようになりました。これまでは独立したジョブとして実行されていました。

実はこれまで僕自身が `Rerun job with SSH` で困ったことがなかったため、正直なところこれによってどういう問題が解決されるのかいまいちわかっていません...[^discuss]

例えば、依存するジョブ間からファイル受け取る場合（`attach_workspace`）にこれまではジョブが独立していたためファイルを受け取れなかったけど、ワークフローに接続されるので受け取れるようになったとかそういうことなんですかね？以前の挙動を今はもう再現できないため確認ができません。誰か知ってる方がいたら教えてください🙇

[^discuss]: discuss とか調べたけどやっぱわからなかった。

# Advent Calendar 🎅
今回ネタが少ないので、僕が見てた（これから見たい）アドベントカレンダーをここに記します。

## CircleCIのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/circleci

CircleCI 関連のカレンダーです。ちなみに、**参加した方には CircleCI T シャツをプレゼントする**らしいので、ネタがある人はチャンスです[^me]。（2021/12/24 午前 10 時時点であと 2 枠空いてます）

僕のおすすめ記事は「[2021年のChangelogから振り返るCircleCI - その1 - Qiita](https://qiita.com/mfunaki/items/b163708c9ac22d7456aa)」、「[2021年のChangelogから振り返るCircleCI - その2 - Qiita](https://qiita.com/mfunaki/items/3def8eda2c4341fc7923)」、「[2021年のChangelogから振り返るCircleCI - その3(最終回) - Qiita](https://qiita.com/mfunaki/items/cf7715113499e60c7127)」です。こういう新機能・変更まとめありがたいです。

また、CircleCI の中の人の [@mfunaki](https://twitter.com/mfunaki) さんが他の Advent Calendar に上がっている CircleCI 関連の記事をまとめています。CircleCI ﾁｮｯﾄﾃﾞｷﾙ を目指してる人はこっちもチェックだ！

https://discuss.circleci.com/t/advent-calendar-2021-circleci/42147

[^me]: 僕も余力があれば何か書きたかったのですが、今月色々書きすぎて疲れているので厳しそうです😇

## GitHub Actionsのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/github-actions

GitHub Actions 関連のカレンダーです。ちなみに僕は今年「[GitHub Actionsの歴史](https://korosuke613.hatenablog.com/entry/history-of-github-actions)」について書きました。更新しなきゃ..

特に面白かった記事は「[Github Actionsのself-hosted runnerをCloud Build, Cloud Run上で動かす（POC段階)](https://zenn.dev/kesin11/articles/dcd39738324976)」です。低コスト運用のセルフホストランナー環境についての POC をまとめたもので、どういう要求があったかや各利用サービスのメリットデメリットなどをまとめています。セルフホストランナー環境を作る上で参考になりそうです。

## CI/CDのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/cicd

CI/CD に関わるものならなんでもなカレンダーです。Jenkins などに加えて、CircleCI、GitHub Actions ネタもあるので CI/CD の知見を集めたい人はこっちも要チェックです。

## terraformのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/terraform

Terraform 関連のカレンダーです。Terraform 使いも Terraform 使いたい民も Terraform パワーを上げていきましょう。

個人的に一番気になったのは「[Terraform を自動実行したいなら Atlantis - Qiita](https://qiita.com/chroju/items/f77e8391d6ef7c7cb59a)」でした。これは便利そう（自前で運用しなきゃだけど）。

## Datadogのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/datadog

Datadog 関連のカレンダーです。監視力を高めていきましょう。

個人的に一番気になったのは「[Datadog Dash 2021で発表された新機能について（その１） - Qiita](https://qiita.com/ykmori/items/4c071d5371cf021e67c2)」、「[Datadog Dash 2021で発表された新機能について（その２） - Qiita](https://qiita.com/ykmori/items/2fece3761202a3d1a50c)」です。上にも書きましたがこういう新機能・変更まとめありがたいです。

## kintoneのカレンダー | Advent Calendar 2021 - Qiita
https://qiita.com/advent-calendar/2021/kintone

:::message
宣伝に近いです。
:::

サイボウズの業務改善クラウドサービス kintone 関連のカレンダーです。kintone は REST API や Webhook を提供しているので、プログラマブルに kintone アプリを操作できます。kintone で何かを自動化したい方や kintone 気になるという方は読んでみてください。

個人的に面白かったのは「[kintoneの非公開APIの調べ方 - Qiita](https://qiita.com/RyBB/items/caae63c0bb4a1bcda362)」です。ご利用は自己責任で...

## Cybozu Advent Calendar 2021 - Adventar
https://adventar.org/calendars/6823

:::message
宣伝に近いです。
:::

サイボウズのアドベントカレンダーです。なんと 8 年ぶりの試みらしいです。サイボウズ社員が色々書いてます。サイボウズに関係あるネタも関係ないネタもあるので、サイボウズに興味ある人もない人も覗きに来てください！

僕が好きな記事は「[おうちKubernetes feat. cybozu-go/neco-apps - ぽよメモ](https://poyo.hatenablog.jp/entry/2021/12/07/083000)」です。おうち Kubernetes ガチ運用したい。

# あとがき
今年最後の記事でした。今年も一年あっという間でしたね。次の Weekly は 2022/01/05 号になると思います（たぶん）。

**ハッピークリスマス🎄！良いお年を🎍！来年もよろしくお願いします🙇**

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### 平成元年発売のテトリスの世界大会が今大変なことになっている｜slappin' Notes｜note
https://note.com/radio613/n/n03ad52985274

北米版ファミコンテトリス（通称 NES テトリス）の世界大会が大変なことになっているという記事です。

NES テトリスの世界大会がどういう変遷を辿っていったかが事細かに説明されています。ちゃんと NES テトリスの特徴から説明してくれているので、知識無しでもこの記事を楽しむことができます。（強いていうならテトリスのルールくらいは知っておいた方が良いです。）

コントローラーの使い方を各自研究して色々な持ち方が生まれているのは面白いですね。Rolling なんてどうやってそこに至ったんだって感じ。こういう限界を超えていく様子を見るのは楽しいです。

RTA in Japan Winter 2021 で世界大会参加プレイヤーが NES テトリスの実演をやるそうなので、気になる人は見てみましょう。