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
	const srcDir = path.join(baseDir, "pages");
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
				const result = (
					(await translator.translateText(
						targetLine,
						null,
						"en-US",
						{},
					)) as TextResult
				).text;
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
					const result = (
						(await translator.translateText(
							line,
							null,
							"en-US",
							{},
						)) as TextResult
					).text;
					console.log(`  note: ${slideIndex}_${lineIndex} - ${line}`);
					console.log(`  translated: ${result}`);
					translatedNote.push(result);
				}
				translatedSlide.slides[slideIndex].note = translatedNote.join("\n");
			}
		}

		const prettify = slidev.parser.prettify(translatedSlide);
		const translatedSlideMarkdown = slidev.parser.stringify(prettify);

		console.log("  Writing");
		await fs.writeFile(path.join(resultDir, fileName), translatedSlideMarkdown);
	}
})();
