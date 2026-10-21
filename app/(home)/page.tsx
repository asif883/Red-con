import About from "./_sections/About";
import Contact from "./_sections/Contact";
import Faq from "./_sections/Faq";
import Hero from "./_sections/Hero";
import LeadershipMessage from "./_sections/LeadershipMessage";
import NewsLetter from "./_sections/NewsLetter";
import Projects from "./_sections/Projects";
import ProjectSliderShow from "./_sections/ProjectSliderShow";
import Services from "./_sections/Services";
import Technology from "./_sections/Technology";
import TrustedClients from "./_sections/TrustedClients";
import WhyChoose from "./_sections/WhyChoose";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustedClients/>
      <Services/>
      <About/>
      <Projects/>
      <ProjectSliderShow/>
      <WhyChoose/>
      <LeadershipMessage/>
      <Technology/>
      <Faq/>
      <Contact/>
      <NewsLetter/>
    </div>
  );
}
