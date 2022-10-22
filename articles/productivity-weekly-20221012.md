---
title: "Productivity Weekly (2022-10-12号)"
emoji: "💴"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221012"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 95 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions: Deprecating save-state and set-output commands | GitHub Changelog
https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/

GitHub Actions において、`save-state` と `set-output` コマンドが deprecated になりました。

`save-state` コマンドはジョブのステップ開始時、終了時に実行される `pre:` アクションや `post:` アクションで共有できる変数を作成するコマンドです（[詳細](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#sending-values-to-the-pre-and-post-actions)）。アクションの開発者以外はあまり使う機会がないでしょう。

`set-output` コマンドは、他のステップ、ジョブから参照できる変数を作成するコマンドです（[詳細](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-output-parameter)）。`set-output` については使ったことのある人が多いのではないでしょうか。

これら 2 つのコマンドは、よろしくない使われ方をされる可能性があるため、deprecated となりました。2023 年 06 月 01 日以降はコマンドを利用するとエラーとなる予定です[^set-output]。
それまでは、`set-output` を利用しているジョブに warning が表示されます。

代替手段としては、環境変数 `$GITHUB_STATE` と `$GITHUB_OUTPUT` が指すファイルに追記する方法が用意されています。

`set-output` コマンドの利用者は多そうですね。僕もけっこう使ってます。`set-output` コマンドは独特な設定方法だったため、ファイルに追記する形となって単純になったのは嬉しいです。来年 6/1 が締め切りでまだ余裕がありますが、さっさと対応しましょう。

[^set-output]: ちなみに、この Changelog が公開された時点ではまだ無効となる日付が未定となっていました。2022/10/21 再度 Changelog を見たところ無効日が追記されていました。いつの間に...

## Cloud Workstations  |  Google Cloud
https://cloud.google.com/workstations

Google Cloud がクラウド上の開発環境を提供するマネージドサービス Cloud Workstations を発表しました（プレビュー）。

Cloud Workstations はブラウザまたはローカルの IDE 経由でアクセスできるコンテナ上の開発環境です。カスタムのコンテナイメージを用意するなどで、瞬時に開発環境を構築できます。IDE は Code-OSS（OSS 版 VSCode）や JetBrains IDEs、Vim などに対応しています。
また、GCP ならではの機能として、VPC 内に環境が構築されるため、他の GCP のサービスとの連携が強いようです。

コンテナ内に環境を構築し、リモートからアクセスすると言えば GitHub Codespaces が浮かびますね。対応 IDE が豊富だったり、GCP との連携が強い部分が GitHub Codespaces との大きな違意でしょうか。

ちなみに気になる料金ですが、例えば e2-standard-4 4CPU 16 GB RAM の場合は $0.32 / hour となっています。対して Codespaces が 4 CPU 8GB RAM で $0.36 / hour となっています。

- [Pricing  |  Cloud Workstations  |  Google Cloud](https://cloud.google.com/workstations/pricing)
- [Codespaces | GitHub](https://github.co.jp/features/codespaces)

ストレージ代やネットワーク代などが別途かかったりするため単純な比較はできませんが、コンピューティングのみで見るとさすがに GCP の方が安そうですね。

GCP を使って主に開発をしている方は Cloud Workstations の利用を検討してもいいかもしれませんね。個人的に、短期間しかジョインしないメンバーに対してはこういったクラウドの開発環境を用意するのが低コストですみそうと思っています。インターンとか。

# know-how 🎓

## 10 best practices to containerize Node.js web applications with Docker | Snyk Blog
https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

snyk による、Node.js アプリの Docker イメージ化に関する 10 のベストプラクティス紹介記事です。

1. ベースイメージには確定できるタグを明示に指定する
   - おすすめタグも紹介されている
2. `devDependencies` をイメージに含まない
   - `--only=production` の紹介
3. 運用向けであることをフレームワークやライブラリに伝える
   - 慣習的に使われている `NODE_ENV` 環境変数の紹介
4. コンテナをルートとして実行しない
5. 安全にコンテナ上の Node.js ランタイムを終了させる
   - Node.js ランタイムを直接呼び出さない
   - `CMD` コマンドの 2 つの記法（shellform、execform）の違いについて
   - PID 1 での起動を避ける
6. アプリが Graceful shutdown できるようにする
   - `SIGINT`、`SIGTERM` をハンドルする
7. Node.js の Docker イメージのセキュリティ脆弱性を発見・修正する
   - snyk のツールの宣伝も含まれている
   - 修正は `apt-get upgrade` を推奨
8. マルチステージビルドの使用
   - シークレットを引数で渡す方法もあるが history に残ってしまう話
   - ビルドイメージで `node_modules` のインストールまで行い、プロダクションイメージに `node_modules` をコピーする話
9. Node.js の Docker イメージから不要ファイル（`node_modules` や `.env` など）を排除する
   - `.dockerignore` の紹介
10. シークレットをマウントする
    - Docker Secret の紹介 

記事では、それぞれのプラクティスの根拠、なぜ代替案は使えないのかなどを、実験に使えるコード付きで丁寧に説明しています。

僕はあまり Node.js アプリを動かすためのコンテナを作ったことがないのですが、`NODE_ENV` 環境変数の話やシグナルを Node.js ランタイムに渡す方法や Docker Secret 機能を知らなかったため、特にそこら辺固めになりました。

Node.js アプリを Docker イメージ化する際に使えるテクニックが多くあるため、ぜひ読んでみてください。

# tool 🔨

## Step CI
https://stepci.com/

Web API の CLI テストツール stepci です。

例えば HTTP API の場合、リクエストを送る情報（URL やメソッドなど）と予期するレスポンス（ステータスコードや body など）などを設定し、テストを行うことで、予期するレスポンスと実際のレスポンスが一致するかを確認してくれます。予期するレスポンスの指定を省略することで、疎通してるかどうかのみ確認するということも可能です。

現在は、HTTP(GraphQL 含む)、gRPC[^grpc] といったプロトコルに対応しています。設定は YAML で記述します。実装は Node.js で、Docker、GitHub Actions 経由での実行もサポートされています。（正直速度とかインストールが気になるから Go か Rust あたりで作ってほしかった。）

タイムアウトなんかも設定できそうなので、メンテが止まっている [dockerize](https://github.com/jwilder/dockerize) の代替になるかもしれません。CLI ツールではありますが、npm ライブラリも提供されているので、Node.js でも利用できます。

僕も[ちょっと遊んでみました](https://github.com/korosuke613/playground/tree/5517fa3b90b6961679b9806f612c9cfad70e0157/stepci)。

登場したばかりの OSS だからかまだまだ辺な挙動をするときが時たまあります。見つけたら貢献したいですね。

[^grpc]: ちなみに gRPC はつい最近サポートされました。-> [GRPC query support · Discussion #19 · stepci/stepci](https://github.com/stepci/stepci/discussions/19)


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [On the go with GitHub Projects on GitHub Mobile (public beta) | GitHub Changelog](https://github.blog/changelog/2022-10-11-on-the-go-with-github-projects-on-github-mobile-public-beta/)
    - GitHub Mobile アプリで GitHub Projects を操作できるようになりました（パブリックベータ）
    - 利用するにはアプリのベータ版を取得する必要があります
  - [ノーコードでTerraformによるプロビジョニングを実現「No-Code Provisioning for Terraform Cloud」、HashiCorpがベータ公開。HashiConf Global 2022 － Publickey](https://www.publickey1.jp/blog/22/terraformno-code_provisioning_for_terraform_cloudhashicorphashiconf_global_2022.html)
    - Terraform Cloud、Terraform Enterprise において、ノーコードでプロビジョニングする No-Code Provisioning 機能が追加されました
    - モジュールを選んで引数を入力すればコードを書かずにプロビジョニングできるとのことです
    - 個人的にはコードを書きたくなるのであまり使うことはなさそうです
  - [Local timezones available on profiles | GitHub Changelog](https://github.blog/changelog/2022-09-23-local-timezones-available-on-profiles/)
    - GitHub においてローカルタイムゾーンをプロフィールに表示できるようになりました
    - 設定が必要なので、気になる人は設定してみましょう
    - OSS コントリビューターの人には地味に嬉しいのかも
- **know-how 🎓**
  - [EC2からFargateへの移行 ~shadow proxyとカナリアリリース~ | GREE Engineering](https://labs.gree.jp/blog/2022/07/21954/)
    - EC2 から Fargate にシステムを移行したというお話です
    - VPC Traffic Mirroring を使った shadow proxy の構築話が勉強になりました
  - [How to create small Docker images for Rust](https://kerkour.com/rust-small-docker-image)
    - Rust 製アプリを Docker イメージ化する際に、どうやって小さいイメージを作るかというお話です
    - いくつかの軽量ベースイメージでの作成例が載っており、Rust 使いには参考になるかもしれません
- **tool 🔨**
  - [【新サービス】セルフサービスでドキュメント翻訳ができる Translation Hub が発表されたので、早速試しました！ #GoogleCloudNext](https://dev.classmethod.jp/articles/announcing-translation-hub-for-self-service-document-translation/)
    - ドキュメントのレイアウトを維持して翻訳してくれる Google の新サービスが発表されました
    - 用語を登録できたり、カスタマイズした学習モデルを使ったりできます
    - 1 ページあたり 0.15 ドルとなっており、ちょっと高めかもしれません
    - 論文の翻訳に便利そうですね

# あとがき
この前、日本銀行の本店に見学に行ってきました。ツイートに書いてる通りなんですけど、（大半が）明治時代に作られた建物でとても良い雰囲気でした。めちゃ楽しかったです。皆さんもぜひ行ってみてください。

https://twitter.com/Shitimi_613/status/1583395667652665345

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
