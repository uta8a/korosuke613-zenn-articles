---
title: "Productivity Weekly (2022-02-23号)"
emoji: "🇺🇦"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220223"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 64 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## View network transfer information in Resources tab - CircleCI Updates
https://circleci.com/changelog/#view-network-transfer-information-in-resources-tab

https://discuss.circleci.com/t/helping-customers-predict-the-cost-of-enabling-the-ip-ranges-feature-an-update-to-the-resources-tab/43068

CircleCI の Docker エグゼキュータを使うジョブにおいて、ネットワーク転送量を確認できるようになりました。Job 詳細画面の `RESOURCES` タブから In/Out 両方の合算を確認できます。

![](/images/productivity-weekly-20220223/circleci-network.png =300x)
*こんな感じ*

上記 2 つ目のリンク（[Discuss](https://discuss.circleci.com/t/helping-customers-predict-the-cost-of-enabling-the-ip-ranges-feature-an-update-to-the-resources-tab/43068)）では、去年追加された IP 範囲を固定する機能（[IP ranges](https://zenn.dev/korosuke613/articles/productivity-weekly-20210811#ip-%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%81%AE%E7%AF%84%E5%9B%B2%E3%81%AE%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3-%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%82%92%E6%9C%89%E6%96%99%E3%83%97%E3%83%A9%E3%83%B3-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%91%E3%81%91%E3%81%AB%E9%96%8B%E5%A7%8B)）を使用する際のコスト計算や最適化に利用できると書かれています。

また、[CircleCI では 2022/03/01 よりストレージとネットワークが課金対象になる予定](https://circleci.com/docs/ja/2.0/faq/#how-do-I-calculate-my-monthly-storage-and-network-costs)です。ネットワーク転送量を抑えるためにもジョブごとに確認できるようになったのは良いですね。

![](/images/productivity-weekly-20220223/circleci-charge.png =500x)
*https://circleci.com/docs/ja/2.0/faq/#how-do-I-calculate-my-monthly-storage-and-network-costs より*

## Estimated runtime now available for ongoing builds - CircleCI Updates
https://circleci.com/changelog/#estimated-runtime-now-available-for-ongoing-builds

CircleCI で実行中パイプラインの推定残り時間が出るようになりました。パイプラインのステータス下に推定残り時間が表示されます。推定残り時間は以前のパイプラインの実行に基づいているとのことです。あとどれくらいでパイプラインが終わるかわかるのは地味に嬉しい変更ですね。

![](/images/productivity-weekly-20220223/circleci-estimate.png =500x)
*こんな感じ。残り 1 時間 13 分との予測が出ている。*

## Dedicated hosts for macOS - CircleCI Updates
https://circleci.com/changelog/#dedicated-hosts-for-macos

CircleCI において、macOS の専用ホストを利用できるようになりました。

専有ホストとなるので 1 台の物理的な macOS マシンを独占できます（既存の macOS Executor は仮想マシン上での実行です）。専有ホストを利用するメリットとしてはセキュリティが向上すること GPU へのアクセスが可能になることなどが述べられています[^gpu]。ただし、1 時間あたり 100 クレジットの消費となり、最低 24 時間はリースしなければいけません。

これまでの macOS Executor よりもパワフルに使えるため、Apple 製品向けアプリのデベロッパーにとって嬉しい選択肢かもしれません。

[^gpu]: むしろ今までは GPU が使えなかったんですね。

# know-how 🎓

## Cypress + Serve で Chrome拡張機能のE2Eテストを実装する
https://zenn.dev/ryo_kawamata/articles/cypress-extension-testing

Chrome 拡張機能の E2E テスト方法のうちの 1 つについて解説した記事です。テストフレームワークの Cypress と静的ファイルをサーブする serve を組み合わして E2E テストを行なっています。

この記事では、サンプル拡張機能のポップアップのテスト方法、CI のワークフロー、実際に OSS で使っているコードへのリンクなどが載っています。セットアップ方法やテストコード、CI ワークフローの yaml も載せてくれており、今すぐ試すことが可能となっています。

記事を参考に自分も試してみたのですが、とても簡単に試せました（※）。拡張機能のポップアップをテストする方法について全く知見がなかったので大変助かりました。僕みたいな Chrome 拡張機能の E2E テスト方法よくわからんという人におすすめです。

※ 簡単にできるとは書きましたが、M1 Mac を使ってたためか最初のセットアップで苦戦しました。

:::details セットアップで苦戦した話

`pnpm i` をやると `esbuild-darwin-64` が落とせないからインストールができない。

```
❯ pnpm i 
Lockfile is up-to-date, resolution step is skipped
Packages: +762
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Packages are copied from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/korosuke613/.pnpm-store/v3
  Virtual store is at:             node_modules/.pnpm
 WARN  GET https://registry.npmjs.org/esbuild-darwin-64/download/esbuild-darwin-64-0.13.3.tgz error (ERR_PNPM_FETCH_404). Will retry in 10 seconds. 2 retries left.
 WARN  GET https://registry.npmjs.org/esbuild-darwin-64/download/esbuild-darwin-64-0.13.3.tgz error (ERR_PNPM_FETCH_404). Will retry in 1 minute. 1 retries left.
Progress: resolved 762, reused 759, downloaded 0, added 761, done
 ENOENT  ENOENT: no such file or directory, open '/Users/korosuke613/ghq/github.com/korosuke613/e2e-sample-webext/node_modules/.pnpm/esbuild-darwin-64@0.13.3/node_modules/esbuild-darwin-64/package.json'
node_modules/.pnpm/dtrace-provider@0.8.8/node_modules/dtrace-provider: Running install script...
```

関連してそうな Issue。

- [Error: The package "esbuild-linux-64" could not be found, and is needed by esbuild · Issue #1646 · evanw/esbuild](https://github.com/evanw/esbuild/issues/1646)
- [pnpm find wrong bin version when multiple esbuild version exists · Issue #3238 · pnpm/pnpm](https://github.com/pnpm/pnpm/issues/3238)

x86_64 向けの Node.js を用意したりもしたけどダメだったが、以下の手順でやればできた。
（なぜこれでできたのかはよくわかってない）

1. `pnpm install ---lockfile-only`
2. `pnpm i`

この後は手順通り行けた。

:::

## Renovate の大量の Pull Request を処理する技術 - スタディサプリ Product Team Blog
https://blog.studysapuri.jp/entry/2022/02/18/080000

Terraform の巨大モノレポでの Renovate の運用ノウハウについてをまとめた記事です。Terraform の巨大モノレポを題材としていますが、汎用的に使える技も載っています。

この記事では、大量のプルリクエストを短時間で処理する必要がある背景、解決方法、結果などが説明されています。解決方法で挙げてる 10 個の設定項目にはそれぞれに設定する理由や注意点などが載っていて親切です。

（特に Terraform の）モノレポで Renovate を利用している方にはとても参考になりそうだと思いました。依存関係更新は大変ですが、だからと言ってやらないわけにはいかないので、どんどん人間の負担を減らしていきたいですね。

## CI/CDをリポジトリ分割し、CircleCIの設定ファイルのメンテナンス性を向上させた話 - サーバーワークスエンジニアブログ
https://blog.serverworks.co.jp/2022/02/25/142741

巨大な `.circleci/config.yml` を CI と CD で分割し、かつ、ダイナミックコンフィグを使って各設定ファイルも分割したことで保守性を向上させたという話です。

記事では、課題、対策方針、対策の詳細などが書かれており、巨大 config.yml に困っている方は参考にできるかもしれません。

:::message
[ダイナミックコンフィグ](https://zenn.dev/korosuke613/articles/productivity-weekly-20210331#%E3%82%BB%E3%83%83%E3%83%88%E3%82%A2%E3%83%83%E3%83%97%E3%83%BB%E3%83%AF%E3%83%BC%E3%82%AF%E3%83%95%E3%83%AD%E3%83%BC(%E3%83%A2%E3%83%8E%E3%83%AC%E3%83%9D%E5%AF%BE%E5%BF%9C)-%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%81%AB%E5%8F%82%E5%8A%A0%E3%81%97%E3%82%88%E3%81%86%EF%BC%81---community---circleci-discuss)は去年の 3 月ごろに登場した CircleCI の新機能で、config.yml を動的に組み立てられます。なかなか便利です。ダイナミックコンフィグについては以下の記事がわかりやすいです。

- [Dynamic Configurationを使って.circleci/config.ymlを分割する](https://zenn.dev/kesin11/articles/96f0947583f34d)
:::

## Sigstore によるコンテナイメージの Keyless Signing - Flatt Security Blog
https://blog.flatt.tech/entry/sigstore_keyless_signing

[先日話題になってた](https://zenn.dev/korosuke613/articles/productivity-weekly-20220209#sigstore%E3%81%AB%E3%82%88%E3%82%8B%E3%82%B3%E3%83%B3%E3%83%86%E3%83%8A%E3%82%A4%E3%83%A1%E3%83%BC%E3%82%B8%E3%82%84%E3%82%BD%E3%83%95%E3%83%88%E3%82%A6%E3%82%A7%E3%82%A2%E3%81%AE%E7%BD%B2%E5%90%8D---knqyf263's-blog) Sigstore と OpenID Connect を活用して GitHub Actions 上で Docker イメージを署名する方法などを解説している記事です。

記事では、Sigstore の説明、ローカルの鍵を用いた署名方法、OIDC を活用した署名方法（Keyless Signing）などが載っています。特に OIDC と GitHub Actions を活用した署名方法にはワークフロー例も載っているのですぐに Docker イメージの署名ができます。イメージ提供者はこれを機に署名し始めてもいいかもしれません。[以前紹介した記事](https://knqyf263.hatenablog.com/entry/2022/02/06/213003)と合わせて参考になると思います。

:::message
この記事には署名の検証方法も載っています。しかし、[以前紹介した記事](https://knqyf263.hatenablog.com/entry/2022/02/06/213003#%E6%A4%9C%E8%A8%BC)にあった `cosign verify` をするだけでなく、利用するイメージのダイジェストと比較しなければならないと不十分であるという点については載っていなかったので Productivity Weekly 内で話題になりました。（正直僕自信が完全に理解していると思ってない中これを書いてるので気になる人は自分でも調べてみてください）

> これで終わり、と言いたいところですが実はこれでは不十分です。表示されているJSON内の `critical.image.docker-manifest-digest` の値と自分の手元にあるコンテナイメージのdigestを比較する必要があります。あくまで表示されているJSONの署名が正しい、つまりJSONの完全性と真正性を証明しただけで、今使おうとしているコンテナイメージについては何も証明できていません。
> *https://knqyf263.hatenablog.com/entry/2022/02/06/213003#%E6%A4%9C%E8%A8%BC*


:::

# tool 🔨

## PlanetScaleというサーバレスDBが凄く勢いのあるサービスらしいのでQuick Startやってみた - Qiita
https://qiita.com/tak001/items/cfbaa9dcb542929ff235

PlanetScale というサーバレスな DB サービスの紹介記事です。よくあるマネージドな DB サービスとの主な違いは水平スケーリングシステムやブランチ機能、自動バックアップ機能を備えているところのようです。記事では、サービス概要や料金（無料枠も）、登録方法や Quick Start のレポなどが載っています。

ブランチ機能を使ってスキーマの変更を簡単に検証できるのは面白い機能だなと思いました。また個人で使う分には十分すぎる無料枠があるのも気になりますね。色々やって遊びたいです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Electronの代替を目指す軽量なRust製フレームワーク「Tauri」、リリース候補版に到達 － Publickey](https://www.publickey1.jp/blog/22/electronrusttauri.html)
  - デスクトップアプリを HTML/CSS/JS で開発できるクロスプラットフォームなフレームワーク Erectron の代替を目指すフレームワーク「Tauri」が RC になったという記事です
  - Rust 製で軽量とか
  - 内部的には Chromium を使ってないので Electron の完全な代替にはならなさそうだけどそれでも互換性は改善されてきてるらしい
- [Gists Now Support Mermaid Diagrams | GitHub Changelog](https://github.blog/changelog/2022-02-28-gists-now-support-mermaid-diagrams/)
  - [Mermaid が GitHub のマークダウンでレンダリングされるようになりました](https://zenn.dev/korosuke613/articles/productivity-weekly-20220216#include-diagrams-in-your-markdown-files-with-mermaid-%7C-the-github-blog)が、Gist でもレンダリングされるようになりました
- [Online FlowChart & Diagrams Editor - Mermaid Live Editor](https://mermaid.live/)
  - Mermaid のライブエディタです
  - サンプルをすぐ呼び出せたりいろんな形式で出力できるのは良いですね
- [All npm accounts are now enrolled in login verification | GitHub Changelog](https://github.blog/changelog/2022-03-01-all-npm-accounts-are-now-enrolled-in-login-verification/)
  - npm において、2FA を有効にしてない全ての npm アカウントはログイン時にワンタイムパスワードがメールで届くようになったらしいです
  - 2FA の代わりにはならないので 2FA を有効にしましょう
- [k8sの各種CDツールを比較する - pospomeのプログラミング日記](https://www.pospome.work/entry/2022/02/19/153136)
  - k8s の CD ツールまとめ
  - ArgoCD しか使ったことないんだけどこんなにたくさんあるんだという気持ち。
- [GmailのネイティブmacOSアプリを元Appleエンジニアが開発 - iPhone Mania](https://iphone-mania.jp/news-440669/)
  - 元 Apple の人が開発してる Gmail の macOS 向けクライアントアプリについて
  - まだベータ
  - インストールしてみたけどまさかの日本語対応してて驚いた
  - 僕は Gmail 以外も使ってるので [Spark](https://sparkmailapp.com/ja) というメールクライアントを愛用しています
- [alacritty+tmuxもいいけど、weztermがすごい件](https://zenn.dev/yutakatay/articles/wezterm-intro)
  - Rust 製のクロスプラットフォームなターミナル wezterm の紹介
  - カスタマイズ性がすごい、tmux 相当のターミナルマルチプレクサを内蔵してるとか
    - でも色々機能がないようなので必ずしも tmux の代替にはならなさそう

# あとがき
遅れてすみません。~~なんとか 1 週遅れで済んだ。~~今週号はネタの数が多くて小ネタが多くなってしまいました。エルデンリングはじめてみたんですけど、ソウルシリーズやったことなかったので右も左もわからず四苦八苦してます。

https://twitter.com/Shitimi_613/status/1501360726966878212

そういえば、**生産性向上チームは今年もサマーインターンを開催するので、興味のある方は是非エントリーください！**（エントリーは 4/25 開始の予定）

去年のインターン生が参加ブログも書いてくれたので気になる方はそちらもご覧ください。

https://note.com/hysrtr/n/nd13916204c6c

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### Spark を開発している Readdle はウクライナ企業だった
https://twitter.com/Shitimi_613/status/1500334384448421890

僕は昔から PDF ビューアの [PDF Expert](https://pdfexpert.com/ja) っていうアプリやメールクライアントの [Spark](https://sparkmailapp.com/ja) っていうアプリを愛用しているのですが、それらを開発している企業 Readdle からウクライナ支援の寄付のお願いメールが来てました。

まさか Readdle がウクライナの企業だとは知らなかったので驚きました。このメールに載っている「寄付」は Readdle に対してではなくウクライナに対する寄付なのですが、上記アプリでお世話になっていることと、今後も良いソフトウェアを開発していってほしいという気持ちから僕もウクライナに寄付しました。

個人的にはウクライナを応援してるので寄付しようかな〜とは漠然と考えてたんですけど、行動には移れていませんでした。このメールを読んだときに「いますぐ支援しないと」いう気持ちになってすぐ寄付しましたね。

結局何が言いたいのかというと、[PDF Expert](https://pdfexpert.com/ja) も [Spark](https://sparkmailapp.com/ja)も非常に良いアプリなので知らなかった人はぜひ使ってみてください。
