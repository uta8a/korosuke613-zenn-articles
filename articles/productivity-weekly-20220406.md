---
title: "Productivity Weekly (2022-04-06号)"
emoji: "🎫"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220406"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 69 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions: Job management hooks for self-hosted runners | GitHub Changelog
https://github.blog/changelog/2022-04-04-github-actions-job-management-hooks-for-self-hosted-runners/

GitHub Actions のセルフホストランナーにおいて、ジョブの開始前や完了後にシェルスクリプトを実行できるようになりました。

スクリプト内では GitHub Actions の一部のワークフローコマンドが使え、また、ウェブフックのペイロードにアクセスできます。環境変数でトリガーするスクリプトを設定します。

例えば、ランナーを使い回す場合に環境をクリーンアップしたり[^cleanup]、Datadog 等にデータを送ってランナーの状態を記録したりと、さまざまな使い方が思い浮かびます。セルフホストランナー勢には嬉しい機能ですね。

[^cleanup]: ephemeral runner を使った方が確実ではあります。

## AWS Organizations now provides a simple, scalable and more secure way to close your member accounts | AWS Cloud Operations & Migrations Blog
https://aws.amazon.com/jp/blogs/mt/aws-organizations-now-provides-a-simple-scalable-and-more-secure-way-to-close-your-member-accounts/

AWS Organizations の管理アカウントから管理している AWS アカウントを一元的に削除できるようになりました。コンソール、CLI、API、SDK から可能です。これまでは削除したいアカウントのルートユーザでログインしなければ削除できませんでした。

なかなか便利ですが、たくさん並んだアカウント画面は誤って別アカウントを削除しそうで怖いですよね。でも大丈夫、大事なアカウントに対しての `organizations:CloseAccount` アクションを `Deny` することで、Organizations からの削除を拒否できます[^90days]。

大量に不必要となった AWS アカウントを抱えている組織はこれを機に大掃除してもいいかもしれませんね。

[^90days]: とは言え削除から 90 日以内なら復元できますが。

## Codespaces now offers organization policies to restrict port visibility settings | GitHub Changelog
https://github.blog/changelog/2022-04-04-codespaces-now-offers-organization-policies-to-restrict-port-visibility-settings/

GitHub Codespaces において、ポートフォワーディングにアクセス制限を付与できるようになりました。

GitHub Codespaces はコンテナ内で開いたポートにインターネットからアクセスできる機能がありますが、これまでは可視性を Private、Public、Org で設定できました。Private にすると、発行された URL にアクセスした段階で GitHub の認証が求められます。Public にすると認証は求められません。Org にすると、Private と同じように認証が求められ、Organization のメンバーのみがアクセスできます。

今回の変更は、Org において、ポートフォワーディングの可視性をポリシーという形で制限できるようになったというものです。ポリシーを設定することで、利用ユーザが誤って Public にポートを公開する事故を防げます。

また、今後はアイドル時間のタイムアウトや保存期間、コンテナイメージもポリシーの制約として追加していく予定とのことです。だんだん Codespaces でも統制を効かせられるようになってきて良いですね。

# know-how 🎓

## Technology Radar | An opinionated guide to technology frontiers | Thoughtworks
https://www.thoughtworks.com/radar

Thoughtworks 社の Technology Radar、最新の Vol.26 が公開されました。

Technology Radar は ThoughtWorks 社が発信している「今こういう技術が熱いよ」というものです。Techniques、Tools、Platforms、Languages & Frameworks の 4 分野において、`Adopt`、`Trial`、`Assess`, `Hold` の４評価にで各技術が紹介されています。四半期ごとに新しい Vol が発行されます。

Technology Radar 自体の説明は以下の記事が詳しいです。

https://allabout-tech.hatenablog.com/entry/2019/04/24/114300

個人的に気になったのが Terraform 関連です。今回の Technology Radar Vol.26 において、[tfsec が Adopt（採用すべきアイテム）に格上げされました](https://www.thoughtworks.com/radar/tools/tfsec)。また、[cdktf が Assess（探求の価値あり）として新登場しました](https://www.thoughtworks.com/radar/tools/cdktf)。

他にも [SwiftUI が Adopt になってる](https://www.thoughtworks.com/radar/languages-and-frameworks/swiftui)など、見ていて面白いです。気になる人は眺めてみてください。新しいイケてる技術に出会えるかもしれません。

## マルチアーキテクチャ対応イメージのビルドをどうにか早くしたかった - ぽよメモ
https://poyo.hatenablog.jp/entry/2021/09/25/225329

CI/CD サービスでマルチアーキテクチャ対応の Docker イメージを 1 つのジョブで作ると時間がかかるので、アーキテクチャごとにジョブ並列で build & push して最後にまとめることで高速にするという方法を紹介している記事です。また、Go のイメージの場合にクロスビルドをうまく活用する方法も紹介されています。

最近は Arm が台頭してきていることから、クロスプラットフォームな Docker イメージが以前よりも求められています。

QEMU と `docker buildx` コマンドを活用することで、単一のアーキテクチャのマシン上でクロスプラットフォームな Docker イメージをビルドできますが、どうしても CI などの単一ジョブ上で実行すると遅くなってしまうという問題があります。そこで、ジョブを分けて別々にタグを付け、ビルド＆プッシュし、最後に `docker manifest` コマンドで各アーキテクチャをまとめたタグを生成することで、単一タグでマルチアーキテクチャに対応させています。

この記事では、マルチアーキテクチャ対応イメージの説明、作り方、ビルドにかかる時間、CI でのビルド高速化方法などが載っています。

自分も最近 Docker イメージのマルチアーキテクチャ対応を行なったのですが、その際にこういう方法があるのかと参考になりました。buildx によるマルチアーキテクチャビルド方法は色々見つかるのですが、manifest を活用して並列でビルドする方法は貴重な情報でした。勉強になりました。マルチアーキテクチャ対応をする人には参考になると思います。

# tool 🔨

## GitHub Next | GitHub Copilot Labs
https://next.github.com/projects/copilot-labs/

GitHub Next が GitHub Copilot の実験的機能が使える VS Code 拡張機能 GitHub Copilot Labs を公開しました。機械学習パワーでコードを自然言語で説明する機能、コードを他言語へ翻訳する機能があります。

自分も使ってみましたが、なかなか面白いです。コードの説明機能は初心者向けな機能な気がしましたが、使用ライブラリを深掘りして行った際にあると便利だなと思いました。コードの翻訳機能も面白いです。実際使える場面があるか怪しいですが、簡単なスクリプトに関しては案外使えるかもしれません。

実験的機能なので利用場面は少ないかと思いますが、純粋に面白いので気になる方は遊んでみてください。

## yoav-lavi/melody: Melody is a language that compiles to regular expressions and aims to be more easily readable and maintainable
https://github.com/yoav-lavi/melody

melody はコンパイルして正規表現を生成できる言語および CLI ツールです。

例えば以下のようなコードから `[a-zA-Z]+ 1\d{2}` が生成できます。

```rust:コンパイルすると [a-zA-Z]+ 1\d{2} になる
some of <alphabetic>;
<space>;
"1";
2 of <digit>;

// classname 1xx
```

[Melody Playground](https://melody-playground.vercel.app/) というプレイグラウンドが用意されているので、ブラウザ上ですぐに試せます。

なかなか面白いな〜と思った反面、melody の構文を覚えるよりも普通に正規表現書いた方が早そうだなとも思いました。ただ、複雑な正規表現を書かなければならない場合に melody で管理することでメンテナンス性が増すかもしれません[^somosomo]。

[^somosomo]: そもそも複雑な正規表現を書くなって話ですが...

## Warp: The terminal for the 21st century
https://www.warp.dev

Rust 製 Mac 向けターミナルアプリです。まるでエディタのようにコマンドを組み立てることができます。標準のプロンプトが用意されてたり、コピペがしやすかったり、fig のようにコマンド保管が備わってたりと他のターミナルアプリではあまり見ない機能が備わっています。

自分も使ってみて、割と良さげだと思ったのですが、見た目やプロンプトなどの細かい設定がまだ全くできず、そこがまだまだ微妙だなと思いました。また、日本語入力はできますが、変換を確定するまで文字が表示されないという問題もありました。

まだ[パブリックベータであり、最近シリーズ A を調達した](https://www.warp.dev/blog/introducing-warp)ことからも、これからどんどん機能拡張が行われていくと思われます。個人的には期待しているので楽しみです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [クラウドのセキュリティ事故の99%は設定ミス。AWS向けクラウドセキュリティ診断プラットフォーム「Cloudbase」ベータ版の提供開始](https://prtimes.jp/main/html/rd/p/000000014.000056572.html)
    - AWS 向けのセキュリティ診断サービス Cloudbase のベータ版が公開されました
    - アクセス制限、IAM ユーザの権限、SG などの設定ミスを検知できるようです
    - AWS Trusted Advisor でも似たようなことができますが、それとどう違うのかが気になるところです（比較しているドキュメントを見つけられなかった）
- **tool 🔨**
  - [dlvhdr/gh-dash: gh cli extension to display a dashboard of PRs and issues - configurable with a beautiful UI.](https://github.com/dlvhdr/gh-dash)
    - GitHub 上の Issue や Pull Request をグラフィカルに確認できる GitHub CLI 拡張機能です
    - いい感じの見た目で確認できるので、わざわざブラウザを開かなくてもこれらの確認ができます
    - ただ、自分の環境では表示がぶっ壊れてしまいました。色々カスタマイズしてるので何が原因なのかわかりません。悲しみ

# あとがき
最近学生との面接やら面談やらをよくやっています。最近の学生と話せるのはなかなか楽しいです。良い刺激になります。去年は僕も新卒感を出すことで緊張を和らげていたのですが、早くも 3 年目社員となってしまったことでその手が使えなくなってしまいました。もちろん流石に慣れてきたのですが、慣れれば慣れるほど自分の学生目線力の衰えを感じており、なかなか難しいなと思う次第です。良い意味でフレッシュ感を維持したいですね。

:::message
生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（4/22 エントリー開始）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏
今週のおまけです。

### 【事例紹介】【宮崎大学】企業と競い合う学生チームがロボットコンテストで得たものとは | ETロボコン
https://www.etrobo.jp/et2022presentation_miyazaki-u/

宮崎大学　片山徹郎研究室のメンバーを中心としたチーム「KatLab」の ET ロボコン参加事例記事です。

Productivity Weekly 記事を熱心に読んでくださっている方はご存知かと思いますが（？）、僕は大学の頃に ET ロボコンというロボットコンテストに「KatLab」のメンバーとして参加していました。

- [Thanks mindstorms EV3-教育版レゴ® マインドストーム® EV3 ありがとうキャンペーン](https://zenn.dev/korosuke613/articles/productivity-weekly-20210707#thanks-mindstorms-ev3-%E6%95%99%E8%82%B2%E7%89%88%E3%83%AC%E3%82%B4%C2%AE-%E3%83%9E%E3%82%A4%E3%83%B3%E3%83%89%E3%82%B9%E3%83%88%E3%83%BC%E3%83%A0%C2%AE-ev3-%E3%81%82%E3%82%8A%E3%81%8C%E3%81%A8%E3%81%86%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%9A%E3%83%BC%E3%83%B3)
- [ETロボコン2021 地区大会（Cブロック）で僕が所属していた研究室が総合優勝しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210929#et%E3%83%AD%E3%83%9C%E3%82%B3%E3%83%B32021-%E5%9C%B0%E5%8C%BA%E5%A4%A7%E4%BC%9A%EF%BC%88c%E3%83%96%E3%83%AD%E3%83%83%E3%82%AF%EF%BC%89%E3%81%A7%E5%83%95%E3%81%8C%E6%89%80%E5%B1%9E%E3%81%97%E3%81%A6%E3%81%84%E3%81%9F%E7%A0%94%E7%A9%B6%E5%AE%A4%E3%81%8C%E7%B7%8F%E5%90%88%E5%84%AA%E5%8B%9D%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F)

それこそ KatLab の後輩たちは去年の地区大会で総合優勝し、[全国大会で総合 4 位・情報処理学会の若手奨励賞受賞](https://www.etrobo.jp/2021archive/#:~:text=%E3%81%9F%E3%81%97%E3%81%BE%E3%81%97%E3%81%9F%E3%80%82-,%E8%8B%A5%E6%89%8B%E5%A5%A8%E5%8A%B1%E8%B3%9E%EF%BC%88%E4%B8%80%E8%88%AC%E7%A4%BE%E5%9B%A3%E6%B3%95%E4%BA%BA%E6%83%85%E5%A0%B1%E5%87%A6%E7%90%86%E5%AD%A6%E4%BC%9A%EF%BC%89,-%E8%A1%A8%E5%BD%B0)というすごい結果を残しました。マジですごい。ガチ参加の企業多いし。

この記事は、そんな KatLab が ET ロボコンで得たものについてインタビュー形式で書かれた記事です。特徴的な 3 つの活動内容（勉強会、アジャイル開発、3 チームに分けた開発）と活動を通して得られたこと（実践的なチーム開発の経験、企業との関係など）が書かれています。

特に面白かったのが KatLab 内に生産性向上チームがいたことです。サイボウズの生産性向上チームではありません。開発環境の構築や自動化ツールの開発等をやっていたようです。競技プログラムを書く人が集中しやすいように専門チームが設けられているのは良いですね。

![](/images/productivity-weekly-20220406/katlab_ept.jpg =400x)
*記事より引用。モデルチーム、競技チーム、生産性向上チームの 3 チームを設けたらしい。*

おそらく Productivity Weekly を読んでいる方に現役の ET ロボコン参加者はいないと思いますが、もしいたらぜひ参考にしてみてください。あと、企業の皆さんがもし宮崎大学の ET ロボコン参加者と話すことがあれば、なんか良い成績を残してることを思い出してみてください。
