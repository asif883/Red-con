"use client";

import React, { useMemo, useState } from "react";
import { BarChart3, RotateCcw, Save, Eye, AlertCircle, CheckCircle2 } from "lucide-react";
import { DEFAULT_STATS, type Stat } from "@/lib/stats";

const SUFFIX_OPTIONS = ["", "+", "%", "K+"];
const MAX_LABEL_LENGTH = 40;

// Form keeps the value as a string so the input can be cleared while typing
type StatDraft = { value: string; suffix: string; label: string };

const toDrafts = (stats: Stat[]): StatDraft[] =>
  stats.map((s) => ({ value: String(s.value), suffix: s.suffix ?? "", label: s.label }));

const validate = (draft: StatDraft) => {
  if (!/^\d+$/.test(draft.value)) return "Value must be a whole number.";
  if (!draft.label.trim()) return "Label is required.";
  return null;
};

export default function AdminStatsPage() {
  // TODO: load from the backend once the stats endpoint exists
  const [saved, setSaved] = useState<StatDraft[]>(() => toDrafts(DEFAULT_STATS));
  const [drafts, setDrafts] = useState<StatDraft[]>(saved);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const errors = drafts.map(validate);
  const hasErrors = errors.some(Boolean);
  const isDirty = useMemo(() => JSON.stringify(drafts) !== JSON.stringify(saved), [drafts, saved]);

  const updateDraft = (index: number, patch: Partial<StatDraft>) => {
    setNotice(null);
    setDrafts((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasErrors) {
      setNotice({ type: "error", text: "Fix the highlighted fields before saving." });
      return;
    }
    setIsSaving(true);
    // TODO: replace with the backend call, e.g. axiosPrivate.put("/stats", payload)
    await new Promise((r) => setTimeout(r, 500));
    setSaved(drafts);
    setIsSaving(false);
    setNotice({ type: "success", text: "Saved in this session only. The backend is not connected yet." });
  };

  const renderGroup = (title: string, start: number) => (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase border-b border-neutral-800 pb-2">
        {title}
      </span>
      {drafts.slice(start, start + 3).map((draft, offset) => {
        const index = start + offset;
        const error = errors[index];
        return (
          <div
            key={index}
            className={`p-4 rounded-[14px] bg-neutral-950/60 border transition-colors ${error ? "border-red-500/40" : "border-neutral-800/80"}`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-bold text-white/50 flex items-center justify-center">
                {index + 1}
              </span>
              <span className="text-xs font-semibold text-white/70 truncate">{draft.label || "Untitled stat"}</span>
            </div>

            <div className="grid grid-cols-[1fr_88px] gap-3 mb-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Value</label>
                <input
                  type="number"
                  min={0}
                  inputMode="numeric"
                  value={draft.value}
                  onChange={(e) => updateDraft(index, { value: e.target.value })}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50 text-white tabular-nums"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Suffix</label>
                <select
                  value={draft.suffix}
                  onChange={(e) => updateDraft(index, { suffix: e.target.value })}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50 text-white"
                >
                  {SUFFIX_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt || "None"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Label</label>
                <span className="text-[10px] text-white/30 tabular-nums">{draft.label.length}/{MAX_LABEL_LENGTH}</span>
              </div>
              <input
                type="text"
                maxLength={MAX_LABEL_LENGTH}
                value={draft.label}
                onChange={(e) => updateDraft(index, { label: e.target.value })}
                className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:outline-none focus:border-emerald-500/50 text-white"
              />
            </div>

            {error && (
              <p className="mt-2 flex items-center gap-1.5 text-[11px] text-red-300">
                <AlertCircle className="w-3 h-3" /> {error}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderPreviewStat = (draft: StatDraft, index: number) => (
    <div key={index} className="flex flex-col items-center text-center">
      <p className="text-3xl font-medium tabular-nums tracking-tight text-[#0B9D41]">
        {draft.value || 0}
        {draft.suffix}
      </p>
      <p className="mt-1 text-xs font-medium leading-5 text-white/80 max-w-[140px]">
        {draft.label || "—"}
      </p>
    </div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#050505] p-6 lg:p-12 overflow-hidden text-white">
      <div className="absolute pointer-events-none mix-blend-screen left-1/4 top-1/4 w-[800px] h-[400px] rounded-[800px] bg-[linear-gradient(270deg,rgba(0,151,56,0.12)_0%,rgba(0,151,56,0.12)_100%)] blur-[160px]" />

      <form onSubmit={handleSave} className="max-w-[1440px] mx-auto z-10 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-neutral-800/60 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] font-bold text-[11px] tracking-[2.4px] uppercase">Home Page</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Impact{" "}<span className="bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_25%,#16A34A_100%)]">Stats</span>
            </h1>
            <p className="mt-2 text-sm text-white/50 max-w-xl">
              These 6 numbers appear in the &quot;Transforming Real Estate Across Bangladesh&quot; section, 3 on each side of the map.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              disabled={!isDirty || isSaving}
              onClick={() => { setDrafts(saved); setNotice(null); }}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RotateCcw className="w-4 h-4 text-[#16A34A]" />
              <span>Discard</span>
            </button>
            <button
              type="submit"
              disabled={!isDirty || isSaving}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold text-black transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
            >
              <Save className="w-4 h-4 text-black" />
              <span>{isSaving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        </div>

        {notice && (
          <p
            role="status"
            className={`mb-6 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
              notice.type === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-300"
            }`}
          >
            {notice.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {notice.text}
          </p>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 items-start">
          {/* Editor */}
          <div className="p-5 lg:p-6 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-[#16A34A]" />
              <h2 className="text-sm font-bold">Edit Stats</h2>
              {isDirty && (
                <span className="ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                  Unsaved changes
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderGroup("Left of map (1–3)", 0)}
              {renderGroup("Right of map (4–6)", 3)}
            </div>
          </div>

          {/* Live preview */}
          <div className="xl:sticky xl:top-8 p-5 lg:p-6 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]">
            <div className="flex items-center gap-2 mb-5">
              <Eye className="w-4 h-4 text-[#16A34A]" />
              <h2 className="text-sm font-bold">Live Preview</h2>
            </div>
            <div className="rounded-[14px] bg-black border border-neutral-800 p-5">
              <p className="text-center text-sm font-semibold mb-6">
                Transforming Real Estate <span className="text-[#16A34A]">Across Bangladesh</span>
              </p>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
                <div className="flex flex-col gap-6">{drafts.slice(0, 3).map((d, i) => renderPreviewStat(d, i))}</div>
                <div className="w-px self-stretch bg-gradient-to-b from-transparent via-[#16A34A]/40 to-transparent" />
                <div className="flex flex-col gap-6">{drafts.slice(3).map((d, i) => renderPreviewStat(d, i + 3))}</div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-white/40">
              Simplified preview. On the site the map sits between the two columns.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
