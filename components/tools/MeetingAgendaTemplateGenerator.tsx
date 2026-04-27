"use client";

import { generateMeetingAgendaTemplate } from "@/lib/tools/meetingAgendaTemplate";
import { SimpleTemplateGenerator } from "./SimpleTemplateGenerator";

const initialInput = {
  meetingName: "",
  date: "",
  participants: "",
  purpose: "",
  meetingType: "定例会",
  memo: "",
};

export function MeetingAgendaTemplateGenerator() {
  return (
    <SimpleTemplateGenerator
      fields={[
        { key: "meetingName", label: "会議名", placeholder: "例：4月定例会" },
        { key: "date", label: "日付", type: "date" },
        { key: "participants", label: "参加者", placeholder: "例：佐藤、鈴木、田中" },
        { key: "purpose", label: "会議の目的", placeholder: "例：今月の進捗確認" },
        {
          key: "meetingType",
          label: "会議形式",
          type: "select",
          options: [
            { value: "定例会", label: "定例会" },
            { value: "打ち合わせ", label: "打ち合わせ" },
            { value: "プロジェクト会議", label: "プロジェクト会議" },
            { value: "面談", label: "面談" },
            { value: "授業・ゼミ", label: "授業・ゼミ" },
          ],
        },
        { key: "memo", label: "事前共有メモ", placeholder: "例：確認したい論点", type: "textarea" },
      ]}
      generate={generateMeetingAgendaTemplate}
      initialInput={initialInput}
      inputDescription="会議前に共有する目的・議題・確認事項のテンプレートを作れます。"
      resultTitle="アジェンダ"
    />
  );
}
