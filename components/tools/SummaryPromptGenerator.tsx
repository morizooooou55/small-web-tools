"use client";

import { generateSummaryPrompt } from "@/lib/tools/summaryPrompt";
import { SimpleTemplateGenerator } from "./SimpleTemplateGenerator";

const initialInput = {
  purpose: "",
  audience: "社内向け",
  length: "短め",
  format: "箇条書き",
  sourceText: "",
};

export function SummaryPromptGenerator() {
  return (
    <SimpleTemplateGenerator
      fields={[
        { key: "purpose", label: "要約の目的", placeholder: "例：会議内容をチームに共有したい" },
        {
          key: "audience",
          label: "対象読者",
          type: "select",
          options: [
            { value: "社内向け", label: "社内向け" },
            { value: "上司向け", label: "上司向け" },
            { value: "学生向け", label: "学生向け" },
            { value: "自分用", label: "自分用" },
          ],
        },
        {
          key: "length",
          label: "長さ",
          type: "select",
          options: [
            { value: "短め", label: "短め" },
            { value: "普通", label: "普通" },
            { value: "詳しめ", label: "詳しめ" },
          ],
        },
        {
          key: "format",
          label: "出力形式",
          type: "select",
          options: [
            { value: "箇条書き", label: "箇条書き" },
            { value: "文章", label: "文章" },
            { value: "表", label: "表" },
          ],
        },
        { key: "sourceText", label: "要約したい文章", placeholder: "ここに元の文章を貼り付け", type: "textarea" },
      ]}
      generate={generateSummaryPrompt}
      initialInput={initialInput}
      inputDescription="ChatGPTなどに貼り付けて使える、要約用プロンプトを作れます。"
      resultTitle="要約プロンプト"
    />
  );
}
