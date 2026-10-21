"use client";

import React from "react";
import Image from "next/image";

interface BoardMember {
  id: number;
  name: string;
  roleTag: string;
  roleLabel: string;
  roleColorClass: string;
  description: string;
  imageSrc: string;
}

const ExecutiveBoard = () => {
  // Multi-Object Structured Array Containing Executive Board Dataset
  const boardData: BoardMember[] = [
    {
      id: 1,
      name: "Chairman",
      roleTag: "INSTITUTIONAL LEADERSHIP",
      roleLabel: "Chairman",
      roleColorClass: "text-[#DCA54E]",
      description: "Providing strategic direction, institutional leadership, and long-term organizational growth frameworks.",
      imageSrc: "/images/director/director1long.png",
    },
    {
      id: 2,
      name: "Managing Director",
      roleTag: "BUSINESS OPERATIONS & RELATIONS",
      roleLabel: "Managing Director",
      roleColorClass: "text-[#34D399]",
      description: "Leading overall business operations, project delivery coordinates, strategic client relationships, and company development.",
      imageSrc: "/images/director/director2long.png",
    },
    {
      id: 3,
      name: "Chief Executive Officer",
      roleTag: "OPERATIONAL EXCELLENCE",
      roleLabel: "Chief Executive Officer",
      roleColorClass: "text-[#F43F5E]",
      description: "Ensuring operational excellence, strict quality assurance protocols, master project management, and performance optimization.",
      imageSrc: "/images/director/director3.png",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-[rgba(5,150,105,0.10)] overflow-hidden flex flex-col justify-center">
      
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        
        {/* Core Global Header Alignment Block */}
        <div className="w-full flex flex-col gap-4">
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              executive board
            </span>
          </div>
          
          {/* Core Segment Heading Typography */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Guiding REDCon Towards{" "} <br />
            <span className="italic text-[#16A34A]">
              Sustainable Growth
            </span>
          </h2>
        </div>

        {/* Executive Cards Iterative Layout Grid System */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {boardData.map((member) => (
            <div
              key={member.id}
              className="w-full rounded-[40px] border border-[rgba(22,163,74,0.20)] bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] p-6 flex flex-col gap-6 text-left"
            >
              {/* Profile Image Frame with Exact Figma Height Definition */}
              <div className="relative w-full h-[273.33px] rounded-2xl overflow-hidden bg-neutral-900/40">
                <Image
                  src={member.imageSrc}
                  alt={`${member.roleLabel} Portrait`}
                  fill
                  sizes="(max-w-768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>

              {/* Identity & Core Organizational Assignment Meta Stack */}
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-[20px] leading-[28px] tracking-[-0.5px]">
                  {member.roleLabel}
                </h3>
                <span className={`font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase ${member.roleColorClass}`}>
                  {member.roleTag}
                </span>
              </div>

              {/* Functional Profile Operational Responsibility Summary Breakdown */}
              <div className="border-t border-[rgba(22,163,74,0.20)] pt-5">
                <p className="text-[rgba(255,255,255,0.50)] text-[12px] font-normal leading-[19px]">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExecutiveBoard;