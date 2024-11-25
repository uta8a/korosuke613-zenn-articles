// deno run --allow-read --allow-run=git,grep ./tools/checkDuplicateEmoji.ts
import { log, matter } from "./deps.ts";
import { getGitDiffWeeklyFiles, grepWeeklyEmoji } from "./libs/lib.ts";

const main = async () => {
  const articles = await getGitDiffWeeklyFiles();
  log.debug(articles);

  if (articles.length === 0) {
    console.info("Skip, there are no target files.");
    Deno.exit(0);
  }

  // 複数の記事を同時に書かない前提
  const text = await Deno.readTextFile(articles[0]);
  const content = matter(text);
  const emoji = content.data.emoji as string;

  log.debug(emoji);

  if (emoji === "") {
    throw new Error("Emoji is empty.");
  }

  const emojiFiles = await grepWeeklyEmoji(emoji);
  log.debug(emojiFiles);

  if (emojiFiles.length > 1) {
    throw new Error(`Find duplicate emoji files, \n${emojiFiles}`);
  }

  log.info("Ok, duplicate emoji files is nothing.");
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
