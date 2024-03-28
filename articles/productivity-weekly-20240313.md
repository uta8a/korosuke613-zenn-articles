---
title: GHES 3.12でマージキューが使えるようになる話など｜Productivity Weekly(2024-03-13)
emoji: 🧅
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240313
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-03-13 単独号です。

今回が第 146 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

:::message
来週号（3/20）は祝日だったのでお休みです。
:::

# news 📺

## The GitHub Enterprise Server 3.12 is generally available - The GitHub Blog
https://github.blog/changelog/2024-03-05-the-github-enterprise-server-3-12-is-generally-available/

GitHub Enterprise Server（GHES）3.12 が GA になりました。大きな機能は記事中で紹介されているものになるのですが、個人的に注目している機能を 3 つほどピックアップしてみます。

- [マージキュー機能が追加](https://github.blog/2023-07-12-github-merge-queue-is-generally-available/)
- [Dependabotの脆弱性アラートの自動トリアージ機能が追加](https://github.blog/2023-09-14-introducing-auto-triage-rules-for-dependabot/)
- [Markdownの新しいハイライト構文が追加](https://github.blog/changelog/2023-12-14-new-markdown-extension-alerts-provide-distinctive-styling-for-significant-content/)（公式には Alerts と呼ばれている）

中でもマージキューの機能追加が要注目です。これは github.com を利用していてもプランによっては利用できない機能なので、GHES ならおそらくどのリポジトリであっても利用できるのは嬉しいですね。マージキューについては実際に利用された方の記事を Productivity Weekly でも何度か紹介したこと[^20240214][^20230222]がありますが、クセは強いものの使いこなせると特に大規模な開発チームでの運用において非常に便利な機能なようです。GHES で大規模な開発をされているチームは検討してみると良いかもしれません。

[^20240214]: [旧artifact actions廃止告知、マージキューやデプロイ頻度の話等｜Productivity Weekly(2024-02-14)](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214)
[^20230222]: [Productivity Weekly (2023-02-22号)](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230222)

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Actions Fine Grained Permissions - The GitHub Blog
https://github.blog/changelog/2024-03-06-actions-fine-grained-permissions/

GitHub の Custom Organization Roles において、GitHub Actions の細かい権限設定が可能になりました。[Custom Organization Roles](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231122#custom-organization-roles-are-now-ga---the-github-blog) は、Organization に対する権限を付与可能なロールで、例えばあるユーザに webhook 管理の権限だけ与えるなどが可能です。Enterprise の顧客のみが利用できます。

今回新たに追加された権限は次の通りです。（[ドキュメント参照](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/about-custom-organization-roles)）

|Permission|Description|
|---|---|
|Manage organization Actions policies|Actions 全般の設定の管理権限（Self-hosted runner の設定を除く）|
|Manage organization runners and runner groups|ランナーとランナーグループの作成・管理権限、Self-hosted runner 作成可能リポジトリの管理権限|
|Manage organization Actions secrets|Org レベルの Actions secrets の作成と管理権限|
|Manage organization Actions variables|Org レベルの Actions variables の作成と管理権限|

これで、Organization 管理者は全ての権限を付与することなく、個人やチームに Org レベルの Actions の管理権限のみを与えることができるようになりました。
権限は細かく絞っていきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub Actions; All Actions will run on Node20 instead of Node16 by default - The GitHub Blog
https://github.blog/changelog/2024-03-07-github-actions-all-actions-will-run-on-node20-instead-of-node16-by-default/

GitHub Actions で JavaScript の actions を動かすための Node.js のバージョンについては既に EOL の Node.js v16 から v20 に移行するようにアナウンスされていた件の続報です。既に v16 を利用している Action を呼び出した場合は warning のメッセージが表示されていますが、いよいよ 2024/05/13 から v20 が強制的に利用されることが予告されました。

この挙動は `FORCE_JAVASCRIPT_ACTIONS_TO_NODE20` の環境変数をセットすることで前もってオプトインできるようです。逆に `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION` をセットすることで v20 が強制される挙動をオプトアウトすることも可能とのことですが、それが可能なのもランナーに内蔵されている Node.js v16 が削除されるまでの間だけとのことなので無期限にオプトアウト可能ではないようです。

GitHub Actions を実行した結果画面で Node.js v16 を利用している warning が表示されている場合は、該当の action を Node.js v20 対応のバージョンまでアップデートするか、最悪別の action に乗り換えることをそろそろ検討する時期だと思います。

ちなみに GHES に関しては最新の v3.12 のリリースノートでもこの件に関して言及されていなかったため、現時点では移行スケジュールは不明なままです。v3.13 のリリースノートを待ちましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Copilot Chat General Availability in JetBrains IDE - The GitHub Blog
https://github.blog/changelog/2024-03-07-github-copilot-chat-general-availability-in-jetbrains-ide/

JetBrains IDE 上の GitHub Copilot Chat が GA されました。

Copilot Individual ユーザはすぐに使えますが、Copilot Business、Enterprise ユーザは、管理者が Chat 機能を有効化する必要があります。VSCode で Chat 機能が有効化されていればそのまま JetBrains IDE でも使えるはずです。
そもそも Chat 機能が有効化されていなさそうであれば、管理者にお願いしましょう。

なお、Copilot Chat の機能としては VSCode と比べて遅れて機能がやってきがちです。例えば、[`@workspace`](https://code.visualstudio.com/docs/copilot/copilot-chat#_chat-participants) や、[`#file`](https://code.visualstudio.com/docs/copilot/copilot-chat#_use-chat-variables) は使えなさそうでした（プラグインバージョン: 1.5.0.5148）[^somosomo]。

JetBrains IDE では使えないと思っていた方は、ぜひ試してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^somosomo]: そもそも JetBrains IDE の Copilot Chat で使える機能はどこに羅列されてるのかわかってない。

## How we sped up AWS CloudFormation deployments with optimistic stabilization
https://aws.amazon.com/jp/blogs/devops/how-we-sped-up-aws-cloudformation-deployments-with-optimistic-stabilization/

CloudFormation でのデプロイを高速化する方法について書かれています。

CloudFormation は、他の IaC と同じようにリソース間の依存関係のグラフを内部的に持ってデプロイを行います。
またリソースがデプロイされる時間は「エンジン時間」「リソース作成時間」「リソース安定化時間」の 3 つに分類でき、うち「リソース安定化時間」が他のリソースの作成に影響を与えることが書かれています。
CloudFormation や他の IaC はリソースを作成・変更した後、継続的に describe を叩いてリソースが完全に作成・変更されるのを待ちます。

しかし、完全に作成されるのを待つのは時に無駄であるということで、今回楽観的な安定化戦略が登場しました。
リソースを作成したら、その安定化を待たずにそのリソースに依存したリソースの作成が開始されます。
もし安定化を待たずに依存先のリソースを作成して失敗した場合は、依存元のリソースの安定化を待ってから再度作成を試みるようです。
これにより最大 40 %のデプロイ高速化が実現できるそうです。

なお、これは暗黙的な依存関係のみで発生し、例えば `! Ref <リソース名>` のように、組み込み関数で別リソースを参照している場合に、記述しているリソース間で機能するそうです。
明示的な依存関係、つまり `DependsOn` で関係性を記述している場合は、従来のようにリソース安定化時間を待ってから依存先のリソースを作成します。

なお、生産性向上チームでは IaC には Terraform をメインに使用しています。
今回のような楽観的な安定化戦略は Terraform および terraform-provider-aws には導入されていないと思われるため、実はあまりチームには縁の無い話でした。
今後 Terraform に導入されると嬉しいですね。
（もし現時点で Terraform でも楽観的な安定化戦略が可能という情報があったら教えてください）

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Free data transfer out to internet when moving out of AWS | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/free-data-transfer-out-to-internet-when-moving-out-of-aws/

AWS から他のクラウドやオンプレミスに移行する際のデータの転送量が 100 GB を超えても無料になりました。
これまでも月に 100 GB までは AWS からインターネットへの転送料は無料ですが、他のクラウドやオンプレミスに移行する場合に限り AWS にその旨リクエストすることで 100 GB を超えた分の転送料も無料にしてくれるそうです。

いろんな選択肢を提供してくれるのはありがたいことですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## 【翻訳】テスト駆動開発の定義 - t-wadaのブログ
https://t-wada.hatenablog.jp/entry/canon-tdd-by-kent-beck

t-wada さんによる、テスト駆動開発（TDD）の定義についての翻訳記事です。
テスト駆動開発を考案した Kent Beck さんが TDD の定義を改めて明文化した文章を、t-wada さんが翻訳＆考察しています。

TDD は知識として知っていたり、[例の本](https://www.ohmsha.co.jp/book/9784274217883/)を読んでみたりしたことがある人は決して少なくないのではないでしょうか？僕もその 1 人で、大学の頃に本を読んだり先輩から教えてもらったりした者です。

しかし、Kent Beck さんによると、TDD の定義は世の中で合意が得られていないと実感しているようで、世の中の TDD に対する理解を深めるためにさらに明確に TDD を定義したそうです。
記事の半分は TDD の再定義に関する t-wada さんによる翻訳です。
後半は、t-wada さんによる日本ではどう TDD が理解されているのかについてを深ぼった考察が書かれています。たしかにな〜と思う部分が多かったです。

正直なところ、僕の TDD に対する理解はだいぶ怪しいものでした。テストリストを用意する部分を完全に忘れていたり、リファクタリングをしても設計が改善されているかは怪しかったりと...

また、t-wada さんが以前 Software Design で書いた TDD に関する記事の公開についても書かれています。合わせて読むことで、自動テストやテストファースト、TDD に対する理解を深めることができると思います。

ちゃんと TDD を理解した上で TDD の実践や議論に触れていきたいですね。気になる人は読みましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## UnityのアプリビルドをGitHub Actionsに移行した話【CAGC2024】 - Speaker Deck
https://speakerdeck.com/cyberagentdevelopers/unitynoapuribirudowogithub-actionsniyi-xing-sitahua-cagc2024

Unity のモバイルゲーム開発におけるビルド基盤を Jenkins から GitHub Actions に移行した事例の紹介です。

Jenkins からの移行において GitHub Actions の `workflow_dispatch`（手動トリガー）のパラメータ数の上限が 10 という制約が問題になってしまったところを、パラメータを JSON 化した上で GitHub から実行する代わりに Slack App でリッチなフォームを提供して解決したという内容でした。

実は自分も過去に Unity 開発のビルド基盤運用に関わった経験があるのですが、ゲーム開発の現場ではエンジニア以外の職種の方々も大勢開発に関わるため必ずしも全員が Jenkins や GitHub の使い方に習熟しているというわけではないことがあります。そのため、チャット bot など簡単に使える UI を提供してほしいという要望を頂く機会が多かったのですが、当時の自分はここまでリッチな機能を提供できませんでした。今回の事例はこういった要望に対する 1 つの完成形を見た気がして感慨深かったです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## configMigration - Configuration Options - Renovate Docs | Renovate Docs
https://docs.renovatebot.com/configuration-options/#configmigration

Renovate の設定である `configMigration` の紹介です(experimental)。
Renovate には設定ファイルのマイグレーションを自動で行う機能があります。`configMigration` を `true` にすることで有効化できます。

Renovate は更新頻度の高いソフトウェアであり、設定ファイルに記述する設定項目が増えたり減ったりすることは珍しくありません。
たとえば以前は `baseBranch` という設定項目がありましたが、現在は配列で指定できる `baseBranches` に変更されました（ドキュメントからも記載がなくなっています）。ただ、Renovate は後方互換性に強いため、`baseBranch` を指定した設定ファイルが使えなくなるというわけではありません。そのため、設定項目を新しいものに置き換えるというのはなかなかやらないでしょう。変わったことすら気づいてないことは多いです。

しかし、`configMigration` を有効にすると、Renovate が設定ファイルのマイグレーションを行うプルリクエストを作ってくれます。たとえば、次のように、項目名＆スキーマを正しく変更してくれます。

```diff json:ドキュメントより
{
- "baseBranch": "main"
+ "baseBranches": ["main"]
}
```

実例として、@Kesin11 さんの OSS を見るとどんなものかなんとなくわかります。次の例では、regexMangers -> customManagers に書き換えてくれています。
https://github.com/Kesin11/actions-timeline/commit/23224a70c8d83226bdc14cfdd84fe296ba044268

個人的に、`regexManagers` が廃止されて `configManagers` に変わっているのにとても驚きました。全く知りませんでした。

ただ、問題として、もし renovate.json5 のような、json5 形式で書かれた設定ファイルを使っている場合、`configMigration` でコメントが消えてしまいます。これに関しては、[Renovate の issue に挙がっている](https://github.com/renovatebot/renovate/issues/16359#issuecomment-1988069214)ため、もしかしたら今後改善されるかもしれません。

なおマイグレーション一覧は次のコードから確認できます。めちゃくちゃ数があります。

https://github.com/renovatebot/renovate/blob/e4020c118eb934941b19a1fd0029159995a33def/lib/config/migrations/migrations-service.ts#L104-L159

個人的にとても面白い機能だと思いました。Renovate を使っている方はぜひ有効にしてみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
遅くなってしまいましたが、今週の Productivity Weekly でした。
ちょっと前に社内の製品開発チームを 5 ヶ月くらい体験しており、最近生産性向上チームに戻ったのですが、最近その内容の発表会があったため、なかなか Weekly の時間が取れませんでした。
チーム体験よかったです。

:::message
来週号（3/20）は祝日だったのでお休みです。
:::

**宣伝です。4/9（火）に大阪で Engineering Productivity Meetup #2 を開催します。**
開発生産性を向上させる知見や技術をネタに開発者と交流する会です。
みなさん参加待ってます。

https://cybozu.connpass.com/event/311067/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
