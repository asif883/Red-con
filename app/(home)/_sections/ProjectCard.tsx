import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BackendProject } from "./Projects";

interface ProjectCardProps {
  project: BackendProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  // Fallback image handling to protect the layout layout bounds
  const mainFeatureImage = project.thumbnail
    ? `${API_BASE_URL}${project.thumbnail}`
    : "/images/projects/fallback-main.png";

  const galleryImg1 = project.gallery?.[0]
    ? `${API_BASE_URL}${project.gallery[0]}`
    : "/images/projects/fallback-sub1.png";

  const galleryImg2 = project.gallery?.[1]
    ? `${API_BASE_URL}${project.gallery[1]}`
    : "/images/projects/fallback-sub2.png";

  return (
    <div className="w-full py-12 border-b border-neutral-800/50 last:border-b-0 flex flex-col gap-6 relative">
      {/* Top Header Row of Project Card */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-3 max-w-4xl">
          <h3 className="text-white font-bold text-xl sm:text-[24px] leading-tight sm:leading-[32px] tracking-[-0.6px]">
            {project.title}
          </h3>

          {/* Dynamic Filter Meta Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-1 rounded-full text-[12px] font-medium leading-[16px] text-white/90 border border-white/5"
                style={{
                  background:
                    "linear-gradient(270deg, rgba(0, 151, 56, 0.20) 0%, rgba(255, 0, 0, 0.20) 100%)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* View Details Redirect Action Trigger */}
        <Link
          href={`/projects/${project.slug}`}
          className="flex items-center gap-2 group self-start sm:self-center shrink-0"
        >
          <span className="text-[#16A34A] text-[16px] font-normal leading-[32px] transition-colors group-hover:text-green-400">
            View Details
          </span>
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform bg-neutral-900/30">
            <ArrowUpRight className="w-4 h-4 text-[#16A34A] group-hover:text-green-400" />
          </div>
        </Link>
      </div>

      {/* Main Multi-Column Media Content Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start w-full">
        {/* Left Column: Large Feature Focus Image */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900">
          <Image
            src={mainFeatureImage}
            alt={`${project.title} Primary Feature Capture`}
            fill
            className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-500"
            sizes="(max-width: 1024px) 100vw, 700px"
            priority
            unoptimized={process.env.NODE_ENV === "development"}
          />
        </div>

        {/* Right Column: Dynamic Supporting Information Subgrid */}
        <div className="w-full flex flex-col gap-5">
          {/* Dual Sub-Images Split Array Layout */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-900 bg-neutral-900">
              <Image
                src={galleryImg1}
                alt={`${project.title} Context Workspace View A`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 350px"
                unoptimized={process.env.NODE_ENV === "development"}
              />
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-900 bg-neutral-900">
              <Image
                src={galleryImg2}
                alt={`${project.title} Context Workspace View B`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 50vw, 350px"
                unoptimized={process.env.NODE_ENV === "development"}
              />
            </div>
          </div>

          {/* Description Copy Content Text */}
          <p className="text-white/70 text-sm sm:text-[16px] font-normal leading-[24px] opacity-95">
            {project.description ||
              "No corporate project details abstract documented for this record location."}
          </p>

          {/* Metrics Data Grid - Strict Layout Formatting Applied Here */}
          <div className="grid grid-cols-2 gap-4 w-full mt-2">
            {/* 💡 Metric Box 1: Enforces Green styling */}
            {project.metric1Value && (
              <div
                className="p-4 sm:p-5 flex flex-col gap-1 rounded-[12px]"
                style={{
                  border: "1px solid rgba(38, 38, 38, 0.60)",
                  background: "rgba(23, 23, 23, 0.30)",
                }}
              >
                <span className="text-[24px] font-extrabold leading-[32px] text-[#34D399]">
                  {project.metric1Value}
                </span>
                <span className="text-white/60 text-[12px] font-medium leading-[16px]">
                  {project.metric1Title}
                </span>
              </div>
            )}

            {/* 💡 Metric Box 2: Enforces Red styling */}
            {project.metric2Value && (
              <div
                className="p-4 sm:p-5 flex flex-col gap-1 rounded-[12px]"
                style={{
                  border: "1px solid rgba(38, 38, 38, 0.60)",
                  background: "rgba(23, 23, 23, 0.30)",
                }}
              >
                <span className="text-[24px] font-extrabold leading-[32px] text-[#EF4444]">
                  {project.metric2Value}
                </span>
                <span className="text-white/60 text-[12px] font-medium leading-[16px]">
                  {project.metric2Title}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}