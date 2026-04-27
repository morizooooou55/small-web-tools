export type DailyReportInput = Record<string, string>;

export function generateDailyReportTemplate(input: DailyReportInput) {
  const errors = validateDailyReportInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  const output = [
    `# ${formatDate(input.reportDate)} 日報`,
    "",
    `- 名前: ${input.name.trim()}`,
    `- 所属/チーム: ${input.team.trim() || "未入力"}`,
    "",
    "## 今日やったこと",
    ...toBulletLines(input.done, "- "),
    "",
    "## 成果・進捗",
    "- ",
    "",
    "## 困っていること",
    input.blockers.trim() ? `- ${input.blockers.trim()}` : "- 特になし",
    "",
    "## 明日やること",
    ...toBulletLines(input.tomorrow, "- [ ] "),
    "",
    "## メモ",
    input.memo.trim() ? `- ${input.memo.trim()}` : "- ",
  ].join("\n");

  return {
    ok: true as const,
    errors: {},
    result: {
      title: `${input.name.trim()} の日報`,
      summary: "今日の作業と明日の予定を整理",
      output,
    },
  };
}

export function validateDailyReportInput(input: DailyReportInput) {
  const errors: Record<string, string> = {};
  if (!input.name?.trim()) errors.name = "名前を入力してください";
  if (!isValidDate(input.reportDate)) errors.reportDate = "日付を選択してください";
  if (!input.done?.trim()) errors.done = "今日やったことを入力してください";
  if (!input.tomorrow?.trim()) errors.tomorrow = "明日やることを入力してください";
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
