import axios from "axios";
import { axiosPrivate, axiosPublic } from "@/lib/axios";
import { API_URL, getErrorMessage } from "@/lib/api/projects";

/** Home page impact stats. Exactly 6: orders 1-3 sit left of the map, 4-6 right. */
export type Stat = {
  id: string;
  order: number;
  value: number;
  suffix: string;
  label: string;
};

/** The body of PUT /stats rejects unknown fields, so `id` must not be sent. */
export type StatInput = Omit<Stat, "id">;

export const STAT_SUFFIXES = ["", "+", "%", "K+"];
export const MAX_STAT_VALUE = 999999;
export const MAX_STAT_LABEL_LENGTH = 40;
export const STAT_ORDERS = [1, 2, 3, 4, 5, 6];

export const getStats = async () =>
  (await axiosPublic.get<Stat[]>("/stats")).data;

export const updateStats = async (stats: StatInput[]) =>
  (await axiosPrivate.put<Stat[]>("/stats", { stats })).data;

export const getSaveStatsErrorMessage = (error: unknown) => {
  const status = axios.isAxiosError(error) ? error.response?.status : undefined;
  const fallback = "Couldn't save the stats. Your changes are still here, so please try again.";

  if (status === 400) return getErrorMessage(error, fallback);
  if (status === 401) return "Your session has expired. Please log in again.";
  if (status === 403) return "You don't have permission to edit the stats.";
  return fallback;
};

// ---------- Server components ----------

/** Returns [] when the request fails, so the homepage renders without the numbers. */
export async function fetchStats(): Promise<Stat[]> {
  try {
    const res = await fetch(`${API_URL}/stats`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const stats: Stat[] = await res.json();
    return stats.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("[Server Fetch Error] Failed to fetch stats:", error);
    return [];
  }
}
