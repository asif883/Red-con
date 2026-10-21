"use client";

import React from "react";
import { 
  Compass, 
  Leaf, 
  ClipboardList, 
  ShieldCheck, 
  Map, 
  Navigation, 
  Building2, 
  Activity 
} from "lucide-react";

interface ServiceItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OneStopConsultancy = () => {
  // Multi-Object Structured Array Containing Consultancy Dataset
  const servicesData: ServiceItem[] = [
    { id: "01", label: "01. SURVEY & MONITORING", icon: Compass },
    { id: "02", label: "02. ENVIRONMENTAL ENG.", icon: Leaf },
    { id: "03", label: "03. PRE-PROJECT STUDY", icon: ClipboardList },
    { id: "04", label: "04. APPROVAL SUPPORT", icon: ShieldCheck },
    { id: "05", label: "05. URBAN PLANNING", icon: Map },
    { id: "06", label: "06. ROAD INFRASTRUCTURE", icon: Navigation },
    { id: "07", label: "07. BUILDING INFRA", icon: Building2 },
    { id: "08", label: "08. ASSESSMENT & ANALYSIS", icon: Activity },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center bg-black text-white">
      
      {/* BACKGROUND ATMOSPHERIC LIGHTING EFFECT (CENTER POSITIONED) */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-[linear-gradient(45deg,rgba(52,211,153,0.10)_0%,rgba(10,10,10,0.20)_50%,rgba(244,63,94,0.10)_100%)] blur-[75px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        
        {/* Header Alignment Segment */}
        <div className="w-full flex flex-col gap-4">
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              one-stop consultancy
            </span>
          </div>
          
          {/* Core Segment Heading Typography */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-[950px]">
            Transforming ambitious ideas into{" "}
            <span className="italic text-[#16A34A]">
              sustainable structures & data-driven solutions
            </span>
          </h2>
        </div>

        {/* Dynamic Service Grid Presenter Box Layout */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
          {servicesData.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                /* Combined group-hover properties into parent card layout block for coordinated transitions */
                className="group w-full rounded-[16px] border border-white/5 bg-white/[0.02] p-8 flex flex-col items-center justify-center gap-4 text-center transition-all duration-300 hover:bg-[rgba(5,150,105,0.30)] hover:border-white/5"
              >
                {/* Structural Custom Icon Wrapper Container - Transition effects map seamlessly on parent card hover */}
                <div className="w-11 h-11 rounded-[12px] border border-white/10 bg-white/5 flex items-center justify-center text-white/60 transition-all duration-300 group-hover:border-white/30 group-hover:bg-[#16A34A] group-hover:text-white">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Service Descriptor Typography Metadata */}
                <h3 className="text-white/80 text-[12px] font-bold leading-[16px] tracking-[0.6px] uppercase transition-colors duration-300 group-hover:text-white">
                  {service.label}
                </h3>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OneStopConsultancy;