import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Why REDCon",
  description:
    "Why clients choose REDCon: multidisciplinary expertise, quality-first delivery, client satisfaction and a commitment to integrity and accountability.",
  path: "/why-redcon",
});

export default function WhyREDConPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="Why REDCon" />
      <AboutStatement id="why-redcon" />
      <ReadyToDeliver />
    </div>
  );
}
