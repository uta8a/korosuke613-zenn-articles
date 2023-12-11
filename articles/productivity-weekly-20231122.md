---
title: "ECRのプルスルーキャッシュ強化。LambdaがNode.js v20対応｜Productivity Weekly(2023-11-22号)"
emoji: "🥘"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231122"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-11-22 号です。

今回が第 134 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

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

## Amazon ECR pull through cache now supports additional upstream registries
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/amazon-ecr-pull-through-cache-additional-upstream-registries/

外部のコンテナレジストリから直接 pull する代わりに ECR から pull を行い、ECR に存在しなかった場合は自動的に外部からの pull を裏で行ってくれるプルスルーキャッシュ機能の対象として可能なレジストリとして、新たに Docker Hub, Azure Container Registry, GitHub Container Registry が加わったようです。

以前から ECR Public、Kubernetes container registry, Quay に対応していたので主要なレジストリはほぼ網羅されたのではないでしょうか。

自分も以前から ECR にこのような機能があるのは知っていたのですが、どのような場合に便利なのか分かっていなかったので改めて調べてみました。

https://dev.classmethod.jp/articles/deploy-ecs-from-docker-official-container-ecr-pull-through-cache/
https://dev.classmethod.jp/articles/ecr-pull-through-cache-repositories/

上記 2 つの記事より、コンテナを実行する環境をプライベートサブネットに配置している場合はなるべく通信をインターネットに出したくないため、VPC エンドポイントでアクセス可能な ECR からの pull に限定しつつもパブリックなイメージを利用するのに便利であるということが分かりました。

インターネットに通信を出したくない要件がある場合は当然ながら、NAT Gateway 経由でインターネットへの通信を大量に行うとコストがそれなりにかかってしまうため文字通り ECR をキャッシュとして利用することでコストを抑える効果も期待できそうです。

新たに追加された 3 つのコンテナレジストリから pull するイメージをお使いの場合は、ECR プルスルーキャッシュを利用してみてはいかがでしょうか。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS Lambda が Node.js 20 のサポートを追加
https://aws.amazon.com/jp/about-aws/whats-new/2023/11/aws-lambda-support-node-js-20/

[先日 Node.js 20.x が LTS となりました](https://nodejs.org/en/blog/release/v20.9.0)が、さっそく AWS Lambda で Node.js 20.x ランタイムが使えるようになりました。

ランタイム自体のその他の変更点は以下です。

- Amazon Linux 2023 がベースイメージになった
- 追加のルート証明書のロードを自動で行わなくなった[^load_ca]
  - 平木場）よくわかってないけど、コールドスタートが速くなった...ってコト！？
- オープンソースの AWS Lambda Node.js Runtime Interface Client (RIC) を利用するようになった
  - 平木場）Lambda Container で Node.js を使う際に Node.js 20 ランタイムと同じ RIC が使えるようになったってことっぽい
- Node.js のヒープメモリサイズを `NODE_OPTIONS` 環境変数で設定可能に

その他以前のランタイムからの意向についてや細かい部分がブログのほうに載っているので参照ください。

- [Node.js 20.x runtime now available in AWS Lambda | AWS Compute Blog](https://aws.amazon.com/jp/blogs/compute/node-js-20-x-runtime-now-available-in-aws-lambda/)

なお、Node.js 20 自体の変更点については、次のブログがわかりやすいので、合わせて参照ください。

- [Node.js v20 の主な変更点 - 別にしんどくないブログ](https://shisama.hatenablog.com/entry/2023/04/24/083000)

<!-- textlint-disable ja-technical-writing/ja-no-successive-word -->

まだまだ他のランタイムは使えるので急いで更新する必要はありませんが、早め早めで最新版に追従しておきたいですね。

<!-- textlint-enable ja-technical-writing/ja-no-successive-word -->

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Custom Organization Roles are now GA - The GitHub Blog
https://github.blog/changelog/2023-11-16-custom-organization-roles-are-now-ga/

GitHub の Organization において、管理者は権限をカスタムしたロールを作成・付与できるようになりました。

以前から存在する [custom repository roles](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#enterprise-organizations-can-now-create-custom-repository-roles-%7C-github-changelog) に近い機能かと思われます。
custom repository roles と異なり、custom organization roles は Organization のスコープとなります。

現時点では 10 個の権限を付与可能です（[参考](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/about-custom-organization-roles#permissions-for-custom-roles)）。

- custom organization roles の管理
- custom organization roles の閲覧
- custom repository roles の管理
- custom repository roles の閲覧
- Organization の Webhook 管理
- Organization の OAuth アプリケーションポリシー管理
- custom properties for repository 管理
- custom properties for repository の値の編集
- repository rulesets の管理
- Organization の audit log の閲覧

repository rulesets は管理してほしい...でも、管理者権限は付与したくない...といった場合にきめ細かい権限を与えられて便利ですね。

:::message

なお、タイトルには **GA** という文字が入っていますが、僕の知る限り、外向けにベータ版の存在は確認できていません。

[ドキュメント](https://github.com/github/docs/blob/521f4af42cd4e6721320237bae43628ce8c0ac71/content/organizations/managing-peoples-access-to-your-organization-with-roles/about-custom-organization-roles.md)もコミット履歴を見る限り最近できたばかりだったので、単純に新機能だと思います。

![](/images/productivity-weekly-20231129/ga_janaiyo.png =600x)
*コミット 1 個だけ*

:::

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Security best practices for authors of GitHub Actions - The GitHub Blog
https://github.blog/2023-11-16-security-best-practices-for-authors-of-github-actions/

GitHub 公式ブログによる、GitHub Actions のアクション作成者向けのセキュリティベストプラクティス紹介記事です。

アクション作成者向けの記事となっていますが、あまり GitHub Actions に特化した内容とはなっておらず、OSS ライブラリ作成者にはある程度当てはめられそうな内容となっています。

主に以下のプラクティスについて説明されています。詳しくは記事を読んでください。

- ソースリポジトリを保護する
  - Dependabot を有効化する[^dependabot]
  - code scanning を有効化する
  - Dependabot のクリティカルアラートを解決する
  - セキュリティポリシーを作成する
- 他要素認証（MFA）を有効化する
- verified creator バッジを取得する[^verified-creator]

verified creator はともかく、他は今すぐできるプラクティスですね。どんなものか知らない人は確かめてみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^dependabot]: 脆弱性検知はともかく、依存関係更新については Renovate も便利で良いです。
[^verified-creator]: これに関しては企業レベルの話になりそうですね。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **tool 🔨**
  - [ysk8hori/delta-typescript-graph-action: This GitHub Action uses Mermaid to visualize in a diagram the files that were changed in a Pull Request and their related dependency files.](https://github.com/ysk8hori/delta-typescript-graph-action)
    - TypeScript の依存関係を可視化する GitHub Actions のアクションです
      - 単純なコマンドラインツールも別途あります [ysk8hori/typescript-graph](https://github.com/ysk8hori/typescript-graph)
    - Mermaid diagram を使って、pull request に変更されたファイルと依存関係をハイライトしてくれるようです
    - レビューしやすそうで気になりますね

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき

今週号でした。本来は 2023/11/22 号のネタが少なかったので、2023/11/29 号の合併号の予定でしたが、2023/11/29 号は生産性向上チームの都合でスキップとなったので、ちょっとネタ少なめでしたが今回は 2023/11/22 号のみでお届けしました。
また、僕が忙しくて遅くなってしまいました。すみません。

~~遅くなった理由はアドベントカレンダー書いてたからです。~~
みなさん読んでください。

https://zenn.dev/cybozu_ept/articles/skip-deploy-by-artifact-sha-for-github-actions

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
