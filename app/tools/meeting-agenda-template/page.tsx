import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { MeetingAgendaTemplateGenerator } from "@/components/tools/MeetingAgendaTemplateGenerator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "会議アジェンダには何を書けばいいですか？", answer: "目的、参加者、議題、決めたいこと、確認事項、次のアクションを入れると共有しやすくなります。" },
  { question: "会議前に共有できますか？", answer: "はい。Markdown形式なので、メール、Notion、Google Docs、チャットに貼り付けて使えます。" },
  { question: "学生のゼミやサークルにも使えますか？", answer: "使えます。授業・ゼミ、サークル、チーム活動の事前共有にも向いています。" },
];

const relatedTools = [
  { title: "議事録テンプレート生成", description: "会議後に残す議事録テンプレートを作ります。", href: "/tools/meeting-minutes-template", status: "available" as const },
  { title: "TODOリストテンプレート生成", description: "会議後のアクションを整理します。", href: "/tools/todo-list-template", status: "available" as const },
  { title: "文章要約プロンプト生成", description: "会議メモを要約するプロンプトを作ります。", href: "/tools/summary-prompt-generator", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "会議アジェンダテンプレート生成",
  slug: "meeting-agenda-template",
  category: "productivity",
  description: "会議名、目的、参加者を入力するだけで、会議前に共有しやすいアジェンダを作成できます。",
  h1: "会議アジェンダテンプレート生成",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは会議アジェンダのテンプレートを作成するためのものです。実際の議題や参加者、時間配分は利用者自身で確認・編集してください。",
  metadata: {
    title: "会議アジェンダテンプレート生成｜コピペで使える会議準備メモ",
    description: "会議名、目的、参加者を入力するだけで、Markdown形式の会議アジェンダを作成できます。定例会、打ち合わせ、ゼミの事前共有に使えます。",
    alternates: { canonical: "/tools/meeting-agenda-template" },
    openGraph: { title: "会議アジェンダテンプレート生成", description: "会議前に共有しやすいアジェンダを作成できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function MeetingAgendaTemplatePage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "Markdown出力"]} title={toolConfig.h1} />
        <MeetingAgendaTemplateGenerator />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>会議名、日付、参加者を入力します。</li><li>目的と事前共有メモを入力します。</li><li>生成されたアジェンダをコピーして共有します。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
