import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { DailyReportTemplateGenerator } from "@/components/tools/DailyReportTemplateGenerator";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "日報には何を書けばいいですか？", answer: "今日やったこと、成果、困っていること、明日やることを書くと伝わりやすくなります。" },
  { question: "短い日報にも使えますか？", answer: "はい。必要な項目だけ残して、不要な行は削除して使えます。" },
  { question: "学生の活動記録にも使えますか？", answer: "使えます。ゼミ、研究、サークル、インターンの活動記録にも向いています。" },
];

const relatedTools = [
  { title: "週報テンプレート生成", description: "1週間の成果と来週の予定を整理します。", href: "/tools/weekly-report-template", status: "available" as const },
  { title: "TODOリストテンプレート生成", description: "明日のタスクをTODOにできます。", href: "/tools/todo-list-template", status: "available" as const },
  { title: "文字数カウント", description: "日報の文字数を確認できます。", href: "/tools/character-counter", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "日報テンプレート生成",
  slug: "daily-report-template",
  category: "productivity",
  description: "名前、日付、今日やったことを入力するだけで、コピーして使える日報テンプレートを作成できます。",
  h1: "日報テンプレート生成",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは日報テンプレートを作成するためのものです。実際の作業内容、成果、課題は利用者自身で確認・編集してください。",
  metadata: {
    title: "日報テンプレート生成｜コピペで使える業務報告フォーマット",
    description: "名前、日付、今日やったこと、明日やることを入力するだけで、Markdown形式の日報テンプレートを作成できます。",
    alternates: { canonical: "/tools/daily-report-template" },
    openGraph: { title: "日報テンプレート生成", description: "コピーして使える日報テンプレートを作成できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function DailyReportTemplatePage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "Markdown出力"]} title={toolConfig.h1} />
        <DailyReportTemplateGenerator />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>名前と日付を入力します。</li><li>今日やったことと明日やることを入力します。</li><li>生成された日報をコピーして提出先に貼り付けます。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
