---
title: "Productivity Weekly (2021-05-12号)"
emoji: "🌴"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 25 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## Sync an out of date branch of a fork from the web | GitHub Changelog
https://github.blog/changelog/2021-05-06-sync-an-out-of-date-branch-of-a-fork-from-the-web/

GitHub のフォークしたリポジトリにおいて upstream に追従するのを Web UI 上のボタンからできるようになりました。

これまで upstream との差分が出た場合にはローカルマシン上で、upstream を定義(まだ無ければ)して、fetch して、main ブランチにマージ[^hard]して...というような作業をする必要がありました。正直非常に面倒でした。この機能が追加されることで、簡単にフォークしたリポジトリを upstream に同期できるようになります。OSS コントリビューターの方などフォークする機会が多い人にはとても嬉しい変更ですね。

[^hard]: マージじゃなくても `git reset --hard upstream/main` という風にするのもありか。

## 'matches' logical statement in config - CircleCI
https://circleci.com/changelog/#matches-logical-statement-in-config

CircleCI Cloud に matches 文が追加されました。ブランチ名やタグ名に正規表現がマッチするかでワークフローの実行やステップの実行を制御できます。(以前紹介した[path-filtering](https://zenn.dev/korosuke613/articles/productivity-weekly-20210331#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%83%BB%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC(%E3%83%A2%E3%83%8E%E3%83%AC%E3%83%9D%E5%AF%BE%E5%BF%9C)-%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%82%88%E3%81%86%EF%BC%81---community---circleci-discuss)は任意のファイルの有無でワークフローの実行を制御できるものでした。)

実際にどんなものか使ってみました。
https://zenn.dev/korosuke613/scraps/6b8a88c88d4479

今まではジョブ単位なら `filters` で制御できてましたがワークフロー単位やステップ単位でのスキップはテクニックが必要でした。それらが簡単にスキップできるようになったのは良いですね。しかも、ブランチやタグ以外の値も利用可能なので柔軟にスキップできます。

## Shift left AWS tag enforcement with Terraform and tfsec - Sander Knape
https://sanderknape.com/2021/05/shift-left-aws-tag-enforcement-terraform-tfsec/

Terraform AWS Provider にデフォルトタグ機能が追加されました（v3.38.0 から）。プロバイダの設定でタグをサポートするすべてのリソースに共通のタグを設定できます。全てのリソースに共通のタグを付与したい場合（特定のアプリケーションであることを表したい場合など）、今まではリソースごとにそのタグを設定する必要がありました。

これからは以下のように `default_tags` を使って設定できます。

```hcl
provider "aws" {
  default_tags {
    tags = {
      Application = "Hoge"
    }
  }
}
```

全てのリソースに共通のタグをつけるのが簡単になったことで野良リソース（構成管理されていないリソース）が見つけやすくなったり、アプリケーションに関わるリソースが検索しやすくなったりと、生産性が上がりそうです。

## Get started with a 1Password Secrets Automation workflow
https://support.1password.com/secrets-automation/

サーバー等のプログラムから 1Password[^1pass] 上のシークレットを参照/保存できる 1Password Secrets Automation がリリースされました。アプリケーションから直接 1Password 上のシークレットを取得するのではなく、Connect Server というサーバを経由してシークレットを取得できます。この Connect Server は自前でデプロイする必要があります。

さっそくクラメソさんが試してみた記事を出していました。

1Password Secrets Automation を情シスメンバーの助力を得つつ試してみた | Developers.IO
https://dev.classmethod.jp/articles/1password-secrets-automation/

シークレットの管理方法は色々ありますが、1Password Secrets Automation を使うことで数あるシークレットを一元管理できそうです。

[^1pass]: パスワード管理サービス。

# know-how

## corepack is 何?
https://zenn.dev/teppeis/articles/2021-05-corepack

Node.js に corepack というパッケージマネージャー管理ツールをバンドルすることが決まりました。この記事では、corepack とは何かを解説しています。

Node.js のパッケージマネージャーには npm や yarn がありますが、どのパッケージマネージャーを使うか、どのバージョンを使うかをデフォルトで強制できません。そのため yarn で管理しているプロジェクトで npm を使えたり、npm v6 で管理しているプロジェクトで npm v7 が使えたりしてしまいます。

そう言った問題を解決するために、corepack を使うことで、パッケージマネージャの種類やバージョンを固定できます。corepack はまだバンドルされていませんが、npm でインストールして利用できます。この記事では、インストールや有効化、実際の挙動も紹介されています。

僕もよく npm のバージョンが v6 か v7 かがプロジェクトによって異なるため面倒なことになるので、corepack 良いなと思いました。しかし、まだ Node.js にバンドルされていないためチームで使ったり、asdf などのランタイム管理ツールとの相性が悪い[^asdf]ので、早くバンドルしてほしいですね。

[^asdf]: 各環境ごとにcorepackをインストールする必要がある。

# tool

## withfig/autocomplete: Fig adds VSCode style autocomplete to your terminal
https://fig.io/

mac のターミナルアプリ上でコマンドを打つ際に自動補完を IDE チックにしてくれるツールです。まだ誰でも使えるというわけではなく、Early Access に登録して待つ必要があります。

[withfig/autocomplete](https://github.com/withfig/autocomplete/tree/master/specs) にコマンドごとの補完設定が記述されており、ここにあるコマンドには対応しているようです。[js を記述して配置することで自前のスクリプトの補完設定も可能](https://fig.io/docs/autocomplete/guides/autocomplete-for-internal-scripts#setting-up-autocomplete-for-your-script)です。

1 回使ってみたいと思い Early Access に登録してみましたが、まだ wait list のままなので使えていません。興味ある方はとりあえず Early Access に登録しておくことをお勧めします。

## SpectralOps/teller: A secrets management tool for developers built in Go - never leave your command line for secrets.
https://github.com/SpectralOps/teller

各種クラウドサービスに置いたシークレットをローカルのターミナルに展開できるツールです。

プログラム実行時に必要なシークレットを Git に追加するわけにはいかないので、.envrc などのファイルに環境変数として記述することが多いと思います。Git で管理できないため、クローンしてからそう言った設定をする必要がありちょっと面倒です。teller を使うことで必要最低限なシークレット(シークレットを取り出すためのシークレット)のみをローカルに用意すればよくなるため、環境構築が楽になります。

シークレットをどこに保存しているかも明確になり、チーム開発時も役立ちそうです。

## google/zx: A tool for writing better scripts
https://github.com/google/zx

JavaScript でシェルスクリプトを簡単に書くためのライブラリおよびツールです。JS からシェルのコマンドを呼び出す処理を書くのはまあまあ面倒ですが、zx を使うことで楽に記述できます。非同期処理も書きやすいのが良いですね。

実際に触ってみました。↓
https://zenn.dev/korosuke613/scraps/07729cd55a628b

当たり前ですが zx は node で動作するため、node が動く環境でなければ動かせません。なのでこれからシェルスクリプトを全く書かなくても良いかと言うとそう言うわけではないですが、node のプログラム内で手軽にシェルのコマンドを扱えるのは良いですね。


# koneta
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Security keys are now supported for SSH Git operations | The GitHub Blog](https://github.blog/2021-05-10-security-keys-supported-ssh-git-operations/)
  - Github に対して push や pull をする際に ssh キーとして yubikey などのセキュリティキーが使えるようになりました。
- [Copying and pasting Markdown code blocks just got a whole lot easier. Click to copy and paste away!](https://twitter.com/github/status/1391867011832193030?s=20)
  - GitHub で、Markdown のコードブロックを簡単にコピーできるようになりました。ボタンをポチッと押すだけ
- [生産性が爆上がりするブラウザ：Sidekick｜One Capital｜note](https://note.com/onecapital/n/n974fecd748df)
  - Sidekick というブラウザの紹介です。速度に自信があり、色々なクラウドサービスをサイドバーに登録できるようです。お金を払えばチームで利用できてそこが面白そうです。
- [banga/git-split-diffs: GitHub style split diffs in your terminal](https://github.com/banga/git-split-diffs)
  - diff を GitHub ライクに表示するツールです。似たようなものに[delta](https://github.com/dandavison/delta)がありますが、こちらの方がより GitHub っぽいです。あと、体感でこちらの方が軽い気がしました。npm でインストールする必要があるのがちょっと嫌ですね。
- [readme.so - Easiest Way to Create A README](https://readme.so/)
  - README.md の雛形を生成できるサイトです。OSS の README 書くのに便利そうです。

# あとがき
ゴールデンウィーク明けの Productivity Weekly でした。みなさん久々の Weekly でイキイキとしていました。僕はもう GW 何やってたか忘れてしまいました。記憶がない...

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

## 持たずに操作！ハンズフリーマルチアングルスマホホルダー
https://www.thanko.jp/shopdetail/000000003748/

写真を見ての通りです。スマホを腕に装着できる画期的なアイテムです。腕に巻いたホルダーにはスマホアームがついており、スマホの角度や位置を自由自在に変えることができます。これを使えば左手に荷物、右手に電車の吊り革と言うような状況になってもスマホで動画を見ることができます。観光地での歩きながらの動画撮影もしやすそうですね。

めちゃくちゃほしいとなって後で注文しようと思ってたら予約商品となってしまっていました...

![](https://storage.googleapis.com/zenn-user-upload/ihrgksqxpknrzcltjm0pququtkz1)

前見た時は普通に買えそうだったのに...トホホ...
とりあえず注文しました。ほしい方は早めに予約しましょう。