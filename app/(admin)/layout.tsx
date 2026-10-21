"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/Guard/AuthGuard";
import { useAuthStore } from "@/store/useAuthStore";
import { 
  LayoutDashboard, 
  Briefcase, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Projects Repo", href: "/admin/projects", icon: Briefcase },
    { name: "Teams", href: "/admin/teams", icon: ShieldCheck },
  ];

  const isLoginPage = pathname === "/admin/login";
  const showSidebarLayout = user && !isLoginPage;

  // If unauthenticated or loading the login view, strip out all layout framing elements instantly
  if (!showSidebarLayout) {
    return (
      <AuthGuard>
        <main className="min-h-screen bg-[#050505] text-white">
          {children}
        </main>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row overflow-x-hidden">
        
        {/* MOBILE TOP NAVIGATION STRIP */}
        <header className="w-full md:hidden flex items-center justify-between px-6 py-4 bg-[#090909] border-b border-neutral-800/60 sticky top-0 z-30">
          <div className="flex items-center gap-2  ">
            <ShieldCheck className="w-5 h-5 text-[#16A34A]" />
            <span className="font-bold text-sm tracking-wider uppercase bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_40%,#16A34A_100%)]">
              REDCon Admin
            </span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white/80 active:scale-95 transition-all cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
        </header>

        {/* BACKDROP BLUR OVERLAY (MOBILE ONLY) */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* 💡 FIXED RESPONSIVE SIDEBAR CONTAINER */}
        <aside 
          className={`
            fixed inset-y-0 left-0 w-64 bg-[#090909] border-r border-neutral-800/60 z-50 flex flex-col justify-between p-6
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          `}
        >
          {/* Top Block: Brand and Core Navigation Links */}
          <div className="flex flex-col gap-8">
            {/* Header Identity Branding Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5  ">
                <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xs tracking-[1.5px] uppercase text-white">REDCon Ltd.</span>
                  <span className="text-[9px] font-extrabold tracking-widest text-[#EF4444] uppercase">Control Panel</span>
                </div>
              </div>
              
              {/* Close Button Trigger for Mobile Screens */}
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-md hover:bg-neutral-800 text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Loop List */}
            <nav className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase px-3 mb-2">Navigation Matrix</span>
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`
                      flex items-center justify-between px-3 py-3 rounded-[12px] text-[13px] font-medium tracking-wide transition-all border group
                      ${isActive 
                        ? "bg-neutral-950 border-neutral-800 text-emerald-400 font-semibold" 
                        : "border-transparent text-white/60 hover:text-white hover:bg-neutral-900/50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className={`w-[18px] h-[18px] transition-colors ${isActive ? "text-[#16A34A]" : "text-white/30 group-hover:text-white/60"}`} />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#16A34A]" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Block: Administrative Profile Info Card and Sign-out Trigger */}
          <div className="flex flex-col gap-4 border-t border-neutral-800/60 pt-5">
            {/* User Meta Identity Badge */}
            {user && (
              <div className="flex items-center gap-3 px-2 py-1  ">
                <div className="w-9 h-9 rounded-full bg-[linear-gradient(270deg,rgba(0,151,56,0.15)_0%,rgba(255,0,0,0.15)_100%)] border border-neutral-800 flex items-center justify-center text-xs font-bold tracking-wider text-emerald-400">
                  {user.name ? user.name.substring(0, 2).toUpperCase() : "AD"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-white truncate">{user.name || "Administrator"}</span>
                  <span className="text-[10px] text-white/40 truncate">{user.email}</span>
                </div>
              </div>
            )}

            {/* Logout Action Trigger Pin */}
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-3 rounded-[12px] text-[13px] font-medium text-red-400/80 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all cursor-pointer"
            >
              <LogOut className="w-[18px] h-[18px] text-red-400/50 group-hover:text-red-400" />
              <span>Terminate Session</span>
            </button>
          </div>
        </aside>

        {/* 💡 WORKSPACE VIEW CONTENT DISPATCH PORT (Shshifted dynamically via md:ml-64) */}
        <main className="flex-1 min-w-0 min-h-screen overflow-y-auto relative md:ml-64">
          {children}
        </main>

      </div>
    </AuthGuard>
  );
}