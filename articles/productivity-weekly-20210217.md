---
title: "Productivity Weekly (2021-02-17号)"
emoji: "👁"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 14 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## GitHub Enterprise Server 3.0 is now generally available - The GitHub Blog
https://github.blog/2021-02-16-github-enterprise-server-3-0-is-now-generally-available/

GitHub Enterprise Server 3.0がGAになりました。去年の12月に発表されてから二度のRC版を経て、ようやく来たかという感じです。
やはり目玉新機能はActionsとPackagesが使えるようになることでしょうか。Actionsを使いたい場合はセルフホストランナーを用意する必要があります[^1]。個人的にはDark modeをGHES[^2]でも使いたかったのですが、こちらはまだのようです。

このリリースによる詳しい情報は下記のリンクを参照してください。
[Release notes - GitHub Docs](https://docs.github.com/en/enterprise-server@3.0/admin/release-notes#3.0.0)

[^1]: 今はまだできませんが、今後GHESでもGitHubがホストするランナーを使えるようになりそうです（[参考](https://github.com/github/roadmap/issues/72)）。
[^2]: GitHub Enterprise Serverの略

## Go 1.16 is released!
https://blog.golang.org/go1.16
Go 1.16がリリースされました。1.16では画像などのファイルをバイナリに埋め込める`go:embed`機能が追加されていたり、`go install`でバイナリのバージョンが指定できるようになったりといった機能が追加されています。また、リンカが変更されたことにより、ビルド時のパフォーマンスが向上しているようです。

詳しくは[リリースノート](https://golang.org/doc/go1.16)を読むか、以下のサイトが詳しくまとめており、参考になります。
https://future-architect.github.io/articles/20210207/

# know-how
## .terraform.lock.hcl 完全に理解した / How to update .terraform.lock.hcl efficiently - Speaker Deck
https://speakerdeck.com/minamijoyo/how-to-update-terraform-dot-lock-dot-hcl-efficiently
Terraform v0.14から、`.terraform.lock.hcl`というロックファイルが生成されるようになりました。この資料は、不可解な挙動をする`.terraform.lock.hcl`の解説や対策をまとめたものになります。

僕は何も考えずに`git add`してたのであまり気にしたことはなかったのですが、挙動が気になった方はこの資料を読むことをおすすめします[^6]。

[^6]: 読んだけど正直全部を理解するの難しいと思う。

## Engineering Ladder | メルカリエンジニアリング
https://engineering.mercari.com/ladder/

メルカリが期待するエンジニアの成長段階ごとに取るべき行動やスキルを明文化した資料です。9つの指標があり、それぞれに6段階のレベルがあります。このLadderはメルカリエンジニアの評価やキャリア設計に利用されているそうです。

期待する行動やスキルは組織によって全く異なるものになると思うので、このLadderをそのまま使うことはできないと思いますが、自分の組織でも同じようなものを作りたいとなった時に参考にできそうです。

## Google TypeScript Style Guide
https://google.github.io/styleguide/tsguide.html

Googleで採用されているTypeScriptのスタイルガイドを外部向けに調整したガイドです。構文や型システムの使い方などに対して細かくルール、ベストプラクティスが設定されています。

https://github.com/google/gts
また、上記のスタイルガイドをチェックしたり修正するツールをgoogleが公開しています。スタイルガイドに沿った`tsconfig.json`などの設定ファイルを生成する`gts init`やスタイルガイドに沿っているかどうかをチェックする`gts lint`といった機能を持っています。

Googleのスタイルガイドに賛同できる人は使ってみるとよいかもしれません。

## How to Make 100 Releases Per Day with Only 6 Quality Engineers
https://www.stickyminds.com/article/how-make-100-releases-day-only-6-quality-engineers

WayfairというEコマース企業はQAエンジニアがたった6人しかいないのに、1日あたり100回のリリースを行っているようです。この記事ではそれを実現するための取り組みを紹介しています。

テスト自動化、CI/CDパイプラインの構築といったことはもちろん、コードカバレッジやテスト通過率、パフォーマンスなどのメトリクスの可視化して誰もが品質向上に勤めるようにする、新機能をオンオフできるようにしてリスクを軽減するなどさまざまな工夫が記述されています。

リリースサイクルを高速化したい場合に参考にできると思います。

# tool
## Early Access Program for Qodana, a New Product That Brings the "Smarts" of JetBrains IDEs Into Your CI Pipeline | JetBrains Blog
https://blog.jetbrains.com/idea/2021/02/early-access-program-for-qodana-a-new-product-that-brings-the-smarts-of-jetbrains-ides-into-your-ci-pipeline/

JetBrains IDEの静的解析をCIで実行できるようにするツールQodanaがEAP[^3]として公開されました。
大きく分けて、静的解析を行うリンター機能と解析結果を表示するWeb UI機能があるようです。[Dockerイメージ](https://github.com/JetBrains/Qodana/tree/main/Docker)、[GitHub Action](https://github.com/JetBrains/qodana-action)が用意されており、すぐにCIに組み込めるようになっています。また、[GitHub Apps](https://github.com/JetBrains/Qodana/tree/main/GitHub)はまだ誰でも使えるわけではないようで、[Qodana-demo organization](https://github.com/Qodana-demo)に所属する必要があるようです。

既存のプロファイルを使うこともできるので、自分たちでカスタマイズしたJetBrains IDEの設定を使うこともできます。

Dockerイメージが2GB近くあって大きい[^4]ことや、ライセンスの問題で30日ごとにDockerイメージのバージョンを最新版にしないといけない[^5]などと、ちょっと使い勝手が悪そうな部分もありそうです。

また実際に使ってみたところ、生成したレポートをホスティングしないと見ることができなかったことや、表示される解析結果の情報が少ないなどと、（プレビュー版だからしょうがないのですが）本格的にCIで使うには工夫が必要そうです。

![](https://storage.googleapis.com/zenn-user-upload/hxdyym5z4jfe7m5l7nhr9gdh3cjt)
*生成されたレポートをダウンロードし、index.htmlを開いたところ*

[^3]: Early Access Programの略。
[^4]: [GitHub Action](https://github.com/korosuke613/linear-webhook/runs/1918605484?check_suite_focus=true)を使用したところ、pullに48秒かかりました。
[^5]: まあ、バージョンを固定せずにLatestを使えばあまり問題にはならないと思います。

## conwnet/github1s: One second to read GitHub code with VS Code.
https://github.com/conwnet/github1s

VSCodeっぽくGitHub上のリポジトリを閲覧できるツールのリポジトリです。フォルダ移動やファイル検索が比較的楽にできます。デモサイト？が用意されており、`github1s.com`という風に、`1s`をリポジトリのURLに加えることで、そのリポジトリをVS Codeライクに開くことができます。

ただ、使ってみたところ、現在は[開いているファイルしか検索対象にできないようです](https://github.com/conwnet/github1s/issues/13)。GitHub上でソースコードを読むのにストレスを感じている人は使ってみるとよいかもしれません。

また、似たようなものにCodeSandboxで開く方法があります。

https://github.com/dferber90/githubbox

こちらは、`githubbox.com`という風に`box`をリポジトリのURLに加えることで、そのリポジトリをCodeSandboxで開くことができます（自動的にCodeSandboxにリダイレクトします）。CodeSandboxに慣れている方やウェブアプリのリポジトリを開く場合はこちらを利用するとよいかもしれません。

# あとがき
今週はネタが多かったですね。Go 1.16がリリースされて、最近Goを全く書いていないのでGoでなんか作りたいなという気持ちになりました。

ちなみに、明日（2/18）ある「サイボウズ技術説明会 for student！」というオンラインイベントでサイボウズの開発文化と生産性向上チームのお話をする予定なので、気になる人はぜひお越しください。僕以外にもkintone開発チームの人とNecoチームの人がお話しします。

https://connpass.com/event/201626/

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。花粉が舞ってるのか目がかゆいです。

### 遊戯王カードをドローする GitHub Action を作りました
https://zenn.dev/peperoncicicino/articles/bbb4639c733373

Issueのコメントで遊戯王のカードをドローするためのGitHub Actionを作ったという記事です。`draw`または`ドロー`とコメントすると発火する[デモ](https://github.com/Doarakko/draw-action/issues/1)が用意されています。

ドローするとランダムな遊戯王カードの画像がコメントされます。~~法律にはあまり詳しくないのですが、著作権的には怪しそうです。~~

記事ではアクションの解説と、開発からGitHub Marketplaceに公開するまでを説明しています。アクションの使い道は正直思いつきませんが、GitHub Actionsにはこういう使い方もあったのかと気付かされますね。

[僕もドローしたところ](https://github.com/Doarakko/draw-action/issues/1#issuecomment-779729327)、Bound Wandを引きました。[バウンドワンド](https://yugioh-wiki.net/index.php?%A1%D4%A5%D0%A5%A6%A5%F3%A5%C9%A1%A6%A5%EF%A5%F3%A5%C9%A1%D5)は攻撃力上昇と相手によって破壊され墓地に送られた場合に装備モンスターを蘇生する効果を持つ装備魔法です。そこまで強いカードではありませんが、対戦相手にとっては嫌な装備でしょう。

ちなみに、ドローした後放置してたらたくさんのメールが来てて驚きました。コメントすることで自動でIssueをSubscribeしてしまうからですね。もしドローしたらUnsubscribeすることをおすすめします。