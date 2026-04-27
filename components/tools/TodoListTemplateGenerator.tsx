"use client";

import { generateTodoListTemplate } from "@/lib/tools/todoListTemplate";
import { SimpleTemplateGenerator } from "./SimpleTemplateGenerator";

const initialInput = {
  projectName: "",
  owner: "",
  dueDate: "",
  priority: "中",
  items: "",
  memo: "",
};

export function TodoListTemplateGenerator() {
  return (
    <SimpleTemplateGenerator
      fields={[
        { key: "projectName", label: "件名", placeholder: "例：資料作成" },
        { key: "owner", label: "担当者", placeholder: "例：佐藤" },
        { key: "dueDate", label: "期限", type: "date" },
        {
          key: "priority",
          label: "優先度",
          type: "select",
          options: [
            { value: "高", label: "高" },
            { value: "中", label: "中" },
            { value: "低", label: "低" },
          ],
        },
        { key: "items", label: "TODO", placeholder: "1行に1件ずつ入力", type: "textarea" },
        { key: "memo", label: "メモ", placeholder: "補足があれば入力", type: "textarea" },
      ]}
      generate={generateTodoListTemplate}
      initialInput={initialInput}
      inputDescription="担当者・期限・完了条件を整理しやすいTODOテンプレートを作れます。"
      resultTitle="TODOリスト"
    />
  );
}
