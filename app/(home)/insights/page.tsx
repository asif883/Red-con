import Contact from "../_sections/Contact";
import InsightsHero from "./_sections/InsightsHero";
import ResearchCategories from "./_sections/ResearchCategories";
import WhitepapersRegistry from "./_sections/WhitepapersRegistry";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights & Publications",
  description:
    "Publications, case studies and engineering guidelines on transportation modeling, faecal sludge management and GIS land acquisition.",
  path: "/insights",
});

const page = () => {
  return (
    <div>
      <InsightsHero />
      <ResearchCategories />
      <WhitepapersRegistry />
      <Contact />
    </div>
  );
};

export default page;
