"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ArrowRight, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What areas of expertise does REDCon cover?",
    answer:
      "REDCon specialize in a multi-disciplinary approach covering feasibility studies, traffic engineering, highway safety design, structural analytical evaluation, and modern GIS/data-driven mapping solutions.",
  },
  {
    id: 2,
    question: "How does REDCon ensure project success?",
    answer:
      "We blend advanced technical expertise with rigorous analytics, using industry-standard tools like AutoCAD, Civil 3D, and high-precision survey technologies to ensure structural viability and flawless execution.",
  },
  {
    id: 3,
    question: "Where is REDCon located and does it operate nationwide?",
    answer:
      "Our primary operational headquarters are centrally located, and our consulting team executes critical infrastructure, corporate planning, and safety assessments nationwide.",
  },
  {
    id: 4,
    question: "How can I request a project proposal or consultation?",
    answer:
      "You can easily request a professional consultation by clicking the action buttons below or directly scheduling a call with our advisory experts.",
  },
  {
    id: 5,
    question: "How can I request a project proposal or consultation?",
    answer:
      "For complex public or private sector engineering layouts, you can submit your criteria through our official channels to generate a custom technical proposal.",
  },
];

const AccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => {
  return (
    /* Question Card Base Style + Updated Hover Background Style */
    <div className="w-full rounded-[16px] border border-[#262626]/40 bg-[#171717]/30 hover:bg-[#0D5C3F]/40 overflow-hidden transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-5 flex items-center justify-between gap-4 text-left  "
      >
        <span className="text-white   font-semibold text-[18px] leading-[28px]">
          {item.question}
        </span>
        <div className="shrink-0 flex items-center justify-center w-6 h-6">
          {isOpen ? (
            <Minus className="w-5 h-5 text-white/40 stroke-[1.25px]" />
          ) : (
            <Plus className="w-5 h-5 text-white/40 stroke-[1.25px]" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 pt-1 text-white/70   text-[15px] leading-[24px]">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Faq: React.FC = () => {
  // Set to null so no accordion item is automatically open on load
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="relative w-full bg-black py-20 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center overflow-hidden min-h-screen gap-24">
      {/* Massive Top Background Glow Effect Element */}
      <div className="absolute pointer-events-none   z-0 right-[5.266px] top-[-792px] w-[1453.444px] h-[100.398px] rounded-[1453.444px] bg-[linear-gradient(0deg,rgba(239,68,68,0.30)_0%,rgba(239,68,68,0.30)_100%)] blur-[250px]" />

      {/* UPPER CONTAINER GRID: FAQ Titles + Quick Call CTA & Accordion Items */}
      <div className="max-w-[1440px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
        {/* LEFT COLUMN: Header & Call Box Component (SPAN 5) */}
        <div className="lg:col-span-5 flex flex-col gap-10 w-full">
          {/* Header Typography Elements */}
          <div className="flex flex-col gap-4  ">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444]   font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                FAQ
              </span>
            </div>
            <h2 className="text-white   font-semibold text-[44px] leading-[50px] tracking-[-1.2px]">
              Frequently Asked <br />
              <span className="italic text-[#16A34A]">Question</span>
            </h2>
          </div>

          {/* Call Booking CTA Card Block with updated Figma Background/Shadow Matrix tokens */}
          <div className="w-full rounded-[24px] border border-[#16a34a]/20 bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(69,10,10,0.40)_100%)] p-8 flex flex-col gap-6 shadow-xl backdrop-blur-[2px]">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-800">
                <Image
                  src="/images/director/director2.png"
                  alt="Director Consultation Expert"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <h3 className="text-white   font-bold text-[20px] leading-[28px]">
                Book a 15 min call
              </h3>
            </div>

            <p className="text-white/70   font-medium text-[14px] leading-[22.75px]">
              If you have any questions, just book a 15-minute call with us
              before starting your project.
            </p>

            <button className="w-full py-3 text-center bg-[#DC2626] hover:bg-red-700 active:scale-[0.99] transition-all text-white   font-bold text-[14px] leading-[20px] rounded-[16px] shadow-lg shadow-red-900/20">
              Book a Free Call
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Fully Interactive Accordions (SPAN 7) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          {faqData.map((item) => (
            <AccordionItem
              key={`faq-item-${item.id}`}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>

      {/* LOWER CONTAINER SYSTEM: Interactive Bottom Consultation Banner */}
      <div className="max-w-[1440px] w-full border border-neutral-900/60 bg-gradient-to-r from-neutral-950 via-[#0a160f]/60 to-neutral-950 p-8 md:p-12 rounded-[24px] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12 relative z-10 shadow-xl">
        {/* Left Aspect Header Layout Block */}
        <div className="flex flex-col gap-3 max-w-[480px] lg:shrink-0">
          <h2 className="  text-[32px] xl:text-[36px] font-bold leading-[38px] xl:leading-[40px] tracking-[0.9px] text-white">
            Ready To Start{" "}
            <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_0%,#FF0000_100%)]">
              Your Next Project?
            </span>
          </h2>
          <p className="text-[#F3F4F6]   font-light text-[15px] xl:text-[16px] leading-[22px] xl:leading-[24px]">
            Let&apos;s build a better future together. Contact our experts
            today.
          </p>
        </div>

        {/* Right Aspect Meta Action Layout Items - Locked onto a single row on desktop views */}
        <div className="flex flex-col md:flex-row lg:flex-nowrap items-start md:items-center gap-8 lg:gap-6 xl:gap-10 w-full lg:w-auto lg:shrink-0">
          {/* Call Line Box Component */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70   font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase">
                Call Us
              </span>
              <a
                href="tel:+8801989211290"
                className="text-white   font-bold text-[16px] leading-[24px] hover:text-[#16A34A] transition-colors whitespace-nowrap"
              >
                +880 1989 211290
              </a>
            </div>
          </div>

          {/* Email Line Box Component */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70   font-bold text-[12px] leading-[16px] tracking-[1.2px] uppercase">
                Email Us
              </span>
              <a
                href="mailto:info.redconbd@gmail.com"
                className="text-white   font-bold text-[16px] leading-[24px] hover:text-[#16A34A] transition-colors whitespace-nowrap"
              >
                info.redconbd@gmail.com
              </a>
            </div>
          </div>

          {/* Request Action Button Element */}
          <button className="flex items-center gap-3 px-6 py-4 rounded-[6px] bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-white   font-bold text-[14px] leading-[20px] tracking-[0.7px] uppercase transition-all duration-300 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] self-stretch md:self-auto justify-center group whitespace-nowrap grow sm:grow-0">
            <span>Request A Consultation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
