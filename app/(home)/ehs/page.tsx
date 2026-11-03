import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import AboutStatement from "../about-us/_sections/AboutStatement";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";

export const metadata: Metadata = { title: "EHS | REDCon" };

export default function EHSPage() {
  return (
    <div>
      <PageHero tag="about REDCon" title="EHS" />
      <AboutStatement id="ehs" />
      <ReadyToDeliver />
    </div>
  );
}
