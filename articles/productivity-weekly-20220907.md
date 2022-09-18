---
title: "Productivity Weekly (2022-09-07号)"
emoji: "🖍"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220907"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 90 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions Larger runners - Are now in public beta | GitHub Changelog
https://github.blog/changelog/2022-09-01-github-actions-larger-runners-are-now-in-public-beta/

https://github.blog/2022-09-01-github-actions-introducing-the-new-larger-github-hosted-runners-beta/

GitHub Actions において、よりパワフルな GitHub-hosted runner を提供する機能が登場しました（パブリックベータ）。GitHub Teams および GitHub Enterprise Cloud のユーザ向けです。

よりパワフルな GitHub-hosted runner は以下の特徴を持ちます。

- Linux、Windows において最大 64 コア CPU、256GB RAM のマシンが使える
- ランナーの IP アドレス範囲を狭められる
- 管理者がランナーを誰が利用できるかコントロールできる

事前に Organization の設定でカスタマイズした GitHub-hosted runner を登録することで利用できるようです。料金については、通常のランナーと違い、パブリックリポジトリでも課金されます。

パブリックベータとは言っていますが waitlist に登録する必要があります。利用したい人は登録しましょう。

これまではハイスペックなランナーが必要な場合にはセルフホストランナーしか選択肢がなかったため、なかなかパブリックリポジトリでは使いづらかったですし、自分で用意する必要があって敷居が高かったです。GitHub がホスティングしてくれるのは嬉しいですね。

## A more scalable, container-friendly self-hosted runner: Container Agent - now in Open Preview - Build Environment - CircleCI Discuss
https://discuss.circleci.com/t/a-more-scalable-container-friendly-self-hosted-runner-container-agent-now-in-open-preview/45094

CircleCI において、セルフホストランナー(docker executor)を k8s 上でスケーラブルに動かすコンテナエージェント機能が登場しました（オープンプレビュー）。

これまでも CircleCI にはセルフホストランナー機能がありましたが、ジョブと VM（ランナー）を 1:1 でマッピングする必要があったため、スケーラビリティが低いという問題点がありました。今回の機能は、k8s 上で docker executor を動かすことでスケーラブルなセルフホストランナー(docker executor)を使うぞという機能になります。

ドキュメント: https://circleci.com/docs/ja/container-runner

Helm チャートをインストールするくらいでセットアップできそうです。簡単で良いですね。

まだまだプレビュー段階ですが、CircleCI のセルフホストランナーを使う上でファーストクラスな選択肢となっていきそうです。GA に期待ですね。

## Packages: Fine-grained permissions and organization-level publishing are now available for the GitHub Packages npm registry | GitHub Changelog
https://github.blog/changelog/2022-08-31-packages-fine-grained-permissions-and-organization-level-publishing-are-now-available-for-the-github-packages-npm-registry/

GitHub Packages の npm レジストリにおいて、いくつかの新機能が追加されました。

- Organization レベルで公開できるようになった
- アクセス制御を柔軟にできるようになった
- パッケージの可視性をインターナルにできるようになった

Packages のパッケージはリポジトリ単位で公開しなければならないため、Organization レベルで公開できるようになったのが特に嬉しいですね。他の新機能もチームで開発する上でとても嬉しいものになります。

気になるのが npm レジストリに限定されているところです。Packages は他にも Maven レジストリや Docker レジストリもサポートしていますが、なぜ npm レジストリに限定されているのかは謎です。
もしかしたら今後同じ機能が他レジストリにも入るかもしれませんね。

ますます便利になる GitHub Packages ですね。他レジストリにもぜひ適用してほしいです。


# know-how 🎓

## How GitHub uses Codespaces - Speaker Deck
https://speakerdeck.com/yuichielectric/how-github-uses-codespaces

https://www.youtube.com/watch?v=iOMsKOzAVe8

GitHub の中の人による、GitHub 社内での GitHub Codespaces 利用事例です。Youtube の動画も上がっているのでそちらを見るのがおすすめです。

GitHub は github/github の標準開発環境として Codespaces を利用しており、環境構築が非常に簡単になった、早く用意できるようになったとのことです。13GB 以上あるリポジトリの開発環境を 10 秒で用意できるのはにわかに信じがたいほどすごいです。

最近追加されたプリビルド機能も使って最新の環境を常に用意していたり、VPN のセットアップまでやってるなどの工夫も紹介されていました。

また、チーム外のプロダクトへのコントリビューションのハードルが下がったのも良いところらしいです。

やはり開発環境を先に用意しておけるのは良いですね。新メンバーのオンボーディングだけじゃなく、短い期間で参加するインターンシップ受け入れなどでも重宝しそうです。

## CDK for Terraform の使い方まとめ
https://zenn.dev/kou_pg_0131/articles/cdk-for-terraform

最近 GA になった CDK for Terraform の使い方をまとめてくれている記事です。

記事では、CDKTF の説明、各コマンドの使い方、リソース定義の仕方、モジュールの使い方やユニットテスト方法などが説明されています。

`cdktf convert` という HCL を CDK for Terraform のコードに変換するコマンドは知りませんでした。CDKTF への移行が楽にできそうですね。

CDKTF、正直まだ使い所がわかっていません。リソース定義は宣言的に書けた方がいいと思っている派なので、HCL 書けばいいじゃんとなってしまいます（テストも書かなきゃいけないし）。ただ、動的にインフラを生成したい場合などに使えたりするのかなとも思っているので、そのうち触ってみたいです。

# tool 🔨

## Four keys を計測する CLI ツールを作った - Qiita
https://qiita.com/hmiyado/items/fb9b0409ab479942ad4c

最近何かと話題の Four keys ですが、それを計測する CLI ツールを作ったという記事です。

Four keys はデプロイ頻度、変更リードタイム、障害修正時間、障害率の 4 つの指標です。このツールでは、Git のコミット、タグの情報を元にそれぞれの指標を計算するようです。

デプロイ頻度や変更リードタイムは計算しやすいと思うのですが、障害修正時間や障害率は障害の情報が必要となるため、単純な計測が難しいです。このツールではコミットメッセージに特定のキーワード（デフォルトは `hotfix`）が含まれているかどうかで判定しているようです。

記事中にも書かれていますが、Git の情報だけを元に計算しているため、利用できるプロジェクトは限られます。しかし、他のツールと違ってシンプルに使えるのが嬉しいところですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Audit Log Streaming to Datadog available as Public Beta | GitHub Changelog](https://github.blog/changelog/2022-08-31-audit-log-streaming-to-datadog-available-as-public-beta/)
    - 先日、GitHub の Audit logs のストリーミング先として Datadog が追加されましたがプライベートベータでした。今回、その機能がパブリックベータとなりました
  - [Autolinks with alphanumeric or numeric IDs | GitHub Changelog](https://github.blog/changelog/2022-08-31-autolinks-with-alphanumeric-or-numeric-ids/)
    - GitHub の Autolinks において、`<num>` がアルファベットを含むか数字のみを含むかを選択できるようになりました
    - [最近の変更](https://zenn.dev/korosuke613/articles/productivity-weekly-20220706#autolinks-with-alphanumeric-ids-%7C-github-changelog)で `<num>` に英数字が含まれるようになっていました

# あとがき
9 月は生産性向上チームのインターン受け入れをしていました。1 週間 × 2 回やりました。普段は半日くらいしかモブプロをしないのですが、インターン期間中は 1 日中モブプロをやるため本当に普段より疲れました。でもやっぱり最近の学生といろいろお話しできるのは良いですね。最近学生間で流行っている技術やコロナ禍の大学事情など聞けて楽しかったです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: スプラトゥーンの非同期処理の話 ～なにがラグのせいなのか～｜まけトピア｜note
https://note.com/maktopia/n/n307369c9f10d

久々の今週のおまけです。

9/9 にスプラトゥーン 3 が発売しましたね。僕も夜な夜なインクを撒き散らしています。

この記事は、そんなスプラトゥーン 3 の通信対戦における非同期処理の仕組みを解説した記事です。

:::message 
著者による**推察**の話なので、任天堂公式が言ってるわけじゃないことに注意です。
:::

スプラトゥーンは通信対戦時にもっさり感を抑えるため非同期処理を採用しており、メインウェポンによるダメージ判定とサブウェポンによるダメージ判定で攻撃する側とされる側のどちらが主語となるかが異なるというお話しでした。

あくまで著者の推察によるものですが、挙動を見る限り腑に落ちる推察だと思いました。

この仕様を知ってるかどうかでスプラで~~イライラすることが減りそう~~さらに楽しめそうですね。

以前 omake で「[ロックマンエグゼで快適なネット対戦ができるようになるかもしれない話](https://zenn.dev/korosuke613/articles/productivity-weekly-20220427#omake-%F0%9F%83%8F)」というのを紹介しましたが、やはりこういうゲームの通信対戦系の手法は面白いですね。基本的にゲームでもない限りそこまでシビアな同期は必要にならないので新鮮な技術を楽しめます。

ちなみにロックマンエグゼのリマスターである「ロックマンエグゼ アドバンスドコレクション」が発売予定ですが、待望の通信機能も実装中らしいです。やったぜ。

<!-- 『ロックマンエグゼ アドバンスドコレクション』「通信機能を鋭意制作中です！」と江口名人が公開。メニュー画面などでは3Dのロックマンの姿が【TGS2022】 | ゲーム・エンタメ最新情報のファミ通.com -->
https://www.famitsu.com/news/202209/16276178.html

