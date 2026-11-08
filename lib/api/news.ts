import { axiosPrivate } from "@/lib/axios";
import { API_URL } from "@/lib/api/projects";

export type NewsCategory = "News" | "Event";
export const NEWS_CATEGORIES: NewsCategory[] = ["News", "Event"];

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO string
  category: NewsCategory;
  image: string | null; // API-relative upload path
  content: string; // paragraphs separated by a blank line
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NewsFormValues {
  title: string;
  slug: string;
  date: string; // yyyy-mm-dd
  category: NewsCategory;
  content: string;
  isPublished: boolean;
  // File = new upload, null = remove existing, undefined = leave unchanged
  image?: File | null;
}

export const newsParagraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const formatNewsDate = (iso: string) => {
  const d = new Date(iso);
  const opts = { timeZone: "UTC" } as const;
  return {
    day: Number(d.toLocaleDateString("en-GB", { ...opts, day: "numeric" })),
    monthYear: d.toLocaleDateString("en-GB", { ...opts, month: "short", year: "numeric" }),
    full: d.toLocaleDateString("en-GB", { ...opts, day: "numeric", month: "long", year: "numeric" }),
  };
};

export const newsToFormData = (values: NewsFormValues) => {
  const fd = new FormData();
  fd.append("title", values.title.trim());
  fd.append("slug", values.slug.trim());
  fd.append("date", values.date);
  fd.append("category", values.category);
  fd.append("content", values.content.trim());
  fd.append("isPublished", String(values.isPublished));
  if (values.image) fd.append("image", values.image);
  else if (values.image === null) fd.append("image", "");
  return fd;
};

// ---------- Admin (cookie auth) ----------

export const getAdminNews = async () =>
  (await axiosPrivate.get<NewsItem[]>("/news/admin")).data;

export const createNews = async (form: FormData) =>
  (await axiosPrivate.post<NewsItem>("/news", form)).data;

export const updateNews = async (id: string, form: FormData) =>
  (await axiosPrivate.patch<NewsItem>(`/news/${id}`, form)).data;

export const deleteNews = async (id: string) =>
  (await axiosPrivate.delete<{ success: true; message: string }>(`/news/${id}`)).data;

// ---------- Server components ----------

/** Published items, newest first. Returns [] when the request fails. */
export async function fetchPublishedNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(`${API_URL}/news`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch news:", error);
    return [];
  }
}

/** Returns null when the item doesn't exist or isn't published. */
export async function fetchPublishedNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const res = await fetch(`${API_URL}/news/slug/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch news item:", error);
    return null;
  }
}
