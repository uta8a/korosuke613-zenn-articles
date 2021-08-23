---
title: "Productivity Weekly (2021-08-18号)"
emoji: "👺"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 39 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Git password authentication is shutting down | GitHub Changelog
https://github.blog/changelog/2021-08-12-git-password-authentication-is-shutting-down/

日本時間 2021 年 8 月 14 日 14:00 から GitHub.com に対する git 操作時にパスワード認証が使えなくなりました。代わりにパーソナルアクセストークンや ssh などの別の方法を使う必要があります。

方法は色々ありますが、[GitHub は HTTPS によるパーソナルアクセストークン認証を推奨しています](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/#what-you-need-to-do-today)。パーソナルアクセストークンは権限のスコープを狭くできるため、SSH 認証と比べてもおすすめしたいです。

ちなみに僕はもともと SSH 認証を行なっていた(2 要素認証を有効にしていたため、パスワード認証だとあるごとにワンタイムパスワードを入力する必要があったため)のですが、これを機にパーソナルアクセストークンによる認証に切り替えました。`repo` 権限のみを許可したのですが、GitHub Actions ワークフローファイルの push に `workflow` 権限が必要でした。

これを機に GitHub 認証周りのセキュリティを見直してみましょう。

## Codespaces is generally available for Team and Enterprise | GitHub Changelog
https://github.blog/changelog/2021-08-11-codespaces-is-generally-available-for-team-and-enterprise/

GitHub Codespaces が Team プランと Enterprise プランの Organization で使えるようになりました[^free]。太平洋標準時の 9/10 まで無料で使えて、その後は課金が発生します。

利用したい場合は Organization settings から有効にする必要があります。また、ロールアウト中とのことなのでまだ使えない Organization はもうちょっと待ってみましょう。

また、個人プランのユーザについてはまだベータ版の位置付けのようなので、もうちょっと無料で使えそうです。

Codespaces を使うことでローカルマシンの OS や性能に依存せずチームで同じ開発環境を使うことができるため、メンバーが増えたときや試しに触ってみたい場合に重宝します。ただ、Princing を見る限りもちろん決して安くないので、どこまで本格的に使うかは考え所ですね。環境を揃えたいだけなら VS Code の devcontainer 機能を使うだけで良いかもしれません。

[^free]: Organization の Free プランはどうなるんでしょうね？試しに僕が所属しているフリープランの Organization のリポジトリを見に行ってみたのですが、普通に Codespaces を使うことができました。9/10 までは無料だからフリープランでも使えるということなのだろうか...？パブリックリポジトリだから無料というわけでもないようだし。

## インフラを意識せずにSaaS開発ができる 次世代PaaS「Hacobune」のオープンβ版を2021年8月12日に無料提供開始 ～8月27日にオンライン発表会を開催～ | さくらインターネット
https://www.sakura.ad.jp/information/announcements/2021/08/12/1968207782/

さくらインターネットが PaaS 型クラウドサービス Hacobune のオープンβを公開しました。オープンβ期間が終わるまでは無料で利用できます。

Docker イメージをまたは GitHub リポジトリに Dockerfile を指定することで、簡単にコンテナをデプロイし、公開できます。基盤に Kubernetes を使っており、障害時などでのスケールアウトを自動で行ったり、Pull Request をトリガーに検証環境を自動構築（今後のアップデートで対応）したりといった嬉しい機能もついています。

類似サービスとしては [Heroku](https://devcenter.heroku.com/ja/categories/deploying-with-docker) や [GCP Cloud Run](https://cloud.google.com/run/?hl=ja)、[AWS ECS](https://aws.amazon.com/jp/ecs/?whats-new-cards.sort-by=item.additionalFields.postDateTime&whats-new-cards.sort-order=desc&ecs-blogs.sort-by=item.additionalFields.createdDate&ecs-blogs.sort-order=desc) などがありますが、Hacobune はそれらよりもより手軽にコンテナアプリケーションを公開できるという特徴があるように思えます。

とにかく手軽にスケーラブルなコンテナアプリケーションを公開できるのが嬉しいですね。当分は無料そうなので機になる人は今のうちに使ってみましょう。

## 🤫  New shortcut: Press . on any GitHub repo.
https://twitter.com/github/status/1425505817827151872?s=20

GitHub.com において、リポジトリの Code 画面で `.` を押すとリポジトリのコードを Web 版の VS Code で編集できるようになりました[^muzui]。

簡単な変更を入れたい場合、GitHub の Web UI 上でさっさと編集してコミットしたいことがあります。GitHub 上のエディタはただのテキストエディタ[^workflow]なので正直なところ使いづらいです。github.dev ではシンタックスハイライトや自動補完、コードジャンプが有効になっていたり（一部の言語）、改行時に自動でタブを入れてくれたりするので、編集がしやすいです。また、拡張機能も一部対応しています。

似たような機能に Codespaces がありますが、github.dev はターミナルや一部の拡張機能しか使えないといった違いがあります。あくまで GitHub.com よりちょっとリッチになった簡易エディタという位置付けのようですね。詳しくは以下のサイトが参考になります。
[「.」で起動するgithub.devとGithub Codespacesの違い - Qiita](https://qiita.com/ku_suke/items/07deb49dba04bdc36216)

色々と便利そうではあるのでカジュアルに使っていきたいですね。

[^muzui]: 説明がむずいですね。
[^workflow]: GitHub Actions のワークフローファイルなど、その場で lint してくれる場合もあります。

# know-how 🎓

## Keeping your GitHub Actions and workflows secure Part 3: How to trust your building blocks | GitHub Security Lab
https://securitylab.github.com/research/github-actions-building-blocks/

GitHub による GitHub Actions のセキュリティについての記事 Part 3 です。この記事ではワークフローで使える `GITHUB_TOKEN` の権限を最小にする話とアクションを参照する上での注意が解説されています。

`GITHUB_TOKEN` はデフォルトでリポジトリのあらゆる `write` 権限を持っています。アクションは `GITHUB_TOKEN` を参照できるため、悪意のあるアクションや侵害されたアクションはリポジトリに対して悪意のあるコードをコミットしたりできてしまいます。

もしそうなってしまった場合に被害を最小限に抑えるためにも、デフォルトの権限を `read` のみにして、必要ならワークフローの設定で追加の権限を許可することが記事では推奨されており、その方法が載っています。（だったらデフォルト `read` 権限にしてくれよ言いたくなりますが）

アクションの参照については最も安全な方法として、コミットハッシュを参照したり、アクションをフォークしたりといった方法が紹介されています。セキュリティアップデートを手動で行わなければならなくなるため利便性とのトレードオフとなってしまいますが、フォークしていない限りは Dependabot による更新プルリクエスト作成を設定できることも記事に書かれています。

GitHub Actions は便利である反面、サプライチェーン攻撃に対して自衛していかないといけません。セキュリティと利便性はトレードオフとなりがちですが、セキュリティリスクに対してどれくらい対応するか、どう対策するかを考える上でこの記事は参考になると思います。Part 1、Part 2 もおすすめです。

## GitHub’s Engineering Team has moved to Codespaces | The GitHub Blog
https://github.blog/2021-08-11-githubs-engineering-team-moved-codespaces/

GitHub が GitHub.com の開発環境を Codespaces に移行したという話です。

元々はローカルの Mac で開発環境を構築していたのですが、半日ぐらいかかる上、壊れることも多く、Slack で相談が発生していました。そんな中生まれた Codespaces に移行したところ、最初は GitHub.com リポジトリのクローンや依存関係の設定に 45 分以上かかっていましたが、これを 45 分->5 分->10 秒で起動できるように改善しました。また、Vim や Emacs を使いたいユーザ向けに sshd を立てシェルでのアクセスも対応したとのことです。

間違いなく大規模な GitHub.com の開発環境が Codespaces に移行したというのは驚きました。Codespaces の導入事例として参考にできそうです。

## メルカリ Shops の CI/CD と Pull Request 環境 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20210817-mercari-shops-ci-cd-pr-env/

メルカリのプロダクトであるメルカリ Shops の CI/CD 環境、プルリクエストごとのデプロイ環境についての紹介記事です。CI に GitHub Actions Self-hosted runners を導入したことや、プルリクエストごと作るテスト環境でどのようにコンポーネント間の通信を実現するかなどの話が盛り込まれています。

高速化するため（GitHub-hosted runners の速度じゃ満足できなくなった）、CI/CD 環境をよりセキュアにするため（クレデンシャルを閉じたネットワークでコントローラブルに保管するなど）といった理由で Self-hosted runners を利用することにしたとのことです。また、開発環境用ランナーと本番環境用ランナーを分離し、GitHub Actions の Environments 機能でデプロイにメンバーの承認を必要とすることで、さらにセキュアにするための工夫も書かれています。

Self-hosted runners を有効活用しており、参考にできそうです。また、その他にも CI/CD に関するテクニックが書かれているのでそちらもおすすめしたいと思いました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [New – Amazon EC2 M6i Instances Powered by the Latest-Generation Intel Xeon Scalable Processors | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/new-amazon-ec2-m6i-instances-powered-by-the-latest-generation-intel-xeon-scalable-processors/)
  - Amazon EC2 において、インスタンスタイプ m5 の後継となる m6i が使えるようになりました。m5 と比較してパフォーマンスが上がっています。（東京リージョンはまだ使えません..）
  - また、今後、Intel プロセッサを積んだインスタンスタイプには i の suffix が付くようです。
- [GitHub Actions: macOS 11 Big Sur is generally available on GitHub-hosted runners | GitHub Changelog](https://github.blog/changelog/2021-08-16-github-actions-macos-11-big-sur-is-generally-available-on-github-hosted-runners/)
  - GitHub Actions が macOS Big Sur に対応しました。
- [GitHub Discussions is out of beta | GitHub Changelog](https://github.blog/2021-08-17-github-discussions-out-of-beta/)
  - GitHub Discussions が GA になりました。
- [Organization Overview Page | GitHub Changelog](https://github.blog/changelog/2021-08-11-organization-overview-page/)
  - GitHub の Organization に Overview ページができました。
  - しかし、現状だと目新しい情報はなさそうです。
  - README が置けるようになってほしい。
- [Macアプリに使用されているフレームワークをAppKit、SwiftUI、macOS Catalyst、UIKit、Electronの5つから特定してくれるユーティリティ「5 GUIs」を使ってみた。](https://applech2.com/archives/20210813-5-guis-for-mac.html)
  - Mac アプリに使用されている Framework を教えてくれるアプリです。
  - iPhone/iPad 対応しているかどうかなども教えてくれます。
  - 単純に面白そうなのと、Mac アプリ開発者には役立つかもしれません。

# あとがき
ODC 資料作成（この後宣伝）やら [Ghost of Tsushima DIRECTOR’S CUT](https://www.playstation.com/ja-jp/games/ghost-of-tsushima/) やらで忙しい 1 週間でした。ツシマ DC 楽しいです。壱岐島編が割とボリュームあったり、ストーリーが仁さんの過去と絡み合っていたりで大満足でした。僕は PS5 版を買ったのですが、馬の足音などがコントローラの振動で伝わってきてなんかすごいです。

---

8/28（土）に Open Developers Conference 2021 Online というカンファレンスがあるのですが、生産性向上チームが登壇します！生産性向上チームの活動に興味のある方はぜひお越しください。他のセッションも面白そうなのが揃っています。楽しみですね。

https://twitter.com/Shitimi_613/status/1427547370976268292?s=20

---

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 「Google ブックマーク」が9月30日で提供終了 - 窓の杜
https://forest.watch.impress.co.jp/docs/news/1340527.html

Google ブックマークがサービス終了します。

Google ブックマーク？なにそれ？って思うかもしれません。僕もそうでした...

![](/images/productivity-weekly-20210818/g_bookmarks.png =700x)
*いにしえの Google マップお気に入り*

あ、ある...！

そこには過去僕が Google マップでお気に入りにしたなつかしの場所たちが並んでいました。懐かしい。

別に消えたところでどうということはないのですが、やっぱり懐かしの場所なんで消えてほしくないですね。（そもそも Google ブックマークと Google マップってどういう関係だったんだろう。最近のブックマークは入ってないし。）

消えてほしくない人はブックマークをエクスポートしてよしなにどこかへインポートしましょう...締め切りは 9/30（現地時間）です。

<!-- ### 株式会社リクルート　エンジニアコース新人研修の内容を公開します！（2021年度版） | リクルート　メンバーズブログ -->
<!-- https://recruit-tech.co.jp/blog/2021/08/20/recruit-bootcamp-2021/ -->

<!-- リクルート[^gatcha]が 2021 年度のエンジニア向け新人研修資料を公開しました。個人的にはブラウザの仕組みに関することや JS/TS、ToC、トヨタ生産方式が特に気になりました。それ以外のAWS -->

<!-- [^gatcha]: リクルートのどこだろう(テクノロジーズ？住まい？ライフスタイル？)と思ったのですがそういえばリクルート HD の子会社ってリクルートに吸収合併されたんでしたね。https://www.recruit.co.jp/newsroom/notification/2021/0105_18937.html -->