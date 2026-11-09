import React from "react";
import { Check, HardHat, Leaf, ShieldCheck } from "lucide-react";

// Why REDCon / OHS / EHS statements from the About section.
export const statements = {
  "why-redcon": {
    tag: "why REDCon",
    title: "Quality Is Our",
    highlight: "Driving Principle",
    icon: ShieldCheck,
    body: "At REDCon (Research Engineering & Development Consultant Limited), we combine technical expertise, professional integrity, and a commitment to quality to deliver reliable engineering and consultancy solutions. Quality is our driving principle, guiding every stage of our work—from planning and feasibility studies to engineering design, project assessment, and implementation support. We focus on understanding each client's unique requirements, providing practical and sustainable solutions, maintaining transparent communication, and ensuring compliance with applicable standards and project specifications. By prioritizing quality, efficiency, innovation, and client satisfaction, REDCon strives to build lasting partnerships and deliver solutions that create long-term value for every project.",
    points: ["Technical expertise", "Professional integrity", "Transparent communication", "Compliance with standards"],
  },
  ohas: {
    tag: "OHAS",
    title: "Occupational Health",
    highlight: "& Safety",
    icon: HardHat,
    body: "At REDCon (Research Engineering & Development Consultant Limited), we recognize Occupational Health and Safety (OHS) as an essential component of responsible engineering and consultancy practice. We are committed to promoting a safe and healthy working environment by identifying workplace hazards, assessing risks, implementing preventive measures, and encouraging safety awareness among personnel. Our approach emphasizes accident prevention, occupational risk management, compliance with applicable health and safety requirements, and continuous improvement in safety performance. By integrating safety considerations into project planning, engineering activities, and site operations, REDCon aims to protect workers, clients, and other stakeholders while supporting safe, efficient, and sustainable project delivery.",
    points: ["Hazard identification", "Risk assessment", "Accident prevention", "Continuous improvement"],
  },
  ehs: {
    tag: "EHS",
    title: "Environment, Health",
    highlight: "& Safety",
    icon: Leaf,
    body: "At REDCon (Research Engineering & Development Consultant Limited), Environment, Health and Safety (EHS) is an integral part of our commitment to responsible and sustainable engineering practice. We prioritize environmental protection, occupational health, and workplace safety throughout our consultancy and project activities. Our approach focuses on identifying and mitigating environmental and safety risks, preventing workplace accidents, minimizing environmental impacts, promoting safe working practices, and complying with applicable environmental and safety regulations. By integrating EHS principles into project planning, design, assessment, and implementation support, REDCon strives to protect people, preserve the environment, and contribute to safe, sustainable, and responsible project delivery.",
    points: ["Environmental protection", "Occupational health", "Safe working practices", "Regulatory compliance"],
  },
};

export type StatementKey = keyof typeof statements;

const AboutStatement = ({ id, tinted = false }: { id: StatementKey; tinted?: boolean }) => {
  const { tag, title, highlight, icon: Icon, body, points } = statements[id];

  return (
    <section
      id={id}
      className={`relative w-full py-14 md:py-16 lg:py-24 overflow-hidden scroll-mt-24 ${
        tinted ? "bg-[rgba(5,150,105,0.08)]" : "bg-black"
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
            <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
              {tag}
            </span>
          </div>
          <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[44px] lg:leading-[50px] tracking-[-1.2px]">
            {title} <span className="text-[#16A34A]">{highlight}</span>
          </h2>
          <div className="w-14 h-14 rounded-2xl border border-[rgba(22,163,74,0.30)] bg-[rgba(22,163,74,0.10)] flex items-center justify-center text-[#34D399]">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-8">
          <p className="text-white/70 text-base sm:text-[17px] leading-[30px] border-l-2 border-[#16A34A] pl-6">
            {body}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {points.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.02] px-4 py-3"
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center border border-[rgba(52,211,153,0.30)] bg-[rgba(52,211,153,0.08)]">
                  <Check className="w-3 h-3 text-[#34D399]" strokeWidth={2.5} />
                </span>
                <span className="text-white/85 text-[14px]">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatement;
