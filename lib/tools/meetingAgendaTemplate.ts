export type AgendaInput = Record<string, string>;

export function generateMeetingAgendaTemplate(input: AgendaInput) {
  const errors = validateAgendaInput(input);
  if (Object.keys(errors).length > 0) {
    return { ok: false as const, result: null, errors };
  }

  const date = formatDate(input.date);
  const output = [
    `# ${input.meetingName.trim()} アジェンダ`,
    "",
    `- 日時: ${date}`,
    `- 参加者: ${input.participants.trim()}`,
    `- 会議の目的: ${input.purpose.trim()}`,
    `- 会議形式: ${input.meetingType}`,
    "",
    "## 事前共有",
    input.memo.trim() ? `- ${input.memo.trim()}` : "- ",
    "",
    "## 議題",
    "1. ",
    "2. ",
    "3. ",
    "",
    "## 決めたいこと",
    "- ",
    "",
    "## 確認事項",
    "- ",
    "",
    "## 次のアクション",
    "- [ ] 担当: / 期限: / 内容: ",
  ].join("\n");

  return {
    ok: true as const,
    errors: {},
    result: {
      title: `${input.meetingName.trim()} のアジェンダ`,
      summary: "会議前に共有しやすいMarkdown形式",
      output,
    },
  };
}

export function validateAgendaInput(input: AgendaInput) {
  const errors: Record<string, string> = {};
  if (!input.meetingName?.trim()) errors.meetingName = "会議名を入力してください";
  if (!isValidDate(input.date)) errors.date = "日付を選択してください";
  if (!input.participants?.trim()) errors.participants = "参加者を入力してください";
  if (!input.purpose?.trim()) errors.purpose = "会議の目的を入力してください";
  return errors;
}

function formatDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
