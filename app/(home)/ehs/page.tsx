import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Environment, Health & Safety (EHS)",
  description:
    "How REDCon integrates Environment, Health and Safety into responsible and sustainable engineering and consultancy practice.",
  path: "/ehs",
});

export default function EHSPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="EHS" />
      <AboutStatement id="ehs" />
      <ReadyToDeliver />
    </div>
  );
}
