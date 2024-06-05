---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-05-22)
emoji: 🥠
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240522
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-05-22 単独号です。

今回が第 153 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Updated dates for Actions runner using Node20 instead of Node16 by default - The GitHub Blog
https://github.blog/changelog/2024-05-17-updated-dates-for-actions-runner-using-node20-instead-of-node16-by-default/

GitHub Actions で JavaScript の action を動かすための Node.js のバージョンが v16 から v20 に変更される予定についての続報です。
この変更内容については 2024-03-13 の Productivity Weekly で詳しく解説していますので、合わせてご覧ください。

https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240313#github-actions%3B-all-actions-will-run-on-node20-instead-of-node16-by-default---the-github-blog

3 月のアナウンスでは 5/13[^node20_enforce_schedule]から v20 が強制的に利用される予定でしたが、その日程が 6/30 に延期となったようです。

また前回のアナウンスからの差分として、ランナーに内蔵されている Node.js v16 が 10 月に削除されることが告知されています。よって、オプトアウト用の `ACTIONS_ALLOW_USE_UNSECURE_NODE_VERSION=true` を設定して v16 を使い続けていたとしても、10 月以降はそれも不可能になるようです。

もしまだ v20 に対応していない action を利用されている場合は、最新バージョンで v20 に対応しているかを確認するなどして、そろそろ v16 へ依存しないようにしておきましょう。

[^node20_enforce_schedule]: 過去のアナウンスの[原文](https://github.blog/changelog/2024-03-07-github-actions-all-actions-will-run-on-node20-instead-of-node16-by-default/)を見直したら 5/13 ではなくて 2024 年の春と書かれていました。もしかしていつの間にか原文の方が書き換えられた・・・？


_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Actions: Upcoming changes to GitHub-hosted macOS runners - The GitHub Blog
https://github.blog/changelog/2024-05-20-actions-upcoming-changes-to-github-hosted-macos-runners/

GitHub Actions において、macOS ランナーの最近・今後の変更が発表されました。これまで発表されてた内容と被る部分が多いですが、今後の変更がまとまってます。

- 全ての `macos-latest` が macOS 14 を使うようになった
- macOS 11 の削除が 6/28 に決定
  - ユーザに削除を意識させるために、6/17, 19, 24, 26 の特定の時間（EST）に macOS 11 ランナーが使えなくなる
  - 以前から 2024/06 末までに削除することは告知されていた
- macOS ランナーの IP レンジを確認できるようになった
  - [GET /meta](https://docs.github.com/en/rest/meta/meta?apiVersion=2022-11-28#get-github-meta-information) の API レスポンスに含まれる、`actions_macos` を参照することで取得できる
    - ```json:gh api /meta
        "actions_macos": [
          "13.105.117.0/31",
          "13.105.117.10/31",
          "13.105.117.100/31",
          "13.105.117.102/31",
      ```
  - IP アドレスは不変ではないことに注意

特に macOS 11 ランナーを利用している人は早く移行するようにしましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Introducing GitHub Copilot Extensions: Unlocking unlimited possibilities with our ecosystem of partners - The GitHub Blog
https://github.blog/2024-05-21-introducing-github-copilot-extensions/

GitHub Copilot に Extensions 機能が追加されました（リミテッドパブリックベータ）。

Copilot Extensions は、Copilot に特定のサービスやツールを統合するための機能です。例えば、[Docker extension](https://www.docker.com/blog/preview-docker-extension-for-github-copilot/) の場合、Docker に関する質問への回答の精度が上がるだけでなく、リポジトリの内容から Dockerfile を生成させてそのままプルリクエストを作成させるや、Docker Scout を使って脆弱性の検出をさせることもできるようです。

他にも、Microsoft 365 や Sentry、DataStax などのサービスが拡張機能の提供に名乗りを上げています。
現段階で利用できる Copilot Extensions は次の通りです。

![](/images/productivity-weekly-20240522/github_copilot_extensions.png)
*https://github.com/marketplace?type=apps&copilot_app=true*

しかし、この機能はまだリミテッドパブリックベータであり、だんだんと使えるユーザが増えてくるようです[^private_beta]。
なお、Copilot Business、Copilot Enterprise を利用している場合、Organization レベルで Copilot Extensions をインストールする必要があるようです。

> Anyone can install a Copilot Extension on their personal account. However, if they get access to Copilot through a Copilot Business or Copilot Enterprise subscription, they will only be able to use the extension if it is installed at the organization level.
https://docs.github.com/ja/copilot/github-copilot-chat/github-copilot-extensions/installing-github-copilot-extensions-for-your-organization#about-installing-github-copilot-extensions-for-your-organization

また関連する情報として、今回の Copilot Extensions は[自前で実装することも可能なようです](https://code.visualstudio.com/api/extension-guides/chat)。こちらに関しては、試してみた方が記事を書いており、どんなものなのかわかりやすいです。

- [GitHub Copilotをカスタムできる? VS CodeのChat extensionsとは](https://zenn.dev/yuma_prog/articles/vscode-chat-extension)

GitHub Copilot を 3rd party が拡張できるようになることで、より多くのユースケースに対応できるようになりますね。僕も触ってみたいものです。

Copilot Extensions について詳しく知りたい方は[ドキュメント](https://docs.github.com/ja/copilot/github-copilot-chat/github-copilot-extensions/about-github-copilot-extensions)も参照ください。

[^private_beta]: それはもう private beta と読んでもいいんじゃないのと思った。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## AIラジオ『zenncast』の技術構成（プロンプトつき）
https://zenn.dev/himara2/articles/db054d81b05d19

## TypeScript Custom GitHub Action Development Tips - Speaker Deck
https://speakerdeck.com/peaceiris/typescript-custom-github-action-development-tips

## GitHub Actionsの痒いところを埋めるサードパーティーランナー - Speaker Deck
https://speakerdeck.com/dora1998/github-actionsnoyang-itokorowomai-merusadopateiranna

## E2Eテストワークフローを高速化・安定化させる取り組み | ドクセル
https://www.docswell.com/s/r4mimu/ZXYR73-2024-05-16-184345

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [New agent capabilities in Microsoft Copilot unlock business value | Microsoft 365 Blog](https://www.microsoft.com/en-us/microsoft-365/blog/2024/05/21/new-agent-capabilities-in-microsoft-copilot-unlock-business-value/)
- **know-how 🎓**
- **tool 🔨**
  - [@power-assert/node: power-assert custom hook for Node Test Runner](https://github.com/twada/power-assert-monorepo/tree/main/packages/node)
    - > Node.jsが自前でテスティングフレームワークやassert関数、ESM読み込み時のカスタムフックなどを備える時代になったので、--importするだけで動くpower-assertを作りました
    https://x.com/t_wada/status/1792394995498205185

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
