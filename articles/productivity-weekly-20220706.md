---
title: "Productivity Weekly (2022-07-06号)"
emoji: "🎯"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220706"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 81 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Now in Preview – Amazon CodeWhisperer- ML-Powered Coding Companion | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/now-in-preview-amazon-codewhisperer-ml-powered-coding-companion/
https://aws.amazon.com/jp/blogs/machine-learning/introducing-amazon-codewhisperer-the-ml-powered-coding-companion/

AWS が GitHub Copilot のような、機械学習の力で次にくるコードを自動補完を示してくれるサービス Amazon CodeWhisperer を公開しました（プレビュー）

現在、JetBrains IDE、VSCode、AWS Cloud9 などから利用可能で Python、Java、JavaScript をサポートしています。

AWS 謹製なのもあり、AWS の API を利用するコードに強いとのことです。また、コードの脆弱性を見つけて警告する機能などもあります。

GitHub Copilot で議論になっている、生成コードがライセンス的に大丈夫かどうかを利用者が判断しなければならない点についてですが、CodeWhisperer では学習データに似ているコードスニペットが生成される場合に、利用者にそのコードの元となるリポジトリおよびライセンス情報が通知され、自分のコードに取り込むか判断材料にできるようになっています。
GitHub Copilot よりは著作権へ配慮しているように思えますが、これがあれば安全と言い切れるかは正直よくわかりません。

プレビュー期間中は CodeWhisperer を無料で利用できます。気になる方はぜひ試してみてください。

## Arm Large resource class available with Free plan - Track CircleCI Updates
https://circleci.com/changelog/#arm-large-resource-class-available-with-free-plan

CircleCI において、Linux Arm インスタンスの Large クラス（4CPU、16GB RAM、20 credits/min）を Free プランで使えるようになりました。`resource_class` に `arm.large` を指定することで利用できます。

元々Arm インスタンスは Medium クラス（2CPU、8GB RAM、10 credits/min）が Free プランで使えたのですが、モノによってはどうしてもスペック的に厳しい場合があったと思います。Large クラスは Medium クラスの 2 倍の CPU とメモリがあるので動作が安定したり高速化したりできるかもしれません（クレジットも 2 倍だけど）。

無料で使えて大丈夫か？って思ってしまいますが、活用していきましょう。

## The repository fork button now displays existing forks | GitHub Changelog
https://github.blog/changelog/2022-06-29-the-repository-fork-button-now-displays-existing-forks/

GitHub において、fork のボタンから既存の fork 先を確認できるようになりました。

[最近 Enterprise 内での fork がしやすくなったり、同 Organization への fork ができるようになった](https://zenn.dev/korosuke613/articles/productivity-weekly-20220629#improved-innersource-collaboration-and-enterprise-fork-policies-%7C-github-changelog)ことからどこに fork したのかわからなくなる（混乱する）ことがありそうだったので、簡単に fork 先を確認できるようになったのは嬉しいですね。

## Autolinks with alphanumeric IDs | GitHub Changelog
https://github.blog/changelog/2022-07-01-autolinks-with-alphanumeric-ids/

GitHub の Autolinks において、`<num>` の部分が英字に対応しました。

GitHub には Autolinks という特定の文字列を自動でリンクにする機能があります。例えば prefix を `HOGE-` として、URL を `https://example.com/ticket-<num>` と設定した場合、`HOGE-123` のような文字列がコミット名などにあると、それが `https://example.com/ticket-123` へのリンクになります。

この `<num>` の部分がこれまでは数字である必要があったのですが、今回の変更によりアルファベットも対象となりました。Trello のような識別子にアルファベットが入るパターンに対応できます。`<num>` という部分にはもはや数字以外も入るのですが、互換性を保つためかパラメータ名に変更は入りませんでした。

似たような理由で使えなかった方もこれで使えるようになりますね。

# know-how 🎓

## Write Better Commits, Build Better Projects
https://github.blog/2022-06-30-write-better-commits-build-better-projects/

GitHub による、コミットの良い分け方，コミットメッセージの良い書き方などを紹介した記事です。

よりよいコミットの書き方ガイドライン（物語を構成する、コミットのサイズ変更と安定化、文脈を説明する）をまず解説し、それらのガイドラインを守ることでよりよいプロジェクトの構築（コードレビュー、`git bisect` によるバグの発見、根本原因の分析）が可能であると説明されています。ガイドラインのトピックはそれぞれ問題点、解決策、具体例で構成されておりとてもわかりやすい内容となっています。

個人的にはある程度似たようなことはできていると思っているのですが、コミットメッセージを書く際に「なぜ」それをしているのかを省きがちなので気をつけたいですね。また、`git bisect` コマンドは全く知りませんでした。どこでバグが発生したのかを発見するのを手助けするコマンドで、便利な場面がありそうです。[git-absorb](https://github.com/tummychow/git-absorb) も便利そうです。

こういうコミットに関するガイドラインをチームの共通認識にし、開発をより良くしていきたいですね。

## jestでDBありのテストを高速化する | kohsweblog
https://blog.koh.dev/2022-07-02-jest-speedup/

NestJS、DB(postgres)、jest、typescript を使ったテストを高速化した話です。トランスパイラの置き換え、テストの並列化、CI の並列化を行うことで最終的にローカルおよび CI の実行速度を従来の 3 倍高速化できたとのことです。

個人的には `@swc/jest` という jest 向けのトランスパイラ（ts-jest は知ってた）と最近 jest に追加されていた `--shard` オプションを初めて知りました。特に `--shard` オプションは従来の `--maxWorkers` オプションで高速化できなかった環境において有効に高速化できそうなのでよさそうです。

この記事では NestJS、DB のテストでの設定方法も書かれているので、それらを使っている人にもおすすめの記事ですが、使っていない方にも参考になると思います。テストや CI の待ち時間を減らしていきたいですね。

## トラブルの芽を摘むための一歩進んだOSSのアップグレード戦略
https://blog.cybozu.io/entry/2022/07/01/131640

サイボウズのストレージチームによる、開発・運用しているストレージインフラに使われている OSS である Ceph のアップグレード戦略を紹介した記事です。記事では戦略の概要と実例が紹介されています。

活発な OSS になればなるほどリリース頻度が高く、更新内容を確認するのが大変です。ストレージチームでは更新内容を隅から隅まで確認するのが大変なので、どういったことを確認するかや、どういうふうに効率よく確認するかを決めることで、チェックを効率化しているとのことです。

個人的には「明らかに自分たちの対象外である事が分かるキーワードをリストアップしておき、そのキーワードについてのみの話であれば読み飛ばす」という運用ルールが面白かったです。何が関係あって何が関係ないかの判断を毎回行うのは面倒なので、キーワードリストを用意するのは効率良さそうと思いました。

依存関係の更新などで大変な人は詳しく読んでみてください。

## viraptor/reverse-interview
https://github.com/viraptor/reverse-interview/blob/master/translations/JAPANESE.md

面接における逆質問集（応募者から面接官への質問）です。いろいろなカテゴリ（役割、技術、チームなど）ごとに質問が載っています。

逆質問集なので、自分が応募者になるとき参考になりそうですが、面接官としても想定質問を考える上で使えそうですね。

# tool 🔨

## googleapis/release-please: generate release PRs based on the conventionalcommits.org spec
https://github.com/googleapis/release-please

git のコミットログを解析していい感じのリリース用プルリクエストを作ってくれるツールです。Google 製。

プルリクエストにはリリースに必要な情報の更新が含まれます（例えば npm パッケージなら CHANGELOG.md の更新と package.json のバージョンの更新など）。また、いろいろな言語に対応しています。プルリクエストをマージすると Releases を自動で作ってくれます。

バージョニングについては、[Conventional Commits](https://www.conventionalcommits.org) を利用したコミットメッセージを基に[メジャー、マイナー、パッチリリースを判断します](https://github.com/googleapis/release-please/tree/a61fa929b42f04c6acdd6650328d3f90903b7dc5#how-should-i-write-my-commits)。

[GitHub Actions のアクション](https://github.com/google-github-actions/release-please-action)での利用がおすすめされています。

さっそく僕も自分が作っている npm パッケージの OSS に導入してみました。
https://github.com/korosuke613/zenn-metadata-updater/pull/15/commits/fdc3502c023d3e7ea45788fa407c5fa048a2562e

これまでは[Ship.js](https://zenn.dev/lulzneko/articles/using-shipjs-to-make-service-releases-pr-based)という npm パッケージ向けのリリースツールを利用していたのですが、設定が煩雑であったり、プルリクエストを Squash マージしなければならなかったりと不満はありました。release-please は npm へのパブリッシュなど後続の処理も含めた設定がとにかく簡単で、Squash マージなど特殊なこともしなくて良いので十分乗り換えても良いと思いました。

リリース作業が面倒な人はぜひ使ってみてください。

## Terraformのplan結果をmarkdownとして整形するツール、terraform-j2mdの紹介 - Repro Tech Blog
https://tech.repro.io/entry/2022/07/05/113226

`terraform plan` 結果を markdown に変換するツール reproio/terraform-j2md の紹介記事です。

既存ツールとしては [mercari/tfnotify](https://github.com/mercari/tfnotify) や [suzuki-shunsuke/tfcmt](https://github.com/suzuki-shunsuke/tfcmt) がありますが、これらはプルリクエストへの plan 結果のコメントが主な機能となっています。比べて reproio/terraform-j2md は markdown へ変換する機能しかないため、ミニマムで使いやすそうです。余計な権限を与えなくていいのも嬉しいですね。

最近は [GitHub Actions に markdown で記述するサマリー機能が追加された](https://zenn.dev/korosuke613/articles/productivity-weekly-20220511#supercharging-github-actions-with-job-summaries-%7C-the-github-blog)ため、それとのシナジーも合いそうです。活用していきたいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [一般ユーザに払い出すと危険なサブドメインやメールアドレス - ASnoKaze blog](https://asnokaze.hatenablog.com/entry/2022/07/04/000036)
    - 仕様として予約されているサブドメインやメールアドレスのローカルパートを紹介している記事です
    - サービスを作ったり組織のメアドを作るときに注意したいですね。さっぱり知りませんでした
- **tool 🔨**
  - [Bun is a fast all-in-one JavaScript runtime](https://bun.sh/)
    - 高速な JavaScript ランタイムです
      - TypeScript にも対応
    - バンドルやトランスパイル、npm クライアントなどが組み込まれているオールインワンランタイムとなっています
    - 0 から作ったランタイムとしては Deno が有名ですが、Bun の特徴としては Deno と違って Node.js からの移行がしやすいと思われます
    - まだベータ版なので、今後に期待ですね
  - [maxgoedjen/secretive: Store SSH keys in the Secure Enclave](https://github.com/maxgoedjen/secretive)
    - Mac の Touch ID に使われているセキュリティコアプロセッサである Secure Enclave に SSH の秘密鍵を格納してしまおうツールです
    - Mac に搭載されているセキュリティコプロセッサが生成できる秘密鍵を使って ssh-agent のようなふるまいをします
    - セキュリティコプロセッサから秘密鍵を取り出すことはできないため、秘密鍵をセキュアに運用できます
      - マシンを買い換える場合は鍵を変えなければいけない
    - Touch ID で認証できて便利そうです
  - [Writer | Mintlify](https://www.mintlify.com/writer)
    - AI のスーパーパワーでコードからコメントを生成するツール・サービスです
    - GitHub Copilot や Amazon CodeWhisperer と異なりコメントを生成することに重きを置いています
    - 既に VSCode や IntelliJ 向けのプラグインもあります
    - [mintlify/writer](https://github.com/mintlify/writer) にもある通り、コードが Mintlify へのサーバに送信されるため、注意が必要です

# あとがき
最近ダーツを始めたのですが、これがなかなか楽しくてマイナポイント第二弾でマイダーツを購入しました。毎日投げたいのでボーナスでダーツボードを買おうか迷ってます。

デブサミ 2022 サマーにおいて、「生産性向上は一筋縄でいかない ～改善を進める上で生じる課題との付き合い方～」というタイトルで登壇するので、興味ある人はぜひ見にきてください。
https://event.shoeisha.jp/devsumi/20220721/session/3841/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
