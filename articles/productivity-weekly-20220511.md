---
title: "Productivity Weekly (2022-05-11号)"
emoji: "🍓"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220511"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 73 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Supercharging GitHub Actions with Job Summaries | The GitHub Blog
https://github.blog/2022-05-09-supercharging-github-actions-with-job-summaries/

GitHub Actions にジョブサマリ機能が追加されました。ワークフロー画面に任意のマークダウンをジョブごとに表示できます。

使い方は簡単で、`$GITHUB_STEP_SUMMARY` 環境変数に Markdown をリダイレクト（書き込み）するだけです。

これまでも [`repos/:owner/:repo/check-runs`](https://docs.github.com/ja/rest/checks/runs#create-a-check-run) API などを叩いてコミットにひもづくサマリーを作ることはできました[^check_runs]が、それよりも遥かに簡単にサマリーを作ることができるのがこの変更の良いところです。

テスト結果のレポートや手順書を生成するジョブなどに使えそうです。嬉しいですね。

[^check_runs]: API を叩く以上結構めんどかった。

## Announcing Compose V2 General Availability - Docker
https://www.docker.com/blog/announcing-compose-v2-general-availability/

Docker Compose v2 が GA になりました。

去年 Docker Compose v2 がリリースされ、正式公開されたのかと思ってた方が多かったと思いますが、実はまだ正式公開はされてなかったようです。

:::message
自分はもうとっくに正式リリースされているものだと思っていました。
https://twitter.com/Shitimi_613/status/1511284375291367424
:::

Docker Desktop はすでに v2 を同梱しているので、Docker Desktop 利用者は別途インストールする必要はありません。また、docker-compose コマンドは、docker compose のエイリアスとなっているようです。

v1 との互換性は高いですが、[一部互換性のない部分がある](https://www.docker.com/blog/announcing-compose-v2-general-availability/#:~:text=Ensure%20Compatibility%20Between%20V1%20and%20V2)ので、そこは確認しておきましょう。v1 は非推奨となりますが、2022/10 までは重大なバグの修正が行われるようです。

新たな compose.yaml の書き方については[以前まとめてくれている記事を取り上げた](https://zenn.dev/korosuke613/articles/productivity-weekly-20220330#docker-compose-v2%E3%81%A7%E5%A4%89%E3%82%8F%E3%81%A3%E3%81%9Fdocker-compose.yml%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9)のでそちらをご覧ください。

まだ v1 を使っている方は早めに v2 へ移行していきましょう。

## Docker Extensions: Discover, Build & Integrate New Tools into Docker Desktop - Docker
https://www.docker.com/blog/docker-extensions-discover-build-integrate-new-tools-into-docker-desktop/

Docker Desktop に Docker Extensions 機能が追加されました（ベータ）。Docker Desktop に 3rd party の拡張機能を追加できる機能で、v4.8 から使えます。既に Red Hat や VMware などが拡張機能を提供しています。

Docker Desktop の UI 上から公開されている extension を追加でき、利用も UI 上からできます。また、Extensions を開発するための SDK も公開されています。

実際に Disk Usage という拡張機能を入れてみました。グラフでディスク使用量の内訳を表示できます。
https://twitter.com/Shitimi_613/status/1524200438199091202?conversation=none

手軽にインストールできて UI に統合されるのは便利ですね。他にもイメージのセキュリティスキャンを行う Trivy などがありました。まだ Marketplace の拡張機能は少ないですが、今後に期待ですね。

## The GitHub Enterprise Server 3.5 Release Candidate is available | GitHub Changelog
https://github.blog/changelog/2022-05-10-the-github-enterprise-server-3-5-release-candidate-is-available/

GitHub Enterprise Server 3.5 の Release Candidate が来ました。

- [リリースノート](https://docs.github.com/en/enterprise-server@3.5/admin/release-notes#3.5.0.rc1)

新機能が豊富です。

- Container Registry（public beta）
- Dependabot が GA
- GitHub Actions
  - OIDC 対応
  - internal なリポジトリでのアクションの共有
  - Reusable Workflow
  - キャッシュのサポート
  - 一部のジョブだけ Re-run
- など

特に GHES の GitHub Actions で actions/cache がサポートされたのが嬉しいですね。これまでは使えなかったため自前でキャッシュの仕組みを整える必要がありました。

しかし、GHES はクラウド版 GitHub への追従速度が速いですね....すごいです。

## Node v16 Released 🎉 · Issue #14 · aws/aws-lambda-base-images
https://github.com/aws/aws-lambda-base-images/issues/14#issuecomment-1120864028

AWS Lambda において、Node.js v16 が使えるようになりました。しかしまだ GA ではありません。

現在は CLI から直接 "nodejs16.x" を指定するなど、API を叩けば使えますが、コンソールからの利用はまだできません。これまではコンソールや API やマネージドサービスの足並みが揃ってからリリースしていたようですが、今回は実験的に準備ができたところからリリースをしているようです。

なお、3rd party ツールである[Vercel](https://github.com/vercel/vercel/releases/tag/vercel@24.2.1) や [Serverless Framework](https://github.com/serverless/serverless/releases/tag/v3.17.0) は既に Node.js v16 対応をリリースしています。

まだ GA とはなっていないため本番利用はなんとも言えませんが、コンソールを使わないのならさっさと v16 を使うようにしても良いかもですね。

Node.js v16 で使えるようになった機能は別にしんどくないブログさんがよくまとめてくれています。個人的には AbortController が使えるようになるのが嬉しいですね。

- [Node.js v16 の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2021/04/22/090000)

# tool 🔨

## test-summary/action: Show a helpful summary of test results in GitHub Actions CI/CD workflow runs
https://github.com/test-summary/action

最近追加された GitHub Actions のジョブサマリにテスト結果を表示するアクションです。JUnit XML と [TAP](https://testanything.org/) 形式に対応しています。

[example](https://github.com/test-summary/examples) のリポジトリがあり、サマリの例が確認できます。

![](/images/productivity-weekly-20220511/c_testing_summary.png =400x)
*C 言語（Clar test framework）のテスト結果 (https://github.com/test-summary/examples/actions/runs/2296021353#summary-6357379930)*

何割のテストが成功/失敗してるかのグラフと、失敗したテストの詳細が表示されています。

:::message
ちなみにこのグラフは `svg.test-summary.com` にパラメータを渡してグラフを出しているようです。わざわざ Web アプリを作ったんですね。凝っている...
:::

アクションとなっているため利用は簡単で、アクションを呼び出して引数に XML のパスを渡すだけです。

ジョブサマリ機能は最近追加されたばかりですが、リポジトリ自体は 2 ヶ月前から作成されています。どうやら GitHub の PdM が作ってるようです。通りで...

気軽に利用できるのが嬉しいですね。気になる人は使ってみてください。

## Sokrates - polyglot source code examination tool
https://www.sokrates.dev/

Sokrates（ソクラテス）はソースコードのドキュメンテーションや解析ができるツールです。

ソースコードをリポジトリ、Organization 単位で解析し、さまざまなメトリクスを可視化してくれます。

どういう内容かは Examples を見るのが早いです。Linux や Amazon、GitHub などさまざまな組織の解析結果が公開されています。

こういう解析はどう上手く使うかが課題になる気はしますが、こういうのを組織内で用意してみてもいいかもしれませんね（誰かが面白い結果を見つけてくれるかも）。Private なリポジトリも解析できるので、必ずしも OSS プロジェクトのみを対象にする必要はありません。有効活用したいですね。

### おまけ：僕の GitHub アカウント([korosuke613](https://github.com/korosuke613))も解析してみました

![](/images/productivity-weekly-20220511/korosuke613_sokrates.png =400x)
*試しに僕の GitHub アカウント（korosuke613）を解析してみました*

実際の解析結果を外から見られるようにしてみました。user の解析なのであんまり面白くない。（予告なく非公開にする可能性があります。）

- http://korosuke613-sokrates.s3-website-ap-northeast-1.amazonaws.com/_sokrates_landscape/index.html


:::details 生成のために具体的にやったこと

まずは [zeljkoobrenovic/sokrates-oss-landscape-analysis](https://github.com/zeljkoobrenovic/sokrates-oss-landscape-analysis/) を clone する。

次に analysis-scripts/config.json を書き換える。Personal Access Token は何の権限も必要なかった。API の rate limit 回避用のためと思われる。


```json:analysis-scripts/config.json
{
  "githubCloneUrl": "https://github.com",
  "githubApiUrl": "https://api.github.com",
  "githubToken": "<GITHUB_PERSONAL_ACCESS_TOKEN>",
  "reposUpdatedAfter": "2017-01-01",
  "pullsCreatedAfter": "2017-01-01",
  "sokratesJarFilePath": "/tmp/sokrates-LATEST.jar",
  "javaOptions": "-Xmx8G",
  "githubOrgs": [
    "korosuke613"
  ],
  "ignore": [
    {
      "org": "",
      "repo": "korosuke613.github.io"
    }
  ]
}
```

このままだと org が対象となっているため、analysis-scripts/github-repos-finder/get-repos.js を一部以下のように書き換える。

```diff js:analysis-scripts/github-repos-finder/get-repos.js
@@ -6 +6 @@
- const gitRepoPrefix = config.githubApiUrl + '/orgs/';
+ const gitRepoPrefix = config.githubApiUrl + '/users/';
```
https://github.com/zeljkoobrenovic/sokrates-oss-landscape-analysis/blob/dd350dff1983f3d7125979fa7326eee539c2a3f5/analysis-scripts/github-repos-finder/get-repos.js#L6

shell 実行。

```
bash run.sh
```

`analysis-artifacts/reports/korosuke613/_sokrates_landscape/index.html` を開くと解析結果ページが表示される。
:::

なんかおもしろグラフも出せるよ。

https://twitter.com/Shitimi_613/status/1525704972222234624


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [[速報]  サーバーレス実行環境である Cloudflare Workers のオープンソース化が発表されました！ | DevelopersIO](https://dev.classmethod.jp/articles/cloudflare-workers-a-serverless-runtime-environment-is-now-open-source/)
    - サーバーレス実行環境である Cloudflare Workers が OSS 化するとのこと
    - まだ発表があっただけでリポジトリは公開されていません
    - 自前でサーバーレス実行環境を作れるのは面白そうですね。楽しみ
  - [GitHub Actions: Beta of Ubuntu 22.04 for GitHub-hosted runners is now available | GitHub Changelog](https://github.blog/changelog/2022-05-10-github-actions-beta-of-ubuntu-22-04-for-github-hosted-runners-is-now-available/)
    - GitHub Actions に Ubuntu 22.04 が来ました（ベータ）
    - `ubuntu-latest` はまだ 20.04 のまま
    - 20.04 と 22.04 の環境で入ってるソフトウェアの違いはこちらの issue にまとまってる。https://github.com/actions/virtual-environments/issues/5490
  - [［速報］「Docker Desktop for Linux」が登場、WindowsやMac版と同じ機能や操作を提供、Raspberry Pi OSにも対応 － Publickey](https://www.publickey1.jp/blog/22/docker_desktop_for_linuxwindowsmacraspberry_pi_os.html)
    - Docker Desktop の Linux 版が登場
    - Linux 版だけどセキュリティ上の理由で VM 内での実行になるとか
      - https://twitter.com/mattn_jp/status/1524181302806970369
  - [1Password 8 for Mac comes with Universal Autofill and a big redesign - The Verge](https://www.theverge.com/2022/5/3/23055212/1password-8-mac-password-manager-security)
    - 1Password 8 for Mac がネイティブアプリへの自動入力に対応しました
    - 便利
  - [ついにKubernetesからDockershimが正式に削除、Docker Engineのサポートが終了。今年最初のKuberenetes 1.24正式版がリリース － Publickey](https://www.publickey1.jp/blog/22/kubernetesdockershimdocker_enginekuberenetes_124.html)
    - k8s 1.24 から Dockershim が入らなくなりました
    - クラスタを自前で用意してる人なんかには影響ありそう
    - マネージドサービスを使ってる人にはほぼ影響ないと思う
- **know-how 🎓**
  - [〜スタートアップの人たちに捧ぐ〜 監視再入門 in AWS - Speaker Deck](https://speakerdeck.com/track3jyo/startup-monitoring-aws2022)
    - AWS の中の人による、AWS 上に構築したサービスの監視に関するスライド
    - なぜ監視するのか、監視の種類、重要な軸、ありがちなアンチパターン、AWS 上で小さく的確に監視していく方法、次のステップなどが説明されている
  - [AWS全体のセキュリティ管理と快適なセキュリティ運用 - Speaker Deck](https://speakerdeck.com/cmusudakeisuke/awsquan-ti-falsesekiyuriteiguan-li-tokuai-shi-nasekiyuriteiyun-yong)
    - クラメソさんによる AWS のセキュリティに関する発表
    - AWS を直接使う人には「絶対おさえておく AWS セキュリティ基礎」、AWS を使う仕組みを作る人には「組織の仕組みに組み込むセキュリティ」、AWS を使える人を育成する人には「AWS 学習のお役立ちコンテンツ」が持ち帰れるとのこと
  - [なるべく楽したいAWSセキュリティ](https://slides.com/kokuyouwind/aws-startup-community-202205)
    - Leaner Technologies Inc.さん所属の方による AWS のセキュリティに関する発表
    - なるべく楽しながら AWS 利用を安全にしていくためにやれることを紹介している
- **tool 🔨**
  - [IaSQL](https://iasql.com/)
    - AWS インフラを SQL で管理するサービス
    - SQL に親しみのある方にとっては...いいのかも
  - [Helmwave](https://github.com/helmwave/helmwave)
    - Helm チャートのデプロイを簡単にするツール
    - ~~Helm チャートを作ったことないから正直あんまりわからない~~
  - [無料で使えるデータベースUpstashをご存知、ないのですか！？](https://zenn.dev/tkithrta/articles/a56603a37b08f0)
    - Redis を提供する DBaaS、Upstash の紹介記事
    - 比較的無料枠が大きいとのこと
    - Weekly では
      - Upstash のデータが EBS に載っていることについて、永続化して使うためのデータベースとしてそれでええんか...？というお話になりました
        - https://docs.upstash.com/redis/features/durability
      - kafka のマネージドサービスは珍しいという話にも

# あとがき
先週号（2022/05/04 号）はゴールデンなウィークだったためお休みでした。みなさん GW はいかがお過ごしでしたか？僕はほぼゴロゴロしてて、1 日だけレンタサイクルを 20km 漕いで次の日に響きました。

:::message
生産性向上チームは今年の夏にインターンを開催するので、興味があればエントリーしてください（~~4/22 エントリー開始~~→生産性向上コースのインターンは 5/23 からでした。すみません）。

- [生産性向上 - デザイン&リサーチ - サイボウズインターンシップ&イベント 2022 エンジニア&デザイナー | サイボウズ株式会社](https://cybozu.co.jp/company/job/recruitment/intern/improvement.html)
:::

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏
今週のおまけです。

### 未経験から100話でキラキラWEBデザイナーを諦めるかけだしちゃん完結「最初からずっと不穏だ…」 - Togetter
https://togetter.com/li/1883380

未経験から 100 話でキラキラ Web デザイナーを諦める連載漫画です。最近完結しました。

こういう駆け出し界隈の話にはあまり首を突っ込まないようにしているのですが、面白い漫画だったため共有します。現実はこんな感じがほとんどなんだろうな〜という印象でした。

（このお話は Web デザイナー（用語として合ってるかは知らん）を目指す人に主眼を置いてますが）プログラマーなんかに憧れてる人はちょくちょく周りでもみます。どうすれば未経験からプログラマーなれるの？ってたまに聞かれますが、実際どうすればいいんですかね。

正直、個人的な思想としては、情報系の大学通うのが良いよって言いたくなるんですが、実際のところ時間も金もかかるんでそこまでする人は珍しい（相当な覚悟を持ってる）ですよね。だから Progate なんかを触ってみて、楽しければ自然と探求し始めて仕事にまで持ってけるよって適当なことを言いがちです。そもそもプログラミングとか情報工学を楽しめないと続きませんからね。

この漫画のように質の悪いなんちゃってコーダーを量産する界隈は正直好きではありません。もちろんそこから立派なソフトウェアエンジニアになる方もいるとは思うし、中には素晴らしいスクールがあることもわかっています。あくまで未経験者を金ヅルとしてしか見ていない、食い物にしようとしているところに嫌悪感を抱いているという話です。

この界隈の話を始めると負の感情があふれてくるのでこれくらいにしておこう...

もし未経験でソフトウェアエンジニア系を目指す人はその筋の友人に相談するのが良いと思います。

