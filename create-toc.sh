#!/usr/bin/env bash

# deno が package.json にあるパッケージを deno.lock で管理しようとするのを防ぐ
# ref: https://github.com/denoland/deno/issues/17916
export DENO_NO_PACKAGE_JSON=1

deno run --allow-read ./tools/createToc.ts $1

