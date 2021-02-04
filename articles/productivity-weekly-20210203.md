---
title: "Productivity Weekly (2021-02-03号)"
emoji: "👹"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 12 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## npm 7 is now generally available!
https://github.blog/2021-02-02-npm-7-is-now-generally-available/
npm v7 が Generally Available になりました。v7 では workspaces 機能や diff 出力機能が追加されたり、yarn.lock をサポートするようになったりしています。またいくつかの破壊的変更があります。

workspaces 機能は、複数パッケージを一つのリポジトリにまとめる場合(モノレポ)、管理を容易にする機能です。yarn にはすでに workspace 機能が搭載されていましたが、これで npm でもモノレポが作りやすくなったと考えます。
`npm diff`はパッケージ同士を比較し、差分を表示することができる新しいコマンドです。例えば、依存パッケージのバージョンをあげる際にどういう変更があったのかを手元で確認できるようになります[^1]。

[^1]: それまでは [npmfs](https://npmfs.com/) のようなサイトで差分を簡単に確認していたそうです。

https://blog.watilde.com/2020/10/14/npm-v7%e3%81%ae%e4%b8%bb%e3%81%aa%e5%a4%89%e6%9b%b4%e7%82%b9%e3%81%be%e3%81%a8%e3%82%81/
こちらの記事に変更点が良い感じにまとまっています。

https://dev.to/ruyadorno/npm-diff-23dh
また、diff 機能に関してはこちらの記事が詳しいです。

## テスト自動化プラットフォーム「Autify」待望のモバイルアプリ対応版を提供
https://autify.com/ja/news/release_autify-for-mobile-beta

テスト自動化プラットフォームである Autify が、モバイルアプリ対応版の提供を開始しました。
モバイルアプリのテストと言えば検証端末を用意する必要がありますが、そういった検証端末が不要であることや、従来の Autify の特徴である「ノーコードで自動化」や「アップデートによる差異をAIが検出して自動修復」といった機能をモバイルアプリにも利用できるということが嬉しいポイントだと考えます。

モバイルアプリとは書かれているが、結局ネイティブアプリではなく Web アプリを指しているのではないだろうかと考えたのですが、

> 「Autify for Mobile （β版）」は、Web版を導入いただいているお客様から寄せられる「モバイルネイティブアプリ対応版がほしい」というご要望にお応えすべく、全力で開発を進めてまいりました。

と書かれているため、モバイルの Web アプリではなく、モバイルのネイティブアプリをサポートしているようです。

## Google、ORMが生成するSQLが遅いときの調査を容易にする「sqlcommenter」をオープンソースで公開。Rails、Spring、Djangoなど主要なフレームワークに対応
https://www.publickey1.jp/blog/21/googleormsqlsqlcommenterrailsspringdjango.html

sqlcommenter というツールが OSS で公開されました。ORM が生成する SQL 文にコメントを追加することで性能検証の際などにどの SQL 文が性能低下につながってるかの調査を容易にすることができます。
ただ、対応している言語、フレームワーク、データベースが限られているため[^2]、リストにない言語やフレームワークを使っている場合は sqlcommenter は使えないでしょう。見方を変えると、コントリビューションチャンスかもしれません。

[^2]: それでも多くサポートしていますが... まあまあ人口が多そうな PHP はサポートしていないようです。

# know-how
## Keeping your GitHub Actions and workflows secure: Untrusted input - GitHub Security Lab
https://securitylab.github.com/research/github-actions-untrusted-input

GitHub Actions で、context として受け取れる issue 本文などのユーザーインプットを下手に扱うと発生する脆弱性についての記事です。
GitHub Actions 自体に脆弱性があるわけではなく、Action や Workflow の設定次第では脆弱となってしまうという話です。
特に expression syntax をスクリプトにそのまま埋め込む(e.g. `run: echo ${{ event.comment.body }}`)と、悪意のあるコードが実行される危険性があります。

記事では回避方法のベストプラクティスとして、環境変数に格納してから使う方法が推奨されています。

```yaml
- name: print title
  env:
    TITLE: ${{ github.event.issue.title }}
  run: echo "$TITLE"
```
*(上記コードは記事中より引用)*


## AWS Organizationsを活用したマルチアカウントのセキュリティサービス使用方法 ～まとめ～ - fu3ak1's tech days
https://fu3ak1.hatenablog.com/entry/2021/01/28/002536

マルチアカウント環境で、AWS アカウントの新規作成を行う際にセキュリティ周りの設定をなるべく一括で行うための手法を紹介した記事です。

一括設定の手法だけでなく、各サービスが「Organizations集約」「メンバーへの委任」「アカウント追加時自動有効」にそれぞれ対応しているかどうかが表になっておりわかりやすくまとまっています。設定方法のリンクも貼っており大変参考にできそうです。


## DevOps の能力  |  Google Cloud
https://cloud.google.com/solutions/devops/capabilities?hl=ja

ソフトウェアデリバリーと組織のパフォーマンスを改善するための指標一覧です。各指標の説明と、改善方法、測定方法についての説明が載っています。
ソフトウェアデリバリーと組織のパフォーマンスを改善したいときに参考になると思います。ただ全部読もうとすると非常に時間がかかりそうです。

## Apple M1のチップを解説します
https://youtu.be/JidLSX4F4ic
研究解析調査会社である株式会社テカナリエさんが Apple M1 チップを分析した結果をわかりやすく解説している動画です。
Apple M1 チップのチップ写真を用意し、どこにどういう CPU や GPU が乗っているかなどを解説しています。
パソコンのこと何もわからん人でもわかるようなわかりやすい説明をされているので、興味のある人万人におすすめできます。
動画説明欄に載っている[テカナリエレポート](http://techanalye.com/news/report/3309)を購読することでもっと詳しく知ることができます[^3]。

[^3]: 個人で読む場合は[年間3.8万円(バックナンバー含む。学生は2.6万円）](https://medium.com/%E5%88%86%E8%A7%A3%E3%81%AE%E3%82%B9%E3%82%B9%E3%83%A1/techanalye-983589cb499d)で可能のようです。

## Terraform の秘匿情報を mozilla/sops で管理する - the world as code
https://chroju.dev/blog/terraform_with_sops

Terraform で secrets を扱う場合、tf ファイルに平文で secrets を記述するわけにはいかないので、secrets を Terraform で管理するのは難しい印象があります。
この記事では、SOPS という暗号化ツールと terraform-provider-sops
 という Terraform プロバイダを利用して上記のような悩みを解決する方法を説明しています。

secrets を SOPS で暗号化し、terraform-provider-sops を使って tf ファイル内から参照することで tf ファイルに secrets を平文で書かずとも同リポジトリで secrets を管理できるようになります。復号には AWS KMS や GCP KMS を利用するようです。

自分も以前 AWS Secrets Manager のリソースを作るときに同じことで困り、結局 Secrets Manager のリソースのみ AWS コンソールで作成しました。この記事の方法を使うことで管理しやすくなりそうです。


## [レポート]Lambda並列実行でCI高速化 #reinvent #ZDC205
https://dev.classmethod.jp/articles/no-more-idling-creating-parallel-builds-using-serverless-ci/

AWS Lambda 使って CI を高速化したという re:Invent 2020 のセッションのレポート記事です。
ビルド時間の短縮、ジョブの並列実行を検証したのち、既存の CI サービスでは並列実行の限界を超えるために、Lambda を使ったサーバレスの CI システムを作り、CI を高速化したというお話のようです。

セッション動画と合わせてこの記事を読むことで理解度を深めやすいと思います。

# tool
## LeakCop
https://leakcop.info/
GitHub を監視して、公開されてはいけないコードが公開されたらユーザに通知するサービスが発表されました。コピーライトや特定のワードを登録するだけでモニタリングが可能とのことです。2021年3月サービス開始予定で、事前登録ができます。

自作しようと思えばそこまで難しくないような気もしますが、保守・運用のコストを考えるとこういった SaaS を利用するのも良いかもしれません。

# あとがき
今週は登場するネタが普段より多く、記事にする上で調べていくとまあまあ時間がかかってしまいました。

個人的には、npm v7 のモノレポサポートが地味に嬉しいです。JS/TS できれいなモノレポを作りたい場合 yarn を使う方が優れていたため、普段 npm を使っている自分にとっては頭の切り替えが面倒でした。
npm の workspaces 機能をまだ使えていないため yarn workspace と比べてどうかはまだわかりませんので使って確認したいと思います。

また、私事ですが、今度サイボウズの技術・開発文化に興味のある学生向けにお話しするので、これを読んでる学生の方で興味があったら、ぜひご参加いただけると幸いです。
https://twitter.com/Shitimi_613/status/1356928413513052161?s=20

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000