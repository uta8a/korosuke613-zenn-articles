---
title: "Productivity Weekly (2021-11-17号)"
emoji: "🦀"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211117"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 51 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Datadog Delivers Industry-First Observability for Software Build and Testing Pipelines | Datadog
https://investors.datadoghq.com/news-releases/news-release-details/datadog-delivers-industry-first-observability-software-build-and/

Datadog の CI Visibility 機能が 10 月末に正式にリリースされました。

[以前、Datadog の CI Visibility 機能をチラッと紹介しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#set-up-tracing-on-a-circleci-workflow)。その時はまだ beta 扱いで、まだ料金とかはわかっていませんでした。

CI Visibility は、CI パイプラインで問題が発生したときに、問題が発生した理由や解決方法を特定するのに役立つ Insight を提供することで、効率的で信頼性の高いパイプラインを維持できると Datadog は述べています。

CI Visibility には以下の機能があります。
- Pipeline Visibility: パイプラインの可視化
- Testing Visibility: テストの可視化
- 高度なパフォーマンス解析
  - パフォーマンス低下を特定し、不具合のあるテストを導入したコミットを表示
  - テスト結果をログやネットワークパフォーマンスデータと関連づけ
  - etc..
- 各 CI プロバイダ、言語のサポート
  - CircleCI、GitHub Actions、Jenkins、...
  - Java、JS、Python、Swift、...

正式リリースされたことで利用料金が明らかになりました。ユーザ課金のようです。（ちょっとお高いなとは思いました。）

- Pipeline Visibility: $20/user〜
- Testing Visibility: $20/user〜
- Pipeline + Testing Visibility: $30/user〜

これまで Beta 版だったので業務利用がなかなかしづらかったと思いますが、これで業務でも積極的に利用していけそうです。リッチな解析機能を使うことでテストパフォーマンス、ワークフローパフォーマンスを高めていくことができそうですね。

## GitHub Actions: Input types for manual workflows | GitHub Changelog
https://github.blog/changelog/2021-11-10-github-actions-input-types-for-manual-workflows/

GitHub Actions でワークフローを手動実行する際(`workflow_dispatch`)に指定できる入力パラメータの種類が増えました。今までは純粋な文字列である `string` だけでしたが、これからは、`choice`、`boolean`、`environment` も選べます。

`choice` はセレクトボックスを提供します。決まった複数の選択肢から選べます。`boolean` はチェックボックスを提供します。チェックすると `true`、しないと `false` となります。`environment` はあらかじめ用意した GitHub Actions の Environment から環境を選択し、Secrets を切り替えることが容易にできます。ユーザからの自由な入力を受け付けたいときや、あらかじめ用意できないような入力は従来通り `string` で対応すればよいです。

入力の種類は `on.workflow_dispatch.inputs.<inputs_name>.type` で指定します。`type` が存在しない場合は（おそらく互換性維持のため）`string` となるようです。

これまではこういった選択肢や true or false は全て自由な入力(`string`)として受け付けていたため、ユーザ目線だと入力が面倒だったり、ワークフロー内でバリデーションチェックを行う必要があったりしました。今回のアップデートで `workflow_dispatch` がますます使いやすくなって良いですね。

また、今回の更新について検証した記事が Zenn に上がっていたので、こちらも参考にできると思います。

https://zenn.dev/kesin11/articles/13ca0f40e1eaa0

## Require pull requests without requiring reviews | GitHub Changelog
https://github.blog/changelog/2021-11-10-require-pull-requests-without-requiring-reviews/

GitHub の branch protection（ブランチ保護）において、レビュー不要でプルリクエストを強制できるようになりました。

これまではプルリクエストを強制する（=`Require a pull request before merging` を有効にする）と 1 人以上のレビューを必須にする `Require approvals` も有効になってしまっていたため、プルリクエストを強制はしたいけど、レビューは無しでも良いというユースケースには対応できていませんでした。

今回の変更により、プルリクエストを強制するが、レビューは強制しないことができるようになったため、モブや 1 人で開発してるリポジトリもプルリクエストを強制できるようになりました。地味にとても嬉しい変更です。個人開発が捗りますね。

## The GitHub Enterprise Server 3.3 Release Candidate is available | GitHub Changelog
https://github.blog/changelog/2021-11-09-the-github-enterprise-server-3-3-release-candidate-is-available/

https://github.blog/2021-11-09-GitHub-Enterprise-Server-3.3-enhances-CI-CD-and-adds-a-new-security-manager-role/

GitHub Enterprise Server 3.3 が Release Candidate（リリース候補）としてリリースされました。

3.3 では主に以下の機能が GitHub Enterprise Server にやってきます。

- ハイコントラストなダークテーマ
- [[GitHub Actions] ephemeral self-hosted runners](https://zenn.dev/korosuke613/articles/productivity-weekly-20210915#support-the---ephemeral-flag-(%23660)-%C2%B7-actions%2Frunner)
- [[GitHub Actions] `workflow_job` webhook](https://zenn.dev/korosuke613/articles/productivity-weekly-20210922#github-actions%3A-ephemeral-self-hosted-runners-%26-new-webhooks-for-auto-scaling-%7C-github-changelog)
- [[GitHub Teams] security manager role](https://zenn.dev/korosuke613/articles/productivity-weekly-20211027#introducing-the-organization-level-security-manager-role-%7C-github-changelog)

使い捨てランナー(ephemeral self-hosted runners) が GHES で使えるようになるのは嬉しいですね。正式リリースが待ち遠しいです。

# know-how 🎓

## RIP Copy and Paste from Stackoverflow! 🚨 (+Trojan Source Solution) - DEV Community 👩‍💻👨‍💻
https://dev.to/dotnetsafer/rip-copy-and-paste-from-stackoverflow-trojan-source-solution-4p8f

インターネット上に転がっているコードをコピペして利用すると、文字コードを巧みに利用した見えない悪意のあるコードが隠されている可能性があるため、コピペは辞めよう(RIP)という記事です。

例えば、記事中にある以下のコードは見た感じ if 文の内部には入らず、`Console.WriteLine("You are an admin.");` は実行されません。

![](/images/productivity-weekly-20211117/rip-copipe-copy.png)
*記事中のコード（あえて画像として貼り付けてます）*

しかし、実際に実行すると `Console.WriteLine("You are an admin.");` が実行されてしまいます。

これは、`if (access_level != "user") //Check if admin` に通常で見えない特殊な文字が隠れているためです。

![](/images/productivity-weekly-20211117/rip-copipe-paste.png)
*上記コードを VS Code に貼り付けた様子。僕の環境では見えない文字を強調してくれました。*

特殊な文字を表示してくれるエディタを見ると、`U+2066`[^u2066]という Unicode 文字が隠れていることがわかります。

こういった特殊な文字を利用することで、ソースコードに悪意のあるコードを埋め込めることができます。こういった隠れた文字はエディタ等で警告や強調をすべきと筆者は述べています。

記事では、この手法の紹介、仕組み、見つけ方（ただし C#）について紹介しています。また、GitHub はこういった隠れた文字を警告する機能があることも書かれています。

コードを読んで大丈夫と思ってコピペしたコードが実は全く異なるものだったというのはなかなか怖いですね。気をつけていきたいものです。

[^u2066]: 調べてみたところ双方向文字リテラルという、右から左に文字が流れるアラビア文字などで使われる文字のようです。正直あんまりよくわかってない。

## GitHub's commitment to npm ecosystem security | The GitHub Blog
https://github.blog/2021-11-15-githubs-commitment-to-npm-ecosystem-security/

GitHub の npm エコシステムセキュリティ改善の取り組みについての記事です。

GitHub はアカウント乗っ取りやマルウェアなパッケージへ対抗するために、npm レジストリのセキュリティの確保に力を入れています。実際に以下のような活動を行なっているとのことです。

- マルウェア自動検出の改善
  - 最近の事例では、人気パッケージの乗っ取りに対して 10 分程度で検知・応答できている
- 人気パッケージのメンテなと管理者に対して 2FA（2 要素認証）を強制していく
- WebAuthn サポートの計画
- その他最近のセキュリティ問題への対処

記事では、それぞれの活動についての具体的内容が書かれています。

2FA に関しては最近一般ユーザにメールで有効にするようにお願いしていますね。僕のところにもメールが来たので 2FA を有効にしました。

最近はさまざまなサプライチェーン攻撃の事例をよく聞くため、レジストリ側でセキュリティ担保のために色々してくれているのは嬉しいですね。僕たちも認証の強化などに協力していきましょう。

## Make your monorepo feel small with Git’s sparse index | The GitHub Blog
https://github.blog/2021-11-10-make-your-monorepo-feel-small-with-gits-sparse-index/

git の sparse checkout において、index のサイズを抑制できるようになったことについての解説です。

`git sparse-checkout`[^sparse]とは、git リポジトリ内の一部のファイルのみチェックアウトするための仕組みです。一部のみチェックアウトすることで、リポジトリのサイズを小さくできます。大規模なモノレポではこういった機能が役に立ちます。

そんな `git sparse-checkout` は、blob を一部チェックアウトできますが、git の index は全てのファイルについて情報を持ってしまっているため、index のサイズは大きいままという問題があります。

この問題の改善のため `sparse-index` という sparse-checkout したときに index も必要最小限とするための仕組みが追加されました（`sparse-index` 自体は 2021/6 頃に追加されていたようです）。sparse-index を利用することで大規模なモノレポにおいて `git status` や `git commit` 時などにパフォーマンスを改善できたとのことです。

記事中には、git の index についてや `sparse-index` の仕組み、他のサブコマンドとの互換性などについて書かれています。

すでに多くの主要サブコマンドに対応していますが、`git diff` や `git blame` などは今後対応予定とのことです。

モノレポは多くのメリットがありますが、大規模になるとどうしてもリポジトリが肥大化してしまうという問題もあります。こういった機能をうまく使って開発しやすい環境を作っていきたいですね。

[^sparse]: sparse-checkout の詳細は右の記事を参照。https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/

# tool 🔨

## command-not-found.com
https://command-not-found.com/

特定のパッケージをどうインストールすればいいかを Linux ディストリビューション（+ mac）を横断して調べられるサイトです。

ディストリビューションごとに適したパッケージマネージャ（`brew` や `apt-get`、`yum` や `pacman` など）のインストールコマンドを出してくれます。コマンド名とパッケージ名が違う場合でも、正しいパッケージ名で教えてくれます。ちなみにパッケージのホームページも出してくれます。

普段触らない OS を触っていると、このパッケージどうやってインストールするんだっけとなりがちですが、手軽に調べることができるのは嬉しいですね。しかし、対応してないコマンドやディストリビューションがあることや、正式なインストール手順はホームページを見るべきではあるので、あくまでささっとパッケージを入れたいくらいの時に使うのが良さそうです。

## Okteto - The Kubernetes development platform | Okteto
https://okteto.com/

Okteto はクラウドネイティブアプリケーション（Kubernetes や docker-compose）の開発、プレビューを迅速に行うためのサービスです。

アプリケーション開発のための Kubernetes クラスタが提供されています。それだけでなく、プルリクエストからアプリのプレビューを自動で構築したり、簡単にローカルからコンテナ内に入れたりと、開発をスムーズに行うための機能があります。

特に面白いのが Kubernetes クラスタの提供です。なんと**無料**で 10 ポッドまで利用できます（他にもいくつか制限がある）。

Kubernetes の勉強をする際はクラスタの用意が割と面倒（ローカルマシンが重くなる、GKE などで検証用クラスタを立てると結構な金がかかるなどなど）ですが、そこをすっ飛ばしてクラスタが使えるのはとても嬉しいです。もちろんフルで使えるわけではありませんが、例えば各リソースの勉強をする場合などではある程度十分に使えるのではないでしょうか。

もちろん自信が開発するアプリケーションの開発時にも役立ちそうです。試してみたいですね。

## Lens | The Kubernetes IDE
https://k8slens.dev/

Kubernetes 用の IDE です。macOS、Linux、Windows に対応しています。各 context をまとめて管理でき、リソースや Node の状態を確認したり、操作したりできます。

kubectl のコマンドを覚えて普段から使ったほうがいいかもしれませんが、CPU 使用率などの統計情報を簡単にグラフで見られるのがやはり嬉しいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [「Twitter API v2」が正式なTwitterの主要APIに ～申請不要の無償アクセスレベルも追加 - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1366790.html)
  - とうとう Twitter API v2 が正式な Twitter の主要 API になったようです
  - 他にも Essential access という制限がかかったプラン？を使う場合は申請が不要で、API をさわれやすくなっているようです。
  - 今後、既存の v1.1 に関してはセキュリティアップデートのみとなります。
  - 余談）昔は v2 では肝心の Tweet ができなかったのですが、最近 Tweet するエンドポイントが追加されてました。
    - [Announcing manage Tweets endpoints for the Twitter API v2 - Announcements - Twitter Developers](https://twittercommunity.com/t/announcing-manage-tweets-endpoints-for-the-twitter-api-v2/161501)

# あとがき
年末が近づいていますね。ふるさと納税も忘れられません。僕はふるさと納税で福井県に寄付してカニをゲットしました。今年も早かった...

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### もはや研究者に必須のテクノロジーでは？翻訳サービスDeepLで『PDFファイルをそのまま翻訳』できるようになった - Togetter
https://togetter.com/li/1804476

みんな大好き、自然な翻訳ができることで有名な DeepL がとうとう PDF の翻訳をサポートしたようです。

PDF の翻訳なんてやる機会あるか？と思うかもしれませんが、学生含めた研究者は英語論文をめちゃくちゃ読みます。~~読まないとやってられない。~~もちろん僕も学生の頃は英語論文を読んでいましたが、僕は英語が苦手だったのでとにかく大変でした。

Web ページならともかく、PDF はレイアウト通りに改行が入ってしまいがちなのでコピペが大変です。コピーして、改行を消して、翻訳アプリにペーストして、結果を噛み砕きながら理解して、またコピーして...を繰り返す作業はなかなか大変です。

そんな PDF の翻訳が簡単にできるようになったのが DeepL の新機能です。なんとレイアウトを崩さずに行えるようです。PDF でそんなことできるのかよって感じです。すごいですね。

もちろん DeepL の翻訳が完璧というわけではないので、結果を鵜呑みにするべきではありませんし、英語から逃げるなとの声も聞こえてきそうですが、そこら辺を理解した上でうまく使っていきたいですね。

ちなみに Free プランまででは月 3 本しか翻訳できないようなので、有料プランは必須となりそうです。有料プランでは入力値の機密性も確保してくれるので、なんにせよ本格利用する際は有料プランの契約をお勧めします。

自分が学生の頃に欲しかったです。英語苦手民でも手軽に論文に目を通せるのはとても良いです。
