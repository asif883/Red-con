"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, MapPin, Users } from "lucide-react";
import { getErrorMessage } from "@/lib/api/projects";
import { deleteJob, formatDeadline, getAdminJobs, type Job } from "@/lib/api/jobs";
import JobModal from "./_sections/JobModal";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const [version, setVersion] = useState(0); // bump to reload after a save

  useEffect(() => {
    let cancelled = false;
    getAdminJobs()
      .then((data) => {
        if (cancelled) return;
        setJobs(data);
        setError(null);
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Failed to load jobs.")))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [version]);

  const handleDelete = async (job: Job) => {
    if (!confirm(`Delete the "${job.title}" job permanently?`)) return;
    try {
      await deleteJob(job.id);
      setJobs((prev) => prev.filter((j) => j.id !== job.id));
    } catch (err) {
      alert(getErrorMessage(err, "Failed to delete the job."));
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
              <span className="text-[#16A34A] font-bold text-[11px] tracking-[2.4px] uppercase">Content</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              Career{" "}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_25%,#16A34A_100%)]">Openings</span>
            </h1>
          </div>

          <button
            onClick={() => { setEditingJob(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold text-black transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer w-fit"
            style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add Job</span>
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
        ) : jobs.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-800/60 rounded-[20px]">
            <Users className="w-8 h-8 text-white/20" />
            <span className="text-white/40 text-sm">No job openings yet. Add your first one.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col justify-between gap-4 p-5 transition-all hover:border-neutral-700 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-800 text-white/80 border border-white/5">
                      {job.department}
                    </span>
                    <span className={`text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded ${job.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/70"}`}>
                      {job.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </div>
                  <h3 className="text-white text-lg font-bold tracking-tight">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span>{job.type}</span>
                    {job.deadline && <span>Deadline: {formatDeadline(job.deadline)}</span>}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-neutral-800/60 pt-4">
                  <button onClick={() => { setEditingJob(job); setIsModalOpen(true); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer" aria-label="Edit">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(job)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer" aria-label="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <JobModal
            key={editingJob?.id ?? "new"}
            onClose={() => { setIsModalOpen(false); setEditingJob(null); }}
            onSaved={() => setVersion((v) => v + 1)}
            editingJob={editingJob}
          />
        )}
      </div>
    </div>
  );
}
