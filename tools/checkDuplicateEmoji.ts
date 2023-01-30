// deno run --allow-read --allow-run=git,grep ./tools/checkDuplicateEmoji.ts

import * as matter  from "npm:gray-matter"

const getGitDiffFiles = async () => {
  const cmd = Deno.run({
    cmd: ["git", "diff", "--name-only", "main"],
    stdout: "piped",
    stderr: "piped"
  })
  
  const { code } = await cmd.status();
  if (code !== 0) {
    const rawError = await cmd.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    throw new Error(errorString)
  }
  
  const outputString = new TextDecoder().decode(await cmd.output());
  const gitDiffFiles = outputString.split("\n").filter((f)=> f !== "")
  return gitDiffFiles
}

const grepEmoji = async (emoji: string) => {
  const cmd = Deno.run({
    cmd: ["grep", "-r", "-n", "-w", './articles', "-e", emoji],
    stdout: "piped",
    stderr: "piped"
  })
  
  const { code } = await cmd.status();
  if (code !== 0) {
    const rawError = await cmd.stderrOutput();
    const errorString = new TextDecoder().decode(rawError);
    throw new Error(errorString)
  }
  
  const outputString = new TextDecoder().decode(await cmd.output());
  const files = outputString.split("\n").filter((f)=> f !== "")
  return files  
}

const gitDiffFiles = await getGitDiffFiles()
const articles = gitDiffFiles.filter((a) =>
  a.endsWith(".md") && a.includes("productivity-weekly")
);

if(articles.length === 0){
  console.log(`Skip, there are no target files.`)
  Deno.exit(0);
}

// 複数の記事を同時に書かない前提
const text = await Deno.readTextFile(articles[0]);
const content = matter.default(text)
const emoji = content.data.emoji as string

const emojiFiles = await grepEmoji(emoji)

if(emojiFiles.length > 1){
  throw new Error(`Find duplicate emoji files, \n${emojiFiles}`)
}

console.log(`Ok, duplicate emoji files is nothing.`)
