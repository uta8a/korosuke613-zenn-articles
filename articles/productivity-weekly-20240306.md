---
title: CI/CDノウハウやAWSコスト削減など｜Productivity Weekly(2024-03-06)
emoji: 🍚
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240306
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-03-06 単独号です。

今回が第 145 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## VSCodeで日本語の音声入力が可能に、Copilotがコードに合った変数名を提案など新機能。2024年2月のアップデート － Publickey
https://www.publickey1.jp/blog/24/vscodecopilot20242.html

VSCode の 2024 年 2 月のアップデートについての記事です。

目玉機能は、日本語の音声入力が可能になったことでしょうか。 VS Code Speech という拡張機能をインストールすることで音声入力ができ、`voice: Speech Language` という設定で入力言語を変更できるようです。
試しに使ってみましたが、音声入力の精度は悪くなく、日本語の入力も問題なくできました。

その他、細かい機能追加が行われています。
気付いたら Sticky Scroll できるようになっていましたが、アップデートによりデフォルトで有効になっていたようです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Enterprise READMEs - The GitHub Blog
https://github.blog/changelog/2024-02-28-enterprise-readmes/

Organization の README と同じように、Enterprise にも README が追加されたようです。GitHub.com では既に使うことができ、 GitHub Enterprise Server では v3.13 から使えるようになる予定です。
[ドキュメント](https://docs.github.com/en/enterprise-cloud@latest/admin/managing-your-enterprise-account/creating-a-readme-for-an-enterprise)によると、メンバーが Enterprise 内の Organization について学んだり、重要なリソースへのリンクを共有したり、Enterprise の設定やポリシーに関する情報を伝えることなどを用途例としてあげています。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 2025年2月28日に東京リージョンのアベイラビリティゾーン「apne1-az3」が廃止されます | DevelopersIO
https://dev.classmethod.jp/articles/20250228-tokyo-region-apne1-az3-decommissioned/

AWS の東京リージョンの AZ のうち、apne1-az3 が廃止されるそうです。
AWS の東京リージョンの AZ と言えば、リージョンコードの ap-northeast-1a, ap-northeast-1c, ap-northeast-1d が馴染み深いですが、実態としては apne1-az1, apne1-az2, apne1-az4 という ID の AZ がそれぞれにランダムで割り当たっています。
AWS アカウントごとにこの割り当ては異なるため、ap-northeast-1a と言ってもアカウントによってはそれが apne1-az1 だったり、apne1-az2 だったりするわけです。

ログインしている AWS アカウントでのこの割り当て一覧は、EC2 や Resource Access Manager のダッシュボードで確認できます。

![プライベートで使用している AWS アカウントの AZ の割り当て](/images/productivity-weekly-20240306/az_zone_code_and_id_20240306.png)

今回、ゾーン ID が apne1-az3 のものが廃止されるということですが、確認したところ 2016 年から運用している私個人の AWS アカウントでも apne1-az3 は割り当てに出てこず、廃止の通知も飛んできませんでした（なんだかちょっと悔しい）。
もっと前に作ったアカウントのユーザーだと apne1-az3 が有効なユーザーがいるかもしれません。対象のアカウントをお持ちの方は、記事中の手順に従って apne1-az3 から他のゾーンにリソースを移動させましょう。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## 先日リリースされたGitHub Copilot Enterprise の最速レビュー！〜進化したGitHub Copilotを使ってみた〜 | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/46542/

サイバーエージェントさんによる、GitHub Copilot Enterprise のレビュー記事です。[先日 GA となった](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240228#github-copilot-enterprise-is-now-generally-available---the-github-blog) GitHub Copilot Enterprise ですが、早くも事例を出していただきありがたいですね。

記事では、Copilot Enterprise の各機能についての説明と、実際の使用例が載っています。機能としてあるのはなんとなくわかっていても、実際の画面と実例を知れるのが嬉しいですね。

個人的には、特に Copilot Knowledge base をどういう風に使えるのかが気になってました。任意のリポジトリを読み込ませて質問や相談ができるのはやっぱり便利そうですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWSが教えてくれないコスト削減の小話いろいろ | 外道父の匠
https://blog.father.gedow.net/2024/03/01/cost-saving-short-story/

同ブログで昨年に公開された [AWSコスト削減とリソース管理](https://blog.father.gedow.net/2023/08/24/aws-cost-saving/) という記事の続編のようです。

前回に紹介しきれなかった細かいコスト削減施策が紹介されていて、目次から見える凝ったタイトルの時点でもう面白いのですが、そこよりも冒頭で説明されているコスト削減へのマインドの話が個人的には印象的でした。

> 片っ端から存在するアカウントの状況を見ていくと、そう珍しくもなく『何やこの残骸は！』なリソースに出会うことがあります。
> そういう時は『なっちょらん！ムキーッ！』って気持ちも多少は湧いてくるわけですが、そこをグッと抑えて『お宝発見！コスト削減王に！おれはなるっ！！』って勢いで突き進むとよいでしょう。

発見した無駄遣いリソースも実際に削除する前には関係者に削除して問題ないか確認する必要がありますが、心の持ち方次第でコミュニケーションの柔らかさは変わってくると思います。お宝発見！という気持ちで取り組んでいきたいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 【DeNATechCon2024】CI/CD の課題解消！ GitHub Actions への移行で可能になったこと | ドクセル
https://www.docswell.com/s/DeNA_Tech/Z8GPLQ-2024-02-29-092047

DeNA TechCon 2024 での [CI/CD の課題解消！ GitHub Actions への移行で可能になったこと](https://techcon2024.dena.dev/session/session17/) というセッションのスライドで、当日の発表の動画も公開されています。

CI/CD に Jenkins と CircleCI を利用していたチームが今まで抱えていた課題と、GitHub Actions に移行したことでどのように解消されたのかについて紹介されていました。カンファレンスで発表されていた当日の Ask the Speaker の内容の書き起こしが付録の FAQ としてスライド末尾に追加されているのですが、個人的にはこちらの内容が面白かったです。

Jenkins プラグインのアップデートに比べて GitHub Actions だと本当に簡単なのかや、CircleCI からの移行が本当に簡単だったのかなど突っ込んだ質問に対しての回答が書かれているのでぜひ見てみてください。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## RailsのCIのテスト実行時間を 10分から5分に高速化した話 - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/03/04/100000

GitHub Actions 上で実行しているテストの実行時間を短縮するために行ったことを紹介しています。

具体的な施策として、テスト実行の並列数を上げ、テストの実行時間を短縮したそうです。
並列数を上げるとその分、利用するランナーの台数が増えるのでコストがかかるのではないかという懸念があります。
しかし、GitHub Actions のランナー利用料金は OS の種別、マシンスペック、利用時間で決まるため、同一の OS、スペックであれば並列数を上げてジョブを早く終わらせれば大幅なコスト増加はないとのことです。

また、テストファイルのサイズが大きいほどテスト実行時間が長くなるという仮定をして、ファイルサイズによってテストを分割し、テストの実行時間を均すことで、テスト全体の実行時間を短縮したそうです。
ファイルサイズによるテスト分割は簡単に実装できていいなと思いました。
CircleCI には[実行時間に基づいたテスト分割機能](https://circleci.com/docs/use-the-circleci-cli-to-split-tests/#split-by-timing-data)がありましたが、GitHub Actions にも欲しいですね。
調べるといくつか 3rd Party アクションは見つけられましたが、公式で提供されると嬉しいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## gitでstashが面倒なあなたにautostash
https://zenn.dev/moozaru/articles/5e158b28785f71

git で rebase する際に編集中のファイルがあると自動で stash してくれる便利オプションの紹介です。

git の設定は膨大[^git-config]なので、昔から存在するコマンドや最近追加されたコマンドを問わずこういった便利な設定を紹介してくれる記事が定期的に流れてくるのはありがたいですね。

[^git-config]: 全ての config を見てみたい方は `man git-config` を実行すると全てを見ることができます。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## #2 GitHub Copilot Enterprise&GitHub Actionsナレッジ
https://github-dockyard.connpass.com/event/311444/

GitHub のユーザコミュニティイベント、GitHub dockyard の第 2 回目が開催されます。
今回のテーマは GitHub Copilot Enterprise と GitHub Actions についてらしいです。

- 日時: 2024/03/23(土) 14:00 ～ 17:00
- 場所: オンライン or メルカリさんのオフィス
- セッション
  - GitHub Copilot Enterprise で開発を次のレベルへ
  - PAT を使わずに GitHub App を使って GitHub Actions で Private Repo を参照する話
  - Actions Runner Controller Deep Dive

個人的に一番気になっているのが、Productivity Weekly でもたびたび登場している [Actions Runner Controller Deep Dive](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230913#actions-runner-controller-deep-dive%EF%BC%81---apc-%E6%8A%80%E8%A1%93%E3%83%96%E3%83%AD%E3%82%B0) の方の発表です。
ARC のコードリーディングをしてさらに解説記事まで出してくれている方の発表なので、新しい ARC に興味がある僕としてはぜひお話を聞いてみたいです。

楽しみですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Push protection is enabled for free users on GitHub - The GitHub Blog](https://github.blog/changelog/2024-02-29-push-protection-is-enabled-for-free-users-on-github/)
    - [去年、GitHub のパブリックリポジトリにおいて　push protection による保護を有効化できるようになりました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816#enhanced-push-protection-features-for-developers-and-organizations---the-github-blog)。
    - 今後はデフォルトで有効化されるようになります
    - オプトアウトも可能ですが、無効化する理由もそうないと思うので、恩恵に預かりましょう

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
今週号でした。だんだんあったかくなってきましたね。春の訪れ。

**宣伝です。4/9（火）に大阪で Engineering Productivity Meetup #2 を開催します。**
開発生産性を向上させる知見や技術をネタに開発者と交流する会です。
みなさん参加待ってます。

https://cybozu.connpass.com/event/311067/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
