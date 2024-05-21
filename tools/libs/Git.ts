export class Git {
  async diffExecutor(
    filePath: string,
    baseRef: string,
    targetRef: string,
  ): Promise<string> {
    const cmd = new Deno.Command("git", {
      args: [
        "--no-pager",
        "diff",
        "--unified=0",
        `${baseRef}...${targetRef}`,
        filePath,
      ],
      stdout: "piped",
      stderr: "piped",
    });

    const { code, stdout, stderr } = await cmd.output();
    if (code !== 0) {
      const errorString = new TextDecoder().decode(stderr);
      throw new Error(`git: ${code}, ${errorString}`);
    }

    return new TextDecoder().decode(stdout);
  }

  async getDiff(
    filePath: string,
    baseRef: string,
    targetRef: string,
    diffExecutor: (
      filePath: string,
      baseRef: string,
      targetRef: string,
    ) => Promise<string> = this.diffExecutor,
  ) {
    const output = await diffExecutor(filePath, baseRef, targetRef);

    // remove the first 5 lines
    const removedHeader = output.split("\n").slice(5);

    // extract lines starting with '+'
    const filteredAddedLines = removedHeader.filter((line) =>
      line.startsWith("+")
    );

    // remove the first character '+'
    const removedPlus = filteredAddedLines.map((line) => line.slice(1)).join(
      "\n",
    );

    return removedPlus;
  }

  async diffNameOnlyExecutor(
    baseRef: string,
    targetRef: string,
  ): Promise<string> {
    const cmd = new Deno.Command("git", {
      args: [
        "--no-pager",
        "diff",
        "--name-only",
        `${baseRef}...${targetRef}`,
      ],
      stdout: "piped",
      stderr: "piped",
    });

    const { code, stdout, stderr } = await cmd.output();
    if (code !== 0) {
      const errorString = new TextDecoder().decode(stderr);
      throw new Error(`git: ${code}, ${errorString}`);
    }

    return new TextDecoder().decode(stdout);
  }

  async getDiffNameOnly(
    baseRef: string,
    targetRef: string,
    diffNameOnlyExecutor: (
      baseRef: string,
      targetRef: string,
    ) => Promise<string> = this.diffNameOnlyExecutor,
  ) {
    const output = await diffNameOnlyExecutor(baseRef, targetRef);
    const gitDiffFiles = output.split("\n").filter((f) => f !== "");

    // Weekly の変更は複数個無いという前提
    const diffWeekly =
      gitDiffFiles.filter((a) =>
        a.endsWith(".md") && a.includes("productivity-weekly")
      )[0];
    return diffWeekly;
  }
}
