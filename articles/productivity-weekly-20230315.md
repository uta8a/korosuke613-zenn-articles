---
title: "Productivity Weekly (2023-03-15号) 簡易版"
emoji: "🍧"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230315"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-03-15 号です。

:::message
2023-03-22 号については、社内ハッカソンの影響で 3/22 に会がなかったため、お休みです。
あと、投稿が大変遅くなってしまいすみません。色々と忙しかったです。
:::

今回が第 109 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Actions - Required workflows improvements | GitHub Changelog
https://github.blog/changelog/2023-03-10-github-actions-required-workflows-improvements/

先日、GitHub Actions において、Organization 横断で指定リポジトリに必須ワークフローを設定できる機能 [required workflows](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230111?redirected=1#github-actions-%E2%80%93-support-for-organization-wide-required-workflows-public-beta) が追加されましたが、今回さらに次の機能が増えました。

- required workflows で制限されたブランチに対しての direct push（プルリクを作らないでブランチを更新）をブロックするようになった
  - direct push されると required workflows を回避できてしまうという問題を解決
- 任意のブランチ、タグ、またはコミット SHA で対象ワークフローを指定できるようになった
  - これまではデフォルトブランチの状態でしか設定できなかったため、安易にワークフローに手を加えられなかった

どちらの機能も個人的には必須だと思うので、追加されて嬉しい限りです。

## Comment on files in a pull request (public beta) | GitHub Changelog
https://github.blog/changelog/2023-03-14-comment-on-files-in-a-pull-request-public-beta/

GitHub のプルリクエストにおいて、ファイル単位でコメントができるようになりました(public beta)。

削除されたファイルや、バイナリ、move されたファイルなどに対するコメントができるようになり、レビューの表現力を上げやすくなりました。
これまではプルリクエストに対してコメントするなどで表現する必要があったのでとても便利ですね。

## Organization Audit Logs include IP addresses – Public Beta | GitHub Changelog
https://github.blog/changelog/2023-03-14-organization-audit-logs-include-ip-addresses-public-beta/

GitHub において、Organization の Audit Logs に IP アドレスを含める設定ができるようになりました。有効にすると、Organization メンバーが public リポジトリ以外の Organization の資産に対して実行したすべての監査ログイベントで IP アドレスが表示されるようになります。

なお、Enterprise ですでに有効済みの場合は、強制的に Organization でも有効になります。
設定画面に書かれています。

> Enabling will allow you to view IP addresses of current members for organization audit log events. As this feature makes your users' IP addresses automatically available, you should review this change with your legal team to determine whether any user notification is required. When enabled at the enterprise level it will be automatically enabled for all organizations owned by the enterprise, the reverse is not true.

IP アドレスの取り扱いには注意しなければなりませんが、IP アドレスが紐づくことでフォレンジックやサイバー攻撃、不正アクセスなどに関する調査に役立ちます。
法務などと相談の上で有効化を検討しましょう。

## Terraform 1.4 improves the CLI experience for Terraform Cloud
https://www.hashicorp.com/blog/terraform-1-4-improves-the-cli-experience-for-terraform-cloud

Terraform v1.4 が出ました。

主な変更は次です。
- Terraform Cloud
  - CLI からの Terraform 実行結果を構造化された出力に（構造化された出力は CLI に非対応だったらしい）
  - OPA ポリシーの結果を CLI で表示可能に
- Terraform
  - `null_resource` に代わる組み込みリソース `terraform_data` が登場

[`null_resource`](https://registry.terraform.io/providers/hashicorp/null/latest/docs/resources/resource) は何も作成しないリソースなのですが、`triggers`、`provisioner` などを組み合わせて、任意のタイミングで任意のコマンドを実行するのに使われてたりしました[^null]。便利なリソースですが、[null プロバイダ](https://registry.terraform.io/providers/hashicorp/null/latest)を利用する必要があり、ちょっと面倒でした。

今回新たに組み込みリソースとして [`terraform_data`](https://developer.hashicorp.com/terraform/language/resources/terraform-data) が登場し、`null_resource` と同じことができるようになりました。追加プロバイダも必要ありません。また、`null_resource` ではできなかったこともできるようになっています。

`terraform_data` のわかりやすい使い方記事早くも書かれていました。参考になります。

- [Terraform 1.4 で導入された terraform_data リソースの使い方](https://zenn.dev/kou_pg_0131/articles/tf-1_4-terraform-data)

また、大きくアナウンスされていませんが、`TF_PLUGIN_CACHE_DIR` と `.terraform.lock.hcl` を組み合わせた際の挙動が変わっています。その部分については minamijoyo 氏による次の記事が参考になります。CI 等でプロバイダをキャッシュしてる際は注意が必要です。

- [Terraform v1.4でのTF_PLUGIN_CACHE_DIRと.terraform.lock.hclの挙動変更 - Qiita](https://qiita.com/minamijoyo/items/a3fef269fecbf7f54c2f)

`null_resource` にしてるところは `terraform_data` に置き換えていきたいですね。

[^null]: 参考: [terraformのnull_resourceが便利だよ！という話 - Qiita](https://qiita.com/eigo_s/items/0dd6ffc84e1732eff703)

# know-how 🎓

## 「GitHub Actions × AWS」のトレーサビリティ向上委員会
https://zenn.dev/tmknom/articles/traceable-github-actions-with-aws

GitHub Actions から OIDC を使って AWS リソースを操作する際、AWS Cloudtrail[^cloudtrail]と GitHub Actions のログの双方にお互いの情報を載せてトレーサビリティを上げよう、という記事です。

そのままだと Actions のログから Cloudtrail のログには飛べませんし、その逆も然りです。そのためトラブルシューティング時にもう片方のログが見たくてもがんばって探さないといけなくて大変だったりします。また、CloudTrail の謎のログを見つけた時に、これはどこでどうなって発火したんだろうとなっちゃいます。

この記事では、次のアプローチでトレーサビリティを確保しています。
- AWS の認証時にリポジトリやワークフロー情報をセッション名として渡すことで CloudTrail のログ(ユーザ名)からワークフローを特定できるようにする
- Actions のステップサマリーにセッション名を含めた CloudTrail の URL を出力し、Actions から該当の CloudTrail ログに飛べるようにする

これらの具体的な方法も載せてくれており、すぐに同じことができるようになっています。
記事では他にも、トレーサビリティの説明や GitHub Actions のログ保存期間の仕様についても書かれています。

とても良いアプローチだと思いました。特に `role-session-name` の存在は知りませんでした。こういう方法で実現できるんですね。大変参考になりました。
この件に限らずトレーサビリティを上げていきたいですね。

[^cloudtrail]: AWS における audit log のこと。

# tool 🔨

## 高パフォーマンスのオープンソースファイルクライアント、Mountpoint for Amazon S3 のご紹介
https://aws.amazon.com/jp/about-aws/whats-new/2023/03/mountpoint-amazon-s3/

Linux に Amazon S3 をマウントするためのオープンソースクライアント Mountpoint for Amazon S3 のアルファ版がリリースされました。
ちょくちょく S3 をローカルのファイルシステムにマウントしたいという要望は見てきましたが、AWS 公式でクライアントを作ってくれているのは嬉しいですね。

- 詳細ブログ: [The inside story on Mountpoint for Amazon S3, a high-performance open source file client | AWS Storage Blog](https://aws.amazon.com/jp/blogs/storage/the-inside-story-on-mountpoint-for-amazon-s3-a-high-performance-open-source-file-client/)
- GitHub: [awslabs/mountpoint-s3: A simple, high-throughput file client for mounting an Amazon S3 bucket as a local file system.](https://github.com/awslabs/mountpoint-s3)

まだアルファリリースの段階なので、できないことは多いです。

> - Mountpoint for Amazon S3 is currently read-only, so you won't be able to write objects back to S3 through the file system. We're working on allowing sequential writes to new objects in a future release.
> https://github.com/awslabs/mountpoint-s3/blob/2f07b5ec976aad219e2d1445909eca3cf0b4976a/README.md#current-status

上の例だとまだマウントは読み取り専用となっており、書き込みはできません。

とにかく公式で作ってくれているのがとても嬉しいですね。開発が進むのを応援しましょう。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GPT-4](https://openai.com/research/gpt-4)
    - マルチモーダルモデルかつ GPT-3.5 よりも性能が向上
      - 3.5 でもすごいのに
    - API もリリースと同時に公開されている(waiting list に登録が必要)
    - GPT-4 のすごさはこの記事がわかりやすそう
      - [GPT-4のすごさとその影響範囲について - Qiita](https://qiita.com/sakasegawa/items/4c6b9c3f703e89ec1c4d)
  - [Google Developers Japan: PaLM API & MakerSuite：ジェネレーティブ AI アプリケーションのスムーズなプロトタイピングと構築を可能にする開発ツール](https://developers-jp.googleblog.com/2023/03/announcing-palm-api-and-makersuite.html)
    - Google も Microsoft に負けじと LLM を発表。PaLM API というらしい
    - Maker Suite はデータセットの拡張やチューニングをするためのツールとのこと
    - AI 競争が加熱していく
  - [AWS Application Composer Now Generally Available – Visually Build Serverless Applications Quickly | AWS News Blog](https://aws.amazon.com/jp/blogs/aws/aws-application-composer-now-generally-available-visually-build-serverless-applications-quickly/)
    - ドラッグアンドドロップで AWS のサーバレスサービスを構築できるサービスが正式リリース
    - サーバレスサービスのプロトタイプを作るときなんかに便利そう
- **know-how 🎓**
  - [OCI Referrers APIを試す](https://knqyf263.hatenablog.com/entry/2023/03/14/192051)
    - みんな大好き OCI の新しい API こと OCI Referrers API の解説
    - まだどのレジストリも対応してないとのこと
    - SBOM のデータや、イメージへの署名をコンテナイメージと紐付く形でどう扱うとかそのあたりを仕様に組み込もうとしているとのこと
      - というか一旦マージされたけどまた変わりそうらしい
    - この記事では背景の説明、仕組みの説明、ローカルのレジストリを立てて検証、などが載っています

# あとがき
投稿が大変遅くなってしまいすみません。色々と忙しかったです。すぐに予定作っちゃうから良くない（戒め）。

2023-03-22 号については、社内ハッカソンの影響で 3/22 に会がなかったため、お休みです（ハッカソンの話はこのあとあるよ）。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: 社内ハッカソン 2023 で爪痕賞ゲット！

https://www.docswell.com/s/korosuke613/Z1JJ73-2023-03-27-hackathon-2023-kiba

今週のおまけです。

03/22〜03/24、社内ハッカソンがありました。
テーマは Innovation ということで、これは最近流行りの AI を使っていくしかねーだろとなりました。

なので僕は ChatGPT (OpenAI API) を使って大規模リポジトリの解説をしてくれる chat bot を作りました。
結果はちょっと大規模リポジトリは現状厳しいなという感じでしたが...（embedding なんかで工夫すれば少しはいけると思うけど）

厳し〜となったのでハッカソン後半はもう 1 人の僕を作ってました。

発表はバカウケでなんと爪痕賞という賞をもらえました。イェーイ。
