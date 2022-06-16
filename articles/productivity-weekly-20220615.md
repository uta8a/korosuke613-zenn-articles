---
title: "Productivity Weekly (2022-06-15号) 簡易版"
emoji: "🌌"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220615"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 78 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今月多忙のため Weekly を書く時間が取れないので、**いつもより分量少なめの簡易版**とします。
ご了承ください。多分 7 月上旬か中旬くらいまで続く。
:::

# news 📺

## Bringing forward the End-of-Life Date for Node.js 16 | Node.js
https://nodejs.org/en/blog/announcements/nodejs16-eol/

- Node.js 16 の EOL が 7 ヶ月早まって 2023/09/11 となりました
- 本来なら例年通り LTS から 2 年半後の 2024 年 4 月に EOL となるはずでした
- 理由は Node.js 16 が利用している Open SSL 1.1.1 の EOL が 2023/09/11 であるからとのこと
  - ここら辺の背景はあんま詳しくない
- いつもより EOL が早いので Node.js 18 が出たら早めに移行してた方がいいかもですね

## GitHub Actions: Inputs unified across manual and reusable workflows | GitHub Changelog
https://github.blog/changelog/2022-06-10-github-actions-inputs-unified-across-manual-and-reusable-workflows/

- GitHub Actions において `workflow_dispatch` と `workflow_call` によってトリガーされるワークフローが、それぞれ inputs から入力を取得できるようになりました
- 以前は `workflow_dispatch` が `github.event.inputs` からしか入力を取れなかったため、`workflow_call` と併用する場合に両対応がめんどくさかったです
- これで両方のトリガーへの対応が簡単になります

## GitHub Actions: macOS 12 for GitHub-hosted runners is now generally available
https://github.blog/changelog/2022-06-13-github-actions-macos-12-for-github-hosted-runners-is-now-generally-available/

- GitHub Actions において、macOS 12 インスタンス(`macos-12`)が GA となりました
- macOS 12 で使えるツールの一覧
  - https://github.com/actions/virtual-environments/blob/main/images/macos/macos-12-Readme.md
- しかし 2022/06/16 時点で `macos-latest` はまだ macOS 11 のままです
  - https://github.com/actions/virtual-environments/blob/c9a93eb735fa5264acca9afd5c0c6b9348c8e407/README.md?plain=1#L18

## Internet Explorer 11 はサポートを終了しました。長年のご愛顧ありがとうございました。 - Windows Blog for Japan
https://blogs.windows.com/japan/2022/06/15/internet-explorer-11-is-no-longer-supported/

- Internet Explorer 11 がサポート終了しました
- やむを得ず IE11 を使ってた人は IE モードを備えた Microsoft Edge を使うようにしましょう
- IE を使ってたところは Edge を使うようになるはず（はず）なので、これで IE 対応をがんばらなくも良くなりますね

余談ですが、IE 卒業式がエモかった＆楽しかったです。
アーカイブが Youtube で見られるので気になる人は見てください。

https://www.youtube.com/watch?v=VWHJ06K9UwY


## Sunsetting Atom | The GitHub Blog
https://github.blog/2022-06-08-sunsetting-atom/

- GitHub 謹製のエディタである Atom の廃止が発表されました
- 2022 年 12 月ごろにリポジトリがアーカイブされるようです
- GitHub が Microsoft に買収されて Atom はどうなってしまうんだ...となりましたが、とうとう役目を終えるようですね。感慨深いです

# know-how 🎓
## IE11とさよならしたら全力で使えるHTML/CSSまとめ【40個以上】 | deep-space-blue
https://deep-space.blue/web/2263

- IE11 対応が必要無くなったので全力で使える HTML/CSS まとめです
  - その数 40 個以上
  - JavaScript 関連は紹介されてません
- ビジュアル・レイアウト系、便利系、フォーム関連などトピックごとにまとまってます
- 必要ならどんどん使いましょう

## スプリントの属人性を減らしたらベロシティが安定した話 - commmune Engineer Blog
https://tech.commmune.jp/entry/2022/06/13/101421
- スクラムマスターの方による、スプリントの属人性を減らすことでベロシティを安定化させた話です
- 記事では、取り組み導入の背景、属人性を減らす取り組み、取り組みの成果などが書かれています
  - 属人性減らす取り組み：WIP 制限、タスクサイズ制限、死亡前死因分析（プレモーテム）
- 個人的には WIP 制限が面白そうと思いました。やりかけのタスクは増えがちになってしまうので...

## テクニカルライティングの基本 - Speaker Deck
https://speakerdeck.com/naohiro_nakata/technicalwriting

- テクニカルライターの方によるテクニカルライティングの基本を説明したスライドです
  - 実はサイボウズ社内の研修資料です
- ドキュメントを書く上で知っておくべき前提や、テクニカルライティングの要素、テクニカルライティングの進め方（情報を整理する、アウトラインを作る、わかりやすく簡潔な文章で書く）などが書かれています
- わかりやすい文章を書くためのテクニックが書かれており、ドキュメントを書くうえで覚えておきたいことが多く書かれております
  - 「ドキュメントは、一部しか読まれないことを前提に書く」は間違いねえと思いました

## わかりやすいシステム構成図の書き方 - Qiita
https://qiita.com/fetaro/items/c8420f5de48f48317391

- わかりやすいシステム構成図の書き方を教える記事です
- わかりにくいシステム構成図とわかりやすいように改善したシステム構成図を例に、3 つのポイントを説明しています
- 複雑なシステムなのにコンポーネントのアイコンだけを書くのはやりがちなので気をつけたいです

# tool 🔨

## Kubernetesエンジニア向け開発ツール欲張りセット2022
https://zenn.dev/zoetro/articles/9454a6231a1273

- Kubernetes 関連の開発で使えるツールの紹介記事です
- 紹介ツールを体験できるサンプルリポジトリも用意されてます
- 個人的には Tilt というツールがとても開発時に便利そうでした
  - 依存ファイルやマニフェストを監視し、コンテナイメージのビルド、マニフェストの apply などを自動でやってくれる
- ちなみに他の Weekly 参加者は Jsonnet Language Server が革命的と言ってました


## ちょうどよいビルドツールEarthlyの紹介
https://zenn.dev/kesin11/articles/7f4eed7cabf38d

- Dockerfile + Makefile のようなビルドツール Earthly の紹介記事です
- Earthly の概要、特徴、ビルドを速くするために重要な要素、各種ビルドツールのリモートキャッシュについてなどが載っています
  - Gradle にリモートキャッシュ機能があるのは全く知りませんでした
- Earthly の説明もそうですが、ビルドの再現性についての説明もためになりました
  - なんとなく考えてはいてもちゃんと考えたことはなかった
- Dockerfile ライクにワークフローを書けるのでとっつきやすいので皆さんも触ってみてください
- （[Earthly は昔触ったことあるけど](https://zenn.dev/korosuke613/scraps/25df6314ffef7e)、最後に触ってから一年以上経ってるからまた触りたい）

## Prettier 2.7 にキャッシュを実装した
https://zenn.dev/sosukesuzuki/articles/1d1bfb73118a9b

- Prettier に結果をキャッシュする機能が付きました。これにより実行時間を短く出来るかもしれません
- この記事ではキャッシュ実装の背景と実装の説明、使い方が書かれています
- Prettier の実行時間で困ったことがないのですが、覚えておきたいですね

## ts-patternでTypeScriptにパターンマッチングを持ち込み、より型安全な世界へ
https://zenn.dev/aki202/articles/5d725c080640f9

- ts-pattern という TypeScript でパターンマッチングを行うためのライブラリの紹介記事です
- switch 文のみではパターンの網羅にビルド時に（静的解析で）気付けない**可能性**がある問題を解決できることを書かれています
  - 可能性と書いたのは switch 文でも気づくことはできるが抜け道があるため https://zenn.dev/aki202/articles/5d725c080640f9#fn-6b42-3
- ts-pattern の応用例も書かれており、ネストされた型やクラスで簡単に分岐できるのは便利そうと思いました

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを~~一言程度で~~書くコーナーです（今週はタイトルだけ）。

- **news 📺**
  - [AppleのFIDOサインイン認証情報「パスキー」の仕組み　Google、Microsoftと共同で推進する「パスワードを不要にする認証」（1/2 ページ） - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2206/13/news196.html)


# あとがき
IE がサポート終了しましたね。僕は IE 対応やったことないのですが、ヤバそうな雰囲気だけ知ってました。

上でも書きましたが、IE 卒業式がエモかったです。アーカイブが Youtube で見られるので気になる人は見てください。

https://youtu.be/VWHJ06K9UwY?t=461

色々あって今月は大変忙しいので簡易版ということで普段より分量を少なくしました。おそらく 7 月上旬か中旬くらいまで簡易版で行くと思います🙇

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::
