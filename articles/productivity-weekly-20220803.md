---
title: "Productivity Weekly (2022-08-03号) 簡易版"
emoji: "🎥"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220803"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 85 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
最近多忙のためなかなか Weekly を書く時間が取れないので、今月は**いつもより分量少なめの簡易版**とします。
ご了承ください。
:::

# news 📺

## GitHub Pages: Custom GitHub Actions Workflows (beta) | GitHub Changelog
https://github.blog/changelog/2022-07-27-github-pages-custom-github-actions-workflows-beta/

- GitHub Pages へのデプロイを GitHub Actions から直接できるようになりました（ベータ）
- ビルドが必要な静的サイトをビルドしてそのままデプロイできますし、わざわざ Pages 専用ブランチを作ってコミットを積む必要がなくなります
- また、Actions のアクションとして [actions/upload-pages-artifact](https://github.com/actions/upload-pages-artifact)、[actions/deploy-pages](https://github.com/actions/deploy-pages) を使えるようになりました
  - これらを使えば簡単にデプロイ可能です
- もちろんこれまで通りブランチに配置してデプロイする方法も使えるので、適してるやり方を使っていきましょう


## Prebuilding codespaces is now supported for multi-repository and monorepo projects | GitHub Changelog
https://github.blog/changelog/2022-07-28-prebuilding-codespaces-is-now-supported-for-multi-repository-and-monorepo-projects/

- GitHub Codespaces において、環境を自動で事前に構築しておいてくれるプレビルド機能がサポートされました
- これまではインスタンスを作るたびに、イメージをビルドする必要があったため、コードが更新されてもインスタンスのイメージは更新されなかった上、起動までに時間がかかっていました
- 例えば main ブランチを指定すると、main ブランチが更新されるたびに新しいイメージがビルドされます。Codespaces 利用時にそのイメージをベースにインスタンスが作られます 
- Actions 上でビルドされるため、Actions の利用料がかかります。また、イメージは Codespaces のストレージ使用料として課金されます
  - ちなみに、個人アカウントでの利用はまだ課金対象ではありません。ベータのうちは無料で利用できます
    - ていうかまだベータなんですね
- どんどん便利になっていく Codespaces のおかげで本当にいつでもどこでも開発ができそうです。便利な使い方を探求していきたいですね

![](/images/productivity-weekly-20220803/codespaces_prebuilds.png =400x)
*設定画面。ビルドタイミングを設定変更時や scheduled に変更できるなど柔軟に設定できそうです*

## CircleCI Server 4.xが登場
https://circleci.com/server/changelog/#release-4-0-0

- CircleCI Server 4.x が登場しました
- 3.x では [kots](https://kots.io/) を使って Server 3.x の設定などを管理していましたが、4.x では kots の代わりに Helm を使うようになっています
- コードでの管理がしやすくなって良いですね
- 世の中の CircleCI Server 管理者の皆さん、がんばってアプデしましょう

## CDK for Terraform Is Now Generally Available
https://www.hashicorp.com/blog/cdk-for-terraform-now-generally-available

- Cloud Development Kit for Terraform こと CDKTF がとうとう GA を迎えました
- GA になり、Go の完全サポートと Terraform Cloud で使用する GitHub アクションが提供されるようになりました
- ちなみに GA とは言っていますが、バージョンは 0.12 です。なぜ...
- Terraform を使うためには原則として HCL を扱える必要がありますが、CDKTF を使うことで使い慣れたプログラミング言語の知識で HCL を生成できます
- HCL に慣れている人にとっては HCL をそのまま使い続ければ良いと個人的に考えてます


## You can now fork a repo and copy only the default branch | GitHub Changelog
https://github.blog/changelog/2022-07-27-you-can-now-fork-a-repo-and-copy-only-the-default-branch/

- GitHub において fork するときにデフォルトブランチのみをフォーク先リポジトリへ持ってこれるようになりました
  - デフォルトブランチオンリーにするかどうか選べる
- 大規模なリポジトリの場合ブランチがたくさんあってフォーク先リポジトリの（単純な）クローンにめちゃくちゃ時間がかかったりしますが、デフォルトブランチのみだとそこを工夫する必要はありません
- 多くの場合はデフォルトブランチさえあればいいと思うのでこれは良い変更ですね

## GitHub CLI extension to manage Actions cache | GitHub Changelog
https://github.blog/changelog/2022-07-28-github-cli-extension-to-manage-actions-cache/

- GitHub CLI の公式拡張機能 actions/gh-actions-cache が登場。actions のキャッシュを簡単に管理できるようになりました
  - [ちょっと前に API でキャッシュを管理できるようになっていました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220629#list-and-delete-caches-in-your-actions-workflows-%7C-github-changelog)
- キャッシュをリストアップし、キャッシュサイズや作成時間、最終アクセス時間などが確認できます
- キャッシュの削除もできます
- API を叩くよりも楽にキャッシュを操作できるので良いですね


## Audit Log Streaming to Datadog available as Private Beta | GitHub Changelog
https://github.blog/changelog/2022-07-29-audit-log-streaming-to-datadog-available-as-private-beta/

- GitHub Enterprise Cloud の監査ログストリーミングの向き先として Datadog が追加されました（プライベートベータ）
- Datadog に慣れている人には Datadog 上でログを解析できる方が嬉しそうですね
- まだプライベートベータなので営業への問い合わせが必要です

## File Finder: Customize Default Exclusions | GitHub Changelog
https://github.blog/changelog/2022-07-28-file-finder-customize-default-exclusions/

- GitHub のファイル検索機能(file finder)で除外したいファイルやディレクトリを [`.gitattributes`](https://git-scm.com/docs/gitattributes) ファイルの `linguist` 属性でカスタマイズできるようになりました
  - `.gitattributes` とは指定したパターンのファイルに対して属性（改行コードやエンコードなど）を付与する設定ファイルです
- 今回の変更により、例えば、`*.js` に対して `linguist-generated=true` することで、file finder の検索から除外できます
  ```text:.gitattributes
  *.js linguist-generated=true
  ```
- また、`vendor/**` や `build/**` はデフォルトで file finder から除外されるようになっていますが、今回の変更でそれらも file finder の対象に入れることができるようになりました
- なんか `build/**` が引っかからないぞ！という人も自動生成した `*.js` が引っかかりすぎて邪魔...という人にも嬉しい変更ですね

## The GitHub Enterprise Server 3.6 Release Candidate is available | GitHub Changelog
https://github.blog/changelog/2022-07-28-the-github-enterprise-server-3-6-release-candidate-is-available/

- GitHub Enterprise Server 3.6 の Release Candidate になりました
- 監査ログストリーミングや Discussions が使えるように
- 監査ログストリーミングは嬉しいですね

## GitHub Issues - Projects now generally available | GitHub Changelog
https://github.blog/changelog/2022-07-27-github-issues-projects-now-generally-available/

- GitHub Projects (powered by GitHub Issues) が正式リリースされました
- 改めて新しい Projects を紹介する記事も出ています
  - [Planning next to your code - GitHub Projects is now generally available | The GitHub Blog](https://github.blog/2022-07-27-planning-next-to-your-code-github-projects-is-now-generally-available/)
- 名前がややこしいですが、新しい Projects は「Projects powered by GitHub Issues」という名前で紹介されています


# know-how 🎓

## aws-nukeとGithubActionsを使ったら試験用AWSアカウントのクリーンアップが楽になった話 | DevelopersIO
https://dev.classmethod.jp/articles/aws-nuke-githubactions-account-cleanup/

- クラメソさんによる試験用 AWS アカウントのクリーンアップに aws-nuke と GitHub Actions 使うのがいいよという話です
- 不定期で選考試験用の AWS アカウントをまっさらな状態にしたいが、クリーンアップ作業が大変だったため、aws-nuke というアカウント内リソースを削除する OSS を使うようにしたようです
- また、GitHub Actions & OIDC を使うことでクリーンアップ処理の実行も楽になったようです
- まっさらな状態にしたいケースはたまにあるので aws-nuke 便利そうだなと思いました

## Go 1.19リリース連載始まります GoDoc/ツール周りのアップデート
https://future-architect.github.io/articles/20220801a/

- [Go 1.19 がリリースされました](https://go.dev/blog/go1.19)。それにともない、フューチャー株式会社さんがテックブログで Go 1.19 の新機能・変更点に関する記事を連載してくれています
  - 毎度毎度参考にさせていただいてます
- 上記記事はその連載記事の 1 つ目になります。GoDoc の更新、ツール周りの更新について説明してくれています
  - GoDoc は正直まじめに書いたことがないのですが、今回の変更によりマークアップが高機能（heading、link、list）になったようです
  - また、`unix` build constraint の追加は結構嬉しいと Weekly 参加者の Gopher が言っていました
- Go 1.19 になって何が変わったのか気になる人は読んでみましょう

## GitHub Insightsのおかげで効果的な振り返りができた話
https://blog.studysapuri.jp/entry/2022/08/01/how-to-use-github-insights

- GitHub Projects (powered by GitHub Issues) の Insights 機能を使ったところふりかえりが効果的にできるようになったというお話です
- Insights 機能は Projects にある Issue からチャートを描画する機能です
- この記事では、なぜ Insights か、Insights を使ったふりかえり方法を紹介しています
  - ふりかえり方法では Insights をどのように使っているかわかりやすく説明してくれています
- チャートをもとに 1 ヶ月のベロシティや前月比べて目立つ変化などについてチームで議論することで、エンジニア/TPM 双方が納得感のあるアクションを打つことができているようです
- 定量的に測るツールとして Insights は面白そうですね。まずは Projects から使ってみたいです

## Pull Requestをすぐ動作確認！ マイクロサービスでのプレビュー環境の作り方
https://made.livesense.co.jp/entry/2022/08/02/083000

- ArgoCD、Istio、OpenTelemetry の Baggage ヘッダという仕様を組み合わせて、PR ごとにプレビュー環境を立てるという記事です
- 他社も似たようなことをやっていますが、この記事では自前でシステムを一から作るのではなく既存のものを組み合わせて作っているところが面白いです
- PR ごとにプレビュー環境を建てたい場合に参考にしたいです

# あとがき
すみません今週号も簡易版でした。実は今月末に TECH STAND #9 GitHub というイベントでお話しするのでよければ見に来てください。他の登壇者の方のお話もあります。面白そうなトピックが多かったです。

https://twitter.com/Shitimi_613/status/1557207781085974529

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏: オブジェクト崇拝は罪！ 古ヘブライ文字で記述する創世的プログラミング言語が降臨 - やじうまの杜 - 窓の杜
https://forest.watch.impress.co.jp/docs/serial/yajiuma/1431426.html

- 今週のおまけです。
- 古いヘブライ文字で記述するプログラミング言語 Genesis です
- 神のプログラミング言語らしいです
- オブジェクト指向は偶像崇拝に当たるのでオブジェクト指向は取り入れてないようです
- いくつかコードを読みましたがさっぱり読めませんでした
- インタプリタは Java で書かれています
- 難読化させたいプログラムを作りたいときにいいかもしれませんね

## omake 🃏: Twitter、Card Validatorからプレビュー機能を削除。カード情報のキャッシュは最大7日 | gihyo.jp
https://gihyo.jp/article/2022/08/twitter-card-validator-preview-removal

- Twitter Card Validator がプレビュー機能を削除しました
- 設定した OGP が Twitter でどういうふうに描画されるかを確認したり、キャッシュを更新したい場合に使ってたのですが、その両方ができなくなりました
  - 最大 7 日キャッシュされるらしいです
- 確認したい際にちょっと面倒ですね...
