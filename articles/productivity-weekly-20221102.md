---
title: "Productivity Weekly (2022-11-02号)"
emoji: "🥅"
type: "idea"
topics: ["ProductivityWeekly", "生産性向上"]
published: true
publication_name: "cybozu_ept"
user_defined: {"publish_link": "https://zenn.dev/korosuke613/articles/productivity-weekly-20221102"}
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://note.com/cybozu_dev/n/n1c1b44bf72f6)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1 週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 98 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly?order=latest)。

# news 📺

## Amazon Virtual Private Cloud (VPC) は AWS アカウント間の Elastic IP アドレス転送のサポートを開始
https://aws.amazon.com/jp/about-aws/whats-new/2022/10/amazon-virtual-private-cloud-vpc-transfer-elastic-ip-addresses-between-aws-accounts/

AWS において、コンソールから Elastic IP アドレスを AWS アカウント間で移行できるようになりました。

これまでは移行のためにサポートとのやりとりが必要でした（参考：[amazon ec2 - Associate elastic ip with instance on another account - Stack Overflow](https://stackoverflow.com/questions/23322620/associate-elastic-ip-with-instance-on-another-account/62644793#62644793)）。

アプリケーションをアカウント移行する場合、Elastic IP アドレスが変わってしまうため、ファイアウォール等でホワイトリストを変更する必要がありました（設定してた場合）。新しい Elastic IP アドレス転送の機能を使えば同じ IP アドレスのままアカウント移行ができるため、アプリケーションなどの移行を素早く行えます。

サポートへ問い合わせして移行したことがあるのですが、公式ドキュメントにない方法かつサポートケースを複数個開く必要があって面倒でした。ユーザ自身で移行できるようになったのはうれしいですね。

## Preview: referencing public code in GitHub Copilot | The GitHub Blog
https://github.blog/2022-11-01-preview-referencing-public-code-in-github-copilot/

GitHub Copilot が、2023 年のメジャーアップデートで、サジェストされるコードに類似するパブリックリポジトリおよびそのライセンスなどの一覧を表示する機能を追加する**予定**であると発表されました。また、一覧を表示するだけでなく、リポジトリライセンスやコミット日などで並び替えられるようにするとのことです。

2023 年実装予定なのでまだ先ですが、[最近 GitHub Copilot に対しての集団訴訟を検討している人たちが出てきた](https://zenn.dev/cybozu_ept/articles/productivity-weekly-20221019#github-copilot-investigation-%C2%B7-joseph-saveri-law-firm-%26-matthew-butterick)ため、それへの対策なのかもしれません（想像です）。

例えば GitHub Copilot を使って知らぬうちに GPL ライセンスのコードを使ってしまっていたりすると大変困るので、こういった機能は利用者にとって嬉しいですね。続報を待ちたいです。

## GitHub Actions: Restrict workflows to specific runners using runner group names | GitHub Changelog
https://github.blog/changelog/2022-11-01-github-actions-restrict-workflows-to-specific-runners-using-runner-group-names/

GitHub Actions において、ジョブ側でランナーグループを指定できるようになりました。

これまではジョブ側ではランナーグループを指定できなかったため、もし異なるランナーグループに同じラベルのランナーが存在した場合、使われるランナーは一意に定まらないという問題がありました。大規模な組織であればあるほど起こりうる問題です。今回ジョブ側でランナーグループを指定できるようになったため、使われるランナーを一意に定めることができ、上記の問題を解決できるようになりました。

地味な変更ですがランナーグループを多様している組織にとってはとても嬉しい機能追加ですね。

## Announcing Docker Hub OCI Artifacts Support - Docker
https://www.docker.com/blog/announcing-docker-hub-oci-artifacts-support/

Docker Hub が OCI Artifacts をサポートしました。

OCI Artifacts は**本当にざっくり言うと**コンテナのフォーマットにバイナリなどのファイルを格納して配布できる成果物のことです。

OCI(Open Container Initiative)とはコンテナ技術の標準化のための構想の名前です。ここら辺を詳しく知りたい方は [Open Container Initiative - Open Container Initiative](https://opencontainers.org/) や [OCI Registry As Storage](https://oras.land/#what-are-oci-registries) [opencontainers/artifacts: OCI Artifacts](https://github.com/opencontainers/artifacts) をお読みください[^oci]。

この OCI Artifacts ですが、既存の有名な使われ方としては Homebrew の bottle の配布があります。

> Homebrew now hosts all of their bottles on the Container registry. This was made possible because the Container registry supports OCI images. 
https://github.blog/2021-06-21-github-packages-container-registry-generally-available/#dont-just-take-our-word-for-it

他にも、Helm チャートの OCI Registry 対応も今年の初めに GA となっています（[Helm | Storing Helm Charts in OCI Registries](https://helm.sh/blog/storing-charts-in-oci/)）。

既に主要なコンテナレジストリサービスは OCI Artifacts に対応しています[^support_oci]。今回 Docker Hub も OCI Artifacts が利用できるようになってとうとう来たかとなっている方は少なくないでしょう。

Docker 社のブログには Helm チャートを Docker Hub に push する例、[ORAS CLI](https://oras.land/) を使った任意のアプリケーションデータを push する例が載っています。

Docker Hub もいよいよ対応して OCI Artifacts の利用がますます活発になっていきそうですね。良い利用方法が思いついたら使っていきたいです。

僕もそろそろどんなものか触っておこうと思い、Docker Hub に OCI Artifacts を push するのをやってみました。気になる人は見てみてください。
- [Docker HubにOCI Artifactsをpushしてみる](https://zenn.dev/korosuke613/scraps/c06f1f923c7bdf)

[^support_oci]: [ORAS](https://github.com/oras-project/oras-www/blob/e600fd0d33df06a5a055e20a6f785755779697df/docs/implementors.md#L15-L22) によると、Azure Container Registry、Amazon Elastic Container Registry、Google Artifact Registry、GitHub Packages container registry、Bundle Bar は既に対応されている。
[^oci]: OCI 関連の説明書こうとしたけどうまく説明するの難しくてやめました。

# tool 🔨

## SadServers - Troubleshooting Linux Servers
https://sadservers.com/

SadServers は問題を抱えたサーバに ssh してトラブルシューティングを行うことでデバッグスキルをトレーニングできるサイトです。無料で利用できます。

シナリオを選んで `Run` をクリックするとシナリオが書かれたページに飛ぶのですが、面白いことにその際にサーバを用意してくれます。用意されたサーバへのリンクをクリックするとブラウザ上でターミナルが立ち上がり、自由にコマンドを打てるようになります。気になる人はとりあえずやってみるのが良いです。

[現在は 13 問存在](https://sadservers.com/scenarios)します。何問か解いてみましたがなかなか楽しかったです。正答出来ているかのテストコマンドも載っていて、解答体験は個人的に良かったです。

> 一部タイムアウトになりながらもNo.10まで解けた。No.11をやろうとしたら「回数上限達したので24時間まってね」はい。
> AWSにt3a.nanoで起動してるようなのでそれなりにコストかかってそう。広告出すとかjslinuxを使うとかでなんとか頑張って欲しい。
https://twitter.com/matsuu/status/1586539297083076608

上記のツイートにもあるようにコンピューティングを無料で利用者に貸し出しているので、料金的に大丈夫なのかはちょっと気になるところです。
面白い取り組みなので、ぜひ続いてほしいですね。

# あとがき
今週はネタ少なめだったので前回号から早めに出せました。良かった。

先日は皆既月食 + 惑星食が重なって 400 年ぶりだったらしく、せっかくなので写真を撮りました。
微妙に天王星が写ってます。
みなさんいいねしてください。
https://twitter.com/Shitimi_613/status/1589997939971489792

サイボウズの生産性向上チームでは社内エンジニアの開発生産性を上げるための活動を行なっています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://note.com/cybozu_dev/n/n1c1b44bf72f6

:::message 
すみません、今週もおまけはお休みです...
:::
