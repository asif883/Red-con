import Contact from "../_sections/Contact";
import NewsLetter from "../_sections/NewsLetter";
import AboutHero from "./_sections/AboutHero";
import ExecutiveBoard from "./_sections/ExecutiveBoard";
import Methodology from "./_sections/Methodology";
import OurFootprint from "./_sections/OurFootprint";
import OurTeam from "./_sections/OurTeam";
import ReadyToDeliver from "./_sections/ReadyToDeliver";
import Stats from "./_sections/Stats";

const page = () => {
    return (
        <div>
            <AboutHero/>
            <OurFootprint/>
            <Methodology/>
            <OurTeam/>
            <ExecutiveBoard/>
            <Stats/>
            <ReadyToDeliver/>
            <Contact/>
            <NewsLetter/>
        </div>
    );
};

export default page;