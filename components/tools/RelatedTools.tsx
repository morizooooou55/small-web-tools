import Link from "next/link";

export type RelatedTool = {
  title: string;
  description: string;
  href: string;
  status?: "available" | "planned";
};

export function RelatedTools({ tools }: { tools: RelatedTool[] }) {
  return (
    <section className="mx-auto mt-12 max-w-5xl">
      <h2 className="text-2xl font-bold text-slate-950">関連ツール</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {tools.map((tool) => {
          const content = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-950">{tool.title}</h3>
                {tool.status === "planned" ? (
                  <span className="shrink-0 rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                    準備中
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            </>
          );

          if (tool.status === "planned") {
            return (
              <div
                aria-disabled="true"
                className="rounded-md border border-slate-200 bg-white p-4 opacity-80 shadow-sm"
                key={tool.href}
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              className="rounded-md border border-slate-200 bg-white p-4 shadow-sm transition hover:border-teal-300 hover:shadow-md"
              href={tool.href}
              key={tool.href}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
