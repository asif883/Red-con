"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const coreValues = [
  {
    title: "Integrity",
    description:
      "We conduct ourselves with honesty, professionalism, integrity and ethics in every step.",
  },
  {
    title: "Creative Execution",
    description: "Seeking and adapting to the new ideas for the best results.",
  },
  {
    title: "Client Satisfaction",
    description:
      "Client Satisfaction is a key priority of REDCon. The company is committed to understanding clients' needs, maintaining effective communication, and delivering high-quality engineering and consultancy services in accordance with project requirements, applicable standards, and agreed timelines.",
  },
  {
    title: "Focus on Quality",
    description:
      "Quality is our driving principle, so we always prioritize it above everything else.",
  },
  {
    title: "Evolve",
    description:
      "We continuously evolve our processes, methodologies, and capabilities to maintain the highest standards of service delivery.",
  },
  {
    title: "Commitment",
    description:
      "We commit to being trustworthy, taking ownership, being accountable, responsible in all that we do.",
  },
];

const storyBlocks = [
  {
    title: "Journey",
    body: "Founded in 2018, REDCon was born with a vision to offer consultancy and construction a holistic approach to solving the most pressing challenges. The name \"REDCon\" is derived from the words \"Research, Engineering & Development\" symbolizing \"Construction\" and \"Consultation\", representing the core of their services. The founders aimed to create a consulting firm that would become synonymous with reliability, innovation, and unwavering dedication to clients' success. As a multidisciplinary consulting house, its services cover all fields of civil, mechanical, electrical, environmental, socio-economic with a wide range of sectors like roads and bridges, design, construction, water resources, agriculture and fisheries, water systems, and sanitation, and communication technology and alternative social infrastructure sectors, etc.",
  },
  {
    title: "Who We Are",
    body: "REDCon (Research Engineering & Development Consultant Limited) is a multidisciplinary engineering and development consultancy firm in Bangladesh that provides professional services in civil engineering, infrastructure development, and project consultancy. Its areas of expertise include road and bridge engineering, structural and architectural design, feasibility studies, environmental and social impact assessments, urban planning, traffic engineering, water supply and sewerage systems, flood modelling, and climate change assessment. REDCon aims to deliver technically sound, sustainable, and practical engineering solutions through professional consultancy, engineering analysis, and project planning to support infrastructure development and improve project performance in Bangladesh.",
  },
];

const ValueItem: React.FC<{
  title: string;
  description: string;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, description, isOpen, onToggle }) => (
  <div className="border-b border-white/10 last:border-b-0">
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
    >
      <span
        className={`text-[18px] font-medium transition-colors ${
          isOpen ? "text-[#16A34A]" : "text-white group-hover:text-[#16A34A]"
        }`}
      >
        {title}
      </span>
      <span
        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
          isOpen
            ? "border-[#16A34A] text-[#16A34A]"
            : "border-white/30 text-white/60 group-hover:border-[#16A34A] group-hover:text-[#16A34A]"
        }`}
      >
        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 pr-10 text-white/65 text-[15px] leading-[24px]">
            {description}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const OurStory = () => {
  const [openValue, setOpenValue] = useState<number | null>(0);

  return (
    <section
      id="our-story"
      className="relative w-full py-24 overflow-hidden bg-black text-white scroll-mt-24"
    >
      <div className="absolute pointer-events-none mix-blend-screen left-1/2 -translate-x-1/2 top-0 w-[1488px] h-[581px] rounded-[1488px] bg-[linear-gradient(270deg,rgba(0,151,56,0.15)_0%,rgba(0,151,56,0.15)_100%)] blur-[250px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              our story
            </span>
          </div>
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Navigating <span className="text-[#16A34A]">The Future</span>
          </h2>
        </div>

        {/* Journey + Who We Are */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {storyBlocks.map((block) => (
            <div
              key={block.title}
              className="rounded-[24px] border border-[rgba(22,163,74,0.25)] bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] p-6 sm:p-10 flex flex-col gap-4"
            >
              <h3 className="text-[#16A34A] font-bold text-[14px] tracking-[2.4px] uppercase">
                {block.title}
              </h3>
              <p className="text-white/70 text-[15px] leading-[26px]">{block.body}</p>
            </div>
          ))}
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col gap-3 border-l-4 border-l-[#16A34A]">
            <span className="text-[#34D399] font-bold text-[13px] tracking-[2px] uppercase">Our Mission</span>
            <p className="text-white/80 text-[17px] leading-[28px]">
              To empower clients with innovative engineering solutions, strategic insights, and sustainable development practices that drive long-term growth, resilience, and operational excellence.
            </p>
          </div>
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6 sm:p-8 flex flex-col gap-3 border-l-4 border-l-[#16A34A]">
            <span className="text-[#34D399] font-bold text-[13px] tracking-[2px] uppercase">Our Vision</span>
            <p className="text-white/80 text-[17px] leading-[28px]">
              To become a leading engineering and development consultancy recognized for technical excellence, innovation, sustainability, and transformative impact across Bangladesh and beyond.
            </p>
          </div>
        </div>

        {/* Methods & Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-[#16A34A] font-bold text-[13px] tracking-[2.4px] uppercase">
              Our Methods and Values
            </span>
            <h3 className="text-white font-semibold text-2xl sm:text-3xl leading-tight">
              Six core values behind everything we deliver
            </h3>
            <p className="text-white/60 text-[15px] leading-[24px]">
              Our mission and vision are built on the belief and implementation of six core values.
            </p>
          </div>

          <div className="lg:col-span-7 rounded-[24px] border border-[rgba(22,163,74,0.25)] bg-[rgba(13,92,63,0.12)] px-6 sm:px-8">
            {coreValues.map((value, index) => (
              <ValueItem
                key={value.title}
                title={value.title}
                description={value.description}
                isOpen={openValue === index}
                onToggle={() => setOpenValue(openValue === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
