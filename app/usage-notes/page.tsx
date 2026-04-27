import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";

export const metadata: Metadata = {
  title: "利用上の注意",
  description: "小型Webツール集を利用する際の注意事項です。入力内容、計算結果、テンプレート利用時の確認事項を説明します。",
};

export default function UsageNotesPage() {
  return (
    <ToolPageLayout>
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-950">利用上の注意</h1>
        <div className="mt-6 space-y-6 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-950">結果は目安です</h2>
            <p className="mt-2">
              計算ツールの結果やテンプレートの内容は、確認作業を助けるための目安です。契約内容、社内ルール、提出先の指定に合わせて必ず確認してください。
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">外部送信について</h2>
            <p className="mt-2">
              現在のツールは、入力内容を外部サービスへ送信しません。AI API連携、ログイン、保存機能、決済機能もありません。
            </p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-950">機密情報の扱い</h2>
            <p className="mt-2">
              議事録、日報、週報、要約プロンプトなどに機密情報や個人情報を入力する場合は、所属組織や利用先のルールに従ってください。
            </p>
          </section>
        </div>
      </main>
    </ToolPageLayout>
  );
}
