---
title: "Productivity Weekly (2023-09-20号)"
emoji: "🐟"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
published_at: 2023-10-03 10:00
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230920"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-20 単独号です。

今回が第 125 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## Introducing auto-triage rules for Dependabot - The GitHub Blog
https://github.blog/2023-09-14-introducing-auto-triage-rules-for-dependabot/

GitHub の Dependabot Alert において、脆弱性アラートの条件をコントロール可能にする機能 alert rules が追加されました（パブリックベータ）。

設定した条件に当てはまるアラートを常に出さないようにする、パッチが出るまで出さないようにすることが可能となっています。

条件に使える属性は、以下のとおりです。

- severity (例: `low`, `critical`)
- scope (例: `runtime`)
- package-name (例: `webpack`)
- cwe (例: `CWE-119`)
- ecosystem (例: `npm`)
- manifest (例: `subdir/package-lock.json`)

この機能は全てのパブリックリポジトリ、もしくは、GitHub Advanced Security を契約しているプライベートリポジトリで利用可能です。

適切なルール設定で人間によるトリアージの手間を減らすことが可能です。Dependabot Alert 利用者でトリアージが大変な人は使ってみると良さそうです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Increased Concurrency Limit for GitHub-Hosted Runners - The GitHub Blog 
https://github.blog/changelog/2023-09-18-increased-concurrency-limit-for-github-hosted-runners/

GitHub Actions の Larger runner (Linux or Windows) において、同時実行可能ジョブ数の上限が 1000 に引き上げられました。
以前は 250 が上限でした。

設定は Larger runner ごとに行えるようです。

そうとう大規模なリポジトリになってくると、250 でも足りない場合があると思うので、そういう組織にとっては嬉しい変更ですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Amazon EC2 now supports Block Public Access for Amazon Machine Images
https://aws.amazon.com/about-aws/whats-new/2023/09/amazon-ec2-block-public-access-machine-images/

AWS の AMI (Amazon Machine Images) において、AMI の公開をリージョン単位でブロックできるようになりました。
設定することで、AMI を作成する際、意図せずに公開してしまうのを未然に防ぐことが可能です。なお、すでに公開されている AMI については影響はないとのことです。

デフォルトでは無効なので、有効化する必要があります。

![](/images/productivity-weekly-20230927/block_public_ami.png =600x)
*どこで設定するのか[ドキュメント](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-intro.html#block-public-access-to-amis)を見ないと迷います*

特に AMI を頻繁に公開するアカウントでないのなら、有効化しておくのが良いと思います。嬉しい機能ですね（デフォルトで有効化してほしい）。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## New – Amazon EC2 M2 Pro Mac Instances Built on Apple Silicon M2 Pro Mac Mini Computers | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-amazon-ec2-m2-pro-mac-instances-built-on-apple-silicon-m2-pro-mac-mini-computers/
（日本語記事は[こちら](https://aws.amazon.com/jp/blogs/news/new-amazon-ec2-m2-pro-mac-instances-built-on-apple-silicon-m2-pro-mac-mini-computers/)）

Amazon EC2 に新たに M2 Pro Mac(`mac2-m2pro.metal`)インスタンスが提供されました。今までの EC2 Mac インスタンスよりもさらに高速な Mac マシンが欲しかった方には朗報ですね。

余談ですが、現在までにリリースされている EC2 Mac インスタンスの名前と CPU の対応は以下のようになっています。

- `mac1.metal` = Core i7
- `mac2.metal` = M1
- `mac2-m2pro.metal` = M2 Pro

`mac1.metal` が Intel 時代にリリースされ、さらにその後の Apple Silicon が M1, M2 という名前のためインスタンス名との対応が非常に紛らわしくなっています。利用する際には[インスタンス一覧のページ](https://aws.amazon.com/ec2/instance-types/)でインスタンス名と CPU の対応関係を確認することをおすすめします。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# know-how 🎓

## お財布に優しいCI改善小ネタ集 - メドピア開発者ブログ 
https://tech.medpeer.co.jp/entry/2023-kakari-ci-performance-tuning

各種ツールのキャッシュを活用したり、並列度などを調整することでコスト追加なしで CI 時間を半減させたテクニックを紹介されています。特に webpack, RuboCop, ESLint, Jest といった各種ツールのキャッシュを CI 環境で活用することで CI 時間を短縮している点が見どころです。

CI において依存パッケージをキャッシュするのは当たり前になりましたが、ビルドやテストのツールのキャッシュについてはあまり知られていない気がします。CI に限らずローカル開発でも高速化に役立つのでぜひ活用したいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Windows Subsystem for Linux（WSL）に新機能。使用メモリや仮想ディスクの自動縮退、LAN経由でWSLへ直接アクセス可能など － Publickey](https://www.publickey1.jp/blog/23/windows_subsystem_for_linuxwsllanwsl.html)
    - WSL 2.0 が登場しました
    - 使用メモリや仮想ディスクをいい感じに Windows へ返却したり、Windows のネットワークインターフェースを使うモードができたりと、色々良くなってそうです
    - WSL はだいぶ前に 2 となったでしょって思って混乱しました。多分 WSL2 が 2.0 になったってことなんでしょうね
    - 僕は 10 年前のポンコツ Windows ラップトップしか持ってなくて検証に使うには厳しいのが悲しいです
  - [Oracle Releases Java 21 and Extends Support Roadmap](https://www.oracle.com/apac/news/announcement/ocw-oracle-releases-java-21-2023-09-19/)
    - Oracle Java 21 がリリースされました
    - 仮想スレッド導入が会では盛り上がりましたね
    - あと `public static void main(String[] args)` の何も見ずに言えるような呪文が必須じゃなくなったりとか
    - 参考
      - [「Java 21」正式リリース。仮想スレッドが正式版に、入門者向けに「void main」と簡潔な記述、世代的ZGCなど新機能 － Publickey](https://www.publickey1.jp/blog/23/java_21void_mainzgc.html)
      - [Java 21の新機能をざっくりまとめてみた - Qiita](https://qiita.com/taichikanaya_1989/items/ec671ebbbb16f2315992)

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
遅くなってしまってすみません、今週号でした。
[Tweet ボタンを設置](https://korosuke613.dev/posts/20231001_put_tweet_button/)してたら遅くなりました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
