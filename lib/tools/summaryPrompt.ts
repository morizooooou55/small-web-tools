export type SummaryPromptInput = Record<string, string>;

export function generateSummaryPrompt(input: SummaryPromptInput) {
  const errors = validateSummaryPromptInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  const output = [
    "以下の文章を要約してください。",
    "",
    "## 目的",
    input.purpose.trim(),
    "",
    "## 要約条件",
    `- 対象読者: ${input.audience}`,
    `- 長さ: ${input.length}`,
    `- 出力形式: ${input.format}`,
    "- 重要な決定事項、TODO、期限、注意点があれば残してください。",
    "- 不明点は推測せず、不明と書いてください。",
    "",
    "## 元の文章",
    "```text",
    input.sourceText.trim(),
    "```",
  ].join("\n");

  return {
    ok: true as const,
    errors: {},
    result: {
      title: "文章要約用プロンプト",
      summary: "ChatGPTなどに貼り付けて使える形式",
      output,
    },
  };
}

export function validateSummaryPromptInput(input: SummaryPromptInput) {
  const errors: Record<string, string> = {};
  if (!input.purpose?.trim()) errors.purpose = "要約の目的を入力してください";
  if (!input.sourceText?.trim()) errors.sourceText = "要約したい文章を入力してください";
  if (input.sourceText && input.sourceText.length > 5000) {
    errors.sourceText = "元の文章は5000文字以内で入力してください";
  }
  return errors;
}
