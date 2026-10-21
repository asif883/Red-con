"use client";

import React, { useState, useEffect } from "react";
import { useTeamStore, TeamMember } from "@/store/useTeamStore";
import { X, Plus, Trash2, UploadCloud, AlertCircle } from "lucide-react";

interface AddTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingMember: TeamMember | null;
}

interface MemberRow {
  name: string;
  role: string;
  categoryId: string; // 💡 Fixed: Links directly to relation IDs
  edu: string;
  expertise: string;
  memberOf: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  imageFile: File | null;
  imagePreview: string;
}

export default function AddTeamModal({
  isOpen,
  onClose,
  editingMember,
}: AddTeamModalProps) {
  const { createTeamMember, updateTeamMember, categories } = useTeamStore();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  const [loading, setLoading] = useState(false);
  const [errorLog, setErrorLog] = useState<string | null>(null);

  // Staging factory loop template helper
  const createEmptyRow = (): MemberRow => ({
    name: "",
    role: "",
    categoryId: categories[0]?.id || "",
    edu: "",
    expertise: "",
    memberOf: "",
    email: "",
    phone: "",
    linkedinUrl: "",
    imageFile: null,
    imagePreview: "",
  });

  const [rows, setRows] = useState<MemberRow[]>([]);

  // Synchronize local states when initializing or modifying personnel targets
  useEffect(() => {
    if (!isOpen) return;

    if (editingMember) {
      setRows([
        {
          name: editingMember.name,
          role: editingMember.role,
          categoryId: editingMember.categoryId,
          edu: editingMember.edu || "",
          expertise: editingMember.expertise || "",
          memberOf: editingMember.memberOf || "",
          email: editingMember.email, // 💡 Fixed: Wiped missing out-of-scope member references
          phone: editingMember.phone, // 💡 Fixed: Wiped missing out-of-scope member references
          linkedinUrl: editingMember.linkedinUrl || "",
          imageFile: null,
          imagePreview: `${API_BASE_URL}${editingMember.imageUrl}`,
        },
      ]);
    } else {
      setRows([
        {
          name: "",
          role: "",
          categoryId: categories[0]?.id || "",
          edu: "",
          expertise: "",
          memberOf: "",
          email: "",
          phone: "",
          linkedinUrl: "",
          imageFile: null,
          imagePreview: "",
        },
      ]);
    }
    setErrorLog(null);
  }, [editingMember, isOpen, categories, API_BASE_URL]);

  if (!isOpen) return null;

  const handleAddFieldRow = () => {
    if (editingMember) return;
    setRows([...rows, createEmptyRow()]);
  };

  const handleRemoveFieldRow = (index: number) => {
    if (rows.length === 1) return;
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    index: number,
    field: keyof MemberRow,
    value: any,
  ) => {
    setRows(
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row)),
    );
  };

  const handleFileIntercept = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setRows(
        rows.map((row, i) =>
          i === index
            ? {
                ...row,
                imageFile: file,
                imagePreview: URL.createObjectURL(file),
              }
            : row,
        ),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorLog(null);

    try {
      if (editingMember) {
        const targetRow = rows[0];
        const form = new FormData();

        Object.entries(targetRow).forEach(([key, val]) => {
          if (
            key !== "imageFile" &&
            key !== "imagePreview" &&
            val !== undefined
          ) {
            form.append(key, val as string);
          }
        });
        if (targetRow.imageFile) form.append("imageUrl", targetRow.imageFile);

        const res = await updateTeamMember(editingMember.id, form);
        if (!res.success)
          throw new Error(
            res.message || "Failed parsing data submission update path link.",
          );
      } else {
        // Execute batch row staging loops concurrently
        for (const row of rows) {
          if (!row.imageFile)
            throw new Error(
              `An asset profile photo is missing for member: ${row.name || "Unnamed Slot"}`,
            );
          if (!row.categoryId)
            throw new Error(
              `Please assign a valid category tier context parameter for member: ${row.name || "Unnamed Slot"}`,
            );

          const form = new FormData();
          Object.entries(row).forEach(([key, val]) => {
            if (
              key !== "imageFile" &&
              key !== "imagePreview" &&
              val !== undefined
            ) {
              form.append(key, val as string);
            }
          });
          form.append("imageUrl", row.imageFile);

          const res = await createTeamMember(form);
          if (!res.success)
            throw new Error(
              res.message ||
                "Failed establishing row deployment profile instance.",
            );
        }
      }
      onClose();
    } catch (err: any) {
      setErrorLog(
        err.message ||
          "An expected parameter break occurred processing structural inputs.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-[24px] p-6 lg:p-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800  ">
          <h2 className="text-xl font-bold">
            {editingMember
              ? "Modify Workforce Parameters"
              : "Deploy Multiple Personnel Targets"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorLog && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0" /> <span>{errorLog}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 divide-y divide-neutral-800/60">
            {rows.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 ${index === 0 ? "pt-0" : ""}`}
              >
                {/* Visual Avatar File Input Component Frame */}
                <div className="flex flex-col gap-1.5 justify-center">
                  <label className="text-[11px] font-bold text-white/40 uppercase tracking-wider">
                    Profile Capture
                  </label>
                  <label className="group relative flex flex-col items-center justify-center w-full h-[180px] border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-[16px] cursor-pointer overflow-hidden p-2 text-center transition-colors">
                    {row.imagePreview ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={row.imagePreview}
                        alt="Avatar staging visual"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <div className="flex flex-col items-center text-white/30 gap-1  ">
                        <UploadCloud className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[10px] font-medium">
                          Select Headshot Image
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileIntercept(index, e)}
                      required={!editingMember}
                    />
                  </label>
                </div>

                {/* String Parameter Form Fields Grid Split */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={row.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* 💡 Categories selection menu feeding live data loops */}
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">
                        Tier Category Group
                      </label>
                      <select
                        value={row.categoryId}
                        onChange={(e) =>
                          handleInputChange(index, "categoryId", e.target.value)
                        }
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-2 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">
                        Assigned Corporate Role
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CHAIRMAN"
                        value={row.role}
                        onChange={(e) =>
                          handleInputChange(index, "role", e.target.value)
                        }
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Academic Credentials
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. BSS, MSS (DU)"
                      value={row.edu}
                      onChange={(e) =>
                        handleInputChange(index, "edu", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Domain Expertise
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Structural Security"
                      value={row.expertise}
                      onChange={(e) =>
                        handleInputChange(index, "expertise", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Email Coordinates
                    </label>
                    <input
                      type="email"
                      required
                      value={row.email}
                      onChange={(e) =>
                        handleInputChange(index, "email", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Phone Connection Line
                    </label>
                    <input
                      type="text"
                      required
                      value={row.phone}
                      onChange={(e) =>
                        handleInputChange(index, "phone", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      LinkedIn Profile Track URL
                    </label>
                    <input
                      type="url"
                      value={row.linkedinUrl}
                      onChange={(e) =>
                        handleInputChange(index, "linkedinUrl", e.target.value)
                      }
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="flex flex-col gap-1 relative">
                    <label className="text-[10px] font-bold text-white/50 uppercase">
                      Affiliations / Member Of
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Joint Sec. Human Rights BD"
                        value={row.memberOf}
                        onChange={(e) =>
                          handleInputChange(index, "memberOf", e.target.value)
                        }
                        className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                      />
                      {!editingMember && rows.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveFieldRow(index)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Staging Action Element Bar Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800 pt-6 mt-4">
            {!editingMember ? (
              <button
                type="button"
                onClick={handleAddFieldRow}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 transition-colors text-emerald-400 cursor-pointer  "
              >
                <Plus className="w-4 h-4" />{" "}
                <span>Add Another Member Profile</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-[10px] text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer  "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-[10px] text-xs font-bold text-white hover:opacity-90 transition-all cursor-pointer  "
                style={{
                  background:
                    "linear-gradient(270deg, #16A34A 0%, #0D5C3F 100%)",
                }}
              >
                {loading
                  ? "Processing Uploads..."
                  : editingMember
                    ? "Apply Structural Changes"
                    : `Commit Batch Deploy (${rows.length} Profiles)`}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
