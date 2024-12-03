---
title: Copilot Individualを制限してシャドーIT撲滅など｜Productivity Weekly(2024-11-13, 06)
emoji: 📐
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: true
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241113
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
    _本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_
published_at: 2024-12-03 11:00
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-11-13, 2024-11-06 合併号です。

今回が第 168 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
- [@defaultcf](https://zenn.dev/defaultcf)
- [@uta8a](https://zenn.dev/uta8a)
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## Copilot subscription-based network routing is now enforced - GitHub Changelog
https://github.blog/changelog/2024-11-04-copilot-subscription-based-network-routing-is-now-enforced/

GitHub Copilot が通信するエンドポイントが、Copilot のプランに応じて別々になるよう変更されました。
この件は 7/31 に変更告知が [Copilot network requests are now routed based on subscription - GitHub Changelog](https://github.blog/changelog/2024-07-31-copilot-network-requests-are-now-routed-based-on-subscription/) で、8/6 に日程変更が [Revised release plan for Copilot subscription-based network routing - GitHub Changelog](https://github.blog/changelog/2024-08-06-revised-release-plan-for-copilot-subscription-based-network-routing/) で告知されていましたね。

11/4 より前は Copilot のプラン(Individual, Business, Enterprise)によらず `https://*.githubcopilot.com` に対して GitHub Copilot が通信していました。
11/4 以降は Copilot Individual は `https://*.individual.githubcopilot.com` に、Copilot Business は `https://*.business.githubcopilot.com` に、Copilot Enterprise は `https://*.enterprise.githubcopilot.com` に対して通信するようになりました。

この変更によって、例えば会社で Copilot Business を使っているなら `https://*.individual.githubcopilot.com` をブロックして、 `https://*.business.githubcopilot.com` を許可することで Copilot Individual を使ってしまう事態を防げます。シャドーIT をなくしていく際に役立ちそうですね。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## GitHub Copilot code completion in Xcode is now available in public preview - GitHub Changelog
https://github.blog/changelog/2024-10-29-github-copilot-code-completion-in-xcode-is-now-available-in-public-preview/

Xcode で公式に GitHub Copilot が使えるようになりました。補完などの機能が搭載されています。

元々は [intitni/CopilotForXcode](https://github.com/intitni/CopilotForXcode) という非公式のツールが多く使われていました。今回の公式のツールも intitni/CopilotForXcode を元にしています。(参考: [github/CopilotForXcode の Acknowledgements](https://github.com/github/CopilotForXcode?tab=readme-ov-file#acknowledgements))
オリジナルの intitni/CopilotForXcode は GitHub の公式ツールを許諾しているようで、今後は公式ツールとは別路線として LLM を選択可能にするなどの機能を検討しているそうです。(参考: [About GitHub’s CopilotForXcode](https://github.com/intitni/CopilotForXcode/discussions/597))

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Copilot content exclusion is now generally available in IDEs - GitHub Changelog
https://github.blog/changelog/2024-11-12-content-exclusion-ga/

GitHub Copilot content exclusion が、Copilot Business, Copilot Enterprise ユーザに対して GA(Generally Available)になりました。Copilot content exclusion は `.env` のような秘密情報を含むファイルをパスで指定して、Copilot からの返答にそのファイルの情報を含まないようにする除外機能です。
例えば、Copilot Chat の返答に `.env` に書いた環境変数の値を含まないようにしたい場合に利用できます。

現在、Copilot content exclusion は Repository、Organization、Enterprise の 3 つの単位で利用可能です。設定や、設定の変更を Audit log からレビューする方法は[GitHub Docs: Configuring and auditing content exclusion](https://docs.github.com/en/copilot/managing-copilot/configuring-and-auditing-content-exclusion)にまとまっています。

GA になったことによる変更はなく、Public Preview の時と除外設定の書式も変わらないようです。

_本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_

## Introducing an enhanced local IDE experience for AWS Lambda developers | AWS Compute Blog
https://aws.amazon.com/jp/blogs/compute/introducing-an-enhanced-local-ide-experience-for-aws-lambda-developers/

ローカルで AWS Lambda 関数を開発する際の体験が向上しました⤴️
AWS が公式で提供している VSCode の拡張機能である「AWS Toolkit」に、AWS Lambda での開発に役立つ機能がいくつか追加されています。
https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.aws-toolkit-vscode

AWS Toolkit の拡張機能で追加されるサイドパネルに、新たにアプリケーションビルダーという項目が追加されています。
ウォークスルーを選択すると、ステップバイステップで SAM を使用した Lambda 関数の作成できます。
また既存の SAM のプロジェクトを認識して、後述するツールを使用できます。

「Open with Infrastructure Composer」のボタンをクリックすると、現在の SAM の構成をビジュアライズして表示してくれます。
他にはローカル・クラウドでの関数の invoke ができます。ブレークポイントを付けて実行できるため、デバッグがより便利になりそうです。

AWS 公式でこれらの機能を IDE で使えるのはありがたいですね。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Visual Studio Code October 2024
https://code.visualstudio.com/updates/v1_95

VSCode のアップデート来ました！　わいわい！

個人的に面白く感じた機能とその軽い説明は以下です:

- Start a code editing session with Copilot Edits
  - 自然言語で書かれた文章をもとに複数ファイルを自動で編集する Copilot の機能です。
  - [機能を紹介するデモ動画](https://code.visualstudio.com/assets/updates/1_95/copilot-edits-hero.mp4)がわかりやすいです。
- Copilot code reviews
  - Copilot によるレビュー機能が preview になりました。
- Interactive workspace symbol links
  - Copilot Chat が生成する文章において、コードへのリンクが含まれるようになりました。
    - 例えば、リンクをクリックするとある関数を定義する部分にジャンプできたりします。
  - [機能を紹介するデモ動画](https://code.visualstudio.com/assets/updates/1_95/copilot-symbol-links-overview.mp4)がわかりやすいです。
- [Data Analysis for Copilot](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-copilot-data-analysis)
  - Copilot Extension の 1 つで、CSV をいい感じの図に変換するプログラムを生成してくれます。

Copilot がコードを書いて、Copilot がレビューする未来ももう目の前まで来てますね。上手く活用して生産性を爆上げしていきましょう！

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## AWS CodeBuild でビルドの自動再試行のサポートを開始 - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/10/aws-codebuild-retrying-builds-automatically/

AWS CodeBuild でビルドの自動再試行を設定できるようになりました。
AWS マネージドコンソールや AWS CLI などから、最大試行回数を設定できるようになっています。

なにかの不具合やタイミングなどの問題で、単純に再試行すれば回避できる場合は、この設定で楽に運用できる場面もありそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWS Transit Gateway を経由する通信の送信元をセキュリティグループIDで制御できるようになりました | DevelopersIO
https://dev.classmethod.jp/articles/general-availability-security-group-referencing-aws-transit-gateway/

今まで Transit Gateway を介した通信の制御には、CIDR ブロックやプレフィクスリストを使ったものしか利用できませんでした。
今回の変更により、通信の制御にセキュリティグループ ID が使用できるようになりました。
ただし、インバウンドのセキュリティルールのみである点に注意です。また、別の VPC のセキュリティグループを参照できるように設定してあげる必要もあるそうです。

AWS アカウント間でも機能するとのことですので、いろんなところで使い道がありそうです。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Amazon Aurora PostgreSQL Limitless Database is now generally available | AWS News Blog 
https://aws.amazon.com/jp/blogs/aws/amazon-aurora-postgresql-limitless-database-is-now-generally-available/

Amazon Aurora PostgreSQL Limitless Database の一般提供が開始されました。

このサービス自体は遅くとも 2023 年 12 月にプレビューで公開されており、今回満を持して一般提供された形です。
https://aws.amazon.com/jp/blogs/news/join-the-preview-amazon-aurora-limitless-database/

秒間数百万の書き込みトランザクションをサポートしていることから、ユースケースとしては非常にトラフィックの多い大規模なアプリケーションでの DB として採用されることがあるかもしれません。
利用状況に Aurora Limitless Database が自動でスケーリングを行い、書き込みスループットとストレージ容量を確保してくれます。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## Announcing TypeScript 5.7 RC - TypeScript 
https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-rc/

TypeScript 5.7 RC が発表されました！　わいわい！

追加される機能は [TypeScript 5.7 Beta](https://devblogs.microsoft.com/typescript/announcing-typescript-5-7-beta/) で発表された内容と同じです。以降は個人的に面白かった機能を紹介します。

### Checks for Never-Initialized Variables

5.7 以前から TypeScript は未初期化変数の検査が可能で、例えば参考記事から引用する次のコードに対して未初期化変数を検出できました:

```ts
let result: number
if (someCondition()) {
    result = doSomeWork();
}
else {
    let temporaryWork = doSomeWork();
    temporaryWork *= 2;
    // forgot to assign to 'result'
}

console.log(result); // error: Variable 'result' is used before being assigned.
```

しかし、この検査手法は例えば参考記事から引用する次のコードのように、一部のケースで期待通りに検査できませんでした:

```ts
function foo() {
    let result: number

    // do work, but forget to assign to 'result'

    function printResult() {
        console.log(result);
    }
}
```

TypeScript 5.7 では、上記のコードのように、どのようなプログラムの実行パスを通ったとしても初期化されない変数を検出可能になりました。「どのようなプログラムの実行パスを通ったとしても」という点が大事で、次のコードのように、もし初期化される可能性があるならば検出できません。

```ts
function foo() {
    let result: number
    if (someCondition()) {
        result = doSomeWork();
    }
    else {
        let temporaryWork = doSomeWork();
        temporaryWork *= 2;
        // forgot to assign to 'result'
    }

    function printResult() {
        console.log(result); // no error here.
    }
}

```

この機能を試す中で気づいたのですが、トップレベルのコードに対しては全く初期化されない場合でもエラーが出ないようです。例えば次のコードはエラーが出ません:

```ts
let result: number

// do work, but forget to assign to 'result'

function printResult() {
    console.log(result);
}
```

関数でラップすればいいだけなのであまりクリティカルな問題ではないですが、覚えておくと嬉しい日が来るかもしれません。

### Path Rewriting for Relative Paths

これまでは `import { foo } from 'foo.js'` のような形でインポートする必要がありましたが、v5.7 で実装されるオプション `rewriteRelativeImportExtensions` を用いると `foo.ts` の形でインポート可能になりました。[以前 Weekly でも紹介した](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240911#node-v22.7.x-%E3%81%A7-typescript-%E3%82%92%E3%81%9D%E3%81%AE%E3%81%BE%E3%81%BE%E5%AE%9F%E8%A1%8C%E3%81%99%E3%82%8B)、Node.js で TypeScript をそのまま実行する Experimental な機能に合わせてのオプションとのことです。

`.ts` でインポートできるとパッと見嬉しいですが、動的インポートや [Subpath imports](https://nodejs.org/docs/latest/api/packages.html#subpath-imports) などを考え出すと途端に難しくなりそうです。難しすぎて正確に説明できる自信がないので、気になる方は次の記事を参照してください:

https://zenn.dev/uhyo/articles/rewrite-relative-import-extensions-read-before-use

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# know-how 🎓

## AWS ECS Fargate Autoscaling の実戦的な基礎知識 | 外道父の匠
https://blog.father.gedow.net/2024/11/08/aws-ecs-fargate-autoscaling-knowledge/

AWS ECS では開発者がタスクの AutoScaling の設定を工夫して、コストと可用性のバランスを取る必要があります。
（コンピュートリソースに EC2 を使用する場合は、さらに EC2 の AutoScaling を考える必要があります）

記事では AutoScaling の基準となるメトリクスの説明から始まり、その数値をどのように考えてしきい値を定めるべきかが詳しく書かれています。

ECS の AutoScaling を考える時には、先日ご紹介した ["「攻めた」AWS Fargate Spot 比率の見直し時"](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20241023#%E3%80%8C%E6%94%BB%E3%82%81%E3%81%9F%E3%80%8Daws-fargate-spot%E6%AF%94%E7%8E%87%E3%81%AE%E8%A6%8B%E7%9B%B4%E3%81%97%E6%99%82) と一緒にこの記事を読んで、上手く値を考えたいものです。


_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## AWSアカウントを閉鎖する前に見るチェックリスト | DevelopersIO 
https://dev.classmethod.jp/articles/aws-account-close-checklist/

組織で AWS アカウントを管理していると、AWS アカウントを閉鎖することがあるかと思います。
この記事では、AWS アカウントを閉鎖する前に管理者が確認すべきことがまとめられています。

個人的には 8 の「30 日間で閉鎖したアカウントが（Organization）全体の 10% を超えていないか」について、そのようなクオータが存在することを知らなかったので驚きました。
もし特定の Organization で大量にアカウントを閉鎖する必要がある場合は、留意する必要があります。

本記事を読んだことで、改めて AWS アカウントの閉鎖について考えることができる、良い機会となりました。

_本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_

## git rebaseの苦労を減らすための覚え書き | Atusy's blog
https://blog.atusy.net/2024/11/07/git-rebase/

`git rebase` の Tips が紹介されています。扱っているトピックは主に以下です:

1. rebase に失敗した際の復旧方法
2. rebase しやすいコミット方法

1 に関しては消失したコミットを reflog で救い出す方法が紹介されていたり、2 に関してはコミットの粒度を小さくしたり、一度に rebase するコミットの数を減らしたりする方法が紹介されています。

過去の rebase 失敗を今なら救い出せそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# tool 🔨

## 脱データ不整合!? Workflow Engine「Temporal」の魅力
https://zenn.dev/kinosuke01/articles/48fb1687880b59

分散キューを簡単に扱えるようにするライブラリ兼プラットフォーム Temporal の紹介記事です。ユーザーはキューにタスクを積むクライアントと、キューのタスクを消化するワーカーの 2 つを実装すれば、Temporal はタスクの状態遷移やリトライ、二重処理の防止をはじめとする難しい部分をよしなにやってくれるとのことです。よしなにやってくれる部分（Temporal サーバー）は SaaS としても提供されていますが、セルフホストも可能です。

生産性向上チームが多用する AWS で作るシステムは分散システムになりがちなので、Temporal は高度な分散処理をやらざるを得ない場面で活用できるかもと思い興味が湧きました。一方で、チームメンバーから教えていただいたのですが、その用途だと [AWS Step Functions](https://aws.amazon.com/jp/step-functions/) で十分な可能性もあるようです。今後 Temporal と比較調査していきたいですね。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [The GitHub Enterprise Server 3.15 Release Candidate is available - GitHub Changelog](https://github.blog/changelog/2024-11-12-the-github-enterprise-server-3-15-release-candidate-is-available/)
    - GHES 3.15 の release candidate が公開されました
    - 3.15 では、projects に関する GraphQL、Webhook の強化やリポジトリのカスタムプロパティの種類が増える、シークレットスキャンのプッシュ保護が入るなどの変更があります
  - [Introducing Copilot Edits](https://code.visualstudio.com/blogs/2024/11/12/introducing-copilot-edits)
    - VSCode に GitHub Copilot Edits という複数ファイルを対象にした Copilot による編集提案機能が追加されました
    - 例えばテストの修正とコードの修正を両方リンクした上で提案させられます。色々な場面で使えそうです
- **know-how 🎓**
  - [go.mod、DockerfileやCI設定に分散しがちなGoのバージョンをまとめて管理する / Go Connect #3 - Speaker Deck](https://speakerdeck.com/arthur1/go-toolchain-version)
    - はてなさんによる go.mod や Dockerfile、CI 設定などに分散しがちな Go のバージョンをまとめて管理する方法についてのスライドです
    - 宣言したバージョン or それ以上なら OK という場合に使えるテクニックを紹介してくれています
  - ["君は見ているが観察していない"で考えるインシデントマネジメント - Speaker Deck](https://speakerdeck.com/grimoh/jun-hajian-teirugaguan-cha-siteinai-dekao-eruinsidentomanezimento)
    - LUUP さんによる、インシデントマネジメントにおける見ることと観察することの違いについてのスライドです
    - 観察眼の代替としてどういうオブザーバビリティ、ランブックの工夫をすればいいか、観察眼を鍛える上でどういう取り組み（ポストモーテム、インシデント対応訓練など）をすればいいかといった内容が書かれています
    - 自分も見ているだけになってそうなので、考えてみたいです
  - [SREの組織類型に応じた リーダシップの考察 - Speaker Deck](https://speakerdeck.com/kenta_hi/srenozu-zhi-lei-xing-niying-zita-ridasitupunokao-cha)
    - Topotal さんによる、SRE 系組織の中でのリーダシップについてのスライドです
    - 周りの組織を動かすときに考慮する要素、どんな行動を取ると周りの組織を動かせるか、行動に適した組織の形はあるのかといった内容が書かれています
    - 他の組織との関わり方は難しく、僕のいるチームでも参考にできそうです
  - [FourKeys風の指標で開発生産性が4.5倍になった話 | CyberAgent Developers Blog](https://developers.cyberagent.co.jp/blog/archives/50376/)
    - サイバーエージェントさんによる、FourKeys 風の指標で開発生産性が 4.5 倍になった話です
    - なぜエンジニアリング活動の計測と可視化をするのか、可視化のためにデプロイフローを統一する話、その結果として開発生産性が上がったことなどが書かれています
  - [Four Keysを活用してチームの開発生産性を改善した時のふりかえりの考え方と手法を紹介します - ZOZO TECH BLOG](https://techblog.zozo.com/entry/improve-mlops-team-capability)
    - ZOZO さんによる、Four Keys を活用して開発生産性を改善した時のふりかえりに関する記事です
    - 背景、課題、改善サイクルを回すために行なった工夫、ふりかえりのポイントなどが書かれています

_本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_

# あとがき
遅くなってすみません！！！！今週、先週号でした。年の瀬ですね。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
