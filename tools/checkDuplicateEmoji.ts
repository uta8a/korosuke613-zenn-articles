// deno run --allow-read --allow-run=git,grep ./tools/checkDuplicateEmoji.ts

import matter from "npm:gray-matter";

const getGitDiffFiles = async () => {
  const cmd = new Deno.Command("git", {
    args: ["diff", "--name-only", "main"],
    stdout: "piped",
    stderr: "piped",
  });

  const { code, stdout, stderr } = await cmd.output();
  if (code !== 0) {
    const errorString = new TextDecoder().decode(stderr);
    throw new Error(`git: ${code}, ${errorString}`);
  }

  const outputString = new TextDecoder().decode(stdout);
  const gitDiffFiles = outputString.split("\n").filter((f) => f !== "");
  return gitDiffFiles;
};

const grepEmoji = async (emoji: string) => {
  const cmd = new Deno.Command("grep", {
    args: ["-r", "-n", "-w", "./articles", "-e", emoji],
  });
  const { code, stdout, stderr } = await cmd.output();

  switch (code) {
    case 0:
      break;
    case 1:
      throw new Error(`grep: no matches found: ${emoji}`);
    default: {
      const errorString = new TextDecoder().decode(stderr);
      throw new Error(`grep: ${code}, ${errorString}`);
    }
  }

  const outputString = new TextDecoder().decode(stdout);
  const files = outputString.split("\n").filter((f) => f !== "");
  return files;
};

const gitDiffFiles = await getGitDiffFiles();
const articles = gitDiffFiles.filter((a) =>
  a.endsWith(".md") && a.includes("productivity-weekly")
);

if (articles.length === 0) {
  console.log(`Skip, there are no target files.`);
  Deno.exit(0);
}

// 複数の記事を同時に書かない前提
const text = await Deno.readTextFile(articles[0]);
const content = matter(text);
const emoji = content.data.emoji as string;

if (emoji === "") {
  throw new Error(`Emoji is empty.`);
}

const emojiFiles = await grepEmoji(emoji);

if (emojiFiles.length > 1) {
  throw new Error(`Find duplicate emoji files, \n${emojiFiles}`);
}

console.log(`Ok, duplicate emoji files is nothing.`);
