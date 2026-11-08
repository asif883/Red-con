"use client";

import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Image as ImageIcon, Newspaper } from "lucide-react";
import { getErrorMessage, imageUrl } from "@/lib/api/projects";
import { deleteNews, formatNewsDate, getAdminNews, type NewsItem } from "@/lib/api/news";
import NewsModal from "./_sections/NewsModal";

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);

  const [version, setVersion] = useState(0); // bump to reload after a save

  useEffect(() => {
    let cancelled = false;
    getAdminNews()
      .then((data) => {
        if (cancelled) return;
        setItems(data);
        setError(null);
      })
      .catch((err) => !cancelled && setError(getErrorMessage(err, "Failed to load news & events.")))
      .finally(() => !cancelled && setIsLoading(false));
    return () => {
      cancelled = true;
    };
  }, [version]);

  const handleDelete = async (item: NewsItem) => {
    if (!confirm(`Delete "${item.title}" permanently?`)) return;
    try {
      await deleteNews(item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      alert(getErrorMessage(err, "Failed to delete the item."));
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
              News &amp;{" "}
              <span className="bg-clip-text text-transparent bg-[linear-gradient(270deg,#16A34A_25%,#16A34A_100%)]">Events</span>
            </h1>
          </div>

          <button
            onClick={() => { setEditingItem(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold text-black transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer w-fit"
            style={{ background: "linear-gradient(270deg, #ffffff 0%, #00a63e 100%)" }}
          >
            <Plus className="w-4 h-4" />
            <span>Add News / Event</span>
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
        ) : items.length === 0 ? (
          <div className="w-full py-20 flex flex-col items-center justify-center gap-3 border border-dashed border-neutral-800/60 rounded-[20px]">
            <Newspaper className="w-8 h-8 text-white/20" />
            <span className="text-white/40 text-sm">No news or events yet. Add your first one.</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="group flex flex-col justify-between p-5 transition-all hover:border-neutral-700 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]">
                <div>
                  <div className="relative w-full aspect-[16/10] bg-neutral-950 rounded-[14px] overflow-hidden mb-4 border border-neutral-800/50">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={imageUrl(item.image)!} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2">
                        <ImageIcon className="w-8 h-8" />
                        <span className="text-[10px] tracking-wide uppercase">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-800 text-white/80 border border-white/5">
                      {item.category}
                    </span>
                    <span className={`text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded ${item.isPublished ? "bg-emerald-500/10 text-emerald-400" : "bg-white/5 text-white/70"}`}>
                      {item.isPublished ? "PUBLISHED" : "DRAFT"}
                    </span>
                  </div>

                  <h3 className="text-white text-lg font-bold tracking-tight mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-white/50 text-xs line-clamp-2 mb-4">{item.content}</p>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-800/60 pt-4 mt-auto">
                  <span className="text-[11px] text-white/40 font-medium">{formatNewsDate(item.date).full}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingItem(item); setIsModalOpen(true); }} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer" aria-label="Edit">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(item)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors cursor-pointer" aria-label="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <NewsModal
            key={editingItem?.id ?? "new"}
            onClose={() => { setIsModalOpen(false); setEditingItem(null); }}
            onSaved={() => setVersion((v) => v + 1)}
            editingItem={editingItem}
          />
        )}
      </div>
    </div>
  );
}
