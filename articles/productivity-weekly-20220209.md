---
title: "Productivity Weekly (2022-02-09号)"
emoji: "⛩"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220209"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 62 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## More ways to keep your pull request branch up-to-date | GitHub Changelog
https://github.blog/changelog/2022-02-03-more-ways-to-keep-your-pull-request-branch-up-to-date/

GitHub のプルリクエスト画面で base ブランチ[^base]の最新のコミットを head ブランチ[^head]に取り込む「Update branch」機能が rebase を選べるようになりました。これまでは merge しか選べなかったためマージコミットができてしまっていました。

また、これまで「Update branch」はブランチ保護設定で「Require branches to be up to date before merging」が有効になっているときのみ利用できましたが、新たに追加されたリポジトリ設定の「Always suggest updating pull request branches」を有効にすることで、ブランチ保護設定をせずに「Update branch」を利用できるようになりました。

マージコミットを作りたくない人にとっては「Update branch」は使いづらい機能だったと思います（僕もそうでした）。結局コマンドラインから rebase していたのですが、これからはボタン 1 つで最新にできて良いですね。ブランチ保護設定をしなくても使えるようになったのもありがたいです。

[^base]: マージされるブランチのこと。
[^head]: マージするブランチのこと。

## View Dependabot alerts across an organization | GitHub Changelog
https://github.blog/changelog/2022-02-08-view-dependabot-alerts-across-an-organization/

GitHub において Dependabot のアラートを Organization 単位で閲覧できるようになりました。Owner、および [Security managers ロール](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/managing-security-managers-in-your-organization)を持つユーザが閲覧できます。

Dependabot アラートを潰すために一個一個リポジトリを開いていかなきゃいけないのは面倒ですよね。大量のリポジトリがあるところは特に。アラートを俯瞰できるページは地味にうれしいですね。

※ただしこの機能を利用できるの Advanced Security 契約者のみになります。

::: message
それにしても、記事にある画像はそれぞれのアラートが `5000+`、Dependabot alerts はアラートが `7,911 Open` でなかなか凄いことになっていますね笑

脆弱性がゴリゴリ入ったリポジトリがたくさんある Dependabot のテスト用 Organization があるのかもしれません。
:::

## Improving the developer experience for Dependabot alerts | The GitHub Blog
https://github.blog/2022-02-08-improving-developer-experience-dependabot-alerts/

Dependabot alerts の Developer eXperience が改善されました。以下のような改善があります。

- （一覧画面において）アラートがパッケージごとではなくアドバイザリーごとに表示されるようになった
- （詳細画面において）アラートのタイトルがわかりやすくなった
- （詳細画面において）CVSS スコアが表示されるようになった
- （一覧画面において）アラートを検索できるようになった
- （一覧画面において）修正したアラートを `Closed` タブで確認できるようになった[^closed]
- 他にも API の改善など

Dependabot alerts がさらに使いやすくなりましたね。個人的にアラートのタイトルがパッケージ名ではなくアラートの意味になったのが嬉しいです。

[^closed]: これまでは確認できなかったらしい。`Closed` タブ自体は前からあったから Dismiss したアラートだけ見れたのかな？

## The new GitHub Issues - 02/02 update | GitHub Changelog
https://github.blog/changelog/2022-02-02-the-new-github-issues-02-02-update/

新しい GitHub Issues の大幅アップデートです。プロジェクトの README、スプリントを設定したり、バーンアップチャートを出したりできるようになりました。

プロジェクト管理ツールとして他の製品に引けを取らない機能が増えてきましたね。まだ新しい GitHub Issues はベータなので、早く正式リリースしてほしいです。

::: message
今回増えたを試そうと思ったのですが、僕の環境ではプロジェクトの README の設定しかまだできませんでした...
:::

# know-how 🎓

## Blog Series of Introduction of Developer Productivity Engineering at Mercari | Mercari Engineering
https://engineering.mercari.com/en/blog/entry/20220116-blog-series-of-introduction-of-developer-productivity-engineering-at-mercari/

メルカリの Developer Productivity Engineering を紹介する一連のブログ記事まとめです。

メルカリには Developer Productivity Engineering Camp という、インフラやマイクロサービス、Developer eXperience の向上などを担当する複数チームの集まりがあります。この記事には DPE Camp の構成、共通のミッションと責任、方向性の紹介、所属する各チームの記事を羅列した表が載っています。

各チームが共通で持つミッションと責任、方向性を読むと、なぜ DX チームや SRE 関連チームなどが 1 つのキャンプとしてまとまっているのかがわかる気がします。主な顧客が同じだからこそ共通の認識を持っているのが良いなと個人的に思いました。この記事が公開された 2022/01/17 から 2022/02/24 まで平日毎日新しい記事を公開するとのことで、興味深い記事がたくさん載っています。

これらの領域に興味のある方も、似たようなチームを作っていきたい人も参考にできそうです。

## sigstoreによるコンテナイメージやソフトウェアの署名 - knqyf263's blog
https://knqyf263.hatenablog.com/entry/2022/02/06/213003

鍵の管理不要でソフトウェアの署名を可能とする sigstore を解説した記事です。sigstore 登場までの背景から始まり、sigstore の概要、構成、署名・検証方法、署名・検証の仕組みについて解説してくれています（コンテナイメージと Blobs の両方）。

ただ解説しているのではなく、所々でつまづいた部分や懸念点などの説明、実際のコマンドも書かれており、sigstore とは何か知りたい場合、実際に使ってみたい場合に参考になりそうと思いました。ソフトウェアを公開しないよという方も、sigstore の検証は従来の PGP とはフローが異なるため、これから sigstore を利用するソフトウェアが増えてきた時のために検証方法・仕組みは抑えておいて良いかと思います。僕も自分が出している OSS（大して使われてませんが）に署名するようにして慣れていきたいですね。

# tool 🔨

## Postman Now Supports gRPC | Postman Blog
https://blog.postman.com/postman-now-supports-grpc/

REST API や GraphQL の GUI クライアントツール Postman が gRPC をサポートしました（ベータ）。

URL やファイルで proto ファイルを指定する（[gRPC Server Reflection Protocol](https://github.com/grpc/grpc/blob/5ef1585070f73e8424ca4d77d73f8937572fd2c1/doc/server-reflection.md) にも対応）と、protobuf 定義を Postman が理解し、メッセージの自動補完や型チェック、メッセージ例の生成ができます。unary だけでなく、streaming にも対応しています。

記事には、機能一覧、get started、protobuf の解析、ストリーミングメソッドについてなどが書かれています。

僕も実際使ってみたところ、メッセージ例を生成が便利でした。自分でメッセージを一から書く必要がないのが良いですね。まだメッセージの保存には対応していませんでしたが、それでも手軽に gRPC サーバを叩けるツールとして重宝しそうです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Redesign of GitHub's settings pages | GitHub Changelog](https://github.blog/changelog/2022-02-02-redesign-of-githubs-settings-pages/)
  - GitHub の設定ページがなんか新しくなった。まだ慣れない
- [Paste links directly in Markdown | GitHub Changelog](https://github.blog/changelog/2022-02-02-paste-links-directly-in-markdown/)
  - GitHub のマークダウンエディタに HTML のリンクを貼り付けると自動で `[<Title>](<Link>)` の形式で貼られるようになった
- [GitHubの運用を「会社」にしていく話](https://zenn.dev/ubie/articles/ee2ce9cc471f09)
  - 属人化していた、ガバナンスがない GitHub Organization の運用の属人性を減らし、ガバナンスを強めていったという話
  - Organization のメンバー全員に Owner 権限があったり、最小労力の一部の人で運用されていたりといつ何が起きてもおかしくないような状況だった
  - この記事ではまともな運用にするためにやった施策（権限の最小化、IaC 化、監査ログの有効化、SAML SSO の強制など）が書かれている

# あとがき
遅くなってしまいすみません。今週号はあまり僕の時間が取れず、ネタを検証する時間が取れませんでした（sigstore 実際に試す余裕なかった...）。

そういえば、Zenn に記事を投稿する際、`published: true` にするプルリクエストを作るアクション [korosuke613/zenn-metadata-updater-action の v1.1.0](https://github.com/korosuke613/zenn-metadata-updater-action/releases/tag/v1.1.0) をリリースしました。v1.1.0 では Zenn のメタデータを検証する機能を追加しました。メタデータがおかしいとこんな感じで怒ってくれます。 

![](https://user-images.githubusercontent.com/20027695/153578617-e1269f0c-03b9-49bb-914f-a5ae38ad1413.png =500x)
*`emoji` が空になってるので怒ってる（[参考](https://github.com/korosuke613/zenn-metadata-updater-action/pull/202)）*

たまに `emoji` を入れ忘れるんですが、これを CI に組み込んで `emoji` を入れ忘れないようにできそうです。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message
すみません。今週のおまけはお休みです
:::

