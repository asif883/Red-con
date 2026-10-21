"use client";

import React from "react";
import Image from "next/image";

interface ApproachCardProps {
  id: number;
  title: string;
  description: string;
  isRedBadge?: boolean;
  hoverRadiusClass: string;
}

const approachData: Omit<ApproachCardProps, "hoverRadiusClass">[] = [
  {
    id: 1,
    title: "Client-Centric Solutions",
    description: "Delivering customized solutions tailored to project objectives.",
    isRedBadge: false,
  },
  {
    id: 2,
    title: "Creative Execution",
    description: "Combining technical expertise with innovative thinking.",
    isRedBadge: true,
  },
  {
    id: 3,
    title: "Data-Driven Decision",
    description: "Using analytics and evidence-based methodologies for optimal outcomes.",
    isRedBadge: false,
  },
  {
    id: 4,
    title: "Continuous Improvement",
    description: "Embracing modern technologies and evolving industry practices.",
    isRedBadge: true,
  },
];

const ApproachCard: React.FC<ApproachCardProps> = ({
  id,
  title,
  description,
  isRedBadge,
  hoverRadiusClass,
}) => {
  return (
    <div
      className={`relative flex flex-col gap-4 p-12 transition-all duration-300 group hover:bg-[#0D5C3F]/50 ${hoverRadiusClass}`}
    >
      {/* Badge Element */}
      <div
        className={`flex w-9 h-9 items-center justify-center rounded-lg text-[16px]   font-bold leading-[24px] ${
          isRedBadge
            ? "bg-[#EF4444]/10 text-[#EF4444] font-normal"
            : "bg-[#0D5C3F] text-white"
        }`}
      >
        {id}
      </div>

      {/* Content Text Elements */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white   font-semibold text-[18px] leading-[28px]">
          {title}
        </h3>
        <p className="text-white/75   font-normal text-[14px] leading-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhyChoose: React.FC = () => {
  return (
    <section className="w-full bg-neutral-950 py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
      {/* Unified 12-Column Grid Setup */}
      <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN CONTENT SYSTEM (SPAN 7) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8 w-full">
          
          {/* Section Headers */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3  ">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]   font-bold text-[16px] leading-[24px] tracking-[3.2px] capitalize">
                WHY cHOOSE REDCon Ltd.
              </span>
            </div>
            
            <h2 className="text-white   font-semibold text-3xl md:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Our Approach to{" "}
              <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_54.33%,#16A34A_100%)]">
                Excellence
              </span>
            </h2>
          </div>

          {/* Core Interactive 4-Card Frame Wrapper */}
          <div className="relative rounded-[32px] border border-[#16A34A] shadow-[0_0_15px_0_#34D399] bg-neutral-900/20 overflow-hidden">
            
            {/* GRID LAYER INTERSECTION DIVIDERS (Visible from sm device sizes up) */}
            <div className="absolute inset-0 pointer-events-none hidden sm:block">
              {/* Horizontal Center Matrix Bar */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2" />
              {/* Vertical Center Matrix Bar */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
              
              {/* Glowing Center Target Intersect Indicators */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* Vertical Center Dot Component */}
                <div className="absolute w-[0.893px] h-8 bg-[#10B981] shadow-[0_0_10px_0_#10B981]" />
                {/* Horizontal Center Dot Component */}
                <div className="absolute h-[0.893px] w-8 bg-[#10B981] shadow-[0_0_10px_0_#10B981]" />
              </div>
            </div>

            {/* Sub-Card Rendering Grid Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10">
              <ApproachCard
                {...approachData[0]}
                hoverRadiusClass="hover:rounded-tl-[32px] sm:hover:rounded-none sm:hover:bg-[#0D5C3F]/50"
              />
              <ApproachCard
                {...approachData[1]}
                hoverRadiusClass="hover:rounded-tr-[32px] sm:hover:rounded-none sm:hover:bg-[#0D5C3F]/50"
              />
              <ApproachCard
                {...approachData[2]}
                hoverRadiusClass="hover:rounded-bl-[32px] sm:hover:rounded-none sm:hover:bg-[#0D5C3F]/50"
              />
              <ApproachCard
                {...approachData[3]}
                hoverRadiusClass="hover:rounded-br-[32px] sm:hover:rounded-none sm:hover:bg-[#0D5C3F]/50"
              />
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN IMAGE SYSTEM (SPAN 5, ALIGNED TO FIGMA LAYOUT GRIDS) */}
        <div className="col-span-1 lg:row-start-1 lg:col-start-8 lg:col-span-5  w-full justify-self-stretch flex items-start">
          {/* Explicitly managed heights across different viewport steps */}
          <div className="relative w-full h-[350px] sm:h-[480px] lg:h-[631px] rounded-[32px] overflow-hidden border border-[#34D399] shadow-[0_0_20px_0_#34D399]">
            
            {/* Core Image Asset Element */}
            <Image
              src="/images/about.png"
              alt="REDCon Approach Workspace"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 600px"
              priority
            />

            {/* Smooth Dynamic Linear Dark Overlay Matte */}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.00)_50%,rgba(0,0,0,0.00)_100%)]" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;