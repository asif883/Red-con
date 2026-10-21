"use client";

import React from "react";

interface MethodologyItem {
  id: string;
  tag: string;
  title: string;
  description: string;
}

const Methodology = () => {
  // Multi-Object Structured Array Containing Methodology Dataset
  const methodologyData: MethodologyItem[] = [
    {
      id: "01",
      tag: "01 // GOAL",
      title: "Client Satisfaction",
      description: "We prioritize client objectives and deliver solutions that create measurable value and long-term success.",
    },
    {
      id: "02",
      tag: "02 // DESIGN",
      title: "Creative Execution",
      description: "We combine technical expertise with innovative thinking to solve complex engineering challenges.",
    },
    {
      id: "03",
      tag: "03 // INTEL",
      title: "Data-Driven Optimization",
      description: "We leverage research, analytics, field data, and modern technologies to support informed decision-making.",
    },
    {
      id: "04",
      tag: "04 // EVOLVE",
      title: "Continuous Improvement",
      description: "We continuously evolve our processes, methodologies, and capabilities to maintain the highest standards of service delivery.",
    },
  ];

  return (
    /* Added overflow-hidden to prevent the massive 1000px background blur container from expanding the viewport width on mobile devices */
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center bg-black text-white">
      
      {/* BACKGROUND ATMOSPHERIC LIGHTING EFFECT */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full bg-[linear-gradient(45deg,var(--gradient-4-layer1-start,rgba(52,211,153,0.10))_0%,var(--gradient-4-layer1-mid-1,rgba(10,10,10,0.20))_50%,var(--gradient-4-layer1-end,rgba(244,63,94,0.10))_100%)] blur-[75px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        
        {/* Header Alignment Segment */}
        <div className="w-full flex flex-col gap-4">
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              our methodology
            </span>
          </div>
          
          {/* Core Segment Heading Typography */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-[800px]">
            Delivering Excellence Through{" "}
            <span className="italic text-[#16A34A]">
              Proven Methodology
            </span>
          </h2>
        </div>

        {/* Dynamic Methodology Iterative Presenter Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {methodologyData.map((item) => (
            <div
              key={item.id}
              /* Adjusted horizontal and vertical spacing padding rules (p-6 sm:p-8) to keep layout elements from compressing on small viewports */
              className="relative overflow-hidden rounded-[32px] border border-[rgba(22,163,74,0.30)] bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] p-6 sm:p-8 flex flex-col gap-5 min-h-[240px] sm:min-h-[260px] justify-start text-left"
            >
              {/* Subtle Corner Glow Accent Layer */}
              <div className="absolute w-24 h-24 -top-[31px] -right-[31px] rounded-full bg-[rgba(220,165,78,0.05)] blur-[20px] pointer-events-none  " />

              {/* Step Tracking Tag */}
              <span className="text-[#16A34A] text-[14px] font-bold leading-[16px] tracking-wide">
                {item.tag}
              </span>

              {/* Content Core Architecture */}
              <div className="flex flex-col gap-3">
                <h3 className="text-white text-[18px] font-bold leading-[28px]">
                  {item.title}
                </h3>
                <p className="text-[rgba(255,255,255,0.50)] text-[12px] font-normal leading-[19px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Methodology;