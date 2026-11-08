import { axiosPrivate } from "@/lib/axios";
import { API_URL } from "@/lib/api/projects";

// Keep in sync with JOB_DEPARTMENTS in the backend (src/jobs/dto/create-job.dto.ts)
export const departments = [
  "Engineering",
  "Administration",
  "Procurement",
  "Finance and Accounts",
  "Surveyor",
  "Office Assistants",
] as const;

export type Department = (typeof departments)[number];

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

export interface Job {
  id: string;
  title: string;
  department: Department;
  location: string;
  type: string;
  deadline: string | null; // ISO string
  applyUrl: string; // link or mailto:
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobFormValues {
  title: string;
  department: Department;
  location: string;
  type: string;
  deadline: string; // yyyy-mm-dd or ""
  applyUrl: string;
  isPublished: boolean;
}

export const formatDeadline = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric" }) : null;

/** Only http(s) and mailto links are allowed, so a bad value can't become a javascript: link. */
export const isValidApplyUrl = (value: string) => /^(https?:\/\/|mailto:)\S+$/i.test(value.trim());

const toPayload = (v: JobFormValues) => ({
  title: v.title.trim(),
  department: v.department,
  location: v.location.trim(),
  type: v.type.trim(),
  deadline: v.deadline,
  applyUrl: v.applyUrl.trim(),
  isPublished: String(v.isPublished),
});

// ---------- Admin (cookie auth) ----------

export const getAdminJobs = async () =>
  (await axiosPrivate.get<Job[]>("/jobs/admin")).data;

export const createJob = async (values: JobFormValues) =>
  (await axiosPrivate.post<Job>("/jobs", toPayload(values))).data;

export const updateJob = async (id: string, values: JobFormValues) =>
  (await axiosPrivate.patch<Job>(`/jobs/${id}`, toPayload(values))).data;

export const deleteJob = async (id: string) =>
  (await axiosPrivate.delete<{ success: true; message: string }>(`/jobs/${id}`)).data;

// ---------- Server components ----------

/** Published jobs, newest first. Returns [] when the request fails. */
export async function fetchPublishedJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_URL}/jobs`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch jobs:", error);
    return [];
  }
}
