---
title: "Productivity Weekly (2023-08-30号, 2023-08-23号)"
emoji: "🚚"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230830"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-08-30, 2023-08-23 合併号です。

今回が第 123 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)

:::

# news 📺

## Repository Actions Runners List - The GitHub Blog
https://github.blog/changelog/2023-08-21-repository-actions-runners-list/

`repo:write` の権限を持っているリポジトリにおいて、上部タブの Actions -> Runners ページからそのリポジトリで使用可能なランナー確認することが可能になりました。今まで利用可能なランナー確認するためには、リポジトリか Organization の Settings -> Actions -> Runners のページを見る必要があったため、必然的にリポジトリか Organization の admin 権限が必要でした。

特にセルフホストランナーを利用する場合はワークフローの yaml に利用するセルフホストランナーを指定するラベルを事前に知っておく必要があるのですが、admin 権限を持たないユーザーは GitHub 上でそのラベルを確認できないのが少々面倒でした。今回のアップデートにより admin 権限がないユーザーでもランナーの状態とラベルを確認することが可能になったため、セルフホストランナーの管理者に問い合わせたり社内のドキュメントを調べるなど、GitHub 以外の手段で確認する手間が省けるようになるはずです。

*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## Announcing Python in Excel
https://techcommunity.microsoft.com/t5/excel-blog/announcing-python-in-excel-combining-the-power-of-python-and-the/ba-p/3893439

Excel の中で Python コードが書ける機能、 Python in Excel が Windows 向けパブリックプレビューになりました。
現在は Microsoft 365 Insiders プログラムの参加者への提供とのことです。

Python in Excel ではセルに PY 関数を入力すると、セルに直接 Python コードを書くことができます。
Python コードは Microsoft Cloud 上の隔離されたコンテナ内で実行され、プロットや可視化といった実行結果がシートに返されます。
そのため、クライアントサイドで Python の環境は必要なくクライアントサイド実行による脆弱性はなさそうです。
matplotlib や seaborn などのライブラリも利用可能なため、Python のリッチな可視化を Excel 上で行うことができます。

Excel 上のデータを Python で加工・可視化できるということで、はデータ分析の効率化に役立ちそうな機能です。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## Google Cloud のマネージド Terraform、 Infrastructure Manager 登場！
https://zenn.dev/cloud_ace/articles/introduce-infra-manager

Google Cloud において、マネージドな Terraform 実行基盤 Infrastructure Manager の一般提供が始まっていました[^next]。
内部的には Cloud Build が使われているようです。

上記記事では、特徴、利用可能リージョン、料金、実行方法などがわかりやすく書かれています。
制約事項や著者が気になったことも載っており、利用前で落とし穴に気づけそうです。

[最近 HashiCorp は製品ライセンスに BUSL を採用することを発表しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816#hashicorp-adopts-business-source-license)。ざっくり言うと、もし競合製品の提供に利用する場合は制限がかかるライセンスです。僕の見解では Infrastructure Manager は Terraform Cloud の競合になりうるので利用に制限がかかりそうなのですが、当事者間で何かしらの取り決めをしているのかもしれません。
実際 HashiCorp のブログ記事で Infrastructure Manager が紹介されているため、権利的にはクリアとなっているのでしょう。安心ですね。

- [HashiCorp at Google Cloud Next: Seamless infrastructure deployment and management](https://www.hashicorp.com/blog/hashicorp-at-google-cloud-next-seamless-infrastructure-deployment-and-management)

僕は今回初めて Infrastructure Manager を知りました。一般提供される前はどんな状態だったのでしょうね。

もちろん Cloud Build を使えば同じことはできましたが、マネージドサービスとなって Cloud Build の知識がそこまで無くても使えるようになったことやワークフローを管理しなくて良くなるのは良いです。
今後 Google Cloud を Terraform 管理する場合の CD パイプラインの選択肢として検討したいですね。~~AWS も作ってくれ~~

:::message
余談ですが、Weekly では [Google Cloud の Config Connector](https://cloud.google.com/config-connector/docs/overview) の話題が出てきました。
Config Connector は Google Cloud リソースを k8s のリソースとして扱って管理できるようにするサービスです。

Terraform に歩み寄ってきたのが意外という意見が出てきました。

さらに余談ですが、Google Cloud CLI には既存のリソースを Terraform ファイルにエクスポートする機能があります。気になる方はこちらもご覧ください。

- [Google Cloud CLI で既存のリソースを Terraform ファイルにエクスポートするのを試す](https://zenn.dev/korosuke613/scraps/f91dedf3890a65)
:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

[^next]: Google Cloud Next '23 のタイミングっぽい。

## Upgrade with an Enterprise Account - The GitHub Blog
https://github.blog/changelog/2023-08-22-upgrade-with-an-enterprise-account/

GitHub Enterprise で　Enterprise Account が順次ロールアウトされるようです。

そもそも Enterprise Account とは何かは[こちらのドキュメント](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-enterprise-accounts)に記載があります。ユースケースや詳細があまり書かれていないため、どのようなアカウント(機能)なのかは分かりませんが、Enterprise 内の組織をまたいで管理できるアカウントということでしょうか。

新たに Enterprise を契約した場合や Free または Teams プランから Enterprise プランにアップグレードした場合、Enterprise Account が利用できるようで、既存の Enterprise プランの契約者は今後順次利用できるようになるようです。

自分の組織では利用できないため検証できませんでした。また、現時点では情報が少ないので今後の展開に期待したいと思います。

参考：
- [An enterprise account is coming to all Enterprise customers - The GitHub Blog](https://github.blog/2022-12-01-an-enterprise-account-is-coming-to-all-enterprise-customers/)
- [Bring your enterprise together with enterprise accounts for all - The GitHub Blog](https://github.blog/2023-04-05-bring-your-enterprise-together-with-enterprise-accounts-for-all/)

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

## Amazon Detective でセキュリティ調査を改善するために視覚化を強化
https://aws.amazon.com/jp/about-aws/whats-new/2023/08/amazon-detective-visualizations-security-investigations/

AWS 上の各種ログを自動で分析、視覚化して、潜在的なセキュリティの問題を指摘してくれるツールとして Amazon Detective があります。
今回は分析結果をグラフでよりわかりやすく表示してくれる機能が追加されました。

AWS での視覚化と言えば、AWS Resource Explorer があります。最近は VPC のリソースマップが記憶に新しいですね。
今回はセキュリティ関係のリソースを可視化してくれるようです。

ブログ内のリンク先を見ると、どのようなグラフを見ることができるかが分かります。
https://docs.aws.amazon.com/detective/latest/userguide/groups-about.html#group-visual-finding-group
IAM ロールなどセキュリティ関係のリソースと、各種 AWS リソースとの繋がりが一目瞭然です。
またそれぞれのリソースの分析結果がグラフ上に表示されるようで、とても分かりやすそうに思います。

:::message
試しにプライベートのアカウントで試そうとしましたが、Amazon GuardDuty の有効化が必須で、かつ GuardDuty を有効化してから 48 時間経たないと Amazon Detective は使えないとのことでした...
GuardDuty を有効化したので、数日後に再度 Amazon Detective の有効化を試してみる予定です。
![](/images/productivity-weekly-20230830/guardduty_requirement.png)
:::

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)*

## Google Cloud Domains、生き残るっぽい。レジストラは Squarespace Domains になるけど。

https://twitter.com/Shitimi_613/status/1696458677614731327

（自分のツイートで恐縮ですが）

これまで何度か Google Domains が Squarespace に売却される話をしてきました[^domains_1][^domains_2]。

[^domains_1]: [Squarespace への Google Domains のドメイン登録の譲渡について - Google Domains ヘルプ](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230628#squarespace-%E3%81%B8%E3%81%AE-google-domains-%E3%81%AE%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E7%99%BB%E9%8C%B2%E3%81%AE%E8%AD%B2%E6%B8%A1%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6---google-domains-%E3%83%98%E3%83%AB%E3%83%97)
[^domains_2]: [Shhh… 🤫 @Cloudflare Registrar just quietly rolled out support for the following TLDs:](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230802#shhh%E2%80%A6-%F0%9F%A4%AB-%40cloudflare-registrar-just-quietly-rolled-out-support-for-the-following-tlds%3A)

Google Domains が終了することで、Google Domains に依存している Google Cloud Domains も終了するとされていました。

しかし、最近ヘルプページの「What does this mean for Cloud Domains customers?」の項目が更新され、Cloud Domains は Google Domains の Squarespace への売却後も継続して提供されることが明記されました。

> Cloud Domains will continue to be available before and after the closing of the transaction. Google will continue to offer customer support and will be responsible for billing your account. Cloud Domains UI, API and gcloud CLI will continue to be supported.
> 
> (DeepL Pro による翻訳) クラウド ドメインは、取引の完了前も完了後も引き続きご利用いただけます。Googleは、引き続きカスタマーサポートを提供し、お客様のアカウントの請求に責任を負います。Cloud DomainsのUI、API、gcloud CLIは引き続きサポートされます。
>
> *現在のヘルプページ: https://support.google.com/domains/answer/13689670?hl=en*

少なくとも 7/2 時点では明言されていませんでした。

> We are anticipating that the migrations of domains and data (registrant, WHOIS info, and in some cases DNS delegation) to Squarespace will take place in 2024. You can continue to use Cloud Domains until your domain is migrated. We will work with Squarespace to make the migration as seamless as possible.
> 
> (DeepL Pro による翻訳) ドメインとデータ（登録者、WHOIS情報、場合によってはDNS委任）のSquarespaceへの移行は2024年に行われる予定です。ドメインが移行されるまで、Cloud Domainsを引き続きご利用いただけます。Squarespaceと協力し、可能な限りシームレスな移行を実現します。
>
> 7/2 時点のヘルプページ: https://web.archive.org/web/20230702090734/https://support.google.com/domains/answer/13689670

ただ、あくまで Cloud Domains はドメイン管理、販売のためのサービスが続くだけで、レジストラは Squarespace になります。
（もともと Cloud Domains で販売していたドメインもレジストラは Google Domains であったため（という認識）、そこが変わるだけとも言えそうです。）

Cloud Domains の利点の 1 つは Google Cloud 利用者にとってドメイン管理を Google Cloud と同じアカウントで行えることでしたが、これは今後も継続されるようです。
Google Cloud の顧客からいろいろフィードバックが来たのかは知りませんが、Google を経由して支払いも可能であるようなので、Cloudflare などの他のサービスに移行したい理由は減ったかもしれません。

:::message
ちなみに僕はすでに Cloudflare へ .dev ドメインを移管しました。Cloud Domains 続くなら移管しなくてよかったんだけどなー...
いまさら戻れと言ってももう遅い（追放系なろう）
:::

:::details 付録: 7/2 時点と 9/3 時点での「What does this mean for Cloud Domains customers?」の差分。

```diff txt:7/2 時点と 9/3 時点での「What does this mean for Cloud Domains customers?」の差分
--- 0702.txt	2023-09-03 17:48:35
+++ 0903.txt	2023-09-03 17:49:08
@@ -1,6 +1,11 @@
 What does this mean for Cloud Domains customers?

-Google Cloud Domains had a strong dependency on Google Domains, so customers using Cloud Domains will be migrated to Squarespace. Google Cloud will issue a product MSA (Mandatory Service Announcement) to all impacted customers with more details about what to expect during the migration period.
+We wanted to assure you that we will continue to provide and support Cloud Domains. Since Google Domains is the underlying domains registrar for Cloud Domains, there are some important changes that will need to be made.

-We are anticipating that the migrations of domains and data (registrant, WHOIS info, and in some cases DNS delegation) to Squarespace will take place in 2024. You can continue to use Cloud Domains until your domain is migrated. We will work with Squarespace to make the migration as seamless as possible.
+Upon closing of the Squarespace-Google Domains transaction, Squarespace Domains will become the registrar for your domains managed by Cloud Domains. Squarespace Domains is an independent domain registrar service provided by Squarespace. Your domain registrations will be migrated to Squarespace Domains after a transition period which we anticipate will be no sooner than January 2024. We will work with Squarespace to make the migration as seamless as possible.

+In connection with this migration, the information associated with your domain registrations including domain configuration, WHOIS data (which includes customer contact info, and DNS delegation) will be migrated to Squarespace Domains. Once migrated, this data will be governed by Squarespace’s Privacy Policy, and the Squarespace Terms of Service will apply to your registrations. No Google Cloud Customer Data is transferred or exchanged with Squarespace.
+
+Cloud Domains will continue to be available before and after the closing of the transaction. Google will continue to offer customer support and will be responsible for billing your account. Cloud Domains UI, API and gcloud CLI will continue to be supported.
+
+On August 15, 2023, Google Cloud sent an MSA to our Cloud Domains customers with details on what to expect during the migration period.
```

:::

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

## Fig has joined AWS!
https://fig.io/blog/post/fig-joins-aws

[結構前に紹介した Fig というターミナルの補完を強化するツール](https://zenn.dev/korosuke613/articles/productivity-weekly-20211124#fig-%7C-%F0%9F%8E%89-launching-fig)が AWS に買収されました。

Fig は macOS 向けのターミナルアプリ上でコマンドを打つ際に自動補完を IDE チックにしてくれるツールです。Team plan や Enterprise plan で収益化を計っていましたが、基本的な機能は無料で使うことができていました。

今回の AWS による買収で、有料の Fig Team 相当機能が現在無料で提供されています（今後も無料かは不明）。

例えばちょっと前に自然言語から Bash のコマンドを生成する [`fig ai`](https://fig.io/user-manual/ai) 機能が有料ユーザ向けにベータリリースされましたが、こちらも無料ユーザでも使えるようになっています。

個人的にはとてもお世話になっているツールで、コマンド補完に関して何度かコントリビューションもしてきました。AWS がバックに付くことで、さらなる機能強化やサービスの安定化が期待できそうです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# know-how 🎓

## AWSコスト削減とリソース管理 | 外道父の匠
https://blog.father.gedow.net/2023/08/24/aws-cost-saving/

昔から AWS のインフラ周りを取り組まれていた方が AWS で節約するためのテクニックを公開してくれています。

コスト削減とは何か、何にコストがかかっているかの整理、主要サービスごとのコスト削減テクニック（Load Balancer、EC2 Autoscaling、EC2 EBS、EC2 AMI、NAT Gateway / Public IPv4 有料化対策、S3、RDS / Aurora、CloudWatch Logs）、クラウドの引越しについてなどが書かれています。

ボリュームが多いですが、大変勉強になります。全部読まずともコストを占める割合の大きいサービスの項目だけ見てみてもいいかもしれません。

個人的に古いインスタンスタイプや EBS タイプを使っている方がコストは高めって話は、そう言えばそうだけどそこまで意識できてませんでした。案外古いタイプが残っている・使っている場合は少なくないと思います。見直したいですね。

ちなみに Weekly では、次の文章に感嘆している方がいました。

> 直近四半期で売上 221.40億ドル AWS凄い！って素直に感じてもいいんですけど、今回はそういう場じゃないんで。おまへら、垂れ流しすぎ！そういう方向でいきましょう。多分、全員が頑張ったら、売上３兆円のうち５千億円くらいは削れるっしょマジで。

常にコスト削減（最適化）を意識していきたいですね。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*


## iOS開発におけるGitHub Actions self-hosted runnerを利用したオンプレ CI/CD のすゝめ | CyberAgent Developers Blog
https://developers.cyberagent.co.jp/blog/archives/43705/

サイバーエージェントでは以前からオートスケール可能なセルフホストランナーを特定のプラットフォームに依存せず構築可能な [myshoes](https://github.com/whywaita/myshoes) という OSS を開発しており、従来はプライベートクラウドと LXD の組み合わせで GitHub Actions のジョブごとに毎回クリーンな環境のランナーを提供されていました。

今回、自社 DC に新たに M2 Mac Mini を追加し、myshoes で管理することで Linux 同様に macOS のセルフホストランナーも提供可能になったようです。さらに macOS でも VM を活用することで毎回クリーンな環境のランナーを提供できるようです。

後半は実際にこの macOS のセルフホストランナーを活用して従来の CI サービスから乗り換えた事例の紹介で、最終的にはビルド時間の平均が従来の約 1/3 に短縮されるという大きな効果があったそうです。

最近では OSS、あるいは内製でオートスケール可能な Linux のセルフホストランナーを提供する事例は増えてきていますが、macOS のセルフホストランナーを同様に提供している事例はほとんど無いので驚きました。自分の知る限りでは他には MIXI も同様の取り組みをされてるぐらいだと思います（[スライド](https://speakerdeck.com/bbqallstars/cd-conference-2023-by-cloudnative-days-qian-ye-ji)、[動画](https://youtu.be/2Y2PpCUu9os?si=k8UH2XF5HDsYCJx_)）。macOS の CI 基盤を独自運用する場合には両社の事例はかなり参考になると思います。


*本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)*

## GitHub Copilot Patterns & Exercises 🤖をリリースしました！🎉
https://twitter.com/yuhattor/status/1692005132362494191

GitHub のカスタマーサクセスアーキテクトの方が、GitHub Copilot のパターン&エクササイズを公開されています。
現在は日本語と英語が対応されており、どのようにすれば、より良い提案をしてもらえるかをエクササイズを通して学ぶことができます。
自分は一通り目を通して、ChatGPT で有効性が示されていたクイックチャット技法が GitHub Copilot でも有効ということや、ショートカットについてを新たに学ぶことができました。

公式の見解ではなくコミュニティドキュメントですが、コミュニティという分ユーザー達の感覚と経験で培われたノウハウが詰まっているので、ぜひ参考にしてみてください。

*本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)*

# tool 🔨

## OrbStack で k8s クラスタを簡単に作れるように
https://twitter.com/OrbStack/status/1696431454434062745

[ちょくちょく Weekly でも紹介している](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230614#orbstack) Docker Desktop の代替ツール OrbStack ですが、0.17.0 から k8s クラスタを簡単に作れるようになったようです。

僕も試しに 0.17.0 にバージョンアップして k8s クラスタを作成してみましたが、特にトラブルなく簡単に作成できました。
GUI 上からは Pod やサービスなど各リソースにアクセスできます（ログを見たりターミナルで接続したり削除したりくらいしかできませんが）。

また、Service を用意せずとも Pod 自体にホストからアクセスできる IP アドレスが自動で割り振られるため、地味に便利です。
デバッグなどで役立ちそうですね。

```
❯ kubectl get pods -o wide
NAME    READY   STATUS    RESTARTS   AGE   IP               NODE       NOMINATED NODE   READINESS GATES
nginx   1/1     Running   0          16s   192.168.194.12   orbstack   <none>           <none>

❯ curl 192.168.194.12
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>

...
```

個人的に Docker Desktop 代替ツールは Rancher Desktop、OrbStack の二大巨塔だと思っています。
Docker Desktop 自体も含めて、これで 3 つのツール全てで k8s クラスタを作成できるようになりましたね。
どんどん競い合ってほしいものです。

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Secret scanning detects secrets in issues for free public repositories - The GitHub Blog](https://github.blog/changelog/2023-08-16-secret-scanning-detects-secrets-in-issues-for-free-public-repositories/)
    - GitHub の Secret scanning において、public リポジトリの issue 内にシークレットが含まれていないかを調べる機能が追加されました
    - これまではリポジトリの git のコミットが対象でした
    - 検出された場合はアラートが飛んできます
  - [Terraform ephemeral workspaces public beta now available](https://www.hashicorp.com/blog/terraform-ephemeral-workspaces-public-beta-now-available)
    - Terraform cloud において ephemeral workspaces 機能がパブリックベータで使えるようになりました
    - ephemeral workspaces 機能は、設定した TTL が過ぎると自動で削除される（destroy される）ワークスペースです
    - 実験用途で環境を作ったり、学習用途で環境を作る場合に消し忘れを防げて良いですね
  - [OpenAI、企業向け「ChatGPT Enterprise」提供開始　高速GPT-4でプライバシーも安全](https://www.itmedia.co.jp/news/articles/2308/29/news095.html)
    - OpenAI が ChatGPT の企業向けサービス ChatGPT Enterprise を提供開始したようです
    - 管理コンソールや SSO のサポート、GPT-4 への無制限アクセスが可能など、企業向けの機能が追加されています
    - GPT-4 への無制限アクセスは個人の人でも欲しくなりますね
    - 価格は Contact sales となっていますが、なかなかいい値段になりそうですね
  - [GPT-3.5 Turbo fine-tuning and API updates](https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates)
    - GPT-3.5 Turbo の fine-tuning が可能になり、ユーザー側でモデルをカスタマイズできるようになりました
      - ちなみに GPT-4 の fine-tuning は今秋対応予定とのこと
    - fine-tuning API に送受信されるデータは OpenAI や他組織のモデルをトレーニングするために使われることはないようです
    - トレーニング自体にお金がかかる上、トレーニング後のモデルの利用による入出力でかかる料金はベースモデルの数倍になります
    - プロンプトを短縮できるようになるのは良いですね。思ったとおりの結果を出すのは簡単にはいかなさそうですが、夢があります
  - [［速報］Google Cloudの開発や問題解決をAIが支援してくれる「Duet AI in Google Cloud」がVSCodeなどで利用可能に。Google Cloud Next '23 － Publickey](https://www.publickey1.jp/blog/23/google_cloudaiduet_ai_in_google_cloudvscodegoogle_cloud_next_23.html)
    - [ユーザーをサポートする AI コラボレーター「Duet AI」を Google Cloud 全体で拡張 | Google Cloud 公式ブログ](https://cloud.google.com/blog/ja/products/ai-machine-learning/duet-ai-in-google-cloud-preview)
    - Google も AI を使った開発支援ツールを提供するようになりました。その名も Duet AI in Google Cloud です（プレビュー）
    - Google Cloud の開発に特化したトレーニングを受けた AI とのことで、Google Cloud に関する開発をする際に役立ちそうです
    - Google Cloud Shell や VSCode、JetBrains IDE などで利用できます
    - 現在はプレビュー段階のため無料で利用できます（プレビュープログラムへの参加が必要）
      - [Duet AI  |  Google Cloud](https://cloud.google.com/duet-ai)
- **know-how 🎓**
  - [ZOZO TECH BLOGを支える技術 #2 執筆をサポートするCI/CD - ZOZO TECH BLOG](https://techblog.zozo.com/entry/techblog-writing-support-by-ci-cd)
    - ZOZO さんによる、はてなブログへの投稿に CI/CD を適用し、textlint による文章構成、プレビュー用環境への自動デプロイ、本番公開を自動化している事例です
    - はてなブログ、僕も昔使っていましたが、API が Atom Publishing Protocol という XML でやり取りするものしかなく、結構めんどかった記憶があります
      - 昔書いたやつ[はてなブログのAPIを叩いて最新記事一覧を取得する[Javascript] - cangoxina](https://korosuke613.hatenablog.com/entry/2019/06/27/223528)
      - ZOZO さんは [x-motemen/blogsync](https://github.com/x-motemen/blogsync) という CLI ツールがあり、それを利用してデプロイなどをしているようですね。こんな便利なものあったのか
    - 僕は Zenn でとても良い執筆体験を得られているため、もはやはてなブログに戻ることはできないです。開発者にとって執筆体験はとても重要です
    - はてなブログでここまで自動化して執筆・レビュー・公開の体験を高められているのはすごいなと思いました
  - [「Datadog入れてみたらAWSの料金が爆発した話」@ゆるSRE勉強会 #1 - Speaker Deck](https://speakerdeck.com/rynsuke/datadogru-retemitaraawsnoliao-jin-gabao-fa-sitahua-at-yurusremian-qiang-hui-number-1)
    - Cloudbase さんによる AWS の料金が爆発した話です
    - Datadog がタイトルに含まれていますが、Datadog 特有の問題ではなく、Datadog Agent を使うと起こりうる問題だったので、しっかり中身を読みましょう
    - Weekly ではやっぱりどこも NAT ゲートウェイに悩まされるのだなぁ、という話になりました
- **tool 🔨**
  - [dnakov/little-rat: 🐀 Small chrome extension to monitor (and optionally block) other extensions' network calls](https://github.com/dnakov/little-rat)
    - Chrome 拡張の通信をモニタリングできる Chrome 拡張 dnaov/little-rat です
    - Chrome 拡張が怪しいことをしていないかをちゃんと確かめるの大変ですよね。求める権限である程度は弾けますが
    - little-rat を使うことで各拡張がどのような通信をしているかを確認できます。さらに拡張機能ごとに通信をブロックできます
    - いかんせん little-rat 自体に強い権限が必要となるため、Chrome Web Store にあるものは機能が制限されています
    - そもそも強い権限を渡さざるを得ないため、Chrome Web Store にあるものを使用するのはあまりおすすめできません。自分でソースコードを確認した上で、Zip からインストールするのを個人的にはお勧めします

*本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)*

# あとがき
遅くなりましたが今週号と先週号の合併号でした。今週は僕も含めて 4 名の共同執筆者がいます。すごいですね。

僕たち生産性向上チームは今年もインターン受け入れを行なっているため、8/28 〜 9/1 までインターン受け入れでてんやわんやしていました。正直この時期の社員はバチクソ疲れるため、Weekly は合併号になって公開が遅れました。
ちなみに 9/11 〜 9/15 もインターン受け入れでてんやわんやしているため、次号も合併号になります。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## GitHub Actions Meetup Tokyo #2 - connpass
https://gaugt.connpass.com/event/292175/

GitHub Actions に関することをワイワイ話す会、GitHub Actions Meetup Tokyo #2 が 2023/09/21 に開催されます。
場所はサイボウズ株式会社の東京オフィスです。オンライン視聴もあります。

なんか公開されて早いうちにオフライン枠は埋まってしまったのですが、オンライン視聴枠は 300 なので、まだまだ間に合います（オンライン視聴枠は先着順）。
~~なんかオンライン視聴枠は毎回増えてますね。~~

なんと 4,5 年ぶりの開催です。楽しみですね。
気になる方はぜひ参加してみてください！
