---
title: "Productivity Weekly (2022-04-27号)"
emoji: "🥊"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220427"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 72 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## CircleCI のワークフローのスケジュール実行機能が2022/06/03より段階的に廃止される予定とのことです

去年 10 月、[CircleCI のパイプラインをスケジュール実行する新機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#scheduled-pipelines-are-here---announcements---circleci-discuss)が公開されました。そして、既存のワークフローのスケジュール実行が最終的に deprecation になるとのことでした。

実際にいつ非推奨となるかは不明だったのですが、2022/06/03 に deprecation となることが 2 月に発表されていました（今回の Weekly で知った）。

> The deprecation for Scheduled Workflows is June 3rd 2022.
> https://discuss.circleci.com/t/scheduled-pipelines-are-here/41684/11

ドキュメントにも記述が増えていたのですが、こちらには非推奨（deprecation）ではなく段階的廃止（phased out）と書かれています。

![](/images/productivity-weekly-20220427/scheduled_workflows.png =450x)
> Scheduled workflows will be phased out starting June 3, 2022. Visit the scheduled pipelines migration guide to find out how to migrate existing scheduled workflows to scheduled pipelines, or to set up scheduled pipelines from scratch.
https://circleci.com/docs/2.0/workflows/#scheduling-a-workflow

非推奨とされていたときは一応まだワークフローのスケジュール実行は当分使えるものかと思っていたのですが、ドキュメントではだんだんと使えなくなるような書き方となっています。これが何を意味しているのかはまだちょっとよくわかっていません（知ってる人いたら教えてほしい）。もしかしたらブラウンアウトが始まるかもしれませんし、6/3 を迎えても当分は普通に使えるかもしれません。

ワークフローのスケジュール実行をパイプラインのスケジュール実行へ移行する方法はドキュメントに載っているので、それを参考に移行すると良いです[^schedule]。

- [Migrate scheduled workflows to scheduled pipelines](https://circleci.com/docs/2.0/scheduled-pipelines/#migrate-scheduled-workflows)

実際のところどういう風に廃止されるのかはまだ謎ですが、可能であれば早めに移行作業を行なっておいた方がいいでしょうね。移行していきましょう。

[^schedule]: パイプラインとワークフローは単位が違う上に新方式では cron 式が使えなくなるため割と移行はめんどそうです。

## Organization Profile Updates: Member-only READMEs and pinned private repositories | GitHub Changelog
https://github.blog/changelog/2022-04-20-organization-profile-updates-member-only-readmes-and-pinned-private-repositories/

GitHub において、Organization のプロフィールページに private な README を置けるようになりました。[これまでは public な README のみ配置できました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210915#readmes-for-organization-profiles-%7C-github-changelog)。今回の変更は public な README とは別に private な README を置けるようになったというものになります。

`.github-private` というリポジトリに `profile/README.md` 配置することで private な README を設定できます。閲覧したい Org のメンバーは Org のトップページに出てる `View as` というボタンを押して `Member` を選択することで private な README を閲覧できます。

![](/images/productivity-weekly-20220427/view_as.png =250x)
*Org のトップページに表示される `View as`。private な README がない場合は `create a README file` というリンクも表示される。*

![](/images/productivity-weekly-20220427/create_member_readme.png =400x)
*`View as` にある `create a README file` をクリックすると表示されるダイアログ。private な README の作り方と共にリポジトリの作成画面へ促す。*

![](/images/productivity-weekly-20220427/create_repo.png =550x)
*`.github-private` リポジトリを作成しようとすると表示されるインフォメーション。スペシャルなリポジトリであることが説明されている。*

なお、private リポジトリの場合は想定通りに `profile/README.md` が Organization のトップに表示されるのですが、internal リポジトリの場合は残念ながら表示されませんでした。もしかしたら同 Enterprise で Org に入っていないメンバーは private な README を閲覧できないのかもしれません[^enterprise]。

ちなみに、ドキュメントには public リポジトリを作れと書いてあったので、public リポジトリでも実現できると思われます[^public]。

> If your organization does not already have a .github-private repository, create a public .
https://docs.github.com/en/organizations/collaborating-with-groups-in-organizations/customizing-your-organizations-profile#adding-a-member-only-organization-profile-readme

まだ Enterprise での利用をあまり想定していないような挙動なのが残念です。そこは今後改善してほしいですね。それはそれとして Organization のメンバーのみ見られる README も十分に価値があると思います。例えばコントリビューション方法についての案内や普段のやり取り場所の案内、Org のルールなどなど。嬉しい機能ですね。

[^enterprise]: 同 Enterprise で Org に入っていないメンバーが閲覧できるかどうかは検証できませんでした。知ってる方は教えてください。
[^public]: public リポジトリは試してないので実際できるかはわからない。

## Private Profiles | GitHub Changelog
https://github.blog/changelog/2022-04-21-private-profiles/

GitHub のユーザのプロフィールを private にできるようになりました（パブリックベータ）。有効にすると他人からはそのユーザのアクティビティやスターなどが全く見られなくなるようです。

スコープの設定は細かくできないみたいで、例えばスターのみ非公開にするといったことはできません。組織で使っているボットユーザなどに設定しておくのが良いかもしれません。まだこの機能はパブリックベータなので、気になることがある人はフィードバックを送りましょう。

## OpenID Connect Support added to AWS CLI Orb - v3.1 - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/openid-connect-support-added-to-aws-cli-orb-v3-1/43817

circleci/aws-cli orb が OIDC による認証に対応しました。v3.1 からの対応となります。

[先日 CircleCI が OIDC に対応しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220330#%E3%82%B8%E3%83%A7%E3%83%96%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B-oidc-%E3%83%88%E3%83%BC%E3%82%AF%E3%83%B3---circleci-%E3%81%AB%E9%96%A2%E3%81%99%E3%82%8B%E6%9C%80%E6%96%B0%E6%83%85%E5%A0%B1)が、circleci/aws-cli orb は OIDC に対応していなかったため、自身で AWS CLI を叩いてトークンを取り出すなどシェルでがんばる必要がありました（[参考](https://dev.classmethod.jp/articles/circleci-supported-oidc-so-i-tried-linking-it-with-aws/)）。

今回、CircleCI 公式の orb が対応したことで、OIDC を使った AWS の認証が非常に簡単にできるようになりました。活用していきたいですね。

## Test Splitting on Self-hosted Runners
https://discuss.circleci.com/t/test-splitting-on-self-hosted-runners/43810

CircleCI において、セルフホストランナー利用時にテスト分割＆並列実行ができるようになりました。

CircleCI にはテストスイートを自動で分割し、各コンテナで各テストケースを実行するという機能があります（ざっくりした説明）。詳しくは以下のドキュメントを参照してください。

- [テストの並列実行 - CircleCI](https://circleci.com/docs/ja/2.0/parallelism-faster-jobs/)

この機能は過去のテスト実行結果に基づいてテストを割り振ることができるので、全体のテスト時間をいい感じに短縮できて良いです。

そんなテストの分割機能がセルフホストランナーでも使えるようになりました。セルフホストランナーと CircleCI-hosted runner の両方で動かすことはできないのか、複数個のセルフホストランナーを用意、指定する必要があります。

セルフホストランナーが CircleCI-hosted runner に近づいていって良いですね。テスト分割できないじゃんと思っていた人は試してみましょう。

## CircleCI | Product Roadmap - CircleCI
https://circleci.com/product-roadmap/

CircleCI が Product Roadmap を公開するようになりました。`Now`、`Next`、`Future`、`Released` のカテゴリに分かれており、Cloud と Server 両方のトピックが載っています。他の組織の例だと、[GitHub](https://github.com/orgs/github/projects/4247)[^yodan]や [Docker](https://github.com/docker/roadmap/projects/1) もロードマップを公開しています。

個人的には以下の 2 つのトピックが特に気になってます。

- [Server 3.x から kots を排除する話](https://twitter.com/Shitimi_613/status/1517114230507405317)
  - kots 好きじゃないのでうれしい
- [audit logs をユーザ自身でダウンロードできるようにする話](https://twitter.com/Shitimi_613/status/1517117678128836608)
  - Server 版は自身でダウンロードできるけど Cloud 版はサポートにお願いしないといけない
  - それよりも自分はストリーミングに対応してほしい
    - [ストリーミングできるようにしてくれってコメントした](https://twitter.com/Shitimi_613/status/1517443093091414016)

やっぱり Product Roadmap が公開されていると純粋にワクワクしますよね。実装前に利用者が議論に参加できるのも嬉しいところだと思います。どの XaaS もこういう Product Roadmap 出してほしいな〜[^cybozu]

[^yodan]: 余談ですが、https://github.com/orgs/github/projects/4247 のリンクを見るに、GitHub 社は少なくとも 4247 の GitHub Project を作っているんですね...やっぱ自社プロダクトのタスク管理ツールをちゃんと使ってるんですね。えらい（そりゃそうと言われればそりゃそう）。個人的に GitHub Projects は機能が少なくて微妙だと思っていた（Beta はだいぶ使えるくらいになってきたと思う）ので...

[^cybozu]: ちなみに Cybozu はそういうものを公開していません（なかったはず）。次のリリースの内容は出したりしてるけど。残念。

## Resource Class Insights - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/resource-class-insights/43790

CircleCI において、ジョブのリソース消費量の推移が可視化されるようになりました。これまでも [1 回のジョブ実行のリソース消費量のグラフを見ることができました](https://zenn.dev/korosuke613/articles/productivity-weekly-20211208#track-circleci-updates---circleci)が、今回の変更では複数回のジョブ実行でリソース消費量がどのように推移しているかを見られるようになっています。

![](/images/productivity-weekly-20220427/circleci_resource_usage_timeline.png =500x)
*僕のホームページに関して [cron 実行してるジョブ](https://app.circleci.com/insights/github/korosuke613/myHomepage/workflows/cron/jobs?branch=main&reporting-window=last-30-days)の例。思ったより CPU を食ってますね笑*

リソースクラスごとに CPU 使用率およびメモリ使用率の平均値と最大値の推移を見ることができます。

こういったグラフが見られると適切なリソースクラスを選択できて良いですね。

# know-how 🎓

## CircleCIでLayer Cachingを使わずにdocker buildを高速化する - Google スライド
https://docs.google.com/presentation/d/1UpRyHsdx4bpBWE9P0VWznVCcupmjVWfmEXRoMbcAeIQ/mobilepresent?slide=id.p

CircleCI で `docker build` をする際に、Layer Caching を使わずに高速化するためにどういう方法が妥当かを検証したスライドです。

CircleCI には Docker イメージの Layer をキャッシュする Layer Caching という機能がありますが、Layer Caching は無効の時と比べてクレジット消費量が多いです。そのため Layer Caching を使わずに CircleCI 上で `docker build` を高速化するためにさまざまな方法を試されています。Docker 本体が持つ各種キャッシュ機能を使うや、そもそも `docker build` でアプリケーションをビルドしないなど、複数の方法が紹介されています。

さらに、それぞれの方法を実際に計測し、定量的、定性的に考察されています。定量的なデータがあるのはとても良いですよね。

CircleCI で `docker build` するときはもちろん、最近の Docker のキャッシュ機能について疎い人にも参考になるノウハウが詰まっていると思います。自分は最近の Docker のキャッシュ機能についてなんとなくでしか知らなかったため大変参考になりました。

## リクルートのAWS基盤におけるTerraform運用_実践的な取り組みと組織づくり / HashiCorpVirtualStrategyDay_sudo - Speaker Deck
https://speakerdeck.com/recruitengineers/hashicorpvirtualstrategyday-sudo

リクルートさんによる、Terraform 運用に関するスライドです。Terraform Enterprise（オンプレ版 Terraform Cloud）導入の理由や Terraform 運用のための組織的取り組みなどが紹介されています。

スライドでは、AWS 基盤 SENTO とそれを管理する SENTO チームの紹介、Terraform 運用の歴史、Terraform Enterprise 構成、Terraform の適用フロー、Terraform Enterprise 導入後の効果、Terraform 運用のための組織作り（アジャイルプロセス、Terraform コードレビュー）、エンタープライズ企業における Terraform 運用で大事なこと、などが紹介されています。

僕も Terraform 運用については思うところがあり、どうすれば楽に、安全に `terraform apply` できるかや `terraform apply` を CI サービスにさせる場合の保守コストや権限周りなどについて色々考えています。

そこら辺を考える際にこのスライドは 1 つの事例として参考になると思います。ツールと文化の両方について言及されているのも良いですね。個人的にはコードレビュー方法が特に参考になりました。

## Goで社内ツールを作るならこんなふうに
https://zenn.dev/eihigh/articles/0774ddadc21eb4

社内で Go を採用する際のプラクティスを紹介した記事です。リポジトリ構成、プライベートリポジトリにする場合すべきこと、Go の教育についてなどが紹介されています。

個人的にパッケージのファイルをフラットにしてコマンドはディレクトリに分けるというリポジトリ構成が新鮮でした（自分はめちゃディレクトリを分けてた）。そうする理由についても個人的には納得できるものでした。また、Go 学習のおすすめコンテンツも知らない資料だったため参考になりました。

## オンプレミスでCircleCI Serverを動かそう(その1) ツールのインストール編
https://devops-blog.virtualtech.jp/entry/20220421/1650509039

オンプレ版 CircleCI こと CircleCI Server（3.x）を動かすぞという記事です。全 5 回で構成されています。

- [オンプレミスでCircleCI Serverを動かそう(その1) ツールのインストール編](https://devops-blog.virtualtech.jp/entry/20220421/1650509039)
- [オンプレミスでCircleCI Serverを動かそう(その2) 事前準備編](https://devops-blog.virtualtech.jp/entry/20220422/1650595413)
- [オンプレミスでCircleCI Serverを動かそう(その3) コアサービスのインストール編](https://devops-blog.virtualtech.jp/entry/20220425/1650854664)
- [オンプレミスでCircleCI Serverを動かそう(その4) Nomadクライアントの構築編](https://devops-blog.virtualtech.jp/entry/20220426/1650941043)
- [オンプレミスでCircleCI Serverを動かそう(その5) VMサービスの構築編](https://devops-blog.virtualtech.jp/entry/20220427/1651027463)

もちろん公式の CircleCI Server 公式ドキュメントがあり、それを参照すべきではありますが、この記事群では実際のコマンド入出力やそれぞれでやっていることの詳細な説明などが載っており、実際に CircleCI Server を建てずともどういったことをやっていくのかがわかって良いです[^eksctl]。

CircleCI Server 導入を考えてる方やまだ 2 系からまだ更新できていない方には参考になりそうです。

[^eksctl]: ただ、（公式ドキュメントが薦めているのですが）eksctl を使って Amazon EKS を構築しているため今後の保守は大変になりそうです（eksctl は正直使いづらいので Terraform などで建てる方が楽）。

## Jsonnet で Kubernetes マニフェストを快適に書く
https://zenn.dev/atodekangae/articles/435d4d4f3ef55d

YAML ではなく Jsonnet を使って k8s マニフェストを記述する方法を紹介している記事です。複数の環境に対応した k8s リソースを作る際は [kustomize](https://github.com/kubernetes-sigs/kustomize) というツールが有名ですが、Jsonnet という選択肢もあるとのことです。

この記事では、Jsonnet の記述方法、実際のマニフェストを Jsonnet 化して各環境に対応できるようにしていくハンズオン、デプロイについてなどが書かれています。

僕は Jsonnet 自体を初めて知りました、個人的には kustomize よりも自由度が高そうという印象です。また、ArgoCD が Jsonnet をサポートしているのも嬉しいですね。kustomize に不満がある方は使ってみてもいいかもしれません。

# tool 🔨

## 【格安本番運用が可能に】Render.com のメリット・デメリットを Heroku と比較してみた
https://zenn.dev/mc_chinju/articles/compare_render_and_heroku

Heroku みたいな PaaS、Render.com の紹介記事です。Render.com の紹介だけでなく Heroku との比較も書いてくれています。

記事では Render.com の紹介、Heroku との比較（料金、リージョン、DB、IaC、プレビュー環境、Redis、Cron、Worker、CD、オートスケーリングなどなど）、Heroku からの移行方法、IaC の活用、GitHub Actions の活用、などが書かれており、盛りだくさんな内容となっています。

Heroku よりも料金面で有利なことが多く、また、アジアリージョンが（おそらく）無料で使えるのも良さそうです。IaC 的なことができるのも良いですね。ただ、PostgreSQL は作成から 90 日間のみ無料とのことなので、そこは Heroku に劣りそうです（Heroku の PostgreSQL の Free プランに時間制限はない。その代わり最大 10000 行まで）。

最近 Heroku の不祥事をしばしば耳にするため、他サービスに移行しようとしている方も多いのではないでしょうか？（自分もその一人です。）選択肢の 1 つとして知っておきたいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [sigstoreのKeyless Signingでは何を検証しているのか - sometimes I laugh](https://sil.hatenablog.com/entry/sigstore-keyless-signing-what-to-verify)
    - 最近巷で話題の sigstore の Keyless Signing で何を検証しているのかを解説してる記事です。攻撃側視点での説明となっており、理論だけ説明されるよりわかりやすいと思います
      - ~~ただし自分はまだ全然読めてません~~
  - [GoのS3 ダウンロード処理で知っておくと良いこと - バックエンドパフォーマンス改善](https://zenn.dev/ichigo_dev/articles/2ff2ae3ce02e2a5f15da)
    - Go で Amazon S3 から何かをダウンロードする際にパフォーマンスを良くする方法とその解説です
    - こういう方法があるんですね。知りませんでした
  - [“Tao of Node - Design, Architecture & Best Practices” 日本語翻訳](https://jqk.life/tao-of-node-japanese)
    - Node.js を使う上でのベストプラクティス集 Tao of Node の日本語訳です
    - リポジトリ構成からパフォーマンスまで幅広くたくさんのプラクティスが載っています
- **tool 🔨**
  - [Vitest公式のVSCodeプラグインがリリースされました | DevelopersIO](https://dev.classmethod.jp/articles/vitest-vscode-plugin/)
    - Jest なんかを VSCode で使うのと似たような感じっぽい。
    - 記事最後の方で JetBrains IDE 版も紹介されているが、こちらはまだ非公式っぽい

# あとがき
GW でしたね。僕は主にエルデンリングをしていました。GW なので次回号（2022/05/04 号）はお休みです。GW みたいな連休は嬉しいのですが、さすがに休みが長すぎると仕事に戻れなくなるので個人的にはほどほどの休みが欲しいですね。週休 3 日制が当たり前になってほしい。

:::message
生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（~~4/22 エントリー開始~~→生産性向上コースのインターンは 5/23 からでした。すみません）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏
今週のおまけです。

### ロックマンエグゼで快適なネット対戦ができるようになるかもしれない話
https://zenn.dev/akatsuki/articles/47cc86955acd38

GBA[^gba]ソフト、ロックマンエグゼ[^megaman_exe]をエミュレータでインターネット対戦する際の歴史、技術を説明した記事です。

ロックマンエグゼは通信ケーブルを用いた通信対戦を前提としていたため、インターネット対戦をするために単純に経路を変えるだけではレイテンシの問題があったとのことです。そのため、もう少し上のレイヤで高レイテンシでも快適に通信対戦できるようにするための方法が歴史と共に語られています。

対戦相手のセーブデータを自身のマシンでエミュレートし、通信はボタン入力のみ行うなどなかなか面白い手法がいくつか載っており、純粋に読んでて面白いです。今回の話に限らず、世の中のインターネット対戦はすごいなーと思えます。

ロックマンエグゼシリーズはとても面白いゲームだったのですが、残念ながら 6 を最後に続編[^ryusei]およびリメイクが作られていません。ロックマンエグゼは去年 20 周年を迎えたのですが残念ながら良い情報は発表されませんでした。リメイクでもリマスターでもいいので現代にエグゼシリーズを蘇らせてほしいです。カプコン頼む！

[^gba]: 任天堂が 2001 年に発売した携帯ゲーム機、Game Boy Advance の略です。ちなみに僕が初めて親に買ってもらったゲーム機は GBA です。
[^megaman_exe]: ロックマンエグゼシリーズは現代を舞台としたアクション RPG です。ただのアクションものではなくチップを選ぶ頭脳戦的な要素もありました。ひとりプレイも面白いし、通信対戦も面白い名作でした。ちなみに僕は 2, 4, 5, 6 をプレイしました。
[^ryusei]: 流星のロックマンシリーズというニンテンドーDS 向けソフトもあるが、ゲームシステムなどが結構違う。あれはあれで面白かった。
