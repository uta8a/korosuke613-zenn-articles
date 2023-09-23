---
title: "Productivity Weekly (2023-09-13号, 2023-09-06号)"
emoji: "🗿"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined:
  {
    "publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230913",
  }
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-09-13, 2023-09-06 合併号です。

今回が第 124 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。

- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## ⚠️ Node.js 16 is now end of life, please upgrade to Node.js 18.

https://twitter.com/nodejs/status/1701309614263001569

[前々からアナウンスされていた](https://zenn.dev/korosuke613/articles/productivity-weekly-20220615#bringing-forward-the-end-of-life-date-for-node.js-16-%7C-node.js)通り、Node.js 16 が 9/11 に EOL となりました。

Node.js の LTS 後のサポートは LTS から数えて通常 2 年半続くのですが、Node.js 16 は依存してるソフトウェアのサポート終了に合わせて 7 ヶ月近く早い EOL となりました。

多くの方が現在の LTS である Node.js 18 へ移行済みかと思いますが、まだ移行していない方は早めに移行しましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## The OpenTF fork is now available!

https://opentf.org/fork

:::message
記事執筆時点では OpenTF という名前だったのですが、9/20 を持って OpenTofu へ改名されました。
おそらく次の Weekly の記事で改名について書きます。
本項では OpenTF のままで行きます。

> opentf、マジで opentohu になってて草 #cybozu_productivity_weekly
> https://x.com/Shitimi_613/status/1704373275000988094

:::

[先日、HashiCorp が OSS 製品のライセンスを BUSL に変更する発表を受け、Terraform を OSS として継続するための団体、OpenTF Foundation が爆誕しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816?redirected=1#opentf-foundation-%E7%88%86%E8%AA%95)。OpenTF Foundation は生まれましたが、Terraform を fork したリポジトリはまだ公開されていませんでした。

しかし、先日、OpenTF Foundation が Terraform の fork を公開しました。[opentffoundation/opentf](https://github.com/opentffoundation/opentf) です。ライセンスは変わらず MPL-2.0 です。

いまいちどこから fork したのかわかりませんが、opentf による最初のコミットは https://github.com/opentffoundation/opentf/commit/b9573d438bd539da85a72641330d4d600e926f1b のようです。

> **What will be the first release of OpenTF?**
>
> The first release will be 1.6.0-alpha, forked from the most recent commit that was still MPL-licensed.

FAQ によると、Terraform 1.6.0-alpha までは MPL ライセンスであるため、OpenTF の最初のリリースは 1.6.0-alpha までの変更が含まれていそうです。（ちなみに [1.6.0-beta からは BUSL となっています。](https://github.com/hashicorp/terraform/commit/b145fbcaadf0fa7d0e7040eac641d9aef2a26433)）

リポジトリは公開されましたが、OpenTF はまだリリースされていません。どうやら、Terraform Registry が Terraform 以外で使えなくなったため、独自のレジストリを準備中とのことです。

> Create initial OpenTF Registry. HashiCorp recently made some (unannounced) changes to the terms of the Terraform Registry, saying it may only be used with Terraform. To unblock the alpha release, we are launching an initial OpenTF Registry. We'll develop the official OpenTF Registry solution via an official RFC process later.

OpenTF Registry ができしだい、OpenTF がリリースされそうですね。

正直な話、個人的には Terraform の実装が分かれることでこれからの混沌は避けられないと思うので、あんまり歓迎はしていません。しかし、今まで Terraform で商売をしていた人たちにとっては死活問題なのでしょうがないのかなという気持ちです。

今後もウォッチしていきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## actions/create-github-app-token: GitHub Action for creating a GitHub App Installation Access Token

https://github.com/actions/create-github-app-token

GitHub 公式で GitHub Apps のトークンを払い出すアクション actions/create-github-app-token がリリースされました。

これまで GitHub Apps のトークンを払い出すアクションは公式に存在していなかったため、さまざまな 3rd party アクションが存在していました。

<!-- textlint-disable ja-technical-writing/no-doubled-joshi -->

GitHub Apps の private key を渡さなければならない関係上、3rd party アクションの利用は特に慎重になる必要があったかと思います。
今回登場したアクションは GitHub 公式であるため、セキュリティ的にもメンテナンス的にも比較的安心して利用できそうです。

<!-- textlint-enable ja-technical-writing/no-doubled-joshi -->

ただ、v1.2.1 時点だと、[アクションを実行しているリポジトリのオーナーに関する権限しか取れない](https://github.com/actions/create-github-app-token/issues/4)ようです。トークンを取得したいオーナーが異なる場合は、機能追加されるまで 3rd party アクションを利用するのが良さそうです。

実は Cybozu でも [cybozu/octoken-action](https://github.com/cybozu/octoken-action) という似たようなことをするアクションを OSS として出しています。こちらは `target_account` で別のオーナーを指定し、そのオーナーにインストールされた App の権限を取得できます。
しかし、今後は公式のアクションの利用を推奨していくことになりそうです。

（ちなみに、actions/create-github-app-token は [Post run で払い出したトークンを revoke してくれます](https://github.com/actions/create-github-app-token/blob/10f155294b06f68ed6719f3a7da057c8a34b21be/lib/post.js#L15-L19)。セキュアでいいですねー）

皆さんも GitHub Apps のトークンを払い出すアクションを利用する際は、actions/create-github-app-token の利用を検討してみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Bun 1.0 | Bun Blog

https://bun.sh/blog/bun-v1.0

高速でオールインワンな JavaScript ランタイムを謳う Bun の v1.0 がリリースされました 🎉

2022/07 くらいにベータ版として登場した Bun は長らく v0.x 系のままでしたが、ついに v1.0 がリリースされました。
Bun がどういったソフトウェアであるのか、他のランタイムと比べてどう違うのかはこの記事を読めばだいたいわかるでしょう。

記事は v1.0 の変更点というよりかは、メジャーリリースされた Bun の説明がメインです。
前バージョンである v0.8 からの変更点は最後の方に載っています。

- [Changelog since v0.8](https://bun.sh/blog/bun-v1.0#changelog-since-v0-8)

> Next.js, Astro, and Nest.js are now supported!

個人的には Astro をサポートしたのが嬉しいです。僕のホームページ ([korosuke613.dev](https://korosuke613.dev)) は Astro を使っているので、Bun の利用を試してみたいですね。

今まで特に Bun と触れ合ってこなかった人にとっては、知識をアップデートするチャンスです。気になる人は読んでみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## マイクロソフト、お客様向けの Copilot Copyright Commitment を発表 - News Center Japan

https://news.microsoft.com/ja-jp/2023/09/12/230912-copilot-copyright-commitment-ai-legal-concerns/

Microsoft が Copilot Copyright Commitment という生成 AI の利用における保証を発表しました。
Microsoft の生成 AI サービスを使用した際、第三者に著作権侵害による訴訟の結果生じた不利な判決や和解の金額は Microsoft が負担するというものです。
対象には、Word、Excel、PowerPoint などに生成 AI を導入し、データの推論や、文書のプレゼンテーションへの変換をする Microsoft 365 Copilot や Bing Chat Enterprise、GitHub Copilot などが含まれます。
利用者は Copilot 製品のガードレールとコンテンツフィルター機能を有効にしている必要があり、意図して著作権侵害をするようなコンテンツを生成してはならないとのことです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Dual Static IP ranges for GitHub-hosted Larger runners - The GitHub Blog

https://github.blog/changelog/2023-09-06-dual-static-ip-ranges-for-github-hosted-larger-runners/

GitHub Actions の Larger runner で Static IP を有効にした場合の IP レンジが 2 つに拡張されました。
これにより、ランナーは従来の 500 並列制限を超えることができるようになりました。
2 つの IP レンジは地理的に異なる場所に作成されるため、地域的な障害に対する冗長性を提供しているとのことです。
Static IP 機能を使用して新しく作成された Larger runner では、今後デフォルトで 2 つの IP 範囲が割り当てられるため、追加の操作は必要ありません。
既に Static IP を利用している場合でも IP レンジが拡張されるとのことなので、固定化された IP を通すファイアーウォールの設定をしていた場合は、新しい IP レンジを追加する必要があるので注意です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Organization Archiving general availability - The GitHub Blog

https://github.blog/changelog/2023-09-06-organization-archiving-general-availability/

GitHun の Organization をまるごとアーカイブする機能が GA になりました。
Organization アーカイブを実行すると以下のようなことが行われます。

- Organization 内のすべてのリポジトリをアーカイブ
- 新しいリポジトリの作成など、その Organization での活動を制限
- Organization のプロフィールにアーカイブされたことを示すバナーを表示
- Organization のオーナーにアーカイブされたことをメールで知らせる

コミュニティベースの Organization を閉じる際や Enterprise ならチームが解散した際にその Organization をまるごとアーカイブするという使い道がありそうです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Change your theme | Confluence Cloud | Atlassian Support

https://support.atlassian.com/confluence-cloud/docs/change-your-theme/

Confluence にダークテーマがきたようです。選択したテーマはアカウントに保存されるため他デバイスから Confluence を使用する場合にも適用されます。
ダークテーマにしてトップナビゲーションバーが正しく表示されない場合、ダークテーマと相性の悪いカスタムカラーを設定している可能性があるので、カスタムカラーを変更する必要があるとのことです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Built-in port forwarding | Visual Studio Code August 2023

https://code.visualstudio.com/updates/v1_82

Visual Studio Code v1.82 において、組み込みでポートフォワードする [ngrok](https://ngrok.com/) のような機能が追加されました。
ドキュメントは [Port forwarding local services with VS Code](https://code.visualstudio.com/docs/editor/port-forwarding) になります。

デフォルトでは private モードとなっており、転送されたポートにアクセスするためには自身の GitHub アカウントが必要ですが、public モードにすると誰でもアクセスできるようになります。
GitHub Codespaces にあるポートフォワード機能が VS Code にも組み込まれたような感じですね。

セキュリティ上の理由で ngrok みたいなサービスの利用を禁止する組織もこれまであったと思います。
そういった組織のために、ポートフォワードを制限する方法も用意されています。ドメイン(`global.rel.tunnels.api.visualstudio.com`)をブロックするだけで済みそうなので、管理者も安心ですね（？）。

- [How are forwarded ports secured?](https://code.visualstudio.com/docs/editor/port-forwarding#_how-are-forwarded-ports-secured)

個人的にはエディタに載せるような機能なのか？とちょっと思ってしまいました。便利なのは間違いないので、気をつけて使いましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Actions Runner Controller Deep Dive！ - APC 技術ブログ

https://techblog.ap-com.co.jp/entry/2023/09/01/182021
https://techblog.ap-com.co.jp/entry/2023/09/06/121449
https://techblog.ap-com.co.jp/entry/2023/09/19/110656

エーピーコミュニケーションズさんによる、GitHub Actions self-hosted runner 環境を構築するための GitHub 公式 OSS、Actions Runner Controller(ARC) の scale sets モードを深く解説した連載記事です。

scale sets モードは最近登場した方式であり、すでに GA となっています。
僕も以前調べたことがあります[^korosuke_scale]。

[^korosuke_scale]: [GitHub Actions の actions-runner-controller の Autoscaling Runner Scale Sets mode を試す](https://zenn.dev/korosuke613/scraps/703218980ddc5d)

記事執筆時点（2023/09/23）では 3 つの記事が公開されています。

<!-- textlint-disable ja-spacing/ja-no-space-between-full-width -->

- [アーキテクチャ編](https://techblog.ap-com.co.jp/entry/2023/09/01/182021)
- [動作解説編](https://techblog.ap-com.co.jp/entry/2023/09/06/121449)
- [コード解説 前編](https://techblog.ap-com.co.jp/entry/2023/09/19/110656)
- コード解説 後編？
- Runner の監視編？

アーキテクチャ編ではどのようにランナーを用意、スケールするかを解説しています。リポジトリ荷ある説明文の要約がわかりやすいです。

動作確認編では実際に k8s クラスタへ ARC をインストールし、ジョブを動かしたり各設定項目が何を表すかなどを説明してくれています。さらにランナーで Docker の実行を実現するために ARC が用意している Docker in Docker を有効にする方法と actions/runner-container-hooks を利用する方法の 2 つを紹介してくれています。

コード解説 前編では、ARC のコード解説をしてくれています。実際に ARC のすべてのコードを読んだようで、驚きます。前編と書かれている通り、ARC が起動してから各種リソースを作成するくらいまでが範囲となっています。
コード解説編はとてもボリュームが多く、読み応えがあります。僕はまだ途中までしか読めていません。

ここまで詳細に ARC の scale sets モードを解説してくれている記事は他にありません[^non-exist-scale-sets]。
ARC の scale sets モードは複雑で動作を理解するのが難しいので、今後利用していく上でこの記事は大変参考になります。

残りの記事も楽しみです。

[^non-exist-scale-sets]: そもそも scale sets モードに触れている記事をほぼ見ませんが...

<!-- textlint-enable ja-spacing/ja-no-space-between-full-width -->

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## octocov で任意のメトリクスを記録できるようにした（カスタムメトリクス） - Copy/Cut/Paste/Hatena

https://k1low.hatenablog.com/entry/2023/09/06/083000

外部サービスを使わずに GitHub Actions 単独でカバレッジを表示できる octocov がカバレッジ以外に任意のデータも集計できる機能が追加されました。
こちらの記事ではサンプルとして `go test -bench` の結果を octocov が集計して pull-req に表示させる例が紹介されています。

自分も octocov にはお世話になっているので早速試してみました。pull-req の差分でバイナリサイズがどれだけ変化するかを見られると便利そうだと考えたので、バイナリではないのですが似たようなものとして GitHub Actions のリポジトリにコミットする.js のコードサイズ[^1]を octocov で集計してみました。

[^1]: JavaScript の GitHub Actions は `node_modules` の依存ライブラリも含めて 1 つの.js にバンドルする必要があるため、コードサイズが大きくなりがちです。

記事や [octocov](https://github.com/k1LoW/octocov) の README に詳しい説明はありますが簡単に紹介すると、カスタムメトリクスとして送りたいデータを[JSON スキーマ](https://github.com/k1LoW/octocov/blob/main/report/custom_metrics_schema.json)に従った JSON として生成し、`k1LoW/octocov-action@v0` の action の環境変数で json のパスを指定するだけです。

今回は自分の[actions のリポジトリ](https://github.com/Kesin11/actions-timeline)の `dist/` ディレクトリ以下の.js のファイルサイズを集計したかったので、 `find` と `jq` で JSON を生成してみました[^2]。

[^2]: jq による JSON の生成コマンドについて当初は `--arg` や `--argjson` を使用する拙いものだったのですが、社内の分報にて Professional of jq である[@itchyny](https://github.com/itchyny)さんにアドバイスを頂き、`capture` を使ったワンライナーに改善できました。ありがとうございました！

```bash
find ./dist -type f -printf '%s %f\n' \
  | jq -n -R '{name: "dist_size", key: "dist_size", metrics: [inputs | capture("(?<value>\\S+)\\s+(?<key>.+)") + {unit: "byte"} | .value |= tonumber | .name = .key ]}' \
  > dist_js_sizes.json

# 以下のようなJSONが生成される
{
  "name": "dist_size",
  "key": "dist_size",
  "metrics": [
    {
      "value": 1306559,
      "key": "post.js",
      "unit": "byte",
      "name": "post.js"
    },
    {
      "value": 55,
      "key": "main.js",
      "unit": "byte",
      "name": "main.js"
    }
  ]
}
```

[実際に js のサイズに差分が生じるような pull-req を試してみた結果がこちら](https://github.com/Kesin11/actions-timeline/pull/13#issuecomment-1725944909)です。TypeScript 側の修正に合わせて js のサイズも増えたことが分かりやすいですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# tool 🔨

## Release v4.5.0 · suzuki-shunsuke/tfcmt

https://github.com/suzuki-shunsuke/tfcmt/releases/tag/v4.5.0

Terraform の CI 体験を向上させる CLI ツールである tfcmt が v4.5.0 をリリースしました。
terraform v1.5.0 で追加された import ブロックと moved ブロックについても表示できるようになった、ということだと思われます。

新しい機能に追従してアップデートしてくれていて、とてもありがたいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘

Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Node v20.6.0 (Current) | Node.js](https://nodejs.org/ja/blog/release/v20.6.0)
    - Node.js の v20.6.0 がリリースされ、.env ファイルを読み込む機能が組み込みでサポートされました
    - 個人的には公式でサポートするような機能なのか？とちょっと思ってしまいました
  - [Amazon Aurora and Amazon RDS announces Extended Support for MySQL and PostgreSQL databases](https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-aurora-rds-extended-support-mysql-postgresql-databases/)
    - Amazon Aurora と Amazon RDS において、PostgreSQL や MySQL のコミュニティ版がサポート終了した後でも、バージョンアップ期間を延長してくれる課金サービスが出ました
    - お世話になるべきサービスではないが、短期間しか動かないことがわかっているシステム（≒クローズが近いシステム）などで、バージョンアップの工数を金で解決できるのは嬉しいかも。という話が会で出ました
    - セキュリティアップデートも AWS がサポートしてくれるようです
  - [Amazon SES email receiving service expands to 7 new regions](https://aws.amazon.com/jp/about-aws/whats-new/2023/09/amazon-ses-email-service-7-regions/)
    - Amazon SES のメール受信を東京リージョンでもできるようになりました
    - これで SES のみ別リージョンにあるみたいな状況を解消できますね
- **know-how 🎓**
  - [ZOZOTOWN Android チームにおける Qodana を活用したビルドワーニングへの取り組み - ZOZO TECH BLOG](https://techblog.zozo.com/entry/zozotown-android-improve-build-warning)
    - ZOZO さんによる JetBrains 製の静的解析ツール Qodana を GitHub Actions で実行した事例です
    - JetBrains IDE 上での実行しかできないと思っていました
- **tool 🔨**
  - [Okta が無料のパスワードマネージャ「Okta Personal」を公開 － Publickey](https://www.publickey1.jp/blog/23/oktaokta_personal.html)
    - Okta が無料のパスワードマネージャを出しました
    - 現時点ではアメリカとカナダのみ利用可能ですが、今後利用できる国を拡大するとのこと
    - ちなみに，[公式サイト](https://www.oktapersonal.com/)には ChatGPT による謎の愛のポエムが書かれています。~~こういう使い方でいいんだよ~~
      - > A love poem by ChatGPT
        >
        > Okta Personal, a name so fine,
        > A solution that keeps your data secure and divine.
        > A password manager, so easy to use,
        > With Okta, you’ll never feel confused.
        >
        > With passwords safe, and access so true,
        > You’ll have peace of mind, the whole day through.
        > No more forgotten passwords, no more stress,
        > Okta Personal, your digital life is blessed.
        >
        > Your personal life, now safe from harm,
        > With Okta Personal, you can keep calm.
        > So don’t wait, get started today,
        > And let Okta Personal, keep your digital life at bay.
  - [Slack AI で、仕事をもっとスマートに | Slack](https://slack.com/intl/ja-jp/blog/productivity/product-innovations-dreamforce-2023)
    - 以前発表された Slack GPT とは別の AI サービス Slack AI が発表されました
    - 次のようなことをしてくれるとか
      - チャンネルのハイライト生成
      - スレッドの要約生成
      - 質問に対する回答の検索
    - 気になる人は waitlist に登録しましょう

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# あとがき
合併号でした。いやー、前回に引き続きインターンの第二ターム受け入れがあった関係でだいぶ遅くなってしまいました。
やはり 2 週間分のネタがあると大変ボリューミーですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
