import { axiosPrivate } from "@/lib/axios";
import { create } from "zustand";


export interface TeamCategory {
  id: string;
  name: string;
  slug: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  categoryId: string;
  edu?: string;
  expertise?: string;
  memberOf?: string;
  email: string;
  phone: string;
  imageUrl: string;
  linkedinUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeamState {
  teamMembers: TeamMember[];
  categories: TeamCategory[];
  isLoading: boolean;
  error: string | null;
  fetchTeamMembers: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  createTeamCategory: (
    name: string,
  ) => Promise<{ success: boolean; message?: string }>; // 👈 ADDED
  createTeamMember: (
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  updateTeamMember: (
    id: string,
    formData: FormData,
  ) => Promise<{ success: boolean; message?: string }>;
  deleteTeamMember: (
    id: string,
  ) => Promise<{ success: boolean; message?: string }>;
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const useTeamStore = create<TeamState>((set, get) => ({
  teamMembers: [],
  categories: [],
  isLoading: false,
  error: null,

  fetchTeamMembers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosPrivate.get(`${API_BASE_URL}/teams`);
      set({ teamMembers: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to load team ledger",
        isLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    try {
      const res = await axiosPrivate.get(`${API_BASE_URL}/teams/categories`);
      set({ categories: res.data });
    } catch (err) {
      console.error("Failed to load organizational category nodes:", err);
    }
  },

  // 💡 NEW ACTION: Pushes new categories straight into your backend database
  createTeamCategory: async (name: string) => {
    try {
      const res = await axiosPrivate.post(`${API_BASE_URL}/teams/categories`, {
        name,
      });
      set((state) => ({ categories: [...state.categories, res.data] }));
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed creating tier category group",
      };
    }
  },

  createTeamMember: async (formData: FormData) => {
    try {
      const res = await axiosPrivate.post(`${API_BASE_URL}/teams`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({ teamMembers: [res.data, ...state.teamMembers] }));
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Error deploying team member",
      };
    }
  },

  updateTeamMember: async (id: string, formData: FormData) => {
    try {
      const res = await axiosPrivate.patch(`${API_BASE_URL}/teams/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set((state) => ({
        teamMembers: state.teamMembers.map((m) => (m.id === id ? res.data : m)),
      }));
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message: err.response?.data?.message || "Error modifying records",
      };
    }
  },

  deleteTeamMember: async (id: string) => {
    try {
      await axiosPrivate.delete(`${API_BASE_URL}/teams/${id}`);
      set((state) => ({
        teamMembers: state.teamMembers.filter((m) => m.id !== id),
      }));
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Error executing cleanup routine",
      };
    }
  },
}));
