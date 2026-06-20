import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/constants";

// Public routes worth indexing (news is stubbed; admin/api excluded).
const ROUTES = [
  "",
  "/about",
  "/projects",
  "/impact",
  "/donate",
  "/volunteer",
  "/partners",
  "/contact",
  "/shop",
  "/legal",
  "/privacy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route}`,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/donate" ? 0.9 : 0.7,
      });
    }
  }
  return entries;
}
