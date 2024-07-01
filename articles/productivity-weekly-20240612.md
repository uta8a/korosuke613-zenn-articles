---
title: VSCode Chat Extensionやセキュリティ話など｜Productivity Weekly(2024-06-12)
emoji: 🥋
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240612
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-07-02 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-06-12 単独号です。

今回が第 156 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Visual Studio Code May 2024
https://code.visualstudio.com/updates/v1_90

Visual Studio Code の 2024 年 5 月のアップデート情報が公開されています。今回のアップデートの目玉は Chat extensions でしょうか。
この機能では、独自の Chat participants を作成し、GitHub Copilot Chat の拡張機能の UI で独自のプロンプトをした LLM の呼び出しや、独自の関数を呼び出せるようになります。
ここで、Chat participants とは `@vscode`, `@workspace`, `@terminal` などのことを指すようです。リリースノートにはサンプルとして、`@cat` で呼び出せる関数を作成する例が紹介されています。

[GitHub Copilot をカスタムできる? VS Code の Chat extensions とは](https://zenn.dev/yuma_prog/articles/vscode-chat-extension)という記事でまとめてくださった方がいるので詳しくはこちらも参照してみてください。

この機能を使えば、自分たちのコードベースや特定のコンテキストにカスタマイズした Chat participants を作成して、より効率的に開発したり、分析作業ができるといったことが期待されますね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Centrally manage member account root email addresses across your AWS Organization - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/06/manage-member-account-root-email-addresses-aws-organization/

AWS Organizations の各メンバーアカウントのルートメールアドレスを、組織の管理アカウント、または委任したアカウントから一元管理できるようになりました。
これまではルートメールアドレスの変更のためには、ルートユーザでログインして変更する必要がありました。今後は AWS Organizations コンソールに加えて、SDK や CLI からも権限があれば変更できるようなので、ルートユーザの退職や異動に伴って変更を自動で反映させたい時に役立ちそうです。
[AWS のドキュメント - Updating the root user email address for a member account](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_update_primary_email.html) を読むと、事前に AWS Organizations の全ての機能を有効化しておく必要があるようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## [速報] IAMのMFA(多要素認証)でPasskeyが利用できるようになりました #AWSreInforce | DevelopersIO
https://dev.classmethod.jp/articles/aws-iam-supported-passkey/

MFA の手段として、AWS のルートユーザと IAM ユーザに対して Passkey がサポートされるようになりました。
こちらの記事では 1Password を用いて、AWS の IAM ユーザの認証に Passkey を使ってログインするまでの様子が紹介されています。
今回のリリースでは Passkey とパスワード認証を共に使う必要があります。Passkey は本来パスワードなしでセキュリティを担保できるように設計されています。今後 Passkey のみでログインできるようになるといいですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Amazon Q offers inline completions in the command line
https://aws.amazon.com/jp/about-aws/whats-new/2024/06/amazon-q-inline-completions-command-line/

[旧 Amazon CodeWhisperer（旧 Fig.io）こと Amazon Q for command line](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240327#fig-is-sunsetting%2C-migrate-to-amazon-codewhisperer-%7C-fig) に、インライン補完機能（inline completions）が追加されました。

inline completions はシェルにおいてコマンド入力時に AI による補完を提案してもらえる機能です。`git` と入力すると `push origin main` が提案される例が示されています。
回答の生成のために、現在のシェルのコンテキスト、および最近のコマンド履歴が利用されるとのことです。

面白くて便利そうな機能なのですが、この機能はデフォルトで有効です。
個人的には、新たな種類のデータを送信するのであればデフォルト無効にしてオプトインできる形にしてほしかったです。特にシェルの履歴は個人的にソースコードより機密性が高いと思っており、勝手に外部サーバへ送信してほしくはなかったですね。
（送信したデータを学習可能にするかは設定でオフにできます。）

次のスクラップが参考になります。

- [Amazon Q Developer ( 旧 Fig ) の inline compression 機能追加で「データ送信がデフォルトオン」になってる話](https://zenn.dev/naotama/scraps/e6c20f78d09de0)

僕の場合はアップデートして設定欄を見た際に自動でオンになっていて驚きました。これまで Amazon Q for command line を使っていましたが、勝手に送信するデータの範囲を広げられることに不信感を持ったため、アンインストールしました。

Amazon Q for command line を利用している方は注意しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## GitHub Actionsにおける脅威と対策まとめ
https://zenn.dev/cybozu_ept/articles/573c706ec08b48

主に GitHub Actions を利用しているがセキュリティ対策をしていない、もしくは対策が十分か不安がある方向けの記事です。起こりうる脅威とその分類、対策、お役立ちツールの紹介をしています。具体的にいくつか挙げると、インジェクションの防止や push ruleset を用いたワークフローの改ざん防止、シークレットの取り扱いなどがあります。

この記事は、僕たち生産性向上チームの Publication からの記事です。新卒の方が、配属前の他チーム体験として生産性向上チームで取り組んでくれた成果になります。

網羅的に、かつ CI/CD Threat Matrix を用いてどの段階の脅威なのか整理しています。ぜひ興味のある方は読んでみてください。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Docker Build Cloudを導入してコンテナイメージビルド時間を80%削減しました | by Akira Kuriyama | Jun, 2024 | スタディスト Tech Blog
https://studist.tech/docker-build-cloud-f5e1e3dfa114

Docker Build Cloud を利用した CI/CD 環境でのコンテナイメージビルド時間を 80% 削減した事例が紹介されています。
CI/CD 環境ではワークフローの実行ごとに環境が使い捨てられるため、デフォルトではキャッシュが効かず、毎回イメージをビルドする必要があります。そのため、ビルド時間がかかることがあります。BuildKit のキャッシュ機能を使うこともできますが、キャッシュの管理など考えなければならないことも増えます。

Docker Build Cloud はコンテナイメージビルドを Docker 社のクラウド環境で行えるサービスです。ビルドキャッシュを共有したり、ハイスペックなマシンでビルドを行うことができるため、ビルド時間の短縮に効果的です。また、マルチアーキテクチャのビルドもサポートされており、CI/CD プラットフォームで複数のアーキテクチャのマシンを用意する必要がなくなります。

注意点としては、Docker Build Cloud の環境が US East リージョンしかないためイメージの pull には時間がかかるそうです。今後 Asia リージョンが追加されることを期待しましょう。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 過去のGitHub Actionsのbuild時間を取得して集計してグラフにする - xuwei-k's blog
https://xuwei-k.hatenablog.com/entry/2024/06/07/074942

GitHub Actions で実行してきた step の実行時間の変化を簡易的に可視化したい時に役立つ方法を紹介されています。例えば、ビルド時間が遅いなと感じた時に、使い捨てでここ数ヶ月のログを使ってビルド時間の変化を分析する時に使えそうです。

僕もやってみました。参考: 僕が試した様子を Zenn の Scrap に書いたもの [GitHub Actionsのstepの実行時間を簡易的に集計してグラフにする](https://zenn.dev/uta8a/scraps/5bde3397914e2d)

ワークフローファイル、job の名前、step の名前、と順番に絞り込んで `completed_at` から `started_at` を引いて秒数を算出するという流れなので、この絞り込むパートを書き換えれば色々応用できそうです。サッと試せてお手軽で良いですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Bitbucket に開いた穴: CI / CD パイプラインからシークレットが漏れる理由 | Google Cloud 公式ブログ
https://cloud.google.com/blog/ja/topics/threat-intelligence/bitbucket-pipeline-leaking-secrets/?hl=ja

Ci/CD セキュリティの話題です。

Bitbucket の CI/CD パイプラインにおいて、デバッグ目的で `artifacts:` コマンドを使って Bitbucket の変数をファイルに書き出したところ、そこに AWS へアクセス可能なシークレットが含まれてしまっていたため、ファイルを取得した攻撃者にシークレットが利用され、対象 AWS アカウントに不正アクセスされてしまった事例が紹介されています。

この手の話は Bitbucket に限らず GitHub Actions でも起こり得ます。例えばジョブ間のファイルの受け渡しに artifact の upload/download を使うならそこでうっかりシークレットが入ってしまい、シークレットを参照する権限のない人も artifact を手に入れてシークレットを参照できてしまう、などが起こり得ます。

対策にあるように、artifact の精査や、ソースコードにシークレットが直に書かれていないかなど、リポジトリや artifact のように広く閲覧可能な場所へシークレットが混入するのを防ぐように対策をしていきましょう。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

<!-- textlint-disable prh -->

## Call for action: Exploring vulnerabilities in Github Actions | Snyk
https://snyk.io/jp/blog/exploring-vulnerabilities-github-actions/

<!-- textlint-enable prh -->

主に OSS の GitHub Actions のセキュリティについての記事。

fork される場合に脆弱になる可能性がある `pull_request_target` と `workflow_run` についての解説、さらに攻撃が可能なワークフローに対し、攻撃を最大化する手法とその対策を述べています。

後半の OSS での攻撃を防ぐために工夫している点の紹介が面白かったです。 `if` を用いて `actor` をチェックするなどはあまり考えたことがなかったので、そういう観点で OSS を眺めてみるのもいいなと思いました。最後に紹介されている snyk のツールも、そういった GitHub Actions の action の脆弱性を調査する上で便利そうなので調べておきたいです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## macOS Sonoma 14.xでsudo実行時にTouch IDで認証する機能を有効化する手順 #TouchID - Qiita
https://qiita.com/notakaos/items/fbc817741d43f24bf300

<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->

macOS 14.x で sudo 実行時に Touch ID で認証する機能についての記事です。
macOS では Touch ID という生体認証機能を利用できます。主にログイン時や GUI 上の特権操作を行うときに Touch ID を使った認証が可能です。

コマンドライン上で sudo する際も Touch ID で認証することはこれまでも可能でしたが、macOS 14.x になるまでは、設定をしても OS 更新で設定が元に戻ってしまっていました。
しかし、macOS 14.x では設定を永続化できるようになり、また、設定が簡単になったことがこの記事で紹介されています。

僕も前の OS で sudo を Touch ID で認証する設定はやってたのですが、OS 更新のたびに設定するのが面倒だったのでそのうち設定しなくなっていました。
この記事を読んで 14.x より設定を永続化できることを知ってさっそく設定しました。

正直 sudo は滅多に使いませんが、やはり Touch ID で認証できるのは便利ですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

<!-- textlint-enable ja-technical-writing/ja-no-redundant-expression -->

# tool 🔨

## lintnet - General purpose linter powered by Jsonnet
https://zenn.dev/shunsuke_suzuki/articles/lintnet-introduction

[Lint Night #3](https://lintnight.connpass.com/event/319202/) で発表された shunsuke suzuki さんの新しい OSS, lintnet の紹介記事です。

lintnet は汎用的な linter で、現在は JSON, YAML, HCL, CSV といった一般的なデータフォーマットのファイルに対し、lint rule を設定して適用できます。lint rule の設定は jsonnet で記述する点が特徴的です。linter の開発を意識した test などの機能がデフォルトで入っているのも魅力的です。

汎用的なツールなのでイメージのために一例を挙げると、GitHub Actions のワークフローファイルの YAML を入力として、自分で定めたポリシーを lintnet の lint rule として設定し、 `lintnet lint` で実際に定めたポリシーに合致するかどうか lint が走る、といった感じです。他にも HCL を入力として、terraform でよくある間違いを指摘する lint なども作れます。

まだ始まったばかりなので対応 module は少ないですが、作者の方の構想としてはこれからエコシステムが発展していくと良いとのことでした。公式ドキュメントでは公開されたモジュールに [`lintnet-module` topicをつけることが推奨されている](https://lintnet.github.io/docs/module/#find-modules) ので、ぜひモジュールを作って topic をつけて公開してみましょう。

これは完全に私個人の意見ですが、lintnet を少し試してみたところ、汎用性やカスタマイズの容易さを生かしてこれまで linter が出てきてないところに使えるのではないかと感じました。例えば VS Code の設定ファイルの linter や、tfstate の linter が思い浮かんだので探求してみたいと思います。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

# あとがき
最近雨が多いですね。そういえば 6/13 に 29 歳になりました。アラサーの極みです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
