export type MeetingType =
  | "regular"
  | "discussion"
  | "project"
  | "interview"
  | "seminar"
  | "club"
  | "other";

export type OutputStyle = "simple" | "detailed" | "todo" | "decision";

export type MeetingMinutesInput = {
  meetingName: string;
  meetingDate: string;
  participants: string;
  meetingType: MeetingType;
  outputStyle: OutputStyle;
  memo: string;
};

export type MeetingMinutesErrors = Partial<Record<keyof MeetingMinutesInput, string>>;

export type MeetingMinutesResult = {
  title: string;
  markdown: string;
  createdAtLabel: string;
  sectionCount: number;
};

export type MeetingMinutesGeneration =
  | { ok: true; result: MeetingMinutesResult; errors: MeetingMinutesErrors }
  | { ok: false; result: null; errors: MeetingMinutesErrors };

const MEETING_TYPE_LABELS: Record<MeetingType, string> = {
  regular: "定例会",
  discussion: "打ち合わせ",
  project: "プロジェクト会議",
  interview: "面談",
  seminar: "授業・ゼミ",
  club: "サークル",
  other: "その他",
};

const OUTPUT_STYLE_LABELS: Record<OutputStyle, string> = {
  simple: "シンプル",
  detailed: "詳細",
  todo: "TODO重視",
  decision: "決定事項重視",
};

export function generateMeetingMinutesTemplate(
  input: MeetingMinutesInput,
): MeetingMinutesGeneration {
  const errors = validateMeetingMinutesInput(input);

  if (Object.keys(errors).length > 0) {
    return { ok: false, result: null, errors };
  }

  const title = input.meetingName.trim();
  const dateLabel = formatDateLabel(input.meetingDate);
  const createdAtLabel = formatDateLabel(getTodayString());
  const participants = normalizeMultiline(input.participants);
  const memo = normalizeMultiline(input.memo);
  const sections = buildSections(input.outputStyle, memo);
  const markdown = [
    `# ${title} 議事録`,
    "",
    `- 日時: ${dateLabel}`,
    `- 会議の種類: ${MEETING_TYPE_LABELS[input.meetingType]}`,
    `- 参加者: ${participants}`,
    `- 出力形式: ${OUTPUT_STYLE_LABELS[input.outputStyle]}`,
    `- 作成日: ${createdAtLabel}`,
    "",
    ...sections,
  ].join("\n");

  return {
    ok: true,
    errors: {},
    result: {
      title,
      markdown,
      createdAtLabel,
      sectionCount: sections.filter((line) => line.startsWith("## ")).length,
    },
  };
}

export function validateMeetingMinutesInput(input: MeetingMinutesInput): MeetingMinutesErrors {
  const errors: MeetingMinutesErrors = {};

  if (input.meetingName.trim() === "") {
    errors.meetingName = "会議名を入力してください";
  } else if (input.meetingName.trim().length > 80) {
    errors.meetingName = "会議名は80文字以内で入力してください";
  }

  if (input.meetingDate.trim() === "") {
    errors.meetingDate = "日付を選択してください";
  } else if (!isValidDateString(input.meetingDate)) {
    errors.meetingDate = "有効な日付を選択してください";
  }

  if (input.participants.trim() === "") {
    errors.participants = "参加者を入力してください";
  } else if (input.participants.trim().length > 300) {
    errors.participants = "参加者は300文字以内で入力してください";
  }

  if (!MEETING_TYPE_LABELS[input.meetingType]) {
    errors.meetingType = "会議の種類を選択してください";
  }

  if (!OUTPUT_STYLE_LABELS[input.outputStyle]) {
    errors.outputStyle = "出力形式を選択してください";
  }

  if (input.memo.length > 1000) {
    errors.memo = "任意メモは1000文字以内で入力してください";
  }

  return errors;
}

export function getMeetingTypeLabel(value: MeetingType) {
  return MEETING_TYPE_LABELS[value];
}

export function getOutputStyleLabel(value: OutputStyle) {
  return OUTPUT_STYLE_LABELS[value];
}

function buildSections(outputStyle: OutputStyle, memo: string) {
  const commonSections = [
    "## 目的",
    "- ",
    "",
    "## 議題",
    "- ",
    "",
    "## 議論内容",
    "- ",
    "",
  ];

  if (outputStyle === "simple") {
    return [
      ...commonSections,
      "## 決定事項",
      "- ",
      "",
      "## TODO",
      "- [ ] 担当: / 期限: / 内容: ",
      "",
      "## 次回確認事項",
      "- ",
      "",
      "## メモ",
      memo ? memo : "- ",
    ];
  }

  if (outputStyle === "todo") {
    return [
      ...commonSections,
      "## TODO",
      "- [ ] 担当: / 期限: / 内容: ",
      "- [ ] 担当: / 期限: / 内容: ",
      "",
      "## 決定事項",
      "- ",
      "",
      "## 次回確認事項",
      "- 未完了TODOの確認",
      "- 期限変更が必要な項目",
      "",
      "## メモ",
      memo ? memo : "- ",
    ];
  }

  if (outputStyle === "decision") {
    return [
      ...commonSections,
      "## 決定事項",
      "- 決定内容: ",
      "- 理由・背景: ",
      "- 影響範囲: ",
      "",
      "## TODO",
      "- [ ] 担当: / 期限: / 内容: ",
      "",
      "## 次回確認事項",
      "- 決定事項の進捗確認",
      "",
      "## メモ",
      memo ? memo : "- ",
    ];
  }

  return [
    "## 目的",
    "- 会議で確認したいこと: ",
    "- 到達したい状態: ",
    "",
    "## 議題",
    "1. ",
    "2. ",
    "3. ",
    "",
    "## 議論内容",
    "### 議題1",
    "- 論点: ",
    "- 主な意見: ",
    "- 補足: ",
    "",
    "### 議題2",
    "- 論点: ",
    "- 主な意見: ",
    "- 補足: ",
    "",
    "## 決定事項",
    "- ",
    "",
    "## TODO",
    "- [ ] 担当: / 期限: / 内容: ",
    "",
    "## 次回確認事項",
    "- ",
    "",
    "## メモ",
    memo ? memo : "- ",
  ];
}

function normalizeMultiline(value: string) {
  const lines = value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.length > 0 ? lines.join("、") : "";
}

function formatDateLabel(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return `${year}年${month}月${day}日`;
}

function isValidDateString(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
