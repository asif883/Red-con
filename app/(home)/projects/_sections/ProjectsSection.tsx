import React from "react";
import ProjectsClient from "./ProjectsClient";

export interface DBProject {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string | null;
  metric1Title: string | null;
  metric1Value: string | null;
  metric2Title: string | null;
  metric2Value: string | null;
  thumbnail: string | null;
  gallery: string[];
  status: "DRAFT" | "PUBLISHED";
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  projects: DBProject[];
}

async function fetchCategoriesWithProjects(): Promise<DBCategory[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  try {
    const response = await fetch(`${baseUrl}/project-categories`, {
      cache: "no-store", // Bypasses server cache layers completely
    });

    if (!response.ok) {
      throw new Error(`HTTP network loop failure: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "[Server Fetch Error] Failed to fetch project categories:",
      error,
    );
    return [];
  }
}

export default async function ProjectsSection() {
  const categoriesData = await fetchCategoriesWithProjects();

  return <ProjectsClient initialCategories={categoriesData} />;
}
