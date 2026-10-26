
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "./project";

const ALL_CATEGORIES = "All Projects";

export default function NewProjectSection() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");

    const updateScreen = () => {
      setIsMobile(mediaQuery.matches);
      setVisibleCount(mediaQuery.matches ? 6 : 9);
    };

    updateScreen();
    mediaQuery.addEventListener("change", updateScreen);

    return () => {
      mediaQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  const initialLimit = isMobile ? 6 : 9;

  // Generate unique project categories
  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(
        new Set(projects.map((project) => project.category))
      ).sort((a, b) => a.localeCompare(b)),
    ],
    []
  );

  // Filter projects by selected category
  const filteredProjects = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? projects
        : projects.filter(
            (project) => project.category === activeCategory
          ),
    [activeCategory]
  );

  // Projects currently visible
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < filteredProjects.length;

  // Reset visible count when category changes
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(initialLimit);
  };

  // Load more projects
  const handleViewMore = () => {
    setVisibleCount((current) =>
      Math.min(current + initialLimit, filteredProjects.length)
    );
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm">
            Our Portfolio
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Projects That <span className="italic text-[#16A34A]">
              Make an Impact 
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            Explore our project experience across engineering, planning,
            infrastructure, and environmental services.
          </p>
        </div>

        {/* Category dropdown and result count */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label
              htmlFor="project-category"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Filter by services
            </label>

            <div className="relative w-10/12 sm:w-80">
              <select
                id="project-category"
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full appearance-none rounded-xl border border-white/15 bg-[#03170B] px-4 py-3 pr-11 text-sm font-medium text-white outline-none transition-colors duration-200 hover:border-white/30 focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A]/20"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[#03170B] text-white"
                  >
                    {category}
                  </option>
                ))}
              </select>

              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="none"
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-300"
              >
                <path
                  d="m5 7.5 5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <p className="text-sm text-slate-300" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-white">
              {visibleProjects.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-white">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {/* Project cards */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProjects.map((project) => (
                <article
                  key={project.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#03170B] bg-[#03170B] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5"
                >
                  {/* Project image */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.imageMain}
                      alt={`${project.title} project view`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-3">
                      <span className="max-w-[75%] rounded-full border border-white/25 bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                        {project.category}
                      </span>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold ${
                          project.status.toLowerCase().includes("complete")
                            ? "bg-white text-emerald-800"
                            : "bg-amber-300 text-slate-900"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Project information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      {project.client}
                    </p>

                    <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-slate-50 transition-colors group-hover:text-slate-300 sm:text-xl">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                      {project.description}
                    </p>

                    {/* Location and dates */}
                    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100/15 pt-4 text-xs text-slate-200">
                      <span className="inline-flex items-center gap-1.5">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="h-4 w-4 shrink-0 text-slate-100"
                        >
                          <path
                            d="M16.25 8.33c0 4.17-6.25 9.17-6.25 9.17S3.75 12.5 3.75 8.33a6.25 6.25 0 1 1 12.5 0Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <circle
                            cx="10"
                            cy="8.25"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>

                        {project.location}
                      </span>

                      <span>
                        {project.startDate}
                        {project.endDate &&
                        project.endDate !== "Ongoing"
                          ? ` – ${project.endDate}`
                          : ""}
                      </span>
                    </div>

                    {/* View details */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#16A34A] transition-colors hover:text-emerald-300"
                      aria-label={`View details for ${project.title}`}
                    >
                      View Details

                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M4.5 10h11m-4.5-4.5L15.5 10 11 14.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* View More button */}
            {hasMoreProjects && (
              <div className="mt-10 flex justify-center">
                <button
                  type="button"
                  onClick={handleViewMore}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#03170B] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-[#16A34A] hover:bg-[#16A34A] focus:outline-none focus:ring-2 focus:ring-[#16A34A]/40 cursor-pointer"
                >
                  View More

                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M10 4v12m-5-5 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/20 px-6 py-16 text-center">
            <p className="text-base font-medium text-slate-200">
              No projects found in this category.
            </p>

            <button
              type="button"
              onClick={() => handleCategoryChange(ALL_CATEGORIES)}
              className="mt-3 text-sm font-semibold text-emerald-500 underline underline-offset-4 hover:text-emerald-300 cursor-pointer"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
