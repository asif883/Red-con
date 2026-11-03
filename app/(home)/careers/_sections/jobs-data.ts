export const departments = [
  "Engineering",
  "Administration",
  "Procurement",
  "Finance and Accounts",
  "Surveyor",
  "Office Assistants",
] as const;

export type Department = (typeof departments)[number];

// Open positions. Add an entry here to list a job on /careers.
export interface Job {
  title: string;
  department: Department;
  location: string;
  type: string; // e.g. "Full-time"
  deadline?: string;
  applyUrl: string; // link or mailto: for applications
}

export const jobs: Job[] = [];
