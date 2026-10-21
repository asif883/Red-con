"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";

const ServiceHero = () => {
  return (
    <div 
      className="relative min-h-[50vh] md:h-[60vh] md:min-h-[500px] w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(11, 31, 42, 0.00) 31.65%, rgba(11, 31, 42, 0.30) 42.66%, rgba(11, 31, 42, 0.80) 100%), url('/images/hero.png')`,
      }}
    >
      {/* Structural inclusion of the Navbar wrapper */}
      <Navbar />

      {/* Main Content Area - Half screen height allocation */}
      <div className="w-full flex-grow flex items-center px-4 pt-32 pb-16">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start gap-5 z-10 relative">
          
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3  ">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              our service spectrum
            </span>
          </div>

          {/* Core Segment Heading Typography */}
          <h1 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-4xl">
            Engineering resilient &{" "}
            <span className="italic text-[#16A34A]">
              sustainable infrastructure
            </span>
          </h1>

          {/* Content Narrative Summary Block */}
          <p className="text-[rgba(255,255,255,0.70)] text-base sm:text-lg lg:text-[20px] lg:leading-[28px] font-medium max-w-3xl mt-1">
            We balance sophisticated physical testing, remote drone sensing, and high-consequence spatial designs to solve urban planning and structural development challenges.
          </p>

        </div>
      </div>
    </div>
  );
};

export default ServiceHero;