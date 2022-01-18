---
title: "Productivity Weekly (2022-01-12号)"
emoji: "✍️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220112"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 58 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## マネージド型の監査およびセキュリティレイクである AWS CloudTrail Lake を発表
https://aws.amazon.com/jp/about-aws/whats-new/2022/01/aws-cloudtrail-lake-audit-security/

AWS CloudTrail Lake が発表されました。CloudTrail Lake は [CloudTrail](https://aws.amazon.com/jp/cloudtrail/)[^cloudtrail] のデータをクエリできるツールです。これまでも CloudTrail 上でデータの確認はできていましたが、直近のデータしか調べられなかったり、複雑な検索はできなかったりしたため、Amazon Athena、AWS Glue と組み合わせて利用するのが一般的でした。

AWS CloudTrail Lake はこれまで他サービスを組み合わせる必要があった要素（ストレージやクエリ）を 1 つの製品に統合したものになります。これにより監査ログの分析が楽になります。

さらなる詳細や料金面での話などは既にクラメソさんが記事にしており、とても参考になります。気になる方はこちらもご覧ください。

https://dev.classmethod.jp/articles/aws-cloudtrail-lake-audit-security/
https://dev.classmethod.jp/articles/cloudtrail-lake-pricing/

やはり Athena 関連を用意しなくても分析できるようになったのが楽になって良いなという感想です。まだ実際には使えてないので使ってみようと思います。

[^cloudtrail]: AWS の操作をログに記録するサービス。誰が何をやったのか調べたいときなどに使う。

## Convenience Images & Docker Compose - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/convenience-images-docker-compose/42497

CircleCI が提供するコンビニエンスイメージである cimg/base に Docker Compose v2 が搭載されました[^v2]。また、v1 の互換ラッパーである Docker Compose Switch も含まれるようになりました。Docker Compose v2 は `2021.12` タグから、Docker Compose Switch は `2022.01` タグから利用できます。

これまで CI で手動で v2 をインストールしていた方は楽になって良いですね。`cimg/*` イメージは CI で使われがちなものがプリインストールされていて良いです。

[^v2]: これまでは v1 が搭載されていた。

# know-how 🎓

## colorsなどのnpmパッケージに悪意あるコードが含まれている問題について
https://zenn.dev/azu/articles/d56615b2e11ad1

colors.js という有名 npm パッケージに作者の手で悪意ある変更が追加された件についての影響範囲や対応方法などをまとめた記事です。

:::message
年明けに Faker.js の最新版が中身空っぽでリリースされたと話題を集めました。
この Faker.js の作者が今回悪意ある変更の入った colors.js の作者になります。

> Faker.jsすごいな。毎週100万回以上ダウンロードされてるpackageの最新版が突然中身空っぽでリリースされて、乗っ取りかと思われたけど、npm、GitHub、Twitter全部に同じ主張が投稿されてるらしい。実は乗っ取られてないんじゃないか？と言う説があるっぽい
> https://twitter.com/__syumai/status/1478689419834302465
:::

colors.js はターミナルに出力する文字に色をつける npm パッケージなのですが、年明けに `LIBERTY LIBERTY LIBERTY` などの文字列が出力される変更が追加されました。colors.js は npm の Weekly Downloads が 2578 万（2022/01/18 時点）にいくほど広く使われたパッケージであるため、影響がとても大きいことがわかります。

有名どころの OSS にも影響があったようです。例えば aws/aws-cdk では colors.js のバージョンに `^1.4.0` を指定していたため、インストール時に `1.4.1` などの問題のあるバージョンが入ってしまい、壊れてしまうという問題が起こっていました。（[上記記事](https://zenn.dev/azu/articles/d56615b2e11ad1#%E5%BD%B1%E9%9F%BF%E3%82%92%E5%8F%97%E3%81%91%E3%82%8B%E3%83%91%E3%83%83%E3%82%B1%E3%83%BC%E3%82%B8)には他の例も載っています）

既に npm からは悪意ある変更が入ったバージョンが削除されたため、これから同じ問題に遭遇する可能性はほぼなくなりましたが、上記記事にはバージョンの固定方法の対策方法が載っているため、今後似たようなことが起こった場合に備えて知っておくことをお勧めします。（自身が管理する npm registry のパッケージに依存するソフトウェアでパッケージのバージョンを固定したい場合にも使えるテクニックです。）

今回はイタズラ程度の悪意ある変更でしたが、やろうと思えばもっと大変なことになる変更もできたわけで、こういったサプライチェーン攻撃（に近いもの？）をどうやって未然に防ぐかをちゃんと考えていった方がいいかもしれません。

今回の事件の動機となった OSS の諸問題（OSS の諸問題って言っていいのかはわからない）に関しても色々と考えていきたいですね（全然追っかけられてないからここら辺何も言えない）。

### 関連記事
- [OSSのゆく道：Faker.jsの顛末｜Takahiro Ito｜note](https://note.com/takahiroyte/n/nd6cceae3af04)
- [Open source developer corrupts widely-used libraries, affecting tons of projects - The Verge](https://www.theverge.com/2022/1/9/22874949/developer-corrupts-open-source-libraries-projects-affected)

## TerraformでAWS Chatbotを作成する
https://zenn.dev/shonansurvivors/articles/894cae91806052

Terraform で AWS Chatbot[^aws-chatbot] を管理するための方法を解説した記事です。

Terraform AWS Provider には AWS Chatbot のリソースがないため、正攻法では Terraform で AWS Chatbot を管理できません。この記事では、それでも Terraform で管理したい人のための Terraform モジュール [chatbot-slack-configuration](https://registry.terraform.io/modules/waveaccounting/chatbot-slack-configuration/aws/latest) を紹介しています。

記事では、サンプルコード、なぜ Terraform で管理できるようになるのか、既存の Chatbot を管理下に置きたい場合などが説明されています。なぜ作成できるのかはなるほどねという感じでした[^cfn]。

ただ 3rd Party 製モジュールであるため、どこまで信頼するかという話にはなりそうですが、やはり Terraform で管理できるのは嬉しいですね。

余談ですが、[去年公開された awscc プロバイダー](https://zenn.dev/korosuke613/articles/productivity-weekly-20211020#aws-and-hashicorp-collaborate-on-new-terraform-modules)に [`awscc_chatbot_slack_channel_configuration` リソース](https://registry.terraform.io/providers/hashicorp/awscc/latest/docs/resources/chatbot_slack_channel_configuration)があります。これを使っても AWS Chatbot を管理できるかもしれません。

[^cfn]: 結局のところ CloudFormation 使うしかないのか〜という気持ちもある。
[^awscc]: 実際にできるかどうかはやってみないとわかりませんが...また、AWS プロバイダーとは別なので、併用できるかも正直よくわかっていません。探求したい。
[^aws-chatbot]: AWS Chatbot は AWS から Slack チャンネルまたは Amazon Chime チャットルームに通知を飛ばすためのサービスです。CloudWatch Alarm でアラームを Slack チャンネルに飛ばす際などに使います。

# tool 🔨

## CIで利用するCLIツールをaquaで管理してみよう
https://zenn.dev/zoetro/articles/eee98d772c2483

aqua は様々な CLI ツールを管理するためのツールです。この記事では CI で利用する CLI ツールをメンテナンスしやすく管理する方法が紹介されています。

似たようなツールに asdf がありますが、この記事の著者は asdf について、「インストールする CLI ごとにプラグインをインストールする必要があるなど、あまり使い勝手のよいものではありませんでした。」と述べています。確かに毎回プラグインをインストールしなければいけないのは CI で使う場合非常に面倒なんですよね。aqua の場合は設定ファイル（yaml）にパッケージ名を書き、コマンド 1 つでインストールできるようなので asdf と比べてなるほど使いやすそうです。

この記事では aqua での管理方法だけでなく、インストールした CLI の GitHub Actions でのキャッシュ方法や Renovate の仕組みに載せる方法も説明されており、CI での利用時、とても参考にできそうです。

僕は asdf 使いで aqua を今回初めて知ったのですがなかなか良さそうですね。探究したいです。

:::message
ただ、Node.js の管理は問題があって現在使えないようです。
問題が深刻そうなので誰か解決法を見つけてください...

Remove `nodejs/node` · Issue #1436 · aquaproj/aqua-registry
https://github.com/aquaproj/aqua-registry/issues/1436
:::

# あとがき
今号も遅くなってしまいすみませんでした🙇
実は 2022/01/12 の Productivity Weekly の時僕は佐賀の吉野ヶ里遺跡に行ってたので不参加でした。ほぼ必ず参加してたので不参加は珍しかったです。吉野ヶ里遺跡は楽しかったです。


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### 佐賀県に行ってきました
年末年始、1.5 年ぶりくらいに帰省したのですが、東京に戻る前に佐賀県へ寄ってから帰りました。

[らかんの湯](https://www.mifuneyama.co.jp/hotsprings_a.html)という有名なサウナ目的で、同サウナがある[三船山楽園ホテル](https://www.mifuneyama.co.jp/)という旅館に泊まりました。ホテルチェックインまで時間があったので佐賀県と言えば吉野ヶ里遺跡だろということで吉野ヶ里遺跡こと[吉野ヶ里歴史公園](https://www.yoshinogari.jp/)に寄りました。

https://twitter.com/Shitimi_613/status/1483477844579995648

吉野ヶ里歴史公園は初めて行ったのですが、竪穴住居、物見櫓、高床倉庫などの弥生時代の建物がたくさんあり、そこに行くだけでワクワクできるような場所でした。また、発掘された展示物などもたくさんあったり、掘り出された王の墓・北墳丘墓の内部が展示されてたりと色々と勉強できて楽しかったです。今回はそこまで時間なかったんで隅々までゆっくりと回れなかったんですけど、また行ってみたい場所でしたね。


https://twitter.com/Shitimi_613/status/1483478309375975424?conversation=none

三船山楽園ホテルはサウナ以外の情報ほぼ無しで予約して行ったわけですが、まず入り口から入るとチームラボの作品（灯籠？がいっぱいあるやつ）があって「なんだここは！？」と思いましたね。チームラボの作品は他にも廃墟を使った謎の場所がいくつかあって楽しめました。

お部屋も広い和室で夕食と次の日の朝食は豪華なコース料理でとても美味しく、サウナ関係なく旅館としていい場所だなと思いました。

肝心のサウナですが、巨大な薪サウナや暑めのサウナや冷凍庫から取り出した香り付き氷を溶かしてロウリュするサウナがあり、整えるのはもちろん座ってて楽しいサウナでした。整いスペースは屋外の椅子がいくつかありましたが、それに加えて飲み物や塩プリンや餅が食べれる屋内の整いスペースがあり、これは時間があればいつまでもいれるなという感じでした。

男湯と女湯でサウナの種類や整いスペースが一部異なるのですが、朝と昼以降で入れ替わるので日帰りで行くよりは宿泊で行くのが断然おすすめです。早起きして入るサウナは至福の時でした。

ただ、年明けすぐでとにかく寒く、屋外の整いスペースで整うには寒すぎる感じがしました。もっとあったかい時期にもう一度行きたいですね。

というわけで、今まで福岡に行くまでの通り道という印象が強い佐賀[^saga]でしたが、今回の旅行で一気に認識が変わりました。
これを読んだみなさん、ぜひ佐賀に行ってみてください。

[^saga]: 僕の実家は鹿児島にあり、よく家族で福岡に旅行に行ってたのですが、高速道路使って鹿児島から福岡に行くと、福岡に入ったと思ったら佐賀に入ってまた福岡に入るんですよね。そのおかげで通り道という印象が強かったです。
