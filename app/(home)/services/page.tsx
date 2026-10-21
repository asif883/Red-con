import Contact from "../_sections/Contact";
import NewsLetter from "../_sections/NewsLetter";
import ReadyToDeliver from "../about-us/_sections/ReadyToDeliver";
import OneStopConsultancy from "./_sections/OneStopConsultancy";
import ServiceHero from "./_sections/ServiceHero";
import Services from "./_sections/Services";

const page = () => {
    return (
        <div>
            <ServiceHero/>
            <OneStopConsultancy/>
            <Services/>
            <ReadyToDeliver/>
            <Contact/>
            <NewsLetter/>
        </div>
    );
};

export default page;