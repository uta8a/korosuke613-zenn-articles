---
title: "Productivity Weekly (2021-11-08号)"
emoji: "🎉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211108"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 50 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message
本当は 11/10（水）に開催されるはずでしたが、その日はサイボウズのハッカソンの日だったため、11/08（月）に行われました。

また、その 1 週間前の水曜日である 11/3（水）は祝日だったため、今回のネタは約 2 週間分となっています。
:::

# news 📺

## Scheduled Pipelines Are Here - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/topic/41687

CircleCI で Scheduled Pipelines 機能が公開されました（プレビュー）。

Scheduled Pipelines はパイプラインを定期的に実行する機能です。ワークフローを定期的に実行するための既存の方法として Scheduled Workflows がありますが、[dynamic config](https://circleci.com/docs/ja/2.0/dynamic-config/) などとの互換性がないため将来的に deprecated[^deprecated]となる予定とのことです。（記事中に FAQ もあるのでそちらもご覧ください。）

設定方法は現在 API のみです（正式リリース時には UI でも設定可能になる予定）。したがって、これまでと違って `config.yml` での設定はできなくなります。また、スケジュールの指定方法が Cron 形式でなくなるなどの違いもあります。

既存の方法と全く異なるため利用前にいろいろ検証してみたくなりますね。スケジュール設定をコードで管理できなくなるのはちょっと気になるところです。いろいろ試してみたいですね。

[^deprecated]: こちら日本語訳記事では「廃止」と表現されていましたが、原文では「deprecated」となっているため、おそらく非推奨として Scheduled Workflows 自体は残るかと思われます。

## CircleCI の Free プランがよりパワフルに！フレキシブルに！

https://twitter.com/CircleCIJapan/status/1456069942957199363
https://twitter.com/CircleCIJapan/status/1456433594893754371

:::message
この件は利用者に届いたメールの内容と上記ツイート内容、[princing](https://circleci.com/ja/pricing/) 内容を元に書いています。正式な発表等が出ましたらそちらをご参考ください。
:::

CircleCI の [Free プラン](https://circleci.com/ja/pricing/)が改定されて、できることが増えたようです。その代わり、恐らく制限（後述）も増えたようです。

変更点は以下です（以前の Free プランの内容を見つけられなかったので、うろ覚えの差分も書いています）。

- 30 倍の同時実行性
  - おそらく以前の Free プランでは）1 倍
- Docker、Linux、Windows のリソースクラスを拡大
- 最大 5 つのセルフホストランナー
  - おそらく以前の Free プランでは）1 つも使えなかった
- Docker でのビルドの高速化
- 結果が不安定なテストの把握
- プライベート Orb が無制限に使える
  - おそらく以前の Free プランでは）1 つも使えなかった
  - Performance プランでも 3 つまでだったはず
- macOS Executor（ミディアム）（近日追加予定）

とてもパワフルに、フレキシブルになってこれはすごいぞという感じですね。
その代わり、以下のような制限も加わるようです（もともとどういう感じだったか全く覚えていませんが、もうちょっと余裕あったような）。

- ネットワーク：1 GB/月まで
- ストレージ：2 GB/月まで
- ビルドタイムアウト：1 時間（11 月 15 日より適用）

特に同時実行性が 30 倍になったのが驚きです。プライベート Orb もですが、セルフホストランナーの利用もできるようになるのは攻めた変更だなと思いました（そのために有料プランを使っているところもありそうなので）。しかし、ネットワーク、ストレージの制限は割と簡単に到達しそうな気がしたので、人によっては無料で使い続けるのはむずいかもしれません。

とにかく、基本的には今までよりも Free での利用がしやすくなりそうな変更です。内容をしっかりと確認しておきたいですね。


## Command palette beta | GitHub Changelog
https://github.blog/changelog/2021-10-27-command-palette-beta/

GitHub でコマンドパレットが使えるようになりました（beta）。

コマンドパレットを使うことで目的のリポジトリや Issue を素早く検索したり、特定のコマンドを実行できたりできます。ファイル検索(`/`)や issue 検索(`#`)で利用するプレフィックスが違うため、覚えておいて素早く目的のリソースへ移動できるようにしたいですね。

## Enterprise organizations can now create custom repository roles | GitHub Changelog
https://github.blog/changelog/2021-10-27-enterprise-organizations-can-now-create-custom-repository-roles/

GitHub Enterprise Cloud において、任意の権限を付与したリポジトリロールを作成できるようになりました(beta)。作成したリポジトリロールはカスタムリポジトリロールと呼びます。

カスタムリポジトリロールは Organization に対して作ることが可能で、Organization 配下のリポジトリで利用できます。そして、従来のリポジトリロールと同じく、リポジトリ管理者はユーザやチーム、アウトサイドコラボレーターに対してカスタムリポジトリロールを付与できます。

[公式ドキュメント](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/managing-custom-repository-roles-for-an-organization#custom-role-examples)には以下のようなカスタムリポジトリロールの例が載っています。

- Security engineer（Maintain が code scanning 結果を自由にいじれるようなロール）
- Contractor（Write が Webhook の管理ができるようなロール）
- Community manager（Read がコミュニティとのやりとりをこなせるように）

ある特定の作業しかしない人や bot ユーザに対してはやはり必要最小限の権限のみを渡したいので、専用のロールを作成できるようになるのは嬉しいですね。うまく使っていきたいです。

## Pull Request Merge Queue Limited Beta | GitHub Changelog
https://github.blog/changelog/2021-10-27-pull-request-merge-queue-limited-beta/

GitHub において、プルリクエストのマージをキューで管理する merge queue の limited beta が発表されました。

マージキューは活発に開発されているリポジトリにおいて、プルリクエストのマージを高速化するためのものです。

常に最新のベースブランチにマージしたい場合、CI を待っている間に他のプルリクエストがマージされると、ベースブランチでリベースし、再度 CI を待つ必要があります。活発に開発されているリポジトリでは、複数のプルリクエストが並行して開発されているため、これが何度も起こってしまいなかなかマージできないという問題があります。

承認と必要なステータスチェックに合格したプルリクエストをマージキューに追加すると、最新のベースブランチと先行するプルリクエストを全て含む一時的なブランチが作成され、CI によるチェックが行われます。先頭のプルリクエストのチェックが通ると、そのプルリクエストがマージされます。キュー内のプルリクエストのチェックは並列に行われるため、次のプルリクエストもチェックが通り次第即座にマージがされます。自身より前にあるプルリクエストのコミットが全て含まれたブランチでチェックを行っているため、再度 CI を走らせる必要がなくなり、プルリクエストのマージを高速に行えるという仕組みです。

また、キュー内でプルリクエストが失敗した場合、そのプルリクエストはキューから削除されます（おそらく後続のプルリクエストは再度チェックされることとなります）。

なかなか説明が難しいですが、活発に開発されているリポジトリでは非常に有用なものとなるでしょう。この機能はまだ limited beta であるため、利用したい方は登録してみてください[^register]。

[^register]:マージキューが必要とされるようなリポジトリを入力する必要があるようです。

## GitHub Actions: Conditional execution of steps in actions | GitHub Changelog
https://github.blog/changelog/2021-11-09-github-actions-conditional-execution-of-steps-in-actions/

GitHub Actions の Composite Actions（いわゆる複合条件アクション）で if が使えるようになりました。もし条件に満たなかった場合はステップをスキップするなどができます。

むしろ今までできなかったことを知りませんでした。さらにアクションが使いやすくなりますね。

## GitHub Actions: Secure cloud deployments with OpenID Connect | GitHub Changelog
https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/

以前紹介した [GitHub Actions の OpenID Connect 対応](https://zenn.dev/korosuke613/articles/productivity-weekly-20210922#aws-federation-comes-to-github-actions-%7C-aidan-steele%E2%80%99s-blog-(usually-about-aws))ですが、公式にサポートがアナウンスされました。

公式にサポートされることによって業務での利用もしやすくなりました。利用していきたいですね。

## Record, replay and measure user flows - Chrome Developers
https://developer.chrome.com/docs/devtools/recorder/

Google Chrome の開発者ツールでブラウザ操作の記録・再生ができるようになりました（Canary でのみ有効）。

ブラウザ操作の記録・再生といえば [Selenium IDE](https://www.selenium.dev/ja/documentation/legacy/selenium_ide/) が有名です。Selenium IDE は別途拡張機能などをインストールする必要がありましたが、開発者ツール単体でブラウザ操作の記録・再生ができるので、お手軽に使用できます。

また、記録内容は [Puppeteer](https://github.com/puppeteer/puppeteer) のスクリプトとしてエクスポートできます。Puppeteer を利用している場合、E2E テストコードを作成する際の手間が省けそうで良いですね。

# know-how 🎓

## 最小権限のIAM Policy作成にCloudFormationのコマンドが役立つ | DevelopersIO
https://dev.classmethod.jp/articles/using-cfn-describe-type-for-least-privilege/

AWS のリソースの各種操作に必要な権限を取得するための CloudFormation のコマンドについて解説した記事です。

`aws cloudformation describe-type` というコマンドで対象リソースの各種操作（create/read/update/delete/list）に必要な権限が取得できるとのことです。記事では、具体的なコマンドおよび実行例、結果の読み方などが書かれています。また、対応しているリソースについても書かれています（残念ながら全リソースには対応してないようです）。

CloudFormation にこんな便利なコマンドがあったんですね。IAM Policy を作る際に必要な権限のみにすることってなかなか難しいです。思ってもみない権限が必要になり、後から追加みたいなことをよくやりがちです。全てのリソースに対応はしてないようですが、IAM Policy を作る上でとても役立ちそうですね。

## 10 GitHub Actions resources to bookmark from the basics to CI/CD | The GitHub Blog
https://github.blog/2021-11-04-10-github-actions-resources-basics-ci-cd/

GitHub 公式ブログによる、GitHub Actions の基本的な学習リソースへのリンク集です。GitHub Actions で何ができるか、どうやってやるかをなんとなく学ぶことができます。

気になるトピックを深掘りできるので、これから GitHub Actions を始める人にもおすすめできそうです。また、GitHub Actions 初心者に対してこれを参考に勉強してもらっても良いかもしれません。

# tool 🔨

## GitHub上にあるリポジトリに対してAPIを通じてgit grepライクに走査できるツール gh-grep (gh grep) を作った - Copy/Cut/Paste/Hatena
https://k1low.hatenablog.com/entry/2021/11/02/083000

GitHub のリポジトリを横断して grep する git grep[^gitgrep] ライクなツールを作ったという記事です。Owner を指定することでリポジトリを横断してファイルを検索できます。

Web UI からの検索と違って、正規表現を使えることや、結果をそのまま別のコマンドに食わせるといったことをできるのが嬉しいですね。記事ではインストール方法や使い方が載っています。利用例にある「使っている Action をリストアップする」が便利そうです。

どうしても GitHub の API をゴリゴリ叩いていることから実行速度が遅いという難点もありますが、なにかをリストアップする際にとても便利に使えそうです。

[^gitgrep]: git リポジトリ内の追跡ファイルのみ grep できる git のサブコマンドです。コミットを指定して検索することも可能です。grep と git grep の違いは [第12話 git grepと普通のgrepってどう違うの？【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20200605_1) がわかりやすいと思います。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [GitHub Universe 2021 - GitHubブログ](https://github.blog/jp/2021-10-28-universe/)
  - GitHub Universe 2021 のまとめ記事です。
  - Universe 内で発表された GitHub の新機能などの概要が載っています。日本語で書かれているため手軽に読めます。
- [The new GitHub Issues - Public Beta | GitHub Changelog](https://github.blog/changelog/2021-10-27-the-new-github-issues-public-beta/)
  - GitHub の新しい Issues 機能が public beta になって誰でも試せるようになりました。
- [More flexible autolinks | GitHub Changelog](https://github.blog/changelog/2021-11-04-more-flexible-autolinks/)
  - GitHub のオートリンクのプレフィックスに、英数字だけでなく記号も使えるようになりました。
- [Updates to our issue status icons and colors | GitHub Changelog](https://github.blog/changelog/2021-10-26-updates-to-our-issue-status-icons-and-colors/)
  - GitHub の issue close アイコンが赤から紫に変わりました。
  - エラーと見間違える、open が緑で close が赤なのは混乱する、アクセシビリティ的な懸念、close されるのはよいことなのに赤が並ぶのは怖い、といった理由だそうです。
- [GitHub Copilot Technical Preview is available now for developers on the @jetbrains IntelliJ platform of editors including](https://twitter.com/github/status/1453387348692119558)
  - AI パワーでコードを補完する GitHub Copilot が JetBrains IDE でも使えるようになりました。
  - ちなみに [NeoVim でも使えるようになりました](https://github.com/github/copilot.vim)。
- [AWS Secrets Manager はアカウントあたりのシークレット数の制限を 500K に増加](https://aws.amazon.com/jp/about-aws/whats-new/2021/11/aws-secrets-manager-increases-secrets-limit-per-account/)
  - 以前は 40000 個までだったようです。そんなに使うところがあったんですかね。

# あとがき
冒頭で書いた通り 2021/11/08 号は 2 週間分のネタが詰まっています。とても多くてとても疲れました。また、[先週はサイボウズ社内でハッカソンがあった](https://twitter.com/hashtag/cybozuhackathon)り、メガテン 5 が発売されたりと忙しかったため、今回も遅れてしまいました。

実は今週号は 50 回目なので、とうとう Productivity Weekly を記事にしだしてから 1 年経ったことになります[^productivity_1st]。よく 1 年も続いたなあ。毎週書くのはなかなか大変で、最近は遅れがちとなってしまっていますが、今後も誰かの生産性を上げるのに役立てばなと思い、続けていくつもりです。

今後ともよろしくお願いします。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

[^productivity_1st]: [記念すべき第 1 回](https://note.com/korosuke613/n/n3973feebf201)は実は Zenn ではなく note で書いてました。その後 Zenn へ移ることになります。 ~~note のエディタは Markdown に慣れてる自分にとってあまりにも辛いものだった。~~

## omake
今週のおまけです。

### 1 周年を記念して（？）Zenn のユーザアイコンを変えました
謎のアイコンから僕が Twitter や GitHub で使っているアイコンに変更しました。

![](/images/productivity-weekly-20211108/sugi-chan.jpg =150x)
***~Before~***
*高校の頃の友達をキャラクタにしたときの絵*

![](/images/productivity-weekly-20211108/itsumono.jpg =150x)
***~After~***
*フォトショを勉強している時期に自分の顔写真をなんか加工したときの絵*

### メガテン 5 がおもしろいです
https://megaten5.jp/

真・女神転生 V（いわゆるメガテン 5）というゲームがつい先日、 11/11 に発売しました。[このゲームは 2017 年 10 月に発表された](https://www.atlus.co.jp/news/6170/)ので、4 年近く待ったわけですね。いやー長かった。メガテン 5 を土日にやってたおかげで 2021/11/08 号は遅くなりました。

メガテン 5 は真・女神転生シリーズの 1 つで、5 番目のナンバリング作品となります。内容としては東京に現れた悪魔を仲間（仲魔）にして、他の悪魔とかと戦っていくという RPG です。~~ポケモンが好きな人は好きかも。~~

メガテンの面白いところは自分の行動次第でルートが変わることです。ルートによって敵も味方も変わります。だいたい天使陣営（Law）か力こそ正義悪魔陣営（Chaos）のどっちかにつくかそのどちらにもつかない(Neutral)かで分岐します。Law と Chaos、どちらが人類にとって幸せなのかっていうのを考えさせられるのが面白いですね。

ゲームシステム面も面白くて、ナンバリングによって割と変わるのですが、悪魔と交渉して仲魔にするところや悪魔同士を合体させてもっと強い悪魔にする部分は一貫しています。気に入った悪魔を仲魔にするのは楽しいですね。また、少し選択を間違えると弱点を突かれたりムド系（即死）を決められていきなりゲームオーバーになるのもスリリングで良いです。

出てくる悪魔も世界中の神話や宗教に登場する神や悪魔などがモチーフとなっているため、神話や宗教に詳しい方にとっては別の意味で楽しめます[^god]。

メガテンのこと、少しでも気になった方はぜひ遊んでみてください。5 は Switch で発売中ですし、なんと [1](https://www.nintendo.co.jp/software/feature/nintendo-classics/detail/index.html?vcid=S-2147_j)、[2](https://www.nintendo.co.jp/software/feature/nintendo-classics/detail/index.html?vcid=S-2148_j)、[3](https://store-jp.nintendo.com/list/software/70010000027614.html)、[if](https://www.nintendo.co.jp/software/feature/nintendo-classics/detail/index.html?vcid=S-2149_j) も Switch で遊べます（4 や SJ は DS 系）。

早くこの Weekly を投稿してメガテン 5 の続きを遊びたいです。


[^god]: たまに怒られそうなものもあります。


