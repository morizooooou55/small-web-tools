export type TodoTemplateInput = Record<string, string>;

export function generateTodoListTemplate(input: TodoTemplateInput) {
  const errors = validateTodoTemplateInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  const output = [
    `# ${input.projectName.trim()} TODOリスト`,
    "",
    `- 担当者: ${input.owner.trim()}`,
    `- 期限: ${formatDate(input.dueDate)}`,
    `- 優先度: ${input.priority}`,
    "",
    "## 今日やること",
    ...toBulletLines(input.items, "- [ ] "),
    "",
    "## 次に確認すること",
    "- [ ] ",
    "",
    "## 完了条件",
    "- ",
    "",
    "## メモ",
    input.memo.trim() ? `- ${input.memo.trim()}` : "- ",
  ].join("\n");

  return {
    ok: true as const,
    errors: {},
    result: {
      title: `${input.projectName.trim()} のTODOリスト`,
      summary: "担当・期限・完了条件を整理",
      output,
    },
  };
}

export function validateTodoTemplateInput(input: TodoTemplateInput) {
  const errors: Record<string, string> = {};
  if (!input.projectName?.trim()) errors.projectName = "件名を入力してください";
  if (!input.owner?.trim()) errors.owner = "担当者を入力してください";
  if (!isValidDate(input.dueDate)) errors.dueDate = "期限を選択してください";
  if (!input.items?.trim()) errors.items = "TODOを1件以上入力してください";
  return errors;
}

function toBulletLines(value: string, prefix: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `${prefix}${line}`);
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
