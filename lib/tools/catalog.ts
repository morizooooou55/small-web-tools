import type { ToolCategory } from "./toolConfig";

export type ToolCatalogItem = {
  title: string;
  slug: string;
  category: ToolCategory;
  categoryLabel: string;
  description: string;
};

export const toolCatalog: ToolCatalogItem[] = [
  {
    title: "日割り計算ツール",
    slug: "prorated-fee-calculator",
    category: "life-money",
    categoryLabel: "家計・生活",
    description: "月額料金の途中開始・途中解約時の日割り金額を計算します。",
  },
  {
    title: "サブスク総額チェック",
    slug: "subscription-total-checker",
    category: "life-money",
    categoryLabel: "家計・生活",
    description: "月額・年額のサブスク料金をまとめて見える化します。",
  },
  {
    title: "議事録テンプレート生成",
    slug: "meeting-minutes-template",
    category: "productivity",
    categoryLabel: "仕事効率化",
    description: "Markdown形式の議事録テンプレートを作成します。",
  },
  {
    title: "会議アジェンダテンプレート生成",
    slug: "meeting-agenda-template",
    category: "productivity",
    categoryLabel: "仕事効率化",
    description: "会議前に共有しやすいアジェンダを作成します。",
  },
  {
    title: "TODOリストテンプレート生成",
    slug: "todo-list-template",
    category: "productivity",
    categoryLabel: "仕事効率化",
    description: "担当者と期限を整理できるTODOリストを作成します。",
  },
  {
    title: "日報テンプレート生成",
    slug: "daily-report-template",
    category: "productivity",
    categoryLabel: "仕事効率化",
    description: "コピーして使える日報テンプレートを作成します。",
  },
  {
    title: "週報テンプレート生成",
    slug: "weekly-report-template",
    category: "productivity",
    categoryLabel: "仕事効率化",
    description: "1週間の成果と来週の予定を整理します。",
  },
  {
    title: "文字数カウント",
    slug: "character-counter",
    category: "text-conversion",
    categoryLabel: "文章・変換",
    description: "文字数、行数、段落数、原稿用紙換算を確認します。",
  },
  {
    title: "文章整形ツール",
    slug: "text-formatter",
    category: "text-conversion",
    categoryLabel: "文章・変換",
    description: "空白、空行、改行を整えてコピーしやすくします。",
  },
  {
    title: "文章要約プロンプト生成",
    slug: "summary-prompt-generator",
    category: "text-conversion",
    categoryLabel: "文章・変換",
    description: "ChatGPTなどに貼り付ける要約プロンプトを作成します。",
  },
];

export function getToolsByCategory(category: ToolCategory) {
  return toolCatalog.filter((tool) => tool.category === category);
}

export function getToolHref(slug: string) {
  return `/tools/${slug}`;
}
