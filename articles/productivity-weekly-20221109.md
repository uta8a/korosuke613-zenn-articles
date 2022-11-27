---
title: "Productivity Weekly (2022-11-09号) 簡易版"
emoji: "🎙"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221109"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 99 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
今月多忙のため Weekly を書く時間がさっぱり取れませんでした。
**いつもより分量少なめの簡易版**とします。ご了承ください。
:::

# news 📺

## JetBrains Aqua
https://www.jetbrains.com/ja-jp/aqua/

- JetBrains がテスト自動化用の強力な IDE こと JetBrains Aqua をリリースしました（プレビュー）
- > JetBrains Aqua は、IntelliJ IDEA、PyCharm、および WebStorm の言語固有の機能を組み合わせたテスト自動化エンジニア向けの強力なツールです。
  - とあり、テストコードを書いたり実行したりする際に活用できそうです
- 動画で書く機能が説明されています
- 個人的には組み込みのウェブインスペクタがとても便利そうです。ランダムにサンプルデータを用意できるのも気になります
- IDE とプラグインの両方が開発されています。ただ、プラグインの場合は機能が IDE より劣るようです
- まだプレビュー段階であるため、誰でも触ることができます。気になる人は使ってみてください

# know-how 🎓

## Datadog メトリクスモニター作成入門 - あらびき日記
https://abicky.net/2022/11/08/033441/

- Datadog におけるメトリクスモニター作成時の基本的な知識や知っておくと便利な知識をまとめた記事です
- メトリクスモニターはメトリクスを監視して設定した条件を満たせばアラート状態とし、Slack などで通知を行う機能です
- この記事では、メトリクスモニター作成方法の基本（クエリの定義、クエリの評価期間・評価方法・アラート条件、アラートのメッセージ設定）や Terraform 扱い時の注意点、豆知識（メトリクス定義の調べ方など）などが載っています
- 用語の定義から始まり、どういうふうに設定するとどういうモニターが作れるかをクエリ、データの具体例を交えて説明されており、モニターを触ったことがない人でもわかりやすいないようになっていると思います
- 豆知識の「モニターで使われているクエリの結果と評価値がずれることがある」はなんかズレてる気がすると思うことはあったのですが、ちゃんと調べたことはなかったので参考になりました
- メトリクスモニターを触ろうとしている人も、触ったことがある人も参考になる内容だと思います。雰囲気でメトリクスモニターを触っていたので、これを機にちゃんと勉強しようと思いました

## GitHub Actions self-hosted runners のオートスケーリング構成の紹介（クラウドサービス開発を支える CI の裏側） - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2022/11/04/084857

- GitHub Actions セルフホストランナーのオートスケーリング構築事例です
- 既存のリソースに最適化した仕組みにするために、OSS は使わず自力で仕組みを作ったとのこと
- Webhook を受け取ったら Docker コンテナを起動してランナー登録するというなかなかシンプルな作りとなっています
  - 既存の OSS として有名なのは [actions-runner-controller/actions-runner-controller](https://github.com/actions-runner-controller/actions-runner-controller) や [philips-labs/terraform-aws-github-runner](https://github.com/philips-labs/terraform-aws-github-runner) ですが、どちらも構成が複雑で、ユースケースによっては重いです
- ランナーを立ち上げるコントローラーとランナーの Dockerfile を一部公開してくれており、また、細かいオプションの説明などもあります。同じものを作りたい場合に参考になると思います

## Amazon ECS で実行するコンテナをローカルでテストする - Qiita
https://qiita.com/yoshii0110/items/9a84cdfd9bd27c802e9f

- Amazon ECS 向けコンテナをローカルで動かしてテストするためのノウハウが載った記事です
- ローカル実行するためのツールである amazon-ecs-local-container-endpoints と ecs-cli が紹介されています
- 何ができるかや何が嬉しいのかが書かれており、ツールの存在意義がわかりやすいです。また、実際に動かしてみた様子も載っているため、使い勝手のイメージがしやすいです
- 昔 ECS を触ったことがありますが、当時は毎回デプロイしてがんばって動作確認していたため、権限周りが足りなくてやり直すことが多かったです。amazon-ecs-local-container-endpoints を使えばある程度 ECS と同じ環境でテストできそうなので、だいぶ開発が楽になりそうですね

# tool 🔨

## feat(manager/asdf): add additional asdf supported tools by maennchen · Pull Request #18612 · renovatebot/renovate
https://github.com/renovatebot/renovate/pull/18612

- Renovate の .tool-versions 形式([asdf](https://asdf-vm.com/) で利用)対応が一気にされそうなプルリクエストです（マージ、リリース済み）
- これまで、.tool-versions 形式では Node.js のみ対応されていましたが、このプルリクエストでは主要な asdf プラグイン[^asdf-plugin]に対応します
- 注目すべきは [`upgradeable-tooling.ts`](https://github.com/renovatebot/renovate/pull/18612/files#diff-4b40c88f13a84683fe191cef5081b285c4d7b7ae88d761d25a7f01d215e099ab) で、各種プラグインの datasource や実際のパッケージ名が Record 形式でまとまっています。以前の状態と比べてすっきりとした実装になっており、新しいプラグインを増やしたい場合はここに各種情報を追記するだけで可能となります。コントリビューションもしやすくていいですね
- もしも今まで .tool-versions を手動(regex-manager など)で Renovate 管理していた場合、二重にプルリクが作られることになるので、対応が必要になります
- asdf がますます Renovate で利用しやすくなって良いですね

[^asdf-plugin]: awscli, bun, cargo-make, clojure, crystal, deno, direnv, dprint, elixir, elm, erlang, gauche, golang, haskell, helmfile, helm, hugo, idris, java, julia, just, kotlin, kustomize, lua, nim, nodejs, OCaml, perl, php, python, ruby, rust, scala, shellcheck, shfmt, terraform, trivy, zig

# あとがき
2022-11-09 号を 2022/11/27 に出してしまいました。大変遅くなってしまいすみません。

実は、つい先日、母校である宮崎大学のある講義でソフトウェア開発に関する講演をさせていただきました。
そのスライド準備などで忙しくてこんなに遅くなってしまいました。
2 年ぶりくらいに宮崎に行きましたが、やはり料理が美味しい上に安く、自然は多くとても良いところでしたね。
皆さんもぜひ行ってみてください。

https://twitter.com/shitimi_613/status/1596757177896960001

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
