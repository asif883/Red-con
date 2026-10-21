import Contact from "../_sections/Contact";
import NewsLetter from "../_sections/NewsLetter";
import InsightsHero from "./_sections/InsightsHero";
import ResearchCategories from "./_sections/ResearchCategories";
import WhitepapersRegistry from "./_sections/WhitepapersRegistry";

const page = () => {
  return (
    <div>
      <InsightsHero />
      <ResearchCategories />
      <WhitepapersRegistry />
      <Contact />
      <NewsLetter />
    </div>
  );
};

export default page;
