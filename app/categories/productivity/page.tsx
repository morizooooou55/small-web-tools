import Link from "next/link";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { getToolHref, getToolsByCategory } from "@/lib/tools/catalog";

export default function ProductivityCategoryPage() {
  const tools = getToolsByCategory("productivity");
  return (
    <ToolPageLayout>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-950">仕事効率化ツール</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link className="rounded-md border border-slate-200 bg-white p-4 shadow-sm" href={getToolHref(tool.slug)} key={tool.slug}>
              <h2 className="font-bold text-slate-950">{tool.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </ToolPageLayout>
  );
}
