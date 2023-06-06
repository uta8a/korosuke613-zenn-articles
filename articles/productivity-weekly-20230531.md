---
title: "Productivity Weekly (2023-05-31号, 2023-05-24号)"
emoji: "😑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230524"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-05-31, 2023-05-24 合併号です。

今回が第 114 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺


## Terraform 1.5 で追加予定の `import` ブロック、`-generate-config-out` オプションの話
https://github.com/hashicorp/terraform/releases/tag/v1.5.0-rc2

Terraform 1.5（未リリース）で `import` ブロック、`-generate-config-out` オプションが追加予定です。
上記リンクは Terraform 1.5.0-rc2 のリリースノートになります。

`import` ブロックは、`terraform import` を `.tf` ファイル内で宣言して実行できる機能です。
以前追加された [`moved` ブロック](https://zenn.dev/korosuke613/articles/productivity-weekly-20211215#terraform-1.1-improves-refactoring-and-the-cloud-cli-experience)と似たようなものになります。

`-generate-config-out=<PATH>` は、`terraform plan` 時に、`import` ブロックと併用して使う CLI のオプションになります。これを使うことで、`import` ブロックで宣言したリソースの記述を自動で書き込んでくれます。

さっそく、それぞれを使ってみた記事を出してくれている人がいます。実際に試さなくてもどんなものかわかってとても良いです。

- [Terraform 1.5 で追加される import ブロックの使い方](https://zenn.dev/kou_pg_0131/articles/tf-import-block)
- [Terraform 1.5 で既存リソースからの HCL 生成ができるようになるので試してみる](https://zenn.dev/kou_pg_0131/articles/tf-generate-config)

以前、似たようなコマンドとして、[`terraform add`](https://zenn.dev/korosuke613/articles/productivity-weekly-20210908#cli%3A-the-(currently-experimental)-terraform-add-generates-a-starting-point-for-a-particular-resource-configuration.-(%2328874))  がありました。
`terraform add` は Terraform で管理されていない既存リソースのリソース定義を標準出力してくれるというもので、大変便利な機能だったのですが、残念ながら[正式リリース時は消えていました](https://twitter.com/Shitimi_613/status/1456059609211301888)。

`terraform import` はぶっつけ本番で失敗すると面倒なことになるコマンドなので、`plan` でインポート前に確認できるのはとても嬉しいです。
また、`terraform import` はあくまで Terraform state にリソースを持ってきてくれるだけなので、`.tf` ファイルに手動でリソースを書く必要があります。これまではインポート後に `terraform plan` で差分を確認して `.tf` ファイルにコピペしていくという作業をしており正直不毛でした。`-generate-config-out=<PATH>` が出たことで、手動でリソースを定義する必要がなくなりとても便利になりましたね[^generate]。

まだ正式リリースはされていませんが、`terraform add` の時と違い、RC[^rc]に入ってるので、だいぶ期待できるかなと思います。
早くリリースされてほしいですね。

[^generate]: plan 時にファイルが生成されることはそれはそれで気持ち悪いという人も Weekly の会にはいました。
[^rc]: Release Candidate のことです。正式リリース前にリリースされるバージョンのことです。

## Terraform AWS provider 5.0 adds updates to default tags
https://www.hashicorp.com/blog/terraform-aws-provider-5-0-adds-updates-to-default-tags

Terraform Provider AWS の 5.x がリリースされました。
デフォルトタグに関する機能が強化されたり、多くの非推奨な attributes が削除されたりしています（これまでは警告が出てきていました）。特に機能的にはタグに関する改良がほとんどです。

変更に関するわかりやすい記事をクラメソさんがさっそく出していました。

- [TerraformのAWS Provider Version 5がGAになりました | DevelopersIO](https://dev.classmethod.jp/articles/terraform-aws-provider-version-5-is-now-ga/)

5.x はメジャーアップデートに当たるため、破壊的変更が盛り沢山です。主に非推奨な attributes に関する破壊的変更が多いですが、4.x の時に話題になった S3 周りの非推奨な attributes に関しては、まだ警告を出すにとどめているようです（上記クラメソさんの記事が詳しい）。

アップデートの際は、ガイドを参考にしましょう。

- [Terraform AWS Provider Version 5 Upgrade Guide | Guides | hashicorp/aws | Terraform Registry](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/guides/version-5-upgrade)

アップデートは簡単ではないかもしれませんが、アップデートを放置するとどんどんアプデが億劫になるので、特に理由もなければ早めに新バージョンに上げましょう。

## 開発環境を丸ごとクラウドPC化する「Microsoft Dev Box」、7月に正式リリースと発表。Build 2023 － Publickey
https://www.publickey1.jp/blog/23/pcmicrosoft_dev_box7build_2023.html

クラウド上に開発環境作るやつが流行っていますね。

Azure では今までそのようなクラウド上の開発環境構築が無かったように思います。

今回の Dev Box では、環境を作成すると仮想マシンが作成され、リモートデスクトップで入って作業するという感じのようです。
あらかじめチーム用のツール、ソースコードなどを設定することで、個々のマシンで準備する必要が無い、というメリットがあります。

Windows の開発環境が欲しいチームには良い選択肢になるかもしれません。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## 業界初 生成AIオブザーバビリティアシスタント「New Relic Grok」発表 リミテッドプレビュー申込受付を開始 | New Relic
https://newrelic.com/jp/press-release/20230523

オブザーバビリティ関連の情報です。

OpenAI の大規模言語モデルと、New Relic の統合テレメトリデータプラットフォームを統合して、計装・トラブルシューティング・レポート作成などを自動で行うそうです。

手動で分析する負荷を減らし、経験の有無に関わらずオブザーバビリティを活用できるようになる...まさに理想な姿のように思います。
どこまで軽減されるか、正確に出力されるか、期待ですね。

夏にリミテッドプレビューを提供するとのことですので、楽しみに待ちましょう。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# know-how 🎓

## Amazon EKSベストプラクティスガイドにクラスターアップグレードの章が追加されました | DevelopersIO
https://dev.classmethod.jp/articles/eks-best-practice-guide-cluster-upgrade/

https://github.com/aws/aws-eks-best-practices/pull/321

EKS ベストプラクティスは 2020 年 5 月から公開されており、参考にされてた方も多いかと思いますが、今までクラスターアップグレードの章はありませんでした。今回それがようやく登場しました。

主体的にクラスターアップデートすべしという話や、アップグレード前に検証する話、実際にどうアップグレードするかという話が書かれており、ためになりそうです。

定期的にアップデートしましょう。
ちなみに EKS の新しいバージョンは、2 〜 4 ヶ月おきくらいにリリースされています。
https://docs.aws.amazon.com/eks/latest/userguide/kubernetes-versions.html#kubernetes-release-calendar

ところで今回のベストプラクティスは GitHub Pages で公開されコントリビュートも可能ですが、AWS の各種リソースのドキュメントを集約している AWS Document は現在 AWS が独自にホストしておりコントリビュートもできません。
https://docs.aws.amazon.com/

実は 2018 年頃、多くのドキュメントが GitHub でコントリビュート可能でした。
https://aws.amazon.com/jp/blogs/news/aws-documentation-is-now-open-source-and-on-github/

しかし 2023 年 5 月に GitHub 上のリポジトリをアーカイブし、こういった取り組みを終了する旨のブログを出しています。2023 年 6 月 5 日以降にアーカイブを開始するようです。
社内のドキュメントと同期するのが大変だったようですね...
https://aws.amazon.com/jp/blogs/aws/retiring-the-aws-documentation-on-github/

EKS ベストプラクティスガイドは長く続いてくれると嬉しいですね！

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## サバンナ便り〜自動テストに関する連載で得られた知見のまとめ（2023年5月版）〜 / Automated Test Knowledge from Savanna 202305 edition - Speaker Deck
https://speakerdeck.com/twada/automated-test-knowledge-from-savanna-202305-edition

t_wada さんによるサバンナからのお便りです。自動テストにまつわる知見がまとめられています。
内容としては、学習用テスト、偽陰性と偽陽性、テストサイズ、テストダブル、テストピラミッド、自動テストのサイズダウン戦略に関する知見が載っています。

個人的には、テストサイズの考え方が、わかりやすい、シンプルに分類できる、便利な表がある、という理由で特に良かったです。
また、単体テストの考え方/使い方本が良書すぎるそうなので、読んでみたいと思いました。

ページ数もそんなに多くないため、気になる人はとりあえず読んでみましょう。WEB+DB PRESS で連載していたらしい内容も読みたいです。


## 全AWSエンジニアに捧ぐ、CloudWatch 設計・運用 虎の巻 / CloudWatch design and operation bible
https://speakerdeck.com/iselegant/cloudwatch-design-and-operation-bible

こちらもオブザーバビリティ関連の情報です。

CloudWatch の重要性から始まり、CloudWatch のサービススイートを使ったオブザーバビリティの実現について詳しく書かれています。

丁度社内勉強会でオブザーバビリティについて学んでいたので、AWS でオブザーバビリティのある構成が分かりやすく書かれているこのスライドは私にとってドンピシャでした。

X-Ray などはまだ理解できていないので、このスライドを参考に探求を進めていこうと思います。

ちゃんと各種スイートを使いこなしていきたいですね。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## CI/CD Test Night #6 - GitHub Actionsセルフホストランナーのインフラ運用
https://testnight.connpass.com/event/281681/

先日、GitHub Actions セルフホストランナーのインフラ運用についてのミートアップが開催されました。主催は DeNA さんで、渋谷でのオフラインとオンラインによるハイブリッド開催でした。

僕はオフラインでの参加でしたが、その道（セルフホストランナー）のプロがあらゆる工夫を凝らした運用を行なっており、とても勉強になりました。
また、DeNA さんの本社での開催でしたが、めちゃいい感じの場所でした。

資料がすでに公開されているので、気になる人はぜひ見てみてください。

https://www.youtube.com/watch?v=-XQWr_iTmEo

- [GitHub Actions オタクによるセルフホストランナーのアーキテクチャ解説 | ドクセル](https://www.docswell.com/s/Kesin11/K98GJJ-cicd_testnight_6_github_actions)
- [philips-labs/terraform-aws-github-runner による GitHub Actions セルフホストランナーの大規模運用 | ドクセル](https://www.docswell.com/s/miyajan/ZW1XJX-large-scale-github-actions-self-hosted-runner-by-philips-terraform-module)
- [開発者体験を改善し続けるための Self-hosted runner 運用基盤 | ドクセル](https://www.docswell.com/s/s4ichi/5RXQLG-cookpad-self-hosted-runner-infra)
- [バリエーションで差をつける。myshoes の新たな挑戦 #cicd_test_night - Speaker Deck](https://speakerdeck.com/whywaita/evolution-myshoes-cicd-test-night-6)

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Podman Desktop 1.0: Local container development made easy | Red Hat Developer](https://developers.redhat.com/articles/2023/05/23/podman-desktop-now-generally-available)
    - [去年登場した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221116?redirected=1#podman-expands-to-the-desktop-%7C-red-hat-developer) Docker 互換のコンテナエンジンである Podman のデスクトップ版、Podman Desktop が v1 に到達しました
    - [v1.0](https://github.com/containers/podman-desktop/releases/tag/v1.0.0) の Changelog を見る限り、大きな新機能が入ったというよりかは、細かい改善が多く、今回のリリースで安定性が増したことを表していそうです
    - 記事では、Podman Desktop ならではの機能が紹介されています
      - OpenShift Local をスムーズに用意できる
      - 軽量ランタイムの Kind を使用するオプションがある
      - など
  - [Aurora MySQL improves performance and failover recovery time when binlog is enabled](https://aws.amazon.com/jp/about-aws/whats-new/2023/05/aurora-mysql-performance-failover-recovery-time-binlog-enabled/)
    - **（この項目は現状の僕の知識の範疇を超えているため、Weekly 参加者のコメントをほぼそのまま載せています。申し訳ございません。）**
    - MySQL 互換の Amazon Aurora において binlog 有効化時のパフォーマンスが向上する enhanced binary log 機能がリリースされました
    - binlog 有効なネイティブ MySQL に対して再起動やフェイルオーバー後のリカバリにかかる時間が最大 99%改善するらしいです
    - ただ Aurora MySQL ってそもそも binlog を使わなかったはずで、これはどういうシチュエーションで有効にするかというと debezium（データベースからの変更イベントを全部取って別フローに流すデータキャプチャ）とかと連携させるときが主にフォーカスされているようです
      - https://twitter.com/hmatsu47/status/1660820944502546433
      - https://twitter.com/con_mame/status/1660813836503646209
    - 詳細はここに書いてあったんですがむずいです
      - https://aws.amazon.com/jp/blogs/database/introducing-amazon-aurora-mysql-enhanced-binary-log-binlog/
  - [DeepL翻訳、「です・ます」「だ・である」の切り替えが可能に - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2305/24/news132.html)
    - DeepL Pro（DeepL の有料版）において、外国語から日本語へ翻訳する際に「敬体（です・ます調）」にするか「常体（だ・である調）」にするかを選択できるようになりました
    - Web 版でもデスクトップ版でも利用できます
    - これまでは翻訳のたびに敬体か常体かはバラバラだったので、この機能を使うと手動で直す必要がなくて良いですね
- **know-how 🎓**
  - [エンジニアのための刑事事件対策まとめ - Qiita](https://qiita.com/moroi/items/e9db57db2bcdbc089ca1)
    - 例の Coinhive 事件で無罪を勝ち取ったモロさんによる、警察の取り調べで不利にならないように立ち回るための tips です
    - とにかく高い金払ってでも弁護士さんをつけようと思いました。日本ハッカー協会の存在も初めて知りましたが、こういうときに頼れる場所があるのはありがたいですね
    - こういうのは自分は関係ないと思ってたらいきなり巻き込まれるものだと思うので、誰もにおすすめしたい内容です
- **tool 🔨**
  - [datarootsio/tf-profile: CLI tool to profile Terraform runs, written in Go](https://github.com/datarootsio/tf-profile)
    - terraform apply にかかる時間やリソースに対する操作をプロファイルするツールです
    - apply 時のログを渡すだけで解析してくれるのでシンプルに使えます
    - 個人的にはめちゃくちゃでかいモジュールの場合、plan/apply 時の Refreshing state に時間がかかるので、そこをプロファイルしてほしかったのですが、このツールはあくまで apply 時のリソースに対する操作をプロファイルするもののようです

# あとがき
ここ数ヶ月締め切りのあるタスクが多くてバタバタしていたのですが、最近ちょっと落ち着いてひと段落です。
早くも 6 月ですね。時の流れは早いです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

