import type { MetadataRoute } from "next";

import { canonicalUrl } from "@/utils/site";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, canonicalUrl(locale)])
  );

  return routing.locales.map((locale) => ({
    url: canonicalUrl(locale),
    lastModified,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages,
    },
  }));
}
