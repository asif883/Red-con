import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import OurStory from "../about-us/_sections/OurStory";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";

export const metadata: Metadata = { title: "Our Story | REDCon" };

export default function OurStoryPage() {
  return (
    <div>
      <PageHero
        tag="about REDCon"
        title="Our Story"
        description="Research, Engineering & Development — delivering consultancy and construction solutions across Bangladesh since 2018."
      />
      <OurStory />
      <ReadyToDeliver />
    </div>
  );
}
