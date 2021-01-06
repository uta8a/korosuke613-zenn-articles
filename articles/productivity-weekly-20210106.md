---
title: "Productivity Weekly (2021-01-06号)"
emoji: "🎍"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上", "AWS", "IntelliJ", "GitHubActions"]
published: true
---

あけましておめでとうございます。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第8回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## AWS Compute Optimizer で Lambda 関数の最適なメモリサイズがレコメンド可能になりました！
https://dev.classmethod.jp/articles/aws-compute-optimizer-delivers-recommendations-aws-lambda-functions/

AWS Compute Optimizer が Lambda の最適なメモリサイズを推奨してくれるようになりました。
クラメソさんの記事ではメモリサイズを上げる方が処理時間、コストが下がる（可能性がある）例が紹介されています。

AWS Compute Optimizer が有効でない場合、オプトインする必要があります。
有効にしてもすぐにはレコメンドされないようなので気長に待ちましょう。

## 『Webブラウザセキュリティ ― Webアプリケーションの安全性を支える仕組みを整理する』の発売を開始しました
https://www.lambdanote.com/blogs/news/web-web

Webブラウザ視点で学べるセキュリティの本が発売されました。
各セキュリティ機構の解説だけでなく、機構が導入された経緯などの背景も説明しているようです。

> ・リソース間に境界を設定し、アプリケーションに制限を課す機構（Origin、SOP、CORS、CSPなど）
> ・Webブラウザの動作をOSのプロセスレベルで考察することで役割が理解できる機構（CORB、CORP、Fetch Metadataなど）
> ・通信路や受け取ったデータの状態に関するもの（HSTS、SRIなど）
> ・現在のWebアプリケーションにとって不可欠なCookieに関するセキュリティ機構
> https://www.lambdanote.com/collections/wbs

このあたりに詳しくなりたい人におすすめできそう。
正直こういったブラウザの仕組みについて、なんとなくでしかわかってない、そもそも知らない部分があるので、個人的に読んでみたいと思います。

## IntelliJ IDEA のコード補完の順番並び替えに機械学習を使えるようになった。
https://twitter.com/intellijidea/status/1344961599338004480
IntelliJ IDEA のコード補完の順番並び替えに機械学習を使えるようになりました。
設定から有効にするかどうかを言語単位で選択できます。
また、`Mark position changes in completion popup`にチェックを入れることで機械学習による順番の上下を確認できるようです。

自分の環境では既に有効になっていた（なぜか Java と Python のみ）ため、2020.3にバージョンを上げると自動で有効になるのかもしれません。
順番の上下を視認する設定と、TypeScript での利用を有効にしてから4, 5時間経つのですがまだ特に変化は無いので、気長に待ってみようと思います。

https://twitter.com/IntelliJSupport/status/1345618540162936837
また、公式 Twitter によると外部にデータ送信はしていないそうです。

# know-how
## 【2021年版】GitHub × Go製ツールのリリースフロー
https://zenn.dev/kyoh86/articles/5e7fe8c16a39aa3d3796

Go のパッケージを GitHub Actions の workflow_dispatch でタグを打ってリリースする例です。

従来のよくあるリリースフローだとリリースまでに同じテストを2回行う必要があったり、テストの終了を待ってからリリースする必要があったりと細かい問題がありました。（詳しくは記事を読んでください）
この記事では、GitHub Actions の workflow_dispatch や GitHub Statuses API をうまく活用し、それらの問題を排除しており勉強になります。Go に限らずなんらかのツールをリリースしている人におすすめできる記事です。

# tool

## 1Password に保存しているクレデンシャルを環境変数として利用するためのツールを作った
https://blog.ssrf.in/post/set-the-credetnial-in-1password-as-an-environment/

1Password に保存されているクレデンシャルを環境変数としてターミナル等から利用できるツールを作成した方の記事です。
CLI ツールなどに使うクレデンシャルを 1Password で管理している方はクレデンシャルの利用が楽になりそうです。

## TabFS is a browser extension that mounts your browser tabs as a filesystem on your computer.
https://omar.website/tabfs/

ブラウザのタブをファイルシステムとしてマウントするブラウザ拡張機能です。悪意のあるコードを孕んだサイトなどを開いたりするとまずいことになりそうと言う話で盛り上がりました。

> disclaimer: this extension is an experiment. I think it's cool and useful and provocative, and I usually leave it on, but I make no promises about functionality or, especially, security. applications may freeze, your browser may freeze, there may be ways for Web pages to use the extension to escape and hurt your computer ... 

配布ページの免責事項にもあるように、最悪の事態も想定できるので、利用したい方はあらゆるケースを考えた上で自己責任で利用しましょう。（コードは面白そうですが、利用はおすすめしません）


## Uptime monitor and status page powered by GitHub Actions, Issues, and Pages
https://github.com/upptime/upptime

ウェブサイトの死活監視を簡単に行えるテンプレートリポジトリです。useして監視したいサイトを設定すればすぐに使えます。
README.md を更新してステータスを表示したり Slack に通知したりもできるようです。

自前でスクリプトを用意したりマシンを用意せずとも死活監視が可能になるのですが、GitHub の利用規約的に怪しいのではないかと会では盛り上がりました。

> for example, don't use Actions as a content delivery network or as part of a serverless application,
> but a low benefit Action could be ok if it’s also low burden.
https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-additional-product-terms#5-actions-and-packages

調べたところ、サーバーレスアプリケーションとしては利用してはいけないが、負荷が少なければ OK とありました。
判断が難しいところですね。

# あとがき
今年最初の Productivity Weekly でした。
年が明けてすぐだったので、サービスの更新などに関するニュースは少なかったですね。（Lambda 関数の最適なメモリサイズをレコメンドしてくれるニュースは年末のものでした。）

まだまだ第8回ですが、今年はとにかく継続して Productivity Weekly のまとめを投稿していくことが目標です。
今年もよろしくお願いします。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000