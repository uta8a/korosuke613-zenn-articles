---
title: "Productivity Weekly (2022-01-05号)"
emoji: "🌄"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220105"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 57 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message
開けましておめでとうございます🎍
投稿が大変遅れてしまいすみません。成人式あたりの連休に有休をプラスして豪遊してました。
:::

# news 📺

## GitHub Actions: Changing the search order for self-hosted runners | GitHub Changelog
https://github.blog/changelog/2022-01-04-github-actions-changing-the-search-order-for-self-hosted-runners/

Github Actions においてジョブ実行時にセルフホストランナーを探す時の挙動が変わりました。以前まではリポジトリ所属のランナー、Organization 所属のランナー、Enterprise 所属のランナーの順に探していましたが、今は所属に関係なく、最初にマッチしたランナーがジョブを実行するようになったようです。

また、この変更により、特に多くのランナーを抱える Organization や Enterprise ではより早くセルフホストランナーにジョブを送れるようになったとのことです。

どれくらい早くなったのかはわかりませんが、待ち時間が減るのは嬉しいですね。

## Update the routing logic based on recent changes by hross · Pull Request #9307 · github/docs
https://github.com/github/docs/pull/9307

GitHub Actions において、登録されているセルフホストランナーが 1 台も無い場合にジョブが即失敗せずにキューに積まれるように変更されていました。

以前は登録されているセルフホストランナーが 0 台の場合、セルフホストランナーを必要とするジョブは直ちに失敗していました。そのため、常に 1 台以上のランナーを登録しておく必要がありました。しかし、常にランナーを起動するとその分コストがかかってしまうため、登録だけして起動はしないオフラインランナーと呼ばれるものを用意するテクニックがありました。これで解決かと思うかもしれませんが、このオフラインランナーは最大 60 日で GitHub に登録を解除されてしまうという仕様があるため、定期的にオフラインランナーを登録しなければいけませんでした。

今はランナーが登録されてなくてもジョブが即失敗しなくなり、キューに積まれるようになりました[^queue_24]。したがって、ジョブが生まれてから 24 時間以内にランナーを登録＆起動すれば良いことになります。

リリースノートの記載は見つけられませんでしたが、[プルリクエスト](https://github.com/github/docs/pull/9307/files#diff-414971700923a8877f83fe98ab88782398ac0f64096eb95b94c49c10a8ef776dR73)を見る限り GitHub Enterprise Server では 3.3 からの変更のようです。

このオフラインランナーを定期的に登録する仕組みを用意＆保守するのが面倒だったのですが、必要なくなるのはとても嬉しいです。

[^queue_24]: キューに積まれたまま 24 時間経過するとジョブは失敗します。

## IP ranges Pricing Model - Announcements - CircleCI Discuss
https://discuss.circleci.com/t/ip-ranges-pricing-model/42464

以前紹介した [CircleCI Cloud の IP ranges 機能](https://zenn.dev/korosuke613/articles/productivity-weekly-20210811#ip-%E3%82%A2%E3%83%89%E3%83%AC%E3%82%B9%E3%81%AE%E7%AF%84%E5%9B%B2%E3%81%AE%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3-%E3%83%97%E3%83%AC%E3%83%93%E3%83%A5%E3%83%BC%E3%82%92%E6%9C%89%E6%96%99%E3%83%97%E3%83%A9%E3%83%B3-%E3%83%A6%E3%83%BC%E3%82%B6%E3%83%BC%E5%90%91%E3%81%91%E3%81%AB%E9%96%8B%E5%A7%8B)が 1/28 より正式リリースされ、有料オプションとして提供されるようになります。

IP ranges 機能はジョブから発生するネットワークトラフィックの IP アドレス範囲が限定できるという機能です。ジョブからアクセスするシステムに IP 制限を課している場合などに穴を開けやすくなります[^hole]。

これまでは有料プランユーザ向けのプレビューという形でしたが、1/28 からは全ユーザに対して有料オプションとして提供されます。有効になっているジョブの通信量(GB)ごとに 450 クレジットを消費します。

:::message
ジョブ開始前に Docker イメージの pull に使用する通信料は発生しないとのことです。

> Data used to pull in the Docker image to the container before the job starts executing will not incur usage costs for jobs with IP ranges enabled.
> https://circleci.com/docs/2.0/ip-ranges/#pricing
:::

GB あたり 450 クレジットを高いと見るか安いと見るかは人それぞれだと思いますが、本当に必要な部分以外は別ジョブに移すなど対策をして通信料を節約したいですね。


[^hole]: プライベートなネットワークに穴を開けることの是非はここでは話しません。

# know-how 🎓

## ファイルの編集と置き換えの違い または シェルスクリプトの安全な置き換え - mrwk update
https://mrwk.hateblo.jp/entry/2021/12/30/145427

年末を騒がせた[京大スパコンファイル消失事件](https://www.iimc.kyoto-u.ac.jp/ja/whatsnew/information/detail/211228056999.html)の原因となったシェルスクリプト実行中の上書きに関する挙動を解説した記事です。

UNIX 系 OS におけるファイルの「編集」と「置き換え」の違いについて、シェルスクリプトの編集で事故が起きる仕組み、安全な上書き手順などについて、わかりやすく丁寧に説明してくれています。

編集と置き換えの違いは正直全く理解できていませんでした。ツールによって動作が異なるのも把握していくのがなかなか大変です。

シェルスクリプト実行中の上書きに関しては [bash スクリプトの実行中上書き動作について](https://zenn.dev/mattn/articles/5af86b61004bdc) の記事も詳しく説明してくれています。シェルスクリプトを 1 行ずつ読み込んで実行している処理系があることを知りませんでした。

ファイルの上書きには気をつけたいですね...

## アジャイル・DevOpsからDeveloper Productivityへ ~食べログのDeveloper Productivityチームが目指す姿~ - Test Automation
https://kokotatata.hatenablog.com/entry/2021/12/23/051947

食べログに最近誕生した Developer Productivity チームの紹介記事です。まず Developer Productivity Engineering[^dpe]の歴史について説明し、その後チーム、取り組みを紹介しています。

中長期目標の決めるために開発サイクルの課題分析を行っており、課題の見つけ方や目標の立て方として参考にできそうです。最高のテスト体験を実現するための分析を行い、10%のテスト自動化で 74%のテスト工数を削減できることを導き出し、実際に自動化するなど、なかなか面白そうな取り組みも行っています。

実は僕がいるチームも生産性向上チームという Developer Productivity に関係することを色々やっています（余談ですが、生産性向上チームと比べると活動内容が少しテスト寄りだと感じました）。他社に似たようなチームが増えるのは嬉しいですね[^devprod]。参考にしていきたいです。

[^dpe]: 工学的に見た開発生産性のこと？
[^devprod]: 他にも DeNA に [SWET](https://engineering.dena.com/team/quality/swet/) があったりサイバーエージェントに [Developer Productivity 室](https://www.cyberagent.co.jp/way/features/list/detail/id=25235)があったりします。


## Terraform のVersion 1.1がGAになりました | DevelopersIO
https://dev.classmethod.jp/articles/terraform-1-1-generally-available/

Terraform v1.1 の日本語解説記事です。それぞれの変更点について試してみた結果や何が嬉しいかなどを説明してくれています。

個人的には `moved` ブロックは便利だけどファイルに残るの微妙だなとか思っていたのですが、以下の記述を見てなるほどと思いました。

> 例えば自分が公開モジュールを作っていて、自分以外の人がそのモジュールを利用しているような状況だったらどうでしょうか？リファクタリングした後に利用者全員に「terraform state mvを使ってね」と伝えるのは無理があります。

例えば [tfmigrate](https://github.com/minamijoyo/tfmigrate) を導入していれば `moved` はそこまで積極的に使わなくてもいいのかなと思っていたのですが、モジュールを作っている場合こういうメリットがあったのですね（それはそれとして公式の機能で十分なら公式の機能を使った方がいいという話もある）。

Terraform v1.1 の英語記事読んでも一部の機能がよくわかんなかった人などにおすすめです。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

# あとがき
開けましておめでとうございます🎍

投稿が大変遅れてしまいすみません。成人式あたりの連休に有休をプラスして豪遊してました。
年も明けたので正月ボケはこれくらいにして、次号である 2022/01/12 号も早めに書きます。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message
すみません。今号のおまけはお休みです。次号はなんか書きます。
:::
