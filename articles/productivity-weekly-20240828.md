---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-08-28,08-21)
emoji: 🌀
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240828
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

:::message alert
投稿が大変遅くなってしまいすみません！！！この記事に書いているネタは 1 ヶ月ほど前のものとなって古いです。ご了承ください...
:::


こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-08-21, 2024-08-28 合併号です。

今回が第 164 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
:::

# news 📺

## Notice of upcoming deprecations and breaking changes in GitHub Actions runners - GitHub Changelog
https://github.blog/changelog/2024-08-19-notice-of-upcoming-deprecations-and-breaking-changes-in-github-actions-runners/

GitHub Actions における、今後半年以内に非推奨となる機能や破壊的変更のある機能のまとめお知らせです。

次の内容が書かれています。

- actions/upload-artifact v3, v4 においてデフォルトで隠しファイルが除外されるように変更 (9 月〜)
- Ubuntu Arm ランナーの Ubuntu 22/20 ベースイメージが利用不可能に (9 月〜)
  - 代わりに [Arm が提供する Ubuntu 24/22 イメージ](https://github.com/actions/partner-runner-images/tree/5e496b5c1eddaf72d0ae87d98d8de6ac5554357e)の使用が推奨されます
- actions/runner において .Net6 から .Net8 へ移行 (10 月〜)
  - セルフホストランナーを立てる際は、今後はランナー設定前に .Net8 が必要になります
- macOS 12 ランナーが非推奨に（12 月までに完全に引退）
- macOS のいくつかのラベルが利用不可能に（12 月〜）
  - `macos-11.0`, `macos-12-xl`, `macos-13-xl`, `macos-13-xl-arm64`, `macos-latest-xl`, `macos-latest-xl-arm64`

いろいろありますが、特に気をつけたいのが actions/upload-artifact の変更ですね。セキュリティアップデートという意味合いからか、メジャーアップデートではないため、`actions/upload-artifact@v4` のような指定をしている場合は変更が自動で適用されることになります（記事執筆時点ですでに期日を超えてしまっていますが）。

さっそく検証してくれた方が記事を出してくれているので、どういう挙動になったかはこちらがわかりやすいです。

- [actions/upload-artifact はデフォルトでは隠しファイルをアップロードしなくなった](https://zenn.dev/kou_pg_0131/articles/gh-actions-upload-artifact-hidden-files)

この変更は以前話題になった、リポジトリ全体をアップロード対象に指定してしまうと `.git` にある `GITHUB_TOKEN` もアップロードされてしまい、セキュリティ的に問題があることを受けての変更だと思われます。

> actions/checkoutはデフォルトでローカルの.gitにGITHUB_TOKENを保存するので、そのままartifactとしてリポジトリ全体をアップロードしてはいけない。
> > ArtiPACKED: Hacking Giants Through a Race Condition in GitHub Actions Artifacts
https://x.com/minamijoyo/status/1824997760107716906

そのためメジャーアップデートでの変更とはならなかったようですが、この変更に関する Issue ([Upcoming breaking change: Hidden Files will be excluded by default · Issue #602 · actions/upload-artifact](https://github.com/actions/upload-artifact/issues/602)) では多くの down vote が付いており、この対応に満足していないユーザーは多そうでした。[指摘](https://unit42.paloaltonetworks.com/github-repo-artifacts-leak-tokens/)された一週間後にアナウンスを出し、その二週間後には変更されているため、変更されることを知らない人も多かったことでしょう。難しいですね。

そもそもバージョンを厳密に固定してこまめにアップデートする運用をしておけばいきなり仕様が変わって困るということも回避できたと思うので、GitHub 公式アクションだとしてもバージョン固定するのがいいかもしれませんね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Copilot Enterprise now helps you fix failed Actions jobs, plus other August updates (public beta) - GitHub Changelog
https://github.blog/changelog/2024-08-15-copilot-enterprise-now-helps-you-fix-failed-actions-jobs-plus-other-august-updates-public-beta/

GitHub Copilot Enterprise において、GitHub Actions のジョブ実行失敗について Copilot Chat に質問できるようになりました（ベータ）。

失敗したジョブのログの画面に置いて Copilot Chat を呼び出し、ジョブが失敗した理由や対処方法を質問すると、ログの内容を解析して回答を返してくれるようです。

Copilot Enterprise の機能であるため、Copilot Business、Individual では利用できません。利用するには Enterprise 管理画面から有効化する必要があります。

CI の失敗理由はさまざまで、慣れている人が見るとすぐに原因がわかることもあると思いますが、あまり慣れてないコードベースでは何が何だかわからないかもしれません。そういう時に気軽に Copilot に質問して原因解決に役立てられるのは嬉しいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS CodeBuild now supports using GitHub Apps to access source repositories - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/08/aws-codebuild-github-apps-access-source-repositories/

AWS CodeBuild が GitHub Apps によるリポジトリへのアクセスをサポートしました。

[以前 AWS CodeBuild において GitHub Actions のセルフホストランナーを動かせるようになりました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240501#aws-codebuild-%E3%81%8C%E3%83%9E%E3%83%8D%E3%83%BC%E3%82%B8%E3%83%89%E5%9E%8B%E3%81%AE-github-action-%E3%83%A9%E3%83%B3%E3%83%8A%E3%83%BC%E3%81%AE%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88%E3%82%92%E9%96%8B%E5%A7%8B)が、当時は OAuth Apps や Personal Access Token による認証が必要で、それらは個人に紐づくため、組織内での利用に少し壁がありました。

今回、GitHub Apps による認証がサポートされたことで、App をリポジトリにインストールするだけで CodeBuild によるセルフホストランナーの利用が可能になると思われます（未検証）。また、GitHub Apps は Organization に紐づけられるため、個人の権限を気にせず組織内で利用できるようになるのも嬉しいです。

AWS 上でセルフホストランナー環境を構築している場合、CodeBuild に移行するのを検討してもいいかもしれません。

:::message
ちなみに、同時期に AWS CodeBuild で macOS が使えるようになりました。手軽に macOS でのビルドができるようになりそうですが、EC2 で macOS を使う時と同じくリザーブドインスタンスとして使う必要があるとのことで、最低一日分の料金が必要になることは変わりなさそうです。

- [AWS CodeBuild が macOS でのビルドをサポートしました | DevelopersIO](https://dev.classmethod.jp/articles/codebuild-mac-builds/)
:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Custom models for GitHub Copilot are now in Limited Public Beta - GitHub Changelog
https://github.blog/changelog/2024-08-27-custom-models-for-github-copilot-are-now-in-limited-public-beta/

GitHub Copilot Enterprise において、カスタムモデルを利用できるようになりました（limited public beta）。

カスタムモデルは自組織のコードベースを使用して調整したモデルであり、ベースとなるモデルに追加のトレーニングを行なったものになります。より組織のニーズに合わせたコードの提案を提供すると記事には書かれています。

どのようにトレーニングするかについてですが、今回は GitHub リポジトリを指定するだけでトレーニングを行なってくれるようで、専門的な知識は必要なさそうに思えます。

GitHub Copilot は IDE 上で開いてたり関連するコードをコンテキストとして利用しますが、大規模なリポジトリにおいては全てのコードの情報をコンテキストとして渡すのは厳しいため、こう言ったカスタムモデルが必要になるのかもしれません。
ユースケースとしては、公開されていないライブラリや API、一般的でない言語を利用する場合にカスタムモデルの使用を検討するのが良いとされています。

なお、コードベースが変更されるとカスタムモデルを自動で再トレーニングするように制御することも可能とのことです。

気になる方はベータ登録してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Terraform AWS Provider で AWS Chatbot を構築する - kakakakakku blog
https://kakakakakku.hatenablog.com/entry/2024/08/04/132435

Terraform AWS Provider v5.61.0 において、とうとう AWS Chatbot の Slack、MS Teams 通知を管理できるようになりました。これまでは AWS Provider でそれらの管理はできなかったため、別途 AWS CC Provider を使うなどの工夫が必要でした。

この記事では、Terraform AWS Provider v5.61.0 で Chatbot の Slack、Teams 設定ができるようになったこと、これまでなぜ使えなかったのかという背景やどのようにする必要があったのか、どのように設定するかなどを紹介されています。

僕もこの件は以前困ったことがあり、AWS CC Provider を使うことでなんとか回避していました。今回 AWS Provider で使えるようになったこともこの記事で知って、とても嬉しいです。

ただ、現状 AWS CC Provider の併用で困っているわけでもないので機会があれば移行するや新たにリソース作成する場合に AWS Provider を使うといった対応を取る予定です。まあ依存するプロバイダを減らせてバージョン管理が楽になるというメリットもあるので、AWS Provider を使っていくことが将来的には楽だと思います。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHubで扱うPersonal access tokenの利用方法をセキュアにする - 10X Product Blog
https://product.10x.co.jp/entry/2024/08/19/164039

10X さんによる GitHub の Personal access token (PAT) 利用のセキュリティ向上に関する記事です。GitHub のセキュリティリスク低減のために PAT 利用の最小化、PAT(classic)の利用禁止と PAT(fine-grained)利用を原則とする状態を目指し、いろいろ取り組みを行ったことが書かれています。

記事では、PAT の課題やリスクと当時の状況、PAT 利用最小化のための利用状況の把握、PAT から GITHUB_TOKEN や GitHub Apps への置き換え、PAT(fine-grained)への置き換えとそれに伴うコンテナレジストリ移行、ポリシーの策定、やってみてどうだったかなどが書かれています。

PAT のリスクや置き換えのための施策が載っており、PAT 周りに詳しくない人もセキュアにしていきたい人も参考になる記事だと思いました。個人的には PAT (fine-grained)をちゃんと使えてるのはすごいと思いました。PAT (fine-grained)はメリットの多い反面、ghcr への認証には対応してなかったり、有効期限を無期限にできなかったり（最大 1 年）と、使い勝手の悪い部分も目立ちます。有効期限についてはローテーションしていけばいい話ですが、期限までに気づく仕組みを作る必要があるし、手動でローテーションしていくのも大変です（そもそも多くの場合 GitHub Apps で事足りると思う）。有効期限はどれくらいにしているのかやローテーションはどのようにしていくのかは特に記事に載っていなかったので気になりました。

PAT はなるべく使わないように努めていきたいですね。僕は GitHub API などの検証目的で一時的に PAT を使い、それ以外の永続的に利用する場合は GitHub Apps を使う場合が多いです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Actions ステップアップ Tips 〜高速化・セキュリティ・設計〜 #GitHubActions_findy | ドクセル
https://www.docswell.com/s/uta8a/KYDW9P-2024-08-22-github-actions-tips

サイボウズ生産性向上チームの @uta8a さん[^weekly]による GitHub Actions の高速化やセキュリティ、設計に関する Tips 集のスライドです。

高速化のための実行時間の計測話や不必要ジョブのスキップ話、キャッシュ、シークレットの取り扱い、命名規則のすゝめなどまあまあなボリュームです。GitHub Actions をもっといい感じにしていきたいぜという人は参考になると思います。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^weekly]: Productivity Weekly 執筆者の一人です！！！

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
