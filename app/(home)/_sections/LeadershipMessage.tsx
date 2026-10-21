"use client";

import React from "react";
import Image from "next/image";

interface MessageCardProps {
  avatar: string;
  name: string;
  role: string;
  roleColorClass: string;
  quote: string;
  footerLabel: string;
  footerStatus: string;
  statusColorClass: string;
}

const messageData: MessageCardProps[] = [
  {
    avatar: "/images/director/director1.png",
    name: "Chairman's Message",
    role: "REDCon Board",
    roleColorClass: "text-[#EF4444]",
    quote: "“Research Engineering & Development Consultant Ltd. (REDCon) is built on a commitment to innovation, excellence, and sustainable development. We drive strategic development forward.”",
    footerLabel: "Strategic Innovation",
    footerStatus: "Verified",
    statusColorClass: "text-[#10B981]",
  },
  {
    avatar: "/images/director/director2.png",
    name: "Managing Director's Vision",
    role: "Executive Leadership",
    roleColorClass: "text-[#10B981]",
    quote: "“Our future goals focus on expansion, robust growth strategies, and a relentless commitment to delivering impactful engineering and advisory solutions.”",
    footerLabel: "Future-focused Growth",
    footerStatus: "Strategic",
    statusColorClass: "text-[#EF4444]",
  },
];

const MessageCard: React.FC<MessageCardProps> = ({
  avatar,
  name,
  role,
  roleColorClass,
  quote,
  footerLabel,
  footerStatus,
  statusColorClass,
}) => {
  return (
    <div className="w-full rounded-[24px] border border-[#166534] bg-[#34D399]/[0.05] backdrop-blur-[2px] p-6 md:p-8 flex flex-col justify-between gap-8 group hover:border-[#34D399]/50 transition-all duration-300">
      
      {/* Upper Content Group */}
      <div className="flex flex-col gap-6">
        {/* Header Profile Section */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden bg-neutral-900 border border-neutral-800">
            <Image
              src={avatar}
              alt={name}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white  font-bold text-[20px] leading-[28px]">
              {name}
            </h3>
            <span className={` font-normal text-[14px] leading-[20px] ${roleColorClass}`}>
              {role}
            </span>
          </div>
        </div>

        {/* Quote Content area */}
        <p className="text-white/80  font-normal text-[18px] leading-[32px]">
          {quote}
        </p>
      </div>

      {/* Footer Section with Thin Border Divider Line */}
      <div className="w-full pt-4 border-t border-white/5 flex items-center justify-between  ">
        <span className="text-white/40  font-normal text-[14px] leading-[20px]">
          {footerLabel}
        </span>
        <span className={` font-normal text-[14px] leading-[20px] ${statusColorClass}`}>
          {footerStatus}
        </span>
      </div>

    </div>
  );
};

const LeadershipMessage: React.FC = () => {
  return (
    <section className="w-full bg-neutral-950 py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col gap-12">
        
        {/* Header Section Container */}
        <div className="flex flex-col gap-4  ">
          <div className="flex items-center gap-3">
            {/* Green Segment Accent Bar */}
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444]  font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              LEADERSHIP MESSAGE
            </span>
          </div>
          
          <h2 className="text-white  font-semibold text-3xl md:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Guided by Vision &{" "}
            <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_27.4%,#16A34A_78.85%)]">
              Excellence
            </span>
          </h2>
        </div>

        {/* Responsive Grid Split Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
          {messageData.map((message, index) => (
            <MessageCard key={`leader-msg-${index}`} {...message} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipMessage;