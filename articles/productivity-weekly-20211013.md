---
title: "Productivity Weekly (2021-10-13号)"
emoji: "💻"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: 
  # This block is user-defined.
  publish_link: https://zenn.dev/korosuke613/articles/productivity-weekly-20211013
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 47 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## GitHub Actions: Workflows triggered by Dependabot PRs will respect permissions key in workflows | GitHub Changelog
https://github.blog/changelog/2021-10-06-github-actions-workflows-triggered-by-dependabot-prs-will-respect-permissions-key-in-workflows/

GitHub において、Dependabot によって引き起こされる GitHub Actions ワークフローが `permissions` を尊重するようになりました（デフォルトは Read のままです）。また、Dependabot が持つシークレットを利用できるようになりました。これらの変更により、Dependabot 由来のワークフローの権限を詳細にコントロールできるようになります。さらに、3 月の変更で動かなくなったワークフローを再び容易に動かせるようになります（後述）。

[今年の 3 月から、Dependabot のプルリクエストによって発火するワークフローは GITHUB_TOKEN の権限が読み取り専用となりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210224#github-cli-now-supports-editing-issues-and-pull-requests%2C-and-pull-request-auto-merge---github-changelog)。また、`GITHUB_TOKEN` 以外のシークレットは渡されないようになっていました。しかし、これら 3 月の変更により、write 権限がなくなったことやユーザ定義のシークレットを利用できなくなったことから、一部ワークフローが動かなくなるといった問題を引き起こしていました[^dependabot2]。回避策もありました[^dependabot1]が、なかなかに面倒なものでした。

これからは、必要な write 権限は `permissions` で設定し、必要なシークレットは Dependabot が持つシークレットに設定することで、3 月の変更で動かなくなってたワークフローを再び Dependabot のトリガーで動かすことができるようになります。

しかし、もともとデフォルトで厳しい制限をかけた理由を考えると、各スコープが Read 権限のみ、シークレットを渡さないことが一番セキュリティの観点からすると最良であることは間違いありません。write 権限の付与はシークレットを渡すことが本当に必要か再度考え、必要最低限の権限のみ渡すようにしましょう。

![](/images/productivity-weekly-20211013/dependabot-secrets.png =500x)
*Dependabot が持つシークレットとはおそらく `Settings -> Secrets -> Dependabot` から設定できる項目のこと（[ドキュメント](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/managing-encrypted-secrets-for-dependabot)）*


[^dependabot1]: [[GitHub Actions] Secrets や書き込み権限が必要な Workflow を Dependabot からも使えるようにする – もばらぶエンジニアブログ](https://engineering.mobalab.net/2021/04/30/make-secrets-available-in-pull-request-opened-by-dependabot/)
[^dependabot2]: [Dependabot triggered Actions cant access secrets or use a writable token · Issue #3253 · dependabot/dependabot-core](https://github.com/dependabot/dependabot-core/issues/3253)

## GitHub Actions: Granular personal access token scopes for self-hosted runners in enterprises | GitHub Changelog
https://github.blog/changelog/2021-10-11-github-actions-granular-personal-access-token-scopes-for-self-hosted-runners-in-enterprises/

GitHub Actions において、Enterprise 所属セルフホストランナー管理に特化した権限である `manage_runners:enterprise` スコープが追加されました。これにより `admin:enterprise` スコープの権限が必要なくなりました。これからは代わりにもっとスコープの狭い `manage_runners:enterprise` を使うことが推奨されています。

GitHub Actions のセルフホストランナーはリポジトリ、Org だけでなく、Enterprise に対して所属させることができます。WebUI からランナーを管理する場合は良いのですが、API を使ってランナー管理を自動化しようとすると、API を叩くためのトークンに対して `admin:enterprise` を付与する必要がありました。しかし、`admin:enterprise` 権限は強力な権限[^admin_enterprise]であるため、あまり付与したくない存在でした。

`manage_runners:enterprise` が登場したことにより Enterprise 所属セルフホストランナー管理を自動化しやすくなりました。

:::message
しかし、残念ながら Enterprise 関連の権限は GitHub App に付与できない（そもそも GitHub App を Enterprise に対してインストールできない）ため、パーソナルアクセストークンを利用せざるを得ません。CI 等で個人に紐づくシークレットは極力使用したくないため、ここら辺をなんとかしてほしいところです。
:::

[^admin_enterprise]: *Full control of enterprises* とされている。Audit log を見られたり Actions の利用を許可したり、Org 作成なんかができたはず。強すぎる。Enterprise のページを詳細な権限をドキュメントで探したが、一覧で載っているものを見つけられなかった。うーん。


## GitHub Universe 2021
https://www.githubuniverse.com/

GitHub Universe が 10/28-29(JST)に開催されます。GitHub Universe は GitHub の新機能や GitHub を活用した事例などが紹介される一年に一度のイベントです。今年もオンラインで開催されるため、無料で視聴できます。

今年もこの季節がやってきました。と思ったのですが、[去年は 12 月に開催された](https://github.blog/2020-12-08-new-from-universe-2020-dark-mode-github-sponsors-for-companies-and-more/)ため、去年よりもまあまあ早い開催となります。去年の Universe ではダークモードやオートマージ、GHES3.0 の話題で盛り上がりましたね。今年も楽しみです。

# know-how 🎓

## Terraform Platform in Quipper - Speaker Deck
https://speakerdeck.com/szksh/terraform-platform-in-quipper

Quipper 社の Terraform プラットフォーム事例です。様々な Terraform 運用ノウハウが紹介されています。

モノレポでパイプラインを共通化、state は細かく分割、plan ファイルから apply を行う、tfcmt[^tfcmt] で差分を見やすくする、CI による fmt ・ lock ファイルの修正・[tfmigrate](https://github.com/minamijoyo/tfmigrate) の実行、Renovate による諸々のアップデート（更新は No Change であることをテストする）などです。

全編英語ですが、詳細はこれまでのブログ記事にあるとのことです（登壇動画もあります）。

https://quipper.hatenablog.com/entry/2021/10/13/080000

Terraform 運用時のつらみを解消するためのノウハウが揃っており、活用度合いがすごいです。とても参考にできると思います。

[^tfcmt]: [mercari/tfnotify](https://github.com/mercari/tfnotify) を fork したもので、[tfnotify と比べて様々な変更が取り入れられています](https://github.com/suzuki-shunsuke/tfcmt/blob/6f5585fcfc54ba4e2adff38dca23db0fd97239b0/docs/COMPARED_WITH_TFNOTIFY.md#feature-support-terraform--v015)。

## EC2 でリザーブドインスタンス（RI）と Savings Plans （SP）のどちらを選ぶべきか？基準とするための最強の比較表を作ってみた | DevelopersIO
https://dev.classmethod.jp/articles/ec2-reserved-instances-savings-plans-comparison/

AWS のディスカウントの仕組みである Reserved Instances(RI) と Savings Plans(SP) について EC2 に関する部分の比較表を作ってみたという記事です。

Amazon EC2 を決まったタイミングで使うなり、大量に使うなりする際は、少しでも安く抑えるために RI や SP の利用を検討します。ですが、それぞれにメリットデメリット、できることできないことが複雑に存在し、正直どちらが適切かの判断がとても難しいです。

この記事では、わかりやすい比較表[^wakari]（複数バージョン）、メリットデメリット、観点ごとの解説が書かれており、とてもよく分析された様子が目に浮かびます。

「考慮すべき項目が多いため「どちらが良いのか」を判断するのは難しいかと思います」と本文に書かれている通り、どちらが適切かの判断は非常に難しいですが、これから EC2 を本格利用する方も、すでに本格的に利用している方にとっても、この記事はとても良い判断材料となりそうです。

[^wakari]: とてもよくできており相対的にわかりやすいですが、やはり理解は難しいです。

# tool 🔨

## HTTPIE FOR TERMINAL
https://httpie.io/

httpie は HTTP(HTTPS) リクエストをシンプルに送るための CLI ツールです。HTTP リクエストを送るためのツールとしては [curl](https://curl.se/) が代表格ですが、httpie には API や HTTP サーバ、Web サービスのテストとデバッグを容易にするための機能が揃っています。

- 直感的な構文
- JSON サポート
- colorized
- API 向けのデフォルト設定（ステータスコードやヘッダの常時表示など）
- セッションの維持
- offline モード（リクエストの表示）
- その他諸々

確かに開発時や手軽に API を叩くために便利そうな機能が備わっており、役立ちそうです。手軽に試したい人向けに [online デモ](https://httpie.io/cli/run)があります。
（CI や本番環境で利用する際は curl や wget を使うことになると思うので、curl や wget の代替とはならないでしょう[^curl]。）

:::message
余談ですが、Go 実装のクローンである [httpie-go](https://github.com/nojima/httpie-go) が第三者によって開発されています。本家は Python で実装されているので、軽量なシングルバイナリとして使いたい方はこっちの方がいいかもしれません。
:::

[^curl]: そう考えると curl コマンドへのエクスポート機能がちょっと欲しくなる。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Google Distributed Cloud をデータセンター、エッジ、クラウドに導入 | Google Cloud Blog](https://cloud.google.com/blog/ja/topics/hybrid-cloud/announcing-google-distributed-cloud-edge-and-hosted)
  - GCP(Google Cloud Platform)のインフラをオンプレやエッジロケーションで構築するためのソリューションである Google Distributed Cloud が発表されました。
  - Google Distributed Cloud Edge はデータが生成・活用される場所（エッジロケーション）の近くで Google Cloud のサービスを利用するための製品です[^jisinn]。
  - Google Distributed Cloud Hosted はオンプレ上に Google Cloud を構築するための製品です。データの所在地やセキュリティ用件などが厳しい顧客でも Google Cloud を活用できます。
- [Psst! Now you can securely share 1Password items with anyone | 1Password](https://blog.1password.com/psst-item-sharing/)
  - 1Password が 1Password ユーザ以外とパスワードを安全に共有するための機能である Psst! を発表しました。
  - 共有リンクの有効期限や何人までが表示できるかを設定できます
  - 家に来た友人へ WiFi のパスワードを共有するなど、使い道は色々ありそうです。
  - 日本語でのニュース記事：[1Password、非ユーザーとも安全にパスワードを共有できる「Psst！」機能 - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2110/13/news066.html)

[^jisinn]: 正直あまり自信ないです。詳しくは調べてください。

# あとがき
土日は [Fig](https://fig.io/) の autocomplete を充実させる[^fig1][^fig2][^fig3]おじさんと化していました。Fig、なかなか便利です。あと競プロのコンテストに出てました。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

[^fig1]: [feat: add limactl completion spec by korosuke613 · Pull Request #673 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/673)
[^fig2]: [feat: add asdf completion spec by korosuke613 · Pull Request #677 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/677)
[^fig3]: [feat: add direnv completion spec by korosuke613 · Pull Request #681 · withfig/autocomplete](https://github.com/withfig/autocomplete/pull/681)

## omake
今週のおまけです。

### 速報：アップル発表イベントは19日午前2時～。新型MacBook Proや第3世代AirPodsなど新製品予想まとめ - Engadget 日本版
https://japanese.engadget.com/apple-november-19-new-macbookpro-airpods3-162117990.html

パワー全開...ですね。本日の 26 時（2021/10/18 26 時）から Apple Event が開催されます。[9 月にも開催されました](https://www.apple.com/jp/apple-events/september-2021/?useASL=true)が、その時はモバイル端末や iPad mini などが発表されました。

今回はおそらく Mac 関係の新製品が来るだろうと言われています。個人的には MacBook Pro の次世代機が来てほしいです。特に**メモリ 32GB 以上搭載可能 Apple Silicon 搭載 MacBook Pro 16 インチ**に来てほしいです。

従来の M1 MacBook Pro は 13 インチまででメモリの上限は 16GB だったため、買うのをためらっていました。M1 の開発環境も整ってきたことだと思いますし、そろそろ使いたいですね。多分次に交換してもらう会社 PC は新発表された MacBook Pro にしてもらうと思います。Apple さん頼む〜〜〜！