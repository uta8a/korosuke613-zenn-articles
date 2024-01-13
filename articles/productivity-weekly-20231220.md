---
title: "actions/artifacts@v4アツい、CIの話題多め、おまけあり｜Productivity Weekly(2023-12-20号)"
emoji: "🏖️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20231220"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-12-20 単独号です。

今回が第 137 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
- [@r4mimu](https://zenn.dev/r4mimu)
<!-- - [@uta8a](https://zenn.dev/uta8a) -->

:::

![](/images/productivity-weekly-20231220/seisan_syain_tyamoji_no_grasan.png =300x)
*[生産性向上チームのマスコットキャラクター、セイサンシャインくん爆誕](#omake-%F0%9F%83%8F%3A-%E7%94%9F%E7%94%A3%E6%80%A7%E5%90%91%E4%B8%8A%E3%83%81%E3%83%BC%E3%83%A0%E3%81%AE%E3%83%9E%E3%82%B9%E3%82%B3%E3%83%83%E3%83%88%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E3%80%81%E3%82%BB%E3%82%A4%E3%82%B5%E3%83%B3%E3%82%B7%E3%83%A3%E3%82%A4%E3%83%B3%E3%81%8F%E3%82%93%E7%88%86%E8%AA%95)*

# news 📺

## GitHub Actions - Artifacts v4 is now Generally Available - The GitHub Blog
https://github.blog/changelog/2023-12-14-github-actions-artifacts-v4-is-now-generally-available/

[actions/upload-artifact](https://github.com/actions/upload-artifact)と[actions/download-artifact](https://github.com/actions/download-artifact)の v4 がリリースされました。

v4 の目玉としてはパフォーマンスが大幅に改善されたようです。GitHub Actions でジョブ間のファイルの受け渡しやビルドした成果物の保存などのために upload-artifact を使用した際に意外と時間がかかるケースを何度も見たことがあるので、個人的には待望の改善です。

一方で、BREAKING CHANGES がいくつかあります。まず v3 と v4 の間に互換性がなくなっており、具体的には v3 の upload-artifact でアップロードした場合に v4 の download-artifact でダウンロードできません。Renovate などで自動アップデートさせている場合は download-artifact と upload-artifact を個別にアップデートしようとすると CI が通らない可能性があるので注意が必要です。
また、upload-artifact ではアーティファクトを同名でアップロードすることが許されなくなりました。特に matrix を利用している場合は起こりがちのため、回避策も記事中のリンクで紹介されています。

ちなみに、自分は両方のパターンを踏み抜きました。皆さんはお気をつけください。

これ以外にもいくつか新機能があります。より詳しい詳細は[v4のREADME](https://github.com/actions/upload-artifact/tree/v4.0.0?tab=readme-ov-file#v4---whats-new)に記載されているので、気になる方はこちらもチェックしましょう。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## GitHub Next • Technical Preview Sunsets
https://gist.github.com/idan/325676d192b32f169b032fde2d866c2c

GitHub Next[^gh_next]が提供するいくつかのテクニカルプレビューが 2023/12/15 で終了しました。この連絡はプレビュー利用者に対してメールで送られてきました。上記リンクはそのメールの内容を GitHub Next の中の人が Gist に残したものですね。

実際に終了した機能は以下です。

- [Copilot for PRs](https://githubnext.com/projects/copilot-for-pull-requests)
- [Copilot for Docs](https://githubnext.com/projects/copilot-for-docs)
- [Copilot Labs](https://githubnext.com/projects/copilot-labs)
- [Blocks](https://blocks.githubnext.com/)

Copilot for PRs は GitHub Copilot によるプルリクエストのレビューやテスト生成、PR 自体を作る機能で、Docs の方は React などの技術ドキュメントを学習した GitHub Copilot とチャットできる機能でした。
これらは [GitHub Universe 2023 で発表された](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231115?redirected=1#universe-2023%3A-copilot%E3%81%8Cgithub%E3%82%92ai%E3%82%92%E9%A7%86%E4%BD%BF%E3%81%97%E3%81%9F%E9%96%8B%E7%99%BA%E8%80%85%E3%83%97%E3%83%A9%E3%83%83%E3%83%88%E3%83%95%E3%82%A9%E3%83%BC%E3%83%A0%E3%81%B8%E3%81%A8%E5%A4%89%E8%B2%8C%E3%81%95%E3%81%9B%E3%82%8B---github%E3%83%96%E3%83%AD%E3%82%B0) GitHub Copilot Enterprise や GitHub Copilot Workspace の機能として生まれ変わったように思います。

Copilot Labs は VSCode 向けの拡張機能で、GitHub Copilot にテストを書かせたりコードを説明させたりといった応用的な機能でした。これらは GitHub Copilot Chat の GA でその役目を終えたように思います。

Blocks に関しては残念ながら代替機能がリリースされるわけではないようです。ただ、今後 GitHub.com を拡張する上でこの実験記録は参考にしていくようです。

テクニカルプレビュー自体は終了しましたが、Blocks 以外は今後も使っていくことが可能です。今後もどんどん実験的機能を出していってほしいですね。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

[^gh_next]: GitHub Next は次世代のソフトウェア開発を担う実験的機能を開発・提供するための GitHub の組織です。

## 新しいコスト最適化ハブは、推奨アクションを一元化してコストを節約します | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/new-cost-optimization-hub-to-find-all-recommended-actions-in-one-place-for-saving-you-money/

AWS re:Invent 2023 において、AWS のコスト最適化を支援する Cost Optimization Hub が発表されました。

Cost Optimization Hub では、使用されていないリソースを検出したり、コスト最適化につながる購入オプションを推奨してくれたりします。
例えば EC2 の場合、適切なインスタンスサイズを提案したり、Savings Plans を提案したりしてくれるようです。

どういうリソースに対応してるかや具体的にどういう情報を提供してくれるかはクラメソさんが記事にして出してくれています。

- [コストで差をつけろ！！re:Invent 2023 で発表された AWS Cost Optimization Hub を紹介！ | DevelopersIO](https://dev.classmethod.jp/articles/introduction-to-aws-cost-optimization-hub/)

コスト最適化のベストプラクティスは知っていても該当リソースを 1 つ 1 つ洗い出すのは大変ですよね。Cost Optimization Hub を使って効果的にコスト最適化を進めていきましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Code scanning default setup is now available for self-hosted runners on GitHub.com - The GitHub Blog
https://github.blog/changelog/2023-12-19-code-scanning-default-setup-is-now-available-for-self-hosted-runners-on-github-com/

GitHub の Code scanning のデフォルト設定を Self-hosted runner でも利用できるようになりました。GitHub.com ではすでに利用可能で、GitHub Enterprise Server では v3.9 から利用可能です。

[Code scanning](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning) はソースコードに含まれてしまった脆弱性などを検知してくれる仕組みで、内部的には GitHub 製の CodeQL というツールが使われています。

昔は CodeQL を実行する GitHub Actions のワークフローを用意する必要がありましたが、[2023/01 頃からデフォルト設定であればワークフローを用意する必要がなくなりました](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230111?redirected=1#code-scanning-can-be-set-up-more-easily-without-committing-a-workflow-file-to-the-repository-%7C-github-changelog)。（ただし、ワークフローが必要なくなっただけで CodeQL の実行には GitHub Actions が利用されます。）

今回の変更は、そのデフォルト設定を動かすランナーに Self-hosted runner が使えるようになったというものです。また、Larger runner でも実行できるようになりました。

デフォルト設定の Code scanning を実行するためには `code-scanning` ラベルを付与します。細かい制約等は記事をご覧ください。

巨大なリポジトリでは強いランナーを使いたくなるので、Larger runner で動かせるようになったのは嬉しいですね。また、セルフホストランナーしか使えない GHES でも使えるようになったのはありがたいです。（まあワークフローを用意すればいい話ではありますが）

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## Docker社がTestcontainersの開発元AtomicJar社の買収を発表。Dockerでの統合テスト環境を強化 － Publickey
https://www.publickey1.jp/blog/23/dockertestcontainersatomicjardocker.html

前回の[Productivity Weekly](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231213)でも取り上げた Testcontainers の開発元が Docker 社に買収されました。こちらの Docker 社のブログでも年の記事で早速 TestContainers が取り上げられており、今後に期待できそうです。

https://www.docker.com/ja-jp/blog/8-top-docker-tips-tricks-for-2024/

最近の Docker 社は Docker Desktop の改善だけではなく、ローカル環境で Docker を用いた開発体験を向上させるための取り組みを積極的に行っているように感じますね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## HashiCorp Vaultもフォークへ、「OpenBao」がLinux Foundation傘下で進行中
https://www.publickey1.jp/blog/23/hashicorp_vaultopenbaolinux_foundation.html

[HashiCorp の OSS 製品が Business Source License になった](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230816#hashicorp-adopts-business-source-license)こと、[Terraform の fork であり MPL-2.0 を維持する OpenTofu が爆誕した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230913#the-opentf-fork-is-now-available!)ことはまだ記憶に新しいと思います。

HashiCorp の Business Source License 製品は Terraform の他に Nomad や Vault がありますが、Terraform に続き Vault も新たに fork された新プロジェクト OpenBao が誕生していることが明らかになりました。

まだ OpenTofu ほどプロジェクトは進んでいないようですが、今後に期待ですね。

> ロゴもすでに公開されており、下記のおまんじゅうがそれです（JavaScriptランタイムのBunのロゴにそっくりな気がします...）。

そっくり過ぎて笑いました。Bun と混同するからやめてほしい。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# know-how 🎓

## Large Runner + リモートキャッシュで爆速 Bazel のフルテスト | by 松原信忠 | Dec, 2023 | MIXI DEVELOPERS
https://mixi-developers.mixi.co.jp/github-actions-large-runner-and-bazel-remote-cache-94e0d52e664a
MIXI さんによる Bazel を使ったテストの実行時間を Bazel のリモートキャッシュ機能と GitHub Actions の Larger Runner を使って爆速化したという話です。

デフォルトのランナー（2 コア）では 20 分弱かかっていたテストが Larger Runner（32 コア）だと 2 分程度で済むようになったのは劇的ですごいですね。Bazel の並列実行性能もすごそうですね（Bazel 使ったことない民）。
（リモートキャッシュはそこまで短縮化に効いてなさそうで意外でした。）

2 コアの Linux が $0.008/min で 32 コアの Linux が $0.128/min なので、$0.008 * 20 = $0.16 と $0.128 * 2 = $0.256 の差があることになります。
料金的には上がっていますが、エンジニアの人件費を 18 分短縮できたと考えるとコスパの良い投資になるのではないでしょうか。

Larger Runner は無料枠に入らない上にデフォルトのランナーと比べて料金はもちろん高くなるため、手を出していないところも多いのではないでしょうか？今回のように大幅な時間短縮が見込める場合は案外 Larger Runner を使った方が安上がりになることもあります。
皆さんも Larger Runner 利用を検討してみましょう。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

## CircleCI関連の月額コストを1日で10%削減する - freee Developers Hub
https://developers.freee.co.jp/entry/2023/12/18/110000

Freee さんの CircleCI のコスト削減事例です。お手軽にコスト削減ができる施策を紹介しています。

1 つ目はストレージの保存期間を短くすることです。
キャッシュ、ワークスペース、アーティファクトの保存期間を短くすることで、ストレージの使用量を減らしています。

2 つ目は、ECR のリージョンを変更することです。
CircleCI は AWS の [us-east-1 で動いている](https://support.circleci.com/hc/en-us/articles/18232867121819-Best-Practices-for-Minimizing-AWS-Data-Transfer-Costs-with-CircleCI-and-ECR)ため、ECR のリージョンを us-east-1 にすることで、データ転送料を削減しています。
また、これによりイメージ取得時間も短縮されて、一石二鳥な施策です。

感想として、ストレージ保存期間を変更することは、コストや容量が気になって初めて意識する事が多いですが、要件に応じてあらかじめ保存期間を短くしてしまうのはいい手だなと思いました。
また、CircleCI 公式で AWS のデータ転送におけるベストプラクティスが公開されていることを知り、勉強になりました。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

## 【OpenTelemetry】CLIでトレースが送れるotel-cliが便利そうだったので触ってみる
https://ryuichi1208.hateblo.jp/entry/2023/12/17/005818

スクリプトから OpenTelemetry トレースを送信するツール otel-cli の紹介記事です。

otel-cli のドキュメントでは OpenTelemerty Collector や各種 OTEL 対応しているサービスのトレーシングの動作確認の用例と、
さらに面白い使い方として CI パイプラインに組み込む例が示されていました。
[Instrumenting CI Pipelines using otel-cli](https://pokgak.xyz/articles/instrument-your-ci/)
CI パイプラインのボトルネックを探すことにも使えそうですね。

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_


## Terraform v1.7.0で久々にアップデートのあったグラフ機能でイイ感じにTerraformを可視化したい人生だった - APC 技術ブログ
https://techblog.ap-com.co.jp/entry/2023/12/14/140255

Terraform v1.7.0 でリソースの依存関係をグラフで可視化するコマンド `terraform graph` に更新があったことを機に、Terraform リソースの可視化方法について考えられた記事です。

v1.7.0 以前と以降で `terraform graph` の出力結果を確認していますが、正直なところ相変わらずで見やすくなっているとは言い難く、結論としては、v1.7.0 の `terraform graph` は今後に期待という感じでした。

そこで、[Pluralith](https://www.pluralith.com/) という可視化サービスが紹介されています。
Pluralith はローカルでの実行は無料で、CI 上での実行は plan 回数に応じた料金設定となっています。(API Key を払い出して CI 上でセットアップスクリプトを書けば無料で使えてしまいそうなのですが、どうなのでしょうか)
出力される画像は、リソースグループや仮想ネットワークなどが階層構造で表示されていたり、リソースが新規作成か削除かが色分けされていて見やすいです。
また、コストの概算も表示されるのが既存の可視化ツールよりも嬉しいですね。

Terraform 可視化ツールは他にもいくつかあるみたいなので、興味がある方は調べてみるといいかもしれません。参考：https://gkzz.dev/posts/alternative-terraform-graph/

_本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [パスキーの基本とそれにまつわる誤解を解きほぐす](https://blog.agektmr.com/2023/12/passkey-mythbusting.html)
    - Passkey の基本的な知識とよくある誤解を解説してくれている記事です
    - 僕も正直雰囲気で Passkey 使っているので勉強になりました。Passkey よくわからんって人に教えてあげると良いですね
- **tool 🔨**
  - [Wave Terminal](https://www.waveterm.dev/)
    - 新しいターミナルエミュレータ Wave Terminal が開発されています
    - インラインで Markdown や画像をレンダリングできたり、VS Code と同じエディタでインライン編集できたり、セッションと履歴を保存してたりと面白そうです
    - いかんせんまだ Bash でしか使えないようなので、Zsh 使いの僕は待ちですね
  - [【Rust製構成管理ツール】JetPorch とは【次世代Ansible？】 #Rust - Qiita](https://qiita.com/pollenjp/items/aa54c7b236e40faae776)
    - JetPorch という Ansible っぽい構成管理ツールが開発中とのことです
    - 気になりますが、現在公式サイトが閉鎖されているようで、詳細がわかりません...今後に期待ですね
  - [AlexSim93/pull-request-analytics-action: Generates detailed PR analytics reports within GitHub, focusing on review efficiency and team performance.](https://github.com/AlexSim93/pull-request-analytics-action)
    - プルリクエストを解析して PR がマージされるまでにどれだけかかってるかや誰がどれだけ PR を作っているかなどさまざまな情報を出してくれます
    - 雑に試してみました。結構細かく分析してくれるみたいですが、どううまく使うかという感じですね
      - ほとんどデフォルト設定: https://github.com/korosuke613/zenn-articles/issues/551
      - 3 ヶ月分の PR を見る設定: https://github.com/korosuke613/zenn-articles/issues/552

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# omake 🃏: 生産性向上チームのマスコットキャラクター、セイサンシャインくん爆誕
![](/images/productivity-weekly-20231220/seisan_syain_aoji_gurasan.png =300x)
*グラサン掛けてるバージョン（作者とは別の社員が描いた）*

今週のおまけです。
僕が所属する生産性向上チームのマスコットキャラクター、セイサンシャインくんが爆誕しました。

作者は [@takamin55](https://zenn.dev/takamin55) です。冒頭と本節のビーチでくつろいでいるセイサンシャインくんに関しては、社内の別の方が描いてくれました。

![](/images/productivity-weekly-20231220/seisan_syain.jpg =300x)
*オリジナル体。「生産性が向上した結果くつろげる時間を手に入れたセイサンシャイン君（生産社員）」と書かれている*


どうやって決まったかというと、社内で生産性向上チームメンバ + 有志がそれぞれ考えたマスコットキャラクターを出し合い、社内投票によって決まりました。僕もレッサーパンダにスパナ🔧のマゲを加えたキャラクターを出したのですが、残念ながらダメでしたね。個性的なキャラクターがたくさん出てきてよかったです。

セイサンシャインくんはたぶん生産性向上チームを「生産性上げる社員」と捉えて、太陽（shine）と掛けた結果生まれたキャラクターなのでしょう。原案には「生産性が向上した結果くつろげる時間を手に入れたセイサンシャイン君（生産社員）」と書かれており、その表情はまるで慈愛に満ちた仏像。

実は生産性向上チームのスローガンは「ビーチへ行く余裕をあなたに...」なんですよね。人間には余裕と休息が必要なのです。生産性向上チームの働きによって社内エンジニアがビーチへ行く余裕を手に入れられるよう精進しています。
セイサンシャインくんはまさにビーチへ行ってそうですね（別社員が描いた絵もビーチに行ってる）。我々にふさわしいキャラクターなのではないでしょうか。

原案は鉛筆で適当に描いた感がいい味出しています。必要なのはツールではないことを教えてくれていますね。

今後生産性向上チーム主催のイベントとかにちょくちょく出てくるかもしれません。皆さん暖かい目で見守ってあげてください。

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
2023/12/20 号でした。遅くなってしまいすみません。ようやく僕の 2023 年が終わります。
年末年始は[バルダーズゲート 3](https://www.spike-chunsoft.co.jp/baldursgate3/) ばっかりやってました。マジで時間泥棒。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://speakerdeck.com/cybozuinsideout/engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

