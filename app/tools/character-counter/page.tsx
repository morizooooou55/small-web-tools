import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { CharacterCounter } from "@/components/tools/CharacterCounter";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "空白を除いた文字数も分かりますか？", answer: "はい。通常の文字数と空白を除いた文字数を両方表示します。" },
  { question: "原稿用紙換算はできますか？", answer: "はい。400字詰め原稿用紙のおおよその枚数を表示します。" },
  { question: "入力した文章は保存されますか？", answer: "保存されません。ログイン不要・DB不要のツールです。" },
];

const relatedTools = [
  { title: "文章整形ツール", description: "空白や改行を整えて読みやすくします。", href: "/tools/text-formatter", status: "available" as const },
  { title: "議事録テンプレート生成", description: "会議メモのテンプレートを作ります。", href: "/tools/meeting-minutes-template", status: "available" as const },
  { title: "文章要約プロンプト生成", description: "長文を要約するプロンプトを作ります。", href: "/tools/summary-prompt-generator", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "文字数カウント",
  slug: "character-counter",
  category: "text-conversion",
  description: "文章を貼り付けるだけで、文字数、空白なし文字数、行数、段落数、原稿用紙換算を確認できます。",
  h1: "文字数カウント",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは文字数の目安を表示するものです。提出先や媒体ごとの数え方と異なる場合があります。",
  metadata: {
    title: "文字数カウント｜空白なし・行数・原稿用紙換算も確認",
    description: "文章を貼り付けるだけで、文字数、空白なし文字数、行数、段落数、原稿用紙換算を確認できます。レポートや原稿の文字数確認に使えます。",
    alternates: { canonical: "/tools/character-counter" },
    openGraph: { title: "文字数カウント", description: "文字数、行数、原稿用紙換算を確認できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function CharacterCounterPage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "文章チェック"]} title={toolConfig.h1} />
        <CharacterCounter />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>文章を入力欄に貼り付けます。</li><li>文字数や行数を確認します。</li><li>必要に応じて結果をコピーします。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
