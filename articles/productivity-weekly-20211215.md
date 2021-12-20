---
title: "Productivity Weekly (2021-12-15号)"
emoji: "☠️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211215"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 55 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Improving GitHub code search | The GitHub Blog
https://github.blog/2021-12-08-improving-github-code-search/

GitHub のコード検索機能が強化されます（Technology Preview）。

新たなコード検索には以下の特徴などがあります。
- 検索結果をスマートにソート、探しているものが見つけやすくなる
- 検索文字列の部分一致や完全一致、正規表現のサポート
- Organization、リポジトリ、言語やパスなどの絞り込みを自動補完
- 検索条件の保存

早く使ってみたいところですが、現在は Technology Preview のため、waitlist に登録する必要があります。気になる人は今すぐ登録しましょう。

ちなみに Productivity Weekly 参加者の一人がすでに使えるようになっていたため、デモをしてもらいました。あらゆる条件の補完が自動で出たり検索条件を保存して再度使えるようにできるなど、非常に検索しやすそうでした。早く僕も使いたいです。

## Terraform 1.1 Improves Refactoring and the Cloud CLI Experience
https://www.hashicorp.com/blog/terraform-1-1-improves-refactoring-and-the-cloud-cli-experience

Terraform 1.1 がリリースされました。

さまざまな変更がありますが、一番気になる変更として `moved` ブロックが追加されました。Terraform リソースのリソース名を変更したり、モジュールを分割したりする際に、既存のリソースを破壊しない方法として `terraform state mv` があります。しかし、`state mv` は扱いが難しい部分がありました。今回 `moved` ブロックが追加されたことで、`state mv` よりも安全にリソースのリファクタができるようになりました。

`moved` ブロックは移動元（`from`）と移動先（`to`）を `.tf` ファイルに定義して利用します。`.tf` ファイルで定義することで、いつものように `terraform plan` で適用前後の差分を確認し、`terraform apply` で実際に移動できます。適用前後の差分が確認できることで安全に移動することが可能となります。

`moved` ブロックを試したい、どんな感じで使うのか知りたいという方は `moved` を使ったリファクタのチュートリアルがあるのでそちらをご覧ください。

- [Use Configuration to Move Resources | Terraform - HashiCorp Learn](https://learn.hashicorp.com/tutorials/terraform/move-config)

`moved` が登場してリソースの移動がやりやすくなりましたね。今回は `moved` のみ紹介しましたが、Terraform 1.1 には他にも色々変更があるので、元記事の残りも読んでみてください。

## GitHub Actions: Changes to permissions in workflows triggered by Dependabot | GitHub Changelog
https://github.blog/changelog/2021-12-09-github-actions-changes-to-permissions-in-workflows-triggered-by-dependabot/

GitHub Actions において、Dependabot によってトリガーされるワークフローの権限が一部変更されました。具体的には以下のようになりました。

- `create`、`deployment`、`deployment_status` でトリガーされるワークフローは常に read-only なトークンとなり、シークレットは読めなくなる
- `pull_request_target` でトリガーされたワークフローが dependabot が作成したコミットを対象とする場合、常に read-only なトークンとなり、シークレットは読めなくなる
  - 以前 dependabot の権限が変わったときにこの方法で回避してる人たちがいた[^pass]

Dependabot によってトリガーされるワークフローの権限が今年初めくらいに制限され、さまざまなワークフローが落ちたと思います。最近の変更で [`permissions` を尊重するようになったり](https://zenn.dev/korosuke613/articles/productivity-weekly-20211013#github-actions%3A-workflows-triggered-by-dependabot-prs-will-respect-permissions-key-in-workflows-%7C-github-changelog)、[Dependabot のシークレットを利用できるようになったり](https://zenn.dev/korosuke613/articles/productivity-weekly-20211201#github-actions%3A-workflows-triggered-by-dependabot-receive-dependabot-secrets-%7C-github-changelog)したため、以前のように Dependabot に権限を持たせやすくなりました。しかしそれまでは Dependabot によってトリガーされるワークフローに権限を持たせるため、さまざまな回避策が考案されてきました（よく聞いたのが `pull_request_target` による回避）。今回の変更でそれらの抜け道が使えなくなったことになります。

おそらく `permissions` の尊重、Dependabot secrets の利用ができるようになり、抜け道を使わなくてもよくなったからこのタイミングで制限されたのかな〜とか思います。Dependabot 利用者は今年一年大変でしたね。正規の方法で権限を与えていきましょう。

[^pass]: 例：[【Github actions】DependabotのPull RequestでSecretsが参照できずワークフローがFailになった場合の対処 - Simple minds think alike](https://simple-minds-think-alike.moritamorie.com/entry/dependabot-pull-request-fail#pull_request_target-%E3%83%88%E3%83%AA%E3%82%AC%E3%83%BC%E3%82%92%E4%BD%BF%E3%81%86)

# know-how 🎓

## Log4jの深刻な脆弱性CVE-2021-44228についてまとめてみた - piyolog
https://piyolog.hatenadiary.jp/entry/2021/12/13/045541

:::message
Log4j2 の脆弱性はもはやこれを読んでる皆さんご存知かと思います。週末にゼロデイが見つかるのは災難でした...お疲れ様でした。
:::

Log4j2 の任意のコードが実行できてしまうヤバイ脆弱性こと Log4Shell の piyokango さんによるまとめです。

この記事では、簡単なまとめ、悪用された時に何が起きるか、影響を受ける条件、対応方法、不適切な対応方法、その他諸々あらゆる情報がまとまっています。

Log4Shell についてまだ詳しくない方や初動しか関わっていない方などは読むことをお勧めします。

## CircleCI の設定を絵に書いて頭の中を整理 - Mitsuyuki.Shiiba
https://bufferings.hatenablog.com/entry/2021/12/11/025726

CircleCI の各概念をクラス図っぽくしてまとめたやつを作ったという記事です。

CircleCI のドキュメントや `.circleci/config.yaml`、WebUI をみていると Pipeline や Workflow、`save_cache` といった固有名詞がたくさん出てきます。こういった概念の関連がわかっていないとどうしても混乱しがちです。この記事では、各概念がそれぞれどういう関係なのかをクラス図のような図でまとめています。さらに各概念について簡単な説明もしてくれています。

本文中にも書いてありますが、Environment はどこで定義できるかなどをすぐに確認できて良いです。僕もここらへんの概念はたまにあやふやになることがあるのでこういった図はとても助かります。迷ったらこの記事を見にきたいです。

## ソフトウェアテスト自動化カンファレンス2021 - connpass
https://testautomationresearch.connpass.com/event/228204/

ソフトウェアテスト自動化カンファレンス 2021 が開催**されて**いました[^zenzen]。

Productivity Weekly 参加者の一人がこれに参加してたのですが、E2E テスト自動化の苦労話が多かったとのことです（昔はテストを自動化しようという内容が多かったらしい）。

各プレゼンテーション資料は[ここ](https://testautomationresearch.connpass.com/event/228204/presentation/)にまとまっているので、気になる方は資料を読みましょう。

[^zenzen]: 全然アンテナ貼れてなくて気づいてなかった〜

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [docker pull を速くするために：layer-parallel から chunk-parallel へ - 薄いブログ](https://orisano.hatenablog.com/entry/2021/12/15/104959)
  - `docker pull` を高速化する方法です
  - 各レイヤーをチャンク化して並列に pull することで高速化が可能とのこと
  - しかし、OCI Distribution Spec では定義されていません
    - Docker CLI がサポートしているわけではないので、自前で pull 用のツールを書く必要があります
  - こんなことできるんだとなったのですが、正式にサポートされているわけではなく業務利用が厳しそうなので小ネタに載せました
- [Lists are now available as a public beta | GitHub Changelog](https://github.blog/changelog/2021-12-09-lists-are-now-available-as-a-public-beta/)
  - GitHub でスターを付けたリポジトリをリストで管理できるようになりました
  - 「いいね」の意味でつけるスターと自分に関連するリポジトリへのスターが混在しているので、これはありがたいかもです
- [Repro のサーバーサイド開発環境を M1 Mac に対応させるまでの道のり(撤退編) - Repro Tech Blog](https://tech.repro.io/entry/2021/12/14/100000)
  - [以前 weekly で取り上げられた Repro の開発環境 M1 対応](https://zenn.dev/korosuke613/articles/productivity-weekly-20211124#repro-%E3%81%AE%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC%E3%82%B5%E3%82%A4%E3%83%89%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%82%92-m1-mac-%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%95%E3%81%9B%E3%82%8B%E3%81%BE%E3%81%A7%E3%81%AE%E9%81%93%E3%81%AE%E3%82%8A---repro-tech-blog)の続報です
  - 全てのコンポーネントを M1 で開発するのは現時点で厳しいようです
    - Kafka を動かすための docker イメージが M1 では動かなくなってしまった模様。一応 Kafka 関連以外は M1 で開発できるらしい
- [Go 1.18 で interface{} の代わりに any が使えるようになる話](https://zenn.dev/syumai/articles/c6q5un1j0msim0aj0ca0)
  - Go 1.18（正式リリースはまだ）から `interface{}` の代わりに `any` が使えるようになります
  - あくまでエイリアスとのことなので、古いコードを全て置き換える必要は無さそうです
  - gofmt で一括置換できるとか
    - gofmt でそんなことできるんだ
- [Using GitHub’s security features to help identify Log4j exposure in your codebase](https://github.blog/2021-12-14-using-githubs-security-features-identify-log4j-exposure-codebase/)
  - GitHub のセキュリティ機能を使って Log4Shell 対策をするという記事です
  - Dependabot は Log4j2 のバージョンアッププルリクエストを作ってくれます
  - Log4Shell を見つけてくれる CodeQL クエリを公開しています
- [Docker Verified Publisher: Trusted Sources, Trusted Content - Docker Blog](https://www.docker.com/blog/docker-verified-publisher-trusted-sources-trusted-content/)
  - Docker Verified Publisher プログラムの紹介記事です
  - パートナーとして認定された場合の利点についてが紹介されています
  - 例えば Verified Publisher のイメージは pull 時の rate limit に引っ掛からなくなるなどがあります
  - 料金は不明

# あとがき
年末なので飲み会だらけです。楽しいから良いのですが。この前東京ソラマチ（スカイツリーある場所）に行ったのですが、人であふれていて昼飯食うのも厳しい状況でしたね。だいぶコロナ前くらいの人が戻ってきてるのではないでしょうか？（コロナ前は就活くらいでしか東京来てないので本当のところ知らんけど）

この前 1 年ぶりくらいにリアル麻雀をしたのですが、東場に二連続で倍満上がってヤバかったです。しかも両方一発ツモ。他にも何回か上がって 6 万点ちょいで勝利しました。自己ベストじゃないかってくらい点取りましたね。今年の運を使い切ったので今年は終わりです。

https://twitter.com/Shitimi_613/status/1471817565907611648

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### 文章を読むスピードが最大2倍。「読書アシスト」無償公開 - Impress Watch
https://www.watch.impress.co.jp/docs/news/1371843.html

面白い拡張機能が登場していました。Web 記事を文章を読むスピードを 1.5 〜 2 倍に向上させるレイアウトに変換する Chrome 拡張機能、読書アシストです。

実際に使ってみると以下の図のように長文が斜めになります（言葉での表現がむずい）。

![](/images/productivity-weekly-20211215/assist.png =600x)
*実際に使ってみた例：[Productivity Weekly (2021-12-08号)](https://zenn.dev/korosuke613/articles/productivity-weekly-20211208#legacy-convenience-image-deprecation---announcements---circleci-discuss)*

インストールは以下のサイトから。

https://lp.reading-assist.com/

最初なんだこれ！？って思ったのですが、使ってみると確かに読みやすい気がします。拡張機能は 2021/12/06 〜 2022/02/28 まで無償公開されているので、気になる人は今のうちに使っておきましょう。

:::message
余談ですが、僕は 3rd Party 製プラグインを使う場合、全てのサイトでの動作を許可したくないことがあるので、必要な時のみ利用できるようにしています。Edge の場合は拡張機能の設定画面で「サイトアクセス」を「クリック時」にすることで勝手に Web サイトの内容が読まれません。安全を求めたい人は設定してみてください。

![](/images/productivity-weekly-20211215/extension_setting.png =450x)
*拡張機能の設定画面で「サイトアクセス」を「クリック時」にしている*

![](/images/productivity-weekly-20211215/extension_grant.png =350x)
*ページごとに拡張機能を許可する*

:::