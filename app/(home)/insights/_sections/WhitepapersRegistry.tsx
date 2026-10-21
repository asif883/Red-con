"use client";

import React, { useState } from "react";

const WhitepapersRegistry = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed to Whitepapers Registry:", email);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center ">
      
      {/* BACKGROUND ATMOSPHERIC GLOW EFFECT */}
      <div 
        className="absolute pointer-events-none   mix-blend-screen w-[506.47px] h-[495.31px] rounded-full bg-[linear-gradient(0deg,rgba(0,151,56,0.30)_0%,rgba(0,151,56,0.30)_100%)] blur-[250px] z-0" 
        style={{
          left: "-255.99px",
          top: "-262px",
          transform: "rotate(-179.41deg)"
        }}
      />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex justify-center">
        
        {/* Core Registry Container Card */}
        <div className="relative w-full max-w-[1120px] rounded-[32px] sm:rounded-[40px] border border-white/5 bg-[linear-gradient(0deg,rgba(22,163,74,0.4)_0%,rgba(22,163,74,0.08)_100%)] px-6 py-16 sm:py-20 md:px-12 flex flex-col items-center justify-center text-center gap-6 sm:gap-8">
          
          {/* Top Subtitle Indicator Block */}
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3  ">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] text-[12px] font-bold leading-[16px] tracking-[3.6px] uppercase">
                whitepapers registry
              </span>
            </div>
            
            {/* Core Segment Heading Typography */}
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[36px] lg:leading-[40px] tracking-[-0.9px] max-w-[700px] mt-2">
              Stay updated with our latest{" "}
              <span className="italic text-[#16A34A]">
                engineering whitepapers.
              </span>
            </h2>
          </div>

          {/* Narrative Operational Copy Summary Paragraph */}
          <p className="text-[rgba(255,255,255,0.60)] text-[14px] font-normal leading-[22.75px] max-w-[760px]">
            Subscribe to REDCon&apos;s quarterly technical briefs. Receive DGPS field methodologies, environmental sanitation designs, and structural safety case studies directly to your inbox.
          </p>

          {/* Interactive Form Capture Module */}
          <form 
            onSubmit={handleSubscribe}
            className="w-full max-w-[560px] flex flex-col sm:flex-row items-center gap-4 mt-2"
          >
            <div className="w-full flex-1">
              <input
                type="email"
                placeholder="Enter your business email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[12px] border border-white/10 bg-black/60 px-5 py-3.5 text-white text-[14px] placeholder-[rgba(255,255,255,0.35)] focus:outline-none focus:border-[#16A34A]/60 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-[12px] bg-[#16A34A] text-white text-[12px] font-bold tracking-[1.2px] uppercase   transition-all duration-300 hover:bg-[#15803d] active:scale-[0.98] shrink-0 cursor-pointer"
            >
              subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default WhitepapersRegistry;