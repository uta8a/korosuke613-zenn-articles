---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-01-08)
emoji: 🍆
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250108
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
    _本項の執筆者: [@naotama](https://zenn.dev/naotama)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-01-08 単独号です。

今回が第 174 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
<!-- - [@takoeight0821](https://zenn.dev/takoeight0821) -->
- [@takamin55](https://zenn.dev/takamin55)
- [@naotama](https://zenn.dev/naotama)
:::

# news 📺

## Node.js Now Supports TypeScript By Default | Total TypeScript
https://www.totaltypescript.com/typescript-is-coming-to-node-23

## Expanding Access to the GitHub Copilot Workspace Technical Preview - GitHub Changelog
https://github.blog/changelog/2024-12-30-expanding-access-to-the-github-copilot-workspace-technical-preview/

GitHub Copilot Workspace（technical preview）が全ての有料 copilot ユーザで使えるようになりました。これまでは waitlist に入る必要がありました。なお、Enterprise Managed User は利用できません。

もし Organization で使いたい場合は、Copilot Extension の有効化、Copilot in GitHub.com のプレビュー機能の有効化、Copilot Workspace の Oauth app の承認が必要と記事には書かれています。
（これ Organization においては Copilot Extension 扱いなんですね...ややこしすぎる。個人リポジトリでは普通に使えるのは嬉しいです。）

使い方は次のリポジトリ、ブログが参考になるとのことです。
- https://github.com/githubnext/copilot-workspace-user-manual 
- https://github.blog/ai-and-ml/github-copilot/5-tips-and-tricks-when-using-github-copilot-workspace/

2 ヶ月くらい前に waitlist から使えるようになったので触ったのですが、どういう設計をするかのブレインストーミングをできるのが個人的に特に面白いと思いました。いかんせん英語で出力されるのでそこがネックですが...
色々アプデもされてるみたいですが、最近触れていないのでまた触ってみたいと思います。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## GitHub ActionsでGoのコンテナイメージをビルド・プッシュする際のベストプラクティスを考える
https://zenn.dev/micin/articles/build-and-push-go-app-iamge-in-github-actions

GitHub Actions 上で Go のコンテナイメージをビルドする際に起きうるケースについて、速度を比較検証している記事です。
例えば、キャッシュなし、レイヤーキャッシュの有無とその置き場、Go キャッシュの有無、どの環境でビルドするかなど、合計で 8 つのケースが比較検証されています。

実は生産性向上チームでも GitHub Actions 上での Go のコンテナイメージビルドの高速化させた際の記事を公開しているのですが、8 つのケースのうちの 1 つの方法としてその記事が紹介されていました。参照していただき光栄です。ありがとうございます（宣伝）。

8 ケースの中から自チームで取り入れられそうな手法を選択すれば、簡単に自チームの Go のコンテナイメージビルドを高速化できそうですね。

なお、最も高速な方法は、「GitHub Actions のホスト環境で [ko-build/ko](https://github.com/ko-build/ko) というツールを使ってビルドする」でした。
`ko-build/ko` は知らなかったので勉強になりました。Go 専用のコンテナイメージビルドツールで、Docker を使わずに高速かつ安全にコンテナイメージをビルドできるようです。欠点としては、Dockerfile 内で少し複雑な処理を行う場合には使いにくいという点が紹介されています。

シンプルに `go build` するだけのような場合は、`ko-build/ko` を採用しても良いかもしれませんね。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## GitHub Actionsで定期実行（cron）のワークフローを組んだユーザーが退職すると、ワークフローは無効化される - shmokmt's blog
https://shmokmt.hatenablog.com/entry/2024/12/26/142250

GitHub Actions ではワークフローの実行のトリガーに cron を指定できますが、それには罠があって、cron 式の変更を最後にコミットしたユーザーがワークフローの実行権限を失うと、cron での定期実行が停止します。

これは公式ドキュメント上にも注意事項が記載されています。
> When the last user to commit to the cron schedule of a workflow is removed from the organization, the scheduled workflow will be disabled. If a user with write permissions to the repository makes a commit that changes the cron schedule, the scheduled workflow will be reactivated. Note that, in this situation, the workflow is not reactivated by any change to the workflow file; you must alter the cron value and commit this change.

以前、生産性向上チームでもこの罠を踏みまして、急いで該当する全ての cron 式をコミットし直しました。
しかもこれを検出する方法は、ワークフローの実行を外部で記録する以外に無いのです...
Datadog などの外部サービスでワークフローの実行をモニタリングし、指定時間以内に実行が記録されない場合にアラートを出すなどの対策が必要です。

GitHub Actions の cron でのワークフロー実行では、大きな罠が 2 つあります。
- cron 式で指定した時間丁度に実行されない、GitHub の負荷が高い時間帯は数十分遅れ、場合によっては実行されないことがある
- cron 式の変更を最後にコミットしたユーザーがワークフローの実行権限を失うと、定期実行そのものが停止する

時間丁度に必ず実行してほしい、ユーザーの入れ替わりがそれなりにあるリポジトリでのワークフロー実行には、cron でのトリガーはやめて外部から dispatch するなどの方法が望ましいです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## 実践セキュリティ監視基盤構築
https://zenn.dev/mizutani/books/secmon-platform

DevOps や SRE の領域を担当する方は、その一環でセキュリティ監視基盤の領域を担当することもあるかと思います。こちらの『実践セキュリティ監視基盤構築』は、そういったセキュリティ監視基盤の設計〜運用までを構築しようとしている方に向けた Zenn の本です。

セキュリティ監視とは何かというお話から、設計要点・例、実装要点・例などが紹介された 17 万文字超えの大作となっています。

私はセキュリティ監視分野に明るくなく、こちらの本の魅力を最大限にお伝えできず恐縮なのですが、セキュリティ監視基盤という言葉に必要以上に大きく身構えず、まずは段階的に監視基盤を整備していくことが重要なのだと感じました。本書では、企業のフェーズに合わせた監視基盤の段階が紹介されていますので、自社の段階に応じて監視基盤の取り組みを始められそうです。初期段階はログを貯めるところからのスタートでした。

また、セキュリティ基盤の構築面については、私達が慣れ親しんだソフトウェアサービスの設計と何ら変わりはないと感じられました。データベース設計、リトライ処理、ストリームとバッチ、基盤のデプロイ自動化などの観点は、ソフトウェア開発の知見を活かすことができそうです。

セキュリティ監視基盤に取り組もうとしている方はぜひ読んでみてください。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## Goの古いコードが動かなくなることはほぼない理由
https://zenn.dev/catatsuy/articles/fda1e42acad421

タイトルの通り、Go ではコードがある日突然動かなくなることがほとんどない理由が説明されています。動かなくなる原因としては、cgo や HTTP、goroutine の細かい挙動への依存や、外部ライブラリの破壊的変更が挙げられています。これらの原因を内包しない一般的なアプリケーションは、最悪塩漬けされても動き続けるとのことです。

Go はバージョン間の互換性が高いことは知っていたけど、逆に動かなくなるケースを知れたのがよかったです。しかし、外部ライブラリが行儀のいいバージョン管理をしてても、cgo や HTTP に依存してたら自分のアプリケーションも壊れうるので、バージョンを上げ続けるのはやっぱり大変だなぁという気持ちもあります。（特に goroutine の細かい挙動への依存で壊れるケースは確率的に死ぬ予感がしてて、テストで検出できるか怪しいと思っています。）
Go のビルド成果物はシングルバイナリなので、塩漬けする場合はビルドしない手もあるかもです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Goのジェネリクス徹底理解
https://zenn.dev/leapcell/articles/93b124edc33c43

Go にジェネリクスが導入されたモチベーションや Go での実装方法、ユーザーがジェネリクスを使う上での注意点がまとめられています。モチベーションとしては、`interface{}` と比較してコードの再利用性が上がる点や、より正確な型付けが挙げられています。注意点としては、型パラメータを持つ値は例えば整数である可能性があるため、`nil` と比較できない点が紹介されています。

この記事だけでジェネリクスをほとんど全て説明されていて、初学者にジェネリクスを解説する際にかなり有用そうです。
個人的には、ジェネリクスの実装方法が一番面白かったです。Go では基本的に C++ と同じく使用されうる型それぞれの関数を生成していますが、コンパイル時間が伸びがちなので、ポインタ型に関しては *uint8 でまとめて実行時に個別の型を割り振っているみたいです。かしこい。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## S3のメタデータを用いた攻撃
https://zenn.dev/p0n/articles/3a6139cce9fa17

## perplexityのスペース機能がソフトウェアの調べものに便利 - mrwk update
https://mrwk.hateblo.jp/entry/2025/01/03/081055

Perplexity に新たに追加された「スペース」機能により、URL やファイル[^perplexity-space-01]を情報源として登録し、それらを基にチャット形式で質問や情報共有が可能になりました。

指定した URL のページだけでなく、その配下も含めて再帰的に情報を取得してくれる[^perplexity-space-02]のが便利です。同種の先行サービスである [NotebookLM](https://notebooklm.google/) では、 [PEGASUS](https://github.com/Sunwood-ai-labs/PEGASUS) のようなツールでクロールし、Markdown に変換したファイルを NotebookLM で利用するなどのひと手間が必要だったため、一歩先に進んだ感じがします。再帰的に情報を取得してくれる特性を活かして、「公式ドキュメント」を読み込ませ、実装時に参照すると便利に使えます。

[^perplexity-space-01]: ファイルは `Pro` ユーザのみ利用可能です。
[^perplexity-space-02]: URL を追加する際にどの深さまで情報を取得するのか指定がないため、クロールされることを嫌がるサイトが出てくる可能性があるのが少し気になります。

質問した時「特定ワードを入れずとも、指定した情報源から優先して回答してくれる」動きは思いのほか快適です。

_本項の執筆者: [@naotama](https://zenn.dev/naotama)_


## Findyの爆速開発を支えるタスク分解 - Findy Tech Blog
https://tech.findy.co.jp/entry/2025/01/07/090000

開発生産性の向上に力を入れている Findy さんのタスク分解のやり方が紹介されている記事です。
Findy さんはタスクの対応漏れ・考慮漏れなどの手戻りを防ぐためや、Pull Request の粒度を適切に保つために、タスクブレイクダウンをレビューするプロセスを取っています。
そのタスクブレイクダウンのテンプレートが紹介されているので、すぐに試せますよ。

タスクの肥大化や Pull Request の肥大化に困っている場合は、ぜひ参考にしたいです。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## 2024 年振り返り
https://zenn.dev/shunsuke_suzuki/articles/look-back-on-2024

shunsuke-suzuki さんの 2024 年の活動振り返り。
shunsuke-suzuki さんは主に GitHub Actions とセキュリティ周辺で様々な OSS を出されているので、ざっと眺めてみると気になる OSS が見つかるかもしれません。
また、ブログで作成された OSS のユースケースを詳しく解説されていたりするので、ブログも目を通してみると良いでしょう。

個人的な感想としては、[aqua が Node.js をサポート](https://zenn.dev/shunsuke_suzuki/articles/aqua-nodejs-support) が大きなニュースでした。
これにより asdf から aqua に統一的に切り替える選択肢がかなり現実的になってきたと思います。
また、[release-js-action](https://github.com/suzuki-shunsuke/release-js-action) という、JavaScript Action をリリースする際に main ブランチに生成物を直接 commit せずに、別ブランチに置くようにして一連の処理を actions にまとめるツールも便利だと思いました。今後 Immutable Actions が GA になるまではこれ一択なのではと思っています。
細かいところでは [ghatm](https://github.com/suzuki-shunsuke/ghatm) でジョブの timeout-minutes をいい感じにセットできたりするのもよかったですね。
[lintnet](https://github.com/lintnet/lintnet)はかなり汎用的なツールで面白いなと思って探求していました。個人的にはまだ lintnet がハマるケースを発見できてないですが、可能性を秘めていると思っています。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## ClineとAIコーディングツールの現状 - laiso
https://laiso.hatenablog.com/entry/2025/01/07/045009#fn-6779a6d5

# tool 🔨

## 「Google Agentspace」発表、生成AIがGoogleドライブ、Slack、SharePoint、JIRAなど社内情報を横断的に読み取って質問に答えてくれる － Publickey
https://www.publickey1.jp/blog/25/google_agentspaceaigoogleslacksharepointjira.html

## Ghostty
https://ghostty.org/

新鋭ターミナルアプリです。Zero config でいい感じに使えたり、動作が爆速な点が特徴とのことです。

2024 年末にメジャーリリースがあってドカッと流行りましたね。なによりマスコットキャラクターが可愛くて好きです。デフォルトでいい感じに使えるのも嬉しい点ですが、デフォルトで選択可能なフォントやテーマが多い点も個人的に嬉しいです。例えばテーマとして [Iceberg](https://github.com/apache/iceberg) が標準装備されててめちゃビックリしました。

今後も使い続けていきたいアプリでした。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Google Timeline の代替探しの旅
https://namorz.com/blog/2024/location/

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
