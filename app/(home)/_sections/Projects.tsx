import React from "react";
import { ArrowUpRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

// Define the absolute database payload model interface type definitions
export interface BackendProject {
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
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
  };
}

async function getProjects(): Promise<BackendProject[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
  
  try {
    // Fetch directly from backend using modern Next.js server runtime cache bypass execution patterns
    const response = await fetch(`${baseUrl}/projects`, {
      cache: "no-store", // Guarantees live database calls on every request context load
    });

    if (!response.ok) {
      throw new Error(`HTTP network execution failure: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Fallback logic: handle both paginated wrapper structures { data: [] } and raw arrays safely
    const projectsArray = responseData && typeof responseData === "object" && "data" in responseData 
      ? responseData.data 
      : Array.isArray(responseData) ? responseData : [];
    
    // Filter out only active published entries, then slice down to exactly 3 items maximum
    return projectsArray
      .filter((project: BackendProject) => project.status === "PUBLISHED")
      .slice(0, 3);
  } catch (error) {
    console.error("[Server Component Fetch Error] Failed to fetch repository nodes:", error);
    return [];
  }
}

export default async function Projects() {
  const projectsData = await getProjects();

  return (
    <section 
      className="relative w-full py-24 overflow-hidden min-h-screen flex items-center justify-center"
      style={{ background: "rgba(22, 101, 52, 0.08)" }}
    >
      {/* Dynamic Ambient Vector Glow Shapes */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-120 -translate-y-1/2 w-[1488px] h-[581px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 bottom-12 w-[1488px] h-[581px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-12">
        
        {/* Core Layout Identity Header Section */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                projects
              </span>
            </div>
            
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Transforming Ideas into{" "}
              <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_35.58%,#16A34A_100%)]">
                Impactful Projects
              </span>
            </h2>
          </div>

          <Link
            href="/projects"
            className="flex items-center gap-4 pl-6 pr-2 py-2 rounded-full text-white text-[14px] font-bold leading-[20px] bg-transparent border border-neutral-800 transition-all hover:bg-white/5 shrink-0 self-start sm:self-end shadow-[0_20px_25px_-14px_rgba(22,101,52,0.20)] cursor-pointer"
          >
            <span>View all works</span>
            <div className="w-9 h-9 rounded-full bg-[rgba(16,185,129,0.70)] flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </Link>
        </div>

        {/* Dynamic Project Iterative Presenter Map Layout */}
        <div className="w-full flex flex-col mt-6">
          {projectsData.length > 0 ? (
            projectsData.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="w-full py-16 border border-dashed border-neutral-800 rounded-2xl flex items-center justify-center text-white/30 text-sm font-medium uppercase tracking-wider">
              No Published Infrastructure Blueprints Currently Live.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}