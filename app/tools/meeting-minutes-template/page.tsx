import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { FaqSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { MeetingMinutesTemplateGenerator } from "@/components/tools/MeetingMinutesTemplateGenerator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";

const faqItems = [
  {
    question: "議事録には何を書けばいいですか？",
    answer:
      "日時、参加者、目的、議題、議論内容、決定事項、TODO、次回確認事項を残すと、あとから内容を確認しやすくなります。",
  },
  {
    question: "このテンプレートは仕事以外でも使えますか？",
    answer:
      "はい。授業・ゼミ、サークル、チーム活動、面談、プロジェクトの記録にも使えます。",
  },
  {
    question: "生成した議事録テンプレートはNotionやGoogle Docsで使えますか？",
    answer:
      "はい。Markdown形式のテキストとしてコピーできるため、Notion、Google Docs、Word、ChatGPTなどに貼り付けて編集できます。",
  },
];

const relatedTools = [
  {
    title: "文字数カウント",
    description: "議事録や会議メモの文字数を確認します。",
    href: "/tools/character-counter",
    status: "available" as const,
  },
  {
    title: "TODOリストテンプレート生成",
    description: "担当者と期限を整理しやすいTODOリストを作ります。",
    href: "/tools/todo-list-template",
    status: "available" as const,
  },
  {
    title: "会議アジェンダテンプレート生成",
    description: "会議前に共有しやすいアジェンダの型を作ります。",
    href: "/tools/meeting-agenda-template",
    status: "available" as const,
  },
  {
    title: "文章要約プロンプト生成",
    description: "会議メモや長文を要約するときのプロンプトを作ります。",
    href: "/tools/summary-prompt-generator",
    status: "available" as const,
  },
];

export const metadata: Metadata = {
  title: "議事録テンプレート生成ツール｜コピペで使える会議メモ作成",
  description:
    "会議名、参加者、会議の種類を入力するだけで、Markdown形式の議事録テンプレートを作成できます。定例会、打ち合わせ、ゼミ、サークル、面談の記録に使えます。",
  alternates: {
    canonical: "/tools/meeting-minutes-template",
  },
  openGraph: {
    title: "議事録テンプレート生成ツール",
    description:
      "会議名、参加者、会議の種類を入力するだけで、Markdown形式の議事録テンプレートを作成できます。",
    type: "website",
  },
};

export default function MeetingMinutesTemplatePage() {
  const jsonLd = buildFaqJsonLd(faqItems);

  return (
    <ToolPageLayout>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <ToolHero
          description="会議名、日付、参加者を入力するだけで、Word、Google Docs、Notion、ChatGPTに貼り付けやすいMarkdown形式の議事録テンプレートを作成できます。"
          tags={["ログイン不要", "DB不要", "Markdown出力"]}
          title="議事録テンプレート生成ツール"
        />
        <MeetingMinutesTemplateGenerator />
        <AdPlaceholder label="広告枠（準備中）" />

        <InfoSection title="使い方">
          <ol className="list-decimal space-y-2 pl-5">
            <li>会議名、日付、参加者を入力します。</li>
            <li>会議の種類と出力形式を選びます。</li>
            <li>生成されたMarkdownテンプレートをコピーし、必要な内容を追記します。</li>
          </ol>
        </InfoSection>

        <InfoSection title="注意書き">
          <p>
            このツールは議事録のテンプレートを作成するためのものです。実際の会議内容、決定事項、参加者名、期限などは利用者自身で確認・編集してください。機密情報や個人情報を入力する場合は取り扱いに注意してください。
          </p>
        </InfoSection>

        <InfoSection title="活用メモ">
          <p>
            会議前は議題だけを入れたメモとして使い、会議後に議論内容、決定事項、TODOを追記すると整理しやすくなります。ChatGPTに貼り付けて要約や整形を依頼する下書きとしても使えます。
          </p>
        </InfoSection>

        <FaqSection items={faqItems} />
        <RelatedTools tools={relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
