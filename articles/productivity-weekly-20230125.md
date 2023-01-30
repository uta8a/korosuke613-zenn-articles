---
title: "Productivity Weekly (2023-01-25号)"
emoji: "🛸"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230125"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-01-18, 2023-01-25 合併号です。

今回が第 105 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-02-01 は社内事情で Weekly の会自体がなかったため、スキップです。
:::

# news 📺

## New GitHub CLI extension tools | The GitHub Blog
https://github.blog/2023-01-13-new-github-cli-extension-tools/

GitHub CLI において、拡張機能周りの大型アップデートが来ました。大きく分けると次がありました。

- Go のライブラリ、go-gh が登場
- コンパイルが必要な拡張機能のコンパイルとリリースを肩代わりしてくれる gh/pre-extension-precompile アクションが登場
- 利用可能な拡張機能をブラウズできるサブコマンドが登場

go-gh は GitHub CLI 自身にも使われているライブラリで、GitHub API のクライアントや関係する型情報、その他拡張機能が作りやすくなるツール類（ブラウザの起動や jq、CUI 環境でのテーブル表示、パイプでコマンドがつながっているかどうかの判別などさまざま）が同梱されています。

実際に本文に載っているチュートリアルをなぞりながら作ってみました。

- [feat: implement ask by korosuke613 · Pull Request #1 · korosuke613/gh-ask](https://github.com/korosuke613/gh-ask/pull/1)

また、gh/pre-extension-precompile アクションは Go、Rust、C++で書いた拡張機能のコンパイルとリリースを自動化してくれます。

![](/images/productivity-weekly-20230125/gh-extension-precompile.png =600x)
*[gh-extension-precompile アクション実行時のログ](https://github.com/korosuke613/gh-ask/actions/runs/4070671515/jobs/7011746122#step:3:1)*

アクション内部では、Go 環境の用意、ビルド、リリースの作成などを行ってくれています。何かしらで言語を自動判別してくれてそうです。
全部やってくれるのでリリース作業がとにかく楽でいいなという感想です。

その他の変更として、利用可能な拡張機能を TUI でブラウズできる `gh extension browse` コマンド、スクリプト化や自動化にフレンドリーで拡張機能の検索ができる `gh extension search` コマンドが追加されました。

ますます GitHub CLI 拡張機能を作りやすくなりましたね。いいアイデアがあったら作ってみましょう。

:::message
僕は知らなかったのですが、`gh extension` には `gh ext` というエイリアスが貼られてるらしいです。今まで長々とタイプしていた...

> all extension commands are aliased under gh ext, so the rest of this post will use that shortened version

:::

## Docker Desktop 4.16登場
https://www.publickey1.jp/blog/23/docker_desktop_416awslocalstackapplemacx86amd64linux.html

Docker Desktop 4.16 がリリースされました。

大きな変更としては次があります。
- Docker Extensions が正式版に
- Apple Silicon 搭載マシンにおいて、x86 の Linux バイナリ実行に Rosetta 2 を利用できるようになった(ベータ)

特に嬉しいのは Rosetta 2 を使えるようになったところですね。

これまでも Apple Silicon 上で x86 のバイナリを実行できていました。しかし、仮想化に QEMU を利用していたため、Apple Silicon に最適化された仮想化の仕組みである Rosetta 2 を使うことでパフォーマンスが改善される可能性がありました[^issue]。
今回 Rosetta 2 で動かせるようになり、ものによっては QEMU よりも高速に動作させることが可能とのことです。また、過去動かなかったコンテナも動く可能性があるとのことです[^mysql]。

:::message
Weekly では QEMU のことを知れる良い読み物として次が紹介されました。
- [Qemuのしくみ (の一部)](https://valinux.hatenablog.com/entry/20230112)
:::

まだベータ機能であるため動作が不安定かもしれませんが、ARM 向けイメージがなくて速度面などで困っている方は試してみてください。

[^issue]: [[Docker Desktop for Mac] - Support for running x86-64 binaries with Rosetta 2 · Issue #384 · docker/roadmap](https://github.com/docker/roadmap/issues/384)

[^mysql]: [M1 Mac の Docker Desktop のアプデを mysql で確かめる](https://zenn.dev/odan/scraps/63476a01643325)

# know-how 🎓

## CircleCIへの不正アクセスについてまとめてみた - piyolog
https://piyolog.hatenadiary.jp/entry/2023/01/16/002536

今年の初めに CircleCI が不正アクセスを受けたことを発表し、年始から各社てんやわんやしたと思います。情報がだんだんとアップデートされていったため、全体像を把握しきれていない方も少なくないのではないでしょうか（把握するのもむずい気がする）。

piyokango さんが CircleCI への不正アクセスについてまとめた記事を出してくださいました。
記事では、流出した可能性のある期間や不正アクセス元 IP アドレスなどの情報をまとめた表や、どのように攻撃されたかや、利用者がセキュリティを向上させるための CircleCI からの案内、タイムラインなどが載っています。

簡潔なまとめとしてとても参考になる記事だと思います。もちろん原文である CircleCI からの発表も参照しましょう。

今回の件でシークレットの大量ローテーションや GitHub の Audit log の精査など、なかなか大変な作業をしたことだと思います。これを機にシークレットを定期的にローテーションしてローテーションに慣れさせたり、Audit log の分析をしやすくする基盤を用意したりと、色々面倒ごとが起こっても大丈夫なように見つめ直していきたいですね。

## AWS CLI（v2）の自動プロンプト機能が便利だった
https://zenn.dev/sasashu/articles/212b21856ed6bc

AWS CLI の自動プロンプト機能の紹介記事です。

AWS CLI v2 には TUI 環境でコマンドやパラメータ補完を提供する機能があり、この記事では、概要や実行モード、設定方法や使い方を載せてくれています。実行画面のキャプチャも載せてくれているため、試さずともどんなものかわかって良いです。

実際に試してみました。自動プロンプト機能を使うとどんなコマンドがあるかわかる上、`F3` キーを押すことで選択中のコマンドや引数に関するドキュメントを同時に表示してくれます。
AWS CLI のコマンドやオプションはいつもググったり help を見たりしてたため、大変便利だと思いました。

面倒なのが `~/.aws/config` に設定が必要なことと、設定はプロファイルごとにしないといけないことです。全プロファイルに常に適用したい...
また、プロンプト内で実行したコマンドは Bash などのターミナル履歴に残りません。後からコマンドを再実行したくても簡単にはできないので注意ください。しかし、AWS CLI のコマンド履歴に残せるため、気になる方は `cli_history`[^cli_history] を有効にしましょう（これもプロファイルごとに設定が必要！）。

[^cli_history]: [[新機能]AWS CLIにhistoryコマンドが追加されたので試してみた #reinvent | DevelopersIO](https://dev.classmethod.jp/articles/new-aws-cli-history/)


# tool 🔨

## Never write a commit message again (with the help of GPT-3) · Roger Zurawicki
https://zura.wiki/post/never-write-a-commit-message-again-with-the-help-of-gpt-3/

最近 OpenAI の ChatGPT が話題ですが、同じく OpenAI が提供している GPT-3 を使ってコミットメッセージを自動生成するツール gptcommit が登場しました。

この記事は gptcommit の紹介記事です。記事にはデモ動画や先行研究、仕組みの概要などが載っています。

実際に試した時のメモを次に示します。

- OpenAI の API を利用しているため、業務で使う場合は社外費の情報が漏れないよう注意が必要です
- git hooks を利用する前提となっています
  - 個別のリポジトリ（業務以外の私的リポジトリなど）にのみ使いたい場合はちょっと面倒です
  - 僕は git hooks をいじって特定のリポジトリでのみ動くようにしてみました
    - [Use gptcommit in a specific repository](https://gist.github.com/korosuke613/90128d2dcea7e88368b043685214c9a1)
- 実際に自分が書いた差分を gptcommit に食わせてみました
  - [その時の diff と生成されたコミットメッセージ](https://gist.github.com/korosuke613/902024e8e6af75384a37b35a7c72170d)
  - `Add a section about verifying Renovate configs with dry-run` や `Add a section about a GPT-3 tool for auto-generating commit messages` という風に、いい感じにコミットメッセージを生成できています
  - しかし、``Update Node.js EOL date to `2023-12-11` `` とあるように、今回の変更とは関係ないメッセージも入っちゃってます
    - 実際に変更はしていませんが、diff の結果にギリギリ含まれているのが関係しているかもしれません

色々と注意点はありますが、使ってみるとちょっと便利だったため、個人利用はやっていきたいなという感じです。業務での利用は注意してください。

## 文章作成の頼れるアシスタント、AI搭載のDeepL Writeが新登場
https://www.deepl.com/ja/blog/introducing-deepl-write

翻訳でお馴染み DeepL が文章校正をしてくれる新サービス DeepL Write をリリースしました（ベータ）。文法の間違いを修正してくれたり、別の言い回しを提案してくれたりします。

現在はベータ版であるため無料で利用可能です。デスクトップアプリでは対応されておらず、ブラウザからのみの利用となっています。

また、無料で使う場合は送信データが保存・利用される可能性があります。

> DeepL Proにご登録でアカウントにログイン済みの場合、データ保護はDeepL Write Alpha/Betaにも適用されます。送信されたテキストは永続的に保存されることはなく、テキストに改善を加えこれを送信するために必要な範囲内で一時的に保存されます。テキストの改善が完了すると、送信されたすべてのテキストならびに改善点が削除されます。
https://www.deepl.com/ja/privacy#section_4

ただ、DeepL Pro を契約している場合は、翻訳時と同じく DeepL Write 利用時も送信データが使用されることはないとのことです。業務利用する場合は注意しましょう。

> DeepL Proでは、サービスの向上を目的としてお客様のテキストを使用することはありません。DeepL Proにおける個人データの取り扱いについて、詳しくは本個人情報保護方針の5と6ならびに利用規約をご覧ください。
https://www.deepl.com/ja/privacy#section_4

僕が作っている OSS の英文をいくつか読ませたところ、ものの見事にいい感じの英文が吐き出されました。英語苦手民には嬉しいですね。翻訳後にそのまま Write に噛ませれるようにしてほしい。

## GitHub App「Pull Request Size」プルリクエストのサイズをラベル化しよう - kakakakakku blog
https://kakakakakku.hatenablog.com/entry/2023/01/24/204117

プルリクのラベルに変更量がどれくらいかを付けてくれる GitHub Apps、Pull Request Size の紹介記事です。App を使うことで、プルリクエストごとに `size/XS` や `size/L` といったラベルをつけてくれます。

記事では、ラベル一覧、差分量の計算式、ファイル除外、ラベルのカスタマイズなどについて書いてくれています。

なかなか便利そうですね。ラベルのカスタマイズもできるのは嬉しいです。また、[OSS](https://github.com/noqcks/pull-request-size) であるため、使い回して GitHub Action 化してもいいかもしれません。

正直なところ、コードの変更量が見られて何が嬉しいんだろうとちょっと思ったのですが、チームでプルリクエストをレビューする際に、誰にどのプルリクエストを割り振るかを決める時の指標の 1 つに使えそうだなと少し思いました。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Gluon](https://gluonjs.org/)
    - Electron と違って Chromium が同梱されていないので軽量とのことです
    - また、似たようなものである [Tauri](https://zenn.dev/korosuke613/articles/productivity-weekly-20220223#koneta-%F0%9F%8D%98) とも違って、 WebView2/WebKitGTK ではなくユーザーによってインストールされたウェブブラウザを使用するようです
  - [新MacBook Pro登場　「M2 Pro／Max」搭載、メモリは最大96GBに - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2301/17/news178.html)
    - 10 コア CPU を搭載した「M1 Pro」チップと比較して、CPU 速度は 20％高速、GPU コアは 3 つ多くグラフィックス速度は 30％高速となったようです
    - Wi-FI 6E も搭載らしい（Apple 製品だと iPad Pro の最新モデルのみ対応してた）
    - M1 Pro で十分感あるけどほしい
- **know-how 🎓**
  - [2022年DevOpsにおけるテスト調査報告書 | mabl](https://www.mabl.com/ja/reports/testing-in-devops-2022)
    - テスト自動化プラットフォームである mabl による、2022 年の DevOps におけるテストの状況調査報告書です
    - データを見る感じ、でかい企業は DevOps っぽいことを加速させているようです
    - デプロイ頻度も上がってるらしいです
    - どこの企業とは書かれていませんが、おそらく回答者の多くは欧米の企業だと思うので、日本企業の場合のデータも見てみたいですね
  - [RSAの終わりの始まり - 暗号移行再び](https://qiita.com/lemiyachi/items/c20a18b172c6f192a262)
    - RSA 暗号と、暗号移行の話です
    - 暗号アルゴリズムの移行スケジュールがあることを知りませんでした
  - [意外と手軽、家庭用 10 Gbps+ イーサネットまとめ](https://zenn.dev/yuryu/articles/f0ea6615d8cf3f)
    - 家庭用 10Gbps 以上のイーサネットを導入するためのノウハウまとめです
    - 速度と予算の話や、ケーブルの方式には何を使うかや光ファイバーの規格の話など盛りだくさんです
- **tool 🔨**
  - [External backend for Locking. · Issue #894 · runatlantis/atlantis](https://github.com/runatlantis/atlantis/issues/894)
    - Terraform 実行を自動化する OSS、Atlantis が Redis による外部データベースに対応していました
    - これにより Atlantis の可用性を上げやすくなりそうです
    - ただ、ドキュメントはまだ乏しい模様。
      - > Can the main documentation be also be updated to reflect this? https://www.runatlantis.io/docs/deployment.html
        >
        > Yes of course. This is an open source project and we welcome contributions. For anyone who would like to contribute, please see the runatlantis.io directory of this repo.
        https://github.com/runatlantis/atlantis/issues/894#issuecomment-1385437362
  - [git-sim: Visually simulate Git operations in your own repos](https://initialcommit.com/blog/git-sim)
    - git の操作を可視化するツールです
    - 教育目的で使えそうだなと思いました
    - インストールが面倒だったので試せてません
  - [traderepublic/Cilicon: 🛠️ Self-Hosted ephemeral macOS CI on Apple Silicon](https://github.com/traderepublic/Cilicon)
    - Virtualization Framework を使って macOS 内に macOS を作って CI 実行環境にする macOS アプリです
    - GitHub Actions のセルフホストランナーとしても動かせるようです

# あとがき
とうとう今週号から隔週連載にしました。最近遊ぶ用事が多いのと、僕が開発したいネタがたくさんあるけど消化が追いつかないからですね...
毎週楽しみにしてくれている方はすみません。今後とも応援よろしくお願いします！

ちなみに、2/9（木）に Productivity News 配信があるので、興味ある方はご覧ください。
Youtube のプレミア公開で配信します。
https://cybozu.connpass.com/event/273958/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: Cybozu Productivity Weekly 100 回記念
今週のおまけです。

1/25 にサイボウズ株式会社の東京オフィスでリアルイベントを開催しました。
その名も「Cybozu Productivity Weekly 100 回記念」です。

Weekly の記事が去年 11 月くらいに 100 回を突破したので、記念イベント開こうぜとチームの方が提案し、実施しました。ひっさびさのリアルイベントでした。

20 人まで募集で 17 人くらい参加登録してくれたのですが、コロナがまた流行り出したり、その日なんか関東がめっちゃ寒いやばい日だったりで実際に来たのはもっと少なかったです🥲
しゃーない、切り替えていけ。

正直なところ書いている僕としては結構恥ずかしいイベントだったのですが、来てくださった方々から色々応援のお言葉をいただけて嬉しかったです。

また、記事をめちゃ分析してくれた方が分析内容を LT 発表してくれたりもして、すげーってなってました。僕が毎回 emoji を変えていることに気づいてくれて、そこに気づく人は初めてだわとなりました。しかも、なんか 🐙 の emoji だけが唯一かぶっていたらしく、僕も知りませんでした。ショックです。

ちなみにちょっと迷ったのですが、emoji 被りチェックを CI で行うようにしました。これで二度と被らないぞ！

- [ci: check duplicate emoji by korosuke613 · Pull Request #321 · korosuke613/zenn-articles](https://github.com/korosuke613/zenn-articles/pull/321)

懇親会では色々な人と色々お話しできて良かったです。やっぱ交流はリアルイベントよ 🍕

最後に僕の発表スライドを載せておきます。

https://www.docswell.com/s/korosuke613/K11X3K-2023-01-25-productivity-weekly-100th-kinen

やっぱリアルはいいですね。また別のイベントを開きたいですね。
