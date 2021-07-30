---
title: "Productivity Weekly (2021-07-28号)"
emoji: "🤗"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はそのときのネタをまとめたものです。

今回が第 36 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Expiration options for personal access tokens | GitHub Changelog
https://github.blog/changelog/2021-07-26-expiration-options-for-personal-access-tokens/

GitHub のパーソナルアクセストークンに有効期限をつけられるようになりました。

有効期限は（今のところ）7、30、60、90、Custom、No expiration から選択でき、有効期限が切れるとトークンは利用できなくなります。

また、パーソナルアクセストークンで GitHub API を叩くと、トークンの有効期限を示すヘッダーが新しく返ってくるようになりました。これにより、有効期限が切れそうになったらアラートを飛ばすなどが可能です。

```text:実際に叩いてみた例
github-authentication-token-expiration: 2021-08-06 02:14:23 UTC
```

実際に設定してみました。

![](https://storage.googleapis.com/zenn-user-upload/dd51ae4bf03e76586e0dd4d9.png)
*既存のトークンは有効期限が設定されてなかったため `This token has no expiration date.` と表示された*

![](https://storage.googleapis.com/zenn-user-upload/2ddb9efe6c746d585b58f5fe.png)
*`Regenerate token` とあるように、有効期限を設定するとトークンが再生成される*

![](https://storage.googleapis.com/zenn-user-upload/c462f06cbb1452bf1f966cbb.png)
*有効期限が設定されたトークンには期限の日にちが表示される*

## ウェブフック(Webhooks) オープンプレビュー開始 - Community - CircleCI Discuss
https://discuss.circleci.com/t/webhooks/40755

クラウド版 CircleCI において、ワークフロー完了時、ジョブ完了時に Webhook を飛ばせるようになりました。（オープンプレビュー）

Webhook には成功、失敗、キャンセルといった情報も含まれるため、失敗した時のみ Slack に通知するといったようなことが可能になります。飛んでくる Webhook については [Webhooks - CircleCI](https://circleci.com/docs/2.0/webhooks) に詳しく載っています。


実際に試してみました。[korosuke613/playground](https://github.com/korosuke613/playground/blob/ea76bbc7a94c33682d387bd9d165172d4553cf5a/.circleci/setup.yml#L21) というリポジトリのジョブを [Rerun](https://app.circleci.com/pipelines/github/korosuke613/playground/68/workflows/28fb70dd-d556-4cd2-b5d9-dfab47af49c1) して、受け取った Webhook が以下になります。（ちなみに、AWS API Gateway で Webhook を受け取り Lambda でコンソールに吐いて確認しました。コード(Serverless Framework)はこちらです。→ [korosuke613/webhook-preview-on-aws](https://github.com/korosuke613/webhook-preview-on-aws)）

:::details 受け取った Webhook
```json:API Gatewayで確認（headers の一部と body のみ抜粋）
{
    "headers": {
        "circleci-event-type": [
            "workflow-completed"
        ],
        "User-Agent": [
            "CircleCI-Webhook/1.0"
        ]
    },
    "body": {
        "type": "workflow-completed",
        "id": "172fa00b-37f1-3947-a889-c78fc53109f1",
        "happened_at": "2021-07-31T04:02:03.323Z",
        "webhook": {
            "id": "5c9e7ec3-96ee-481f-992a-57b76e09f384",
            "name": "test2"
        },
        "workflow": {
            "id": "28fb70dd-d556-4cd2-b5d9-dfab47af49c1",
            "name": "pass",
            "created_at": "2021-07-31T04:01:38.414Z",
            "stopped_at": "2021-07-31T04:02:03.200Z",
            "url": "https://app.circleci.com/pipelines/github/korosuke613/playground/68/workflows/28fb70dd-d556-4cd2-b5d9-dfab47af49c1",
            "status": "success"
        },
        "pipeline": {
            "id": "e1ea7cb5-ea19-4127-ba5b-45abe3180df3",
            "number": 68,
            "created_at": "2021-07-14T16:46:30.607Z",
            "trigger": {
                "type": "webhook"
            },
            "vcs": {
                "provider_name": "github",
                "origin_repository_url": "https://github.com/korosuke613/playground",
                "target_repository_url": "https://github.com/korosuke613/playground",
                "revision": "ea76bbc7a94c33682d387bd9d165172d4553cf5a",
                "commit": {
                    "subject": "rust 関数にコメント",
                    "body": "",
                    "author": {
                        "name": "Futa HIRAKOBA",
                        "email": "hoge@example.com"
                    },
                    "authored_at": "2021-07-14T16:46:23Z",
                    "committer": {
                        "name": "Futa HIRAKOBA",
                        "email": "hoge@example.com"
                    },
                    "committed_at": "2021-07-14T16:46:23Z"
                },
                "branch": "main"
            }
        },
        "project": {
            "id": "81dcf6ce-084b-4635-9d82-91e139bdb1f2",
            "name": "playground",
            "slug": "github/korosuke613/playground"
        },
        "organization": {
            "id": "2b24f127-e188-4a75-9273-ac4e78170af4",
            "name": "korosuke613"
        }
    }
}
```
:::

ジョブの情報がつぶさに載っていますね。対象のコミット情報も載っています。ジョブ失敗時の場合も確認してみましたが、エラーログなどは出ませんでした。まあ失敗時は API を叩けばいい話ではある。


例えば失敗時に Slack 通知したい場合、結局 Webhook を受け取って Slack の API を叩くためのサーバが必要なので、ジョブの中で Slack の API を叩けばいいじゃないかと思ったので、最初はあまり使い所が浮かびませんでした。しかしよく考えると、「ワークフローごとにそういうジョブを書く必要がなくなる」、「Slack に通知を送るコードがワークフローやリポジトリに紐づかないため一元管理できる」、「一度サーバを用意すると導入が楽になる」みたいなメリットもあると思いました。

色々な使い方がありそうでよいですね。

## GitHub brings supply chain security features to the Go community | The GitHub Blog
https://github.blog/2021-07-22-github-supply-chain-security-features-go-community/

GitHub のサプライチェーン・セキュリティ機能が Go modules に対応しました。

具体的には、プルリクエスト内の go.mod の変更をレビューする際に脆弱性が混入されないかを確認できるようになったり、使用している Go modules に新しい脆弱性が発見された時に Dependabot アラートで通知してくれたり、脆弱性を解決するための Go modules のプルリクエストを Dependabot が出してくれたりしてくれるようになりました。

Go modules を使ったリポジトリにおいて、GitHub だけで脆弱性に早く気づけて、セキュリティアップデートを早く適用できるようになれそうです。

# know-how 🎓

## MacのTerminalでsudo実行時にタッチIDを使用する方法 | DevelopersIO
https://dev.classmethod.jp/articles/mac-terminal-sudo-touch-id/

Mac には Touch ID という指紋認証機能が搭載されておりとても便利なのですが、sudo を実行する際はパスワードを入力しなければいけません。せっかく Touch ID があるので有効活用したいですよね？

この記事では、Mac のターミナルで sudo 実行時にタッチ ID を使用する方法が書かれています。また、標準 Terminal だけでなく、iTerm2、tmux で使う方法も書かれています。使う方法も非常に簡単で、5 分とかからずに設定できるため、気になる方は今すぐやってみるのをおすすめします。

僕はシェルを起動するたびに Zoom や IME の nice 値[^nice]を確認し、設定した値でなければ renice[^renice]するようになっているのですが、renice には sudo 権限が必要なので、PC や Zoom を再起動するたびにパスワードを打ち込む必要があります。そのため、Touch ID で sudo できるようになったことでだいぶ楽になりました。もっと早く知りたかったですね。

[^nice]: プロセスの優先度。
[^renice]: プロセスの優先度を変更する。Zoom や IME が重くなるのを防ぐために行っている。

# tool 🔨

## antfu/vitesse-webext: ⚡️ WebExtension Vite Starter Template
https://github.com/antfu/vitesse-webext

ブラウザ拡張を作るためのリポジトリテンプレートです。TypeScript かつ Vue3 で、ホットリロードが高速と言われている Vite や Windi CSS が設定されており、最新のフロントエンド開発ツールを使ってすぐにブラウザ拡張を作れるようになっています。（僕はフロントエンド詳しくないのであまりツッコまないでください）また、テンプレートでは WebExtension API を利用しているので、Chrome や Firefox などのクロスブラウザで動く準備がすでにできています。

僕も昔いくつか Chrome 拡張機能を作ったことはありますが、色々と面倒だった記憶があります。当時は React や Vue といったフレームワーク、さらに TypeScript も使ってなかったので、現在それらの技術を準備しようとするとさらに面倒だろうなと思います。

そういった背景もあって、個人的に拡張機能を新しく作るのは腰が重かったので、すぐ開発できるテンプレートは嬉しいですね。久々になんか作ってみたいですね。

## actionlint を Node.js で実行する node-actionlint
https://zenn.dev/sosukesuzuki/articles/195f9fc1c7ed73

[先日 GitHub Actions ワークフローの lint を行うツール・actionlint を紹介しました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210715#github-actions-%E3%81%AE%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC%E3%82%92%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%E3%81%99%E3%82%8B-actionlint-%E3%82%92%E3%81%A4%E3%81%8F%E3%81%A3%E3%81%9F---%E3%81%AF%E3%82%84%E3%81%8F%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%A0%E3%81%AB%E3%81%AA%E3%82%8A%E3%81%9F%E3%81%84)が、それを Node.js で実行できる node-actionlint を [@__sosukesuzuki](https://twitter.com/__sosukesuzuki)さんが開発しました。

Node.js プロジェクトに actionlint を導入した場合（例えば `npm run lint` で actionlint が走るなど）、actionlint をインストールしていない人のローカルマシンにインストールさせる必要があり、また CI 環境でも別途インストールする必要があります。`npm install` で開発環境を整備できたら嬉しいですよね。そういった背景から node-actionlint を開発したとのことです。

node-actionlint は `npm install` でインストール可能なので、eslint などと同じような使い勝手で Node.js プロジェクトに導入できます。actionlint を WebAssembly にコンパイルし Node.js 上での実行を可能としています。

さっそく僕も自身のプロジェクトに組み込んでみました[^slow]。Node.js プロジェクトでの actionlint 導入が楽になって良いですね。

[^slow]: ただ、僕の環境では実行に 30 秒強かかってしまいます。Wasm では速度が遅くなるのはしょうがないのかもしれませんが、ちょっと調べてみたいですね。（素の actionlint だと 1 秒もかからない）

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [yuru7/PlemolJP: IBM Plex Mono と IBM Plex Sans JP を合成したプログラミングフォント PlemolJP (プレモル ジェイピー)](https://github.com/yuru7/PlemolJP)
  - IBM のフリーフォントである IBM Plex が日本語対応したらしいです
    - [IBMのオープンソース日本語フォント「IBM Plex Sans JP」の実力をデザイナーが検証してみた：デジタルネイティブのためのフォントとデザイン（1/4 ページ） - ITmedia NEWS](https://www.itmedia.co.jp/news/articles/2107/30/news171.html)
  - PlemolJP は IBM Plex Mono と IBM Plex Sans JP を合成した日本語プログラミング向けフォントです。
  - 全角スペースが可視化されるので、意図せぬ全角スペースに気づきやすくなっています。
- [Yarn 3.0 🚀🤖 Performances, ESBuild, Better Patches, ... - DEV Community](https://dev.to/arcanis/yarn-3-0-performances-esbuild-better-patches-e07)
  - yarn 3.0 が 12 月にリリースされる予定です。この記事では yarn 3.0 で何が大きく変わったかの説明がされています。
  - 1.0->2.0 のような大きな変更はなく、yarn 3.0 への移行は容易とのこと。
  - 個人的には PnP モードでの ESM サポートが入るのを期待したのですが、それは今後の対応となりそうです。
- [GPUベースのターミナルKittyをmacOS用に使いやすく設定する](https://zenn.dev/moisutsu/articles/kitty-for-mac)
  - クロスプラットフォームに対応している GPU ベースのターミナルエミュレータ kitty の紹介記事です。
  - Zoom などの重いアプリが起動していて iTerm2 がもっさりしていても kitty は軽快だとか
  - この記事では macOS 向けの設定方法が載っています。設定ファイルが plist じゃないのが嬉しいですね（iTerm2 は plist）。
  - そもそも GPU ベースのターミナルがあることを知りませんでした。使ってみたいです
- [nicoespeon/abracadabra: Automated refactorings for VS Code (JS & TS) ✨ It's magic ✨](https://github.com/nicoespeon/abracadabra)
  - VSCode 向けの JS、TS の魔法のリファクタリング拡張機能です。`.tsx` や `.vue` にも対応。
  - VSCode で JetBrains IDE の Quick Fix のようなリファクタリングができるようになります。
  - Abracadabra という名前が面白いですね

# あとがき
投稿が大変遅くなってしまい申し訳ありませんでした。土日は何もしてなかったのと、8/2 から 1 週間インターン受け入れが始まって自由に動ける時間がだいぶなくなってしまったのが原因でここまで遅くなってしまいました。初インターン受け入れ、色々準備不足が見つかってなかなか大変ですね。満足いく体験をしてほしい！（2021/08/04 号もちょっと遅くなるかもしれません。）

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 【特集】「USB 3.0」＝「USB 3.1 Gen 1」＝「USB 3.2 Gen 1」? すぐ分かるUSBの「Gen」表記ルール - PC Watch
https://pc.watch.impress.co.jp/docs/topic/feature/1339890.html

USB 3.0、コネクタの裏表が無くなったのはいいですが、形状じゃわからない規格が色々あってよくわかってない人も多いのではないでしょうか？

実は「USB 3.0」は「USB 3.1 Gen 1」であり「USB 3.2 Gen 1」であるそうです（？？？）。この記事では、USB 3 系にひっつく Gen とは何かについて解説しています。

中段くらいにある「USB 3.x の表記ルール一覧」がわかりやすいです。この表を見れば一発で転送速度と呼び名の関係がわかります。

本当にややこしいなーという感じですね。USB 4 では転送速度を表す数字が明記されるようになり、わかりやすくなるそうです。

また、別の記事ですが「USB Type-C」と「Thunderbolt」の違いに関してわかりやすい記事もありました。

【特集】「USB Type-C」と「Thunderbolt」って同じもの？よく分かる最新コネクタ解説 - PC Watch
https://pc.watch.impress.co.jp/docs/topic/feature/1341762.html

USB 4 や Thunderbolt 4 が普及したらここら辺の混乱がマシになりそうです。早く来てほしいですね。