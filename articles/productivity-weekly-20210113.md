---
title: "Productivity Weekly (2021-01-13号)"
emoji: "⛄️"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上", "GitHub", "Terraform", "AWS"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第9回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## Delete directory from the web - GitHub Changelog
https://github.blog/changelog/2021-01-11-delete-directory-from-the-web/

GitHub の WebUI 上でディレクトリを削除するコミットを追加できるようになりました。今まではファイル単位でしか削除できませんでした。
プッシュする必要がないディレクトリ(dist や .idea など)を誤ってプッシュしてしまい手っ取り早く消したい場合などに使えるかもしれません。（git の履歴には残るので、log を綺麗に保ちたい場合や blob を残したくない場合は使えませんが...）

# know-how
## Maximizing Developer Effectiveness
https://martinfowler.com/articles/developer-effectiveness.html

落とし穴[^1]を避けて開発者の効率(developer effectiveness)を最大化する方法を紹介する記事です。
効率的な開発環境とそうでない開発環境の例と、そもそも効率的な開発環境とは？ という説明から始まり、
最大化に至るまでの手順が解説されていくという内容になっています。

ただ、連載記事のため、まだ完成はしておらず、段々と内容が追記されていくようです。開発者の効率を上げるための分析や取り組みが参考になりそうです。


[^1]: ※組織の生産性を高めるために導入されたテクノロジーがかえって開発者にとっての複雑性と認知的負荷を高めてしまう事態。

## TerraformでAWSのマルチアカウント環境を整備する
https://zenn.dev/wim/articles/aws_landing_zone_with_terraform

AWS が提唱するマルチアカウント管理のベストプラクティスである [Landing Zone](https://aws.amazon.com/jp/solutions/aws-landing-zone/) に沿った環境を Terraform で作るための方法を紹介する記事です。

[AWS Control Tower を使い Landing Zone を構成できるようです](https://docs.aws.amazon.com/controltower/latest/userguide/aws-multi-account-landing-zone.html)が、Terraform で Landing Zone の構成管理をしたい場合は参考になると思います。

また、余談ですが [AWS Terraform Landing Zone](https://www.hashicorp.com/resources/aws-terraform-landing-zone-tlz-accelerator) というソリューション（ベストプラクティス？）も存在しているようです。ただ、おそらくまだプレビュー版であり、2019年末に発表されてからあまり音沙汰がなく、下のように2019年の第4四半期に OSS でリリースされるとあったのですが、発見することができませんでした。

> Release is planned for Q4 of 2019. And probably more importantly, its code will be open source and it'll be free. 
https://www.hashicorp.com/resources/aws-terraform-landing-zone-tlz-accelerator

## 振り返りで積み上げた開発プラクティス（2020年総まとめ）
https://devblog.thebase.in/entry/bank-practices-2020

チーム開発で使う手法やプラクティスに対する認識がチーム内でブレないようにまとめたという内容の記事です。チームで決めたことや取組みに対する知見、認識を一枚のボードにまとめてるのが良いなと思いました。
自分もたまに取り組みを行う理由や目的を忘れる、取り組みに対して誤った認識、判断をしてしまうことがあります。そういう場合にチームで作った取り組みに対する認識をまとめたものがあるとスムーズなチームワークが発揮できるのではないでしょうか。新しくジョインするメンバに対しても親切です。

この記事ではボード自体の説明もされています。例えばストーリーポイントの見積もり方などが紹介されており、個々の取り組みについても参考にできそうです。

## Kira McLean | What I Use Now Instead Of Google
https://kiramclean.com/blog/what-i-use-now-instead-of-google/

脱 Google を目指す人が Google のサービスの代わりに今使ってるサービスを紹介した記事です。例えば、Gmail は ProtonMail に、Google ドライブは Synk と Backblaze に、というように Google のサービスと置き換え後のサービスを羅列しています。また、置き換えた詳細な理由や、置き換えによってかかる費用も書かれています。

この記事は [Hacker News](https://news.ycombinator.com/item?id=25654222)、[Dev.to](https://dev.to/kiraemclean/what-i-use-now-instead-of-google-56lf)、[Reddit](https://www.reddit.com/r/degoogle/comments/krexp7/i_spent_2020_replacing_all_the_google_things_in/) で議論されており、脱 Google を目指す人はそれらのコメントも踏まえて参考にできるかもしれません。

## git-notesでコミットにメモをつける - アジャイルSEの憂鬱
https://sinsoku.hatenablog.com/entry/2021/01/06/210452

Git でコミットログとは別にメモを残す git-notes という機能の紹介記事です。sha が変わらないのである程度自由にメモを残すことができ、覚えてたらいつか使い道がありそうだとは思ったのですが、リモートへの push がちょっと面倒[^2]だったり、GitHub が表示に対応してないなど、利用者が増えづらい側面もありそうでした。

ちなみに僕は初めて git-notes という機能を知りました。Git にはまだまだあなたの知らないマイナーな機能が埋もれていそうです。

[^2]: この記事では簡単に push する方法も紹介されています。

# tool
## Octoken - This action makes it easy to get a token for your GitHub App.
https://github.com/cybozu/octoken-action

GitHub Actions 上で GitHub App としての認証を簡単に行うための Action を生産性向上チームの [@ganta](https://twitter.com/ganta0087) が作成しました。

GitHub App として認証を行いたい場合、秘密鍵で JSON Web Token に署名し、それをエンコードするなどの手順が必要で、[少々面倒](https://docs.github.com/en/free-pro-team@latest/developers/apps/authenticating-with-github-apps#authenticating-as-a-github-app)です。octoken-action を利用することで認証に必要な処理を記述する必要なく、簡単に GitHub App として認証することができます。

サイボウズのオーガニゼーション下で公開している理由については Twitter で語られています。
https://twitter.com/ganta0087/status/1348810869379985411?s=20

余談ですが、以前(2020年11月) GitHub App での認証による、GitHub Packages への publish や Container Registory への push を試したところ、下のようなエラーメッセージが表示されてしまいました。

```
unauthorized: This credential type is not supported for registry. Please use a Personal Access Token or GitHub Actions token instead.
```

GitHub App による認証には対応していない場合もあるようです。（これについてのドキュメントを見つけることができなかったため、もし誰か詳しく知っていたら教えていただけると幸いです。）もう少し GitHub App でできることが増えてほしいところですね...

# あとがき
個人的に、今回紹介した Maximizing Developer Effectiveness がとても面白そうだと思いました。生産性向上チームの一員として開発者の環境を爆上げしていきたいので、完結まで継続的に読んで開発者環境改善につなげていきたいですね。（英語がつらいですが...）

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000