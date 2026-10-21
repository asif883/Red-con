"use client";

import React, { useState, useEffect } from "react";
import { useProjectStore, Project } from "@/store/useProjectStore";
import { Tag, X, UploadCloud, AlertCircle, Trash2 } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject: Project | null;
}

export default function AddProjectModal({
  isOpen,
  onClose,
  editingProject,
}: AddProjectModalProps) {
  const { categories, createProject, updateProject } = useProjectStore();
  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const [formLoading, setFormLoading] = useState(false);
  
  // Thumbnail File & Preview States
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Gallery Granular Asset Management Arrays
  const [remoteGalleryPaths, setRemoteGalleryPaths] = useState<string[]>([]);
  const [localGalleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryWarning, setGalleryWarning] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    tags: "",
    description: "",
    categoryId: "",
    status: "DRAFT",
    metric1Title: "",
    metric1Value: "",
    metric2Title: "",
    metric2Value: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        tags: editingProject.tags.join(", "),
        description: editingProject.description || "",
        categoryId: editingProject.categoryId,
        status: editingProject.status,
        metric1Title: editingProject.metric1Title || "",
        metric1Value: editingProject.metric1Value || "",
        metric2Title: editingProject.metric2Title || "",
        metric2Value: editingProject.metric2Value || "",
      });
      setThumbnailPreview(
        editingProject.thumbnail ? `${API_BASE_URL}${editingProject.thumbnail}` : null
      );
      // Track remote images independently from fresh uploads
      setRemoteGalleryPaths(editingProject.gallery || []);
    } else {
      setFormData({
        title: "", tags: "", description: "", categoryId: "", status: "DRAFT",
        metric1Title: "", metric1Value: "", metric2Title: "", metric2Value: "",
      });
      setThumbnailPreview(null);
      setRemoteGalleryPaths([]);
    }
    setThumbnailFile(null);
    setGalleryFiles([]);
    setGalleryWarning(null);
  }, [editingProject, isOpen, API_BASE_URL]);

  if (!isOpen) return null;

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveThumbnail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const incomingFiles = Array.from(e.target.files || []);
    setGalleryWarning(null);

    // Calculate maximum threshold allocation dynamically
    const currentTotalCount = remoteGalleryPaths.length + localGalleryFiles.length;
    const availableSlots = 2 - currentTotalCount;

    if (availableSlots <= 0) {
      setGalleryWarning("Maximum storage limit of 2 gallery slots filled.");
      return;
    }

    if (incomingFiles.length > availableSlots) {
      setGalleryWarning(`Slots capped: Only accepted first ${availableSlots} files.`);
    }

    const validIncomingFiles = incomingFiles.slice(0, availableSlots);
    setGalleryFiles((prev) => [...prev, ...validIncomingFiles]);
  };

  // Granular Deletion Subroutines
  const removeRemoteGalleryImage = (indexToRemove: number) => {
    setRemoteGalleryPaths((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setGalleryWarning(null);
  };

  const removeLocalGalleryImage = (indexToRemove: number) => {
    setGalleryFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setGalleryWarning(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    const multiPartForm = new FormData();
    
    // Process JSON fields
    Object.entries(formData).forEach(([key, val]) => {
      if (key !== "tags") multiPartForm.append(key, val);
    });

    // Handle tag parsing arrays safely
    const tagsArray = formData.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
    tagsArray.forEach((tag) => multiPartForm.append("tags", tag));

    // Handle thumbnail payloads
    if (thumbnailFile) {
      multiPartForm.append("thumbnail", thumbnailFile);
    } else if (!thumbnailPreview && editingProject) {
      // If the administrator cleared the image block layout completely
      multiPartForm.append("thumbnail", "");
    }

    // Append remaining remote strings so the backend knows what to keep
    remoteGalleryPaths.forEach((path) => {
      multiPartForm.append("existingGallery", path);
    });

    // Append newly introduced raw binary attachment tracks
    if (localGalleryFiles.length > 0) {
      localGalleryFiles.forEach((file) => multiPartForm.append("gallery", file));
    }

    const outcome = editingProject
      ? await updateProject(editingProject.id, multiPartForm)
      : await createProject(multiPartForm);

    setFormLoading(false);
    if (outcome.success) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto animate-scaleUp">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-[24px] p-6 lg:p-8 my-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800  ">
          <h2 className="text-xl font-bold">
            {editingProject ? "Modify Architectural Record" : "Deploy Project To Public Nodes"}
          </h2>
          <button type="button" onClick={onClose} className="text-white/40 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Project Title</label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Structural Category</label>
            <select required value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white">
              <option value="" disabled>Select parent category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Status</label>
            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white">
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
          </div>

          {/* THUMBNAIL COMPONENT SLOT */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Thumbnail Capture</label>
            {thumbnailPreview ? (
              <div className="relative group w-full min-h-[105px] border border-neutral-800 bg-neutral-950/40 rounded-[12px] flex items-center justify-center p-3 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={thumbnailPreview} alt="Preview" className="w-auto h-16 object-contain rounded-lg" />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity duration-200 cursor-pointer rounded-[12px]"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <label className="group flex flex-col items-center justify-center w-full min-h-[105px] border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-[12px] cursor-pointer transition-colors p-3">
                <div className="flex flex-col items-center text-center text-white/40 gap-1">
                  <UploadCloud className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-[10px] font-medium">Select Hero Image</span>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
              </label>
            )}
          </div>

          {/* DYNAMIC MULTI-FILE PREVIEW GALLERY WITH GRANULAR EXTRACTION */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">
                Gallery Attachments ({remoteGalleryPaths.length + localGalleryFiles.length}/2)
              </label>
              {galleryWarning && (
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1 animate-pulse">
                  <AlertCircle className="w-3 h-3" /> {galleryWarning}
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 w-full min-h-[105px]">
              {/* Loop and list remaining remote files fetched from database */}
              {remoteGalleryPaths.map((path, idx) => (
                <div key={`remote-${idx}`} className="relative group rounded-[12px] bg-neutral-950 border border-neutral-800 overflow-hidden aspect-square flex items-center justify-center p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${API_BASE_URL}${path}`} alt="Remote Preview" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeRemoteGalleryImage(idx)}
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity duration-150 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Loop and list new raw files selected in current browsing session */}
              {localGalleryFiles.map((file, idx) => (
                <div key={`local-${idx}`} className="relative group rounded-[12px] bg-neutral-950 border border-neutral-800 overflow-hidden aspect-square flex items-center justify-center p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={URL.createObjectURL(file)} alt="Local Preview" className="w-full h-full object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeLocalGalleryImage(idx)}
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-red-400 transition-opacity duration-150 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Upload prompt selector tile (renders only if remaining allocation space exists) */}
              {remoteGalleryPaths.length + localGalleryFiles.length < 2 && (
                <label className="group flex flex-col items-center justify-center border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-[12px] cursor-pointer transition-colors aspect-square p-2">
                  <UploadCloud className="w-5 h-5 text-white/30 group-hover:text-emerald-400 transition-colors" />
                  <span className="text-[9px] font-medium text-white/30 mt-1 uppercase text-center">Add Image</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
                </label>
              )}
            </div>
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Tags (Comma-Separated)</label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input type="text" placeholder="Demand, Traffic, 2026" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white" />
            </div>
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-white/60 uppercase tracking-wider">Operational Abstract Description</label>
            <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white resize-none" />
          </div>

          <div className="p-4 rounded-[14px] bg-neutral-950/60 border border-neutral-800/80 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-emerald-400 tracking-wider uppercase">Primary Metric Node</span>
            <input type="text" placeholder="Label (e.g. Accessibility)" value={formData.metric1Title} onChange={(e) => setFormData({ ...formData, metric1Title: e.target.value })} className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white" />
            <input type="text" placeholder="Data Payload (e.g. +50%)" value={formData.metric1Value} onChange={(e) => setFormData({ ...formData, metric1Value: e.target.value })} className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white" />
          </div>

          <div className="p-4 rounded-[14px] bg-neutral-950/60 border border-neutral-800/80 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-[#EF4444] tracking-wider uppercase">Secondary Metric Node</span>
            <input type="text" placeholder="Label (e.g. Capacity)" value={formData.metric2Title} onChange={(e) => setFormData({ ...formData, metric2Title: e.target.value })} className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white" />
            <input type="text" placeholder="Data Payload (e.g. 10 CPC)" value={formData.metric2Value} onChange={(e) => setFormData({ ...formData, metric2Value: e.target.value })} className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-xs focus:outline-none focus:border-emerald-500/50 text-white" />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-4 border-t border-neutral-800 pt-6 mt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-[10px] text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" disabled={formLoading} className="px-6 py-2.5 rounded-[10px] text-xs font-bold text-white hover:opacity-90 transition-all cursor-pointer" style={{ background: "linear-gradient(270deg, #16A34A 0%, #0D5C3F 100%)" }}>
              {formLoading ? "Syncing..." : editingProject ? "Save Blueprint Modifications" : "Initialize Global Production Deploy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}