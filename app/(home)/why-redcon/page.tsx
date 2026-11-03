import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";

export const metadata: Metadata = { title: "Why REDCon | REDCon" };

export default function WhyREDConPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="Why REDCon" />
      <AboutStatement id="why-redcon" />
      <ReadyToDeliver />
    </div>
  );
}
