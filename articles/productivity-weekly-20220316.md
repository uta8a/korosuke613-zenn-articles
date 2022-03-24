---
title: "Productivity Weekly (2022-03-16号)"
emoji: "🎓"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220316"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 66 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Ability to restart individual GitHub Actions CI builds · Discussion #4278 · github/feedback
https://github.com/github/feedback/discussions/4278#discussioncomment-2366450

https://github.blog/2022-03-16-save-time-partial-re-runs-github-actions/

GitHub Actions において、ジョブ単位、および、失敗したジョブのみで re-run できるようになりました。任意のジョブ、もしくは失敗したジョブのみを re-run できます。re-run した場合、古い実行結果も遡って見ることができます[^old_log]。また、API や gh コマンド[^gh_rerun]を使っても re-run できます。

非常に待ち望んでいた機能でした。大規模なワークフローにおいて、flaky な理由でジョブが失敗した際に全てのジョブをやり直すのはつらいものがありました。大規模なワークフローを動かす際に必須の機能だと思います。

[^old_log]: 古い実行結果を遡れる機能自体はちょっと前から一部の人は使えていました。
[^gh_rerun]: `gh run rerun` で re-run できるらしい。https://docs.github.com/en/actions/managing-workflow-runs/re-running-workflows-and-jobs#reviewing-previous-workflow-runs

![](/images/productivity-weekly-20220316/ga_button.png =200x)
*ジョブにカーソルを合わせると re-run するボタンが表示される*

![](/images/productivity-weekly-20220316/ga_button_2.png =350x)
*または、ジョブ実行画面の `Search logs` のとなりにも re-run するボタンが表示される*

![](/images/productivity-weekly-20220316/ga_dialog.png =350x)
*ワークフローの後続のジョブも実行される。どのジョブが実行されるかはダイアログで確認できる*

![](/images/productivity-weekly-20220316/ga_rerun_from_failed.png =350x)
*失敗したジョブがあれば `Re-run jobs` の部分から `Re-run failed jobs` を選択でき、失敗したジョブのみを re-run できる*

![](/images/productivity-weekly-20220316/ga_old.png =250x)
*re-run 後に前回の実行ログも閲覧できる。*

## Go 1.18 is released! - The Go Programming Language
https://go.dev/blog/go1.18

Go 1.18 が正式リリースされました。大きな変更としては Generics のサポート、Fuzzing ツールの追加、Workspaces モードの追加があります。

Generics は Java でいう Generics、C++でいう Template と同じものです（たぶん）。適当なことを書いてしまいそうなので知らない方はググってください。Fuzzing はテスト手法の 1 つである fuzz testing[^fuzz] を実現するための機能です。テストコードへランダムに生成したデータを突っ込んでくれます。Workspaces モードは複数のモジュールをまたがった開発を楽にするためのモードです。

[^fuzz]: fuzz testing または fuzzing だと思うんだけど、fuzzing って書いたら混乱するから fuzz testing の方を書いた。

これらの新機能は Go 公式チュートリアルが用意されているので、そちらをやってみるのがおすすめです。

- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics)
- [Tutorial: Getting started with fuzzing - The Go Programming Language](https://go.dev/doc/tutorial/fuzz)
- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics)

また、Go 1.18 全般に関することや個々の機能については下記のスライド、ブログが参考になりました。こちらもおすすめです。

- [手を動かして学ぶ Go1.18の新機能 - Google スライド](https://docs.google.com/presentation/d/1uyslEAHd6qLOn7Q9BqjMl3lB6UQ9vLyR2FYORXso0Iw)
- [Go 1.18集中連載 | フューチャー技術ブログ](https://future-architect.github.io/articles/20220209a/)

個人的には Generics も Fuzzing が特に嬉しいですね。ちゃんと使いこなしていきたいです。

## Tag protection rules | GitHub Changelog
https://github.blog/changelog/2022-03-09-tag-protection-rules/

GitHub においてタグを保護できるようになりました（ベータ）。Branch protection rules に近い機能です。全ての Public リポジトリ、および、Pro、Teams、Enterprise プランの Private リポジトリで利用できます。

パターンを設定し、パターンにマッチするタグは作成と削除ができなくなります。Branch protection rules と同じくパターンにはワイルドカードが使えます。

保護されたタグは作成も削除もできなくなりますが、例外として Maintain、Admin はルールにマッチしたタグを作成できます。削除に関しては Admin のみ行えます。

![](/images/productivity-weekly-20220316/tag_protection_role.png)
*[ルールにマッチするタグの作成と削除で必要な権限が異なる](https://docs.github.com/en/organizations/managing-access-to-your-organizations-repositories/repository-roles-for-an-organization#permissions-for-each-role)*

何も設定しないと Write 権限を持った人はタグを自由に操作できます。タグを元にパッケージのデリバリーを走らせたり、Go のようにタグを設定するだけでデリバリーできたりと Git のタグが大きな意味を持つリポジトリでは、権限を持った人のみタグを操作できる方が安全です。

少しでもサプライチェーン攻撃の元凶とならないように OSS を運用している方は積極的にタグを守っていきたいですね。

## Ubuntu 14.04 and 16.04 image deprecation - CircleCI Changelog
https://circleci.com/changelog/#ubuntu-14-04-and-16-04-image-deprecation

CircleCI において、Linux VM の Ubuntu 14.04 と 16.04 のサポートが 2022/02/15 で終わりました。そして、2022 年 5 月末で利用ができなくなる予定です。

利用ができなくなるまでは何回か一時的に使用できなくするブラウンアウトも予定されています。その他詳細は以下のブログに載っています。

- [Deprecating Ubuntu 14.04 and 16.04 images: stay secure with modern Ubuntu | CircleCI](https://circleci.com/blog/ubuntu-14-16-image-deprecation/)

メンテナンスできてない古い CircleCI のワークフローがある方は対応しましょう（そもそもあるのかどうか探さないといけないけど）。

## SSH and Git, meet 1Password 🥰
https://blog.1password.com/1password-ssh-agent/

1Password が SSH agent を実装し、秘密鍵の管理、利用ができるようになりました。1Password 8 以降で利用可能です[^1pass8]。

1Password 側で SSH agent を有効にし、`~/.ssh/config` の `IdentityAgent` を書き換えることで設定できます。秘密鍵利用時に 1Password での認証を要求され、認証が通ると秘密鍵を使って対象にアクセスできます。

僕は GitHub の認証にはパーソナルアクセストークンを使っているのですが、おうちラズパイなどのリモートマシンへの ssh を頻繁に行うので、この機能はとても嬉しいです。
秘密鍵は今までマシンごとに用意していたので管理が楽になったのも嬉しいですね。1Password を使っている方はぜひ検討してみてください。

[^1pass8]: ところで 1Password 8 for Mac はいつ正式リリースされるのでしょうか...ずっとベータのまま...

# know-how 🎓

## SlideShare が閲覧制限を設けた件
https://twitter.com/molmolken/status/1503209856098275328

SlideShare が最近閲覧制限を設けたとのことです。有料会員でないと毎月 5 つくらいまでしか閲覧できなくなりました[^slide]。これまで SlideShare に登壇資料などを上げていた方は閲覧してもらいずらくなります。実際に自分もいろんなスライドを開いてみたのですが、途中から見られなくなりました。

https://twitter.com/teppeis/status/1503567955665518592

しかし、どうやら公開者が `Account Settings` > `Content` > `Allow users to read and download your slideshows without a subscription` を設定をすれば、その公開者のスライドについては閲覧制限を外せるとのことです。実際、設定した自分のスライドをログインせずに閲覧したところ制限はかかりませんでした。

SlideShare もいつの間にか親会社が変わってるし収益化が大変なのかもしれません。回避方法を設けてたら意味ない気もしますが。SlideShare を利用している方は設定するかどうかはさておき、回避方法もあることを知っておくと良いと思います。

[^slide]: IP アドレスを見てる？

## セキュリティツールの評価は難しい - knqyf263's blog
https://knqyf263.hatenablog.com/entry/2022/03/15/064819

脆弱性スキャナーTrivy のメンテナの方による、セキュリティツールの評価は難しいという話です。セキュリティツールの評価（このツールは良い、このツールは悪い、のような）がなぜ難しいのかの理由が書かれています。

「検知している方が正しいように見えがち」や「検知されないほうが嬉しい」は自分が気づけてなかった観点で、特になるほどなーとなりました。じゃあどうすればいいのかとなると難しいのですが、セキュリティツールを選んだり使ったりする上で知っておくとよいことが書かれている記事だと思いました。


# tool 🔨

## 日本の祝日APIをリリースしました - ケンオールブログ
https://blog.kenall.jp/entry/japan-holiday-api-release

数々の国内に特化した便利な API を提供するサービス、ケンオールさんが日本の祝日 API を追加したという記事です。

例えばカレンダーサービスなんかを作っていると、祝日の存在は無視できません。しかし、日本の祝日は移動したり特別に増えたりとなかなかサービスに組み込むのが大変な存在です。日本の祝日 API では、日本の祝日の「名前」「日付」「週番号」「曜日」を取得できます[^holi]。データは随時自動で更新され、範囲指定も可能です。月額 2000 円（郵便番号 API プラン）で利用可能できます。

祝日判定や祝日一覧を取得する API 自体は探すといくつか見つかりますが、企業が提供するものはあまり無さそうでした。祝日に苦しめられている人は利用してみると良いかもしれません。

[^holi]: https://kenall.jp/docs/API/holidays/

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [13部門のLog4j対応を7時間で実現した、地道な取り組み](https://engineering.visional.inc/blog/385/response-log4j-vulnerability/)
  - 去年末に起こった Log4j2 のゼロデイ脆弱性のような緊急脆弱性対応を、複数部門にまたがって迅速に解決するための取り組みを紹介する記事です
  - 部門が分かれていても迅速に対応するための、連絡方法や影響範囲の特定、信頼関係の築き方に関する工夫が載っています
- [GitHub を狙った Reverse Proxy 型フィッシングサイトの探索と報告 - ぶるーたるごぶりん](https://brutalgoblin.hatenablog.jp/entry/2022/03/12/142249)
  - 最近 GitHub のコンテンツをそのままミラーリングするフィッシングサイトの話題がありました
  - この記事ではそのフィッシングサイトや類似するサイトについての調査が事細かに載っています
  - 類似フィッシングサイトの集め方が面白かったです。こんな方法で見つけられるのか
- [Google Domains がベータ版から一般提供へ](https://domains.google/intl/ja_jp/learn/out-of-beta/)
  - Google Domains が正式リリースされました
  - むしろベータだったのか
  - 正式リリースを記念してドメイン登録が 20% 割引になるクーポンが配られてます

# あとがき
投稿がだいぶ遅れてしまいました。すみません。

3 連休だったのですが、実は 3 連休じゃなくて、採用イベントのお仕事を 1 日してました（その次の平日振替休日だったけど）。休みの日もいろいろ用事があって遅くなってしまいました。

先週 Cybozu Productivity News を開催しました。初の試みでどうなるかわかりませんでしたが、視聴者の方は一定数いてくれたので良かったです。
Youtube で誰でも見られるので、気になる人は見てみてください。

https://www.youtube.com/watch?v=f3oYZY2Gokk

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message
すみません、今週もおまけはお休みです...
:::

## 宣伝
:::message
生産性向上チームで宣伝したいことがあるので宣伝させてください。
内容は先週号のものと同じです。
:::

### 生産性向上チーム、今年もサマーインターン開催するってよ

https://twitter.com/Shitimi_613/status/1501360726966878212

**生産性向上チームは今年もサマーインターンを開催するので、興味のある方は是非エントリーください！**（エントリーは 4/25 開始の予定）

去年のインターン生が参加ブログも書いてくれたので気になる方はそちらもご覧ください。

https://note.com/hysrtr/n/nd13916204c6c
