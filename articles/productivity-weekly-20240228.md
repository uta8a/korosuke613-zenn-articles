---
title: GitHub Copilot Enterprise GA 🎉 など｜Productivity Weekly(2024-02-28)
emoji: 📸
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined: 
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240228
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
今週は 2024-02-28 単独号です。

今回が第 144 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## GitHub Copilot Enterprise is now generally available - The GitHub Blog
https://github.blog/2024-02-27-github-copilot-enterprise-is-now-generally-available/

[去年の GitHub Universe で発表された](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231115?redirected=1#universe-2023%3A-copilot%E3%81%8Cgithub%E3%82%92ai%E3%82%92%E9%A7%86%E4%BD%BF%E3%81%97%E3%81%9F%E9%96%8B%E7%99%BA%E8%80%85%E3%83%97%E3%83%A9%E3%83%83%E3%83%88%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%B8%E3%81%A8%E5%A4%89%E8%B2%8C%E3%81%95%E3%81%9B%E3%82%8B---github%E3%83%96%E3%83%AD%E3%82%B0)、GitHub Copilot Enterprise が早くも GA になりました。

GitHub Copilot Enterprise は GitHub Copilot for Business の上位プランに当たります。
コア機能としては、次の 3 つが掲げられています。

- 組織のコードベースを理解
- GitHub.com 上で Copilot とチャットできる
  - Bing 検索とつながっており、インターネット上の最新の情報を元に回答してもらえる
- Copilot にプルリクエストを要約させられる

また、[Pricing](https://github.com/features/copilot#pricing) のページには各プランとの比較がもう少し詳細に載っています。

![](/images/productivity-weekly-20240228/copilot_pricing_20240307.png)
*https://github.com/features/copilot#pricing*

ブログ記事には載っていませんが、他にも Fine-tuned なモデルを利用する機能も今後登場予定です。ただし、as add-on と書かれているので、別途料金がかかることになりそうです。

また、自動で issue からプルリクエストを作ってくれる [Copilot Workspace](https://githubnext.com/projects/copilot-workspace/) も今後 Copilot Enterprise プランで使えるようになる可能性があります。

気になる料金ですが、ユーザあたり月 $39 とまあまあ高額です。小規模な組織では導入が簡単かもしれませんが、大規模な組織では導入ハードルが高そうですね。
ただ、その料金に見合う価値はありそうだと考えています。個人的には組織のコードベースを理解してチャットができる部分にとても魅力を感じています。今後 fine-tuned モデルが使えるようになったり、Copilot Workspace が使えるようになったりすると、さらに導入したくなりそうです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Repository Rules - configure merge queue rule - public beta - The GitHub Blog
https://github.blog/changelog/2024-02-27-repository-rules-configure-merge-queue-rule-public-beta/

Merge Queue のための設定が Branch Protection に代わる新しい Repository Rules でも可能になったようです。

Merge Queue 自体については過去に Productivity Weekly でも何度か解説記事を紹介しています[^weekly-20230726][^weekly-20240214]が、この機能を有効をにするためには Branch Protection の設定で Merge Queue を有効にする必要がありました。一方、最近では Branch Protection よりも柔軟に設定できる上位互換の[Repository Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/managing-rulesets-for-a-repository)（あるいは rulesets とも呼ばれることがある）も提供されており、ブランチへの force push の禁止や直接 push を禁止して pull-request を必須にするなどの設定は既に可能だったのですが、Merge Queue の設定は今まで Branch Protection でしか行えませんでした。

[^weekly-20230726]: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230726
[^weekly-20240214]: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214

今回の機能追加により、Merge Queue を利用する場合でも Repository Rules だけで完結することが可能になったのでまた１つ Branch Protection を利用し続ける理由がなくなったと言えそうです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Deno 1.41: smaller deno compile binaries
https://deno.com/blog/v1.41

Deno v1.41 がリリースされました。今回の目玉はタイトルにもあるように `deno compile` で生成されるバイナリのサイズが小さくなったことで、記事中では今まで"Hello world"のシンプルなプログラムでも ARM の macOS 用バイナリで 116Mb だったものが、**58Mb** にまで縮小されたようです。

早速、拙作の Deno 製の CLI ツールを Deno v1.41 で `deno compile` し直してみたところ、ARM の macOS 用のバイナリで 101Mb -> **69Mb**、x86_64 の Linux 用のバイナリで 119Mb -> **80Mb** とおおよそ 30 - 40Mb 程度のサイズ削減が見られました！  

https://github.com/Kesin11/gh-workflow-ls/releases/tag/v1.0.1

Go や Rust などで作成されたバイナリと比較するとまだまだ大きいですが、100Mb 以下で提供できると心理的なハードルが一段階低くなった気がします。個人的には TypeScript でシングルバイナリのツールを開発したい場合に Deno はかなり有力な選択肢になってきました。

また、記事中ではバイナリサイズをさらに減らすプランとして、必要な機能だけに絞った Deno をカスタムビルドするという方法も見当しているとのことなので今後さらに期待できそうです。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## AWS Systems Manager Parameter Store now supports cross-account sharing
https://aws.amazon.com/jp/about-aws/whats-new/2024/02/aws-systems-manager-parameter-store-cross-account-sharing/

AWS Systems Manager（いわゆる AWS SSM）の Parameter Store において、パラメータを他の AWS アカウントと共有できるようになりました。

これにより複数アカウントをまたぐパラメータを一元管理しやすくなります。AWS Resource Access Manager(AWS RAM)を使って他のリソースと同じように共有できるようです。

なお、すでにクラスメソッドさんが検証記事を出してくれています（いつもありがとうございます）。
興味ある方はぜひ次の記事もご参照ください。

- [SSMパラメータストアがRAMを使用してクロスアカウントで共有できるようになっていたので試してみる | DevelopersIO](https://dev.classmethod.jp/articles/cross-account-sharing-of-ssm-parameter-store-in-ram/)

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## ENOG81: AWSのIPv6とPublic IPv4のおはなし - Speaker Deck
https://speakerdeck.com/yukihirokikuchi/enog81-aws-ipv6-public-ipv4

AWS の IPv6 対応と、IPv6 を活用した VPC ネットワーク構成の構築例を紹介されているスライドです。

個人的に、最近の業務で運用している AWS のインフラ上での NAT GW の利用料金が問題になり始めているため、Egress-only Internet Gateway（IPv6 のみ）を利用するネットワーク構成にすることで Private subnet からのインターネットに出ていく通信が NAT GW を通る必要がなくなるというのは料金面で魅力的に思いました。

AWS 側は IPv6 の対応がかなり進んでいるようであるという印象を受けましたが、自分たち側に IPv6 のノウハウが無いので既に運用しているインフラをすぐに IPv6 に移行するのは正直ちょっと難しそうです。ただ、スライドでも紹介されているようにパブリック IPv4 アドレスの値上げは既に始まっているので、さすがにそろそろ新規に VPC を構築する場合には最初から IPv6 も併用した構成を考えていきたいと思いました。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub OAuthアプリを使ったスパム攻撃を停止させる
https://zenn.dev/azu/articles/3a312d432ebc98

GitHub OAuth アプリを悪用したスパム攻撃事例が確認されています。この記事では、そのような攻撃をやめさせるための方法を実例を基に紹介しています。

記事では、スパム攻撃の概要、スパムをやめさせる方法（関係各所に通報）などが載っています。

こういったスパムメールやフィッシングサイトは見かけたとしても基本的に無視してきましたが、ドメインやホスティングサービスの管理元に通報することで、そのスパムに関しては断ち切ることもできるということは考えたこともありませんでした。実際の例で説明してくれているので、自分も今後は見かけたら各所へ通報してみようと思いました。
紹介されていた phish.report というサービスを使うことで通報先を簡単に知れるのも面白かったです。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [Highlights from Git 2.44 - The GitHub Blog](https://github.blog/2024-02-23-highlights-from-git-2-44/)
    - Git 2.44 がリリースされました
    - プッシュやプルする際のパフォーマンス向上や `git replay` コマンドが追加されました
    - `git replay` は `git rebase` 代替で、パフォーマンスが高いだけでなく、他にも色々な利点があるようです
      - さっそく触ってみた方が記事を出してくれています
        - [git-replay を最低限の使い方で触ってみた - Mitsuyuki.Shiiba](https://bufferings.hatenablog.com/entry/2024/02/24/161729)
      - 個人的には rebase に慣れきってるのもあって replay を使うのはもっと広く使われてからかなという感じです

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
今週号でした。GitHub Copilot Enterprise が GA になるの、思ったより早かったなという感じです。つかいてぇ〜けどたけ〜〜！

**宣伝です。4/9（火）に大阪で Engineering Productivity Meetup #2 を開催します。**
開発生産性を向上させる知見や技術をネタに開発者と交流する会です。
みなさん参加待ってます。

https://cybozu.connpass.com/event/311067/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information
