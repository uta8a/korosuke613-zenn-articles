---
title: "Productivity Weekly (2021-01-20号)"
emoji: "🔥"
type: "idea" # tech: 技術記事 / idea: アイデア
topics: ["ProductivityWeekly", "生産性向上"]
published: false
---

こんにちは。サイボウズ株式会社 [生産性向上チーム](https://blog.cybozu.io/entry/2020/08/31/080000)の平木場です。

僕たち生産性向上チームは毎週水曜日に Productivity Weekly という「1週間の間に発見された開発者の生産性向上に関するネタを共有する会」を社内で開催しています。
本記事はその時のネタをまとめたものです。

今回が第 10 回目です。過去の記事は[こちら](https://zenn.dev/topics/productivityweekly)。

# news
## Support for renaming an existing branch - GitHub Changelog
https://github.blog/changelog/2021-01-19-support-for-renaming-an-existing-branch/

GitHub 上でブランチ名の変更ができるようになりました。
デフォルトブランチ名も変更できます。（master から main への変更を促進するために作ったのかも）

名前を変更しても、プルリクエストが自動で変更後に追従したり、古いブランチへのアクセスはリダイレクトされたりと、アフターフォローが充実しています。
変更後に予想される懸念を払拭してくれるのは良いですね。

すでにプッシュされているブランチの名前を変更したい場合や main ブランチへの移行を行いたい場合は、コマンドライン上で変更するよりもこの機能を使った方が色々楽そうです。

## GitHub Enterprise Server 3.0 is here!
https://github.blog/2021-01-15-github-enterprise-server-3-0-is-here/

GitHub Enterprise Server 3.0 の RC (Release Candidate) 版がリリースされました。GHES[^1] 3.0 では Actions や Packages が利用可能となります。

また、GitHub for Mobile で GHES にアクセスできるようにもなるようです（こちらは Beta 版）。ただ、例えば社内ネットワークからじゃないとアクセスできない場所に GHES が置かれている場合はあまり旨味がないかもしれません。

まだ RC 版であるため、正式リリースではないことに注意してください。正式リリースが楽しみですね。

[^1]: GitHub Enterprise Server の略

# know-how
## Minimal safe Bash script template
https://betterdev.blog/minimal-safe-bash-script-template/

Bash スクリプトを書く際のテンプレートを紹介している記事です。
`trap`の設定や`usage`のひな型などが含まれていて、Bash スクリプトを簡単に高機能で安全にすることができます。
それぞれの設定について、何を意味しているのか、なぜ行うのかも解説されているため、知らない関数の勉強にもなります。

個人的に、Bash スクリプトは書くのに苦労する上に保守、改良も面倒なのであまり使いたくないのですが、それでも使わないといけない場面は多々あります[^2]。
たまに Bash スクリプトを書いては書き方を忘れる人だけでなく、よく Bash スクリプトを書く人にもおすすめできそうです。

[^2]: 記事冒頭でも同じようなことが触れられていますね。> Bash scripts. Almost anyone needs to write one sooner or later. Almost no one says “yeah, I love writing them”.

## node_modules/ and Docker volume mount 問題と対策
https://castaneai.hatenablog.com/entry/2019/01/29/151257

`docker build`時に`npm install`し、それを開発するために volume mount を行うとローカルの`node_modules`が空だったためコンテナ内の`node_modules`も空になってしまいアプリが正常に動作しないという問題とその対策方法が載った記事です。

自分はこの問題に遭遇したとがないのですが、確かに VS Code の Remote Container 機能などを使って開発しているとビルド時に`npm install`したくなって同じ問題に遭遇しそうだなと思いました。

実際に、今週の Productivity Weekly 参加者が遭遇して困ったからネタに上げたらしいので、割とよく遭遇する問題なのかもしれません。
その時はこの記事が参考になると思います。

## State of JS 2020
https://2020.stateofjs.com/en-US/
JavaScript関連の技術に関するアンケート結果をまとめたサイトです。

JavaScript の機能の利用率や AltScript の利用度や認知度ランキングなど、さまざまな項目のアンケート結果が紹介されています。
また、各ページには「Recommended Resources」という見出しがあり、関連するおすすめ記事を紹介してくれています。
眺めるだけでも楽しいですし、一番有名なテストフレームワークを使いたい！など思った時も参考になると思います。

また、この文章を書いてる途中で Publickey さんの紹介記事を見つけました。主なアンケート結果を紹介しているので、先にこちらの記事を見る方が良いかもしれません。
https://www.publickey1.jp/blog/21/state_of_javascript_2020reactexpressjest24000.html

余談ですが、もともと今週の Productivity Weekly では [State of CSS 2020](https://2020.stateofcss.com/en-US/) がネタとして紹介されていました。
CSS については僕の知識が乏しいため参加者同士の話に全くついていけてなかったところ、State of JS 2020 について教えてもらいました。（こういうサイトの存在を知らなかった...）
トレンドがわかって面白いですね。

# tool
## Stack Overflow の機械翻訳サイトの除外用フィルタ
https://github.com/arosh/ublacklist-stackoverflow-translation

プログラムを書いている時、エラーメッセージやらライブラリの使い方やらで Google 検索することはしょっちゅうあると思います。
しかし、検索結果に Stack Overflow の内容をそのまんまコピペした、もしくは日本語などに翻訳したサイトが出てくることもしばしばあるのではないでしょうか？
このリポジトリでは、そういった検索結果のノイズ( Stack Overflow の機械翻訳サイト)を排除するためのフィルタが公開されています。

除外自体は検索結果のブラックリストを作成できる拡張機能である [uBlackList](https://github.com/iorate/uBlacklist) を利用しています。
uBlackList はブラックリストを購読する機能が備わっているため、README.md に書かれている URL を購読する設定を一度行うだけで設定は完了です。定期更新してくれるのでブラックリストの更新に追従できます。

検索結果に出てくる Stack Overflow の機械翻訳サイトに困っている方は参考にしてください。

# goods
:::message
今回の Productivity Weekly は開催直前まで上がっているネタの数が少なく、30分持つのか怪しかったので、僕が個人的に欲しいと思った生産性の上がりそうなグッズを時間が余った時用に用意していました[^3]。
なので**この節はおまけ**です。興味のある方はご覧ください。
:::

[^3]: 結局、開催中にネタが増えたり CSS の話で盛り上がったりして時間が大量に余ることはなかったのですが、気になってる方がいたので軽く紹介しました。

## 在宅ワークに最適！プライベートな空間を確保できるプライバシーテントを1月19日発売
https://prtimes.jp/main/html/rd/p/000002878.000011495.html
在宅ワークなどで周りを気にせず集中して仕事できるテントです。研究室やオフィスでの利用もできそうです。
ただ、もちろん防音はできないので、リモート会議等をする場合は自分の声が漏れても問題ない場所で利用する必要があります。

価格は7,255円（税抜）と比較的安く、畳んで収納、持ち運びが可能なので、個人的には買いやすい、欲しいと思いました。

## 急速充電可能！2つのUSBポートを搭載した埋込USB給電用コンセントを発売
https://prtimes.jp/main/html/rd/p/000002869.000011495.html
コンセントやスイッチのあるボックスに USB 給電ポートを設置できるアイテムです。

壁にコンセントやスイッチがついたパネルがあると思いますが、このパネル、実は外すとたいてい 3 個分のスイッチ等が入る [埋込取付枠](https://www.monotaro.com/p/4105/9252/)という金具が壁に固定されており、最大3個のコンセントやスイッチなどを設置できます。

この USB コンセントは 2 ポートあるので埋込取付枠に 2 個以上の空きが必要ですが、[1 ポートの製品](https://www.sanwa.co.jp/product/syohin.asp?code=TAP-KJUSB1BK)も販売されており、こちらは 1 個以上の空きがあれば設置可能です。また、[USB Type-C のポート](https://www.sanwa.co.jp/product/syohin.asp?code=TAP-KJUSB1C1W)がついた製品もあります。

充電しやすい場所なのに、スイッチ一つのみもったいない...という埋込取付枠があれば、そこに設置してみると便利かもしれません。

ただ注意点として、**設置には[電気工事士免許](https://www.shiken.or.jp/)が必要**となります[^4]。

[^4]: ちなみに、僕は第二種電気工事士免許(一般住宅や店舗などの600ボルト以下で受電する設備の工事が可能)を持っているため、設置できます。

# あとがき
今週はもともとネタが少なかったため、おまけを入れさせていただきました。
個人的に一番生産性を上げられそうなのは Minimal safe Bash script template でした。Bash スクリプトを書くときに重宝しそうです。

生産性向上チームでは毎週こういったネタを共有する会を行っています。そんな生産性向上チームが気になる方は下のリンクをクリック！
https://blog.cybozu.io/entry/2020/08/31/080000