// DENO_NO_PACKAGE_JSON=1 deno run --allow-env --allow-write='./tools/dist,<TMP>' --allow-read=./articles --allow-net=api.openai.com ./tools/reviewDiffWithAi.ts ./articles/productivity-weekly-20210106.md ./articles/productivity-weekly-20210106.diff

import { AiReviewer } from "./libs/AiReviewer.ts";
import { join, OpenAI } from "./deps.ts";

const __dirname = new URL(".", import.meta.url).pathname;

const main = async () => {
  if (Deno.args[0] === undefined) {
    throw new Error(
      "第一引数に対象のマークダウンファイルのパスを指定してください",
    );
  }
  const markdownFilePath = Deno.args[0];

  if (Deno.args[1] === undefined) {
    throw new Error(
      "第二引数に対象のマークダウンファイルのdiffファイルへのパスを指定してください",
    );
  }
  const diffMarkdownFilePath = Deno.args[1];

  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (apiKey === undefined) {
    throw new Error("環境変数 OPENAI_API_KEY が設定されていません");
  }

  const openai = new OpenAI({ apiKey });
  const aiReviewer = new AiReviewer(openai, {
    logFilePath: join(__dirname, "dist", "ai-review.log"),
  });

  const markdown = await Deno.readTextFile(markdownFilePath);
  const diffMarkdown = await Deno.readTextFile(diffMarkdownFilePath);

  const reviewResult = await aiReviewer.review(
    aiReviewer.normalizeDiff(diffMarkdown),
  );
  if (aiReviewer.lastUsage) {
    await Deno.writeTextFile(
      join(__dirname, "dist", "ai-usage.json"),
      JSON.stringify(aiReviewer.lastUsage, null, 2),
    );
  }

  const rdjson = aiReviewer.convertReviewDogJson(
    markdown,
    markdownFilePath,
    reviewResult,
  );

  await Deno.writeTextFile(join(__dirname, "dist", "rdjson.json"), rdjson);
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
