"use client";

import React, { useEffect, useState } from "react";
import { useTeamStore, TeamMember } from "@/store/useTeamStore";
import AddTeamModal from "./_sections/AddTeamModal";
import AddTeamCategoryModal from "./_sections/AddTeamCategoryModal"; // 👈 IMPORTED NEW MODAL
import {
  Plus,
  FolderPlus,
  Edit2,
  Trash2,
  Loader2,
  Mail,
  Phone,
  Users,
  ShieldAlert,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export default function AdminTeamsManagement() {
  const {
    teamMembers,
    categories,
    isLoading,
    fetchTeamMembers,
    fetchCategories,
    deleteTeamMember,
  } = useTeamStore();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const [activeTabId, setActiveTabId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false); // 👈 MODAL TRIGGER STATE
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchTeamMembers();
  }, [fetchCategories, fetchTeamMembers]);

  useEffect(() => {
    if (categories.length > 0 && !activeTabId) {
      setActiveTabId(categories[0].id);
    }
  }, [categories, activeTabId]);

  const filteredMembers = teamMembers.filter(
    (m) => m.categoryId === activeTabId,
  );

  const handleEditClick = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to permanently remove this profile record?",
      )
    ) {
      await deleteTeamMember(id);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] p-6 lg:p-12 overflow-hidden text-white">
      <div className="absolute pointer-events-none   mix-blend-screen left-1/4 top-1/4 w-[800px] h-[400px] rounded-[800px] bg-[linear-gradient(270deg,rgba(0,151,56,0.12)_0%,rgba(255,0,0,0.12)_100%)] blur-[160px]" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        {/* Workspace Layout Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-neutral-800/60 pb-8  ">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[11px] tracking-[2.4px] uppercase">
                Workforce Node
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              REDCon HR{" "}
              <span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_25%,#16A34A_100%)]">
                Control Center
              </span>
            </h1>
          </div>

          {/* Action Control Button Stack */}
          <div className="flex flex-wrap gap-4">
            {/* 💡 NEW BUTTON: Opens the tier group configuration modal wrapper */}
            <button
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-[#EF4444]" />
              <span>Add Group Tier</span>
            </button>

            <button
              onClick={() => {
                setEditingMember(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
              style={{
                background:
                  "linear-gradient(270deg, rgba(0,151,56,0.85) 0%, rgba(255, 0, 0, 0.85) 100%)",
              }}
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Deploy Team Members</span>
            </button>
          </div>
        </div>

        {/* Dynamic Category Navigation Layer Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 p-1 bg-neutral-900/50 border border-neutral-800/60 rounded-[14px] w-full max-w-xl mb-10   backdrop-blur-md">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTabId(category.id)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] text-xs font-bold transition-all border cursor-pointer ${
                  activeTabId === category.id
                    ? "bg-neutral-950 border-neutral-800 text-emerald-400 font-semibold shadow-sm"
                    : "border-transparent text-white/50 hover:text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="h-64 w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 transition-all duration-300 hover:border-neutral-700/60 backdrop-blur-md flex flex-col justify-between group h-[580px]"
                  style={{
                    borderRadius: "35.2px",
                    border: "1px solid rgba(22, 163, 74, 0.30)",
                    background: "rgba(13, 92, 63, 0.10)",
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.10), 0 8px 10px -6px rgba(0, 0, 0, 0.10)",
                  }}
                >
                  <div>
                    <div
                      className="relative w-full overflow-hidden rounded-2xl mb-5 bg-neutral-950/40 border border-white/5"
                      style={{ height: "268px" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`${API_BASE_URL}${member.imageUrl}`}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-[1.01] transition-transform duration-500"
                      />

                      <div
                        className="absolute left-4 bottom-4 px-3 py-1.5 flex items-center gap-1.5"
                        style={{
                          borderRadius: "9999px",
                          border: "1px solid rgba(52, 211, 153, 0.30)",
                          background: "rgba(0, 0, 0, 0.85)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "9999px",
                            background: "#34D399",
                          }}
                        />
                        <span
                          style={{
                            color: "#34D399",
                            fontFamily: "Consolas, monospace",
                            fontSize: "9px",
                            letterSpacing: "0.9px",
                            textTransform: "uppercase",
                          }}
                        >
                          {member.role}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-white text-xl font-bold leading-7 tracking-tight mb-3 truncate group-hover:text-emerald-400 transition-colors">
                      {member.name}
                    </h4>

                    <div className="flex flex-col gap-2 text-xs font-semibold text-white/50">
                      <p>
                        <span className="text-white/80">Edu:</span>{" "}
                        {member.edu || "N/A"}
                      </p>
                      <p>
                        <span className="text-white/80">Expertise:</span>{" "}
                        {member.expertise || "N/A"}
                      </p>
                      {member.memberOf && (
                        <p className="line-clamp-1">
                          <span className="text-white/80">Member:</span>{" "}
                          {member.memberOf}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 mt-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-white/60 truncate bg-neutral-950/30 border border-white/5 px-3 py-2 rounded-xl">
                      <Mail
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "#DCA54E" }}
                      />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-white/60 truncate bg-neutral-950/30 border border-white/5 px-3 py-2 rounded-xl">
                      <Phone
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "#34D399" }}
                      />
                      <span>{member.phone}</span>
                    </div>

                    <div
                      className="flex items-center justify-between border-t pt-4 mt-2"
                      style={{ borderColor: "rgba(255, 255, 255, 0.05)" }}
                    >
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(member)}
                          className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-all cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-white/70 hover:text-emerald-400 transition-colors"
                        >
                          <span>LinkedIn</span>
                          <FaLinkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 border border-dashed border-neutral-800 rounded-[24px] flex flex-col items-center justify-center text-white/30 gap-2  ">
                <ShieldAlert className="w-6 h-6 text-white/20" />
                <span className="text-xs uppercase tracking-wider font-semibold">
                  No Records Registered Under This Bracket Tab.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 💡 MOUNTED CATEGORY GROUP FORM CREATOR OVERLAY */}
      <AddTeamCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
      />

      <AddTeamModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        editingMember={editingMember}
      />
    </div>
  );
}
