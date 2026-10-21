"use client";

import React from "react";
import ServiceCard, { ServiceData } from "./ServiceCard";

const Services = () => {
  // Multi-Object Structured Array Containing 8 Unique Service Datasets
  const servicesData: ServiceData[] = [
    {
      id: "001",
      title: "Survey & Monitoring",
      description:
        "Securing raw, empirical coordinates and field data to anchor all down-stream construction workflows. We combine modern drone technology with robust ground methodologies.",
      subItems: [
        "Baseline Study",
        "Topographic Survey",
        "Drone Survey",
        "Environmental Survey",
        "Traffic Survey",
        "Geotechnical Investigation Survey",
      ],
      imageSrc: "/images/services/service1.png",
      metricValue: "+150%",
      metricLabel: "DATA DENSITY IMPROVEMENT",
      metricDesc: "Acquired through multi-frequency LiDAR sweeps.",
      standardsLabel: "DGPS STANDARDS",
      standardsTitle: "High-Precision Field Reports",
      standardsDesc: "Accuracy configured inside BNBC sub-coordinates.",
    },
    {
      id: "002",
      title: "Environmental Engineering & Design",
      description:
        "Fulfilling critical ecological criteria by engineering scalable waste processing units and evaluating comprehensive site-impact matrices.",
      subItems: [
        "ETP, STP & WTP Assessment & Design",
        "Solid Waste Management & Faecal Sludge Management",
        "Water, Sanitation, and Hygiene (WASH) Assessment & Design",
      ],
      imageSrc: "/images/services/service2.png",
      metricValue: "100%",
      metricLabel: "ECO-AUDITED DESIGNS",
      metricDesc: "Strict compliance across global ecological codes.",
      standardsLabel: "EIA APPROVED",
      standardsTitle: "WASH Compliant Networks",
      standardsDesc:
        "Engineered to support clean regional utility distribution.",
    },
    {
      id: "003",
      title: "Pre-Project Study",
      description:
        "Securing administrative approval through early Feasibility Studies and Development Project Proposals (DPP).",
      subItems: [
        "Development Project Proposal (DPP) Preparation",
        "Feasibility Study",
      ],
      imageSrc: "/images/services/service3.png",
      metricValue: "98.6%",
      metricLabel: "DPP APPROVAL SUCCESS",
      metricDesc: "Obtained over continuous project compliance assessments.",
      standardsLabel: "ECONOMICS STUDY",
      standardsTitle: "Data-Backed Modeling",
      standardsDesc:
        "Providing thorough financial and morphological projections.",
    },
    {
      id: "004",
      title: "Approval Support",
      description:
        "Guiding technical drawings through legal and administrative clearing procedures while ensuring optimum manpower distribution.",
      subItems: [
        "Legal and Administrative Support for Design Approval",
        "Manpower Distribution",
      ],
      imageSrc: "/images/services/service4.png",
      metricValue: "Fast Track",
      metricLabel: "ADMINISTRATIVE CLEARANCE",
      metricDesc: "Accelerated processing for design approval pathways.",
      standardsLabel: "SUPPORT SERVICES",
      standardsTitle: "Manpower Distribution",
      standardsDesc:
        "Strategic matching of specialized resident engineers for compliance audits.",
    },
    {
      id: "005",
      title: "Urban & Regional Planning",
      description:
        "Organizing community layouts and digital masterplans to steer public expansion, socio-economic welfare, and land acquisition guidelines.",
      subItems: [
        "Master Plan",
        "GIS & Remote Sensing",
        "Socioeconomic Studies",
        "Land Acquisition and Resettlement Action Plan",
      ],
      imageSrc: "/images/services/service5.png",
      metricValue: "99.8%",
      metricLabel: "DESIGN CLEARANCE RATE",
      metricDesc: "Achieved over 50 completed development plans.",
      standardsLabel: "GIS MAPPING",
      standardsTitle: "Advanced Land Informatics",
      standardsDesc: "Multi-layered topography maps aligning real boundaries.",
    },
    {
      id: "006",
      title: "Road Infrastructure",
      description:
        "Developing physical networks and vertical transit architectures that conform to strict geometric, structural, and public safety standards.",
      subItems: [
        "Traffic Modeling",
        "Road Safety Design",
        "Road Geometric Design",
        "Bridge & Culvert Design",
      ],
      imageSrc: "/images/services/service6.png",
      metricValue: "+45%",
      metricLabel: "TRANSIT COMMUTE OPTIMIZATION",
      metricDesc: "Simulated through high-capacity digital geometric models.",
      standardsLabel: "STRUCTURE CODES",
      standardsTitle: "BNBC & BS Confirmed",
      standardsDesc:
        "Complying with critical global structural specifications.",
    },
    {
      id: "007",
      title: "Building Infrastructure",
      description:
        "Crafting high-precision physical structural templates, fire safety configurations, and integrated building automation systems (BMS).",
      subItems: [
        "Architectural Design",
        "Structural Design",
        "MEP, HVAC & BMS",
        "Fire Safety Design",
        "Plumbing Design",
        "Electrical Design",
      ],
      imageSrc: "/images/services/service7.png",
      metricValue: "Zero Failure",
      metricLabel: "STRUCTURAL DURABILITY",
      metricDesc: "Simulated against extreme high-intensity seismic forces.",
      standardsLabel: "BMS SYSTEMS",
      standardsTitle: "Smart MEP Integration",
      standardsDesc: "Automated HVAC and emergency system coordinates.",
    },
    {
      id: "008",
      title: "Assessment and Analysis",
      description:
        "Formulating thorough analytical reviews spanning social, disaster risk, hydrology, noise, and environmental impacts.",
      subItems: [
        "Traffic Impact Assessment (TIA)",
        "Environmental Impact Assessment (EIA)",
        "Social Impact Assessment (SIA)",
        "Disaster Risk Reduction Assessment",
        "Air & Noise Quality Assessment and Prediction Analysis",
        "Hydrology and Morphological Analysis",
        "Water Supply and Sewerage Network Modeling and Analysis",
        "Risk Analysis",
      ],
      imageSrc: "/images/services/service8.png",
      metricValue: "99.9%",
      metricLabel: "ANALYSIS MODELING PRECISION",
      metricDesc: "Processed using Industry-standard simulation software.",
      standardsLabel: "TIA & EIA STANDARD",
      standardsTitle: "Multi-impact Compliance",
      standardsDesc:
        "Delivering verified legal parameters for administrative design clearance.",
    },
  ];

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
