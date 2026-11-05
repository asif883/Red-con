"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  Plus,
  BarChart3,
  ExternalLink,
  ArrowUpRight,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { axiosPrivate } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Project,
  ProjectCategory,
  getProjects,
  getCategories,
  getErrorMessage,
  imageUrl,
  formatDate,
} from "@/lib/api/projects";
import { Stat, getStats } from "@/lib/api/stats";

type DashboardData = {
  projects: Project[];
  categories: ProjectCategory[];
  teamCount: number | null;
  stats: Stat[] | null;
};

async function fetchAllProjects() {
  const all: Project[] = [];
  let page = 1;
  while (true) {
    const { data, meta } = await getProjects(page, 100);
    all.push(...data);
    if (!meta.hasNextPage) return all;
    page++;
  }
}

async function loadDashboard(): Promise<DashboardData> {
  const [projects, categories, teams, stats] = await Promise.all([
    fetchAllProjects(),
    getCategories(),
    // Team count and stats are nice-to-haves; don't fail the whole dashboard on them
    axiosPrivate.get<unknown[]>("/teams").then((r) => r.data).catch(() => null),
    getStats().catch(() => null),
  ]);
  return { projects, categories, teamCount: Array.isArray(teams) ? teams.length : null, stats };
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = false,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="p-5 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px] flex flex-col gap-4 hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">{label}</span>
        <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${accent ? "bg-[#16A34A]/10 border-[#16A34A]/30 text-emerald-400" : "bg-neutral-950 border-neutral-800 text-white/40"}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight tabular-nums">{value}</p>
        {hint && <p className="mt-1 text-xs text-white/40">{hint}</p>}
      </div>
    </div>
  );
}

const panelClass = "p-5 lg:p-6 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]";

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadDashboard()
      .then((d) => !cancelled && setData(d))
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Failed to load dashboard")));
    return () => {
      cancelled = true;
    };
  }, []);

  const projects = data?.projects ?? [];
  const published = projects.filter((p) => p.status === "PUBLISHED").length;
  const drafts = projects.length - published;
  const ongoing = projects.filter((p) => p.projectStatus === "Ongoing").length;
  const completed = projects.length - ongoing;
  const recentProjects = projects.slice(0, 5); // API returns newest first

  const projectsPerCategory = (data?.categories ?? [])
    .map((cat) => ({ name: cat.name, count: projects.filter((p) => p.categoryId === cat.id).length }))
    .sort((a, b) => b.count - a.count);
  const maxCategoryCount = Math.max(1, ...projectsPerCategory.map((c) => c.count));

  // Flag when the hand-entered homepage number drifts from the real data
  const siteCompletedStat = data?.stats?.find((s) => s.label === "Projects Completed");
  const showCompletedMismatch = data && siteCompletedStat && siteCompletedStat.value !== completed;

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const loading = !data && !error;

  return (
    <div className="relative w-full min-h-screen bg-[#050505] p-6 lg:p-12 overflow-hidden text-white">
      <div className="absolute pointer-events-none mix-blend-screen left-1/4 top-1/4 w-[800px] h-[400px] rounded-[800px] bg-[linear-gradient(270deg,rgba(0,151,56,0.12)_0%,rgba(0,151,56,0.12)_100%)] blur-[160px]" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-neutral-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] font-bold text-[11px] tracking-[2.4px] uppercase">{today}</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back,{" "}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_25%,#16A34A_100%)]">
                {user?.name?.split(" ")[0] || "Admin"}
              </span>
            </h1>
            <p className="mt-2 text-sm text-white/50">Here is an overview of the REDCon website content.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/50 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-[#16A34A]" />
              <span>View Site</span>
            </Link>
            <Link
              href="/admin/projects"
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold text-black transition-all hover:opacity-95"
              style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
            >
              <Plus className="w-4 h-4 text-black" />
              <span>New Project</span>
            </Link>
          </div>
        </div>

        {error && (
          <p role="alert" className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 whitespace-pre-line">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </p>
        )}

        {loading ? (
          <div className="h-64 w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
              <StatCard
                icon={Briefcase}
                label="Total Projects"
                value={projects.length}
                hint={<><span className="text-emerald-400">{published} published</span> · {drafts} draft</>}
                accent
              />
              <StatCard icon={Clock} label="Ongoing" value={ongoing} hint="Currently in progress" />
              <StatCard icon={CheckCircle2} label="Completed" value={completed} hint="Delivered projects" />
              <StatCard icon={Layers} label="Categories" value={data?.categories.length ?? 0} hint="Service categories" />
              <StatCard icon={Users} label="Team Members" value={data?.teamCount ?? "—"} hint="Listed on Teams page" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 items-start">
              {/* Left column */}
              <div className="flex flex-col gap-6 min-w-0">
                {/* Recent projects */}
                <div className={panelClass}>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-bold">Recent Projects</h2>
                    <Link href="/admin/projects" className="flex items-center gap-1 text-xs font-semibold text-[#16A34A] hover:text-emerald-300 transition-colors">
                      View all <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {recentProjects.length > 0 ? (
                    <ul className="flex flex-col divide-y divide-neutral-800/60">
                      {recentProjects.map((project) => (
                        <li key={project.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                          <div className="w-16 h-11 shrink-0 rounded-lg overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                            {project.imageMain ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={imageUrl(project.imageMain)!} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-4 h-4 text-white/20" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate">{project.title}</p>
                            <p className="text-xs text-white/40 truncate">
                              {project.category?.name} · {project.client || "No client"} · {formatDate(project.createdAt)}
                            </p>
                          </div>
                          <div className="hidden sm:flex items-center gap-2 shrink-0">
                            <span className="text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded bg-white/5 text-white/60">
                              {project.projectStatus}
                            </span>
                            <span className={`text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded ${project.status === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-300"}`}>
                              {project.status}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="py-10 flex flex-col items-center gap-3 border border-dashed border-neutral-800/60 rounded-[14px]">
                      <span className="text-sm text-white/40">No projects yet.</span>
                      <Link href="/admin/projects" className="text-xs font-semibold text-[#16A34A] hover:text-emerald-300">
                        Add your first project
                      </Link>
                    </div>
                  )}
                </div>

                {/* Projects per category */}
                <div className={panelClass}>
                  <h2 className="text-sm font-bold mb-5">Projects by Category</h2>
                  {projectsPerCategory.length > 0 ? (
                    <ul className="flex flex-col gap-3">
                      {projectsPerCategory.map((cat) => (
                        <li key={cat.name} className="grid grid-cols-[minmax(0,180px)_1fr_32px] items-center gap-3">
                          <span className="text-xs text-white/70 truncate">{cat.name}</span>
                          <div className="h-2 rounded-full bg-neutral-800/70 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[#16A34A]"
                              style={{ width: `${(cat.count / maxCategoryCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-right tabular-nums">{cat.count}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-white/40">No categories yet.</p>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                {/* Quick actions */}
                <div className={panelClass}>
                  <h2 className="text-sm font-bold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { href: "/admin/projects", icon: Briefcase, label: "Manage Projects" },
                      { href: "/admin/stats", icon: BarChart3, label: "Edit Stats" },
                      { href: "/projects", icon: ExternalLink, label: "Public Projects", external: true },
                    ].map(({ href, icon: Icon, label, external }) => (
                      <Link
                        key={href}
                        href={href}
                        target={external ? "_blank" : undefined}
                        className="group p-4 rounded-[14px] bg-neutral-950/60 border border-neutral-800/80 hover:border-[#16A34A]/40 transition-colors flex flex-col gap-3"
                      >
                        <Icon className="w-4 h-4 text-white/40 group-hover:text-emerald-400 transition-colors" />
                        <span className="text-xs font-semibold">{label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Homepage stats snapshot */}
                <div className={panelClass}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold">Homepage Stats</h2>
                    <Link href="/admin/stats" className="flex items-center gap-1 text-xs font-semibold text-[#16A34A] hover:text-emerald-300 transition-colors">
                      Edit <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  {data?.stats ? (
                    <div className="grid grid-cols-2 gap-3">
                      {data.stats.map((stat) => (
                        <div key={stat.id} className="p-3 rounded-[12px] bg-neutral-950/60 border border-neutral-800/80">
                          <p className="text-xl font-semibold text-[#0B9D41] tabular-nums">
                            {stat.value}
                            {stat.suffix}
                          </p>
                          <p className="text-[11px] text-white/50 leading-4 mt-0.5">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/40">Couldn&apos;t load the stats.</p>
                  )}
                  {/* {showCompletedMismatch && (
                    <p className="mt-4 flex items-start gap-2 text-[11px] leading-4 text-amber-300/90">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
                      The homepage says {siteCompletedStat.value} projects completed, but the database has {completed} completed projects.
                    </p>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
