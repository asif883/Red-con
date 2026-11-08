import PageHero from "@/components/PageHero/PageHero";
import { fetchPublishedJobs } from "@/lib/api/jobs";
import JobBoard from "./_sections/JobBoard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join REDCon Ltd. Browse open engineering, administration, procurement, finance and surveying positions at a multidisciplinary consultancy in Bangladesh.",
  path: "/careers",
});

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
