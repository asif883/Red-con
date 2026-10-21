"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ToolItem {
  id: number;
  name: string;
  category: string;
  image: string;
}

const toolsData: ToolItem[] = [
  {
    id: 1,
    name: "AutoCAD",
    category: "Drafting",
    image: "/images/tools/autocad.png",
  },
  {
    id: 2,
    name: "Civil 3D",
    category: "Infrastructure",
    image: "/images/tools/civil3d.png",
  },
  {
    id: 3,
    name: "Revit",
    category: "3D BIM Modeling",
    image: "/images/tools/revit.png",
  },
  {
    id: 4,
    name: "ArcGIS",
    category: "GIS Mapping",
    image: "/images/tools/arcgis.png",
  },
  {
    id: 5,
    name: "KoboToolbox",
    category: "Data Collection",
    image: "/images/tools/kobotoolbox.png",
  },
  {
    id: 6,
    name: "Power BI",
    category: "BI Analytics",
    image: "/images/tools/powerbi.png",
  },
];

const ToolCard: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  return (
    <div className="flex flex-col justify-center items-center p-6 rounded-[16px] bg-[#EF4444]/[0.10] shadow-[0_0_10px_0_rgba(239,68,68,0.40)] border border-transparent hover:border-[#EF4444]/30 transition-all duration-300 group w-full aspect-square sm:aspect-auto sm:h-[180px]">
      {/* Tool Icon Container */}
      <div className="relative w-14 h-14 shrink-0 mb-4 transition-transform duration-300 group-hover:scale-110">
        <Image
          src={tool.image}
          alt={`${tool.name} Logo`}
          fill
          className="object-contain"
          sizes="56px"
        />
      </div>

      {/* Tool Metadata Typography */}
      <h3 className="text-white  font-bold text-[14px] leading-[20px] tracking-[0.35px] text-center mb-1">
        {tool.name}
      </h3>
      <p className="text-[#9CA3AF]  font-normal text-[10px] leading-[15px] tracking-[0.5px] uppercase text-center">
        {tool.category}
      </p>
    </div>
  );
};

const Technology: React.FC = () => {
  return (
    <section className="w-full border-t border-b border-green-500/50 bg-[#166534]/[0.08] py-20 px-4 md:px-8 lg:px-16 flex items-center justify-center overflow-hidden">
      {/* 12-Column Responsive Layout Grid */}
      <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* LEFT COLUMN CONTENT CONTROLLER (SPAN 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6 w-full text-left">
          
          {/* Header Tag Component */}
          <div className="flex flex-col gap-4  ">
            <div className="flex items-center gap-3">
              {/* Green Accent Brand Bar */}
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]  font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                Technology we use
              </span>
            </div>

            {/* Core Header Segment Typography */}
            <h2 className="text-white  font-semibold text-3xl md:text-4xl lg:text-[44px] lg:leading-[50px] tracking-[-1.2px]">
              Powered By{" "}
              <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_0%,#16A34A_100%)]">
                Technology & Tools
              </span>
            </h2>
          </div>

          {/* Core Body Descriptive Text */}
          <p className="text-white/70  font-normal text-[15px] leading-[24px] max-w-[480px]">
            We leverage advanced licensed software, satellite imaging, structural analytical packages, 
            and high-precision survey drones to deliver reliable and secure engineering evaluations.
          </p>

          {/* Action Anchor Loop Link Element */}
          <button className="flex items-center gap-2 px-6 py-3 rounded-[6px] border border-white/30 text-[#D8D8D8]  font-semibold text-[14px] leading-[20px] transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-white/60 self-start mt-2">
            <span>Explore Technology</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>

        {/* RIGHT COLUMN GRID TRACK SYSTEM (SPAN 7) */}
        <div className="lg:col-span-7 w-full grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {toolsData.map((tool) => (
            <ToolCard key={`tool-item-${tool.id}`} tool={tool} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Technology;