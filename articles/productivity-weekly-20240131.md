---
title: "ActionsでM1 Macが無料で使えるように。DockerやGoの話も｜Productivity Weekly(2024-01-31号)"
emoji: "🌭"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240131"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-01-31 単独号です。

今回が第 141 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

:::message
来週号（2024-02-07 号）は、他の社内イベントで Productivity Weekly が開催されなかったためお休みです。
:::

# news 📺

## GitHub Actions で M1 macOS ランナーが public リポジトリで無料に使えるようになりました

- [GitHub Actions: Introducing the new M1 macOS runner available to open source! - The GitHub Blog](https://github.blog/changelog/2024-01-30-github-actions-introducing-the-new-m1-macos-runner-available-to-open-source/)
- [GitHub Actions: macOS 14 (Sonoma) is now available - The GitHub Blog](https://github.blog/changelog/2024-01-30-github-actions-macos-14-sonoma-is-now-available/)

[去年 10 月に GitHub Actions において M1 macOS ランナーが public beta として利用可能となりましたが](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231004#github-actions%3A-apple-silicon-(m1)-macos-runners-are-now-available-in-public-beta!---the-github-blog)、larger runners としての提供であったため、無料での利用はできませんでした。

しかし、今回新たに macOS 14 (Sonoma) のランナー（`macos-14`）が追加されたことにより、public リポジトリにおいては無料枠内で M1 Mac ランナーを利用できるようになりました！
今回新たに追加されたランナーは `macos-14`、`macos-14-large`、`macos-14-xlarge` の 3 つであり、無料枠内で利用できる `macos-14` ランナーのスペックは 3 vCPU、7GB RAM、14GB ストレージとなっています。

また、新たなランナー追加に伴い、`macos-11` は直ちに deprecated かつ 2024/6 に廃止予定となり、latest 系イメージは 2024/4-6 に macOS 14 系を指すように変更される予定となります。

ここら辺のラベルはとてもややこしいです。同じ生産性向上チームの [@miyajan](https://zenn.dev/miyajan) さんが各ラベルの状況をまとめてくれたので、以下に引用します。

- `macos-11`: deprecated。2024/6 終了予定
- `macos-13`, `macos-13-large`: Intel Mac（今回特に変更なし）
- `macos-13-xlarge`: M1 Mac。beta が外れて GA に
- `macos-14`: 今回追加。M1 Mac。public リポジトリ無料、beta
- `macos-14-large`, `macos-14-xlarge`: 今回追加。M1 Mac。有料のみ、beta
- `macos-latest`, `macos-latest-large`: 今は macOS 12 系を指すが、2024/4-6 に macOS 14 系を指すように変更予定
- `macos-latest-xlarge`: 今は macOS 13 を指すが、2024/4-6 に macOS 14 系を指すように変更予定（たぶん）

とうとう M1 Mac ランナーが無料で利用できるようになりましたね！これで OSS の開発者も M1 Mac でのビルドが手軽にできるようになります。
もはや Intel Mac は手に入れるのが難しいので、開発環境と CI 環境のアーキテクチャの違いに悩まされることも減ってきそうです。

:::message
なお、public beta の頃の M1 Mac ランナーは、REST API の `/enterprises/{enterprise}/settings/billing/actions` に利用量が[含まれない雰囲気だった](https://github.com/orgs/community/discussions/69211#discussioncomment-7237362)のですが、今回 `macos-13-xlarge` が GA になったことで含まれるようになったんですかね？誰か知ってたら教えてください。
:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Dockerのビルドが最大40倍高速になる「Docker Build Cloud」提供開始。Appleシリコン/AWS Graviton用のビルドにも対応
https://www.publickey1.jp/blog/24/docker40docker_build_cloudappleaws_graviton.html

昨年に告知されていた Docker Build Cloud が提供開始されました。Buildkit のビルダーを Docker 社がマネージドサービスとして提供する形で、個人的には予想通りでした。

`docker buildx build` が裏で利用している Buildkit は一般的には Docker Desktop に付属されているものが利用されていますが、ネットワーク経由でリモート上に構築されている Buildkit に接続することも以前から可能でした。ローカルでビルドするとレイヤーキャッシュによって 2 回目以降のビルドは高速になることは誰でも体験済みだと思いますが、リモート上にある Buildkit をチームで共有して利用するとそのレイヤーキャッシュを全員で共有する形になります。そのため、多くの場面でキャッシュが効くことでビルドが高速化される可能性があります。

個人的にはその他にも `RUN --mount=type=cache` 機能でさらにキャッシュを利用して高速化できたり、リモートなので逆にビルドしたイメージを手元に `--load` で持ってくるのは時間がかかるだろうと予想していたのですが、その辺りも含めて実際に試された結果をまとめてくれている記事がありました。ローカルのマシンに加えて CircleCI からこの Docker Build Cloud を利用された結果も紹介されているので、使用感について興味がある方はぜひ読んでみてください。

https://shepherdmaster.hateblo.jp/entry/2024/02/04/104330

:::details 自分でも実際に Docker Cloud Build を試してみた記録
両方の記事でも紹介されているように、無料の Personal プランでも 50 分/月までは Docker Build Cloud も無料[^need_credit_card]で利用可能です。

[^need_credit_card]: ただし、クレジットカードの登録は必要です。

https://www.docker.com/products/build-cloud/ の右上の"Get Started"ボタンか、あるいは次の URL から直接ビルダーの管理ページに飛べるはずです。

`https://build.docker.com/accounts/${DOCKERHUBのアカウント名}/builders`

ビルダーの管理画面までたどり着ければ次のようなセットアップコマンドが表示されるので、それを順番に実行していきます。

```bash
docker login

# リモートのビルダーを作成
docker buildx create --driver cloud ${DOCKERHUBのアカウント名}/cloud

# 単発でリモートのビルダーを使用する場合
docker buildx build --builder ${作成したビルダーの名前} --tag myorg/some-tag .

# `docker buildx build` で利用するビルダーのデフォルトを切り替える場合
docker buildx use ${作成したビルダーの名前} --global
```

実際に [actions/runner](https://github.com/actions/runner) のリポジトリで GitHub Actions のセルフホストランナー用のイメージをビルドしてみます。

```bash
$ time docker buildx build --builder MY_CLOUD_BUILDER \
  --no-cache \
  -f images/Dockerfile \
  --platform=amd64 \
  --build-arg "RUNNER_VERSION=2.313.0" .
real    0m29.880s
user    0m0.280s
sys     0m0.144s
```

この Dockerfile は Arm 版のビルドにも対応しているので `--platform=arm64` オプションも試してみます。自分のマシンは x86 の WSL2 上で動かしている ubuntu のため、通常であれば Arm のビルドは QEMU のエミュレーションでかなり遅くなるはずですが、Docker Build Cloud ではどうでしょうか。

```bash
$ time docker buildx build --builder MY_CLOUD_BUILDER \
  --no-cache \
  -f images/Dockerfile \
  --platform=arm64 \
  --build-arg "RUNNER_VERSION=2.313.0" .
real    0m32.735s
user    0m0.211s
sys     0m0.246s
```

いいですね！Docker Build Cloud が Arm ネイティブのリモートビルダーも用意してくれているため、x86 版のイメージをビルドするのとほぼ変わらない速度でビルドが完了しました。


#### 動作確認環境:

`Windows版 Docker Desktop 4.27.1`

```bash
$ docker buildx version
github.com/docker/buildx v0.12.1-desktop.4 6996841df2f61988c2794d84d33205368f96c317

$ docker version
Client:
 Cloud integration: v1.0.35+desktop.10
 Version:           25.0.2
 API version:       1.44
 Go version:        go1.21.6
 Git commit:        29cf629
 Built:             Thu Feb  1 00:22:06 2024
 OS/Arch:           linux/amd64
 Context:           default

Server: Docker Desktop
 Engine:
  Version:          25.0
  API version:      1.44 (minimum version 1.24)
  Go version:       go1.21.6
  Git commit:       fce6e0ca9bc000888de3daa157af14fa41fcd0ff
  Built:            Thu Feb  1 00:14:41 2024
  OS/Arch:          linux/amd64
  Experimental:     true
 containerd:
  Version:          1.6.28
  GitCommit:        ae07eda36dd25f8a1b98dfbf587313b99c0190bb
 runc:
  Version:          1.1.12
  GitCommit:        v1.1.12-0-g51d5e94
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

:::


注意というか自分でもまだ分かっていないのですが、手元の macOS で動かしている Rancher Desktop (v1.12.3) では `docker buildx create --driver` の時点でエラーになってしまい利用できませんでした。

```bash
$ docker buildx create --driver cloud ${DOCKERHUBのアカウント名}/cloud
ERROR: failed to find driver "cloud"
```

一方でビルダーの管理画面には GitHub Actions で利用する場合の YAML の例も表示されており、それは次のようになっています。

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Log in to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
        with:
          version: "lab:latest"
          driver: cloud
          endpoint: "${DOCKERHUBのアカウント名}/cloud"
```

GitHub Actions では通常の `ubuntu-latest` のマシンを利用していることから、Docker Desktop の限定機能ではないことが想像できます。 `version: "lab:latest"` という指定があるので、最新かあるいは特別なバージョンの Buildx が必要なのかもしれません。

ということで、現時点では自分のローカルマシンから利用する場合には Docker Desktop が必要かもしれませんね。興味がある方はぜひ試してみてください。


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Dependabot Version Updates Support devcontainers - The GitHub Blog
https://github.blog/changelog/2024-01-24-dependabot-version-updates-support-devcontainers/

Dependabot の依存関係更新機能が devcontainer の Features に対応しました。

devcontainer（Development Containers）は開発環境をコンテナ化するための仕様であり、devcontainer.json で Dockerfile の指定や IDE などの設定を行なっておくことで、VS Code や GitHub Codespaces ですぐに構築済みの開発環境で作業できるというものです（雑な説明）。
そして、devcontainer には Features というプラグイン的な機能があります。これは、Dockerfile に全て書くことなく簡単に devcontainer に任意の機能を追加できるものとなっています。Features の設定は devcontainer.json に記述します。

今回の変更は、その Features のバージョンを Dependabot で更新できるようになったというものになります。
利用するには dependabot.yml での設定が必要です。

Dependabot と devcontainer を使っている人は利用してみましょう。

:::message
ちなみに Renovate の方では [Issue](https://github.com/renovatebot/renovate/issues/12116) は上がっていますがまだ devcontainer は対応されていません。
とはいえ regex manager を使えばバージョン更新は可能です。
:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## [Product Update] Speeding up code checkout - Build Environment - CircleCI Discuss
https://discuss.circleci.com/t/product-update-speeding-up-code-checkout/50317/3

CircleCI がリポジトリのクローン時(`checkout` コマンド)の高速化を図り、blobless clone を行うテストを行ない始めました。

[blobless clone](https://github.blog/2020-12-21-get-up-to-speed-with-partial-clone-and-shallow-clone/) は Git における commit オブジェクト、tree オブジェクト、blob オブジェクトの内、blob オブジェクトのみを取得しないようにすることで、履歴は取得しつつも実体は取得せずに高速にクローンできるというものになります。（もしブランチ切り替え等で blob オブジェクトが必要になった際は都度ダウンロードします。）

クローン時にのオプションである `--filter=blob:none` を使うことで実現できます。しかし、CircleCI の組み込みクローンコマンドである `checkout` にはこのオプションがないため、`checkout` で同じことを実現できませんでした。
今回 CircleCI は blobless clone を `checkout` コマンドで行うテストを始めており、クローン時の高速化を目指しているようです。

なお、このテスト（≒早期アクセス）に参加するためには CircleCI の従業員にメールで連絡する必要があります。
試したい方は連絡してみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## 品質の可視化への取り組み：バグ管理の事例紹介 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20240122-7865286e4d/

メルカリさんの品質向上のための取り組みについての記事です。バグ管理についての事例紹介がされています。

バグのチケットを健全に管理するために、次のような目標を設定したそうです。

1. バグ管理環境を JIRA へ統一
2. バグの発生状況や修正の優先順位が判断できること
3. バグが長期間放置されないこと

バグ管理を JIRA に統一し、GAS と Jira Cloud for Sheets というスプレッドシートのアドオンを使って Looker Studio で可視化することで、バグの追跡と分析がスムーズになったそうです。

こちらの事例はバグ管理の話でしたが、スプレッドシート + Jira Cloud for Sheets + Looker studio はタスクチケットの管理やプロジェクトの進捗管理などにも応用できそうだと思いました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## Go 1.22リリース連載始まります & ループの変化とTinyGo 0.31
https://future-architect.github.io/articles/20240129a/

Go 1.22 がリリースされましたね！今回のリリースもフューチャーさんが連載をしてくれています。毎度助かっております。

Go 1.22 で話題になっているのは、ループ変数の扱いの変化でしょうか。
ループ変数が内部のクロージャなどから参照されたりした場合は、ループの中で変数を定義して代入するのを自動で行ってくれるようになりました。
これにより、並列でテストを行う際のイディオムである `tt := tt` などの記述が不要になります。
また、`range` に `int` を渡せるようになりました。これにより、単に n 回繰り返すだけのループを書く際に、 `for i := 0; i < n; i++` と書く必要がなくなり、 `for i := range n ` と書くだけで済むようになります。これは地味に嬉しいです。

連載の中で個人的に面白かったのは、[vet, log/slog, testing/slogtest についての記事](https://future-architect.github.io/articles/20240205a/)です。
`vet` のアップデートに基づいて、Go のハマりどころになり得るコードを解説してくれています。正直、ほとんど知らなかったので、勉強になりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Googleの新スパムメール対策への対応状況の調査と今後の対応方針について / 開発者向けブログ・イベント | GMO Developers 
https://developers.gmo.jp/42677/

Google が 2024 年 2 月 1 日から導入した新しいスパムメール対策による影響について調査した結果をまとめた記事です。

メール送信者のガイドラインに基づいて、GMO さんのサービスにおいて調査しています。調査にあたってはどのように調査したかのコマンドが添えられていたり、判断基準が示されているため参考になります。

自分は業務内でメール送信を扱うことがなかったので、ワンクリックでのメール配信登録の解除はガイドラインに記載されていることをこちらの記事で知りました。
いちユーザーとしてはこの配信登録解除の仕組みはありがたいです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Code faster and better with GitHub Copilot’s new features in Visual Studio - The GitHub Blog](https://github.blog/changelog/2024-01-30-code-faster-and-better-with-github-copilots-new-features-in-visual-studio/)
    - Visual Studio の GitHub Copilot Chat において、スラッシュコマンドとコンテキスト変数が使えるようになりました
    - スラッシュコマンドは、`/doc` でドキュメント生成をさせたり、`/tests` でユニットテストを作成させたりといった、スラッシュから始まるコマンド群のことです。Copilot に指示が出せます
    - コンテキスト変数は、`#file:'Main.cs'` といった形式で、特定のファイルに対する質問ができるコマンドです 
- **tool 🔨**
  - [Do you know if all your repositories have up-to-date dependencies? - The GitHub Blog](https://github.blog/2024-01-25-do-you-know-if-all-your-repositories-have-up-to-date-dependencies/)
    - GitHub が Dependabot 利用者向けにリポジトリで Dependabot を有効にしているかどうかを横断的にチェック/有効化する GitHub Actions アクション github/evergreen をリリースしています
    - Dependabot のバージョン更新が設定されているかどうかのチェックと自動有効化ができるようです

# あとがき

遅くなってしまいすみません。今週号でした。public リポジトリで M1 Mac ランナー無料で使えるの激アツですね。とはいえ僕は個人で macOS じゃないとテストできないような何かを作っているわけではないのですが...

:::message
来週号（2024-02-07 号）は、他の社内イベントで Productivity Weekly が開催されなかったためお休みです。
:::


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information
