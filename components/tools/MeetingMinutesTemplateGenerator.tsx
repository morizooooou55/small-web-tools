"use client";

import { useMemo, useState } from "react";
import {
  generateMeetingMinutesTemplate,
  getMeetingTypeLabel,
  getOutputStyleLabel,
  type MeetingMinutesInput,
  type MeetingType,
  type OutputStyle,
} from "@/lib/tools/meetingMinutesTemplate";
import { CopyButton } from "./CopyButton";
import { ToolField } from "./ToolField";

const meetingTypes: MeetingType[] = [
  "regular",
  "discussion",
  "project",
  "interview",
  "seminar",
  "club",
  "other",
];

const outputStyles: OutputStyle[] = ["simple", "detailed", "todo", "decision"];

const initialInput: MeetingMinutesInput = {
  meetingName: "",
  meetingDate: "",
  participants: "",
  meetingType: "regular",
  outputStyle: "simple",
  memo: "",
};

export function MeetingMinutesTemplateGenerator() {
  const [input, setInput] = useState<MeetingMinutesInput>(initialInput);
  const generation = useMemo(() => generateMeetingMinutesTemplate(input), [input]);
  const hasAnyInput = Object.values(input).some((value) => value !== "" && value !== "regular" && value !== "simple");
  const visibleErrors = hasAnyInput ? generation.errors : {};

  function updateInput<Key extends keyof MeetingMinutesInput>(
    key: Key,
    value: MeetingMinutesInput[Key],
  ) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="mx-auto mt-8 max-w-5xl px-4">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-950">入力</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            会議名、日付、参加者を入れるだけで、貼り付けやすいMarkdownテンプレートを作れます。
          </p>

          <div className="mt-5 space-y-4">
            <ToolField label="会議名" error={visibleErrors.meetingName}>
              <input
                className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => updateInput("meetingName", event.target.value)}
                placeholder="例：4月定例会"
                type="text"
                value={input.meetingName}
              />
            </ToolField>

            <ToolField label="日付" error={visibleErrors.meetingDate}>
              <input
                className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => updateInput("meetingDate", event.target.value)}
                type="date"
                value={input.meetingDate}
              />
            </ToolField>

            <ToolField label="参加者" error={visibleErrors.participants}>
              <textarea
                className="min-h-24 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => updateInput("participants", event.target.value)}
                placeholder="例：佐藤、鈴木、田中"
                value={input.participants}
              />
            </ToolField>

            <div className="grid gap-4 sm:grid-cols-2">
              <ToolField label="会議の種類" error={visibleErrors.meetingType}>
                <select
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  onChange={(event) => updateInput("meetingType", event.target.value as MeetingType)}
                  value={input.meetingType}
                >
                  {meetingTypes.map((type) => (
                    <option key={type} value={type}>
                      {getMeetingTypeLabel(type)}
                    </option>
                  ))}
                </select>
              </ToolField>

              <ToolField label="出力形式" error={visibleErrors.outputStyle}>
                <select
                  className="min-h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                  onChange={(event) => updateInput("outputStyle", event.target.value as OutputStyle)}
                  value={input.outputStyle}
                >
                  {outputStyles.map((style) => (
                    <option key={style} value={style}>
                      {getOutputStyleLabel(style)}
                    </option>
                  ))}
                </select>
              </ToolField>
            </div>

            <ToolField label="任意メモ" error={visibleErrors.memo}>
              <textarea
                className="min-h-28 w-full resize-y rounded-md border border-slate-300 bg-white px-3 py-2 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(event) => updateInput("memo", event.target.value)}
                placeholder="例：予算案、次回イベント、確認したい論点"
                value={input.memo}
              />
            </ToolField>
          </div>
        </div>

        <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold text-slate-950">生成結果</h2>
            <CopyButton disabled={!generation.ok} text={generation.ok ? generation.result.markdown : ""} />
          </div>

          {!hasAnyInput ? (
            <p className="mt-6 rounded-md bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              会議名、日付、参加者を入力すると、Markdown形式の議事録テンプレートが表示されます。
            </p>
          ) : !generation.ok ? (
            <p className="mt-6 rounded-md border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
              入力内容を確認してください。
            </p>
          ) : (
            <div className="mt-6">
              <div className="rounded-md bg-teal-50 p-4">
                <p className="text-sm font-semibold text-teal-800">
                  {generation.result.title} のテンプレート
                </p>
                <p className="mt-1 text-sm text-teal-800">
                  見出し {generation.result.sectionCount} 個 / Markdown形式
                </p>
              </div>
              <pre className="mt-5 max-h-[620px] overflow-auto whitespace-pre-wrap rounded-md border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-slate-50">
                {generation.result.markdown}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
