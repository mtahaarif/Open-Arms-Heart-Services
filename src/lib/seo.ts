import type { Metadata } from "next";
import { site } from "./site";

export const TITLE_SUFFIX = ` | ${site.shortName}`;

/**
 * Per-page metadata with a self-referencing canonical, and Open Graph / Twitter
 * tags that carry the page's own title, description and URL.
 * Keep `title` ≤ 31 chars (so title + suffix ≤ 60) and `description` ≤ 155 chars.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}${TITLE_SUFFIX}`;

  if (process.env.NODE_ENV !== "production") {
    if (fullTitle.length > 60) console.warn(`[seo] title > 60 chars (${fullTitle.length}): ${fullTitle}`);
    if (description.length > 160) console.warn(`[seo] description > 160 chars (${description.length}): ${path}`);
  }

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
