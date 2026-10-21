"use client";

import React from "react";
import { ArrowRight, Building2, CheckCircle2, Users, Zap, Clock, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";

const Hero = () => {
  const stats = [
    { icon: Building2, value: "8+", label: "Years of Experience" },
    { icon: CheckCircle2, value: "50+", label: "Projects Completed" },
    { icon: Users, value: "25+", label: "Professional Experts" },
    { icon: Zap, value: "30+", label: "Clients Served" },
    { icon: Clock, value: "20+", label: "Ongoing Projects" },
    { icon: MapPin, value: "35+", label: "Districts Coverage" },
  ];

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(11, 31, 42, 0.00) 31.65%, rgba(11, 31, 42, 0.30) 42.66%, rgba(11, 31, 42, 0.80) 100%), url('/images/hero.png')`,
      }}
    >
      {/* Structural inclusion of the Navbar wrapper */}
      <Navbar />

      {/* Main Content Area - Increased padding-top from pt-12 to pt-28 to push text below the fixed header */}
      <div className="w-full flex-grow flex items-center px-4 pt-28 pb-6">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start gap-6 z-10">
          
          {/* Hero Typography Heading */}
          <h1 className="flex flex-col font-bold text-4xl sm:text-6xl lg:text-[72px] leading-tight lg:leading-[72px] tracking-[-1.8px]">
            <span className="text-[#16A34A]">Engineering Tomorrow</span>
            <span className="text-white">Through Innovation &</span>
            <span className="text-[#DC2626]">Expertise</span>
          </h1>

          {/* Hero Description Text */}
          <p className="text-white text-sm sm:text-base font-normal leading-[24px] max-w-2xl opacity-90">
            REDCon Ltd. delivers multidisciplinary engineering, infrastructure, environmental and 
            development consultancy solutions that build sustainable communities and empower 
            progress across Nations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-[8px] text-white text-[14px] font-medium leading-[20px] transition-all hover:opacity-95"
              style={{
                background: "linear-gradient(270deg, rgba(0, 151, 56, 0.80) 0%, rgba(255, 0, 0, 0.80) 100%)",
                boxShadow: "0 4px 4px 0 rgba(22, 101, 52, 0.30)",
              }}
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              className="flex items-center gap-2 px-6 py-3 rounded-[8px] text-white text-[14px] font-medium leading-[20px] border border-[#009738] transition-all hover:bg-white/5"
              style={{
                background: "linear-gradient(180deg, rgba(11, 31, 42, 0.00) 0%, rgba(11, 31, 42, 0.30) 50%, rgba(11, 31, 42, 0.95) 100%)",
              }}
            >
              <span>View Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Grid Metrics Stats Bar Component */}
      <div className="w-full px-4 pb-10">
        <div 
          className="max-w-[1440px] mx-auto rounded-[16px] border border-white/30 backdrop-blur-[12px] p-6 lg:p-8"
          style={{
            background: "linear-gradient(270deg, rgba(0, 151, 56, 0.20) 0%, rgba(255, 0, 0, 0.20) 100%)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-white/10">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center gap-4 w-full justify-start lg:justify-center pt-4 md:pt-0 ${
                    index < 2 ? "border-none" : ""
                  }`}
                >
                  {/* Metric Status Icon Context Box */}
                  <div className="w-10 h-10 shrink-0 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  
                  {/* Label Meta-text Layout */}
                  <div className="flex flex-col">
                    <span className="text-white text-[24px] font-bold leading-[30px]">
                      {stat.value}
                    </span>
                    <span className="text-[#9CA3AF] text-[10px] font-bold leading-[15px] tracking-[0.5px] uppercase">
                      {stat.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;