---
title: "Productivity Weekly (2021-09-08号)"
emoji: "🧸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 42 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Node.js now includes Corepack

https://nodejs.org/en/blog/release/v16.9.0/

先週紹介したパッケージマネージャーのマネージャーである [Corepack](https://zenn.dev/korosuke613/articles/productivity-weekly-20210901#corepack-node.js%E3%81%AB%E8%BF%BD%E5%8A%A0%E3%81%95%E3%82%8C%E3%81%9F%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BC%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%A3%E3%83%BC-%2F-%23tng37---speaker-deck) が Node.js v16.9.0 に追加されました。

Node.js v16 は現在 Status が CURRENT ですが、10 月下旬から ACTIVE LTS になる予定です。このまま何も問題が起きなければもう少しで Corepack を LTS で使えるようになります。

僕は npm と yarn の両方を使っているので待ち遠しいです。標準で使えるようになるのが楽しみですね。

## API to Sync Fork with Upstream | GitHub Changelog
https://github.blog/changelog/2021-09-03-api-to-sync-fork-with-upstream/

GitHub の Fetch upstream が API で叩けるようになりました。Fetch upstream は fork 先ブランチが fork 元ブランチ(upstream)の変更を追従してくれる機能であり、GitHub の WebUI からボタンを押すことで実行できていました。これが API でできるようになったため、ブラウザを開かずとも楽にリモートブランチの upstream への追従ができるようになりました。

## cli: The (currently-experimental) terraform add generates a starting point for a particular resource configuration. (#28874)
https://github.com/hashicorp/terraform/blob/ad634f60a5acbaade1eb8c225564e17ad2267f00/CHANGELOG.md#:~:text=cli%3A%20The%20(currently-experimental)%20terraform%20add%20generates%20a%20starting%20point%20for%20a%20particular%20resource%20configuration.%20(%2328874)

Terraform v1.1.0（未リリース）から `terraform add` コマンドが追加されそうです。リソースを指定すると HCL2[^hcl2] の雛形を出してくれる機能です。

:::message
まだ正式にリリースされていないので今回書いている内容は今後変わる可能性があります。ご注意ください。
:::

雛形を出してくれるとリソース定義を 1 から書く手間が省けて楽ですが、良いことはそれだけではありません。これまではインポートする際にリソース定義の書き方がわからないため、とりあえず空のリソース定義を適当に作って `terraform plan` を繰り返して差分を確認するということをよくやっていました。非常に面倒だったのですが、新たに追加される `terraform add` コマンドの `--from-state` オプションを使うことで Terraform で管理されていない既存リソースのリソース定義を出力してくれるため、インポート作業が非常に楽になります。

Terraform v1.1.0-alpha20210908 を使って手元で試してみました。期待通りインポート作業が楽になりそうです。リリースが待ち遠しいですね。

:::details 試してみた。
```text:バージョン
❯ terraform version
Terraform v1.1.0-alpha20210908
on darwin_amd64
```

```text:必須のみ
❯ terraform add aws_iam_user_policy_attachment.hoge
# NOTE: The "terraform add" command is currently experimental and offers only a
# starting point for your resource configuration, with some limitations.
#
# The behavior of this command may change in future based on feedback, possibly
# in incompatible ways. We don't recommend building automation around this
# command at this time. If you have feedback about this command, please open
# a feature request issue in the Terraform GitHub repository.
resource "aws_iam_user_policy_attachment" "hoge" {
  policy_arn = null # REQUIRED string
  user       = null # REQUIRED string
}
```

```text:オプションあり
❯ terraform add -optional aws_iam_user_policy_attachment.hoge
# NOTE: The "terraform add" command is currently experimental and offers only a
# starting point for your resource configuration, with some limitations.
#
# The behavior of this command may change in future based on feedback, possibly
# in incompatible ways. We don't recommend building automation around this
# command at this time. If you have feedback about this command, please open
# a feature request issue in the Terraform GitHub repository.
resource "aws_iam_user_policy_attachment" "hoge" {
  id         = null # OPTIONAL string
  policy_arn = null # REQUIRED string
  user       = null # REQUIRED string
}
```

```text:-from-state
❯ terraform add -from-state aws_iam_service_linked_role.hoge
# NOTE: The "terraform add" command is currently experimental and offers only a
# starting point for your resource configuration, with some limitations.
#
# The behavior of this command may change in future based on feedback, possibly
# in incompatible ways. We don't recommend building automation around this
# command at this time. If you have feedback about this command, please open
# a feature request issue in the Terraform GitHub repository.
resource "aws_iam_service_linked_role" "hoge" {
  aws_service_name = "spot.amazonaws.com"
  custom_suffix    = ""
  description      = ""
  id               = "arn:aws:iam::0123456789:role/aws-service-role/spot.amazonaws.com/AWSServiceRoleForEC2Spot"
}
```
:::

[^hcl2]: HashiCorp Configuration Language v2.x のこと。

# know-how 🎓
## AWS SSO のリソースを簡潔に記述するための Terraform モジュールを公開しました - Speee DEVELOPER BLOG
https://tech.speee.jp/entry/2021/09/02/162820

AWS SSO リソースを簡単に記述するための Terraform モジュール speee/sso-assignment/aws および、Terraform で管理されていない AWS SSO リソースをインポートするための CLI ツール sso-importer の解説記事です。

複数の AWS SSO リソースを Terraform で管理する際、全体的に冗長なコードとなってしまうため、共通の部分をモジュールに切り出したとのことです。記事中では、Terraform モジュール化した経緯や、モジュールおよびインポーターの使い方も載っています。

すでに Terraform で AWS SSO のリソースを管理している方もこれから Terraform で管理しようとしている方にもおすすめしたい記事です。

## user/.githubリポジトリを使い、FUNDING.ymlやCODE_OF_CONDUCT.mdなどを一括設定する | Web Scratch
https://efcl.info/2021/09/04/github-meta-repository/

GitHub において、ユーザ、オーガニゼーション配下の全てのリポジトリに FUNDING.yaml や CODE_OF_CONDUCT.md を一括で設定する方法を解説している記事です。`<ユーザ名|アカウント名>/.github` リポジトリにそれらのファイルを置くことで一括設定ができるのですが、この記事には、どのようなファイルが現在サポートされているかも載っています。

一括で設定しないとリポジトリ 1 つ 1 つにメタ的ファイルを置かなければならないためとても面倒です。特に活発に OSS コントリビューションをしている方や OSS を公開している方および組織には嬉しい機能ですね。

ちなみに[僕も試してみました](https://github.com/korosuke613/.github)（ていっても FUNDING.yaml だけ）。ついでに [GitHub Sponsors にも登録してみました](https://github.com/sponsors/korosuke613)。これからもっと精進して寄付しようと思ってもらえるような存在になっていきたいですね。


## Replacing Docker Desktop with hyperkit + minikube - Cirrus Minor
https://arnon.me/2021/09/replace-docker-with-minikube/

minikube を利用して Docker 環境を作るという記事です。minikube は Kubernetes 環境を作成・管理するためのツールですが、建てられる VM 内の docker.sock はホストに公開されるため、それを利用することでホストから VM 内の Docker デーモンを利用できます。この記事にある方法で簡単に Docker Desktop を使わずにある程度動く Docker 環境を作ることができます。

Minikube で無料で商用利用できる Docker 開発環境をつくる
https://zenn.dev/sasasin/articles/43a1b79a4cfdc1

同時期に日本語での記事も出ており、こちらではドライバーに VirtualBox を使っていました。

僕も早速試してみました。

- [hyperkit + minikube で docker 試してみる](https://zenn.dev/korosuke613/scraps/d4e81c5a5fab74)

本当に簡単に設定できましたが、デフォルトだと `-v` によるマウントができなくてちょっと面倒でした。また、僕の環境だとちょくちょくネットワーク周りが不安定になった[^why]ので、やっぱり代替にするにはまだ微妙だなと思いました。

[^why]: [たぶん理由は Cisco Umbrella のせい](https://github.com/kubernetes/minikube/issues/3036#issuecomment-511028576)

# tool 🔨

## JSONをいい感じに見るCLIを作った
https://zenn.dev/uzimaru0000/articles/look-at-json-pretty

配列になっている JSON をテーブル形式で表示するための CLI ツール tv の紹介記事です。配列で構成された JSON のデータをざっと眺めるのはまあまあ大変ですが、このツールを使うことでテーブルとして見ることができて一覧性が向上します。

Markdown の表形式で表示したりヘッダを表示しなかったりとオプションも充実しています。また、JSON は CSV と違ってフィールドをネストできますが、ネストされたフィールドは `...` として別テーブルに詳細を表示できます。（トップレベルが配列でなければいけないので、配列までのデータの抽出に jq などを使う必要があります。）

複数レコードが入った JSON をざっと確認したい場合などに便利そうです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [HashiCorp runs low on staff, calls a halt to Terraform pull requests • The Register](https://www.theregister.com/2021/09/07/hashicorp_pause/)
  - HashiCorp 社が Terraform Core チームの人員不足を理由に、コミュニティからの Terraform へのプルリクエスト対応を一時的に停止しました。
  - HashiCorp ほどの企業だと人もたくさんいそうですが、そうでもないようです。求人もたくさん出ているようなので、転職チャンスかも？？
- [curl 7.75.0 is smaller | daniel.haxx.se](https://daniel.haxx.se/blog/2021/02/03/curl-7-75-0-is-smaller/)
  - curl において、`--aws-sigv4` が使えるようになりました
  - Amazon Elasticsearch Service のような IAM の認証が挟まっているものに対して署名を作らずとも curl が使えるようになります（今までは署名が必要でとてもめんどかったらしい）
  - こういう特定パブリッククラウド向けの変更って curl に入るものなんですね。そこに驚きました
- [Viewing LFS Usage by Repository | GitHub Changelog](https://github.blog/changelog/2021-09-03-viewing-lfs-usage-by-repository/)
  - GitHub において、Git LFS のストレージ使用量がリポジトリごとで見えるようになりました。
  - > 先週から Git LFS のリポジトリごとのストレージ使用量が見えるようになりました。Organization を管理していて、LFS のストレージが上限に達しそうなんだけど、どのリポジトリが LFS たくさん使ってるかわからない！っていうことがあったと思うんですが、これで確認可能に。
  https://twitter.com/yuichielectric/status/1435142985222541315?s=20
- [分割ビューで会話を開く | Slack](https://slack.com/intl/ja-jp/help/articles/4403608802963-%E5%88%86%E5%89%B2%E3%83%93%E3%83%A5%E3%83%BC%E3%81%A7%E4%BC%9A%E8%A9%B1%E3%82%92%E9%96%8B%E3%81%8F)
  - Slack アプリで複数チャンネルを同時に見たい場合、⌘キー押しながらチャンネルとかを開くと分割表示になります
  - 知らなかったです。これは便利ですね
- [gsamokovarov/jump: Jump helps you navigate faster by learning your habits. ✌️](https://github.com/gsamokovarov/jump)
  - 移動頻度の高いディレクトリにキーワードでジャンプできる CLI ツールです。
  - 似たようなツールに [z](https://github.com/rupa/z) があります。
  - 使えそうと思ったんですけど、僕は [ghq](https://github.com/x-motemen/ghq) と [fzf](https://github.com/junegunn/fzf) を組み合わせて移動することが多いのであんまり出番が無さそう...
- [Fig](https://fig.io/)
  - コマンドの補完を VSCode 風に行えるツールです。
  - [以前も紹介した](https://zenn.dev/korosuke613/articles/productivity-weekly-20210512)のですが再度登場したので小ネタに載せました
  - 最近「waitlist から外れたよ！」ってメールが来たのですが、1 週間遅れでリンクに飛んだら無効になってました。悲しい

# あとがき
今回あんまり時間がなくていくつかのネタをあまり深掘りできませんでした（だから小ネタも多い）。最近ガンプラにハマっていてそれ関連の動画ばっかり見てたり自分も作ってたりしています。あと、社外の友人が炎上プロジェクトに巻き込まれていて、いろんな愚痴を聞いています。サイボウズではありえないような話がたくさん聞けて楽しいです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

:::message
すみません。今週のおまけはお休みです
:::
