"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Users2, CheckCircle2, Globe2, Layers } from "lucide-react";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  theme: "green" | "red";
  fullWidth?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: IconComponent, title, subtitle, theme, fullWidth }) => {
  return (
    <div
      className={`flex items-center gap-4 p-5 transition-all duration-300 hover:border-neutral-700 ${
        fullWidth ? "col-span-1 sm:col-span-2" : "col-span-1"
      }`}
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(38, 38, 38, 0.60)",
        background: "rgba(23, 23, 23, 0.40)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Dynamic Themed Icon Box Wrapper */}
      <div
        className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center"
        style={
          theme === "green"
            ? {
                border: "1px solid rgba(16, 185, 129, 0.20)",
                background: "rgba(16, 185, 129, 0.10)",
              }
            : {
                border: "1px solid rgba(239, 68, 68, 0.20)",
                background: "rgba(239, 68, 68, 0.10)",
              }
        }
      >
        <IconComponent
          className={`w-5 h-5 ${theme === "green" ? "text-[#10B981]" : "text-[#EF4444]"}`}
        />
      </div>

      {/* Typography Block */}
      <div className="flex flex-col">
        <h4 className="text-white text-[18px] font-bold leading-[28px] tracking-wide ">
          {title}
        </h4>
        <span className="text-white/60 text-[12px] font-normal leading-[16px] ">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section 
      className="relative w-full  py-24 overflow-hidden min-h-screen flex items-center justify-center"
      style={{
        background: "rgba(22, 101, 52, 0.08)",
      }}
    >
      {/* Precise Figma Dynamic Ambient Vector Glow */}
      <div
        className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        style={{
          width: "1440px",
          height: "500px",
          borderRadius: "1540px",
          background: "linear-gradient(270deg, rgba(0, 151, 56, 0.25) 0%, rgba(255, 0, 0, 0.25) 100%)",
          filter: "blur(250px)",
        }}
      />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative">
        {/* Responsive 10-Column Alignment Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column Stack Workspace (6 Columns Spanning) */}
          <div className="lg:col-span-6 flex flex-col gap-6 items-start">
            
            {/* Component Action Subheader indicator tag */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]  font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                ABOUT REDCon Ltd.
              </span>
            </div>

            {/* Title Heading Context Block with linear clip font styling */}
            <h2 className="text-white  font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Building Tomorrow Through{" "}
              <span
                className="italic bg-clip-text text-transparent"
                style={{
                  background: "linear-gradient(270deg, #FF0000 25.48%, #16A34A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Engineering Excellence
              </span>
            </h2>

            {/* Profile Corporate Description Copy Text */}
            <p className="text-white/70  text-base sm:text-[20px] font-normal leading-[32.5px] max-w-4xl">
              Founded in 2018, Research Engineering & Development Consultant Ltd. (REDCon) is a 
              multidisciplinary engineering and consultancy firm dedicated to delivering innovative, 
              sustainable, and evidence-based solutions. We serve public, private, and institutional 
              clients through strategic planning, engineering design, environmental assessment, 
              project management, and development consultancy services.
            </p>

            {/* Metrics Identity Nested Feature Box Component Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4">
              <FeatureCard
                icon={Calendar}
                title="Founded 2018"
                subtitle="Establishment"
                theme="green"
              />
              <FeatureCard
                icon={Users2}
                title="25+ Professionals"
                subtitle="Expert Team"
                theme="red"
              />
              <FeatureCard
                icon={CheckCircle2}
                title="50+ Projects"
                subtitle="Completed & Ongoing"
                theme="green"
              />
              <FeatureCard
                icon={Globe2}
                title="Nationwide"
                subtitle="Project Experience"
                theme="red"
              />
              <FeatureCard
                icon={Layers}
                title="Multi-Sector Expertise"
                subtitle="Broad Industry Consulting Services"
                theme="green"
                fullWidth
              />
            </div>
          </div>

          {/* Right Column Photographic Frame (4 Columns Spanning) */}
          <div className="lg:col-span-4 w-full flex justify-center">
            <div className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5] max-w-md lg:max-w-none rounded-[24px] overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <Image
                src="/images/about.png"
                alt="REDCon Corporate Meeting and Workspace Collaboration"
                fill
                className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 500px"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;