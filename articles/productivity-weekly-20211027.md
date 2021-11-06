---
title: "Productivity Weekly (2021-10-27号)"
emoji: "🙏"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: 
  # This block is user-defined.
  publish_link: "https://zenn.dev/korosuke613/articles/productivity-weekly-20211027"
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 49 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message alert

2021/10/27 号がこんなにも遅くなってしまい申し訳ございません。
しかも今回はネタの数もとても少ないです。

:::

:::message alert

また、**2021/11/03 号は祝日で Productivity Weekly 自体をスキップしたため、お休みです。**
2021/11/10 号にご期待ください🙇

:::

# news 📺

## Introducing Test Insights with flaky test detection | CircleCI
https://circleci.com/blog/introducing-test-insights-with-flaky-test-detection/

CircleCI の Test Insights に flaky test（不安定なテスト）を判定する機能が付きました。また、Test Insights の正式リリースと Server 版への対応を予定しているとのことです。

Test Insights は CircleCI 上で実行したテストのパフォーマンスを分析するための機能で、ジョブごと、テストごとの実行時間などを可視化してくれます。（参考：[Test Insights プレビュー版が利用可能です！　- Community - CircleCI Discuss](https://discuss.circleci.com/t/test-insights/39496)）

正確にいつからかはわかりませんが、この Test Insights に Flaky Test が含まれているかどうかを判定する機能が実装されていました。Flaky だと判断された場合、該当テストケースに `FLAKY` ラベルが付与されます。

今後は Test Insights を正式リリースし、数ヶ月のうちに CircleCI Server への対応を予定しているとのことです。さらに Insights API によるメトリクスとデータのインポートやテストファイルの集約や最適化の提案などの改善も検討しているとのことです。

Flaky テスト判定をしてくれるとどのようなテストケースから改善していくかなどの計画が立てやすくなって良いですね。Test Insights のサーバー版対応も嬉しいです。

## Node v16.13.0 (LTS) | Node.js
https://nodejs.org/en/blog/release/v16.13.0/

Node.js v16 が LTS（長期サポート）に移行しました。2022 年 10 月までは Active LTS となり、その後は 2024 年 4 月まで Maintanance となります。

LTS となったことで業務利用もしやすくなりますね。個人的には npm v7 以降が同梱されていることと AbortController が使えるようになることが嬉しいです。[半年前に v16.0.0 がリリースされてから待ち遠しかったです](https://zenn.dev/korosuke613/articles/productivity-weekly-20210428#node-v16.0.0-(current)-%7C-node.js)。

Node.js v16 の主な変更点については [@shisama_](https://twitter.com/shisama_) さんの記事が参考になります。こちらもご参照ください。

https://shisama.hatenablog.com/entry/2021/04/22/090000

## Introducing the organization-level security manager role | GitHub Changelog
https://github.blog/changelog/2021-10-21-introducing-the-organization-level-security-manager-role/

GitHub の Organization に security manager role が登場しました。security manager role をチームに適用すると、そのチームのメンバーに以下の権限が付与されます。

- Org 内のすべてのリポジトリに対する読み取り権限
- Org 内のすべてのセキュリティ警告に対する書き込み権限
- Org レベルの security タブへのアクセス
- Org レベルでの security 設定の書き込みアクセス
- リポジトリレベルでの security 設定の書き込みアクセス

リポジトリのコードやその他のリポジトリ設定への書き込み権限はないが、セキュリティ周りの書き込み権限は持っているため、まさにセキュリティ監査やセキュリティ強化のためのロールという感じですね。

今まではセキュリティ周りのみをいじる人に対して Owner 権限を付与する必要があったため、強すぎる権限を与えるのがネックでした。こういったちょうどいい権限を持ったロールが登場するのは嬉しいですね。

# know-how 🎓

## GitHub Actions for security and compliance | The GitHub Blog 
https://github.blog/2021-10-22-github-actions-for-security-compliance/

セキュリティとコンプライアンスのタスクを GitHub Actions で自動化する方法をいくつか紹介している記事です。

記事中では以下のアクションを紹介しています。

- リポジトリへのアクセスに必要な情報を集めるアクション
- Dependabot や Code scanning の情報を使ってリポジトリがポリシーに違反していないかをチェックするアクション
- トレーサビリティ確保
  - Issue を作るとそれに紐づくブランチやプルリクエストを自動的に作成するアクション
  - プルリクエストが Issue に紐づくことを強制するアクション

生産性向上チームの [@ganta0087](https://twitter.com/ganta0087) が[それぞれのアクションの概要を Twitter のツリーで簡単にまとめている](https://twitter.com/ganta0087/status/1451841368125444096)のでそちらもご参考ください。

これらのチェックを人手で行うのは面倒なので、こういったアクションはなかなか便利ですね。

## terraform plan 結果の検証を自動化するぞ！ with Conftest / Testing terraform plan with Conftest - Speaker Deck
https://speakerdeck.com/korosuke613/testing-terraform-plan-with-conftest

IaC を実現するためのツールである Terraform の plan 結果を自動で検証してみたという内容のスライドです。**実は僕が作ったスライドです。**

terraform plan の結果は JSON 形式で出力できるので、Conftest というツールを使って用意したポリシーに違反しているかどうかをチェックできます。このスライドでは、検証したい項目の具体例を示しつつ、どういったポリシーを書くことで検証を自動化できるかが説明されています。

plan 結果の目視で辛くなった人などは参考にしていただけると幸いです。

:::message

今回の Productivity Weekly まとめが遅くなってしまった理由がこのスライドを作っていたからです。11/2(火)に LT 会での発表があったばかりに、その前の土日を潰してしまったんですよね。

ちなみに発表したイベントは以下のイベントです。自動化が好きなエンジニアの方々におすすめの LT 会なので、知らなかった方はぜひ次回以降参加してみてください。

- [自動化大好きエンジニアLT会 - vol.5 - connpass](https://rakus.connpass.com/event/224448/)
:::

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Kotlin のマスコットが登場！ | The Kotlin Blog](https://blog.jetbrains.com/ja/kotlin/2021/10/introducing-the-kotlin-mascot/)
  - プログラミング言語 Kotlin のマスコットキャラクタが満を辞して登場しました。
  - 海外っぽいデザインだなと思ったのが感想です。
  - 名前を募集しているとのことなので、いい名前を思いついた人がいましたらぜひ応募してみてください。

# あとがき
投稿がえらい遅くなってしまいすみませんでした。LT 会があったり今年の給与交渉の準備をしていたりと、なかなか時間が取れませんでした。~~最近そういうの多いな。~~

2021 年も早くも終わりが迫ってきてて、時の流れは早いと思う毎日でございます。皆さんも悔いがないよう毎日を過ごしましょう。

:::message alert

再掲しますが、**2021/11/03 号は祝日で Productivity Weekly 自体をスキップしたため、お休みです。**
2021/11/10 号にご期待ください🙇

:::

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 東京から富士市に移住してエンジニアとしてフルリモートで働いている
https://blog.koba04.com/post/2021/11/05/moving-away-from-tokyo

コロナをきっかけに東京から静岡県富士市に移住したエンジニアの方の記事です。「移住を決めるまで」、「引っ越しの諸々」、「住んでみてどんな感じか」などを紹介してくれています。

どういうふうに移住先を決めたかや引っ越しで何が大変だったかなどを書いてくれているので、今後地方移住を考えている方には参考になりそうです。

僕は単身者なので地方移住のハードルはそこまで高くないのですが、この方は小学生の子供がいる関係で移住先の小学校がどんなものかを調べたりする必要があったとのことで、なるほどそういうことも考えないといけないのかと思いました。地方移住するなら身軽なうちがいいな...

フルリモートで働ける会社も増えてきてるので地方移住のハードルはだいぶ下がったと思います。今後も東京を離れていく人は増えていきそうですね。僕も東京の家賃が高すぎるので九州あたりに住みたいと思いつつ、東京は東京で楽しいのでまだ腰が重い感じです。（~~敷金やら礼金やら引っ越し費用が高すぎるんじゃ~~）
