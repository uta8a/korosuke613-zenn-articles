---
title: "Productivity Weekly (2021-01-27号)"
emoji: "🐙"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上", "GitHub", "IntelliJIDEA", "Terraform"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 11 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## Access control for GitHub Pages - GitHub Changelog
https://github.blog/changelog/2021-01-21-access-control-for-github-pages/
GitHub Enterprise Cloud において GitHub Pages にアクセス権限を設定できるようになりました。

可視性を Private にするとリポジトリにアクセスできるユーザにのみ閲覧権限が付与されます。
例えば、Private リポジトリの場合はリポジトリのメンバのみが Pages を閲覧でき、Internal リポジトリの場合はリポジトリのメンバだけでなく、Enterprise に所属するメンバも Pages を閲覧できるということになります。
また、組織管理者は Pages の可視性を Private に強制することもできるようです。

これで、インターネット上での組織に閉じた静的サイトの公開が楽になります。
しかし @teppeis さんが下のツイートで書いている通り、全社員に GitHub Enterprise アカウントを配布する必要があるので、全社員にアカウントを配布していない組織の場合は開発系メンバに情報が閉じてしまうという問題もあります。
https://twitter.com/teppeis/status/1352435459910062081?s=20

## npm displays links to DefinitelyTyped packages - GitHub Changelog
https://github.blog/changelog/2021-01-25-npm-displays-links-to-definitelytyped-packages/
npm パッケージの型定義が型定義パッケージ (DefinitelyTyped package)として存在するかどうかが npm registory で確認できるようになりました。
先月、[型定義がパッケージに含まれているかどうかがわかるようになりました](https://github.blog/changelog/2020-12-16-npm-displays-packages-with-bundled-typescript-declarations/)が、これで、`@types/hogehoge`でインストールするタイプの型定義の存在も簡単に確認できるようになりました。

これまでは使いたいパッケージの型定義が外部パッケージとして存在するかどうかの確認が面倒だったので、これで楽になります。

## GitHub Actions: Short SHA deprecation - GitHub Changelog
https://github.blog/changelog/2021-01-21-github-actions-short-sha-deprecation/
GitHub Actions の Action を SHA で参照するときに、短い SHA(e.g. `actions/checkout@5a4ac90`) は 2 月中旬から使えなくなるとの告知が出されました。
長い SHA(e.g. `actions/checkout@5a4ac9002d0be2fb38bd78e4b4dbde5606d7042f`) はこれまで通り使えます。
破壊的変更なので、Action を SHA で参照しているリポジトリを持っている方は注意が必要です。

## Dependency review beta - GitHub Changelog
https://github.blog/changelog/2021-01-25-dependency-review-beta/
プルリクエストの File changed において、依存関係の変更が人間にわかりやすくなりました。(注：まだ Beta 版です。)
また、変更だけでなく、依存のリリース日や利用しているプロジェクト数、脆弱性情報も表示されるようです。

実際に確認してみました。依存がどう変化したかがとてもわかりやすくなったと思います。ただ、脆弱性情報が載っているものを見つけられませんでした。（オプションが必要だとか？まだ Beta 版でドキュメントも見つけられなかったからわからない）
[![](https://storage.googleapis.com/zenn-user-upload/tarosclgd7v8hoiwybqck9q7jrk0 =600x)](https://github.com/korosuke613/myHomepage/pull/77/files?short_path=51e4f55#diff-51e4f558fae534656963876761c95b83b6ef5da5103c4adef6768219ed76c2de)

これでプルリクエストのレビューがしやすくなると思います。

# know-how
## Improving how we deploy GitHub - The GitHub Blog
https://github.blog/2021-01-25-improving-how-we-deploy-github/
GitHub.com アプリケーションの開発者数が去年だけで2倍になったそうです[^1]。しかし、その結果従来のデプロイフローがパンクしてしまい、開発者体験や生産性の低下が引き起こされてしまったとのこと。
この記事では、デプロイ方法を改善することになった経緯や改善内容が紹介されています。

カナリアリリースを2段階に分けることで、リスクを抑えつつ多くのトラフィックに対して検証できたり、デプロイキューを用意して開発者の余計なことを考える時間を減らしたりといったアイデアがとても参考になりました。
さらに安全にさらに高速にデプロイしていきたいところですね。

[^1]: これだけで驚きです。

## The best of Changelog • 2020 Edition - The GitHub Blog
https://github.blog/2021-01-21-changelog-2020-edition/
GitHub の 2020 年の主な変更まとめです。
GitHub の更新をあまり知らない人は、眺めてみると多くの知らない生産性を上げる機能に出会えるかもしれません。
GitHub の更新を良く知る人でも、この機能今年からだったのかーと思い出して楽しめると思います。

個人的には [Convert pull requests to drafts](https://github.blog/2021-01-21-changelog-2020-edition/#convert-pull-requests-to-drafts)が去年だったっけ？という気持ちになりました。
GitHub 本体には 1 年間で 90,000 を超えるプルリクエストがマージされたそうです。数多くのアップデートができていてすごいと思いました。見習いたいですね。

## Examples of Golang compared to Node.js for learning
https://github.com/miguelmota/golang-for-nodejs-developers
Node.js と Go を比較して言語学習に利用できるリポジトリです。各項目に対して、Node.js で書いた場合のコードと Go で書いた場合のコードを並べています。
例えば、Node.js には詳しいが Go は詳しくない方が Go を勉強したい場合（またはその逆）に、それぞれのコードを比較することで Go の文法等を学習することができます。
似たような境遇の方は参考になると思います。

# tool
## IntelliJ IDEA で特定行の GitHub PR を開く"Find Pull Request" pluginがまじイノベーティブ
https://gfx.hatenablog.com/entry/2018/01/17/133457

IntelliJ IDEA のプラグインです。指定した行がどのプルリクエストでマージされたかが素早く確認でき、そのプルリクエストにジャンプできます。
大規模で歴史が長いリポジトリの場合、どういう意図で任意の行のコードが書かれたのか調べたくなる時があります。そういった時に素早くプルリクエストを見つけることができるのはとても楽になると思います。

## IaC化されていないリソースをdriftctlで検知する
https://zenn.dev/gosarami/articles/dd938001eac988e44d11

Terraform で管理されていない AWS リソースを見つけるツール、driftctl の紹介記事です。例えば、Terraform で管理されていないいわゆる野良リソースを撲滅したいとなった時に使えそうです。
定期実行し、野良リソースを発見したら通知する等をすることで、継続的に IaC 化を強制するといった使い方が可能だと思います。

tfstate と実際に存在するリソースを比較しているようです。もし、一つの AWS アカウントを複数の tfstate で管理している場合などは、tfstate の置き場を決めておく等の工夫が必要だと思います。
また、複数の tfstate を指定する機能は v0.3.0 から追加されるようです。
https://twitter.com/sjourdan/status/1354337972213207041?s=20

まだベータ版であり、AWSのみ対応ですが、今後他のパブリッククラウドに対応していくようなので今後に期待です。

# あとがき
今週もちょっと早く終わっちゃったんでおまけとして[【図解で詳しく説明】前年と違うよ！ 税制改正された令和2年分「源泉徴収票」の見方](https://internet.watch.impress.co.jp/docs/special/1302096.html)が共有されました。
税金関係の法律は気づいたら変わってるのでこういう解説を出してくれているのはありがたいですね。確定申告する人は大変です。

また、[先週紹介した Maximizing Developer Effectiveness](https://zenn.dev/korosuke613/articles/productivity-weekly-20210113#maximizing-developer-effectiveness)が更新され、[OrganizationalEffectiveness](https://martinfowler.com/articles/developer-effectiveness.html#OrganizationalEffectiveness) 以降の節が追加されてたので、続きが気になる方はこちらもご覧ください。（僕はまだ続きが読めてないです...）

今週は GitHub 関連の更新やブログ記事が多かったですね。GitHub がどんどん便利になっていくことで僕たちの生産性も上がっていって良いです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000