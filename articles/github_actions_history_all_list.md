---
title: "GitHub Actions の Changelog リスト"
emoji: "🚀"
type: "tech"
topics: ["GitHubActions"]
published: true
---

:::message
最終更新日： 2022/04/08
:::

# 概要
GitHub Actions の Changelog をとにかく並べたものです。
漏れや抜けを見つけたらプルリクを送ってください...
（他の人からの変更をもらえやすいようにするために Zenn に投稿しました。）

GitHub Actions の歴史についてまとめたものも投稿してます。

https://korosuke613.hatenablog.com/entry/history-of-github-actions


# Actions が関係する Changelog
<!-- 注釈ゾーン -->
[^1201-ensure]: status check で actions の check じゃないとダメって設定できるようになったやつ。
[^1207-ghes]: ghes で ephemeral runner が使えるようになったやつ。
[^1209-depe]: 

- 2022-04-06 [GitHub Action for dependency review enforcement | GitHub Changelog](https://github.blog/changelog/2022-04-06-github-action-for-dependency-review-enforcement/)
- 2022-04-04 [GitHub Actions: Job management hooks for self-hosted runners | GitHub Changelog](https://github.blog/changelog/2022-04-04-github-actions-job-management-hooks-for-self-hosted-runners/)
- 2022-03-21 [GitHub Actions: Restrict self-hosted runner groups to specific workflows | GitHub Changelog](https://github.blog/changelog/2022-03-21-github-actions-restrict-self-hosted-runner-groups-to-specific-workflows/)
- 2022-03-17 [GitHub Actions: Re-run only failed or individual jobs | GitHub Changelog](https://github.blog/changelog/2022-03-17-github-actions-re-run-only-failed-or-individual-jobs/)
- 2022-03-17 [View cache usage in your Action workflows | GitHub Changelog](https://github.blog/changelog/2022-03-17-view-cache-usage-in-your-action-workflows/)
- 2022-03-15 [GitHub Enterprise Server 3.4 is now generally available | GitHub Changelog](https://github.blog/changelog/2022-03-15-github-enterprise-server-3-4-is-now-generally-available/)
- 2022-03-04 [Sharing GitHub Actions within your enterprise is now GA | GitHub Changelog](https://github.blog/changelog/2022-03-04-sharing-github-actions-within-your-enterprise-is-now-ga/)
- 2022-02-22 [Discover code scanning partner integrations on the GitHub Actions tab | GitHub Changelog](https://github.blog/changelog/2022-02-22-discover-code-scanning-partner-integrations-on-the-github-actions-tab/)
- 2022-02-01 [GitHub Actions: Self-hosted runners can now disable automatic updates | GitHub Changelog](https://github.blog/changelog/2022-02-01-github-actions-self-hosted-runners-can-now-disable-automatic-updates/)
- 2022-01-31 [Dependency graph adds support for GitHub Actions | GitHub Changelog](https://github.blog/changelog/2022-01-31-dependency-graph-adds-support-for-github-actions/)
- 2022-01-25 [GitHub Actions: Reusable workflows can be referenced locally | GitHub Changelog](https://github.blog/changelog/2022-01-25-github-actions-reusable-workflows-can-be-referenced-locally/)
- 2022-01-21 [Share GitHub Actions within your enterprise | GitHub Changelog](https://github.blog/changelog/2022-01-21-share-github-actions-within-your-enterprise/)
- 2022-01-14 [GitHub Actions: Prevent GitHub Actions from approving pull requests | GitHub Changelog](https://github.blog/changelog/2022-01-14-github-actions-prevent-github-actions-from-approving-pull-requests/)
- 2022-01-14 [Updates to the Checks Data Retention Policy | GitHub Changelog](https://github.blog/changelog/2022-01-14-updates-to-the-checks-data-retention-policy/)
- 2022-01-13 [GitHub Actions - Update on OIDC based deployments to AWS | GitHub Changelog](https://github.blog/changelog/2022-01-13-github-actions-update-on-oidc-based-deployments-to-aws/)
- 2022-01-11 [GitHub Actions: Jobs running on `windows-latest` are now running on Windows Server 2022. | GitHub Changelog](https://github.blog/changelog/2022-01-11-github-actions-jobs-running-on-windows-latest-are-now-running-on-windows-server-2022/)
- 2022-01-04 [GitHub Actions: Changing the search order for self-hosted runners | GitHub Changelog](https://github.blog/changelog/2022-01-04-github-actions-changing-the-search-order-for-self-hosted-runners/)
- 2021-12-17 [GitHub Actions: Improvements to GitHub Actions starter experience | GitHub Changelog](https://github.blog/changelog/2021-12-17-github-actions-improvements-to-github-actions-starter-experience/)
- 2021-12-16 [GitHub Pages: using GitHub Actions for builds and deployments for public repositories | GitHub Changelog](https://github.blog/changelog/2021-12-16-github-pages-using-github-actions-for-builds-and-deployments-for-public-repositories/)
- 2021-12-10 [GitHub Actions: GitHub-hosted runners now run Node.js 16 by default | GitHub Changelog](https://github.blog/changelog/2021-12-10-github-actions-github-hosted-runners-now-run-node-js-16-by-default/)
- 2021-12-09 [GitHub Actions: Changes to permissions in workflows triggered by Dependabot | GitHub Changelog](https://github.blog/changelog/2021-12-09-github-actions-changes-to-permissions-in-workflows-triggered-by-dependabot/)
- 2021-12-07 [GitHub Enterprise Server 3.3 is Generally Available | GitHub Changelog](https://github.blog/changelog/2021-12-07-github-enterprise-server-3-3-is-generally-available/)[^1207-ghes]
- 2021-12-01 [Ensure required status checks provided by the intended app | GitHub Changelog](https://github.blog/changelog/2021-12-01-ensure-required-status-checks-provided-by-the-intended-app/)[^1201-ensure]
- 2021-11-30 [GitHub Actions: Workflows triggered by Dependabot receive dependabot secrets | GitHub Changelog](https://github.blog/changelog/2021-11-30-github-actions-workflows-triggered-by-dependabot-receive-dependabot-secrets/)
- 2021-11-25 [API support for managing labels of Actions self-hosted runners | GitHub Changelog](https://github.blog/changelog/2021-11-25-api-support-for-managing-labels-of-actions-self-hosted-runners/)
- 2021-11-24 [GitHub Actions: Reusable workflows are generally available | GitHub Changelog](https://github.blog/changelog/2021-11-24-github-actions-reusable-workflows-are-generally-available/)
- 2021-11-23 [GitHub Actions: setup-python now supports dependency caching | GitHub Changelog](https://github.blog/changelog/2021-11-23-github-actions-setup-python-now-supports-dependency-caching/)
- 2021-11-23 [GitHub Actions: Secure cloud deployments with OpenID Connect is now GA | GitHub Changelog](https://github.blog/changelog/2021-11-23-secure-cloud-deployments-with-oidc-is-now-ga/)
- 2021-11-23 [GitHub Actions: Cache size is now increased to 10GB per repository | GitHub Changelog](https://github.blog/changelog/2021-11-23-github-actions-cache-size-is-now-increased-to-10gb-per-repository/)
- 2021-11-17 [Debugging CodeQL code scanning made easier by retaining diagnostic artifacts in Actions | GitHub Changelog](https://github.blog/changelog/2021-11-17-debugging-codeql-code-scanning-made-easier-by-retaining-diagnostic-artifacts-in-actions/)
- 2021-11-16 [GitHub Actions: Windows Server 2022 with Visual Studio 2022 is now generally available on GitHub-hosted runners | GitHub Changelog](https://github.blog/changelog/2021-11-16-github-actions-windows-server-2022-with-visual-studio-2022-is-now-generally-available-on-github-hosted-runners/)
- 2021-11-10 [GitHub Actions: Input types for manual workflows | GitHub Changelog](https://github.blog/changelog/2021-11-10-github-actions-input-types-for-manual-workflows/)
- 2021-11-09 [GitHub Actions: Conditional execution of steps in actions | GitHub Changelog](https://github.blog/changelog/2021-11-09-github-actions-conditional-execution-of-steps-in-actions/)
- 2021-11-01 [Actions support for branch protection changes | GitHub Changelog](https://github.blog/changelog/2021-11-01-actions-support-for-branch-protection-changes/)
- 2021-10-27 [GitHub Actions: Secure cloud deployments with OpenID Connect | GitHub Changelog](https://github.blog/changelog/2021-10-27-github-actions-secure-cloud-deployments-with-openid-connect/)
- 2021-10-19 [GitHub Actions : The Windows 2016 runner image will be removed from GitHub-hosted runners on March 15, 2022 | GitHub Changelog](https://github.blog/changelog/2021-10-19-github-actions-the-windows-2016-runner-image-will-be-removed-from-github-hosted-runners-on-march-15-2022/)
- 2021-10-11 [GitHub Actions: Granular personal access token scopes for self-hosted runners in enterprises | GitHub Changelog](https://github.blog/changelog/2021-10-11-github-actions-granular-personal-access-token-scopes-for-self-hosted-runners-in-enterprises/)
- 2021-10-06 [GitHub Actions: Workflows triggered by Dependabot PRs will respect permissions key in workflows | GitHub Changelog](https://github.blog/changelog/2021-10-06-github-actions-workflows-triggered-by-dependabot-prs-will-respect-permissions-key-in-workflows/)
- 2021-10-05 [GitHub Actions: DRY your GitHub Actions configuration by reusing workflows | GitHub Changelog](https://github.blog/changelog/2021-10-05-github-actions-dry-your-github-actions-configuration-by-reusing-workflows/)
- 2021-09-29 [GitHub Actions: Jobs running on `macos-latest` are now running on macOS Big Sur (11). | GitHub Changelog](https://github.blog/changelog/2021-09-29-github-actions-jobs-running-on-macos-latest-are-now-running-on-macos-big-sur-11/)
- 2021-09-20 [GitHub Actions: Ephemeral self-hosted runners & new webhooks for auto-scaling | GitHub Changelog](https://github.blog/changelog/2021-09-20-github-actions-ephemeral-self-hosted-runners-new-webhooks-for-auto-scaling/)
- 2021-09-20 [GitHub Actions: Experience refresh for the management of self-hosted runners | GitHub Changelog](https://github.blog/changelog/2021-09-20-github-actions-experience-refresh-for-the-management-of-self-hosted-runners/)
- 2021-09-07 [GitHub Actions: Setup-node supports dependency caching for projects with monorepo and pnpm package manager | GitHub Changelog](https://github.blog/changelog/2021-09-07-github-actions-setup-node-supports-dependency-caching-for-projects-with-monorepo-and-pnpm-package-manager/)
- 2021-09-02 [GitHub Actions: Filter workflow runs by created date | GitHub Changelog](https://github.blog/changelog/2021-09-02-github-actions-filter-workflow-runs-by-created-date/)
- 2021-08-30 [GitHub Actions: Setup-java now supports dependency caching | GitHub Changelog](https://github.blog/changelog/2021-08-30-github-actions-setup-java-now-supports-dependency-caching/)
- 2021-08-25 [GitHub Actions: Reduce duplication with action composition | GitHub Changelog](https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/)
- 2021-08-23 [GitHub Actions: Windows Server 2022 with Visual Studio 2022 is now available on GitHub-hosted runners (Public Beta) | GitHub Changelog](https://github.blog/changelog/2021-08-23-github-actions-windows-server-2022-with-visual-studio-2022-is-now-available-on-github-hosted-runners-public-beta/)
- 2021-08-16 [GitHub Actions: macOS 11 Big Sur is generally available on GitHub-hosted runners | GitHub Changelog](https://github.blog/changelog/2021-08-16-github-actions-macos-11-big-sur-is-generally-available-on-github-hosted-runners/)
- 2021-08-04 [GitHub Actions: Self-hosted runner events are now included in the Audit Log | GitHub Changelog](https://github.blog/changelog/2021-08-04-github-actions-self-hosted-runner-events-are-now-included-in-the-audit-log/)
- 2021-07-02 [GitHub Actions: Setup-node now supports dependency caching | GitHub Changelog](https://github.blog/changelog/2021-07-02-github-actions-setup-node-now-supports-dependency-caching/)
- 2021-07-01 [GitHub Actions: New settings for maintainers | GitHub Changelog](https://github.blog/changelog/2021-07-01-github-actions-new-settings-for-maintainers/)
- 2021-06-29 [GitHub Discussions events available on GitHub Actions | GitHub Changelog](https://github.blog/changelog/2021-06-29-github-discussions-events-available-on-github-actions/)
- 2021-06-22 [GitHub Actions: Environments, environment protection rules, and environment secrets are generally available | GitHub Changelog](https://github.blog/changelog/2021-06-22-github-actions-environments-environment-protection-rules-and-environment-secrets-are-generally-available/)
- 2021-05-19 [GitHub Actions : Hosted Ubuntu runners will only contain the latest patch release for each supported version of the .NET SDK | GitHub Changelog](https://github.blog/changelog/2021-05-19-github-actions-hosted-ubuntu-runners-will-only-contain-the-latest-patch-release-for-each-supported-version-of-the-net-sdk/)
- 2021-05-06 [GitHub Actions: Beta API to approve Actions from forks | GitHub Changelog](https://github.blog/changelog/2021-05-06-github-actions-beta-api-to-approve-actions-from-forks/)
- 2021-04-29 [GitHub Actions : Ubuntu 16.04 LTS virtual environment will be removed on September 20, 2021 | GitHub Changelog](https://github.blog/changelog/2021-04-29-github-actions-ubuntu-16-04-lts-virtual-environment-will-be-removed-on-september-20-2021/)
- 2021-04-22 [GitHub Actions: Maintainers must approve first time contributor workflow runs | GitHub Changelog](https://github.blog/changelog/2021-04-22-github-actions-maintainers-must-approve-first-time-contributor-workflow-runs/)
- 2021-04-20 [GitHub Actions: Control permissions for GITHUB_TOKEN | GitHub Changelog](https://github.blog/changelog/2021-04-20-github-actions-control-permissions-for-github_token/)
- 2021-04-19 [GitHub Actions: Limit workflow run or job concurrency | GitHub Changelog](https://github.blog/changelog/2021-04-19-github-actions-limit-workflow-run-or-job-concurrency/)
- 2021-04-05 [GitHub Actions: Setup-java now support Adopt OpenJDK | GitHub Changelog](https://github.blog/changelog/2021-04-05-github-actions-setup-java-now-support-adopt-openjdk/)
- 2021-02-23 [GitHub Actions: Workflow run events are now included in the Audit Log | GitHub Changelog](https://github.blog/changelog/2021-02-23-github-actions-workflow-run-events-are-now-included-in-the-audit-log/)
- 2021-02-23 [GitHub Actions: environment, environment protection rules and deployment reviewers API | GitHub Changelog](https://github.blog/changelog/2021-02-23-github-actions-environment-environment-protection-rules-and-deployment-reviewers-api/)
- 2021-02-19 [GitHub Actions: Workflows triggered by Dependabot PRs will run with read-only permissions | GitHub Changelog](https://github.blog/changelog/2021-02-19-github-actions-workflows-triggered-by-dependabot-prs-will-run-with-read-only-permissions/)
- 2021-02-17 [GitHub Actions: Limit which branches can deploy to an environment | GitHub Changelog](https://github.blog/changelog/2021-02-17-github-actions-limit-which-branches-can-deploy-to-an-environment/)
- 2021-02-08 [GitHub Actions: Skip pull request and push workflows with[skip ci]| GitHub Changelog](https://github.blog/changelog/2021-02-08-github-actions-skip-pull-request-and-push-workflows-with-skip-ci/)
- 2021-01-28 [GitHub Actions Breaking Change: .NET Core 3.0 will be removed from macOS and Ubuntu images | GitHub Changelog](https://github.blog/changelog/2021-01-28-github-actions-breaking-change-net-core-3-0-will-be-removed-from-macos-and-ubuntu-images/)
- 2021-01-21 [GitHub Actions: Short SHA deprecation | GitHub Changelog](https://github.blog/changelog/2021-01-21-github-actions-short-sha-deprecation/)
- 2021-01-15 [The GitHub Enterprise Server 3.0 release candidate is here! | GitHub Changelog](https://github.blog/changelog/2021-01-15-the-github-enterprise-server-3-0-release-candidate-is-here/)
- 2020-12-15 [GitHub Actions: Environments, environment protection rules and environment secrets (beta) | GitHub Changelog](https://github.blog/changelog/2020-12-15-github-actions-environments-environment-protection-rules-and-environment-secrets-beta/)
- 2020-12-08 [GitHub Actions: Workflow visualization | GitHub Changelog](https://github.blog/changelog/2020-12-08-github-actions-workflow-visualization/)
- 2020-11-09 [GitHub Actions: Removing set-env and add-path commands on November 16 | GitHub Changelog](https://github.blog/changelog/2020-11-09-github-actions-removing-set-env-and-add-path-commands-on-november-16/)
- 2020-10-29 [GitHub Actions: Ubuntu-latest workflows will use Ubuntu-20.04 | GitHub Changelog](https://github.blog/changelog/2020-10-29-github-actions-ubuntu-latest-workflows-will-use-ubuntu-20-04/)
- 2020-10-29 [GitHub Actions: MacOS Big Sur Preview | GitHub Changelog](https://github.blog/changelog/2020-10-29-github-actions-macos-big-sur-preview/)
- 2020-10-16 [GitHub Actions: Self-Hosted Runner Group Access Changes | GitHub Changelog](https://github.blog/changelog/2020-10-16-github-actions-self-hosted-runner-group-access-changes/)
- 2020-10-08 [GitHub Actions: Ability to change retention days for artifacts and logs | GitHub Changelog](https://github.blog/changelog/2020-10-08-github-actions-ability-to-change-retention-days-for-artifacts-and-logs/)
- 2020-10-01 [GitHub Actions: Deprecating set-env and add-path commands | GitHub Changelog](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/)
- 2020-10-01 [GitHub Actions: Fine-tune access to external actions | GitHub Changelog](https://github.blog/changelog/2020-10-01-github-actions-fine-tune-access-to-external-actions/)
- 2020-10-01 [Ability to disable Actions workflows | GitHub Changelog](https://github.blog/changelog/2020-10-01-ability-to-disable-actions-workflows/)
- 2020-09-24 [GitHub Actions: Private registry support for job and service containers | GitHub Changelog](https://github.blog/changelog/2020-09-24-github-actions-private-registry-support-for-job-and-service-containers/)
- 2020-09-23 [GitHub Actions: Log Improvements | GitHub Changelog](https://github.blog/changelog/2020-09-23-github-actions-log-improvements/)
- 2020-09-14 [New limits affecting the Checks API | GitHub Changelog](https://github.blog/changelog/2020-09-14-new-limits-affecting-the-checks-api/)
- 2020-08-31 [Create a custom list of email addresses to receive Actions and Packages billing threshold notifications | GitHub Changelog](https://github.blog/changelog/2020-08-31-create-a-custom-list-of-email-addresses-to-receive-actions-and-packages-billing-threshold-notifications/)
- 2020-08-31 [Org admins in Enterprise accounts can view Actions and Packages usage in the billing page | GitHub Changelog](https://github.blog/changelog/2020-08-31-org-admins-in-enterprise-accounts-can-view-actions-and-packages-usage-in-the-billing-page/)
- 2020-08-07 [GitHub Actions: Composite Run Steps | GitHub Changelog](https://github.blog/changelog/2020-08-07-github-actions-composite-run-steps/)
- 2020-08-05 [GitHub Actions: Enterprise runners and runner groups | GitHub Changelog](https://github.blog/changelog/2020-08-05-github-actions-enterprise-runners-and-runner-groups/)
- 2020-08-03 [GitHub Actions: New runner release v2.272.0 | GitHub Changelog](https://github.blog/changelog/2020-08-03-github-actions-new-runner-release-v2-272-0/)
- 2020-07-22 [GitHub Actions: Better support for alternative default branch names | GitHub Changelog](https://github.blog/changelog/2020-07-22-github-actions-better-support-for-alternative-default-branch-names/)
- 2020-07-16 [GitHub Actions - New settings to enable actions | GitHub Changelog](https://github.blog/changelog/2020-07-16-github-actions-new-settings-to-enable-actions/)
- 2020-07-07 [GitHub Actions: ability to delete workflow runs | GitHub Changelog](https://github.blog/changelog/2020-07-07-github-actions-ability-to-delete-workflow-runs/)
- 2020-07-06 [GitHub Actions: New runner release v2.267.1 | GitHub Changelog](https://github.blog/changelog/2020-07-06-github-actions-new-runner-release-v2-267-1/)
- 2020-07-06 [GitHub Actions: Manual triggers with workflow_dispatch | GitHub Changelog](https://github.blog/changelog/2020-07-06-github-actions-manual-triggers-with-workflow_dispatch/)
- 2020-07-02 [Dependabot updates your GitHub Actions workflows | GitHub Changelog](https://github.blog/changelog/2020-07-02-dependabot-updates-your-github-actions-workflows/)
- 2020-06-23 [GitHub Actions: workflow templates | GitHub Changelog](https://github.blog/changelog/2020-06-23-github-actions-workflow-templates/)
- 2020-06-03 [Personal Access Tokens Workflow permission | GitHub Changelog](https://github.blog/changelog/2020-06-03-personal-access-tokens-workflow-permission/)
- 2020-05-27 [GitHub Actions: V2 cache actions | GitHub Changelog](https://github.blog/changelog/2020-05-27-github-actions-v2-cache-actions/)
- 2020-05-27 [GitHub Actions: New runner release v2.263.0 | GitHub Changelog](https://github.blog/changelog/2020-05-27-github-actions-new-runner-release-v2-263-0/)
- 2020-05-26 [GitHub Actions: Re-Run Successful Jobs | GitHub Changelog](https://github.blog/changelog/2020-05-26-github-actions-re-run-successful-jobs/)
- 2020-05-18 [GitHub Actions API: Workflow usage public beta | GitHub Changelog](https://github.blog/changelog/2020-05-18-github-actions-api-workflow-usage-public-beta/)
- 2020-05-15 [GitHub Actions: Cleanup self-hosted runners older than 2.168.0 | GitHub Changelog](https://github.blog/changelog/2020-05-15-github-actions-cleanup-self-hosted-runners-older-than-2-168-0/)
- 2020-05-14 [GitHub Actions: New runner release v2.262.1 | GitHub Changelog](https://github.blog/changelog/2020-05-14-github-actions-new-runner-release-v2-262-1/)
- 2020-04-30 [GitHub Actions: Logs show virtual environment version | GitHub Changelog](https://github.blog/changelog/2020-04-30-github-actions-logs-show-virtual-environment-version/)
- 2020-04-30 [GitHub Actions: V2 setup-python action | GitHub Changelog](https://github.blog/changelog/2020-04-30-github-actions-v2-setup-python-action/)
- 2020-04-28 [GitHub Actions: V2 artifact actions | GitHub Changelog](https://github.blog/changelog/2020-04-28-github-actions-v2-artifact-actions/)
- 2020-04-22 [GitHub Actions: Organization level self-hosted runners | GitHub Changelog](https://github.blog/changelog/2020-04-22-github-actions-organization-level-self-hosted-runners/)
- 2020-04-21 [GitHub Actions logs can now be deleted | GitHub Changelog](https://github.blog/changelog/2020-04-21-github-actions-logs-can-now-be-deleted/)
- 2020-04-20 [GitHub Actions: Cleanup dormant self-hosted runners | GitHub Changelog](https://github.blog/changelog/2020-04-20-github-actions-cleanup-dormant-self-hosted-runners/)
- 2020-04-17 [GitHub Actions: New runner release v2.169.1 | GitHub Changelog](https://github.blog/changelog/2020-04-17-github-actions-new-runner-release-v2-169-1/)
- 2020-04-15 [GitHub Actions: sets the `CI` environment variable to true | GitHub Changelog](https://github.blog/changelog/2020-04-15-github-actions-sets-the-ci-environment-variable-to-true/)
- 2020-04-15 [GitHub Actions: New workflow features | GitHub Changelog](https://github.blog/changelog/2020-04-15-github-actions-new-workflow-features/)
- 2020-03-24 [GitHub Actions: API is now generally available | GitHub Changelog](https://github.blog/changelog/2020-03-24-github-actions-api-is-now-generally-available/)
- 2020-03-10 [Event-Specific Details on the Actions tab | GitHub Changelog](https://github.blog/changelog/2020-03-10-event-specific-details-on-the-actions-tab/)
- 2020-03-09 [New filter parameter in workflow jobs API | GitHub Changelog](https://github.blog/changelog/2020-03-09-new-filter-parameter-in-workflow-jobs-api/)
- 2020-02-27 [GitHub Actions Breaking Change: Python 2 being removed from all virtual environments | GitHub Changelog](https://github.blog/changelog/2020-02-27-github-actions-breaking-change-python-2-being-removed-from-all-virtual-environments/)
- 2020-02-21 [GitHub Actions Breaking Change: Ubuntu virtual environments will no longer start the MySQL service automatically | GitHub Changelog](https://github.blog/changelog/2020-02-21-github-actions-breaking-change-ubuntu-virtual-environments-will-no-longer-start-the-mysql-service-automatically/)
- 2020-02-12 [GitHub Actions: Proxy Support for Self-Hosted Runners | GitHub Changelog](https://github.blog/changelog/2020-02-12-github-actions-proxy-support-for-self-hosted-runners/)
- 2020-01-27 [GitHub Actions: API Beta | GitHub Changelog](https://github.blog/changelog/2020-01-27-github-actions-api-beta/)
- 2020-01-14 [GitHub Actions: Changes to artifact download experience | GitHub Changelog](https://github.blog/changelog/2020-01-14-github-actions-changes-to-artifact-download-experience/)
- 2020-01-09 [GitHub Actions: Updates to the macOS 10.15 virtual environment | GitHub Changelog](https://github.blog/changelog/2020-01-09-github-actions-updates-to-the-macos-10-15-virtual-environment/)
- 2019-12-19 [GitHub Actions: The Runner is now open sourced | GitHub Changelog](https://github.blog/changelog/2019-12-19-github-actions-the-runner-is-now-open-sourced/)
- 2019-12-19 [GitHub Actions: Updates to the virtual environments | GitHub Changelog](https://github.blog/changelog/2019-12-19-github-actions-updates-to-the-virtual-environments/)
- 2019-12-10 [GitHub Actions: AWS and gcloud actions deprecated | GitHub Changelog](https://github.blog/changelog/2019-12-10-github-actions-aws-and-gcloud-actions-deprecated/)
- 2019-12-03 [GitHub Actions: Self-hosted runners on ARM architectures | GitHub Changelog](https://github.blog/changelog/2019-12-03-github-actions-self-hosted-runners-on-arm-architectures/)
- 2019-12-03 [GitHub Actions: Changes to release event | GitHub Changelog](https://github.blog/changelog/2019-12-03-github-actions-changes-to-release-event/)
- 2019-11-11 [GitHub Actions is generally available | The GitHub Changelog](https://github.blog/changelog/2019-11-11-github-actions-is-generally-available/)
- 2019-11-06 [GitHub Actions: macOS virtual environment updated to Catalina | GitHub Changelog](https://github.blog/changelog/2019-11-06-github-actions-macos-virtual-environment-updated-to-catalina/)
- 2019-11-06 [GitHub Actions: Linux and Windows virtual environments updates | GitHub Changelog](https://github.blog/changelog/2019-11-06-github-actions-linux-and-windows-virtual-environments-updates/)
- 2019-11-05 [GitHub Actions: Self-hosted runners | GitHub Changelog](https://github.blog/changelog/2019-11-05-github-actions-self-hosted-runners/)
- 2019-11-04 [GitHub Actions adds dependency caching | GitHub Changelog](https://github.blog/changelog/2019-11-04-github-actions-adds-dependency-caching/)
- 2019-11-01 [GitHub Actions—scheduled jobs maximum frequency is changing | GitHub Changelog](https://github.blog/changelog/2019-11-01-github-actions-scheduled-jobs-maximum-frequency-is-changing/)
- 2019-10-31 [GitHub Actions: macOS virtual environment is updating to Catalina and dropping Mojave support | GitHub Changelog](https://github.blog/changelog/2019-10-31-github-actions-macos-virtual-environment-is-updating-to-catalina-and-dropping-mojave-support/)
- 2019-10-31 [GitHub Actions - Windows Server 2016 virtual environment will be removed January 2020 | GitHub Changelog](https://github.blog/changelog/2019-10-31-github-actions-windows-server-2016-r2-virtual-environment-will-be-removed-on-november-7/)
- 2019-10-28 [GitHub Actions - update to job concurrency usage limits | GitHub Changelog](https://github.blog/changelog/2019-10-28-github-actions-update-to-job-concurrency-usage-limits/)
- 2019-10-25 [GitHub Actions - macOS and Windows virtual environments updates | GitHub Changelog](https://github.blog/changelog/2019-10-25-github-actions-macos-and-windows-virtual-environments-updates/)
- 2019-10-24 [GitHub Actions is changing how some events are evaluated | GitHub Changelog](https://github.blog/changelog/2019-10-24-github-actions-is-changing-how-some-events-are-evaluated/)
- 2019-10-17 [GitHub Actions - macOS virtual environment updates | GitHub Changelog](https://github.blog/changelog/2019-10-17-github-actions-macos-virtual-environment-updates-2/)
- 2019-10-17 [GitHub Actions - removing Python 3.4 and Ruby 2.3 from the virtual environments | GitHub Changelog](https://github.blog/changelog/2019-10-17-github-actions-removing-python-3-4-and-ruby-2-3-from-the-virtual-environments/)
- 2019-10-17 [GitHub Actions default shell on Windows runners is changing to PowerShell | GitHub Changelog](https://github.blog/changelog/2019-10-17-github-actions-default-shell-on-windows-runners-is-changing-to-powershell/)
- 2019-10-17 [Action log line numbers are now links | GitHub Changelog](https://github.blog/changelog/2019-10-17-action-log-line-numbers-are-now-links/)
- 2019-10-16 [Changes in GitHub Actions push event payload | GitHub Changelog](https://github.blog/changelog/2019-10-16-changes-in-github-actions-push-event-payload/)
- 2019-10-10 [The GitHub Actions Marketplace now requires an actions metadata file | GitHub Changelog](https://github.blog/changelog/2019-10-10-the-github-actions-marketplace-now-requires-an-actions-metadata-file/)
- 2019-10-04 [GitHub Actions - macOS virtual environment updates | GitHub Changelog](https://github.blog/changelog/2019-10-04-github-actions-macos-virtual-environment-updates/)
- 2019-10-01 [New editor for GitHub Actions | GitHub Changelog](https://github.blog/changelog/2019-10-01-new-editor-for-github-actions/)
- 2019-10-01 [GitHub Actions - HCL workflows are no longer being run | GitHub Changelog](https://github.blog/changelog/2019-10-01-github-actions-hcl-workflows-are-no-longer-being-run/)
- 2019-10-01 [GitHub Actions - new workflow syntax features | GitHub Changelog](https://github.blog/changelog/2019-10-01-github-actions-new-workflow-syntax-features/)
- 2019-09-30 [GitHub Actions - deterministic re-runs for workflows | GitHub Changelog](https://github.blog/changelog/2019-09-30-github-actions-deterministic-re-runs-for-workflows/)
- 2019-09-30 [GitHub Actions - event filtering updates | GitHub Changelog](https://github.blog/changelog/2019-09-30-github-actions-event-filtering-updates/)
- 2019-09-30 [Updates to GitHub Actions virtual environments | GitHub Changelog](https://github.blog/changelog/2019-09-30-updates-to-github-actions-virtual-environments/)
- 2019-09-26 [The Actions Tab Gets a New Look | GitHub Changelog](https://github.blog/changelog/2019-09-26-the-actions-tab-gets-a-new-look/)
- 2019-09-24 [UI changes in GitHub Actions checks | GitHub Changelog](https://github.blog/changelog/2019-09-24-ui-changes-in-github-actions-checks/)
- 2019-09-18 [Improvements to GitHub Actions | GitHub Changelog](https://github.blog/changelog/2019-09-18-improvements-to-github-actions/)
- 2019-09-17 [GitHub Actions will stop running workflows written in HCL | GitHub Changelog](https://github.blog/changelog/2019-09-17-github-actions-will-stop-running-workflows-written-in-hcl/)
- 2019-08-08 [Updates to GitHub Actions (limited public beta) | GitHub Changelog](https://github.blog/changelog/2019-08-08-updates-to-github-actions-limited-public-beta/)
- 2018-10-16 [GitHub Actions (limited public beta) | GitHub Changelog](https://github.blog/changelog/2018-10-16-github-actions-limited-beta/)

---

### 管理用

#### `<タイトル>\n<URL>` から `- <日付> [<タイトル>](<URL>)` にするための正規表現

- 検索文字列: `(.*)\n(.*)(\d\d\d\d-\d\d-\d\d)(.*)`
- 痴漢文字列: `- $3 [$1]($2$3$4)`

#### `- [<タイトル>](<URL>)` から `- <日付> [<タイトル>](<URL>)` にするための正規表現

- 検索文字列: `- (\[.*)(\d\d\d\d-\d\d-\d\d)(.*)`
- 置換文字列: `- $2 $1$2$3`
