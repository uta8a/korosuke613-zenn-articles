---
title: "Productivity Weekly (2021-03-03号)"
emoji: "🌪️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 16 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## GKE Autopilot のご紹介: マネージド Kubernetes における革命 | Google Cloud Blog
https://cloud.google.com/blog/ja/products/containers-kubernetes/introducing-gke-autopilot

Google Cloud Platform(GCP)で GKE Autopilot を利用できるようになりました。GKE Autopilot はマネージド kubernetes サービスの Google Kubernetes Engine（GKE）の新たな運用モードです。

GKE Autopilot を使用する事で、クラスタ管理が Google のベストプラクティスに基づいて自動で行われるようになります。これにより、クラスタ管理コストを減らすことができると記事には書かれています。GKE Autopilot では使用した Pod に対する料金のみが発生するとのことなので、請求額を今以上に減らせる可能性があります。

## AWS 大阪リージョン - 2021年3月誕生! | AWS
https://aws.amazon.com/jp/local/osaka-region/

AWS の大阪リージョン（ap-northeast-3）が正式オープンされました。

これまではローカルリージョンという種類のリージョンで、利用には事前申し込みと審査が必要だったり、アベイラビリティーゾーン(AZ)が 1 つしかなかったりといった制約がありました。（参考：[AWSの「大阪ローカルリージョン」とは何か、日本法人が説明：「ローカル」リージョンと呼ぶ理由 - ＠IT](https://www.atmarkit.co.jp/ait/articles/1803/16/news052.html)）正式オープンされたことで事前申し込みが必要なくなりました。もちろん通常のリージョンと同じように、AZ も 3 つになりました。

しかし、利用可能サービスは東京リージョンに比べるとまだ少ないようなので、大阪リージョン利用する際は使えるサービスを確認した方が良さそうです。下に貼った東京リージョンとの比較記事がわかりやすくまとめてくれています。

https://zenn.dev/skksky_tech/articles/20210302_aws-osaka-region

まだまだ東京リージョンよりも優先して使う理由は少ないと思いますが、マルチリージョン構成を考える場合などに、選択肢に加えられそうです。

## GitHub InFocus · Virtual 2021· Starting Feb 23
https://infocus.github.com/

2/23 から GitHub が InFocus という、DX[^dx]、DevOps、Security に関するオンラインイベントを開催しているようです。（全く知りませんでした。）

[前々回くらいに取り上げた InnerSource](https://zenn.dev/korosuke613/articles/productivity-weekly-20210224#%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%82%BD%E3%83%BC%E3%82%B9%E3%81%AE%E3%83%99%E3%82%B9%E3%83%88%E3%83%97%E3%83%A9%E3%82%AF%E3%83%86%E3%82%A3%E3%82%B9%E3%82%92%E4%BC%81%E6%A5%AD%E5%86%85%E3%81%A7%E5%AE%9F%E8%B7%B5%2Fhow-to-implement-innersource---speaker-deck) に関するセッションもあるようです。すでに終了したセッションは録画を見れるようなので、気になる人は今からでも視聴できます。

[^dx]: Developer eXperience

## Microsoft、デスクトップ操作の自動化ツールをWindows 10ユーザーに追加費用なしで提供 - 窓の杜
https://forest.watch.impress.co.jp/docs/news/1309591.html

Microsoft が Power Automate Desktop という Windows10 向け自動化ツール(いわゆる RPA ツール)の一般提供を始めました。インストールすることで、Windows のさまざまな操作を GUI で自動化できます。

また、[Excel の数式をベースとしたプログラミング言語「Microsoft Power Fx」も発表されました](https://www.itmedia.co.jp/news/articles/2103/03/news080.html)。Power Automate で利用できるようなので、GUI で作った自動化処理をコードベースで管理できそうです。

Power Automate Desktop では、Windows だけでなく、Web ブラウザや AWS の操作も自動化できるようです。以下の記事が各項目のスクリーンショットを貼っているため、とても参考にできます。
https://zenn.dev/barusu/articles/b702ef21c713ba

E2E テストを人手で行う場合、テスト項目ごとにスクリーンショットをエクセルに貼るという話を聞いたことがありますが、そういった面倒な作業にも使えそうです。

# know-how
## セキュアにGoを書くための「ガードレール」を置こう - 安全なGoプロダクト開発に向けた持続可能なアプローチ - Flatt Security Blog
https://flattsecurity.hatenablog.com/entry/go_guardrail

Go のコードをセキュアに保ち続けるための仕組み、いわゆるガードレールの構成例を紹介した記事です。ガードレールの要件、それを満たすためのツール・手法が説明されています。

ただ Go のセキュリティチェックツールを導入するだけでなく、継続的にチェックを行うための CI 設定やカスタムルール定義の方法などが詳細に説明されているので、タイトル通りセキュアに Go を書くための「ガードレール」を置きたい場合は参考になりそうです。

## GitHub Actionsにおけるサプライチェーン攻撃を介したリポジトリ侵害 - RyotaK's Blog
https://blog.ryotak.me/post/github-actions-supplychain/

GitHub のユーザー名変更による Actions の脆弱性とその軽減策についてを解説した記事です。脆弱性の解説や調査方法などを詳しく解説されており、とてもわかりやすいです。

これまでもリポジトリ乗っ取りの危険性はあったので、その危険性を考慮できてなかった方は考えた方が良さそうです。この記事では軽減策も紹介されているため、参考にできると思います。とは言っても楽な軽減策は無さそうなので、GitHub 側に何かしら対応してほしいところですね。


## Command Line Interface Guidelines
https://clig.dev/

より良い CLI ツールを作るためのガイドラインです。ガイドラインだけでなく、優れた CLI 設計の哲学も載っています。ガイドラインの各項目では具体例(実際の CLI ツール)を用いながら説明しているためとても理解しやすいです。一個一個の項目がそこまで長い文章でないため、英語が苦手な方でも読みやすいと思います。

また、著者らへのインタビューを InfoQ が公開しています。
https://www.infoq.com/jp/news/2021/02/cli-guidelines-qa/

CLI ツールを開発する前に読んでおきたいガイドラインですね。

# tool

## Automating your Automated Tests with Cypress Studio | by Doug Hill | Feb, 2021 | JavaScript in Plain English
https://javascript.plainenglish.io/cypress-studio-automating-your-automated-tests-f0d2ff2fe6b1

E2E テスト自動化ツールの 1 つに [cypress](https://www.cypress.io/) があります。その cypress で、[Cypress Studio](https://docs.cypress.io/guides/core-concepts/cypress-studio.html) という機能が使えるようになりました[^studio]。Cypress Studio はキャプチャしたユーザの操作を自動でコード化する機能[^selenium]です。

この記事では、Cypress Studio の紹介と使ってみた感想が書かれています。

> All I needed to do was to write the assertion statement, and I was done.

この方の場合、コードを生成した後にアサート文を書くだけでテストコードが完成したようです。

E2E テストの自動化は要素をクリックするためのコードを書くのがしばしば面倒ですが、この機能を使うことでボタンの class や id を探してクリックするようなコードをひたすら書く必要がなくなりそうです。Cypress を採用している方にはワクワクする機能ですね。

[^selenium]: 似たものだと Selenium IDE の[Code Export 機能](https://www.selenium.dev/selenium-ide/docs/en/introduction/code-export)がありますね。
[^studio]: まだ実験的な機能（experimental feature）

## AdobeやApple、AWS、Azure、GitHub、Googleなど100を超えるクラウドサービスのステータスをMacのメニューバーからチェックできるアプリ「stts」を使ってみた。
https://applech2.com/archives/20210226-stts-for-mac-monitoring-the-status-of-cloud-services.html

なぜか GitHub に push できない、なぜか AWS にデプロイできないというようなことが起こったとき、それらのクラウドサービスでは障害が起こっているかもしれません。そうなった時にすぐクラウドサービス側の障害を疑うことができれば良いですが、気づかずに無駄に試行錯誤してしまうことがしばしばあると思います。

この記事で紹介されている stts は、主要なクラウドサービスの状態を Mac のメニューバーから確認できます。stts は監視を有効にしたサービスが落ちると通知を出してくれるます。また、監視しているサービスのどれかが落ちている状態だとメニューバー上のアイコンが変化します。メニューバーは作業中でも（基本的に）常に表示される存在なので、何か問題が起こった時にすぐに目に入るため、障害の可能性に気づけやすそうなのが良いですね。

あらゆるクラウドサービスが登録されていますが、GitHub の個別のサービス（例えば Actions）や AWS の個別のリージョンなど、細かいところの監視はできないといった惜しいなと思うところもあります。ただ、このアプリは [OSS](https://github.com/inket/stts
) なので、コントリビュートすれば監視設定が追加できます。（なお、[Statuspage](https://statuspage.io)に基づくサイトを追加したい場合はとても簡単に追加できるようです。）

# あとがき
今日はネタが多くて大変でした。自分が詳しくない領域のネタが来た時は理解するのが大変なため、どうしても時間がかかってしまいますね。ただその分勉強になっていて良いです。

そういえば、最近 Zenn の記事投稿フローを楽にする話を Zenn に書いたので気になる人は読んでみてください。
https://zenn.dev/korosuke613/articles/zenn-metadata-updater

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### MySQL を使った最高に頭の悪いポートフォリオを作った話 - それが僕には楽しかったんです。
https://rabbitfoot141.hatenablog.com/entry/2021/02/26/002459

MySQL が好きなエンジニアのポートフォリオサイトの紹介記事です。[実際のサイト](https://lrf141.dev/)に行けばわかるのですが、まず MySQL のコンソール？が現れます。この人のことを知りたければコマンドを叩かなければいけない...という MySQL 初心者お断りなポートフォリオでとても面白いです。

実装についての詳しい話は記事に載っています。フロント側でコマンドを叩くと、そのコマンドがバックエンドで動いている docker コンテナ内にある mysql コマンドに送られる、という仕組みになっているようです。こういうターミナルのようなデザインにした理由も記事で説明されており、なるほどな〜となりました。

こういう、その手があったか！みたいなポートフォリオ作ってみたいですね。
