---
title: "Productivity Weekly (2021-04-28号)"
emoji: "🛌"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 24 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news

## GitHub Actions update: Helping maintainers combat bad actors - The GitHub Blog
https://github.blog/2021-04-22-github-actions-update-helping-maintainers-combat-bad-actors/

初めてのコントリビューターからのプルリクエストの場合、GitHub Actions ワークフローの実行にリポジトリの Write 権限所有者の承認が必要になりました。承認された後もプルリクエストに新たなコミットが積まれた場合、再度承認が必要になります[^merge]。

フォーク先からのプルリクエストで発火するワークフローに悪意のあるコードを含むことで、他人の GitHub Actions 上で DDoS 攻撃や仮想通貨マイニングを行うという風に悪用される事例がありました。特に最近、仮想通貨が高騰してきたため、ますます悪用者が増えてきたため、その対策の 1 つとして今回の変更がされました。

- [過去に紹介した「GitHub Actionsを使ったDDoSに巻き込まれた」](https://zenn.dev/korosuke613/articles/productivity-weekly-20210210#github-actions%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9Fddos%E3%81%AB%E5%B7%BB%E3%81%8D%E8%BE%BC%E3%81%BE%E3%82%8C%E3%81%9F)
- [GitHub Actionsを仮想通貨マイニングに悪用する攻撃が発覚 | TECH+](https://news.mynavi.jp/article/20210406-1865475/)

また、以前はフォーク先からのプルリクエストで発火した悪意あるワークフローに対するペナルティがフォーク元ユーザに対して行われていました。これからは、フォーク先リポジトリをホストするユーザにペナルティが課されるようになるようです。

[^merge]: `first-time contributors`からのプルリクエストと書かれているので、一度マージされたらそのコントリビュータは承認される必要はなさそうです。

## Node v16.0.0 (Current) | Node.js
https://nodejs.org/en/blog/release/v16.0.0/

Node.js v16 がリリースされました。v16 は今年の [10 月ごろ](https://nodejs.org/en/about/releases/) LTS[^lts]となる予定です。

Node.js v16 の主な変更点については下の記事の紹介がわかりやすかったです。

https://shisama.hatenablog.com/entry/2021/04/22/090000

色々な変更が入っていますが、個人的には下の変更が嬉しいですね（全部 v15 での変更だけど）。

- 同梱される npm が v7 になる
  - プロジェクトによって npm v6 と v7 が混在してて考えるのが面倒なのでさっさと同梱してほしいから
- AbortController が追加される
  - `Promise.race()`するときに使いたくなるから
- Unhandle Rejections の exit code が 1 になる
  - 1 の方が自然だと思ってるから

早く LTS になってほしいです。楽しみですね。

[^lts]: Long Term Support の略。安定板とか stable とか呼ばれたりもする。

# know-how

## How we ship code faster and safer with feature flags
https://github.blog/2021-04-27-ship-code-faster-safer-feature-flags/
GitHub の feature flag 活用例です。

feature flag とは機能の有効・無効をコード上で切り替える手法です[^feature]。feature flag を適用することにより、単一の環境で A/B テストやカナリアリリースを実施できます。

この記事では、feature flag 活用テクニック、適用することのメリット、発生するコストとの向き合い方などが書かれています。個人的には、feature flag が完全に有効になることによりデッドコードが発生するが、これの削除を GitHub Actions で自動化しているという話と、feature flag の適用先（ユーザの割合、スタッフ、OSS メンテ担当者など）の話が特に勉強になりました。

feature flag を適用していく上で参考になる記事です。新機能ごとに別環境を用意するといったような方法に比べると圧倒的にメリットがあると思うので、活用していきたいですね。

[^feature]: [FeatureFlagを使ってサクッとリリースする - 弥生開発者ブログ by Misocaチーム](https://tech.misoca.jp/entry/2019/09/02/110000)を参考にしました。

## いろいろな .config.js で型の補完を効かせる方法まとめ
https://zenn.dev/jay_es/articles/2021-04-22-config-js

利用するライブラリによっては設定ファイルを js で書く必要がありますが、js なので補完が効かなかったり、型が間違っててもすぐには気づけなかったりともどかしくなることが多々あります。

この記事では、そういった `〇〇.config.js` において補完や型チェックを効かせる方法が紹介されています。JSDoc で型定義の入った設定オブジェクトを指定することで型の補完ができるようです。設定オブジェクトの指定方法は設定ファイルによって異なりますが、この記事では有名ライブラリの設定ファイルごとの JSDoc 指定方法がまとめられています。

僕は全くこの方法を知りませんでした。IDE が補完や型チェックを行ってくれるものもありましたが、こういった設定ファイルを書く際はたいていブラウザでドキュメントを開いてにらめっこしながら書いてたのでとても使えそうなテクニックです。これは生産性が上がりそうです。

# tool
## FigJam is an online whiteboard for teams to explore ideas together
https://www.figma.com/figjam/

デザインツールでお馴染みの Figma が新たに FigJam というオンラインホワイトボードツールを公開しました（ベータ）。オンラインホワイトボードツールと言えば、僕の周りでは miro を使っている方をよく見かけます。僕もサービスの構成図を作成するときなどに miro を使っています。miro は便利なツールなのですが、動作が重かったり、付箋の使い勝手が良くなかったり[^husen]と微妙な部分がいくつかあります（個人の感想です）。FigJam を使ってみた方に話を聞いてみると、miro よりも軽く使い勝手が良いといった意見や、miro よりも使いやすいが miro の方が多機能といった意見を得られました。

> FigJam is free and in beta through 2021. In 2022, FigJam will have plans for $0, $8, and $15 per editor/month. [Learn more.](https://www.figma.com/pricing-faq/#figjam)
> https://www.figma.com/figjam/#:~:text=Get%20Started%20For%20Free

とあるように、まだベータ版で 2021 年中は無料で使えるので試しに触ってみたい人は触れます。僕も触ってみたところ、付箋がとても使い勝手よかったです。重いか軽いかで言うと軽かったですが、オブジェクト数が少ない上に自分一人で編集していたため、本当に軽いかはまだなんとも言えませんでした。機能面で言うと miro の方がまだまだできることが多そうです。

新たな競合が出たことで miro もこれからますます改善していくことでしょう。FigJam 自体もこれからもっと良くなるはずなので楽しみです。快適なオンラインホワイトボードツールを使っていきたいですね。

[^husen]: miroの付箋って入力していくと文字サイズがコロコロ変わってめっちゃ文字が小さくなるんですよね。回避するために途中でいい感じの改行を入れたり文字サイズを設定しなきゃいけないです。ちなみに文字サイズを設定しても文を編集するとまた文字サイズがコロコロ変わります。これが一番気に入りません。


# 小ネタ
- [AWS Control Tower が東京リージョンでご利用いただけるようになりました | Amazon Web Services ブログ](https://aws.amazon.com/jp/blogs/news/aws-control-tower-tokyo/)
- [Google Cloud FunctionsがPHPをサポート開始。PHPでサーバレスの関数が記述可能に － Publickey](https://www.publickey1.jp/blog/21/google_cloud_functionsphpphp.html)
- [Ubuntu 21.04正式リリース。Active Directoryとネイティブ統合、最適化されたSQL Server対応、Flutter用SDK搭載、Waylandがデフォルトに、など － Publickey](https://www.publickey1.jp/blog/21/ubuntu_2104active_directorysql_serverfluttersdkwayland.html)
  - LTS ではありませんが、ダークテーマが提供されたりデフォルトのディスプレイプロトコルが Wayland になったりと色々変更が入ってます。（デスクトップ版使うことがなかなかないけど）
- [OpenGraph images for GitHub repositories, commits, issues, and pull requests - GitHub Changelog](https://github.blog/changelog/2021-04-21-opengraph-images-for-github-repositories-commits-issues-and-pull-requests/)
  - GitHub っぽくないと巷では言われてますね。個人的にもうちょっと octocat を主張してほしい。

# あとがき
今週は面白いネタが少なかった印象でした。ムラがありますね。ゴールデンウィークが始まるので、来週は Productivity Weekly がおやすみです。なので、僕が書いてる Productivity Weekly 記事も次回は 2 週間後になります。ネタが結構多くなるかも。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

## Zellij
https://zellij.dev/

Zellij は rust 製のターミナルマルチプレクサ(tmux や screen)に近いものです。なぜ「近いもの」と表現しているかというと、Zellij はあくまでターミナルワークスペースツールであり、ターミナルマルチプレクサは機能の 1 つに過ぎないと説明されているためです。

大きな違いとしては、layout システムと plugin システムがあることとのことです。しかし、実の所僕は tmux をあまり使ったことがないため比較ができません...（毎回ショートカットキーを覚える前に使わなくなる）

今回実際にインストールして使ってみました。
![](https://storage.googleapis.com/zenn-user-upload/g24h08t85aw9142i3rgm4jggvdua)

mac でのインストールはバイナリをダウンロードして配置するか cargo でインストールする方法しか書かれておらず、ちょっと面倒でした。(rust 使うことないからまず rust のインストールから行った)

また、Alt キーが効かないなど色々問題がでました。

https://github.com/zellij-org/zellij/issues/265

Alt キーに関しては僕の場合 iTerm2 のキープリセットを `Natural Text Editing` に変えることで解決しました。

https://apple.stackexchange.com/questions/136928/using-alt-cmd-right-left-arrow-in-iterm/136931

ただ、なぜかリサイズで矢印キーが機能しない問題も発生しました。これに関しては、デフォルトのキーバインドが矢印キー以外に `hjkl` も使えたためそれでなんとかなりました。

```yaml:example/default.yaml
keybinds:
    ...
    resize:
        ...
        - action: [Resize: Left,]
          key: [Char: 'h', Left,]
        - action: [Resize: Down,]
          key: [Char: 'j', Down,]
        - action: [Resize: Up,]
          key: [Char: 'k', Up, ]
        - action: [Resize: Right,]
          key: [Char: 'l', Right,]
        ...
```
[https://github.com/zellij-org/zellij/blob/cee034127abc41e72b01d6de6aed0dcc26b032a5/example/default.yaml#L47](https://github.com/zellij-org/zellij/blob/cee034127abc41e72b01d6de6aed0dcc26b032a5/example/default.yaml#L47)

良くないことばかり書いてますが、ステータスバーに各モードのキーバインドが表示されるのが個人的にとても嬉しかったです。
ただ、上述の問題があることや、僕の環境では動作が重くレンダリングにラグが出る時があったため、やっぱり tmux の方が良さそうだなという感想に至りました。（tmux もプラグインの導入は可能であるようですし）

なんとも言えない感じになったのでおまけということにしました。