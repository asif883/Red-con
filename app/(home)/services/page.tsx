import Contact from "../_sections/Contact";
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
        </div>
    );
};

export default page;