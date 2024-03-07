import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { getGitDiffWeeklyFiles } from "../libs/lib.ts";
import { grepWeeklyEmoji } from "../libs/lib.ts";

Deno.test("getGitDiffWeeklyFiles should return an array of weekly files", async () => {
  // deno-lint-ignore require-await
  const gitExecutor = async () =>
    "productivity-weekly-20230730.md\nfile1.md\nproductivity-weekly-20230723.md\nfile2.md\n";

  const expected = [
    "productivity-weekly-20230730.md",
    "productivity-weekly-20230723.md",
  ];
  const actual = await getGitDiffWeeklyFiles(gitExecutor);

  assertEquals(actual, expected);
});

Deno.test("grepWeeklyEmoji should return an array of productivity weekly files containing the given emoji", async () => {
  // deno-lint-ignore require-await
  const grepExecutor = async (emoji: string) => {
    if (emoji === "🚀") {
      return "articles/productivity-weekly-20230202.md\narticles/file2.md\n";
    }
    if (emoji === "🌟") {
      return "articles/productivity-weekly-20230402.md\narticles/file3.md\n";
    }
    throw new Error(`Unexpected emoji: ${emoji}`);
  };

  const expected = [
    "articles/productivity-weekly-20230202.md",
  ];
  const actual = await grepWeeklyEmoji("🚀", grepExecutor);

  assertEquals(actual, expected);
});
