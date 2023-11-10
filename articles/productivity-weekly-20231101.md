---
title: "＜ここにタイトルを入力＞：Productivity Weekly (2023-11-01号)"
emoji: "🎴"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231101"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-01 単独号です。

今回が第 131 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
- [@uta8a](https://zenn.dev/uta8a)

:::

# news 📺

## Accelerate your CI/CD with Arm-based hosted runners in GitHub Actions - The GitHub Blog
https://github.blog/changelog/2023-10-30-accelerate-your-ci-cd-with-arm-based-hosted-runners-in-github-actions/

## Run your ML workloads on GitHub Actions with GPU runners - The GitHub Blog
https://github.blog/changelog/2023-10-31-run-your-ml-workloads-on-github-actions-with-gpu-runners/


## Serverless Framework V4: A New Model
https://www.serverless.com/blog/serverless-framework-v4-a-new-model

今後リリースされる Serverless Framework v4 の紹介記事です。Serverless Framework v4 で予定していることが載っています。

- 破壊的変更無し
- FaaS とサーバーレスコンテナを簡単に切り替えられる
- 新たに Serverless Framework を拡張するエクステンションが登場
- 重要なエクステンションのコントリビューターには報酬が支払われる
- 年間収益が 200 万ドルを超える組織で利用する場合は有料になる
- 新しいパートナープログラムの提供

色々気になるトピックはありますが、特に利用者に影響があるのは年間収益が 200 万ドルを超える組織で利用する場合は有料となる点です。
（「FaaS とサーバーレスコンテナを簡単に切り替えられる」の部分は詳細が気になるところですが、まだ詳細は発表されていません。エクステンションは雑に言うとコンテナ化されたプラグインっぽい）

> **New Fee Structure**: For organizations with annual revenue exceeding $2M, we're introducing some fees that apply to V.4 and beyond. We're a small team. We need to fuel further innovation, and this is a step in that direction. This also helps kick-start a new ecosystem.

今後の価格変更については詳細に色々載っています（ただし具体的な計算方法はまだ）。

- v3 は無料のまま
- v3 は 2024 年まで保守が継続される
- インスタンスとエクステンションの数に応じて段階的に料金が設定される
  - インスタンスはデプロイされた Serverless Framework を指す（AWS アカウント ID、service、stage、region のセット）
    - 当月内で 5 日以上デプロイされた状態にある場合のみ適用
  - エクステンションは v4 からの新しい概念
- 最低の月額料金は $49 から
- ボリュームライセンスが提供される

まだ実際に v4 がリリースされたわけではないので、記事に載っている内容は変更される可能性があります。
また、具体的な課金の計算方法が不明瞭であるなど、今後新たな情報が出ることが予想されます。
料金計算が面倒になるなら人為的コストを減らすために他のツールに移行するや、v3 を独自に保守するという選択肢もあるかもしれませんね。

身構えつつ v4 のリリースをお祝いしたいです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Dependabot user-defined rules for security updates and alerts; enforcement of auto-triage rules and presets for organizations (public beta) - The GitHub Blog
https://github.blog/changelog/2023-10-26-dependabot-user-defined-rules-for-security-updates-and-alerts-enforcement-of-auto-triage-rules-and-presets-for-organizations-public-beta/

Dependabot の Auto-triage rule により、頻繁にアラート通知が鳴ったりプルリクエストが作成されたりといったことがないようにできます。
開発環境のみの依存関係でかつ悪用のリスクが低い場合はアラートが鳴らしたくない、プルリクを作成してほしくないケースがあるかと思いますが、それを実現できます。

2023 年 9 月頃からはリポジトリごとにカスタムルールが作成できるようになっていたようで、アラート通知やプルリクエスト作成の条件を設定できるようになっています。

今回のアップデートでは、organization 単位でルールを設定し organization 下のリポジトリでルールを強制することが可能になりました。

organization 下のルールは次のように有効無効の設定ができます。
- Enable: リポジトリではデフォルトで有効になるがリポジトリごとに無効にもできる
- Enforced: デフォルトで有効になり無効にできない
- Disabled: ルールは無効でリポジトリの設定画面に表示されない

またカスタムルールにより、脆弱性の脅威レベルや開発環境のみの依存関係を含めるのかなどを設定できます。

本機能は全パブリックリポジトリで使用できます。プライベートリポジトリで使用するには GitHub Advanced Security を有効化する必要があります。

脆弱性の影響があるアラートだけにしたい場合、そのようにルールを作成して organization 一括で設定できるのは嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Introducing HAR Sanitizer: secure HAR sharing
https://blog.cloudflare.com/introducing-har-sanitizer-secure-har-sharing/

2023 年 10 月に Cloudflare は Okta から流出したセッショントークンによって攻撃を受けました。（この攻撃自体は直ちに検出、処理され影響を受けなかったそうです、凄い）
攻撃者は Okta にアップロードされた HAR ファイルからセッショントークンを抜き出し、使用したそうです。

HAR ファイルは HTTP Archive の略で、ウェブブラウザが行ったリクエストとレスポンスを記録した JSON ファイルです。
標準化されており、ユーザーは簡単に HAR を作成してサポートに送ることで、サポートはトラブルシューティングに役立てることができます。
ただし、HAR には往々にしてセッションの情報が含まれており、これが漏洩すると攻撃者はこのセッションを使用して攻撃を進めることができてしまいます。

そこで Cloudflare はフォローアップとして、HAR ファイルからセッション情報を除外するサニタイザを開発し、オープンソースで公開しました。
サニタイズはクライアントでのみ行われるため、Cloudflare がセッショントークンを取得することは無いとのことです。

https://har-sanitizer.pages.dev/

今後サニタイズできるセッショントークンのタイプを増やしていくとのことです。

攻撃を即検出、処理してるのも凄いですし、より攻撃の機会を減らすために HAR ファイルのサニタイザを作って、さらにオープンソースで公開してくれるのが痺れます。
いずれはウェブブラウザの方にサニタイズの設定が入ってほしい気がしますが、それまではこのサニタイザを使わせてもらいましょう。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Announcing remote cache support in Amazon ECR for BuildKit clients | Containers
https://aws.amazon.com/jp/blogs/containers/announcing-remote-cache-support-in-amazon-ecr-for-buildkit-clients/

コンテナイメージをビルドする際のレイヤーキャッシュ先に ECR を利用することが可能になりました。これにより、例えば CI 環境でビルドする際に ECR をキャッシュ先として利用することでビルド時間を短縮できる場合があります。

Docker や Finch などでコンテナをビルドする際には buildkit が使われています。buildkit がレイヤーキャッシュをコンテナレジストリに保存可能[^inline_cache]になったのも比較的最近ですが、GitHub Container Registry などでは既に対応済みであったものの ECR は未対応だったため対応を望む [issue](https://github.com/aws/containers-roadmap/issues/876) が以前から存在していました。ECR を対応させるために buildkit 側にも修正が必要だったようで、Buildkit の比較的新しい v0.12 が必要です。ですが、GitHub Actions で `docker/setup-buildx-action@v3` を利用している場合はデフォルトで latest の Buildkit がセットアップされるのでほぼ問題ないはずです。

[^inline_cache]: 一時期流行った `BUILDKIT_INLINE_CACHE=1` による inline cache とは別物です。inline cache はマルチステージビルドではあまり有用ではないため、Dockerfile が複雑化しがちな昨今では `--cache-to=type=registy` によるキャッシュの方が有用なケースが多いです（参考: [Inline cache](https://docs.docker.com/build/cache/backends/inline/)）

記事中に `docker build` コマンドもサンプルも紹介されていますが、自分でも試してみました。

:::details ECR へのレイヤーキャッシュを実験してみた。

まずまっさらな buildkit を buildx でセットアップします。

```bash
# buildxで使用するbuildkitのコンテナを用意
$ docker buildx create --use --bootstrap --name=container_builder

# buildkit v0.12.3がセットアップされたことを確認 
$ docker buildx ls
NAME/NODE            DRIVER/ENDPOINT  STATUS  BUILDKIT        PLATFORMS
container_builder *  docker-container
  container_builder0 rancher-desktop  running v0.12.3         linux/arm64
default                               error
rancher-desktop      docker
  rancher-desktop    rancher-desktop  running v0.10.6+d52b2d5 linux/arm64
```

キャッシュを体感するためにある程度複雑な Dockerfile として [actions/runner](https://github.com/actions/runner) でビルドしてみます。

```bash
$ time docker buildx build \
  -f images/Dockerfile \
  --platform=linux/arm64 \
  --build-arg RUNNER_VERSION=2.311.0 \
  --progress=plain \
  -t actions_runner \
  .

# ビルドログは省略
real	0m32.814s
user	0m0.185s
sys	0m0.154s
```

キャッシュなしの状態だと大体 30 秒ぐらいでした。次に記事のサンプルコマンドのように `--cache-to` と `--cache-from` を追加します。記事の内容を見るに `image-manifest=true,oci-mediatypes=true` のオプション追加が今回の ECR 対応で重要なようなのでこれも忘れずに付与します。

```bash
time docker buildx build \
  -f images/Dockerfile \
  --platform=linux/arm64 \
  --build-arg RUNNER_VERSION=2.311.0 \
  --progress=plain \
  -t actions_runner \
  --cache-to mode=max,image-manifest=true,oci-mediatypes=true,type=registry,ref=568211859639.dkr.ecr.ap-northeast-1.amazonaws.com/test_actions_runner_registry_cache:latest \
  --cache-from type=registry,ref=568211859639.dkr.ecr.ap-northeast-1.amazonaws.com/test_actions_runner_registry_cache:latest \
  .

...省略
#17 [stage-1 7/7] RUN install -o root -g root -m 755 docker/* /usr/bin/ && rm -rf docker
#17 CACHED

#18 exporting cache to registry
#18 preparing build cache for export
#18 writing layer sha256:07e38af80e6b968767f997a2ecd8da3b748ed951e13a8bde4671c9904075c0c3
#18 writing layer sha256:07e38af80e6b968767f997a2ecd8da3b748ed951e13a8bde4671c9904075c0c3 0.5s done
#18 writing layer sha256:3b276d84631221acbfb60b0874fc465f467202c0f32511f4010fb142766a558a
#18 writing layer sha256:3b276d84631221acbfb60b0874fc465f467202c0f32511f4010fb142766a558a 4.7s done
#18 writing layer sha256:45126cbc69b8cc16e2438602e46fe9fbba6c68a1b575f9f8183de649cdd05416
#18 writing layer sha256:45126cbc69b8cc16e2438602e46fe9fbba6c68a1b575f9f8183de649cdd05416 2.6s done
#18 writing layer sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1
#18 writing layer sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1 0.4s done
#18 writing layer sha256:6fde64232a954738f9f20c8e7c99329300d65a8cb449d00d7f2b8e2fa5fd4025
#18 writing layer sha256:6fde64232a954738f9f20c8e7c99329300d65a8cb449d00d7f2b8e2fa5fd4025 12.6s done
#18 writing layer sha256:7839b2e96519022f83d121711517cdfa2c532d646b87229d8c3cb054fde47a86
#18 writing layer sha256:7839b2e96519022f83d121711517cdfa2c532d646b87229d8c3cb054fde47a86 0.4s done
#18 writing layer sha256:bd05a799608064489df0e5df198b4dae4c7e81e59517a99cd4a62936d13a92b8
#18 writing layer sha256:bd05a799608064489df0e5df198b4dae4c7e81e59517a99cd4a62936d13a92b8 1.3s done
#18 writing layer sha256:bfbe77e41a78ee38147c5761aa8bc896d9f6e1e648b23468f294065ffe03c107
#18 writing layer sha256:bfbe77e41a78ee38147c5761aa8bc896d9f6e1e648b23468f294065ffe03c107 3.3s done
#18 writing layer sha256:c0361b6de73548b79aaf2dc6a7692f02458a93fac9443631a27adf286df8c45e
#18 writing layer sha256:c0361b6de73548b79aaf2dc6a7692f02458a93fac9443631a27adf286df8c45e 2.1s done
#18 writing layer sha256:d7df41c61c08081c37036fa14aa0ffdbaa19dc4fec64dc7fca56ea08bb842e3c
#18 writing layer sha256:d7df41c61c08081c37036fa14aa0ffdbaa19dc4fec64dc7fca56ea08bb842e3c 6.3s done
#18 writing layer sha256:d9ba36b545b7658dc3040fa7e493880406b2fbe016d4e9c99ccec890b182edc6
#18 writing layer sha256:d9ba36b545b7658dc3040fa7e493880406b2fbe016d4e9c99ccec890b182edc6 0.6s done
#18 writing layer sha256:f8c41563db44116d108aac25f7bf0f3cba1b66d55e9908c36849cc58121a6ebc
#18 writing layer sha256:f8c41563db44116d108aac25f7bf0f3cba1b66d55e9908c36849cc58121a6ebc 7.6s done
#18 writing layer sha256:fb01bbeeb5b5818531215f4f7cf6f8738cf8a9ecfc5394e2749e4d3e701caa19
#18 writing layer sha256:fb01bbeeb5b5818531215f4f7cf6f8738cf8a9ecfc5394e2749e4d3e701caa19 3.8s done
#18 writing config sha256:fd46e3d764a2a32fe8a9d3da4557ddbbc336890a11dc539ccbb5cb416d2e9868
#18 writing config sha256:fd46e3d764a2a32fe8a9d3da4557ddbbc336890a11dc539ccbb5cb416d2e9868 0.5s done
#18 writing cache image manifest sha256:33f226dc320279b6b4663ae462e3110782105132f37e0fe3aa6d7163d1dc186a
#18 preparing build cache for export 47.2s done
#18 writing cache image manifest sha256:33f226dc320279b6b4663ae462e3110782105132f37e0fe3aa6d7163d1dc186a 0.4s done
#18 DONE 47.2s
------
 > importing cache manifest from 568211859639.dkr.ecr.ap-northeast-1.amazonaws.com/test_actions_runner_registry_cache:latest:
------
WARNING: No output specified with docker-container driver. Build result will only remain in the build cache. To push result image into registry use --push or to load image into docker use --load

real	0m48.142s
user	0m0.146s
sys	0m0.152s
```

ビルド自体は先ほどのキャッシュが残ってるので全部スキップされているのですが、キャッシュをレジストリに保存するための push 処理で時間がかかったようです。これ自体は仕方ないですね。

ではいよいよキャッシュを利用できるか確認してみます。まずはローカルに残っている最初にビルドしたときのキャッシュを削除し、その後に同じコマンドでビルドしてみます。

```
# キャッシュを削除
$ docker buildx prune

time docker buildx build \
  -f images/Dockerfile \
  --platform=linux/arm64 \
  --build-arg RUNNER_VERSION=2.311.0 \
  --progress=plain \
  -t actions_runner \
  --cache-to mode=max,image-manifest=true,oci-mediatypes=true,type=registry,ref=568211859639.dkr.ecr.ap-northeast-1.amazonaws.com/test_actions_runner_registry_cache:latest \
  --cache-from type=registry,ref=568211859639.dkr.ecr.ap-northeast-1.amazonaws.com/test_actions_runner_registry_cache:latest \
  .

...省略
#17 [stage-1 7/7] RUN install -o root -g root -m 755 docker/* /usr/bin/ && rm -rf docker
#17 CACHED

#18 exporting cache to registry
...省略
#18 writing cache image manifest sha256:92e621cb79da052adde766a6fae517c6df19739e239d59d86bb6fcc83b3add62 0.2s done
#18 DONE 1.4s
WARNING: No output specified with docker-container driver. Build result will only remain in the build cache. To push result image into registry use --push or to load image into docker use --load

real	0m2.770s
user	0m0.107s
sys	0m0.092s
```

:::

最後のログでは省略してしまいましたが、全レイヤーが CACHED とログに表示されていたので手元では一切ビルド処理が走っていないことが確認できます。time の結果も数秒となっており、体感でもほぼ一瞬でした。たしかにレイヤーキャッシュを ECR に読み書きすることが可能になったようです！

このようにキャッシュを活用するとビルド時間を大幅に削減できる場合もあるためぜひ活用していきたいですね。ちなみに buildkit のレイヤーキャッシュはまだ experimental ではありますが [S3](https://github.com/moby/buildkit?tab=readme-ov-file#s3-cache-experimental) や [GitHub Actions のキャッシュ](https://github.com/moby/buildkit?tab=readme-ov-file#github-actions-cache-experimental) などにも保存可能なので、キャッシュ先として必ずしも ECR のようなコンテナレジストリが必要というわけではありません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

# know-how 🎓

## RailsアプリのCI高速化
https://r7kamura.com/articles/2023-10-31-rails-ci

Rails アプリの CI にかかる時間を 8 分から 3 分半に短縮するまでに行った改善が書かれています。

以下のように地道な改善がなされています。

- Larger runner の利用
- テストを並列に実行するために [`parallel_tests`](https://github.com/grosser/parallel_tests) を利用
- [`r7kamura/split-tests-by-timings`](https://github.com/r7kamura/split-tests-by-timings) を用いたテスト配分の調整
- GitHub Container Registry を利用してカスタムの Docker イメージを持ってくることで依存関係のインストールを skip する
- gem group を整理して、ジョブで必要な gem のみインストールする

「テストを並列に行う」「依存関係は事前にまとめておく」「そのジョブで必要な依存のみを入れる」など、Rails 以外の場面でも大切な CI 高速化 Tips が書かれています。
Rails アプリ開発者の方も、そうでない方もぜひ参考にしてみてはいかがでしょうか。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Four Keysと開発生産性について取り組んできたこと - Chatwork Creator's Note
https://creators-note.chatwork.com/entry/four_keys_and_dev_productivity

Chatwork さんのフロントエンドチームで開発生産性を測るために、Four Keys を計測した話です。

まずは自分たちで PR 集計のツールを運用し、メトリクスの可視化を行ったそうです。
自前運用は素早く始められたので、全体傾向の把握には適していたそうですが、メンテナンスや機能改善などの面で運用コストが高くなってしまったそうです。

そこで Findy Team+ を導入することで、上述の運用コストを解決したそうです。

注意点として、集計の定義に合わせて運用フローを変える必要があるという点が挙げられています。
メトリクス集計のために運用フローを変えること自体にも工数が取られますし、変更によっては開発者の負担が増えてしまう可能性もあり本末転倒となってしまう述べられており、とても共感できました。

また、可視化された結果から何を読み取ればいいかわからないという問題があったそうです。
数値を追い求めるのではなく、大切なのは数値を用いて、ブランチ戦略やリリースフローの改善に取り組むことだと述べられています。

ここ数年で開発生産性といえば Four Keys 指標というのが定着してきている印象があります。
最近では、実際に Four Keys の計測をどのように実施するか、 Four Keys をどうやって改善していくかついての話題が増えてきており、フェーズが進んでいるなと感じます。

全体として共感できる内容が多く、Four Keys 活用の際に参考にしたい内容でした。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## [プレビュー]Google CloudリソースをTerraformにエクスポートしてみた。(+Cloud ConsoleからリソースのHCLを確認する小ネタ) | DevelopersIO
https://dev.classmethod.jp/articles/202310_googlecloud_exporthcl/

Google Cloud 上に存在する既存のリソースを Terraform (.tf ファイル) にエクスポートする機能の紹介記事です。
公式ドキュメントは[こちら](https://cloud.google.com/docs/terraform/resource-management/export?hl=ja)です。

`gcloud beta resource-config bulk-export --resource-format=terraform` コマンドを使うことで、既存のリソースを Terraform で管理できるようになります。

リソースフォーマットは Kubernetes Resource Model YAML (krm) と Terraform HCL (terraform) 2 種類から選べるそうです。

デフォルトでは存在するすべてのリソースがエクスポートされますが、`--resource-types` フラグを用いると特定のリソースのみを出力するようにフィルタリングもできます。
例えば、`--resource-types=ComputeFirewall,ComputeInstance` というようにカンマ区切りで指定すると、`ComputeFirewall` と `ComputeInstance` のみが出力されます。
ただ、現時点では beta 機能ということもあり、すべてのリソースタイプがサポートされているわけではないようです。
対応しているリソースタイプは `gcloud beta resource-config list-resource-types` で確認できます。

Terraform v1.5 で追加された `import` ブロックに併せ、Terraform の始めやすさが増していますね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->
