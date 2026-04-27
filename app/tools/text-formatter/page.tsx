import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { Disclaimer } from "@/components/tools/Disclaimer";
import { FAQSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { TextFormatter } from "@/components/tools/TextFormatter";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";
import type { ToolConfig } from "@/lib/tools/toolConfig";

const faqItems = [
  { question: "どんな整形ができますか？", answer: "行頭・行末の空白削除、空行削除、改行削除、連続スペースの整理ができます。" },
  { question: "SNS投稿文にも使えますか？", answer: "はい。コピーした文章の余計な改行や空白を整える用途に使えます。" },
  { question: "入力した文章は外部送信されますか？", answer: "送信されません。ブラウザ上で整形するだけのツールです。" },
];

const relatedTools = [
  { title: "文字数カウント", description: "整形後の文字数を確認します。", href: "/tools/character-counter", status: "available" as const },
  { title: "文章要約プロンプト生成", description: "整えた文章を要約するプロンプトを作ります。", href: "/tools/summary-prompt-generator", status: "available" as const },
  { title: "議事録テンプレート生成", description: "会議メモのテンプレートを作ります。", href: "/tools/meeting-minutes-template", status: "available" as const },
];

const toolConfig: ToolConfig = {
  title: "文章整形ツール",
  slug: "text-formatter",
  category: "text-conversion",
  description: "文章の余計な空白、空行、改行を整えて、コピーしやすいテキストに変換できます。",
  h1: "文章整形ツール",
  faq: faqItems,
  relatedTools,
  disclaimer: "このツールは文章の見た目を整えるためのものです。整形後の内容に誤りがないか、利用者自身で確認してください。",
  metadata: {
    title: "文章整形ツール｜空白・空行・改行をかんたん整理",
    description: "文章の余計な空白、空行、改行を整えて、コピーしやすいテキストに変換できます。SNS投稿、メール、議事録の整形に使えます。",
    alternates: { canonical: "/tools/text-formatter" },
    openGraph: { title: "文章整形ツール", description: "空白・空行・改行を整理できます。", type: "website" },
  },
};

export const metadata: Metadata = toolConfig.metadata;

export default function TextFormatterPage() {
  const jsonLd = buildFaqJsonLd(toolConfig.faq);
  return (
    <ToolPageLayout>
      <script dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} type="application/ld+json" />
      <main>
        <ToolHero description={toolConfig.description} tags={["ログイン不要", "DB不要", "文章変換"]} title={toolConfig.h1} />
        <TextFormatter />
        <AdPlaceholder label="広告枠（準備中）" />
        <InfoSection title="使い方"><ol className="list-decimal space-y-2 pl-5"><li>整形方法を選びます。</li><li>文章を入力欄に貼り付けます。</li><li>整形後の文章をコピーします。</li></ol></InfoSection>
        <Disclaimer>{toolConfig.disclaimer}</Disclaimer>
        <FAQSection items={toolConfig.faq} />
        <RelatedTools tools={toolConfig.relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
