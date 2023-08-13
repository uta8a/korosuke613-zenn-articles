---
title: "Productivity Weekly (2023-08-02号)"
emoji: "🐯"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230802"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-02 単独号です。

今回が第 120 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@Kesin11](https://zenn.dev/kesin11)

:::

# news 📺

## 新着情報 – パブリック IPv4 アドレスの利用に対する新しい料金体系を発表 / Amazon VPC IP Address Manager が Public IP Insights の提供を開始 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/new-aws-public-ipv4-address-charge-public-ip-insights/

AWS において、パブリック IPv4 アドレスの料金体系が変わり、割り当てられているかどうかに関わらず IPv4 アドレスごとに有料となります（2024/02/01 より）。

理由としては、IPv4 アドレスの保全のためで、IPv6 の採用を促すためとのことです。

これまでも、どこにも割り当てられていないパブリック IPv4 アドレスは、1 アドレスあたり $0.005/hour が課金されていました（だいたい月 $3.6）。これからは全てのパブリック IPv4 アドレスが課金対象となります。
月当たりの金額は大したことはありませんが、多くのパブリック IPv4 アドレスを抱えている場合は注意が必要です。

また、Amazon VPC IP Address Manager に Public IP Insights という新機能ができました。パブリック IPv4 アドレスの利用状況を分析できます。案外パブリック IPv4 アドレスを大量に持っているかもしれません。これを機に棚卸ししましょう。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## actions/runner nodejs plan and next steps · actions/runner · Discussion #2704
https://github.com/actions/runner/discussions/2704

GitHub Actions に内蔵されている Node.js のバージョンはずっと 16 で止まっており、16 に関してはそろそろメンテナンス期間も終了してしまうので一部では以前から問題視されていたのですが、この件に関してバージョン 18 をスキップして 20 に上げる予定であることが discussion にてアナウンスされました。16 は今年の後半に Deprecated に向けたプロセスを開始する予定とのことです。

個人的にこの件に関係する可能性があると思ったのは、octokit.js が最近リリースした[v3.0.0](https://github.com/octokit/octokit.js/releases/tag/v3.0.0)で Node.js 14, 16 のサポートを切った件でした。octokit が API への通信を行う際に Node.js 18 から追加された fetch API を使うようになったため、Node.js 16 までの場合は `node-fetch` のような `fetch API` 互換の実装を外から渡す必要がある（[README参照](https://github.com/octokit/octokit.js#fetch-missing)）ようです。

[actions/github-script](https://github.com/actions/github-script)やその他の無数に存在するであろう GitHub の API を使用する actions も octokit を使っていると思われるため、これは近いうちに問題になるかもしれないと考えて深掘り調査をしてみました。

調査した上での自分なりの結論としては、仮にランナー内臓の Node.js が 16 のままであったとしても octokit を使っている actions がただちに動かなくなるという心配はなさそうです。ただし、GitHub の API を利用する actions を自作されている方で、`octokit/octokit` をお使いであれば[v3.0.0](https://github.com/octokit/octokit.js/releases/tag/v3.0.0)以上、`@octokit/core` であれば[v5.0.0](https://github.com/octokit/core.js/releases/tag/v5.0.0)に以上に上げるタイミングで念入りに動作確認をしておいた方が良さそうです。

自分が調査した内容の詳細に関してはこちらのスクラップを参照してください。

https://zenn.dev/kesin11/scraps/dc5a761fa5992e

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## Shhh… 🤫 @Cloudflare Registrar just quietly rolled out support for the following TLDs:
https://twitter.com/eastdakota/status/1686513213503127557

Cloudflare のドメイン販売・管理サービスである Cloudflare Registrar が .dev や .app といった TLD[^tld]をサポートするようになりました。

[先日](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230628#squarespace-%E3%81%B8%E3%81%AE-google-domains-%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E7%99%BB%E9%8C%B2%E3%81%AE%E8%AD%B2%E6%B8%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6---google-domains-%E3%83%98%E3%83%AB%E3%83%97)、Google のドメイン販売・管理サービスの Google Domains が Squarespace 社に売却されるため、Google Domains および Google Cloud Domains が将来的に使えなくなる話をしました。

サービスは Squarespace 社が引き継ぎますが、さまざまな理由でもっと別のレジストラを使いたいパターンもあったと思います。
多くの TLD はいろんなレジストラで扱えますが、例えば .dev ドメインはかつて Google Domains でしか購入・管理ができませんでした[^dev_dominant]。そのため、.dev ドメインを持っている方は Squarespace 提供のレジストラを使わざるを得ない状況でした（僕もです）。

しかし、今回の Cloudflare Registrar のアップデートにより、.dev ドメインを含むいくつかの TLD を Cloudflare Registrar で購入・管理できるようになりました。
Cloudflare ならヨシ！という方はこれで .dev ドメインなどのドメインを Cloudflare Registrar で扱えるようになります。

:::message
ていうか今回調べてわかったんですけど、いつの間にかムームードメインとかお名前.com とかでも .dev ドメインが購入・管理できるようになってたんすね。知りませんでした。まあ Cloudflare だけ対応ということはないもんな。
:::

僕は [korosuke613.dev](https://korosuke613.dev) というドメインを Google Cloud Domains に持っていたのですが、今回 Cloudflare Registrar にドメインを移管しました。ついでに DNS も Google Cloud DNS から Cloudflare DNS へ移行しました。

- [GoogleドメインからCloudFlareに移管する。 - Qiita](https://qiita.com/napspans/items/3e4030ea54948295c53e)
- [Google DomainsからCloudflareにドメインを移管した - ぷらすのブログ](https://blog.p1ass.com/posts/transfer-domain-to-cloudflare/)

ここら辺のブログ記事を参考にやってみたら簡単にできたので、Cloudflare Registrar 移行を考えている人は参考にしてみてください。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^tld]: Top Level Domain の略。ドメインの最後の部分。
[^dev_dominant]: 要出典。昔は Google Domains でしか買えなかったと思うけど、ググってもそれを示す一次的なソースを見つけられなかった...

## AWS Fargate はシーク可能な OCI を使用してより高速なコンテナ起動を可能に | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/aws-fargate-enables-faster-container-startup-using-seekable-oci/

AWS Fargate において、コンテナイメージの遅延読み込み (非同期読み込みとも呼ばれる) 技術である Seekable OCI がサポートされました。うまく活用することでコンテナの起動時間を短縮できます。

どのように起動時間を短縮できるかですが、コンテナを run するときに実際に必要となるファイルやバイナリはイメージのごく一部であることが多いため、最初にイメージ全てを pull せずに、必要なレイヤーが揃った段階でコンテナを起動し、起動しつつ残りのレイヤーを遅延 pull することで起動時間を短縮できるようです（ここら辺の自分の説明が合っているかは不安）。

どのレイヤーにどのファイルがあるかや、tar のどこに格納されているか、どのようにアプリケーションが必要とするファイルのみを解凍するかなどのメタデータを用意する必要があります。これらのメタデータは SOCI インデックスマニフェストと呼ばれ、既存イメージに手を加えることなく別途作成できます。
作成したマニフェストもレジストリに push することで、Fargate で Seekable OCI の恩恵を受けられます。

方法は上記ブログに載っていますが、クラメソさんも記事をあげているため、こちらも参考になります。

- [全 AWS Fargate 利用者必見！ Seekable OCI インデックスによりコンテナの起動が大幅に高速化するようになりました | DevelopersIO](https://dev.classmethod.jp/articles/update-aws-fargate-seekable-oci)

また、AWS のブログにおいて、Seekable OCI がどのような仕組みなのかが説明されています。仕組みをもっと知りたい方はこちらも参考にしてみてください。

- [詳解 : Seekable OCI を使用した AWS Fargate におけるコンテナイメージの遅延ロード | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/under-the-hood-lazy-loading-container-images-with-seekable-oci-and-aws-fargate/)

場合によっては 50% 近くの高速化も見込めるらしく、Fargate 利用者なら試してみたいですね。

:::message

ちなみに、最近リリースされた [nerdctl 1.5.0 のリリースノート](https://github.com/containerd/nerdctl/releases/tag/v1.5.0)に SOCI 対応が書かれていたので、nerdctl 使いの方は手元で検証できるかもしれません。

> Lazy-pulling now supports SOCI (#2347)

:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [経済産業省、「ソフトウェア管理に向けたSBOM（Software Bill of Materials）の導入に関する手引」公開。環境構築、SBOM作成、運用管理など解説 － Publickey](https://www.publickey1.jp/blog/23/sbomsoftware_bill_of_materialssbom.html)
    - 経産省が SBOM 導入の手引きを公開しました
    - [GitHub でも SBOM を出せるようになった](https://github.blog/changelog/2023-03-28-generate-an-sbom-from-the-dependency-graph/)りと、だんだんエコシステムが拡充してる感がありますが、まだまだめちゃ使われているという印象は（主観ですが）ありません。こういった手引きが出ると日本の利用者も増えてよさそうですね
    - 手引きでは、SBOM の背景や目的、概要、導入プロセスや各フェーズで大事なポイントなどが書かれています
    - 「SBOM に関する誤解と事実」がよくある誤解を書いてて面白かったのとわかりやすくてよかったです
    - 僕も正直さわりしか知らないので、この手引きを読んでみようと思います（ボリューミーだけど）
- **tool 🔨**
  - [8ヶ月で リリース速度が約2倍、プルリクエスト件数122%向上した話](https://zenn.dev/offersmgr/articles/cf9e7282d5f2c8)
    - Offer MGR という Four Keys などの開発生産性に関わるメトリクスを取得できるサービスの紹介記事です
    - Offer MGR を開発している overflow さんはドッグフーディング的に Offer MGR を使っており、開発生産性を可視化、分析し、デプロイ頻度の向上や変更リードタイムの減少を実現できたとのことです
    - フリートライアルもあるそうなので、気になる方は試してみるといいかもしれません

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# あとがき
今週号でした。遅くなってしまいすみません。
最近ポケモンスリープをやっているのですが、僕のポケモンたちは常に眠そうです。ごめんね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## GitHub Actions Meetup Tokyo #2 - connpass
https://gaugt.connpass.com/event/292175/

GitHub Actions に関することをワイワイ話す会、GitHub Actions Meetup Tokyo #2 が 2023/09/21 に開催されます。
場所はサイボウズ株式会社の東京オフィスです。オンライン視聴もあります。

なんか公開されて早いうちにオフライン LT 枠とオンライン視聴枠が埋まってしまいましたが、オフライン一般参加枠は 2023/08/13 19:42 時点でまだ 33/40 となっているため、ギリ空いてます。

なんと 4,5 年ぶりの開催です。楽しみですね。
気になる方はぜひ参加してみてください！
