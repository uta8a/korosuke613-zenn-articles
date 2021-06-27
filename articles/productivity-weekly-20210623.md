---
title: "Productivity Weekly (2021-06-23号)"
emoji: "🍭"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 31 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

:::message warning
今週号ですが、僕の工数不足で説明してるネタが少なめです...ご了承ください。
:::

# news 📺

## Dependabot now schedules version updates uniformly | GitHub Changelog
https://github.blog/changelog/2021-06-16-dependabot-now-schedules-version-updates-uniformly/

Dependabot が実行される時刻を指定できるようになりました。

これまでは毎日、毎週、毎月のいづれかのみ指定可能で、実行される時間は午前 5 時(UTC)に固定されていました。その結果、処理が集中したため全てのユーザの更新が遅くなってしまうという問題があったそうです。

これからはタイムゾーンと詳細な時刻を指定できるようになったため、開発に合わせて更新タイミングを決めることができるようになりました。また、もし詳細な時刻を設定しない場合はランダムな時刻が割り当てられるようです。

まだまだ Renovate ほどの柔軟さはありませんが、Dependabot も最近の更新でだんだんと使いやすくなってきましたね。今後に期待です。

## GitHub Packages Container registry is generally available
https://github.blog/2021-06-21-github-packages-container-registry-generally-available/

GitHub Packages Container registry が GA となりました。（`docker.pkg.github.com` ではなく `ghcr.io` の方です。）

もともと[GitHub Packages 登場時からコンテナイメージを扱うことはできていました](https://github.blog/2019-05-10-introducing-github-package-registry/)（`docker.pkg.github.com`）。しかし、Packages の仕様上、パブリックイメージの pull にも認証が必要だったり、イメージのドメインにリポジトリ名が入ったりと使い勝手はいまいちな印象でした。

そんな中、[2020 年 9 月に GitHub Container Registry がベータリリースされました](https://github.blog/2020-09-01-introducing-github-container-registry/)（`ghcr.io`）。こちらはパブリックイメージの pull に認証が不必要だったりイメージがユーザや組織に紐づくことでドメインにリポジトリ名が入らなくなったりと Packages に比べて使い勝手が良いものでした[^compare]。

そして先日 GitHub Container Registry が正式リリースされました。しかし名前は GitHub Packages Container registry に変わったようです。ややこしい。
正式リリースに伴い、従来の Docker Registry(`docker.pkg.github.com`)は Container Registry(`ghcr.io`)に統合されます。Docker Registry に公開していたイメージは自動的に Container Registry に移行されるようです。また、これまで通り `docker.pkg.github.com` からの pull もできます。気になる料金について、現在は無料で利用できますが、今後課金を開始する予定とのことです。

この記事には Container Registry を活用している事例も紹介されています。例えば Homebrew は bottle のホスティングに利用しているようです[^brew]。

コンテナイメージの配布も GitHub で手軽にできるようになりました。GitHub 内で完結するのは嬉しいですね。有効活用していきたいです。

[^compare]: ちょっと古いですが、ここら辺の比較は右の記事がわかりやすいです。[GitHub Container Registry 入門 - 生産性向上ブログ](https://www.kaizenprogrammer.com/entry/2020/09/03/060236#GitHub-Packages-と-GitHub-Container-Registry)

[^brew]: いまいち Homebrew の仕組みをよくわかっていないんですけど、bottle が全て Container Registry でホスティングされてるってどういうことなんですかね？記事を読む感じ Container Registry は OCI イメージをサポートしているからこそ、コンテナイメージだけでなくバイナリもホスティングできるようです。ちょっと気になるので調べてみたいですね。

# know-how 🎓

## S3の暗号化方式についておさらい 2021.06 - Bouldering & Com.
https://shrkw.hatenablog.com/entry/2021/06/18/083000

Amazon S3 の各暗号化方式の Pros/Cons をまとめた記事です。以下の暗号化方式が説明されています。

- SSE(Server Side Encryption)
  - SSE-S3
  - SSE-KMS
  - SSE-C
- CSE(Client Side Encryption)

暗号化する必要のあるバケットを作る際やそもそも S3 の暗号化について知らない人には参考になると思います。

# tool 🔨

## 個人/組織のOSS貢献を可視化する - 貳佰伍拾陸夜日記
https://tarao.hatenablog.com/entry/2021/06/14/160248

個人や組織の OSS 貢献を可視化するためのツール tarao/oss-contributions の作者による紹介記事です。このツールを実行することで貢献してきたリポジトリとその詳細の一覧を出力できます。

さっそく僕も自分の GitHub アカウントで OSS 貢献を可視化してみました。
https://gist.github.com/korosuke613/873c3aafb0e1ad89604f75a4bfc4f403

今までのコミットやプルリクなどが一覧になって出ましたね。僕は正直 OSS 貢献できてないので大した結果にはなっていませんが、今までこういうコミットとかしてたなあと懐かしくなりました。OSS 貢献が活発な人にとっては嬉しいものとなりそうです。


# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [GitHub Actions: Environments, environment protection rules, and environment secrets are generally available](https://github.blog/changelog/2021-06-22-github-actions-environments-environment-protection-rules-and-environment-secrets-are-generally-available/)
  - GitHub Actions の Environments が GA となりました。GA に伴う変更やお知らせはなさそうです。
- [Infrastructure as Code に関する技術書籍を執筆しました - How elegant the tech world is...!](https://iselegant.hatenablog.com/entry/2021/06/19/231213)
  - 各 IaC ツール・サービスの比較本が発売されます。
  - この本では CloudFormation、AWS CDK、Terraform、Pulumi を取り上げています。この 4 つのサービス全てを使ってきた方もなかなかいないのではないでしょうか？気になります。
- [ずっと無料で使えるクラウドの「Free Tier」主要サービスまとめ。2021 年版 － Publickey](https://www.publickey1.jp/blog/21/free_tier2021.html)
  - 各種クラウドサービスの無料枠まとめです。勉強したい人にもタダで使い倒したい人にもおすすめ。
- [みずほ銀行システム障害に学ぶ | 川口耕介のブログ](https://ja.kohsuke.org/software/mizuho-outage/)
  - 先日あったみずほ銀行システム障害のまとめ記事です。同障害の調査報告書の内容を読む場合や、最低限知っておきたい場合に際に参考になると思います。
- [Apple シリコン（M1）にネイティブ対応した「GitHub Desktop 2.9」がリリース](https://forest.watch.impress.co.jp/docs/news/1333014.html)
  - GitHub Desktop が Apple シリコンに対応し増田。また、マージ時に `squash`、`rebase` もできるようになりました。


# あとがき
今週は平木場のプライベートが忙しく、なかなか時間が取れなかったので、公開が日曜日となってしまいました...申し訳ないです..
毎日あらゆる生産性向上記事が出ています。ネタの鮮度が落ちる前に Productivity Weekly 記事を出していけるように僕自身の生産性を上げて上げてがんばりたいです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### MOONGIFT更新停止のご連絡 MOONGIFT
https://www.moongift.jp/2021/06/moongift%e6%9b%b4%e6%96%b0%e5%81%9c%e6%ad%a2%e3%81%ae%e3%81%94%e9%80%a3%e7%b5%a1/

株式会社 MOONGIFT が OSS 紹介ブログ MOONGIFT の更新を恒久的に停止することを発表しました。2021/07/16 までは更新し、その後は開発者向けマーケティング支援サービスの[DEVREL](http://devrel.jp/)に注力していくとのことです。

こちらのブログですが、なんと 2004 年からほぼ毎日欠かさず 2-4 つの OSS を紹介していたようです。すごい...すごすぎる....

僕もこの Productivity Weekly の記事を毎週書いていますが、正直毎週でも非常に大変です。書きたい、続けたいという意思はあっても、やる気が出なくてモチベーションが低い時もあるし、めちゃくちゃ忙しい週はそれどころじゃなかったりします。それを毎日、しかも 15 年強も続けていたっていうのには思わず脱帽です。

僕は MOONGIFT の存在を知らなかったのですが、これまでの記事を眺めると生産性の上がりそうなまだ見ぬ OSS がたくさん紹介されていそうなので、過去記事および 7/16 まで追加される記事をネットサーフィンしていきたいなと思いました。

