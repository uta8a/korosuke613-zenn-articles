---
title: "Productivity Weekly (2021-06-02号)"
emoji: "🍣"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 28 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## AWS Lambda でお気に入りの運用ツールを使い始める – 拡張機能が正式にリリース | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/getting-started-with-using-your-favorite-operational-tools-on-aws-lambda-extensions-are-now-generally-available/

AWS Lambda Extensions が正式にリリースされました。Lambda Extensions を利用することで Lambda 関数のコードに手を加えずにさまざまな運用ツールを Lambda に組み込むことができます。

Lambda Extensions では本体の関数の裏で Extensions API、Runtime Logs API を使用してログやメトリクスを収集したり、任意の処理を実行できたりします。すでに Datadog や HashiCorp Vault などのサービスと連携できる拡張機能がいくつか公開されています。

ユースケースはいろいろあります。例えば Lambda 関数には監視ツールなどを常駐できないため、CloudWatch などを経由してメトリクス収集する仕組みを作る必要があり、なかなか面倒でした[^timeout]。もし Datadog を利用しているならば、公開されている Datadog 拡張機能で CloudWatch に記録されるメトリクスやログを簡単に Datadog に送ることができるようになります。集中して関数本体のロジックを考えられるのは良いですね。

なぜ Lambda Extensions が嬉しいのかは以下の記事が詳しく説明してくれています。
https://dev.classmethod.jp/articles/cons-of-lambda-extensions/

また、独自の Lambda 拡張機能を作ることもできます。早速クラメソさんが記事にしていました。
https://dev.classmethod.jp/articles/lambda-extensions-send-gcp-cloud-logging/

まだ東京リージョンでは使えません。使えるようになるのが楽しみですね。それまでは別のリージョンで使い勝手を試しておきたいです。

[^timeout]: 関数の処理が終わったらそのまま Datadog API を叩いてデータを送るなどの方法もありますが、関数がタイムアウトしてしまうとデータを送ることができないという問題がありました。

## Docker Expands Trusted Content Offerings for Developers | Docker
https://www.docker.com/press-release/docker-expands-trusted-content-offerings

Docker 社は検証済みイメージの提供を拡大することを発表しました。具体的には Docker Hub にある検証済みイメージが Amazon ECR Public と Mirantis Secure Registry[^mirantis] にも配布されるようになります。

Amazon ECR Public のイメージを AWS サービス内からプルする場合、転送料がかからないので AWS ユーザにとってはコスト削減につながります。また、プルにかかる時間も Docker Hub と比べて短くなるはずです。

まだ公開されてはいませんが、使えるようになるのが楽しみですね。

[^mirantis]: [Mirantis](https://www.mirantis.co.jp/)は Container as a Service プラットフォームを提供する企業です。k8s IDE の LENS を作ってる企業ですね。Mirantis Secure Registry はコンテナイメージのプライベートレジストリになります。

## Announcing GitHub Actions Arm runners for the Arm Compute platform on Oracle Cloud Infrastructure
https://blogs.oracle.com/cloud-infrastructure/announcing-github-actions-arm-runners-for-the-arm-compute-platform-on-oracle-cloud-infrastructure


Oracle と GitHub は Arm ベースの GitHub Actions self-hosted runner を Oracle Cloud Infrastructure 上で構築するための Terraform テンプレートを提供開始しました。

self-hosted runner は自身が管理するマシンで動かす GitHub Actions ランナーのことです。ランナーを追加するための方法は GitHub Actions のランナー追加画面に載っていました。

これを AWS などのパブリッククラウドで動かすためにはインスタンスを建ててランナーを起動するだけでなく、subnet や internet gateway を設定する必要があります。そのため、どういう構成にするかは自分で考える必要がありました。しかし、今回の Terraform テンプレートを使うことで、そういった構成を考える必要なく self-hosted runner を Oracle Cloud 上に配置させることができます。

これまでも似たようなテンプレートが第三者によって公開されてきました。しかし、GitHub およびパブリッククラウドベンダーが今回のようなものを公開するのはおそらく初めてだと思います。

やはり、できるだけ公式で用意されたものを利用したいので、AWS や GCP 向けのテンプレートも公式で出していってほしいですね。

ちなみに今回のテンプレート自体は GitHub で管理されています。気になる人はソースコードを参照してみましょう。
https://github.com/oracle-quickstart/oci-github-actions-runner

僕も試してみましたが、`Deploy to Oracle Cloud`ボタンをクリックし、Oracle Cloud コンソール上でポチポチするだけ（それと ssh 公開鍵の登録）でデプロイできたのでとても簡単でした。どうやらオートスケーリングには対応しておらず、固定台数を常時起動するようになっているようです。

![](https://storage.googleapis.com/zenn-user-upload/a71d083f6d43e538f782a6c3.png =640x)
*動いてる動いてる（ジョブが落ちてるのはこちらの不備のため）*

余談ですが、Oracle Cloud では一部のリソースが常に無料(Always Free)で利用できます。最近すごいインスタンス（語彙力）が Always Free に追加されたので、試しに遊んでみるのもよいかと思います。

- [Oracle Cloud、最大160コアのArmプロセッサを用いた「OCI Ampere A1 Compute」開始。無償で4CPU/24GBメモリを期限なく提供、Arm対応のJenkinsやKubernetesも － Publickey](https://www.publickey1.jp/blog/21/oracle_cloud160armoci_ampere_a1_compute4cpu24gbarmjenkinskubernetes.html)
- [Oracle Cloudの無料枠でKubernetesクラスタを構築する(完全版) | blog.potproject.net](https://blog.potproject.net/2021/06/01/oracle-cloud-kubernetes/)

![](https://storage.googleapis.com/zenn-user-upload/94b6b4b20e9de45947730da8.png =320x)
*今回試してみた self-hosted runner も Always Free である VM.Standard.A1.Flex で動いています*

## Amazon CloudWatch Logs が Metric Filters での Dimension のサポートを発表
https://aws.amazon.com/jp/about-aws/whats-new/2021/05/amazon-cloudwatch-logs-announces-dimension-support-for-metric-filters/

Amazon CloudWatch Logs のメトリクスフィルターにディメンションを設定できるようになりました。

メトリクスフィルターは CloudWatch Logs のロググループを監視し、独自のメトリクスを発行できる機能です。ディメンションを設定できるようになったことで、さらに柔軟にメトリクス収集ができるようになりました。

さっそくクラメソさんが解説記事を出しています。メトリクスフィルターやディメンションに関する説明がわかりやすく詳細に載っているため、気になる人はこちらを参照してください。~~説明がむずくて丸投げしてしまいました...~~

https://dev.classmethod.jp/articles/amazon-cloudwatch-logs-announces-dimension-support-for-metric-filters/

# know-how 🎓

## [Docker Tokyo #35]Docker 20.10
https://www.slideshare.net/AkihiroSuda/docker-tokyo-35-docker-2010-248638956

去年の暮れにリリースされた Docker 20.10 の新機能を説明したスライドです。Docker の最新機能を追っかけられていない人（僕もそうです）におすすめです。

僕の場合、特に `RUN --mount=type=...`と `COPY --chmod` 周りの機能については存在すら知りませんでした。常に知識をアップデートしていきたいですね。

# tool 🔨

## MSW – Seamless API mocking library for browser and Node | Mock Service Worker
https://mswjs.io/

msw は Mock Service Worker の略で Web API をモック化するための npm ライブラリです。API のモッキングライブラリと言えば [Nock](https://github.com/nock/nock)などがありますが、msw は Service Worker 自体をモック化できるため、ブラウザ上での API 呼び出しにも対応できます[^lookie]。

僕は主にバックエンドのコードを触っており、API を叩く関数のテスト時は Nock を使っています。msw を試しに使ってみたところ、Nock よりも使うメソッドが少なく簡単にモックを作成できた[^try]（個人の感想です）ため、次回テストコードを書くときは msw を使ってみたいと思いました。その他のモッキングライブラリとの比較は [Comparison](https://mswjs.io/docs/comparison) にまとまっています。

こういうライブラリのおかげでテストを書くのが簡単になってよいですね。

[^lookie]: フロントエンドについて詳しくないため、Service Worker あたりの説明はちょっと自信ないです...
[^try]: [ここら辺](https://github.com/korosuke613/playground/tree/main/javascript/mswjs/src/__tests__)で試してました。

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [React to any GitHub release to show your support! | GitHub Changelog](https://github.blog/changelog/2021-06-01-react-to-any-github-release-to-show-your-support/)
  - GitHub Releases のリリースに対してリアクションができるようになりました 👍
  - 開発者は心がほんわかしますし、使用者は感謝の気持ちを伝えられて良いですね
  - それが目的なのかネガティブなリアクション（👎、😕）はできないようになっていました
- [Azure Functions が辛すぎて泣きそうになった話](https://zenn.dev/sakojun/articles/20210529-azure-functions)
  - Azure Functions を AWS Lambda みたいなものだと思ってたら結構違くて辛い思いをしたという話です（僕も Lambda 的なものかと思ってました）
  - すでに AWS Lambda のようなサーバーレス関数サービスを利用していて、これから Azure Functions を触るような方は読んでおくとよいかもしれません

# あとがき
今年ももう少しで半分を超えますね...早すぎる...
最近は新卒で入ったエンジニアの子が生産性向上チームへチーム体験に来てます。やはり人が増えるとタスクの進み具合が早くなって良いなあと思うところです（もちろん限度はある）。

というわけで絶賛人募集中です。開発者の生産性を上げるのが好きな方、エントリー待ってます。カジュアルに話してみたい方がいたら僕の Twitter に連絡していただいても構いません。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

## omake
今週のおまけです。

### 任天堂株式会社ニュースリリース :2021年6月2日 - 任天堂宇治小倉工場用地の利用について｜任天堂
https://www.nintendo.co.jp/corporate/release/2021/210602.html

任天堂が今は使われていない工場用地を「任天堂資料館（仮称）」として再利用することを発表しました。

資料館は任天堂が過去に発売した商品を展示、および、何かしらの体験ができる観光施設となるようです。場所は京都府宇治市で、2023 年度完成予定です。

僕が初めて買ってもらったゲーム機はゲームボーイアドバンスの「星のカービィ夢の泉デラックス」と「ポケットモンスタールビー」でした。懐かしいですね。その後はニンテンドーDS、Wii、3DS、Switch という風に遊んできました。ゲームが好きだったことから、小中学生の頃はゲームクリエイターになりたいという夢がありました。その後、やっぱゲームクリエイターは違うなと思い、今は Web エンジニアをやっています。実は、今の僕があるのはゲームのおかげといっても過言ではありません。

完成したらぜひ行ってみたいですね。