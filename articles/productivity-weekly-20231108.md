---
title: "開発生産性の話が2本、SPACEフレームワーク気になる：Productivity Weekly (2023-11-08号)"
emoji: "🤡"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231108"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-08 単独号です。

今回が第 132 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## GitHub Actions - Enforcing workflow scope when creating a release - The GitHub Blog
https://github.blog/changelog/2023-11-02-github-actions-enforcing-workflow-scope-when-creating-a-release/

GitHub において、REST API を利用してリリースを作成する際に、特定のケースで `workflow` スコープや `workflows:write` 権限が必要になりました。

特定のケースとは、Actions のワークフローファイルを変更するコミット SHA が含まれ、かつ、その SHA に ref (ブランチやタグ) がついていないリリースを作成する場合です。

おそらくセキュリティ向上が変更の理由かと思われます。

多くのケースでは影響はないと思いますが、頭の片隅に入れておきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Azure private networking for GitHub-hosted runners - Public Beta - The GitHub Blog
https://github.blog/changelog/2023-11-01-github-hosted-runners-private-networking-with-azure-virtual-networks-public-beta/

GitHub がホスティングするランナーを Azure Virtual Networks（VNET）と接続させる機能がβ版でリリースされました。

Azure を利用した経験は無いのですが、VNET は AWS における VPC 相当の機能だと思いました。

ランナーを VNET に接続させることで Azure のサービスにアクセス可能にしたり、VNET 経由でオンプレミスにホスティングした artifactory のようなサービスにアクセス可能とすることを想定しているようです。また、セキュリティのために Network Security Group（NSG）を利用してランナーのネットワークを制御できることもメリットのようです。

Azure に詳しい方はおそらくドキュメントを見て頂く方がより詳しく理解できるかと思います。こちらのドキュメントに GitHub がホスティングするランナーがどのようにして VNET に接続されるかを表した図もあります。

https://docs.github.com/en/enterprise-cloud@latest/admin/configuration/configuring-private-networking-for-hosted-compute-products/about-using-github-hosted-runners-in-your-azure-virtual-network


Larger runner と呼ばれる強いスペックのランナーは[以前から IP レンジを固定できる機能](https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners/about-larger-runners#additional-features-for-larger-runners)が提供されていましたが、Azure を利用している場合にはより密にプライベートなネットワークに統合できるようになったのだと思います。Azure のみとなっていることが残念ではありますが、エンタープライズ用途向きの機能が増えてきているのは嬉しいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Secret scanning expands detection to include non-provider patterns (beta) - The GitHub Blog
https://github.blog/changelog/2023-11-06-secret-scanning-expands-detection-to-include-non-provider-patterns-beta/

GitHub Secret scanning において、非プロバイダーのパターンを検出する機能が追加されました（beta）。例えば、HTTP の Basic 認証、ベアラー認証ヘッダや DB への接続文字列、RSA 暗号鍵などです。

現在は GitHub Advanced Security ライセンスを持つ Enterprise でのみ利用可能です。有効にするにはオプトインする必要があります。

GitHub Advanced Security を利用している方は有効にしてみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS Fargate now enables Amazon ECS tasks to selectively leverage SOCI
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/aws-fargate-amazon-ecs-tasks-selectively-leverage-soci/

[Productivity Weekly 2023-08-20号で紹介した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802) SOCI インデックスによるコンテナイメージの遅延読み込みが ECS で使いやすくなる機能追加がありました。

どう便利になるのかについて、有識者の X のポストが大変参考になりましたのでこちらを引用します。

https://twitter.com/toricls/status/1721877821872873533


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Docker Desktop、Appleシリコン上でx86-64バイナリをほぼネイティブな速度で実行可能にする「Rosetta for Linux」が正式版に
https://www.publickey1.jp/blog/23/docker_desktopapplex86-64rosetta_for_linux.html

Docker Desktop 4.25 がリリースされました。

Rosetta for Linux を使用するオプションが GA となりました。なお、デフォルトでは Docker Desktop でのこのオプションはオフになっており、手動で有効化する必要があります。
このオプションを有効化することで、Apple シリコンを使ったマシンでの x86_64 用イメージの実行が高速化され、ネイティブに近い速度での動作が期待できます。
あるイメージが x86_64 用のビルドしか提供していない場合に、このオプションが大いに役立ちそうですね。

他の変更点は以下のとおりです。

- Docker Scout を使用したイメージ解析の有効/無効を設定画面から切り替えられるようになりました
    - Jamf などのデバイス管理ツールで admin-setting.json を管理することで、会社のポリシーなどに合わせてデバイスの設定を強制できます
      - 詳しくは下記ドキュメントに書かれています↓
      - Configure Settings Management | Docker Docs https://docs.docker.com/desktop/hardened-desktop/settings-management/configure/
- Windows 版での変更点
    - インストール時に WSL を自動アップデートできるようになりました。
    - Docker Desktop をインストール可能な Windows の最低バージョンが 19044 に上がり、それ以下のバージョンを使用している場合はインストール時にエラーが発生します。

Rosetta for Linux オプションの GA は嬉しいですね。まだ有効化していない方は是非。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWS が iOS 向けの AWS コンソールモバイルアプリケーションでサインインエクスペリエンスを強化したことを発表
https://aws.amazon.com/jp/about-aws/whats-new/2023/10/aws-console-mobile-app-ios-enhanced-sign-in/

iOS 向けの AWS コンソールモバイルアプリで、セキュリティキーや PassKey などの多要素認証を使用できるようになりました。
今まで iOS アプリでの多要素認証は OTP しか対応しておらず歯がゆい思いをしていましたが、これで気兼ねなく PassKey を使用できます。

また認証情報を保存し、次回からのログインでは Face ID や PIN でロックを解除できます。

外出先からサクッと確認するのにより便利になりました。嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## リアーキテクトと開発生産性について - Speaker Deck
https://speakerdeck.com/yosuke_furukawa/riakitekutotokai-fa-sheng-chan-xing-nituite

2023 年 10 月 31 日(火)にサイボウズのフロントエンドエンジニア主催で「BAR フロントえんどう」という勉強会が開催されました。
その中で、Japan Node.js Association の方が「リアーキテクトと開発生産性について」というタイトルで発表されていました。

まず、よくある開発生産性における誤解として、開発生産性とは単一のメトリクスだけでは測れないもので、複数の要素を組み合わせて測る必要があるということを述べています。

では、具体的に複数の指標とは何かというと、ここでは以下の 5 つのカテゴリからなる SPACE フレームワークを挙げています。

- Satisfaction and well being
- Performance
- Activity
- Communication and collaboration
- Efficiency and flow

SPACE フレームワークについては[こちら](https://www.swarmia.com/blog/space-framework)を参照してください。

開発生産性指標を SPACE フレームワークと定義した際に、リアーキテクトがどのように開発生産性に貢献できるかと、一方でリアーキテクトによるコストがどのように発生するかを述べています。
そして、実際にフロントエンドにおいてリアーキテクトを行う方法を 3 つ解説しています。

全体として、開発生産性とリアーキテクトどちらについても具体例を挙げて説明しているので、わかりやすいスライドでした。

BAR フロントえんどうのその他の発表については[こちら](https://blog.cybozu.io/entry/2023/11/10/131530)をご覧ください。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Developer Productivity Engineering at Netflix - The New Stack
https://thenewstack.io/developer-productivity-engineering-at-netflix/

Netfilx における開発生産性エンジニアリングについての記事です。特にプラットフォームチームについて紹介されています。

Netfilx の製品管理および内部顧客サポートを含むプラットフォームチームは約 150 人で、2,500 人以上のエンジニア組織と 500 人のデータチームを支援し、
開発者体験（Developer Experience）に焦点を当てており、ビルド、テスト、CI などの開発プロセス全体を管理しているそうです。

プラットフォームチームは開発者の生産性を測定する際に SPACE フレームワークを活用し、定量的な指標だけでなく、定性的な指標も活用しているらしく、
定性的な指標を計測するために、四半期に一度程度で社内の開発者に対してアンケートを実施しているそうです。

例えば、社内のツールやプラットフォームチームが提供するプラットフォームについて、以下のような具体的な質問をしているとあります。

- ツールを楽しいと感じるか
- ツールのおかげで仕事がどれだけ効果的だと感じるか
- どれくらい頻繁にデプロイし、デプロイしているものに自信を持てるか
- アプリケーションの起動時間はどれくらいか
- ビルド時間はどれくらいか
- テストスイートの実行にどのくらいかかるか

誰がフィードバックを提供しているのかを知ることが重要と考えているため、これらのアンケートは匿名でなく、意図的に情報を公開、共有されているそうです。

心理的安全性を高め、エンジニア同士の情報共有やフィードバックを適切に行うことで、開発者体験がより良い組織にしていくというのは、Netfilx 規模の企業でも重要視されていることが分かる記事でした。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## O'Reilly Japan - 詳解 Terraform 第3版
https://www.oreilly.co.jp/books/9784814400522/

オライリー・ジャパンから「詳解 Terraform 第 3 版」が出版されました。
これまでもオライリーの Terraform 本は出版されてきましたが、日本語訳された Terraform 本は初めてとなります。

なぜ Terraform を使うのかといった触りから、シークレットをどう管理するかやどのようにモジュールをテスト[^test]するかなど、Terraform を効果的に使うためのテクニックが詰まっています。

また、既に本を読まれて感想を書いている方もいます。

- [Terraform の基本的な仕組みから実践まで深く学べる一冊「詳解 Terraform 第3版」を読んだ - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2023/11/20/094234)

読者層についてや、特によかった章のピックアップなどが書かれており、どんな内容なのか参考になります。買う前に一度読んでみるのをお勧めします。

~~注意すべきは原書が 2022 年 9 月に出版されていることです。この一年ちょいで 1.4〜1.6 がリリースされており、import ブロックや `terraform test` などの新たな機能が追加されているので、最新の情報と照らし合わせつつ読みたいですね。~~

上を書いた次の日に翻訳した方がブログを出しました。

- [『詳解 Terraform 第3版』を翻訳しました | b.l0g.jp](https://b.l0g.jp/books/2023/11/21/terraform-up-and-running-ja/)

> 帯などにはTerraform 1.0対応とありますが、より詳しく言うと原著はTerraform 1.2までの変更が含まれており、かつ日本語版ではTerraform 1.5までの変更（原稿を仕上げたのが1.6発表の直前でした）に関しても訳注としてできるだけ情報を追加しています。

どうやら、1.5 までの変更は訳注として追加されているようです。ありがたいですね。

[^test]: v1.6 で experimental ですが `terraform test` が追加されているので、もしかしたら当時と状況は変わっている可能性があります。

個人的には 5 章の count や for などの構文の解説[^for]と 9 章の Terraform コードのテストについてが気になっています。
もう買ったんですけどまだちゃんと読めてません 😭

満を辞して発売されたオライリーの Terraform 本、気になってる人は調べてみてください。

[^for]: 僕はあんま使ったことないからです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **tool 🔨**
  - [microsoft/inshellisense: IDE style command line auto complete](https://github.com/microsoft/inshellisense)
    - Microsoft がターミナルでのコマンド入力を IDE のように補完するツール inshellisense を公開しました
    - 補完のためのデータは [Fig](https://fig.io/) でも使われている OSS、withfig/autocomplete を利用しているようです
    - 実際に使ってみましたが、独自のプロンプトに入らないといけないため、僕にはあまり合いませんでした（それなら Fig でいいかなって感じ）

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
最近忙しくて大変遅くなりましたが今週号でした。いよいよ年末ですね。僕は何も準備していません。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
