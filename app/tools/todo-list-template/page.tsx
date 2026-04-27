import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { TodoListTemplateGenerator } from "@/components/tools/TodoListTemplateGenerator";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "TODOリストには何を入れるとよいですか？", answer: "担当者、期限、やること、完了条件を入れると、あとから確認しやすくなります。" },
  { question: "仕事以外でも使えますか？", answer: "使えます。勉強、家事、サークル、イベント準備などにも使えます。" },
  { question: "NotionやGoogle Docsに貼れますか？", answer: "はい。Markdown形式のテキストとしてコピーできます。" },
];

const relatedTools = [
  { title: "会議アジェンダテンプレート生成", description: "会議前の議題を整理します。", href: "/tools/meeting-agenda-template", status: "available" as const },
  { title: "議事録テンプレート生成", description: "会議後の決定事項とTODOを残します。", href: "/tools/meeting-minutes-template", status: "available" as const },
  { title: "日報テンプレート生成", description: "日々の作業と明日の予定を整理します。", href: "/tools/daily-report-template", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "TODOリストテンプレート生成",
  slug: "todo-list-template",
  category: "productivity",
  description: "件名、担当者、期限、TODOを入力するだけで、コピーして使えるTODOリストを作成できます。",
  h1: "TODOリストテンプレート生成",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールはTODOリストのテンプレートを作成するためのものです。実際の期限、担当者、優先度は利用者自身で確認・編集してください。",
  metadata: {
    title: "TODOリストテンプレート生成｜担当者と期限を整理できるタスク表",
    description: "件名、担当者、期限、TODOを入力するだけで、Markdown形式のTODOリストを作成できます。仕事、勉強、チーム活動のタスク整理に使えます。",
    alternates: { canonical: "/tools/todo-list-template" },
    openGraph: { title: "TODOリストテンプレート生成", description: "担当者と期限を整理できるTODOリストを作成できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function TodoListTemplatePage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "Markdown出力"]} title={toolConfig.h1} />
        <TodoListTemplateGenerator />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>件名、担当者、期限を入力します。</li><li>TODOを1行に1件ずつ入力します。</li><li>生成されたリストをコピーして使います。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
