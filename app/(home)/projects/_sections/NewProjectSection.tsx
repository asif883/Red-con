 "use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects } from "./project";

const ALL_CATEGORIES = "All Projects";

export default function NewProjectSection() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const categories = useMemo(
    () => [
      ALL_CATEGORIES,
      ...Array.from(new Set(projects.map((project) => project.category))).sort(
        (a, b) => a.localeCompare(b)
      ),
    ],
    []
  );

  const filteredProjects = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory]
  );

  return (
    <section className=" py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-2 md:px-4">
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700 sm:text-sm">
            Our Portfolio
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Projects That Make an Impact
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
            Explore our project experience across engineering, planning,
            infrastructure, and environmental services.
          </p>
        </div>

        {/* Category filters */}
        <div
          className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10"
          aria-label="Filter projects by category"
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 sm:px-5 ${
                  isActive
                    ? "border-emerald-800 bg-emerald-800 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-emerald-700 hover:text-emerald-800"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-200" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-slate-200">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>

        {/* Project cards */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#03170B] bg-[#03170B] transition duration-300 hover:-translate-y-1  hover:shadow-xl hover:shadow-slate-900/5"
              >
                <div className="relative flex aspect-[16/9] items-end overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-950 p-6">
                  {project.image ? (
                    // Use a real project image when one is supplied in product.ts.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0" aria-hidden="true">
                      <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full border border-white/15" />
                      <div className="absolute -right-2 -top-8 h-32 w-32 rounded-full border border-white/15" />
                      <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-black/35 to-transparent" />
                    </div>
                  )}

                  <div className="relative z-10 flex w-full items-end justify-between gap-3">
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

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    {project.client}
                  </p>

                  <h3 className="text-lg font-semibold leading-snug text-slate-50 transition-colors group-hover:text-slate-300 sm:text-xl">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-200">
                    <span className="inline-flex items-center gap-1.5">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="h-4 w-4 text-slate-100"
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
                      {project.endDate && project.endDate !== "Ongoing"
                        ? ` – ${project.endDate}`
                        : ""}
                    </span>
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-800 transition-colors hover:text-emerald-950"
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
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
            <p className="text-base font-medium text-slate-800">
              No projects found in this category.
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory(ALL_CATEGORIES)}
              className="mt-3 text-sm font-semibold text-emerald-800 underline underline-offset-4"
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
