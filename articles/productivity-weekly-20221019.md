---
title: "Productivity Weekly (2022-10-19号)"
emoji: "🎭"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221019"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 96 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## October 2022 Pricing Change FAQ
https://www.docker.com/pricing/october-2022-pricing-change-faq/

Docker Subscription の Team プランおよび Business プランが 2022/10/27 より値上げします。また、Team プランは 100 名までの人数制限が課されるようになります。

Pro、Team、Business プランは Docker Hub の有料機能を使いたい場合や [Docker Desktop の有料ライン](https://zenn.dev/korosuke613/articles/productivity-weekly-20210901#docker-is-updating-and-extending-our-product-subscriptions---docker-blog)を超えている場合に契約が必要になります。Pro プランは個人向けのプランとなっており、Team プランは複数人で契約する場合のプランとなっています。Business プランは SSO や監査関連の機能などの大規模な組織向けのプランとなっています。

そんな Team プランと Business プランですが、以下のように値上げされることになりました。

|プラン|これまで|10/27〜|
|---|---|---|
|Team|$7/user/month(年払)<br>$9/user/month(月払)|$9/user/month(年払)<br>$11/user/month(月払)|
|Business|$21/user/month(年払)|$24/user/month(年払)|

それぞれ月当たり $2、$3 の値上げとなります（Business プランは年払いのみです）。

また、Team プランはこれまで無制限の人数で契約できたため、Business ほどの機能がいらない組織が契約していましたが、10/27 からは 100 ユーザまでという制限が課されることになります。

既に 100 ユーザを超えている Team プランの組織は、2022/12/31 以降は契約更新時に Business サブスクリプションを契約する必要があります。しかし、2022/12/31 までは 30% 割引された Business サブスクリプションにアップグレードできます。

Docker Desktop 使いたいだけの場合は何か乗り換え先が欲しくなるお値段ですね。
僕のおすすめは [Rancher Desktop](https://rancherdesktop.io/)[^diskfull] ですが、実際全社員の Docker Desktop を Rancher Desktop に移行してもらうというのは Enterprise 企業にとって並大抵の努力ではできないでしょう。

[^diskfull]: ちなみに僕は Rancher Desktop に乗り換えたのですが、最近やばいバグを引いて 600GB くらいのログファイルが生成されてしまいました。Issue は立っていますがまだ open のままです。皆さんもお気をつけください。https://twitter.com/Shitimi_613/status/1585565665519599616

この件に関する日本語の詳しいまとめ＆今後どうするのがいいかは、以下の記事がとても良いです。ぜひ読んでみてください。

- [Docker Desktopの有料化が企業に与える影響と、企業における適切なDockerの利用方法 | by okash1n | Oct, 2022 | スタディスト Tech Blog](https://studist.tech/how-to-properly-use-docker-in-your-company-d5b3bf901e56)

::: message
ここから先は今回の件に対する僕の感想です。個人の意見であり、所属組織や団体とは関係ありません。
:::

今回の Docker 社の発表は 10/12 に公開されました。規約変更日まで 1 ヶ月も猶予がないというのは正直驚きます。

Team プランの対象の利用者は来年 Business プランへ移行する必要がありますが、予算策定などの関係でいきなり言われても困るというところは少なくないでしょう。
少し値上げするくらいならまだしも、一人当たり $7/month -> $24/month となるので、もし 100 ユーザ契約していた場合一気に年 $8,400 -> $28,800 となるわけですからね。[GitHub Enterprise Cloud](https://github.co.jp/pricing.html) が契約できるレベルです（$21/user/month）。

この発表のさらに驚くところはアナウンスが特にされてないところです。ホームページにページを増やしたくらいで、公式ツイッターや公式ブログでの言及は一切ありません（2022/10/22 時点）。
課金管理者のメールアドレスにメールで知らせると書かれていますが、受け取ってないという声も聞きました。
実際日本で話題になったのは約 1 週間後の 10/18 です[^itmedia]。

https://twitter.com/teppeis/status/1582198073664888834

↑おそらく日本でめちゃ知られる要因となったツイート。

[^itmedia]: 面白いことに、ITmedia や窓の杜もこのツイートの後に記事にしています。[「Docker」一部有料プラン値上げ、27日から　「Team」は100アカウントまでに制限 - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2210/18/news133.html)、[価格がなんと3.5倍に！「Docker」のTeamプランが値上げ＆ユーザー数制限追加 - やじうまの杜 - 窓の杜](https://forest.watch.impress.co.jp/docs/serial/yajiuma/1448535.html)

Business は支払い方法が Docker 社の営業を通さないといけない（シート数追加ごとにやりとりが必要）＆ 月額払いができないといった、運用コストが増える要素があり、正直なところ金額的にも運用的にもコストが上がるのはストレスフルです。

いきなり発表したり告知をこっそりしたりと正直なところ Docker 社に対する信頼が揺らいでいます。

ちなみに海外では 10/12 時点で議論が噴出していました。

- [F**k docker and these pricing changes. 3 weeks to respond? : docker](https://www.reddit.com/r/docker/comments/y2002i/fuck_docker_and_these_pricing_changes_3_weeks_to)

値上げ自体ではなく Docker のやり方に怒ってるコメントが多いです。
代替の話題も盛んで Rancher Desktop と Podman が挙げられています。

気になってる人はこちらも読んでみてください。

## Introducing fine-grained personal access tokens for GitHub | The GitHub Blog
https://github.blog/2022-10-18-introducing-fine-grained-personal-access-tokens-for-github/

GitHub において、新しいパーソナルアクセストークンがパブリックベータになりました。

これまでのパーソナルアクセストークンはユーザーがアクセスできるすべてのリポジトリにアクセスできてしまったり、repo スコープを設定するとかなりいろいろできてしまいました。
新しいパーソナルアクセストークンではより細かいスコープの設定や、アクセス可能なリポジトリの制限が可能になっています。
また、Organization 管理者は組織内のパーソナルアクセストークンの利用を許可するかとか、存在するパーソナルアクセストークンの一覧などの管理が可能になりました。

ただし、現時点では自分が所属する Organization のパーソナルアクセストークンしか作成できないため、Outside Collaborator として Bot ユーザが追加されている場合、その Bot ユーザで fine-grained PAT を利用することはできません。
また、トークンの有効期限は最長で 1 年までしか設定できません。

古いパーソナルアクセストークンはパーソナルアクセストークン（Classic）として残るとのことです（いつか廃止になる可能性はあるが、そこはまだ不明）。

Outside Collaborator でも使えるようにしたり有効期限を長くできたりは正直ほしいところであり、既存の PAT から手放しで移行するのは厳しそうです。
それでもこういう権限を絞れる PAT が出たのは嬉しいですね！まだまだ Public Beta なので、気になるところがあれば Feedback を送りましょう！

ちなみに上記の問題に関するフィードバックはいくつかコメントされているので、共感できる人は up vote しましょう。
- [Will there be a way to create tokens that don't expire for CI?](https://github.com/community/community/discussions/36441#discussioncomment-3908900)
- [Expiry means I can't set it and forget it, and that's the entire point of granular access tokens - namely, the risk is zero because the permissions are tightly scoped.](https://github.com/community/community/discussions/36441#discussioncomment-3908925)
- [I'm wondering, is there/will there be a way to create a fine-grained token for a repository one has collaborator permissions on?](https://github.com/community/community/discussions/36441#discussioncomment-3907684)

## Fleet パブリックプレビューの紹介 | The JetBrains Fleet Blog
https://blog.jetbrains.com/ja/fleet/2022/10/introducing-the-fleet-public-preview

[去年発表された、JetBrains の次世代 IDE こと JetBrains Fleet](https://zenn.dev/korosuke613/articles/productivity-weekly-20211201#fleet-%E3%81%B8%E3%82%88%E3%81%86%E3%81%93%E3%81%9D%EF%BC%81-%7C-jetbrains-news) がパブリックプレビューになりました。

元々プライベートプレビューだったのですが、段階的にフィードバックしてもらうことにあまり意味がないことに気づいたらしいです。

使ってみた感じだとこれまでの IntelliJ IDEA なんかとは全くの別物感があります。あとやっぱり軽量でした。
一番気になった違いはアンスコ区切りの変数をダブルクリックしてもアンスコで囲まれた部分しか選択してくれないところでした（[Issue: Double-click selection should not stop on the underscore in a string literal](https://youtrack.jetbrains.com/issue/FL-12326/Double-click-selection-should-not-stop-on-the-underscore-in-a-string-literal)）。
また、まだプラグイン機能は入っていないため正直できることは少ないです。
バックエンドをリモートで動作させる方法ももちろん試せます（僕は試していません）。

各言語をどれくらいサポートしているかは、いい感じのマトリックス図が用意されています。2022/10/31 時点だとデバッグ周りはどの言語もまだまだって感じですね。

- [Fleet Features Matrix : Public Preview](https://jb.gg/fleet-feature-matrix)

プレビュー段階であるため、まだまだ使えるレベルではありませんが、皆さんも触ってみて[フィードバック](https://youtrack.jetbrains.com/issues/FL)を送ってください。
とりあえずプラグイン機能が欲しいですね。

# know-how 🎓

## Node.js v19 の主な変更点 - 別にしんどくないブログ
https://shisama.hatenablog.com/entry/2022/10/19/010338

Node.js v19 がリリースされました🎉
shisama さんの恒例の Node.js 変更点記事も出てました。

この記事では Node.js v19 の主な変更点が 8 つ紹介されています。

個人的には、KeepAlive がデフォルトで true になり、パフォーマンスの向上が見込めるようになること、`--watch` フラグ（v18 からあるらしいけど）が気になる変更点でした。

また、v18 が最近 LTS になった（2022-10-25〜）ので v18 の変更点記事もおすすめです。

- [Node.js v18 の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2022/04/20/011103)

Node.js のバージョンアップを考えている人は参考にできると思います。[Node.js v16 は従来のものより EOL が早い](https://zenn.dev/korosuke613/articles/productivity-weekly-20220615#bringing-forward-the-end-of-life-date-for-node.js-16-%7C-node.js)ので、早めに Node.js v18 への移行を考えておきたいですね。

## GitHub Copilot investigation · Joseph Saveri Law Firm & Matthew Butterick
https://githubcopilotinvestigation.com/

:::message
この節は同じ生産性向上チームの [@miyajan](https://twitter.com/miyajan) さんがまとめてくれた文章をベースに書きました。
ありがとうございます 🙇
:::

GitHub Copilot がオープンソースの作者とエンドユーザーに対する法的義務に違反しているとして訴訟を起こす可能性について調査しているサイトが登場しました。ページの作者はプログラマーかつ弁護士である Matthew Butt­erick さんです。

記事では、GitHub Copilot とは何か、何が問題なのか、オープンソースコミュニティにとってどのような意味を持つのか、調査への協力募集についてが書かれています。

問題点の概要を簡単に紹介します。

まず、1 つ目の問題点は、Copilot のトレーニングデータについてです。
Copilot は、GitHub のパブリックリポジトリを学習データとしています。
OSS ライセンスは帰属の表示などなにかしらの義務を課すものが大半ですが、Copilot はそういった義務を果たしていません。
GitHub としては、この件についてはフェアユースの範疇と主張しています。
しかし、Copilot がフェアユースの範疇であるという法的根拠はなにもないです。

というものです。

2 つ目の問題は、Copilot を使用することによってユーザーに課されるライセンス義務についてです。
Copilot ユーザーは、Copilot が生み出すコードに対して責任を負うことになります。
Copilot がパブリックリポジトリのコードをそのまま出力することがある例は、すでに数多く示されています（[一例](https://twitter.com/StefanKarpinski/status/1410971061181681674)）。
これらのコードに対して Copilot ユーザーがライセンス義務を負うことになる可能性は高いです。
しかし、Copilot が出力するコードは元のコードのライセンス情報が削除されてしまっているため、ユーザーがどのような義務を果たせばいいのかわかりません。

というものです。

注意点として、筆者は AI によるコード支援ツールすべてを否定したいわけではないようです。
Copilot が OSS コミュニティから利益を得るだけでなにも貢献していないこと、Copilot を学習データとなる OSS にもっとフレンドリーな作りにできるはずなのにしていないことを問題視しています。

GitHub Copilot の現状の問題点がよくまとまっている良い記事だと思いました。ここら辺の疑問点は法的に決着をつけてくれた方が利用者も使いやすいので GitHub にはなんとかしてほしいですね。

# tool 🔨

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Actions:OpenID Connect support enhanced to enable secure cloud deployments at scale | GitHub Changelog](https://github.blog/changelog/2022-10-18-github-actionsopenid-connect-support-enhanced-to-enable-secure-cloud-deployments-at-scale/)
    - GitHub Actions の OIDC において subject claim がカスタマイズ可能になりました

# あとがき
投稿がえらい遅くなってしまいました。土曜日は日帰り弾丸静岡旅行に行ってて書けず、日曜日は土曜の疲れで書けなかったため、2022/10/31 投稿です。また、最近は給与評価が近づいていて、給与交渉に使う文章作りで時間を使っていました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
