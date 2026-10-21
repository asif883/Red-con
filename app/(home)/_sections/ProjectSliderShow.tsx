"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Defines the data structure for a single project
interface ProjectItem {
  id: number;
  image: string;
  tag?: string;
  title?: string;
  description?: string;
  isUniversity?: boolean;
}

// Full dataset based on the requirements and provided images
const projectData: ProjectItem[] = [
  {
    id: 1,
    image: "/images/project-showcase/project1.png",
    tag: "Government Project",
    title: "Metro Rail Mirpur-12",
  },
  {
    id: 2,
    image: "/images/project-showcase/project2.png",
    tag: "Corporate Project",
    title: "University (BUP)",
    isUniversity: true,
  },
  {
    id: 3,
    image: "/images/project-showcase/project3.png",
    title: "Project Three Description",
  },
  {
    id: 4,
    image: "/images/project-showcase/project4.png",
    tag: "Government Project",
    title: "Metro Rail Mirpur-12",
  },
  {
    id: 5,
    image: "/images/project-showcase/project5.png",
    tag: "Corporate Project",
    title: "University (BUP)",
    isUniversity: true,
  },
  {
    id: 6,
    image: "/images/project-showcase/project6.png",
    title: "Project Three Description",
  },
  {
    id: 7,
    image: "/images/project-showcase/project4.png",
    tag: "Government Project",
    title: "Metro Rail Mirpur-12",
  },
  {
    id: 8,
    image: "/images/project-showcase/project2.png",
    tag: "Corporate Project",
    title: "University (BUP)",
    isUniversity: true,
  },
  {
    id: 9,
    image: "/images/project-showcase/project3.png",
    title: "Project Three Description",
  },
];

// Split data into unique columns for independent animation
const col1Data = projectData.slice(0, 3);
const col2Data = projectData.slice(3, 6);
const col3Data = projectData.slice(6, 9);

const ProjectCard: React.FC<{ item: ProjectItem }> = ({ item }) => (
  <div
    className="relative w-[338px] h-[238px] rounded-lg overflow-hidden shrink-0 group flex items-end pt-6 px-6 pb-4 bg-[linear-gradient(0deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.34)_31.38%,rgba(0,0,0,0.00)_45.74%)]"
  >
    <Image
      src={item.image}
      alt={item.title || "Project Image"}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      sizes="338px"
      priority={item.id <= 3}
    />
    <div className="relative z-10 w-full">
      {item.tag && (
        <span className="text-[#34D399]   text-xs font-bold uppercase tracking-[1px] block mb-1">
          {item.tag}
        </span>
      )}
      {item.isUniversity && (
        <div className="w-[80px] h-[1px] bg-neutral-600 mb-2" />
      )}
      {item.title && (
        <h3 className="text-white   text-lg font-bold leading-tight group-hover:text-[#34D399] transition-colors">
          {item.title}
        </h3>
      )}
    </div>
  </div>
);

const ProjectColumn: React.FC<{
  data: ProjectItem[];
  animateUp?: boolean;
}> = ({ data, animateUp = false }) => {
  const loopedData = [...data, ...data];
  const cardHeight = 238;
  const gap = 24; 
  const singleColHeight = loopedData.length * (cardHeight + gap);

  return (
    <div className="overflow-hidden w-[338px] h-[calc(3*238px+2*24px)] rounded-lg relative">
      <motion.div
        className="flex flex-col gap-6"
        style={{ height: `${singleColHeight}px` }}
        animate={{
          y: animateUp ? [`0px`, `-${singleColHeight / 2}px`] : [`-${singleColHeight / 2}px`, `0px`],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 15,
            ease: "linear",
          },
        }}
      >
        {loopedData.map((item, index) => (
          <ProjectCard key={`${item.id}-${index}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const ProjectSliderShow: React.FC = () => {
  const [animationDirection, setAnimationDirection] = useState<'normal' | 'reverse'>('normal');

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationDirection(prev => prev === 'normal' ? 'reverse' : 'normal');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-16 px-4 flex flex-col items-center overflow-hidden min-h-screen">
      
      {/* Main Container Card */}
      <div className="max-w-[1240px] w-full p-6 md:p-12 relative z-10 flex flex-col gap-12 rounded-[10px] bg-[#0d5c3f]/20 shadow-[0_0_10px_0_#166534] border border-[#34d399]/10">
        
        {/* Header Section */}
        <div className="flex items-center gap-4  ">
          {/* Green Dot */}
          <div className="shrink-0 w-2 h-2 rounded-full bg-[#34D399]" />
          
          {/* Title Text */}
          <h2 className="text-[#34D399]   text-[16px] font-bold tracking-[1px] uppercase leading-4">
            INTERACTIVE SHOWCASE Project WALL
          </h2>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">
          {/* Column 1: Hidden on mobile screens */}
          <div className="hidden md:block">
            <ProjectColumn data={col1Data} animateUp={animationDirection === 'reverse'} />
          </div>
          
          {/* Column 2: Always visible (Mobile & Desktop) */}
          <div className="block">
            <ProjectColumn data={col2Data} animateUp={animationDirection === 'normal'} />
          </div>
          
          {/* Column 3: Hidden on mobile screens */}
          <div className="hidden md:block">
            <ProjectColumn data={col3Data} animateUp={animationDirection === 'reverse'} />
          </div>
        </div>
      </div>

      {/* Massive Ambient Glow Layout Structure */}
      <div className="absolute z-0 bottom-[-300px] left-1/2 -translate-x-1/2 rotate-[-179.41deg] w-[1350px] h-[833.236px] rounded-[1350px] bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px] pointer-events-none" />
      
    </section>
  );
};

export default ProjectSliderShow;