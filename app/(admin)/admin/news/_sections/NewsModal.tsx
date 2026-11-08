"use client";

import React, { useEffect, useMemo, useState } from "react";
import { X, UploadCloud, Trash2, Loader2 } from "lucide-react";
import { getErrorMessage, imageUrl, validateImageFile } from "@/lib/api/projects";
import {
  NEWS_CATEGORIES,
  createNews,
  newsToFormData,
  updateNews,
  type NewsCategory,
  type NewsItem,
} from "@/lib/api/news";

interface NewsModalProps {
  onClose: () => void;
  onSaved: () => void;
  editingItem: NewsItem | null;
}

const emptyForm = {
  title: "",
  slug: "",
  date: "",
  category: "News" as NewsCategory,
  content: "",
  isPublished: true,
};

const inputClass =
  "w-full rounded-[10px] border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 text-white disabled:opacity-40";

const labelClass = "text-[11px] font-bold text-white/60 uppercase tracking-wider";

// Mounted only while open (keyed by item), so state starts from the item being edited
export default function NewsModal({ onClose, onSaved, editingItem }: NewsModalProps) {
  const [form, setForm] = useState(() =>
    editingItem
      ? {
          title: editingItem.title,
          slug: editingItem.slug,
          date: editingItem.date.slice(0, 10),
          category: editingItem.category,
          content: editingItem.content,
          isPublished: editingItem.isPublished,
        }
      : emptyForm
  );
  const [file, setFile] = useState<File | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Local preview of a freshly picked file; revoked when replaced or on unmount
  const localPreview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => () => {
    if (localPreview) URL.revokeObjectURL(localPreview);
  }, [localPreview]);
  const preview = localPreview ?? (removeImage ? null : imageUrl(editingItem?.image));

  const setField = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = "";
    if (!picked) return;
    const problem = validateImageFile(picked);
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setRemoveImage(false);
    setFile(picked);
  };

  const handleRemoveImage = () => {
    setFile(null);
    setRemoveImage(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const body = newsToFormData({ ...form, image: file ?? (removeImage ? null : undefined) });
      if (editingItem) await updateNews(editingItem.id, body);
      else await createNews(body);
      onSaved();
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Failed to save the news item."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-[24px] p-6 lg:p-8 my-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
          <h2 className="text-xl font-bold">{editingItem ? "Edit News / Event" : "Add News / Event"}</h2>
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
            <label className={labelClass}>Title</label>
            <input type="text" required value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputClass} />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Slug (Optional)</label>
            <input type="text" placeholder="Auto-generated from title if left empty" value={form.slug} onChange={(e) => setField("slug", e.target.value)} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Date</label>
            <input type="date" required value={form.date} onChange={(e) => setField("date", e.target.value)} className={`${inputClass} [color-scheme:dark]`} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Category</label>
            <select value={form.category} onChange={(e) => setField("category", e.target.value as NewsCategory)} className={inputClass}>
              {NEWS_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Content</label>
            <textarea
              required
              rows={9}
              placeholder="Write the story. Leave a blank line between paragraphs."
              value={form.content}
              onChange={(e) => setField("content", e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className={labelClass}>Cover Image (max 5MB)</label>
            {preview ? (
              <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden border border-neutral-800 bg-neutral-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Cover preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-black/70 hover:bg-black text-white cursor-pointer"
                  aria-label="Remove image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center gap-2 py-8 rounded-[12px] border border-dashed border-neutral-700 text-white/40 hover:text-white/70 hover:border-neutral-600 cursor-pointer transition-colors">
                <UploadCloud className="w-6 h-6" />
                <span className="text-xs">Click to upload an image</span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            )}
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
              {editingItem ? "Save Changes" : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
