---
title: "Productivity Weekly (2021-3-24号)"
emoji: "♨️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 19 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## Introducing CircleCI server 3.x: enterprise-focused Kubernetes for self-hosted CircleCI installations - CircleCI
https://circleci.com/blog/introducing-server-3.x/

CircleCI Server 3 系がリリースされました。CircleCI Server とはオンプレ版の CircleCI のことです。

3.x から kubernetes クラスター内で動作するようになります。ただ、[Architecture](https://circleci.com/docs/2.0/server-3-overview/#architecture)を見る限り、あくまでサービスクラスターのみが k8s 上で動作し、nomad クラスターや nomad クライアントは従来通り VM 上で動作するようです[^nomad]。

もちろん機能面でも変更があって、これまで使えなかったパイプラインや orb などのクラウド版の機能が使えるようになるようです。また、これまでよりも速く最新の CircleCI クラウドの機能が使えるようになるとのことも書いてあります。CircleCI Server はクラウド版の機能追加にとても追いつけてなかったので嬉しいですね。

早く使いたいところですが、2.x 系からのアップグレードがそんなに簡単では無さそうなので、サーバー管理者を応援したいですね。

[^nomad]: k8s 上で動かさないのは docker in docker を避けるため？
## Test Insights Available in Preview for All Users - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/test-insights-available-in-preview-for-all-users/39463

CircleCI Cloud に Test Insights 機能が追加されました(プレビュー)。遅いテストや不安定なテストの分析がしやすくなります。

また、不安定なテスト(おそらく flaky test のこと)の検出機能も開発中のようです。テスト結果が可視化されることで、ボトルネックとなっているテストや不安定なテストを特定し、CI の高速化、安定化を促進できると思います。

早速どんなものか見てみたのですが、[`store_test_results`でテスト結果を保存](https://circleci.com/docs/2.0/collect-test-data/)しておかないといけないようでした..。

![](https://storage.googleapis.com/zenn-user-upload/0zocr4hrj168tpfyzn3ck6kj6foh)

> Test Insights are here. To take full advantage of this feature, make sure to upload test results by adding the store_test_results step to your config.yml file.

CircleCI でテストを行っている方はテスト結果をちゃんと保存するようにして Insights で確認してみてください。

## GitHub における大規模なモノリポのパフォーマンスの向上 - GitHubブログ
https://github.blog/jp/2021-03-19-improving-large-monorepo-performance-on-github/

GitHub で大規模なモノレポを扱う場合のパフォーマンスが向上しました。

GitHub では大規模なモノレポのプッシュに失敗するという問題がたびたび起こっていました。そのため、GitHub は新たなプロジェクトを立ち上げて、リポジトリのメンテナンス改善などを行ったことで、プッシュに失敗することがほぼゼロになったとのこと。

大規模なモノレポを扱ってた方は知らないうちにプッシュやプル時のパフォーマンスが上がっていたかもしれません。クラウド版だけでなく、GitHub Enterprise Server にもこの変更は含まれているようです。

> デフォルトでは、GitHub は 50 回の git push 操作の後、あるいは 40MB のパックされていないファイルを受け取ると、リポジトリのメンテナンスを実行します。

僕は GitHub がリポジトリのメンテナンスを行ってくれていることをそもそも知りませんでした。裏で `git gc` や記事にも出てきた `git repack`などを叩いているのだと思います。

余談ですが、`git maintenance`というコマンドもあるのですね。こちらも知りませんでした。
https://github.blog/2021-03-15-highlights-from-git-2-31/#introducing-git-maintenance

## Twitter acqui-hires team from Reshuffle to work on its API platform | TechCrunch
https://techcrunch.com/2021/03/23/twitter-acquihires-team-from-reshuffle-to-work-on-its-api-platform/

Twitter 社が Reshuffel という API 統合プラットフォームを作っている会社を買収しました。この買収により、Twitter API 開発を高速化していくとのことです。

最近 Twitter 本体の開発スピードが上がってきていることから、開発者向け API の開発もそのスピードに追いつかせたい狙いがあるように思えます。実際のところ、開発者向け Twitter API でできないことがいくつかあり[^dekinai]、API の開発が遅い印象はありました。

Twitter 関係のソフトウェアを作っている人は続報に期待ですね。

[^dekinai]: Fleetや予約投稿など

# know-how

## Solving the innersource discovery problem - The GitHub Blog
https://github.blog/2021-03-23-solving-the-innersource-discovery-problem/

「InnerSource なプロジェクトを見つけづらい問題」を改善するためにポータルを作るといいという話です。

InnerSource については過去の GitHub の発表スライドをご覧ください。
https://speakerdeck.com/yuichielectric/how-to-implement-innersource

InnerSource を実現する上で課題となることの 1 つに discoverability(発見可能性)が低いことが挙げられます。社内に散らばるリポジトリのうちどれが社内 OSS なのかがわかりづらいという、見つけることができないという問題です。

GitHub は、discoverability を高めるために、プロジェクトポータルを用意してそこに各インナーソースの情報をまとめているようです。記事ではポータル、および、ポータルに載せるリポジトリ群を収集するクローラー[^topic]の OSS とその方法を紹介しています。

すでに便利な OSS があることから、ポータルの作成はそこまで難しくないように思えます。InnerSource を実現するために利用しても良いかもしれません。

[^topic]: GitHub リポジトリに設定されたトピックを見てリポジトリを収集しているようです。

## 技術的負債の生態 - maru source
https://blog.h13i32maru.jp/entry/2021/03/21/185345

Jasper の作者が技術的負債について考察した記事です。Jasper の開発時に発見・返済した技術的負債を基に、なんで技術的負債は生まれるのか、生み出さないことはできるのか？どうすれば最小限に抑えられるのかなどを考察し、「生態」としてまとめられています。

多くのソフトウェアエンジニアは技術的負債に日々悩まされていると思います。技術的負債について考える上で参考になる記事だと思います。
また、記事冒頭にも書いてありますが、t_wada さんが翻訳された技術的負債記事も合わせて読むことをお勧めします。

# あとがき
今週も比較的ネタが少なめでした。週によって多かったり少なかったりムラがあります。水曜日は横浜にあるスカイスパというサウナ施設に泊まったので、Productivity Weekly 記事はちょっと遅れてしまいました。サウナとても良かったです。アウフグースの熱風を全身に浴びてきました。

https://www.skyspa.co.jp/

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### Slapdash
https://slapdash.com/

ウェブサイトやウェブサービスをワークスペースにまとめられるクラウドサービスです。何か作業を行う際に関係するものをまとめておきたいことが多々あります。

連携可能なウェブサービスの連携設定をすることで、ウェブサービスをまたいで検索ができたり、ワークスペースとしてまとめることができます。何か作業をするときに役立ちそうです。

![](https://storage.googleapis.com/zenn-user-upload/z26kq4ufvq916tb2g7lax6m2957u)

例えば僕がいた研究室の情報をまとめようとするとこんな感じにできます。Slack のチャンネルをクリックすると、ブラウザではなく Slack のデスクトップアプリが立ち上がります。こういう部分が嬉しいですね。

![](https://storage.googleapis.com/zenn-user-upload/1llvf3enphiv24m7reb6v019bkg8)

また、各サービスを連携することで、サービスを横断した検索が可能です。これも地味に嬉しいところですね。

ただ、URL をまとめるだけならばブラウザのブックマーク機能でも十分に可能です。せっかくデスクトップアプリを開くことができるので、任意のコード(`code ~/workspace/hoge`みたいな)を実行できるともっと可能性が広がる気がします。

今後に期待ですね。