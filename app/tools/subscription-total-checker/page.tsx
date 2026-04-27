import type { Metadata } from "next";
import { AdPlaceholder } from "@/components/tools/AdPlaceholder";
import { FaqSection } from "@/components/tools/FaqSection";
import { InfoSection } from "@/components/tools/InfoSection";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { SubscriptionTotalChecker } from "@/components/tools/SubscriptionTotalChecker";
import { ToolHero } from "@/components/tools/ToolHero";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { buildFaqJsonLd } from "@/lib/tools/seo";

const faqItems = [
  {
    question: "入力した内容は保存されますか？",
    answer: "保存されません。ログイン不要・DB不要のツールなので、ページを閉じると入力内容は消えます。",
  },
  {
    question: "年額払いにも対応していますか？",
    answer: "はい。年額を12で割って月額換算し、月額合計と年額合計に反映します。",
  },
  {
    question: "週額払いはどのように計算しますか？",
    answer: "週額は「週額 × 52 ÷ 12」で月額換算します。目安として確認してください。",
  },
  {
    question: "解約すべきか判断してくれますか？",
    answer: "判断はしません。金額、利用頻度、解約候補の合計を見える化するためのツールです。",
  },
];

const relatedTools = [
  {
    title: "日割り計算ツール",
    description: "月額料金の途中開始・途中解約時の日割り金額を計算します。",
    href: "/tools/prorated-fee-calculator",
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
  title: "サブスク総額チェックツール｜月額・年額の固定費を見える化",
  description:
    "利用中のサブスク料金を入力するだけで、月額合計・年額合計・解約候補の削減目安を自動計算できます。固定費の見直しに使える無料ツールです。",
  alternates: {
    canonical: "/tools/subscription-total-checker",
  },
  openGraph: {
    title: "サブスク総額チェックツール",
    description: "月額・年額のサブスク料金をまとめて見える化できます。",
    type: "website",
  },
};

export default function SubscriptionTotalCheckerPage() {
  const jsonLd = buildFaqJsonLd(faqItems);

  return (
    <ToolPageLayout>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <main>
        <ToolHero
          description="利用中のサブスク料金を入力すると、月額合計・年額合計・解約候補の削減目安をまとめて確認できます。"
          tags={["ログイン不要", "DB不要", "固定費チェック"]}
          title="サブスク総額チェックツール"
        />
        <SubscriptionTotalChecker />
        <AdPlaceholder label="広告枠（準備中）" />

        <InfoSection title="使い方">
          <ol className="list-decimal space-y-2 pl-5">
            <li>使っているサブスクのサービス名と料金を入力します。</li>
            <li>月額・年額・週額から支払い周期を選びます。</li>
            <li>解約候補にしたいものへチェックを入れ、合計金額を確認します。</li>
          </ol>
        </InfoSection>

        <InfoSection title="注意書き">
          <p>
            このツールの結果は目安です。実際の請求額は、税、為替、キャンペーン、アプリストア経由の手数料、日割りなどで変わる場合があります。
          </p>
        </InfoSection>

        <InfoSection title="固定費の見直しメモ">
          <p>
            月額では小さく見えるサブスクも、年額にすると負担が見えやすくなります。使う頻度が低いものから順に確認すると、無理なく固定費を整理しやすくなります。
          </p>
        </InfoSection>

        <FaqSection items={faqItems} />
        <RelatedTools tools={relatedTools} />
      </main>
    </ToolPageLayout>
  );
}
