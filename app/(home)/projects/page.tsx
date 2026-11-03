import Contact from "../_sections/Contact";
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
    </div>
  );
};

export default page;
