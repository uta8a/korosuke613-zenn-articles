---
title: "Productivity Weekly (2021-04-21号)"
emoji: "🎢"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 23 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## GitHub CLI 1.9 enables you to work with GitHub Actions from your terminal - GitHub Changelog
https://github.blog/changelog/2021-04-15-github-cli-1-9-enables-you-to-work-with-github-actions-from-your-terminal/

GitHub のコマンドラインツールである GitHub CLI のバージョン 1.9 がリリースされました。1.9 では GitHub Actions 周りの機能が新たに追加されています。

今回の変更で、ワークフローの一覧、および詳細の表示、実行ログの表示、アーティファクトのダウンロード、ジョブの re-run、ジョブの監視、`workflow_dispatch`の実行、ワークフローの有効無効切り替えがコマンドラインからできるようになります。

GitHub Actions の操作、閲覧ができるようになってますますブラウザを開かずに開発ができるようになってきました。すばらしいですね。

## GitHub Actions: Limit workflow run or job concurrency - GitHub Changelog
https://github.blog/changelog/2021-04-19-github-actions-limit-workflow-run-or-job-concurrency/

GitHub Actions にワークフローやジョブの同時実行を制限するための機能が追加されました。`concurrency`キーには任意の文字列を指定できます。例えば `concurrency` キーを持つジョブが実行されるとき、すでに同じ `concurrency` キーを持つジョブが実行されている場合、実行にロックがかかりジョブは保留されます。

デプロイや他の環境を使う CI などの同時に実行されたくない処理をコントロールするためには、運用でカバーしたり `repository_dispatch` を使って頑張るしかなかったと思いますが、これからは楽に間違いなくコントロールできるので良いですね。

## Bash Uploader Security Update - Codecov
https://about.codecov.io/security-update/

テストカバレッジの可視化サービスである Codecov の Bash Uploader スクリプトが改ざんされ、第三者から脆弱性を仕込まれていたことが判明しました。

2021/01/31 以降に Bash Uploader スクリプトを使っていた場合、コード流出、CI ランナーに渡していたシークレット流出などのリスクがあるため、シークレットのローテーションを行うことが強く推奨されます。

また、Codecov の GitHub アクション、CircleCI Orb、Bitrise Step も Bash Uploader スクリプトを利用しているので、これらの利用者も影響範囲となります。

今回は CodeCov で問題が起こったこととなりますが、似たような方式を取るサービスは他にもあります[^bash]。CodeCov は使ってないという方も、関係ないやと思わずに、一旦リポジトリを見直してもいいかもしれません。

こういう外部のスクリプトなどを利用する場合ってどういう風に対策していくべきなんでしょうかね？例えばスクリプトをその都度ダウンロードして使うのではなく、内容を精査した上で自身が管理するリポジトリに配置してそれを使うとか、ダウンロードするたびにハッシュ値をチェックして変更されてた場合はとりあえず CI を落として内容を精査するとか、そういった対策をしていく必要があるかもしれませんね。

[^bash]: [golangci-lint](https://golangci-lint.run/usage/install/#ci-installation)など

## GitHub Actions: Control permissions for GITHUB_TOKEN - GitHub Changelog
https://github.blog/changelog/2021-04-20-github-actions-control-permissions-for-github_token/

GitHub Actions において `GITHUB_TOKEN` の権限を制御する機能が追加されました。

`GITHUB_TOKEN`はワークフロー内のみで利用できる GitHub を操作するためのトークンであり、ワークフローが実行されるたびに新しく発行されます。これまでは権限を制御できなかったため、複数の機能に対して Write 権限がありました[^write]。今後はワークフローの yaml ファイルで詳細な権限を設定できるようになります。

また、yaml ファイルで設定しない場合はデフォルトで Write 権限が付きますが、Organization ごともしくはリポジトリごとにデフォルトの権限を設定できるようになりました。こちらは全てのスコープに対して Read/Write 権限を与えるか Read 権限のみを与えるかを選択できます。

先ほど紹介した Bash Uploader Security Update のようなサプライチェーン攻撃の被害を最小限に食い止めるためにも権限を細かく絞ることができるのは良いですね。（個人的にはデフォルト設定でもう少し詳細に設定できるようにしてほしいところではあります。）

[^write]: Dependabotからのプルリクエストとパブリックフォークからのプルリクエストによるワークフローの実行はRead権限のみに制限される。

# know-how
## Chromeの安定最新バージョンに合わせてChrome Driverの最新バージョンを取得する方法
https://dev.classmethod.jp/articles/getting-chrome-driver-version-fitted-chrome-latest-stable-version/

Chrome の安定最新バージョンと ChromeDriver の最新バージョンがズレるために、自動テストが失敗してしまうことがあります。この記事では、対策として Chrome のメジャーバージョンを指定して ChromeDriver を取得する方法が紹介されています。

Chrome の安定最新バージョンを取得するために [`omahaproxy.appspot.com`](https://omahaproxy.appspot.com/) というサイトの API を叩いていますが、Chromium チームによってメンテナンスされている現在のリリースとリリース履歴を追跡するためのサイトらしいです。知りませんでした。

# 小ネタ
- [Announcing HashiCorp Terraform 0.15 General Availability](https://www.hashicorp.com/blog/announcing-hashicorp-terraform-0-15-general-availability)
  - Terraform 0.15 が General Availability になりました。0.15 は 1.0 へのプレリリースという位置づけであり、 Terraform を長期的に利用できるように安定性を確保するための変更が多く含まれているようです。僕はもう 1.0 になることはなくひたすら `0.16, 0.17, ...` という風にマイナーバージョンだけ上がっていくのかなと思っていたので少し驚きました。
- [Upgrade your GitHub app in your Slack workspace - GitHub Changelog](https://github.blog/changelog/2021-04-16-upgrade-your-github-app-in-your-slack-workspace/)
  - GitHub の Slack ワークスペースアプリが新しくなりました。2021/08/24 以降は従来の GitHub アプリは利用不可能になるので、それまでに更新する必要があります。
- [API 中心設計の次世代 CMS「Kuroco｜クロコ」が国内初*の Github と連動する CDN 完備のホスティングサービスを追加！独自ドメイン・TLS 証明書・CDN・Github 連動・アクセス制限が 0 円〜｜株式会社ディバータのプレスリリース](https://prtimes.jp/main/html/rd/p/000000011.000031546.html)
  - 最近 Cloudflare Pages という静的サイトホスティングサービスが一般提供されたばかりですが、新たな静的サイトホスティングサービス Kuroco が誕生しました。静的サイトホスティングサービスとしては珍しく IP アドレス制限機能が無料で利用できます。ますます選択肢が広がって良いですね。

# あとがき
今週はほぼ GitHub のネタでしたね。最近こういった変更の内容を実際に触ってみるなどの探求があまりできていないので、しっかりと触っていきたいところです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### amate/UmaUmaCruise: このソフトは、自動でDMM版ウマ娘のウィンドウから、イベント選択肢の効果を知るために作られました
https://github.com/amate/UmaUmaCruise

最近[ウマ娘](https://umamusume.jp/)にハマっており毎日やってます。[パワポケ](https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%AF%E3%83%97%E3%83%AD%E3%82%AF%E3%83%B3%E3%83%9D%E3%82%B1%E3%83%83%E3%83%88%E3%82%B7%E3%83%AA%E3%83%BC%E3%82%BA)をやってるみたいで楽しいです。最近ようやく A ランクウマ娘を育成できるようになりました。

このゲームではウマ娘を育成するモードがあります。さまざまな選択肢が出てきて、選択次第でパラメータが上昇したり新たなスキルが得られたりします。自分がどういったウマ娘に育成したいかで選ぶべき選択肢が変わってくるのですが、これらを毎回調べるのはちょっと大変です。そのため、画像解析パワーを使って現在表示されている選択肢を選ぶと何が起きるのかを教えてくれるツールを作った方が現れました。さらに直近の開催レース情報も出してくれるようです。

規約的にこういうツールを使ってもいいのか僕は調べていません。README.md にも書かれていますが自己責任で使用しましょう。ツールにゲームの操作をさせるわけではないので検知されることはないと思いますが、怖いなら使わないのが吉です。僕は使いたいと思ったのですが、Windows のみ対応[^mac]なため、Mac を使っている僕には使えません...残念[^win]。これを機にデスクトップの Windows PC を買ってもいいなと思いました。

[^mac]: そもそもDMM版ウマ娘がWindowsにしか対応してない。
[^win]: 古いWindowsはあるのですが、押し入れから引っ張り出す必要があります。