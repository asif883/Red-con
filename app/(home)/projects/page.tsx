import Contact from "../_sections/Contact";
import NewsLetter from "../_sections/NewsLetter";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import NewProjectSection from "./_sections/NewProjectSection";
import ProjectHero from "./_sections/ProjectHero";
import ProjectsSection from "./_sections/ProjectsSection";

const page = () => {
  return (
    <div>
      <ProjectHero />
      <NewProjectSection/>
      {/* <ProjectsSection /> */}
      <ReadyToDeliver />
      <Contact />
      <NewsLetter />
    </div>
  );
};

export default page;
