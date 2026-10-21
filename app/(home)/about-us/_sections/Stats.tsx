"use client";

import React from "react";

interface StatItem {
  id: number;
  value: string;
  label: string;
  colorClass: string;
}

const Stats = () => {
  // Multi-Object Structured Array Containing Metrics Dataset
  const statsData: StatItem[] = [
    {
      id: 1,
      value: "8+",
      label: "YEARS ACTIVE",
      colorClass: "text-[#DCA54E]",
    },
    {
      id: 2,
      value: "50+",
      label: "DESHBYAPI PROJECTS",
      colorClass: "text-[#34D399]",
    },
    {
      id: 3,
      value: "25+",
      label: "SENIOR ENGINEERS",
      colorClass: "text-[#F43F5E]",
    },
    {
      id: 4,
      value: "100%",
      label: "ACCURACY STANDARDS",
      colorClass: "text-[rgba(255,255,255,0.80)]",
    },
  ];

  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)]">
      
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex justify-center">
        
        {/* Core Global Metrics Presenter Panel Container */}
        <div className="relative max-w-[1088px] w-full rounded-[24px] border border-[rgba(22,163,74,0.50)] bg-[#0C0C0C] p-8 sm:p-12 overflow-hidden">
          
          {/* Subtle Ambient Accent Glow positioned precisely inside bottom-left corner */}
          <div className="absolute w-[128px] h-[128px] -left-[39px] -bottom-[39px] rounded-full bg-[rgba(245,158,11,0.05)] blur-[32px] pointer-events-none   z-0" />

          {/* Dynamic Grid Layout Layer mapping over metrics data definitions */}
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6 z-10">
            {statsData.map((item, index) => (
              <div 
                key={item.id} 
                className="relative flex flex-col items-center justify-center text-center gap-3 w-full"
              >
                {/* Core Numeric Metric Representation */}
                <span className={`font-black text-[48px] leading-none tracking-[-2.4px] ${item.colorClass}`}>
                  {item.value}
                </span>

                {/* Subtext Label Structural Metadata Description */}
                <span className="text-[rgba(255,255,255,0.40)] font-semibold text-[10px] leading-[15px] tracking-[2px] uppercase">
                  {item.label}
                </span>

                {/* Vertical Divider Borders dynamically rendered on desktop columns */}
                {index < statsData.length - 1 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 h-[103px] w-[1px] bg-[#16A34A] opacity-100" />
                )}
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;