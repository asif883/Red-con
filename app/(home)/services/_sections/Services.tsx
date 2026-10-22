import ServiceCard from "./ServiceCard";
import { servicesData } from "./services-data";

const Services = () => {
  return (
    <section className="relative w-full py-24 overflow-hidden flex items-center justify-center bg-black text-white">
      {/* BACKGROUND ATMOSPHERIC LIGHTING EFFECT (NO HEIGHT LIMITATION, WRAPS SYSTEM CONTENT) */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/2 top-0 -translate-x-1/2 w-[1000px] h-full bg-[linear-gradient(45deg,rgba(22,163,74,0.10)_0%,rgba(10,10,10,0.20)_50%,rgba(244,63,94,0.10)_100%)] blur-[75px] z-0" />

      <div className="max-w-[1440px] w-full mx-auto px-4 z-10 relative flex flex-col gap-20">
        {/* Section Header Content Block */}
        <div className="w-full flex flex-col gap-4">
          {/* Top Tag Sub-indicator */}
          <div className="flex items-center gap-3  ">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#EF4444] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              our services
            </span>
          </div>

          {/* Core Segment Heading Typography */}
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px] max-w-[850px]">
            We map challenges and transform{" "}
            <span className="italic text-[#16A34A]">
              them into physical realities
            </span>
          </h2>
        </div>

        {/* Dynamic Service Stack Wrapper Layer */}
        <div className="w-full flex flex-col mt-4">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
