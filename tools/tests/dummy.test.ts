import { assertEquals } from "../deps_dev.ts";
import * as checkDuplicateEmoji from "../checkDuplicateEmoji.ts";
import * as createToc from "../createToc.ts";

Deno.test("dummy", () => {
  // ダミーのテスト。これでチェックする項目はない
  // テスト対象ではないスクリプトのカバレッジを含めるために行う
  checkDuplicateEmoji;
  createToc;
  assertEquals(true, true);
});
