"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, User, Crown } from "lucide-react";
import { getErrorMessage } from "@/lib/api/projects";
import {
  boardImageSrc,
  bioParagraphs,
  deleteBoardMember,
  getAdminBoard,
  type BoardMemberRecord,
} from "@/lib/api/board";
import BoardModal from "./_sections/BoardModal";

export default function AdminBoardPage() {
  const [members, setMembers] = useState<BoardMemberRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<BoardMemberRecord | null>(null);

  const [version, setVersion] = useState(0); // bump to reload after a save

  useEffect(() => {
    let cancelled = false;
    getAdminBoard()
      .then((data) => {
        if (cancelled) return;
        setMembers(data);
        setError(null);
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Failed to load board members.")))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [version]);

  const handleDelete = async (member: BoardMemberRecord) => {
    if (!confirm(`Remove ${member.name} from the Board of Directors permanently?`)) return;
    try {
      await deleteBoardMember(member.id);
      setMembers((prev) => prev.filter((m) => m.id !== member.id));
    } catch (err) {
      alert(getErrorMessage(err, "Failed to delete the board member."));
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] p-6 lg:p-12 overflow-hidden text-white">
      <div className="absolute pointer-events-none mix-blend-screen left-1/4 top-1/4 w-[800px] h-[400px] rounded-[800px] bg-[linear-gradient(270deg,rgba(0,151,56,0.12)_0%,rgba(0,151,56,0.12)_100%)] blur-[160px]" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 border-b border-neutral-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] font-bold text-[11px] tracking-[2.4px] uppercase">Team</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Board of{" "}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_25%,#16A34A_100%)]">Directors</span>
            </h1>
            <p className="mt-2 text-xs text-white/40">
              Shown on the About Us and Our Team pages, in the order set below.
            </p>
          </div>

          <button
            onClick={() => { setEditingMember(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold text-black transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer w-fit"
            style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Board Member</span>
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 whitespace-pre-line">
            {error}
          </p>
        )}

        {isLoading ? (
          <div className="h-64 w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          </div>
        ) : members.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-800/60 rounded-[20px]">
            <Crown className="w-8 h-8 text-white/20" />
            <span className="text-white/40 text-sm">No board members yet. Add your first one.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.map((member) => {
              const src = boardImageSrc(member.image);
              return (
                <div key={member.id} className="group flex flex-col justify-between p-5 transition-all hover:border-neutral-700 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]">
                  <div>
                    <div className="relative w-full aspect-[4/5] bg-neutral-950 rounded-[14px] overflow-hidden mb-4 border border-neutral-800/50">
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt={member.name} className="w-full h-full object-cover object-top" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2">
                          <User className="w-8 h-8" />
                          <span className="text-[10px] tracking-wide uppercase">No Photo</span>
                        </div>
                      )}
                      <span className="absolute left-3 top-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/70 text-white/80 border border-white/10">
                        #{member.order}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="text-[#34D399] text-[11px] font-semibold uppercase tracking-[1.2px] truncate">{member.role}</span>
                      <span className={`shrink-0 text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded ${member.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/70"}`}>
                        {member.isPublished ? "PUBLISHED" : "HIDDEN"}
                      </span>
                    </div>

                    <h3 className="text-white text-base font-bold tracking-tight mb-2 line-clamp-2">{member.name}</h3>
                    <p className="text-white/40 text-xs line-clamp-3">{bioParagraphs(member.bio)[0]}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 border-t border-neutral-800/60 pt-4 mt-4">
                    <button onClick={() => { setEditingMember(member); setIsModalOpen(true); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer" aria-label="Edit">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(member)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer" aria-label="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isModalOpen && (
          <BoardModal
            key={editingMember?.id ?? "new"}
            onClose={() => { setIsModalOpen(false); setEditingMember(null); }}
            onSaved={() => setVersion((v) => v + 1)}
            editingMember={editingMember}
            nextOrder={members.length}
          />
        )}
      </div>
    </div>
  );
}
