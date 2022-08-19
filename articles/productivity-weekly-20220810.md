---
title: "Productivity Weekly (2022-08-10号)"
emoji: "🌍"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220810"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 86 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Dependabot now alerts for vulnerable GitHub Actions | The GitHub Blog
https://github.blog/2022-08-09-dependabot-now-alerts-for-vulnerable-github-actions/

Dependabot のアラート機能が GitHub Actions のアクションに対応しました。

GitHub Advisory Database にアクションの脆弱性が記録されると影響を受けるリポジトリにアラートが飛びます。恩恵を受けるには Dependabot alerts を有効にする必要があります。

ちなみに現在登録されているアドバイザリーは 2 件でした。

![](/images/productivity-weekly-20220810/advisory_database_for_action.png =600x)
*[GitHub Advisory Database](https://github.com/advisories?query=type%3Areviewed+ecosystem%3Aactions) の Actions のアドバイザリー一覧。2件ある。*

脆弱性登録が少ないのかレビューに時間がかかるものなのかはわかりませんが、もし自身のもつアクションに脆弱性があったら報告しましょう（記事には脆弱性の報告についても載っています）。

## GitHub Actions: The Ubuntu 18.04 Actions runner image is being deprecated and will be removed by 12/1/22 | GitHub Changelog
https://github.blog/changelog/2022-08-09-github-actions-the-ubuntu-18-04-actions-runner-image-is-being-deprecated-and-will-be-removed-by-12-1-22/

GitHub Actions において、Ubuntu 18.04 のランナーイメージが deprecated となり、2022/12/01 で廃止されることが発表されました。

廃止されるのは 12/01 となっていますが、8 月終わりから廃止までの間、一時的に Ubuntu 18.04 を使っているジョブが失敗する期間が複数スケジュールされています。この期間内に問題が起きたら `runs-on` を確認しましょう。

Ubuntu 18.04 は 2023 年 4 月に EOL となるため、それに先駆けて廃止スケジュールが設定されているようです。早いうちに `runs-on` に `ubuntu-18.04` ラベルがついているジョブを修正していきましょう。


## GitHub Actions: Self-hosted runners now support Apple M1 hardware | GitHub Changelog
https://github.blog/changelog/2022-08-09-github-actions-self-hosted-runners-now-support-apple-m1-hardware/

GitHub Actions において、セルフホストランナーが M1 チップなどの Apple Silicon に対応しました。

現時点で 2 つの注意点が確認されています。

- Node.js 12 はサポートされていないため `node12` のアクションは自動的に `node16` が使用される
- `setup-python` はまだ利用できない

もはや Intel 搭載 Mac はほぼ販売されていないため、Apple Silicon 搭載 Mac をセルフホストランナーにできるようになったのは嬉しいですね。

## Introducing the new npm Dependency Selector Syntax | GitHub Changelog
https://github.blog/changelog/2022-08-03-introducing-the-new-npm-dependency-selector-syntax/

npm CLI に query コマンドが追加されました（`npm query`）。query コマンドを使うと、CSS セレクタのような構文で条件に一致する依存パッケージを取得できます。

npm v8.16.0 から追加されていますが、現在リリースされている Node.js v16.17.0 および v18.7.0 にはまだ同梱されていないため、試したければ `npm i -g npm@8.16.0` のように手動で npm CLI を更新する必要があります。

例えば `npm query "[license=MIT]"` とすると MIT ライセンスのパッケージ一覧を表示できます。ただ、僕も試してみたのですが、一部クエリは正常に動作しませんでした（npm レジストリ側で対応が必要なのかな）。


:::details korosuke613/zenn-articles で試してみた

`npm query '[name=zenn-cli]'` はちゃんと結果が返ってきたが、`npm query '[license=MIT]'` は結果が一件も返ってこなかった。

```
❯ npm query '[name=zenn-cli]'
[
  {
    "version": "0.1.117",
    "resolved": "https://registry.npmjs.org/zenn-cli/-/zenn-cli-0.1.117.tgz",
    "integrity": "sha512-1IvPRwB+cTRl3R+5MgdFm6h++c3xzRTzrtxX5KRq2M7+AB2dF1hWBqwTS8n+u/edkTZxhXQJi94Uw8cbMdXGfg==",
    "dev": true,
    "bin": {
      "zenn": "dist/server/zenn.js"
    },
    "engines": {
      "node": ">=14.0.0"
    },
    "name": "zenn-cli",
    "_id": "zenn-cli@0.1.117",
    "pkgid": "zenn-cli@0.1.117",
    "location": "node_modules/zenn-cli",
    "path": "/Users/korosuke613/ghq/github.com/korosuke613/zenn-articles/node_modules/zenn-cli",
    "realpath": "/Users/korosuke613/ghq/github.com/korosuke613/zenn-articles/node_modules/zenn-cli",
    "from": [
      ""
    ],
    "to": [],
    "inBundle": false,
    "deduped": false
  }
]

❯ npm query '[license=MIT]'
[]
```
:::


また、npmcli/arborist パッケージを使えばコード上で同様のことができるとのことです。

これまで npm の依存関係を調べるためには `package-lock.json` を解析しなければいけなかったそうですが、これで依存関係を調べる際はいろいろ楽になりそうですね。正式な同梱を待ちたいです。

## All GitHub Enterprise users now have access to the security overview | The GitHub Blog
https://github.blog/2022-08-08-all-github-enterprise-users-now-have-access-to-the-security-overview/

全ての GitHub Enterprise ユーザーが Enterprise 内の security overview を閲覧できるようになりました。これまでは Advanced Security に加入している必要がありました。また、これまでは Enterprise の Admin および Organization の security manager しか閲覧できませんでしたが、全てのユーザが閲覧できるようになりました。

さっそく僕が所属する Enterprise および各 Organization の security overview を見てみましたが、Organization のすべてのリポジトリの情報が閲覧できるわけではありませんでした。

Organization における security overview では `security alerts` の READ 権限を持っているリポジトリのみ閲覧できる旨のメッセージが表示されました。

![](/images/productivity-weekly-20220810/need_security_alerts.png =600x)
*No repositories found. Repositories are shown only where you have read access to security alerts.*

また、Enterprise における security overview では自分が Owner である Organization のリポジトリ情報しか表示されませんでした。

いまいちすべての人が見られるわけじゃない気がしますが、もしかしたら僕の環境では変更内容の適用が遅れているのかもしれません。それは置いといて、横断的にセキュリティ情報が見られるのは嬉しいですね。

## Wikis now support math and Mermaid diagrams | GitHub Changelog
https://github.blog/changelog/2022-08-09-wikis-now-support-math-and-mermaid-diagrams/

GitHub Wiki において、Mermaid 図や LaTeX スタイルの数式が書けるようになりました。[今年の始めに Issue などで Mermaid 図がサポートされました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#include-diagrams-in-your-markdown-files-with-mermaid-%7C-the-github-blog)が、Wiki での利用はこれまでできませんでした。

僕も以前 Wiki で Mermaid 書いた時にレンダリングされないやん！となったので嬉しいですね。

# know-how 🎓

## TerraformモノレポCIのセキュア化 | メルカリエンジニアリング
https://engineering.mercari.com/blog/entry/20220121-securing-terraform-monorepo-ci/

メルカリでのモノレポ Terraform の CI をセキュアにするという話です。

メルカリではグループ内のすべての Terraform をまとめてモノレポとしており、`terraform apply` はモノレポ内に配置した CI パイプライン上で実行されるようになっていたとのことです。

この記事では、その CI 環境における次のような課題と対策が書かれています。また、マイグレーション戦略も説明しています。

- 永続的なサービスアカウントキー
- 単一の非常に強固（すべての Project に対するオーナー権限）なサービスアカウント
- 任意のコマンドが実行されるリスク（CI パイプラインや Terraform プロバイダによる任意コード実行）

GCP やモノレポでの Terraform 管理を行なっている人に特に参考となると思いますが、AWS やモノレポでない環境においても永続的なサービスアカウント対策や任意のコマンド実行対策は参考になると思います。個人的には Terraform プロバイダを事前承認制にする話[^plugin]が特に面白かったです。`-plugin-dir` オプションのことは知りませんでした。

`terraform apply` を CI で行おうとするとあらゆる懸念や問題が出てくると思います。問題への対処事例として参考になりました。

[^plugin]: プロバイダの承認は良いとして、あらゆるバージョンを毎回承認するのは大変そう。バージョンに関しては自動で複数バージョン用意するようにしているのだろうか。

## セキュアなTerraformの使い方 ～ 機密情報をコードに含めず環境構築するにはどうしたらいいの？ - Speaker Deck
https://speakerdeck.com/harukasakihara/sekiyuanaterraformfalseshi-ifang-ji-mi-qing-bao-wokodonihan-mezuhuan-jing-gou-zhu-surunihadousitaraiifalse

Terraform で Amazon RDS などのシークレットを扱いたい場合、セキュアにシークレットを扱う方法について解説したスライドです。

このスライドでは、機密情報を扱う Terraform コード例、tfstate に含まれる情報の説明、よくある tfstate とシークレットの共存例、tfstate にシークレットを含ませない方法などを説明しています。

一見これで大丈夫と言う方法（`sensitive` の付与や Secret Manager からの data 参照など）をそれぞれなぜそれがセキュアでないのかわかりやすく説明しており、外堀を埋められてる感があります。対策方法は複雑ではありますが、確かにシークレットをよりセキュアに保管できる気がします（でもやっぱり複雑なのが気になる）。また、Terraform や tfstate を丁寧に説明されており、Terraform 初心者でも理解しやすい内容になっていると思います。

Terraform 利用者は一度眼を通しておくと良いと思います。

## git-pr-releaseとGitHub Actionsでワンクリックデプロイを実現する
https://songmu.jp/riji/entry/2022-08-05-git-pr-release.html

x-motemen/git-pr-release のメンテナによる、GitHub Actions と組み合わせてデプロイプルリクエストを作る方法です。

git-pr-release はデフォルトブランチを staging なブランチとしてで production なブランチが別にあるタイプのブランチ戦略（記事内の図を見るのが早いです）を行いやすくするツールであり、CI での利用が想定されています。
この記事では、GitHub Actions での git-pr-release の YAML 例、ブランチモデルの説明、YAML の解説、その他よくある質問への回答が書かれています。

確かにデフォルトブランチを staging とするタイプのブランチ戦略においてとても便利そうなツールだと思いました。同様のブランチ戦略を行いたい場合に非常に参考になる記事だと思います。

## freeeの自動テストの全体構成
https://developers.freee.co.jp/entry/automated-test-structure-2022

freee における、自動テストの全体像を紹介した記事です。

記事では、自動テストに対する基本的な考え方、自動テストのカテゴリと量、カテゴリごとの自動テストのテスト対象や確認内容、カテゴリごとのテスト構成、その他自動テストに関して行っていることなどが書かれています。

こうやって社内の自動テストに関する情報がまとまってるのは良いですね。オンボーディングでとても役立ちそうです。この記事は社外の人にもイメージしてもらうために公開したらしく、確かに自動テストへの考え方が見えると採用にもつながりそうだなと思いました。勉強にも参考にもなる良い記事だと思います。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Actions: Remove offline self-hosted runners | GitHub Changelog](https://github.blog/changelog/2022-08-03-github-actions-remove-offline-self-hosted-runners/)
    - GitHub Actions におけるセルフホストランナーが 14 日以上オフラインが続くと登録解除されるようになりました
      - これまでは 30 日以上となってました
    - ephemeral（使い捨て）なセルフホストランナーに関しては 1 日以上 GitHub への接続がないと登録解除されるようになりました
  - [GitHub Actions: runner images repository refresh | GitHub Changelog](https://github.blog/changelog/2022-08-08-github-actions-runner-images-repository-refresh/)
    - actions/virtual-environments リポジトリが actions/runner-images にリネームされました
    - GitHub Actions のランナーのイメージやインストールされてるソフトウェア一覧のドキュメントが管理されてるリポジトリです
- **know-how 🎓**
  - [新刊『エンジニアリングマネージャーのしごと』発売のお知らせ](https://www.ryuzee.com/contents/blog/14572)
    - オライリージャパンからエンジニアリングマネージャに関する翻訳本が出ます
    - エンジニアマネージャみたいな人は読むといいかもしれません
    - 「8.4 スタッフを辞めさせる」という節が欧米っぽくて面白そうです。日本じゃ簡単にできないぞ

# あとがき
今週号も遅れてしまいすみません。インターン受け入れ準備や社外登壇の LT 資料作成などでなかなか時間が取れてません 🥲
休みの日は今の自分のホームページのリプレイスをがっつりやったりして余計時間がなかったです 😇

実は今月末に TECH STAND #9 GitHub というイベントでお話しするのでよければ見に来てください。他の登壇者の方のお話もあります。面白そうなトピックが多かったです。

https://twitter.com/Shitimi_613/status/1557207781085974529

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週のおまけはお休みです...
:::

