"use client";

import { generateDailyReportTemplate } from "@/lib/tools/dailyReportTemplate";
import { SimpleTemplateGenerator } from "./SimpleTemplateGenerator";

const initialInput = {
  name: "",
  team: "",
  reportDate: "",
  done: "",
  blockers: "",
  tomorrow: "",
  memo: "",
};

export function DailyReportTemplateGenerator() {
  return (
    <SimpleTemplateGenerator
      fields={[
        { key: "name", label: "名前", placeholder: "例：佐藤" },
        { key: "team", label: "所属/チーム", placeholder: "例：営業チーム" },
        { key: "reportDate", label: "日付", type: "date" },
        { key: "done", label: "今日やったこと", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "blockers", label: "困っていること", placeholder: "なければ空欄でOK", type: "textarea" },
        { key: "tomorrow", label: "明日やること", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "memo", label: "メモ", placeholder: "補足があれば入力", type: "textarea" },
      ]}
      generate={generateDailyReportTemplate}
      initialInput={initialInput}
      inputDescription="今日の作業、困りごと、明日の予定を整理した日報テンプレートを作れます。"
      resultTitle="日報テンプレート"
    />
  );
}
