---
title: "Productivity Weekly (2022-03-23号)"
emoji: "🐙"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220323"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 67 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions: Restrict self-hosted runner groups to specific workflows | GitHub Changelog
https://github.blog/changelog/2022-03-21-github-actions-restrict-self-hosted-runner-groups-to-specific-workflows/

GitHub Actions において、指定したワークフローのみ利用を許可する設定をセルフホストランナーグループにできるようになりました。

セルフホストランナーグループは Organization、Enterprise で利用可能なセルフホストランナーのまとまりです。セルフホストランナーグループは利用できるリポジトリを制限できます。社内ネットワークにつながるランナーや高性能マシンのランナーなど、どこでも利用できると困るランナーを登録するのに便利な機能です。

今回、従来のリポジトリ制限に加えてワークフローでも制限できるようになりました。ワークフローで制限する場合、タグやブランチ、コミットハッシュ値を指定できます。これによりこれまで以上に安全性を高めることができます。

また、reusable workflow と組み合わせることで、より安全に組織内で利用してもらうことができます。

例えば、reusable workflow を許可するワークフローとして指定し、reusable workflow を提供するリポジトリの Write 権限を持った人を極力制限することで、利用者（同組織内）にランナーを自由に使わせずに、ランナーを使ったワークフローを提供できます。

reusable workflow 本体の Write 権限持った方のみ reusable workflow を更新できるので、例えばハッシュタグではなく main ブランチで制限をかけて安全性をそこまで損なわずに使い勝手を良くできるというメリットもあると思います。

セルフホストランナーを大活用している組織にはとても嬉しい機能ですね。

## Introducing the GHES repository cache | The GitHub Blog
https://github.blog/2022-03-22-introducing-the-ghes-repository-cache/

GitHub Enterprise Server において、Git リポジトリのキャッシュ機能が提供されました（ベータ）。

簡単に言うと、GHES の Git リポジトリサーバ（read only）の部分を別のサーバにレプリケーションできると言う機能です。リポジトリは read only であるため、clone や pull はできても push はできません[^lfs]。

そのため、地理的に分散したメンバーでの利用は想定されておらず、CI での利用が想定されています。GHES のサーバと CI ファームが地理的に分散していたり、トラフィックが大きくなってしまったりしているような利用ケースが考えられます。

しかし、キャッシュの更新には数分かかる可能性があり、期待しているコミットがまだ存在しない場合の対策はユーザで実装する必要があるとも書かれています。

GHES のサーバと CI ファームが地理的に分散してることはなかなか無さそうです。しかし、例えば CircleCI Server や GitHub Actions を AWS（など）上に構築しており、GHES サーバを社内サーバに構築してるといったパターンは割とあるのではないでしょうか？その場合、トラフィックを削減できるとネットワーク転送料金を節約できる可能性があります。

データが届くまでの時差があったり他にも制限事項があったりと、なかなか扱いが難しそうですが、使いこなせると大きな効果を得られるかもしれません。まだまだベータですが、気になる方は試してみてください。

[^lfs]: LFS にはまだ対応してないようです。一番需要がありそうですが。将来的に対応する予定とのこと。

## Improving your GitHub feed | The GitHub Blog
https://github.blog/2022-03-22-improving-your-github-feed/

GitHub のホーム画面のフィードに「For you」タブが追加されました（ベータ）。

フォローしている人のスターや、スターを付けたリポジトリのリリース、何かしらのレコメンドや他にも色々が流れてきます。従来のホーム画面よりもソーシャルっぽい通知が多そうです（あと見た目がリッチになってます）。

個人的にスターを付けたリポジトリのリリースが流れてくるのは嬉しいかもしれません。Watch して通知させることもできますが、そこまで強く追っかけたいわけではない場合に嬉しいです（スターを付けたリポジトリ全てを流してほしいわけではありませんが）。


:::message
余談ですが、「For you」のフィードバックを見ると「[I don't want algorithmic feed #13131](https://github.com/github/feedback/discussions/13131)」が一番 vote されており[^vote]、あまり評判は良くなさそうです。

https://github.com/github/feedback/discussions/categories/feed-feedback?discussions_q=category%3A%22Feed+Feedback%22+sort%3Atop
:::

[^vote]: 2022/03/25 時点で 343。結構ボロクソに言われてるコメントもあって可哀想にも思える。

## Terraform と gcloud CLI を使用した完璧な Google Cloud インフラストラクチャの構築 | Google Cloud Blog
https://cloud.google.com/blog/ja/products/application-development/google-cloud-cli-declarative-export-preview

Google Cloud CLI が既存リソースの Terraform 出力（または KRM[^krm] 出力）をサポートしました（ベータ）。Terraform ファイルの出力や、`terraform import` をまとめたシェルスクリプトの生成ができます。インポートも楽にできるのは嬉しいですね。

記事ではコマンド例や IaC のメリット、ユースケースなどが載っています。これから GCP のリソースを IaC 化したいけどコストがな〜と考えている方におすすめしたいです。僕は AWS の方がよく使うので AWS も似たような機能を作ってほしいです😇

また、以下のスクラップで試してみたので、気になる方は見てみてください。

Google Cloud CLI で既存のリソースを Terraform ファイルにエクスポートするのを試す
https://zenn.dev/korosuke613/scraps/f91dedf3890a65

[^krm]: Kubernetes Resource Model の略。[KRM でも GCP のリソース管理ができるらしい](https://cloud.google.com/blog/ja/products/containers-kubernetes/understanding-configuration-as-data-in-kubernetes)。

## twitterdev/twitter-api-typescript-sdk: A TypeScript SDK for the Twitter API
https://github.com/twitterdev/twitter-api-typescript-sdk

Twitter 公式の TypeScript 製 API SDK が登場しました（ベータ）。Twitter API V2 のみをサポートしています。

これまで Twitter 公式の JS/TS 向け汎用 SDK はなかったため、3rd party ライブラリを使うか自前で API を叩くしか方法はありませんでした。3rd party ライブラリは色々ありますが、信頼していいかの判断や未対応 API があるなどの理由で使いづらく、自前で API 叩くのは正直大変でした。公式が出してくれるのはとてもありがたいです。~~むしろなぜ今までなかったのだろうか。~~

Twitter API v2 のみ対応しています。ちょっと前まで v2 は肝心のツイートができなかったため限定的な用途でしか使えなかったのですが、[最近ツイートもできるようになり v2 が正式に主要 API となった](https://zenn.dev/korosuke613/articles/productivity-weekly-20211117#koneta-%F0%9F%8D%98)ため、ある程度 v2 でやりたいことができると思います。

まだベータということで業務利用などは控えた方が良いです（README.md にもそう書いてる）。早く正式リリースまで行ってほしいですね。

## オープンソースのnpmパッケージ「node-ipc」にロシア在住の開発者を標的にした悪意のあるコードがメンテナーによって追加される - GIGAZINE
https://gigazine.net/news/20220322-sabotage-code-to-node-ipc/

最近 node-ipc という OSS の npm パッケージに、メンテナによる悪意ある変更が追加されました。

その内容はロシアかベラルーシの IP アドレスを持つマシン上で実行されるとファイルの内容を書き換えるというものです。Snyk によって脆弱性登録されています（[CVE-2022-23812](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-23812)、[SNYK-JS-NODEIPC-2426370](https://security.snyk.io/vuln/SNYK-JS-NODEIPC-2426370)）。

現在はこの変更が入ったバージョンは npm から削除されていますが、その後もメンテナによる主張が仕様に載ったり、主張を載せたファイルを生成される機能が追加されたりと色々起こってます。上の記事では大まかな流れを知ることができます。

[vuejs/vue-cli](https://github.com/vuejs/vue-cli) が依存しているなど、node-ipc は広く使われてた OSS であり、今回の影響は計り知れません。

また、以下の記事では、どのバージョンが影響を受けるか、依存しているかの確認方法、対応方法などを書いてくれています。Node.js プロジェクト開発者は確認しておくのをお勧めします。

https://zenn.dev/azu/articles/e248ed86fb6d34

似たような事件として [colors.js の件](https://zenn.dev/korosuke613/articles/productivity-weekly-20220112#colors%E3%81%AA%E3%81%A9%E3%81%AEnpm%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%81%AB%E6%82%AA%E6%84%8F%E3%81%82%E3%82%8B%E3%82%B3%E3%83%BC%E3%83%89%E3%81%8C%E5%90%AB%E3%81%BE%E3%82%8C%E3%81%A6%E3%81%84%E3%82%8B%E5%95%8F%E9%A1%8C%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)が記憶に新しいですが、まさか短期間で似たようなことが起こるとは思いませんでした。たとえば npm は 2FA を強制するようになっただの、サプライチェーン攻撃に対する対策を最近よく聞きますが、メンテナが暴走するパターンに対してはプラットフォーム側での対策は難しいですよね。やっぱり利用者としてもバージョンを固定するなどの対策を強めていかなければならないと思います。他にもアプデ時に悪意ある変更がないかの確認などもした方が良いのですが、コスト的に隅々まで見るのは厳しい部分もありますよね。そこら辺の塩梅が難しいと最近はよく思います。

# know-how 🎓

## 15年間続いているサービスをクラウドに移行しています
https://www.m3tech.blog/entry/migrate-an-askdoctors-application-to-cloud

https://www.m3tech.blog/entry/migrate-an-askdoctors-application-to-cloud-2

15 年間の歴史あるサービスを AWS に移行しているという記事です。Part 1 では移行の背景、移行前後の構成、移行対象の把握などについて、Part 2 では移行フェーズの全体像、苦労したポイント、移行後に起こった問題などが書かれています。

苦労したポイントが特に面白く、確かにこれは苦労するわと共感できる部分が多かったです。

> とくにインフラに関わるような修正って修正内容自体は大したことない修正なんですけど、影響範囲が広くなりやすいのと、ローカルでの動作確認がしづらいため、ほとんどの時間が影響調査と言っても過言ではありませんでした。

Weekly でこの記事を紹介した方は上が一番共感できるとのことだったのですが、自分も同じでした。パブリッククラウド特有の制限があったり、さまざまなサービスをまたぐことで原因特定がむずくなったりと、原因調査とかが難しいんですよね。

待ち時間に関することもめちゃくちゃ共感できました。簡単な変更のために `terraform apply` をめちゃ待つっていうのはよくあります。

クラウド移行の大変さがよくわかる記事です。色々な知見があるので、同じくクラウド移行を行っている、行おうとしている方に参考になると思います。

## Playwright & Vite ではじめる脱レガシー向け軽量 Visual Regression Test
https://blog.cybozu.io/entry/2022/03/18/100000

Playwright と Vite を使って軽量に Visual Regression Test(VRT)を行うという記事です。

VRT は画面のスナップショットを機械的に比較して意図せぬ変更が入ってないかを確認するテスト手法です。ただ、本記事では背景としてフロントエンドの React 化によるサイレントリリースを行っているため、現行環境と React 環境のスナップショットを比較し、現行環境を常に真とするようにしているとのことです。

この記事では、背景、VRT の説明、Playwright で軽量に VRT を始める方法、Vite との組み合わせ方、最終的な構成図、Pros/Cons などが載っています。

なかなかのボリュームですが非常に読みやすい記事となっています。config ファイルの例も載っているため、この記事を参考にすぐに同じようなことを始められそうです。

割と新しめなフレームワークを使っているので、似たような境遇の方も既に VRT の仕組みを持っている方も参考になりそうと思います。僕も自分のホームページの依存関係更新時に取り入れたいなと思いました。

# tool 🔨

## 手軽に負荷テストができるツール「Taurus」がスゴい
https://zenn.dev/tonchan1216/articles/11afd147ea3dd2734315

負荷テストツール、Taurus の紹介記事です。

負荷テストツールは既存のものが色々ありますが、特徴として yaml でシンプルにシナリオが書ける、既存ツールのスクリプトを流用できる、モニタリングツールが内蔵されているなどがあるとのことです。

この記事では、Taurus の特徴、解決できそうな課題、使い方などが載っています。

既存ツールのスクリプトを流用できるのは大きな魅力ですね。移行コストは比較的低そうなので、既存ツールでうーんとなっている方もこれから負荷テストやっていきたい方も使ってみるとよさそうです。

:::message
余談ですが、インストール方法が `pip install bzt` なのはうーんとなりました。pip でコマンド入れるの好きじゃないんですよね。

と思ったら全然 apt-get や Homebrew でのインストールも公式サイトに載ってました。良いですね。
:::

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [kube-scoreでKubernetes ManifestにLintをかける](https://zenn.dev/ryo_yamaoka/articles/9f54cb27f404d0)
  - k8s マニフェストの lint ツールです
  - 既存ツールで有名な KubeLinter と比べてリリース頻度が高いとのこと
  - 僕は k8s マニフェストの lint ツールを使ったことないので比較できません..
- [Docker for Macの新しいファイルシステムVirtioFSを試してみた](https://zenn.dev/takc923/articles/1eb61e531e3704)
  - Docker for Mac はファイルアクセスが遅いことで有名ですが、新しいファイルシステムとして VirtioFS を使えるようになったようです
  - この記事では各パターンのベンチマークを載せてくれています
  - Intel チップに関しては既存のファイルシステムより遅い結果が出てしまったとのことですが、macOS 12.3 で修正され、Intel チップでも速くなったと追記されています
- [Genericsを使いミスを防ぐSQL Builder「GenORM」](https://zenn.dev/mazrean/articles/c795c04e4837b4)
  - Go 1.18 で Generics がサポートされましたが、それを利用してコンパイル段階で SQL のミスを発見できる SQL ビルダーを作ったという記事です
  - 定義したスキーマから型パラメータに対応した ORM を生成することで、コンパイル段階で型チェックができるっぽいです
  - こんな活用方法もあるんだなと参考になりました

# あとがき
なんとか今週号を今週中に出せました。来週に新卒社員が入社するので楽しみです。

生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（4/22 エントリー開始）。

生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社
https://cybozu.co.jp/company/job/recruitment/intern/improvement.html

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### 祝・ちいかわ 3 巻発売

https://twitter.com/Shitimi_613/status/1506476628767293447

なんか小さくてかわいいやつことちいかわ（[@ngnchiikawa](https://twitter.com/ngnchiikawa)）のコミックス 3 巻が発売しました。今回の特装版は「ちいかわカルタ」です。みんなで名シーンを思い出しながら遊べますね。

僕はちいかわのファンで、私物アカウント（[@AiraKagoshima](https://twitter.com/AiraKagoshima)[^follow]）ではちいかわの新作が出てすぐさまリツイートするくらいにはファンです。ファンアートを描くくらいにはファンです。あと Mac にちいかわシール貼ってます。あの平穏に思えて不穏な世界観が好きなんですよね。

https://twitter.com/Shitimi_613/status/1488856986213306369

第 3 巻では封印が解かれたちいかぶの話やおっきい討伐の話が載っていました。どれも考察しがいのある長編ですね。

Twitter を追えばほとんどの回を読めますが、単行本には書き下ろしがあったり、1, 2 巻の特装版絵本にも新情報が載っていたり[^usagi]とお金を払う価値は十二分にあります。お布施的な意味でも買うことをお勧めします。

今進んでるストーリーもなかなか面白いので目が離せません。

[^follow]: 鍵垢だけどフォロー大歓迎！
[^usagi]: うさぎは〇〇していた！
