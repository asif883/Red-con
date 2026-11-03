import { create } from "zustand";
import axios from "axios";
import { axiosPrivate } from "@/lib/axios";

const getProjectErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError<{ message?: unknown }>(error)) {
    const message = error.response?.data?.message;
    if (typeof message === "string" && message.trim()) return message;
    if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
      return message.join(", ");
    }
    if (error.message) return error.message;
  }

  return error instanceof Error ? error.message : fallback;
};

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
  tags: string[];
  description: string | null;
  metric1Title: string | null;
  metric1Value: string | null;
  metric2Title: string | null;
  metric2Value: string | null;
  thumbnail: string | null;
  gallery: string[];
  status: "DRAFT" | "PUBLISHED";
  categoryId: string;
  category?: ProjectCategory;
  createdAt: string;
}

interface ProjectState {
  projects: Project[];
  categories: ProjectCategory[];
  isLoading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  createCategory: (
    name: string,
  ) => Promise<{ success: boolean; data?: ProjectCategory }>;
  updateCategory: (id: string, name: string) => Promise<{ success: boolean }>;
  deleteCategory: (id: string) => Promise<{ success: boolean }>;

  fetchProjects: (page?: number, limit?: number) => Promise<void>;
  createProject: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  updateProject: (
    id: string,
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  deleteProject: (id: string) => Promise<{ success: boolean }>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosPrivate.get("/project-categories");
      set({ categories: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to load categories",
        isLoading: false,
      });
    }
  },

  createCategory: async (name: string) => {
    try {
      const res = await axiosPrivate.post("/project-categories", { name });
      await get().fetchCategories();
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false };
    }
  },

  updateCategory: async (id: string, name: string) => {
    try {
      await axiosPrivate.patch(`/project-categories/${id}`, { name });
      await get().fetchCategories();
      await get().fetchProjects(); // Synchronize layout views
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      await axiosPrivate.delete(`/project-categories/${id}`);
      await get().fetchCategories();
      await get().fetchProjects(); // Safely clear dynamic cascades
      return { success: true };
    } catch (err) {
      return { success: false };
    }
  },

  fetchProjects: async (page: number = 1, limit: number = 9) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosPrivate.get(
        `/projects?page=${page}&limit=${limit}`,
      );
      set({ projects: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to parse projects grid",
        isLoading: false,
      });
    }
  },

  createProject: async (formData) => {
    try {
      await axiosPrivate.post("/projects", formData);
      await get().fetchProjects();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: getProjectErrorMessage(err, "Failed to create project"),
      };
    }
  },

  updateProject: async (id, formData) => {
    try {
      await axiosPrivate.patch(`/projects/${id}`, formData);
      await get().fetchProjects();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: getProjectErrorMessage(err, "Failed to update project"),
      };
    }
  },

  deleteProject: async (id) => {
    try {
      await axiosPrivate.delete(`/projects/${id}`);
      set({ projects: get().projects.filter((p) => p.id !== id) });
      return { success: true };
    } catch (err: any) {
      return { success: false };
    }
  },
}));
