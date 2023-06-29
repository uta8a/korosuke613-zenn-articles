---
title: "Productivity Weekly (2023-06-28号)"
emoji: "💔"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230628"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-28 単独号です。

今回が第 117 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Squarespace への Google Domains のドメイン登録の譲渡について - Google Domains ヘルプ
https://support.google.com/domains/answer/13689670?hl=ja

Google のドメイン販売、管理サービスである Google Domains が Squarespace に売却されることになりました。

Google Domains は 2015 年にベータとしてサービスが開始され、2022 年に GA となりました。Squarespace はウェブサイト構築、ホスティングを事業とするアメリカの会社です。

事業売却されることで顧客のドメインは Squarespace の所有・管理となります。移行は自動で行われるようです。支払い等は移行期間が設けられるようですが、最終的には Squarespace と取引していくことになるとのことです。
また、移行後は Squarespace の提供する管理コンソールで管理できるようになるようです。

具体的にいつ頃から移行が始まるかは明記されていませんが、今後数ヶ月かかる見込みであることが書かれています。

さて、お知らせ自体は Google Domains のものですが、Google には Google Cloud のサービスである Google Cloud Domains もあります。
最初のお知らせでは Cloud Domains について明記されていませんでしたが、後日追記されていました。（まだ日本語版には反映されていません）

> **What does this mean for Cloud Domains customers?**
> Google Cloud Domains had a strong dependency on Google Domains, so customers using Cloud Domains will be migrated to Squarespace. Google Cloud will issue a product MSA (Mandatory Service Announcement) to all impacted customers with more details about what to expect during the migration period.
>
> We are anticipating that the migrations of domains and data (registrant, WHOIS info, and in some cases DNS delegation) to Squarespace will take place in 2024. You can continue to use Cloud Domains until your domain is migrated. We will work with Squarespace to make the migration as seamless as possible.
>
> https://support.google.com/domains/answer/13689670?hl=en

どうやら Cloud Domains は Google Domains に強く依存していたため、同じく Squarespace に移行されるようですね。
こちらに関しては 2024 年に移行が行われるようです。

おそらく Google 管理だったからこそドメインを買っていた方もおられると思います。dev ドメインの所有者が Google しかいないからとか、信用があるからとか、Google アカウントでログインできるからとか。

僕は korosuke613.dev というドメインを所有しているため、Google Domains または Cloud Domains を使わざるを得ませんでした（Cloud Domains を使ってます）。
Google 管理だったからこその安心感もあったのですが、正直まだ Squarespace に対する信用は持てていません。ドメインの変更なんてしたくありませんし、今後どうするかなという感じです。

...

Cloudflare Registrar が dev ドメインに対応するみたいなのを前聞いていたのですが、結局どうなったのか気になって調べたところ、どうやら 2023 年 7 月中旬までに .dev と .app ドメインに対応予定とのことでした。

> Confirm Cloudflare supports your domain’s TLD: You can view the full list of TLDs we currently support here. Note: We plan to support .dev and .app by mid-July 2023.
https://blog.cloudflare.com/a-step-by-step-guide-to-transferring-domains-to-cloudflare/

個人的には Cloudflare の方がよっぽど信用してるので、dev ドメインに対応したら Cloudflare Register に移管しようかなという感じです。その時は次の記事が参考になりそうです。

- [Google DomainsからCloudflareにドメインを移管した - ぷらすのブログ](https://blog.p1ass.com/posts/transfer-domain-to-cloudflare/)

正直今回の件は残念です。Google はサービスを終了しがちみたいなのをたまに聞きますが、ドメイン事業ですら手放すのかと驚きました。
つらいですね。

## GitHub Actions: You can now disable repo level self-hosted runners in an Enterprise and Organization | GitHub Changelog
https://github.blog/changelog/2023-06-13-github-actions-you-can-now-disable-repo-level-self-hosted-runners-in-an-enterprise-and-organization/

リポジトリ単位で登録するセルフホストランナーについて、指定したリポジトリ以外にセルフホストランナーを登録できなくできるようになりました。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Actions - Securing OpenID Connect (OIDC) token permissions in reusable workflows | GitHub Changelog
https://github.blog/changelog/2023-06-15-github-actions-securing-openid-connect-oidc-token-permissions-in-reusable-workflows/

GitHub Actions において、OIDC を reusable workflows で利用する場合は、呼び出し元のワークフローで、`.permissions.id-token: write` を宣言しないといけなくなりました。

これにより、呼び出されたワークフローで生成される OIDC トークンが、意図せず使われる心配がなくなる旨が Changelog に書かれています。

reusable workflows で OIDC を利用する場合は気をつけましょう。

## Organization-level code scanning default setup for CodeQL is now generally available | GitHub Changelog
https://github.blog/changelog/2023-06-23-organization-level-code-scanning-default-setup-for-codeql-is-now-generally-available/

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## GitHub Actions – Update on OIDC integration with AWS | GitHub Changelog
https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/

GitHub Actions の AWS との OIDC 連携において、thumbprint を 2 つ指定しないとエラーになることがあるため、thumbprint を 2 つ設定するよう案内がありました。

これは、Actions が提供する OIDC プロバイダの証明書が 2 つの中間証明書のどちらか一方が返すようになったことが原因とのことです。

- `6938fd4d98bab03faadb97b34396831e3780aea1`
- `1c58a3a8518e8759bf075b76b750d4f2df264fcd`

AWS の OIDC 設定をする際はこれら 2 つの thumbprint を指定する必要があります。

AWS に限った話なのか？という話題も Weekly で出たのですが、そもそも他のサービスでは OIDC の設定をする際に thumbprint を要求してこないらしいです（したがって AWS 特有の問題）。

> GitHub ActionsのOIDC認証が壊れた件でAWSと限定が付いてたのは、別にエンドポイントがAWS用というわけではなく、中間証明書をpinしろとTLSの証明書チェインを信頼してないのがAWSだけということっぽい。GitHubが悪いというよりAWSが悪い。
> 
> https://twitter.com/minamijoyo/status/1674368072009027584

↑有識者の声です。

実際自分は AWS でしか GitHub Actions の OIDC 連携をしたことががなかったため、thumbprint を求められるのが当たり前なのかなと思っていたのですが、そうでもないんですね。

証明書のピンニング（正直ここら辺の知識はあまりない）については、digicert 曰く悪手らしいです。

- [証明書のピンニングはやめましょう | DigiCert.com](https://www.digicert.com/jp/blog/certificate-pinning-what-is-certificate-pinning)

しかし、GitHub が証明書を新しくするたびにワークフローが止まりかねない事態になるのはつらいですね。

[関連する Issue](https://github.com/aws-actions/configure-aws-credentials/issues/357) が aws-actions/configure-aws-credentials に上がっています。[AWS の中の人も登場し、なんとかしたいねみたいなことを言ってますね](https://github.com/aws-actions/configure-aws-credentials/issues/357#issuecomment-1613427884)。

改善されるのを待ちたいですね...

ちなみに、Terraform を使っている場合は `tls_certificate` を使って [thumbprint を自動計算するという方法](https://zenn.dev/yukin01/articles/github-actions-oidc-provider-terraform)があります。しかし、apply のたびにランダムで差分が発生することになるので、2 つの証明書のどちらかを返す場合、Terraform で計算させるのは厳しい感じがありますね[^kaizan][^ref]。

↑ここまで 2023/07/07。
↓ここから 2023/07/08。

上の文章を書いた次の日、AWS 側で証明書の thumbprint を検証しないようになりました（別の方法で確認される）。

> GitHub ActionsからAWSにOIDC認証するのがまれによく証明書ローテーショで壊れるやつ、GitHubとAWS側でよしなにやるのでユーザ側で証明書pinする必要はなくなったとのこと。厳密にはAPIとしては必須だがダミーを埋めても無視される状態になった模様
> https://twitter.com/minamijoyo/status/1677485707227729920

- [GitHub OIDC is now using library of trusted CAs · Issue #763 · aws-actions/configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials/issues/763)
- https://github.com/aws-actions/configure-aws-credentials/issues/357#issuecomment-1626357333

AWS の中の人による詳しい説明を読むと、GitHub に限定して IAM Identity Provider で特定の thumbprint の指定が必要なくなったとのことです。しかし、API や UI 上の変更は追いついていないため、任意の値を入れておけばよいとのことです（例：`afafafafafafafafafafafafafafafafafafafaf`）。

これにより今後証明書が変更されてもいきなりジョブが動かなくなることはなくなりましたね。
素早い対応に感謝したいです。

[^kaizan]: まぁ自動計算してると改ざんされた証明書も自動で受け入れてしまうことになりかねないから自動計算するなよって話もあるかもしれませんが。という話が Weekly ででました。

[^ref]: この記事が参考になります。[GitHub Actions から AWS へのアクセスに利用している OpenID Connect ID Provider の thumbprint について調査した - ROUTE06 Tech Blog](https://tech.route06.co.jp/entry/2023/06/29/181610)

## CircleCI のアップデート（リソースクラス、価格関連）

CircleCI のリソースクラス、価格に関連するアップデートが来ていました。

- [Linux VM 2xlarge+　リソースクラスが追加](https://circleci.com/ja/changelog/#linux-vm-2xlarge-リソースクラス) 2023/06/07
  - 32 CPU、64 GB RAM、300 credits/min
  - Scale プランで利用可能
  - 強力ですね
- [すべての有料プランで M1 が利用可能に](https://circleci.com/ja/changelog/#すべての有料プランで-m1-が利用可能に) 2023/06/07
  - 全ての有料プランで M1 Mac インスタンスが利用可能になったようです。これまでは Scale プランだけだったのかな
  - また、既存の M1 Large リソースクラスに加え、新たに M1 Medium リソースクラスが追加されました
    - M1 Medium は 4 CPU、6 GB RAM、150 credits/min
    - M1 Large は 8 CPU、12 GB RAM、250 credits/min
  - また、M1 Large リソースクラスは価格改定が行われました[^updown]
- [リモート Docker の価格変更のご案内](https://circleci.com/ja/changelog/#リモート-docker-の価格変更のご案内) 2023/06/15
  - 長くなったので次の項目に記します

### リモート Docker の価格変更のご案内
https://discuss.circleci.com/t/changes-to-remote-docker-reporting-pricing/47759

`setup_remote_docker` に関する価格変更がありました。
以前は、Docker を動かす VM と操作をするクライアントにあたる VM に分かれており、クライアント（Docker executor）の料金は発生していましたが、Docker を動かす VM（Linux VM Medium）の料金については発生して**いません**でした

現在では、Docker を動かす VM とクライアントの VM が 1 つの VM(Linux)に統合されており、Docker executor ではなく machine executor(Linux)のリソースクラスが適用されるようになりました。

これまで setup_remote_docker を使う際は `jobs.<job_name>.resource_class` に Docker executor の区分である small、medium、medium+	、large、xlarge、2xlarge、2xlarge+ のいずれかを指定していましたが、これからはそれらのリソースクラスが machine executor(Linux)の区分である medium、large、xlarge、2xlarge、2xlarge+ として解釈されることになります。
machine executor(Linux)は small、medium+ が存在しないため、もしそれらを指定していた場合、それぞれ上のクラスである medium、large に置き換えられます。

したがって、同名のリソースクラスでも料金が変わる場合があります。例えば small を指定していた場合は 5 credits/min -> 10 credits/min と 5 credits/min 増に、一番差が大きい 2xlarge+ の場合、100 credits/min -> 300 credits/min と 200 credits/min 増となります。逆に、medium、large を利用していた場合は価格に変更はありません。

利用者目線で見ると実質的な値上げとなっており、最悪 200 credits/min もクレジット消費量が増加することになります。これらの仕様変更は 6/15 からとなっています。setup_remote_docker を使用している人は一度設定を見直しましょう。

[^updown]: 前より上がったのか下がったのかいまいちわからない。

## Repository Rules public beta updates | GitHub Changelog
https://github.blog/changelog/2023-06-27-repository-rules-public-beta-updates/

以前紹介した GitHub の [Repository Rules](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230426#introducing-repository-rules-public-beta-%7C-github-changelog) (public beta)が更新されました。

ざっくり次のような変更が入りました。

- UI がわかりやすくなった
- バイパス設定
  - UI がわかりやすくなった
  - プルリクエストのみバイパス可能に
    - （いまいちどういう意味かわからなかった）
  - バイパス可能な対象にリポジトリロールが追加
  - バイパス可能な対象に Bot やアプリが追加
- API の強化
- API の仕様変更

個人的にはバイパス可能対象の選択肢が増えたのがとても嬉しいですね。
Bot 等の運用と組み合わせずらかったので。

また、API の破壊的変更が多く、まだまだ beta であることを思い知らされました。
便利な機能なのでどんどん使いやすくなって GA となってほしいですね。

# know-how 🎓

## Millions of GitHub repos likely vulnerable to RepoJacking, researchers say
https://www.bleepingcomputer.com/news/security/millions-of-github-repos-likely-vulnerable-to-repojacking-researchers-say/

RepoJacking という攻撃手法の解説記事。
GitHub のリポジトリがリポジトリ名変更や org 移動などで新しい名前になり、リダイレクトで依存解決がされるようになっているときに、攻撃者が古い名前でリポジトリを作成する攻撃手法。
Google や Lyft が管理するリポジトリでもこの方法で攻撃可能だったとのこと。
GitHub は人気のリポジトリが名前変更するときは元のリポジトリ名をプロテクトするらしいけど、そのリポジトリが依存してるあまり有名じゃないパッケージに同様の問題があればあまり意味がない。
現時点で明確な対策手法はない感じ。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## TerraformのCDに使用できるツールをまとめてみた | DevelopersIO
https://dev.classmethod.jp/articles/terraform-deploy-pipeline-tool/

クラメソさんによる Terraform の CD ツールをまとめた記事です。

Terraform は `terraform apply` してはじめてリソース作成ができますが、この apply 作業を CD 等で自動化する際は色々考えることが多いです。例えば、どのようなフローで apply を承認するか、apply させるためのサービスアカウントに対する権限をどこまで許すか、いわゆる CIOps でやるか、GitOps でやるか、などなど。

手動でやるのが一番楽かもしれませんが、コマンドのミスによる環境の破壊（人間はミスをする生き物なので）や、非常に強い権限を人に与えなければならないなど、やはり懸念があります。

クラメソさんの上記の記事は、一般的な Terraform のデプロイフロー、なぜ自動化したいか、デプロイパイプラインに使用できるツール（Terraform Cloud、Atlantis、プロバイダ外の CI ツール、プロバイダ内の CI ツール、GitOps ツール）の比較表、各ツールの pros、cons をまとめています。（プロバイダは AWS が想定されています）

ざっくり比較したいなら比較表が便利です。また、各ツールの紹介画面ではデプロイに関するわかりやすい構成図もあります。

Terraform の CD ツールは一強みたいなのがないと思っているため、こういう比較まとめを作ってくださるのはとてもありがたいです。
Terraform のデプロイ自動化を検討している人にとても参考になると思います。

# tool 🔨

## New tool to secure your GitHub Actions | The GitHub Blog
https://github.blog/2023-06-26-new-tool-to-secure-your-github-actions/

GitHubSecurityLab が GitHubSecurityLab/actions-permissions をリリースしました[^official]（public beta）
GitHub Actions のジョブ実行に必要な最小権限を分析するアクションになります。

monitor アクションと advisor アクションの 2 つのアクションがあります。
- monitor アクションを呼び出すと、ローカルプロキシをランナー内に立ち上げて、GitHub API の呼び出しを解析して必要なパーミッションを分析してジョブサマリにレポートしてくれる
- advisor アクションを呼び出すと、monitor アクションを呼び出したジョブの複数回実行の結果を集約して必要なパーミッションがわかる
  - 同じジョブでも条件によって行う処理が違うケースで役立つ

個人のリポジトリで試してみました。

- [GitHubSecurityLab/actions-permissions 触ってみる](https://zenn.dev/korosuke613/scraps/8236994b2d2929)

正直なところ、public beta であるからしょうがないのですが、実運用は厳しいという感想です。

- プロキシを立ち上げるせいか、ネットワーク通信が大変遅くなり、ジョブの実行時間が伸びる（[参考](https://zenn.dev/link/comments/8952830f3c8a6e)）
- プロキシを立ち上げるせいか、一部の依存関係を取得する際にエラーが起こる（[参考 1](https://zenn.dev/link/comments/876fc6120021a7)、[参考 2](https://github.com/GitHubSecurityLab/actions-permissions/issues/17)）
  - issue 送った（[Download of npm package playwright times out · Issue #17 · GitHubSecurityLab/actions-permissions](https://github.com/GitHubSecurityLab/actions-permissions/issues/17)）

ちなみに、類似ツールとして、azu さんが作った update-github-actions-permissions というツールがあります。

- [update-github-actions-permissions v2をリリース: 500種類のGitHub Actionsのpermissionsに対応 | Web Scratch](https://efcl.info/2023/02/01/update-github-actions-permissions-v2/)

こちらは静的解析で、ジョブ内で呼び出してるアクションの必要権限を分析してくれます。
静的解析であることと、すべてのアクションの情報が登録されているわけではないことから、不十分なケースもあると思いますが、利用ハードルはとても低いため、大半のワークフローはカバーできると思います。

不十分なケースでは今回公開されたアクションの利用を検討してもいいかもしれません。
（正直コミットしないといけないのだるいのもある）

とりあえず正式リリースを待ちたいですね。

[^official]: GitHub Blog で紹介されてるくらいだから GitHub 公式なんだろう。

## gitleaks/gitleaks: Protect and discover secrets using Gitleaks 🔑
https://github.com/gitleaks/gitleaks

git リポジトリ内のパスワード、api キー、トークンのようなハードコードされた秘密を検出・防止するための SAST ツールです。

OpenAI の token 対応等、最近のシークレットにも対応しています。

- [Release v8.17.0 · gitleaks/gitleaks](https://github.com/gitleaks/gitleaks/releases/tag/v8.17.0)

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub-hosted larger runners for Actions are generally available | GitHub Changelog](https://github.blog/changelog/2023-06-21-github-hosted-larger-runners-for-actions-are-generally-available/)
    - GitHub Actions の GitHub-hosted larger runner が GA になりました[^larger_1][^larger_2] 🎉
    - 強いランナーを使いたい方はぜひ使ってみましょう
  - [AWS Config がリソースタイプによる記録の除外に対応 | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/announcing-aws-config-now-supports-recording-exclusions-by-resource-type/)
    - AWS リソースの構成変更を追跡管理するサービスこと AWS Config がリソースの種類で記録を除外できるようになりました
    - AWS Config も決して安くないので、不必要なタイプのリソースは除外しておきたいですね
  - [マイクロソフト、ChatGPTに任意のドキュメントを読み込ませて回答を得られる「Azure OpenAI Service On Your Data」パブリックプレビュー開始 － Publickey](https://www.publickey1.jp/blog/23/chatgptazure_openai_service_on_your_data.html)
    - Microsoft のサービスである Azure OpenAI が任意のドキュメントを読ませてチャット形式で回答を得られるようになりました
    - ChatGPT ではできないことなので、Azure OpenAI の方が嬉しい場面が増えてきましたね
- **know-how 🎓**
  - [第6回　自動テストのサイズダウン戦略 ～テストダブルを作る前に考えるべきこと～ | gihyo.jp](https://gihyo.jp/dev/serial/01/savanna-letter/0006)
    - t-wada さんによるサバンナ便り最新号です。第 6 回はテストダブルを作る前に考えることについてです
    - テストダブルについては第 4 回参照です
      - [第4回　テストダブル ～忠実性と決定性のトレードオフを理解する～ | gihyo.jp](https://gihyo.jp/dev/serial/01/savanna-letter/0004)
    - テストを書いているとついついテストダブルを作りたくなっちゃいますが（自分だけ？）、ほんとに必要かどうかや自分で作る必要があるかなど、記事に載っていることを考えながらテストを作っていきたいですね
  - [CircleCIが『2023 年版ソフトウェアデリバリーに関する現状調査レポート』を公開。｜CircleCI合同会社のプレスリリース](https://prtimes.jp/main/html/rd/p/000000026.000045056.html)
    - CircleCI がソフトウェアデリバリーに関する現状調査レポートを公開しました
    - 成果の大きいチームはやはりフィードバックループが速く回ってたり、デプロイ頻度が多かったりするようです
    - また、プラットフォームチームに関する分析やその他面白い結果も載っています
    - レポート: https://circleci.com/ja/resources/2023-state-of-software-delivery
  - [AWS ソリューション「AWS でのワークロード検出」で自動でシステム構成図作成してみた | DevelopersIO](https://dev.classmethod.jp/articles/using-aws-workload-discovery-for-diagram-automation/)
    - AWS のソリューションとして公式で紹介されているワークロード検出を使ってシステム構成図を作ったというクラメソさんによる記事です
    - いい感じの図ができてて良いのですが、CloudFormation で頑張らないといけないのはちょっとめんどいですね
    - 正直公式のサービスとして提供してほしいです
- **tool 🔨**
  - [WebStorm 2023.2 EAP | Improved TypeScript type error formatting](https://blog.jetbrains.com/webstorm/2023/06/webstorm-2023-2-eap6/#improved_typescript_type_error_formatting)
    - JetBrains IDE の一種である WebStorm 2023.2 EAP で TypeScript の読みづらい型エラーの表示がめちゃわかりやすくなったらしいです
      - EAP は Early Access Program の略で、要はプレビュー版です
    - [このツイートにある before after](https://twitter.com/tonkotsuboy_com/status/1673600725191122945) がわかりやすいです
    - 本当に TS のエラーは読みづらくて嫌になるので、この変更はとても嬉しいですね
  - [フィーチャーフラグを管理するためのOpenFeature | フューチャー技術ブログ](https://future-architect.github.io/articles/20230621a/)
    - Future さんによるフィーチャーフラグを管理するためのオープンな仕様である OpenFeature の紹介記事です
    - フィーチャーフラグは自前でシンプルな実装が可能ですが、複雑なことをしようとするとシンプルな実装だと厳しくなるため、仕様や SDK があると嬉しいですね
    - OpenFeature は仕様と SDK があり、記事では OpenFeature の概要と Go の SDK による実装例が紹介されています
    - [CNCF では sandbox プロジェクト](https://landscape.cncf.io/card-mode?project=sandbox&selected=open-feature)(初期段階)になっています。遊んでみてください
  - [OpenAI APIを利用してTerraformから構成図っぽいMermaidを出力してくれるコマンドを作った話](https://zenn.dev/hash_generate/articles/764192ca6e6935)
    - Terraform の構成図っぽい Mermaid diagram を（OpenAI が）出力してくれる CLI を作ったという話です
    - .tf を読み込み、いい感じのプロンプトで ChatGPT に mermaid 形式の図を作らせています
    - 完全に正しい図ができているわけではなさそうですが、まあまあそれっぽい図ができてて驚きました
    - いかんせん、大規模なモジュールを読み込ませるとトークンの限界を越えそうなので、まだまだ実運用は厳しいかなと思いました
    - 正直静的解析すれば良さそうな気もしますが、まあまあそれっぽい図ができるのは面白いですね。未来を感じます

[^larger_1]: [GitHub Actions Larger runners - Are now in public beta | GitHub Changelog](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20220907?redirected=1#github-actions-larger-runners---are-now-in-public-beta-%7C-github-changelog)
[^larger_2]: [GitHub Actions: larger hosted runners are now automatically created for customers | GitHub Changelog](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221026?redirected=1#github-actions%3A-larger-hosted-runners-are-now-automatically-created-for-customers-%7C-github-changelog)

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 
今週のおまけです。
