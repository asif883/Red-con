import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import { fetchPublishedJobs } from "@/lib/api/jobs";
import JobBoard from "./_sections/JobBoard";

export const metadata: Metadata = { title: "Careers | REDCon" };

export default async function CareersPage() {
  const jobs = await fetchPublishedJobs();

  return (
    <div>
      <PageHero
        tag="join us"
        title="Careers"
        description="Build your career with a multidisciplinary engineering and development consultancy."
      />
      <JobBoard jobs={jobs} />
    </div>
  );
}
