---
title: "Productivity Weekly (2022-06-01号)"
emoji: "🦑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220601"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 76 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## The new GitHub Issues - May 19th update | GitHub Changelog
https://github.blog/changelog/2022-05-19-the-new-github-issues-may-19th-update/

GitHub において、Issue をクローズする際に、理由として completed と not-planned を選択できるようになりました。

completed は Issue が完了された、解決されたという理由で使われます（従来通りのクローズ）。not-planned は Issue に対処しない、キャンセルした、重複している、時間が経った（stale）といった理由で使われます。

Issue 絞り込みの際に理由（`reason`）で絞り込むことができます。また、REST API、GraphQL、Webhook には `state_reason` という属性が追加されています（プレビュー）。

これまではクローズされている Issue が completed に当たるものなのか not-planned に当たるものなのか開いてみるまでわからない場合が多かったです。そのため今回の理由付けはコントリビュータにとって嬉しい機能だと思います。Issue をクローズする際は理由を選択していきたいですね。

## GitHub Actions: Re-run jobs with debug logging | GitHub Changelog
https://github.blog/changelog/2022-05-24-github-actions-re-run-jobs-with-debug-logging/

GitHub Actions において、Re-run 時にランナーのデバッグログを有効にできるようになりました。Re-run 時に `Enable debug logging` にチェックを入れるだけです。

これまでは `ACTIONS_STEP_DEBUG=true` という secret をリポジトリに設定する必要があったため、デバッグログの表示が非常に面倒でした（[参考](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/enabling-debug-logging)）。ボタン 1 つで有効にできるのは嬉しいです。

## Easily discover and navigate to multiple licenses in repositories | GitHub Changelog
https://github.blog/changelog/2022-05-26-easily-discover-and-navigate-to-multiple-licenses-in-repositories/

GitHub において、リポジトリルートに置いたライセンスが複数認識されるようになりました。識別されたライセンスの種類は About サイドバーに表示されます。

どういうふうなルールで認識されるのかは分かりませんでしたが、たとえば [github/docs](https://github.com/github/docs/tree/6f93b6c14e93afade84b20a86afdec1f9ad2e8bd) は `LICENSE` と `LICENSE-CODE` をルートに配置することで CC-BY-4.0 と MIT が認識されています。

[私が管理するリポジトリ](https://github.com/korosuke613/tfplantesting)に MIT と MPL-2.0 が混在するものがあるのですが、`LICENSE.mit` というファイル名で MIT ライセンスを置き、別ディレクトリ下に `LICENSE` というファイル名で MPL-2.0 を置いていたところ、LICENCE の種類は Other 表示されていました。github/docs に倣って `LICENSE`、`LICENSE-TESTDATA` というファイル名でルートに配置したところ、`MIT, MPL-2.0 licenses found` と表示されるようになりました。置き場所だけでなくファイル名も重要そうですね...

複数ライセンスの存在が分かりやすくなるのは良いですね。

## Release Support for caching dependency files and compiler's build outputs · actions/setup-go
https://github.com/actions/setup-go/releases/tag/v3.2.0

GitHub Actions において、Go の環境を整える actions/setup-go アクションが単体でのキャッシュに対応しました。

去年夏、GitHub 公式アクションである [actions/setup-node がキャッシュ対応](https://zenn.dev/korosuke613/articles/productivity-weekly-20210811#release-support-caching-for-mono-repos-and-repositories-with-complex-structure-%C2%B7-actions%2Fsetup-node)してから、他の actions/setup-* アクションもキャッシュ対応していきましたが、actions/setup-go は長い間 Issue はあれど対応はしていませんでした。

これで定型文のような actions/cache を書く回数がまた減らせますね。嬉しいです。

# tool 🔨

## [lizard]循環的複雑度（CCN）が高すぎるコードをブロックするGitHub Actionを作ってみた
https://zenn.dev/u_not/articles/e9d0c47d306ba6

循環的複雑度[^cyclomatic]が高いコードを検知するための GitHub Actions のアクション [Uno-Takashi/Lizard-Runner](https://github.com/Uno-Takashi/Lizard-Runner) を作ったという記事です。

循環的複雑度（Cyclomatic Complexity）とはソースコードの複雑さを測定するメトリクスの 1 つです。この値が高いとテストしづらくなるよ、バグが入りやすくなるよ、みたいに言われています。何かしらの分岐が増えると値も増えます[^cyclo]。（気になる人はちゃんと調べてください）

循環的複雑度自体は [lizard](https://github.com/terryyin/lizard) という OSS で計測しており、Lizard-Runner アクションは lizard を簡単に GitHub Actions で利用するためのアクションとなります。

lizard は循環的複雑度以外にもコード行数や引数の数を測ることができ、Lizard-Runner アクションでは計測した値が閾値を超えた場合は失敗するようになっています。閾値や解析対象言語、ignore したいファイルなど、柔軟な設定が可能です。

lizard を簡単に利用できる便利なアクションだと思います。循環的複雑度に基づいてコード品質を上げたい方は使ってみてください。

[^cyclo]: 個人的には循環的複雑度というよりサイクロマティック複雑度の方が馴染みがあります。

## Tools to Visualize your Terraform plan | by Vidyasagar Machupalli | vmacwrites | Medium
https://medium.com/vmacwrites/tools-to-visualize-your-terraform-plan-d421c6255f9f

`terraform plan` 内容を可視化するためのツールをまとめた記事です。

可視化するためのコマンドとして `terraform graph` がありますが、これを使って生成されるグラフは非常に見づらいため、3rd party 製ツールがいくつか存在します。

この記事では 4 つのツール（Blast radius、Terraform Visual、Inframap、Rover）を簡単に紹介しています。

僕は Rover というツールしか知らなかったのですが、案外いくつかあるものなんですね。Terraform Visual が良さそうと思ったのですが、リポジトリの最終更新日が 2 年前でした...最近も更新されているツールとしては Inframap と Rover があります。[Rover は以前 Weekly で小ネタとしてちょっとだけ書いたことがありますね](https://zenn.dev/korosuke613/articles/productivity-weekly-20210707#koneta-%F0%9F%8D%98)。リリースから時間も経ってるのでまた探求してみたいです（Inframap も）。

`terraform plan` や tfstate が可視化されると構成がわかりやすくなって良いので色々探求したいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [WhiteSource is Now Mend: You Code, We Cure | Mend](https://www.mend.io/resources/blog/whitesource-is-now-mend/)
    - WhiteSource Renovate でお馴染みの WhiteSource 社が Mend に改名しました
    - WhiteSource Renovate と呼んでいた方は Mend Renovate と呼ぶようにしましょう
    - ちゃっかりプルリクエストに表示されるバナーや GitHub Apps アイコンが新しくなってます
- **know-how 🎓**
  - [JavaScriptの上限・限界値 - Qiita](https://qiita.com/mod_poppo/items/f3fcbc673526c84b9387)
    - JavaScript の上限・限界値を調べたという記事です。対象は文字列長やネストの深さ、仮引数の数などいろいろです
    - 検証の結果をエンジン（V8、SpiderMonkey、JavaScriptCore）ごとに載せており、エンジンによって全く値が異なることがわかります
    - 検証に使ったスクリプトも公開してくれています

# あとがき
今週号はネタ少なめでした。[WWDC 2022](https://www.gizmodo.jp/2022/06/wwdc22-realtime.html?cx_click=pc_ranking) がありましたね。僕は大人しくリアル参加はせずに寝てました。個人的には macOS Ventura の [Stage Manager](https://forest.watch.impress.co.jp/docs/news/1415060.html) が嬉しいです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 家を建てるソフトウェアエンジニアたち
https://cocopon.me/blog/2022/05/myhome/

https://blog.kuniwak.com/entry/testman-and-my-home

おまけです。たまにソフトウェアエンジニアが家を建てるブログを見ますが、ここ最近も新たに家を建てた話が 2 つも公開されていました。

ライフプランシミュレータを自作したり、洪水シミュレーションをしたり採光シミュレーションをしたりと、家を建てるためにとことん検証を重ねていることがわかります。ここまでして初めて満足行く家を建てられるということなんでしょうね。すごいです。

大事な観点や検証方法など、家を建てるときにが載っていると思うので、家を建てることを検討している方は一度読んでみてもいいかもしれません。

（僕は今の所家を建てる予定はありません）
