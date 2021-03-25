#!/usr/bin/env bash

set -euxo pipefail

source_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# ProductivityWeekly何回目かを計算する
next_count=$(($(cat articles/template/productivity-weekly-count.txt) + 1))

# テンプレから本文を出力する
gotemplate --var count=$next_count --var year=$1 --var month="$2" --var day=$3 -P $source_dir/productivity-weekly-template.md.tmpl > "$source_dir/../productivity-weekly-20$1$2$3.md"

# カウントを更新する
echo $next_count > $source_dir/productivity-weekly-count.txt

# ブランチ生成
git switch -c "pw-20$1$2$3"
