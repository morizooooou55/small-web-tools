import assert from "node:assert/strict";
import { generateMeetingMinutesTemplate } from "../lib/tools/meetingMinutesTemplate.ts";

const tests: Array<[string, () => void]> = [];

function test(name: string, fn: () => void) {
  tests.push([name, fn]);
}

test("generates a simple markdown template", () => {
  const generation = generateMeetingMinutesTemplate({
    meetingName: "4月定例会",
    meetingDate: "2026-04-27",
    participants: "佐藤、鈴木",
    meetingType: "regular",
    outputStyle: "simple",
    memo: "予算案を確認",
  });

  assert.equal(generation.ok, true);
  if (generation.ok) {
    assert.ok(generation.result.markdown.includes("# 4月定例会 議事録"));
    assert.ok(generation.result.markdown.includes("- 日時: 2026年4月27日"));
    assert.ok(generation.result.markdown.includes("## 決定事項"));
    assert.ok(generation.result.markdown.includes("予算案を確認"));
  }
});

test("generates a todo-focused template", () => {
  const generation = generateMeetingMinutesTemplate({
    meetingName: "プロジェクト会議",
    meetingDate: "2026-04-27",
    participants: "A\nB",
    meetingType: "project",
    outputStyle: "todo",
    memo: "",
  });

  assert.equal(generation.ok, true);
  if (generation.ok) {
    assert.ok(generation.result.markdown.includes("## TODO"));
    assert.ok(generation.result.markdown.includes("- [ ] 担当: / 期限: / 内容: "));
    assert.ok(generation.result.markdown.includes("- 参加者: A、B"));
  }
});

test("generates a decision-focused template", () => {
  const generation = generateMeetingMinutesTemplate({
    meetingName: "打ち合わせ",
    meetingDate: "2026-04-27",
    participants: "佐藤",
    meetingType: "discussion",
    outputStyle: "decision",
    memo: "",
  });

  assert.equal(generation.ok, true);
  if (generation.ok) {
    assert.ok(generation.result.markdown.includes("- 決定内容: "));
    assert.ok(generation.result.markdown.includes("- 理由・背景: "));
    assert.ok(generation.result.markdown.includes("- 影響範囲: "));
  }
});

test("returns validation errors for required fields", () => {
  const generation = generateMeetingMinutesTemplate({
    meetingName: "",
    meetingDate: "",
    participants: "",
    meetingType: "regular",
    outputStyle: "simple",
    memo: "",
  });

  assert.equal(generation.ok, false);
  assert.ok(generation.errors.meetingName);
  assert.ok(generation.errors.meetingDate);
  assert.ok(generation.errors.participants);
});

test("rejects invalid dates", () => {
  const generation = generateMeetingMinutesTemplate({
    meetingName: "ゼミ",
    meetingDate: "2026-02-31",
    participants: "山田",
    meetingType: "seminar",
    outputStyle: "detailed",
    memo: "",
  });

  assert.equal(generation.ok, false);
  assert.ok(generation.errors.meetingDate);
});

let passed = 0;

for (const [name, fn] of tests) {
  fn();
  passed += 1;
  console.log(`ok ${passed} - ${name}`);
}

console.log(`${passed} meeting minutes tests passed`);
