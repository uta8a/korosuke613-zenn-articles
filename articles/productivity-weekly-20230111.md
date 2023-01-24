---
title: "Productivity Weekly (2023-01-11号)"
emoji: "🌅"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230111"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 104 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Code scanning can be set up more easily without committing a workflow file to the repository | GitHub Changelog
https://github.blog/changelog/2023-01-09-code-scanning-can-be-set-up-more-easily-without-committing-a-workflow-file-to-the-repository/

GitHub において Code Scanning(CodeQL)を Actions のワークフローを用意せず使えるようになりました。
具体的には Settings より設定できます。その場合はデフォルト設定が適用されます。
もしも柔軟に設定したい場合は、従来通りワークフローを作ればいいようです。

想定した言語が検出されるかどうか、どのブランチのどのイベントで走るかは設定時に確認可能です。
あくまでワークフローを用意する必要がなくなっただけで、GitHub Actions 上で実行されることは変わりません。

現在はリポジトリレベルでしか設定できませんが、今後は Organization レベルで設定できるようにする予定とのことです。

実際に有効にしてみた例が次になります。

https://twitter.com/Shitimi_613/status/1612470980097748993?conversation=none

これまでもコミットしなきゃいけないワークフロー自体は提供されていたため、簡単に有効化できると言えたのですが、やはりコミット自体に少し壁を感じていた面はありました。
デフォルト設定で使うならファイルを管理するのは面倒だったので、これまで以上に簡単に Code Scanning を利用できるようになって良いですねという感じです。
早く Organization レベルで適用できるようになるといいですね。

## GitHub Actions – Support for organization-wide required workflows public beta

https://github.blog/changelog/2023-01-10-github-actions-support-for-organization-wide-required-workflows-public-beta/

GitHub Actions において、Organization 横断で指定リポジトリに必須ワークフローを設定できるようにする機能が追加されました。

同 Organization 内リポジトリにあるワークフローファイルを指定できます。
適用する Organization 内リポジトリはコントロールできるため、柔軟に必須ワークフローを設定できます。

また、branch protection で required status checks がチェックされている場合に、必須（required）となります。もしも branch protection で required status checks がチェックされていない場合は、必須とはなりません（ワークフローは実行されます）。

ちょっと実験しました。その時の所感も載せておきます。

- [GitHub Actions の organization-wide required workflows を実験する](https://zenn.dev/korosuke613/scraps/b1b25238404bc7)

**所感**
- ワークフローを Org 横断で強制したい場合には効果的
- 複数チームが利用する Org でガバナンスを強化できる 
- 使用例: ライセンスチェックを必ず行わせる
- ワークフローを Org 横断で使い回したいという用途だと微妙な気がする
  - 原則として必ず `Required` になるのが邪魔
  - ブランチプロテクションである程度制御できるけども
- ソースのワークフローについて、常に HEAD コミットが使われるのは不便になり得そう
- 仕様がちょっと複雑

ガバナンス強化目的だと使えるかなって思ったんですけど、単純にワークフローを共有したいだけの場合はちょっと使い勝手が悪いので微妙かなという印象でした。

ちなみに Weekly では、ライセンスチェックの強制に使えるんじゃないの？って意見が出ました。そういう用途だと光り輝きそうです。

## GitHub Actions - Support for configuration variables in workflows | GitHub Changelog
https://github.blog/changelog/2023-01-10-github-actions-support-for-configuration-variables-in-workflows/

GitHub Actions において secrets とは別に、variables が登場しました（public beta）。secrets とは異なり平文で保存されるとのことです。

variables を使うと、ジョブのログで値がそのまま表示されます。また、variables の設定画面で現在の値を確認できます。
なお、今回新しく登場した `vars` コンテキストでアクセス可能です。

これまでも機密性の低い情報は secrets で事足りてましたが、特にマスクされなくてもいいのにマスクされたり現在の値の確認が面倒だったりしました。
今後は機密性の低い情報については variables を使うのが良いと思います。

## Amazon S3 now automatically encrypts all new objects
https://aws.amazon.com/about-aws/whats-new/2023/01/amazon-s3-automatically-encrypts-new-objects/

Amazon S3 において、デフォルトでサーバサイド暗号化(SSE-S3)が行われるようになりました。

SSE-S3 は AWS が管理する鍵を使って暗号化する方式であり、取り出す時は自動的に復号されるため、利用者が意識することはありません。
そのため、特にアクションは必要ありません。

新規バケットおよび既存バケットに適用され、実際に暗号化されるのは新しいオブジェクトからのようです（既存オブジェクトがどうなるかはよくわからない）。

これまではわざわざ設定する必要があったため、今後はその手間が省けていいですね。

# know-how 🎓

## GitHub Actions Workflow 作成 Tips - NTT Communications Engineers' Blog
https://engineers.ntt.com/entry/2022/12/21/095303

NTT Communications さんによる、GitHub Actions のワークフロー作成に関する Tips です。

なかなかのボリュームですが、役立ちそうな話がたくさん載っています。

記事では、次の Tips が載ってます。
- workflow run に名前をつけてそれぞれの run がなんなのか分かりやすくする
- Job Summaries に inputs を表示する
- Job Summaries に workflow の再実行用コマンドを表示してパラメータ調整をして workflow を再実行しやすくする
- composite actions の活用例
- reusable workflows の活用例
- 複数リポジトリ間で共通するシークレットを参照できるようにするアクション
- 機密情報も含めたキャッシュを扱うための独自キャッシュアクション

とてもうまく活用しているなと思いました。大変参考になります。
個人的には、特に Job Summaries 周りの話がとても良かったです。自分には無い発想でした。

GitHub Actions をよく触る人におすすめしたい記事です。

## Renovate config の変更が想定通りか確認する 〜真の dry-run を求めて〜
https://zenn.dev/cybozu_ept/articles/compare-renovate-dry-run

:::message
僕の書いた記事です。宣伝です。
:::

Renovate の config の変更が想定通りか確認する方法を載せた記事です。

Renovate の dry-run オプションを使うだけでは、デフォルトブランチの config を見てしまうため、config の検証には使えません。
この記事では、純粋な dry-run の方法とそこに至るまでの過程が載っています。

この記事を書くために Renovate を何回も実行したり、それぞれのログを見比べたりしました。非常に大変でした。
最終的には思ったより単純な形となりました。あまりネットの海に無い情報だと思ったため記事にしました。
Renovate と仲良くなりました。

Renovate の設定に苦しめられている人におすすめしたい記事です。

# tool 🔨

## Unlock any CLI using Biometrics with 1Password Shell Plugins | 1Password
https://blog.1password.com/shell-plugins/

1Password において、CLI 利用時に、認証情報を 1Password から取り出せる仕組みが出ました。設定すると CLI 利用時に 1Password の認証を求められ、認証に成功すると 1Password 上のシークレットが利用されます。

例えば GitHub CLI や AWS CLI などに対応しています。
もしも他の CLI で利用したい場合は、プラグインを自作することもできます(beta)。

GitHub CLI は OAuth で認証できるため、PAT 生成するのがめんどいなとか思ったのですが、OAuth だとスコープをユーザで柔軟に設定できないため、案外使い道あるかもと思いました。
また、利用時に認証が求められることから、セキュリティの向上にもつながると思います。
適材適所で使っていきたいですね。

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [シェルスクリプトでlsをパイプでつなぐのはなぜ悪いのか ～ ShellCheck: SC2010, SC2011, SC2012 とファイル名改行問題](https://qiita.com/ko1nksm/items/fb42b741f5d176996ec1)
    - ShellCheck では `ls | grep ~` みたいなのを書くと怒ってくるが、実際に問題になるケースがあまりちゃんと理解されていないという話です
    - なかなかの超大作です。ls や UNIX のあまり知られていない話を勉強できます
    - とりあえずは ls をパイプでつながなきゃいいんですが、裏側をちゃんと知ると面白いですね
- **tool 🔨**
  - [Devbox 0.2.0: Automatic Nix Installer, Plugins, and Background Services](https://www.jetpack.io/blog/devbox-0-2-0/)
    - Devbox という開発環境を整備するツールの 0.2.0 がリリースされました
    - インストーラーで Nix が自動でインストールされるようになったり、PostgreSQL, Apache httpd, Nginx, PHP, Ruby, Python の各種設定済みのプラグインが追加されたり、バックグラウンドサービスの管理機能が付いたり、Dockerfile、Devcontainer 設定を生成できるようになったとか
    - Devbox で用意した開発環境を Devcontainer 化できるのは便利そうだなと思いました
    - とは言えまだまだ登場したばかりなので、新しい開発環境となり得るか今後に期待ですね

# あとがき
新年初号です。遅くなってすみません。
あけましておめでとうございます。今年もよろしくお願いいたします。

ちなみに明日は Productivity Weekly 100 回記念イベントがあります。もう募集は締め切ってますが、いろいろ話してこようと思います。

https://cybozu.connpass.com/event/268442/

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

