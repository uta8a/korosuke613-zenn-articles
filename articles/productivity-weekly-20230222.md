---
title: "Productivity Weekly (2023-02-22号)"
emoji: "🍩"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230222"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-02-15, 2023-02-22 合併号です。

今回が第 107 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Pull request merge queue (public beta) | GitHub Changelog
https://github.blog/changelog/2023-02-08-pull-request-merge-queue-public-beta/

GitHub において、pull request merge queue がパブリックベータになりました。[一昨年のプライベートベータ](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#pull-request-merge-queue-limited-beta-%7C-github-changelog)から約一年かかりましたね。


マージキューはプルリクエストが頻繁に飛び交うリポジトリにおいて特に有効です。プルリクエストをすぐにマージするのではなく、キューに溜め込み、溜まったプルリクエストをまとめたブランチを作り、CI にかけマージするという手法になります。マージキューがなぜ嬉しいかについては[過去の記事](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#pull-request-merge-queue-limited-beta-%7C-github-changelog)を参照ください。

現時点では GHEC、Organization のみ利用可能であるため、個人のリポジトリでの利用はできません。将来的に個人でも使えるのかは分かりませんが、個人で使うメリットはあまりなさそうです（renovate などのプルリクエストをまとめてマージするのに便利かも？）。

実際に会社のリポジトリで試してみました。

- [GitHubのPull request merge queueを試す](https://zenn.dev/korosuke613/scraps/d7b3e3c5db452f)

また、次のリンクの人の方がもっとわかりやすくまとめてくれています。
特に、merge queue に詰められた後のコミット順の項目は非常に分かりやすく、参考になります。

- [GitHub の merge queue を試してみて分かったこと | by Seiya Kokushi | Feb, 2023 | Medium](https://medium.com/@ronnnnn_jp/github-%E3%81%AE-merge-queue-%E3%82%92%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%81%A6%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%93%E3%81%A8-5c5b94cf477b)

感想としては、結構複雑な仕組みなので、仕様をきちんと知らないと想定通りの利用が難しいという印象です。しかし、使いこなせればとても強力だと思います。皆さんも大規模リポジトリで有効活用してみてください。

## Manage branch protection rules with a new permission | GitHub Changelog 
https://github.blog/changelog/2023-02-08-manage-branch-protection-rules-with-a-new-permission/

GitHub の[カスタムリポジトリロール](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#enterprise-organizations-can-now-create-custom-repository-roles-%7C-github-changelog)において、`Edit repository rules` 権限の付与ができるようになりました。

`Edit repository rules` 権限を持つと、branch protection rules と protected tags に対する create, edit, delete が可能になります。これまでは、これら全ての操作を行うために、Admin ロールが必要でした。

この変更により、リポジトリのブランチ、タグの管理者に対して強すぎる権限を付与する必要がなくなり、ガバナンスを強めることが可能となりました。さらにセキュアにやっていきましょう。

## More love for innersource collaboration and enterprise fork policies | GitHub Changelog
https://github.blog/changelog/2023-02-16-more-love-for-innersource-collaboration-and-enterprise-fork-policies/

GitHub において、同 Organization や同 Enterprise 内別 Organization に Internal リポジトリを fork する際、fork 先 Organization にすでに fork 元リポジトリが fork されていても、リポジトリ名を変えて新たに fork できるようになりました。

これまでは既に fork した Internal リポジトリがあった場合、fork ができなかったようです（知らなかった）。

もし、fork を全く許可しないようにしているのならば、これを機に Enterprise 内での fork 許可を検討してみてもいいと思います（[参考](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20220928?redirected=1#enterprise-fork-policies-for-organizations-%7C-github-changelog)）。

タイトルに love を入れているのはおもしろいですね。[innersource](https://speakerdeck.com/yuichielectric/how-to-implement-innersource?slide=6) をさらに加速させたい気持ちがありそうです。

## 4.0.0 — Homebrew
https://brew.sh/2023/02/16/homebrew-4.0.0/

Homebrew 4.0.0 がリリースされました。

主な変更点は次です。
- formulae のインストールに必要な情報の取得方法を変更し高速化
  - これまでは homebrew/core と homebrew/cask を git clone/pull していたため、とても時間がかかっていた
  - 4.0.0 からは formulae.brew.sh から JSON を http で取ってくるようになったため、高速化した
  - formulae の開発者でもない限りは homebrew/core、homebrew/cask を untap しても良い（後述）
- Homebrew の解析を Google Analytics から独自ホスト(EU)のインスタンスに送るようにし始めた
  - Google Analytics でデータがアメリカに送られるのを嫌がる人向けの変更
  - 当分は Google Analytics と独自インスタンスの両方に情報が送信される
  - 完全な移行は 100 日後を予定

実際 `brew update` してみると、体感でも以前よりだいぶ速くなっていました（以前どれくらい時間がかかっていたのかがわからない）。

また、homebrew/core と homebrew/cask を手元に置いておく必要がなくなったため、`brew untap` してみました。homebrew/core が 7066 ファイルで 684MB、homebrew/cask が 4720 ファイルで 391MB とまあまあな巨大なリポジトリだったようです。

:::details `brew untap` の詳細なコマンド

```console:まだ homebrew/core、homebrew/cask が紐付けされている
❯ brew --version
Homebrew 4.0.3
Homebrew/homebrew-core (git revision 1655c17518c; last commit 2023-02-17)
Homebrew/homebrew-cask (git revision 2ae6e86efe; last commit 2023-02-16)
```

```console:homebrew/core、homebrew/cask を untap
❯ brew untap homebrew/core
Untapping homebrew/core...
Untapped 3 commands and 6527 formulae (7,066 files, 684.8MB).

❯ brew untap homebrew/cask
Untapping homebrew/cask...
Untapped 4159 casks (4,720 files, 391.3MB).
```

```console:homebrew/core、homebrew/cask が紐付けされなくなった
❯ brew --version
Homebrew 4.0.3
```

:::

これまで本当に `brew update` の遅さにイライラしていたため、大変嬉しい変更です。皆さんも Homebrew をアップデートして超スピードを体感しましょう（多分勝手に更新されてると思う）。

# know-how 🎓

## Terraformのリファクタリング始めました - VisasQ Dev Blog
https://tech.visasq.com/start-terraform-refactoring

ビザスクさんによる Terraform のリファクタリング記事です。

ビザスクさんの Terraform では、環境ごとに三項演算子でパラメータ切り替えを行なっているため可読性が悪化したり、module 化する必要のないコードも module 化されていたりといった理由により、オペレーション負荷が高い状態だったため、シンプルにするためのリファクタリングを始めたようです。tfstate に対する操作が必須となり、tfmigrate を利用したとのことです。

記事では、リファクタリング前の状況、どのようにリファクタリングを進めるか、リファクタリングの流れ、リファクタリングを行なってどうなったか、が書かれています。
どのようにすでに稼働中のサービスに影響を与えない Terraform のリファクタリングを進めるかが書かれており、構成は違えども参考になると思います。

Terraform の構成はどうしてもだんだん負債が溜まっていくものだと思うので、たまにリファクタリングが必要になると思います。そんな時にこの記事とか tfmigrate を思い出してリファクタリングの参考になれば良いですね。

## Update on the future stability of source code archives and hashes | The GitHub Blog
https://github.blog/2023-02-21-update-on-the-future-stability-of-source-code-archives-and-hashes/

[先日、GitHub がアーカイブのハッシュ変えて騒ぎになった件](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230208#read-more-%F0%9F%8D%98)について、GitHub の中の人がなぜこうなってしまったか、どう対策していくかなどを書いた記事です。

GitHub 上の Git アーカイブは永続的に保持されるわけでなく、作成されてしばらくはキャッシュされるがそのうち削除されます。そして、もし再度求められたらその都度再作成するという流れになります。
1/30 に Git 2.38 がデプロイされ、Git アーカイブの生成に使われるデフォルトの圧縮コマンドが代わり、ファイルは同じでもアーカイブ自体の構造が変わってしまったため、ハッシュ値が変わることになったようです。
GitHub はアーカイブのハッシュ値が変わることを知っていましたが、コミュニティに広く影響を与えることは想定外でした。
GitHub は Git アーカイブのバイト単位での安定性を保証すべきでないと考えていましたが、このスタンスを対外的に明確にできていなかったことに気付いたようです。

今後の対応もいくつか書かれています。
1. 2023/02/21 から 1 年以上は Git アーカイブをバイト単位で安定的に保持する予定
2. 今後いづれかのアーカイブ形式を変更する場合は、ドキュメント、ブログ、Changelog で 6 ヶ月前に通知する（ただし重大な脆弱性が発見された場合は短縮もあり得る）
3. 今回の件で変更に対する影響の大きさを改めて確認したため、現在のところはフォーマットを変更するつもりはない。修正したい問題はいくつかあるが、当面は回避するようにする

また、安定したアーカイブに依存するためのワークアラウンドも書かれています。
アーカイブのハッシュ値を記録して照合するのではなく、コミット ID を指定して REST API で Git アーカイブを取得するという方法です。コミット ID によって、アーカイブ内のファイルの内容が常に同じであることが保証されるためです。またはリリースの assets からのダウンロードがお勧めされています。

（過去のアーカイブ含めて）ハッシュ値の変更をいきなりするのはどうしても何かしらの問題が起きそうですが、GitHub にとってはここまで依存されているとは思ってなかったようです。少なくとも 1 年の間は圧縮方式が同じになるようなので、これを機にアーカイブのハッシュ値への依存を減らしていきたいですね（個人レベルで依存している人がいるのかは謎）。


# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [GitHub Copilot for Business is now available | The GitHub Blog](https://github.blog/2023-02-14-github-copilot-for-business-is-now-available/)
    - GitHub Copilot for Business が登場しました
    - 複数アカウントでの契約が可能になり、組織で使いやすくなりました
    - しかし、OSS ライセンス周りの話には特に触れられていませんでした
- **know-how 🎓**
  - [Docker Desktopと代替ソフトウェア大集合 - とことんDevOps | 日本仮想化技術が提供するDevOps技術情報メディア](https://devops-blog.virtualtech.jp/entry/20230104/1672800265)
    - Docker Desktop 代替まとめです
    - 誰かに脱 Docker Desktop を勧める時に見せられそうな記事です
  - [Developers Summit 2023 講演資料まとめ|CodeZine（コードジン）](https://codezine.jp/devonline/archive/10)
    - 先日あった Developers Summit 2023 の資料まとめです
    - 残念ながら公開されていない資料もありますが、見てて気になった資料は読んでみましょう
  - [RustでAPIを開発してみたら結構辛かった話](https://zenn.dev/praha/articles/aab4b7cbe175f0)
    - Rust で Web サーバを作るのはつらいという話（と認識しました）
    - 工夫したところや良かったところ、苦労したところなどが書かれています
    - (自分は Rust がハローワールドレベルなので何もわからないのですが、)まだまだ Web 開発という文脈においてはエコシステムが充実してなさそうな感じとのことです
- **tool 🔨**
  - [We're finally ready to start flagging users in to GitHub Copilot CLI 🔥](https://twitter.com/mattrothenberg/status/1625874421968666627)
    - 以前紹介した [AI の力で自然言語からシェルのコマンドを提案する GitHub Copilot CLI](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221207#github-next-%7C-github-copilot-cli) ですが、ステージが technical preview から usable prototype へと移行しました
    - technical preview の段階から wait list への登録はできていたのですが、今後はどんどん招待が届き始めるかもしれません。気になる人は wait list へ登録しましょう
  - [wsl2-ssh-agent: WSL2からssh-agent.exeサービスへのブリッジ](https://zenn.dev/mametter/articles/49a2b505ec0275)
    - WSL2 内から Windows 側の ssh-agent を使うためのブリッジの新しい手法と、それを実装したツールの紹介です
    - 既存手法だと、Windows の ssh-agent が古いため Linux 側の新しい ssh-agent からの拡張メッセージを取り扱えないという問題があり、ssh 自体にパッチ当てたりしないといけなくてつらいとのこと
    - 記事の手法では、拡張メッセージを送られたらそのまま ssh-agent にブリッジせずダミーの SUCCESS を返すことで互換性問題を回避しているようです。なかなかハックな感じ

# あとがき
天皇誕生日の前後で休みとって沖縄旅行へ行ってました。
沖縄ナメてた。何回でも行きたくなるよこれ。
貼りたい写真がもっとたくさんあるんだけど 4 枚で抑えておきます。みんなも沖縄に行こう！
https://twitter.com/Shitimi_613/status/1630089443842596864

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

<!-- :::message すみません、今週もおまけはお休みです...:::-->
<!-- 
## omake 🃏: 
今週のおまけです。 -->
