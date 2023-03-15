---
title: "GitHub Actions Importer、CircleCIのM1 Macインスタンスなど | Productivity Weekly (2023-03-08号)"
emoji: "🔔"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230308"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-03-01, 2023-03-08 合併号です。

今回が第 108 回目（除夜の鐘...ってコト！？）です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions Importer General Availability | GitHub Changelog
https://github.blog/changelog/2023-03-01-github-actions-importer-general-availability/

CircleCI や Jenkins などの CI/CD パイプラインの GitHub Actions への移行支援ツール GitHub Actions Importer が GA となりました。以前紹介した [gh-valet](https://zenn.dev/korosuke613/articles/productivity-weekly-20220518#github%2Fgh-valet%3A-valet-helps-facilitate-the-migration-of-azure-devops%2C-circleci%2C-gitlab-ci%2C-jenkins%2C-and-travis-ci-pipelines-to-github-actions.) の名前が変わったっぽいです。

Azure DevOps、CircleCI、GitLab、Jenkins、Travis CI から GitHub Actions への移行に対応しており、GitHub CLI の拡張機能として提供されています。
それぞれの CI/CD ツール/サービスの要素と GitHub Actions の要素がどう対応しているかについては、[github/gh-actions-importer リポジトリの docs ディレクトリ](https://github.com/github/gh-actions-importer/tree/main/docs)に載っています。各ディレクトリの index.md で全体像を把握できます。対応していない要素も index.md の Unsupported 節に載っています（[Travis CI の例](https://github.com/github/gh-actions-importer/blob/880d4c6e0bad4d8acf6260e3e45fd3549da07f4a/docs/travis_ci/index.md#unsupported)）。

また、移行プロセスを学ぶことのできるリポジトリ [actions/importer-labs](https://github.com/actions/importer-labs) が公開されています。このリポジトリの内容に沿うことで、どのように移行していけばいいかが学べます。Codespaces 向けのテンプレートが用意されており、試しやすいです。

すでに記事を書いてくれている方もいました。どんな感じなのか参考になると思います。

- [GitHub Actions Importer を使って CI/CD を GitHub Actions に移行する](https://zenn.dev/kou_pg_0131/articles/gh-actions-importer)

僕も触ってみたのですが、ちょっと微妙な部分も見つかったので、いくつか feedback しました。OSS として公開されているのはあくまでインターフェース（GitHub CLI Extensions）の部分だけであり、変換に関する部分のソースコードは公開されていないので、みなさんもなんか見つけたらどんどん feedback しましょう。

- [The `set-output` command is deprecated · github/gh-actions-importer · Discussion #72](https://github.com/github/gh-actions-importer/discussions/72)
- [Do the `audit` and `forecast` commands support personal GitHub accounts? · github/gh-actions-importer · Discussion #71](https://github.com/github/gh-actions-importer/discussions/71)


GA にはなりましたが、必ずしも完璧な変換ができるとは限りません。正しくパイプラインがマイグレーション出来たかどうかはきちんと確認して使っていきましょう。


## CI/CD パイプラインが M1 に対応し Apple Silicon でのビルドが可能に | CircleCI Blog
https://circleci.com/ja/blog/m1-mac-resource-class/

CircleCI で Apple Silicon(M1) を搭載した macOS エグゼキューターが使えるようになりました。また、これまでは専有ホストが必須だった GPU も利用できるとのことです。
記事では Intel Mac との比較もされており、Intel で 24 分かかったビルドが M1 だと 7 分で完了している例が載っています。

実行するには `<job_name>.resource_class` キーに `macos.m1.large.gen1` を指定します。
[M1 Large](https://circleci.com/ja/product/features/resource-classes/#macos) のスペックは 8 CPU、12GB RAM となっており、400 credits/min で利用できます。しょうがないですが、macOS の中でも割高です（Large（100 credits/min）と比べてコスト 4 倍）。また、Scale プランでのみ利用できます。

GitHub Actions も M1 のランナーを用意しようとしているようですが、CircleCI の方が早かったですね。Mac でのジョブにスペック不足を感じている皆さんは使ってみましょう。

## Enable secret scanning alerts on all your public repositories | GitHub Changelog
https://github.blog/changelog/2023-02-28-enable-secret-scanning-alerts-on-all-your-public-repositories/

GitHub において Secret scanning を個人のパブリックリポジトリでも有効化できるようになりました。無料です。
やってて損はない機能だと思うので、みなさん有効化してみてください。

![](/images/productivity-weekly-20230308/enable_all_secret_scanning.png =600x)
*ちなみに setting から全てのリポジトリ(かつ今後の新規リポジトリ)に対して Secret scanning を有効化できます*

## Secret scanning changes coming to how you opt-in to alert notifications | GitHub Changelog
https://github.blog/changelog/2023-03-03-secret-scanning-changes-coming-to-how-you-opt-in-to-alert-notifications/

はい。またしても Secret scanning の話題です。
GitHub の Secret scanning において、通知の仕組みが変わります（3/16〜）。

これまでは通知が Dependabot email alerts という枠にあったため、Dependabot email alerts を on にしていればアラートがメールで来ていました。
しかし 3/16 からは Dependabot email alerts の枠を外れ、Watching という枠の email 通知を on にしないとシークレットスキャニングのアラートが受け取れなくなります。
なお、`on GitHub` では現状受け取れないようです。

Watching の email 通知を on にしちゃえばいいじゃんと思うかもしれませんが、リポジトリやらチームやらの通知が全て email に来るようになってめちゃくちゃ量が増えてめんどいので、正直 on にしたくありません（現状僕は Watching の `on GitHub` だけ有効にしています）。

僕みたいに考え、有効化しない人は、この変更で Secret scanning の通知が受け取れなくなるため、正直もはや機能の意味がありません。正直 Watching とは別枠にしてほしかったです。

これに関しての議論は見つけられませんでした。せめて `on GitHub` に対応してほしいですね。

## Hardware accelerated Android virtualization on Actions Linux larger hosted runners | GitHub Changelog
https://github.blog/changelog/2023-02-23-hardware-accelerated-android-virtualization-on-actions-windows-and-linux-larger-hosted-runners/

GitHub Actions の Large runner において、Linux で Android のテストにハードウェアアクセラレーションを使用できるようになりました。runner ユーザを KVM ユーザグループに追加することで使用できます。

Android のテスト速度に困っている方は試してみたいですね。Large runner 限定なのでどうしても料金がかかってしまうことに注意しましょう。

## GitHub Actions: Introducing faster GitHub-hosted x64 macOS runners | The GitHub Blog
https://github.blog/2023-03-01-github-actions-introducing-faster-github-hosted-x64-macos-runners/

GitHub Actions において、macOS ランナーの 12 コアインスタンスを準備中とのことです（private beta）。

既存の macOS ランナーは 3 コアとなっており、コア数だけ見ると 4 倍です。PyTorch はこの新しいランナーを使ってビルド時間を 1.5 時間から 30 分に短縮したと書かれています。

利用するには waitlist への登録が必要です。ただ、Team または Enterprise のプランを契約しているところのみが対象のようです。

> We only onboard Enterprises as whole entities or organizations with Team or Enterprise billing plans.
https://github.com/features/github-hosted-runners/macos-xl/signup

private beta に参加できたら `jobs.<job_id>.runs-on` へ `macos-12-xl` か `macos-latest-xl` を指定することで 12 コアの macOS ランナーを利用できます。
iOS アプリの CI などにはとても嬉しいかもですね。

また、記事の最後にはひっそりと Apple Silicon のインスタンスの用意も進んでることが示唆されています。

> We’ve started racking up and testing out Apple silicon-based machines in the hosted runner data centers.

どちらも早く使えるようになってほしいですね。

## Chrome’s Headless mode gets an upgrade: introducing `--headless=new` - Chrome Developers
https://developer.chrome.com/articles/new-headless/

Google Chrome のヘッドレスモードとヘッドフルモードの実装が統合され、ヘッドフルモードと完全互換になったとのことです。

実際に利用するためには `--headless=new` をオプションで付与する必要があります。まだヘッドレスモードにおけるデフォルトではありませんが、将来的にヘッドレスモードのデフォルトを新しいヘッドレスモードにする予定のようです。

個人的に、これまでなぜかヘッドレスの時だけテストが落ちるみたいなことが度々あったのですが、実装違ったんですね。知らなかったです。

記事によると Puppeteer、Selenium-WebDriver はすでに対応済みのようです。

:::message
僕は Playwright を主に使っているためそっちでも使えるか調べたところ、設定を工夫することで使うことはできました。しかし、debug 時にブラウザが表示されない問題がありました。
Issue もあったのですが、残念ながら解決せずにクローズされています...
現時点では古い headless と比べて遅すぎることなどから `--headless=new` に対応する理由がないっぽい感じでした。

> We will switch to it eventually, but at this point it is 30-50% slower than the stock headless. If you'd like this option to be enabled, please file a request explaining what you'd like and why you need headless=new to achieve it. We need to understand how many users need this new behavior and why in order to enable it.
https://github.com/microsoft/playwright/issues/21216#issuecomment-1446678795

:::

今後、デフォルトで新しいヘッドレスモードが使われるようになる予定があるらしいので、テストフレームワークなどで使いたい場合はそれを待つのがいいかもしれませんね。

## Version 2 release by kellertk · Pull Request #685 · aws-actions/configure-aws-credentials
https://github.com/aws-actions/configure-aws-credentials/pull/685

GitHub Actions から AWS に認証するためのアクションである aws-actions/configure-aws-credentials が v2.0.0 をリリースしました。

これまでは、deprecated になった Node.js 12 で動く v1 と、Node.js 16 で動く v1-node16 があったのですが、最新の変更は v1-node16 にしか入らず、v1-node16 はタグじゃなくてブランチのままという不思議な運用がされていました。この問題が、v2 リリースで解消されます。
（ちなみに v1-node16 はタグが作成され、v2 を指すようになるようです。v1-node16 ブランチを消したかったのかもしれません。）

v1 タグを使っている人は v2 タグを使うようにしましょう。

# know-how 🎓

## コスト安なCI環境を目指してオートスケールするCI環境を構築する - ISID テックブログ
https://tech.isid.co.jp/entry/2023/03/06/%E3%82%B3%E3%82%B9%E3%83%88%E5%AE%89%E3%81%AACI%E7%92%B0%E5%A2%83%E3%82%92%E7%9B%AE%E6%8C%87%E3%81%97%E3%81%A6%E3%82%AA%E3%83%BC%E3%83%88%E3%82%B9%E3%82%B1%E3%83%BC%E3%83%AB%E3%81%99%E3%82%8BCI%E7%92%B0

ISID さんによる、GitHub Actions セルフホストランナー事例です。ISID さんは philips-labs/terraform-aws-github-runner を使っています。
なぜセルフホストランナーなのか、なぜ actions-runner-controller じゃないのかなどの選定理由が詳細に書かれています。また、構築手順も書かれています。

個人的には、特に選定理由が大規模なセルフホストランナー環境構築をしようとしている人の参考になりそうだなと思いました。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Announcing Amazon ECS Task Definition Deletion | Containers](https://aws.amazon.com/jp/blogs/containers/announcing-amazon-ecs-task-definition-deletion/)
    - ECS のタスク定義の削除機能が追加されました
    - これまでは deregister はできたけど、削除はできませんでした
    - [コミュニティ](https://github.com/aws/containers-roadmap/issues/685)でも 2000 近い thumbs up を集めていた伝説の機能です。すごい
  - [Preferred 2FA methods and settings improvements | GitHub Changelog](https://github.blog/changelog/2023-02-22-preferred-2fa-methods-and-settings-improvements/)
    - デバイスごとに保存されていた二段階認証の設定が、アカウントごとに保存されるようになりました
    - この前デフォルト設定したじゃんって思うことがよくあったので嬉しいです
  - [GitHub Enterprise Server 3.8 is now generally available | The GitHub Blog](https://github.blog/2023-03-07-github-enterprise-server-3-8-is-now-generally-available/)
    - GHES 3.8 が GA になりました
    - GitHub Projects が使えるようになったり、required workflows が使えるようになったりします
- **know-how 🎓**
  - [Writing Terraform for unsupported resources | HashiCorp Blog](https://www.hashicorp.com/blog/writing-terraform-for-unsupported-resources)
    - 「terraform provider には実装されてないが API のサポートはされている」ようなリソースに対して TerraCurl というプロバイダでそのリソースを利用するという手法があるようです
    - provider への実装が遅い場合に使えそうだなと思う反面、これに頼るとつらそうなので provider の実装を待つのが良さそうだなと思いました
  - [ChatGPT APIリリースに伴ってOpenAIのAPIデータ利用ポリシーが改定されたので読んでみた | DevelopersIO](https://dev.classmethod.jp/articles/openai-data-usage-policy/)
    - 話題の ChatGPT を提供する OpenAI の API のポリシーが改定されたようですが、それを解説したクラメソさんの記事です
    - 思ったより色々変わったらしいので利用前に確認しておきたいですね
  - [時雨堂クラウドサービスを支える技術](https://zenn.dev/voluntas/scraps/208ba47e8445c3)
    - 時雨堂さんが提供しているクラウドサービスで使っている技術をまとめた記事です
    - バックエンドや CDN、テストや全文検索など、幅広く使っている技術を書いてくれています
    - こんなものがあるのかと参考になります
- **tool 🔨**
  - [「Slack」に「ChatGPT」アプリが登場、ベータ版の登録受け付けが開始 - 窓の杜](https://forest.watch.impress.co.jp/docs/news/1484105.html)
    - Slack 公式が Slack 向けの ChatGPT アプリを発表しました（プライベートベータ）
    - チャンネルやスレッドの会話を要約したりできるようです
    - 公式で出してくれると使いやすくていいですね

# あとがき
遅くなりましたが今週号でした。3/8、9 に大阪へ出張してたり、休日にスノボ行ったりで最近余裕がなく遅くなってしまいました。

そういえば、今年も生産性向上チームはサマーインターンを開催します。
まだ先の話で情報がほぼないですが、気になる方で該当者はどしどしご応募ください。

https://cybozu.co.jp/company/job/recruitment/intern/improvement.html

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
