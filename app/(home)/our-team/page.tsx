import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import BoardOfDirectors from "../about-us/_sections/BoardOfDirectors";
import OurTeam from "../about-us/_sections/OurTeam";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import Teams from "../teams/_sections/Teams";

export const metadata: Metadata = { title: "Our Team | REDCon" };

export default function OurTeamPage() {
  return (
    <div>
      <PageHero
        tag="about REDCon"
        title="Our Team"
        description="The leadership and multidisciplinary professionals guiding REDCon towards sustainable growth."
      />
      <BoardOfDirectors />
      <Teams />
      <OurTeam />
      <ReadyToDeliver />
    </div>
  );
}
