"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, FileText, Loader2, Trash2, UploadCloud, X } from "lucide-react";
import type { Job } from "@/lib/api/jobs";

const MAX_CV_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

const inputClass =
  "w-full rounded-[10px] border border-white/10 bg-black/40 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-[#34D399]/60 transition-colors disabled:opacity-60";
const labelClass = "text-[11px] font-bold text-white/60 uppercase tracking-[1.4px]";

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const validateCv = (file: File) => {
  const name = file.name.toLowerCase();
  if (!ALLOWED_CV_EXTENSIONS.some((ext) => name.endsWith(ext))) return "CV must be a PDF, DOC or DOCX file.";
  if (file.size > MAX_CV_SIZE) return "CV must be 5MB or smaller.";
  return null;
};

const ApplyModal = ({ job, onClose }: { job: Job; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Escape closes the modal, and the page behind it stops scrolling
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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;
    const problem = validateCv(picked);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setCv(picked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cv) {
      setError("Please attach your CV.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const body = new FormData();
    body.append("jobId", String(job.id));
    body.append("jobTitle", job.title);
    body.append("name", name.trim());
    body.append("email", email.trim());
    body.append("mobile", mobile.trim());
    body.append("currentAddress", address.trim());
    body.append("cv", cv);

    try {
      const res = await fetch("/api/careers/apply", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Could not send your application. Please try again.");
      setIsSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-lenis-prevent
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`Apply for ${job.title}`}
        className="relative w-full max-w-[760px] max-h-[92vh] overflow-y-auto sm:overflow-visible rounded-2xl sm:rounded-[28px] bg-[#07130e] border border-white/10 shadow-[0_25px_100px_rgba(0,0,0,0.5)] p-6 sm:px-9 sm:py-8"
        initial={{ y: 35, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 25, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onClose}
          aria-label="Close application form"
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-white/20 text-white/80 hover:bg-[#16A34A] hover:text-white hover:border-[#16A34A] transition-all duration-300 cursor-pointer"
        >
          <X size={18} />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center text-center gap-4 py-8">
            <CheckCircle2 className="w-14 h-14 text-[#34D399]" />
            <h3 className="text-white text-[24px] font-bold">Application submitted</h3>
            <p className="text-white/60 text-[14px] leading-[24px] max-w-[380px]">
              Thank you, {name.trim()}. We have received your application for{" "}
              <span className="text-white">{job.title}</span>. A confirmation email has been sent to{" "}
              <span className="text-white">{email.trim()}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-2 rounded-full bg-[#16A34A] hover:bg-[#15803d] px-6 py-2.5 text-[14px] font-semibold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-[2px] bg-[#34D399]" />
              <span className="text-[#34D399] text-[11px] font-bold uppercase tracking-[3px]">Apply now</span>
            </div>
            <h3 className="text-white text-[24px] sm:text-[26px] font-bold leading-[1.2] pr-10">{job.title}</h3>
            <p className="text-white/50 text-[13px] mt-1 mb-5">
              {job.department} · {job.location} · {job.type}
            </p>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              {error && (
                <p role="alert" className="sm:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13px] text-red-300">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="apply-job" className={labelClass}>Applying for</label>
                <input id="apply-job" type="text" value={job.title} readOnly className={`${inputClass} cursor-not-allowed`} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="apply-name" className={labelClass}>Full name</label>
                <input
                  id="apply-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="apply-email" className={labelClass}>Email</label>
                <input
                  id="apply-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="apply-mobile" className={labelClass}>Mobile</label>
                <input
                  id="apply-mobile"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="[0-9+\s\-]{7,20}"
                  title="Enter a valid mobile number, e.g. +8801XXXXXXXXX"
                  placeholder="+8801XXXXXXXXX"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="apply-address" className={labelClass}>Current address</label>
                <textarea
                  id="apply-address"
                  required
                  rows={3}
                  autoComplete="street-address"
                  placeholder="House, road, area, city"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isSubmitting}
                  className={`${inputClass} flex-1 resize-none`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className={labelClass}>CV / Resume</span>
                {cv ? (
                  <div className="flex items-center gap-3 rounded-[10px] border border-white/10 bg-black/40 px-4 py-3">
                    <FileText className="w-5 h-5 text-[#34D399] shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-[13px] truncate">{cv.name}</p>
                      <p className="text-white/40 text-[11px]">{formatSize(cv.size)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCv(null)}
                      disabled={isSubmitting}
                      aria-label="Remove CV"
                      className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-1 flex-col items-center justify-center gap-1.5 py-4 rounded-[10px] border border-dashed border-white/20 text-white/50 hover:text-white/80 hover:border-[#34D399]/50 cursor-pointer transition-colors">
                    <UploadCloud className="w-6 h-6" />
                    <span className="text-[13px]">Click to upload your CV</span>
                    <span className="text-[11px] text-white/30">PDF, DOC or DOCX · max 5MB</span>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                  </label>
                )}
              </div>

              <div className="sm:col-span-2 flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-white/15 px-5 py-2.5 text-[14px] font-semibold text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[#16A34A] hover:bg-[#15803d] disabled:opacity-60 px-6 py-2.5 text-[14px] font-semibold text-white transition-colors cursor-pointer"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Application
                </button>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ApplyModal;
