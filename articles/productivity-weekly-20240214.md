---
title: 旧artifact actions廃止告知、マージキューやデプロイ頻度の話等｜Productivity Weekly(2024-02-14)
emoji: 😍
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240214
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
published_at: 2024-02-26 10:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-02-14 単独号です。

今回が第 142 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
<!-- - [@Kesin11](https://zenn.dev/kesin11) -->
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

# news 📺

## Deprecation notice: v1 and v2 of the artifact actions - The GitHub Blog
https://github.blog/changelog/2024-02-13-deprecation-notice-v1-and-v2-of-the-artifact-actions/

GitHub Actions の `actions/upload-artifact` および `actions/download-artifact` の v1 と v2 が 2024/06/30 に Deprecate となることが発表されました。
v4 では[パフォーマンスが大幅に向上](https://github.blog/changelog/2023-12-14-github-actions-artifacts-v4-is-now-generally-available/)しているので、これを機にアップグレードを検討してみてはいかがでしょうか[^ref]。

なお、GitHub Enterprise Server では該当せず、対応は不要だそうです。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

[^ref]: 平木場注）なお、upload-artifact@v4 および download-artifact@v4 については、以前の Productivity Weekly 内で @Kesin11 さんが紹介してくれています。そちらもご参照ください -> [actions/artifacts@v4アツい、CIの話題多め、おまけあり｜Productivity Weekly(2023-12-20号)](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231220#github-actions---artifacts-v4-is-now-generally-available---the-github-blog)

## Copilot in GitHub Support is now available! - The GitHub Blog
https://github.blog/2024-02-09-copilot-in-github-support-is-now-available/

GitHub Support において、GitHub 公式ドキュメントを学習した GitHub Copilot とやりとりできるようになりました（GA）[^beta]。

[^beta]: それまでは一部の GitHub Enterprise ユーザがクローズドで使えたようです。今回一般提供が始まったことで、GitHub Free ユーザも触れるようになりました。

これまでは GitHub Support で問い合わせをする際、回答は人間（GitHub のサポートチーム）が行なっていましたが、今後は先に Copilot in Support に聞くことができます。回答者が人間の場合はどうしてもやり取りに時間がかかってしまいますが、Copilot in Support であれば即座に回答が得られるのが嬉しいですね。最終的に問題が解決したら良いですが、解決しなかった場合はそのままサポートチケットを発行できます。

もちろん相手は生成 AI なので、必ずしも正しい答えが得られるとは限らないことに注意です。

さっそく試してみました。

![](/images/productivity-weekly-20240214/chat.png)
*回答例*


**質問**
> GitHub Actions の variables を `${{ secrets.GITHUB_TOKEN }}` の権限を使って更新することはできますか？

**回答**
> GitHub Actions の variables を更新するためには、REST API を使用する必要があります。しかし、GITHUB_TOKEN を使用して variables を更新することはできません。これは、`GITHUB_TOKEN` が限定的な権限しか持っていないためです。
>
> variables を更新するためには、`admin:org` スコープを持つアクセストークンが必要です。このトークンは、GitHub Apps または個人のアクセストークンを介して取得できます。
>
> 以下に、REST API を使用して organization variable を更新する例を示します：
> ＜省略＞

正しいですね！`GITHUB_TOKEN` では variables は更新できません。

しかしこの結果は organization variable の場合の話なので、その後も repository variable の場合はどうなるのかや、GitHub Apps の場合はどうなるのかを聞いてみました。
聞いた結果は先日公開した次の記事にまとめていますので、興味があればこちらもご覧ください。

https://zenn.dev/korosuke613/articles/copilot-in-github-support

GitHub Actions の権限周りはなかなか調べるのが面倒なので、Copilot in Support で気軽に素早く答えがわかるのは嬉しいですね。

ただ、触ってみていくつか気になった点があったので、次に挙げておきます。

- ページを移動すると内容が見られなくなってしまう
  - Submit a Ticket をクリックするまでチケットは発行されないため
    - チケット一覧にも残らない
  - 良い回答が得られたらスクショ等で保存しておこう
- チャット中は変換確定時のエンターキー押下でチャットが送信されてしまう
  - 日本語でチャットする際は質問内容を別途書いてから貼り付けるなどをした方が良さそう
- 「My problem is solved!」をクリックすると紙吹雪が舞うよ。解決したら押していこう

特にページを移動すると内容が見られなくなってしまうのは落とし穴感が強いです。使う際は覚えておきましょう。

Copilot in Support、なかなか便利な機能です。人に質問するよりハードルは低いし、日本語で質問できるのでどんどん使っていきたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Dockerの設定を大きく省力化する「Docker Init」コマンドが正式リリース。DockerfileやCompose設定ファイルなど自動生成 － Publickey
https://www.publickey1.jp/blog/24/dockerdocker_initdockerfilecompose.html

Docker Desktop 4.18 から、`docker init` がベータで入っていましたが、それが Docker Desktop 4.27 で GA となりました。
`docker init` は実行して訊かれる質問に答えると Dockerfile や compose.yaml などを自動で生成してくれる Docker のサブコマンドです。

ちなみに私は OrbStack 1.4.3 を使っており、`docker init` は使えません...
今回は私物のマシンで `docker init` を試してみました。

Docker のサブコマンドはプラグイン形式になっているらしく、init のバージョンは次のものが入っていました。

```
$ docker init --version
Version:    v1.0.0
Git commit: ######
```

使いたい言語、そのバージョン、使用するパッケージマネージャー、使用するポートなどを訊かれ、答え終わると .dockerignore, Dockerfile, compose.yaml, README.Docker.md を生成してくれました。

なお、対応している言語には限りがあり、もしリストに無い場合は「Don't see something you need? Let us know!」を選択すると Google Form にリクエストを送信するようお願いが表示されます。

サクッと Docker まわりのテンプレートを引っ張ってくることができるので、プロジェクトの初動で少し楽になりますね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

# know-how 🎓

## GitHubのMerge Queueとは何か？それと、認識しておきたいこと - Mitsuyuki.Shiiba
https://bufferings.hatenablog.com/entry/2024/02/10/173552

GitHub の Merge Queue とは何かという記事です。

どういう状況でなぜ Merge Queue が嬉しいのかを順序立てて丁寧に説明してくれています。また、Merge Queue を使う上で気にしておくべきこと、気をつけておくべきことも書かれており、Merge Queue 戦略を考える上で参考になります。

個人的には `github.ref`、`github.sha`、`github.base_ref`、`github.head_ref` がそれぞれのトリガーでどう変わるかをなんとなくでしかわかってなかったため、整理してくれていて勉強になりました。

Merge Queue は非常に強力な機能ですが、上手く使うのがなかなか難しいものでもあるため、いろんな記事や事例を参考にしつつ戦略を考えたいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Testing HashiCorp Terraform
https://www.hashicorp.com/blog/testing-hashicorp-terraform

Terraform plan や validate は問題無く実行できたのに、terraform apply で失敗したことはありませんか？私は何度もあります...

この記事では、テストピラミッドを示しながら、ユニットテストから順に Terraform でのテストの書き方を教えてくれています。
次のように例を示しながら、説明がされています。

- ユニットテスト
  - 例えば、組込み関数を使って variable を加工し local 変数を作るような処理があった際に、入力と出力が期待通りであるかをテストする[^example]
  - run ブロックと assert を使ってテストできる
  - `command = plan` で plan 時だけに走らせる
- コントラクトテスト
  - 例えば resource で期待していない変数が来ないかをテストする
  - variable ブロックと validation を使ってテストできる
  - plan で実行される
- インテグレーションテスト
  - 例えば apply 時にローカルにファイルが生成されるとして、それがきちんと存在するかテストする
  - run ブロックと assert を使ってテストできる
  - apply 時に実行される
- エンドツーエンドテスト
  - 例えば apply 後にリソースが正常に動作していることを確かめる
  - check ブロックを使ってテストできる
  - apply 時に実行される

またユニットテストとコントラクトテストは plan 時に実行されるので、こちらを重点的に書いておくことで apply まで行く前にテストで落とすことができ、時間の節約にもなる旨が書かれています。

私は check ブロックの存在をよく理解していなかったので、この記事でその有用性をよく知りました。
また Terraform のテストでテストピラミッドを意識するということもなかったので、今後はこの記事を参考にテストを書いてみようかと思います。

[^example]: 記事内では EC2 インスタンスの DNS 名から IP アドレスを抜き出す処理が例で出されていた。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## デプロイ頻度やリードタイムの正確な計測にこだわらなくていい（前提はあるが） - mtx2s’s blog
https://mtx2s.hatenablog.com/entry/2024/02/12/210309

スクラムのようなイテレーティブな開発プロセスにおける、デプロイ頻度やリードタイムの計測と活用についての考察記事です。

結論としては、実測値を使うまでもなく、チームの誰もが知っているデプロイ頻度とリードタイム(ここでは、イテレーティブであるという前提を置いているので 1 スプリントなど)を用いれば十分と述べています。
そもそも改善したい対象はメトリクスではなくフローであるということを具体例や図を用いて立ち返っており非常に分かりやすかったです。
さらに、フローを改善する戦略として、「フローを速くする」ことと「フローの数を増やす」という 2 つの具体的なアプローチまで紹介してくれていて、実践的で非常に参考になりました。

Four Keys のような指標の計測に基づいて何かをする際は、メトリクスを良くすることを目的としてしまうミスが起こりがちです。定期的にこの記事を読み返して、改善の目的を見失わないようにしたいですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# あとがき
はい。ハッピーバレンタイン号でした。僕はなんとか今年チョコをいただくことができました（本命ではない）。ハッピーですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

