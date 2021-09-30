---
title: "Productivity Weekly (2021-09-29号)"
emoji: "💵"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 45 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Announcing Cloudflare R2 Storage: Rapid and Reliable Object Storage, minus the egress fees
https://blog.cloudflare.com/introducing-r2-object-storage/

CDN でおなじみの Cloudflare が Amazon S3 互換のオブジェクトストレージ Cloudflare R2 Storage を発表しました。R2 は S3 API との完全な互換性があります。

新しく開発した理由として、S3 が大量のデータを取り出す際に多額の費用がかかってしまう点を挙げています。R2 には以下の特徴があると謳われています。
- Really Requestable（本当に要求可能）
  - 読み出しの帯域幅が無料（保存データ量に対して課金される $0.015/1GB/月）
- Repositioning Records（レコードの再配置）
  - S3 と互換性のある他のクラウドストレージサービスからの自動移行機能を搭載
- Ridiculously Reliable（とんでもなく信頼可能）
  - 年間耐久性 99.999999999%（イレブンナイン）を実現（S3 と同じ）
- Radically Reprogrammable（完全に再プログラム可能）
  - サーバレスランタイムの Cloudflare Workers と完全に統合

S3 API と互換性があり、S3 と同じ耐久性を持ち、S3 よりも低コストで利用できるのが魅力的ですね。Cloudflare Workers 利用者は特に魅力的だと思います。

しかし、S3 はどこと通信するかで転送量が変わるため（後述の[EC2からS3へアクセスする4つのルートとコスト](#ec2からs3へアクセスする4つのルートとコスト)）、必ずしも R2 の方が転送料金で勝るわけではないと思います。また、S3 を AWS の他のサービスと一緒に利用している場合、複数パブリッククラウドを梯子しないといけなくなるコストも発生するかと思います。したがって S3 から R2 へ積極的に移行すべきとまではまだ行かないと考えます（AWS のサービスで S3 のみを利用しているのであれば移行してもいいのかも。あとは Cloudflare Workers から呼び出す場合かな）。

なお R2 は現在開発中です。気になる人は waitlist に登録してみましょう。

日本語の関連記事も貼っておきます。こちらもご参照ください。
- [Cloudflare、CDNエッジで使えるオブジェクトストレージ「R2」発表。Amazon S3互換、読み出しの帯域コストなし、イレブンナインの信頼性 － Publickey](https://www.publickey1.jp/blog/21/cloudflarecdnr2amazon_s3.html)
- [「Amazon S3」から「Cloudflare R2 Storage」に乗り換えるとどれだけコストを抑えられるのか？ - GIGAZINE](https://gigazine.net/news/20211004-amazon-s3-cloudflare-r2-storage/)

# know-how 🎓
## EC2からS3へアクセスする4つのルートとコスト
https://tech.nri-net.com/entry/access_routes_from_EC2_to_S3

AWS の EC2 から S3 へアクセスする際のルート（経路）とコストを紹介した記事です。それぞれ 4 つのルートの詳細とコストまとめが載っています。

それぞれのルートは構成図と説明付きでとてもわかりやすいです。ルートによって料金が異なるのはこういったパブリッククラウドの面白いところですね。ちなみに PrivateLink は存在を知りませんでした。不安のある方はどういう経路で通信してるかを確認してみてもいいかもしれません。


## tadashi0713/howtheytest-jp: 日本のソフトウェア企業のテスト・テスト自動化に関する資料をまとめています
https://github.com/tadashi0713/howtheytest-jp

日本のソフトウェア企業のテスト・テスト自動化に関する資料まとめリポジトリです。企業ごとにまとめられており、README から各社のコンテンツに飛べます。

もともと [abhivaikar/howtheytest](https://github.com/abhivaikar/howtheytest) というテスト・テスト自動化の英語資料まとめリポジトリがあり、それを参考にした日本語版という位置付けとなっています。

他社のテスト・テスト自動化の事例を知りたい・学びたい場合に便利ですね。

## CIOpsとGitOpsの話 - inductor's blog
https://blog.inductor.me/entry/2021/09/24/015402

ちまたでよく聞く GitOps について、「Git で管理されていれば GitOps なんでしょ？」「Git を契機とした自動デプロイのことでしょ」という勘違いを払拭するために GitOps と CIOps の違いや詳細を解説した記事です。

CIOps と GitOps の一番の違い、CIOps のメリット・デメリット、GitOps のメリット、そして最後に追記として GitOps の定義について触れています。

僕は GitOps が Pull 型のデプロイである程度のことを知っていたのですが、CIOps という単語ははじめて知りました。今まであまり GitOps について深く考えたことがなかったので、いい機会になりました。それはそれとして、追記のリンクを読むに、確かに Push 型か Pull 型かが GitOps であることを分ける決定的な点ではなさそうとも思いました。大事なのは常にシステムが Git に追従できていること、システム全体が宣言的であることかもしれません。それを実現するための方法として Push 型より Pull 型が優れていると考えられると思いました。

奥が深い話なのでもうちょっと調べてみたいところです。CI と CD を分けていきたいですね。

# tool 🔨

## feat: added OIDC by richardhboyd · Pull Request #262 · aws-actions/configure-aws-credentials
https://github.com/aws-actions/configure-aws-credentials/pull/262

AWS への認証を行う aws-actions/configure-aws-credentials アクションに、[最近 GitHub Actions で使えるようになった](https://zenn.dev/korosuke613/articles/productivity-weekly-20210922#aws-federation-comes-to-github-actions--aidan-steeles-blog-usually-about-aws) OIDC トークンを利用するプルリクエストがマージされていました。

これにより、AWS 公式のアクションで AWS への認証に簡単に OIDC トークンを使えるようになりました。[google-github-actions/auth](https://zenn.dev/korosuke613/articles/productivity-weekly-20210922#google-github-actions%2Fauth%3A-github-action-for-authenticating-to-google-cloud-with-github-actions-oidc-tokens-and-workload-identity-federation.) の紹介でも書きましたが、AWS 謹製であるところが嬉しいですね。こういった認証を肩代わりするツールの導入は慎重に行う必要があると思うのですが、AWS が開発しているため、他の 3rd Party ツールに比べて信頼しやすいです。

まだ GitHub Actions の OIDC トークンは正式な機能ではないため、早く正式にリリースされてほしいですね。

## Create mock APIs in seconds - Mockoon
https://mockoon.com/

Mockoon は REST API のモックサーバを簡単に立ち上げることができるツールです。GUI ツールと CLI ツールの 2 つがあり、とにかく手軽にモックサーバを立ち上げることができます。

ルートやステータスコード、ヘッダなどその他もろもろを柔軟に設定できるのはもちろん、レスポンスルールを用いてリクエストに応じてステータスコードを変えるといったこともできるため、高機能です。また、既存のエンドポイントをインターセプトして残りのエンドポイントをフォワードすることもできます。

手軽に簡単な REST API モックサーバを立ち上げたいときも使えますし、高機能なので複雑な API モックサーバをテストで利用するという使い方もありかもしれません[^msw]。

実際に使ってみた記事をクラメソさんがあげてたのでそちらもご参照ください。
- [Mockoon で REST API のモック環境を爆速で立ち上げてみた](https://dev.classmethod.jp/articles/build-mock-api-server-with-mockoon/)

[^msw]: とは言っても、ユニットテストなどで使う場合は、言語ごとのテストフレームワークを使う方が楽かもしれません。([msw](https://mswjs.io/) や [nock](https://github.com/nock/nock) など)

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Gist の Markdown に画像や動画を貼り付けられるようになりました](https://twitter.com/github/status/1441401169524494337)
  - 以前は Gist に直接貼れなかったため、Issue やコメントなどに一旦貼り付けてリンクが生成されてから Markdown に貼り付けるなどする必要がありました。
- [GitHub Enterprise Server 3.2 is now generally available](https://github.blog/2021-09-28-github-enterprise-server-3-2-generally-available/)
  - [以前 GitHub Enterprise Server 3.2 の RC が出た話をしました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210915#github-enterprise-server-3.2-brings-new-color-modes-and-added-security-capabilities-%7C-the-github-blog)が、これが GA になりました。
  - GHES にもダークモードがやってきましたね。パーソナルアクセストークンの期限設定ができるようになったのも嬉しいです。

# あとがき
今週号もだいぶ遅れてしまった....最近遅くなりがちですみません。今週もプライベートが忙しかったです。最近夏アニメが続々と終わりましたね。僕は[ひぐらし卒](https://higurashianime.com/)や [Sonny Boy](https://anime.shochiku.co.jp/sonny-boy/)、[ゲッターロボアーク](https://getterrobot-arc.com/)などを観ていました。ひぐらしはいろんな意味で盛り上がって楽しかったです。Sonny Boy は理解が難しいところが良かったですね。もっかい見直したい。ゲッターアークは最高でした。描かれなかったゲッターアークの終盤付近をうまく補完するすばらしいアニメでした。ゲッターロボサーガは本当の本当に終わったんだな〜

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 「マジでジェームズボンド」「魔法使いみたい」――触らずに操作できるApple Watchの新機能に反響 - ITmedia NEWS
https://www.itmedia.co.jp/news/articles/2109/27/news106.html

Apple Watch 向けの新 OS watchOS 8 の新機能に面白いものが入りました。なんと画面をタッチしなくても指や手の動きで任意の操作ができるというものです。なんだそりゃとなる方は記事中に載っている Twitter に動画がありますのでそれを見てください。

僕も試してみてすごいと思ったのですが、まあ片方の手でタッチした方が早いので 1 回有効化して終わりました。僕はともかく、なんらかの理由で自由に AppleWatch の画面をタッチできない、ダイアルを回せない人が AppleWatch を操作できるのは素晴らしいことですね。さすが Apple。

### ETロボコン2021 地区大会（Cブロック）で僕が所属していた研究室が総合優勝しました
https://twitter.com/miyazaki_katlab/status/1444586906516217858?s=20

:::message
おまけでもなんでもないのですが、非常に嬉しかったので書きます。
:::

[ETロボコン](https://www.etrobo.jp/)とは、ソフトウェアモデリングおよびロボット制御で競う大会です。プログラムを組み込んだロボットが自律して走ったりブロックを動かすのですが、その競技の結果だけでなく、そのソフトウェアのモデル（UML などを利用）[^model]の出来も点数に含まれるという面白い大会です。いくら競技でいい点数を出せてもイコール総合優勝ではありません。大学や高専、企業のチームが出場しています。

僕も大学・大学院の頃、お世話になってた研究室で出場していたのですが、卒業後も ET ロボコンに参加する文化は続いており、毎年後輩たちが出場しています。その大会が今年も開かれたのですが、地区大会（C ブロック、九州+沖縄）で見事総合優勝を果たしてくれました。特にモデル部門で強豪を破って優勝してくれたのがとても嬉しいですね。良いモデル書くの本当に大変なんですよ。

とまあ喜びましたが、この後全国大会があるのでそっちでもがんばってほしいですね。全国大会は [2021/11/21（日）, 11/22（月）にある予定らしい](https://www.etrobo.jp/2021_schedule/)ので、気になる人はぜひ観戦してください。（どうやって観戦するかは僕もまだよくわかっていませんが）


[^model]: モデルはこんな感じのやつです。文字びっしり。https://speakerdeck.com/korosuke613/etrobokon2019-csda-hui-moderu-da-k-lab-586f9b23-fa25-4da2-9208-f1d048c29468