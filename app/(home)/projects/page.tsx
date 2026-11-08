import Contact from "../_sections/Contact";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import NewProjectSection from "./_sections/NewProjectSection";
import ProjectHero from "./_sections/ProjectHero";
import { fetchPublishedProjects } from "@/lib/api/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Projects",
  description:
    "Explore REDCon's structural design, drone mapping, and environmental and sanitation projects across Bangladesh, both ongoing and completed.",
  path: "/projects",
});

const page = async () => {
  const projects = await fetchPublishedProjects();

  return (
    <div>
      <ProjectHero />
      <NewProjectSection projects={projects} />
      <ReadyToDeliver />
      <Contact />
    </div>
  );
};

export default page;
