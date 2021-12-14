---
title: "Productivity Weekly (2021-12-08号)"
emoji: "👫"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211208"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 54 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Track CircleCI Updates - CircleCI
https://circleci.com/changelog/#docker-resource-utilization-graphs

CircleCI のジョブ画面に RESOURCES タブが追加され、[Docker Executor](https://circleci.com/docs/ja/2.0/configuration-reference/#docker-executor) の CPU、メモリをどれぐらい使ってるか確認できるようになりました。

可視化されるようになったことで、リソースクラスを適切に設定しやすくなりました。これは良い機能ですね。

![](/images/productivity-weekly-20211208/circleci-resource-visible.png)
*RESOURCES タブ*

また、[CircleCI の中の人による解説](https://qiita.com/mfunaki/items/cf7715113499e60c7127#%E5%8A%B9%E7%8E%87%E5%8C%96docker-resource-utilization-graphs)もあるのでそちらもご覧ください。

## Legacy Convenience Image Deprecation - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/legacy-convenience-image-deprecation/41034

CircleCI は便利な Docker イメージ（CirlcleCI 上で実行する際に必要なものが揃っている）を用意してくれています。circleci ネームスペースと cimg ネームスペースの二種類のネームスペースがあり、cimg ネームスペースのイメージが次世代コンビニエンスイメージとなります。

この circleci/* イメージのほとんどが今年中に EOL（サポート終了）となることが発表されていました。恥ずかしながら全く知りませんでした。上記ディスカッションでは、廃止に関する詳細と移行方法、廃止スケジュールなどが書かれています。

Clojure、MariaDB、MySQL、Redis、MongoDB 以外の全ての circleci/* イメージは 2021/12/31 でサポートが終了し、バグ修正やセキュリティ修正がされなくなるようです。ほとんどのイメージは circleci を cimg に書き換えるだけで移行できますが、いくつかのイメージはイメージ名が変更されたり仕様が変わっていたりするので、移行する際は注意が必要です。

古いイメージを使っている方はがんばって移行していきましょう。

こちらも、[CircleCI の中の人による解説](https://qiita.com/mfunaki/items/cf7715113499e60c7127#%E3%83%97%E3%83%A9%E3%83%83%E3%83%88%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E5%BE%93%E6%9D%A5%E3%81%AE%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%81%AE%E5%BB%83%E6%AD%A2)もあります。移行に関する記事の紹介もされてますね。そちらもご覧ください。

## 新しい Amazon EC2 M1 Mac インスタンスを使用して、iPhone、iPad、Mac、Apple Watch、および Apple TV 用のアプリケーションを構築およびテストする | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/use-amazon-ec2-m1-mac-instances-to-build-test-macos-ios-ipados-tvos-and-watchos-apps/

去年、Amazon EC2 で Mac インスタンスを使えるようになりましたが、M1 Mac インスタンスも使えるようになりました（プレビュー）。

現在利用できるリージョンは us-east-1 と us-west-2 です。課金は従来と変わらず、インスタンス実行時間ではなくホストの予約時間（最低 24 時間）に対して課金されます。試しに利用する場合は思わぬ金額にならないように覚悟してください。

利用にはプレビューへのサインアップが必要です。利用したい方は申請しましょう。

## Safeguard your containers with new container signing capability in GitHub Actions | The GitHub Blog
https://github.blog/2021-12-06-safeguard-container-signing-capability-actions/

GitHub Actions で [sigstore](https://www.sigstore.dev/)[^sigstore] を使って Docker イメージに署名する例です。sigstore を使って署名するには [sigstore/cosign](https://github.com/sigstore/cosign)を利用するのですが、これが OIDC に対応したため、簡単に署名できるようになりました。

これまでは秘密鍵を自前で管理する必要がありましたが、（[最近 GitHub Actions で OIDC が使えるようになった](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#github-actions%3A-secure-cloud-deployments-with-openid-connect-%7C-github-changelog)ため、）OIDC トークンを使えば秘密鍵を自前で管理しなくて良いとのことです。

例が [actions/starter-workflows](https://github.com/actions/starter-workflows/blob/432e3e3e741760610382c82fb0e909ff700496f7/ci/docker-publish.yml#L89) にあります。ただ、環境変数に `COSIGN_EXPERIMENTAL` が必要で、まだ experimental 感がありますね。

> Anything under the **`COSIGN_EXPERIMENTAL`** environment variable
> - Integration with the Rekor transparency log
> - Keyless signatures using the Fulcio CA
> 
> https://github.com/sigstore/cosign/blob/cfd981e8e61c79a8d292937cb893b59495f23076/README.md#anything-under-the-cosign_experimental-environment-variable

[^sigstore]: Linux Foundation が開発している無料の署名サービスらしい。

## GitHub Enterprise Server 3.3 is generally available | The GitHub Blog
https://github.blog/2021-12-07-github-enterprise-server-3-3-is-generally-available/

オンプレ版 GitHub こと GitHub Enterprise Server の version 3.3 が正式リリースされました。

GitHub Actions セルフホストランナー勢には嬉しい変更が多いです。ephemeral 対応や Webhook の workflow_job イベント対応がやってきたので、スケールしやすく安全なセルフホストランナーを構築できるようになります。さらに、composite action を使えるようになりました[^composite]。

他にもさまざまな変更があるので、詳細が気になる方は[リリースノート](https://docs.github.com/en/enterprise-server@3.3/admin/release-notes#3.3.0)をご覧ください。

[^composite]: むしろ今までセルフホストランナーだと使えなかったのか〜

## Enrolling all npm publishers in enhanced login verification and next steps for two-factor authentication enforcement | The GitHub Blog
https://github.blog/2021-12-07-enrolling-npm-publishers-enhanced-login-verification-two-factor-authentication-enforcement/

npm の認証をセキュアにしていくための今後の予定です。

以下の予定で進めていくとのことです。
- パッケージを公開したことのある 2FA（2 要素認証）が有効でないアカウントはワンタイムパスワードが必須となる（2021/12/7 〜 2022/1/4）
- 影響力の高いパッケージのメンテナが徐々に 2FA が必須となる（2022/2/1 〜）。

また、2FA のオプションを増やしていったり、複数端末の登録ができるようにしたりといった機能強化にも取り組んでるとのことです。

特に理由のない方はさっさと 2FA を有効にしてセキュリティを強化しましょう。

# know-how 🎓

## GitHub Actions workflow not triggering at scheduled time | Upptime
https://upptime.js.org/blog/2021/01/22/github-actions-schedule-not-working/

GitHub Actions のスケジュール実行がスケジュール通りにトリガーされない件についてまとめた記事です。

あるユーザが GitHub のサポートに問い合わせたところ、時間通りに実行される保証はなく、一時間以上遅れる場合もあるし、なんなら実行されない可能性もあることがわかりました。定期実行を保証したい場合は別システムから `workflow_dispatch` を叩いてトリガーするしかなさそうとのことです。

Actions のスケジュール実行が遅れてるのをよく見ますが、まさか実行されない可能性もあるとは思っていませんでした。覚えておきたいですね。

## Terraform を自動実行したいなら Atlantis - Qiita
https://qiita.com/chroju/items/f77e8391d6ef7c7cb59a

Terraform の自動実行環境を提供する OSS、Atlantis の紹介記事です。

Terraform の自動実行は任意の CI/CD サービスを使えば実現できますが、排他的にしたり plan 結果をプルリクエストに貼り付けたりと色々な細工をしていかないといけません。ワークフローのメンテナンスもしていかないといけません。Atlantis はそういった処理をデフォルトで行ってくれるため、自動実行環境の管理が楽になります（ただし、Atlantis は自前でホスティングする必要がある）。

この記事には、Atlantis の簡単な説明と、筆者にとって何が嬉しいか、何がつらいかなどが書かれています。これから自動実行していきたい人にも自動実行してるけど Atlantis のこと詳しくない人にもおすすめしたい記事です。僕も Atlantis のことよく知らなかったので勉強になりました。

## tfmigrate + Atlantis でTerraformリファクタリング機能をCI/CDに組み込む - Qiita
https://qiita.com/minamijoyo/items/36d89cab4cd9f26fc098

こちらも Atlantis に関する記事です。

この記事では、tfstate の操作を宣言的に管理できるツール tfmigrate を Atlantis に組み込み、Atlantis 実行時に tfmigrate も実行する方法が解説されています。ただ、tfmigrate、Atlantis の説明や Atlantis のサーバ構築、設定の話なども解説されており、tfmigrate や Atlantis を知らない人でも読める大ボリュームな内容となっています。

Terraform の自動実行をすると state 操作をどうするかが難しくなってくるので、Atlantis を使うなら tfmigrate も使いたくなると思います。上の記事と併せて読みたい内容となっています。

## GitHub Actions の OpenID Connect サポートについて
https://zenn.dev/miyajan/articles/github-actions-support-openid-connect

GitHub Actions の OIDC サポートについての調査内容を解説した記事です。OIDC の概要、AWS での設定例（Terraform の設定例も！）、認証を許可する設定の解説、その他諸々OIDC に関する色々が解説されています。

OIDC での認証やってみたいけどいまいちなんなのかよくわからんという人には必見です。

## M1 Mac で Docker を動かすための知識とノウハウ
https://zenn.dev/suzuki_hoge/books/2021-12-m1-docker-5ac3fe0b1c05de

M1 Mac で Docker を動かすための知識やノウハウを解説した記事です。M1 Mac、Docker の基礎知識、M1 Mac で Docker イメージを動かした際に遭遇するトラブル、それらへの対照方法などが載っています。M1 Mac でイメージを動かす際に確認するべきフローチャートもあります。

今まで x86_64 や amd64 でしか Docker を触ったことがなく、プラットフォームの違いによるトラブルに遭遇したことない人におすすめしたいです。

## GitHub上のsensitive dataを削除するための手順と道のり | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20211207-removing-sensitive-data-from-github/

メルカリの Codecov Bash Uploader[^codecov]による顧客情報漏えい事件[^mercari]の後片付けに関する記事です。リモートローカル問わず全ての Git リポジトリなどから顧客情報(sensitive data)を消し去る話です。全体の流れ、削除するべき sensitive data の特定、リポジトリからの削除、リポジトリの外（GitHub の PR など）にある sensitive data の削除などが載っています。

Git リポジトリから消し去っても、GitHub の PR から commit SHA が参照されているとその commit は GitHub 上に残ってしまうので、そこらへんの対処をするために GitHub のサポートチームと協力して対処していたり、全ての履歴から該当データを探す方法が説明されていたりと色々と勉強になる記事です。

同じ事態に遭遇したら（遭遇は極力避けたい）真っ先に思い出したい記事となっています。非常に大変だったでしょうね...

[^codecov]: この頃からサプライチェーン攻撃への対策事例が増えてきた気がする https://zenn.dev/korosuke613/articles/productivity-weekly-20210421#bash-uploader-security-update---codecov

[^mercari]: 顧客情報をソースコードに入れてたために汚染された bash スクリプトによってソースコード+顧客情報が流出した話 https://about.mercari.com/press/news/articles/20210521_incident_report/

## Productivity Weekly 記事 1 周年 🎉 〜続けてみてのアレコレ〜
https://zenn.dev/korosuke613/articles/productivity-weekly-1st-aniversary

Productivity Weekly の中の人が書いた、Productivity Weekly を 1 周年続けてみてどうだったかという記事です。~~ていうか僕が書いた記事です。~~技術記事を週刊で連載することで何が良かったか、何が微妙かなどが載っています。

毎週書くのは大変ですが、それなりのメリットはやはりあります。似たようなことをしたい人がいたら参考にしていただきたいです。

# History 📚

:::message
歴史系記事がいくつか出ていたので、生産性向上チームで話題になった記事をまとめました。
:::

## 歴史・年表でみるAWS
NRI ネットコムさんによる歴史・年表で見る AWS 記事です。全サービスと S3 に特化した 2 つの記事があります。アナウンス日や GA をほぼ全て調べ上げておりなかなか大変だったと思います。最近 AWS どういうサービスがあるんだ？って人や、最近 S3 のアップデート追えてないなって人におすすめです。

- [歴史・年表でみるAWS全サービス一覧 －アナウンス日、General Availability(GA)、AWSサービス概要のまとめ－ - NRIネットコム Design and Tech Blog](https://tech.nri-net.com/entry/aws_history_and_chronology_all)
- [歴史・年表でみる AWS サービス(Amazon S3 編) －単なるストレージではない機能・役割と料金の変遷－ - NRI ネットコム Design and Tech Blog](https://tech.nri-net.com/entry/aws_history_and_chronology_about_s3)


## 2021年のChangelogから振り返るCircleCI
CircleCI の中の人による、2021 の Changelog から振り返る CircleCI 記事です。CircleCI は 2021 年色々な変更がありましたがそれらを追えてないという方は少なくないのではないでしょうか？今年の変更がまとまって解説されているので、簡単に今年の変更を追っかけられます。そういった方におすすめしたい記事です。

- [2021年のChangelogから振り返るCircleCI - その1 - Qiita](https://qiita.com/mfunaki/items/b163708c9ac22d7456aa)
- [2021年のChangelogから振り返るCircleCI - その2 - Qiita](https://qiita.com/mfunaki/items/3def8eda2c4341fc7923)
- [2021年のChangelogから振り返るCircleCI - その3(最終回) - Qiita](https://qiita.com/mfunaki/items/cf7715113499e60c7127)

## GitHub Actionsの歴史
GitHub Actions の Changelog からこれまでどういった変更があったかをまとめた記事です。僕が書きました。Actions は実は GA からまだ 2 年半くらいしか経ってないのですが、すさまじい数の変更がありました。なかなか追っかけられていないという人にはおすすめです。4 半期毎にまとめています。

- [GitHub Actionsの歴史（2021/12/1 更新） - cangoxina](https://korosuke613.hatenablog.com/entry/history-of-github-actions)
- [GitHub Actions の Changelog リスト](https://zenn.dev/korosuke613/articles/github_actions_history_all_list)

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Codespaces can install dotfiles from any repo | GitHub Changelog](https://github.blog/changelog/2021-12-01-codespaces-can-install-dotfiles-from-any-repo/)
  - GitHub の Codespaces で別リポジトリの dotfiles を読み込めるようになりました
  - Codespaces は <アカウント名>/dotciles リポジトリの `setup.sh` みたいなファイルを自動で実行してくれるのですが、そのリポジトリを指定できるようになったという話です


# あとがき
今月はアドベントカレンダーが始まったので気になる記事がたくさん上がっていて読むのが大変ですね。毎日飽きません。おかげで今日のネタはめちゃ多くなりました。話は変わりますが最近マッチングアプリを使ってみました。マッチングはしても会話を続けるのがむずいですね。何話せばいいんだこれ。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### おうちKubernetes feat. cybozu-go/neco-apps - ぽよメモ
https://poyo.hatenablog.jp/entry/2021/12/07/083000

みんな大好きおうち kubernetes 事例です。

おうち Kubernetes と言えば Raspberry Pi で作るのを数多く見ますが、この記事はハードウェア選定から始まり Intel の小型 PC でクラスタを構築している珍しい記事です。さらに面白いのが、サイボウズが開発している [neco](https://github.com/cybozu-go/neco)（cybozu-go/neco-apps）を参考にデプロイするコンポーネントを決めているというところです。

この記事ではハードウェア選定、クラスタのブートストラップについて、各コンポーネントの説明、開発環境（VM）についてなどを解説しています。

みなさんもこの記事を参考に、おうち Kubernetes でサイボウズの neco を（ある程度再現したものを）運用しましょう！
