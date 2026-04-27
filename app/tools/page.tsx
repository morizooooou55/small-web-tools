import type { Metadata } from "next";
import Link from "next/link";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getToolHref, toolCatalog } from "@/lib/tools/catalog";

export const metadata: Metadata = {
  title: "ツール一覧｜小型Webツール集",
  description: "ログイン不要で使える小型Webツールの一覧です。家計、仕事効率化、文章変換のツールをまとめています。",
};

export default function ToolsIndexPage() {
  return (
    <ToolPageLayout>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-950">ツール一覧</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700">
          ログイン不要で使える小型Webツールをカテゴリ別に追加しています。
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {toolCatalog.map((tool) => (
            <Link
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
              href={getToolHref(tool.slug)}
              key={tool.slug}
            >
              <p className="text-xs font-semibold text-teal-700">{tool.categoryLabel}</p>
              <h2 className="mt-2 text-base font-bold text-slate-950">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </ToolPageLayout>
  );
}
