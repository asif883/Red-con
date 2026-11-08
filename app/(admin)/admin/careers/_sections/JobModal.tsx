"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { getErrorMessage } from "@/lib/api/projects";
import {
  JOB_TYPES,
  createJob,
  departments,
  isValidApplyUrl,
  updateJob,
  type Job,
  type JobFormValues,
} from "@/lib/api/jobs";

interface JobModalProps {
  onClose: () => void;
  onSaved: () => void;
  editingJob: Job | null;
}

const emptyForm: JobFormValues = {
  title: "",
  department: departments[0],
  location: "",
  type: JOB_TYPES[0],
  deadline: "",
  applyUrl: "",
  isPublished: true,
};

const inputClass =
  "w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white disabled:opacity-40";

const labelClass = "text-[11px] font-bold text-white/60 uppercase tracking-wider";

// Mounted only while open (keyed by job), so state starts from the job being edited
export default function JobModal({ onClose, onSaved, editingJob }: JobModalProps) {
  const [form, setForm] = useState<JobFormValues>(() =>
    editingJob
      ? {
          title: editingJob.title,
          department: editingJob.department,
          location: editingJob.location,
          type: editingJob.type,
          deadline: editingJob.deadline ? editingJob.deadline.slice(0, 10) : "",
          applyUrl: editingJob.applyUrl,
          isPublished: editingJob.isPublished,
        }
      : emptyForm
  );
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = <K extends keyof JobFormValues>(key: K, value: JobFormValues[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidApplyUrl(form.applyUrl)) {
      setError("Apply link must start with https://, http:// or mailto:");
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      if (editingJob) await updateJob(editingJob.id, form);
      else await createJob(form);
      onSaved();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save the job."));
    } finally {
      setIsSaving(false);
    }
  };

  // A type outside the preset list (saved earlier) must stay selectable
  const typeOptions = JOB_TYPES.includes(form.type) ? JOB_TYPES : [form.type, ...JOB_TYPES];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-[24px] p-6 lg:p-8 my-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{editingJob ? "Edit Job" : "Add New Job"}</h2>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {error && (
            <p role="alert" className="sm:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 whitespace-pre-line">
              {error}
            </p>
          )}

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Job Title</label>
            <input type="text" required value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Department</label>
            <select value={form.department} onChange={(e) => setField("department", e.target.value as JobFormValues["department"])} className={inputClass}>
              {departments.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Type</label>
            <select value={form.type} onChange={(e) => setField("type", e.target.value)} className={inputClass}>
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Location</label>
            <input type="text" required placeholder="e.g. Dhaka" value={form.location} onChange={(e) => setField("location", e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Deadline (Optional)</label>
            <input type="date" value={form.deadline} onChange={(e) => setField("deadline", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Apply Link</label>
            <input type="text" required placeholder="https://... or mailto:hr@example.com" value={form.applyUrl} onChange={(e) => setField("applyUrl", e.target.value)} className={inputClass} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Visibility</label>
            <select value={form.isPublished ? "published" : "draft"} onChange={(e) => setField("isPublished", e.target.value === "published")} className={inputClass}>
              <option value="published">Published (visible on the website)</option>
              <option value="draft">Draft (hidden)</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3 pt-4 border-t border-neutral-800">
            <button type="button" onClick={onClose} className="px-5 py-3 rounded-[10px] text-[13px] font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/50 cursor-pointer">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 rounded-[10px] text-[13px] font-bold text-black disabled:opacity-60 cursor-pointer"
              style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
            >
              {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
              {editingJob ? "Save Changes" : "Add Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
