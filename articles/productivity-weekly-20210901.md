---
title: "Productivity Weekly (2021-09-01号)"
emoji: "🐳"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 41 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Docker is Updating and Extending Our Product Subscriptions - Docker Blog
https://www.docker.com/blog/updating-product-subscriptions/

Docker 社が製品サブスクリプションを刷新しました。

これまで Docker のサブスクリプションは Free、Pro、Team という区分がありましたが、これからは Personal、Pro、Team、Business という区分になります（Free が Personal に名前を変え、新しく Business が追加された）。

Docker Business は大企業向けのプランとなり、Team プランと比べて、[アクセスできるイメージの一元管理(Image Access Management)](https://docs.docker.com/docker-hub/image-access-management/)や SAML SSO(未実装)、請求書による支払いなどができるようになります（参考：[Compare All Features](https://www.docker.com/pricing#:~:text=Compare%20All%20Features)）。SSO があるとユーザ管理が楽になる（退職者が出た場合などは特に）ので、大企業などの人数が多い組織には待望の機能だと思います。なお、気になる料金は 1 ユーザあたり月 21 ドルです[^wow]。

また、**Docker Desktop が一部のユーザに対して有料となりました**。具体的には、従業員数 250 人以上または年間売上高 1000 万ドル以上の企業で利用するには有料サブスクリプション(Pro 以上)の契約が必要です。従って、条件に当てはまらない企業や個人利用に関しては今まで通り無料で使い続けることができます。規約はすでに更新されていますが、2022 年 1 月 31 日までは猶予期間となっており、それまでに対応すれば良いとなっています。

Docker Desktop は Docker Engine や Docker CLI などのコンポーネントを利用するための面倒な設定（ボリュームマウントや Linux VM の構築など）を管理してくれる Windows、Mac 向けのデスクトップアプリです。 また、[Docker Dev Environments](https://www.docker.com/blog/tech-preview-docker-dev-environments/)などの独自の機能も備えています。もちろん自分で必要なコンポーネントを個別にインストールし、ホスト側の設定をあれこれ行なっていけば Docker Desktop を使わなくても済むのですが、非常に面倒です。

Mac における Docker Desktop の代替としては[Podman](https://github.com/containers/podman)や[lima](https://github.com/lima-vm/lima)がありますが、正直何ができて何ができないか完全に把握できている人はほぼいないと思います。また、例えばコンテナ内での開発をサポートする [VSCode Remote Container は Docker Desktop が必要](https://code.visualstudio.com/docs/remote/containers#_system-requirements)であり、こういった開発に利用する関連ツールが Docker Desktop 無しでどこまで動くかもまだまだ不明です。業務利用するならこういった検証は避けられない上、検証や全社員に代替方法を使わせるためにかかるコストを考えると、素直に Docker 社にお金を払った方が今のところは安上がりになると考えます[^docker_money]（Docker Business に早く SSO 実装してほしい）。それはそれとして代替手段の探求は楽しそうなのでやっていきたいですね。

ちなみに Docker Desktop の代替方法については以下の記事が詳しく調べてくれていました。こういった記事はこれからもたくさん出ると思います。
- [Docker Desktopの代替方法 - Windows and Mac編](https://zenn.dev/koduki/articles/ba54daaba28f93#windows%3A-wsl2-%2B-podman)

なかなかのビッグニュースで発表された 9/1 の僕の Twitter タイムラインは Docker Desktop の話で持ちきりでした。猶予期間が半年もないのであまり悠長にできません。~~各社の取りまとめ担当には去年に引き続き同情します...~~Docker 社にはこれまでお世話になってきたので、今回の件でウハウハになってほしいですね。

[^docker_money]: Docker 社、資金繰りがヤバそうだから尚更お金を払いたい気持ちもある。

[^wow]: 1 レベル格下の Team プランが（年払いの場合）1 ユーザあたり月 7 ドルなので結構な差があってギョッとしました。エンタープライズ向けプランってこんなもん？

## GitHub Actions: Setup-java now supports dependency caching | GitHub Changelog
https://github.blog/changelog/2021-08-30-github-actions-setup-java-now-supports-dependency-caching/

以前、GitHub Actions で Node.js のセットアップを行う [actions/setup-node アクションに依存関係のキャッシュ機能が付いた件](https://zenn.dev/korosuke613/articles/productivity-weekly-20210707#github-actions%3A-setup-node-now-supports-dependency-caching-%7C-github-changelog)を紹介しましたが、先日、actions/setup-java アクションにも依存関係のキャッシュ機能が付きました。 Maven、Gradle の両方のプロジェクトをサポートしています。

ちなみに該当するプルリクエストはこちらです。
- [Introduce the dependency caching for Maven and Gradle by KengoTODA · Pull Request #193 · actions/setup-java](https://github.com/actions/setup-java/pull/193)

モノレポ対応しているか気になって実験したのですが、普通にキャッシュの保存とリストアができました（Node.js と違ってキャッシュをプロジェクトリポジトリではなく、ホームディレクトリ下に保存するのでまあそりゃそうかという感じですね）。

:::details 実験のログ

[キャッシュ未保存](https://github.com/korosuke613/playground/runs/3512667216?check_suite_focus=true)

```text:キャッシュ未保存 - Run actions/setup-java@v2
Trying to resolve the latest version from remote
Resolved latest version as 11.0.12+7
Trying to download...
Downloading Java 11.0.12+7 (Temurin-Hotspot) from https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.12%2B7/OpenJDK11U-jdk_x64_linux_hotspot_11.0.12_7.tar.gz ...
Extracting Java archive...
/usr/bin/tar xz --warning=no-unknown-keyword -C /home/runner/work/_temp/c58a3e93-a29e-4ffd-b3a7-aef8aaca8600 -f /home/runner/work/_temp/2e0a8030-225f-40a6-9d46-f483afa0602a
Java 11.0.12+7 was downloaded
Setting Java 11.0.12+7 as the default

Java configuration:
  Distribution: temurin
  Version: 11.0.12+7
  Path: /opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/11.0.12-7/x64

Creating settings.xml with server-id: github
Writing to /home/runner/.m2/settings.xml
gradle cache is not found
```

```text:キャッシュ未保存 - Post Run actions/setup-java@v2
Post job cleanup.
/usr/bin/tar --posix --use-compress-program zstd -T0 -cf cache.tzst -P -C /home/runner/work/playground/playground --files-from manifest.txt
Cache Size: ~1 MB (736317 B)
Cache saved successfully
Cache saved with the key: setup-java-Linux-gradle-6bb41f37bac64fd32ea8be29c61841e20473e137d303427b99352e0e5b754c90
```

[キャッシュ保存済み](https://github.com/korosuke613/playground/runs/3512677562?check_suite_focus=true)

```text:キャッシュ保存済み - Run actions/setup-java@v2
Trying to resolve the latest version from remote
Resolved latest version as 11.0.12+7
Trying to download...
Downloading Java 11.0.12+7 (Temurin-Hotspot) from https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.12%2B7/OpenJDK11U-jdk_x64_linux_hotspot_11.0.12_7.tar.gz ...
Extracting Java archive...
/usr/bin/tar xz --warning=no-unknown-keyword -C /home/runner/work/_temp/ac81e2ad-9acb-419f-b770-52118455c7f6 -f /home/runner/work/_temp/5ad533b6-3816-4fe9-b3bf-04ebf8e3e6e5
Java 11.0.12+7 was downloaded
Setting Java 11.0.12+7 as the default

Java configuration:
  Distribution: temurin
  Version: 11.0.12+7
  Path: /opt/hostedtoolcache/Java_Temurin-Hotspot_jdk/11.0.12-7/x64

Creating settings.xml with server-id: github
Writing to /home/runner/.m2/settings.xml
Received 735837 of 735837 (100.0%), 21.9 MBs/sec
Cache Size: ~1 MB (735837 B)
/usr/bin/tar --use-compress-program zstd -d -xf /home/runner/work/_temp/b7434d2d-e399-4a77-8bd1-7a9c397a9589/cache.tzst -P -C /home/runner/work/playground/playground
Cache restored successfully
Cache restored from key: setup-java-Linux-gradle-6bb41f37bac64fd32ea8be29c61841e20473e137d303427b99352e0e5b754c90
```

```text:キャッシュ保存済み - Post Run actions/setup-java@v2
Post job cleanup.
Cache hit occurred on the primary key setup-java-Linux-gradle-6bb41f37bac64fd32ea8be29c61841e20473e137d303427b99352e0e5b754c90, not saving cache.
```

:::

こちらもワークフローの記述量が減って良いですね。活用していきたいです。

## Sunset Notice: API Authentication via Query Parameters | GitHub Changelog
https://github.blog/changelog/2021-08-31-sunset-notice-api-authentication-via-query-parameters/
GitHub において、クエリパラメータによる API 認証のサポートが停止されます（2021 年 9 月 8 日 14:00(UTC)）。Authorization ヘッダや（OAuth アプリの場合は）curl の `-u` オプションを使っていれば問題ありません。

クエリパラメータによる認証は以下のようなものになります。

```
curl "https://api.github.com/user/repos?access_token=my_access_token"
```

ていうか GitHub API、クエリによる認証ができたんですね。知りませんでした。この方法で API を叩いている方はさっさと直しましょう。

## New for AWS CloudFormation – Quickly Retry Stack Operations from the Point of Failure | AWS News Blog
https://aws.amazon.com/jp/blogs/aws/new-for-aws-cloudformation-quickly-retry-stack-operations-from-the-point-of-failure/

日本語でのお知らせ：[AWS CloudFormation がロールバック前のプロビジョニングエラーのトラブルシューティングをして、デプロイを加速するのためのオプションをリリース](https://aws.amazon.com/jp/about-aws/whats-new/2021/08/aws-cloudformation-troubleshoot-errors/)

AWS CloudFormation において、スタックのプロビジョニングに失敗したとき、失敗したリソースの作成からリトライできるようになりました。

今までは失敗すると全てのリソースが自動でロールバックされていたため、変更するたびに長時間待たされて開発スピードが落ちる、つらいといった問題がありました（もちろん全てのリソースを自動ロールバックする方が良い場合もあります）。自動ロールバックを行うかどうかについて、コンソールからは "Stack failure options" で指定でき、AWS CLI からは `--disable-rollback` オプションで指定できます。

これでだいぶ CloudFormation を使った開発サイクルを短縮できそうです。適切に使っていきたいですね。

# know-how 🎓

## Corepack Node.jsに追加されたパッケージマネージャーマネージャー / #tng37 - Speaker Deck
https://speakerdeck.com/masashi/number-tng37

Node.js に追加されたパッケージマネージャー Corepack の解説スライドです[^izen]。Corepack はパッケージマネージャを管理するためのツールで、Node.js に追加されることで Yarn と pnpm を別途インストールしなくてもよくなります。この記事では、Corepack がなぜ必要か、使い方、注意点、いつから使えるかなどが載っています。

個人的に Corepack の嬉しいところは指定したパッケージマネージャ以外の利用を制限できるところですね。間違って npm 使って `package-lock.json` を生み出してしまうことがよくあるので...その逆も然り。早く標準バンドルされてほしいですね。

[^izen]: [Corepack 自体は実は以前 Weekly でも紹介していました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210512#corepack-is-%E4%BD%95%3F)。

## 生産性向上チームって何をしてるの？〜社内の開発生産性を上げる組織横断の取り組み〜 - セミナープログラム - オープンデベロッパーズカンファレンス(ODC)2021 Online

:::message
ほぼサイボウズの宣伝です。
:::

先日、僕の所属する生産性向上チームがオープンデベロッパーズカンファレンス 2021 に登壇しました。それ自体は以前から Weekly 記事で書いていたのですが、気づいたら動画が公開されていたので宣伝しておきます。

https://youtu.be/O2M7K7fMmDQ

内容としては以下のようなことを話しました。

> - チーム紹介
> - AWS マルチアカウント管理
> - オートスケールする GitHub Actions セルフホストランナーを構築した話
> - 製品チームの CI 改善をした話と改善から得た学び

セッション詳細やスライドは[こちら](https://event.ospn.jp/odc2021-online/session/376878)のページに載っています。

生産性向上チームとは何か、いったい何をやっているのかが気になる人はぜひご覧ください。

[他の発表も Youtube に公開されている](https://register.ospn.jp/odc2021-online/modules/eventrsv/1.html)ので、気になる人は要チェックです。

# あとがき
今週はインターン受け入れの第二日程がありました。準備とか大変だったけどやっぱ楽しかったり学びがあったりで良かったですね。さて..今週の金曜日は [CI/CD Conference 2021](https://event.cloudnativedays.jp/cicd2021) がありました。インターンの合間に見れたら...と思ってたのですが、さすがに全く余裕がなくて見れませんでした。ﾄﾎﾎ..なのでアーカイブを視聴しようと思います。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### Why are hyperlinks blue?
https://blog.mozilla.org/en/internet-culture/deep-dives/why-are-hyperlinks-blue/

Mozilla の中の人による、ハイパーリンクがなぜ青色であるのかを調査した記事です。日本語に翻訳された記事もあります（[ブログ: なぜ、ハイパーリンクは青色なのか?](https://okuranagaimo.blogspot.com/2021/08/blog-post_33.html)）。

いつから青色なのか、なぜ青くなったかの考察が書かれています。いにしえのハイパーリンクが画像付きで紹介されていて眺めているだけでも面白いです。

どうやら僕が生まれる前から青色だったようです。僕が初めて触ったパソコンは Windows 98 だったのですが、その頃には IE がとっくにありましたね。懐かしいです。こういったインターネット考古学みたいな話は盛り上がるので好きですね。