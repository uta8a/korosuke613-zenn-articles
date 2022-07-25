---
title: "Productivity Weekly (2022-07-13号)"
emoji: "🏴‍☠️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220713"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 82 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## The VS Code Server
https://code.visualstudio.com/blogs/2022/07/07/vscode-server

VSCode のバックエンドサービス（拡張機能、ターミナル、デバッグなど）VS Code Server と管理 CLI の code-server が公開されました（プライベートプレビュー）。

セットアップすることで Web 上から開発環境で開発でき、ローカルマシンの環境を整えなくともすぐに開発へ入れます。[GitHub Codespaces](https://zenn.dev/korosuke613/articles/productivity-weekly-20210818#github%E2%80%99s-engineering-team-has-moved-to-codespaces-%7C-the-github-blog) のオンプレ版に近いと思います。現在プライベートプレビューであるため、利用したい場合は waitlist へ登録する必要があります。

ローカルから接続するモードと、vscode.dev をトンネルして接続するモードの 2 種類があります。トンネル接続の場合、（認証の仕組みこそありますが）ネットワークに穴を開けることになるので会社での利用は慎重になった方が良さそうです。Remote SSH でもいいのでは？と思うかもしれませんが、[公式ドキュメントによると](https://code.visualstudio.com/docs/remote/vscode-server#_scenarios)、SSH が制限されている、VSCode のネイティブアプリが利用できない環境（iPad や Chromebook など）で開発したいといったニーズに対応できるようです。

[1 インスタンス 1 ユーザを想定されている](https://code.visualstudio.com/docs/remote/vscode-server#_is-the-vs-code-server-designed-for-multiple-users-to-access-the-same-remote-instance)ため、スペックの高い 1 台のインスタンスを用意して、みんなで開発というのは難しそうです。しかし、使いようによっては複数インスタンスに展開し、開発者が誰でもすぐに開発できる環境を用意することは可能かもしれません（その場合認証の仕組みがないと厳しそうだけど。トンネル接続モードの場合現状サーバ立ち上げ時に  github アカウントの紐付けが必要なため誰でも利用は厳しそう）。

既に触ってみた方達が記事を上げています。

- [自前サーバで Codespaces が使える Visual Studio Code Server を動かしてみた - Qiita](https://qiita.com/ku_suke/items/62f1ba1d21667438f2dc)
- [VS Code Serverの使い方](https://zenn.dev/kato_k/articles/6301d35b3d8d3c)

僕は発表日に waitlist へ登録したところ、3 日後くらいにインビテーションが飛んできました。
ちょっとだけ触ってみた感想としては、

- 拡張機能なども特に問題なく使える
- 上記 2 記事ではトンネル接続はまだ対応していないと書かれていたが、自分が触った際は既にトンネル接続できるようになっていた
- ローカル接続で起動し、リバースプロキシを経由し https で接続したところ、CORS によりエラーが出てきてブラウザでの起動ができなかった（関係してそうな [Issue](https://github.com/microsoft/vscode-remote-release/issues/6924)）
- 複数人開発について
  - トンネル接続の場合、GitHub アカウントなどで認証を行うため、同じサーバを複数人で触った際に誰がコマンドを実行したか判別できそう
  - ローカル接続の場合、認証の仕組みがまだなさそうなので、同じサーバを複数人で触った際に誰がコマンドを実行したか判別できなさそう
  - （再掲）[そもそも 1 インスタンス 1 ユーザを想定されている](https://code.visualstudio.com/docs/remote/vscode-server#_is-the-vs-code-server-designed-for-multiple-users-to-access-the-same-remote-instance)
    - > Is the VS Code Server designed for multiple users to access the same remote instance?
      > No, an instance of the server is designed to be accessed by a single user.
- 現在ブラウザからアクセスできますが、VSCode のネイティブアプリからのアクセスはまだできないっぽい？
  - [`Remote Server: Connect to Remote...` で接続できるっぽいことが書いてある](https://code.visualstudio.com/docs/remote/vscode-server#_extension-commands)が、そのような選択肢は現時点で表示されない

まだまだプレビュー段階なので不安定な部分があったり仕様が変わるかもしれないのでとりあえず触ってみる程度にしか使えませんが、正式リリースされたら面白いことができそうですね。

自宅の raspberrypi などで立ち上げてトンネル接続で iPad から開発するようなことは現時点でもできそうなので、私的な開発の場面では既に使えるかもしれません。楽しみですね。

## IAM Roles Anywhere で AWS IAM ロールを AWS 外部のワークロードに拡張する | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/extend-aws-iam-roles-to-workloads-outside-of-aws-with-iam-roles-anywhere/

AWS において、IAM ユーザの一時的なクレデンシャルを AWS 外のワークロードに付与する機能 IAM Roles Anywhere が公開されました。公開鍵認証基盤（PKI）の認証局（CA）を IAM Roles Anywhere に信頼できるルートとして登録することで、信頼された CA が発行した X.509 証明書を IAM Roles Anywhere に渡して一時的なクレデンシャルを得ることができます。

AWS のクレデンシャルを長期間保存する必要がなくなるため、クレデンシャルのローテーションの手間が省けたりクレデンシャル自体が万が一漏れてしまってもセッションが長く持たなかったりとセキュリティ的により安全だと言われています。

既に試している方が複数人いました（クラメソさんが相変わらず早い）。

- [AWS IAMロールAnywhereのPKI基盤にHashicorp Vaultを使う | DevelopersIO](https://dev.classmethod.jp/articles/hashicorp-vault-pki-for-iam-role-anywhere/)
- [【AWS IAM】AWS IAM Roles Anywhereを、自己署名のプライベートCA局で試してみる - Qiita](https://qiita.com/tmiki/items/18c384d134ead8f93c27)
- [AWS IAM Role AnywhereをDocker+OpenSSLのRootCAで試してみる - YOMON8.NET](https://yomon.hatenablog.com/entry/2022/07/aws_iam_role_anyware_openssl)
- [ADCS(Active Directory 証明書サービス)で自動発行したクライアント証明書でIAM Roles Anywhereを使ってみた | DevelopersIO](https://dev.classmethod.jp/articles/iam-roles-anywhere-with-adcs/)
- [OpenSSLで作った自己署名証明書でIAM Roles Anywhereを使ってみた | DevelopersIO](https://dev.classmethod.jp/articles/iam-roles-anywhere-with-a-self-signed-certificate-created-with-openssl/)

正直なところ PKI 自体は知識として知ってるのですが、実際に触ったことがないため上記記事を色々試してみました。一番簡単に試せたのは Vault を使った方法でした。本当に簡単。

:::message
セキュリティの専門家ではないので誤った認識や記述があるかもしれません。ご容赦ください...
:::

この機能について思ったことを書きます。

- AWS クレデンシャルこそ保管しなくてもいいけど、aws_signing_helper 利用時にプレーンテキストの秘密鍵が必要なので、秘密鍵を AWS クレデンシャルを発行するサーバに置く必要がある。結局のところ秘密鍵が漏れたら AWS クレデンシャルを発行し放題となってしまう
  - AWS クレデンシャルを保管するリスクとあまり変わらない？？
  - 一応証明書流出時は [CRL（証明書失効リスト）をインポート](https://docs.aws.amazon.com/ja_jp/rolesanywhere/latest/APIReference/API_ImportCrl.html)することで対処できる
- aws_signing_helper はオープンソースでないため内部的に何をやってるかわからない上、プレーンテキストの秘密鍵へのパスを渡さなければならない
  - おもしろいリポジトリを見つけた。[aidansteele/openrolesanywhere: Open-source proof-of-concept client for AWS IAM Roles Anywhere](https://github.com/aidansteele/openrolesanywhere)
    - ssh エージェントから秘密鍵を取得して aws_signing_helper のように一時的なクレデンシャルを取得する取り組み
      - 秘密鍵をプレーンテキストで保持する必要ない
    - 作者曰く概念実証
- 信頼アンカーごとに利用できるプロファイルを縛る方法がわからない
  - プロファイルに紐づいたロールの信頼ポリシーをいい感じにすることでできるのかも？やり方例が欲しい。
- AWS クレデンシャルを発行するマシンと AWS の API を叩くマシンが異なれば、API を叩くプログラムの脆弱性によって秘密鍵が流出する事態は起こらなさそう
  - 問題は AWS クレデンシャルをどうやって受け渡すか。そこを考えるのがめんどそう
  - 例えば AWS クレデンシャルを発行するマシンが docker コンテナ内で API を叩くようにすると、AWS クレデンシャルの受け渡しが楽かもしれない
    - [実際にやってみた](https://github.com/korosuke613/playground/blob/dbb1c4cfbc770f1ae208ed0bfd7027637bf75f4b/aws/iam_roles_anywhere_with_vault)。次のような感じでできる
      ```text:aws_config(aws_signing_helperで得られる認証情報のjsonを読み込むようにする設定)
      [default]
      credential_process = cat /aws_credentials.json
      ```

      ```sh:aws-cli.sh
      #!/usr/bin/env bash

      # 一時的な IAM のクレデンシャルを取得
      ./aws_signing_helper credential-process \
      --certificate $CERTIFICATE_FILE_PATH \
      --private-key $PRIVATE_KEY_FILE_PATH \
      --trust-anchor-arn $TRUST_ANCHOR_ARN \
      --profile-arn $PROFILE_ARN \
      --role-arn $ROLE_ARN > aws_credentials.json

      # docker コンテナ内で取得したクレデンシャルを利用
      docker run --rm -it \
        -v $PWD/aws_credentials.json:/aws_credentials.json \
        -v $PWD/aws_config:/root/.aws/config \
        amazon/aws-cli $@
      ```

正直なところまだまだどういう風に使っていくのが一番いいのかがよくわかっておりません（自分の知識不足もあって）。もうちょっと色々な example や事例が出てくればな〜と思います。また、現状簡単な利用方法が aws_signing_helper を使うことしかないので、SDK などでも使えるようにしてほしいですね。

## New – Amazon EC2 M1 Mac Instances | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-amazon-ec2-m1-mac-instances/?sc_channel=sm&sc_campaign=launch_&sc_publisher=TWITTER&sc_geo=GLOBAL&sc_outcome=awareness&sc_content=AWS_Launches&trk=launch_

[去年末頃、Amazon EC2 で M1 Mac インスタンスが使えるようになりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20211208#%E6%96%B0%E3%81%97%E3%81%84-amazon-ec2-m1-mac-%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E3%80%81iphone%E3%80%81ipad%E3%80%81mac%E3%80%81apple-watch%E3%80%81%E3%81%8A%E3%82%88%E3%81%B3-apple-tv-%E7%94%A8%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%A7%8B%E7%AF%89%E3%81%8A%E3%82%88%E3%81%B3%E3%83%86%E3%82%B9%E3%83%88%E3%81%99%E3%82%8B-%7C-amazon-web-services-%E3%83%96%E3%83%AD%E3%82%B0)が、とうとう正式リリースされました。これまではプレビューだったのでサインアップが必要でしたが、これからは誰でも使えるようになります。

6 ヶ月のプレビューで出てきたフィードバックを基に微量性がされており、Systems Manager や CloudWatch のためのエージェントが追加されてたり、AWS CLI や AWS SDK などのツールがプレインストールされてたりします。

気になる方は使ってみましょう（最小割当期間が 24 時間なので注意）。プレビュー期間に触ってみた人も正式版との違いを再確認しておきたいですね。

## Release gopls@v0.9.0 · golang/tools
https://github.com/golang/tools/releases/tag/gopls%2Fv0.9.0

Go の language server である gopls において、Inlay hints が実装されました。

[Inlay hints](https://microsoft.github.io/language-server-protocol/specifications/lsp/3.17/specification/#textDocument_inlayHint) は Language Server Protocol 3.17 で追加された仕様であり、宣言した変数の型情報や、確定している値などをエディタ上に表示してくれます。

現時点で使ってみるには vscode-go 拡張機能をインストールし、inlay hints 関連の機能を設定で有効にする必要があります。現在設定は全部で 7 種類あり、柔軟に設定できます。

![](/images/productivity-weekly-20220713/inlay_hints_vscode.png =600x)
*設定をマシマシにしたところ、引数名や変数の型を表示してくれている。*

![](/images/productivity-weekly-20220713/inlay_hints_jetbrains.png =600x)
*JetBrains IDE で Go のファイルを開いた場合、関数の引数がリテラルである場合に引数名が表示される。gopls を使っている VSCode と比べて機能が少ない。（他の言語では変数の型に対応してたりする。言語ごとに設定が異なり有効化が必要。）*

どの情報をどれくらい表示するかは人によって異なると思いますが、自分に合った設定をすることで開発をスムーズに進められそうですね。

# know-how 🎓

## git 2.37 にリモート追跡ブランチを自動設定する push.autoSetupRemote が追加されていた
https://twitter.com/JI/status/1546948817462800384

git 2.37 に、`git push` 時に自動で `--set-upstream` してくれる設定 `push.autoSetupRemote` が追加されていました。

リモートにブランチが存在しないのに `git push` して、`git push --set-upstream origin <ブランチ名>` しろと怒られてしまうことがありますよね。しかし、`push.autoSetupRemote` を `true` にすることで、`git push` のみで勝手に `--set-upstream` してくれるので、もう `git push --set-upstream origin HEAD` を叩く必要はありません。

:::message
余談ですが、git 2.37 自体はちょっと前に出ていたのに、知ってる人は皆無でした。上記のツイートにより広く知れ渡ったようです。どうやら git 2.37 のリリースノートに入れ忘れたっぽいです。
https://lore.kernel.org/git/MEYP282MB35646319926B07F89FBF577DA3819@MEYP282MB3564.AUSP282.PROD.OUTLOOK.COM/T/
:::

めんどいと思ってる方は使ってみましょう。僕は [alias でうまくやってた](https://github.com/korosuke613/dotfiles/commit/5c0600fbf7d3d6a209f3fab154d23e6a15987ee8)のですが、`~/.gitconfig` に以下を追記するようにしました。

```diff toml:.gitconfig
+ [push]
+ 	autoSetupRemote = true
```

## starship+asdfでプロンプトの表示が遅くなるのを改善する - ぶていのログでぶログ
https://tech.buty4649.net/entry/2021/07/29/201613

starship と asdf を併用している場合、プロンプトの表示が遅くなってしまう問題があります。この記事ではその問題を改善する方法を紹介しています。

実際にやってみたところ、確かにプロンプトの表示を早くできましたが、記事内にも書かれている通り高速化したいディレクトリ（≒`.tool-versions` のあるディレクトリ）ごとに.envrc の設定と `direnv allow` を行わなければいけないのは面倒ですね。

やはり asdf 側で改善してほしいところではありますが、遅すぎて気になってる方は試してみるとよさそうです。


## 今の生産性改善活動で大切にしている考え方 - Speaker Deck
https://speakerdeck.com/shibayu36/jin-falsesheng-chan-xing-gai-shan-huo-dong-deda-qie-nisiteirukao-efang

10 年近く開発生産性の改善活動を実施してきた方による、生産性改善活動で大切にしている考え方を紹介したスライドです。

大切にしている考え方を 3 つ紹介されており、どれも頷ける内容となっています。特に、「チームの生産性改善は必ず数字で見る。しかし数字だけで判断しない」という部分が参考になりました。（僕が所属する生産性向上チームではスライドにもあるとおり数字だけの観察は問題を誤認するという考えから、生産性を定量的に測っていません。しかし、最近は何らかの指標はほしいよねと個人的になっているため、関連する考え方は参考になります。）

生産性向上に携わる人は参考になる考え方が載っていると思います。

## GitHub Actionのジョブ実行画面からPull Requestを辿れるようにした - Lambdaカクテル
https://blog.3qe.us/entry/2022/07/12/195023

GitHub Actions のジョブ実行画面からキック元のプルリクを辿るようにする方法を紹介した記事です。

GitHub Actions のジョブをプルリクエストによりトリガーしても、実行画面にはトリガー元のプルリクエストへのリンクが出ないため不便です。この記事では、ジョブの最後でジョブサマリーにプルリクエストへのリンクを書き込む方法を詳しく説明してくれています。

やはりプルリクエストへのリンクがあると便利なので、不便に思っている方におすすめです。ですが、全てのジョブに設定していくのも大変なので正直なところ公式の機能としてほしいです。

# tool 🔨

## Release Add support for asdf format and update actions/cache version to 3.0.0 · actions/setup-node
https://github.com/actions/setup-node/releases/tag/v3.4.0

actions/setup-node において、asdf の .tool-versions 形式をサポートしたバージョン指定ができるようになりました。設定は `node-version-file` に `.tool-versions` のパスを指定するだけです。

asdf を利用している人には嬉しい機能ですね。今回は actions/setup-node の話ですが、他の actions/setup-*にも入ってほしい機能です。

:::message
実は同じ生産性向上チームの ganta さんが昨年 12 月に作った PR です。マージされるまで結構かかったようです。
https://github.com/actions/setup-node/pull/373
:::

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Redis互換で25倍高速とする「Dragonfly」が登場。2022年の最新技術でインメモリデータストアを実装](https://www.publickey1.jp/blog/22/redis25dragonfly2022.html)
    - Redis の 25 倍も速い (らしい) インメモリデータストアらしい
    - ライセンスは [Open Source Initiative で承認されていない](https://opensource.org/licenses/alphabetical) [Business Source Lisense (BSL)](https://github.com/dragonflydb/dragonfly/blob/a00d45fb43580ebe7df06b0ba66d22cf4115d1de/LICENSE.md) というものが採用されており、利用時は注意が必要
      - マネージドサービスとして提供されないようにするためのライセンスっぽい
      - 一定期間経過後に Apache License, Version 2.0 となる
      - MariaDB Corporation が提唱したものを基にしてるっぽい
- **know-how 🎓**
  - [“まだ作成していないユーザーアカウント”を先回りして乗っ取る攻撃　米Microsoftなどが指摘](https://www.itmedia.co.jp/news/articles/2207/07/news050.html)
    - まだ作成していないユーザーアカウントを乗っ取る攻撃が存在するようです
    - 例）攻撃者が被害者のメールアドレスでアカウントを作成し、のちに被害者が同じメールアドレスで SSO によるログインをすることで、攻撃者は作成時のメールアドレスとパスワードでログインできてしまう
      - 他にも種類がある
    - 基本的にはアカウント作成時にメールアドレスの所有確認を行わないサービスで成立するっぽいです
    - 怖いっすね
- **tool 🔨**
  - [b3nj5m1n/xdg-ninja: A shell script which checks your $HOME for unwanted files and directories.](https://github.com/b3nj5m1n/xdg-ninja)
    - [XDG Base Directory](https://wiki.archlinux.org/title/XDG_Base_Directory) に対応している設定ファイルやディレクトリがホームディレクトリにあるかどうかをチェックしてくれるスクリプトです
    - ホームディレクトリを綺麗にしたいっすね

# あとがき
遅くなりましたが 2022/07/13 号です。[デブサミ登壇](https://twitter.com/Shitimi_613/status/1546307676199563264)と AWS IAM Roles Anywhere 探求で時間使って遅れました。特に IAM Roles Anywhere だけで休日使ったくらいです。

デブサミで発表した資料は下記 omake にあるのでよければ見てください。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 生産性向上は一筋縄ではいかない 〜改善を進める上で生じる課題との付き合い方〜 | ドクセル
https://www.docswell.com/s/korosuke613/59Y1MK-2022-07-21-fighting-the-problems-that-come-with-developer-productivity-support

今週のおまけです。おまけというより宣伝です。[Developers Summit 2022 Summer](https://twitter.com/Shitimi_613/status/1546307676199563264) で発表した資料になります。生産性向上チームの存在理由、および、改善活動やってく中で出てきた課題とどう付き合うかを発表させていただきました。

40 分ぴったりで終わるような内容だったのでチャットをあまり見れてなかったのですが、終わった後にチャットをみると思った以上に盛り上がってて嬉しかったです。質問もたくさん飛んできていたのですが、後日記事にして回答をまとめたいと思っているのでご期待ください。
