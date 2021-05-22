#!/usr/bin/env bash

set -euxo pipefail

source_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# ProductivityWeekly何回目かを計算する
export PW_COUNT=$(($(cat ./articles/template/productivity-weekly-count.txt) + 1))

export PW_YEAR=$1
export PW_MONTH=$2
export PW_DAY=$3

# テンプレから本文を出力する
gomplate -f ./articles/template/productivity-weekly-template.md.tmpl > ./articles/productivity-weekly-$1$2$3.md

# カウントを更新する
echo $PW_COUNT > ./articles/template/productivity-weekly-count.txt

# ブランチ生成
git switch -c "pw-20$1$2$3"
