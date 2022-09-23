---
title: "Productivity Weekly (2022-09-14号)"
emoji: "🫠"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220914"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 91 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions: Use the GITHUB_TOKEN with workflow_dispatch and repository_dispatch | GitHub Changelog
https://github.blog/changelog/2022-09-08-github-actions-use-github_token-with-workflow_dispatch-and-repository_dispatch/

GitHub Actions において、ジョブ内でデフォルトに発行されるシークレット `GITHUB_TOKEN` を使って `workflow_dispatch` イベントと `repository_dispatch` イベントのワークフローをトリガーできるようになりました。

これまでは誤ってワークフローの無限トリガーを引き起こすのを防ぐために GITHUB_TOKEN で別ワークフローをトリガーしないようになっていたが、それが緩和されたこととなります。

これにより、ワークフローから別ワークフローをトリガーするときに Personal Access Token を生成するなどの必要がなくなって、便利になりました。

注意したいのが、あくまで `workflow_dispatch` イベントと `repository_dispatch` イベントをトリガーする場合だけ `GITHUB_TOKEN` が利用できるという点です。例えば `GITHUB_TOKEN` を使ってプルリクエストを作成した場合、従来通り `push`、`pull_request` イベントのワークフローはトリガーされません。

個人的には `GITHUB_TOKEN` を利用して作ったプルリクエストでワークフローを動かしたいので、[先日やったように](https://zenn.dev/korosuke613/articles/productivity-weekly-20220824#github-actions%3A-improvements-to-reusable-workflows-%7C-github-changelog)ネストの数に制限を掛けて無限ループを防止してほしいところですが、それでもこの緩和は嬉しいですね。活用したいです。

![](/images/productivity-weekly-20220914/mugen_loop.png =600x)
*ちなみに[自分自身を呼び出すワークフロー](https://github.com/korosuke613/playground/pull/33)を書いたら無限ループしました*

# know-how 🎓

## AtlantisでTerraformのドリフト検出 - クラウドワークス エンジニアブログ
https://engineer.crowdworks.jp/entry/terraform-drift-check-on-atlantis

terraform apply を自動で行うツールである Atlantis で Terraform のドリフト検出を行う話です。ここで言うドリフトとは、Terraform コードと実リソースの状態に差異が発生した状態を指しているようです。

これまでは CodeBuild でドリフト検出をしていたが、ログの確認が面倒、GitHub のパーソナルアクセストークンを廃止できない、権限を Atlantis 以外にも置かないといけないなどが課題としてあったようです。Atlantis にはドリフト検出機能はないですが、plan/apply のフェーズの処理を差し替えるカスタムワークフローの機能があるので、それを利用してドリフト検出を行うようにしてるとのことです。

記事では、ドリフト検出の仕組み・課題、Atlantis の説明（カスタムワークフロー含む）、Atlantis でドリフト検出する方法の解説などが書かれています。

Atlantis と GitHub Actions をうまい具合に使ってドリフト検出してて面白いです。ただ、毎月ドリフト検出を専用のプルリクエストを作るのはちょっと重い感じもするので、やはり Atlantis 側で機能を作ってくれると嬉しい気がしますね。

## Googleでもやっている障害対応訓練の「Wheel of Misfortune」をやってみた。 - MonotaRO Tech Blog
https://tech-blog.monotaro.com/entry/2022/09/06/090000

モノは触らずに机上でやる障害対応訓練の Wheel of Minforture をやってみたという記事です。

Wheel of Minforture は Google もおこなっている障害対応訓練手法であり、過去の障害事例をもとに TRPG のように障害解決をしていくというものです。

モノタロウさんでは、運用担当者が社歴の長いベテランエンジニアとなっているため、運用担当者を増やしづらく、担当者に負荷が高まっているという背景から、障害対応マニュアルの整備や訓練の定期的な実施を行うこととしたそうです。しかし、訓練環境を準備することが難しかったことから Wheel of Minforture を行なったとのことです。

記事では、背景、Wheel of Minsforture の説明、実施時の様子、やってみた結果（メリット等）などが載っています。

Wheel of Minsforture、実際に障害を起こして訓練するのと比べて低いコストで実施できるのは良さそうだなと思いました（ゲームマスター（？）の腕が問われそうではありますが）。障害対応をしている方は参考になる記事だと思います。

# tool 🔨

## GitHubのリリースノート自動生成機能からCHANGELOG.mdを生成する | おそらくはそれさえも平凡な日々
https://songmu.jp/riji/entry/2022-09-08-gh2changelog.html

GitHub にはリリースノートを自動生成する機能がありますが、それを利用して keep a changelog 形式に近い CHANGELOG.md を出力するツール [gh2changelog](https://github.com/Songmu/gh2changelog) を作ったという記事です。

GitHub はリリースノート自動生成機能で作成される Markdown を生成する API を公開しているそうです。全く知りませんでした。なかなか便利ですね。

僕は CHANGELOG.md あった方がいい派なので、こういうツールの存在はありがたいですね。GitHub のリリースノート自動生成機能がサポートするカスタマイズを利用できるのも嬉しいです。

## リリース用のpull requestを自動作成し、マージされたら自動でタグを打つtagpr | おそらくはそれさえも平凡な日々
https://songmu.jp/riji/entry/2022-09-05-tagpr.html

リリース用のプルリクエストの自動作成とマージ後に自動でタグを打ち Releases を作るツール tagpr を作ったという記事です。

自動作成されるプルリクエストには CHANGELOG.md の更新、バージョンが記述されたファイルの更新（action.yml や version.go など）、が含まれています。また、Description にはどのコミットが含まれるかの記述もあります。バージョンが記述されたファイルの自動更新もしてくれるのは嬉しいですね。

リリース作業は色々やらなきゃいけないことが多く、何かを忘れてしまって失敗したり、自動化の環境を作るのがめんどかったりするので、こういうツールがあるとリリース作業が楽になりそうでいいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Cypress 10.8: Experimental: Run tests in WebKit](https://cypress-io.ghost.io/blog/2022/09/13/cypress-10-8-experimental-run-tests-in-webkit/)
    - E2E テストツールの Cypress で WebKit が使えるようになりました
    - WebKit でもテスト流せる E2E テストツールってあんま見ないかも？
  - [Buf | The Protobuf Language Specification](https://buf.build/blog/protobuf-language-specification)
    - Connect という gRPC 互換の Protobuf ベースの RPC ライブラリを作っている Buf 社が Protobuf のちゃんとした仕様を書きました
      - https://www.protobuf.com/docs/language-spec
    - Google が作る Protobuf の仕様と `protoc` の実装には乖離があるため、`protoc` の実装を基に仕様を書き直したとのことです
      - Weekly 参加者によると、「実際 protocol buffer のコンパイラは実装依存で仕様の差異があり、ハマったことがあるのでこれはありがたい」とのことでした
  - [Deno、早くも npm 対応と 3 倍高速化した HTTP サーバ API などを実装した「Deno 1.25」をリリース － Publickey](https://www.publickey1.jp/blog/22/denonpm3httpapideno_125.html)
    - [この前 Deno で npm がインポートできるようになるぞって話がありました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220817#koneta-%F0%9F%8D%98)が、早くも Deno で npm がインポートできるようになりました（unstable）
  - [Sticky Scroll - Visual Studio Code August 2022](https://code.visualstudio.com/updates/v1_71#_sticky-scroll)
    - VSCode の新機能です。なんかスクロール時にブロック名？が上部に固定されて表示されるっぽい
    - 便利そうなので JetBrains IDE にもほしい
- **know-how 🎓**
  - [レガシーなプロダクトからドメイン層を再設計する / iOSDC_takahashi_ishii - Speaker Deck](https://speakerdeck.com/recruitengineers/iosdc-takahashi-ishii)
    - 各レイヤーの責務を考える前に、サービスが提供している価値から本質的なドメインモデルを整理しましょうというお話です
    - 確かにアーキテクチャを再設計しようとなった時に現在の実装を前提としてしまうことは多い気がします
  - [ソフトウェアエンジニアとしての姿勢と心構え / Software Engineer's Survival Guide](https://speakerdeck.com/recruitengineers/software-engineers-survival-guide-2022)
    - t_wada さんによる、ソフトウェアエンジニアとしての姿勢と心構えを説いたスライドです
    - 色々良いことが書いてありますね
    - Weekly では以下が話題に上がりました
      - 「If you want to master something, teach it.」
        - 参加者「よくわかる。人に教えたらわかってないことがよくわかる。」
      - 「技術はらせん」
        - 参加者「らせんの方が振り子よりも良くなっているニュアンスが出るから良い」
- **tool 🔨**
  - [Pluralith/pluralith-cli: A tool for Terraform state visualisation and automated generation of infrastructure documentation](https://github.com/Pluralith/pluralith-cli)
    - Terraform state を解析して可視化する CLI ツールおよびクラウドサービスです
    - まだアルファだけどこういうのあるとオンボーディングに役に立つかもしれません
    - 貧相な GCP プロジェクトで試してみたらこんな感じになりました
      - https://twitter.com/Shitimi_613/status/1569926357353922560
    - ちなみに、ローカル実行だと state の状態は一切バックエンドに送らないぜ！って書かれてる
      - https://docs.pluralith.com/docs/get-started/run-locally
  - [もっと使いやすいコマンドラインツール10選](https://zenn.dev/the_exile/articles/5176b7a5c29bce)
    - 枯れたツールを置き換えるイケイケな最近のコマンドラインツール集です
    - Rust 製が多いですね
    - exa や bat は僕も使ってます
    - こういうツール入れると便利なんだけど、環境変わると使えないからめんどくさかったりしそうっていう話で会が盛り上がりました
  - [t3-oss/create-t3-app: Quickest way to start a new web app with full stack typesafety](https://github.com/t3-oss/create-t3-app)
    - 最近話題になり始めた T3 Stack のテンプレートを作るためのツールです
    - ~~また新たな概念が現れたか...~~
    - T3 Stack が何かわからなかったのですが、「簡潔さ」「モジュール性」「フルスタックの型安全」を実現するための技術スタック（6 つの技術）のことらしいです
      - [フロントエンド界隈で新しく提唱されているT3 Stackについて調べてみた](https://zenn.dev/mikinovation/articles/20220911-t3-stack) がわかりやすくてよかったです

# あとがき
なんかやけに記事が多い週でした。気づけば Weekly も 90 回を超えてましたね。すごい。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: Publication　はじめました
今週のおまけです。

![](/images/productivity-weekly-20220914/cybozu_ept.png =600x)
*https://zenn.dev/p/cybozu_ept*


Zenn の Publication 機能がクローズドベータで始まりました。（[パブリケーション機能をクローズドβでリリースします | What's New in Zenn](https://info.zenn.dev/about-publication)）

この度クローズドベータに入れたので、早速「[サイボウズ　生産性向上チーム💪 (cybozu_ept)](https://zenn.dev/p/cybozu_ept)」という Publication を作成してもらいました。

実は僕が（だいたい）毎週書いているこの Productivity Weekly ってサイボウズ株式会社の開発本部の生産性向上チームが外向けに発信するために始めたやつなんですよね。

というわけでこれからは Productivity Weekly に cybozu_ept publication を設定していきます。
実はこの記事のてっぺんにもバナーが付いてたと思います。

Publication、なかなか良い機能だと思います。応援したいです。
