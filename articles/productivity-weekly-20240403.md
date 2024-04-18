---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-04-03)
emoji: 🎲
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240403
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
今週は 2024-04-03 単独号です。

今回が第 148 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Actions Usage Metrics public beta - The GitHub Blog
https://github.blog/changelog/2024-03-28-actions-usage-metrics-public-beta/

## Bringing enterprise-level security and even more power to GitHub-hosted runners
https://github.blog/2024-04-02-bringing-enterprise-level-security-and-even-more-power-to-github-hosted-runners/

GitHub-hosted なランナーに関して一気に複数のアップデートが行われたようで、それぞれの新機能に関する紹介記事です。changelog の方でも同じ内容がよりコンパクトにまとまっている記事が上がっています。

https://github.blog/changelog/2024-04-02-whats-new-for-github-actions-hosted-runners/

### 1. Azure private network との統合が GA

GitHub-hosted なランナーが Azure private network と接続できるようになる機能が去年の後半から Public Beta として提供されていましたが、今回 GA となりました。
この機能に関してはエーピーコミュニケーションズさんの記事が詳しいです。

https://techblog.ap-com.co.jp/entry/2023/12/08/120000

Public Beta からの差分として、今までの GitHub Enterprise Cloud プランに加え、GitHub Team プランでも利用が可能になったことと、利用可能な Azure のリージョンが追加されたようです。

### 2. macOS 14 のランナーが GA、 `macos-latest` ラベルのランナーは macOS 14 ランナー（M1）に切り替わる予定
今まで `macos-latest` は macOS 12（Intel）でしたが、GA に伴って今後は macOS 14（M1）に切り替わっていくようです。また、macOS の Larger runner である `macos-latest-xlarge` や `macos-latest-large` にも同様の変更が行われるとのことです。

https://github.blog/changelog/2024-04-01-macos-14-sonoma-is-generally-available-and-the-latest-macos-runner-image/

これらの記事では紹介されていないですが、標準ランナーと Larger runner のページもこのタイミングで更新されており、それによると `macos-latest` または `macos-14` は public リポジトリでも利用可能なようです。つまり、OSS 向けにもついに M1 の macOS ランナーが利用可能になったということですね！

macOS のランナーに関しては現状だと Large は Intel、XLarge は M1 であったりと大変ややこしいので、ランナーの種類とスペック一覧のページを確認することをおすすめします。

https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners#standard-github-hosted-runners-for-public-repositories

https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners/about-larger-runners#about-macos-larger-runners

### 3. Larger runner のスペックに 2vCPU Linux と 4vCPU Windows が追加
Larger runner という名前に反して標準ランナーの v4 CPU より小さい Linux ランナーが追加されました。用途としては先ほど紹介した Azure private network との統合や[Android向けのハードウェア仮想化機能](https://github.blog/changelog/2024-04-02-github-actions-hardware-accelerated-android-virtualization-now-available/)など Larger runner にしか提供されていない機能を利用しつつも、スペック自体は v2 CPU で十分なユースケースを想定しているのだと思われます。

### 4. GPU 付きの Linux と Windows ランナーの提供が public beta で開始
GPU 付きのランナーは[今までprivate beta](https://github.blog/changelog/2023-10-31-run-your-ml-workloads-on-github-actions-with-gpu-runners/)でしたが、public beta として利用可能になったようです。


アップデートは以上です。GitHub-hosted なランナーも様々な種類が増えてきており、用途に応じた OS やスペックを選択可能になってきましたね。macOS ランナーのラベルは非常にややこしいのが残念ですが、Intel から M1 のマシンに切り替わる移行期が終われば使いやすいラベルになることを期待しています。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Dependabot grouped security updates generally available - The GitHub Blog
https://github.blog/changelog/2024-03-28-dependabot-grouped-security-updates-generally-available/

## Code security configurations let organizations easily roll out GitHub security products at scale - The GitHub Blog
https://github.blog/changelog/2024-04-02-code-security-configurations-let-organizations-easily-roll-out-github-security-products-at-scale/

## 脆弱性の検出から修正提案まで：GitHub CopilotとCodeQLを利用したCode Scanningの自動修正機能 - GitHubブログ
https://github.blog/jp/2024-03-28-found-means-fixed-introducing-code-scanning-autofix-powered-by-github-copilot-and-codeql/

## Style Guide - Configuration Language | Terraform | HashiCorp Developer
https://developer.hashicorp.com/terraform/language/style

Terraform がスタイルガイドを公開しました。スタイルガイドは 2 つのセクションに分かれています。

最初のセクションでは、書式やリソースの構成などコードのスタイルに関する推奨事項が扱われています。
例えば、リソースの命名規則、定義の順序、コメントの書き方などが解説されています。

2 つ目のセクションでは、ライフサイクル管理、バージョン管理、機密データ管理など、運用とワークフローに関する推奨事項が扱われています。
例えば、プロバイダ・モジュールのバージョンを固定することやシークレットの管理方法などが解説されています。
v1.6 から導入された `terraform test` における Unit Test にも触れられています。

全体として、違和感がある内容は無く、リソース定義の順序や `description` と `validation` はちゃんと書かねば…という気持ちになりました。

これまで、有力な Terraform のスタイルガイドは [Google Cloud が公開しているもの](https://cloud.google.com/docs/terraform/best-practices-for-terraform?hl=ja)しかありませんでした。
公式でスタイルガイドが公開されたことでクラウドベンダーに依らないスタイルが統一されそうでいいですね。

次の記事では日本語で要約を書いてくださっているので、英語がつらい場合はこちらを見るとよさそうです。
https://qiita.com/ogatango/items/9cd57fe8c48b1c03b2bd

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## GitHub Copilot Enterprise - March 2024 update - The GitHub Blog
https://github.blog/changelog/2024-03-29-github-copilot-enterprise-march-2024-update/

## デジタル社会推進標準ガイドラインに CI／CDパイプラインにおけるセキュリティの留意点に関する技術レポートが追加されました
https://www.digital.go.jp/resources/standard_guidelines

デジタル庁から [CI/CD パイプラインにおけるセキュリティの留意点に関する技術レポート](https://www.digital.go.jp/assets/contents/node/basic_page/field_ref_resources/e2a06143-ed29-4f1d-9c31-0f06fca67afc/33f31336/20240329_resources_standard_guidelines_guideline_01.pdf)が公開されています。

近年のアジャイル的な開発手法の普及により、迅速な変更要求に応えて効率的に変更差分をリリースできる体制が求められ、それに伴い CI/CD パイプラインの重要性が高まっています。
CI/CD パイプラインは高い権限を持つため、セキュリティの観点からも注意が必要です。そこで、本レポートではローカル作業フェーズ、ビルドフェーズ、デリバリフェーズの 3 つのフェーズに分けて、それぞれのフェーズでのセキュリティの留意点を解説しています。

最小権限の原則やトークンの管理とローテーションなど基本的なセキュリティ対策から、OpenID Connect を用いるべきといった具体的なアドバイスまで幅広くカバーしています。
CI/CD パイプラインを構築する人は必読の内容です。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Linux Foundation Launches Open Source Valkey Community
https://www.linuxfoundation.org/press/linux-foundation-launches-open-source-valkey-community

背景として、NoSQL として広く知られ使われている Redis は、現在 Redis Ltd によってホストされ、マネタイズされています。
Redis Ltd の 3 月のこのブログ記事によって、Redis のライセンスが BSD License 2.0 から RSALv2（Redis Source Available License）と SSPLv1（Server Side Public License）のデュアルライセンスに変更されることが発表され、大きな話題を呼んだことは記憶に新しいですね。
https://redis.io/blog/redis-adopts-dual-source-available-licensing/

Redis を使った商用サービスを提供している大手クラウドベンダーらは Redis Ltd と別途契約を結ぶ必要があるとのことです。
Microsoft は先のブログ記事中で Redis Ltd と協力していく旨コメントしていますが、AWS や GCP は特にコメントが無く、今後どのように Redis を使っているサービスが提供されるのか注目されていました。

今回 Linux Foundation が Redis のライセンス変更前である 7.2.4 の時点からフォークし、Valkey の名でオープンソースとして開発を継続し提供していくことを発表しました。
発表の記事中で AWS や GCP（の中にいる元 Redis コントリビューター）などがコメントを寄せており、これらクラウドベンダーが提供する Redis を使っているサービスが今後 Valkey に置き換わっていくことが想定されます。

あの Linux Foundation がフォークするとのことで、今後も安定して続いていきそうな安心感がありますね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## The Wrong Way to Use DORA Metrics - The New Stack
https://thenewstack.io/the-wrong-way-to-use-dora-metrics/

近年、組織の開発生産性指標としてよく使われる DORA Metrics(Four Keys) が定着してきました。
Four Keys に基づいて組織の課題を把握したり、改善活動を行うことがあると思います。
その際に気をつけるべき誤用やメトリクスハック・キャンベルの法則などについて、具体例を交えて解説されており、分かりやすかったです。

パフォーマンスが良い組織は Four Keys 指標が高くても、逆に Four Keys 指標が高いからといってパフォーマンスが良いわけでは無かったり、Four Keys 指標が悪くてもビジネス的価値を生み出している場合もあるということには注意しておきたいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 一日30回リリースを可能にするpixiv開発 - Speaker Deck
https://speakerdeck.com/picopico/ri-30hui-ririsuwoke-neng-nisurupixivkai-fa

## どのようにして Findy Team+フロントエンドチームは高速な開発をしているか 〜開発フロー編〜 - Findy Tech Blog
https://tech.findy.co.jp/entry/2024/04/01/080000

開発生産性の可視化・分析をサポートする Findy Team+の開発チームにおける CI 高速化、レビューへの反応速度、プルリクエストの分類、デプロイ前の確認項目のテンプレート化など、開発フローを改善した事例が紹介されています。

個人的には、クラウド上のキャッシュを利用して依存関係から不要なテストをスキップさせる[Nx](https://nx.dev/)というビルドシステムを活用とした結果として、CI の待ちの時間を最小化してすぐにレビュー依頼を出せるように **プルリクエストをなるべく小さくする** という力学が働くようになったという点が面白かったです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Fargate Spotを本番運用するための監視の実践 - KAYAC engineers' blog
https://techblog.kayac.com/monitor-fargate-spot-prod

Farget Spot は Amazon ECS で選べるプロバイダの 1 つで、Fargate とは違って予備のコンピュートキャパシティで動作し、安く使用できますが AWS の都合でタスクの中断が発生し得ます。

この記事では、いかにして Spot のタスクの使用率や中断率をモニタリングできるようにしたかが詳しく書かれています。
個人的には、ECS タスクの停止理由を CloudWatch Logs に保存し、そこから Fargate Spot の中断を検出するのが面白いと思いました。

個人のプライベートプロジェクトで運用している ECS でも、この記事を参考にさらなる監視を導入してみます。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# tool 🔨

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
