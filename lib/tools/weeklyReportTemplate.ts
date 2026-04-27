export type WeeklyReportInput = Record<string, string>;

export function generateWeeklyReportTemplate(input: WeeklyReportInput) {
  const errors = validateWeeklyReportInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  const output = [
    `# ${input.weekLabel.trim()} 週報`,
    "",
    `- 名前: ${input.name.trim()}`,
    `- チーム: ${input.team.trim() || "未入力"}`,
    "",
    "## 今週の成果",
    ...toBulletLines(input.achievements, "- "),
    "",
    "## 進行中のタスク",
    ...toBulletLines(input.inProgress, "- [ ] "),
    "",
    "## 課題・リスク",
    input.risks.trim() ? `- ${input.risks.trim()}` : "- 特になし",
    "",
    "## 来週やること",
    ...toBulletLines(input.nextWeek, "- [ ] "),
    "",
    "## 相談したいこと",
    input.questions.trim() ? `- ${input.questions.trim()}` : "- 特になし",
  ].join("\n");

  return {
    ok: true as const,
    errors: {},
    result: {
      title: `${input.weekLabel.trim()} の週報`,
      summary: "成果・課題・来週の予定を整理",
      output,
    },
  };
}

export function validateWeeklyReportInput(input: WeeklyReportInput) {
  const errors: Record<string, string> = {};
  if (!input.name?.trim()) errors.name = "名前を入力してください";
  if (!input.weekLabel?.trim()) errors.weekLabel = "対象週を入力してください";
  if (!input.achievements?.trim()) errors.achievements = "今週の成果を入力してください";
  if (!input.nextWeek?.trim()) errors.nextWeek = "来週やることを入力してください";
  return errors;
}

function toBulletLines(value: string, prefix: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `${prefix}${line}`);
}
