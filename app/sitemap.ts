import type { MetadataRoute } from "next";
import { toolCatalog } from "@/lib/tools/catalog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tools",
    "/categories/life-money",
    "/categories/productivity",
    "/categories/text-conversion",
    "/privacy-policy",
    "/usage-notes",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
    })),
    ...toolCatalog.map((tool) => ({
      url: `${siteUrl}/tools/${tool.slug}`,
      lastModified: new Date(),
    })),
  ];
}
