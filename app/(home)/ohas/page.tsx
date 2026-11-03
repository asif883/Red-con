import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";

export const metadata: Metadata = { title: "OHAS | REDCon" };

export default function OHASPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="OHAS" />
      <AboutStatement id="ohas" />
      <ReadyToDeliver />
    </div>
  );
}
