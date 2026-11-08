import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { fetchPublishedProjects } from "@/lib/api/projects";
import { fetchPublishedNews } from "@/lib/api/news";
import { servicesData } from "@/app/(home)/services/_sections/services-data";

// Projects and news come from the API, so the sitemap must reflect the live data
export const dynamic = "force-dynamic";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about-us", priority: 0.8 },
  { path: "/our-story", priority: 0.7 },
  { path: "/our-team", priority: 0.7 },
  { path: "/our-clients", priority: 0.7 },
  { path: "/why-redcon", priority: 0.6 },
  { path: "/ohas", priority: 0.5 },
  { path: "/ehs", priority: 0.5 },
  { path: "/services", priority: 0.9 },
  { path: "/projects", priority: 0.9 },
  { path: "/life-at-redcon", priority: 0.5 },
  { path: "/news-events", priority: 0.7 },
  { path: "/careers", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, news] = await Promise.all([fetchPublishedProjects(), fetchPublishedNews()]);
  const url = (path: string) => `${siteConfig.url}${path}`;

  return [
    ...staticRoutes.map(({ path, priority }) => ({ url: url(path), priority })),
    ...servicesData.map((s) => ({ url: url(`/services/${s.slug}`), priority: 0.8 })),
    ...projects.map((p) => ({ url: url(`/projects/${p.slug}`), lastModified: p.updatedAt, priority: 0.7 })),
    ...news.map((n) => ({ url: url(`/news-events/${n.slug}`), lastModified: n.updatedAt, priority: 0.6 })),
  ];
}
