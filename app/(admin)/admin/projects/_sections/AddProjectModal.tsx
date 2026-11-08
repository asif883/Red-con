"use client";

import React, { useState, useEffect } from "react";
import { useProjectStore, Project } from "@/store/useProjectStore";
import {
  ProjectImageKey as ImageKey,
  PROJECT_IMAGE_KEYS as IMAGE_KEYS,
  imageUrl,
  toFormData,
  validateImageFile,
} from "@/lib/api/projects";
import { X, UploadCloud, Trash2 } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
}

type ImageSlot = { file: File | null; preview: string | null };

const STEP_KEYS: ImageKey[] = ["stepImg1", "stepImg2", "stepImg3"];

const emptyForm = {
  title: "",
  slug: "",
  categoryId: "",
  client: "",
  location: "",
  projectStatus: "Ongoing" as Project["projectStatus"],
  startDate: "",
  endDate: "",
  status: "DRAFT" as Project["status"],
  description: "",
  scopeOfWork: "",
  engineeringHighlights: "",
};

const emptyImages = (): Record<ImageKey, ImageSlot> => ({
  imageMain: { file: null, preview: null },
  stepImg1: { file: null, preview: null },
  stepImg2: { file: null, preview: null },
  stepImg3: { file: null, preview: null },
});

// Backend dates arrive as ISO strings; <input type="date"> needs yyyy-mm-dd
const toDateInput = (value: string | null) => (value ? value.slice(0, 10) : "");

const inputClass =
  "w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white disabled:opacity-40";

const labelClass = "text-[11px] font-bold text-white/60 uppercase tracking-wider";
const sectionClass = "sm:col-span-2 text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase border-b border-neutral-800 pb-2 mt-2";

export default function AddProjectModal({
  isOpen,
  onClose,
  editingProject,
}: AddProjectModalProps) {
  const { categories, createProject, updateProject } = useProjectStore();
  const [formLoading, setFormLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState(emptyForm);
  const [steps, setSteps] = useState<string[]>(["", "", ""]);
  const [images, setImages] = useState<Record<ImageKey, ImageSlot>>(emptyImages);

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        slug: editingProject.slug || "",
        categoryId: editingProject.categoryId,
        client: editingProject.client || "",
        location: editingProject.location || "",
        projectStatus: editingProject.projectStatus || "Ongoing",
        startDate: toDateInput(editingProject.startDate),
        endDate: toDateInput(editingProject.endDate),
        status: editingProject.status,
        description: editingProject.description || "",
        scopeOfWork: editingProject.scopeOfWork || "",
        engineeringHighlights: editingProject.engineeringHighlights || "",
      });
      setSteps([0, 1, 2].map((i) => editingProject.steps?.[i] || ""));

      const loaded = emptyImages();
      IMAGE_KEYS.forEach((key) => {
        loaded[key].preview = imageUrl(editingProject[key]);
      });
      setImages(loaded);
    } else {
      setFormData(emptyForm);
      setSteps(["", "", ""]);
      setImages(emptyImages());
    }
  }, [editingProject, isOpen]);

  if (!isOpen) return null;

  const setField = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleImageChange = (key: ImageKey, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    const invalid = validateImageFile(file);
    if (invalid) {
      setSubmitError(invalid);
      return;
    }
    setSubmitError(null);
    setImages((prev) => ({ ...prev, [key]: { file, preview: URL.createObjectURL(file) } }));
  };

  const handleRemoveImage = (key: ImageKey, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImages((prev) => ({ ...prev, [key]: { file: null, preview: null } }));
  };

  const handleStepChange = (index: number, value: string) => {
    setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const handleClose = () => {
    setSubmitError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setSubmitError(null);

    try {
      const imageChanges: Partial<Record<ImageKey, File | null>> = {};
      IMAGE_KEYS.forEach((key) => {
        const slot = images[key];
        if (slot.file) imageChanges[key] = slot.file;
        // Administrator removed an existing image
        else if (!slot.preview && editingProject?.[key]) imageChanges[key] = null;
      });

      const multiPartForm = toFormData({ ...formData, steps, images: imageChanges });

      const outcome = editingProject
        ? await updateProject(editingProject.id, multiPartForm)
        : await createProject(multiPartForm);

      if (outcome.success) {
        onClose();
      } else {
        setSubmitError(outcome.message || "Failed to save project. Please try again.");
      }
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save project. Please try again.",
      );
    } finally {
      setFormLoading(false);
    }
  };

  const renderImageSlot = (key: ImageKey, emptyLabel: string, heightClass: string) => {
    const preview = images[key].preview;
    return preview ? (
      <div className={`relative group w-full ${heightClass} border border-neutral-800 bg-neutral-950/40 rounded-[12px] flex items-center justify-center p-2 overflow-hidden`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        <button
          type="button"
          onClick={(e) => handleRemoveImage(key, e)}
          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white/70 transition-opacity duration-200 cursor-pointer rounded-[12px]"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    ) : (
      <label className={`group flex flex-col items-center justify-center w-full ${heightClass} border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-[12px] cursor-pointer transition-colors p-3`}>
        <div className="flex flex-col items-center text-center text-white/40 gap-1">
          <UploadCloud className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
          <span className="text-[10px] font-medium">{emptyLabel}</span>
        </div>
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageChange(key, e)} />
      </label>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-scaleUp">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-[24px] p-6 lg:p-8 my-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl">

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800  ">
          <h2 className="text-xl font-bold">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <button type="button" onClick={handleClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {submitError && (
            <p
              role="alert"
              className="sm:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 whitespace-pre-line"
            >
              {submitError}
            </p>
          )}

          {/* BASIC INFO */}
          <span className={sectionClass}>Basic Info</span>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Project Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setField("title", e.target.value)} className={inputClass} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Slug (Optional)</label>
            <input type="text" placeholder="Auto-generated from title if left empty" value={formData.slug} onChange={(e) => setField("slug", e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Category</label>
            <select required value={formData.categoryId} onChange={(e) => setField("categoryId", e.target.value)} className={inputClass}>
              <option value="" disabled>Select category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Visibility</label>
            <select value={formData.status} onChange={(e) => setField("status", e.target.value as Project["status"])} className={inputClass}>
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Client</label>
            <input type="text" required placeholder="e.g. Military Institute of Science and Technology" value={formData.client} onChange={(e) => setField("client", e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Location</label>
            <input type="text" required placeholder="e.g. Dhaka" value={formData.location} onChange={(e) => setField("location", e.target.value)} className={inputClass} />
          </div>

          {/* TIMELINE */}
          <span className={sectionClass}>Timeline</span>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Project Status</label>
            <select value={formData.projectStatus} onChange={(e) => setField("projectStatus", e.target.value as Project["projectStatus"])} className={inputClass}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Start Date</label>
            <input type="date" required value={formData.startDate} onChange={(e) => setField("startDate", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>End Date</label>
            {formData.projectStatus === "Ongoing" ? (
              <input type="text" disabled value="Ongoing" className={inputClass} />
            ) : (
              <input type="date" required min={formData.startDate || undefined} value={formData.endDate} onChange={(e) => setField("endDate", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
            )}
          </div>

          {/* IMAGES */}
          <span className={sectionClass}>Main Image</span>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            {renderImageSlot("imageMain", "Select Main Cover Image", "h-[180px]")}
          </div>

          <span className={sectionClass}>Project Steps (3)</span>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEP_KEYS.map((key, idx) => (
              <div key={key} className="p-3 rounded-[14px] bg-neutral-950/60 border border-neutral-800/80 flex flex-col gap-3">
                <span className="text-[10px] font-extrabold text-white/50 tracking-wider uppercase">Step {idx + 1}</span>
                {renderImageSlot(key, "Step Image", "h-[110px]")}
                <input
                  type="text"
                  placeholder={["e.g. Project Area Map", "e.g. Noise Level Measurement", "e.g. Final Implementation"][idx]}
                  value={steps[idx]}
                  onChange={(e) => handleStepChange(idx, e.target.value)}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white"
                />
              </div>
            ))}
          </div>

          {/* CONTENT */}
          <span className={sectionClass}>Project Details</span>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Description</label>
            <textarea rows={4} required value={formData.description} onChange={(e) => setField("description", e.target.value)} className={`${inputClass} resize-none`} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Scope of Work</label>
            <textarea rows={4} value={formData.scopeOfWork} onChange={(e) => setField("scopeOfWork", e.target.value)} className={`${inputClass} resize-none`} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Engineering Highlights</label>
            <textarea rows={4} value={formData.engineeringHighlights} onChange={(e) => setField("engineeringHighlights", e.target.value)} className={`${inputClass} resize-none`} />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-4 border-t border-neutral-800 pt-6 mt-4">
            <button type="button" onClick={handleClose} className="px-5 py-2.5 rounded-[10px] text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={formLoading} className="px-6 py-2.5 rounded-[10px] text-xs font-bold text-black hover:opacity-90 transition-all cursor-pointer" style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}>
              {formLoading ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
