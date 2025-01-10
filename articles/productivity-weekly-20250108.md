---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2025-01-08)
emoji:
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
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
<!-- - [@ajfAfg](https://zenn.dev/arjef)
<!-- - [@takoeight0821](https://zenn.dev/takoeight0821) -->
<!-- - [@takamin55](https://zenn.dev/takamin55) -->

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

# tool 🔨
## Ghostty
https://ghostty.org/

新鋭ターミナルアプリです。Zero config でいい感じに使えたり、動作が爆速な点が特徴とのことです。

2024 年末にメジャーリリースがあってドカッと流行りましたね。なによりマスコットキャラクターが可愛くて好きです。デフォルトでいい感じに使えるのも嬉しい点ですが、デフォルトで選択可能なフォントやテーマが多い点も個人的に嬉しいです。例えばテーマとして [Iceberg](https://github.com/apache/iceberg) が標準装備されててめちゃビックリしました。

今後も使い続けていきたいアプリでした。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

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
