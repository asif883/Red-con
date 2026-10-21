"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Lock, Mail, ShieldAlert, ArrowRight, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const router = useRouter();
  const { login, error, clearError, isAuthenticated, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [localLoading, setLocalLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // FIX 2: Completely removed checkAuth() from here.
  // The parent layout wrapper AuthGuard already guarantees session tracking.
  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError(null);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setFormError("Please enter all required security credentials.");
      return;
    }

    setLocalLoading(true);
    const outcome = await login(formData);
    setLocalLoading(false);

    if (outcome.success) {
      router.push("/admin/dashboard");
    }
  };

  if (isLoading && !localLoading) {
    return (
      <div className="min-h-screen w-full bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Dynamic Ambient Vector Glow */}
      <div
        className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: "1200px",
          height: "450px",
          borderRadius: "1200px",
          background: "linear-gradient(270deg, rgba(0, 151, 56, 0.22) 0%, rgba(255, 0, 0, 0.22) 100%)",
          filter: "blur(200px)",
        }}
      />

      <div 
        className="w-full max-w-md z-10 p-8 transition-all duration-300"
        style={{
          borderRadius: "24px",
          border: "1px solid rgba(38, 38, 38, 0.70)",
          background: "rgba(23, 23, 23, 0.45)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex flex-col gap-2 items-center text-center mb-8  ">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[12px] leading-[18px] tracking-[2.4px] uppercase">
              REDCon Control Center
            </span>
          </div>
          
          <h2 className="text-white font-semibold text-2xl sm:text-3xl tracking-[-0.8px]">
            Administrative{" "}
            <span 
              className="italic bg-clip-text text-transparent"
              style={{
                background: "linear-gradient(270deg, #FF0000 25.48%, #16A34A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Gateway
            </span>
          </h2>
          <p className="text-white/60 text-[13px] font-normal leading-[18px] max-w-xs mt-1">
            Authorized hardware credential tokens required. Server validation session logs tracked globally.
          </p>
        </div>

        {(formError || error) && (
          <div className="mb-6 flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-[12px] text-red-400 text-sm animate-fadeIn">
            <ShieldAlert className="w-5 h-5 shrink-0 text-[#EF4444]" />
            <span className="leading-tight font-medium">{formError || error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-[12px] font-semibold tracking-wide uppercase px-1">
              Corporate Email
            </label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                <Mail className="w-[18px] h-[18px]" />
              </div>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="name@redconbd.com"
                className="w-full rounded-[12px] border border-[#5D615D]/60 bg-[#424242]/20 pl-11 pr-5 py-3.5 text-white text-[14px] font-medium placeholder-white/20 focus:outline-none focus:border-[#009738]/60 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white/80 text-[12px] font-semibold tracking-wide uppercase px-1">
              Gateway Security Key
            </label>
            <div className="relative w-full">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                <Lock className="w-[18px] h-[18px]" />
              </div>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••••••"
                className="w-full rounded-[12px] border border-[#5D615D]/60 bg-[#424242]/20 pl-11 pr-5 py-3.5 text-white text-[14px] font-medium placeholder-white/20 focus:outline-none focus:border-[#009738]/60 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={localLoading}
            className="flex items-center justify-center gap-2 w-full mt-3 px-6 py-3.5 rounded-[12px] text-white text-[14px] font-bold leading-[20px] transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(270deg, rgba(0, 151, 56, 0.85) 0%, rgba(255, 0, 0, 0.85) 100%)",
              boxShadow: "0 4px 12px 0 rgba(22, 101, 52, 0.15)",
            }}
          >
            {localLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <>
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;