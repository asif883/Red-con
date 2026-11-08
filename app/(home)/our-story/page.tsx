import PageHero from "@/components/PageHero/PageHero";
import OurStory from "../about-us/_sections/OurStory";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Story",
  description:
    "REDCon stands for Research, Engineering & Development. Since 2018 we have delivered consultancy and construction solutions across Bangladesh.",
  path: "/our-story",
});

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
