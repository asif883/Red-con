"use client";

import React, { useEffect, useState } from "react";
import { useProjectStore, Project, ProjectCategory } from "@/store/useProjectStore";
import AddProjectCategoryModal from "./_sections/AddProjectCategoryModal";
import AddProjectModal from "./_sections/AddProjectModal";
import { Plus, FolderPlus, Edit2, Trash2, Loader2, Image as ImageIcon, Briefcase, Layers, Link as LinkIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminProjectsManagement() {
  const {
    projects,
    categories,
    isLoading,
    fetchCategories,
    fetchProjects,
    deleteProject,
    deleteCategory,
  } = useProjectStore();

  const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  // Core Functional Tab View Routing States
  const [activeTab, setActiveTab] = useState<"projects" | "categories">( "projects" );
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingCategory, setEditingCategory] = useState<ProjectCategory | null>(null);

  // Pagination Configuration State Controllers
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  // Sync dataset changes when the tab or active page updates
  useEffect(() => {
    fetchCategories();
    if (activeTab === "projects") {
      fetchProjects(currentPage, itemsPerPage);
    }
  }, [fetchCategories, fetchProjects, activeTab, currentPage]);

  // 💡 THE FIX: Safely unpack raw project records and metadata properties from the response object
  const projectsData = projects as any;
  const projectsList: Project[] = Array.isArray(projectsData)
    ? projectsData
    : projectsData?.data || [];

  const meta = projectsData?.meta || {
    total: projectsList.length,
    page: 1,
    limit: itemsPerPage,
    lastPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };

  const handleEditProjectClick = (project: Project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const handleEditCategoryClick = (category: ProjectCategory) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleProjectDelete = async (id: string) => {
    if (confirm("Are you sure you want to completely remove this project profile record?")) {
      await deleteProject(id);
      // Fallback page recalculation if the last remaining item on a page is deleted
      if (projectsList.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchProjects(currentPage, itemsPerPage);
      }
    }
  };

  const handleCategoryDelete = async (id: string) => {
    if (confirm("DANGER: Deleting this category will cascade and remove ALL associated projects underneath it. Proceed?")) {
      await deleteCategory(id);
    }
  };

  const handlePageChange = (pageTarget: number) => {
    if (pageTarget >= 1 && pageTarget <= meta.lastPage) {
      setCurrentPage(pageTarget);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#050505] p-6 lg:p-12 overflow-hidden text-white">
      {/* Dynamic Background Ambient Vector Glow */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/4 top-1/4 w-[800px] h-[400px] rounded-[800px] bg-[linear-gradient(270deg,rgba(0,151,56,0.12)_0%,rgba(255,0,0,0.12)_100%)] blur-[160px]" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Workspace Layout Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 border-b border-neutral-800/60 pb-8  ">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#EF4444] font-bold text-[11px] tracking-[2.4px] uppercase">Control System</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Repository{" "}<span className="italic bg-clip-text text-transparent bg-[linear-gradient(270deg,#FF0000_25%,#16A34A_100%)]">Dashboard</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => { setEditingCategory(null); setIsCategoryModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-semibold bg-neutral-900 border border-neutral-800 hover:bg-neutral-800/50 transition-colors cursor-pointer"
            >
              <FolderPlus className="w-4 h-4 text-[#EF4444]" />
              <span>Add Category</span>
            </button>
            <button
              onClick={() => { setEditingProject(null); setIsProjectModalOpen(true); }}
              className="flex items-center gap-2 px-5 py-3 rounded-[10px] text-[13px] font-bold transition-all hover:opacity-95 active:scale-[0.99] cursor-pointer"
              style={{ background: "linear-gradient(270deg, rgba(0,151,56,0.85) 0%, rgba(255, 0, 0, 0.85) 100%)" }}
            >
              <Plus className="w-4 h-4 text-white" />
              <span>Deploy Project</span>
            </button>
          </div>
        </div>

        {/* Flicker-Protected Tab Selection Strip */}
        <div className="flex gap-2 p-1 bg-neutral-900/50 border border-neutral-800/60 rounded-[14px] w-full max-w-sm mb-10   backdrop-blur-md">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-[10px] text-xs font-bold transition-all border cursor-pointer ${
              activeTab === "projects" ? "bg-neutral-950 border-neutral-800 text-emerald-400" : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Projects ({meta.total})</span>
          </button>
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex items-center justify-center gap-2 flex-1 py-2.5 rounded-[10px] text-xs font-bold transition-all border cursor-pointer ${
              activeTab === "categories" ? "bg-neutral-950 border-neutral-800 text-emerald-400" : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>
        </div>

        {/* LOADING STATE MATRIX VIEWPORT */}
        {isLoading ? (
          <div className="h-64 w-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#16A34A]" />
          </div>
        ) : (
          <>
            {/* TAB VIEW 1: PROJECTS DATAGRID */}
            {activeTab === "projects" && (
              <div className="flex flex-col gap-8 animate-fadeIn">
                {projectsList.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsList.map((project: Project) => (
                      <div
                        key={project.id}
                        className="group flex flex-col justify-between p-5 transition-all duration-300 hover:border-neutral-700 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px]"
                      >
                        <div>
                          <div className="relative w-full aspect-[16/10] bg-neutral-950 rounded-[14px] overflow-hidden mb-4 border border-neutral-800/50">
                            {project.thumbnail ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={`${API_BASE_URL}${project.thumbnail}`}
                                alt={project.title}
                                className="w-full h-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-white/20 gap-2">
                                <ImageIcon className="w-8 h-8" />
                                <span className="text-[10px] tracking-wide uppercase">No Image Loaded</span>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between gap-4 mb-3">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-neutral-800 text-white/80 border border-white/5">
                              {project.category?.name || "Uncategorized"}
                            </span>
                            <span className={`text-[9px] font-extrabold tracking-wide uppercase px-2 py-0.5 rounded ${project.status === "PUBLISHED" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>
                              {project.status}
                            </span>
                          </div>

                          <h3 className="text-white text-lg font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {project.title}
                          </h3>
                          <p className="text-white/60 text-xs leading-relaxed line-clamp-2 mb-4">
                            {project.description || "No description configuration profile loaded."}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {project.tags.map((tag, idx) => (
                              <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded bg-neutral-800/50 text-white/40 border border-neutral-800">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-neutral-800/60 pt-4 mt-auto">
                          <div className="text-[11px] text-white/40 font-medium truncate max-w-[150px]">
                            {project.metric1Value ? `${project.metric1Title}: ${project.metric1Value}` : "No metrics linked"}
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleEditProjectClick(project)} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer">
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleProjectDelete(project.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full py-20 flex flex-col items-center justify-center border border-dashed border-neutral-800/60 rounded-[20px]">
                    <span className="text-white/40 text-sm tracking-wide">No project blueprints found on this pagination index.</span>
                  </div>
                )}

                {/* PREMIUM SYSTEM PAGINATION CONTROLS FOOTER */}
                {meta.lastPage > 1 && (
                  <div className="w-full flex items-center justify-between p-4 bg-neutral-900/40 backdrop-blur-md border border-neutral-800/60 rounded-[16px] mt-4  ">
                    <span className="text-xs text-white/40">
                      Showing page <strong className="text-white/80 font-semibold">{meta.page}</strong> of <strong className="text-white/80 font-semibold">{meta.lastPage}</strong> ({meta.total} records total)
                    </span>
                    
                    <div className="flex items-center gap-1">
                      <button
                        disabled={!meta.hasPreviousPage}
                        onClick={() => handlePageChange(meta.page - 1)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition-all disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {Array.from({ length: meta.lastPage }).map((_, i) => {
                        const pageIdx = i + 1;
                        return (
                          <button
                            key={pageIdx}
                            onClick={() => handlePageChange(pageIdx)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                              meta.page === pageIdx
                                ? "bg-[#16A34A] border-[#16A34A] text-white shadow-[0_4px_12px_rgba(22,163,74,0.15)]"
                                : "bg-neutral-900 border-neutral-800 text-white/60 hover:text-white"
                            }`}
                          >
                            {pageIdx}
                          </button>
                        );
                      })}

                      <button
                        disabled={!meta.hasNextPage}
                        onClick={() => handlePageChange(meta.page + 1)}
                        className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white transition-all disabled:opacity-30 disabled:hover:bg-neutral-900 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB VIEW 2: FULL CATEGORY CRUD MANAGEMENT GRID */}
            {activeTab === "categories" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="p-5 border border-neutral-800/60 bg-neutral-900/40 backdrop-blur-md rounded-[20px] flex flex-col gap-4 group hover:border-neutral-700 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-white/40 group-hover:text-emerald-400 transition-colors">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="text-white font-bold text-base truncate">{category.name}</h4>
                          <div className="flex items-center gap-1.5 text-xs text-white/40">
                            <LinkIcon className="w-3 h-3 text-[#EF4444]/60" />
                            <span className="truncate">{category.slug}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-800/60 pt-3 mt-1">
                      <div className="flex flex-col">
                        <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-neutral-950 border border-neutral-800 text-emerald-400">
                          {(category as any).projects?.length ?? 0} Nodes Linked
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEditCategoryClick(category)} className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer">
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button onClick={() => handleCategoryDelete(category.id)} className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* MODAL CONTEXT ROUTING PANELS */}
        <AddProjectCategoryModal 
          isOpen={isCategoryModalOpen} 
          onClose={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }} 
          editingCategory={editingCategory}
        />

        <AddProjectModal 
          isOpen={isProjectModalOpen} 
          onClose={() => { setIsProjectModalOpen(false); setEditingProject(null); }} 
          editingProject={editingProject} 
        />

      </div>
    </div>
  );
}