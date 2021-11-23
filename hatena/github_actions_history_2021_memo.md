GitHub Changelog と GitHub Blog を調査

---

GitHub Actions: built by you, run by us | The GitHub Blog
https://github.blog/2018-10-17-action-demos/

Actions 自体は GitHub Universe 2018 で発表されたらしい

---

GitHub Actions (limited public beta) | GitHub Changelog
https://github.blog/changelog/2018-10-16-github-actions-limited-beta/

そして limited public beta のお知らせがきた。

---

この頃は Changelog にタグがついておらず、探すのに苦労してる
action のタグが最初に確認された 2019 年 12 月までは自力で探すしかない
この頃の Changelog を見てると「Mark as unread」が使えるようになったり Batch Commit ができるようになったりと今では当たり前にできることが新機能として発表されてる。

ベータ版だったからか、2019/01 まで見てもまだ Actions の情報が出てこない

2019/05 まで情報が出てこない。5/23 に Internal repository が beta で登場。結構最近だったんだ。

---

Dependabot: Automated security fixes | GitHub Changelog
https://github.blog/changelog/2019-05-23-dependabot-automated-security-fixes/

この頃 Dependabot が GitHub に統合されてる

---

Updates to GitHub Actions (limited public beta) | GitHub Changelog
https://github.blog/changelog/2019-08-08-updates-to-github-actions-limited-public-beta/

きた！まだ public beta。CI/CD に対応したと書いてあるが、それまではどんなものだったんだ？

---

GitHub Actions will stop running workflows written in HCL | GitHub Changelog
https://github.blog/changelog/2019-09-17-github-actions-will-stop-running-workflows-written-in-hcl/

HCL やめた！

---

Improvements to GitHub Actions | GitHub Changelog
https://github.blog/changelog/2019-09-18-improvements-to-github-actions/

新文法について

---

UI changes in GitHub Actions checks | GitHub Changelog
https://github.blog/changelog/2019-09-24-ui-changes-in-github-actions-checks/

UI が変わったことについて

---

The Actions Tab Gets a New Look | GitHub Changelog
https://github.blog/changelog/2019-09-26-the-actions-tab-gets-a-new-look/

これも UI の話

---

Updates to GitHub Actions virtual environments | GitHub Changelog
https://github.blog/changelog/2019-09-30-updates-to-github-actions-virtual-environments/

GitHub-hosted runner の virtual environments を更新した話

---

GitHub Actions - event filtering updates | GitHub Changelog
https://github.blog/changelog/2019-09-30-github-actions-event-filtering-updates/

on で glob が使えるようになった話

---

GitHub Actions - deterministic re-runs for workflows | GitHub Changelog
https://github.blog/changelog/2019-09-30-github-actions-deterministic-re-runs-for-workflows/

re-run の改善

---

GitHub Actions - new workflow syntax features | GitHub Changelog
https://github.blog/changelog/2019-10-01-github-actions-new-workflow-syntax-features/

Env が使えるようになった話とジョブレベルで if が使えるようになった話

---

GitHub Actions - HCL workflows are no longer being run | GitHub Changelog
https://github.blog/changelog/2019-10-01-github-actions-hcl-workflows-are-no-longer-being-run/

HCL によるワークフローの実行が停止された話

---

New editor for GitHub Actions | GitHub Changelog
https://github.blog/changelog/2019-10-01-new-editor-for-github-actions/

ワークフローを新しいエディタで編集できるようになった話。lint や autocomplete もあるよ

---

GitHub Actions - macOS virtual environment updates | GitHub Changelog
https://github.blog/changelog/2019-10-04-github-actions-macos-virtual-environment-updates/

macOS ランナー更新の話

---

The GitHub Actions Marketplace now requires an actions metadata file | GitHub Changelog
https://github.blog/changelog/2019-10-10-the-github-actions-marketplace-now-requires-an-actions-metadata-file/

Action のマーケットプレイスでメタデータファイルが必要になった話。Actions のマーケットプレイス自体はいつからあるんだ老化

---

Changes in GitHub Actions push event payload | GitHub Changelog
https://github.blog/changelog/2019-10-16-changes-in-github-actions-push-event-payload/

push webhook event のペイロードが変更された話

---

Action log line numbers are now links | GitHub Changelog
https://github.blog/changelog/2019-10-17-action-log-line-numbers-are-now-links/

log の行番号をリンクにできるようになった

---

GitHub Actions default shell on Windows runners is changing to PowerShell | GitHub Changelog
https://github.blog/changelog/2019-10-17-github-actions-default-shell-on-windows-runners-is-changing-to-powershell/

Windows ランナーのデフォルトシェルが cmd から PowerShell になった

---

GitHub Actions - removing Python 3.4 and Ruby 2.3 from the virtual environments | GitHub Changelog
https://github.blog/changelog/2019-10-17-github-actions-removing-python-3-4-and-ruby-2-3-from-the-virtual-environments/

virtual environments から Python3.4 と Ruby 2.3 が削除

---

GitHub Actions - macOS virtual environment updates | GitHub Changelog
https://github.blog/changelog/2019-10-17-github-actions-macos-virtual-environment-updates-2/

macOS ランナーの更新

---

GitHub Actions is changing how some events are evaluated | GitHub Changelog
https://github.blog/changelog/2019-10-24-github-actions-is-changing-how-some-events-are-evaluated/


特定のイベントが SHA ではなくブランチのワークフローを使うようになった？

---

GitHub Actions - macOS and Windows virtual environments updates | GitHub Changelog
https://github.blog/changelog/2019-10-25-github-actions-macos-and-windows-virtual-environments-updates/

virtual environments の更新

---

GitHub Actions - update to job concurrency usage limits | GitHub Changelog
https://github.blog/changelog/2019-10-28-github-actions-update-to-job-concurrency-usage-limits/

同時実行可能ジョブの制限が更新。どう更新されたかはいまいちわからない

---

GitHub Actions - Windows Server 2016 virtual environment will be removed January 2020 | GitHub Changelog
https://github.blog/changelog/2019-10-31-github-actions-windows-server-2016-r2-virtual-environment-will-be-removed-on-november-7/

Windows Server 2016 が削除

---

GitHub Actions: macOS virtual environment is updating to Catalina and dropping Mojave support | GitHub Changelog
https://github.blog/changelog/2019-10-31-github-actions-macos-virtual-environment-is-updating-to-catalina-and-dropping-mojave-support/

macOS Mojave から Catalina に更新。Mojave は使えなくなった模様。

---

GitHub Actions—scheduled jobs maximum frequency is changing | GitHub Changelog
https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/

スケジュール実行間隔が 1 分から 5 分に。

---

GitHub Actions adds dependency caching | GitHub Changelog
https://github.blog/changelog/2019-11-04-github-actions-adds-dependency-caching/

actions/cache が登場。

---

GitHub Actions: Self-hosted runners | GitHub Changelog
https://github.blog/changelog/2019-11-05-github-actions-self-hosted-runners/

セルフホストランナーが登場。

---

GitHub Actions: Linux and Windows virtual environments updates | GitHub Changelog
https://github.blog/changelog/2019-11-06-github-actions-linux-and-windows-virtual-environments-updates/

virtual environment の更新。

---

GitHub Actions: macOS virtual environment updated to Catalina | GitHub Changelog
https://github.blog/changelog/2019-11-06-github-actions-macos-virtual-environment-updated-to-catalina/

virtual environment の更新。

---

GitHub Actions is generally available | The GitHub Changelog
https://github.blog/changelog/2019-11-11-github-actions-is-generally-available/

**正式リリース！！** 実に一年越し？

---

同じ頃に Packages も GA になってる。モバイルが beta で登場してる。

他にも [Dependabot のセキュリティアップデート](https://github.blog/changelog/2019-11-14-automated-updates/)が GA に。

---

GitHub Actions: Changes to release event | GitHub Changelog
https://github.blog/changelog/2019-12-03-github-actions-changes-to-release-event/

ドラフトリリースの release event をトリガーしなくなる。

---

GitHub Actions: Self-hosted runners on ARM architectures | GitHub Changelog
https://github.blog/changelog/2019-12-03-github-actions-self-hosted-runners-on-arm-architectures/

セルフホストランナーの ARM 対応。

---

GitHub Actions: AWS and gcloud actions deprecated | GitHub Changelog
https://github.blog/changelog/2019-12-10-github-actions-aws-and-gcloud-actions-deprecated/

actions/aws と actions/gcloud が deprecated に

---

GitHub Actions: Updates to the virtual environments | GitHub Changelog
https://github.blog/changelog/2019-12-19-github-actions-updates-to-the-virtual-environments/

virtual environments の更新。

---

GitHub Actions: The Runner is now open sourced | GitHub Changelog
https://github.blog/changelog/2019-12-19-github-actions-the-runner-is-now-open-sourced/

ランナー（actions/runner）がオープンソース化。
最初から OSS ではなかったのか。

---

GitHub Actions: Updates to the macOS 10.15 virtual environment | GitHub Changelog
https://github.blog/changelog/2020-01-09-github-actions-updates-to-the-macos-10-15-virtual-environment/

virtual environment の更新。

---

GitHub Actions: Changes to artifact download experience | GitHub Changelog
https://github.blog/changelog/2020-01-14-github-actions-changes-to-artifact-download-experience/

actions/download-artifact の仕様変更。ファイルがルートディレクトリ（ワーキングディレクトリの方が適切？）直下に展開されるように。

---

GitHub Actions: API Beta | GitHub Changelog
https://github.blog/changelog/2020-01-27-github-actions-api-beta/

Actions API が登場。シークレット管理やランナー登録を自動化できるように。

---

GitHub Actions: Proxy Support for Self-Hosted Runners | GitHub Changelog
https://github.blog/changelog/2020-02-12-github-actions-proxy-support-for-self-hosted-runners/

セルフホストランナーがプロキシをサポート。

---

GitHub Actions Breaking Change: Ubuntu virtual environments will no longer start the MySQL service automatically | GitHub Changelog
https://github.blog/changelog/2020-02-21-github-actions-breaking-change-ubuntu-virtual-environments-will-no-longer-start-the-mysql-service-automatically/

**BRAKING CHANGE**。Ubuntu ランナーが MySQL を自動で起動しなくなった。むしろ自動で起動してたのか。

---

GitHub Actions Breaking Change: Python 2 being removed from all virtual environments | GitHub Changelog
https://github.blog/changelog/2020-02-27-github-actions-breaking-change-python-2-being-removed-from-all-virtual-environments/

**BRAKING CHANGE**。Python2 が全てのランナーから削除。

---

New filter parameter in workflow jobs API | GitHub Changelog
https://github.blog/changelog/2020-03-09-new-filter-parameter-in-workflow-jobs-api/

workflow jobs API のクエリにフィルターを設定できるようになった。

この記事、タイトルに `GitHub Actions:` がない！！今まで基本的にタイトルに GitHub Actions があるかどうかを見てたが、何か見落としがありそうで怖い。

---

Event-Specific Details on the Actions tab | GitHub Changelog
https://github.blog/changelog/2020-03-10-event-specific-details-on-the-actions-tab/

ワークフロー一覧が改善。
各ワークフローに紐づけられたコミットメッセージがワークフロー一覧に表示されるようになったり、トリガーの種類が表示されたりと。

この記事もタイトルに `GitHub Actions:` がない！！Actions はあるけども。視認性が悪い。

---

GitHub Actions: API is now generally available | GitHub Changelog
https://github.blog/changelog/2020-03-24-github-actions-api-is-now-generally-available/

Actions API が GA に。

---

GitHub Actions: New workflow features | GitHub Changelog
https://github.blog/changelog/2020-04-15-github-actions-new-workflow-features/

ワークフロー構文に関する大型アップデート。

- ジョブ・ワークフローレベルで `defaults` が追加。shell と working_directory をまとめて指定できるように
- `jobs.<job_id>.outputs` が追加。ジョブ間で簡単にパラメータを渡せるように
- `jobs.<job_id>.continue-on-error` が追加。`true` にするとジョブがこけてもワークフローが失敗しない。
- `fromJSON()` メソッドが追加。JSON オブジェクトをプロパティにバインドできる。たとえば動的なマトリックスビルドワークフローが作れる。
- `github` コンテキストに `github.repository_owner` が追加。リポジトリの所有者を取得できるように。
- `github` コンテキストに `github.job` が追加。job id を取得できるように。
- `steps` コンテキストに `steps.<step_id>.outcome` が追加。continue-on-error 適用**前**のステップの結果（成功か失敗かなど）が取得可能に。
- `steps` コンテキストに `steps.<step_id>.conclusion` が追加。continue-on-error 適用**後**のステップの結果（成功か失敗かなど）が取得可能に。

---

GitHub Actions: sets the `CI` environment variable to true | GitHub Changelog
https://github.blog/changelog/2020-04-15-github-actions-sets-the-ci-environment-variable-to-true/

ランナーの環境変数にデフォルトで `CI=true` がセットされるように。

---

GitHub Actions: New runner release v2.169.1 | GitHub Changelog
https://github.blog/changelog/2020-04-17-github-actions-new-runner-release-v2-169-1/

新しい actions/runner のリリースについて。

- カスタムラベルのサポート
- アクションにおいて `pre` をサポート
- その他諸々

---

GitHub Actions: Cleanup dormant self-hosted runners | GitHub Changelog
https://github.blog/changelog/2020-04-20-github-actions-cleanup-dormant-self-hosted-runners/

30 日間接続されてないセルフホストランナーの登録が削除されるようになった。

---

GitHub Actions logs can now be deleted | GitHub Changelog
https://github.blog/changelog/2020-04-21-github-actions-logs-can-now-be-deleted/

ワークフロー実行ログを削除できるようになった。API も用意。

---

GitHub Actions: Organization level self-hosted runners | GitHub Changelog
https://github.blog/changelog/2020-04-22-github-actions-organization-level-self-hosted-runners/

セルフホストランナーが Organization に対して登録できるようになった。

---

GitHub Actions: V2 artifact actions | GitHub Changelog
https://github.blog/changelog/2020-04-28-github-actions-v2-artifact-actions/

actions/upload-artifact、actions/download-artifact が v2 に。アップロードにワイルドカードが使えるようになったり、全てのアーティファクトを一度にダウンロードできるようになったりした。

---

GitHub Actions: V2 setup-python action | GitHub Changelog
https://github.blog/changelog/2020-04-30-github-actions-v2-setup-python-action/

actions/setup-python が v2 に。GitHub-hosted ランナーにプリインストールされてない python のインストールができたり、セルフホストランナーでのセットアップが容易になったりした。

---

GitHub Actions: Logs show virtual environment version | GitHub Changelog
https://github.blog/changelog/2020-04-30-github-actions-logs-show-virtual-environment-version/

ログに仮想環境のバージョンが表示されるように。

---

GitHub Actions: New runner release v2.262.1 | GitHub Changelog
https://github.blog/changelog/2020-05-14-github-actions-new-runner-release-v2-262-1/

actions/runner の更新。変更が多い。

- アクションの入力が action.yaml と一致しない場合に警告を出す
- ダブルクォートをトリミングする mask の追加？
- その他バグ修正など

---

GitHub Actions: Cleanup self-hosted runners older than 2.168.0 | GitHub Changelog
https://github.blog/changelog/2020-05-15-github-actions-cleanup-self-hosted-runners-older-than-2-168-0/

セルフホストランナーの actions/runner バージョンを強制的に 2.168.0 以降へバージョンアップ。
強制的にバージョンアップなんてできるのか。

---

GitHub Actions API: Workflow usage public beta | GitHub Changelog
https://github.blog/changelog/2020-05-18-github-actions-api-workflow-usage-public-beta/

Actions API で `workflow_id` ごとのランナー使用状況と `run_id` ごとのランナー使用状況を取得できるようになった。`workflow_id` と `job_id` の関係は説明がむずい。

---

GitHub Actions: Re-Run Successful Jobs | GitHub Changelog
https://github.blog/changelog/2020-05-26-github-actions-re-run-successful-jobs/

これまでジョブが失敗した場合のみ re-run できていたが、成功失敗関わらず re-run できるようになった。

---

GitHub Actions: New runner release v2.263.0 | GitHub Changelog
https://github.blog/changelog/2020-05-27-github-actions-new-runner-release-v2-263-0/

actions/runner の更新。バグ修正のみ。

---

GitHub Actions: V2 cache actions | GitHub Changelog
https://github.blog/changelog/2020-05-27-github-actions-v2-cache-actions/

actions/cache が v2 に。複数パスやワイルドカードのサポートやパフォーマンス向上など。

---

Personal Access Tokens Workflow permission | GitHub Changelog
https://github.blog/changelog/2020-06-03-personal-access-tokens-workflow-permission/

PAT のスコープに `workflow` パーミッションが生えたけど、既存のワークフローをぶっ壊さないために既存の全ての PAT の `workflow` を許可しました。という話。

いつの間に `workflow` パーミッションが増えた？見落としたか？？

---

GitHub Actions: workflow templates | GitHub Changelog
https://github.blog/changelog/2020-06-23-github-actions-workflow-templates/

ワークフローテンプレートが追加。~~なんだっけそれ~~
Organization の `.github` リポジトリにテンプレとメタデータを作成すると、Organization 内リポジトリにおいて WebUI の Actions タブから「New workflow」でテンプレを利用してワークフローを作れる。

---

Dependabot updates your GitHub Actions workflows | GitHub Changelog
https://github.blog/changelog/2020-07-02-dependabot-updates-your-github-actions-workflows/

Dependabot が GitHub Actions のワークフローのアクションの更新に対応。

---

GitHub Actions: Manual triggers with workflow_dispatch | GitHub Changelog
https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/

`workflow_dispatch` トリガーが追加。WebUI から手動でワークフローを実行できるように。

---

GitHub Actions: New runner release v2.267.1 | GitHub Changelog
https://github.blog/changelog/2020-07-06-github-actions-new-runner-release-v2-267-1/

actions/runner の更新。

- ホスト情報（ランナー名やマシン名）がログに残るように
- など！

---

GitHub Actions: ability to delete workflow runs | GitHub Changelog
https://github.blog/changelog/2020-07-07-github-actions-ability-to-delete-workflow-runs/

workflow runs を削除できるように。

---

GitHub Actions - New settings to enable actions | GitHub Changelog
https://github.blog/changelog/2020-07-16-github-actions-new-settings-to-enable-actions/

Enterprise において、リポジトリごと（または Org 全体）でアクションの利用を制限できるように。

---

GitHub Actions: Better support for alternative default branch names | GitHub Changelog
https://github.blog/changelog/2020-07-22-github-actions-better-support-for-alternative-default-branch-names/

GitHub のデフォルトブランチが master から main に変わったので actions org 下のアクションなども master から main になった。

---

GitHub Actions: New runner release v2.272.0 | GitHub Changelog
https://github.blog/changelog/2020-08-03-github-actions-new-runner-release-v2-272-0/

actions/runner の更新。composite action のサポートなど。

---

GitHub Actions: Enterprise runners and runner groups | GitHub Changelog
https://github.blog/changelog/2020-08-05-github-actions-enterprise-runners-and-runner-groups/

Enterprise に対してセルフホストランナーを紐付けできるようになった。また、ランナーグループを作成できるようになった。ランナーグループごとにアクセス制御ができるなどのメリットがある。

---

GitHub Actions: Composite Run Steps | GitHub Changelog
https://github.blog/changelog/2020-08-07-github-actions-composite-run-steps/

composite action が登場。同じアクションにおいて複数のシェル言語が使えるように。これまでは JavaScript action か docker action しかなかったっぽいから色々楽になったっぽい。

---

Org admins in Enterprise accounts can view Actions and Packages usage in the billing page | GitHub Changelog
https://github.blog/changelog/2020-08-31-org-admins-in-enterprise-accounts-can-view-actions-and-packages-usage-in-the-billing-page/

Enterprise の Admin は billing のページで Actions の usage を確認できるように。

---

Create a custom list of email addresses to receive Actions and Packages billing threshold notifications | GitHub Changelog
https://github.blog/changelog/2020-08-31-create-a-custom-list-of-email-addresses-to-receive-actions-and-packages-billing-threshold-notifications/

Actions の請求に関する通知を受信するメールアドレスリストを作れるようになった。

---

New limits affecting the Checks API | GitHub Changelog
https://github.blog/changelog/2020-09-14-new-limits-affecting-the-checks-api/

Checks API で利用する Checks において、同じ名前で保存される Check run の数が最大 1000 に制限された。超えると古い Check run が削除される。

---

GitHub Actions: Log Improvements | GitHub Changelog
https://github.blog/changelog/2020-09-23-github-actions-log-improvements/

ログの改善。読みやすさや検索体験の向上。自動スクロールやクリック可能な URL など。

---

GitHub Actions: Private registry support for job and service containers | GitHub Changelog
https://github.blog/changelog/2020-09-24-github-actions-private-registry-support-for-job-and-service-containers/

`jobs.<job_name>.container` と `jobs.<job_name>.services` において、プライベートレジストリの Docker イメージを利用できるようになった。

---

Ability to disable Actions workflows | GitHub Changelog
https://github.blog/changelog/2020-10-01-ability-to-disable-actions-workflows/

WebUI や API を使用してワークフローを一時的に無効にできるように。一時的に止めたい場合にワークフローファイルを削除する必要無くなった。

へ〜これ知らんかった。

---

GitHub Actions: Fine-tune access to external actions | GitHub Changelog
https://github.blog/changelog/2020-10-01-github-actions-fine-tune-access-to-external-actions/

利用できるアクションの制限について、細かく指定できるようになった。

- 全てのアクションを許可
- ローカルアクションのみ許可
- 指定したアクションのみ許可
  - ワイルドカードも利用可

---

GitHub Actions: Deprecating set-env and add-path commands | GitHub Changelog
https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/

`set-env`、`add-path` ワークフローコマンドが deplicated に。ランナーに脆弱性が見つかったため。

---

GitHub Actions: Ability to change retention days for artifacts and logs | GitHub Changelog
https://github.blog/changelog/2020-10-08-github-actions-ability-to-change-retention-days-for-artifacts-and-logs/

actions/upload-artifact において、アーティファクトとログの保存期間を指定できるようになった。デフォルトは 90 日。

---

GitHub Actions: Self-Hosted Runner Group Access Changes | GitHub Changelog
https://github.blog/changelog/2020-10-16-github-actions-self-hosted-runner-group-access-changes/

セルフホストランナーグループのデフォルトアクセス範囲が変更され、「Allow public repositories.」が無効になった。全てのセルフホストランナーグループに対して変更が行われた。

Enterprise Server などで利用する場合は「Allow public repositories.」を有効にする必要がある（当時はまだ GHES に Actions 来てなかったけど）。

---

GitHub Actions: MacOS Big Sur Preview | GitHub Changelog
https://github.blog/changelog/2020-10-29-github-actions-macos-big-sur-preview/

macOS ランナーで Big Sur がプレビューとして使えるように。

---

GitHub Actions: Ubuntu-latest workflows will use Ubuntu-20.04 | GitHub Changelog
https://github.blog/changelog/2020-10-29-github-actions-ubuntu-latest-workflows-will-use-ubuntu-20-04/

Ubuntu ランナーの `ubuntu-latest` が Ubuntu 20.04 を指すように。それまでは Ubuntu 18.04 が指されていた。段々と変更されていった。

---

GitHub Actions: Removing set-env and add-path commands on November 16 | GitHub Changelog
https://github.blog/changelog/2020-11-09-github-actions-removing-set-env-and-add-path-commands-on-november-16/

Deprecated となっていた `set-env` と `add-path` ワークフローコマンドが削除された。

---

GitHub Actions: Workflow visualization | GitHub Changelog
https://github.blog/changelog/2020-12-08-github-actions-workflow-visualization/

ワークフローが可視化されるように。ジョブ同士の関係がわかりやすくなった。

---

GitHub Actions: Environments, environment protection rules and environment secrets (beta) | GitHub Changelog
https://github.blog/changelog/2020-12-15-github-actions-environments-environment-protection-rules-and-environment-secrets-beta/

Environments がベータで登場。環境ごとのシークレットの切り替えやジョブ実行に必要な承認ができるレビュワーを指定できるようになった。

---

The GitHub Enterprise Server 3.0 release candidate is here! | GitHub Changelog
https://github.blog/changelog/2021-01-15-the-github-enterprise-server-3-0-release-candidate-is-here/

Enterprise Server 3.0 で Actions が使えるようになったよ。セルフホストランナー必須。

---

GitHub Actions: Short SHA deprecation | GitHub Changelog
https://github.blog/changelog/2021-01-21-github-actions-short-sha-deprecation/

アクションの ref を指定する際に短い SHA（例：`actions/checkout@5a4ac90`）が使えなくなった。セキュリティ向上が理由。

---

GitHub Actions Breaking Change: .NET Core 3.0 will be removed from macOS and Ubuntu images | GitHub Changelog
https://github.blog/changelog/2021-01-28-github-actions-breaking-change-net-core-3-0-will-be-removed-from-macos-and-ubuntu-images/

**BREAKING CHANGE**。.NET Core 3.0 が macOS ランナーと Ubuntu ランナーから削除。

---

GitHub Actions: Skip pull request and push workflows with[skip ci]| GitHub Changelog
https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/

コミットメッセージに `[skip ci]` などの文字列を入れることで `push`、`pull_request` トリガーによるワークフロー実行をスキップできるようになった。

---

GitHub Actions: Limit which branches can deploy to an environment | GitHub Changelog
https://github.blog/changelog/2021-02-17-github-actions-limit-which-branches-can-deploy-to-an-environment/

Environments にデプロイできるブランチを制限できるようになった。

---

GitHub Actions: Workflows triggered by Dependabot PRs will run with read-only permissions | GitHub Changelog
https://github.blog/changelog/2021-02-19-github-actions-workflows-triggered-by-dependabot-prs-will-run-with-read-only-permissions/

Dependabot の Pull Request によってトリガーされるワークフローで使える `GITHUB_TOKEN` のパーミッションが read-only になった。また、シークレットの読み込み権限は無くなった。サプライチェーン攻撃を防止するため。

これによりリポジトリによっては Dependabot の PR が次々とこけるように。

---

GitHub Actions: environment, environment protection rules and deployment reviewers API | GitHub Changelog
https://github.blog/changelog/2021-02-23-github-actions-environment-environment-protection-rules-and-deployment-reviewers-api/

Environments の作成や保護ルール設定を API でできるようになった。

---

GitHub Actions: Workflow run events are now included in the Audit Log | GitHub Changelog
https://github.blog/changelog/2021-02-23-github-actions-workflow-run-events-are-now-included-in-the-audit-log/

ワークフローの実行に関する情報やセルフホストランナーのバージョン更新などが Audit Log に記録されるようになった。

---

GitHub Actions: Setup-java now support Adopt OpenJDK | GitHub Changelog
https://github.blog/changelog/2021-04-05-github-actions-setup-java-now-support-adopt-openjdk/

actions/setup-java が Adopt OpenJDK をサポート。

---

GitHub Actions: Limit workflow run or job concurrency | GitHub Changelog
https://github.blog/changelog/2021-04-19-github-actions-limit-workflow-run-or-job-concurrency/

`concurrency` を利用することでジョブの同時実行を制限できるようになった。安心。

---

GitHub Actions: Control permissions for GITHUB_TOKEN | GitHub Changelog
https://github.blog/changelog/2021-04-20-github-actions-control-permissions-for-github_token/

`GITHUB_TOKEN` の権限を細かく制御できるようになった。デフォルトはこれまで通りほぼ全てが `write` のまま。ただし、Organization またはリポジトリでデフォルト権限を `read` と `read/write`（規定値）のどちらかに設定できるようになった。

---

GitHub Actions: Maintainers must approve first time contributor workflow runs | GitHub Changelog
https://github.blog/changelog/2021-04-22-github-actions-maintainers-must-approve-first-time-contributor-workflow-runs/

初回のコントリビューター（fork 先）からのプルリクエストに対して自動でワークフローが実行されなくなり、メンテナの承認が必要になった。仮想通貨のマイニング対策。

---

GitHub Actions : Ubuntu 16.04 LTS virtual environment will be removed on September 20, 2021 | GitHub Changelog
https://github.blog/changelog/2021-04-29-github-actions-ubuntu-16-04-lts-virtual-environment-will-be-removed-on-september-20-2021/

Ubuntu 16.04 LTS が削除。

---

GitHub Actions: Beta API to approve Actions from forks | GitHub Changelog
https://github.blog/changelog/2021-05-06-github-actions-beta-api-to-approve-actions-from-forks/

初回コントリビュータからの PR によるワークフロー実行の承認を API で行えるようになった。ベータ。

---

GitHub Actions : Hosted Ubuntu runners will only contain the latest patch release for each supported version of the .NET SDK | GitHub Changelog
https://github.blog/changelog/2021-05-19-github-actions-hosted-ubuntu-runners-will-only-contain-the-latest-patch-release-for-each-supported-version-of-the-net-sdk/

Ubuntu ランナーにおいて、.NET SDK の最新パッチリリースのみがランナーに含まれるように。

---

GitHub Actions: Environments, environment protection rules, and environment secrets are generally available | GitHub Changelog
https://github.blog/changelog/2021-06-22-github-actions-environments-environment-protection-rules-and-environment-secrets-are-generally-available/

Environments が GA。

---

GitHub Discussions events available on GitHub Actions | GitHub Changelog
https://github.blog/changelog/2021-06-29-github-discussions-events-available-on-github-actions/

`discussion` イベント、`discussion-comment` イベントをトリガーにできるようになった。

---

GitHub Actions: New settings for maintainers | GitHub Changelog
https://github.blog/changelog/2021-07-01-github-actions-new-settings-for-maintainers/

初回コントリビュータからの PR によるワークフロー実行の承認について、設定を細かくできるようになった。

- 新しい GitHub アカウントかつ初回コントリビュータの場合のみ承認を必要とする
- 初回コントリビュータに対して承認を必要とする
- 全ての外部コントリビュータに対して承認を必要とする

---

GitHub Actions: Setup-node now supports dependency caching | GitHub Changelog
https://github.blog/changelog/2021-07-02-github-actions-setup-node-now-supports-dependency-caching/

actions/setup-node がキャッシュをサポート。Node.js に関しては actions/cache のステップを書かずともキャッシュを利用できるようになった。

---

GitHub Actions: Self-hosted runner events are now included in the Audit Log | GitHub Changelog
https://github.blog/changelog/2021-08-04-github-actions-self-hosted-runner-events-are-now-included-in-the-audit-log/

Audit Log にセルフホストランナー関連のイベントが記録されるようになった。

---

GitHub Actions: macOS 11 Big Sur is generally available on GitHub-hosted runners | GitHub Changelog
https://github.blog/changelog/2021-08-16-github-actions-macos-11-big-sur-is-generally-available-on-github-hosted-runners/

macOS 11 Big Sur のランナーが GA になった。

---

GitHub Actions: Windows Server 2022 with Visual Studio 2022 is now available on GitHub-hosted runners (Public Beta) | GitHub Changelog
https://github.blog/changelog/2021-08-23-github-actions-windows-server-2022-with-visual-studio-2022-is-now-available-on-github-hosted-runners-public-beta/

Visual Studio 2022 インストール済みの Windows Server 2022 のランナーが Beta で利用できるように。

---

GitHub Actions: Reduce duplication with action composition | GitHub Changelog
https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/

composite action において他のアクションを呼び出せるようになった（`uses` が利用できるようになった）。
composite action の有用性が非常に増した。

---

GitHub Actions: Setup-java now supports dependency caching | GitHub Changelog
https://github.blog/changelog/2021-08-30-github-actions-setup-java-now-supports-dependency-caching/

actions/setup-java も actions/setup-node と同じくキャッシュをサポート。

---

GitHub Actions: Filter workflow runs by created date | GitHub Changelog
https://github.blog/changelog/2021-09-02-github-actions-filter-workflow-runs-by-created-date/

WebUI、および API を使った workflow run の検索において、作成日でフィルターをかけられるようになった。

---

GitHub Actions: Setup-node supports dependency caching for projects with monorepo and pnpm package manager | GitHub Changelog
https://github.blog/changelog/2021-09-07-github-actions-setup-node-supports-dependency-caching-for-projects-with-monorepo-and-pnpm-package-manager/

actions/setup-node のキャッシュ機能がモノレポに対応。また、pnpm のキャッシュに対応した。

---

GitHub Actions: Experience refresh for the management of self-hosted runners | GitHub Changelog
https://github.blog/changelog/2021-09-20-github-actions-experience-refresh-for-the-management-of-self-hosted-runners/

ランナーグループの管理機能が強化。ランナーグループの管理やランナーの状態の確認が容易に。

---

GitHub Actions: Ephemeral self-hosted runners & new webhooks for auto-scaling | GitHub Changelog
https://github.blog/changelog/2021-09-20-github-actions-ephemeral-self-hosted-runners-new-webhooks-for-auto-scaling/

使い捨てのセルフホストランナー（ephemeral runner）が使えるようになった。また、ワークフローの状態が変わるたびに飛んでくる `workflow_job` webhook が登場し、セルフホストランナーのオートスケールがしやすくなった。

---

GitHub Actions: Jobs running on `macos-latest` are now running on macOS Big Sur (11). | GitHub Changelog
https://github.blog/changelog/2021-09-29-github-actions-jobs-running-on-macos-latest-are-now-running-on-macos-big-sur-11/

macos-latest が macOS 11 Big Sur を指すようになった。

---

GitHub Actions: DRY your GitHub Actions configuration by reusing workflows | GitHub Changelog
https://github.blog/changelog/2021-10-05-github-actions-dry-your-github-actions-configuration-by-reusing-workflows/

ワークフローの再利用が可能となった。同リポジトリでも他のリポジトリでも利用できる。

---

GitHub Actions: Workflows triggered by Dependabot PRs will respect permissions key in workflows | GitHub Changelog
https://github.blog/changelog/2021-10-06-github-actions-workflows-triggered-by-dependabot-prs-will-respect-permissions-key-in-workflows/

Dependabot のプルリクエストによってトリガーされるワークフローが `permissions` を尊重するようになった。以前、セキュリティのための変更があってから、Dependabot のプルリクエストによってトリガーされるワークフローは read-only であったため、Dependabot のプルリクエストが CI をパスしなくなるなど色々問題が起こってた。

---

GitHub Actions: Granular personal access token scopes for self-hosted runners in enterprises | GitHub Changelog
https://github.blog/changelog/2021-10-11-github-actions-granular-personal-access-token-scopes-for-self-hosted-runners-in-enterprises/

Enterprise 内でセルフホストランナーを管理する場合に `admin:enterprise` スコープを持つパーソナルアクセストークンが必要なくなった。代わりに必要な権限のみとなった `manage_runners:enterprise` スコープが登場。不要な権限を与えずに済むようになった。

---

GitHub Actions : The Windows 2016 runner image will be removed from GitHub-hosted runners on March 15, 2022 | GitHub Changelog
https://github.blog/changelog/2021-10-19-github-actions-the-windows-2016-runner-image-will-be-removed-from-github-hosted-runners-on-march-15-2022/

Windows Server 2016 ランナーが 2022/03/15 に削除される予定。

---

GitHub Actions: Secure cloud deployments with OpenID Connect | GitHub Changelog
https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/

GitHub Actions が OpenID Connect をサポート。クラウドサービスの認証をより安全にできるようになった。

---

Actions support for branch protection changes | GitHub Changelog
https://github.blog/changelog/2021-11-01-actions-support-for-branch-protection-changes/

`branch_protection_rule` トリガーが追加。branch protection の作成、変更、削除時にワークフローを動かせるようになった。

---

GitHub Actions: Conditional execution of steps in actions | GitHub Changelog
https://github.blog/changelog/2021-11-09-github-actions-conditional-execution-of-steps-in-actions/

アクション内のステップにおいて `if` が使えるようになった。

---

GitHub Actions: Input types for manual workflows | GitHub Changelog
https://github.blog/changelog/2021-11-10-github-actions-input-types-for-manual-workflows/

`workflow_dispatch` の `inputs` において、入力の種類を選べるようになった。従来の文字列（`string`）に加え、セレクトボックス（`choice`）、真偽値（`boolean`）、Environments（`environments`）が入力として使えるようになった。

---

GitHub Actions: Windows Server 2022 with Visual Studio 2022 is now generally available on GitHub-hosted runners | GitHub Changelog
https://github.blog/changelog/2021-11-16-github-actions-windows-server-2022-with-visual-studio-2022-is-now-generally-available-on-github-hosted-runners/

Visual Studio 2022 を搭載した Windows Server 2022 ランナーが GA になった。

---

Debugging CodeQL code scanning made easier by retaining diagnostic artifacts in Actions | GitHub Changelog
https://github.blog/changelog/2021-11-17-debugging-codeql-code-scanning-made-easier-by-retaining-diagnostic-artifacts-in-actions/

CodeQL の利用時に問題が発生した際、デバッグを容易にするための設定（`debug`）が github/codeql-action/init アクションに追加された。有効にすると CodeQL のログや DB などがアーティファクトに保存される。GitHub のサポートから求められる可能性もある。

---

GitHub Actions: Cache size is now increased to 10GB per repository | GitHub Changelog
https://github.blog/changelog/2021-11-23-github-actions-cache-size-is-now-increased-to-10gb-per-repository/

キャッシュサイズが 5GB から 10GB に増えた。

---

GitHub Actions: Secure cloud deployments with OpenID Connect is now GA | GitHub Changelog
https://github.blog/changelog/2021-11-23-secure-cloud-deployments-with-oidc-is-now-ga/

OpenID Connect が GA に。むしろ GA じゃなかったのか。

---

GitHub Actions: setup-python now supports dependency caching | GitHub Changelog
https://github.blog/changelog/2021-11-23-github-actions-setup-python-now-supports-dependency-caching/

actions/setup-python アクションがキャッシュをサポート。

---

GitHub Actions: Reusable workflows are generally available | GitHub Changelog
https://github.blog/changelog/2021-11-24-github-actions-reusable-workflows-are-generally-available/

再利用可能なワークフローが GA に。
ベータ版から以下の改善が行われた。

- 再利用可能なワークフローから呼び出し元ワークフロー内の他のジョブにデータを渡すための output が利用できるように
- 再利用可能なワークフローに環境変数を渡せるように
- 利用された再利用可能なワークフローが監査ログに記録されるように

---

API support for managing labels of Actions self-hosted runners | GitHub Changelog
https://github.blog/changelog/2021-11-25-api-support-for-managing-labels-of-actions-self-hosted-runners/

API を使ってセルフホストランナーのラベルを管理できるようになった。

---

GitHub Actions: Workflows triggered by Dependabot receive dependabot secrets | GitHub Changelog
https://github.blog/changelog/2021-11-30-github-actions-workflows-triggered-by-dependabot-receive-dependabot-secrets/

Dependabot の PR によってトリガーされるワークフローが Dependabot のシークレットを読み込めるようになった。

この頃からできてたような...？[GitHub Actions: Workflows triggered by Dependabot PRs will respect permissions key in workflows | GitHub Changelog](https://github.blog/changelog/2021-10-06-github-actions-workflows-triggered-by-dependabot-prs-will-respect-permissions-key-in-workflows/)