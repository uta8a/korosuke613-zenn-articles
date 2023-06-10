---
title: "VSCode の Jest 拡張機能が asdf で管理している Node.js を呼び出せない問題"
emoji: "🆚"
type: "tech"
topics: ["vscode", "jest", "asdf"]
published: false
---


VSCode の Jest 拡張機能（vscode-jest）がたまに asdf で管理している Node.js を呼び出せない問題に遭遇しました。
今回は、その原因と対策についてちょっと深掘りしたので、ここに残します。

:::message
今回は次の環境の場合の話です。

- macOS 13.4 (Apple M1 Pro)
- VSCode 1.79.0
- vscode-jest 5.2.3
- Bash 3.2.57(1)-release
- Zsh 5.9
:::

## TL;DR

- VSCode の Jest 拡張機能は非インタラクティブ(non-interactive)＆非ログイン(non-login)な `/bin/sh` シェルから Node.js を呼び出す
- asdf は多くの場合 `~/.bashrc` や `~/.zshrc` に asdf の初期化コード(パスを通したり)を記述しているため、asdf で管理している Node.js を Jest 拡張機能は呼び出せない
- いくつかの対策方法があるが、`.vscode/settings.json` の `jest.shell` で Jest 実行のシェルをログインシェルにするのがたぶん楽。たぶん
  ```json:.vscode/settings.json
  "jest.shell": {
    "path": "/usr/bin/env",
    "args": ["zsh", "--login"]
  },
  ```

## VSCode の Jest 拡張機能 vscode-jest について

VSCode には Jest[^jest]のテストを実行するための便利な拡張機能があります。

https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest

名を vscode-jest と言い、VSCode 上から Jest のテストを実行したり、テストの実行結果を見たりできます。

[^jest]: JavaScript のテスティングフレームワーク。https://jestjs.io

## 何があったか

ある日、VSCode で Node.js を使うプロジェクトを開いたところ、vscode-jest がエラーを吐きました。

![](/images/vscode-jest-extension-with-asdf/node_no_such_file_or_directory.png)


> **\> Test run exited at 2023/6/7 18:31:05 <**
>
> env: node: No such file or directory
>
> **[error] failed to retrieve test file list. TestExplorer might show incomplete test items**
>
> [info] jest process failed to start, most likely due to env or project configuration issues, please see: https://github.com/jest-community/vscode-jest/blob/master/README.md#jest-failed-to-run
>
> env: node: No such file or directory
>
> **[error] Jest process "watch-tests" ended unexpectedly**
>
> [info] jest process failed to start, most likely due to env or project configuration issues, please see: https://github.com/jest-community/vscode-jest/blob/master/README.md#jest-failed-to-run

テストファイルの一覧が取得できないエラーと、ファイルを監視して自動でテストを動かす `watch-tests` が失敗したというエラーの 2 つが出ていますが、どちらのエラーでも `env: node: No such file or directory` が出ており、おそらく原因は同じと考えられます。

不思議だったのが、これまでは特段設定をしなくても Jest の拡張機能でテスト実行ができていたことです。
最初は何がいつもと違うのかわかりませんでした。

## 起こる条件

何回か色々試したところ、上記のエラーが出るのは `code` コマンドを**使ってない**時でした。

:::message
VSCode に付属する `code` コマンドを利用することで、ターミナルから任意のディレクトリやファイルを VSCode で開くことができます（[参考](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)）

例えば、`code .` とすると、カレントディレクトリを VSCode で開くことができます。

:::

`code` コマンドを使わずに VSCode を起動するとは、例えば Dock の VSCode を右クリックして出てくる最近開いたディレクトリ一覧から開いたり、メニューバーの最近開いたディレクトリ一覧から開いたりすることを指しています。

![](/images/vscode-jest-extension-with-asdf/open_vscode_from_dock.png =350x)
*Dock から開く場合*

![](/images/vscode-jest-extension-with-asdf/open_vscode_from_menu_bar.png =600x)
*メニューバーから開く場合*

実際、僕は Dock から VSCode を開くことがしばしばあり、その時にエラーが出ることがわかりました。

## 原因

色々ググったりして調べていたところ、個人の有志が書いた次のページが見つかりました。

https://scrapbox.io/pnly/RESOLVED%3A_vscode-jest_%60env:_node:_No_such_file_or_directory%60

このページに書いてあることと、vscode-jest の Issue コメントが全てなのですが、噛み砕いて行きます。

https://github.com/jest-community/vscode-jest/issues/741#issuecomment-921222851

### vscode-jest は `~/.bashrc` などを読まない

どうやら、vscode-jest は Jest を呼び出す際に、非インタラクティブ(non-interactive)＆非ログイン(non-login)な `/bin/sh` シェルから Node.js、ひいては Jest を呼び出しているようです。

:::message
`/bin/sh` という名前を見て、かつ、実行時に `sh-3.2$` と表示されることから、最初は Bourne Shell を実行してるのかなと思ったのですが、macOS の場合は Bash が `/bin/sh` として使われていました。

```text:/bin/sh は何者か
❯ /bin/sh --version
GNU bash, version 3.2.57(1)-release (arm64-apple-darwin22)
Copyright (C) 2007 Free Software Foundation, Inc.
```

どうやら Bourne Shell はとっくに非推奨となっており、Bash は `sh` として呼び出されると Bourne Shell 互換で動くモードになるようですね。知りませんでした。

- 参考: [bashがsh互換(posix)モードで動く時 – Siguniang's Blog](https://siguniang.wordpress.com/2014/06/29/bash-posix-mode/)
:::

:::message
**non-interactive** とは、ユーザとの対話を行わないモードのことです。
Bash の場合は `/bin/sh -c 'echo hoge'` のように、`-c` をつけることで対話せずにコマンド実行できますね。

**non-login** とは、ログインシェルとして起動しないモードのことです。
ログインシェルとして起動すると `/etc/profile` や `~/.bash_profile` などを読み込んでユーザ定義の環境変数などを設定できるのですが、non-login の場合はこれらを読み込みまないため、`~/.bashrc` などで `export` してるような環境変数は読み込まれません。

- 参考: [ログインシェルとは？非ログインシェルとの違いも併せてご紹介 – Rainbow Engine](https://rainbow-engine.com/loginshell-nonloginshell-difference/)
:::

したがって、vscode-jest は `~/.bashrc` のようなファイルで `export` した環境変数を読んでくれないわけですね。

### non-login な　`/bin/sh` はどこへのパスが通っている？

そもそも non-login な `/bin/sh` はどこへのパスが通っているのでしょうか？

まずは `env -i /bin/sh -c 'env'` で環境変数を確認してみます。

```console:非インタラクティブ＆非ログインなシェルの環境変数一覧
❯ env -i /bin/sh -c 'env'
PWD=<実行ディレクトリのパス>
SHLVL=1
_=/usr/bin/env
```

おっと、`$PATH` がないですね。`$PATH` は定義されているのでしょうか？

`env -i /bin/sh -c 'echo $PATH'` で確認できます。

```console:非インタラクティブ＆非ログインなシェルの $PATH
❯ env -i /bin/sh -c 'echo $PATH'
/usr/gnu/bin:/usr/local/bin:/bin:/usr/bin:.
```

`env` で `PATH` が定義されてなかったのに、`$PATH` の中身が表示されました。
これは、`PATH` がデフォルトのシェル変数として登録されてるからですね[^path_variable]。

`man bash` に載っています。

```text:man bash からの抜粋
PATH   The search path for commands.  It is a colon-separated list of directories in which the shell looks for commands (see COMMAND EXECUTION below).  A zero-length (null) directory name in the value
      of PATH indicates the current directory.  A null directory name may appear as two adjacent colons, or as an initial or trailing colon.  The default path is system-dependent, and is set by the
      administrator who installs bash.  A common value is ``/usr/gnu/bin:/usr/local/bin:/usr/ucb:/bin:/usr/bin''.
```

> The default path is system-dependent, and is set by the administrator who installs bash.  A common value is ``/usr/gnu/bin:/usr/local/bin:/usr/ucb:/bin:/usr/bin''.
> 
> 日本語訳）デフォルトのパスはシステムに依存し、bashをインストールした管理者が設定します。 一般的な値は ``/usr/gnu/bin:/usr/local/bin:/usr/ucb:/bin:/usr/bin'' です。

どうやらシステム依存（インストールした人が決める）らしいです。
macOS (darwin？) の場合はそれらの開発者が設定してるのかもしれません。

少なくとも僕の環境の `/bin/sh` では、次の場所が指定されていました。

- `/usr/gnu/bin`
- `/usr/local/bin`
- `/bin`
- `/usr/bin`
- `.`

したがって、これらの場所に Node.js のバイナリ(`node`)がないといけないわけですね。

[^path_variable]: ここら辺の挙動はシェルによって変わると思います。

### 自分の環境では non-login な `/bin/sh` において Node.js へのパスが通ってなかった
例えば、Node.js を Homebrew でインストールする際は、最終的に `/opt/homebrew/bin/` に配置されます。
通常 `/opt/homebrew` はパスが通ってない（`$PATH` に含まれていない）ので、`/opt/homebrew/bin/brew shellenv` を `~/.bashrc` などで実行するようにして、`/opt/homebrew/bin/` へのパスを通す必要があります[^brew_path]。

[^brew_path]: Homebrew インストール後にやっといてねって出てくる。https://github.com/Homebrew/install/blob/716a1d024f32890ef75ea82c18a769abc24e9475/install.sh#L1010-L1025


:::message
ちなみに、Node.js を公式のインストーラー (pkg) でインストールすると、最終的に `/usr/local/bin` へ配置されることとなっています。

```html:Node.js の macOS インストーラーの welcome.html.tmpl
      <li>Node.js {nodeversion} to <code>/usr/local/bin/node</code></li>
```
https://github.com/nodejs/node/blob/da1c9e3ecb22f93a8a6db2cd73261da0ebcaeee1/tools/macos-installer/productbuild/Resources/en.lproj/welcome.html.tmpl#L14
（実際に配置してる部分のコードはすぐ見つけられなかった）
:::


そして僕の場合、Node.js を [asdf](https://asdf-vm.com/)[^asdf] で管理しています。

[^asdf]: ざっくり言うとバイナリのバージョン管理ツールです。ディレクトリごとに異なるバージョンのバイナリを使えます。

```
❯ where node
/Users/<ユーザ名>/.asdf/shims/node
/opt/homebrew/bin/node  # 注釈：Homebrew でも Node.js が入っていた
```

asdf で管理するバイナリは `~/.asdf/shims` に配置されるため、Homebrew と同じく、パスを通す必要があります。
パスは `~/.zshrc` 経由で設定するようにしているため、`/bin/sh` ではパスが通っていない状態になっていました（`.zshrc` で設定しているため、login、non-login 関わらずパスが通らない）。

これが原因だったんですね。

:::message
ではなぜ `code` コマンドで起動する際はパスが通ってたのかというと、`code` コマンドを実行する普段使いのシェルで設定してある環境変数が `code` コマンドで生成する VSCode（子プロセス）に引き継がれるためですね[^environment_variables]。

[^environment_variables]: 環境変数が引き継がれる仕組みはおそらく周知の事実だと思いますが、そこらへんの仕様が載ったページを貼りたくて探しました。しかし見つけられなかったので、誰か知ってる人いたら教えてください。
:::

## 解決方法

どのように解決するかについても、上記で紹介した方のページに書かれていました。

https://scrapbox.io/pnly/RESOLVED%3A_vscode-jest_%60env:_node:_No_such_file_or_directory%60

この著者の場合、`jest.shell` に普段利用するシェル(Zsh)を設定し、`.zshenv` でパスを通すことで回避しています。

vscode-jest には `jest.shell` という設定項目があり、そこで Jest の呼び出しに使うシェルを設定できます（何も設定しなければ `/bin/sh`）。

また、Zsh の場合、どの場合（(non-)login、(non-)interactive）でも `~/.zshenv` ファイルを読み込むため[^man_zshenv]、`~/.zshenv` でパスを通すことで、Zsh から Jest を呼び出す際に Node.js へのパスが通るようになります。

[^man_zshenv]: 詳しくは `man zsh` の `STARTUP/SHUTDOWN FILES` を参照してください。https://linux.die.net/man/1/zsh#STARTUP/SHUTDOWN%20FILES

しかし、`~/.zshenv` に手を加えると、Zsh のシェルスクリプト実行時なども影響を受けてしまうため、なるべく書き換えたくないというのがあります。

それを回避する方法として、上記ページには Jest の実行に使うシェルをカスタマイズできる変更が入りそうとのことも書かれていました。当時は未リリースだったようですが、すでにリリースされてそうだったので、今回は `--login` でログインシェルとして Jest を実行するようにしてみました。

## 実際の設定

```json:.vscode/settings.json
"jest.shell": {
  "path": "/usr/bin/env",
  "args": ["zsh", "--login"]
},
```

というわけで、実際の設定が上記のものになります。
僕の場合、Zsh を env 経由で呼び出し、`--login` オプションで Zsh をログインシェルとして起動するようにしています。

ログインシェルとして起動することにより、`~/.zprofile`、`~/.zlogin` が読まれるようになります。
そちらで Node.js へのパスを通すようにすることで、`~/.zshenv` に手を加えずに済みます。

この設定を対象リポジトリの `.vscode/settings.json` に書き加えることで、冒頭の問題は解決できました。

ただ、場合によっては `/bin/sh` を起動するときよりも時間がかかるようになるかもしれません。
僕の場合は特に速度面で気になることはありませんでした。

## おわりに

今回 VSCode の Jest 拡張の謎の挙動から始まり、ワークアラウンドはすぐに見つかったのですが、なんでそういう挙動になるのかが気になって色々調べました。

とりあえず再発しないようになって良かったです。
シェルのモードの違いとか読み込むファイルの順序とか、なかなか勉強になって良かったですね。

なんか間違ったことを書いてしまっていたり、もっと良い解決方法があったりしたらぜひ教えてください。
