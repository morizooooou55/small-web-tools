import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { FaqSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { ProratedFeeCalculator } from "@/components/tools/ProratedFeeCalculator";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";

const faqItems = [
  {
    question: "日割り計算の式は何ですか？",
    answer: "このツールでは「月額料金 ÷ 対象月の日数 × 対象日数」で計算します。",
  },
  {
    question: "開始日と終了日は日数に含まれますか？",
    answer: "はい。開始日と終了日の両方を含めて計算します。",
  },
  {
    question: "家賃の日割り計算にも使えますか？",
    answer:
      "目安計算には使えます。ただし契約内容、管理会社のルール、締め日によって実際の金額が異なる場合があります。",
  },
  {
    question: "2月やうるう年にも対応していますか？",
    answer: "はい。対象月の日数をもとに計算するため、28日、29日、30日、31日の月に対応します。",
  },
  {
    question: "複数月にまたがる日割り計算はできますか？",
    answer: "MVPでは同じ月内の日割り計算のみ対応しています。複数月またぎは今後の追加候補です。",
  },
];

const relatedTools = [
  {
    title: "サブスク総額チェック",
    description: "月額・年額のサブスク料金をまとめて見える化します。",
    href: "/tools/subscription-total-checker",
    status: "available" as const,
  },
  {
    title: "食費予算計算ツール",
    description: "残り日数から、1日に使える食費の目安を計算します。",
    href: "/tools/food-budget-calculator",
    status: "planned" as const,
  },
  {
    title: "貯金目標逆算ツール",
    description: "目標金額と期限から、毎月必要な貯金額を逆算します。",
    href: "/tools/savings-goal-calculator",
    status: "planned" as const,
  },
];

export const metadata: Metadata = {
  title: "日割り計算ツール｜家賃・サブスク・月額料金をかんたん計算",
  description:
    "月額料金、対象月、開始日、終了日を入力するだけで、日割り金額を自動計算します。家賃、通信費、サブスク料金の目安確認に使える無料ツールです。",
  alternates: {
    canonical: "/tools/prorated-fee-calculator",
  },
  openGraph: {
    title: "日割り計算ツール",
    description: "家賃・サブスク・月額料金の日割り金額をかんたん計算できます。",
    type: "website",
  },
};

export default function ProratedFeeCalculatorPage() {
  const jsonLd = buildFaqJsonLd(faqItems);

  return (
    <ToolPageLayout>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <ToolHero
          description="月額料金、対象月、開始日、終了日を入力すると、家賃・通信費・サブスクなどの目安となる日割り金額を計算できます。"
          tags={["ログイン不要", "DB不要", "家賃・通信費・サブスク対応"]}
          title="日割り計算ツール"
        />
        <ProratedFeeCalculator />
        <AdPlaceholder label="広告枠（準備中）" />

        <InfoSection title="使い方">
          <ol className="list-decimal space-y-2 pl-5">
            <li>月額料金と対象月を入力します。</li>
            <li>開始日と終了日を選び、端数処理を指定します。</li>
            <li>表示された日割り金額と計算式を確認し、必要に応じてコピーします。</li>
          </ol>
        </InfoSection>

        <InfoSection title="注意書き">
          <p>
            このツールの結果は目安です。契約内容、税、締め日、管理会社やサービスごとの規約により、実際の請求額と異なる場合があります。
          </p>
        </InfoSection>

        <InfoSection title="固定費の見直しメモ">
          <p>
            月額料金を日割りで確認したあとは、毎月続く固定費も一緒に見直すと効果が出やすくなります。家計管理テンプレートや通信費の比較など、関連する導線を今後追加できます。
          </p>
        </InfoSection>

        <FaqSection items={faqItems} />
        <RelatedTools tools={relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
