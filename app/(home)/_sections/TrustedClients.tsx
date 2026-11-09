"use client";

import Image from "next/image";
import { clients } from "./clients-data";

const TrustedClients = () => {
  return (
    <div className="relative w-full bg-black px-4 py-10 md:py-12 lg:py-16 overflow-hidden">
    <section className="relative max-w-[1440px] mx-auto rounded-[24px] border border-white/[0.09] bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_45%,rgba(255,255,255,0.035)_100%)] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14),inset_0_0_0_1px_rgba(255,255,255,0.02),0_24px_60px_-24px_rgba(0,0,0,0.9)] py-10 md:py-12 lg:py-16 overflow-hidden flex flex-col items-center justify-center">

      {/* Glass sheen: faint light catching the top-left edge, no glow */}
      <div className="absolute inset-0 pointer-events-none rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_38%)]" />

      {/* Styled Heading Content */}
      <div className="max-w-[1440px] w-full px-4 mx-auto mb-8 md:mb-12 z-10 relative  ">
        <h2 
          className="text-center   font-bold text-[30px] leading-[48px] tracking-[3.8px] bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(270deg, #16A34A 0%, #009738 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trusted By Major Client
        </h2>
      </div>

      {/* Infinite Logo Marquee Track Container */}
      <div className="w-full relative z-10 flex flex-col gap-6 overflow-hidden">
        
        {/* Fixed: Standard framework-safe standard style element injection */}
        <style>{`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-left {
            display: flex;
            width: max-content;
            animation: marquee-left 35s linear infinite;
          }
          .animate-marquee-right {
            display: flex;
            width: max-content;
            animation: marquee-right 35s linear infinite;
          }
        `}</style>

        {/* Track 1: Moves Left to Right */}
        <div className="w-full overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
            {[...clients, ...clients].map((client, index) => (
              <div 
                key={`l2r-${client.logo}-${index}`} 
                className="w-24 h-16 sm:w-32 sm:h-20 relative flex items-center justify-center shrink-0 brightness-90 contrast-125 hover:brightness-100 transition-all duration-300"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 96px, 128px"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
    </div>
  );
};

export default TrustedClients;