import Link from "next/link";
import { getToolHref, toolCatalog } from "@/lib/tools/catalog";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-4 py-12">
      <p className="mb-3 text-sm font-semibold text-teal-700">Small Web Tools</p>
      <h1 className="text-3xl font-bold tracking-normal text-slate-950 sm:text-5xl">
        ログイン不要で使える小型Webツール集
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
        家計、仕事、文章変換、開発など、具体的な作業をすぐ片付けるためのツールを追加していきます。
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex items-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-800"
          href="/tools"
        >
          ツール一覧を見る
        </Link>
        <Link
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-teal-500 hover:text-teal-700"
          href="/tools/subscription-total-checker"
        >
          サブスク総額チェックを使う
        </Link>
        <Link
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:border-teal-500 hover:text-teal-700"
          href="/tools/meeting-minutes-template"
        >
          議事録テンプレートを作る
        </Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {toolCatalog.slice(0, 10).map((tool) => (
          <Link
            className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300"
            href={getToolHref(tool.slug)}
            key={tool.slug}
          >
            <p className="text-xs font-semibold text-teal-700">{tool.categoryLabel}</p>
            <h2 className="mt-1 text-base font-bold text-slate-950">{tool.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
