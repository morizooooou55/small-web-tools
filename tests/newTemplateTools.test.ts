import assert from "node:assert/strict";
import { countCharacters } from "../lib/tools/characterCounter.ts";
import { generateDailyReportTemplate } from "../lib/tools/dailyReportTemplate.ts";
import { generateMeetingAgendaTemplate } from "../lib/tools/meetingAgendaTemplate.ts";
import { generateSummaryPrompt } from "../lib/tools/summaryPrompt.ts";
import { formatText } from "../lib/tools/textFormatter.ts";
import { generateTodoListTemplate } from "../lib/tools/todoListTemplate.ts";
import { generateWeeklyReportTemplate } from "../lib/tools/weeklyReportTemplate.ts";

const tests: Array<[string, () => void]> = [];

function test(name: string, fn: () => void) {
  tests.push([name, fn]);
}

test("generates meeting agenda template", () => {
  const result = generateMeetingAgendaTemplate({
    meetingName: "定例会",
    date: "2026-04-27",
    participants: "佐藤、鈴木",
    purpose: "進捗確認",
    meetingType: "定例会",
    memo: "予算確認",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result.output.includes("# 定例会 アジェンダ"));
    assert.ok(result.result.output.includes("## 議題"));
  }
});

test("generates todo list template", () => {
  const result = generateTodoListTemplate({
    projectName: "資料作成",
    owner: "佐藤",
    dueDate: "2026-04-27",
    priority: "高",
    items: "構成を作る\nレビューする",
    memo: "",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result.output.includes("- [ ] 構成を作る"));
    assert.ok(result.result.output.includes("- 優先度: 高"));
  }
});

test("generates daily report template", () => {
  const result = generateDailyReportTemplate({
    name: "佐藤",
    team: "開発",
    reportDate: "2026-04-27",
    done: "実装",
    blockers: "",
    tomorrow: "テスト",
    memo: "",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result.output.includes("## 今日やったこと"));
    assert.ok(result.result.output.includes("- [ ] テスト"));
  }
});

test("generates weekly report template", () => {
  const result = generateWeeklyReportTemplate({
    name: "佐藤",
    team: "開発",
    weekLabel: "2026年4月第4週",
    achievements: "リリース",
    inProgress: "改善",
    risks: "",
    nextWeek: "検証",
    questions: "",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result.output.includes("# 2026年4月第4週 週報"));
    assert.ok(result.result.output.includes("## 来週やること"));
  }
});

test("counts characters", () => {
  const result = countCharacters({ text: "abc\nテスト" });
  assert.equal(result.characters, 7);
  assert.equal(result.lines, 2);
});

test("formats text", () => {
  const result = formatText({ text: " a \n\n b ", mode: "remove-empty-lines" });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.result.formatted, " a \n b ");
  }
});

test("generates summary prompt", () => {
  const result = generateSummaryPrompt({
    purpose: "共有用",
    audience: "社内向け",
    length: "短め",
    format: "箇条書き",
    sourceText: "長い文章です。",
  });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.ok(result.result.output.includes("以下の文章を要約してください。"));
    assert.ok(result.result.output.includes("長い文章です。"));
  }
});

test("validates required inputs", () => {
  const agenda = generateMeetingAgendaTemplate({
    meetingName: "",
    date: "",
    participants: "",
    purpose: "",
    meetingType: "定例会",
    memo: "",
  });
  assert.equal(agenda.ok, false);
  assert.ok(agenda.errors.meetingName);
});

let passed = 0;

for (const [name, fn] of tests) {
  fn();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

console.log(`${passed} new tool tests passed`);
