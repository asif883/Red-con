import PageHero from "@/components/PageHero/PageHero";
import OurClients from "../about-us/_sections/OurClients";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import FundingAgencies from "./_sections/FundingAgencies";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Clients",
  description:
    "Government agencies, development partners and institutions that REDCon Ltd. is proud to work with across Bangladesh.",
  path: "/our-clients",
});

export default function OurClientsPage() {
  return (
    <div>
      <PageHero
        tag="about REDCon"
        title="Our Clients"
        description="Government agencies, development partners and institutions we are proud to work with."
      />
      <OurClients />
      <FundingAgencies />
      <ReadyToDeliver />
    </div>
  );
}
