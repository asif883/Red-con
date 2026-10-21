"use client";

import React from "react";
import Image from "next/image";

const TrustedClients = () => {
  // 12 client logos based on the image reference provided
  const clients = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/clients/client${i + 1}.png`, 
    alt: `Client Logo ${i + 1}`,
  }));

  return (
    <section className="relative w-full bg-black py-16 overflow-hidden flex flex-col items-center justify-center">
      
      {/* Styled Heading Content */}
      <div className="max-w-[1440px] w-full px-4 mx-auto mb-12 z-10 relative  ">
        <h2 
          className="text-center   italic font-bold text-[30px] leading-[48px] tracking-[3.8px] bg-clip-text text-transparent"
          style={{
            background: "linear-gradient(270deg, #FF0000 0%, #009738 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Trusted By Major Client
        </h2>

        {/* Updated Glowing Effect: Positioned exactly below the text & horizontally centered */}
        <div className="absolute pointer-events-none   left-1/2 -translate-x-1/2 top-full w-[1445px] h-[49px] rounded-[1445px] bg-[linear-gradient(270deg,rgba(0,151,56,0.90)_0%,rgba(255,0,0,0.90)_100%)] blur-[250px] -z-10" />
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
                key={`l2r-${client.id}-${index}`} 
                className="w-24 h-16 sm:w-32 sm:h-20 relative flex items-center justify-center shrink-0 brightness-90 contrast-125 hover:brightness-100 transition-all duration-300"
              >
                <Image
                  src={client.src}
                  alt={client.alt}
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
  );
};

export default TrustedClients;