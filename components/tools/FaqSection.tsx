import type { FaqItem } from "@/lib/tools/seo";

export function FAQSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="mx-auto mt-12 max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-950">よくある質問</h2>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <details
            className="rounded-md border border-slate-200 bg-white p-4 shadow-sm"
            key={item.question}
          >
            <summary className="cursor-pointer text-base font-semibold text-slate-900">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-slate-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export const FaqSection = FAQSection;
