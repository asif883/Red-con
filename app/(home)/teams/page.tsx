import TeamHero from "./_sections/TeamHero";
import Teams from "./_sections/Teams";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the administrative heads, senior analysts and GIS specialists behind REDCon's projects.",
  path: "/teams",
});

const page = () => {
    return (
        <div>
            <TeamHero/>
            <Teams/>
        </div>
    );
};

export default page;