import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { WeeklyReportTemplateGenerator } from "@/components/tools/WeeklyReportTemplateGenerator";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "週報には何を書けばいいですか？", answer: "今週の成果、進行中のタスク、課題、来週やることを書くと状況が伝わりやすくなります。" },
  { question: "日報との違いは何ですか？", answer: "日報は1日の作業、週報は1週間の成果や課題、来週の予定をまとめる用途に向いています。" },
  { question: "チーム共有にも使えますか？", answer: "はい。Markdown形式なので、チャットやドキュメントに貼り付けて共有できます。" },
];

const relatedTools = [
  { title: "日報テンプレート生成", description: "1日の作業と明日の予定を整理します。", href: "/tools/daily-report-template", status: "available" as const },
  { title: "TODOリストテンプレート生成", description: "来週のタスクをTODOにできます。", href: "/tools/todo-list-template", status: "available" as const },
  { title: "文章要約プロンプト生成", description: "週報の下書きを要約するプロンプトを作ります。", href: "/tools/summary-prompt-generator", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "週報テンプレート生成",
  slug: "weekly-report-template",
  category: "productivity",
  description: "今週の成果、課題、来週やることを入力するだけで、コピーして使える週報テンプレートを作成できます。",
  h1: "週報テンプレート生成",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは週報テンプレートを作成するためのものです。実際の成果、課題、予定は利用者自身で確認・編集してください。",
  metadata: {
    title: "週報テンプレート生成｜コピペで使える業務報告フォーマット",
    description: "今週の成果、進行中のタスク、課題、来週やることを入力するだけで、Markdown形式の週報テンプレートを作成できます。",
    alternates: { canonical: "/tools/weekly-report-template" },
    openGraph: { title: "週報テンプレート生成", description: "コピーして使える週報テンプレートを作成できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function WeeklyReportTemplatePage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "Markdown出力"]} title={toolConfig.h1} />
        <WeeklyReportTemplateGenerator />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>名前と対象週を入力します。</li><li>今週の成果と来週やることを入力します。</li><li>生成された週報をコピーして共有します。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
