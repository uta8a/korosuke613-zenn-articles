---
title: "Productivity Weekly (2021-06-16号)"
emoji: "💉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 30 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺
## Codecov Bash Uploader 関連セキュリティインシデントの続報

約 2 ヶ月前に [Codecov Bash Uploader のセキュリティインシデント](https://zenn.dev/korosuke613/articles/productivity-weekly-20210421#bash-uploader-security-update---codecov)があったことはまだ記憶に新しいと思います。先日 Codecov はこの問題に関する情報をいくつか公開しました。

### Post-Mortem / Root Cause Analysis (April 2021) - Codecov
https://about.codecov.io/apr-2021-post-mortem/
今回のインシデントのポストモーテム[^postmortem]です。

攻撃者はオンプレ版 Codecov の Docker イメージの中間レイヤーから Google Cloud Storage の HMAC キーを取得して Bash Uploader を書き換えたとのことです。
Bash Uploader を廃止し、新たにシングルバイナリで配布することや、イメージの中間レイヤーに機密情報が残らないようにマルチステージビルド、スカッシュビルド[^squash]を利用することなどといった対策が記されています。また、共有すべきいくつかの教訓も載っています。

同じ轍を踏まないように参考にしたいですね。

### Validating the Bash Script on CI - Codecov
https://about.codecov.io/blog/validating-the-bash-script-on-ci/

Bash Uploader のハッシュ値検証方法です。検証するためのコードスニペットが載っています。また、最新の GitHub Action、CircleCI Orb にはスクリプトの検証が含まれているとのことです。

### Introducing Codecov's New Uploader - Codecov
https://about.codecov.io/blog/introducing-codecovs-new-uploader/

Bash Uploader の代わりとなる新しいアップローダーについての情報です。curl | bash 方式だとセキュリティ問題が多いことから、Node.js で書かれたシングルバイナリで配布されるアップローダーが新たにベータ版としてリリースされました。

これまでのアップローダーは 9/1 からブラウンアウト（定期的に動かない時間帯を設ける）が始まり、来年 2/1 には完全に動作しなくなるとのことです。

[^postmortem]: インシデントの事後分析や再発防止策などを記した文書です。参考：[Google - Site Reliability Engineering](https://sre.google/sre-book/postmortem-culture/)
[^squash]: squash オプションのこと知りませんでした。Dockerfile が描きやすくなって便利ですね。2,3 年前にはすでにあった機能のようですが、まだ experimental なのが気になります。参考：[Docker Experimental Features を有効化すると使える docker build の --squash オプション - kakakakakku blog](https://kakakakakku.hatenablog.com/entry/2019/06/19/194501)

## Toward Vagrant 3.0
https://www.hashicorp.com/blog/toward-vagrant-3-0

HashiCorp 社は仮想環境構築ツール Vagrant のバージョン 3.0 へ進むにあたっての計画を発表しました。

Vagrant 3.0 では実装が Ruby から Go へ移行されます。2.3、2.4 にかけて段階的に移行され、3.0 からは完全に Go 実装の Vagrant となるようです。また、HCL(HashiCorp Configuration Language)[^hcl]ベースの新 Vagrantfile がサポートされます。Ruby ベースの従来の Vagrantfile やプラグインを使用するためにはホスト PC に Ruby をインストールする必要があります。他にも新機能の搭載や性能改善が計画されています。

従来の Vagrantfile から HCL ベースの Vagrantfile に移行するのは大変そうですが、3.0 でさらに使いやすくなりそうです。楽しみですね。

[^hcl]: Terraform を書くときの言語です。


## Manual pipeline run button - CircleCI Changelog
https://circleci.com/changelog#manual-pipeline-run-button

ついに CircleCI で GUI からパイプラインを手動実行できるようになりました。GitHub Actions の `workflow_dispatch` に近いものだと思いますが、リリース情報以外の場所での情報がまだないようなので[^mitsukerarenai]、詳細はわかりません。

すでにクラウド版では使えるようになっており、実行しようとすると以下のようなダイアログが出てきて実行できます。
![](https://storage.googleapis.com/zenn-user-upload/a5bab1374908ed3e491a7cea.png =550x)

「Run pipeline」をクリックすると、そのブランチに設定されているワークフローが実行されます。もしパラメータを渡せれば、手動実行時のみ動かすワークフローを設定できるかもしれません。詳細が明らかになるのが楽しみですね。

[^mitsukerarenai]: 探したのですが見つけられませんでした...

## Private Orbs for All Paid Plans - CircleCI Changelog
https://circleci.com/changelog#private-orbs-for-all-paid-plans

CircleCI の全ての有料プランで Private Orbs が使えるようになりました。これまでは Scale Plan でのみ Private Orb が利用可能でしたが、これからは Performance Plan でも 3 個まで Private Orbs が使えるようになりました[^scale]。

Private Orbs は組織内で共有できます。頻繁に登場する共通する処理などを一元管理できるようになって良いですね。Performance Plan を利用している方は要チェックです。

[^scale]: Scale Plan は今まで通り無制限で使えます。
# know-how 🎓

## Google Testing Blog: How Much Testing is Enough?
https://testing.googleblog.com/2021/06/how-much-testing-is-enough.html

「どれだけテストを行えば十分なのか」を明確にするためのヒントを紹介した Google Testing Blog の記事です。

この記事では、テスト戦略を定義するのに役立つ考慮事項や経験則か以下の tips として紹介されています。

- プロセスや戦略を文書化する
- ユニットテストの強固な基盤を持つ
- 統合テストにも手を抜かない
- クリティカルなユーザージャーニーのエンドツーエンドのテストを行う
- 他の層のテストを理解し、実施する
- コードや機能のカバレッジを把握する
- 現場からのフィードバックを活用し、プロセスを改善する

テスト戦略を考える上で参考にできそうです。

## GitHub Actionsに「強い」AWSの権限を渡したい ~作戦3 - AssumeRole with Google ID Token ~ - KAYAC engineers' blog
https://techblog.kayac.com/assume-role-with-google-id-token

以前、「[GitHub Actions に「強い」AWS の権限を渡したい / AWS credentials on Actions - Speaker Deck](https://zenn.dev/korosuke613/articles/productivity-weekly-20210526#github-actions%E3%81%AB%E3%80%8C%E5%BC%B7%E3%81%84%E3%80%8Daws%E3%81%AE%E6%A8%A9%E9%99%90%E3%82%92%E6%B8%A1%E3%81%97%E3%81%9F%E3%81%84-%2F-aws-credentials-on-actions---speaker-deck)」というスライドを取り上げました。そのスライドでは GitHub Actions 上で `terraform apply` するために強い AWS の権限を渡す方法が紹介されていました。新しいこの記事では、3 つめの新たな作戦を紹介しています。

作戦 3 のコンセプト自体は作戦 1（MFA トークン使うやつ）と同じですが、MFA トークンではなく Google ID Token を使うことで 1 分間しかなかった有効期限を 1 時間にでき、作戦 1 と比較して実用性が増しています。また、作戦 2(CloudShell を使うやつ)と比べて外部サービスを経由しない分セキュリティが向上しています。

この記事では作戦 3 の具体的方法も紹介されており、同じことをできそうですが、設定が複雑で大変そうなので、設定するには体力が必要そうです。

# tool 🔨

## Strykerを使ってTypeScriptでMutation Testingする
https://zenn.dev/daikik/articles/8cd20776991a9c

JavaScript/TypeScript 向けのミューテーションテストフレームワーク StrykerJS の紹介記事です。

ミューテーションテストではテスト対象コードを変更することで意味のあるユニットテストであるかを測定できます。StrykerJS を使うことで、テスト対象コードの変更とミューテーションテストの実施、結果の出力ができます。

この記事では StrykerJS の使い方を説明しつつ、ミューテーションテストがなぜ嬉しいかを解説してくれているので、JS/TS でミューテーションテストをしたい人だけでなくミューテーションテストをよく知らない人にもおすすめです。僕もちょっと触ってみようと思います。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [古くなった AMI にフラグを立てる新しい AMI プロパティが Amazon EC2 に追加](https://aws.amazon.com/jp/about-aws/whats-new/2021/06/amazon-ec2-adds-new-ami-property-to-flag-outdated-amis/)
  - AMI の廃止（非推奨）タイミングを設定できるようになりました
  - 非推奨になると AMI 所有者以外にはデフォルトで表示されなくなります
  - クラメソさん記事：[[アップデート]AMI に非推奨となるまでの有効期限を設定できるようになりました](https://dev.classmethod.jp/articles/amazon-ec2-adds-new-ami-property-to-flag-outdated-amis/)
- [API Testing Tools in JavaScript - DEV Community](https://dev.to/asaianudeep/api-testing-tools-in-javascript-22d8)
  - JavaScript の API テストツール比較記事です
  - それぞれのツールで何ができて何ができないかが表になっています
  - ただ、この記事を書いた人はツールの 1 つである PactumJS のメンテナーなのでバイアスがかかっていそうです

# あとがき
東京大阪にある新型コロナウイルスワクチンの大規模接種センターでとうとう 64 歳以下の人も接種できるようになりましたね。僕も来週ワクチン打ってきます。早くアフターコロナが来ないものか...

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### Microsoftは2025年までにWindows 10のサポートを終了する予定 - GIGAZINE
https://gigazine.net/news/20210614-microsoft-windows-10-support-end/

Microsoft は次世代 Windows を発表するようですが、その前に Windows 10 のサポート終了が発表されました。Windows 10 は Windows の最後のバージョンだと聞いていたのでこれには驚きました。もし Windows11 みたいなのが次世代 Windows として登場するなら「Windows 10 が Windows の最後のバージョンになる」は嘘になります。もしくは Windows の名前を捨てて全く新しい OS が発表されるのでしょうか？気になる...

https://www.windowscentral.com/windows-11-build-21996-has-leaked-new-desktop-ui-and-more

そんな中、次世代 Windows と思われる Windows 11 のリーク情報が出てきましたね。本当かどうかわかりませんが、見た感じあんま Windows10 と変わっていませんね（個人の感想）。僕は新しい物好きなのでガッツリ変えてくれた方が個人的には嬉しいです。（ていうか Linux ベースにしてほしい）

サポート終了の話が出た以上 Windows10 は本当に終わるようです。次世代 Windows の発表は日本時間で 2021 年 6 月 25 日 0 時からあります。楽しみですね。
