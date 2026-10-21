"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { DBTeamMember } from "./Teams";

interface TeamCardProps {
  member: DBTeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const resolvedAvatarUrl = member.imageUrl.startsWith("http")
    ? member.imageUrl
    : `${API_BASE_URL}${member.imageUrl}`;

  return (
    <div 
      className="p-6 transition-all duration-300 hover:border-neutral-700/60 backdrop-blur-md flex flex-col justify-between h-full group"
      style={{
        borderRadius: "35.2px",
        border: "1px solid rgba(22, 163, 74, 0.30)",
        background: "rgba(13, 92, 63, 0.10)",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)"
      }}
    >
      <div>
        {/* Profile Image Token Frame */}
        <div className="relative w-full overflow-hidden rounded-2xl mb-5 bg-neutral-950/40 border border-white/5" style={{ height: "268px" }}>
          <Image
            src={resolvedAvatarUrl}
            alt={member.name}
            fill
            className="object-cover object-top transform group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 400px"
            // 💡 THE FIX: Conditionally controls optimization rendering patterns dynamically based on env variables
            unoptimized={process.env.NODE_ENV === "development"}
          />
          
          {/* Absolute Status Badge Overlay */}
          <div 
            className="absolute left-4 bottom-4 px-3 py-1.5 flex items-center gap-1.5  "
            style={{
              borderRadius: "9999px",
              border: "1px solid rgba(52, 211, 153, 0.30)",
              background: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(6px)"
            }}
          >
            <div style={{ width: "6px", height: "6px", borderRadius: "9999px", background: "#34D399" }} />
            <span 
              style={{
                color: "#34D399",
                fontFamily: "Consolas, monospace",
                fontSize: "9px",
                fontWeight: 400,
                lineHeight: "13.5px",
                letterSpacing: "0.9px",
                textTransform: "uppercase"
              }}
            >
              {member.role}
            </span>
          </div>
        </div>

        {/* Identity Row Text */}
        <h4 
          className="mb-3 text-white truncate"
          style={{
            fontSize: "20px",
            fontWeight: 700,
            lineHeight: "28px",
            letterSpacing: "-0.5px"
          }}
        >
          {member.name}
        </h4>

        {/* Metadata Parameter Info Block Grid */}
        <div className="flex flex-col gap-2.5 mb-6 text-left   text-xs leading-[16px] font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
          <p>
            <span className="text-white/80">Edu: </span>
            <span className="text-white/50">{member.edu || "N/A"}</span>
          </p>
          <p>
            <span className="text-white/80">Expertise: </span>
            <span className="text-white/50">{member.expertise || "N/A"}</span>
          </p>
          {member.memberOf && (
            <p className="line-clamp-1">
              <span className="text-white/80">Member: </span>
              <span className="text-white/50">{member.memberOf}</span>
            </p>
          )}
        </div>
      </div>

      {/* Interactive Communication Utility Layer */}
      <div className="flex flex-col gap-2.5">
        
        {/* Email Copy Row Link Block */}
        <div className="flex items-center justify-between gap-3 bg-neutral-950/30 rounded-xl px-3 py-2.5 border border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <Mail className="w-3.5 h-3.5 shrink-0" style={{ color: "#DCA54E" }} />
            <span className="truncate text-white/60 text-xs font-medium leading-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>
              {member.email}
            </span>
          </div>
          <button 
            type="button"
            onClick={() => handleCopy(member.email, "email")}
            className="text-white/30 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            {copiedField === "email" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#FFFFFF4D]" />}
          </button>
        </div>

        {/* Phone Copy Row Link Block */}
        <div className="flex items-center justify-between gap-3 bg-neutral-950/30 rounded-xl px-3 py-2.5 border border-white/5">
          <div className="flex items-center gap-2 min-w-0">
            <Phone className="w-3.5 h-3.5 shrink-0" style={{ color: "#34D399" }} />
            <span className="truncate text-white/60 text-xs font-medium leading-[16px]" style={{ fontFamily: "Inter, sans-serif" }}>
              {member.phone}
            </span>
          </div>
          <button 
            type="button"
            onClick={() => handleCopy(member.phone, "phone")}
            className="text-white/30 hover:text-white transition-colors cursor-pointer p-0.5"
          >
            {copiedField === "phone" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#FFFFFF4D]" />}
          </button>
        </div>

        {/* Card Lower Framing Footer Layout */}
        <div className="flex items-center justify-between border-t pt-3.5 mt-2  " style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}>
          <span 
            style={{
              color: "rgba(255, 255, 255, 0.30)",
              fontFamily: "Consolas, monospace",
              fontSize: "10px",
              fontWeight: 400,
              lineHeight: "15px",
              textTransform: "uppercase"
            }}
          >
            Personnel Record
          </span>

          {member.linkedinUrl && (
            <a 
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/70 hover:text-emerald-400 transition-colors text-xs font-normal leading-[16px]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <span>LinkedIn</span>
              <FaLinkedin className="w-3.5 h-3.5 text-white/70" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}