---
title: public repoでも通常armランナーが利用可能に｜Productivity Weekly(2025-01-22)
emoji: 💢
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20250122
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
    _本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_
    _本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_
    _本項の執筆者: [@naotama](https://zenn.dev/naotama)_
published_at: 2025-01-29 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2025-01-22 単独号です。

今回が第 176 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
<!-- - [@korosuke613](https://zenn.dev/korosuke613) -->
- [@defaultcf](https://zenn.dev/defaultcf)
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)
- [@takoeight0821](https://zenn.dev/takoeight0821)
- [@takamin55](https://zenn.dev/takamin55)
<!-- - [@naotama](https://zenn.dev/naotama) -->
:::

# news 📺

## GitHub Actions: Ubuntu 20 runner image brownout dates and other breaking changes - GitHub Changelog
https://github.blog/changelog/2025-01-15-github-actions-ubuntu-20-runner-image-brownout-dates-and-other-breaking-changes/

GitHub Actions で廃止となる機能や Breaking Changes の予告がされています。同じ内容で何度か GitHub から告知がされていますね。(以前 2024/12/11 の Productivity Weekly でも取り上げています)
改めて内容を確認していきましょう。

- Ubuntu 20 のイメージが 2025/4/1 に廃止。その前準備として、3/4 から 3/25 にかけて、決められた時期に `ubuntu-20.04` を使用するジョブが失敗するようです。
- `actions/upload-artifact`, `actions/download-artifact` の v3 が 2025/1/30 日に廃止されます。1/16, 1/23 にも一時的に使用できなくなるようです。これは GitHub Enterprise Server には影響がありません。
- `actions/cache` の v1, v2 と `actions/toolkit` の cache package の 4.0.0 以前が 2025/3/1 から使えなくなります。これも artifact と同様 GitHub Enterprise Server には影響ありません。

心当たりがあればバージョンアップをして対応していきましょう！

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Linux arm64 hosted runners now available for free in public repositories (Public Preview) - GitHub Changelog
https://github.blog/changelog/2025-01-16-linux-arm64-hosted-runners-now-available-for-free-in-public-repositories-public-preview/

パブリックリポジトリでも Linux arm64 ランナーが使えるようになりました。
arm64 ランナーは Microsoft が開発した CPU「Cobalt 100」上で動作しており、性能が高いだけでなく消費電力も低く抑えられているそうです。 
Arm64 をターゲットにしたバイナリのビルドや、Docker のマルチプラットフォームイメージのビルドに QEMU が不要になり、CI/CD の高速化が期待できます。

生産性向上チームが以前試した記事はこちら: [GitHub Actions に Arm64 ランナーが来たので Docker のマルチプラットフォームイメージをビルドしてみる](https://zenn.dev/cybozu_ept/articles/build-multi-platform-image-with-arm64-runner)

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

## Copilot Users Can Ask About A Failed Actions Job (GA) - GitHub Changelog
https://github.blog/changelog/2025-01-15-copilot-users-can-ask-about-a-failed-actions-job-ga/

GitHub Actions のジョブが失敗した原因を Copilot に質問できる機能が GA になりました。ブラウザ上でボタンをワンポチするだけで原因を説明してくれます。

GitHub の中でスムーズに原因究明できて嬉しいですね。社内では、「Jenkins おじさんの仕事が供養された」や「LLM の良い使われ方だな」といった絶賛の声が上がっていました。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Code scanning caches dependencies for Java, Go & C# - GitHub Changelog
https://github.blog/changelog/2025-01-21-code-scanning-caches-dependencies-for-java-go-c/

Code scanning 実行時の依存関係のキャッシュが Java, Go, C# で可能になりました。これにより、スキャンにかかる時間を短縮できます。

code scanning の設定が Default Setup の場合は、GitHub Hosted なランナーを使っている限り自動でこちらの設定が有効化されます。便利ですね！。Advanced Setup の場合は手動での有効化が必要なようです。

Code scanning は GitHub リポジトリのコードを分析し、セキュリティの脆弱性やエラーを見つけられる静的解析機能です。CodeQL と呼ばれる GitHub が開発した分析エンジンを用いて行われます。

試しに Code scanning を使っている Go の OSS リポジトリを探したところ、[traefik/traefik](https://github.com/traefik/traefik) というリポジトリを見つけました。ワークフローを見ると、キャッシュ機能がリリースされた 2025 年 01 月 21 日以降は `go: downloading` のログが消え、実行時間が 13~14 分台から 9 分台まで高速化されていました。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## The AWS Management Console now supports simultaneous sign-in for multiple AWS accounts - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-management-console-simultaneous-sign-in-multiple-accounts/

AWS コンソールのマルチセッションが可能になりました。これにより、複数の AWS アカウントにログインしたり、同じ AWS アカウントで別の IAM User や Role でログインしたりできます。

今までは private window を開いて頑張って 2 つの AWS アカウントにログインしていた方もいらっしゃるのではないでしょうか？その必要はもうありません！便利ですね。

マルチセッションは最大 5 つまで可能で、全リージョンで有効な機能です。コンソールの右上のメニューから「マルチセッションサポートをオンにする」を押すだけで有効化でき、無効化もいつでもできます。

有効化した後に他のセッションを追加すると、メニュー「その他に x 件のアクティブなセッション」というセクションが追加され、そこから他のセッション画面に簡単にアクセスできました。

なお、有効化するとコンソールの URL が変わり、セッションごとにサブドメインが追加されます。そのため、有効化後に今までのマネジメントコンソール URL に直接アクセスしてもコンソールには行かず、セッションを選択する画面が表示されます。もしマネジメントコンソールの URL をブックマークしている場合は、これからはアカウントごとの URL をブックマークすると良いかもしれません。

なお、マルチセッションにより便利になった反面、リソース操作の事故も起きやすくなったと言えるため気をつけましょう。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## AWS CodeBuild now supports test splitting and parallelism - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-codebuild-test-splitting-parallelism/

CodeBuild でテストを並列に実行可能になり、実行にかかる時間を短縮できるようになりました。
並列で起動するシャード数を指定し、`--files-search` オプションをつかってうまくテストファイルを渡すことで、設定に応じてテストファイルが自動で配分され、それらを各シャードで実行してくれます。

現在ではテストファイルを均等に配分する `Equal-distribution` と、ハッシュアルゴリズムを利用して常に同じシャードに配分する `Stability` の 2 つの配分アルゴリズムを選択できるようです。

各言語での `buildspec.yml` の書き方の例もドキュメントにまとまっており、すぐに開始できます。
https://docs.aws.amazon.com/ja_jp/codebuild/latest/userguide/sample-parallel-test.html

なお、シャード数の方が配分するテストファイルの数より多い場合、配分されなかったシャードがエラーとなりビルド全体での結果がエラーとなってしまうので、ご注意ください。

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_

## Announcing AWS User Notifications GA on AWS CloudFormation - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2025/01/aws-user-notifications-ga-cloudformation/

CloudFormation で AWS User Notifications を扱うことができるようになりました。
AWS User Notifications は、AWS 上の様々なイベントをユーザーに通知するサービスです。

AWS のイベントに関するユーザーへの通知を CloudFormation で組む場合、以前は EventBridge や Amazon SNS を組み合わせて実装する必要がありました。
今回、CloudFormation で扱えるようになった User Notifications を使用することで、より簡単に実現できます。

生産性向上チームでも CloudFormation は使用しており、ありがたい機能追加です。
ただ IaC はどちらかというと Terraform を主に使用しており、今回の機能もできれば Terraform で扱いたいものです...
現時点の Terraform の最新の AWS Provider（v5.84.0）には User Notifications に関するリソースはありませんが、機能追加の issue はあります。
https://github.com/hashicorp/terraform-provider-aws/issues/34969

Terraform でも AWS User Notifications を扱えるようになるのが楽しみです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Go1.24 New Features
https://zenn.dev/koya_iwamura/articles/ca9ab62ff760c2

2 月にリリースが予定されている Go 1.24 の新機能が紹介されています。
いろいろな話題が盛りだくさんです。特に会で話題に上がったのは次の機能です。

- Type alias が Generics で使えるように : `type A[T any] = B[T]` のように、型パラメータを含む型エイリアスが書ける。
- encoding/json が omitzero タグをサポート : `IsZero() bool` を実装している型のフィールドを `omitzero` タグで省略できる。
- `testing.(T|B|F)` に `Context() context.Context` が追加 : テストケースごとにわざわざ `context.WithCancel` を呼ぶ必要がなくなる。
- `os.Root` が追加 : 指定したディレクトリ配下のみを操作できる型 `os.Root` が追加され、意図しないディレクトリを操作するミスを防げる。

Go 1.24 のリリースが楽しみですね。

_本項の執筆者: [@takoeight0821](https://zenn.dev/takoeight0821)_

# know-how 🎓

## Deno in 2024
https://deno.com/blog/deno-in-2024

Deno 公式からの 2024 年の Deno のまとめ記事です。以前 2024 年 12 月 25 日の Productivity Weekly では、uki00a さんによる Deno の 2024 年まとめを紹介しました。そちらを見られた方はスムーズに読めそうです。
大きく取り上げられているのは Node, npm との互換性、package 管理ツールの高速性、新しい JavaScript の Registry である JSR、実行可能バイナリを作成できる deno compile など、2024 年に Deno で起きたビッグイベントが並んでいます。

個人的には「Deno Standard library, stabilized」に書かれている npm での有名ライブラリと対応する Deno の std ライブラリの表が面白かったです。npm でいうところの〇〇を Deno で使いたい、という時に役立ちそうですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## 誤解されがちなnever型の危険性: 「存在しない」について #TypeScript - Qiita
https://qiita.com/uhyo/items/97941f855b2df0a99c60

`never` 型の値は存在しちゃいけないので、`as never` すると型検査に大きな穴を作りかねないよという啓蒙的な話です。
流石に `as never` をやる人は少ないと思いますが、例えば Branded Type を `type UserId = string & { __userIdBrand: never };` と定義してしまうと、`(foo as UserId).__userIdBrand : never` という形で `never` 型の値が得られてしまいます。このケースでは、`never` 型の代わりに `unknown` を使うとよいとされています。例を「[Branded Type ベストプラクティス 検索](https://qiita.com/uhyo/items/de4cb2085fdbdf484b83)」から次に引用します:

```ts
const userIdBrand = Symbol();

export type UserId = string & { [userIdBrand]: unknown };
```

気をつけましょう！

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## スタディストではCursor Businessを導入しました - スタディスト Tech Blog
https://studist.tech/introducing-cursor-business-33d53346e603

2024 年頃から X やブログ記事で話題になっている AI 支援コードエディタの Cursor に関する記事です。スタディストさんが業務で利用できるようにしたようで、こちらの記事では背景、検討事項、社内展開の流れが紹介されています。

AI 系のツールは学習データとして使われることへの懸念がありますが、Cursor Business を契約すると組織単位で privacy mode をオンにできるため、個人の設定ミスなどが起きず安心です。
社内にツールを浸透させるためにドキュメント整備や勉強会の開催などを行ったようでした。

Cursor で開発生産性を上げていきましょう⤴

_本項の執筆者: [@takamin55](https://zenn.dev/takamin55)_


# あとがき
今週号でした。メンバーの手が早すぎて僕はネタを書けませんでした...（懺悔）
AWS コンソールにマルチセッションでログインできるようになったやつが個人的にめちゃ便利になって助かっています。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
