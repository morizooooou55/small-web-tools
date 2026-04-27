import type { Metadata } from "next";
import type { RelatedTool } from "@/components/tools/RelatedTools";
import type { FaqItem } from "./seo";

export type ToolCategory =
  | "student-work"
  | "life-money"
  | "text-conversion"
  | "developer"
  | "productivity";

export type ToolConfig = {
  title: string;
  slug: string;
  category: ToolCategory;
  description: string;
  h1: string;
  faq: FaqItem[];
  relatedTools: RelatedTool[];
  disclaimer: string;
  metadata: Metadata;
};

export function getToolPath(slug: string) {
  return `/tools/${slug}`;
}
