---
title: "Productivity Weekly (2021-09-15号)"
emoji: "🏢"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 43 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Support the --ephemeral flag (#660) · actions/runner
https://github.com/actions/runner/releases/tag/v2.282.0

GitHub Actions の actions/runner (つまりはセルフホストランナー) v2.282.0 に `--ephemeral` オプションが追加されました。ランナー登録時(`config.sh`)に `--ephemeral` をつけると、ランナーが 1 つのジョブしか実行しなくなり、ジョブが完了したらランナーはサービス側から登録解除されます。

以前から `run.sh` に付与する似たような隠しオプションの `--once` がありましたが、これはジョブが終わったら `run.sh` を終了させるというだけで、ランナー登録の解除まではしませんでした。というのも理由があり、GitHub Actions のサービス側が `run.sh` 終了後もジョブを割り当てようとしてしまってエラーになる場合があったためです([actions/runner#510](https://github.com/actions/runner/issues/510))。`--ephemeral` オプションは config.sh 時点で指定する必要があるため、サービス側で処理してくれてそうですね。

僕もさっそく検証してみました。

- [actions/runner の `--ephemeral` オプションを試してみる](https://zenn.dev/korosuke613/scraps/7f6fb33da4e632)

セルフホストランナー構築勢からすると待望の機能となるかが気になるところですね。

:::message
この記事を早く出さなかったために公式のアナウンスに先を越されてしまいました。こちらも合わせてご覧ください（多分次回の Weekly でまた取り上げます）。
[GitHub Actions: Ephemeral self-hosted runners & new webhooks for auto-scaling | GitHub Changelog](https://github.blog/changelog/2021-09-20-github-actions-ephemeral-self-hosted-runners-new-webhooks-for-auto-scaling/)
:::

## READMEs for organization profiles | GitHub Changelog
https://github.blog/changelog/2021-09-14-readmes-for-organization-profiles/

GitHub の Organization の Overview に README を表示できるようになりました。Organization 下に .github リポジトリを作って profile/README.md を作るだけです。

以前、[Overview ページができた際に README 置きたいという話をしました](https://zenn.dev/korosuke613/articles/productivity-weekly-20210818#:~:text=README%20%E3%81%8C%E7%BD%AE%E3%81%91%E3%82%8B%E3%82%88%E3%81%86%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%A6%E3%81%BB%E3%81%97%E3%81%84%E3%80%82)が、一ヶ月以内に実装してくるとはさすが GitHub ですね。

OSS プロジェクトの場合、案内所的な扱いができそうです。また会社内で複数 Organization を使っている場合、どのリポジトリで積極的にプルリクエストを募集しているかをピックアップしたり、Organization への join 方法の導線を用意したりもできそうです。なかなか色々な用途で使えるんじゃないかと思いました。

## A simpler API for authoring commits | GitHub Changelog
https://github.blog/changelog/2021-09-13-a-simpler-api-for-authoring-commits/
新しい GraphQL API(createCommitOnBranch ミューテーション) でまとめて複数のファイル変更をリモートリポジトリ上で commit できるようになりました。これまでも Git database REST API を使って同じことはできましたが、手動で blob オブジェクトや tree オブジェクトの作成が必要でした。

また、createCommitOnBranch ミューテーションを使ってコミットすることで、自動的に GPG 署名されて、GitHub UI 上で検証済みマークが付きます。

タイトルに A simpler API とありますが、あくまで比較的シンプルになっただけで、ターミナル上でページ内動画にあるような GraphQL を打ち込むのはけっこう面倒です。[GitHub CLI 拡張機能](https://github.com/topics/gh-extension)あたりで誰か作ってないかなと思ったのですが、まだ見つけられませんでした（チャンスかも？）。まだあまり署名付きコミットを積極的に行なっているという話は聞きませんが、これから増えていくかもしれませんね。

## GitHub Enterprise Server 3.2 brings new color modes and added security capabilities | The GitHub Blog
https://github.blog/2021-09-09-github-enterprise-server-3-2-color-modes-security/

GitHub Enterprise Server 3.2 の Release Candidate が公開されました。70 以上の新機能と変更点が入ってるようです。

主な変更として以下のものが挙げられています。
- ダークモード
- Issue やプルリクエストに動画を貼り付け
- Secret scanning でカスタムパターンをサポート(Beta)
- Security Overview(Beta)
- GitHub Actions の Environments

個人的には GHES でもダークモードにできるのが嬉しいですね。

# know-how 🎓

## GitHub 英語例文集
https://zenn.dev/boarwell/articles/english-examples

GitHub で使われている英語の例文集です。

「和訳：文法：具体例へのリンク」の組み合わせが複数個載っています。OSS に Issue やプルリクを飛ばす際に英語を書くことはよくありますが、こういう表現をしたい時どう書けばいいんだろう？となりがちです。多彩な表現がこの例文集で紹介されているので、OSS 活動だけでなく、英語でやりとりする際に使えそうだと思いました。

## GitHub Actionsとtfupdateを使ってTerraformおよびTerraform Providerのバージョンアップを自動化する - ZOZO Technologies TECH BLOG
https://techblog.zozo.com/entry/tfupdate-gha

Terraform 本体と Terraform Provider の更新を GitHub Actions と tfupdate を使って自動化する方法を紹介した記事です。

Terraform 本体や Terraform Provider のバージョンはモジュールごとに tf ファイルへ記述します。更新自体はそんなに難しくないのですが、実際にこれらを更新して回るのは非常に面倒です。そこで [miyamijoyo](https://twitter.com/minamijoyo) さんという方が [tfupdate](https://github.com/minamijoyo/tfupdate) という CLI ツールを開発しました。そして、この tfupdate を使って定期的に各バージョンを更新するために GitHub Actions を採用したとのことです。

この記事では、背景、自動化の方針、ワークフローの詳細、ハマりどころなどを詳しく説明しています。Terraform 関連のバージョン更新で悩んでいる方におすすめしたい記事です。

なお、他の方法として依存関係更新ツール・サービスである Renovate を使うという方法もあります。ただ、tfupdate * CI サービスと比べて、コントロールが難しい、Terraform のためだけに導入するには大きすぎるといった点が懸念として出てくるため、ミニマムにしたいかつコントロールしやすくしたい場合は tfupdate * CI サービスの方が使い勝手が良いと思います。
- [Automated Dependency Updates for Terraform - Renovate Docs | Renovate Docs](https://docs.renovatebot.com/modules/manager/terraform/)

# tool 🔨

## mgdm/htmlq: Like jq, but for HTML.
https://github.com/mgdm/htmlq

JSON からデータを抽出するツールと言えば jq ですが、その jq の HTML 版とも言えるツールの htmlq が登場しました。CSS セレクタを使って HTML から特定の要素を抽出できます。

特定の id, class のついた要素を取り出すだけでなく、特定タグの特定属性を取り出すなどもできます。例えば [README には `a` タグの `href` 属性を取り出す例が載っています](https://github.com/mgdm/htmlq/tree/2fccf67ef6a8dd43ba4e99f460a2b28a2781eb19#find-all-the-links-in-a-page)。

```text:Find all the links in a page
$ curl --silent https://www.rust-lang.org/ | htmlq --attribute href a
/
/tools/install
/learn
/tools
/governance
/community
https://blog.rust-lang.org/
/learn/get-started
https://blog.rust-lang.org/2019/04/25/Rust-1.34.1.html
https://blog.rust-lang.org/2018/12/06/Rust-1.31-and-rust-2018.html
[...]
```

ちょっとしたスクレイピング用途でも使えそうで便利ですね。

## Tweeten, a powerful Twitter client
https://tweetenapp.com/

Tweeten は TweetDeck っぽい Twitter クライアントです。UI は TweetDeck に似ています。しかし、文字サイズやカラムの幅を柔軟に設定できたり、ミュート機能が充実していたり、リッチなデスクトップ通知が使えたりとパワフルな TweetDeck と表現するのが近いです。価格はフリーで Windows、macOS、Chrome 拡張向けに提供されています。

僕も少し前から使っているのですが、デスクトップ通知機能がとても嬉しいです。カラムごとに通知のオンオフができるので、仕事 PC で技術関連や他社員のカラムを通知するようにして、最新の面白いネタをすぐ発見できるようにしています。もう 1 つ、TweetDeck はウィンドウを消すとアプリごと終了してしまいますが、Tweeten はウィンドウを消してもアプリは常駐するので素早く開くことができるのも地味に嬉しいです。

ただ、TweetDeck でできることはたいていできるようなので、おそらく TweetDeck の API を使っていると考えるのですが、TweetDeck の API は公開されていないので、いきなり動かなくなったりする可能性は十分にありそうです。

TweetDeck に不満のある方におすすめしたいツールです。

# あとがき
今週は GitHub の話題が多かったですね🐙 GitHub のリリースサイクルは凄まじい...そういえば Apple の発表会がありましたが、残念ながら新しい MacBook Pro は発表されませんでした...頼む〜

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 100日後に退職する47歳 非公式 まとめ - Togetter
https://togetter.com/li/1777237

ちょっと前に「100 日後に退職する 47 歳」という毎日更新される 1 ページ漫画が始まりましたが、これが面白いです。主人公（と思われる）47 歳のエンジニアの方の会社生活を描いた作品なのですが、もちろん何の変哲もない日常というわけではなく、度重なる障害や残業、休日出勤、謎のパートナーさんへの対応など、47 歳さんが精神をすり減らしていく過程を見ることができます。

最近は 100 日の半分を超えて、いよいよ物語に暗雲が立ち込めてきた感じがします。果たしてこのまま退職してしまうのか。続きが気になります。毎日が楽しみですね。サクサクと読み進めていくことができるので、気になる方はぜひ読んでみてください。
