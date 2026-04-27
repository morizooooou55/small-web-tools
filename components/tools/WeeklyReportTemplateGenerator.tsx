"use client";

import { generateWeeklyReportTemplate } from "@/lib/tools/weeklyReportTemplate";
import { SimpleTemplateGenerator } from "./SimpleTemplateGenerator";

const initialInput = {
  name: "",
  team: "",
  weekLabel: "",
  achievements: "",
  inProgress: "",
  risks: "",
  nextWeek: "",
  questions: "",
};

export function WeeklyReportTemplateGenerator() {
  return (
    <SimpleTemplateGenerator
      fields={[
        { key: "name", label: "名前", placeholder: "例：佐藤" },
        { key: "team", label: "チーム", placeholder: "例：開発チーム" },
        { key: "weekLabel", label: "対象週", placeholder: "例：2026年4月第4週" },
        { key: "achievements", label: "今週の成果", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "inProgress", label: "進行中のタスク", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "risks", label: "課題・リスク", placeholder: "なければ空欄でOK", type: "textarea" },
        { key: "nextWeek", label: "来週やること", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "questions", label: "相談したいこと", placeholder: "なければ空欄でOK", type: "textarea" },
      ]}
      generate={generateWeeklyReportTemplate}
      initialInput={initialInput}
      inputDescription="今週の成果、課題、来週の予定を整理した週報テンプレートを作れます。"
      resultTitle="週報テンプレート"
    />
  );
}
