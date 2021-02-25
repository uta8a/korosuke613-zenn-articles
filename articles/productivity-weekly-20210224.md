---
title: "Productivity Weekly (2021-02-24号)"
emoji: "🤧"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 15 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## GitHub CLI now supports editing issues and pull requests, and pull request auto-merge - GitHub Changelog
https://github.blog/changelog/2021-02-18-github-cli-now-supports-editing-issues-and-pull-requests-and-pull-request-auto-merge/

GitHub CLI（いわゆる gh コマンド）で [以前GAになったauto-merge](https://zenn.dev/korosuke613/articles/productivity-weekly-20210210#pull-request-auto-merge-is-now-generally-available---github-changelog)ができるようになりました。

`gh pr merge --auto`とするとそのプルリクエストに対して auto-merge を有効にできます。
![](https://storage.googleapis.com/zenn-user-upload/b5opu33rl6nxgnkl3x5uvajqm1jv)

auto-merge 機能だけでも大変楽になりましたが、今回、ブラウザを開かず auto-merge できるようになったのでますます楽になりました。


## GitHub Actions: Workflows triggered by Dependabot PRs will run with read-only permissions - GitHub Changelog
https://github.blog/changelog/2021-02-19-github-actions-workflows-triggered-by-dependabot-prs-will-run-with-read-only-permissions/

2021/03/01 から Dependabot のプルリクエストによって発火する GitHub Actions のワークフローが、フォーク先からのワークフローを実行するのと同じような扱いになります。

フォーク先からのプルリクエスト扱いになることで以下のような変化があります。
- 今までは書き込み権限があったが、これからは読み込み権限のみを持った `GITHUB_TOKEN` が使われる（[参考](https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token
)）
- 今までは全てのシークレットがワークフローに渡されていたが、これからは `GITHUB_TOKEN` 以外のシークレットは渡されない（[参考](https://docs.github.com/en/actions/reference/encrypted-secrets#using-encrypted-secrets-in-a-workflow
)）

この変更により悪意のある変更が依存関係に含まれてしまっても、Dependabot からのプルリクエスト段階では `GITHUB_TOKEN` を悪用されたり、シークレットをキャプチャされてしまったりする可能性が無くなります。[^1]

今回は Dependabot に対してだけの変更であるため、[Renovate](https://github.com/renovatebot/renovate)のような 3rd party の依存関係更新ツールを利用している方に対する同様のリスクは残ります。GitHub Apps が作るプルリクエストをフォーク先扱いにできるようなオプションがほしいですね。

[^1]: もちろん悪意のある依存関係をマージしてしまうと悪さができてしまうので、マージ前の確認が必要なくなったわけではありません。

## 「ISTQBテスト技術者資格制度 Advanced Level Specialist シラバス テスト自動化エンジニア」の日本語訳が公開された
http://jstqb.jp/syllabus.html#syllabus_advanced_specialist

「ISTQB テスト技術者資格制度 Advanced Level Specialist シラバス テスト自動化エンジニア」の日本語訳が公開されました。

他のシラバスはソフトウェアテストに関して知っておくべきことがコンパクトにまとまっていてます。テスト自動化エンジニアのシラバスもテスト自動化に関わることがコンパクトにまとまっていそうです。

ただ「Version 2016.J01」となっているため、内容は少し古そうです。ソフトウェアテストに関わる人やテストの自動化を勉強している方は目を通しておくとよいかもしれません[^2]。

[^2]: 僕は大学生の頃、勉強に使ったり用語を引っ張ってきたりとお世話になりました。

# know-how
## オープンソースのベストプラクティスを企業内で実践/How to implement InnerSource - Speaker Deck
https://speakerdeck.com/yuichielectric/how-to-implement-innersource

Microsoft/GitHub による、OSS のエコシステムやベストプラクティスを社内で展開するためのノウハウをまとめたスライドです。
InnerSource（いわゆる社内 OSS）の説明、InnerSource を実現するために Microsoft 社内をどう変えていったか、InnerSource を実現するためにどう GitHub を使っていったかなどが書かれています。

ただ社内 OSS を作ってみても、（管理者目線だと）なかなかコントリビュートしてくれる人が現れなかったり、（コントリビュータ目線だと）そもそも社内 OSS がどこにあるのかわからなかったり、といったような壁にぶつかることがあります。InnerSource を実現したい人にはこのスライドのノウハウが役に立つと思います。

## ARCHITECTURE.mdというものを書いてみた - maru source
https://blog.h13i32maru.jp/entry/2021/02/19/114906

jasper の開発者が ARCHITECTURE.md を書くときに気をつけたことや感想を記した記事です。

ARCHITECTURE.md はシステム全体を簡単な図とテキストでまとめたものとなります。割と最近生まれた概念なのか、記事にあるリンクは新しいものばかりでした。この記事では、ARCHITECTURE.md 自体の説明は最低限にしてあり、ARCHITECTURE.md を書く上で気をつけたことや感想がメインの内容となっています。

> ARCHITECTURE.md自体の目的は「プロジェクトへの新規参加者が全体像の把握を効率的に行えるようにする」という感じです。

とあるように、ARCHITECTURE.md はコントリビュートを考えている人向けの資料と位置付けられています。先に上げた InnerSource を実現したい場合にもこういった資料の存在は役立つだろうと思いました。

この記事は ARCHITECTURE.md を書く上で参考にできると思うので、OSS の開発者だけでなく、InnerSource を実現したい人にもおすすめです。


## AWSでAZ障害が起きたので困ったことを書いておく - なんかかきたい
https://t-cyrill.hatenablog.jp/entry/2021/02/21/000213

先週の金曜日深夜に AWS 東京リージョンの一部で大規模な障害がありました。花金にいきなり徹夜で仕事をすることになった人もいるのではないでしょうか。

この記事では、以前あった似たような障害を受けて対策を講じていたにも関わらず、今回の障害で思っていたように対策が動作しなかったこと、それに対する反省などが述べられています。
サービスが中途半端に死ぬということはこういう障害を経験しないとなかなか実感できなさそうだと思いました。僕自身、サービスは綺麗に死ぬものだと無意識に考えていた気がします[^3]。

こういった事例を参考に、パブリッククラウドで障害が起こった時にどう影響を軽減するか、どう対応するかを考えていきたいところです。

[^3]: データセンタで作業することがある方やそれに近しい方（インフラエンジニアや SRE？）にとっては割と当たり前なのかもしれません。


## Git Hooks without extra dependencies like Husky in Node.js project - DEV Community 👩‍💻👨‍💻
https://dev.to/azu/git-hooks-without-extra-dependencies-like-husky-in-node-js-project-jjp

以前、[HuskyがMITライセンスをやめた話](https://note.com/korosuke613/n/n9a50094509bd#kLziP)を紹介しました[^4]。

Husky を使うと、プロジェクトで使う git hooks を簡単にチームメンバそれぞれが有効にできます。Husky が無くても Git 2.9 からは `core.hooksPath` を利用することで任意のディレクトリの git hooks を使うように設定ができますが、チームメンバそれぞれがその設定をするのが面倒でもありました。

この記事では、Husky 抜きで git hooks の設定を簡単に行い、[lint-staged](https://github.com/okonet/lint-staged) を `git commit` 時に走らせる方法を紹介しています。

読んだときに、この方法があったかと思いました。脱 Husky を考えている人の参考になりそうです。

[^4]: ライセンスに関する議論はこちらで行われているようです。https://github.com/typicode/husky/issues/857

# tool
## GitHub ActionsのRunner OSの情報を取得できるアクションを作った
https://kenchan0130.github.io/post/2021-02-24-1

GitHub Actions では `runner.os` を参照することでワークフローを実行してるランナーの OS 名を取得できます。しかし、`runner.os`に OS のバージョンは含まれません。そのため、OS のバージョンの差異による不具合でワークフローが失敗してしまった方が、OS の詳細な情報を簡単に取得できる GitHub Action を作成しました。この記事では Action を作るに至った経緯や Action の作り方の詳細を説明しています。

[kenchan0130/actions-system-info: This action provides GitHub Actions runner OS information.](https://github.com/kenchan0130/actions-system-info)

ランナーの OS の情報を得たい場合に役立ちそうな Action です。また、記事では Action の作り方が詳細に書かれているため、Action を作るのに慣れてない人も参考にできそうです。

# あとがき
今週は全体的に GitHub の話が多かったですね。おまけ枠にも組み込みました。ちなみに、今回から textlint を使って継続的に記事の内容を校正するようにしました。気になる方は以下のスクラップをご覧ください。

https://zenn.dev/korosuke613/scraps/e05f28c8f93673


生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。本当は 1 つのつもりでしたが 2 つになりました。

### GitHub のコントリビューショングラフを 3D モデルかできるようになったよ！
https://twitter.com/yuichielectric/status/1362598805644840961?s=20

https://skyline.github.com/

表題のままです。GitHub のコントリビューショングラフを 3D モデル化するサイトを**GitHub**が公開しました。

確認したい GitHub アカウント名を入力すると、すぐに自分のコントリビューショングラフを 3D で確認できます。壮大な音楽も流せます。なんと共有や [STL 形式](https://ja.wikipedia.org/wiki/Standard_Triangulated_Language)でのダウンロードもできます。すぐに 3D プリンタで印刷できます。

Skyline と聞くと日産の車が思い浮かびますが、[Weblio](https://ejje.weblio.jp/content/skyline)によると「地平線」という意味があるそうです。確かにコントリビューショングラフを 3D にすると地平線に浮かぶビル群のように見えなくもないですね。

![](https://storage.googleapis.com/zenn-user-upload/vc7kje6oq8yarlunu73xqmk2kul8)

### 👻 GhostText — Use your text editor in the browser
:::message
GhostText はもともとおまけ枠ではなかったため普通に発表しました。しかし、後々使ってみて利点がわからなくなってしまったのでおまけ枠にしました。
:::

https://ghosttext.fregante.com/

ブラウザ上のテキストボックスへの入力を VSCode などの任意のテキストエディタを使って行えるソフトウェアです。

ブラウザ側とエディタ側の両方に拡張機能をインストールすることで、ブラウザ上のテキストボックスへの入力を任意のエディタで行うことができるようになります。

試しに Twitter でやってみたところ、簡単にコードが書けました。しかし、そのままツイートできませんでした...
https://twitter.com/Shitimi_613/status/1364881273739636736?s=20

そして使ってみた後に、「エディタで書いた内容をそのままコピペすれば良いのでは？」と気づきました...
もしいい使い方を知ってる人がいたら教えてください。