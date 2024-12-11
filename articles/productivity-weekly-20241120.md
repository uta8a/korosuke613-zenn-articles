---
title: AWSの統制系アプデぞくぞく｜Productivity Weekly(2024-11-20)
emoji: 👮‍♂️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241120
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-11-20 単独号です。

今回が第 169 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## AWS Organizations を使用するお客様のためのルートアクセスの一元管理 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/centrally-managing-root-access-for-customers-using-aws-organizations/

AWS Organizations において、メンバーアカウントのルートアクセスを一元管理できるようになりました。実際にできるようになった主なことは次の通りです。

- メンバーアカウントからルート認証情報を削除可能に / ルート認証情報のリカバリの禁止可能に
- ルート認証情報なしでメンバーアカウントを作成可能に
- ルートアカウントからメンバーアカウントへのルートアクションを可能に（ルートセッションという機能らしい）
  - ルートユーザー認証情報の確認
  - ルート認証情報なしでのアカウントリカバリの再アクティブ化
  - コンソールパスワード、アクセスキー、署名証明書、および MFA デバイスの削除
  - S3 バケットポリシーのロック解除
  - SQS キューポリシーのロック解除

何が嬉しいかや実際に試している様子はクラメソさんの記事がわかりやすいです。

- [待望！管理アカウントでメンバーアカウントのルートユーザ操作禁止などが設定できる Root access management がリリースされました！　| DevelopersIO](https://dev.classmethod.jp/articles/root-access-management/)

メンバーアカウントのルートユーザ管理をしなくてよくなる（MFA も）＆メンバーアカウント作成が楽になるのが個人的にとても嬉しいです。検証したいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS Organizations の新しいタイプの認可ポリシーであるリソースコントロールポリシー (RCP) のご紹介 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/introducing-resource-control-policies-rcps-a-new-authorization-policy/

AWS Organizations において、新たに Resource Control Policies (RCP) というポリシーが追加されました。
すでにある Service Control Policies (SCP) が IAM ロールに対するアクセス許可を制限できたのに対して、RCP はリソースに対するアクセス許可を制限できます。

SCP と RCP の違いや、何が嬉しいかはこれまたクラメソさんの記事を見るとわかりやすいです。いつもありがとうございます。

- [Organizationsでの新たなる統制、Resource Control Policies (RCPs)がリリースされました！ | DevelopersIO](https://dev.classmethod.jp/articles/organizations-resource-control-policies-rcps/)

> 組織外のアカウントからのアクセスを網羅的に禁止することはSCPだけでは難しかったので、厳しい制約を設けたい環境ではかなり重要な機能になるのかと感じます

組織外からのリソースアクセスを制限できるようになるのは良いですね。
ガバナンスを強めていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Enhancing VPC Security with Amazon VPC Block Public Access | Networking & Content Delivery
https://aws.amazon.com/jp/blogs/networking-and-content-delivery/vpc-block-public-access/

Amazon VPC において、VPC に対するパブリックアクセスをブロックする Block Public Access  (BPA) 機能が追加されました。

BPA は VPC とインターネット間の通信を制御するための機能で、これまで Security Group などでリソースごとに制御していたインターネット通信を VPC レベルで一括管理できるようになります。

正直自分はまだ検証ができておらず、ちゃんと機能を理解できているか怪しいのでここでは深く語りません。
すでに様々な方々が解説記事や検証記事を出してくれており、ググればたくさん出てきます。AWS ブログ、ドキュメントに加えてそれらも参考にするのが良いです。

なお、次の記事の「これまでのネットワークアクセス制御との違い」節がこれまでの制御方法との比較があって嬉しかったです。

- [［構成図で見る］VPC Block Public Access を利用したセキュアな構成 #AWS - Qiita](https://qiita.com/j2-yano/items/5963c6ac5d46f6cb2bbc)

なお、今回の機能により、リソースからインターネットに対する通信をしたいがために public subnet & private subnet & NAT Gateway を使うというよくある構成を不要にできるのでは？という話で会が盛り上がったのですが、どうやら BPA を使っても外向きの通信に NAT Gateway（もしくは IPv6 のみ利用可能な Egress-only Internet Gateway）は必要のようなので、上記構成は変わらなさそうでした。

> When ingress-only block is enabled or egress-only exclusions are permitted, only NAT Gateways and EIGWs allow egress from a VPC.

予期せぬパブリックアクセスを防ぐためにもちゃんと検証してなるべく使ってみたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Terraform Monorepo の CI の実行時間を可視化し 2 分以上高速化 - freee Developers Hub
https://developers.freee.co.jp/entry/2024/11/19/100000

改善の準備として OKR や SLI/SLO の設定と CI 実行時間の可視化に取り組み、それを元に CI を爆速にした話です。CI の可視化するツールはいくつかありますが、今回は step 単位でも実行時間を見るために [CIAnalyzer](https://github.com/Kesin11/CIAnalyzer) が採用されています。実行時間を可視化した結果、リポジトリの checkout に多くの時間がかかっていると判明したため、この点を中心に改善されたとのことです。改善の具体例としては、リポジトリにコミットされている zip ファイルの削除や、[sparse checkout](https://git-scm.com/docs/git-sparse-checkout) を実施されたとのことです。

いつもの suzuki-shunsuke さんです。改善の成果もさることながら、個人的には改善の準備として OKR や SLI/SLO がしっかり設定されている点が参考になると感じました。ゴールが定まっていないと無限に改善できてしまうのでゴールの設定は大事だと考えているのですが、定量的なゴールの設定を僕は疎かにしがちなので身の引き締まる思いです。記事中でも言及されていますが、定量的なゴールの設定が誤っている場合は修正すればいいだけなので、間違いを恐れずに前のめりに数字を追っていきたいです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## TSKaigi Kansai 2024 - 構造的部分型と serialize 境界 - Speaker Deck
https://speakerdeck.com/takonda/structural-subtyping-and-serialize

構造的部分型の影響で関数の引数に期待しない型の値が渡ってくる問題とその対策方法の紹介スライドです。TypeScript の部分型付けは構造的なので、次のように引数として部分型の値も与えられます:

```ts
type SearchCriteria = {
  keyword: string;
  area: string;
};

function toUri(criteria: SearchCriteria) {
  const qs = new URLSearchParams(criteria);
  return `/search?${qs}`;
}

toUri({keyword: 'Session-IPA', area: 'kyoto'});                           // `/search?keyword=Session-IPA&area=kyoto` ← 期待するアウトプット
toUri({keyword: 'Session-IPA', area: 'kyoto', secret: 'TSKaigi-Kansai'}); // `/search?keyword=Session-IPA&area=kyoto&secret=TSKaigi-Kansai` ← 意図せずシークレットが！！
```

構造的部分型が便利な場面も多々あるのですが、上記の例のように逆に都合が悪い場面もあります。この解決策として以下が紹介されています:

1. バリデーションする。（バリデーション忘れがしんどいのであまりよくないとのこと。）
2. プライベートなフィールドを持つクラスを利用する。
   - クラスの実体はただのオブジェクトなので `class Foo {x: int; ...}` と `class Bar {x: int; ...}` は相互に互換するが、`class Foo_ {#x: int; ...}` と `class Bar_ {#x: int; ...}` はそうではない。
3. タグをつける。（つまり、単一フィールドのバリアントをエミュレートする。）
   - こういうの → `type Name = string & { _tag: "name" }`

タグ付けでこの問題を回避するのは結構知られていると思いますが、プライベートなフィールドを用いる方法は言われてみれば確かになぁと発見でした。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# tool 🔨

## 生成AIによるプログラミング支援のCodeium、VSCodeフォークの「Windsurf」エディタ発表。変数名を1カ所変更して残りの修正を生成AIが行うなど高度な開発支援を提供へ － Publickey
https://www.publickey1.jp/blog/24/aicodeiumvscodewindsurf1ai.html

生成 AI を搭載したエディタ [Windsurf](https://codeium.com/windsurf) の紹介記事です。ある機能の追加を自然言語で生成 AI に指示すると、実装のために必要なパッケージをインストールし、複数ファイルをまたがる実装まで可能な場合もあるとのことです。Windsurf の公式 Web ページから引用する次の動画も理解の参考になります:

https://youtu.be/3xk2qG2QPdU

参考記事でも言及されていますが、[VSCode の Copilot Edits](https://code.visualstudio.com/docs/copilot/copilot-edits) と似ているなと感じました。エディタ界隈でも生成 AI バトルが激化してきていて、今後の動向に目が離せないですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Build Copilot Extensions faster with skillsets - GitHub Changelog](https://github.blog/changelog/2024-11-19-build-copilot-extensions-faster-with-skillsets/)
    - GitHub Copilot Extensions を比較的容易に作れる機能 Skillsets for Copilot Extensions が登場しました
    - これまでの Copilot Extensions はリクエスト、追加情報の取得などユーザーコードの実行、レスポンスまで全てを Agent という形で用意する必要がありました。Skillset は Agent の中でもユーザーコード実行の部分のみを用意すればよいようになっており、より簡単に Copilot Extensions を作れるようになりました
    - Skillset と Agent の違いは本文とドキュメントを読んでください
    - 僕はまだこれらを使える環境ではないため、検証できていません 😭
- **know-how 🎓**
  - [OpenAIのプロンプトジェネレーターで至高のプロンプトを生成する - Taste of Tech Topics](https://acro-engineer.hatenablog.com/entry/2024/11/18/120000)
    - OpenAI において、LLM に渡すプロンプトを生成するツールが追加されたようです
    - 人間が一から頑張ってプロンプトを作るのではなく、一旦プロンプトを作らせてそれを修正する感じで使えそうですね
    - [Prompt generation - OpenAI API](https://platform.openai.com/docs/guides/prompt-generation)

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき

https://x.com/minamijoyo/status/1859421930832658792

思わず笑っちゃった。わかる。


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
