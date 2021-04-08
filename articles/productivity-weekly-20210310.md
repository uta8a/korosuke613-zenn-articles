---
title: "Productivity Weekly (2021-03-10号)"
emoji: "🌸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 17 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message warning
今回はネタ少なめです...ご了承ください🙇
:::

# news
## Authentication token format updates - GitHub Changelog
https://github.blog/changelog/2021-03-04-authentication-token-format-updates/

GitHub が発行する認証用トークンのフォーマットが変わり、トークンの種別がすぐわかるようになります。いつ変更がされるかは曖昧で、今後 2 週間以内に変更するようです[^2week]。

具体的には、トークン種別によってプレフィックスが付くようになるとのことです。例えばパーソナルアクセストークンなら `gp1_` がトークンの先頭に付きます。現時点でトークンの長さは変更しないとのことですが、将来的には長くなる可能性があるようです[^token]。

なんのトークンなのかよくわからなくなることが減りそうで良いですね。

[^2week]: 今日試したところ、まだ変更されてませんでした。
[^token]: トークンの文字列長に依存した実装は先に修正しておきましょう。

## Secret scanning: Notifications for commit authors on private repositories - GitHub Changelog
https://github.blog/changelog/2021-03-05-secret-scanning-notifications-for-commit-authors-on-private-repositories/

GitHub の Private リポジトリにおいて、 secret scanning による通知がコミット作成者にも飛ぶようになりました。

Secret scanning 機能とは、外部サービス[^gaibu]で利用するためのシークレットがソースコードにそのまま埋め込まれている場合に GitHub がアラートを出してくれる機能です。シークレットが公開されていることを早期に発見できるので、シークレットが不正使用される可能性を減らすことができます。[去年の5月ごろ](https://github.blog/changelog/2020-05-06-github-advanced-security-secret-scanning-for-private-repositories-now-available-in-limited-public-beta/)から Private リポジトリでも利用できるようになりました。（ただし AdvancedSecurity ライセンスを持った組織のみ利用可能です。）

これまでは、secret scanning でシークレットが見つかった場合、リポジトリ管理者と Organization 管理者に通知が飛ぶようになっていました。これからは、Private リポジトリでシークレットが見つかった場合に、その変更を加えたコミット作成者にも通知が飛ぶようになるため、これまで以上に素早く修正できるようになると思います。

[^gaibu]: 外部サービス一覧は[ドキュメント](https://docs.github.com/en/github/administering-a-repository/about-secret-scanning)を参照してください。

:::message warning
2021/04/08 内容に誤りがあったため修正しました。
:::

# know-how
## 軽量Dockerイメージに安易にAlpineを使うのはやめたほうがいいという話 - inductor's blog
https://blog.inductor.me/entry/alpine-not-recommended

軽量な Docker イメージを選ぶ際に Alpine Linux イメージは使わない方がよいという話と、代替となる軽量イメージについてをまとめた記事です。

Alpine Linux の代替となる軽量イメージとしては Debian Slim などの Slim 系イメージがありますが、記事中ではもう 1 つの選択肢として Distroless イメージを紹介しています。Distroless イメージは Google が提供しているアプリケーションの実行に特化したイメージ群[^distroless]で、マルチステージビルドと組み合わせて使うことがおすすめされています。

Distroless イメージは 2017 年ごろから提供されてたとのことですが、僕は今回初めて知りました。Docker イメージを作る際はこの記事の内容を思い出したいですね。

[^distroless]: パッケージマネージャやシェルなどが含まれていないため、目的のアプリケーションの実行に必要な最低限のものだけがイメージに含まれているようです。

## Pull Requestから社内全チームの開発パフォーマンス指標を可視化し、開発チーム改善に活かそう
https://developer.hatenastaff.com/entry/2021/03/04/093000

『Lean と DevOps の科学』を参考に、GitHub のプルリクエストから集計しやすかった「変更のリードタイム」の一部と「デプロイ頻度」を可視化したという記事です。

なぜこのパフォーマンス指標を選んだのかや、データ集計の手法などが説明されています。得られた情報がどうチーム改善に使えたかは説明されていませんでしたが、今後の展望では残りの指標も可視化して改善していくようなので、続報に期待です。

同じようにチーム改善のためにパフォーマンス指標を可視化したい場合に参考にできると思います。


# あとがき
今週は共有された生産性の上がりそうなネタが少なかったです...ちなみに自分は今週とうとうシンエヴァ[^eva]が放映されて忙しかったのであまり情報収集できなかったのがあります。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

[^eva]: 観てない人は急いで早く観てください

## omake
今週のおまけです。

### History of IE incompatible sites list provided by Microsoft to redirect from IE11 to Chromium Edge
https://github.com/teppeis/history-of-ie-incompatible-sites-list

[Microsoft Edge 87 から Internet Explorer で互換性の無いサイトにアクセスすると、自動でリダイレクトされるようになりました](https://forest.watch.impress.co.jp/docs/news/1285293.html)。この「互換性のないサイト」は Microsoft が xml で管理しており、[Microsoft に申請](https://docs.microsoft.com/ja-jp/microsoft-edge/web-platform/ie-to-microsoft-edge-redirection#ie-%E4%BA%92%E6%8F%9B%E6%80%A7%E3%81%AE%E4%B8%80%E8%A6%A7%E3%81%AE%E6%9B%B4%E6%96%B0%E3%82%92%E8%A6%81%E6%B1%82%E3%81%99%E3%82%8B)することでそのリストに自身の Web サイトを加えることができます。

上記のリポジトリでは、その IE との互換性がないサイトのリストの変化を記録しています。変更があったサイトのいくつかをコミットのコメントに書いているようです。これを見るとどんなサイトがリストに載ったか一目瞭然です。

[![](https://storage.googleapis.com/zenn-user-upload/gztuvibg49avz7f1rqg4u2xyaqm6)](https://github.com/teppeis/history-of-ie-incompatible-sites-list/commit/6e79ad7f5834e9ee344e98c1f4d2988b9a547594#commitcomment-47847223)

どうやら、GitHub Actions を使って定期的に互換性がないリスト(xml)に変更があるかどうかを確認し、変更があればコミットするようにしているようです(コメントは手動でしてるっぽい)。

これを見ればどういうサイトが追加されているのかわかって個人的に面白いです。手動で確認してコメントするの大変そうなのでそこも Actions でやればいいんじゃないかともちょっと思いました[^pull]。

[^pull]: 多分そんな大変じゃないからプルリク送ってみようかな

### 盆栽
https://gitlab.com/jallbrit/cbonsai

ターミナルで盆栽を描画するための CLI ツールです[^gitlab]。完成された盆栽を見るための `static` モードと、成長していく盆栽を見るための `live` モードがあります。

C 言語で、ncurses というライブラリを使って記述されています。ncurses は文字をターミナル上に自由に配置できるライブラリです。テキストユーザインタフェースを作るときに利用できます。

僕も大学一年生の頃、プログラミング演習 1 という講義の課題で ncurses を使ったゲームを作らされました。ターミナルで動くテトリス作りました。懐かしいですね。

そんな僕が作ったテトリスのリポジトリはこちらです。CTeto なんていう名前ですが C++です。もともと C 言語で書いたのですが、あるとき思い立って C++で書き直しました。よければ遊んでください。
https://github.com/korosuke613/CTeto

[^gitlab]: ~~GitLab のリポジトリめちゃくちゃ久しぶりに見ました~~