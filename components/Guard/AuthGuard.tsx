"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();

  // FIX 1: Only execute validation on initial application mount context.
  // Your Axios interceptor handles silent token rotations during subsequent API queries.
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Reactive redirection manager
  useEffect(() => {
    if (isLoading) return;

    const isLoginPage = pathname === "/admin/login";
    const isAdminRoute = pathname.startsWith("/admin");

    if (!isAuthenticated || user?.role !== "ADMIN") {
      // Pathway A: Not authorized -> Enforce login redirection path
      if (!isLoginPage && isAdminRoute) {
        router.replace("/admin/login");
      }
    } else {
      // Pathway B: Active authenticated session -> Redirect away from login view area
      if (isLoginPage) {
        router.replace("/admin/dashboard");
      }
    }
  }, [isAuthenticated, user, isLoading, pathname, router]);

  // Show premium loader during the initial layout validation session synchronizer
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
      </div>
    );
  }

  const isLoginPage = pathname === "/admin/login";
  if (!isAuthenticated && !isLoginPage && pathname.startsWith("/admin")) return null;
  if (isAuthenticated && isLoginPage) return null;

  return <>{children}</>;
}