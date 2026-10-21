"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceItem {
  id: number;
  title: string;
  points: string[];
  images: string[];
}

const Services = () => {
  // Set to null so that on first load all accordion details are hidden
  const [activeId, setActiveId] = useState<number | null>(null);

  const servicesData: ServiceItem[] = [
    {
      id: 1,
      title: "Survey & Monitoring",
      points: [
        "Baseline Study",
        "Topographic Survey",
        "Drone Survey",
        "Environmental Survey",
        "Traffic Survey",
        "Geotechnical Investigation Survey",
      ],
      images: [
        "/images/services/service1_1.png",
        "/images/services/service1_2.png",
        "/images/services/service1_3.png",
      ],
    },
    {
      id: 2,
      title: "Environmental Engineering & Design",
      points: [
        "EIA & SIA Studies",
        "Waste Management Systems",
        "Pollution Control Design",
        "Renewable Energy Assessment",
      ],
      images: [
        "/images/services/service2_1.jpg",
        "/images/services/service2_2.jpg",
        "/images/services/service2_3.jpg",
      ],
    },
    {
      id: 3,
      title: "Pre-Project Study",
      points: [
        "Feasibility Analysis",
        "Risk Assessment Mitigation",
        "Cost-Benefit Frameworks",
        "Site Selection Studies",
      ],
      images: [
        "/images/services/service3_1.png",
        "/images/services/service3_2.png",
        "/images/services/service3_3.png",
      ],
    },
    {
      id: 4,
      title: "Approval Support",
      points: [
        "Regulatory Compliance Audit",
        "Permit Documentation Support",
        "Government Agency Liaison",
      ],
      images: [
        "/images/services/service4_1.png",
        "/images/services/service4_2.png",
        "/images/services/service4_3.png",
      ],
    },
    {
      id: 5,
      title: "Urban & Regional Planning",
      points: [
        "Master Plan Layouts",
        "Zoning & Land Use Controls",
        "Smart City Framework Design",
      ],
      images: [
        "/images/services/service5_1.png",
        "/images/services/service5_2.png",
        "/images/services/service5_3.png",
      ],
    },
    {
      id: 6,
      title: "Road Infrastructure",
      points: [
        "Highway & Bridge Engineering",
        "Pavement Design Analysis",
        "Geometric Network Planning",
      ],
      images: [
        "/images/services/service6_1.png",
        "/images/services/service6_2.png",
        "/images/services/service6_3.png",
      ],
    },
    {
      id: 7,
      title: "Building Infrastructure",
      points: [
        "Structural System Analysis",
        "MEP Design Coordination",
        "High-Rise Construction Design",
      ],
      images: [
        "/images/services/service7_1.png",
        "/images/services/service7_2.png",
        "/images/services/service7_3.png",
      ],
    },
    {
      id: 8,
      title: "Assessment and Analysis",
      points: [
        "Structural Integrity Testing",
        "Forensic Engineering Analysis",
        "Lifecycle Asset Optimization",
      ],
      images: [
        "/images/services/service8_1.png",
        "/images/services/service8_2.png",
        "/images/services/service8_3.png",
      ],
    },
  ];

  // Displays the images of the active item, or falls back to item 1 images if nothing is selected yet
  const currentActiveService =
    servicesData.find((s) => s.id === activeId) || servicesData[0];

  return (
    <section className="relative w-full py-20 overflow-hidden  flex items-center justify-center">
      {/* Figma Ambient Background Glow Spot 1 (Top Left) */}
      {/* Figma Ambient Background Glow Spot 1 (Top Left) */}
      <div className="absolute pointer-events-none     left-[-73px] top-[62px] w-[504px] h-[504px] rounded-[504px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />

      {/* Figma Ambient Background Glow Spot 2 (Top Right) */}
      <div className="absolute pointer-events-none     right-[-143px] top-[3px] w-[512px] h-[504px] rounded-[512px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />

      {/* Figma Ambient Background Glow Spot 3 (Below Image Section) */}
      <div className="absolute pointer-events-none    left-[712px] bottom-[130px] w-[1280px] h-[349px] rounded-[1280px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end w-full">
          <div className="flex flex-col gap-4">
            {/* Top Indicator Subheader */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]  font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                Services
              </span>
            </div>

            {/* Main Typographic Heading */}
            <h2 className="text-white  font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Comprehensive Engineering &{" "}
              <span
                className="italic bg-clip-text text-transparent"
                style={{
                  background:
                    "linear-gradient(270deg, #16A34A 33.65%, #FF0000 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Consultancy
              </span>{" "}
              Solutions
            </h2>
          </div>

          {/* Right Column Short Summary Description */}
          <div className="max-w-xl">
            <p className="text-white/70  text-base sm:text-[20px] font-normal leading-[32.5px]">
              REDCon provides end-to-end consultancy services across multiple
              sectors with a focus on quality, innovation and sustainability.
            </p>
          </div>
        </div>

        {/* Dynamic Accordion Interactive Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start w-full">
          {/* Left Column Stacked Accordion List */}
          <div className="flex flex-col gap-4 w-full">
            {servicesData.map((service) => {
              const isSelected = service.id === activeId;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveId(isSelected ? null : service.id)}
                  className={`w-full transition-all duration-300 cursor-pointer overflow-hidden`}
                  style={
                    isSelected
                      ? {
                          borderRadius: "24px",
                          border: "1px solid rgba(97, 97, 97, 0.60)",
                          backgroundColor: "rgba(59, 57, 57, 0.40)",
                          backdropFilter: "blur(2px)",
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)",
                          padding: "1.5rem",
                        }
                      : {
                          borderRadius: "16px",
                          border: "1px solid rgba(38, 38, 38, 0.50)",
                          backgroundColor: "rgba(23, 23, 23, 0.40)",
                          backdropFilter: "blur(2px)",
                          padding: "1.5rem",
                        }
                  }
                >
                  {/* Top Accordion Row Header */}
                  <div className="flex items-center justify-between gap-4  ">
                    <h3
                      className={` text-lg sm:text-[24px] leading-snug transition-colors duration-200 ${
                        isSelected
                          ? "text-[#16A34A] font-semibold tracking-[-0.75px]"
                          : "text-white font-normal tracking-[-0.6px]"
                      }`}
                    >
                      {service.title}
                    </h3>

                    {/* Action Dynamic Toggle Icon Wrap */}
                    <div
                      className={`w-10 h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center transition-all ${
                        isSelected ? "bg-[#16A34A]" : "bg-transparent"
                      }`}
                    >
                      {isSelected ? (
                        <ChevronUp className="w-5 h-5 text-white" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/70" />
                      )}
                    </div>
                  </div>

                  {/* Framer Motion Expandable Detailed Context Panel */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="mt-6 flex flex-col gap-6">
                          <ul className="flex flex-col gap-3 pl-4 list-disc text-white/90  text-sm sm:text-[20px] font-normal leading-[28px]">
                            {service.points.map((point, idx) => (
                              <li key={idx} className="marker:text-neutral-500">
                                {point}
                              </li>
                            ))}
                          </ul>

                          {/* Action Redirection Component Element */}
                          <div className="flex items-center gap-2 mt-2 group w-max">
                            <span className="text-white font-medium text-base sm:text-[18px] leading-[28px] font-mono tracking-wide">
                              Learn More
                            </span>
                            <ArrowUpRight className="w-5 h-5 text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right Column Layout Showcase Gallery Views */}
          <div className="w-full flex flex-col gap-4 sticky top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActiveService.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col gap-4"
              >
                {/* Primary Large Highlight Showcase Block Frame */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image
                    src={currentActiveService.images[0]}
                    alt={`${currentActiveService.title} Highlight`}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 700px"
                    priority
                  />
                </div>

                {/* Sub-grid Dual Support Framework Items */}
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                    <Image
                      src={currentActiveService.images[1]}
                      alt={`${currentActiveService.title} Details A`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 50vw, 350px"
                    />
                  </div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                    <Image
                      src={currentActiveService.images[2]}
                      alt={`${currentActiveService.title} Details B`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 50vw, 350px"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
