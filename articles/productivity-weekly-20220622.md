---
title: "Productivity Weekly (2022-06-22号)"
emoji: "🪖"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220622"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 79 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## GitHub Copilot is generally available to all developers | The GitHub Blog
https://github.blog/2022-06-21-github-copilot-is-generally-available-to-all-developers/

GitHub Copilot が GA になりました。GitHub Copilot はコーディング中にコンテキストを加味したコードを提案してくれるサービスであり、約一年間プレビュー機能として無料で利用できました。

今回 GA となったことで、GitHub Copilot が有料化されました。無料トライアルとして 60 日使うことができ、そのあとは $10/month or $100/year の料金がかかります。
学生や有名 OSS の開発者は無料で利用できます。

また、個人向けではなく企業向けのプランは今年後半に提供予定です。

GitHub Copilot と言えば、[自動生成されるコードのライセンスが怪しいという問題](https://zenn.dev/korosuke613/articles/productivity-weekly-20210715#julia-reda-%E2%80%93-github-copilot-is-not-infringing-your-copyright)がありましたが、いつの間にか [public なコードに一致する候補は使用しないオプション](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-in-a-jetbrains-ide#enabling-or-disabling-duplication-detection)が増えているので、これを使うのが無難かもしれません。

また、[Copilot 利用者が書いてるコードスニペットを収集されないようにするオプション](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-in-a-jetbrains-ide#enabling-and-disabling-telemetry)もあります。このオプションのおかげで企業での利用もしやすいかもしれません。

GitHub Copilot が有料になり料金を払ってまで利用する価値があるかどうかは人それぞれな感じがありますね。トライアルもできるのでよくわかってない人は試しに使ってみましょう。

:::message
GitHub Copilot の有効化画面に行くと以下の記述が出てきました。

> Thank you for being part of the GitHub Copilot technical preview. You can continue to use GitHub Copilot for free until August 22, 2022.

テクニカルプレビューに参加していた方は 2022/08/22 まで無料で触れるようです。GA になったのが 2022/06/21 なので、ちょうど 2 ヶ月くらい。
無料トライアル 60 日の話はまだ GitHub Copilot を全く触っていない人向けかもしれません。
:::

## Block potentially destructive Git pushes | GitHub Changelog
https://github.blog/changelog/2022-06-15-block-potentially-destructive-git-pushes/

GitHub において、1 回の push で更新できるブランチやタグの数を制限できるようになりました（ベータ）。

`--mirror` オプションをつけて変更を push した時の対策だと説明されています。このオプションがついているとリモートリポジトリはローカルリポジトリと同じ状態になるため、ローカルリポジトリにないブランチやタグがリモートリポジトリから消え去ってしまいます。作業中のブランチであれば同僚が再 push すればいいですが、タグとなるとみんなローカルに持っているわけじゃないので大変です。

`--mirror` は複数ブランチやタグの更新を同時にプッシュするため、今回の機能で 1 回で同時にプッシュできる回数を制限することでブランチやタグの損失を防ぐことができます。
設定から有効にでき、デフォルトは現在 5 となっています（2-100 まで設定可能）。

どの数字が適切かを GitHub は知りたいとのことなので、防止したい方は設定してみましょう。
個人的には基本的に有効にして制限を下限値まですればいいんじゃないかなと思っています。リポジトリのデフォルト設定にしてほしいです。

# know-how 🎓

## Developers Summit 2022 Summer（2022.07.21）
https://event.shoeisha.jp/devsumi/20220721

Developers Summit 2022 Summer が 2022 年 7 月 21 日に開催されます。
なんと今年のテーマは「アジャイル・DevOps 時代のプロダクトとエンジニア組織を支える、Developer Productivity への道」なので、生産性を向上できるネタをたくさん仕入れられそうです。

オンライン配信で参加費無料となっているので、気になる人はご参加ください。

ちなみに、今年は生産性向上チームの平木場（Productivity Weekly 書いてる人）が「生産性向上は一筋縄でいかない ～改善を進める上で生じる課題との付き合い方～」というタイトルで発表しますので、興味ある人はぜひ見にきてください。
https://event.shoeisha.jp/devsumi/20220721/session/3841/

## Dev Container が VSCode から CLI にもやって来た
https://zenn.dev/hankei6km/articles/devcontainers-in-cli-ci

[先日登場した dev container CLI](https://zenn.dev/korosuke613/articles/productivity-weekly-20220525#development-container-cli) を実際に試してみたという記事です。

使用方法や Docker Compose との組み合わせ方、CI での利用方法などが説明されています。気になった挙動や著者が気になった点なども書かれており、実際に試してみないとわからないことがたくさん書いてあります。

引数が展開されない話や GitHub Actions でも利用できる話は個人的に参考になりました。dev container CLI を試したい方は試す前に読んでみるのをお勧めします。

ちなみに現時点では stop が実装されておらずコンテナを止められないようなので、本格的な利用は少し待った方がいいかもしれません。

# tool 🔨

## Terraform 1.3でoptional()によるobject attributes(variable)へのデフォルト値設定が楽になる！
https://zenn.dev/jrsyo/articles/83bbcff7e08ab8

今後リリースされる予定の Terraform 1.3 にて、object な variable へのデフォルト値設定が楽になる変更が入るようです。

これまで何が面倒だったかは説明が難しいので記事を読んでください。端的に言うと、これまで object な variable の一部メンバを `optional()` で設定している場合、variable 自体の default と `optional()` がうまく組み合わさらないため、`defaults()`(experimental)を組み合わせることで無理やりうまくできていたが、定義が冗長で直感的でないと言う問題がありました[^setsumei]。

今回の変更により、`optional()` にデフォルト値も設定できるようになるので、object に対して直感的かつシンプルにデフォルト値が書けるようになります。
object な variable を使うモジュールを開発していた方には嬉しい変更ですね。無事リリースされてほしいです。

[^setsumei]: とにかく説明がむずい。

## 「DeepL」でWebページ全体を丸ごと翻訳できる公式のGoogle Chrome拡張機能【レビュー】 - 窓の杜
https://forest.watch.impress.co.jp/docs/review/1418082.html

DeepL 公式の Chrome 拡張機能（ベータ版）でページ全体を翻訳し翻訳結果をページに反映できるようになりました。（Pro 版のみ対応）

[以前紹介した DeepLopener](https://zenn.dev/korosuke613/articles/productivity-weekly-20210721#deepl%E3%81%AB%E3%82%88%E3%82%8B%E3%83%9A%E3%83%BC%E3%82%B8%E7%BF%BB%E8%A8%B3%E3%80%81pdf%E4%B8%8A%E3%81%B8%E3%81%AE%E7%BF%BB%E8%A8%B3%E8%A1%A8%E7%A4%BA%E3%81%8C%E3%81%A7%E3%81%8D%E3%82%8Bchrome%E6%8B%A1%E5%BC%B5%E6%A9%9F%E8%83%BD%E3%80%8Cdeeplopener%E3%80%8D%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9---teahat) でもページに反映する形の翻訳が可能でしたが、とうとう公式拡張機能が対応した形になります。

対応言語のページに行くと翻訳するかどうかのポップアップが表示され、ページ全体を翻訳可能です。

実際に使ってみたところ、ポップアップが毎回出てくるため結構気になります。ページや言語を除外することでポップアップが出ないようにできるのですが、除外してしまうと拡張機能アイコンから呼び出したときに「<ドメイン>を翻訳しない設定になっています。settings で変更できます。」と表示され、すぐには翻訳できなくなってしまいます。この部分がちょっと使い勝手悪いです。

とは言えまだベータ段階なので、今後改善されるかもしれません。公式拡張機能なので期待したいですね。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [Cloudflare outage on June 21, 2022](https://blog.cloudflare.com/cloudflare-outage-on-june-21-2022/)
    - 先日（2022/06/21）あった、Cloudflare の障害報告です
    - 誤った設定をデプロイしてしまったとか
    - 驚くべきなのはこの記事の公開スピードです。障害の次の日にこのレベルの内容が出せるのはすごいと思いました
  - [Montereyと(After)Shokzの相性問題とその解決方法](https://songmu.jp/riji/entry/2022-02-25-shokz-monterey.html)
    - 骨伝導ヘッドセットとして有名な Shokz 製品が macOS と相性が悪いようです
    - 問題と解決方法がまとまっています
    - Shokz の骨伝導ヘッドセットを利用しようとしてる人は読んでおくといいかもしれません
- **tool 🔨**
  - [友達と個人開発したChrome拡張が便利すぎた](https://qiita.com/kakudenbuzo/items/6b283c60a68c68169c17)
    - GitHub において、Issue をページ遷移せずにサイドバーとして表示できたり、Issue タイトルを簡単にコピーできたりする拡張機能です
    - 結構便利そうですが、業務で使っても大丈夫かどうかは確認した方がいいと思うので注意してください
      - ソースコードが公開されてない
        - 拡張機能なのでインストール後でソースコードを見ようと思えば見られるのですが、可読性が悪いので見る気になりません

# あとがき
上でも書きましたが、デブサミ 2022 サマーにおいて、「生産性向上は一筋縄でいかない ～改善を進める上で生じる課題との付き合い方～」というタイトルで登壇するので、興味ある人はぜひ見にきてください。
https://event.shoeisha.jp/devsumi/20220721/session/3841/

↑のおかげで最近忙しかったです。まだまだ忙しいのですが、簡易版があんまり続くのもアレなので今週号は普通に書きました。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->

## omake 🃏
今週のおまけです。

### 「418 I'm a teapot」が永久欠番（？）に ～25年前の発行されたジョークRFCの後始末 - やじうまの杜 - 窓の杜
https://forest.watch.impress.co.jp/docs/serial/yajiuma/1418689.html

https://asnokaze.hatenablog.com/entry/2018/10/18/185401

HTTP ステータスコード 418 は「I'm a teapot[^teapot]」という意味で有名ですが、この 418 番は Unused として予約されることになりました。元々RFC2324 で定義されている 418 は HTTP ではなく HTCPCP のステータスコードであるためですね。

418 は既にイースターエッグとして利用されていることから新たに意味が割り振られて混乱が起きないよう予約されることとなったようです。

418 と言えば [Google が 418 を返すページを用意](https://www.google.com/teapot)してたり、[ロシア国防省が特定の IP アドレスに対して 418 を返したり](https://twitter.com/Bakoma/status/1497004381325398017)といったことがありましたね。

418 は I'm a teapot という意味ではなくなります。ちょっとさみしいですがしょうがないですね。

[^teapot]: ティーポットなのでレスポンスは返せないよって言う意味っぽい。ティーポットにリクエストを飛ばすなってことで 4XX なのだろうか。
