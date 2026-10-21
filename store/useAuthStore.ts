import { create } from "zustand";
import { axiosPrivate } from "@/lib/axios";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER"; // Matches backend Prisma Role Enum
  outletId: string | null;
  createdAt: string;
}

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (loginDto: Record<string, string>) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Gracefully handles deep session expiration when BOTH access and refresh tokens expire
  if (typeof window !== "undefined") {
    window.addEventListener("auth-logout", () => {
      set({ user: null, isAuthenticated: false, error: "Session expired. Please log in again." });
    });
  }

  return {
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,

    clearError: () => set({ error: null }),

    login: async (loginDto) => {
      set({ isLoading: true, error: null });
      try {
        const response = await axiosPrivate.post("/auth/login", loginDto);
        
        // Immediately fetch user context info right after cookie registration
        const profileResponse = await axiosPrivate.get("/auth/me");
        const userData: UserProfile = profileResponse.data.data;

        // CRITICAL GATEWAY ENFORCER: Block access if authenticated user is not an ADMIN
        if (userData.role !== "ADMIN") {
          await axiosPrivate.post("/auth/logout"); // Cleanly wipe down invalid session tokens instantly
          set({ 
            user: null, 
            isAuthenticated: false, 
            isLoading: false, 
            error: "Access denied: Admins only" 
          });
          return { success: false, message: "Access denied: Admins only" };
        }
        
        set({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true, message: response.data.message };
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || "Invalid credentials or unauthorized access context";
        set({ error: errorMessage, isLoading: false, isAuthenticated: false });
        return { success: false, message: errorMessage };
      }
    },

    logout: async () => {
      set({ isLoading: true });
      try {
        await axiosPrivate.post("/auth/logout");
      } catch (err) {
        console.error("Logout request error context:", err);
      } finally {
        set({ user: null, isAuthenticated: false, isLoading: false, error: null });
      }
    },

    checkAuth: async () => {
      set({ isLoading: true, error: null });
      try {
        /**
         * AUTOMATED REFRESH PIPELINE EXECUTION:
         * If the short access token (15 mins) has expired, this call triggers a 401 response status.
         * Your Axios Interceptor from @/lib/axios instantly halts this execution sequence, performs
         * a quiet background validation request to "/auth/refresh", updates cookies, and replays this
         * profile fetch seamlessly. The user remains authenticated uninterrupted.
         */
        const response = await axiosPrivate.get("/auth/me");
        const userData: UserProfile = response.data.data;

        // Fallback protection layer against unauthorized role configurations
        if (userData.role !== "ADMIN") {
          await axiosPrivate.post("/auth/logout");
          set({ user: null, isAuthenticated: false, isLoading: false });
          return;
        }

        set({ user: userData, isAuthenticated: true, isLoading: false });
      } catch (err) {
        // Fallback catch segment handles root failures if the long-lived refresh token has expired
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    },
  };
});