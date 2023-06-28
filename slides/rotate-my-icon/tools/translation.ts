import * as deepl from "deepl-node";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as slidev from "@slidev/cli";
import { TextResult } from "deepl-node";

const newDeepLClient = () => {
	const authKey = process.env.DEEPL_AUTH_KEY;
	if (authKey === undefined) {
		throw new Error("DEEPL_AUTH_KEY environment variable is not set");
	}

	return new deepl.Translator(authKey);
};

const listFiles = async (path: string) => {
	return await fs.readdir(path);
};

const baseDir = path.join(__dirname, "..");

(async () => {
	const translator = newDeepLClient();
	const srcDir = path.join(baseDir, "generated");
	const files = await listFiles(srcDir);
	for (const fileName of files) {
		if (fileName !== "implementation.md") {
			continue;
		}
		const resultDir = path.join(baseDir, "generated");
		const filePath = path.join(srcDir, fileName);
		console.log(`File: ${filePath}`);

		console.log("  Reading");
		const file = await fs.readFile(filePath, "utf-8");

		console.log("  Parsing");
		const slidevMarkdown = await slidev.parser.parse(file);

		console.log("  Translating");
		const translatedSlide = slidevMarkdown;
		for (const [slideIndex, slide] of slidevMarkdown.slides.entries()) {
			const translatedContents: string[] = [];
			const splitContent = slide.content.split("\n");
			for (const [lineIndex, line] of splitContent.entries()) {
				const trimmed = line.trimStart();
				if (
					trimmed.startsWith("```") ||
					trimmed.startsWith("<") ||
					trimmed.startsWith("-->") ||
					trimmed === ""
				) {
					translatedContents.push(line);
					continue;
				}

				let targetLine = line;
				if (trimmed.startsWith("- ~~")) {
					// ~~ の翻訳がおかしくなるため
					targetLine = line.replace("- ~~", "- ").replace("~~", "");
				}
				if (trimmed.startsWith("# 平木場 風太")) {
					// # Hirakoba Kazuta - Futa Hirakoba となるため
					translatedContents.push("# Futa Hirakoba - 平木場 風太");
				}

				console.log(`  origin: ${slideIndex}_${lineIndex} - ${line}`);
				// const result = (
				// 	(await translator.translateText(
				// 		targetLine,
				// 		null,
				// 		"en-US",
				// 		{},
				// 	)) as TextResult
				// ).text;
				const result = targetLine;
				console.log(`  translated: ${result}`);
				translatedContents.push(result);
			}
			translatedSlide.slides[slideIndex].content =
				translatedContents.join("\n");

			if (slide.note) {
				const splitNote = slide.note.split("\n");
				const translatedNote: string[] = [];
				for (const [lineIndex, line] of splitNote.entries()) {
					if (line === "") {
						translatedNote.push(line);
						continue;
					}
					// const result = (
					// 	(await translator.translateText(
					// 		line,
					// 		null,
					// 		"en-US",
					// 		{},
					// 	)) as TextResult
					// ).text;
					const result = line;
					console.log(`  note: ${slideIndex}_${lineIndex} - ${line}`);
					console.log(`  translated: ${result}`);
					translatedNote.push(result);
				}
				translatedSlide.slides[slideIndex].note = translatedNote.join("\n");
			}
		}

		const prettify = slidev.parser.prettify(translatedSlide);
		const translatedSlideMarkdown = slidev.parser.stringify(prettify);
		let replacedSlideMarkdown = translatedSlideMarkdown;

		// mermaid の翻訳がおかしくなるため、最後に置き換える
		const mermaidRegex = /```mermaid\nsequenceDiagram\n([\s\S]*?)```/g;
		replacedSlideMarkdown = translatedSlideMarkdown.replace(
			mermaidRegex,
			`\`\`\`mermaid
sequenceDiagram
    actor User
    Browser->>Browser: page loading
    Browser->>Browser: register event handler
    loop
        User->>Browser: click my icon<br/>(click event)
        Browser->>My icon: add animation class<br/>(handle click event)
        My icon->>My icon: Rotate
        My icon->>Browser: animation end<br />(animationend event)
        Browser->>My icon: remove animation class<br/>(handle animationend event)
    end
\`\`\``,
		);

		replacedSlideMarkdown = replacedSlideMarkdown
			.replaceAll("/* あいさつ */", "/* Greetings */")
			.replaceAll("/* 自己紹介 */", "/* Self-introduction */")
			.replaceAll("/* SNS リンク */", "/* SNS Links */")
			.replaceAll("/* 小さいアイコン */", "/* Small icon */")
			.replaceAll("/* 大きいアイコン */", "/* Big icon */")
			.replaceAll("例", "ex")
			.replaceAll("付与", "add")
			.replaceAll("`SelfIntroduction` に渡す", "pass to `SelfIntroduction`");

		console.log("  Writing");
		await fs.writeFile(path.join(resultDir, fileName), replacedSlideMarkdown);
	}
})();
