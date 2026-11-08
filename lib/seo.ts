import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

interface PageSeo {
  title: string; // without the site suffix; the root layout's title template adds " | REDCon"
  description: string;
  path: string; // e.g. "/about-us"
  image?: string; // absolute URL or site-relative path
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
}

/**
 * Builds a page's metadata. Next.js replaces (not merges) the parent's `openGraph` and
 * `twitter` objects, so every field a page needs is set here in one place.
 */
export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.ogImage,
  type = "website",
  publishedTime,
  noIndex,
}: PageSeo): Metadata {
  const shareTitle = `${title} | ${siteConfig.shortName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title: shareTitle,
      description,
      images: [{ url: image, alt: title }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}

/** Collapses whitespace and shortens text to a meta-description length. */
export function toDescription(text: string | null | undefined, fallback: string, max = 160) {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (!clean) return fallback;
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}
