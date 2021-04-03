---
title: "Productivity Weekly (2021-03-31号)"
emoji: "💐"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 20 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## セットアップ・ワークフロー(モノレポ対応) プレビューに参加しよう！　- Community - CircleCI Discuss
https://discuss.circleci.com/t/topic/39578

CircleCI において、セットアップ・ワークフローという機能が使えるようになりました。（プレビュー）

セットアップ・ワークフローを利用することで、動的にコンフィグを生成したり、動的に実行するワークフローを決定したりできるようです。また、セットアップ・ワークフローと組み合わせて、変更されたファイルとパイプラインで使うパラメータのマッピングが容易にできる（例えば、変更のあったファイルに関するワークフローのみ実行するのに使える) Path-filtering Orb もリリースされました。

記事ではセットアップ・ワークフローの仕組みや利用方法が解説されています。僕はまだ使えてないので本質が理解できてるか怪しいので、この後使ってみようと思います[^orb]。

[^orb]: CircleCI Cloud の方はあまり使ってないため、Orb のことや version: 2.1 のことがよくわかってないです。紹介する以上はちゃんと使っていかなきゃ・・・

## Packages: Container registry now supports GITHUB_TOKEN - GitHub Changelog
https://github.blog/changelog/2021-03-24-packages-container-registry-now-supports-github_token/

GitHub Container Registry(ghcr.io) が GitHub Actions の GITHUB_TOKEN で認証できるようになりました。

ghcr.io は GitHub が提供しているコンテナレジストリです（docker hub みたいなもの）。これまで、Actions 上で ghcr.io へイメージをプッシュするには、そのリポジトリの write 権限を持つユーザの Personal Access Token(PAT)で認証する必要がありました。これからは Actions で標準で使える GITHUB_TOKEN を使用して ghcr.io の認証ができます。もう PAT は必要ありません。

PAT はリポジトリごとに設定できないので、スコープを絞っても強い権限を有してしまうためなるべく減らしたいです。対して [GITHUB_TOKEN はワークフローを実行中のリポジトリに対する権限しか持っていない上、ジョブ終了後に期限が切れます。](https://docs.github.com/en/actions/reference/authentication-in-a-workflow)すでに Actions 上から ghcr.io へイメージをプッシュしている方は PAT を revoke して GITHUB_TOKEN を利用するようにしましょう。

## Packages: internal visibility now available for Container registry - GitHub Changelog
https://github.blog/changelog/2021-03-24-packages-internal-visibility-now-available-for-container-registry/

GitHub Container Registry(ghcr.io) でイメージの可視性に Internal を選択できるようになりました。Internal[^internal] にすると Enterprise アカウントに所属するメンバー（outside collaborator を含まない）がそのイメージの Read 権限を持つことになるため、イメージを利用してもらうために Organization やリポジトリへそのメンバーを追加する必要がなくなります。

docker イメージを組織(Enterprise)内で共有するのが簡単になって良いですね。

[^internal]: Enterprise 配下の Organization ではしばしばリポジトリの可視性に Internal が使われると思います。詳しくはこちら。 https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/about-repository-visibility#about-internal-repositories

## S3 Object Lambda で、S3 GET リクエストに独自のコードを追加して、データがアプリケーションに返されるときにデータを変更および処理することが可能に
https://aws.amazon.com/jp/about-aws/whats-new/2021/03/s3-object-lambda-allows-you-to-add-your-own-code-to-s3-get-requests-to-modify-and-process-data-as-it-is-returned-to-an-application/

AWS の S3 バケットに置いたオブジェクトを GET する際に、Lambda 関数を挟めるようになりました。保存されている Object の中身を Lambda 関数で書き換え、呼び出し元に返すことが可能になります。

これまでに似たようなことをやりたかった場合、例えば Lambda 関数と API Gateway を用意してエンドポイントを作るなどの方法がありました。S3 Object Lambda を使うことで Lambda 関数のみを用意するだけでいいので、場合によっては開発が楽になるかもしれません。

しかし、おそらく手元に落とすまでの速度は Lambda を挟む分遅くなるでしょう（未確認）。パフォーマンスを気にしなければならない場合は S3 Object Lambda を使わず、先に整形済みのオブジェクトを格納しておくなどをした方が良いと思います。

使用例など詳しい説明はクラメソさんが記事を出しているのでそちらが参考になると思います。
https://dev.classmethod.jp/articles/s3-object-lambda/

# know-how

## レビュアーにやさしいリファクタリングPRを作る
https://zenn.dev/mugi/articles/87f8be66989e62

リファクタリングを行ったプルリクエストのレビューは辛くなりがちな問題を緩和するためのノウハウが書かれた記事です。たしかにリファクタリングを行ったプルリクエストの差分はごちゃごちゃして読みづらいため、記事に載ってるような心掛けは大事だと思います。

「レビュアーにやさしい〜」というタイトルですが、未来の自分に少しでも優しくなるために個人開発においても使えるノウハウだと思うため、リファクタリングのコミット・プルリクエストについてあまり深く考えたことがない人は読んでみることをおすすめします。

## Google Testing Blog: Test Flakiness - One of the main challenges of automated testing (Part II)
https://testing.googleblog.com/2021/03/test-flakiness-one-of-main-challenges.html

[去年末、Flaky test(不安定なテスト)についての話が盛り上がっていました。](https://zenn.dev/korosuke613/articles/e82445a43782b1#flaky-test-%E3%81%AE%E8%A9%B1%E3%81%8C%E7%9B%9B%E3%82%8A%E4%B8%8A%E3%81%8C%E3%81%A3%E3%81%A6%E3%82%8B%E3%81%A3%E3%81%BD%E3%81%84%E3%80%82) この時 Google も Flaky test になってしまう原因や関連記事をまとめた記事を公開していました。

今回の記事は 12 月の記事の第二弾(Part II)となります。第二弾の記事では、Flaky test が発生する可能性のある 4 つの要素それぞれについて、不安定になってしまう理由、トリアージのヒント、解決策が列挙されています。

Flaky test を生まないために学ぶのにも使えるだけでなく、不安定なテストがある場合のチートシートとしても利用できそうです。

## 実践ATDD 〜TDDから更に歩みを進めたソフトウェア開発へ〜
https://speakerdeck.com/hgsgtk/atdd-by-genba-example

受け入れテスト駆動開発（ATDD[^atdd_alias]）について紹介したスライドです。ATDD の考え方や実際に導入してみた例が具体的に解説されています。

開発手法の 1 つにテスト駆動開発（TDD[^tdd_alias]）があります。TDD は「動作するきれいなコード」を書くための手法です。目的のコードを書くより先にそのコードのテストを書くことで、コードの記述時にリファクタリングが行いやすくなり、きれいなコードを実現できます[^tdd]。ざっくり学びたければ t_wada さんの[スライド](https://speakerdeck.com/twada/tdd-live-in-50-minutes)が、しっかり学びたければ t_wada さんが訳した[テスト駆動開発本](https://www.amazon.co.jp/exec/obidos/ASIN/4274217884/twada-22/)が参考にできると思います。

TDD はユニットテストを先に書くことで「動くきれいなコード」を書くための手法でした。ATDD はユーザーストーリーの受け入れテストに着目した開発手法で、ストーリー受け入れテストを先に書くことで、ユーザーストーリーの理解の促進や受け入れ条件の明確化、チーム内での認識の共通化などを目的としています[^atdd]。また、ATDD と TDD はスコープや目的が異なるため、それぞれの手法を組み合わせることができます。

と、自分なりの簡単なまとめを書きました。このスライドではもっと詳細な説明や実践する目的、詳細な実践方法などが大ボリュームで載っているので、（全ての記事に言えることですが）興味のある方は読むことを強くおすすめします。

[^tdd]: という認識ですが間違ってたら教えてください。
[^atdd]: こちらもそう認識しましたが、間違ってたら教えてください...
[^tdd_alias]: Test-Driven Development の略。
[^atdd_alias]: Acceptance Test-Driven Development の略。

# tool
## asdf のススメ - esm アジャイル事業部開発者ブログ
https://blog.agile.esm.co.jp/entry/managing-multiple-tool-versions-with-asdf

いろんなランタイムのバージョン管理ができる asdf というツールの紹介記事です。複数の言語のランタイムをバージョン管理できるツールに anyenv がありますが、asdf は言語以外のランタイムもバージョン管理できるため、さらに汎用的なランタイムバージョン管理ツールと言えます。

anyenv は正確には〇〇env(nodenv や tfenv など)を管理するツールですが、それぞれの〇〇env はインターフェースが揃っていない(例：tfenv とそれ以外)ため、体験がよくないこと場面がありました。また、〇〇env にない CLI ツールのバージョンを固定したいような場面もあります（例：チーム開発でチーム全員が特定のバージョンの CLI に揃える必要がある時など）。asdf を使うことでそういった問題が解消されると考えます。

この記事ではインストールから利用するまでが載っているので、どんなものか知りたい人はこれを読んで試しに使ってみると良いと思います。僕も試しに anyenv から移行して試してみます。

# あとがき
今週はプライベートが忙しくてなかなか書く時間が取れなかったため、公開が遅くなってしまいました。Productivity Weekly の記事も今回で（note 時代も合わせて）20 回目になります。自分でもよく毎週書けてるなって思いますね。各記事の紹介には僕の簡単な説明や考えが載っていますが、あまり詳しくない分野の記事もネタに上がることがあり、詳しくない分野の記事を紹介して良いのか？本当にこの説明は正しいのか？など不安になることもあります。（その都度調べてはいるのですが..）そういったネタは紹介しないべきなのか、Productivity Weekly で出た以上は誰かしらの役に立つということなので紹介するべきなのかをよく迷います。答えは見つかってないので良い感じで調整していきたいです。

また、このシリーズを情報収集の手段の 1 つとして使ってくれてるという嬉しい声もたまに聞きます。今後も継続的にやっていきたいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

:::message warning
今回はそれっぽいおまけが浮かばなかったのでガチで関係ない話です。
:::

### 仮面ライダー生誕50周年！
https://twitter.com/HKR20_official/status/1377999276593192967?s=20

仮面ライダーが生誕 50 周年の記念日を迎えました。めでたいですね。僕も仮面ライダーが大好きです。子供の頃にちょうど平成ライダー第一号の仮面ライダークウガが始まって、その後高校生までは大体の作品はリアルタイムで見てきました。（大学生からは宮崎の大学に進学したのですが、民放が 2 局しかなかったため仮面ライダーは半年遅れでしか見れなくなりました。）

好きな作品はたくさんあって選びきれません。龍騎、剣、555 などまだ出血表現があった平成 1 期のライダーも好きですし、W、フォーゼ、ビルドなどの少しポップになった平成 2 期ライダーも好きです。もちろんアマゾンズも。

やっぱりストーリーや演出が大人でも楽しめるのが仮面ライダーの良いところですね。視覚的な表現は年々ゆるくなっている気がしますが、やっぱり大人でも楽しめる作品なのは変わらないところはすごいと思います。

ただ、令和ライダーになってからは 50 話観る元気もなくなってきちゃって、さっぱり観れてません。悲しいですね。
仮面ライダー観たことない方がいましたらぜひ観てください。