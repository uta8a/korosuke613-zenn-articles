import { OpenAI } from "../deps.ts";
import { assertEquals, assertRejects } from "../deps_dev.ts";
import { AiReviewer, type ReviewResult } from "../libs/AiReviewer.ts";
import { DiagnosticResult } from "../libs/ReviewDogJsonLine.ts";

Deno.test("AiReviewer should throw an error if there is no response from OpenAI", () => {
  const openaiMock = {
    chat: {
      completions: {
        create: () => {
          return {
            choices: [
              {
                message: {
                  content: null,
                },
              },
            ],
          };
        },
      },
    },
  };

  const aiReviewer = new AiReviewer(openaiMock as unknown as OpenAI, {
    logging: false,
  });
  const markdown = "Sample markdown";

  assertRejects(async () => {
    await aiReviewer.review(markdown);
  });
});

Deno.test("AiReviewer should validate and return the review result", async () => {
  const openaiMock = {
    chat: {
      completions: {
        create: () => {
          return {
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    review: [
                      {
                        error_line: "Original line",
                        revised_line: "Revised line",
                        reason: "Reason",
                      },
                      {
                        error_line: "Original line 2",
                        revised_line: "Revised line 2",
                        reason: "Reason 2",
                      },
                    ],
                  }),
                },
              },
            ],
          };
        },
      },
    },
  };

  const aiReviewer = new AiReviewer(openaiMock as unknown as OpenAI, {
    logging: false,
  });
  const markdown = "Sample markdown";
  const expected: ReviewResult = {
    review: [
      {
        error_line: "Original line",
        revised_line: "Revised line",
        reason: "Reason",
      },
      {
        error_line: "Original line 2",
        revised_line: "Revised line 2",
        reason: "Reason 2",
      },
    ],
  };
  const result = await aiReviewer.review(markdown);

  assertEquals(result, expected);
});

Deno.test("AiReviewer should exclude same suggest", async () => {
  const openaiMock = {
    chat: {
      completions: {
        create: () => {
          return {
            choices: [
              {
                message: {
                  content: JSON.stringify({
                    review: [
                      {
                        error_line: "Original line 2",
                        revised_line: "Original line 2",
                        reason: "Reason 2",
                      },
                    ],
                  }),
                },
              },
            ],
          };
        },
      },
    },
  };

  const aiReviewer = new AiReviewer(openaiMock as unknown as OpenAI, {
    logging: false,
  });
  const markdown = "Sample markdown";
  const expected: ReviewResult = {
    review: [],
  };
  const result = await aiReviewer.review(markdown);

  assertEquals(result, expected);
});

Deno.test("AiReviewer should replace error lines in the markdown", () => {
  const markdown = `
    Line 1
    Line 2
    Line 3
    Line 4
  `;

  const reviewResult: ReviewResult = {
    review: [
      {
        error_line: "Line 2",
        revised_line: "Corrected Line 2",
        reason: "Reason",
      },
      {
        error_line: "Line 4",
        revised_line: "hogehoge 4",
        reason: "Reason",
      },
    ],
  };

  const expected = `
    Line 1
    Corrected Line 2
    Line 3
    hogehoge 4
  `;

  const replacedMarkdown = AiReviewer.reviewApply(markdown, reviewResult);

  assertEquals(replacedMarkdown, expected);
});

Deno.test("convertReviewDogJson", async (t) => {
  const PATH = "/path/to/file.ts";

  await t.step("正常系", () => {
    const markdown = `Line 1
Line 2
Line 3
Line 4
`;

    const reviewResult: ReviewResult = {
      review: [
        {
          error_line: "Line 2",
          revised_line: "Corrected Line 2",
          reason: "Reason 2",
        },
        {
          error_line: "Line 4",
          revised_line: "hogehoge 4",
          reason: "Reason 4",
        },
      ],
    };

    const expected: DiagnosticResult = {
      diagnostics: [
        {
          message:
            "Reason 2\n※AI による自動修正提案です。修正を受け入れるかどうかはご自身で判断ください。",
          location: {
            path: PATH,
            range: {
              start: { line: 2 },
              end: { line: 2 },
            },
          },
          suggestions: [
            {
              range: {
                start: { line: 2 },
                end: { line: 2 },
              },
              text: "Corrected Line 2",
            },
          ],
        },
        {
          message:
            "Reason 4\n※AI による自動修正提案です。修正を受け入れるかどうかはご自身で判断ください。",
          location: {
            path: PATH,
            range: {
              start: { line: 4 },
              end: { line: 4 },
            },
          },
          suggestions: [
            {
              range: {
                start: { line: 4 },
                end: { line: 4 },
              },
              text: "hogehoge 4",
            },
          ],
        },
      ],
    };

    const aiReviewer = new AiReviewer({} as unknown as OpenAI, {
      logging: false,
    });
    const result = aiReviewer.convertReviewDogJson(
      markdown,
      PATH,
      reviewResult,
    );

    assertEquals(JSON.parse(result), expected);
  });

  await t.step(
    "同じ行の複数の文章のうち、1つだけ修正される場合、その他の文章は修正されない",
    () => {
      const markdown = `Line 1
Line 2. Line 3
Line 4
  `;

      const reviewResult: ReviewResult = {
        review: [
          {
            error_line: "Line 2.",
            revised_line: "Corrected Line 2.",
            reason: "Reason 2",
          },
        ],
      };

      const expected: DiagnosticResult = {
        diagnostics: [
          {
            message:
              "Reason 2\n※AI による自動修正提案です。修正を受け入れるかどうかはご自身で判断ください。",
            location: {
              path: PATH,
              range: {
                start: { line: 2 },
                end: { line: 2 },
              },
            },
            suggestions: [
              {
                range: {
                  start: { line: 2 },
                  end: { line: 2 },
                },
                text: "Corrected Line 2. Line 3",
              },
            ],
          },
        ],
      };

      const aiReviewer = new AiReviewer({} as unknown as OpenAI, {
        logging: false,
      });
      const result = aiReviewer.convertReviewDogJson(
        markdown,
        PATH,
        reviewResult,
      );

      assertEquals(JSON.parse(result), expected);
    },
  );
});
