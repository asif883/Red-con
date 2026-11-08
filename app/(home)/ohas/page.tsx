import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Occupational Health & Safety (OHAS)",
  description:
    "REDCon's commitment to Occupational Health and Safety as an essential part of responsible engineering and consultancy practice.",
  path: "/ohas",
});

export default function OHASPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="OHAS" />
      <AboutStatement id="ohas" />
      <ReadyToDeliver />
    </div>
  );
}
