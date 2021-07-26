---
title: "Productivity Weekly (2021-07-21号)"
emoji: "🏄‍♂️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はそのときのネタをまとめたものです。

今回が第 35 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message alert
今週はネタ少なめです...
:::

# know-how 🎓

## State of Testing in DevOps Report
https://www.mabl.com/blog/defining-and-redefining-devops-success-mabl

E2E テスト自動化サービスの mabl が "State of Testing in DevOps Report"（DevOps におけるテストの現状）なるレポートを出していました。「State of」と言えば [State of JS](https://stateofjs.com/) や [State of Developer Ecosystem](https://www.jetbrains.com/lp/devecosystem-2021/) あたりが有名ですね。

今回が第 3 回目であり、世界中の 600 人以上の QA やソフトウェアエンジニアにアンケートを行い、パンデミックが DevOps や CI/CD の導入、開発スピード、品質の向上に対してどのような影響を与えたかを明らかにしたとあります。

この記事ではレポートの結論を述べており、「完全に自動化された DevOps チーム」と「完全に自動化された DevOps をめざすチーム」の違いを簡潔にまとめています。

レポートの全文は無料でダウンロードできます[^free]。
レポートでは以下のようなトピックのアンケートと考察が扱われています。（見出しから抜粋、括弧内は DeepL 翻訳を利用）
- The State of DevOps Maturity（DevOps 成熟度の現状）
- Distribution of DevOps Adoption Across（企業規模別にみた DevOps 導入の分布）
- Culture, Process are the Biggest Roadblocks（文化とプロセスが最大の障害となる）
- Shift in CI/CD Adoption Signals Changing DevOps Priorities（CI/CD 導入の変化は DevOps の優先順位の変化を意味する）
- Teams Maintained Product Velocity Despite the Pandemic（パンデミックにおいてもチームは製品のベロシティを維持する）
- Automation is the Key to a Culture of Quality（自動化は品質の文化の鍵である）
- Quality Differentiates DevOps Teams（品質が DevOps チームを差別化する）
- The Changing Role of QA（QA の役割は変化している）

DevOps がどれくらい浸透しているかや DevOps が実際どういう影響を与えているかを知りたい人におすすめです。

[^free]: ただし、氏名や会社名、メールアドレスなどの登録が必要。

## Is GitHub Copilot a blessing, or a curse? · fast.ai
https://www.fast.ai/2021/07/19/copilot/

機械学習パワーで賢い自動補完をしてくれる GitHub Copilot は祝福なのか？それとも呪いかを考察している記事です。

GitHub Copilot の簡単な説明、使用例から始まり、生成されるコードの問題点や役に立った事例を紹介しながら GitHub Copilot が我々に何をもたらすのかを考察しています。

go のような定型分が多く、メタプログラミングの機能が限られている言語を使う場合や、慣れない言語を扱う経験豊富プログラマが学習用途で使う場合には祝福たりえますが、人によっては学習量が減り、学習速度が遅くなり、技術的負債が増え、バグが起こりうることで呪いとなってしまう。結論から言うと「GitHub Copilot は祝福か、それとも呪いか」という問いに対する答えは、まだわからないと言う結論でした。

具体例が多く説得力のある内容となっているので、気になった方はぜひ読んでみてください。

## 2021年のエンジニア新人研修の講義資料を公開しました - Cybozu Inside Out | サイボウズエンジニアのブログ
https://blog.cybozu.io/entry/2021/07/20/100000

:::message
半分くらいサイボウズの宣伝です。
:::

サイボウズ株式会社が今年もエンジニア研修に使っている資料を公開しました。

サイボウズでは毎年エンジニア研修に使っている資料を公開しています[^2018]。そして先日 2021 年の研修資料が公開されました。過去と同じテーマの講義資料もありますが、内容がアップデートされていたりガラッと中身が変わっていたりするので、去年も見たという方にもおすすめしたいです。

今年はなんと講義資料だけでなく講義動画も一部公開されています。資料には載っていない内容が語られているのでじっくり学びたい人は動画を見るのがおすすめです。

今年増えた講義もいくつかあり、個人的に受講できたものだと、「[IT コミュニティ文化と情報発信に共通する成長と貢献の要素](https://blog.cybozu.io/entry/2021/07/20/100000#IT%E3%82%B3%E3%83%9F%E3%83%A5%E3%83%8B%E3%83%86%E3%82%A3%E6%96%87%E5%8C%96%E3%81%A8%E6%83%85%E5%A0%B1%E7%99%BA%E4%BF%A1%E3%81%AB%E5%85%B1%E9%80%9A%E3%81%99%E3%82%8B%E6%88%90%E9%95%B7%E3%81%A8%E8%B2%A2%E7%8C%AE%E3%81%AE%E8%A6%81%E7%B4%A0)」、「[gRPC 入門](https://blog.cybozu.io/entry/2021/07/20/100000#gRPC%E5%85%A5%E9%96%80)」が面白かったです。

ちなみに、生産性向上チームからは [@miyajan](https://twitter.com/miyajan) が [CI/CD 入門](https://blog.cybozu.io/entry/2021/07/20/100000#CICD)を講義しました。これから CI/CD をやっていくという方におすすめしたい講義です。

気になる方はぜひチェックしてみてください。

[^2018]: 多分 2018 年から。


# tool 🔨

## DeepLによるページ翻訳、PDF上への翻訳表示ができるChrome拡張機能「DeepLopener」の使い方 - Teahat
https://t3ahat.hateblo.jp/entry/How_to_use_DeepLopener

機械翻訳サービスと言えば Google 翻訳が有名ですが、[DeepL](https://www.deepl.com/) という翻訳サービスも負けていません。DeepL は個人的に Google 翻訳より柔軟な翻訳をしてくれるので嬉しいのですが、Google Chrome のような Web ページの翻訳はできません。

この記事で紹介されている DeepLopener ページ翻訳が可能になる Chrome 拡張機能です。レイアウトを維持したまま翻訳できます。

利用には DeepL API の API Key が必要です。以前は有料プランしか存在していなかったのですが、いつの間にか Free プランが登場していたので無料で利用することが可能になりました。（無料版は 1 ヶ月あたり 500,000 文字まで翻訳可能です。）DeepLopener は選択範囲のみの翻訳が可能なので、無料枠の節約も簡単にできます（その分操作に癖があります）。

個人的に一番嬉しいのは `<code>` タグで囲まれた部分が正しい位置に配置されることですね。下記に Google Chrome の場合と DeepLopener の場合の比較を貼りました（翻訳しているページは[ここ](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-credentials-file)）。Google Chrome の場合、翻訳後の `<code>` タグの位置が文の後ろに来てしまうので翻訳結果が非常に読みづらいです。DeepLopener の場合、正しい位置に配置されていることがわかります（タグの範囲がおかしな感じにはなってるけど）。

> ![](https://storage.googleapis.com/zenn-user-upload/fc1048c54d0bdf3cc4996d1d.png)
*Google Chrome の翻訳機能による翻訳*

> ![](https://storage.googleapis.com/zenn-user-upload/935c7e1480919ca842ebc6af.png)
*DeepLopener による翻訳*

さっそく Productivity Weekly 記事を書く際、英語記事を読むために利用しています。やはりコンテンツのレイアウトを維持したまま日本語で表示できるのが嬉しいですね。Google Chrome の翻訳機能に満足できていない方は使ってみましょう。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [A redesigned new user onboarding experience | GitHub Changelog](https://github.blog/changelog/2021-07-19-a-redesigned-new-user-onboarding-experience/)
  - GitHub.coｍで新規アカウントを作成した時のオンボーディング体験が刷新されました。
  - 確認したいけど、GitHub.com は複垢禁止なのもあって確認できない😇
  - 誰か新規アカウントを作った際は Youtube にでも様子をアップロードしてください。
- [Machine translation for Discussions content | GitHub Changelog](https://github.blog/changelog/2021-07-19-machine-translation-for-discussions-content/)
  - GitHub Discussions のコンテンツをその場で翻訳できるようになりました。
  - まずは韓国語、ブラジル・ポルトガル語に対応しています。今後さらに多くの言語を対応予定とのことです。
  - （Issue やプルリクエストでもやってほしい...）


# あとがき
オリンピックの影響で 4 連休でしたね。本当は 4 連休初日くらいに今週号を出したかったのですが、僕のやる気が地の底に落ちていて連休中なんもできませんでした。お許しください。与えられる連休は 3 日くらいがちょうどいいですね。4 日は人をダメにする...

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### REST APIのための自動テストの実践 アジリティのためのテスト・アーキテクチャ：こたうち企画
https://techbookfest.org/product/5060368671965184

REST API の自動テストノウハウが詰まっていそうな本が技術書典 11 で発売されました。REST API サーバの実装から E2E テスト環境、CI の構築までを解説しています。

REST API の自動テスト方法がよくわかっていない方や、もっと良い方法があるのでは？と思っている方は読んでみるといいかもしれません。（僕はまだ読めていないので omake に置きました。）

### マンガでわかるソフトウェアの歴史：pearbook
https://techbookfest.org/product/5514964041203712

マンガでわかるソフトウェアの歴史本です。完全にマンガです。この本も技術書典 11 で発売（0 円）されました。

読んでみましたが、ソフトウェアの歴史をざっくり学べる上、普通に内容が面白いかったです。この作者の方は他にもコンピュータの歴史やネットワークの歴史マンガも出しているので、面白いと思った方はそちらも読むのがおすすめです。

無料で読むことができますが、[投げ銭用のリンク](https://pearbook.booth.pm/)も用意されているので、気に入った方はお金を落としましょう。下書きやイラスト集が読めます。


### ブラウザから3Dモデルをトラッキングできるツール「Kalidoface 3D」が登場 無料で利用可能 | Mogura VR
https://www.moguravr.com/kalidoface-3d/

ブラウザ上で 3D モデルをトラッキングできるサイトが登場しました。記事内にあるリンクを開けばいますぐバーチャルで美しい肉体を体験できます。

でも自分 Zoom 使ってるし...Zoom でもバーチャルの存在になりたいし...という方は OBS (Open Broadcast Software) というツールを併用することでさまざまなビデオ会議ツールに入り込むことができます。

https://ema-hiro.hatenablog.com/entry/2021/07/16/045026

これらを使っているとさすがに PC が重くなってきますが、余裕のある方、余裕はないけどバーチャルの存在になりたいという方はぜひ使ってみてください。
