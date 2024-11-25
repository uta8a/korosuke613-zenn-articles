---
title: EnterpriseレベルGitHub Appが作れるようになったぞ！｜Productivity Weekly(2024-10-23,16)
emoji: 🛋️
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241023
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
published_at: 2024-11-18 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-10-23, 2024-10-16 合併号です。

今回が第 166 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## Enterprises can create GitHub Apps for use within the Enterprise - GitHub Changelog
https://github.blog/changelog/2024-10-22-enterprises-can-create-github-apps-for-use-within-the-enterprise/

GitHub Apps を Enterprise レベルで利用できるようになりました（public beta）。これまで GitHub Apps は全世界 or Organization or 個人単位でしか作ることができなかったため、複数 Organization で同じ GitHub Apps を利用したい場合は、org ごとに内容の同じ app を作成・管理する必要がありました。

今回の変更により、org ごとに同じ app を作らなくてよくなるほか、app を全世界公開にしてしまうリスクを減らせるようになります。
org ごとに app を作らなくて良くなるのは手間を減らせる上、app 作成に org の Admin 権限を必要としない（enterprise の権限を持っていても org に app を作るには org の Admin 権限が必要となる）のが特に嬉しいです。

前々から要望はありましたが、なかなか実現されなかった機能の 1 つでした。本文には「This also simplifies distribution and management for Copilot Extensions.」と書かれているので、最近登場した GitHub Copilot Extensions がこの機能の追加を後押ししたのかもしれません。

自分はまだ使えてないのですが、早めに検証したいです。作成時の画面までは触ってみたのですが、`admin:enterprise` 系の権限の付与はまだできなさそうでした[^admin_en]。個人的には `admin:enterprise` 系の権限を個人のトークンに紐づけたくないので、Enterprise レベルの GitHub Apps に権限が付与できるようになるといいなという感じです。

[^admin_en]: 例えば Enterprise 全体の billing の取得などに使える権限。https://docs.github.com/en/enterprise-cloud@latest/rest/enterprise-admin/billing?apiVersion=2022-11-28

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## New PAT rotation policies preview and optional expiration for fine-grained PATs - GitHub Changelog
https://github.blog/changelog/2024-10-18-new-pat-rotation-policies-preview-and-optional-expiration-for-fine-grained-pats/

GitHub において、enterprise や organization 管理者が Personal Access Token の有効期限ポリシーを制限できるようになりました。また、Fine-grained PAT（俗にいうきめ細かい PAT）の有効期限を無制限にできるようになりました。

有効期限ポリシーを設定することで、組織内で利用されるトークンのローテーション期間を強制でき、セキュリティ・ガバナンス強化につなげることができます。
この設定は、上位組織のポリシー範囲内で自由に設定できるため、例えば enterprise で Fine-grained PAT の最大有効期限を 366 日にしている場合、organization では 367 日以上の最大有効期限を設定できません。

また、今回の変更に合わせて、Fine-grained PAT の有効期限を無制限にできるようになりました。これまでは 366 日より多い有効期限を設定できなかったため、Classic PAT からの移行が厳しい状況がありました。今回の変更で、Classic PAT から Fine-grained PAT への移行がスムーズになることが期待されます。なお、Fine-grained PAT の有効期限ポリシーのデフォルトは 366 日となっており、まずはこれを変更しないと無制限に設定できません。

![](/images/productivity-weekly-20241023/pat_expire_setting.png)
*試しに私が所属する Organization で Fine-grained PAT の有効期限ポリシーを無制限にしようとしたところ、上位組織である Enterprise のポリシーが 366 日で設定されているためこれができないことが表示されました*

Fine-grained PAT は Classic PAT と比べてセキュリティが強化されていますが、やはり有効期限の差からすぐの移行が難しいという問題がありました。今回の変更により、まずは無制限にした上で Fine-grained PAT に切り替え、ゆくゆくは有効期限を設定していくという段階的なセキュリティ強化が可能になります。良いですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## New Terminology for GitHub Previews - GitHub Changelog
https://github.blog/changelog/2024-10-18-new-terminology-for-github-previews/

GitHub において、「Beta」や「Preview」、「Sunset」といった機能の状態を示す用語が統一されました。

例えば、これまでは制限された新機能について「Private Beta」と表現したり、「Limited Public Beta」と表現したり、「Technical Preview」と表現したり、さまざまな表現があった上、何が違うのかユーザー目線だとわからないことが多々ありました（私はよく何が違うねんと困惑してました）。今回、用語が統一されただけでなく、それぞれの用語についての意味が明確になりました。

今後は次の 6 ステージで機能の状態を示すことになります。

| 用語 | 意味 |
| --- | --- |
|Private Preview|非公開。限られた顧客のみ利用可能|
|Technical Preview|GitHub Next の実験的機能。限られた顧客のみ利用可能|
|Public Preview|Changelog で公開される。Docs に書かれる。対象者は誰でも使える場合もあれば、waiting list による限られた顧客のみ利用可能な場合もある|
|General Availability|Changelog で公開される。Docs に書かれる。対象者は誰でも使える|
|Closing Down|段階的に廃止されていく|
|Retired|提供、サポート、保守が終了|

大変わかりやすくなりましたね！**GitHub の Changelog を追っかけている身としては大変助かります！！**

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## AWS Lambda now detects and stops recursive loops between Lambda and Amazon S3 - AWS 
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-lambda-detects-stops-recursive-loops-lambda-s3/

AWS Lambda で Amazon S3 をイベントソースとして設定していて、再帰ループが発生した場合には自動で停止するようになりました。

例えば、S3 に画像が保存されると Lambda で画像処理して S3 に保存し直すソリューションを考えてみます。
イベントの設定方法によっては、S3 に保存し直したタイミングでまた Lambda が発火してしまい、再帰ループが発生することが容易に考えられます。

今回の変更により、AWS はデフォルトでこの再帰ループを検出し、停止するようになりました。
迂闊な設定をしてしまっても、少なくともクラウド破産は逃れることができそうです。

なお、この再帰ループ検出・停止を止める方法もドキュメントに書かれていますが、余程のケースでない限りはデフォルトの停止で良いかと思います。
https://docs.aws.amazon.com/lambda/latest/dg/invocation-recursion.html

最近 AWS Lambda はこのような再帰ループの検出・停止に力を入れてくれていて、開発者としては安全側に倒してくれてありがたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## ウェブアプリケーション用 Storage Browser for Amazon S3 の発表 (アルファリリース) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/storage-browser-amazon-s3-alpha-release/

Amplify UI で構築できる S3 のストレージブラウザが開発されているようです。

次の GitHub の Issue 上で積極的に意見交換が行われている段階のようで、まだすぐ使えるコンポーネントになっているわけではないようです。
https://github.com/aws-amplify/amplify-ui/issues/5731

S3 内のオブジェクトを横断して操作するような社内用のアプリケーションなどを、AWS 公式のコンポーネントを使ってサクッと作れるようになるのは嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWS Lambda console now features a new code editor based on Code-OSS (VS Code - Open Source) - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-lambda-code-editor-based-code-oss/

AWS マネジメントコンソールでの AWS Lambda のエディタが、Code-OSS（VSCode の OSS 版）に置き換わるようです。
現在（2024-11-08）AWS マネジメントコンソールで Lambda の編集を試みると、Code-OSS に変わっていることが確認できます。

以前までのエディタは、ベースに Cloud9 を使用していました。
現在 AWS Cloud9 は新しいユーザーにはサービスを停止しており、縮小の傾向にあります。
https://x.com/jeffbarr/status/1818461689920344321
https://aws.amazon.com/jp/blogs/devops/how-to-migrate-from-aws-cloud9-to-aws-ide-toolkits-or-aws-cloudshell/

その一環として、Lambda のエディタも別のものに変更する必要があったものと推察します。

以前のエディタを使用したい場合は「Switch to the old editor」をクリックすることで Cloud9 のものを使用できますが、いずれ Code-OSS のみとなることが予想されます。
マネジメントコンソールでコード編集している方は、今のうちに Code-OSS に慣れると良いかもしれません。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWS、コンソールの操作をコードに変換してくれる「AWS Console-to-Code」正式リリース － Publickey
https://www.publickey1.jp/blog/24/awsaws_console-to-code.html

AWS マネージドコンソールで操作した内容を、生成系 AI を使用してコードとして出力してくれるサービスがリリースされました。

出力されるコードの形式は AWS CDK か、CloudFormation です。Terraform は無いので、今後に期待しています。
また使用できる AWS のサービスは Amazon EC2、Amazon VPC、Amazon RDS のみです。これもおそらく今後増えることでしょう。

料金体系としては無料枠が存在し、その上限に到達以降は Amazon Q Developer Pro の契約が必要とのことです。
無料枠についての具体的な数値について、筆者は見つけられませんでした...
https://aws.amazon.com/q/developer/pricing/

IaC 初学者の人にとって非常に役立ちそうなサービスだと感じました。
これを機に IaC を始める人が増えてくれると嬉しいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Terraform v1.10 からは S3 Backend の State Lock に DynamoDB が必要なくなる
https://zenn.dev/terraform_jp/articles/terraform-s3-state-lock

[8 月に Amazon S3 が条件付き書き込みのサポートを開始しました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240828#read-more-%F0%9F%8D%98)が、どうやら Terraform v1.10 から S3 バックエンドの tfstate において、条件付き書き込み機能を利用した排他制御ができるようになり、DynamoDB が必要なくなるようです。

これまでは S3 バックエンドを利用する場合、S3 が複数のクライアントから同時に書き込みを受け付けることができてしまう理由より、tfstate ファイルの排他制御を DynamoDB で行っていました。v1.10 に入る予定のプルリクエストにより、今後は tfstate の排他制御を S3 単体で行えるようになる見込みです。

この記事では、実際に正式リリース前の Terraform を使って S3 単体での tfstate のロックがどのように行われるかを紹介してくれています。ありがたいです。

どういった動きになるかが気になる方は、ぜひ記事を読んでみてください。v1.10 リリースが楽しみですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## 「Self-hosted GitHub Actions runners in AWS CodeBuild」を使ったバッチ実行基盤 - エス・エム・エス エンジニア テックブログ
https://tech.bm-sms.co.jp/entry/batch-platform-with-self-hosted-runner-in-codebuild

こ[れまでたびたび紹介してきた GitHub Actions の Self-hosted runner in AWS CodeBuild](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240828#aws-codebuild-now-supports-using-github-apps-to-access-source-repositories---aws) ですが、エス・エム・エスさんがこの機能を使ってバッチ実行基盤を構築した事例を紹介されています。

GitHub Actions をバッチ実行基盤として使う時のメリデメ、ネットワークの壁を越えるための方法、Self-hosted runner in CodeBuild の説明、その他セキュリティ、証跡に関する Tips などが書かれています。

Self-hosted runner in CodeBuild はまだ登場から浅く、実際の業務利用事例を全く見ていなかったので、事例を知れて嬉しかったです。Self-hosted runner の新たな選択肢の 1 つとしてもっと盛り上がってほしいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## ゼロダウンタイムで Amazon EC2 で稼働している nginx を AWS Fargate に移行した - 弁護士ドットコム株式会社 Creators’ blog
https://creators.bengo4.com/entry/2024/10/22/073000

Amazon EC2 で稼働しているウェブアプリケーションを、AWS Fargate にダウンタイムゼロで移行した事例が紹介されています。

Route53 のルーティングポリシーで加重に変更し、徐々に Fargate の方にトラフィック量を増やしていきます。
すべてのトラフィックを Fargate に変更してから EC2 インスタンスを削除することで、慎重な移行が実現されています。

Route53 の加重ルーティングは他にもいろんなサービスの移行で使用できそうなので、参考になりました。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## 「攻めた」AWS Fargate Spot比率の見直し時
https://developer.hatenastaff.com/entry/2024/10/11/163931

オンデマンドインスタンスとスポットインスタンスの比率についてのお話です。

オンデマンドインスタンスを使用することでコストは高くなりますが、中断のリスクが無いため可用性を担保できます。
スポットインスタンスを使用することでコストは低くなります、中断のリスクがあり可用性が下がります。
この 2 つのインスタンスタイプの比率を上手く調整できれば、可用性とコストの天秤を釣り合わせることができます。

記事によれば、中断のリスクが低いと判断してスポットインスタンスの比率を上げて「攻めた」比率にしていたそうです。
しかし直近数ヶ月で東京リージョンでのスポットインスタンスの中断が増えており、コンピューティング能力が低下する事態が発生したとのことです。

キャパシティ低下による中断をモニタリングして、適宜調整する必要があるという学びを得ることができました。
ちなみに筆者はプライベートで ECS クラスタを運用しており、ap-northeast-1 の amd64 のスポットインスタンスを利用しているのですが、確かにここ数ヶ月で中断が増えた気がします。
プライベートではこの中断をきちんとモニタリングしていないので、モニタリングしようと決意を新たにしました。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWSのARNに日本語文字や絵文字が入ることがあるのを知っていましたか？ - Diary of a Perpetual Student 
https://blog.arthur1.dev/entry/2024/10/16/110000

AWS のサービスによっては ARN に非 ASCII 文字を設定できるものがあるようです。
記事では AWS Step Functions のステートマシン名で指定できることが記載されています。

筆者が他に無いか調べてみると、S3 のオブジェクト名には UTF-8 の文字を使用可能であることを見つけました。
https://docs.aws.amazon.com/en_us/amazonq/latest/qdeveloper-ug/console-to-code.html
しかしドキュメントにも書かれている通り、非 ASCII 文字の使用は不具合の元になるため、避けるべきでしょう。

筆者は ARN に非 ASCII 文字を設定できるサービスがあるということを今回初めて知りました。
ARN は API などでよく使うので、設定可能な文字は特に制限されているイメージがありました。
非 ASCII 文字を使用した ARN について（おそらく）実用性は無く、記事で指摘されているようにむしろ他のサービスとの連携に問題が発生するので、ARN に影響する場合は ASCII 文字のみ使用するように気をつけた方が良さそうです。

ただ絵文字の入った ARN を思うと面白いですね🐟🐡🐠

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Announcing Deno 2](https://deno.com/blog/v2.0)
    - Deno 2.0 がリリースされました
    - さまざまな新機能・破壊的変更が含まれています
      - 参考: [Deno v2 が来たので何が変わったのか紹介](https://zenn.dev/ame_x/articles/d1742e77fa1351)
    - また、[LTS の仕組み](https://docs.deno.com/runtime/fundamentals/stability_and_releases/)が導入されます。最初の LTS は 2024/11 リリース予定の v2.1 のようです
  - [AWS CDK で cdk rollback コマンドが利用可能になりました | DevelopersIO](https://dev.classmethod.jp/articles/aws-cdk-rollback/)
    - AWS CDK において、自動ロールバックを停止していた際に手動で再開できるコマンド `cdk rollback` が追加されました
    - ロールバックタイミングを調整できるので、便利そうです
  - [Terraform Stacks, explained](https://www.hashicorp.com/blog/terraform-stacks-explained)
    - Terraform Stacks が登場しました。現時点では HCP Terraform 向けの機能のようです
    - 概念としては Terraform Workspace を束ねたものという感じのようです
    - わかりやすい解説ブログが登場しています
      - [Terraform Stacks の機能と使い方を紹介 - APC 技術ブログ](https://techblog.ap-com.co.jp/entry/2024/10/21/190000)
      - [Terraform Stacksの構成要素を図解してみる | DevelopersIO](https://dev.classmethod.jp/articles/terraform-stacks-illustration/)
- **know-how 🎓**
  - [tfaction でトランスパイルした JS をコミットするのを止めた](https://zenn.dev/shunsuke_suzuki/articles/tfaction-stop-transpile-local)
    - GitHub Actions のカスタムアクションである JavaScript Action（TS 製）のトランスパイルに関する話です
    - JS Action は TypeScript をそのまま利用できないため、JS のコードにトランスパイルする必要があります（＆依存関係も含める）
    - 筆者は毎回トランスパイルしたものをコミットしてマージする運用をやっていましたが、さまざまな課題があったため、リリース時に CI でトランスパイルする運用にしたようです
    - 個人的にもこの方法が良いと思います
  - [zsh + fzf で「あの時作業していたあのブランチ」を快適に探す](https://www.mizdra.net/entry/2024/10/19/172323)
    - fzf を使って git ブランチをいい感じに探す方法を紹介している記事です
    - committer date 順に並び替えてたり、ミニウィンドウでコミットログが見られたりと、便利そうです
    - 最後に実は公式プラグインがあることが判明しており、自分たちはそれを使うのが楽そうです
  - [terraform の細かすぎて伝わらない小ネタ GHAR Ubuntu 24.04 には Terraform が入ってない](https://zenn.dev/terraform_jp/articles/2024-10-14_terraform_not_installed_github_runner)
    - GitHub Actions の GitHub-hosted runner の Ubuntu 24.04 より Terraform がプリインストールされないようになったようです
    - そもそもプリインストールされていることを知りませんでした。必ず setup-terraform を使ってバージョン指定して terraform を使っていたので
- **tool 🔨**
  - [不要なGitHub Actionsのキャッシュを削除するdelete-action-cacheを作った | toshimaru/blog](https://blog.toshimaru.net/delete-action-cache/)
    - GitHub Actions の不要なキャッシュを削除するアクションを作ったという記事です
    - トピックブランチ上のキャッシュはマージ後も残ってしまいますが、それらを自動で消してくれるようです
    - 10GB 制限を超える場合は積極的に使っていきたいですね（そもそもトピックブランチではキャッシュを保存しないという選択肢も検討しよう）
  - [Stengo/DeskPad: A virtual monitor for screen sharing](https://github.com/Stengo/DeskPad)
    - macOS 向けの仮想ディスプレイを作成するツールです
    - スクリーンシェア時に、物理スクリーンの解像度が高すぎると相手に見づらいことがあったり、シェアするウィンドウを制限してシェアしやすくするのに利用できそうです

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
今週号でした。遅れてしまいマジですみません。最近はマネージャの仕事が忙しかったりその他諸々忙しかったりでウィークリーを書く時間が全く取れてません😭

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information


## Sansan VS サイボウズ - 品質向上 Tips 冬祭り - connpass
そういえば、またもや Sansan さんとサイボウズでバトルします（？）。今回は「品質向上 Tips 冬祭り」というテーマで LT 回＆座談会をやります。場所は Sansan さんのオフィスです。興味がある方はぜひご参加ください！

Sansan VS サイボウズ - 品質向上 Tips 冬祭り - connpass
https://sansan.connpass.com/event/335070/

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
