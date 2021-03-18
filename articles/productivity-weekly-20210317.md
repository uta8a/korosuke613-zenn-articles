---
title: "Productivity Weekly (2021-03-17号)"
emoji: "🌑"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上", "EngineeringProductivity"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 18 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## Amazon ECS で、Amazon EC2 または AWS Fargate で実行されているコンテナでのコマンドの実行が可能に
https://aws.amazon.com/jp/about-aws/whats-new/2021/03/amazon-ecs-now-allows-you-to-execute-commands-in-a-container-running-on-amazon-ec2-or-aws-fargate/

ECS で実行されているコンテナ内でコマンド実行できる ECS Exec 機能が利用できるようになりました。これまでは実行中のコンテナへ SSH するためにユーザ側で裏口を用意する必要があり大変面倒でした。これからはサービスやタスクの設定を変更するといった簡単な作業だけでコンテナ内でコマンドを実行できるようになります。

https://dev.classmethod.jp/articles/ecs-exec/

すでにクラスメソッドさんが利用記事を出していました。現状だと AWS CLI v1 でのみ実行可能のようです。こちらも合わせて参照ください。

## AWS Summit Online 2021 - 5/11、12 開催！| AWS
https://aws.amazon.com/jp/events/summits/online/japan/

AWS Summit Online 2021 が 5 月に開催されます。ビジネス向けのセッションが多いと思いますが、開発者向けの内容(Developer Zone)もあり、最新サービスのデモなどが見れるとのことです。

気になる人は今のうちにカレンダーに登録しておきましょう。

## Code scanning: support for additional libraries and frameworks improves CodeQL analysis - GitHub Changelog
https://github.blog/changelog/2021-03-10-code-scanning-support-for-additional-libraries-and-frameworks-improves-codeql-analysis/

GitHub の Code scanning 機能に利用される CodeQL がより多くのライブラリとフレームワークをサポートするようになりました。

Code scanning は GitHub に push されたコードを解析し、セキュリティ上の問題があった場合それを通知してくれる機能です。[僕も昔、バグの原因となるコードの指摘をしてもらったことがあります。](https://twitter.com/Shitimi_613/status/1310896842545049601?s=20)今回、CodeQL のサポート対象が増えたことで、より多くのコードの問題を見つけられるようになりました。

Code scanning はパブリックリポジトリなら無料[^actions]で使えるので、気になる方は有効にしてみてください。

[^actions]: ただし、スキャンするために GitHub Actions を利用した場合はもちろん Actions の利用時間に加算されます。調整してください。

## 【小ネタ】 Sort repositories by name in organizations - GitHub Changelog
https://github.blog/changelog/2021-03-12-sort-repositories-by-name-in-organizations/

GitHub の Organization 内のリポジトリをアルファベット順にソートできるようになりました。

これまでは更新が新しい順にしか並び替えできませんでした。大量にリポジトリがある Organization の場合は重宝するかもしれません。

## Dependabot private registry support public beta - GitHub Changelog
https://github.blog/changelog/2021-03-15-dependabot-private-registry-support-public-beta/

Dependabot がプライベートレジストリをサポートしました（パブリックベータ）。

これまではプライベートレジストリにあるパッケージの更新が Dependabot ではできませんでした。手動での依存関係更新はなかなか大変なのでこれは嬉しいですね[^intra]。

[^intra]: ただしインターネットから接続できない場所にレジストリがある場合は除く。

プライベートな依存関係の話が GitHub Blog の方にもあったのでこちらも合わせて参照ください。
https://github.blog/2021-03-15-dependabot-private-dependencies/

## Dimmed theme beta for GitHub.com
https://github.blog/changelog/2021-03-16-dimmed-theme-beta-for-github-com/

GitHub のテーマに少し薄いダークモードが追加されました。（beta）

[先日GitHubでダークモードが使えるようになりました](https://github.blog/jp/2020-12-11-dark-mode-github-sponsors-for-companies-and-more/#dark-mode)。しかし、[ダークモードはダークすぎる](https://blog.karenying.com/posts/github-darkmode-sucks)という意見もちらほらありました。僕も黒すぎるダークモードにはちょっと違和感がありました。

そんなユーザの声を反映してくれたのか、既存のダークモードよりも落ち着いた淡いダークモードが新たに追加されました。個人的には嬉しい追加なのですが、今度は文字色と背景のコントラストが小さくなりすぎて文字にモヤがかかった感じに見えてしまっています（多分個人差がある）。こちらもまだベータ版なので、今後の調整に期待したいですね。

既存のダークモードがダークすぎてキツいという方はこちらもお試しください。

# know-how
## Dockerfileのベストプラクティス Top 20 | Sysdig
https://sysdig.jp/blog/dockerfile-best-practices/

Dockerfile のベストプラクティス集です。これらを実践することで、セキュリティの問題の防止やアプリケーションの最適化につなげることができます。

Docker のベストプラクティスは昔から色々な Tips がありますが、知識が古いまま更新できていない方もいるかと思います。僕もその中の一人です。そういった方に特におすすめしたい記事です。

## Docker Security - OWASP Cheat Sheet Series
https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html

Open Web Application Security Project による Docker のセキュリティチートシートです。主にコンテナの起動オプションによる制御について記述されています。Docker を扱う際はこれらのルールを確認するだけでセキュリティの向上を見込めます。

Docker を扱う方は [Dockerfileのベストプラクティス Top 20 | Sysdig](#dockerfileのベストプラクティス-top-20--sysdig) と合わせて読むことをおすすめします。

## Scripting with GitHub CLI - The GitHub Blog
https://github.blog/2021-03-11-scripting-with-github-cli/

GitHub CLI の活用方法が色々載った記事です。alias が設定できることや、diff のぺージャーを変更できること、GitHub API が curl より叩きやすいことなど、あまり知られていなさそうな `gh` コマンドの使い方が載っています。

GitHub CLI を使っていない方だけでなく、使っているけどあまり機能を知らない方[^pull]は読んでみるとますます GitHub を上手く使えるようになるかもしれません。

[^pull]: 例えばプルリクエストの作成、マージしかやっていないような人。僕のことです。
## AWS Fault Injection Simulator – Fully managed chaos engineering service – Amazon Web Services
https://aws.amazon.com/jp/fis/

AWS Fault Injection Simulator がとうとう利用可能になりました。AWS Fault Injection Simulator は意図的に AWS の障害を起こすことで、運用しているシステムの耐障害性を確認したり、パフォーマンス改善に役立てたりできるサービスです。

オンプレ基盤なら意図的に障害を起こすことが難しくありませんが、社外クラウド基盤となるとそうも言えません。この機能を使うことでいわゆる GameDay も行いやすくなります。

こちらも早速クラメソさんが記事にしていました。

https://dev.classmethod.jp/articles/aws-fault-injection-simulator-ga/

AWS で運用しているサービスがあるのなら、一度ステージング環境などで試してみると良いかもしれません。

# tool
## iann0036/iamlive: Generate an IAM policy from AWS calls using client-side monitoring (CSM) or embedded proxy
https://github.com/iann0036/iamlive

AWS の API を叩く際などに、IAM ポリシーを作成しますが、Action、Resource を必要最小限で追加していくのはなかなか大変です。複雑なプログラムを作った場合は特に面倒な作業となります。

iamlive はそんな面倒ごとを吹き飛ばしてくれるツールです。AWS の API 呼び出しを監視し、IAM ポリシーを自動生成します。

CSM モードと Proxy モードがあります。CSM モードでは AWS の API 呼び出し時に localhost に配信されるメトリクスを監視することで、API 呼び出しに必要な Action を教えてくれます。Proxy モードでは、localhost にプロキシを建てて、API エンドポイントに送信されるリクエストを検査することで、API 呼び出しに必要な Action と Resource を教えてくれます。

リクエストを監視することから、AWS CLI の実行だけでなく、AWS SDK で作ったプログラムの実行にも対応しています。

今日 AWS API を複数回叩くプログラムで試してみたのですが、必要な Action と Resource のみが許可された最小限なポリシーが自動で作られるのは非常に便利でした。同じようなことで苦しんでいる方は利用してみてください。

## Earthly - Better Builds
https://earthly.dev/

Earthly は Dockerfile と Makefile を融合させたようなビルドシステムです。

Earthly を使うことで、CI で build や lint、test をするために、Dockerfile、Makefile、sh を用意していた場合、それらを全て 1 ファイルにまとめられます。また、必然的に全ての処理は docker コンテナ内で行われるので、OS やプラットフォームに関係なく再現可能なビルドができることがウリにされています。

流行るかどうかは怪しいですが、確かにまとめられるのが楽なことと、個人的におもしろそうだと思いました。気になる人は使ってみてください。

# あとがき
今週は先週と打って変わって生産性向上ネタが多かったです。あと 2 週間ほどでサイボウズに入社してから 1 年になります。早いものですね。また、21 卒の新卒が入社するので楽しみです。生産性向上チームに誰か入ってくれたら嬉しいですね。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000

さらに、サイボウズは毎年インターンシップを開催しているのですが、**なんと今年の夏は生産性向上チームもインターン生受け入れ予定**です。学生の方でご興味があればぜひ下のリンクをご覧ください。
https://cybozu.co.jp/company/job/recruitment/intern/2021/

## omake
今週のおまけです。


### Stickfigure Recorder
https://stickfigure-recorder.web.app/

ウェブカメラの前に立つだけで棒人間の gif を生成するサービスです。撮影、再生時間のトリミング、出力までが全てブラウザ上で行えるため、手軽に棒人間の gif を生成できます。お手軽感が良いですね。すごい。

僕も作ってみました。

![](https://storage.googleapis.com/zenn-user-upload/5fz8zz3ohal83sr9tifzwlxwkndm =400x)
*僕が撮った棒人間です。サイズ落とすためにFPS落としたらなんか黄色くなってしまった。*