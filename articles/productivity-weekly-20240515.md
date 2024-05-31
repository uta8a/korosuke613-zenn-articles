---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-05-15)
emoji: 🪜
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240515
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
今週は 2024-05-15 単独号です。

今回が第 152 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Amazon S3 will no longer charge for several HTTP error codes
https://aws.amazon.com/jp/about-aws/whats-new/2024/05/amazon-s3-no-charge-http-error-codes/

課金対象にならないレスポンス
https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/ErrorCodeBilling.html

クラメソさん解説
https://dev.classmethod.jp/articles/amazon-s3-no-charge-http-error-codes/

## Was this repository recently moved? · Issue #980 · googleapis/release-please-action
https://github.com/googleapis/release-please-action/issues/980

5 月前半の短期間において、OSS のリリースをいい感じで自動化する GitHub Actions のカスタムアクション google-github-actions/release-please-action が利用できなくなっていました。現在は利用できますが、利用者は対応が必要です。

リポジトリが google-github-actions オーナーから googleapis オーナーへ移動したことにより、google-github-actions/release-please-action が not found 扱いになったことが原因です。GitHub のリポジトリが移動した場合、古いリポジトリを参照するとリダイレクトしてくれるようになっていますが、GitHub Actions においてはそうならないようです[^spec]。

結局、google-github-actions/release-please-action にコピーが作成＆アーカイブされ、現在は参照できます。
ただし、**google-github-actions/release-please-action は今後メンテされないため、利用者は googleapis/release-please-action へ移行する必要があります。**

こんなことが起こるとは思っていませんでした。Google の方も想定していなかったのかもしれませんね。
とりあえず利用者は早急に移行しましょう。

[^spec]: ここら辺詳しい仕様はよくわかってません。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## GitHub-hosted runners: Public Beta of Ubuntu 24.04 is now available - The GitHub Blog
https://github.blog/changelog/2024-05-14-github-hosted-runners-public-beta-of-ubuntu-24-04-is-now-available/

GitHub Actions において、Ubuntu 24.04 ランナーが利用可能になりました（public beta）。
`ubuntu-24.04` ラベルで利用できます。`ubuntu-latest` はまだ 22.04 です。

`ubuntu-24.04` ラベルのランナーにインストールされているソフトウェア一覧は、[actions/runner-images](https://github.com/actions/runner-images/blob/9d5d1be4828f3f7e54796a46d60afd0a2f9e05b0/images/ubuntu/Ubuntu2404-Readme.md) リポジトリで確認できます。
もし先に `ubuntu-24.04` で動くかどうか確認したいワークフローがある方は試しに使ってみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## クラウドでもsuが出来る! GCPにPAM(特権管理)がついに登場
https://zenn.dev/koduki/articles/47e433c12c5fad

Google Cloud において、ジャストインタイムの特権アクセス機能 Privileged Access Manager (PAM) がプレビューで使えるようになりました。

PAM を使うことで、Google Cloud 上での作業において、一時的に特権の必要な操作ができるようになります。
特権を得たいときは利用申請を行い、あらかじめ設定された承認者が承認することで、特権を得られます。承認者を設定しないことも可能で、その場合は利用申請して即利用できるようです。

この記事では、そんな PAM の概要やなぜ嬉しいか、実際に使ってみたログなどが紹介されており、どんな機能なのかわかりやすいです。
個人的にも普段は弱い権限で作業し、必要に応じて都度強い権限を使うようにしたいので、この機能はとても嬉しいですね。AWS にも同等の機能が来てほしいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 1Password SDKs Are Now Available in Beta | 1Password 
https://blog.1password.com/sdk-beta/

# know-how 🎓

## GitHub Actions 上での Go の Docker ビルドを高速化する
https://zenn.dev/takamin55/articles/8c68349a069b4c

生産性向上チームの [@takamin55](https://zenn.dev/takamin55) さんが書かれた記事で、GitHub Actions 上での Docker ビルドでも Go のキャッシュを効かせてビルド時間を短縮する方法を紹介しています。

GitHub Actions 上での Docker ビルドの高速化テクニックとして有名なのは Docker 公式が提供している [docker/build-push-action](https://github.com/docker/build-push-action) の `cache-from: type=gha` と `cache-to: type=gha,mode=max` オプションを利用する方法でしょう[^docker-layer-cache-gha]。これはビルド時のレイヤーキャッシュを GitHub Actions のキャッシュに保存することで次回以降のビルド時間を短縮しています。

ですがこの方法では Dockerfile 中の `RUN go build` のステップのレイヤーキャッシュが利用できなかった場合は結局 `go build` に時間がかかってしまいます。本来 Go はビルドキャッシュをローカルに残すので次回以降の `go build` は高速になるはずですが、Docker のビルドでは次回ビルド時に前回のキャッシュを利用できないためです。これは GitHub Action 上でもローカルマシンでも同様です。

[^docker-layer-cache-gha]: https://docs.docker.com/build/ci/github-actions/cache/#github-cache

最近の Docker はこの問題を解決するために `RUN --mount=type=cache` オプションを提供しています[^mount-type-cache]。このオプションを利用すると Docker のビルド時にキャッシュをローカルに保存することが可能になるため、 `go build` のようなキャッシュを利用できるコマンドに対して効果があります。ただ、残念ながら GitHub Actions はローカルマシンと異なりビルドのたびに毎回新しいマシンが割り当てられるため `RUN --mount=type=cache` のキャッシュが残っておらず、実質的に利用できないのです。

[^mount-type-cache]: https://docs.docker.com/build/guide/mounts/

というのが Docker ビルド内における `go build` のキャッシュ問題なのですが、この記事では `reproducible-containers/buildkit-cache-dance` という action を利用することでこの問題を解決し、Docker ビルドにおける `go build` のビルド時間を大幅に短縮できることを紹介しています。

https://github.com/reproducible-containers/buildkit-cache-dance

どのような仕組みでこの問題を解決しているのかについて図付きで分かりやすく解説してくれています。`buildkit-cache-dance` の README にはどのように実現しているのか具体的な方法は書かれていないため、図で紹介されていることで挙動を理解しやすかったです。

ちなみに [buildkit-cache-dance](https://github.com/reproducible-containers/buildkit-cache-dance) の README ではサンプルとして Go のビルドキャッシュ以外に apt-get のキャッシュにも有効であると紹介されています。Go に限らず GitHub Actions での Docker ビルド時間短縮に興味がある方は buildkit-cache-dance を試してみると良いかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Exploring Type-Informed Lint Rules in Rust based TypeScript Linters - Speaker Deck
https://speakerdeck.com/unvalley/exploring-type-informed-lint-rules-in-rust-based-linters

ESLint 以外の各種 TypeScript 向け Lint ツールが型情報を扱えない問題について今後どう解決される可能性があるのかを紹介しているスライドです。

TypeScript の Lint ツールとして有名なのは間違いなく ESLint ですが、最近では ESLint よりも高速であることを売りにする [Oxc](https://github.com/oxc-project/oxc) や [Biome](https://github.com/biomejs/biome) といった Rust 製の Lint ツールが登場しています。Lint に時間がかかってしまうと地味に開発速度が低下するため、ESLint から別の高速な Lint ツールに乗り換えるという選択肢は十分に考えられます。ですが、新しいツールは登場したばかりでいずれもこなれていないことに加えて、TypeScript の型情報を扱うことができないため型情報を利用した Lint ルールを作成することが難しいという問題があります。

すぐに解決する問題ではなさそうですが、TypeScript 5.5 に予定されている `--isolatedDeclarations` は少し期待ですね。

生産性向上チームでは ESLint v9 へのアップデートに苦労しており、いっそ ESLint の代わりに Biome への乗り換えを試し始めているところでした。 `no-floating-promises` のような便利だが型情報を必要とするルールについて Biome では諦めざるを得ないと思っていたところなので非常にタイムリーな話題でした。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## gh copilotにgit diffの入力を渡して、git stashの説明文を作ってもらう - hitode909の日記
https://blog.sushi.money/entry/2024/05/15/090000

# tool 🔨

## zenncast - 技術トレンドをAIがラジオに変換
https://zenncast-web.vercel.app/

Zenn のトレンド記事を AI を使ってまとめ、ラジオとして配信するサービス zenncast が公開されました。なんと毎日更新です。
毎朝 10 分程度で、Zenn のトレンドに上がった記事を 5 つピックアップし、本当のラジオのように紹介してくれます。通勤・通学中に聞くのに良さそうですね。

僕もちょくちょく聴いてるのですが、まるで本当のラジオのようでとてもびっくりしました。お便りも読んでくれます。
Web 上だけでなく、Spotify や Apple Podcasts でも配信されているため聴くためのハードルは低いです。

なお、作者による技術構成の解説記事も公開されています。ChatGPT のような AI を使って何かをする際の参考になると思います。

- [AIラジオ『zenncast』の技術構成（プロンプトつき）](https://zenn.dev/himara2/articles/db054d81b05d19)

とても面白い試みだと思いました。サービスの内容自体も勉強になるので、気になる人は聴いてみてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## ［速報］Google、Geminiベースの新WebIDE「Project IDX」をオープンベータで公開
https://www.publickey1.jp/blog/24/googlegeminiwebideproject_idx.html

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

<!-- textlint-disable @proofdict/proofdict -->

- **news 📺**
  - [Hello GPT-4o | OpenAI](https://openai.com/index/hello-gpt-4o/)
    - OpenAI で GPT-4o が利用できるようになりました
    - GPT-4 より高速で、かつ、音声や動画などの複数の種類や形式のデータに対応しているとか
    - ChatGPT の無料版でもリミットが来るまでは利用できるのですが、確かに応答が非常に速くなっていました
    - また、API 使用料金もその他のモデルより安く、GPT-4、GPT-4 Turbo と比べて半分以下の価格で利用できます
    - 実は本記事でもレビューに GPT-4o を使ってみるようにしました
      - [さっそく誤字を発見してくれています](https://github.com/korosuke613/zenn-articles/pull/694#discussion_r1618305678)
      - いつかその内容で記事を書いてみたいですね
  - [dependabot-core is now open source with an MIT license - The GitHub Blog](https://github.blog/changelog/2024-05-13-dependabot-core-is-now-open-source-with-an-mit-license/)
    - Dependabot のコア機能が MIT ライセンスでオープンソース化されました
    - コミュニティが Dependabot に貢献しやすくなったほか、Dependabot のコア機能を使った新しいツールを作成・利用することも可能になりました
- **know-how 🎓**
- **tool 🔨**

<!-- textlint-enable @proofdict/proofdict -->

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
