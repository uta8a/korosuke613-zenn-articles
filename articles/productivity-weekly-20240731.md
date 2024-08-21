---
title: Copilot EnterpriseをOrg単位で割り当て可能になった話など｜Productivity Weekly(2024-07-31)
emoji: 🍦
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240731
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-08-22 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-07-31 単独号です。

今回が第 161 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Copilot Enterprise Mixed Licensing beta - The GitHub Blog
https://github.blog/changelog/2024-07-26-copilot-enterprise-mixed-licensing-beta/

GitHub Copilot Enterprise のライセンスを Organization 単位で割り当てられる機能が Beta としてリリースされました。これまでは Enterprise 単位でしかライセンス管理ができなかったので管理の柔軟性が増し、検証しやすくなりそうです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

:::message
@korosuke613 より（自分もちょっとコメントしたくなったのでおまけとして書かせてもらいます）

Organization 単位で割り当てられるということは、GitHub Enterprise 単位よりも狭い範囲で Copilot Enterprise が使えるようになるということです。いやそのまんまやんけという感じですが、これはコスト面でのメリットがとても大きいです。

Copilot Enterprise は Copilot Business と比べて 2 倍近く高いユーザー課金となっています。少人数の開発者で回っている組織の場合は全員に Copilot Enterprise ライセンスを付与しても増加コストを許容できるかもしれませんが、大規模な開発組織がある組織では Copilot Enterprise 導入のコスト面でのインパクトは凄まじいです。おそらくコスト対効果の観点から魅力的だけど導入を断念したという組織は少なくないのではないでしょうか？
Copilot Enterprise は使いたいけど全員にライセンスを付与するのは難しいという組織にとって、この機能はとてもありがたいですね。
:::

## Copilot text completion for pull request descriptions beta - The GitHub Blog
https://github.blog/changelog/2024-07-24-copilot-text-completion-for-pull-request-descriptions-beta/

GitHub Copilot Enterprise で Pull Request のテキストにおいて Copilot の補完機能が利用できるようになりました。リリースノートの Gif にあるように、Copilot のタブ補完のようなものだと思われます。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## Run workflows set as workflow_dispatch manually - The GitHub Blog
https://github.blog/changelog/2024-07-30-run-workflows-set-as-workflow_dispatch-manually/

GitHub Mobile において、GitHub Actions の `workflow_dispatch` を実行できるようになりました。これまで、Mobile ではジョブやワークフローを再実行できても、`workflow_dispatch` は実行できなかったので、これによりいつでもどこでもワークフローを手動で実行できるようになりました。

僕は GitHub Mobile で CI の状況を見たり、失敗したジョブを再実行したりすることがたまにあり、以前何かで `workflow_dispatch` も使いたいことがあったので嬉しい機能追加ですね。

_本稿の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Ask sophisticated questions about diverse GitHub primitives on GitHub Mobile - The GitHub Blog
https://github.blog/changelog/2024-07-30-ask-sophisticated-questions-about-diverse-github-primitives-on-github-mobile/

GitHub Mobile 上の GitHub Copilot Chat のコンテキスト認識が強化され、表示している特定のファイルやリポジトリについての質問ができるようになりました。
また、Copilot Enterprise ライセンスを持っている場合、Issue や Pull Request、Discussions に対しても質問ができるようになりました。

Mobile 上でチャットが使えるようになった頃に触りましたが、汎用的な技術質問あるいは有名リポジトリに関する質問しかできなかったので、これでだいぶ使い勝手が向上するなと思いました。

https://x.com/Shitimi_613/status/1793884909561688147

特に Enterprise 向けの Pull Request に対する質問ができるようになったのは出先でコードレビューがしやすくなって良いなという感じです[^desaki]。
覚えておきたいですね。

[^desaki]: 出先でコードレビューすることがどれだけあるかという感じだけど。

_本稿の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Actions Usage Metrics is generally available - The GitHub Blog
https://github.blog/changelog/2024-07-25-actions-usage-metrics-is-generally-available/

GitHub において、[今年4月にベータとして登場した Actions Usage Metrics](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240403#actions-usage-metrics-public-beta---the-github-blog) が GA になりました。
Actions Usage Metrics は GitHub Actions のワークフローやジョブが Organization 内のどこでどれだけ実行されているかを知れるダッシュボードです。

なお、この機能は GitHub Enterprise Cloud ユーザにのみ利用可能です。

GA するにあたってベータとの変更点はお知らせに載っておらず、機能は変わっていないと思われます。気になる人は上記リンクからどんな機能か見てみてください。
嬉しい機能なので GA になって安心しました。今後も機能拡張を期待したいですね。

_本稿の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## 2024年7月27日時点におけるAWS CodeCommitとAmazon CloudSearchの新規利用に関して
https://dev.classmethod.jp/articles/aws-start-to-restrict-codecommit-and-cloudsearch/

AWS CodeCommit や Amazon CloudSearch、AWS Cloud9 などのいくつかのサービスで新規利用に制限がかかったとのことです。

この件に関してはサービスによって状況や詳細が異なるため、ここでは詳しく説明しません。
上記リンク先の記事（大変わかりやすいです。8/2 時点の情報であることに注意）、および、最新の情報を参照ください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Slack のスケジュール投稿がスレッド内でできるようになった
https://x.com/SlackHQ/status/1816461445585916409

タイトル通りですが、Slack のスケジュール投稿がスレッド内でできるようになりました。チャンネル全体に伝えるほどではないが、ある議論内ではリマインドしたいという場面で便利そうです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# know-how 🎓

## NATゲートウェイの通信内容を調査して対策し、コストを約60％削減した話 - ZOZO TECH BLOG
https://techblog.zozo.com/entry/wear-natgateway-cost-down

NAT ゲートウェイを通る通信の詳細を VPC フローログで調査し、本来は NAT ゲートウェイを通らずに済むはずの通信経路を整理することでコストを削減したという記事です。

- AWS サービスへの通信は VPC エンドポイントを利用して NAT ゲートウェイを通らないようにした
- 本来は Private subnet 内で完結するはずの無駄に NAT ゲートウェイを通ってしまっていた通信経路の見直し
- ECR のプルスルーキャッシュを使って初回以降は NAT ゲートウェイから外向きの通信が発生しなくなるようにした

自分も業務で NAT ゲートウェイのコスト削減を調査したことがあるのですが、紹介されている対策の 1 つ 1 つは NAT ゲートウェイのコスト削減策としてよく知られている方法という認識です。
こちらの記事は、最初に VPC フローログと名前解決のクエリログを分析することで、推測ではなく確かな根拠を持って個別の問題に対して対応している点がとても参考になりました。 "推測するな、計測せよ" ですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## 2024年版のDockerfileの考え方＆書き方 | フューチャー技術ブログ
https://future-architect.github.io/articles/20240726a/

最近のアップデートを取り込んだ 2024 年版の Dockerfile の書き方について紹介されています。

最近では `docker init` で各言語ごとのベストプラクティスが盛り込まれている Dockerfile を生成してくれるようになりました。生成される Dockerfile はマルチステージビルドは当然として `--mount=type=cache` や `--mount=type=bind` など比較的新しい機能も使われており、この記事では主にそれらの新しめの機能について解説されていました。`docker init` をまだ実行したことがない方は、ぜひお手元で試してみてください。

ちなみに、この記事について同僚から `RUN --mount=type=bind` は `COPY` と異なり.dockerignore が効かないため本来はビルドに不要なファイルが誤って持ち込まれてしまう可能性など `COPY` よりも扱いが難しいのではないかという意見があって少し盛り上がりました。自分もそのあたりは少し気になっており、コンテナにファイルをコピーする `COPY` よりも単にファイルをマウントする `--mount=type=bind` の方が効率は良いと思われるのですが、よほど大きなコードベースでない限りは従来の `COPY` でも十分なのではないかという気もします。

一方で、Docker 社のブログでは `--mount=type=bind` は割と以前から登場しており、例えば M1 mac が登場したことで x86/Arm のクロスコンパイルが Docker 界隈の重要トピックの 1 つであった 2021 年頃のブログでは、すでに Dockerfile での bind mount について触れられていました[^mount_default]。

https://www.docker.com/ja-jp/blog/faster-multi-platform-builds-dockerfile-cross-compilation-guide/

今回、上記のブログ以外にも改めて Docker の公式ドキュメントなどを見てみると割と bind mount を推している雰囲気を感じました。自分は今まで `COPY` で特に困った経験はないのですが、bind mount についても気にしていきたいと思います。

[^mount_default]: ブログ中では `--mount=target=.` という記述になっており、日本語訳が微妙なので分かりにくいですが `type` を省略した場合は `type=bind` がデフォルトの挙動ですので、これは `--mount=type=bind,target=.` と等価なはずです。`type` を省略した場合の挙動は Dockerfile のリファレンスで確認しました。 https://github.com/moby/buildkit/blob/master/frontend/dockerfile/docs/reference.md#run---mount

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_


# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [OpenTofu 1.8.0 is out with Early Evaluation, Provider Mocking, and a Coder-Friendly Future](https://opentofu.org/blog/opentofu-1-8-0/)
    - OpenTofu 1.8.0 が正式リリースされました
    - 詳しくは[アルファ版の際に以前紹介している](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240626#help-us-test-opentofu-1.8.0-alpha1)ので読んでみてください
- **know-how 🎓**
  - [GitHub の削除されたリポジトリや非公開のリポジトリに誰でもアクセスできるの？](https://zenn.dev/kou_pg_0131/articles/github-repo-access)
    - GitHub の削除されたリポジトリや非公開リポジトリにアクセスできる！？という件で一時期 SNS が盛り上がりましたね。それについて検証・まとめをしてくれている記事です
    - 個人的にはなかなかのエッジケースじゃないと困らない問題であると思ったので特に対策などは考えませんでした（fork して private にする運用がレアだと思う）
  - [生成 AI や Gemini の基本について学べる Generative AI Study Jam 開催のお知らせ](https://developers-jp.googleblog.com/2024/07/gemini-gen-ai-study-jam.html)
    - 生成 AI や Google の Gemini について学べるオンラインプログラムを Google が開催しています
    - 8/1 から 10/1 の間に受けられるようなので、気になる人は受けてみましょう

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# おまけ： CYBOZU SUMMER BLOG FES '24 が開催されました！（宣伝）
https://cybozu.github.io/summer-blog-fes-2024/

サイボウズでは今年の夏、サイボウズによるブログの祭典を行ないました。

> 80名を超えるサイボウズのエンジニアとデザイナーが約100本の記事を投稿！

すごいですね。

僕もブログを投稿しました。しかも 2 本！

https://zenn.dev/cybozu_ept/articles/ai-blog-review-on-github

Productivity Weekly を LLM で誤字脱字レビューしてもらってるぜ！という記事です。じわじわといいねがついてて笑う。

https://zenn.dev/cybozu_ept/articles/cache-corretto-on-self-hosted-gha

セルフホストランナーの転送量削減のために setup-java の方法に従って Amazon Corretto をキャッシュする話です。こっちも伸びろ！（対象読者が少なすぎる問題）

# あとがき

本当にすみません。大変遅くなりました。上に書いた通り、フェスのブログ 2 本書いてたら Weekly 書く余裕皆無でした。自業自得。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
