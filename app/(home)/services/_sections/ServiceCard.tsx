"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  subItems: string[];
  imageSrc: string;
  metricValue: string;
  metricLabel: string;
  metricDesc: string;
  standardsLabel: string;
  standardsTitle: string;
  standardsDesc: string;
}

interface ServiceCardProps {
  service: ServiceData;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="w-full border-t border-white/10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
      {/* LEFT COLUMN: Narrative, Indices & Controls (Span 5) */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {/* Index Counter Indicator */}
          <span className="font-mono text-[#16A34A] text-[12px] font-bold tracking-wider">
            {service.id}
          </span>
          {/* Core Title */}
          <h3 className="text-white font-semibold text-3xl lg:text-[40px] lg:leading-[40px] tracking-[-0.9px]">
            {service.title}
          </h3>
        </div>

        {/* Technical Specification Summary Paragraph */}
        <p className="text-[rgba(255,255,255,0.70)] text-[14px] font-normal leading-[22.75px]">
          {service.description}
        </p>

        {/* Nested Sub-categories Feature Set List */}
        <div className="flex flex-col border-t border-white/5 mt-2">
          {service.subItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b border-white/5 transition-colors duration-300 hover:bg-white/[0.01]"
            >
              <div className="flex items-center gap-4">
                <span className="text-[#16A34A] text-[12px] font-bold tracking-[0.3px]">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-[rgba(255,255,255,0.80)] text-[12px] font-semibold tracking-[0.3px]">
                  {item}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Triggers Grid Block Layout */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {/* Request Quote Standard Anchor Button */}
          <button className="rounded-full border border-[#262626] bg-[#171717] px-6 py-3 text-white text-[12px] font-semibold uppercase tracking-[1.2px] transition-all duration-300 hover:border-[#16A34A] hover:text-[#16A34A] cursor-pointer">
            Request Quote
          </button>

          {/* View Details Advanced Interactive Action Module */}
          <button className="group flex items-center gap-3 rounded-full border border-[#16A34A] bg-white/5 px-6 py-2 text-white text-[12px] font-semibold uppercase tracking-[0.6px] transition-all duration-300 hover:bg-[#16A34A] hover:border-white/10 cursor-pointer">
            <span>View Details</span>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20">
              <ArrowUpRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Media Frame & Analytical Metrics Grid (Span 7) */}
      <div className="lg:col-span-7 flex flex-col gap-5 w-full">
        {/* Dynamic Image Representation Box */}
        <div className="relative w-full h-[240px] sm:h-[322.73px] rounded-2xl overflow-hidden bg-neutral-900/40">
          <Image
            src={service.imageSrc}
            alt={`${service.title} Process Context Visualization`}
            fill
            className="object-cover "
            sizes="(max-w-1024px) 100vw, 55vw"
          />
        </div>

        {/* Dashboard Widgets Frame Group split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* Widget Variant 1: Continuous Heat Map Metric Performance Block */}
          <div className="rounded-[16px] bg-[rgba(16,185,129,0.50)] p-6 flex flex-col justify-between gap-6 relative overflow-hidden text-white min-h-[160px]">
            {/* Top Bar Accent Mask overlay element */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black rounded-t-[2px] z-10" />

            {/* Absolute Background Structural Bar Chart Pattern */}
            <div className="absolute bottom-0 right-6 flex items-end gap-1.5 h-20 w-48 pointer-events-none   opacity-20 z-0">
              <div className="w-16 h-[25%] bg-black rounded-t-[3px]" />
              <div className="w-16 h-[50%] bg-black rounded-t-[3px]" />
              <div className="w-16 h-[90%] bg-black rounded-t-[3px]" />
              <div className="w-16 h-[70%] bg-black rounded-t-[3px]" />
            </div>

            {/* Content Layered Above Background Graph */}
            <span className="relative z-10 font-extrabold text-[36px] leading-[40px] tracking-[-0.9px]">
              {service.metricValue}
            </span>
            <div className="relative z-10 flex flex-col gap-1">
              <h4 className="text-[14px] font-extrabold leading-[20px] tracking-[0.35px] uppercase">
                {service.metricLabel}
              </h4>
              <p className="text-[10px] font-normal leading-[12.5px] opacity-90">
                {service.metricDesc}
              </p>
            </div>
          </div>

          {/* Widget Variant 2: Technical Standard Framework Certification Box */}
          <div className="rounded-[16px] border border-[rgba(22,163,74,0.20)] bg-[rgba(22,163,74,0.03)] p-6 flex flex-col justify-between gap-6 min-h-[160px]">
            {/* Header Title Metadata Block */}
            <div className="flex items-center justify-between border-b border-[rgba(22,163,74,0.20)] pb-3 w-full">
              <span className="font-mono text-[rgba(255,255,255,0.40)] text-[10px] font-normal tracking-[1px] uppercase">
                {service.standardsLabel}
              </span>
              <div className="w-2 h-2 rounded-full bg-[#009738]" />
            </div>

            {/* Content Identity Stack */}
            <div className="flex flex-col gap-1">
              <h4 className="text-white font-bold text-[16px] leading-[20px]">
                {service.standardsTitle}
              </h4>
              <p className="text-[rgba(255,255,255,0.50)] text-[12px] font-light leading-[19.5px]">
                {service.standardsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
