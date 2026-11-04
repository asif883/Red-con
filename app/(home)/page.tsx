import { fetchStats } from "@/lib/api/stats";
import About from "./_sections/About";
import Contact from "./_sections/Contact";
import Faq from "./_sections/Faq";
import Hero from "./_sections/Hero";
import LeadershipMessage from "./_sections/LeadershipMessage";
import Projects from "./_sections/Projects";
import ProjectSliderShow from "./_sections/ProjectSliderShow";
import Services from "./_sections/Services";
import StatsSection from "./_sections/StatsSection";
import TrustedClients from "./_sections/TrustedClients";
import WhyChoose from "./_sections/WhyChoose";

export default async function Home() {
  const stats = await fetchStats();

  return (
    <div>
      <Hero />
      <StatsSection stats={stats}/>
      <TrustedClients/>
      {/* <Services/> */}
      <About/>
      <Projects/>
      <ProjectSliderShow/>
      <WhyChoose/>
      <LeadershipMessage/>
      <Faq/>
      <Contact/>
    </div>
  );
}
