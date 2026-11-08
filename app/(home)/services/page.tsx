import Contact from "../_sections/Contact";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import OneStopConsultancy from "./_sections/OneStopConsultancy";
import ServiceHero from "./_sections/ServiceHero";
import Services from "./_sections/Services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Services",
  description:
    "Engineering and infrastructure design, environmental and EIA studies, WASH, climate resilience, social safeguards, research and survey, project management, and GIS and remote sensing from one multidisciplinary consultancy.",
  path: "/services",
});

const page = () => {
    return (
        <div>
            <ServiceHero/>
            <OneStopConsultancy/>
            <Services/>
            <ReadyToDeliver/>
            <Contact/>
        </div>
    );
};

export default page;