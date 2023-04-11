---
title: "Productivity Weekly (2023-04-05号)"
emoji: "🧑‍⚖️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230405"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-03-29, 2023-04-05 合併号です。

今回が第 110 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
すみません、今回は `read more 🍘` 多めの内容になっています 🙇
:::

# news 📺

## GitHub Actions: Visual Studio Code Extension is now in public beta | GitHub Changelog
https://github.blog/changelog/2023-03-28-github-actions-visual-studio-code-extension-is-now-in-public-beta/

https://github.blog/2023-03-28-announcing-the-github-actions-extension-for-vs-code/

VSCode の GitHub Actions 拡張機能が登場しました(public beta)[^vscode_actions]。

主な機能としては次があります。

- ワークフローのワークフローランの管理
  - 一覧の表示
  - ページへのリンク
  - 履歴の表示
  - ログの表示
- ワークフローの作成支援
  - 式や構文の強調表示
  - ホバー時のドキュメント表示
  - 式や構文の validation
  - 式や構文の自動補完

個人的にはワークフロー一覧の表示とかよりも、式や構文の validation や自動補完が嬉しいです。
特に、3rd party アクションに関する支援（リンクの表示や `with` の検証）がとても便利です。

https://twitter.com/Shitimi_613/status/1640895043178491905?conversation=none

大変便利なので、GitHub Action ユーザはぜひ使ってみてください。
個人的には JetBrains IDE を好んで使うため、そっちにも公式で拡張機能を出してほしい気はします。

[^vscode_actions]: ちなみに僕は存在すら知りませんでした。

## Introducing GitHub Copilot X
https://github.com/features/preview/copilot-x

https://github.blog/jp/2023-03-23-github-copilot-x-the-ai-powered-developer-experience/

去年、コーディング時に AI に次のコードをサジェストしてもらうサービス、GitHub Copilot がリリースされましたが、今回、新たに GitHub Copilot X が登場しました。

GitHub Copilot X は 1 つの機能・サービスというわけでなく、AI による新たな開発者体験を実現する実験的なサービス群を指します。
GitHub の中の人によると、Copilot に関する各名称は次を表すようです。

> GitHub Copilot 👉 プロダクト
> GitHub Copilot for Business / Individual 👉 提供形態
> GitHub Copilot X 👉 ビジョン 
https://twitter.com/yuhattor/status/1640344136787034113

ビジョンと言われるとわかりやすいですね。

実際には次の機能が Copilot X の一部として紹介されています。

- GitHub Copilot chat
  - ChatGPT のような体験をエディタで
- Copilot for Docs
  - プログラミングに関するドキュメントに詳しい Chat
- Copilot for Pull Requests
  - プルリクエストの説明をしてくれる
- Copilot for CLI
  - 質問すると CLI のコマンドを提示してくれる。解説もしてくれる[^for_cli]

また、上記ブログ記事に載ってないようなプロジェクトも GitHub NEXT で始動しており、クラメソさんが最近まとめてくれていました。

- [【GitHub Copilotは序章に過ぎない!?】GitHub Next、次世代の開発エクスペリエンスを実現する圧倒的なプロジェクト群 | DevelopersIO](https://dev.classmethod.jp/articles/what-is-github-next/)

GitHub Copilot for Your Codebase や GitHub Copilot Radar もまだ WIP 段階となっていますが、WAITLIST 段階になると X に含まれるのかもしれませんね。

Copilot X についてですが、あくまでビジョンを表すものであり、ここのサービスは実験段階とのことです。
既存の Copilot のプランに含まれるかどうかやそもそも提供されるかどうかも現時点では決まってなさそうです。

> GitHub Copilot X is currently a representation of GitHub’s vision for the future rather than an available product offering of GitHub Copilot. As we continue to design, test, and build features that fall into the GitHub Copilot X vision, we are also taking the time to determine the best way to provide them to our customers.
> https://github.com/features/preview/copilot-x

GitHub Copilot を契約している方であれば、各 Waitlist に参加し、待てば実際に触ることができます。気になる機能があれば触ったりフィードバックを送ったりしてみましょう。

個人的にはプルリクエストの説明をしてくれるやつがとても便利そうで興味があります。
ソフトウェア開発がますます加速しそうですね。楽しみです。

[^for_cli]: 前試した時の様子 https://twitter.com/Shitimi_613/status/1632941034140471296

# know-how 🎓

## 【Copilot はじめました】GitHub Copilot 導入におけるハードルの整理 - M&Aクラウド開発者ブログ
https://tech.macloud.jp/entry/2023/03/31/125606

M&A クラウドさんによる GitHub Copilot 導入話です。導入する上で避けられない、セキュリティ・ライセンス周りの懸念点・リスクをどう扱うかがの事例が書かれています。

GitHub Copilot では利用者が書いているコードの続きを Copilot が提案してくれますが、提案を受け取るためにはコードの一部を GitHub が管理するサーバに送る必要があります。そのため、GitHub に送られたコードがどう扱われるかは知っておく必要があります。この記事では、送信されたコードがそれぞれのプラン(for Individuals, for Business)でどう扱われるのか、プライバシーポリシーはどうなっているのかをまとめてくれています。

他にも GitHub Copilot が提案するコードを採用することで他の OSS のライセンスを侵害してしまう可能性があるというリスクが存在します。この記事では、そのリスクをどう抑えるか[^public_block]、リスクをどう評価するかが書かれています。また、ライセンス侵害による訴訟が発生した場合の防御措置についても触れています。

GitHub Copilot を扱う上でのリスクに対してどう判断したかの詳細が載っているのは、現在導入を検討している企業にとっては大変参考になるのではないかと思います。
個人的にはリスクを 0 にすることはできないと思っているので、最小限化した上で Copilot 利用していけるといいのかなと思っています。

[^public_block]: GitHub の機能（`Suggestions matching public code`）で少し安全側に倒せる。

## GitHub Appsトークン解体新書：GitHub ActionsからPATを駆逐する技術
https://zenn.dev/tmknom/articles/github-apps-token

GitHub Actions でよりセキュアに権限を行使するために GitHub Apps トークンを使うという記事です。

GitHub Actions で使える `GITHUB_TOKEN` の権限が足りなかった際に、Personal Access Token(Classic) を使いがち[^fine_grained]ですが、PAT はリポジトリを絞り込めなかったり、長期間トークンを生存させなければならず流出時が怖かったりと、基本的に使いたくないです。

そのため、この記事ではよりセキュアにある程度使いやすい方法として GitHub Apps のトークンを紹介しています。GitHub Apps だと発行したトークンは短命だったり、リポジトリを制限できたり、ユーザに紐づかなかったり[^org_app]と色々と利点があります。

この記事では、なぜ GitHub Apps か、Apps のセットアップ、3rd party アクションによるトークン生成方法＆3rd party アクションをおすすめしない理由[^3rd_party]、自前実装によるトークン生成方法＆さらなるセキュリティ強化などが書かれています。

特に自前実装によるトークン生成の項目では、ただ完成形を提示するのではなく、1 つ 1 つの処理で何をやっているかを説明しており、GitHub Apps のトークン発行の仕組みを知りつつ実装していけます。

GitHub Apps のトークン発行についてこれだけわかりやすく説明してくれている記事は初めてみました。Apps の管理やトークン発行までがちょっと面倒かもしれませんが、記事を読めればトークン発行までの道はそんなに苦ではないと思う（実際自分の中でもハードルが下がった）ので、今後は PAT をどんどん App に置き換えていきたいですね。

[^fine_grained]: よりセキュアな [fine-grained](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221019?redirected=1#introducing-fine-grained-personal-access-tokens-for-github-%7C-the-github-blog) な PAT も存在しますが、こちらは定期的に手動でトークンのローテーションが必要となってしまって現状使いづらいです。
[^org_app]: Organization で App を作る場合の話。
[^3rd_party]: 個人的には 3rd party アクションは中身を精査（変なことしてないかや依存の依存が固定されているかなど）した上でハッシュ固定で使えばいいって思っちゃうタイプ。とはいえ認証に関わる大事な部分なので自前で用意するに越したことはないと思う。

## モノレポでの GitHub Actions CI の泥臭い高速化
https://zenn.dev/ascend/articles/github-actions-on-push-history

アセンドさんによる開発が活発なモノレポでの GitHub Actions 高速化の話です。

パッケージごとに成果物の有無をキャッシュし、ビルドが不必要であれば（キャッシュが存在すれば）ジョブをスキップするという方法が細かく紹介されています。

また、GitHub Actions 特有の問題（ジョブの立ち上げオーバーヘッドや 1min 切上げの課金など）を回避するためのテクニックや、キャッシュキー生成のメンテナンス性改善などの工夫も書かれています。

あくまでアセンドさんのモノレポ構成が前提としてあるため、キャッシュキーの計算方法が Node.js 特有であるなど、細かいところまでは自身の環境に最適化する必要がありますが、大まかな考え方はだいたいどの構成にも効果的であり、CI 高速化をしたい場合にとても参考になると思います。

## ソフトウェアエンジニアリングサバイバルガイド: 廃墟を直す、廃墟を出る、廃墟を壊す、あるいは廃墟に暮らす、廃墟に死す - Google Slides
https://docs.google.com/presentation/d/1hDY2pb-nYVSLr0HrtQ4EVyrDU4QGgwp4-VRG-Rf26DA

廃墟（＝動いているけどメンテできない、されてないもの）との付き合っていく方法についての発表スライドです。

廃墟を直すか、廃墟から出るか、廃墟を壊すか、廃墟に住み続けるのか...という廃墟への対応をパターン別に紹介しており、また、そもそも廃墟を作らないためにはという内容も載っています。

廃墟という言葉にとてもしっくりきました。技術的負債と言わず廃墟と言った方がいいパターンは決して少なくなさそうです。

僕も廃墟に当たりそうなシステムを少なからず見てきました。特に僕のいるチームではメンテコストが高すぎるものや手をつけられる状態にないシステム[^haikyo]を破壊（移行）する方針であるため、いろいろなステークホルダに破壊のための説明をすることが多いです。

廃墟とあい見えることが多いからこそこのスライドの内容は参考になるなと思いました。色々な人に読んでもらって廃墟という言葉が共通言語になれば廃墟を作らない・廃墟に住み続けないことがやりやすくなりそうだと思いました。

[^haikyo]: 自分らで作ったものもあれば、人からもらったものもある。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Generate an SBOM from the dependency graph | GitHub Changelog](https://github.blog/changelog/2023-03-28-generate-an-sbom-from-the-dependency-graph/)
    - GitHub の dependency graph において SBOM を生成できるようになりました
    - 現在は WebUI からのみ可能です
  - [Updates to the repository dependency graph view | GitHub Changelog](https://github.blog/changelog/2023-03-28-updates-to-the-repository-dependency-graph-view/)
    - GitHub の dependency graph の UI が変わりました
    - 次のようなユーザ体験が得られるようになったとのこと
      - 依存関係の検索ができるように
      - 依存関係のライセンスが表示されるように
      - 依存関係の Dependabot アラートを重大度でソート可能に
      - 依存関係の Dependabot アラートにひもづくプルリクエストがリンクされるように
  - [GitHub SponsorsではPayPalを使った支払いはできなくなったので、クレジットカードに切り替える必要があります | Web Scratch](https://efcl.info/2023/03/21/github-sponsors-paypal/)
    - GitHub Sponsors で PayPal が利用できなくなりました
    - クレジットカードに切り替えなければなりませんが、2 月末に切り替わってなかった人は自動でスポンサーがキャンセルされているそうです
    - 人によっては月 $4,000 も収入が減ってるなど、影響はでかいようです
    - 今一度自分がちゃんとスポンサーになれているかどうかを確認しましょう
  - [GitHub Actions: The setup-go Action now enables caching by default | GitHub Changelog](https://github.blog/changelog/2023-03-24-github-actions-the-setup-go-action-now-enables-caching-by-default/)
    - actions/setup-go v4 から `cache` パラメータを指定しなくてもデフォルトでキャッシュが有効になるとのことです
    - actions/setup-* アクションのキャッシュ挙動を統一してほしい
  - [We updated our RSA SSH host key | The GitHub Blog](https://github.blog/2023-03-23-we-updated-our-rsa-ssh-host-key/)
    - GitHub のホスト認証用の RSA SSH 秘密鍵が GitHub の公開リポジトリで短時間公開されていたことが判明したため、3/24 にリプレースされた話です
    - github.com に SSH してエラーになる場合は .ssh/known_hosts の更新が必要です
    - [GitHub から fetch/pull できなくなった場合の対処（2023/03/24 秘密鍵公開）- Qiita](https://qiita.com/ktateish/items/c986891e429469c7105c)
      - 今回の件についてわかりやすくまとめられています
      - 問題になってるのはホスト認証用の鍵で、クライアント側の鍵の暗号方式は関係ないよという話
  - [iOS/iPadOS 16.4リリース 〜ホーム画面に追加したWebアプリ（PWA）からの通知が可能に。またUnicode 15.0の絵文字も追加される | gihyo.jp](https://gihyo.jp/article/2023/03/ios16.4-release)
    - とうとう iOS にも PWA からの push 通知が来たよ
    - iOS 16.4, Safari 16.4 から
    - これからは PWA で良くね？がしやすくなるかも
  - [We're no longer sunsetting the Free Team plan | Docker](https://www.docker.com/blog/no-longer-sunsetting-the-free-team-plan/)
    - Docker 社が 3/14 に Free Team プランの廃止をアナウンスしていましたが、3/25 にそれを撤回しました
    - 3/14 以降に有料プランにアップグレードしてた場合は 30 日分の返金が自動でされるとのことです
    - 返金されるのはよいのですが、中には Team から Personal にイメージを移行＆解散した人もいるらしく、可哀想でした
    - 何にせよ、猶予期間の短い破壊的な発表はやめてほしいものです
  - [AWSに最適化された「Amazon Linux 2023」正式リリース。カーネルライブパッチなど新機能、今後は5年間無償サポート、2年ごとにメジャーバージョンアップ － Publickey](https://www.publickey1.jp/blog/23/awsamazon_linux_202352.html)
    - カーネルライブパッチが利用可能になったり、SELinux の permissive がデフォルトで有効化されていたりするそうです
    - また、リリースサイクルが変わります
- **know-how 🎓**
  - [Bit-for-bit reproducible builds with Dockerfile | by Akihiro Suda | nttlabs | Mar, 2023 | Medium](https://medium.com/nttlabs/bit-for-bit-reproducible-builds-with-dockerfile-7cc2b9faed9f)
    - ビット単位で再現可能な Docker イメージのビルド方法を解説した記事です
    - 理想としてはいつでも誰でも Dockerfile のビルド結果は同じになってほしいところですが、現実はそうもいきません
    - `SOURCE_DATE_EPOCH` でタイムスタンプを再現し、repro-get でパッケージのバージョンを再現可能にしています
  - [Terraform とGitHub Actions | フューチャー技術ブログ](https://future-architect.github.io/articles/20230405a/)
    - フューチャーさんによる `terraform apply` の GitHub Actions による実行事例です
    - `workflow_dispatch` での半自動実行方法も載せています
    - `terraform apply` 自動化を考えている人に参考になりそうです
- **tool 🔨**
  - [Playwright v1.32.0 で追加されたUI Modeを試してみた](https://zenn.dev/keita_hino/articles/6f2e30930bb2cd)
    - [Release notes | Playwright](https://playwright.dev/docs/release-notes#version-132)
    - Playwright 1.32.0 で UI モード（プレビュー版）が追加されました。GUI からテストの実行やデバッグができる機能です
    - 上記記事では UI モードをスクリーンショット付きで紹介してくれています
    - 行動ごとのスナップショット撮影機能は特に便利そうです
  - [tftarget:Terraformターゲットを選択的に実行するためのGo製CLIツール | フューチャー技術ブログ](https://future-architect.github.io/articles/20230329a/)
    - `terraform plan` や `apply` をする際に、ターゲットを絞りたい場合がありますが、`terraform -target=xxx.yyy` のようにターゲット指定を頑張らなくて良くするツールが tftarget です
    - CUI でどのリソースをターゲットにするかを選ぶことができ、巨大なモジュールを扱う際に特に便利そうです
    - ただ、個人的にはそもそもなるべく `-target` を使いたくないため、本当に必要になった時に欲しいなと思いました
  - [FourKeys分析機能をリリースしました](https://zenn.dev/offersmgr/articles/da0df6e4d91746)
    - Offers MGR という製品で four keys 分析機能がリリースされました
    - 細かい話が書かれてないため詳細は不明です。問い合わせしないと教えてくれないっぽい
    - four keys 分析機能を有するサービスとして他には [Findy Team+](https://prtimes.jp/main/html/rd/p/000000042.000045379.html) があります
  - [Hello, Superflare](https://superflare.dev/)
    - Cloudflare Workers を使う上で様々な周辺機能(D1 とか R2)を活用するためのフルスタックなツールキット Superflare です
    - [Cloudflare Workers のためのフルスタックツールキット Superflare を試してみた](https://zenn.dev/azukiazusa/articles/superflare-for-cloudflare-workers)
      - これを使ってみたという日本語の解説記事
    - 手軽にアプリケーションを作れそうで便利そうですね

# あとがき
なかなか余裕がなくて `read more 🍘` 多めになってしまいすみません。

先日、映画 Winny を見てきました。絶対暗くなるよな〜と思いつつ見に行って案の定悲しい気持ちになって帰ったのですが、1 人の開発者としてあの大事件を映像で見ることができたのは良かったです。
金子さんが長い間開発できないのに裁判で戦いぬいたのは本当にすごいと思います。敬意を評したいです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
