---
title: "Productivity Weekly (2023-07-26号)"
emoji: "🏪"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230726"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-07-26 号です。

今回が第 119 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## GitHub Actions: Update on save-state and set-output commands - The GitHub Blog
https://github.blog/changelog/2023-07-24-github-actions-update-on-save-state-and-set-output-commands/

GitHub Actions 初期の頃から存在する `save-state`, `set-output` というコマンドは[既に2022/10に Deprecated アナウンス](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/)が行われて廃止時期 2023/05/31 と名言もされていたのですが、今回延期が決定したようです。さらに今回のアナウンスでは延期後の次の廃止時期について明記されませんでした。

`save-state`, `set-output` を使っているワークフローは warning のアノテーションが出るものの引き続き利用できるとのことです。ただ、この 2 つの古い方法は既にドキュメントからも削除されています。過去にこれらを使用したワークフローや actions を作成していた場合は `GITHUB_STATE`, `GITHUB_OUTPUT` の環境変数を使用する新しい方式に移行しましょう。移行の具体的な方法は[前回のアナウンス](https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/)が参考になるはずです。

*本項の執筆者: [@kesin11](https://zenn.dev/kesin11)*

## GitHub Copilot Chat ベータ版がすべての組織で利用可能に - GitHubブログ
https://github.blog/jp/2023-07-24-github-copilot-chat-beta-now-available-for-every-organization/

GitHub において、GitHub Copilot Chat が GitHub Copilot for Business を契約している Organization で使えるようになりました（パブリックベータ）。

利用するには GitHub Copilot for Business を契約している Organization である必要があり、管理者による Chat の有効化が必要です。
また、Copilot Chat の利用をポリシーで制限することも可能です。

GitHub Copilot Chat は僕もクローズドベータの頃から使っていましたが、軽い質問はもちろん、コードの説明やテストケースの生成にも使えてとても便利です。
GitHub Copilot for Business を契約している組織管理者はぜひ有効化を検討してください。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# know-how 🎓

## GitHub の merge queue で 「マージ待ち」を解消した話 - Akatsuki Hackers Lab | 株式会社アカツキ（Akatsuki Inc.)
https://hackerslab.aktsk.jp/2023/07/20/183510

アカツキさんによる、7/12 に GA となったばかりの GitHub における [merge queue](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230222?redirected=1#pull-request-merge-queue-(public-beta)-%7C-github-changelog) の活用事例です。
merge queue があることで何が嬉しいのか、使ってみて出てきた問題とワークアラウンドなどが載っています。

アカツキさんのあるリポジトリには同時実行できず時間のかかる E2E テストが存在するため、マージするまでに待ち時間が発生してしまうという問題がありましたが、merge queue を使うことでその問題を解消できたとのことです。
同時実行できないテストがある際は、どうしてもマージ待ち行列ができてしまうと思うので、merge queue は効果的でしょうね。

merge queue は僕も以前探求したのですが、仕様がちょっと複雑で、慣れるまで手こずりました。記事内でも仕様について触れられており、普通に使うと「merge queue の為のジョブを 2 回実行しなければいけない問題」の話も書かれています。
僕もダミーのワークフロー・ジョブを用意することで回避したのですが、やっぱりこの方法しかワークアラウンドは無さそうですね...

merge queue 導入のメリットだけでなく、誰もがぶつかりそうな壁についての話も入っており、merge queue をまだゴリゴリに使ってない人には特に参考になると思いました。「マージ待ち」で困っている方は、ぜひ一度読んでみてください。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Github Merge Queueの何が嬉しいのか - ymtdzzz.dev
https://ymtdzzz.dev/post/merit-of-github-merge-queue/

こちらも GitHub における　merge queue の事例記事です。

先の紹介記事では、時間がかかって同時実行できないテストがある場合に効果的という話でしたが、こちらの記事では、デフォルトブランチの変更によりトピックブランチのテストが落ちるようになっても、rebase せずテスト失敗に気づけるという merge queue 活用話が書かれています。
丁寧に一作業ずつ説明されており、merge queue の上記のユースケースがわかりやすいです。

正直全く予想していなかった merge queue の使い方でした。最小プルリク数（`Minimum pull requests to merge`）を 1 にする理由が思い浮かんでなかったのですが、なるほどこういう時は便利ですね。
rebase の回数を減らせるのは楽で良いです（branch protection で `Require branches to be up to date before merging` を設定すればいいだけかもしれませんが、だとしても自動で rebase はしてくれないので便利だと思います）。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Git履歴をgit resetとgit rebaseで管理する（翻訳）｜TechRacho by BPS株式会社
https://techracho.bpsinc.jp/hachi8833/2023_07_24/131590

squash & merge だと巨大なコミットができてしまうので、reset & rebase を使って綺麗なコミットにしようという主張。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## AWS コストの最適化を検討する時、最初にチェックしたい定番の項目をまとめてみた（2023年夏版） | DevelopersIO
https://dev.classmethod.jp/articles/aws-cost-optimize-cheat-sheet-202307/

クラスメソッドさんが、AWS のコスト最適化を検討する際にチェックしたい項目をまとめています。
主要サービスごとにチェックリストがあり、それぞれのチェック項目に対して、どのように検討・対応すればいいか、推奨度合い、関連リンクが載っています。

例えば、以下のようなチェック項目があります。（これらは一例であり、多くの項目があります。）
- Amazon EC2: 停止または削除可能（利用頻度が低い・用途不明・代替可能）なリソースの有無
- Amazon S3: 不完全なマルチパートアップロードをクリーンアップ
- Amazon CloudWatch: Amazon CloudWatch Logs の利用状況（保存期間、利用状況、不要なログ）
- ...

どのように検討・対応すればよいかも箇条書きで簡潔に書かれており、とてもわかりやすいです。
サービスごとにまとまっているため、Cost Explorer などでコスト配分の大きいサービスから確認していくと良いかもしれませんね。

みなさんも AWS のコスト最適化、やっていきましょう。

:::message
何気にチェックリストの各サービスはすべて `Amazon` から始まるサービスでした。
Amazon〜 から始まるサービス名は、独立したサービスに付けられています（対して AWS〜 から始まるサービスは他のサービスを利用しています）。
料金体系も独立しているため、自然と `Amazon` から始まるサービスが多いリストとなったのかもしれませんね。

- [AWSサービス名の「AWS ○○」と「Amazon ○○」の違いを調べてみた | DevelopersIO](https://dev.classmethod.jp/articles/awsservice_naming/)
:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# tool 🔨

## Metrics for issues, pull requests, and discussions - The GitHub Blog
https://github.blog/2023-07-19-metrics-for-issues-pull-requests-and-discussions/

GitHub リポジトリの issue やプルリクエストの time to first response、time to close などのメトリクス集計ができる GitHub Actions のアクションが GitHub によってリリースされました。

https://github.com/github/issue-metrics

どれだけ早く issue やプルリクエストのに反応できてるかみたいな指標を GitHub Actions でお手軽に集計できます。
記事には使い方だけでなく、いろんな立場の人のためのユースケースも載っています。

僕の管理してるリポジトリに issue が活発なものはなかったので、プルリクエストを対象に実際に試してみました。

- [github/issue-metrics アクション触ってみる](https://zenn.dev/korosuke613/scraps/c801cb634bb42c)

全体の time to first response や time to close ももちろんのこと、どのプルリクエストに時間がかかったのかなどもわかり、なかなかおもしろいです。クエリを工夫して柔軟に集計できるのも良いですね。
ただ、得られたデータをどう活用するかは利用者の手にかかっているので、そこはがんばらないといけません。

OSS だけじゃなく、プライベートな製品リポジトリでも活用できそうです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Repository Rules are generally available - The GitHub Blog](https://github.blog/changelog/2023-07-24-repository-rules-are-generally-available/)
    - [先日紹介した GitHub の Repository Rules](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426?redirected=1#introducing-repository-rules-public-beta-%7C-github-changelog) が GA になりました
    - Repository Rules は Branch Protection の上位互換的な機能です
    - Repository Rules について解説してる記事はまだ少ないですが、次の記事が参考になります
      - [GitHub の Repository Rules を試してみる](https://zenn.dev/korosuke613/scraps/84794d9baed038)（僕のメモです）
      - [次世代ブランチ保護ルール リポジトリルールについて | AQ Tech Blog](https://techblog.asia-quest.jp/202304/next-generation-branch-protection-rules-about-repository-rules)
    - GitHub Enterprise ユーザーであれば、複数リポジトリに適用できる rule を作れたり、コミットやブランチの命名規則を強制できたりします
    - 今までチーム内でルールを遵守させるために commit hooks などを自作していた場合は、この仕組みに乗り換えると GitHub が自動でやってくれて便利だと思います
- **know-how 🎓**
  - [開発生産性の最新動向を知ろう！開発生産性Conference参加レポート #開発生産性con_findy | DevelopersIO](https://dev.classmethod.jp/articles/development-productivity-conf-report-sato/)
    - 先日 Findy さん主催で開発生産性 Conference 2023 というイベントが開催されました
    - この記事は、クラメソさんによる参加レポートになります
    - クラスメソッド所属の佐藤さんが参加した登壇内容の抜粋や、面白かったポイントなどが書かれています
    - 僕は参加しなかったので内容をざっくり知れてよかったです（資料が全て公開されているわけでもなさそうだし）
  - [Go1.21 New Features](https://zenn.dev/koya_iwamura/articles/0f24b53dcc179f)
    - Go1.21 が 8 月リリース予定ですが、この記事ではどういう変更があったかを書いてくれています
    - 気になる変更点は次のようなものです
      - 1.21 から最初のバージョンが 1.x ではなく 1.x.0 のようにパッチバージョン込みになる
      - ビルトイン関数 `max`、`min` が追加
      - 構造化ログ、ログレベルを指定可能な logger こと、log/slog パッケージが追加
    - リリースが楽しみですね
  - [Google Online Security Blog: Supply chain security for Go, Part 3: Shifting left](https://security.googleblog.com/2023/07/supply-chain-security-for-go-part-3.html)
    - Go のサプライチェーンセキュリティを説明する Google Security Blog 第 3 弾、Shift left[^shift_left]に関する記事です
    - CI でリリース前に脆弱性チェックを走らせると、開発時点では脆弱な依存の上で行われてしまうので脆弱な依存を用いる時間が長くなります
    - したがって、開発段階から手元でセキュリティに関するチェックを回しましょうという話です
    - そして、Go は govulncheck や fuzz test、VSCode の Go 拡張機能などによる Shift left のためのサポートが豊富とのこと
- **tool 🔨**
  - [Google、iPaaS「Application Integration」正式リリース。Salesforceやkintone、BigQuery、MySQLなど多数のサービスをGUIで接続 － Publickey](https://www.publickey1.jp/blog/23/googleipaasapplication_integrationsalesforcekintonebigquerymysqlgui.html)
    - Google が Integration PaaS[^paas]のサービス「Application Integration」をリリースしました
    - IFTTT とか Zapier が多分近いのかな
    - ちなみに弊社（サイボウズ）のサービスである Kintone にも対応してます

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^shift_left]: セキュリティに関する施作を開発の早い段階で組み込むこと。参考: [シフトレフトとは - 意味をわかりやすく - IT用語辞典 e-Words](https://e-words.jp/w/%E3%82%B7%E3%83%95%E3%83%88%E3%83%AC%E3%83%95%E3%83%88.html)
[^paas]: PaaS は Platform as a Service の略です。Integration PaaS は各プラットフォームを組み合わせられるサービスを指すらしいです。

# あとがき
今週号でした。最近遅めだったけどちょっと早く出せたぞ（ホンマか？）

最近日光に初めて行ったのですが、車でドライブで行くのにちょうど良い距離でなかなかよかったですね。
でっかい滝[^kegon]がでっかくて今でも頭の中で水飛沫を感じられます。
時間の都合で日光東照宮には行けなかったので、リベンジ日光マッチをしたいですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

[^kegon]: 華厳滝（けごんのたき）というらしいです。詳しくはググってください。

<!-- :::message すみません、今週もおまけはお休みです...:::-->

##  【現地orオンライン(予定)】GitHub dockyardコミュニティ 竣工イベント！ - connpass
https://github-dockyard.connpass.com/event/289714/

2023/08/05（土）に「GitHub dockyard コミュニティ竣工イベント！」というイベントが開催されます。

~~銀座にある GINZA SCRATCH で開催予定です。（オンライン配信も予定されています）~~
茅場町のコワーキングスペース茅場町 Co-Edo で開催予定です。（オンライン配信も予定されています）

GitHub の開発者向けコミュニティイベントとのことで、GitHub 製品に精通している方々によるセッションがいくつかあります。
生産性向上チームからも登壇者がいます。楽しみですね。

個人的には GitHub Project をあまり追っかけられていないので、「自称日本一 GitHub Projects を使っているので魅力を伝えたい！」が気になりますね。
とはいえ残念ながら僕はイベントを知る前から先約が入っていたため、参加できません。残念 🥲

気になる方はぜひ参加してみてください！
