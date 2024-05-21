import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Git } from "../libs/Git.ts";
import { join } from "https://deno.land/std/path/mod.ts";

const __dirname = new URL(".", import.meta.url).pathname;

Deno.test("getDiff", async (t) => {
  const git = new Git();

  await t.step("should return the diff of added lines", async () => {
    const filePath = "path/to/file.txt";
    const baseRef = "main";
    const targetRef = "hoge";

    const diffExecutor = async (
      _filePath: string,
      _baseRef: string,
      _targetRef: string,
    ): Promise<string> => {
      const testData = await Deno.readTextFile(
        join(__dirname, "data/git_test_input.diff"),
      );
      return testData;
    };

    const expectedDiff = await Deno.readTextFile(
      join(__dirname, "data/git_test_expected.txt"),
    );

    const actualDiff = await git.getDiff(
      filePath,
      baseRef,
      targetRef,
      diffExecutor,
    );
    assertEquals(actualDiff, expectedDiff);
  });
});

Deno.test("getDiffNameOnly", async (t) => {
  const git = new Git();

  await t.step("should return the name of the changed file", async () => {
    const baseRef = "main";
    const targetRef = "hoge";

    const diffNameOnlyExecutor = (
      _baseRef: string,
      _targetRef: string,
    ): Promise<string> => {
      const testData = "path/to/productivity-weekly.md\n";
      return new Promise((resolve) => resolve(testData));
    };

    const expectedDiffNameOnly = "path/to/productivity-weekly.md";

    const actualDiffNameOnly = await git.getDiffNameOnly(
      baseRef,
      targetRef,
      diffNameOnlyExecutor,
    );
    assertEquals(actualDiffNameOnly, expectedDiffNameOnly);
  });
});
