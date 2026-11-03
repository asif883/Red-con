import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import JobBoard from "./_sections/JobBoard";

export const metadata: Metadata = { title: "Careers | REDCon" };

export default function CareersPage() {
  return (
    <div>
      <PageHero
        tag="join us"
        title="Careers"
        description="Build your career with a multidisciplinary engineering and development consultancy."
      />
      <JobBoard />
    </div>
  );
}
