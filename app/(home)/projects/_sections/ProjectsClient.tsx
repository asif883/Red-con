"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { DBCategory, DBProject } from "./ProjectsSection";
import ProjectCard from "../../_sections/ProjectCard";

interface ProjectsClientProps {
  initialCategories: DBCategory[];
}

export default function ProjectsClient({
  initialCategories,
}: ProjectsClientProps) {
  const [activeTabId, setActiveTabId] = useState<string>("ALL");
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  // 💡 FIX: Map through categories and inject the parent category object context into each project array entry
  const allPublishedProjects = useMemo(() => {
    const list: any[] = [];
    initialCategories.forEach((category) => {
      const categoryContext = {
        id: category.id,
        name: category.name,
        slug: category.slug,
        createdAt: category.createdAt,
      };

      category.projects.forEach((project) => {
        if (project.status === "PUBLISHED") {
          list.push({
            ...project,
            category: categoryContext, // Dynamically maps parent category onto the child project object
          });
        }
      });
    });
    return list;
  }, [initialCategories]);

  // 💡 FIX: Apply the same category object injection when tracking isolated single-category tabs
  const filteredProjects = useMemo(() => {
    if (activeTabId === "ALL") {
      return allPublishedProjects;
    }
    const targetCategory = initialCategories.find(
      (cat) => cat.id === activeTabId,
    );
    
    if (!targetCategory) return [];

    const categoryContext = {
      id: targetCategory.id,
      name: targetCategory.name,
      slug: targetCategory.slug,
      createdAt: targetCategory.createdAt,
    };

    return targetCategory.projects
      .filter((p) => p.status === "PUBLISHED")
      .map((project) => ({
        ...project,
        category: categoryContext, // Ensures nested projects mirror the required BackendProject shape perfectly
      }));
  }, [activeTabId, initialCategories, allPublishedProjects]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(3);
  }, [activeTabId]);

  useEffect(() => {
    const currentTarget = observerTargetRef.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filteredProjects.length) {
          setVisibleCount((prev) => prev + 3);
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(currentTarget);
    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [visibleCount, filteredProjects.length]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return (
    <section className="relative w-full py-24 overflow-hidden flex flex-col justify-center bg-black">
      <div className="absolute mix-blend-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1279px] h-[600px] rounded-full bg-[linear-gradient(225deg,rgba(22,163,74,0.10)_0%,rgba(22,163,74,0.10)_50%,rgba(255,0,0,0.15)_100%)] blur-[75px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-12">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col gap-5 max-w-[850px]">
            <div className="flex items-center gap-3  ">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                high-impact architecture
              </span>
            </div>

            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Proven results delivered with{" "}
              <span className="italic text-[#16A34A]">
                accuracy & regional compliance
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 p-1.5 bg-[#16A34A0D] border border-white/5 backdrop-blur-sm rounded-xl max-w-max">
            <button
              onClick={() => setActiveTabId("ALL")}
              className={`px-5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.6px] uppercase transition-all duration-200   border cursor-pointer ${
                activeTabId === "ALL"
                  ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                  : "bg-transparent border-transparent text-[rgba(255,255,255,0.7)] hover:text-white"
              }`}
            >
              all works
            </button>

            {initialCategories.map((category) => {
              const hasActiveNodes = category.projects.some(
                (p) => p.status === "PUBLISHED",
              );
              if (!hasActiveNodes && category.projects.length > 0) return null;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTabId(category.id)}
                  className={`px-5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.6px] uppercase transition-all duration-200   border cursor-pointer ${
                    activeTabId === category.id
                      ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                      : "bg-transparent border-transparent text-[rgba(255,255,255,0.7)] hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="w-full flex flex-col mt-4 rounded-[20px] border border-[rgba(22,163,74,0.20)] bg-[rgba(22,163,74,0.05)] backdrop-blur-[12px] p-6 sm:p-10">
          {displayedProjects.length > 0 ? (
            <>
              {displayedProjects.map((project) => (
                <ProjectCard key={project.id} project={project as any} />
              ))}
              <div ref={observerTargetRef} className="h-4 w-full bg-transparent pointer-events-none  " />
            </>
          ) : (
            <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-neutral-800/60 rounded-xl  ">
              <span className="text-white/40 text-sm tracking-wide">
                No verified parameters matched the active filter segment.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}