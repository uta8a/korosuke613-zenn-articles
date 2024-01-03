---
title: "GitHubの新しいリポジトリ一覧、Testcontainers紹介など：Productivity Weekly (2023-12-13号)"
emoji: "🐁"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231213"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-12-13 単独号です。

今回が第 136 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## New Organization Repositories List Feature Preview - The GitHub Blog
https://github.blog/changelog/2023-12-06-new-organization-repositories-list-feature-preview/

GitHub Organization において、新たなリポジトリ一覧を表示する機能がプレビューとしてリリースされました。

新たなリポジトリ一覧ページでは、フィルタリング機能が強化されていたり、使い勝手が良くなったりしています。

フィルタリング機能では、10 月にリリースされた [repository custom properties](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231018?redirected=1#github-repository-custom-properties-beta---the-github-blog) の値やリポジトリのストレージ使用量などでフィルタリングができるようになっており、従来のリポジトリ一覧と比べてリポジトリの絞り込みがしやすくなっています。

特に custom properties の可能性が広がったのが良いですね。これからはリポジトリの管理にも custom properties を活用していけそうです。

個人レベルでも custom properties、new repositories list が使えるようになってほしいです 😇

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## CSSで句読点括弧のカーニングができるようになるぞ！ 日本語が読みやすくなる最近サポートされた・近日サポートされるCSSの機能のまとめ | コリス
https://coliss.com/articles/build-websites/operation/css/css-4-features-for-i18n.html

CSS の話なので、生産性向上とかけ離れた話に見えるかもしれません。本記事を取り上げた理由は後述します。

生産性向上チームとして気になったのは「文字間のスペーシングに関するプロパティの追加」です。
特に日本語の文章はひらがな、カタカナ、漢字、英字、数字が混在するのが常で、英字、数字が混在する場合にスペースを入れた方が読みやすいというのがあります。
Google Chrome は今後、**デフォルトで** 英字、数字の前後にスペースを挿入することを計画しているようです。

※この挙動がデフォルトなのは、CSSWG によって定められているようで、Google Chrome の一存ではないことを添えておきます。
https://drafts.csswg.org/css-text-4/#text-autospace-property

2023 年 12 月現在はフラグを有効化しなければスペースは入りません。次のフラグを有効にするとスペースが入るようになります。
`chrome://flags/#enable-experimental-web-platform-features`

![](/images/productivity-weekly-20231213/compare_text_autospace.png)
*Wikipedia の Google のページを開いた図*

左がフラグを有効にしたウィンドウ、右がフラグを無効にしたウィンドウです。左の文章ではひらがな・カタカナ・漢字と英単語・数値の間にスペースが空いていることがわかります。

実は生産性向上チームメンバーの多くには日本語中の英単語・数値の左右に半角スペースを入れる習慣があります。
この Google Chrome の変更によって半角スペースを入れなくても良くなるかもしれない、ということで今後も半角スペースを入れ続けるかが問われています。

とはいえ、現状 Google Chrome だけで Firefox や Safari(WebKit) には来ていないですし、サービス提供者側次第では空白を入れない選択をとるかもしれないので、ますます空白を入れる入れないの溝が深まるだけかもしれません...
ちなみに私は半角スペースを入れる派です。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## RustでTestcontainers入門: テストコードから依存サービスを起動してテスト環境を作成する - kymmt
https://blog.kymmt.com/entry/testcontainers-rs

[Testcontainers](https://testcontainers.com/) というテストコードから依存するサービスのコンテナを立ち上げるのに便利なライブラリを Rust で使う方法の紹介記事です。

Rust で MySQL を利用するインテーグレーションテストを例に、Testcontainers を利用して MySQL のコンテナの立ち上げも Rust のテストコード内から行い、テスト終了時にコンテナも自動的に破棄される挙動を紹介されています。

自分は今まで Testcontainers 自体を知らなかったのですが、調べてみたら Rust 以外の[メジャーな言語にも対応](https://testcontainers.com/getting-started/#supported-languages-and-prerequisites)していますし、MySQL 以外にも[有名なサービスのコンテナはサポート](https://testcontainers.com/modules/)されていたり任意のコンテナを立ち上げることも可能なので結構幅広く使えそうだなという印象でした。

次号の Productivity Weekly を少し先取りしてしまいますが、Testcontainers 開発元の AtomicJar がつい先日 Docker 社に買収されたというニュースがありましたので Testcontainers は今後さらに発展するかもしれませんね。

https://www.docker.com/blog/docker-whale-comes-atomicjar-maker-of-testcontainers/

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## cache を最適化して RuboCop の CI 実行時間を劇的に改善した話 - JMDC TECH BLOG
https://techblog.jmdc.co.jp/entry/20231211

GitHub Actions 上で RuboCop を実行する際に cache を活用して実行時間を短縮する取り組みですが、cache が正しく使えなかった原因を 1 つ 1 つ調査して修正した過程を紹介されています。

最近、Productivity Weekly で CI 上での Lint やテストの実行時間を cache を活用して短縮された記事を紹介する機会が多かったのですが、逆に単にオプションを有効にするだけでは上手く動作しなかったケースの記事はあまり見かけないので面白かったです。

GitHub Actions での cache とブランチの仕様による制限の話から始まり、RuboCop のソースコードまで調べて cache が有効ではないと判定されてしまう理由を調査されていく過程が面白かったです。RuboCop をお使いで cache を利用しているはずなのに実行時間があまり改善できていないという場合は、原因を調査するのに参考になると思います。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## DevFest Tokyo 2023: Google Cloudでチームで安全にデプロイをする - Speaker Deck
https://speakerdeck.com/sakajunquality/devfest-tokyo-2023-introduction-to-cloud-deploy

Google Cloud で GKE や Cloud Run への CD を実現する Cloud Deploy の色々な機能や使い方を紹介されている発表資料です。

Cloud Deploy を利用して stg -> prod へのデプロイの流れを作成したり、承認ステップを追加するといったデプロイパイプラインの機能や、トラフィックを段階的に新しい環境に流すカナリアデプロイ機能など Cloud Deploy の様々な機能についてスライドで分かりやすく紹介されています。

Cloud Deploy は登場当初は GKE しか対応していなかったので利用する機会がなくて個人的にはあまり注目していなかったのですが、最近では Cloud Run でも使えるようになったので利用する機会が増えてくるかもしれない感じています。CI ではなくてデプロイなどの CD 方面の機能も GitHub Actions などで独自に作り込むことは可能ですが、ある程度複雑なデプロイフローを実現する必要がある場合は Cloud Deploy のような CD に特化したツールを使うのも良いかもしれませんね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS の組織移行をしました - freee Developers Hub
https://developers.freee.co.jp/entry/aws-multi-account-mng

freee さんが既存の AWS Organizations 下のアカウントを新しい Organizations に全て移行したとのことで、意思決定の過程や移行でやることが書かれています。

AWS でのクラウド基盤構築におけるケイパビリティやその依存関係については私はよく理解していなかったので、勉強になりました。
私もきちんと読み込んで、基盤整備をやっていきたいと強く思いました。
https://docs.aws.amazon.com/whitepapers/latest/establishing-your-cloud-foundation-on-aws/working-with-the-capabilities.html

また生産性向上チームでも IaC は主に Terraform を使っていますが、Access Control Tower の Terraform 管理について公式でドキュメントがあるのは知りませんでした...！
https://docs.aws.amazon.com/controltower/latest/userguide/aft-getting-started.html

移行がブロックされる原因として「管理アカウント上に多くのワークロードがある」はわかるなぁという感じです。
Organizations を閉じて、新しい Organizations のメンバーに入れるのが現実的なのも納得です。

生産性向上チームとして、今後の Organizations のあり方を考えているところ、ちょうどこの記事を見つけることができました。
参考にさせていていだきます🙏

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# あとがき

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

明けましておめでとうございます。本年もよろしくお願いします🎍
すみません今回も大変遅くなってしまいました。年末年始はバルダーズゲート 3 をひたすらやってました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

<!-- :::message すみません、今週もおまけはお休みです...:::-->

