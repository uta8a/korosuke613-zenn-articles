#!/usr/bin/env bash

set -euxo pipefail

# ProductivityWeekly何回目かを計算する
export PW_COUNT=$(($(cat ./articles/template/productivity-weekly-count.txt) + 1))

export PW_YEAR=$1
export PW_MONTH=$2
export PW_DAY=$3
export PW_PREV_YEAR=${4:-}
export PW_PREV_MONTH=${5:-}
export PW_PREV_DAY=${6:-}

# ブランチ生成
git checkout -b "pw-${PW_YEAR}${PW_MONTH}${PW_DAY}"

# テンプレから本文を出力する
gomplate -f ./articles/template/productivity-weekly-template.md.tmpl > ./articles/productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}.md

# カウントを更新する
echo $PW_COUNT > ./articles/template/productivity-weekly-count.txt

mkdir -p ./images/productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}

git add ./articles/template/productivity-weekly-count.txt ./articles/productivity-weekly-${PW_YEAR}${PW_MONTH}${PW_DAY}.md
git commit -m "feat: Productivity Weekly(${PW_YEAR}/${PW_MONTH}/${PW_DAY})"

# Renovate による npm パッケージの更新をローカルの node_modules に反映するため
npm install

# 忘れないうちにプルリクを作成
gh pr create 
