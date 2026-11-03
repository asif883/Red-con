import Contact from "../_sections/Contact";
import AboutHero from "./_sections/AboutHero";
import AboutStatement from "./_sections/AboutStatement";
import BoardOfDirectors from "./_sections/BoardOfDirectors";
import OurClients from "./_sections/OurClients";
import OurStory from "./_sections/OurStory";
import Stats from "./_sections/Stats";

const page = () => {
    return (
        <div>
            <AboutHero/>
            <OurStory/>
            <BoardOfDirectors/>
            <OurClients/>
            <AboutStatement id="why-redcon" tinted/>
            <AboutStatement id="ohas"/>
            <AboutStatement id="ehs" tinted/>
            <Stats/>
            <Contact/>
        </div>
    );
};

export default page;
