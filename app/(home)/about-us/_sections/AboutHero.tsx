"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

const AboutHero = () => {
  return (
    <section className="relative w-full pt-36 pb-0 overflow-hidden  flex flex-col justify-between ">
      <Navbar />

      {/* FIRST GLOW: Positioned at the very top start of the section with 35% opacity */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 -top-40 w-[1488px] h-[581px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.35)_0%,rgba(255,0,0,0.35)_100%)] blur-[250px] z-0" />

      {/* Main Content Layout Container */}
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16 xl:gap-24 flex-grow justify-center">
        {/* Decorative L-Shaped Corner Frame Accent */}
        <div className="absolute top-0 left-1 lg:left-0 w-32 h-32 pointer-events-none  ">
          <Image
            src="/images/about/green.svg"
            alt="Decorative Accent"
            width={96}
            height={96}
            priority
          />
        </div>

        {/* Core Global Header Alignment Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-6">
          {/* Left Column: Heading Segment */}
          <div className="flex flex-col gap-5 lg:col-span-7">
            {/* Top Tag Sub-indicator */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]   font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                about our practice
              </span>
            </div>

            {/* Core Segment Heading Typography */}
            <h1 className="text-white   font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Engineering Excellence Through Research,{" "}
              <span className="italic text-[#16A34A]">
                Innovation & Sustainable Development
              </span>
            </h1>
          </div>

          {/* Right Column: Narrative Block Segment */}
          <div className="lg:col-span-5 lg:mt-11 border-l-2 border-[#16A34A] pl-6 lg:pl-8 py-1">
            <p className="text-[rgba(255,255,255,0.60)]   font-normal text-base sm:text-lg lg:text-[20px] lg:leading-[28px]">
              Since 2018, REDCon. Limited has stood as a robust structural and
              engineering cornerstone across South Asia built on uncompromising
              integrity, guided by scientific datasets, and driven by
              engineering excellence.
            </p>
          </div>
        </div>
      </div>

      {/* Full-Width Visual Presenter Frame - Upgraded with Next.js Image Optimization */}
      <div className="w-full relative h-[350px] sm:h-[450px] md:h-[520px] lg:h-[640px] mt-16 lg:mt-24 z-10 border-y-4 border-[#16A34A] shadow-[0_-2px_10px_0_#009738]">
        <Image
          src="/images/about/about-hero.png"
          alt="REDCon Engineering Team on Site"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
};

export default AboutHero;
