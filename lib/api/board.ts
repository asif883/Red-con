import { axiosPrivate } from "@/lib/axios";
import { API_URL } from "@/lib/api/projects";

/** Row as stored by the API. */
export interface BoardMemberRecord {
  id: string;
  name: string;
  role: string;
  image: string | null; // "/uploads/..." (API) or "/images/..." (frontend public)
  bio: string; // paragraphs separated by a blank line
  order: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Shape the public Board of Directors section renders. */
export interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageSrc?: string;
  bio: string[];
}

export interface BoardFormValues {
  name: string;
  role: string;
  bio: string;
  order: string; // empty = add to the end
  isPublished: boolean;
  // File = new upload, null = remove existing, undefined = leave unchanged
  image?: File | null;
}

export const bioParagraphs = (bio: string) =>
  bio
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

/** Uploads live on the API; anything else ("/images/...") is a frontend asset. */
export const boardImageSrc = (path: string | null | undefined) => {
  if (!path) return undefined;
  if (path.startsWith("http")) return path;
  return path.startsWith("/uploads") ? `${API_URL}${path}` : path;
};

export const toBoardMember = (record: BoardMemberRecord): BoardMember => ({
  id: record.id,
  name: record.name,
  role: record.role,
  imageSrc: boardImageSrc(record.image),
  bio: bioParagraphs(record.bio),
});

export const boardToFormData = (values: BoardFormValues) => {
  const fd = new FormData();
  fd.append("name", values.name.trim());
  fd.append("role", values.role.trim());
  fd.append("bio", values.bio.trim());
  if (values.order.trim() !== "") fd.append("order", values.order.trim());
  fd.append("isPublished", String(values.isPublished));
  if (values.image) fd.append("image", values.image);
  else if (values.image === null) fd.append("image", "");
  return fd;
};

// ---------- Admin (cookie auth) ----------

export const getAdminBoard = async () =>
  (await axiosPrivate.get<BoardMemberRecord[]>("/board/admin")).data;

export const createBoardMember = async (form: FormData) =>
  (await axiosPrivate.post<BoardMemberRecord>("/board", form)).data;

export const updateBoardMember = async (id: string, form: FormData) =>
  (await axiosPrivate.patch<BoardMemberRecord>(`/board/${id}`, form)).data;

export const deleteBoardMember = async (id: string) =>
  (await axiosPrivate.delete<{ success: true; message: string }>(`/board/${id}`)).data;

// ---------- Server components ----------

/** Published members in display order. Returns [] when the request fails. */
export async function fetchBoardMembers(): Promise<BoardMember[]> {
  try {
    const res = await fetch(`${API_URL}/board`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const records: BoardMemberRecord[] = await res.json();
    return records.map(toBoardMember);
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch board members:", error);
    return [];
  }
}
