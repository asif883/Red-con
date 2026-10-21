"use client";

import React, { useState } from "react";
import { useTeamStore } from "@/store/useTeamStore";
import { Layers, X } from "lucide-react";

interface AddTeamCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTeamCategoryModal({ isOpen, onClose }: AddTeamCategoryModalProps) {
  const { createTeamCategory } = useTeamStore();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const res = await createTeamCategory(name.trim());
    setLoading(false);
    
    if (res.success) {
      setName("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-[20px] p-6 shadow-2xl relative">
        <div className="flex items-center justify-between mb-4  ">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#16A34A]" />
            <h3 className="font-bold text-base text-white">New Tier Group Category</h3>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="e.g. Board of Directors"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500/50 text-white placeholder-white/20"
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-2.5 rounded-[10px] text-xs font-bold bg-[#16A34A] hover:bg-emerald-600 text-white transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? "Syncing..." : "Commit Category Group"}
          </button>
        </form>
      </div>
    </div>
  );
}