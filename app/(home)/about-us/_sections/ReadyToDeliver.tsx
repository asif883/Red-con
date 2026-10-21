"use client";

import { ArrowUpRight } from "lucide-react";

const ReadyToDeliver = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center ">
      
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex justify-center">
        
        {/* Core CTA Card Container Framework - Upgraded to solid opaque alpha colors for high visibility */}
        <div className="relative w-full max-w-[1120px] rounded-[32px] sm:rounded-[40px] border border-[rgba(22,163,74,0.25)] bg-[linear-gradient(45deg,rgba(2,44,34,1)_0%,rgba(69,10,10,1)_100%)] px-6 py-16 sm:py-20 md:px-12 flex flex-col items-center  justify-center text-center gap-6 sm:gap-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          
          {/* Top Subtitle Component Indicator */}
          <span className="text-[#16A34A] text-[12px] font-black leading-[16px] tracking-[3.6px] uppercase">
            let&apos;s build the future together
          </span>

          {/* Headline Typography Content Architecture */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[54px] tracking-[-1.75px] max-w-[780px]">
            Ready to deliver{" "}
            <span className="italic text-[#16A34A] tracking-[-0.9px]">
              resilient & future-ready outcomes.
            </span>
          </h2>

          {/* Narrative Overview Segment Block */}
          <p className="text-[rgba(255,255,255,0.60)] text-[14px] font-light leading-[22.75px] max-w-[660px]">
            Whether you are planning a high-capacity transportation scheme, infrastructure setup, or structural consultancy assignment, REDCon. Limited is ready to provide expert guidance.
          </p>

          {/* Interactive Global Consultation Action Anchor Trigger */}
          <button className="flex items-center gap-4 pl-6 pr-2 py-2 mt-2 rounded-full text-white bg-[linear-gradient(90deg,rgba(69,10,10,0.7)_0%,rgba(2,44,34,0.7)_100%)] border border-neutral-800/60 transition-all duration-300 hover:scale-[1.02] hover:border-neutral-700/80 group shrink-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
            <span className="text-[12px] font-bold leading-[16px] tracking-[1.2px] uppercase">
              get consultation
            </span>
            <div className="w-9 h-9 rounded-full bg-[#16A34A] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
          </button>

        </div>

      </div>
    </section>
  );
};

export default ReadyToDeliver;