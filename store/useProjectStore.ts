import { create } from "zustand";
import { axiosPrivate } from "@/lib/axios";
import {
  Project,
  ProjectCategory,
  PaginatedProjects,
  getProjects,
  getCategories,
  createProject as apiCreateProject,
  updateProject as apiUpdateProject,
  deleteProject as apiDeleteProject,
  getErrorMessage,
} from "@/lib/api/projects";

export type { Project, ProjectCategory } from "@/lib/api/projects";

type ProjectsMeta = PaginatedProjects["meta"];

interface ProjectState {
  projects: Project[];
  meta: ProjectsMeta | null;
  page: number;
  limit: number;
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
  deleteProject: (id: string) => Promise<{ success: boolean; message?: string }>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  meta: null,
  page: 1,
  limit: 9,
  categories: [],
  isLoading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ categories: await getCategories() });
    } catch (err: unknown) {
      set({ error: getErrorMessage(err, "Failed to load categories") });
    }
  },

  createCategory: async (name: string) => {
    try {
      const res = await axiosPrivate.post("/project-categories", { name });
      await get().fetchCategories();
      return { success: true, data: res.data };
    } catch {
      return { success: false };
    }
  },

  updateCategory: async (id: string, name: string) => {
    try {
      await axiosPrivate.patch(`/project-categories/${id}`, { name });
      await get().fetchCategories();
      await get().fetchProjects(); // Synchronize layout views
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  deleteCategory: async (id: string) => {
    try {
      await axiosPrivate.delete(`/project-categories/${id}`);
      await get().fetchCategories();
      await get().fetchProjects(); // Safely clear dynamic cascades
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  // Defaults to the last requested page so refreshes after mutations stay in place
  fetchProjects: async (page = get().page, limit = get().limit) => {
    set({ isLoading: true, error: null, page, limit });
    try {
      const res = await getProjects(page, limit);
      set({ projects: res.data, meta: res.meta, isLoading: false });
    } catch (err: unknown) {
      set({
        error: getErrorMessage(err, "Failed to load projects"),
        isLoading: false,
      });
    }
  },

  createProject: async (formData) => {
    try {
      await apiCreateProject(formData);
      await get().fetchProjects();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err, "Failed to create project"),
      };
    }
  },

  updateProject: async (id, formData) => {
    try {
      await apiUpdateProject(id, formData);
      await get().fetchProjects();
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err, "Failed to update project"),
      };
    }
  },

  deleteProject: async (id) => {
    try {
      await apiDeleteProject(id);
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: getErrorMessage(err, "Failed to delete project"),
      };
    }
  },
}));
