---
title: "Productivity Weekly (2021-11-24号)"
emoji: "🎩"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20211124"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 52 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message alert
公開が非常に遅くなってしまい申し訳ありません。~~[アドベントカレンダー](https://korosuke613.hatenablog.com/entry/history-of-github-actions)を書いてたりしてました。~~
そのため、内容はあまり深掘りせずに簡単なものとなっています。ご了承ください。
:::

# news 📺

## AWS Graviton2 Processors を搭載した AWS Fargate for Amazon ECS を発表
https://aws.amazon.com/jp/about-aws/whats-new/2021/11/aws-fargate-amazon-ecs-aws-graviton2-processors/

AWS Fargate で Graviton2 を利用できるようになりました。Graviton 2 は ARM ベースのプロセッサなので、これにより Fargate で ARM ベースのコンテナを使えるようになりました。東京リージョンにもすでに対応しています。

x86 ベースの Fargate と比較して、パフォーマンスあたりの料金が 40% ほど改善、料金の直接比較でも 20% ほど安くなるとのことです。

M1 Mac が登場してから Arm 対応コンテナイメージがとても増えた印象です。これからは Fargate でも使えるようになったので、Arm ベースのコンテナ利用がさらに加速しそうですね。

## GitHub Actions: Cache size is now increased to 10GB per repository | GitHub Changelog
https://github.blog/changelog/2021-11-23-github-actions-cache-size-is-now-increased-to-10gb-per-repository/

GitHub Actions のキャッシュサイズがリポジトリあたり 5GB → 10GB に増えました。

例えば最近は Docker のレイヤーもキャッシングしやすくなった[^layar_caching]ので、5GB じゃ足りないというリポジトリは多いのではないでしょうか。
キャッシュが増えて大規模なモノレポなどで Actions が使いやすくなって良いです。

:::message
本音を言うと 10GB でもまだ足りない気がします。もっとほしい。
会ではお金出してキャッシュサイズ増やせたらいいのにねって話とかしてました。
:::

[^layar_caching]: Buildkit 登場前は大変（というよりほぼできなかった）でしたが、最近は割と簡単にできるようになりました。例：[Github Actionsでのdocker buildでキャッシュを有効にする](https://zenn.dev/74th/articles/c966c3bf389247https://zenn.dev/74th/articles/c966c3bf389247)

## Release v1.6.0 · aws-actions/configure-aws-credentials
https://github.com/aws-actions/configure-aws-credentials/releases/tag/v1.6.0

GitHub Actions で AWS の認証を簡単に行うための公式アクションである aws-actions/configure-aws-credentials の v1.6.0 がリリースされました。v1.6.0 では [OpenID Connect 対応](https://zenn.dev/korosuke613/articles/productivity-weekly-20210929#feat%3A-added-oidc-by-richardhboyd-%C2%B7-pull-request-%23262-%C2%B7-aws-actions%2Fconfigure-aws-credentials)の変更が入っています。

OIDC 対応自体は GitHub Actions の OIDC が正式リリース前後で master ブランチに入っていたのですが、なぜか長い間リリースはされていませんでした（リリース忘れてた？）。
ようやくリリースされたので、バージョンでアクションを指定しているところによって使いやすくなりました。

## Slack アプリの構築をより素早くシンプルにする次世代の機能 | Slack
https://slack.com/intl/ja-jp/blog/developers/faster-simpler-way-build-apps

Slack カスタムアプリをより素早くシンプルに構築できる次世代の機能として、Slack CLI と新しい SDK が発表されました（クローズドベータ）。

Slack CLI は新たなアプリ ID の作成やベストプラクティスに沿ったプロジェクトの作成、ローカル実行やデプロイが可能です。
新しい SDK は TypeScript で構築され、Deno ランタイムをターゲットとされています。

早く触りたいところですが、現在クローズドベータであるため申し込みが必要となっています（なぜか記事中にはベータであることが書かれていない）。気になる人はベータ版に申し込みましょう。

Slack アプリの開発が捗りそうですね。正式リリースが楽しみです。

![](/images/productivity-weekly-20211124/slack_cli_beta.png =500x)
*[Slack CLI の ダウンロード方法に関するページ](https://api.slack.com/future/tools/cli/download)。ベータ登録必要*

## Amazon Linux 2022 のプレビューの発表
https://aws.amazon.com/about-aws/whats-new/2021/11/preview-amazon-linux-2022/

Amazon Linux 2 の後継である Amazon Linux 2022 が発表されました（パブリックプレビュー）。すべての商用リージョンで利用可能です。

これまでと違い、今後は 2 年ごとにメジャーアップデートし、5 年間の長期サポートが付きます。また、AL2022 ではパッケージリポジトリのロック機能が提供されるとのことです[^lock]。

Amazon Linux 勢には外せないニュースですね。

[^lock]: ちょっとまだよくわかってない。

# know-how 🎓

## Repro のサーバーサイド開発環境を M1 Mac に対応させるまでの道のり - Repro Tech Blog
https://tech.repro.io/entry/2021/11/19/150000

プロダクトのサーバサイド開発環境を AppleSilicon 搭載 Mac 対応させるためにやったことを紹介してくれている記事です。

コンテナイメージが ARM に対応してなかったり、[QEMU](https://www.qemu.org/)（エミュレータ）経由で AMD 向けコンテナが起動してしまってパフォーマンスがとても遅くなってしまったりという問題にどう立ち向かったかが書かれており、似たような問題にハマった際、参考になりそうです。

AppleSilicon 搭載 Mac が登場してから結構経ち、さまざまなプロダクトやミドルウェアが AppleSilicon 対応されていっていますが、それでもまだまだ実際に使う際に問題は出てきそうです[^m1]。こういったノウハウの共有はありがたいですね。

[^m1]: 僕はまだ M1 Mac を持ってないので早くほしいです。金、金がほしい。

## オープンソースのガバナンス | 川口耕介のブログ
https://ja.kohsuke.org/software/open-source-governance/

自身が運営する OSS プロジェクトで貢献してもらいやすくするためにどうしたらいいのかという話です。

外部貢献者にとって OSS プロジェクトへの貢献の敷居が高くなってしまうのはなぜか、どうしていけばいいのかが説明されています。OSS プロジェクトの作法について、中の人目線、外の人目線の話の両方があり、OSS プロジェクトを運営している人におすすめしたい内容です。

僕も自分の開発しているライブラリを OSS としていたり、どこかの OSS に貢献したりすることがあり、中と外、両方の立場を経験しているのですが、あまりそれらを紐づけたことがなかったので良い学びとなりました。実践していきたい。

## GitHub Actions で zsh の起動時間を定点観測する
https://zenn.dev/odan/articles/17a86574b724c9

CI で Zsh の起動時間を継続的に計測してパフォーマンス低下を抑える試みです。Zsh 起動時間の計測方法と GitHub Actions でグラフ化するためのアクションと設定方法、起動時間をアクションへ渡す形式にするためのスクリプトが紹介されています。

シェルを改造していくと気づいたら起動までが遅くなってがちです。気づいたときにはどこで遅くなったのかよくわからないので、コミットごとに起動時間を計測するのは良い試みだと思いました。

僕もベンチマーク取るようにしてみました。Zsh 呼び出し時に `TERM_PROGRAM` がセットされてなくてコケるので `env` で明示的に `TERM_PROGRAM: Apple_Terminal` をセットしています。
https://github.com/korosuke613/dotfiles/blob/ccce8d46d17eb9f4e3cf748e69e54977fb860f22/.github/workflows/benchmark.yaml#L18

# tool 🔨

## Fig | 🎉 Launching Fig
https://fig.io/blog/post/launching-fig

[以前紹介した](https://zenn.dev/korosuke613/articles/productivity-weekly-20210512#withfig%2Fautocomplete%3A-fig-adds-vscode-style-autocomplete-to-your-terminal)、Fig（ターミナル上でコマンドの補完内容をリッチに出すアプリケーション）が正式にリリースされました。

以前まではクローズドベータということで、waiting リストに登録して待つ必要がありましたが、これからは誰でも利用できます。

僕はクローズドベータの頃から利用しているのですが、なかなか良いです（ときたま不安定になるけど）。

未対応コマンドを対応させるためには [withfig/autocomplete](https://github.com/withfig/autocomplete) にプルリクを飛ばせばいいのですが、補完設定は TypeScript で簡単に書けるので、自分がよく使うコマンドの補完もすぐにできます。僕も 3 つ補完追加のプルリクを送ったので、よければ参考にしてください。

- [feat: add limactl completion spec by korosuke613 · Pull Request #673 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/673)
- [feat: add asdf completion spec by korosuke613 · Pull Request #677 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/677)
- [feat: add direnv completion spec by korosuke613 · Pull Request #681 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/681)

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Preview the Markdown rendering of gists | GitHub Changelog](https://github.blog/changelog/2021-11-17-preview-the-markdown-rendering-of-gists/)
  - GitHub の Gist でマークダウンをプレビュー表示できるようになりました
  - 地味に嬉しいですね
- [Custom footers on GitHub Enterprise Cloud | GitHub Changelog](https://github.blog/changelog/2021-11-23-custom-footers-on-github-enterprise-cloud/)
  - GitHub Enterprise Cloud にフッターをカスタマイズする機能が追加されました
  - 今のところリンクを表示するぐらいのようです

# あとがき
冒頭でも書きましたが、公開が非常に遅くなってしまい申し訳ありませんでした。アドベントカレンダーを書いてたり、プライベートが忙しかったりで、全然 Weekly を書く時間を確保できませんでした。2021/12/01 号も遅れてるので、早めに書きます...

ちなみにアドベントカレンダーをもう1つ出す予定なのでまた遅れそうです...すみません😭

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

:::message
今週のおまけはお休みです...
:::