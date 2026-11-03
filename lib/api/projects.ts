import axios from "axios";
import { axiosPrivate, axiosPublic } from "@/lib/axios";

export const API_URL = (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000").replace(/\/$/, "");

export type ProjectProgress = "Ongoing" | "Completed";
export type ProjectStatus = "DRAFT" | "PUBLISHED";

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  _count?: { projects: number };
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  client: string | null;
  location: string | null;
  projectStatus: ProjectProgress;
  startDate: string | null;
  endDate: string | null; // always null while Ongoing
  imageMain: string | null;
  stepImg1: string | null;
  stepImg2: string | null;
  stepImg3: string | null;
  steps: string[]; // 3 labels aligned with stepImg1..3
  description: string | null;
  scopeOfWork: string | null;
  engineeringHighlights: string | null;
  status: ProjectStatus;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedProjects {
  data: Project[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export type ProjectImageKey = "imageMain" | "stepImg1" | "stepImg2" | "stepImg3";
export const PROJECT_IMAGE_KEYS: ProjectImageKey[] = ["imageMain", "stepImg1", "stepImg2", "stepImg3"];

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export interface ProjectFormValues {
  title: string;
  slug: string;
  categoryId: string;
  client: string;
  location: string;
  projectStatus: ProjectProgress;
  startDate: string; // yyyy-mm-dd
  endDate: string; // yyyy-mm-dd or ""
  status: ProjectStatus;
  description: string;
  scopeOfWork: string;
  engineeringHighlights: string;
  steps: string[];
  // File = new upload, null = remove existing, undefined = leave unchanged
  images: Partial<Record<ProjectImageKey, File | null>>;
}

/** Resolves an API-relative upload path to a full URL. */
export const imageUrl = (path: string | null | undefined) =>
  path ? (path.startsWith("http") ? path : `${API_URL}${path}`) : null;

/** "2026-02-01T00:00:00.000Z" -> "01/02/2026" */
export const formatDate = (value: string | null) =>
  value ? new Date(value).toLocaleDateString("en-GB", { timeZone: "UTC" }) : null;

export const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    if (error.response?.status === 413) return "Image is too large (max 5MB).";
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join("\n");
    if (typeof message === "string" && message.trim()) return message;
    if (error.message) return error.message;
  }
  return error instanceof Error ? error.message : fallback;
};

/** Returns an error message if the file can't be uploaded, otherwise null. */
export const validateImageFile = (file: File) => {
  if (!file.type.startsWith("image/")) return `${file.name} is not an image file.`;
  if (file.size > MAX_IMAGE_SIZE) return `${file.name} is larger than 5MB.`;
  return null;
};

export const toFormData = (values: ProjectFormValues) => {
  const fd = new FormData();
  const { steps, images, ...fields } = values;

  Object.entries(fields).forEach(([key, val]) => fd.append(key, val.trim()));
  // Ongoing projects never have an end date
  if (values.projectStatus === "Ongoing") fd.set("endDate", "");

  [0, 1, 2].forEach((i) => fd.append("steps", (steps[i] || "").trim()));

  PROJECT_IMAGE_KEYS.forEach((key) => {
    const image = images[key];
    if (image) fd.append(key, image);
    else if (image === null) fd.append(key, "");
  });

  return fd;
};

// ---------- Public ----------

export const getProjects = async (page = 1, limit = 10) =>
  (await axiosPublic.get<PaginatedProjects>("/projects", { params: { page, limit } })).data;

export const getProjectBySlug = async (slug: string) =>
  (await axiosPublic.get<Project>(`/projects/slug/${encodeURIComponent(slug)}`)).data;

export const getCategories = async () =>
  (await axiosPublic.get<ProjectCategory[]>("/project-categories")).data;

// ---------- Admin (cookie auth) ----------

export const getProject = async (idOrSlug: string) =>
  (await axiosPrivate.get<Project>(`/projects/${encodeURIComponent(idOrSlug)}`)).data;

export const createProject = async (form: FormData) =>
  (await axiosPrivate.post<Project>("/projects", form)).data;

export const updateProject = async (id: string, form: FormData) =>
  (await axiosPrivate.patch<Project>(`/projects/${id}`, form)).data;

export const deleteProject = async (id: string) =>
  (await axiosPrivate.delete<{ success: true; message: string }>(`/projects/${id}`)).data;

// ---------- Server components ----------

/** Fetches every PUBLISHED project (oldest first), walking all pages via `meta`. */
export async function fetchPublishedProjects(): Promise<Project[]> {
  const all: Project[] = [];
  let page = 1;
  try {
    while (true) {
      const res = await fetch(`${API_URL}/projects?page=${page}&limit=100`, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { data, meta }: PaginatedProjects = await res.json();
      all.push(...data);
      if (!meta.hasNextPage) break;
      page++;
    }
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch projects:", error);
  }
  // API returns newest first; the public site lists projects in the order they were added
  return all
    .filter((p) => p.status === "PUBLISHED")
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

/** Returns null when the project doesn't exist or isn't published. */
export async function fetchPublishedProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/projects/slug/${encodeURIComponent(slug)}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch project:", error);
    return null;
  }
}
