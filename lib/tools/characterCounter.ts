export type CharacterCounterInput = {
  text: string;
};

export type CharacterCounterResult = {
  characters: number;
  charactersWithoutSpaces: number;
  lines: number;
  paragraphs: number;
  words: number;
  manuscriptPages: number;
  copyText: string;
};

export function countCharacters(input: CharacterCounterInput) {
  const text = input.text;
  const characters = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, "").length;
  const lines = text === "" ? 0 : text.split(/\r?\n/).length;
  const paragraphs = text
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean).length;
  const words = text.match(/[A-Za-z0-9]+|[\u3040-\u30ff\u3400-\u9fff]/g)?.length ?? 0;
  const manuscriptPages = Math.ceil(characters / 400);

  return {
    characters,
    charactersWithoutSpaces,
    lines,
    paragraphs,
    words,
    manuscriptPages,
    copyText: [
      "文字数カウント結果",
      `文字数: ${characters}`,
      `空白なし文字数: ${charactersWithoutSpaces}`,
      `行数: ${lines}`,
      `段落数: ${paragraphs}`,
      `単語・文字要素数: ${words}`,
      `原稿用紙換算: ${manuscriptPages}枚`,
    ].join("\n"),
  } satisfies CharacterCounterResult;
}
