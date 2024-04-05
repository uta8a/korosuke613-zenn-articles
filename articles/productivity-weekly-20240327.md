---
title: AWSのSavings Planが期間限定で返金できるようになど｜Productivity Weekly(2024-03-27)
emoji: 🇰🇷
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240327
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-04-08 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-03-27 単独号です。

今回が第 147 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## AWS announces a 7-day window to return Savings Plans
https://aws.amazon.com/jp/about-aws/whats-new/2024/03/aws-7-day-window-return-savings-plans/

AWS の Saving Plans について、購入 7 日以内であれば返品できるようになりました。

丁度プライベートのプロジェクトで長期間動かし続けるコンピューティングワークフローがあるので、Saving Plan を買ってみて返品の流れだけ見てみようと思います。

![Saving Plan 購入の際のカート](/images/productivity-weekly-20240327/saving_plan_cart_20240327.png)

詳細画面で購入した Saving Plan を確認できます。

![購入した Saving Plan の詳細画面](/images/productivity-weekly-20240327/saving_plan_describe_20240327.png)

この画面の中に「Return Saving Plan」があり、これを押すと返品を進められます。

![Saving Plan の返品画面](/images/productivity-weekly-20240327/return_saving_plan_20240327.png)

以前は Saving Plans の購入は取り消すことができず、非常に慎重に購入をする必要がありました。
しかしこれからはちょっとだけ肩の力を抜いて購入できそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_


## GitHub Copilot General Availability in the CLI - The GitHub Blog
https://github.blog/changelog/2024-03-21-github-copilot-general-availability-in-the-cli/

GitHub Copilot in the CLI が GA になりました。Copilot in the CLI は、コマンドラインツールであり、Shell コマンドの提案や説明を Copilot にしてもらえる機能です。

GitHub CLI Extension での提供となります。初めて使う場合はインストールが必要です。なお、GitHub Copilot for Business、Enterprise ユーザの場合は、組織管理者が CLI 機能を有効化する必要があります。

僕はプライベートベータの頃[^sunset_copilot_npm]に使っていましたが、ちょっとコマンドについて気になった時にターミナルですぐに質問できて便利でした。提案されたコマンドの説明もしてくれるのは嬉しいですね。ただ、コマンドの内容はあくまで参考程度にして、自分で理解してから使うべきです。

気になる人は使ってみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^sunset_copilot_npm]: ちなみに、プライベートベータの頃は github-copilot-cli という npm パッケージでした。パブリックベータになるに当たって npm パッケージ版は使えなくなりました。

## EC2 Mac Dedicated Hosts now provide visibility into supported macOS versions
https://aws.amazon.com/jp/about-aws/whats-new/2024/03/ec2-mac-dedicated-hosts-visibility-supported-macos-versions/

macOS 専有ホストは長期間運用しているとファームウェアが古くなり、新しい macOS のバージョンを利用できないことがあります。
今回、そのホストがサポートしている最新の macOS のバージョンが分かるようになりました。嬉しい変更ですね。

macOS 専有ホストの詳細画面の「Latest supported macOS versions」で確認できます。

![macOS 専有ホストの詳細画面](/images/productivity-weekly-20240327/dedicated_mac_host_20240327.png)

なおサポートしている macOS のバージョンが古い場合は、インスタンスを停止または終了することで自動的にファームウェアが更新されるそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Fig is sunsetting, migrate to Amazon CodeWhisperer | Fig
https://fig.io/blog/post/fig-is-sunsetting

[去年 8 月に AWS に買収された Fig](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230830?redirected=1#fig-has-joined-aws!) ですが、Fig 自体はクローズされて Amazon CodeWhisperer for command line に移行することが発表されていました。

Amazon CodeWhisperer for command line はすでにリリースされており、Fig 上で移行の画面が出るようになっています。Fig 自体は 9/1 サービス終了予定です。

Fig にはコマンドラインの補完だけでなく、スニペットやドットファイルの共有機能などがありましたが、これらは CodeWhisperer for command line には引き継がれず、コア機能であるコマンドライン補完、自然言語から bash コマンドを提案する AI 機能のみが引き継がれるようです。

CodeWhisperer for command line は CodeWhisperer 利用のために必要な AWS Builder ID による認証が必要です。AWS アカウントとは別なので気軽に ID は作れますが、個人的には正直めんどうです。

なお、Fig はコード補完のデータを OSS としていました([withfig/autocomplete](https://github.com/withfig/autocomplete))[^contribution]が、今後もこのリポジトリの内容が参照されるかは正直よく分かってません。ただ、まだリポジトリが動いていることと、AWS のドキュメントに以下が書いていることから、希望はありそうです。

> To edit an existing spec or contribute your own, see https://fig.io/docs.
https://docs.aws.amazon.com/codewhisperer/latest/userguide/command-line-contribute.html

（AWS のドキュメント用意しろよとは思うけど。）

いやー買収されたことで安定した開発が望めるかなと思ってたのですが、Fig の名前が無くなるのはちょっと寂しいですね。Fig は収益化のためのクラウドサービスやスニペット機能など多機能を持っていましたが、個人的には使う必要性を感じていなかったので、機能が削減されたことに違和感はありませんでした。

とりあえず CodeWhisperer for command line は使っていきますが、まだまだ今後の展開が気になりますね。嫌な人はギリギリまでアップグレードしないようにしましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^contribution]: ちなみに僕もコントリビューションしたことがあります。https://github.com/withfig/autocomplete/pulls?q=is%3Apr+author%3Akorosuke613+is%3Aclosed

# know-how 🎓

## リリース戦略を支えるCI/CDパイプライン | ドクセル
https://www.docswell.com/s/katzumi/58G8J9-empowering-release-strategies-cicd-pipelines

リリース戦略としてリリーストレインを採用し、リリース作業に必要な git タグ作成などの作業を [Songmu/tagpr](https://github.com/Songmu/tagpr) で自動化された内容の発表です。

当日は「Demo」と書かれているスライドで、実際に tagpr を使って自動的にリリースされる様子をデモされていました。自分は当日にオフライン会場で実際に見てきたのですが、録画が公開されているので tagpr に興味がある方はぜひ見てみてください。

https://youtu.be/96KUNLiMe6w?si=mnvoPXqgRTJcanCC&t=4303

リポジトリ構成やブランチ戦略、使用している言語やツールなどの要件によってリリース作業の形も様々なので他社の事例をそっくりそのまま採用することは難しいですが、１つの事例として参考になると思います。自分は普段別のリリース自動化ツールを使っているので、tagpr の名前を聞いたことはあったものの実際に動いている様子を見たことはなかったのですが、デモで見させてもらって動作のイメージがつかめました。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## CI の DX とセキュリティ - Google スライド
https://docs.google.com/presentation/d/1rN4kTtvErrheZ3SXNr49XUHbiGIoorpfiLGXjLt5vsc

CI の Developer eXperience (DX) とセキュリティについての発表です。aqua や tfcmt などの開発者である suzuki-shunsuke さんによる発表です。

GitHub Actions を使う上での DX の tips やセキュリティベストプラクティスが多数書かれており参考になります。比重としてはセキュリティベストプラクティスが多いです。

個人的には「古い revision の workflow run のリトライを防ぐ」は考えたことがなかったのでなるほどと思いました。また、これらのプラクティスをチェックできるツール suzuki-shunsuke/ghalint も出しているようなので、すぐにチェックできていいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 業務で使えるかもしれない…！？GitHub Actions の Tips 集 / CI/CD Test Night #7 - Speaker Deck
https://speakerdeck.com/ponkio_o/cd-test-night-number-7

CI/CD Test Night #7 で発表された GitHub Actions の Tips 集です。現場で使える Tips が多く含まれています。個人的には次の 2 点がすぐに使えてかつ勉強になりました。

- Matrix の input に JSON が使える
  - 動的に matrix を生成する際に便利
  - 文字列として値を持っていても `fromJSON` で JSON をパースするだけなので簡単
- ステータスチェック用の Job を用意して Branch Protection を回避する
  - `jobs.<job_id>.if` でスキップされた場合は Job は成功したとみなされる仕様を利用

この他にも Permission 設定の話など、現場で GitHub Actions を使っている方ならではの Tips が多く含まれているので、必見です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Reduce, reuse, recycle: McDonald’s reusable workflows | by Global Technology | McDonald’s Technical Blog | Feb, 2024 | Medium
https://medium.com/mcdonalds-technical-blog/reduce-recycle-reuse-03a57554ee6a

世界中で使われるマクドナルドのアプリケーションを構成するマイクロサービスがどのような CI/CD パイプラインを持っているのかを紹介しています。
それぞれのマイクロサービスは異なる言語やフレームワークで書かれているため、GitHub Actions の Reusable Workflows を使うことで、抽象化しています。
具体的な構成としては、CI/CD パイプラインを提供するリポジトリ (Platform Organization) に Reusable Workflows を定義し、開発用のリポジトリ (Product Organization) からはそれを参照する形で構築しています。それら、ジョブはコンテナで実行することで、実行中の外部ライブラリのダウンロードを避け、実行時間を短縮し、セキュリティを向上させています。

![ワークフロー図](/images/productivity-weekly-20240327/mcdonalds.png)*記事内の画像から引用*

さらに、Enterprise レベルでパイプライン数、リードタイム、成功率と失敗率などの項目をモニタリングし、改善点やボトルネックを特定する可視化ツールを作成し、パイプラインの改善に活用しています。

開発用 Organization と Platform Organization でリポジトリを分けるというアプローチは、マクドナルドのような大規模、大人数ならではという感じで面白いですね。
モニタリングツールを公開して欲しすぎる…！

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Actions Runner Controller Deep Dive - Speaker Deck
https://speakerdeck.com/jnytnai0613/actions-runner-controller-deep-dive

GitHub Actions のセルフホストランナーを k8s で運用するための [actions/actions-runner-controller](https://github.com/actions/actions-runner-controller)（ARC）の内部挙動を解説したディープな発表です。

登壇された [@jnytnai0530](https://twitter.com/jnytnai0530) は過去に ARC を解説した４本のブログ記事を書かれており、今回の発表は ARC の挙動の中でもコアな部分に絞ってまとめた内容でした。

- [Actions Runner Controller Deep Dive！- 動作解説編](https://techblog.ap-com.co.jp/entry/2023/09/06/121449)
- [Actions Runner Controller Deep Dive！- アーキテクチャ編](https://techblog.ap-com.co.jp/entry/2023/09/01/182021)
- [Actions Runner Controller Deep Dive！- コード解説 前編](https://techblog.ap-com.co.jp/entry/2023/09/19/110656)
- [Actions Runner Controller Deep Dive！- コード解説 後編](https://techblog.ap-com.co.jp/entry/2023/09/29/182024)

ARC はセルフホストランナーの中でも最新の機能[^scale_set]を利用しており、k8s の特長を活かしてオートスケーリングを実現しています。そのため、アーキテクチャを読み解くだけでも様々な前提知識が必要な印象です。自分は当日にオフライン会場で参加していたのですが、普段の業務がセルフホストランナーの運用業務ということもあって非常に興味深く聞いていました。

[^scale_set]: [セルフホストランナーのオートスケールを実現するために k8s などのインフラとGitHub自体が協調する新しい仕組み](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners-with-actions-runner-controller/about-actions-runner-controller) のようです。ちなみに 2024/04 現在、Scale set のための API は非公開となっているため利用しているのはおそらく ARC のみだと思われます。

生産性向上チームが運用しているセルフホストランナーは ARC とは[別のOSSを利用している](https://www.docswell.com/s/miyajan/ZW1XJX-large-scale-github-actions-self-hosted-runner-by-philips-terraform-module)のですが、いつか ARC に乗り換えるという可能性もあるので今後も注目しています。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## システムや開発プロセスは変更せずに開発チームの生産性を上げる5つの方法
https://note.com/hamchance/n/n3e31fc8e4679?sub_rt=share_pw

この記事では、仕事の進め方やチーム運営の面から生産性を向上させるための 5 つの方法を紹介しています。
具体的には、会議時間の削減し連続した作業時間を確保すること、メンバーの育成、トイルの削減、エディタなどの開発ツールの強化、人材の採用とオンボーディングの整備とあり、どれも共感する内容でした。

個人的には GitHub Copilot なしでは開発できないというくらい便利に使っているので、開発ツールの強化は非常に重要だと感じています。
最近では採用サイトの開発環境の項目に GitHub Copilot が使えるかどうかという項目があるのを見かけることもあります。生産性だけでなく採用的な意味でも快適な開発環境を整えることの重要さは増していると感じます。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## PATを使わずにGitHub Appを使ってGitHub ActionsでPrivate Repoを参照する話 - Google スライド
https://docs.google.com/presentation/d/10-HgSST2xR5H3xCwGLKCk_PBwq4zHcxD2393ifwOsiM/edit#slide=id.p

GitHub Actions において、Personal Access Token (PAT) を使わずに GitHub Apps を使って Private Repository にアクセスする方法を紹介しているスライドです。

なぜ PAT を使いたくないのかや、PAT・GitHub Apps の説明、実現方法などが載っています。GitHub Apps を作ったことのない人向けにもとても丁寧に方法が紹介されていて良いです。

PAT を多く使っている人はこれを機に脱 PAT して GitHub Apps を使ってみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# tool 🔨

## GitHub ActionsでファイルをS3にキャッシュするアクションを作りました - プログラムモグモグ
https://itchyny.hatenablog.com/entry/2024/03/22/090000

GitHub Actions のキャッシュ機能の制限についての解説と、それを突破するために作成された [itchyny/s3-cache-action](https://github.com/itchyny/s3-cache-action) についての解説記事です。

一般的には `actions/cache` を利用していて意識することはほぼないのですが、実はリポジトリごとにキャッシュサイズの合計は 10GB までや、ブランチをまたいだキャッシュの共有には条件があるなど、[細かい部分でいくつかの制約](https://docs.github.com/ja/actions/using-workflows/caching-dependencies-to-speed-up-workflows)が存在します。大規模なリポジトリで多人数で開発しているような現場ではこれらの制約がネックとなりキャッシュを十分に活かすことができないこともあるため、キャッシュの保存先に S3 を利用した上でチームの要件に合うように `actions/cache` の制約を回避したり踏襲した独自の action を作成した経緯が紹介されています。

社内のプロダクト開発チームでは早速導入されており、monorepo に含まれる複数の package-lock.json ごとの npm パッケージのキャッシュや、ビルドアーティファクトのキャッシュなどに活用することで CI の時間が改善されていました。大規模なリポジトリかつ AWS を利用していて GitHub Actions のキャッシュにお悩みの場合はぜひ検討してみてください。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## JSON をプレビューしながら jq のフィルタを書くことができる「jnv」を試してみる
https://zenn.dev/kou_pg_0131/articles/jnv-introduction

jq はもはや JSON をクエリできるデファクトスタンダードで、GitHub Actions のランナーイメージにデフォルトでインストールされていることから世界的に多くの方が使用していると言えると思っています。
https://github.com/actions/runner-images/blob/df41637c07f1752efadfa844f2951744affb3e32/images/ubuntu/Ubuntu2204-Readme.md?plain=1#L85

ただ jq のフィルタの構文は少々独特で、試しに書いて出力してを繰り返し、理想のフィルタを作ることがほとんどです。
このサイクルを素早くできるツールが、この jnv だと思います。試しに使ってみました。

```bash
curl https://dummyjson.com/users | jnv
```

するとインタラクティブな UI が開き、フィルタを変更するたびにその結果を確認できます。
タブキーでの補完機能もあるようですが、`.users[].f` まで打ってからタブキーを押しても `.users[].firstName` を補完まではしてくれませんでした。配列内の子までは対応していないようです。

フィルタを書く際に非常に重宝するので、今後も使っていきたいと思います。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Enablement trends for security products (public beta) - The GitHub Blog](https://github.blog/changelog/2024-03-19-enablement-trends-for-security-products-public-beta/)
    - GitHub において、Dependabot alerts や Code scanning などの GitHub のセキュリティ機能がどれだけ有効化されているかを傾向として見られる機能が追加されました(パブリックベータ・GHEC のみ)
  - [Security overview dashboard: Alert age trends, custom repository and severity filters, and date pickers - The GitHub Blog](https://github.blog/changelog/2024-03-20-security-overview-dashboard-alert-age-trends-custom-repository-and-severity-filters-and-date-pickers/)
    - GitHub Organizations のセキュリティ Overview にいくつかの新機能が入りました(パブリックベータ・GHEC のみ)
      - セキュリティアラートの経過時間の傾向がわかるように
      - custom repository property や重要度でフィルタリングできるように

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
最近韓国に行ったんすけど、めちゃ楽しかったです。外国行ったらご飯が舌に合わないことは珍しくないのですが、韓国料理はどれも美味しくてとても良かったです。また行きたいねぇ。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
