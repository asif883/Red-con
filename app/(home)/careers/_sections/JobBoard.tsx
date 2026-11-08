"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { departments, formatDeadline, isValidApplyUrl, type Department, type Job } from "@/lib/api/jobs";

const JobBoard = ({ jobs }: { jobs: Job[] }) => {
  const [filter, setFilter] = useState<Department | "All">("All");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  const visibleJobs = filter === "All" ? jobs : jobs.filter((job) => job.department === filter);
  const options: (Department | "All")[] = ["All", ...departments];

  return (
    <section className="w-full py-20 bg-black">
      <div className="max-w-[1440px] mx-auto px-4 flex flex-col gap-10">
        {/* Department filter */}
        <div ref={dropdownRef} className="relative w-full sm:w-[280px] z-20">
          <button
            onClick={() => setIsOpen((open) => !open)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between gap-3 rounded-[10px] bg-[#0d5c3f] hover:bg-[#0f6b49] px-4 py-3 text-[14px] font-medium text-white transition-colors cursor-pointer"
          >
            <span>{filter === "All" ? "Filter by Department" : filter}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.ul
                role="listbox"
                initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                animate={{ opacity: 1, y: 0, scaleY: 1 }}
                exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                style={{ transformOrigin: "top" }}
                className="absolute left-0 right-0 mt-2 rounded-[10px] border border-white/10 bg-[#0a1410] py-2 shadow-2xl"
              >
                {options.map((option, index) => (
                  <motion.li
                    key={option}
                    role="option"
                    aria-selected={filter === option}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <button
                      onClick={() => {
                        setFilter(option);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[14px] transition-colors cursor-pointer ${
                        filter === option
                          ? "text-[#34D399] bg-white/[0.04]"
                          : "text-white/75 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      {option}
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Job list */}
        {visibleJobs.length === 0 ? (
          <div className="w-full py-12 rounded-[12px] bg-white/[0.05] border border-white/10 text-center text-white font-semibold">
            No Jobs Available
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[16px] border border-white/10 bg-[rgba(13,92,63,0.12)] p-6"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[#34D399] text-[12px] font-semibold uppercase tracking-[1.4px]">
                    {job.department}
                  </span>
                  <h3 className="text-white text-[20px] font-semibold">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-[13px]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span>{job.type}</span>
                    {job.deadline && <span>Deadline: {formatDeadline(job.deadline)}</span>}
                  </div>
                </div>
                {isValidApplyUrl(job.applyUrl) && (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center gap-2 rounded-full bg-[#16A34A] hover:bg-[#15803d] px-5 py-2.5 text-[14px] font-semibold text-white transition-colors"
                >
                  Apply <ArrowUpRight className="w-4 h-4" />
                </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobBoard;
