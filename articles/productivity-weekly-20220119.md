---
title: "Productivity Weekly (2022-01-19号)"
emoji: "⚖️"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20220119"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 59 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news 📺

## Introducing SSO for Docker Business - Docker Blog
https://www.docker.com/blog/introducing-sso-for-docker-business/

Docker Hub & Docker Desktop が SSO[^sso] に対応しました。SAML 2.0 と Azure AD をサポートしています。Docker Business を契約している組織に対して有効です。

[Docker Business プランは去年の Docker Desktop 有料化発表と共に発表された比較的新しいプラン](https://zenn.dev/korosuke613/articles/productivity-weekly-20210901#docker-is-updating-and-extending-our-product-subscriptions---docker-blog)です。大規模な企業の場合、社員のアカウント管理に IdP(Identity Provider) を利用しているところが多いのではないかと思います。他にも請求書払いが可能になるなど、Docker Desktop の有料化対象となる大企業向けのプランとなっています。僕も退職者管理の観点から SSO がないと運用が大変になるので、多くのアカウントを管理する場合は必須だと考えています。

ドキュメントを読む限り組織のメールアドレスをアカウントに紐づける必要があるようです。Docker Hub の場合 GitHub などと違って複数メールアドレスを登録できないため（変更はできる）、既存の個人アカウントをそのまま組織のアカウントとする場合、問題[^sso-problem]が出てくる可能性があるので注意が必要です。運用を考えるに組織用アカウントを別途作るようにした方が良いかもしれません。

:::message
有料化まで 1 ヶ月を切っているにも関わらず Docker 社から SSO の詳細な情報が今まで出てこなかったため、困った方も多かったのではないでしょうか。正直なところもうちょっと早く仕様を教えてほしかったですね。
:::

各社 Docker Desktop 有料化対応をしている皆様、がんばって乗り切りましょう。

[^sso]: シングルサインオンの略。
[^sso-problem]: 退職前にメールアドレスを戻さないと退職後にアカウントが使えなくなるなど。

## CircleCI now offers the most generous free plan anywhere | CircleCI
https://circleci.com/blog/most-generous-free-cicd-plan/

以前 [CircleCI の Free プランでできることが変わった話をしました](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#circleci-%E3%81%AE-free-%E3%83%97%E3%83%A9%E3%83%B3%E3%81%8C%E3%82%88%E3%82%8A%E3%83%91%E3%83%AF%E3%83%95%E3%83%AB%E3%81%AB%EF%BC%81%E3%83%95%E3%83%AC%E3%82%AD%E3%82%B7%E3%83%96%E3%83%AB%E3%81%AB%EF%BC%81)が、とうとう CircleCI のブログで正式な発表[^seisiki]がありました。

[以前書いた記事でも内容には触れています](https://zenn.dev/korosuke613/articles/productivity-weekly-20211108#circleci-%E3%81%AE-free-%E3%83%97%E3%83%A9%E3%83%B3%E3%81%8C%E3%82%88%E3%82%8A%E3%83%91%E3%83%AF%E3%83%95%E3%83%AB%E3%81%AB%EF%BC%81%E3%83%95%E3%83%AC%E3%82%AD%E3%82%B7%E3%83%96%E3%83%AB%E3%81%AB%EF%BC%81)が、以前僕が受け取ったメールの内容にはなかった項目がありました。

- 月最大 6000 ビルド分
- ユーザ数無制限
- パイプラインのパフォーマンスとヘルスメトリクスを確認可能

やはり気になるのは以前の Free プランとの差ですが、もともと月最大何分までビルドできたのかといった情報を見つけるのが大変なためどれくらい何が変わったかの比較が難しいです。また、本記事にはセルフホストランナーが Scale プラン以外でも使えるようになった話やネットワーク、ストレージに制限ができた話について触れられていないので、新しい Free プランおよびその他のプランを知りたい場合はやはり [pricing](https://circleci.com/ja/pricing/) ページを見ることをお勧めします。

リソースクラス、Docker Layer Caching, private orb, セルフホストランナー、flaky test detection などがフリープランで使えるようになり、ライトユーザでもパワフルに CircleCI を使えるようになったのは嬉しいですね。CircleCI には GitHub Actions に無い機能がたくさんある（個人的に嬉しいと思うのがテスト自動分割や Linux Arm インスタンス、レイヤーキャッシング）ため、GitHub Actions しか触ったことないという方は 1 回 CircleCI も調べてみるとニーズに合った CI ワークフローを作れて良いかもしれません。

[^seisiki]: 利用者へのメールや公式 Twitter では言及されていたので正式とは何かとなるかもしれません。

## GitHub Actions - Update on OIDC based deployments to AWS | GitHub Changelog
https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/

GitHub Actions の OIDC で AWS の認証している場合、中間認証局の予期せぬ変更によってワークフローが動かなくなってしまう問題が確認されています。

防止策としては AWS 側で Identity Providers にサムプリントを追加すれば良いとのことです。しかし、原因に関する詳しいことは書かれておらず、引き続き調査中とのことです。

なんとも不穏ですが、GitHub Actions の OIDC で AWS の認証をしている方は引き続きウォッチしていきたいですね。

## 新しい AWS コンソールホームのエクスペリエンスをご紹介 | Amazon Web Services ブログ
https://aws.amazon.com/jp/blogs/news/a-new-aws-console-home-experience/

AWS コンソールのホーム画面が新しくなりました。なお、古いコンソールに戻すことも可能です。

新しいコンソールではウィジェットを並べる方式となり、ユーザごとに知りたい情報を置けるようになりました。現在 8 ウィジェットが用意されており、その中の 5 つのウィジェットが動的にアカウントの情報を出してくれます。

- AWS Health
- Cost and Usage
- お気に入りサービス
- 最近アクセスしたサービス
- Trusted Advisor

個人的に AWS Health と Trusted Advisor、Cost and Usage がホーム画面ですぐに確認できるようになったのが特に嬉しいですね。ウィジェットの種類は今後も増えるようなので楽しみです。

## GitHub Actions: Prevent GitHub Actions from approving pull requests | GitHub Changelog
https://github.blog/changelog/2022-01-14-github-actions-prevent-github-actions-from-approving-pull-requests/

GitHub Actions を使ってプルリクエストを approve できるかどうかをコントロールできるようになりました。

既存だとプルリクエストにプルリクエストを approve するワークフローを入れることで承認する権限がないユーザでもプルリクエストを approve できてしまいます[^akuyou]。今回の機能追加はそれを防止するためのものになります。

しかし、actions を使って正式に approve している既存のワークフローを壊さないように、デフォルトでは approve できる設定となっています。そういった仕組みを用意していない組織はとりあえず無効にしても良いかもしれません。

:::message
ちなみに、この設定は Organization ごとに設定する必要があるため、使い勝手はよくなさそうです...リポジトリごとに設定したい。
:::

[^akuyou]: actions を動かせないといけないため fork 先からこの仕組みを悪用することは基本的に難しいはずですが...actions を動かす権限さえ手に入れてしまえば悪用は簡単でしょう。

## Security-focused improvements for npm | GitHub Changelog
https://github.blog/changelog/2022-01-12-security-focused-improvements-for-npm/

npm のセキュリティ機能強化の話です。組織内で 2FA[^2fa]を矯正できるようになったり、アクセストークンに名前をつけられるようになりました。

いやーようやくアクセストークンに名前をつけられるようになりましたね。今まで名前をつけられなかったのでリポジトリごとにトークンを生やしている場合、どれがどれだか後から見てもわからなくて棚卸しをする時などに大変でした。これからは見分けがつきやすくなります（なお、既存のトークンに名前をつけることはできませんでした...あくまで新規トークンに名前をつけられるようになったということのようです）。

[^2fa]: 二要素認証。

## Mermaid diagrams can be displayed within Markdown · Issue #372 · github/roadmap
https://github.com/github/roadmap/issues/372

GitHub が Mermaid ダイアグラムを Markdown にレンダリングする機能をサポートする予定のようです。

Mermaid はコードからダイアグラムを生成するためのツール・構文です。他のダイアグラムを書くツールとしては [PlantUML](https://plantuml.com/ja/) が有名[^popular]ですが、そちらは GitHub でサポートされていません。

ちなみに Mermaid は最近 notion でも描画をサポートされました（[グラフを生成可能なマークダウン構文「Mermaid」がNotionで利用出来るようになりました #notion | DevelopersIO](https://dev.classmethod.jp/articles/mermaid-markdown-is-supported-in-notion/)）。

Mermaid、僕は触ったことがないのですが GitHub 上でダイアグラムを描画できるようになると便利なので使えるようになりたいです。まだこの機能はリリースされていないので使えるようになるのを楽しみに待ちましょう。

[^popular]: 主観です。

# know-how 🎓

## How we ship GitHub Mobile every week | The GitHub Blog
https://github.blog/2022-01-12-how-we-ship-github-mobile-every-week/

GitHub Mobile のリリースフローについての記事です。

リリースフローの全体図と、ビルドとリリース、受け入れテストのための Issue 自動生成、リリースノートの自動生成、バージョン管理の 4 つの詳細を説明しています。

ビルドやリリース作業の大半は GitHub Actions で自動化されており（リリースブランチの作成も毎週自動で行われる）、人手による作業は必要最小限となっています。また、手動で行う受け入れテストも手順のチェックリストが Issue として自動生成されるので、誰でも対応できるようになっています。

他にもリリースに必要な工数をできるだけ削減する工夫が各所でされていて、リリースサイクルを小さく回したい、リリースにかける工数を減らしたいといった場合にとても参考にできそうです。

## Terraform だけを使って GitHub Actions OIDC ID プロパイダの thumbprint を計算する方法
https://zenn.dev/yukin01/articles/github-actions-oidc-provider-terraform

[上で取り上げた GitHub Actions の OIDC で AWS への認証を行う場合にサムプリントが必要になる問題](#github-actions---update-on-oidc-based-deployments-to-aws-|-github-changelog)がありました。この記事では、この問題を受けて Terraform でサムプリントを計算する方法を紹介しています。

サムプリントは GitHub 公式で紹介されている固定値を入れてもいいのですが[^calc]、（Terraform で IdP プロバイダを管理している場合）Terraform で計算を行うことで今後またサムプリントを追加する必要などが出た場合に対応しやすくなっています。

こんな方法があったかととても勉強になりました。また、サムプリントを固定値として埋め込まなくてもいい、変更があった時に気づけるのは嬉しいですね。

[^calc]: この記事は GitHub による声明が出る前に書かれたようで、サムプリントの計算が必要だとされています。

# tool 🔨

## 自然な日本語ダミーテキストを生成するWebアプリを作りました
https://zenn.dev/sabigara/articles/88757a61fdba8e

マルコフ連鎖を用いて自然だけど支離滅裂な日本語ダミーテキストを生成する Web アプリを作った方による紹介記事です。Web ページのデザインや開発時に埋め込むプレースホルダとして使われることが想定されています。

記事では類似サービスとの比較や実装の詳細が説明されています。API も用意されておりプログラマブルにダミーテキストを取得できるのは嬉しいですね。

なんかそれっぽい適当な日本語テキストが必要な場合に思い出したいサービスです。

:::message
余談ですが、[AIのべりすと](https://ai-novel.com/)という最近登場したサービスを思い出しました。こちらも自然な日本語文章を作るサービスなのですが、割と意味のある創作文章を作ってくれるので遊んでみると楽しいです。こちらの場合は無料だと生成に時間がかかるので、ダミーテキストを生成したいだけなら AI のべりすとではなく上記サービスを利用するのが良いと思います。（一応規約的には自己責任の範囲内で自由に使えるとのことです。2022/01/23 時点）
:::

# koneta 🍘
Productivity Weekly で出たネタを全て紹介したいけど体力が持たない、または、そんなに言うことがなかったネタを一言程度で書くコーナーです。

- [Git.io no longer accepts new URLs | GitHub Changelog](https://github.blog/changelog/2022-01-11-git-io-no-longer-accepts-new-urls/)
  - 短縮 URL 生成サービス Git.io の新規登録ができなくなりました。
  - 今までの短縮 URL には引き続きアクセスできます。
  - GitHub が提供しているんですね。存在自体初めて知りました。

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

## omake 🃏
今週のおまけです。

### Coinhive事件、無罪確定 二審の有罪判決から逆転 - ITmedia NEWS
https://www.itmedia.co.jp/news/articles/2201/20/news118.html

https://twitter.com/moro_is/status/1484046829579038720

:::message alert
このセクションには個人（素人）の見解が含まれています。間違ったことや的外れなこと言ってたらごめんね。
:::

暗号通貨を Web サイト訪問者に採掘させるツール Coinhive を自身の Web サイトに設置して罪に問われた事件、いわゆる Coinhive 事件の無罪が確定しました。

判決などについて詳しいことは書きませんが、閲覧者の意図に反して CPU を使用したからダメだなんて、それを言い始めたら世の中の JS ほとんどアウトじゃんと思っていたので無罪になったのは個人的に嬉しいです。~~もっと悪質な広告が山ほどあるからそっち取り締まってくれ。~~

どうやら無断で動かしていた反意図性は認められたものの、PC に悪影響を及ぼすほどではないので不正性は認められないということで二審の有罪判決が覆ったようですね。たしかにという感じ。

Coinhive のようなサイト閲覧者の CPU を使ってマイニングさせて利益を得るというモデルは個人的に割とアリだと思っています。サイトに広告を置くモデルは、サイトの見た目が悪くなってしまうし閲覧者にとってはノイズになってウザいので正直好きじゃないんですよね。広告を出すのにも閲覧者の CPU を使うので、その分マイニングするから広告出ないって方が双方にとって嬉しいんじゃないかと思います。（もちろん広告と同程度の CPU 使用率で利益が出るのかということやどれくらい CPU 使用率を使って良いものかといった話はあります。）

逆にこの判決で世の中に溢れる Web 広告は生き延びてしまったということを呟いてる方もいて、たしかにそれはそれで残念という気持ちもありました。

なんにせよこの判決がきっかけで閲覧者にマイニングさせることで収益を出すモデルが流行ってくれるといいなとか思っています。でも判決内容的に完全にホワイトになったかというとそうではない感じなのでまだまだ難しい気もしますが。

罰金 10 万払えば済んだのにもっと面倒な裁判を起こして 4 年近く戦ったモロさんに敬意を表したいと思います。
