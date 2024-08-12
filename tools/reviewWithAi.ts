// deno run --allow-env --allow-write=./rdjson.json --allow-read=./articles --allow-net=api.openai.com ./tools/reviewWithAi.ts ./articles/productivity-weekly-20230726.md

import { OpenAI } from "./deps.ts";
import { AiReviewer } from "./libs/AiReviewer.ts";
import { extractContents } from "./libs/lib.ts";

const main = async () => {
  if (Deno.args[0] === undefined) {
    throw new Error("第一引数にマークダウンのパスを指定してください");
  }
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (apiKey === undefined) {
    throw new Error("環境変数 OPENAI_API_KEY が設定されていません");
  }

  const openai = new OpenAI({ apiKey });
  const aiReviewer = new AiReviewer(openai, {
    max_tokens: 4096,
    reviewNum: 20,
  });
  const markdown = await Deno.readTextFile(Deno.args[0]);

  const reviewResult = await aiReviewer.review(extractContents(markdown));

  const rdjson = aiReviewer.convertReviewDogJson(
    markdown,
    Deno.args[0],
    reviewResult,
  );

  await Deno.writeTextFile("rdjson.json", rdjson);
};

// import された際は main() を実行しない
if (import.meta.main) {
  await main();
}
