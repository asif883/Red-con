"use client";

import React from "react";
import { 
  Network, 
  Navigation, 
  Layers, 
  Droplet, 
  Map, 
  Globe, 
  Briefcase, 
  Users, 
  Home, 
  Radar 
} from "lucide-react";

interface TeamSpecialty {
  id: number;
  tag: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OurTeam = () => {
  // Multi-Object Structured Array Containing Specialties Dataset
  const specialitiesData: TeamSpecialty[] = [
    {
      id: 1,
      tag: "CIVIL",
      title: "Civil Engineering",
      icon: Network,
    },
    {
      id: 2,
      tag: "TRANSIT",
      title: "Transportation Planning",
      icon: Navigation,
    },
    {
      id: 3,
      tag: "STRUCTURAL",
      title: "Structural Engineering",
      icon: Layers,
    },
    {
      id: 4,
      tag: "ECO",
      title: "Environmental Eng.",
      icon: Droplet,
    },
    {
      id: 5,
      tag: "SPATIAL",
      title: "GIS & Remote Sensing",
      icon: Map,
    },
    {
      id: 6,
      tag: "REGIONAL",
      title: "Urban & Regional Planning",
      icon: Globe,
    },
    {
      id: 7,
      tag: "PM",
      title: "Project Management",
      icon: Briefcase,
    },
    {
      id: 8,
      tag: "SOCIAL",
      title: "Socio-Economic",
      icon: Users,
    },
    {
      id: 9,
      tag: "CREATIVE",
      title: "Architecture & Design",
      icon: Home,
    },
    {
      id: 10,
      tag: "SURVEY",
      title: "Survey & Monitoring",
      icon: Radar,
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden flex flex-col justify-center bg-black text-white">
      
      {/* BACKGROUND ATMOSPHERIC LIGHTING */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1488px] h-[404px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.35)_0%,rgba(255,0,0,0.35)_100%)] blur-[250px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        
        {/* ========================================== */}
        {/* CORE GLOBAL HEADER ALIGNMENT ROW          */}
        {/* ========================================== */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-16">
          <div className="flex flex-col gap-5 md:max-w-[55%]">
            {/* Top Tag Sub-indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                our team
              </span>
            </div>
            
            {/* Core Segment Heading Typography */}
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              A Multidisciplinary Team{" "}
              <span className="italic text-[#16A34A]">
                of Professionals
              </span>
            </h2>
          </div>

          {/* Right Narrative Structural Description Column */}
          <div className="md:max-w-[45%] pb-1">
            <p className="text-[rgba(255,255,255,0.40)] font-normal text-base sm:text-lg lg:text-[20px] lg:leading-[28px]">
              REDCon Limited is powered by a diverse team of collaborative specialists maintaining strict technical standards.
            </p>
          </div>
        </div>

        {/* ========================================== */}
        {/* GRID LAYOUT FOR PROFESSIONAL CAPABILITIES  */}
        {/* ========================================== */}
        {/* Changed grid-cols-1 to grid-cols-2 for base mobile view to ensure a 2-column layout row */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mt-4">
          {specialitiesData.map((specialty) => {
            const IconComponent = specialty.icon;
            return (
              <div
                key={specialty.id}
                /* Scaled padding down slightly on small mobile view (p-4 sm:p-6) to ensure titles don't wrap awkwardly */
                className="w-full rounded-[16px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] p-4 sm:p-6 flex flex-col gap-4 text-left transition-all duration-300 hover:border-[rgba(52,211,153,0.20)] hover:bg-white/[0.02]"
              >
                {/* Technical Indicator Icon Vector */}
                <div className="text-[#34D399] w-6 h-6 flex items-center justify-start">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Card Context Data Stack */}
                <div className="flex flex-col gap-1 mt-1">
                  <span className="text-[rgba(255,255,255,0.50)] font-semibold text-[10px] sm:text-[12px] leading-[16px] tracking-[0.6px] uppercase">
                    {specialty.tag}
                  </span>
                  <h3 className="text-white font-bold text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]">
                    {specialty.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OurTeam;