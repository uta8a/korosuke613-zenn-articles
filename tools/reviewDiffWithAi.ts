// deno run --allow-env --allow-run=git --allow-write='./tools/dist,<TMP>' --allow-read=./articles --allow-net=api.openai.com ./tools/reviewDiffWithAi.ts 6e56188787a518f803a1bfadea5c82661ee9bfa7 6db7b3273333cae16fb7c5c1e14246e30327354c

import OpenAI from "https://deno.land/x/openai@v4.47.1/mod.ts";
import { AiReviewer } from "./libs/AiReviewer.ts";
import { extractContents } from "./libs/lib.ts";
import { Git } from "./libs/Git.ts";
import { join } from "https://deno.land/std@0.224.0/path/join.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const main = async () => {
  if (Deno.args[0] === undefined) {
    throw new Error("第一引数に git の baseRef を指定してください");
  }
  if (Deno.args[1] === undefined) {
    throw new Error("第二引数に git の targetRef を指定してください");
  }
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (apiKey === undefined) {
    throw new Error("環境変数 OPENAI_API_KEY が設定されていません");
  }

  const openai = new OpenAI({ apiKey });
  const aiReviewer = new AiReviewer(openai, {
    logFilePath: join(__dirname, "dist", "ai-review.log"),
  });

  const git = new Git();
  const diffMarkdownFilePath = await git.getDiffNameOnly(
    Deno.args[0],
    Deno.args[1],
  );
  const diffMarkdown = await git.getDiff(
    diffMarkdownFilePath,
    Deno.args[0],
    Deno.args[1],
  );
  const markdown = await Deno.readTextFile(diffMarkdownFilePath);

  const reviewResult = await aiReviewer.review(extractContents(diffMarkdown));
  if (aiReviewer.lastUsage) {
    await Deno.writeTextFile(
      join(__dirname, "dist", "ai-usage.json"),
      JSON.stringify(aiReviewer.lastUsage, null, 2),
    );
  }

  const rdjson = aiReviewer.convertReviewDogJson(
    markdown,
    diffMarkdownFilePath,
    reviewResult,
  );

  await Deno.writeTextFile(join(__dirname, "dist", "rdjson.json"), rdjson);
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
