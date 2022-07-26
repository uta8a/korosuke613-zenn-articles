---
title: "Productivity Weekly (2022-07-20号)"
emoji: "🪑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220720"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 83 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Carbon, a new programming language from Google, aims to be C++ successor
https://9to5google.com/2022/07/19/carbon-programming-language-google-cpp/

Google が C++ の後継者とするための新しいプログラミング言語 Carbon を発表しました（exprimental）。

Rust が C++の後継者であるという考え方もありますが、その実 Java や kotlin のような双方向の相互運用性が無いため、実際に C++プロジェクトを移行することは困難であると記事で提唱されています。Carbon は既存の C++コードと完全に相互運用可能であり、C++から Carbon への移行をできるだけ簡単にすることを目標としています。

Carbon は OSS プロジェクトとして GitHub にて公開されており、広く Issue やプルリクエストを受け付けています。

https://github.com/carbon-language/carbon-lang

Carbon のゴールは [goals.md](https://github.com/carbon-language/carbon-lang/blob/f612c7191c747f6f83041afde678aaedbc2488f5/docs/project/goals.md) にまとめられており、ロードマップは [roadmap.md](https://github.com/carbon-language/carbon-lang/blob/f612c7191c747f6f83041afde678aaedbc2488f5/docs/project/roadmap.md#demo-implementation-of-core-features-with-working-examples) にまとめられています。ロードマップによると、2024〜2025 年に Version 1.0 をリリースしようとしているようです。

既に実際に動かしてみた方もいます。

- [Carbon Language が発表されたので実際に動かしてみた](https://zenn.dev/blendthink/articles/d1a3b397bdae82)

まだまだ正式リリースは先になるのでなんとも言えませんが、C++ と相互運用可能となったら古い C++ プロジェクトを簡単に移行していけそうですね。続報を待ちたいです。

## Differentiating triggering actor from executing actor | GitHub Changelog
https://github.blog/changelog/2022-07-19-differentiating-triggering-actor-from-executing-actor/

GitHub Actions において、ワークフローを再実行する際、最初に実行したアクター（ユーザや GitHub Apps など）の権限が使われるようになりました。これまでは再実行したアクターの権限が使われていました。これにより、再実行時に権限の差異による問題が発生しなくなります。また、意図せぬ権限昇格によるセキュリティ上の懸念も減ります。

ワークフローからは、`github.triggering_actor` で再実行したアクターの情報を取得できるとあります[^but]。

「Starting next week」と書いており、この記事は 2022/07/19 に投稿されているのでおそらく既に施行されています。挙動が変わって驚かないように覚えておきたいですね。

[^but]: しかし、ドキュメントにはまだ記載されていません。Issue に書いておきました。https://github.com/github/docs/issues/19307

## sider.reviewサービス終了のお知らせ
https://siderlabs.com/blog/ja/sider-reviewサービス終了のお知らせ/

自動コードレビューサービスの sider.review が 2022 年いっぱいでサービスを終了します。

sider.review はさまざまな言語やフレームワークに対応しており、脆弱性のあるコードやよろしくない書き方のコードを指摘してくれます。また、secret が含まれているかどうかのチェックや misspell のチェックも行ってくれます（設定で柔軟に変更できます）。GitHub でログインするだけで利用でき、設定もわかりやすかったので使いやすそうでした。

安定的にサービスを提供する事が難しくなったことがサービス終了の理由と説明されています。サービス終了までのスケジュールによると 2022 年 12 月 31 日に全てのサービスと技術サポートが終了する予定です。2014 年頃に前身である SideCI のベータ版がリリースされ、今年で 9 年目でした。

![](/images/productivity-weekly-20220720/sider_misspell.png)
*試しに Zenn の記事を管理しているリポジトリを解析してもらったところ、ミススペルが見つかりました*

ちなみに Sider 社は [Sider Scan](https://siderlabs.com/scan/ja/features/) というユーザがホスティングする（各種 CI サービスで実行可能）バグ検知ツールも提供しています。こちらはバグ検知に特化したプロダクトのようです。

こういった長く生きたサービスが終了するのは悲しいものがありますね。最近だと CI サービスで実行できる静的解析ツールで間に合ってるとかそういう背景があったりするんですかね。

# know-how 🎓

## 6 strategic ways to level up your CI/CD pipeline
https://github.blog/2022-07-19-6-strategic-ways-to-level-up-your-ci-cd-pipeline/

GitHub による CI/CD パイプラインをレベルアップさせる 6 つの戦術です。

次の先述が詳しく説明されています。

1. CI/CD パイプラインにパフォーマンステスト、デバイス互換性のテスト、ビジュアルリグレッションテスト、アクセシビリティテストを追加しよう
2. CI/CD パイプラインに自動のセキュリティテストを取り入れよう
3. 段階的なテストを構築しよう
4. ブルー・グリーンデプロイメントで簡単にロールアウトできるようにしよう
5. IaC を導入しよう
6. 自動ロールバックの仕組みをいれよう

CI/CD パイプラインを適当に作るのではなく、こういったことを意識して構築していきたいですね。

## CircleCI の設定ファイルを分割して CUE で合成してみたら割と簡単で便利そう - Mitsuyuki.Shiiba
https://bufferings.hatenablog.com/entry/2022/07/17/043605

分割した CircleCI の設定ファイルを CUE 言語の CLI ツールを使って合成する方法について説明した記事です。

CircleCI の設定ファイルである `config.yaml` は原則として単一のファイルでなければなりません。複数ファイルに分けて管理したい場合は Dynamic Config を利用したり（[参考](https://christina04.hatenablog.com/entry/circleci-dynamic-config)）事前にマージするなどの対応が必要です。

[CUE 言語](https://cuelang.org/)は yaml や json のようなデータ記述言語の一種です。この記事では、CUE 言語を処理する CLI に分割した yaml を渡して合成し yaml でエクスポートするというアプローチを紹介しています。また、実際に CircleCI 上で利用するための Dynamic Config の設定方法も載っています。

実は [CircleCI CLI](https://circleci.com/docs/ja/local-cli) にも `circleci config pack` というコンフィグを合成する機能があります。記事で書かれているサンプルのコンフィグを合成するように試してみたところなぜかうまく行きませんでした（指定方法が間違ってるかも？）。

:::details `circleci config pack` vs `cue export`

```yaml:circleci config pack .
jobs:
    say-hello3:
        docker:
            - image: cimg/base:stable
        steps:
            - checkout
            - run:
                command: echo Hello, World3!
                name: Say hello3
version: 2.1
workflows:
    say-hello-workflow2:
        jobs:
            - say-hello
            - say-hello2:
                requires:
                    - say-hello
```

```yaml:cue export *.yaml --out yaml
version: 2.1
jobs:
  say-hello:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Say hello
          command: echo Hello, World!
  say-hello2:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Say hello2
          command: echo Hello, World2!
  say-hello3:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Say hello3
          command: echo Hello, World3!
workflows:
  say-hello-workflow3:
    jobs:
      - say-hello
      - say-hello2:
          requires:
            - say-hello
      - say-hello3:
          requires:
            - say-hello
  say-hello-workflow:
    jobs:
      - say-hello
  say-hello-workflow2:
    jobs:
      - say-hello
      - say-hello2:
          requires:
            - say-hello
```

```console:それぞれの結果を検証
❯ circleci config pack . | circleci config validate -
Error: Error calling workflow: 'say-hello-workflow2'
Cannot find a definition for job named say-hello

❯ cue export *.yaml --out yaml | circleci config validate -
Config input is valid.
```
:::

なかなか面白いアプローチだと思いました。yaml で受け取って yaml でエクスポートするというのは逆転の発想感があります。CUE は一度決定した値に上書きできないという特性もあるため、意図せぬ値の上書きが起こらないことを保証できるのは嬉しいかもしれません（yq の場合は上書きされる）。便利ですね。

## リリースノート管理術
https://r7kamura.com/articles/2022-07-18-release-notes-management

CHANGELOG.md にバージョン差分を書いていく方法をやめて GitHub Releases を使うようになり、関連する色々な Tips を紹介してくれている記事です。

リリースノート自動生成時にどこのセクションにどのプルリクエストを載せるかをラベルで管理できることは知りませんでした。ラベルを各リポジトリで設定するための actions も紹介されており、リリースノートをいい感じに楽に自動生成したい際に参考になりそうと思いました。

## Linting Markdown And Documentation - Earthly Blog
https://earthly.dev/blog/markdown-lint

英文用のフォーマッターやリンターの紹介記事です。全部で 7 つのツールが紹介されており、Formatting や Spelling といったカテゴリごとに著者の方が点数をつけています。

思ったよりもこういうツールがたくさんあることに驚きました。textlint しか知らなかったので他のツールも触ってみたいです。ただ、日本語を書く場合はどこまで使えるのか怪しいので、個人的にはあくまで README.md を書く際などに使いそうです。

# tool 🔨

## Python コードでアーキテクチャ図を生成できる Diagrams がめっちゃ便利！
https://kakakakakku.hatenablog.com/entry/2022/07/13/080432

AWS とか GCP のアーキテクチャ図を書くときにコードで書けるツール Diagrams の紹介です。

アーキテクチャ図を記述できるツールはたくさんありますが、Diagrams は AWS や GCP などのアイコンが最初から用意されているのが嬉しい部分です。また、Python で記述するため、プログラマブルに記述できるのも特徴です。

とにかくアイコンが用意されているのが嬉しいですね。個人的には Python はあまり使いたくないのでなんとも微妙ですけど、アーキテクチャ図を作る際に覚えておきたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [GitHub Actionsでワークフローは使いまわしたいけど環境別に変数切り替えしたい場合](https://zenn.dev/toritori0318/articles/7c4505d800d2eb)
    - Environments 機能を使わずに GitHub Actions で環境別で変数を切り替える方法の紹介
  - [「PHP 8.0でエグ目のブレーキングチェンジがあったんですが、 PHP 7.4のバイナリに手を入れて、PHP 8.0の挙動を模倣して、挙動が変わっていたらログに出力する、というアクロバット対応で、無事事前に問題箇所の炙り出しができました。 弊社のスーパーエンジニアの初登壇なので、応援お願いします😌」 / Twitter](https://twitter.com/oogFranz/status/1549333884307111936)
    - PHP 7.4 のバイナリに手を入れて PHP 8.0 の機能の一部を盛り込んで PHP 8.0 へのアップデートを比較的安全に行うというセッションが PHP カンファレンス 2022 であります
    - すごいですね。PHPer の方は見に行ってみましょう

# あとがき
デブサミ 2022 サマーの発表が終わって、反動で遊びまくってたら Weekly が遅れてしまってます。すみません...
最近遊びすぎなのでちょっとゆとりある時間を確保しようと思ってます。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
