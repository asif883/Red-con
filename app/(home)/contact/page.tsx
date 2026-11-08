import PageHero from "@/components/PageHero/PageHero";
import Contact from "../_sections/Contact";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Talk to REDCon's engineers and consultants about your next project. Visit us at Humayun Road, Mohammadpur, Dhaka, or call +880 1989-211290.",
  path: "/contact",
});

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
