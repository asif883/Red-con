"use client";

import React from "react";
import { ArrowRight, Building2, CheckCircle2, Users, Zap, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";

const Hero = () => {
  const stats = [
    { icon: Building2, value: "8+", label: "Years of Experience" },
    { icon: CheckCircle2, value: "29", label: "Projects Completed" },
    { icon: Users, value: "25+", label: "Professional Experts" },
    { icon: Zap, value: "30+", label: "Clients Served" },
    { icon: Clock, value: "20+", label: "Ongoing Projects" },
    { icon: MapPin, value: "35+", label: "Districts Coverage" },
  ];

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(270deg, rgba(0, 0, 0, 0.00) 31.65%, rgba(0, 0, 0, 0.30) 42.66%, rgba(0, 0, 0, 0.80) 100%), url('/images/hero.png')`,
      }}
    >
      {/* Structural inclusion of the Navbar wrapper */}
      <Navbar />

      {/* Main Content Area - Increased padding-top from pt-12 to pt-28 to push text below the fixed header */}
      <div className="w-full flex-grow flex items-center px-4 pt-28 pb-6">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-start gap-6 z-10">
          
          {/* Hero Typography Heading */}
          <h1 className="flex flex-col font-bold text-4xl sm:text-6xl lg:text-[72px] leading-tight lg:leading-[72px] tracking-[-1.8px]">
            <span className="text-[#16A34A]">NAVIGATING</span>
            <span className="text-white">THE FUTURE</span>
          </h1>

          {/* Hero Description Text */}
          <p className="text-white text-sm sm:text-base font-normal leading-[24px] max-w-2xl opacity-90">
            REDCon Ltd. delivers multidisciplinary engineering, infrastructure, environmental and 
            development consultancy solutions that build sustainable communities and empower 
            progress across Nations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/services"
            className="flex items-center gap-2 px-6 py-3 rounded-[8px] text-black text-[14px] font-medium leading-[20px] transition-all hover:opacity-95 cursor-pointer"
            style={{
              background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)",
              boxShadow: "0 4px 4px 0 rgba(22, 101, 52, 0.30)",
            }}
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

            <Link
              href="/projects"
              className="flex items-center gap-2 px-6 py-3 rounded-[8px] text-white text-[14px] font-medium leading-[20px] border border-[#009738] transition-all hover:bg-white/5 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.30) 50%, rgba(0, 0, 0, 0.95) 100%)",
              }}
            >
              <span>View Our Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Grid Metrics Stats Bar Component */}
  
    </div>
  );
};

export default Hero;