---
title: "Productivity Weekly (2022-08-31号) 簡易版"
emoji: "🪦"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220831"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 89 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
最近多忙のためなかなか Weekly を書く時間が取れないので、今月は**いつもより分量少なめの簡易版**とします。
ご了承ください。
:::

# news 📺

## Heroku’s Next Chapter | Heroku
https://blog.heroku.com/next-chapter

- Heroku の free プランが廃止されます
  - 2022/11 末くらいから
  - free プランの廃止と free プランのリソースが停止されていくとのことです
- 対象は Heroku Dynos、Heroku Postgres、Heroku Data for Redis の無料プランです
  - ちなみにそれぞれの pricing は次の通りです
    - Heroku Dynos: $7/月
    - Heroku Postgres: $15/月
    - Heroku Data for Redis: $9/月
- 学生向けプログラムを別途用意するとのことなので、学生は今後も無料で触れるかもしれません
- Heroku は無料プランを使った詐欺や無料プランの不正利用を管理するために多大なリソースを割いているため、顧客への価値提供にリソースを集中するために今回無料プランを廃止するとのことです
  - さまざまなコンピューティングサービスが無料プランを用意していますが、マイニングなどの不正利用との戦いは避けられない気がします[^github]
- Heroku の無料枠はなかなかすごかったので色々な人が活用していたことと思います。みなさん有料プランを契約するかリプレイスなどを行いましょう
  - 僕もあるサービスを動かしているため影響を受けます
    - [宮大支援課お知らせBOT【非公式】](https://twitter.com/miya_330_bot/status/1563096726004985858)

[^github]: かの有名な GitHub も Actions の不正利用と戦ってる。[GitHub Actions update: Helping maintainers combat bad actors | The GitHub Blog](https://github.blog/2021-04-22-github-actions-update-helping-maintainers-combat-bad-actors/)

## Actions: Self-hosted runner auto-scaling support for Kubernetes · Issue #555 · github/roadmap
https://github.com/github/roadmap/issues/555

- GitHub がオートスケールするセルフホストランナー環境を k8s で構築するためのツール類を提供する予定のようです
- 一応ロードマップ的には 2022 年の 4Q 予定となっています
- GitHub の Self-hosted runner をオートスケールさせるための OSS がいくつか出ていますが[^awesome-runners]、やはり公式がサポートしてくれると嬉しいですね

[^awesome-runners]:  [jonico/awesome-runners](https://github.com/jonico/awesome-runners) に便利ツールがまとまっています

# know-how 🎓

## Cognitive Complexityを400以上減らすまでに何をしたか 〜 コード品質改善の具体的なプラクティス - Yahoo! JAPAN Tech Blog
https://techblog.yahoo.co.jp/entry/2022082430334618/

- Cognitive Complexity を計測してコード品質を改善し、デプロイ失敗率を減らした話です
- > Cognitive Complexityは人間視点での複雑性を評価する指標で、例えばネストが深くなるほど複雑と判断される特徴があります。 
  - Cyclomatic Complexity（サイクロマティック複雑度）と違って可読性に焦点を当てているのが面白いです（記事内の比較コードがわかりやすい）
- この記事では、背景、Cognitive Complexity を下げるためにやったこと、コード品質改善によって得られた効果、今後の課題などが書かれています
- 著者は開発ライブラリの使用状況を計測するためにユーザがどのメソッドを呼び出しているかやエラー内容を送信する用にしたという部分が個人的に興味度が高かったです
- コード品質改善によってデプロイ失敗率が
- Cognitive Complexity の存在を知らなかったので勉強になりました

## Terraform Module Designs - Speaker Deck
https://speakerdeck.com/tmknom/terraform-module-designs

- 実践 Terraform の作者の人による Terraform モジュールの設計のヒントを説明したスライドです
- ベストプラクティスというよりは考え方的な話が多いです
- Terraform モジュールは設計をしくじるのは当たり前だから上手にしくじるや、振る舞いの予測可能性を高めるや入力パラメータをいたずらに増やさない、module の example を書くなど、モジュール設計で大事した方が良さそうと思える考え方がいろいろ載っています
- Terraform モジュールを作る前に一読しておきたい内容でした

## System Design
https://www.karanpratapsingh.com/courses/system-design

- 様々なジャンルのシステム設計に関連する技術・手法の概観を解説してるドキュメントです
- インターネットプロトコル、DB のシャーディング、API ゲートウェイや SLA など粒度は様々です
  - ちなみに 5 章では Twitter や Netflix など実際のシステムをどう設計するかの話があります
- ひとつひとつは深くないですが、網羅的に解説してくれているので勉強になります
  - 英語も割と簡単で読みやすい
  - ちなみに面接に備えるためのもの資料だそうです
    > Learn how to design systems at scale and prepare for system design interviews

## メルカリWebのマイクロサービス化、その4年 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20220830-15d4e8480e/

- メルカリの Web 版をマイクロサービス化していった 4 年間をまとめた記事です
- 4 年間で生まれた議論や必要になった選択、どういう経緯でアーキテクチャを変えていったかなどが書かれています
- 記事では、プロジェクト始動、一部サービスのリリース、プロジェクトの大きな方針転換、マイクロサービス化完了の 4 フェーズごとに背景や行ったことが書かれています
- もともとは 4 年以上もかからない見込みだったようですが、技術選定に時間がかかったり、デザインを一新することになりプロジェクトの見直しがあったり、Codecov によるインシデント対応があったりと紆余曲折あったようです
- アーキテクチャ刷新の大変さがうかがえる内容で大変さがひしひしと伝わってくる記事でした。アーキテクチャ刷新は決して珍しくなく息の長い企業はどこもやっていそうですが、ここまで紆余曲折を詳細に書いてくれている記事も珍しいと思うので、参考にしたいです

# tool 🔨

## ecrm - Amazon ECRから不要イメージを安全に削除するOSSを作った - KAYAC engineers' blog
https://techblog.kayac.com/ecrm-oss

- AWS において、ECS や Lambda で利用されていない ECR のイメージを削除してくれる OSS を作ったという記事です
- ECR イメージを単純にライフサイクルポリシーで定期削除した場合、ECS で利用中のイメージが削除されてしまう場合があり、それでは困ると安全にイメージを削除する CLI ツールを作成したとのことです
- ecrm は ECS のタスク、Lambda で使われているか、指定したリビジョンの世代に近いかなどをチェックし、使われているかどうかを判定しています
- この記事では、背景、ライフサイクルポリシーで発生した問題、ecrm の説明・使い方などが載っています
- 柔軟に設定もできるようで、ECR をヘビーユーズしている場合に便利なツールだと思いました

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [JavaScriptランタイム「Bun」が約9億円を調達、「Oven」社を設立。ホスティングやCIサービスなど計画 － Publickey](https://www.publickey1.jp/blog/22/javascriptbun9ovenci.html)
    - 新たな JS ランタイムこと Bun が 700 万ドルを調達し会社を設立しました
      - Oven 社らしいです
    - 今後は Bun の安定的なリリースとなんらかの JS 実行環境のサービスを提供していく予定とのことです
    - いよいよ個人のプロジェクトから企業のプロジェクトとなりましたが、Node.js の代替としてメインに使われる日が来るのでしょうか。楽しみですね
  - [AWS サポートが Slack でのケース管理のサポートを開始](https://aws.amazon.com/jp/about-aws/whats-new/2022/08/aws-support-launches-managing-cases-slack/)
    - AWS のサポートと Slack 上でやりとりできるサービス AWS Support App の提供が発表されました
    - Slack 上でやりとりできることとなり、他メンバーとの情報共有がしやすくなったり使い勝手が良くなりそうですね
- **know-how 🎓**
  - [S3 on LocalStackをGoとFUSEを使ってMountする（WSL2） | フューチャー技術ブログ](https://future-architect.github.io/articles/20220829a/)
    - AWS サービスをエミュレートするツール LocalStack 上にある S3 バケットをマウントするツールを作ったという記事です
    - この記事では FUSE、go-fuse の説明、ツールのデモ、実装の解説などが書かれています
      - go-fuse を使って似たようなことをしたい場合に参考になりそうです
    - LocalStack を使って開発していると S3 をマウントして気軽に操作したい場面はありそうなので便利そうですね
  - [The SSO Wall of Shame | A list of vendors that treat single sign-on as a luxury feature, not a core security requirement.](https://sso.tax/)
    - 各種サービスで SSO を使う場合の料金比較表を載せたページです
      - sso.tax というドメインが秀逸
    - SSO を有効にする場合としない場合の料金、何%料金が向上するかなどが書かれています
    - SSO を必要とする企業はお金を持っているからか足元を見られてる感じがして面白いですね
- **tool 🔨**
  - [SQLiteを分散データベースに変えるmvSQLite | DevelopersIO](https://dev.classmethod.jp/articles/introduce-mvsqlite/)
    - SQLite を分散データベースとする mvSQLite の紹介記事です
    - SQLite との完全互換を謳っているのに驚きました（正直信じられない）

# あとがき
すみません、9 月はインターンを合計 2 週間開催していたりスプラトゥーン 3 が発売した関係で平日も休日も暇がなくてぜんぜん Weekly を進められていません。今年度のインターンは終わったのでこれから勢いを取り戻そうと思います。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 

すみません、今週もおまけはお休みです...

:::
