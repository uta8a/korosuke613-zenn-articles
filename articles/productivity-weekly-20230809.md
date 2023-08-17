---
title: "Productivity Weekly (2023-08-09号)"
emoji: "🎮"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230809"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-09 単独号です。

今回が第 121 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu) **← New!**

---

！？
[@r4mimu](https://zenn.dev/r4mimu) さんが共同著者として初登場です！
よろしくお願いします！
:::

# news 📺

## GitHub Actions: Required Workflows will move to Repository Rules - The GitHub Blog
https://github.blog/changelog/2023-08-02-github-actions-required-workflows-will-move-to-repository-rules/

GitHub Actions の Required Workflows が Repository Rules 内の機能に移行します。
2023/09/20 より Repository Rules から Required Workflows を設定できるようになり、かつ、既存の Required Workflows は自動的に Repository Rules に移行されていきます。2023/10/18 以降は既存の Required Workflow の画面にアクセスできなくなるようです。
GitHub Enterprise Server の場合はバージョンによって影響が異なります（対応はそれほどしなくて良さそう）。

required workflow は Organization を横断して必須のワークフローを設定できる機能です（private beta）。以前の Weekly でも取り上げているので、そちらも参照ください（[1](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230111#github-actions-%E2%80%93-support-for-organization-wide-required-workflows-public-beta), [2](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230315#github-actions---required-workflows-improvements-%7C-github-changelog)）。


*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Introducing code referencing for GitHub Copilot - The GitHub Blog
https://github.blog/2023-08-03-introducing-code-referencing-for-github-copilot/

GitHub Copilot において、パブリックなコードに一致するコードの提案を検出して表示する機能が追加されました（private beta）。

具体的には、提案の周囲約 150 文字のコードをチェックし、GitHub.com 上の全てのパブリックなコードのインデックスと比較し、マッチしたコードおよびリポジトリ情報（場所やライセンス）をエディタに表示します。その情報を見て、マッチしたコードを含む提案をブロックするか、許可するかを選択できるとのことです。

プライベートベータであるため、利用するには waitlist への登録が必要です。

https://twitter.com/Shitimi_613/status/1688741942484729857?conversation=none

ちなみに GitHub Copilot for Business ユーザは waitlist に入れませんでした。

なお、GitHub Copilot には、提案とその周囲約 150 文字のコードが GitHub.com 上のパブリックコードと一致する場合、その提案をブロックする機能があります。

> GitHub Copilot includes a filter which detects code suggestions matching public code on GitHub. You can choose to enable or disable the filter. When the filter is enabled, GitHub Copilot checks code suggestions with their surrounding code of about 150 characters against public code on GitHub. If there is a match or near match, the suggestion will not be shown to you.
https://docs.github.com/en/enterprise-cloud@latest/copilot/configuring-github-copilot/configuring-github-copilot-in-your-environment#enabling-or-disabling-duplication-detection-2

有効化している方が多いと個人的に思っているのですが、今回 private beta で入る機能との関係性はどうなるんでしょうね。

今回の機能を使うことで、GitHub.com 上のパブリックなコードと意図せず一致してしまう事態を防げるようになるのは良いですね。早く GA になってほしいです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Codespaces gives you a free upgrade - The GitHub Blog
https://github.blog/changelog/2023-08-04-codespaces-gives-you-a-free-upgrade/

2023/08/04 より GitHub Codespaces の CPU とメモリスペックが向上しました。
具体的には、4 コア以上の CPU をもつ Codespaces では RAM が 2 倍に、CPU 性能が 30% 向上しており、料金は変わらないとのことです。
ただし、2 コアの Codespaces については現時点ではアップグレードされていないようなので注意です。

手動で設定等を変更する必要はなく、自動的に適用されているので単純にユーザーにとって嬉しいアップデートです。


*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## Codecov is now open source - Codecov
https://about.codecov.io/blog/codecov-is-now-open-source/

コードカバレッジの計測・可視化サービスを展開している Codecov が Business Source License 1.1 (BUSL) でソフトウェアを公開しました。

BUSL は、ソースコードは公開するが商用利用に制限のかかるライセンスです。条件は物によって異なるので、詳しくは [Codecov が実際にリポジトリに置いている LICENSE](https://github.com/codecov/self-hosted/blob/56962d4d05ce6b710f83a0d6d47a7ea221c1a64c/LICENSE) を参照してください。（競合サービスに使う場合は制限がかかるっぽい。）

BUSL になるプロジェクトは API、ワーカー、フロントエンド、共通ライブラリ、docker-compose のサンプルになります。

docker-compose はセルフホストの商用サービスを辞める代わりに提供するもののようです。FAQ によると、高可用性を求める人は自前で docker-compose をベースにカスタムするか、クラウドの商用サービスを契約してね、というスタンスのようです。

これまではクローズドソースであったため、BUSL で公開されて困る方はほとんどいないと思います。セルフホストできるのは利用者側からすると嬉しいですね。
利用する際はライセンスをよく読み問題が発生しないように利用しましょう。

:::message
タイトルおよび本文には Codecov がオープンソースになったとありますが、BUSL 1.1 をオープンソースと呼んだことで色々お叱りを受けたようです。

本文頭にも書かれていますが、それについてのフォローアップ投稿もあるので、そちらも読むと BUSL とオープンソースへの理解が深まるかもしれません。

- [Let's Talk About Open Source | Product Blog • Sentry](https://blog.sentry.io/lets-talk-about-open-source/)
:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## The GitHub Enterprise Server 3.10 Release Candidate is available
https://github.blog/changelog/2023-08-08-the-github-enterprise-server-3-10-release-candidate-is-available/

GitHub Enterprise Server 3.10 でリリースされる機能の RC が公開されました。以下に新機能候補の一部を列挙します。

- Code Scanning configuration can be customized per repository
- Fine-grained personal access tokens (PAT) are now available as a public beta on Enterprise Server
  - Fine-grained Personal Access Token により PAT の権限のスコープを細かく設定できるようになった
- Define who can merge pull requests
  - 誰がどのように PR をマージできるかを制御できるようになった
- GitHub Projects is now generally available in Enterprise Server

PAT の Fine-grained 機能や PR のマージ制御は Enterprise や Organization の管理者にとっては嬉しい機能だと思います。
その他詳しいリリース内容は [Enterprise Server 3.10 release notes](https://docs.github.com/en/enterprise-server@3.10/admin/release-notes) を参照してください。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

# know-how 🎓

## Pull Request（プルリク）を小さくする戦略 - 開発チームのパフォーマンス向上のための第一歩 - Agile Journey
https://agilejourney.uzabase.com/entry/2023/07/31/103000

Findy Team+ で pull-request が作成されてからマージまでの時間が長い現状把握から出発し、様々な改善によってマージまでの時間を大幅に改善した事例です。

サブタスクへの分割・Feature Flags による pull-request の粒度の細分化にとどまらず、pull-request テンプレートの充実、Slack 通知、レビュワー自動アサイン、ラベルルールなど自動化や手作業の省力化などの足回りも同時に改善している点が個人的には印象的でした。

最近は Four keys が盛り上がっていますが、メトリクスを見られるようにするのはゴールではなくてスタートであり、そこから改善していく実例として参考になりました。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## 【メルカリ×DeNA】何を計測すべき？開発生産性可視化のWhy-What-How | Findy Team+ Lab
https://blog.findy-team.io/posts/mercari_dena/

2023/07/13 に開催された[開発生産性カンファレンス](https://dev-productivity-con.findy-code.io/)のパネルディスカッションの書き起こしが公開されました。パネルディスカッションでスライドの情報は最小限だったため、書き起こしを公開して頂けて嬉しいです。

Four Keys のメトリクスの取得について目にする機会は増えましたが、このメトリクスを評価に結びつけるべきなのか、経営層に直接見せるべきなのかなどメトリクス活用の突っ込んだ話が議論されており個人的には興味深いセッションでした。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

# tool 🔨

## Project IDX
https://idx.dev/

発表分: [Introducing Project IDX, An Experiment to Improve Full-stack, Multiplatform App Development — Google for Developers Blog - News about Web, Mobile, AI and Cloud](https://developers.googleblog.com/2023/08/introducing-project-idx-experiment-to-improve-full-stack-multiplatform-app-development.html)

Google 製の IDE[^ide]が登場します。プロジェクト名は Project IDX です。
VSCode の OSS 版である CodeOSS をベースとしており、いくつかの特徴があります。

- ブラウザからすぐに開発できるようにする
- 組み込み Web プレビュー、組み込み Android エミュレータ、組み込み iOS シミュレータにブラウザからアクセスすることで、プラットフォーム間でのアプリのプレビューを容易にする
- Google 製 AI である Codey などを使った AI による開発支援機能の統合

気になる方は limited preview の waitlist に登録して続報を待ちましょう。

[^ide]: IDE とは Integrated Development Environment の略で、日本語だと統合開発環境と呼ばれたりします。コードを書くためのエディタや、コードを実行するためのターミナル、コードを管理するための Git クライアントなどの開発に必要なツール群が 1 つにまとまっているツールを指します。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Datadog、低コストで大容量ログを管理できる階層を発表｜Datadog Japan合同会社のプレスリリース](https://prtimes.jp/main/html/rd/p/000000042.000077474.html)
    - [Store and Analyze High-Volume Logs Efficiently With Flex Logs | Datadog](https://www.datadoghq.com/ja/blog/flex-logging/)
    - Datadog Logs において、Flex Logs というインデックスを常に作らない代わりに安価なレイヤーが追加されました
    - 大量に収集し、比較的長時間保持し、場合によっては緊急でクエリを実行する必要があるログ（セキュリティ、トランザクション、ネットワークなど）に使用することが想定されています
    - まだ制限付きアクセスであり、利用には登録が必要です。気になる方は使ってみてください
  - [Terraform Cloud now supports multiple configurations for dynamic provider credentials](https://www.hashicorp.com/blog/terraform-cloud-now-supports-multiple-configurations-for-dynamic-provider-credent)
    - Terraform Cloud の OIDC において、1 つの Terraform Provider につき複数の資格情報を使えるようになりました
    - Terraform は同じ provider に対してエイリアスを貼ることで、複数の資格情報を使うことができます
    - しかし、これまで Terraform Cloud の OIDC においては複数エイリアスで異なる資格情報を使えませんでした
    - 今回のアップデートにより、同じ provider の複数のエイリアスを認証可能になり、また、複数アカウントや複数リージョンでの認証もできるようになりました
  - [Simplified post-migration identity mapping for Enterprise Managed Users - The GitHub Blog](https://github.blog/changelog/2023-08-07-simplified-post-migration-identity-mapping-for-enterprise-managed-users/)
    - GitHub Enterprise Server などから GitHub.com にリポジトリや Organization を移行できるツール GitHub Enterprise Importer の v1.0.0 がリリースされました
    - [Enterprise Managed Users (EMU)](https://zenn.dev/korosuke613/articles/productivity-weekly-20211006#enterprise-managed-users-are-now-generally-available-for-github-enterprise-cloud-%7C-the-github-blog) を利用している場合、移行後のユーザへの紐付けを行うためのマネキンへの EMU の割り当てが簡単にできるようになりました
    - 以前はユーザが invitation を受け入れる必要がありましたが、EMU に限ってはこれをスキップできます

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# あとがき
8/9 号でした。世の中は花火大会やら台風やらで盛り上がっていますね。
そんなこんなでもう夏も終わりが近づいてきた感じがします。
みなさんは夏っぽいことできましたか？

ちなみに今週は新たな共同著者、[@r4mimu](https://zenn.dev/r4mimu) さんが参戦です。
すばらしいですね 🐈

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6


## GitHub Actions Meetup Tokyo #2 - connpass
https://gaugt.connpass.com/event/292175/

GitHub Actions に関することをワイワイ話す会、GitHub Actions Meetup Tokyo #2 が 2023/09/21 に開催されます。
場所はサイボウズ株式会社の東京オフィスです。オンライン視聴もあります。

なんか公開されて早いうちに枠が全て埋まってしまったのですが、オンライン視聴枠は 100 -> 200 に増枠したらしいので、まだまだ間に合います（オンライン視聴枠は先着順）。

なんと 4,5 年ぶりの開催です。楽しみですね。
気になる方はぜひ参加してみてください！
