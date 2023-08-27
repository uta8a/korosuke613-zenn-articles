---
title: "Productivity Weekly (2023-08-16号)"
emoji: "⛹️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230816"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-16 単独号です。

今回が第 122 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## X-Accepted-GitHub-Permissions header for fine-grained permission actors - The GitHub Blog
https://github.blog/changelog/2023-08-10-x-accepted-github-permissions-header-for-fine-grained-permission-actors/

GitHub において、GitHub Apps、もしくは fine-grained な Personal Access Token を使用して API を呼び出した際に、どの権限が必要なのかを返すヘッダー `x-accepted-github-permissions` が追加されました。

API を呼び出すと成否に関わらず、`x-accepted-github-permissions: repository_projects=write; organization_projects=admin` のようなヘッダーが返ってきます。
必要な権限のセットが `;` で区切られており、上記の例だと、`repository_projects=write` もしくは `organization_projects=admin` のどちらかが必要であることを示しているとのことです。

OAuth アプリや古い PAT（Classic）にある `x-accepted-oauth-scopes` ヘッダでも必要なスコープを出してくれていましたが、それと似たような機能になります。

実際に触ってみました。
僕が持つプライベートリポジトリに対して、プルリクエストを GET する API を叩いて検証しました。今回は fine-grained PAT を使っています。

無事 `X-Accepted-Github-Permissions: pull_requests=read; contents=read` がヘッダに含まれていましたね。

この場合、`pull_requests=read` と `contents=read` のどちらかが必要であるという意味になりますが、実際に `contents=read` だけを付与した fine-grained PAT で API を叩いてみると 403 が返ってきました。逆に `pull_requests=read` だけを付与した fine-grained PAT で API を叩いてみると想定通りのレスポンスが返ってきました。

自分の解釈が間違っているのか、他の条件を満たせていなかったのかはちょっとよくわかりませんが、今後も色々な API で触って検証してみようと思います。

:::details コマンドの詳細
`Pull requests: Read-only` のみを付与。

```
❯ GH_TOKEN=$TMP_GH_TOKEN gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -i repos/korosuke613/playground-private/pulls/1
HTTP/2.0 200 OK
<省略>
X-Accepted-Github-Permissions: pull_requests=read; contents=read
<省略>
{
  "url": "https://api.github.com/repos/korosuke613/playground-private/pulls/1",
<省略>
```

`Contents: Read-only` のみを付与。

```
❯ GH_TOKEN=$TMP_GH_TOKEN gh api \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  -i repos/korosuke613/playground-private/pulls/1
HTTP/2.0 403 Forbidden
<省略>
X-Accepted-Github-Permissions: pull_requests=read; contents=read
<省略>
{
  "message": "Resource not accessible by personal access token",
  "documentation_url": "https://docs.github.com/rest/pulls/pulls#get-a-pull-request"
}
```

:::

なかなか便利ですね！GitHub Apps、fine-grained PAT が使いやすくなりました。GitHub Actions を使う上でも permissions 設定をやりやすくなりますね。覚えておきたいです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## HashiCorp adopts Business Source License
https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license

Terraform や Vault などで知られる HashiCorp が複数の製品を Mozilla Public License v2.0 (MPL 2.0)から Business Source License 1.1 (BUSL 1.1) へ移行することを発表しました。

:::message
ちょうど[先日 Codecov が BUSL 1.1 でソフトウェアを公開していましたね](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230809#codecov-is-now-open-source---codecov)。
:::

対象製品は次になります（[FAQ](https://www.hashicorp.com/license-faq) より）。BUSL は今後のリリースから適用されます。（これまでリリースされたバージョンは MPL 2.0 のままです。）

- Terraform
- Packer
- Vault
- Boundary
- Consul
- Nomad
- Waypoint
- Vagrant

また、HashiCorp 製の API やプロバイダなど他のほぼ全てのライブラリは MPL2.0 のままとのことです。

BUSL 1.1 はソースコードを公開するが、商用利用には制限がかかるライセンスです。HashiCorp の場合、競合する製品を提供する場合を除いて非商用・商用問わずコードのコピー、修正、再配布ができるようです。

> End users can continue to copy, modify, and redistribute the code for all non-commercial and commercial use, except where providing a competitive offering to HashiCorp.

とはいえ、結局のところはライセンスの本文が大事なので、HashiCorp 製品の利用者はライセンス内容をよく確認しておきましょう。

### FAQ やその他の情報について

上記お知らせとは別に、HashiCorp 製品に適用される BUSL 1.1 や今回の件に関するよくある質問集も公開されています。競合製品とは何を指すかなども書かれています。

- [HashiCorp Licensing FAQ](https://www.hashicorp.com/license-faq)

この FAQ は定期的にアップデートされるとのことです。

- [HashiCorp updates licensing FAQ based on community questions](https://www.hashicorp.com/blog/hashicorp-updates-licensing-faq-based-on-community-questions)

FAQ も合わせて確認しましょう。

なお、今回の件について言及している第三者の記事もいくつか出ております。

- [Business Source License 1.1. 零細企業経営者視点 | by V | Aug, 2023 | Medium](https://voluntas.medium.com/business-source-license-1-1-8c83662568cb)
- [Terraformのライセンスの変更とその影響](https://zenn.dev/the_exile/articles/b90fe8c5c41694)

### OpenTF Foundation 爆誕

もちろん今回の変更に反対されている方々もいらっしゃいます。
おそらく一番有名なプロダクトである Terraform をオープンソースソフトウェアでし続けるために OpenTF Foundation という団体が生まれていました。

- [OpenTF Foundation](https://opentf.org/)

本項目執筆時点だと、会社: 105、プロジェクト: 11、個人: 399 が署名しています。
この団体は、Terraform を OSS ライセンスに戻さない場合、MPL ライセンスの Terraform をフォークし、団体でメンテナンスしていくことを示唆してます。

> If HashiCorp is unwilling to switch Terraform back to an open source license, we propose to fork the legacy MPL-licensed Terraform and maintain the fork in the foundation.

個人的には今回の BUSL への変更を支持しているのですが、これまで Terraform で飯を食ってきた HashiCorp 外の人もいると思うので、この主張が出るのはしょうがないかなとも思います。
（だとしても実装が分かれると色々面倒なことになるのが見えているので、やはり個人的にはやめてほしいという考えです。）

HashiCorp 製品自体も、HashiCorp 製品を利用した 3rd party 製品も、利用する場合はライセンスやその他の動きをよく確認しておくのが良さそうです。
今後どうなるか注視していきたいですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Direct VPC egress in Cloud Run sends traffic over a VPC easily | Google Cloud Blog
https://cloud.google.com/blog/products/serverless/announcing-direct-vpc-egress-for-cloud-run/

Google Cloud の Cloud Run にて Direct VPC egress が Preview になりました。
Cloud Run から VPC 内のリソースにアクセスするための機能で、これまでは VPC Access Connector という別のリソースを作成する必要がありましたが、これが不要になります。
Direct VPC egress を用いると VPC Access Connector のインスタンス代がかからなくなります。
また、Cloud Run から VPC 内のリソースにアクセスするためのネットワークのレイテンシーが軽減され、パフォーマンスが向上するとのことです。

Direct VPC egress はまだプレビュー機能なので本番適用は控えたほうがよいですが、検証環境において Cloud Run から VPC 内のリソースにアクセスする際には、VPC Access Connector を使うよりもこちらを使ったほうがお手軽で良さそうです。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*


## Network Load Balancer でセキュリティグループのサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/network-load-balancer-supports-security-groups/

AWS の Network Load Balancer (NLB)でセキュリティグループが使えるようになりました。
セキュリティグループを使用することで、特定の IP からのトラフィックのみを受信できるようになり、セキュリティを向上できます。

さっそくクラメソさんが記事にしています。前者が概要と使ってみたという話、後者がセキュリティグループを使えるようになったことで何が嬉しいのかという話です。
どちらもわかりやすくまとめてくれています。

- [遂に Network Load Balancer でセキュリティグループがサポートされました | DevelopersIO](https://dev.classmethod.jp/articles/nlb-security-group/)
- [Network Load Balancer (NLB) がセキュリティグループをサポートして何が嬉しいのか整理してみた | DevelopersIO](https://dev.classmethod.jp/articles/benefits-of-network-load-balancer-supports-security-groups/)

僕は許可した IP からのみアクセスを許可することでセキュリティを向上させられる嬉しさがあるのかなと思っていましたが、クライアント IP アドレスを保持しつつ NLB を介さずに直接アクセスされるのを防げるなど、様々なユースケースで嬉しさがあることを知りました。

NLB を使ってサービスを展開している方は活用してみましょう。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Release v2.308.0 · actions/runner
https://github.com/actions/runner/releases/tag/v2.308.0

[以前](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802)に GitHub Actions のランナーに内蔵されている Node.js のバージョンが v16 からついに v20 にアップデートされそうな件を紹介しましたがそれに進展がありました。新たに公開された [actions/runner@v2.308.0](https://github.com/actions/runner/releases/tag/v2.308.0)にて v20 が内蔵されるようになり、代わりに以前から Deprecated だった v12 が削除されました。

ただ、action がどの Node.js のバージョンを使用するかは [action側で指定する仕組み](https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions#runsusing-for-javascript-actions)のため、すぐに v20 が使用されるわけではないのでユーザーが気にする必要はありません。おそらく近いうちに GitHub から v16 -> v20 へのマイグレーションパスについて何らかのアナウンスがあるのではないかと思うのでそれを期待しましょう。

また、actions/runner@v2.308.0 から公式に提供されているランナーが動くコンテナイメージの [actions-runner](https://github.com/actions/runner/pkgs/container/actions-runner) に linux/arm64 版が追加されました。k8s などの環境でセルフホストランナーを構築していて、Arm 版のランナーも構築したい場合にはこのイメージをそのまま使用するか、これをベースにして自前の Dockerfile で拡張するということが可能になるかと思います。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## Enhanced push protection features for developers and organizations - The GitHub Blog
https://github.blog/2023-08-09-enhanced-push-protection-features-for-developers-and-organizations/

GitHub の Secret scanning の機能の 1 つである push protection において、ユーザ単位で GitHub 上の全てのパブリックリポジトリに対して push protection による保護を有効化できるようになりました(beta)。

push protection はリポジトリへの push 段階でシークレットと疑われる文字列が含まれている場合に push を拒否する機能です。

[以前 push protection がパブリックリポジトリで利用可能になった際](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230510#secret-scanning's-push-protection-is-available-on-public-repositories%2C-for-free-%7C-github-changelog)、自身が持つ全てのパブリックリポジトリで有効化＆新規のパブリックリポジトリでデフォルト有効化の設定ができました。
しかし、この設定はリポジトリ管理者である必要があったため、コントリビュータとして第三者のパブリックリポジトリに push する際は、そのリポジトリの管理者が有効化していないと恩恵は受けられませんでした。

今回の変更により、ユーザ単位で全てのパブリックリポジトリに対して push protection を有効化できるようになったため、第三者のパブリックリポジトリの設定に関わらず push protection の恩恵を受けられるようになりました。

とりあえず有効化していて損はないと思うので、有効化しちゃいましょう。

![](/images/productivity-weekly-20230816/push_protection_for_user.png =600x)
*新たに追加された設定画面。*

また、依然として自身の管理するリポジトリに対して全有効化、デフォルト有効化の設定はあるため、こちらも合わせてやっておきましょう。

![](/images/productivity-weekly-20230816/push_protection_for_repo.png =600x)
*リポジトリに対する設定画面も別にある。*

また、今回 Organization 単位でどれだけ push protection が発動したかを確認できるようになりました。
バイパスされたケースも確認できるので、セキュリティ対策の強化に役立てましょう。

いやー、GitHub のセキュリティ対策機能がここ数年で充実してきて良いですね。安全なソフトウェア開発のためにも積極的に利用していきたいです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# know-how 🎓

## GitHub Actions のストレージ空き容量を限界まで拡張する
https://zenn.dev/pinto0309/scraps/c6413eb15a1b2a

GitHub Actions の GitHub hosted ランナーにプリインストールされているツールを削除することでストレージの空き容量を確保する方法の紹介。
[runner-images の installers](https://github.com/actions/runner-images/tree/main/images/linux/scripts/installers) のプリインストールツール群を逆算し、apt でインストールされているツールや docker image などを削除することで最終的に 63GB 程度の空き容量を確保できるとのことでした。

若干ハック的な方法ではありますが、GitHub Actions のランナーのストレージ容量が足りなくなった時には参考になりそうです。さらにストレージ容量が欲しい場合は素直に [Larger runner](https://docs.github.com/en/actions/using-github-hosted-runners/about-larger-runners) を使うのがいいと思います。

余談ですが、[ドキュメント](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)では Linux の GitHub hosted ランナー の SSD の容量は 14GB と書かれています。しかし、検証記事によるとデフォルト起動時には 27GB 空いているとのことです。
気になったため、自分のリポジトリで確認してみたところ、22GB 空いていました。

```
Filesystem      Size  Used Avail Use% Mounted on
/dev/root        84G   62G   22G  75% /
tmpfs           3.4G  172K  3.4G   1% /dev/shm
tmpfs           1.4G  1.1M  1.4G   1% /run
tmpfs           5.0M     0  5.0M   0% /run/lock
/dev/sda15      105M  6.1M   99M   6% /boot/efi
/dev/sdb1        14G  4.1G  9.0G  31% /mnt
tmpfs           694M   12K  694M   1% /run/user/1001
```
<!-- textlint-disable ja-technical-writing/no-doubled-joshi -->

では、 14GB と書かれているのは何なのかというと、[GitHub Hosted ランナーが起動している Azure VM(Standard_DS2_v2)](https://learn.microsoft.com/ja-jp/azure/virtual-machines/dv2-dsv2-series#dsv2-series) の一時ストレージのようです。ファイルシステムや Azure VM について詳しくないのですが、GitHub のドキュメントを読んだだけでは、ストレージとして使えるのは 14GB ということなのかなと思っていたので、この機会に勉強になりました。

<!-- textlint-enable ja-technical-writing/no-doubled-joshi -->

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## Four tips to keep your GitHub Actions workflows secure - The GitHub Blog
https://github.blog/2023-08-09-four-tips-to-keep-your-github-actions-workflows-secure/

GitHub Actions のワークフローにおけるセキュリティを維持するための 4 つの tips を GitHub が紹介しています。

GitHub Actions のワークフローでユーザからの何らかの入力を受け取る場合、コマンドインジェクションに脆弱となってしまう可能性があります。
この記事では、コマンドインジェクションの脆弱性を理解するための説明と、コマンドインジェクションを防ぐための 4 つの tips が紹介されています。

1. `run` 内で `${{ }}` 構文を使わないようにする
2. `code scanning` を有効化する
3. 最小権限の原則を守る
4. プライベート脆弱性報告（PVR）[^pvr]を有効化する

特に、`run` 内で `${{ }}` 構文を使ってしまうのは気をつけていてもどこかでやってしまっていそうで怖いです。
これを機に皆さんもワークフローのセキュリティを見直してみてはいかがでしょうか。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^pvr]: ちょっと前に追加された、リポジトリ管理者に脆弱性を秘密裏に報告できる窓口。

# tool 🔨

## Rancher Desktop が Rosetta 2 に対応 | Release Rancher Desktop 1.9 · rancher-sandbox/rancher-desktop
https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.9.0

Docker Desktop 代替である Rancher Desktop の Mac 版が Rosetta 2 に対応しました(experimental)[^docker_desktop]。
どういうことかと言うと、x86_64 のコンテナイメージはこれまで qemu でエミュレートされていましたが、これを Apple Virtualization Framework (vz とも呼称するらしい)でエミュレートできるようになりました。

> Virtual machine type can be set to qemu or vz (Apple Virtualization Framework). vz requires macOS 13.0 Ventura on Intel and macOS 13.3 on Arm (M1, M2) machines. Rosetta can be enabled to run Intel container images on M1/M2 computers under vz emulation.

<!-- textlint-disable ja-technical-writing/ja-no-redundant-expression -->
vz に切り替えることで、x86_64 のコンテナイメージを実行する際のパフォーマンス向上が見込めます。
<!-- textlint-enable ja-technical-writing/ja-no-redundant-expression -->

vz 対応自体は [v1.8.0](https://github.com/rancher-sandbox/rancher-desktop/releases/tag/v1.8.0) ですでに入っていましたが、rdctl コマンドを使う必要がありました。
v1.9.0 では GUI から設定できます。

macOS で Rancher Desktop を利用して居る方は試してみてください。

[^docker_desktop]: [Docker Desktop 4.16 で入った機能](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230125#docker-desktop-4.16%E7%99%BB%E5%A0%B4)と同じような話です。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [HCP Vault Secrets extends secret sync to GitHub Actions](https://www.hashicorp.com/blog/hcp-vault-secrets-extends-secret-sync-to-github-actions)
    - HashiCorp Vault のクラウド版である HCP Vault において、Secret Sync 機能を GitHub Actions で使えるようになりました
    - Secret Sync は Vault に保存されているシークレットを他のサービスに同期する機能です
    - 今回の変更により、HCP Vault 上にある GitHub Actions 向けの Secret を GitHub Actions の Secret へ同期できるようになります
    - 単純にワークフロー内で Vault から直接シークレットを取ってくればいいんじゃないの？と思いますが、ワークフロー内で認証する必要が減るなどのメリットがあるのかもしれません
- **know-how 🎓**
  - [DeepLのChrome拡張機能を使ってるとGitHubのページ内検索で表示崩れが起きる - Carpe Diem](https://christina04.hatenablog.com/entry/deepl-chrome-extension)
    - 最近 GitHub でブラウザ検索した際に表示が壊れてる人はいませんか？どうやら DeepL のブラウザ拡張が悪さしてるらしいです
    - よく気づいたなと思いました
  - [1リリース6,108行から18行へ。ビッグバンリリースを改善した話 - CARTA TECH BLOG](https://techblog.cartaholdings.co.jp/entry/2023/08/15/163000)
    - CARTA HOLDINGS さんによるビッグバンリリースを改善した話です
    - ビッグバンリリースを小さくするために、リリースサイクルを小さくする取り組みを行なったようで、どのようにやったかが書かれています
    - リリースサイクルを小さくするための制約等も書かれており、参考になります
      - ただただリリースを早くすればいいと言う話でもないので
  - [Renovateで正規表現を使い独自フォーマットファイルの依存を自動更新をする - notebook](https://swfz.hatenablog.com/entry/2020/06/09/031148)
    - Renovate における regexManager 機能の紹介記事です
    - regexManager を使うことで任意のフォーマットの依存を自動更新できます
    - [公式ドキュメント](https://docs.renovatebot.com/user-stories/maintaining-aur-packages-with-renovate/#updating-versions-with-renovate)の regexManager の使い方をもう少し噛み砕いて解説してくれており、用語が慣れていない人にはありがたいです
    - dockerfile などに関しては自分で同様の設定を書かずとも[プリセット](https://docs.renovatebot.com/presets-regexManagers/)が存在します
      - 上記記事を読んで理解した上で、プリセットの正規表現で事足りそうならばこれを使うのが早いです
    - ちなみに生産性向上チームの Kesin11 さんは Dockerfile に加えて Earthfile も対象とできるようにしていました
      - https://github.com/Kesin11/renovate-config/pull/1

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*


# あとがき
いやーおもしろいネタが多すぎて書くの大変ですね。ちょうど 8/25 に ARMORED CORE VI FIRES OF RUBICON が発売したため、Weekly を書くどころではありませんでした。

https://www.armoredcore.net/index.html

ちなみに最近ようやく映画のスラムダンクを観たのですが、激アツでよかったですね。スポーツええやんって思いました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## GitHub Actions Meetup Tokyo #2 - connpass
https://gaugt.connpass.com/event/292175/

GitHub Actions に関することをワイワイ話す会、GitHub Actions Meetup Tokyo #2 が 2023/09/21 に開催されます。
場所はサイボウズ株式会社の東京オフィスです。オンライン視聴もあります。

なんか公開されて早いうちにオフライン枠は埋まってしまったのですが、オンライン視聴枠は 200 なので、まだまだ間に合います（オンライン視聴枠は先着順）。

なんと 4,5 年ぶりの開催です。楽しみですね。
気になる方はぜひ参加してみてください！
