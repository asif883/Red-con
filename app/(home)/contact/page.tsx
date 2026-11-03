import type { Metadata } from "next";
import PageHero from "@/components/PageHero/PageHero";
import Contact from "../_sections/Contact";

export const metadata: Metadata = { title: "Contact | REDCon" };

export default function ContactPage() {
  return (
    <div>
      <PageHero
        tag="get in touch"
        title="Contact Us"
        description="Talk to our engineers and consultants about your next project."
      />
      <Contact />
    </div>
  );
}
