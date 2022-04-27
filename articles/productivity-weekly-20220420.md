---
title: "Productivity Weekly (2022-04-20号)"
emoji: "🧉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220420"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 71 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Dependabot alerts now surface if your code is calling a vulnerability | The GitHub Blog
https://github.blog/2022-04-14-dependabot-alerts-now-surface-if-code-is-calling-vulnerability/

GitHub が Dependabot に脆弱性のあるライブラリの関数を呼び出している箇所を指摘する機能を追加しようとしています。現在 Python のみでベータテスト中です。

Dependabot Alert は依存関係に脆弱性が含まれているかどうかを知らせてくれる機能ですが、その脆弱性がある部分（コード）を通過しているかどうかは利用している開発者が確認しなければなりません。今回の新機能は、その確認を行いやすくし、脆弱性対応のトリアージコストを減らすためのものになります。

現在は脆弱な関数の直接呼び出ししか対応していませんが、将来的には間接呼び出しにも対応する予定とのことです。ベータ機能ですが、全てのパブリックリポジトリと Advanced Security が有効になっているプライベートリポジトリで利用できます。

なかなか面白い機能ですね。依存関係の脆弱性が依存元の製品に関わってるかどうかの調査って大変ですよね。間接呼び出しにも対応したら結構便利かもしれません。正式リリースが楽しみです。

## A Brand New Convenience Image is Coming, cimg/deploy - now in beta - Ecosystem / CircleCI Images - CircleCI Discuss
https://discuss.circleci.com/t/a-brand-new-convenience-image-is-coming-cimg-deploy-now-in-beta/43674

CircleCI の Convenience Image（`cimg/*`）に `terraform` や `kubectl` などのデプロイ用ツールがプリインストールされたイメージが登場しました（ベータ）。これまではデプロイ用途のイメージがなかったようです。

まだベータ版であり、上記ディスカッションでフィードバックが求められています。例えば他に入れるべきツールは何かとか。

デプロイ周りのツールがたくさん入っていて嬉しいのかは実際どうなんだろうって思いますが、イメージのサイズがそんなに大きくなかったり、ツールのバージョンにあまり依存しない場合はあると嬉しいのかもしれません。フィードバックがある方は送ってみましょう。

## Node.js 18 is now available! | Node.js
https://nodejs.org/en/blog/announcements/v18-release-announce/

Node.js 18 がリリースされました。まだ LTS (Long Term Support) ではありません。LTS は 2022/10 月が予定されています。ちなみにコードネームは Hydrogen です。

Node.js 18 の主な変更点は別にしんどくないブログさんが良い紹介記事を出してくれています[^shisama]。

https://shisama.hatenablog.com/entry/2022/04/20/011103

個人的には `fetch()` がフラグ無しで実行できるようになったのが嬉しいです（とは言えまだ experimental ですが）。今までは `node-fetch` なんかを入れてましたね。

あと気になったのが `node:test` モジュールの追加です。Jest などの 3rd party 製テストフレームワークを入れなくてもテストランナーが使えます。とは言え本格的に使うことになるのはまだまだ先だと思います。

Node.js 18 の LTS は半年先の予定なのでまだ使わないかもしれませんが、LTS に備えて今のうちに知っておいてもいいのかなと思います（`requestTimeout` のデフォルト値が変わるらしいし）。

[^shisama]: Node.js 15 や 16 の時もお世話になりました🙇

# tool 🔨

## dagger.io | Introducing Dagger: a new way to create CI/CD pipelines
https://dagger.io/blog/public-launch-announcement

ポータブルな CI/CD ツール Dagger が登場しました（最近までクローズドベータだった）。Dagger は Docker 互換のランタイムが使用可能な場所であればどこでも同じように動作するため、 Dev/CI ドリフト[^devci_drift]や CI ロックイン[^ci_lockin]を減らせると紹介されています。

CircleCI での Orb、GitHub Actions でのアクションのようなものも備えています。また、パイプラインの記述には CUE 言語が採用されています（参考：[CUE言語(cuelang)に入門しよう](https://zenn.dev/riita10069/articles/plactice_cuelang)）。

自分も [Getting Started 的なもの](https://docs.dagger.io/1200/local-dev/)を試してみました。そのあと自分で以前作ったテストコードを実行するパイプラインを作ってみようとしたのですが、CUE 言語の知識がさっぱりないのと、これまでの CI サービスと仕様？が違いすぎる[^other_ci]ことから、うまく使いこなすには時間がかかると判断して諦めました。学習コストは高めだなと思いました。誰かパイプラインの書き方についてのチュートリアル的な記事を出してくれるのを祈ります。

また、結局のところキャッシュやテスト結果の保存など、各種 CI ツールの持つ独自機能を使いたい場合が多いと思うので、それらの部分はどうしてもロックインしそうだなと思いました。そういう CI ツール独自の機能との組み合わせ方については公式ドキュメントで見つけられなかったため、各々で頑張る必要がありそうです。（もちろん CI ツール独自の機能を一切使わないのであれば非常に有用だと思います。）

クローズドベータが終わった直後なのでしょうがないと思いますが、Dagger に移行するにはまだ難しい、早いという印象でした。もう少し周辺の知見が溜まってきたらもう一度探求したいですね。

[^devci_drift]: 同じようなファイル(CI ワークフロー、Dockerfile、ShellScript など)を 2 回以上記述することとのこと。
[^ci_lockin]: ロックイン自体はベンダやツールなどを乗り換える際にかかるコスト（スイッチングコスト）が高くてなかなか乗り換えるのがむずい状態、という認識。CI ロックインはそれの CI サービス版だと思われる（例：GitHub Actions から CircleCI に乗り換える際にワークフローを書き換えていくのがとにかく大変）
[^other_ci]: 例えば GitHub Actions が登場したときはまだ CircleCI の知識が使いまわせたため、比較的移行にかかる学習コストは低かったと考える。どちらも YAML だし。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Tritanopia Colorblind Theme Beta | GitHub Changelog](https://github.blog/changelog/2022-04-19-tritanopia-colorblind-theme-beta/)
    - GitHub のカラーテーマに青黄色覚異常者向けのテーマが登場しました
      - [青黄色覚異常は青と黄が他の色となってしまうらしい](https://kotobank.jp/word/%E9%9D%92%E9%BB%84%E8%89%B2%E8%A6%9A%E7%95%B0%E5%B8%B8-1553050)
- **tool 🔨**
  - [tilfinltd/aws-extend-switch-roles: Extend your AWS IAM switching roles by Chrome extension, Firefox add-on, or Edge add-on](https://github.com/tilfinltd/aws-extend-switch-roles)
    - AWS コンソール上でアカウントをスイッチロールする場合、5 個までしかロールは保存されないが、このブラウザ拡張機能でロールを管理することでたくさんのロールにすぐスイッチできるようになるというもの
    - ほぼ丸々 `~/.aws/config` を渡せばいいので簡単に設定できる
    - Large Supporters にクラメソさんがいる
    - （前も紹介した気がするので koneta に）
  - [sqshq/sampler](https://twitter.com/github/status/1516509511711870989)
    - コマンドの実行結果をなんかリッチにグラフィカルに表示できるツール。
    - 使い方は、グラフィカルに見たいコマンドを YAML で定義して、実行するだけ 
    - GitHub がツイートしているが、最新リリースバージョンの v1.1.0 は 3 年前なのが気になる


# あとがき
今週号はネタ少なめでした。最近はやりたいことがたくさんあってなかなか手が回っていません。ゴールデンウィークは何にも予定がない（😢）ので色々やりたいことやりたいですね。とりあえずエルデンリングの ED みたい。あとガンプラ消化。

:::message
生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（~~4/22 エントリー開始~~→生産性向上コースのインターンは 5/23 からでした。すみません）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏
今週のおまけです。

### エルザ、Ubuntu搭載の15.6型モバイルワークステーション - PC Watch
https://pc.watch.impress.co.jp/docs/news/1401753.html

Ubuntu 搭載のラップトップですね。モバイルワークステーションと書かれている通り業務用っぽいので結構なお値段します。

なんでこれを omake においたのかというと、昔からラップトップの Linux があるといいな〜って思ってたんですよね。バックエンドを主に触るものとしてはサーバが Linux なら開発環境も Linux にしたいものです。今のところ Mac を使ってますが、Mac は UNIX でやっぱり Linux とは違うので。

最近では Windows なら WSL だったり [Chromebook でも Linux 使えるみたい](https://support.google.com/chromebook/answer/9145439?hl=ja)だったりと、OS が Linux での開発をサポートするパターンも増えてきました。でもやっぱりそれなら最初から Linux 入ってたほうが楽（Chromium OS は Linux ディストリビューションですが）。

もちろん自分でラップトップのプリイン OS を吹き飛ばして Ubuntu なんかをインストールすればいい話ですが、ハードウェアとの相性問題があったりする[^aisyo]し、やはり面倒です。そういえば[最近 Chrome OS Flex も登場](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#get-chrome-os-flex-for-pc-or-mac---chrome-enterprise)しましたね。あれもいい感じです。


今回の記事のような、メーカーがサポートしてくれるプリインで Linux が入ったラップトップはハードの相性周りも多分うまくやってくれてるし、何らかのサポートもしてくれるしいいな〜って思いますね。世の中に Linux 搭載の個人向けラップトップ増えろ！

:::message
Linux 搭載ラップトップ少ないと思ってこの節を書いたけど、調べてみると割とあるっぽい。自分が知らなかっただけ。
- https://xblood.hatenablog.com/entry/dell-xps-13-developer-edition
- https://raylink.info/linux/
:::

[^aisyo]: 学生の頃、当時持っていた Vaio に Ubuntu を入れてデュアルブートを実現したのですが、なんかハードとの相性が悪くて色々大変だったのを覚えています。最終的には Ubuntu が起動しなくなってパーティションごと消しました。
