"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface InsightArticle {
  id: number;
  category: "STRUCTURAL" | "ENVIRONMENTAL" | "GIS & SPATIAL";
  badgeLabel: string;
  dateText: string;
  title: string;
  description: string;
  authorName: string;
  authorAvatar: string;
  imageSrc: string;
}

const ResearchCategories = () => {
  // Multi-Object Structured Array Containing Whitepapers & Insights Dataset
  const insightsData: InsightArticle[] = [
    {
      id: 1,
      category: "ENVIRONMENTAL",
      badgeLabel: "WASH DESIGN",
      dateText: "Published Oct 24, 2025 • 8 Min Read",
      title: "Eco-Biological Sizing parameters for Municipal Faecal Sludge Reactors",
      description: "Evaluating dynamic biological loading parameters inside dense municipal sectors. It models the hydraulic retention periods required...",
      authorName: "Habibullah Bahar",
      authorAvatar: "/images/authors/habibullah.png",
      imageSrc: "/images/services/service2.png", // Mapping to corresponding service assets
    },
    {
      id: 2,
      category: "GIS & SPATIAL",
      badgeLabel: "GIS & SURVEY",
      dateText: "Published Nov 02, 2025 • 10 Min Read",
      title: "LiDAR Photogrammetry & DGPS Ground Grounding: Millimeter-Level Topography Models",
      description: "Exploring structural land informatics using dual-frequency LiDAR drone technology. Models the integration of DGPS parameters to guarantee...",
      authorName: "Engr. K. Qasain",
      authorAvatar: "/images/authors/qasain.png",
      imageSrc: "/images/services/service1.png",
    },
    {
      id: 3,
      category: "STRUCTURAL",
      badgeLabel: "STRUCTURAL",
      dateText: "Published Dec 14, 2025 • 15 Min Read",
      title: "Seismic safety metrics in Deltaic Soils: Designing Zero-Failure Building Blueprints",
      description: "Analyzes high-intensity soil interactions across Deltaic deposits. Prescribes structural, low-density pile configurations satisfying the latest...",
      authorName: "Maj Md. Joebur Rahman, PhD",
      authorAvatar: "/images/authors/joebur.png",
      imageSrc: "/images/services/service7.png",
    },
  ];

  type FilterCategory = "ALL" | "STRUCTURAL" | "ENVIRONMENTAL" | "GIS & SPATIAL";
  const [activeTab, setActiveTab] = useState<FilterCategory>("ALL");

  // Dynamic conditional lookup layer parsing datasets against selection filters
  const filteredArticles = activeTab === "ALL" 
    ? insightsData 
    : insightsData.filter((article) => article.category === activeTab);

  return (
    <section className="relative w-full py-24 overflow-hidden flex flex-col justify-center bg-black text-white">
      
      {/* ATMOSPHERIC BACKGROUND ILLUMINATION ACCENT */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1200px] h-[600px] rounded-full bg-[linear-gradient(45deg,rgba(22,163,74,0.08)_0%,rgba(10,10,10,0.15)_50%,rgba(244,63,94,0.08)_100%)] blur-[100px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-12">
        
        {/* ========================================== */}
        {/* 01. CORE GLOBAL HEADER TYPOGRAPHY ROW     */}
        {/* ========================================== */}
        <div className="w-full flex flex-col gap-4 text-left">
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3  ">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              research categories
            </span>
          </div>
          
          {/* Core Segment Heading Typography */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-[900px]">
            Accessing structural,{" "}
            <span className="italic text-[#16A34A]">
              environmental, & spatial data
            </span>
          </h2>
        </div>

        {/* ========================================== */}
        {/* 02. MODULAR HORIZONTAL TABS SELECTOR PANEL */}
        {/* ========================================== */}
        <div className="w-full max-w-max rounded-[20px] border border-[rgba(22,163,74,0.20)] bg-[rgba(22,163,74,0.05)] backdrop-blur-[12px] p-4 md:py-5 md:px-10 flex flex-wrap items-center gap-3 sm:gap-4 mt-2">
          
          {/* Option Toggle Element: All Whitepapers */}
          <button
            onClick={() => setActiveTab("ALL")}
            className={`px-5 py-2 rounded-full text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase transition-all duration-300   cursor-pointer
              ${activeTab === "ALL"
                ? "bg-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                : "bg-transparent text-[rgba(255,255,255,0.70)] hover:text-white"
              }`}
          >
            all whitepapers
          </button>

          {/* Option Toggle Element: Structural */}
          <button
            onClick={() => setActiveTab("STRUCTURAL")}
            className={`px-5 py-2 rounded-full text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase transition-all duration-300   cursor-pointer border
              ${activeTab === "STRUCTURAL"
                ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                : "bg-transparent border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.70)] hover:text-white hover:border-white/40"
              }`}
          >
            structural
          </button>

          {/* Option Toggle Element: Environmental */}
          <button
            onClick={() => setActiveTab("ENVIRONMENTAL")}
            className={`px-5 py-2 rounded-full text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase transition-all duration-300   cursor-pointer border
              ${activeTab === "ENVIRONMENTAL"
                ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                : "bg-transparent border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.70)] hover:text-white hover:border-white/40"
              }`}
          >
            environmental
          </button>

          {/* Option Toggle Element: GIS & Spatial */}
          <button
            onClick={() => setActiveTab("GIS & SPATIAL")}
            className={`px-5 py-2 rounded-full text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase transition-all duration-300   cursor-pointer border
              ${activeTab === "GIS & SPATIAL"
                ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)]"
                : "bg-transparent border-[rgba(255,255,255,0.20)] text-[rgba(255,255,255,0.70)] hover:text-white hover:border-white/40"
              }`}
          >
            gis & spatial
          </button>
        </div>

        {/* ========================================== */}
        {/* 03. GRID CONTAINER FOR DATA CARDS DISPLAY  */}
        {/* ========================================== */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="w-full rounded-[35.2px] border border-[rgba(22,163,74,0.20)] bg-[rgba(22,163,74,0.07)] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.10),0_8px_10px_-6px_rgba(0,0,0,0.10)] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[rgba(22,163,74,0.40)]"
            >
              
              {/* Card Body Component Content Stack */}
              <div className="p-6 pb-4 flex flex-col gap-5">
                
                {/* Visual Media Cover Banner Wrapper with Floating Badge */}
                <div className="relative w-full h-[149.88px] rounded-2xl overflow-hidden bg-neutral-900/40">
                  <Image
                    src={article.imageSrc}
                    alt={`${article.title} Asset Representation Visualizer`}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  
                  {/* Floating Mono Spec Badge element */}
                  <div className="absolute top-3 left-3 rounded-full border border-[rgba(52,211,153,0.30)] bg-black/85 backdrop-blur-[6px] px-3 py-1 z-10">
                    <span className="font-mono text-[#34D399] text-[9px] font-normal tracking-[0.9px] uppercase">
                      {article.badgeLabel}
                    </span>
                  </div>
                </div>

                {/* Meta-Timeline Metadata Log Block */}
                <span className="font-mono text-[rgba(255,255,255,0.40)] text-[10px] font-normal leading-[15px]">
                  {article.dateText}
                </span>

                {/* Typography Information Copy Layout Stack */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-white font-bold text-[20px] leading-[25px] tracking-[-0.5px] min-h-[50px] line-clamp-2 group-hover:text-[#34D399] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[rgba(255,255,255,0.50)] text-[12px] font-light leading-[19.5px] line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>

              {/* Card Interactive Footer Base Segment Component */}
              <div className="flex items-center justify-between p-6 pt-5 border-t border-white/[0.05] w-full mt-auto">
                {/* Author Block Frame Identity Signature */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-5 h-5 rounded-full overflow-hidden bg-neutral-800">
                    <div className="w-full h-full bg-[#166534]/40 flex items-center justify-center text-[8px] font-bold text-white uppercase">
                      {article.authorName.charAt(0)}
                    </div>
                  </div>
                  <span className="text-[rgba(255,255,255,0.70)] font-bold text-[10px] leading-[15px]">
                    {article.authorName}
                  </span>
                </div>

                {/* Action Link Sub-Trigger */}
                <div className="flex items-center gap-1.5 text-[#34D399]   cursor-pointer group/btn">
                  <span className="text-[12px] font-semibold leading-[16px] transition-colors group-hover/btn:text-emerald-400">
                    Read Article
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResearchCategories;