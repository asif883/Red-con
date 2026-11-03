
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { boardMembers, type BoardMember } from "./board-data";

// Initials
const initials = (name: string) =>
  name
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

// Portrait Component
const Portrait: React.FC<{
  member: BoardMember;
  sizes: string;
  fit?: "cover" | "contain";
}> = ({ member, sizes, fit = "cover" }) =>
  member.imageSrc ? (
    <Image
      src={member.imageSrc}
      alt={member.name}
      fill
      sizes={sizes}
      className={
        fit === "contain"
          ? "object-contain object-center"
          : "object-cover object-top"
      }
    />
  ) : (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d5c3f] to-[#022c22]">
      <span className="text-white/80 text-5xl font-semibold tracking-wider">
        {initials(member.name)}
      </span>
    </div>
  );

// Biography Modal
const BioModal: React.FC<{
  member: BoardMember;
  onClose: () => void;
}> = ({ member, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} biography`}
        className="relative w-full max-w-[1000px] max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-[28px] bg-[#07130e] border border-white/10 shadow-[0_25px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
        initial={{ y: 35, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 25, opacity: 0, scale: 0.97 }}
        transition={{
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close biography"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 backdrop-blur-md border border-white/20 text-white/80 hover:bg-[#16A34A] hover:text-white hover:border-[#16A34A] transition-all duration-300 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Image Section */}
        {/* Mobile: Top | Desktop: Right */}
        <div className="relative w-full md:w-[44%] shrink-0 h-[240px] sm:h-[320px] md:h-auto md:min-h-[580px] bg-white overflow-hidden order-1 md:order-2">
          <Portrait
            member={member}
            fit="contain"
            sizes="(max-width: 768px) 100vw, 440px"
          />

          {/* Subtle Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#166534] via-[#34D399] to-transparent" />
        </div>

        {/* Content Section */}
        {/* Mobile: Bottom | Desktop: Left */}
        <div className="relative flex-1 min-w-0 min-h-0 flex flex-col overflow-y-auto bio-modal-scroll order-2 md:order-1">
          {/* Background Decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#16A34A]/[0.07] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative flex-1 p-6 sm:p-9 lg:p-12 flex flex-col">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="w-7 h-[2px] bg-[#34D399]" />

              <span className="text-[#34D399] text-[10px] sm:text-[11px] font-bold uppercase tracking-[3px]">
                Board of Directors
              </span>
            </div>

            {/* Name */}
            <h3 className="text-white font-bold text-[28px] sm:text-[36px] lg:text-[40px] leading-[1.12] tracking-[-1px] uppercase">
              {member.name}
            </h3>

            {/* Role */}
            <div className="mt-5 flex items-center gap-3">
              <span className="w-1 h-6 rounded-full bg-[#16A34A]" />

              <p className="text-[#34D399] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[2px] leading-relaxed">
                {member.role}
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-[#16A34A]/50 via-white/10 to-transparent my-8" />

            {/* Biography */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <span className="text-white text-[11px] font-bold uppercase tracking-[2px]">
                  Biography
                </span>

                <span className="flex-1 h-px bg-white/10" />
              </div>

              <div className="flex flex-col gap-5">
                {member.bio.map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-white/65 text-[13px] sm:text-[14px] leading-[25px] sm:leading-[27px] font-normal"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-10 flex items-center gap-3">
              <div className="w-8 h-[2px] bg-[#16A34A]" />

              <span className="text-white/30 text-[9px] font-semibold uppercase tracking-[2.5px]">
                REDCon International
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Scrollbar */}
      <style jsx global>{`
        .bio-modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #166534 #0b1a12;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }

        .bio-modal-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .bio-modal-scroll::-webkit-scrollbar-track {
          background: #0b1a12;
          border-radius: 10px;
        }

        .bio-modal-scroll::-webkit-scrollbar-thumb {
          background: #166534;
          border-radius: 10px;
          border: 1px solid #0b1a12;
        }

        .bio-modal-scroll::-webkit-scrollbar-thumb:hover {
          background: #22a052;
        }
      `}</style>
    </motion.div>
  );
};

// Board of Directors
const BoardOfDirectors = () => {
  const [activeMember, setActiveMember] = useState<BoardMember | null>(null);

  const closeBio = useCallback(() => {
    setActiveMember(null);
  }, []);

  return (
    <section
      id="our-team"
      className="relative w-full py-24 bg-[rgba(5,150,105,0.10)] overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-16">

        {/* Section Heading */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />

            <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              board of directors
            </span>
          </div>

          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
            Guiding REDCon Towards <br />
            <span className="text-[#16A34A]">
              Sustainable Growth
            </span>
          </h2>
        </div>

        {/* Members Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardMembers.map((member) => (
            <div key={member.name} className="flex flex-col gap-4 group">

              {/* Member Image */}
              <button
                onClick={() => setActiveMember(member)}
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 cursor-pointer"
                aria-label={`Show bio of ${member.name}`}
              >
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                  <Portrait
                    member={member}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </button>

              {/* Member Information */}
              <div className="flex flex-col gap-1">
                <h3 className="text-white font-bold text-[15px] leading-[22px] uppercase tracking-[0.4px]">
                  {member.name}
                </h3>

                <span className="text-[#34D399] text-[12px] font-semibold tracking-[1.2px] uppercase">
                  {member.role}
                </span>
              </div>

              {/* Show Bio Button */}
              <button
                onClick={() => setActiveMember(member)}
                className="w-fit flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[1.4px] text-white/70 border-b border-white/30 pb-0.5 hover:text-[#16A34A] hover:border-[#16A34A] transition-colors cursor-pointer"
              >
                Show bio
                <Plus className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Biography Modal */}
      <AnimatePresence>
        {activeMember && (
          <BioModal
            member={activeMember}
            onClose={closeBio}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default BoardOfDirectors;
