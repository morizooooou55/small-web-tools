export type TextFormatMode = "trim-lines" | "remove-empty-lines" | "remove-line-breaks" | "normalize-spaces";

export type TextFormatterInput = {
  text: string;
  mode: TextFormatMode;
};

const MODE_LABELS: Record<TextFormatMode, string> = {
  "trim-lines": "行頭・行末の空白を削除",
  "remove-empty-lines": "空行を削除",
  "remove-line-breaks": "改行を削除",
  "normalize-spaces": "連続スペースを1つにする",
};

export function formatText(input: TextFormatterInput) {
  const errors: Record<string, string> = {};
  if (!input.text.trim()) errors.text = "整形したい文章を入力してください";
  if (!MODE_LABELS[input.mode]) errors.mode = "整形方法を選択してください";
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  let formatted = input.text;
  if (input.mode === "trim-lines") {
    formatted = input.text.split(/\r?\n/).map((line) => line.trim()).join("\n");
  }
  if (input.mode === "remove-empty-lines") {
    formatted = input.text.split(/\r?\n/).filter((line) => line.trim() !== "").join("\n");
  }
  if (input.mode === "remove-line-breaks") {
    formatted = input.text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).join("");
  }
  if (input.mode === "normalize-spaces") {
    formatted = input.text.replace(/[ \t\u3000]+/g, " ").trim();
  }

  return {
    ok: true as const,
    errors: {},
    result: {
      formatted,
      modeLabel: MODE_LABELS[input.mode],
      beforeLength: input.text.length,
      afterLength: formatted.length,
    },
  };
}

export function getTextFormatModeLabel(mode: TextFormatMode) {
  return MODE_LABELS[mode];
}
