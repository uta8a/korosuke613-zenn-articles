---
title: "Productivity Weekly (2022-02-16号)"
emoji: "💊"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220216"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 63 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message
投稿が大変遅くなってしまいすみません。体調不良で寝込んでました（後述）。
ちなみに、2022/02/23 号は祝日だったためお休みです。
:::

# news 📺

## Free プランでも macOS Executor の利用可能 | CircleCI
https://discuss.circleci.com/t/free-macos/42956

CircleCI の Free プランで macOS Executor（Medium）が利用可能になりました。これまでは有料プランを契約しないと CircleCI で macOS は使えませんでした。

当たり前ですが、無限に使えるというわけではありません。Free プランの場合、月 30,000 クレジット[^price]利用できます。macOS Medium の場合は毎分 50 クレジットの消費[^credit]となるため、単純計算で月最大 600 分利用できることになります（実際は他にも色々消費されるのでそんなに利用できないかもしれません）。やはり Linux VM と比べて割高とはなってしまいますが、それでも無料で 600 分近く使えるとできることが色々広がりますね。

Apple 製品向けのネイティブアプリ開発者には嬉しい変更ですね。

[^price]: 2022/02/28 時点。https://circleci.com/ja/pricing/#comparison-table
[^credit]: 2022/02/28 時点。ちなみに、どこのページに消費クレジットが載ってるのかよくわからなかったため[つぶやいたら CircleCI の中の人に教えていただけました](https://twitter.com/CircleCIJapan/status/1494150139833090049)。親切。https://circleci.com/ja/product/features/resource-classes/

## JavaScript Actionsをnode16で動かすようにする - Kengo's blog
https://blog.kengo-toda.jp/entry/2021/12/23/202503

GitHub Actions の JavaScript action でいつの間にか Node.js 16 系が使えるようになってました。これまでは Node.js 12 系しかサポートされていませんでした。

actions.yaml の `runs.using` で `node16` を指定することで使えます。ちなみに、`node14` はありません。どうやら 2021 年 12 月はじめから適用されていたようです。~~こういうのを GitHub Changelog で教えてくれ。~~

記事では `runs.using` の書き換え以外に必要な更新作業も乗っけてくれています。

上記記事にも書いてありますが、Node.js v12 はサポート切れが近いので、JavaScript action を作っているみなさんも早めに v16 対応しましょう。

## Include diagrams in your Markdown files with Mermaid | The GitHub Blog
https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/

GitHub の Markdown で [Mermaid](https://mermaid-js.github.io/mermaid/#/) がレンダリングされるようになりました。コードブロックの言語の指定で以下のように `mermaid` を指定することでレンダリングされます。

```
```mermaid
```

Mermaid は JavaScript ベースのダイアグラム作成ツールです。似たようなものですと [PlantUML](https://plantuml.com/ja/) があります。なぜ Mermaid が選ばれたのかは、説明されていませんが、PlantUML が Java のサーバを用意する必要があるのに対して、Mermaid はブラウザ上で完結する点が良かったのかもしれません（という話が会で出ました）。

Mermaid の便利な部分や PlantUML との比較は以下の記事が参考になると思いました。

- [GitHub で使えるようになった Mermaid の便利なところ](https://zenn.dev/yasuhiroki/articles/dd0feae790ba41)
- [会社でフロー図を書こうと思って PlantUML と mermaid.js を比べてみる](https://qiita.com/suzuki-hoge/items/2cc68666511d6bc65e3f)

お手軽に GitHub 上で作図できるようになったのは良いですね。あまり複雑になりすぎないように注意しながら活用していきたいです。

## GitHub Enterprise Server 3.4 improves developer productivity and adds reusable workflows to CI/CD | The GitHub Blog
https://github.blog/2022-02-15-ghes-3-4-developer-productivity-reusable-workflows-ci-cd/

[Release notes - GitHub Docs](https://docs.github.com/en/enterprise-server@3.4/admin/release-notes#3.4.0.rc1)

GitHub Enterprise Server 3.4 の Release Candidate 版[^rc]がリリースされました。

GHES 3.4 では以下のような変更があります。

- GitHub Actions の Reusable Workflows（[参考1](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#github-actions%3A-dry-your-github-actions-configuration-by-reusing-workflows-%7C-github-changelog)、[参考2](https://zenn.dev/korosuke613/articles/productivity-weekly-20211201#github-actions%3A-reusable-workflows-are-generally-available-%7C-github-changelog)）
- Dependabot が利用可能になる（セキュリティアップデートとバージョンアップの両方）
- [リリースノートの自動生成](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#a-new-public-beta-of-github-releases%3A-how-we%E2%80%99re-improving-the-release-experience-%7C-the-github-blog)
- [レビュー不要の `Require a pull request before merging`](https://zenn.dev/korosuke613/articles/productivity-weekly-20211117#require-pull-requests-without-requiring-reviews-%7C-github-changelog)
- などなど

とうとう Dependabot が GHES で使えるようになりますね。これまでは依存関係更新を自動化したければ Renovate のオンプレ版を用意するなどが必要でした。選択肢が増えるのはいいことですね。

正式リリースはまだなので楽しみに待ちましょう。

[^rc]: 正式リリースの一歩手前。

# know-how 🎓

## TerraformのAWS Provider v4メジャーアップデートは破壊的変更あり - Qiita
https://qiita.com/Shoyu_N/items/871ebf0c1d41493c22ac

Terraform AWS Provider が v4 にメジャーアップデートしました。しかし、破壊的変更があってすんなりとはアプデできないとのことです。

記事ではリリースノート、アップグレードガイドへのリンクや暫定対応方法（最新リリースを利用しないようにする方法）、どういったエラーが発生するか、破壊的変更を入れた理由、アプデに際して参考になった Issue などが書かれています。

また、最近クラメソさんも v4 についての記事を出してくれました。

https://dev.classmethod.jp/articles/terraform-aws-provider-version-4/

こちらの方の記事では、`aws_s3_bucket` リソースの変更について、v4 では何ができるようになったのか、他にどういう変更があるのかなどが書かれています。こちらも合わせて読んでおくと良いと思います。

自分はまだ v4 を触ってませんがアプデ時は注意しないといけないですね...S3 バケットのリソース定義は確かに他の AWS リソースと比べて詰め込みすぎだろとは思っていました。S3 バケットを多用している皆さんも頑張ってアプデしていきましょう。

# tool 🔨

## jless - Command Line JSON Viewer
https://jless.io/

CLI ツールのリッチな JSON ビューワです。標準入力やファイルから JSON を読み込んでインタラクティブに中身を読むことができます。

コマンドは Vim ライクとのことなので、Vim に親しみのある方はすぐに使えそうです。

会の時点では `cargo` くらいしか簡単なインストール方法がなかったのですが、この文章を書くために再度開いたところ Homebrew でもインストールできるようになってました。なので実際使ってみました。階層を閉じたり開いたりできるので、モノによっては Vim などでフラットに読むよりも読みやすそうだと感じました。まだ Pre-release ということで動作は若干不安定でした。

CLI な環境しかない状況で JSON をじっくり読みたい場合に使えそうです。

# あとがき
実は新型コロナウィルスに感染してしまって、先週（2/21 の週）はずっと寝込んでいました。それもあって投稿が大変遅くなってしまいすみませんでした。今はもう回復しています。

コロナ、僕は熱、頭痛、関節痛、喉の痛みくらいで済みましたが、それでも 1 週間近く不調が続いてきつかったですね。[東京都から在宅支援物資を送ってもらったり](https://www.fukushihoken.metro.tokyo.lg.jp/iryo/kansen/corona_portal/shien/uchisapo_tokyo.html)、会社の先輩や同期から食料を送ってもらったりしてなんとか生き延びることができました。持つべきものは自治体と友ですね。みなさんもお気をつけください。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### Get Chrome OS Flex for PC or Mac - Chrome Enterprise
https://chromeenterprise.google/os/chromeosflex/

Chrome OS Flex という Chrome OS っぽい OS が発表されました。

Chrome OS は Chromebook などでのみ使える OS でしたが、Chrome OS Flex は任意の PC に自分でインストールできるので、Chromebook を持っていなくても Chrome OS を使うことができます（ただ、Chrome OS よりも機能は少ないらしい）。

最近の Windows や macOS についていけなくなった古い PC でも高速に動くとのこと[^high]なので、古い PC を復活させることができそうです。

僕も気になったので Parallels Desktop に入れようと、[Forum](https://forum.parallels.com/threads/chrome-os-flex.356687/#post-900637) を参考にインストールを試したのですが、うまくいきませんでした...

ただ、今日（2022/03/02）再度調べたところ、なんかうまくいきそうな記事が公式で出ていました。後ほど試してみたいと思います。

- [Run Chrome OS Flex in Parallels Desktop 17 for Mac - Parallels Blog](https://www.parallels.com/blogs/run-chrome-os-flex-in-parallels-desktop-for-mac/)

[^high]: どこまで古い PC でも動くのかは気になる。

