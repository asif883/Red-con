import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import OurClients from "../about-us/_sections/OurClients";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";

export const metadata: Metadata = { title: "Our Clients | REDCon" };

export default function OurClientsPage() {
  return (
    <div>
      <PageHero
        tag="about REDCon"
        title="Our Clients"
        description="Government agencies, development partners and institutions we are proud to work with."
      />
      <OurClients />
      <ReadyToDeliver />
    </div>
  );
}
