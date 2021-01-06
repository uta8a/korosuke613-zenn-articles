---
title: "Productivity Weekly(2021-01-06号)"
emoji: "🎍"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["productivityweekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第8回目です。

# news
## [アップデート] AWS Compute Optimizer で Lambda 関数の最適なメモリサイズがレコメンド可能になりました！
https://dev.classmethod.jp/articles/aws-compute-optimizer-delivers-recommendations-aws-lambda-functions/

AWS Compute Optimizer が Lambda の最適なメモリサイズを推奨してくれるようになった。
記事ではメモリサイズを上げる方が処理時間、コストが下がる（可能性がある）例が紹介されている。


## 『Webブラウザセキュリティ ― Webアプリケーションの安全性を支える仕組みを整理する』の発売を開始しました
https://www.lambdanote.com/blogs/news/web-web

> ・リソース間に境界を設定し、アプリケーションに制限を課す機構（Origin、SOP、CORS、CSPなど）
> ・Webブラウザの動作をOSのプロセスレベルで考察することで役割が理解できる機構（CORB、CORP、Fetch Metadataなど）
> ・通信路や受け取ったデータの状態に関するもの（HSTS、SRIなど）
> ・現在のWebアプリケーションにとって不可欠なCookieに関するセキュリティ機構
> https://www.lambdanote.com/collections/wbs

このあたり詳しくなりたい人によさそう。

## IntelliJ IDEA のコード補完の順番並び替えに機械学習を使えるようになった。
https://twitter.com/intellijidea/status/1344961599338004480
設定変更することで機械学習による順番の上下を確認できる。

https://twitter.com/IntelliJSupport/status/1345618540162936837
外部にデータ送信されてるわけではなさそう。

# know-how
## 【2021年版】GitHub × Go製ツールのリリースフロー
https://zenn.dev/kyoh86/articles/5e7fe8c16a39aa3d3796

Go のパッケージを GitHub Actions の workflow_dispatch でタグを打ってリリースする例。

## TabFS is a browser extension that mounts your browser tabs as a filesystem on your computer.
https://omar.website/tabfs/

ブラウザのタブをファイルシステムとしてマウントするブラウザ拡張機能。魔改造感ある

## 1Password に保存しているクレデンシャルを環境変数として利用するためのツールを作った
https://blog.ssrf.in/post/set-the-credetnial-in-1password-as-an-environment/

クレデンシャルの管理が楽になりそう。

## GitHubのサービスを駆使してウェブサイトの死活監視が無料で行える「Upptime」
https://gigazine.net/news/20210104-upptime/

複数サイトの死活監視を簡単に行えるテンプレートリポジトリ。useして監視したいサイトを設定すればすぐに使える。

# あとがき
今年最後の Productivity Weekly でした。次回は年明けになります。

また、今回初めて Zenn を使ってみました。note と比べると圧倒的に書きやすいです。今回はブラウザでの投稿でしたが、次回からは VS Code を使って投稿してみようと思います。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000