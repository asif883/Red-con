"use client";

import React from "react";
import Navbar from "@/components/Navbar/Navbar";

const TeamHero = () => {
  return (
    <div 
      className="relative min-h-[70vh] md:min-h-[650px] w-full flex flex-col justify-between overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: ` url('/images/teams/hero.png')`,
      }}
    >
      {/* Structural inclusion of the Navbar wrapper */}
      <Navbar />

      {/* Main Content Area - Strategic spacing to prevent overlapping fixed nav elements */}
      <div className="w-full flex-grow flex items-end px-4 pt-40 pb-20 sm:px-6 lg:px-8">
        
        {/* PREMIUM GLASSMORPHIC CARD OVERLAY FRAME */}
        <div 
          className="max-w-[1440px] w-full mx-auto rounded-[24px] p-8 md:p-12 lg:p-16 z-10 relative flex flex-col items-start gap-5 "
          
        >
          
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3  ">
            <div 
              style={{
                width: "32px",
                height: "2px",
                borderRadius: "9999px",
                background: "#166534",
              }} 
            />
            <span 
              style={{
                color: "#EF4444",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "24px",
                letterSpacing: "3.2px",
                textTransform: "uppercase",
              }}
            >
              our core workforce
            </span>
          </div>

          {/* Core Segment Heading Typography */}
          <h1 
            className="text-white max-w-4xl text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]"
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
            }}
          >
            A multidisciplinary league of{" "}
            <span 
              className="italic"
              style={{
                color: "#16A34A",
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
              }}
            >
              engineering visionaries
            </span>
          </h1>

          {/* Content Narrative Summary Block */}
          <p 
            className="max-w-3xl text-base sm:text-lg lg:text-[20px] lg:leading-[28px]"
            style={{
              color: "rgba(255, 255, 255, 0.70)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}
          >
            Meet the administrative heads, senior analysts, and GIS specialists
            managing the design approval grids and environmental safety
            metrics across South Asia.
          </p>

        </div>
      </div>
    </div>
  );
};

export default TeamHero;