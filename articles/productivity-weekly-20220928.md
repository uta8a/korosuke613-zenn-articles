---
title: "Productivity Weekly (2022-09-28号)"
emoji: "🪬"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220928"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 93 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今週号、ネタ少なめです。
:::


# news 📺

## Enterprise fork policies for organizations | GitHub Changelog
https://github.blog/changelog/2022-09-27-enterprise-fork-policies-for-organizations/

GitHub Enterprise において、Enterprise レベルでの fork 制限を Organization レベルでさらに狭められるようになりました。

先日、[Enterprise の Owner は Enterprise 内リポジトリに対してフォークポリシーを設定できるようになりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220629#improved-innersource-collaboration-and-enterprise-fork-policies-%7C-github-changelog)が、今回の変更で、Organization でもフォークポリシーを設定できるようになりました。

Organization のフォークポリシーは Enterprise のフォークポリシーが許可する範囲内で追加の制限ができます。

これにより、例えば社内でも機密性の高い Organization が Enterprise のフォークポリシーよりも制限を強めたい場合に、Organization と Enterprise 双方がある程度のオーナーシップを持ってポリシーを設定できるのが嬉しいですね。覚えておきたいです。

## GitHub Actions: Dynamic names for workflow runs
https://github.blog/changelog/2022-09-26-github-actions-dynamic-names-for-workflow-runs/

GitHub Actions において、workflow runs 名を設定できるようになりました。

設定方法は `run_name` に値を書くだけです。`github` コンテキストと `inputs` コンテキストが利用できます。また、`run_name` を指定しなかった場合のデフォルト値はこれまで通りコミットメッセージなどになります。

workflow runs 名って何？という方は実際の画像を見るとなんとなくわかると思います。

![](/images/productivity-weekly-20220928/run_name.png =600x)
*`name` で設定した値は `workflow` 名に、`run-name` で設定した値は `workflow runs` 名に*

`name` はワークフローの種類、`run-name` はワークフローの実行ごとの名前といった風に考えるとわかりやすいかもしれません。上記の画像の例では `run-name: Execute by ${{ github.event_name }} by @${{ github.actor }}` を設定しています。

:::details フルのソースコード

https://github.com/korosuke613/playground/blob/4c4953260f3c8b155a5e0b5a9d9319abe9f08a4d/.github/workflows/dynamic-workflow-run-name.yaml

:::

デフォルトではコミットメッセージなどが表示されるため、例えば 1 つのワークフローにおいてデプロイ先が実行ごとに異なる場合などにどのデプロイ先か見分けるのが面倒といった問題がありました。

今回の変更でどのようなワークフローの実行なのかをわかりやすく設定できるようになって良いですね。活用したいです。

## Cloudflare Queues: globally distributed queues without the egress fees
https://blog.cloudflare.com/introducing-cloudflare-queues/

Cloudflare がメッセージキューサービス Cloudflare Queues を発表しました。メッセージキューサービスはメッセージの受け取りと配信を行うサービスで、配信後に処理が失敗したらメッセージを再送したり、配信先を調整して処理を分散させたりできます。

既存の類似のサービスとしては、AWS の場合は Amazon SQS、GCP の場合は Cloud Pub/Sub があります。Cloudflare Queues の特徴としては、Cloudflare Workers との相性が良いことや、ネットワーク帯域幅料金が発生しないことが挙げられます。特にネットワーク帯域幅料金が発生しないのは驚きで、他のサービスと比べて利用コストを大幅に下げられる可能性があります[^amazon_sqs]。

Cloudflare は最近さまざまな新発表をしていますね。継続的に調べていきたいです。

[^amazon_sqs]: 例えば Amazon SQS は単一リージョンで特定サービスとの通信であれば料金が発生しないため、必ずしも Cloudflare のコストが下がるとは限りません。

# know-how 🎓

## Cloudflare Workersのランタイム「workerd」を触ってみた - ゆーすけべー日記
https://yusukebe.com/posts/2022/workerd/

先日 Cloudflare Workers が OSS 化されました。この記事は、公開されたランタイム workerd を触ってみたという記事です。

記事では、workerd のブログ記事の翻訳、workerd を動かす、ベンチマーク、Cloudflare Workers の機能を使ってみる、複数の Worker を立ち上げる、バイナリ化などが書かれています。実際に触ってみないとわからないようなことが書かれていて、workerd を触る際に参考になりそうです。

Weekly 参加者によると、Cloudflare Workers のローカル開発がしやすくなったのがやはり嬉しいようですね。いちいちデプロイしなくても開発できるのはだいぶ開発スピードが上がりそうです。Cloudflare Workers 利用者は workerd 利用時に参考にできると思います。

## Slackの次世代プラットフォームを試してみた – TravelBook Tech Blog
https://tech.travelbook.co.jp/posts/slack-deno-api/

[去年公開された Slack の次世代プラットフォーム](https://zenn.dev/korosuke613/articles/productivity-weekly-20211124#slack-%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AE%E6%A7%8B%E7%AF%89%E3%82%92%E3%82%88%E3%82%8A%E7%B4%A0%E6%97%A9%E3%81%8F%E3%82%B7%E3%83%B3%E3%83%97%E3%83%AB%E3%81%AB%E3%81%99%E3%82%8B%E6%AC%A1%E4%B8%96%E4%BB%A3%E3%81%AE%E6%A9%9F%E8%83%BD-%7C-slack)がパブリックベータになったので、それを試してみたという記事です。

この記事では、次世代プラットフォームの特徴（クラウドで動作、CLI、Deno、Datastore など）、アプリ開発・デプロイ、使ってみた感想などが載っています。

従来のアプリよりもだいぶ開発者体験がよくなってそうですね。個人的にはサーバを別途用意しなくてよかったり Deno でセットアップが楽だったりするのが特に嬉しいです。

軽く触ってみたいところですが、現状として Workspace が有料プランでないとデプロイできないようです[^beta]。残念。ちなみに僕はクローズドベータに申し込んでいたのですが、招待されることもパブリックベータになったことも何も連絡は来ませんでした。悲しい。無料版のワークスペースだったからかもしれない。

Slack Bot 開発がだいぶ楽になりそうなので、GA を待ちたいですね。次世代プラットフォームで開発する際はこの記事がとても参考になりそうです。

[^beta]: そもそも有料プランじゃないとワークスペースでベータ版を有効にできなかった。会社とかのワークスペースでベータ版を有効にするのハードル高いんだよね「Slack customers on any paid plan can participate in the beta. Before you begin, an admin or owner of your workspace needs to have accepted the Slack Platform and Beta Service Terms here.」https://api.slack.com/future/faq#beta-reqs


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [GitHub Actions の Workflow の改変を防ぐ](https://zenn.dev/shunsuke_suzuki/articles/gha-trigger-action)
    - GitHub Actions の Workflow 改変を防ぐための手法を紹介している記事です
    - ちょっと重いなという感想です
  - [手を動かして学べるAWSの日本語講座まとめ　AWS日本法人が公開　165コンテンツを一覧に - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2209/27/news179.html)
    - AWS 日本法人が AWS の日本語講座まとめページを公開しました
    - 媒体はさまざまみたいですが、公式がまとめてくれてるのは嬉しいですね

# あとがき
だいぶネタ少なめな今週号でした。たまにこういう週があります。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
