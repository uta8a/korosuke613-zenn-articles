---
title: "Productivity Weekly (2021-08-04号)"
emoji: "🌞"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 37 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Introduction to heredocs in Dockerfiles - Docker Blog
https://www.docker.com/blog/introduction-to-heredocs-in-dockerfiles/

Docker の BuildKit が Dockerfile 内のヒアドキュメントに対応しました。これまではシェルスクリプトを用意したり `&&` を多用していましたが、これからは楽に綺麗に書けそうです。使うためには `docker build` 時に BuildKit を使うようにしなければいけません[^buildkit]。

例えば docker build 時に `apt-get install` をする際、1 つの RUN でパッケージのインストールからキャッシュの削除までをすることで、イメージサイズを節約するというテクニックがあります[^image-size]。

[^image-size]: 「In addition, when you clean up the apt cache by removing `/var/lib/apt/lists` it reduces the image size, since the apt cache is not stored in a layer. Since the `RUN` statement starts with `apt-get update`, the package cache is always refreshed prior to `apt-get install.`」（[参考](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#:~:text=In%20addition%2C%20when%20you%20clean%20up%20the%20apt%20cache%20by%20removing%20/var/lib/apt/lists%20it%20reduces%20the%20image%20size%2C%20since%20the%20apt%20cache%20is%20not%20stored%20in%20a%20layer.%20Since%20the%20RUN%20statement%20starts%20with%20apt-get%20update%2C%20the%20package%20cache%20is%20always%20refreshed%20prior%20to%20apt-get%20install.)）

複数コマンドを 1 つの RUN で実行するため、下記のように `&&` などでコマンド同士をつなぐ必要がありました。また、改行して可読性を上げるために `\` も多用していました。

```dockerfile:今まではこんなふうに複数行にわたるコマンドを書いてた
RUN apt-get update \
 && apt-get install -y \
    curl \
    jq \
 && rm -rf /var/lib/apt/lists/*
```

対して、ヒアドキュメントが使えるようになると普通のシェルスクリプトを書いているような感覚で Dockerfile を記述できます。

```dockerfile:これからはこんなふうに書ける
RUN <<EOF
apt-get update
apt-get install -y \
  curl \
  jq
rm -rf /var/lib/apt/lists/*
EOF
```

これくらいの量ならそんなに気にならないかもしれませんが、複雑になってくるとなかなか辛くなってくるのでこれは嬉しいです。

さらに、ヒアドキュメントが使えるようになって、以下のように Dockerfile に書いた他言語のスクリプトを実行することも簡単にできるようになりました（しかし、もし複雑なコードを書くならそれはファイルに切り出した方が良いかとは思います。lint などの恩恵も受けられるので）。

```dockerfile:DockerfileにPythonなどのコードを簡単に書けるようになった
RUN python3 <<EOF
with open("/hello", "w") as f:
  print("Hello", file=f)
  print("World", file=f)
EOF
```

さっそく実行したのですが、僕が使っている最新版(v3.6.0)の Docker Desktop for Mac はまだ対応していませんでした[^buildx]。そのうち対応すると思いますが、早く使ってみたいですね。

:::details Docker Desktop for Mac v3.6.0 でヒアドキュメントを使った際のログ

```dockerfile:食わせたDockerfile
# syntax=docker.io/docker/dockerfile:1.3.0

FROM ubuntu

RUN <<EOF
apt-get update
apt-get install -y \
  curl \
  jq
rm -rf /var/lib/apt/lists/*
EOF
```

```text:Docker Desktop for Mac v3.6.0では使えなかった
❯ docker build .                                                                                             
[+] Building 2.5s (7/7) FINISHED                                                                                                                                                                   
 => [internal] load build definition from Dockerfile                                                                                                                                          0.0s
 => => transferring dockerfile: 193B                                                                                                                                                          0.0s
 => [internal] load .dockerignore                                                                                                                                                             0.0s
 => => transferring context: 2B                                                                                                                                                               0.0s
 => resolve image config for docker.io/docker/dockerfile:1.3.0                                                                                                                                2.1s
 => [auth] docker/dockerfile:pull token for registry-1.docker.io                                                                                                                              0.0s
 => CACHED docker-image://docker.io/docker/dockerfile:1.3.0@sha256:9e2c9eca7367393aecc68795c671f93466818395a2693498debe831fd67f5e89                                                           0.0s
 => [internal] load .dockerignore                                                                                                                                                             0.0s
 => [internal] load build definition from Dockerfile                                                                                                                                          0.0s
failed to solve with frontend dockerfile.v0: failed to solve with frontend gateway.v0: rpc error: code = Unknown desc = dockerfile parse error on line 6: unknown instruction: apt-get
```

:::

[^buildx]: ヒアドキュメントは [buildkit v0.9.0](https://github.com/moby/buildkit/releases/tag/v0.9.0) から使えるようになったのですが、Docker CLI で buildkit を使うためのプラグインである [buildx の最新版（v0.6.1）がまだ buildkit v0.8.2 を使っている](https://github.com/docker/buildx/blob/v0.6.1/go.mod#L40)ようなので、まだまだ Docker Desktop でヒアドキュメントを使うには時間がかかりそうです。（間違ってたら申し訳ないです）

[^buildkit]: 環境変数に `DOCKER_BUILDKIT=1` を設定しましょう

## APIs for custom autolinks to external resources | GitHub Changelog
https://github.blog/changelog/2021-08-02-apis-for-autolinks/

GitHub の autolinks が REST API に対応しました（ベータ）。

autolinks はプレフィックスと外部システムのリンクを設定しておくことで、自動リンクを生成してくれる機能です（説明が難しい）。詳しくは [Configuring autolinks to reference external resources - GitHub Docs](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/configuring-autolinks-to-reference-external-resources) を参照。

:::details 使用例
![](/images/productivity-weekly-20210804/autolink-setting.png =600x)
*例えばプレフィックス `HOGE-` で `https://www.google.com/search?q=hoge-<num>` に飛ぶように設定すると*

![](/images/productivity-weekly-20210804/autolink-example.png =600x)
*`HOGE-2020` のようなテキストに自動でリンクが貼られるようになる*
:::

kintone や Linear などでタスク管理していると Issue や PR、コミットメッセージにタスクへのリンクを貼りたくなりますが、autolinks を設定しておくことで簡単にタスクへ飛ぶことができてとても便利です。

今回 REST API で autolinks の設定ができるようになりました。これまで autolinks はリポジトリごとに設定する必要がある、かつ、Web UI でしか設定できなかったため、毎回設定するのが面倒でした。API で簡単に自動化できるようになったのでこれからは楽に autolinks を設定できるようになりそうです。

# know-how 🎓

## Docker Composeの環境変数ではなくsecretsで秘密情報を扱う - Qiita
https://qiita.com/myabu/items/89797cddfa7225ff2b5d

Docker Compose で DB のコンテナなどを扱う際、docker-compose.yaml に環境変数でシークレットを記述する方法があります。この記事では Docker Compose の環境変数で秘密情報を扱う際の問題点と、その解決策として `secrets` が紹介されています。

`secrets` は Docker Compose v3.1 から追加された構文で、ローカルのファイルをコンテナ内にマウントする機能です。これを使うことで環境変数を使わずにシークレットをコンテナ内に渡すことができます。

恥ずかしながら僕は `secrets` のことを知りませんでした。これから使っていきたいと思います。

## “生産性向上に投資するため”のデータの可視化　生産性測定から組織の仕組み作りをサポート - ログミーTech
https://logmi.jp/tech/articles/324731

生産性が向上しているかどうかを可視化するための測定方法、仕組み作りを紹介した記事です。

Google が提唱している、ソフトウェア開発チームのパフォーマンスを示すための 4 つの指標（Four Keys）があります。この記事では Four Keys の各指標が対象プロダクト（SUZURI）とどう対応しているか、どうやってメトリクスを抽出したか、可視化してみて今後どういう方針が立てられるかなどが書かれています。

何を持って生産性が向上した考えるかは難しいです。測定方法もプロダクト・チームによって全然違う方法になると思います。この記事は 1 つの事例として生産性向上していく上でとても参考にできそうです。


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Search issues by label using logical OR | GitHub Changelog](https://github.blog/changelog/2021-08-02-search-issues-by-label-using-logical-or/)
  - GitHub の Issues において、ラベルに対して OR 検索ができるようになりました。
  - 区切りにはカンマ `,` を使います。例えば `label:"good first issue",bug` と検索すると、`good first issue` または `bug` のラベルが付いた Issue を検索できます。
  - 試してみたところ、ラベル以外にも利用できることがわかりました。[例えば `is:issue,pr` とすると Issue と Pull Request の両方を検索できます](https://github.com/cybozu/assam/issues?q=is%3Aissue%2Cpr)。（以前からカンマ区切りで OR 検索できた？）
- [受け入れテストを日本語で書ける Jest 拡張 "Jest-gauge" を公開しました](https://zenn.dev/tnzk/articles/27b72f6b7ce982) 
  - 受け入れテストを Markdown 形式の自然言語で書くためのテストフレームワーク Gauge を Jest で使うための拡張 Jest-gauge を作ったという記事です。
  - 受け入れテスト駆動開発について、なぜ Gauge か、なぜ Jest-gauge かなどが述べられています。
  - 小ネタにするか迷ったのですが、まだ開発途中であること、かつ、2 ヶ月ほどリポジトリの更新がなさそうだったことから小ネタにしました。
- [Stack Overflow Developer Survey 2021](https://insights.stackoverflow.com/survey/2021)
  - Stack Overflow のデベロッパーサーベイ 2021。
  - 多く使われている言語や DB、フレームワーク以外にも何年選手かや性別なんかも調査結果がある
  - 個人的に面白かったのが最も愛されてる言語と最も恐れられてる言語一覧。COBOL が最も恐れられている。

# あとがき
投稿がめちゃくちゃ遅くなってしまいすみませんでした。生産性向上コースのインターンを開催していたのと、その後のお盆に夏休みをとっていたことから遅くなってしまいました。

そうです。生産性向上コースで初のインターンシップを開催しました。色々と準備不足が見つかったりしてなかなか大変でしたが、インターン生が楽しく参加できていたっぽくて良かったです。僕たちメンターも楽しかったですね。実は生産性向上コースのインターンは 2 週間後にもう 1 回あるので、更なる準備をしてもう 1 回のインターンに臨みたいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

:::message
今週のおまけはお休みです
:::