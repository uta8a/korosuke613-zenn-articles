---
title: "Productivity Weekly (2023-06-07号)"
emoji: "🚉"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: false
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20230607"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。


2023-01-25 号から、基本的に隔週で連載することとしました。たまに単独でも投稿するかもしれません。
今週は 2023-06-07 単独号です。

今回が第 115 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

:::message
2023-05-10 号から、実験的に生産性向上チームの他メンバーにいくつかのトピックを紹介していただくことにしています。

対象のトピックでは、文章の最後に `本項の執筆者: <執筆者名>` を追加しています。

今週の共同著者は次の方です。
- [@defaultcf](https://zenn.dev/defaultcf)

:::

# news 📺

## GitHub Actions - Just-in-time self-hosted runners | GitHub Changelog
https://github.blog/changelog/2023-06-02-github-actions-just-in-time-self-hosted-runners/

GitHub Actions において、新たなセルフホストランナーを立てる仕組みとして Just-in-time 方式が追加されました。

使い切りのランナーを立てるという点では ephemeral ランナーと変わりませんが、Just-in-time ランナーは使うまでの手順が異なります。

詳しくは [Kesin11](https://zenn.dev/kesin11/) さんが使い方やメリデメをまとめた記事を挙げているので、公式ドキュメントと合わせてご覧ください。
大変参考になります。

- [新しいjust-in-time runnerでセルフホストランナーのオートスケールが劇的に楽になりそう](https://zenn.dev/kesin11/articles/20230607_runner_jitconfig)

実際に僕も試しに触ってみました。気になる人は眺めてみてください。

- [GitHub Actions の Self-hosted Runner の Just-in-time を試してみる](https://zenn.dev/korosuke613/scraps/c0b9dc86d54d0b)

これまではランナーのマシン本体でランナー登録（`./config.sh` の実行）を行う必要がありましたが、Just-in-time ランナーではランナー登録を API で行えるようになったため、ランナー登録とランナーの起動を別々のマシンで行えるようになりました。ランナー登録を一元化できるのはいろいろと嬉しいです。
他にもラベルの指定が柔軟にできるようになる、ランナーの登録解除を自動でしてくれるのも大きいですね。

[最近は Actions Runner Controller による Scale Sets mode も登場](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20230517#github-actions---actions-runner-controller-public-beta-%7C-github-changelog)していますが、こちらは Actions Runner Controller の導入が必須となります。
それと比べて Just-in-time ランナーは、通常の ephemeral なランナー周りを改善したものになるので、自前でオートスケールする仕組みを用意している人などもこれを導入しやすいです。

個人的には今後は Just-in-time ランナーを使っていく流れになるかなと予想していますが、まだまだ登場して日が浅いので今後どうなるかって感じですね[^recent]。

[^recent]: 正直最近セルフホストランナー周りの新情報が多すぎて追うのが大変ですね...

## Security enhancements to required approvals on pull requests | GitHub Changelog
https://github.blog/changelog/2023-06-06-security-enhancements-to-required-approvals-on-pull-requests/

GitHub において、プルリクエストのブランチ保護や承認に関するセキュリティが強まります。
次の 3 つの仕様変更があります。

- a. ローカルで作成されたマージコミットが、保護されたブランチにプッシュされた場合、その内容がシステムで作成されたマージと異なると、却下される
- b. ブランチ保護で dismiss stale approvals を有効にしている場合、承認後にマージベースが変更されるたび、承認が却下されるようになった
- c. ブランチ保護で required pull request review を有効にしている場合、対象ブランチに対するプルリクエストで承認しておけば、同じターゲットを持つ同じコミットを持ったブランチを手動でマージ＆push 可能でしたが、これができなくなった

#### 「a. ローカルで作成されたマージコミットが、保護されたブランチにプッシュされた場合、その内容がシステムで作成されたマージと異なると、却下される」について

GitHub では、GitHub 上でプルリクエストをマージせずに、ローカルでマージをして push することでプルリクエストをマージしたことにできました（ブランチ保護をチェックした上で）。

これまではマージコミットを改ざんしてもブランチ保護さえクリアできていれば上記の方法でプルリクエストをマージできました。

GitHub Enterprise Server(GHES) および GitHub.com で実験した例を次に示します。

:::details マージコミットの改ざん実験
次の手順を GHES、および、GitHub.com で行った場合、GHES では push（プルリクエストのマージ）が可能でしたが、GitHub.com では push ができませんでした。

なお、ベースブランチにはブランチ保護を有効にし、強い権限でバイパスできないように `Do not allow bypassing the above settings` にチェックを入れています。

**手順**
1. 適当なプルリクエストを作る
2. ローカルでベースブランチに switch し、プルリクエストのヘッドブランチを手動でマージする。この時マージコミットを作る
3. ファイルを適当に変更する
4. `git commit --amend --no-edit` でマージコミットを上書きする
5. プッシュする

```terminal:マージコミットを改ざんして push on GHES
❯ git switch main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.

❯ git merge futa-hirakoba-patch-5 --no-ff
Merge made by the 'ort' strategy.
 README.md | 2 ++
 1 file changed, 2 insertions(+)

❯ touch hogehoge

❯ git add hogehoge

❯ git commit --amend --no-edit
[main 4458a7a] Merge branch 'futa-hirakoba-patch-5'
 Date: Thu Jun 15 17:28:23 2023 +0900

❯ git push origin main
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 10 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 558 bytes | 558.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://<GHESのホスト>/futa-hirakoba/playground.git
   f0f43b8..4458a7a  main -> main
```

![](/images/productivity-weekly-20230607/ghes-pushed-tampered-merge-commit-1.png =600x)
*プルリクエストはマージされたことになる*

![](/images/productivity-weekly-20230607/ghes-pushed-tampered-merge-commit-2.png =600x)
*本来このプルリクエストによる変更は `README.md` だけ*

![](/images/productivity-weekly-20230607/ghes-pushed-tampered-merge-commit-3.png =600x)
*main ブランチのコミットログを見るとマージコミットに `hogehoge` の変更が加わっている。これはプルリクエストにはなかった変更*

GitHub.com で同じことをすると `GH006: Protected branch update failed for refs/heads/branch_protection_check.` エラーで push が拒否される。

```terminal:マージコミットを改ざんして push on GitHub.com
❯ git switch branch_protection_check
Switched to branch 'branch_protection_check'
Your branch is up to date with 'origin/branch_protection_check'.

❯ git merge korosuke613-patch-8 --no-ff
Merge made by the 'ort' strategy.
 README.md | 3 +++
 1 file changed, 3 insertions(+)

❯ touch hogehoge

❯ git add hogehoge

❯ git commit --amend --no-edit
[branch_protection_check 68d7fea] Merge branch 'korosuke613-patch-8' into branch_protection_check
 Date: Thu Jun 15 17:34:44 2023 +0900

❯ git push origin branch_protection_check
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 10 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 569 bytes | 569.00 KiB/s, done.
Total 3 (delta 1), reused 1 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
remote: error: GH006: Protected branch update failed for refs/heads/branch_protection_check.
remote: error: Changes must be made through a pull request.
To https://github.com/<owner>/playground.git
 ! [remote rejected] branch_protection_check -> branch_protection_check (protected branch hook declined)
error: failed to push some refs to 'https://github.com/<owner>/playground.git'
```

GitHub.com でもマージコミットを改ざんせずに push すると、push は成功し、プルリクエストはマージされたことになる。

```terminal:マージコミットをそのまま push on GitHub.com
❯ git switch branch_protection_check
Switched to branch 'branch_protection_check'
Your branch is up to date with 'origin/branch_protection_check'.

❯ git merge korosuke613-patch-8 --no-ff
Merge made by the 'ort' strategy.
 README.md | 3 +++
 1 file changed, 3 insertions(+)

❯ git push origin branch_protection_check
Enumerating objects: 1, done.
Counting objects: 100% (1/1), done.
Writing objects: 100% (1/1), 481 bytes | 481.00 KiB/s, done.
Total 1 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/<owner>/playground.git
   45a9f5d..3a8dcc1  branch_protection_check -> branch_protection_check
```

:::

:::message
GitHub Enterprise Server は GitHub.com の変更が遅れて入るため、古い GitHub.com の挙動と新しい GitHub.com の挙動の比較ができます。もちろん GitHub Enterprise Server と GitHub.com は別の製品であるため、完全な比較とはならないことに注意が必要です。
:::

#### 「b. ブランチ保護で dismiss stale approvals を有効にしている場合、承認後にマージベースが変更されるたび、承認が却下されるようになった」について

承認後に別のプルリクエストをマージしてマージベースを変更するなどを試したのですが、承認が却下されるパターンに出会えませんでした。

> Merge bases changing under a pull request will preserve approvals in most situations where no new changes are introduced.

とあるので、承認を維持するパターンもあるようです。
承認が却下された方がいましたら教えてください。


#### 「c. ブランチ保護で required pull request review を有効にしている場合、対象ブランチに対するプルリクエストで承認しておけば、同じターゲットを持つ同じコミットを持ったブランチを手動でマージ＆push 可能でしたが、これができなくなった」について

いまいちほんとにできてたのかよくわからなかったので GitHub Enterprise Server の方で試したところ、確かにできました。

:::details 試した時のスクショ

![](/images/productivity-weekly-20230607/ghes-required-approve-bypass.png =700x)
*同じブランチの同じマージベースから派生したブランチをふたつ作り、それぞれで同じ内容（同じハッシュ）のコミットを作り、プルリクエストを作った。片方のプルリクエストで承認すると、もう片方のプルリクエストでも自動で承認を得たことになった*

![](/images/productivity-weekly-20230607/ghes-required-approve-bypass-add-commit.png =450x)
*片方のブランチに別の変更を追加したところ、再び承認を求められた*

:::

プルリクエストで承認されていて、かつ、同じコミットなら手動でマージできてもよくないかと思ったのですが、何か理由があるかもしれません。

これら 3 つの変更は細かいかもしれませんが、安全度が増したのは良いですね。

## View repository pushes on the new activity view | GitHub Changelog
https://github.blog/changelog/2023-05-31-view-repository-pushes-on-the-new-activity-view/

リポジトリ上でどのようなアクティビティがあったか、簡単に確認できるようになりました。リポジトリへの push もここで確認できます。
GitHub 上のリポジトリのトップページに、「Activity」というリンクからアクセスできます。

ただ、git clone や Download Zip といったユーザーのイベントはここに記録されないため、なにかインシデントが発生した時の証跡として万能ではなさそうです。少し残念な人もいるかもですが、そういうのは Audit log の役割かと思います[^noise]。

なんにせよ、リポジトリに対する変更を追いやすくなるのはよいですね。

[^noise]: git clone などの Read な操作が Activity に入ると、(github から見ると)データ量の増加、(利用者から見ると)ノイズになりそうってのもある。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)、本項の編集者: [@korosuke613](https://zenn.dev/korosuke613)*

# know-how 🎓

## コンテナのセルフホストランナーの中でコンテナを使えるようにするrunner-container-hooks
https://zenn.dev/kesin11/articles/20230514_container_hooks

今までコンテナ上で動かしているセルフホストランナーでは、GitHub Actions のコンテナ機能を使用できませんでしたが、新しく登場した Runner Container Hooks を使うことで使えるようになったとのことです。

最初に、メジャーな方法であるセルフホストランナーをコンテナ上で動かし、そこからさらにコンテナを使う方法(コンテナの中でコンテナを動かしている)についてを説明されています。
しかし、従来のこの方法では GitHub Actions におけるコンテナ機能である `jobs.<job_id>.container` や `jobs.<job_id>.services` 、`jobs.<job_id>.steps[*].uses` は使うことができません。

今回、Runner Container Hooks が登場したことで、上記の問題を回避できるようになりました。この記事では、Runner Container Hooks の使い方、仕組みが詳しく書かれています。

セルフホストランナーをコンテナで動かしている方にとてもおすすめしたい記事です。

*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)、本項の編集者: [@korosuke613](https://zenn.dev/korosuke613)*

## AWS CLI を使いこなそう ! ~ 2 種類の補完機能 / aws sso / yaml-stream の紹介 - 変化を求めるデベロッパーを応援するウェブマガジン | AWS
https://aws.amazon.com/jp/builders-flash/202306/handle-aws-cli/?awsf.filter-name=*all

AWS CLI の Tips が 3 つ紹介されています。

まずは補完機能についてです。シェルの complete 機能を使って、Tab キーを押すとサブコマンドやオプションを補完できます。

参考: [コマンド補完 - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-configure-completion.html)

また自動プロンプトという機能もあって、先述した complete 機能よりリッチな UI でコマンドを組み立てることができます。こちらは私は初めて知りました...
初期状態では無効化されているので、`aws --cli-auto-prompt` というようにオプションを渡すか、設定ファイルに `cli_auto_prompt = on` と書くことで使用できるようになります。

参考: [AWS CLI でコマンドの入力プロンプトを表示する - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/cli-usage-parameters-prompting.html)


次に AWS IAM Identity Center を使った AWS CLI での SSO についてです。

設定さえできれば、`aws sso login --profile $PROFILE_NAME` でログインできます。

参考: [AWS IAM Identity Center (successor to AWS Single Sign-On) の自動認証更新によるトークンプロバイダーの設定 - AWS Command Line Interface](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/sso-configure-profile-token.html)

なお、現在生産性向上チームでは [assam コマンド](https://github.com/cybozu/assam) を使って、CLI 環境での SSO ログインを実現しています[^aws_sso]。

[^aws_sso]: ちなみに assam は、AWS IAM アイデンティティセンター（AWS Single Sign-On の後継）を使っていません。開発当時は AWS SSO がなかったからですね。

参考: [AWS + Azure ADによるSingle Sign-Onと複数AWSアカウント切り替えのしくみ作り - Cybozu Inside Out | サイボウズエンジニアのブログ](https://blog.cybozu.io/entry/2019/10/18/080000)

これを、AWS CLI 標準の機能で実現できるようになったら、楽になりますね。
上手く使えないか、探求を進めていきます。


*本項の執筆者: [@defaultcf](https://zenn.dev/defaultcf)、本項の編集者: [@korosuke613](https://zenn.dev/korosuke613)*

# read more 🍘
Productivity Weekly で出たネタを全て紹介したいけど紹介する体力が持たなかったネタを一言程度で書くコーナーです。

- **know-how 🎓**
  - [オフライン「リハビリ」勉強会をやってみたらだいぶ良かった！ - BASEプロダクトチームブログ](https://devblog.thebase.in/entry/2023/06/07/110000)
    - BASE さんによる久々のオフライン勉強会に慣れるためのリハビリオフライン勉強会をやってみた記事です
    - おもしろい取り組みだと思いました。社内から始めるとやりやすいですよね
- **tool 🔨**
  - [Notion Projects](https://www.notion.so/product/projects)
    - Notion にプロジェクト管理機能が追加されました
    - カンバンなどのプロジェクト管理に便利な機能が追加されていて、Notion 使いの人にとってはよさそうですね

# あとがき
今週号でした。ちょっと最近プライベートが忙しくてあんま時間取れてなくて遅くなっちゃいました 🙇
そういえば ICL っていう目の中にレンズを突っ込んで視力を矯正する手術を受けることにしたんですよ。メガネとはおさらばですわ。
7/2（日）に手術予定なので、続報をお待ちください。

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6
