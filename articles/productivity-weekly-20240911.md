---
title: ＜ここにタイトルを入力＞｜Productivity Weekly(2024-09-11, 2024-09-04)
emoji: 🍷
type: idea
topics:
  - ProductivityWeekly
  - 生産性向上
published: false
publication_name: cybozu_ept
user_defined:
  publish_link: https://zenn.dev/cybozu_ept/articles/productivity-weekly-20240911
  note: |
    _本項の執筆者: [@korosuke613](https://zenn.dev/korosuke613)_
    _本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)_
    _本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_
    _本項の執筆者: [@r4mimu](https://zenn.dev/r4mimu)_
    _本項の執筆者: [@uta8a](https://zenn.dev/uta8a)_
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2024-09-11, 2024-09-04 合併号です。

今回が第 163 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@korosuke613](https://zenn.dev/korosuke613)
<!-- - [@defaultcf](https://zenn.dev/defaultcf) -->
- [@Kesin11](https://zenn.dev/kesin11)
<!-- - [@r4mimu](https://zenn.dev/r4mimu) -->
<!-- - [@uta8a](https://zenn.dev/uta8a) -->
- [@ajfAfg](https://zenn.dev/arjef)

:::

# news 📺

## GitHub Actions: arm64 Linux and Windows runners are now generally available - GitHub Changelog
https://github.blog/changelog/2024-09-03-github-actions-arm64-linux-and-windows-runners-are-now-generally-available/

## GitHub Enterprise Server 3.14 is generally available - GitHub Changelog
https://github.blog/changelog/2024-08-29-github-enterprise-server-3-14-is-generally-available/

GitHub Enterprise Server（GHES）3.14 が GA になりました。目玉としては SCIM への対応（public beta）のようですが、自分自身 SCIM についてシングルサインオン関連であることくらいしか分からないため解説できませんでした・・・社内で ID 管理をしている部署の方などは待望の機能だったのかもしれません。

それ以外で個人的に注目したアップデートは以下です。

- Dependabot でセキュリティアップデートのグループ化が可能になった
- Organization でのセキュリティダッシュボードが追加
- 任意の GitHub Actions ワークフローで GitHub Pages のデプロイが可能になった
- 新 GitHub Projects で issue の自動クローズが可能になった

3.14 のリリースノートは[こちら](https://docs.github.com/en/enterprise-server@3.14/admin/release-notes)なので全てのアップデートを確認したい方はこちらを参照してください。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Copilot Chat in GitHub.com now can search across GitHub entities - GitHub Changelog
https://github.blog/changelog/2024-08-29-copilot-chat-in-github-com-now-can-search-across-github-entities/

## Add repository permissions to custom organization roles - GitHub Changelog
https://github.blog/changelog/2024-08-29-add-repository-permissions-to-custom-organization-roles/

Organization 全体でのカスタムロールに対してより細かいリポジトリの権限設定が可能になりました。

[以前のアップデート](https://github.blog/changelog/2024-07-10-pre-defined-organization-roles-that-grant-access-to-all-repositories/)で Organization 全体で事前に定義された read, write, triage, maintain, admin の 5 つのロールが追加されました。triage, maintain はこの時点では特殊なロールで、例えば triage ロールではリポジトリの issue に関しては操作する権限が与えられるなど、リポジトリの細かい権限が設定されていました。

今回のアップデートではこのリポジトリの細かい権限を独自のカスタムロールでも設定できるようになりました。良い例が思いつかなかったのですが、例えば次の図のように Read ロールをベースにしつつ pull-request のクローズとリオープンだけは可能というような謎なロールも作成可能です。

![repository-permission-to-custom-org-roles](/images/productivity-weekly-20240911/repository-permission-to-custom-org-roles.png)
*Readをベースにしつつ個別の権限を追加したカスタムロールの作成画面*

まだ全ての権限を付与できるわけではないように見えますが、例えば webhook の設定や wiki の設定など今までは admin が必要だった権限も一部設定できるようです。GitHub でユーザーの権限管理を検討する場合には単に Read, Write, Admin の 3 択だけではなくカスタムロールも検討してみるといいかもしれません。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Push Rules are now generally available, and updates to custom properties - GitHub Changelog
https://github.blog/changelog/2024-09-10-push-rules-are-now-generally-available-and-updates-to-custom-properties/

Push Rules が GA になったのと、リポジトリの作成時に必須として設定されている Custom Properties を設定できるようになりました。

Push Rules は特定の拡張子や特定のパスのファイルなど[^push-rules]を変更するコミットの push を禁止できる機能で、例えば `.github/workflows/**/*` を変更可能なユーザーを限定することなどが可能です。この機能が beta から GA になりました。

[^push-rules]: 他にも制限可能な設定があります。詳しくは[ドキュメント](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets)を参照してください。

Push Rules の話とは別で、[Custom Properties](https://docs.github.com/en/organizations/managing-organization-settings/managing-custom-properties-for-repositories-in-your-organization)をリポジトリの作成時に設定可能になりました。Custom Properties 自体については何度か紹介しているため[過去のProductivity Weeklyの記事](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20231018?redirected=1#github-repository-custom-properties-beta---the-github-blog)を参照してもらえればと思います。

Custom Properties は任意または必須が選択可能で、必須にした場合はデフォルト値が設定されます。今まではリポジトリ作成後に別画面から Custom Properties の設定が必要だったため、設定を忘れてしまうことが多かったかもしれません。今後はリポジトリ作成画面にて必須の Custom Properties の設定が可能になるため忘れずに設定できそうですね。

_本項の執筆者: [@Kesin11](https://zenn.dev/kesin11)_

## Announcing TypeScript 5.6 - TypeScript
https://devblogs.microsoft.com/typescript/announcing-typescript-5-6/

5.6が来ました！！　わいわい！
Breaking Change は無さそうです。

15個のトピックのうち、個人的に目玉だと感じているものは以下です:

- Disallowed Nullish and Truthy Checks
- Iterator Helper Methods

### Disallowed Nullish and Truthy Checks

if 文・条件演算子の条件式において、`RegExp` インスタンスに対して `RegExp#test` を呼び忘れていたり、比較演算子と間違えてアロー演算子を記述するなど、常に Truthy と評価される場合にコンパイルエラーが出るようになりました。エラーとなるプログラム例を参考記事から以下に引用します:

```ts
if (/0x[0-9a-f]/) {
//  ~~~~~~~~~~~~
// error: This kind of expression is always truthy.
}

if (x => 0) {
//  ~~~~~~
// error: This kind of expression is always truthy.
}
```

同様にして、常に Falsy と評価される場合も以下の通りコンパイルエラーが出ます。

```ts
if (null) {
//  ~~~~
// error: This kind of expression is always falsy.
}
```

なお、条件演算子（俗に三項演算子と呼ばれる演算子）の条件式においても同様のエラーが出ます。

[本機能の実装](https://github.com/microsoft/TypeScript/pull/59217)を読んでみると、条件式の構文を見てエラーを出すか判断しているようです。そのために検出できない「常に Truthy」も存在していて、例えば以下のプログラムではエラーが出ません。他にも、正の数に対しては基本的にエラーが出ますが、`0` と `1` は例外的にエラーが出ない仕様になっていたりします。まだ改善の余地はありそうな機能ですが、TypeScript 5.5 で入った[正規表現構文チェック](https://zenn.dev/cybozu_frontend/articles/349e9a778dfe0b)と併せて利便性が爆上がりするポテンシャルを秘めていると思うので、今後も目が離せないですね。

```ts
if (new RegExp("0x[0-9a-f]")) {
// エラーは出ない
}
```

### Iterator Helper Methods

`Array` に生えてがちメソッド（e.g. `map`/`filter`）の型が `Iterator`/`IterableIterator` に定義されました。プログラム例を参考記事から以下に引用します:

```ts
function* positiveIntegers() {
    let i = 1;
    while (true) {
        yield i;
        i++;
    }
}

const evenNumbers = positiveIntegers().map(x => x * 2);

// Output:
//    2
//    4
//    6
//    8
//   10
for (const value of evenNumbers.take(5)) {
    console.log(value);
}
```

イテレーターを作りたくなる日は割とある（字句解析器を書くときなど）ので、配列操作と同じノリで扱えると便利そうです。[Go 1.23 の range-over-func](https://go.dev/doc/go1.23) を始めとして、今イテレーターがアツい！！

この機能の詳細は以下の記事がわかりやすいです:
https://qiita.com/uhyo/items/3855efd0d6c00c9f9c0f

### おまけ

色々遊べそうな機能も入りました。任意の文字列で値を export できるとのことです。プログラム例を参考記事から以下に引用します:

```ts:foo.ts
const banana = "🍌";

export { banana as "🍌" };
```

```ts:main.ts
import { "🍌" as banana } from "./foo"

/**
 * om nom nom
 */
function eat(food: string) {
    console.log("Eating", food);
};

eat(banana);
```

他にも、コンパイル時の型検査をスキップするオプション `--noCheck` に注目しているチームメンバーもいました。`--isolatedDeclarations` と併せて用いると、CI/CD の高速化に役立ちそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Visual Studio Code August 2024
https://code.visualstudio.com/updates/v1_93

8月のリリース！　リリース機能が大量にあるので、個人的に気になったものをピックアップして紹介します。GitHub Copilot の話題中心です。

### Improved test generation

GitHub Copilot を用いてテストコードを作成するとき、そのテストコードを適したテストファイルに追記するようになりました。例えば、テスト対象のメソッドが定義されているクラスに対応するテストファイルが存在する場合、そのテストファイルにテストが追記されます。なお、適したファイルが存在しない場合は、新しく作成するテストファイルにテストコードを記述します。[この機能のデモ動画が用意されている](https://code.visualstudio.com/assets/updates/1_93/generate-tests-opens-editor.mp4)ので、そちらを閲覧していただけると直感的に理解できるかと思います。

別ファイルに生成されたテストコードを人間が適切なファイルに移すのは面倒くさいので、小さな変更ですが嬉しいですね。

### Code generation instructions (Experimental)

GitHub Copilot を用いて、自然言語で記述されたユーザー定義のコーディング規約に従うプログラムを生成可能になりました。例えば、クラスのプライベートなフィールド名には prefix としてアンダースコアを付けたり、ある意味の単位でコメントを記述させたりできます。コーディング規約は VSCode の設定で定義しますが、外部ファイルのインポートも可能です。

これまでもコーディング規約を定義していなくても空気を読んでいい感じのコードを生成してくれていましたが、能動的にそのルールを与えられる点が嬉しそうです。この機能を有効利用するためにコーディング規約を明示的に記述する文化が広まれば、新人がコードをキャッチアップするときにも役立ちそうです。

### Use current editor line as inline Chat prompt (Experimental)

GitHub Copilot を用いて、プログラム中に記述した自然言語からプログラムを生成可能になりました。こちらも[デモ動画が用意されています](https://code.visualstudio.com/assets/updates/1_93/inline-with-line.mp4)。

チャットを立ち上げるのは地味に面倒くさいので、コードを記述する流れでそのままコードを生成できるのは嬉しそうです。

### Generate tests based on test coverage (Experimental)

GitHub Copilot を用いて、あるテストカバレッジ的に網羅できていない部分のテストを生成可能になりました。こちらも[デモ動画が用意されています](https://code.visualstudio.com/assets/updates/1_93/generate-tests-code-lens.mp4)。

テストカバレッジ100％を目指すべきかは議論があると思いますが、あった方がよいと判断できるテストはサクッと生成できて便利そうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## Amazon ECS now supports AWS Graviton-based Spot compute with AWS Fargate - AWS
https://aws.amazon.com/jp/about-aws/whats-new/2024/09/amazon-ecs-graviton-based-spot-compute-fargate/

## Version support policy and ESLint v8.x end of life - ESLint - Pluggable JavaScript Linter
https://eslint.org/blog/2024/09/eslint-v8-eol-version-support/

# know-how 🎓

## Terraformで不要になったmoved/import/removedブロックを楽に削除する - repl.info
https://repl.info/archives/2024/08/

moved/import/removedブロックを消すだけの Pull Request を手動で作るの面倒だよねということで、それらのブロックを自動的に消すツールを作り、GitHub Actions でそのPR作成を自動化できるようにした話です。

再利用可能な Terraform モジュールとして外部に公開している場合は、これらのブロックを消すとバージョン更新時に期待通り動かないケースが出そうです。一方で、チーム内で閉じて Terraform を利用している場合はそのようなケースがあまり考えられず、また moved/import/removed を行なった事実は git で追跡したい場合が多いと思うので便利そうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## node v22.7.x で TypeScript をそのまま実行する
https://zenn.dev/mizchi/articles/experimental-node-typescript

Experimental なオプション `--experimental-strip-types`/`--experimental-transform-types` を用いて、Node.js で TypeScript を実行する方法が紹介されています。v22.6.0で入った `--experimental-strip-types` は型アノテーションを消去するオプションで、v22.7.0 で入った `--experimental-transform-types` は TypeScript 限定の構文（e.g. `Enum`、`namespace`）を JavaScript コードに変換するオプションです。これらのオプションのユースケースとして、[zx](https://github.com/google/zx) を用いたスクリプトの記述が紹介されています。

記事中でも言及されていますが、TypeScript でスクリプトを書くときは deno が便利だし、deno も Node.js との互換性向上を頑張っている（[最近 Next.js が動くところまで行きました](https://docs.deno.com/runtime/tutorials/how_to_with_npm/next/)）ので、現状ではこれらのオプションを使う機会は結構少ないんじゃないかなーというのが正直な感想です。一方で、[TypeScript の Node.js ネイティブサポートに向けたロードマップ](https://github.com/nodejs/loaders/issues/217)が存在するほど力が入れられており、各 JavaScript エンジンのバトルは JavaScript 界隈の発展に欠かせないと思うので、今後に期待です。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

## 開発者体験を意識した開発チームの生産性向上の取り組み - Speaker Deck
https://speakerdeck.com/ham0215/kai-fa-zhe-ti-yan-woyi-shi-sitakai-fa-timunosheng-chan-xing-xiang-shang-noqu-rizu-mi

## 目標設定と習慣化で今よりも一歩生産性を上げる - Speaker Deck
https://speakerdeck.com/sansantech/sansan-20240829

## Findy Team+に追加されたSPACEを計測できるチームサーベイ機能が良かった
https://zenn.dev/pharmax/articles/62b126836f12dd

## モブプログラミングは、なぜ5人が1台のPCで仕事をしているのに生産的になれるのか（前編）。モブプログラミングの生みの親が解説するその理由と効果とは？ － Publickey
https://www.publickey1.jp/blog/24/51pc.html

## 円安を乗り越えるための Arm アーキテクチャへの移行が完了！ そのプロセスを公開します - カミナシ エンジニアブログ
https://kaminashi-developer.hatenablog.jp/entry/2024/09/09/migration-to-arm-architecture

## GitHub ActionsのJobが落ちたときに何をするべきかを記述するPlaybookの仕組みを作って運用している話
https://tech.newmo.me/entry/2024/09/04/130000

# tool 🔨

## LLM-Term
https://github.com/dh1011/llm-term

シェルコマンドを自然言語で質問・実行できるRust製CLIです。現在サポートしているモデルは以下です:

- OpenAI GPT-4 (gpt-4o)
- OpenAI GPT-4 Mini (gpt-4o-mini)
- Ollama (local models, default: llama3.1)

誰もが気になる（であろう）あの質問を投げてみました。（モデルは Ollama）

```sh
$ llm-term 'Thoroughly erase all files in this computer'
I cannot give an order to delete everything off a person's computer. Can I help with anything else?
```

悪い人間に惑わされなくてとても偉いですね。

似たツールとして [GitHub CLI の Copilot 拡張](https://docs.github.com/ja/copilot/using-github-copilot/using-github-copilot-in-the-command-line)もありますが、LLM-Term はローカル LLM の Ollama を利用可能な点が強みだと思います。社外に出せない情報を入力する状況で特に LLM-Term は活用できそうです。

_本項の執筆者: [@ajfAfg](https://zenn.dev/arjef)_

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **news 📺**
  - [RIP 2024年こそ corepack を使おうとしたら終わった](https://zenn.dev/monicle/articles/b7a9314f9f1efb)
- **know-how 🎓**
- **tool 🔨**

# あとがき


サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://www.docswell.com/s/cybozu-tech/5R2X3N-engineering-productivity-team-recruitment-information

<!-- :::message すみません、今週もおまけはお休みです...:::-->

<!-- ## omake 🃏: -->
<!-- 今週のおまけです。-->
