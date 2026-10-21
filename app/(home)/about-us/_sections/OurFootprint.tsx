"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronRight, History, Eye, Check, Award } from "lucide-react";

interface PillarData {
  id: string;
  tabLabel: string;
  imageSrc: string;
}

const OurFootprint = () => {
  // Navigation matrix definition for the interactive panel systems
  const pillarsData: PillarData[] = [
    { id: "01", tabLabel: "01. Our Journey", imageSrc: "/images/about/footprint1.jpg" },
    { id: "02", tabLabel: "02. Mission & Vision", imageSrc: "/images/about/footprint2.jpg" },
    { id: "03", tabLabel: "03. Core Benchmarks", imageSrc: "/images/about/footprint3.jpg" },
  ];

  const [activeTab, setActiveTab] = useState<string>("01");
  const currentAsset = pillarsData.find((p) => p.id === activeTab) || pillarsData[0];

  return (
    <section className="relative w-full py-24 overflow-hidden flex flex-col justify-center bg-black">
      
      {/* BACKGROUND ATMOSPHERIC LIGHTING */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 -translate-x-1/2 top-0 w-[1488px] h-[581px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.15)_0%,rgba(255,0,0,0.15)_100%)] blur-[250px] z-0" />

      {/* ========================================== */}
      {/* 01. TOP HEADER FOOTPRINT SEGMENT           */}
      {/* ========================================== */}
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative mb-16">
        <div className="w-full flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-16">
          <div className="flex flex-col gap-5 lg:max-w-[60%]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                our footprint
              </span>
            </div>
            
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Transforming complex{" "}
              <span className="italic text-[#16A34A]">
                challenges into outcomes.
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:max-w-[40%] border-l-2 border-[#16A34A] pl-6 py-1">
            <p className="text-[rgba(255,255,255,0.60)] font-normal text-base sm:text-lg lg:text-[20px] lg:leading-[28px]">
              We balance deep data analytics with highly advanced engineering protocols, ensuring sustainable value is captured across both public and private sectors.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-[6px] h-[6px] rounded-full bg-[#16A34A]" />
              <span className="text-[#16A34A] font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase">
                est. 2018 in bangladesh
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* 02. INTERACTIVE TABS SYSTEM SEGMENT        */}
      {/* ========================================== */}
      {/* Full-width container background segment wrapper */}
      <div className="w-full bg-[#0d5c3f26] py-16 z-10 relative">
        <div className="max-w-[1440px] w-full mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDEBAR COLUMN: Control Triggers */}
          <div className="flex flex-col gap-6 lg:col-span-5 w-full max-w-[384px]">
            <div className="flex flex-col gap-2">
              <span className="text-[#F43F5E] font-bold text-[12px] leading-[16px] tracking-[3px] uppercase">
                institutional pillars
              </span>
              <h3 className="text-white font-extrabold text-[36px] leading-[40px] tracking-[-0.9px]">
                Strategic<br />
                <span className="italic text-[#DCA54E]">Foundations</span>
              </h3>
            </div>
            
            <p className="text-[rgba(255,255,255,0.40)] font-normal text-[14px] leading-[22.75px]">
              Select an institutional profile element to reveal how we engineer complex, high-consequence spatial solutions across global parameters.
            </p>

            <div className="flex flex-col gap-3 mt-4 w-full">
              {pillarsData.map((pillar) => {
                const isSelected = activeTab === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    onClick={() => setActiveTab(pillar.id)}
                    className={`w-full flex items-center justify-between p-4 px-5 rounded-[16px] border transition-all duration-300 group   text-left
                      ${isSelected 
                        ? "border-[#0D5C3F] bg-[rgba(13,92,63,0.05)] text-[#16A34A]" 
                        : "border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)] text-[rgba(255,255,255,0.60)] hover:bg-[#0D5C3F66] hover:border-[#0D5C3F] hover:text-white"
                      }`}
                  >
                    <span className="font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase transition-colors">
                      {pillar.tabLabel}
                    </span>
                    <ChevronRight 
                      className={`w-4 h-4 transition-transform duration-300 
                        ${isSelected ? "text-[#16A34A] translate-x-1" : "text-neutral-600 group-hover:text-neutral-400"}`} 
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANELS INTERACTIVE DISPLAY PANEL */}
          <div className="lg:col-span-7 w-full rounded-[50px_50px_2px_2px] border border-[rgba(22,163,74,0.50)] bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] backdrop-blur-[20px] p-6 sm:p-10 lg:p-12 min-h-[520px] flex flex-col justify-between gap-8">
            
            {/* ========================================== */}
            {/* CONDITIONAL RENDER: TAB 01 (OUR JOURNEY)  */}
            {/* ========================================== */}
            {activeTab === "01" && (
              <>
                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-[16px] border border-[rgba(220,165,78,0.20)] bg-[rgba(220,165,78,0.10)] text-[#DCA54E]">
                    <History className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[rgba(255,255,255,0.30)] tracking-[1.2px] uppercase sm:text-center flex-1 sm:pr-10 text-right">
                    EST. 2018
                  </span>
                </div>

                <div className="w-full flex flex-col xl:flex-row items-start gap-8 justify-between">
                  <div className="flex flex-col gap-4 flex-1">
                    <h4 className="text-white font-black text-[30px] leading-[36px] tracking-[-0.75px]">
                      Charting structural <span className="italic text-[#DCA54E]">progress & trust.</span>
                    </h4>
                    <p className="text-[rgba(255,255,255,0.70)] font-light text-[14px] leading-[22.75px] max-w-[420px]">
                      Founded in Dhaka, REDCon. Limited originated as an elite gathering of multidisciplinary engineers striving to redefine regional feasibility studies and geological reporting. Backed by state accreditation, our reach extends to complex national logistics and highway systems.
                    </p>
                  </div>

                  <div className="relative w-[294px] h-[300px] shrink-0 rounded-xl overflow-hidden self-center xl:self-start">
                    <Image src={currentAsset.imageSrc} alt="Our Journey Graphic Layout" fill className="object-cover filter grayscale" sizes="294px" priority />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.00)_21.98%,rgba(0,0,0,0.30)_33.5%)] pointer-events-none" />
                  </div>
                </div>

                <div className="w-full border-t border-[rgba(22,163,74,0.50)] pt-6 flex flex-wrap gap-x-12 gap-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-[24px] leading-[32px] text-[#DCA54E]">2018</span>
                    <span className="text-[rgba(255,255,255,0.40)] font-normal text-[10px] leading-[15px] tracking-[0.5px] uppercase">INCEPTION YEAR</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-extrabold text-[24px] leading-[32px] text-[#34D399]">50+</span>
                    <span className="text-[rgba(255,255,255,0.40)] font-normal text-[10px] leading-[15px] tracking-[0.5px] uppercase">Projects Delivered</span>
                  </div>
                </div>
              </>
            )}

            {/* ========================================== */}
            {/* CONDITIONAL RENDER: TAB 02 (MISSION/VISION)*/}
            {/* ========================================== */}
            {activeTab === "02" && (
              <>
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-[16px] border border-[rgba(52,211,153,0.20)] bg-[rgba(52,211,153,0.10)] text-[#34D399]">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[rgba(255,255,255,0.30)] tracking-[1.2px] uppercase flex-1 text-center pr-10">
                    CORE PURPOSE
                  </span>
                </div>

                <div className="w-full flex flex-col xl:flex-row items-start gap-8 justify-between">
                  <div className="flex flex-col gap-5 flex-1 w-full">
                    <h4 className="text-white font-black text-[30px] leading-[36px] tracking-[-0.75px]">
                      Shaping our institutional <span className="italic font-semibold text-[#16A34A]">Mission and Vision.</span>
                    </h4>
                    
                    {/* Mission and Vision Grid Stack */}
                    <div className="flex flex-col gap-3 w-full">
                      <div className="rounded-[12px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-1.5">
                        <span className="text-[#34D399] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase">
                          OUR MISSION
                        </span>
                        <p className="text-[rgba(255,255,255,0.70)] font-light text-[12px] leading-[19.5px]">
                          To empower clients with innovative engineering solutions, strategic insights, and sustainable development practices that drive long-term growth, resilience, and operational excellence.
                        </p>
                      </div>

                      <div className="rounded-[12px] border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)] p-4 flex flex-col gap-1.5">
                        <span className="text-[#DCA54E] font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase">
                          OUR VISION
                        </span>
                        <p className="text-[rgba(255,255,255,0.70)] font-light text-[12px] leading-[19.5px]">
                          To become a leading engineering and development consultancy recognized for technical excellence, innovation, sustainability, and transformative impact across Bangladesh and beyond.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-[294px] h-[300px] shrink-0 rounded-xl overflow-hidden self-center xl:self-start">
                    <Image src={currentAsset.imageSrc} alt="Mission and Vision Panel Graphic" fill className="object-cover filter grayscale" sizes="294px" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.00)_21.98%,rgba(0,0,0,0.30)_33.5%)] pointer-events-none" />
                    <div className="absolute bottom-3 left-4 z-20">
                      <span className="font-mono text-[#34D399] text-[10px] font-normal tracking-[1px] uppercase">
                        02 // OPERATIONAL PHILOSOPHY
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* ========================================== */}
            {/* CONDITIONAL RENDER: TAB 03 (BENCHMARKS)    */}
            {/* ========================================== */}
            {activeTab === "03" && (
              <>
                <div className="w-full flex items-center justify-between gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-[16px] border border-[rgba(22,163,74,0.20)] bg-[rgba(22,163,74,0.10)] text-[#16A34A]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[12px] font-semibold text-[rgba(255,255,255,0.30)] tracking-[1.2px] uppercase flex-1 text-center pr-10">
                    BNBC COMPLIANCE
                  </span>
                </div>

                <div className="w-full flex flex-col xl:flex-row items-start gap-8 justify-between">
                  <div className="flex flex-col gap-5 flex-1">
                    <h4 className="text-white font-semibold text-[30px] leading-[36px] tracking-[-0.75px]">
                      Our trusted credentials & <span className="italic text-[#16A34A]">strategic advantages.</span>
                    </h4>
                    
                    <p className="text-[rgba(255,255,255,0.70)] font-normal text-[14px] leading-[22.75px]">
                      We support resilient infrastructure and sustainable development through a firm commitment to strict international quality, safety, and compliance parameters.
                    </p>

                    {/* Checkmark Bullet Points Frame */}
                    <div className="flex flex-col gap-3.5 mt-2">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center border border-[rgba(52,211,153,0.30)] bg-[rgba(52,211,153,0.05)]">
                          <Check className="w-2.5 h-2.5 text-[#34D399]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[rgba(255,255,255,0.80)] font-normal text-[12px] leading-[16px]">
                          Advanced Technology & Digital Tools
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center border border-[rgba(52,211,153,0.30)] bg-[rgba(52,211,153,0.05)]">
                          <Check className="w-2.5 h-2.5 text-[#34D399]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[rgba(255,255,255,0.80)] font-normal text-[12px] leading-[16px]">
                          Strong Project Management Capability
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center border border-[rgba(52,211,153,0.30)] bg-[rgba(52,211,153,0.05)]">
                          <Check className="w-2.5 h-2.5 text-[#34D399]" strokeWidth={2.5} />
                        </div>
                        <span className="text-[rgba(255,255,255,0.80)] font-normal text-[12px] leading-[16px]">
                          Proven Experience Across Public & Private Sectors
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-[294px] h-[300px] shrink-0 rounded-xl overflow-hidden self-center xl:self-start">
                    <Image src={currentAsset.imageSrc} alt="Core Benchmarks Verification Graphic" fill className="object-cover filter grayscale" sizes="294px" />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.00)_21.98%,rgba(0,0,0,0.30)_33.5%)] pointer-events-none" />
                    <div className="absolute bottom-3 left-4 z-20">
                      <span className="font-mono text-[#F43F5E] text-[10px] font-normal tracking-[1px] uppercase">
                        03 // HIGH BENCHMARKS
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

          </div>

        </div>
      </div>

    </section>
  );
};

export default OurFootprint;