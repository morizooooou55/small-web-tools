import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { SummaryPromptGenerator } from "@/components/tools/SummaryPromptGenerator";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "AI API連携はしていますか？", answer: "していません。プロンプト文を作るだけで、入力内容を外部送信しません。" },
  { question: "どんな文章に使えますか？", answer: "会議メモ、レポート、長文メール、記事メモなどの要約依頼文づくりに使えます。" },
  { question: "生成したプロンプトはどこで使えますか？", answer: "ChatGPTなどの文章生成ツールに貼り付けて使えます。" },
];

const relatedTools = [
  { title: "文字数カウント", description: "要約前後の文字数を確認します。", href: "/tools/character-counter", status: "available" as const },
  { title: "文章整形ツール", description: "要約前の文章を整えます。", href: "/tools/text-formatter", status: "available" as const },
  { title: "議事録テンプレート生成", description: "会議メモの型を作ります。", href: "/tools/meeting-minutes-template", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "文章要約プロンプト生成",
  slug: "summary-prompt-generator",
  category: "text-conversion",
  description: "要約の目的と元の文章を入力するだけで、ChatGPTなどに貼り付けやすい要約プロンプトを作成できます。",
  h1: "文章要約プロンプト生成",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは要約用プロンプトを作成するためのものです。AIの出力結果は利用者自身で確認し、機密情報や個人情報の取り扱いに注意してください。",
  metadata: {
    title: "文章要約プロンプト生成｜ChatGPTに貼れる要約依頼文を作成",
    description: "要約の目的と元の文章を入力するだけで、ChatGPTなどに貼り付けやすい要約プロンプトを作成できます。会議メモや長文整理に使えます。",
    alternates: { canonical: "/tools/summary-prompt-generator" },
    openGraph: { title: "文章要約プロンプト生成", description: "ChatGPTなどに貼れる要約プロンプトを作成できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function SummaryPromptGeneratorPage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "AI API連携なし"]} title={toolConfig.h1} />
        <SummaryPromptGenerator />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>要約の目的を入力します。</li><li>対象読者、長さ、形式を選びます。</li><li>生成されたプロンプトをコピーして使います。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
