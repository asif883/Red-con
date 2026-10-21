"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: React.FC = () => {
  // Safe handling for Server-Side Rendering hydration matching
  

  return (
    <footer className="w-full bg-[#030303] pt-20 pb-8 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center border-t border-neutral-900 overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col gap-12">
        
        {/* TOP MULTI-COLUMN LINK GRID MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-6 items-start w-full">
          
          {/* Column 1: Brand Identifier & Descriptive Profile (SPAN 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-40 h-10 shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt="REDCon Logo"
                  fill
                  className="object-contain"
                />
              </div>
             
            </div>
            
            <p className="text-white/60  font-normal text-[12px] leading-[19.5px] max-w-[320px]">
              Research Engineering & Development Consultant Limited (REDCon Ltd.) is a premier multidisciplinary engineering consultancy partner based in Bangladesh.
            </p>
          </div>

          {/* Column 2: Quick Links Directory (SPAN 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["Home", "About", "Services", "Projects", "Team", "Contact"].map((link) => (
                <li key={`quick-${link}`}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/60  font-normal text-[12px] leading-[16px] hover:text-[#16A34A] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Functional Services Area (SPAN 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              SERVICES
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "Infrastructure Design",
                "Environmental Consulting",
                "Transportation Planning",
                "Survey & Monitoring",
                "Urban Planning",
              ].map((service) => (
                <li key={`service-${service}`}>
                  <a href="#" className="text-white/60  font-normal text-[12px] leading-[16px] hover:text-[#16A34A] transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Core Industries Domain (SPAN 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              INDUSTRIES
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "Roads & Highways",
                "Bridges & Structures",
                "Urban Development",
                "Public Utilities",
              ].map((industry) => (
                <li key={`industry-${industry}`}>
                  <a href="#" className="text-white/60  font-normal text-[12px] leading-[16px] hover:text-[#16A34A] transition-colors">
                    {industry}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Direct Contact Details Row (SPAN 2) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              CONTACT DETAILS
            </h4>
            <ul className="flex flex-col gap-2.5 text-white/60  font-normal text-[12px] leading-[16px]">
              <li>4/20 Happy House</li>
              <li>Mohammadpur, Dhaka</li>
              <li>
                <a href="mailto:info.redconbd@gmail.com" className="hover:text-[#16A34A] transition-colors">
                  info.redconbd@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+8801989211290" className="hover:text-[#16A34A] transition-colors">
                  +8801989211290
                </a>
              </li>
              <li className="text-white/40 italic">Customer service</li>
            </ul>
          </div>

        </div>

        {/* MIDDLE SECTION: HORIZONTAL SPLIT DIVIDER */}
        <div className="w-full h-[1px] bg-white/[0.05] mt-6" />

        {/* MASSIVE BRANDING WATERMARK SHOWCASE */}
        <div className="w-full flex items-center justify-center   py-4 overflow-hidden">
          <h1 className="text-center  font-black tracking-[4px] md:tracking-[8px] lg:tracking-[12.08px] text-[44px] sm:text-[90px] md:text-[130px] lg:text-[185px] leading-none bg-clip-text text-transparent bg-[linear-gradient(270deg,rgba(22,163,74,0.30)_0%,rgba(255,0,0,0.30)_100%)] uppercase transition-all">
            REDCon Ltd.
          </h1>
        </div>

        {/* BOTTOM UTILITY REGISTRATION FOOTER BAR */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/[0.03]">
          
          {/* Left Area: Dynamic Copyright Statement */}
          <span className="text-white/40  font-medium text-[12px] leading-[16px] text-center md:text-left  ">
            © {new Date().getFullYear()} REDCon Ltd. All rights reserved.
          </span>

          {/* Right Area: Policy Agreements and Platform Credits */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a href="#" className="text-white/40  font-medium text-[12px] leading-[16px] hover:text-white/80 transition-colors">
              Terms of Policy
            </a>
            <a href="#" className="text-white/40  font-medium text-[12px] leading-[16px] hover:text-white/80 transition-colors">
              Privacy Policy
            </a>
            
            {/* Creator Attribution Tag Integration */}
            <Link href="https://webbriks.com" target="_blank" className="flex items-center gap-2  ">
              <span className="text-white  font-bold text-[10px] leading-[16.5px] tracking-wide" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                Made by
              </span>
              <div className="relative w-16 h-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/logo/webbriks.png"
                  alt="Webbriks Logo"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;