import ServiceCard, { type ServiceData } from "./ServiceCard";

const Services = () => {
  // Multi-Object Structured Array Containing 8 Unique Service Datasets
  // const servicesData: ServiceData[] = [
  //   {
  //     id: "001",
  //     title: "Survey & Monitoring",
  //     description:
  //       "Securing raw, empirical coordinates and field data to anchor all down-stream construction workflows. We combine modern drone technology with robust ground methodologies.",
  //     subItems: [
  //       "Baseline Study",
  //       "Topographic Survey",
  //       "Drone Survey",
  //       "Environmental Survey",
  //       "Traffic Survey",
  //       "Geotechnical Investigation Survey",
  //     ],
  //     imageSrc: "/images/services/service1.png",
  //     metricValue: "+150%",
  //     metricLabel: "DATA DENSITY IMPROVEMENT",
  //     metricDesc: "Acquired through multi-frequency LiDAR sweeps.",
  //     standardsLabel: "DGPS STANDARDS",
  //     standardsTitle: "High-Precision Field Reports",
  //     standardsDesc: "Accuracy configured inside BNBC sub-coordinates.",
  //   },
  //   {
  //     id: "002",
  //     title: "Environmental Engineering & Design",
  //     description:
  //       "Fulfilling critical ecological criteria by engineering scalable waste processing units and evaluating comprehensive site-impact matrices.",
  //     subItems: [
  //       "ETP, STP & WTP Assessment & Design",
  //       "Solid Waste Management & Faecal Sludge Management",
  //       "Water, Sanitation, and Hygiene (WASH) Assessment & Design",
  //     ],
  //     imageSrc: "/images/services/service2.png",
  //     metricValue: "100%",
  //     metricLabel: "ECO-AUDITED DESIGNS",
  //     metricDesc: "Strict compliance across global ecological codes.",
  //     standardsLabel: "EIA APPROVED",
  //     standardsTitle: "WASH Compliant Networks",
  //     standardsDesc:
  //       "Engineered to support clean regional utility distribution.",
  //   },
  //   {
  //     id: "003",
  //     title: "Pre-Project Study",
  //     description:
  //       "Securing administrative approval through early Feasibility Studies and Development Project Proposals (DPP).",
  //     subItems: [
  //       "Development Project Proposal (DPP) Preparation",
  //       "Feasibility Study",
  //     ],
  //     imageSrc: "/images/services/service3.png",
  //     metricValue: "98.6%",
  //     metricLabel: "DPP APPROVAL SUCCESS",
  //     metricDesc: "Obtained over continuous project compliance assessments.",
  //     standardsLabel: "ECONOMICS STUDY",
  //     standardsTitle: "Data-Backed Modeling",
  //     standardsDesc:
  //       "Providing thorough financial and morphological projections.",
  //   },
  //   {
  //     id: "004",
  //     title: "Approval Support",
  //     description:
  //       "Guiding technical drawings through legal and administrative clearing procedures while ensuring optimum manpower distribution.",
  //     subItems: [
  //       "Legal and Administrative Support for Design Approval",
  //       "Manpower Distribution",
  //     ],
  //     imageSrc: "/images/services/service4.png",
  //     metricValue: "Fast Track",
  //     metricLabel: "ADMINISTRATIVE CLEARANCE",
  //     metricDesc: "Accelerated processing for design approval pathways.",
  //     standardsLabel: "SUPPORT SERVICES",
  //     standardsTitle: "Manpower Distribution",
  //     standardsDesc:
  //       "Strategic matching of specialized resident engineers for compliance audits.",
  //   },
  //   {
  //     id: "005",
  //     title: "Urban & Regional Planning",
  //     description:
  //       "Organizing community layouts and digital masterplans to steer public expansion, socio-economic welfare, and land acquisition guidelines.",
  //     subItems: [
  //       "Master Plan",
  //       "GIS & Remote Sensing",
  //       "Socioeconomic Studies",
  //       "Land Acquisition and Resettlement Action Plan",
  //     ],
  //     imageSrc: "/images/services/service5.png",
  //     metricValue: "99.8%",
  //     metricLabel: "DESIGN CLEARANCE RATE",
  //     metricDesc: "Achieved over 50 completed development plans.",
  //     standardsLabel: "GIS MAPPING",
  //     standardsTitle: "Advanced Land Informatics",
  //     standardsDesc: "Multi-layered topography maps aligning real boundaries.",
  //   },
  //   {
  //     id: "006",
  //     title: "Road Infrastructure",
  //     description:
  //       "Developing physical networks and vertical transit architectures that conform to strict geometric, structural, and public safety standards.",
  //     subItems: [
  //       "Traffic Modeling",
  //       "Road Safety Design",
  //       "Road Geometric Design",
  //       "Bridge & Culvert Design",
  //     ],
  //     imageSrc: "/images/services/service6.png",
  //     metricValue: "+45%",
  //     metricLabel: "TRANSIT COMMUTE OPTIMIZATION",
  //     metricDesc: "Simulated through high-capacity digital geometric models.",
  //     standardsLabel: "STRUCTURE CODES",
  //     standardsTitle: "BNBC & BS Confirmed",
  //     standardsDesc:
  //       "Complying with critical global structural specifications.",
  //   },
  //   {
  //     id: "007",
  //     title: "Building Infrastructure",
  //     description:
  //       "Crafting high-precision physical structural templates, fire safety configurations, and integrated building automation systems (BMS).",
  //     subItems: [
  //       "Architectural Design",
  //       "Structural Design",
  //       "MEP, HVAC & BMS",
  //       "Fire Safety Design",
  //       "Plumbing Design",
  //       "Electrical Design",
  //     ],
  //     imageSrc: "/images/services/service7.png",
  //     metricValue: "Zero Failure",
  //     metricLabel: "STRUCTURAL DURABILITY",
  //     metricDesc: "Simulated against extreme high-intensity seismic forces.",
  //     standardsLabel: "BMS SYSTEMS",
  //     standardsTitle: "Smart MEP Integration",
  //     standardsDesc: "Automated HVAC and emergency system coordinates.",
  //   },
  //   {
  //     id: "008",
  //     title: "Assessment and Analysis",
  //     description:
  //       "Formulating thorough analytical reviews spanning social, disaster risk, hydrology, noise, and environmental impacts.",
  //     subItems: [
  //       "Traffic Impact Assessment (TIA)",
  //       "Environmental Impact Assessment (EIA)",
  //       "Social Impact Assessment (SIA)",
  //       "Disaster Risk Reduction Assessment",
  //       "Air & Noise Quality Assessment and Prediction Analysis",
  //       "Hydrology and Morphological Analysis",
  //       "Water Supply and Sewerage Network Modeling and Analysis",
  //       "Risk Analysis",
  //     ],
  //     imageSrc: "/images/services/service8.png",
  //     metricValue: "99.9%",
  //     metricLabel: "ANALYSIS MODELING PRECISION",
  //     metricDesc: "Processed using Industry-standard simulation software.",
  //     standardsLabel: "TIA & EIA STANDARD",
  //     standardsTitle: "Multi-impact Compliance",
  //     standardsDesc:
  //       "Delivering verified legal parameters for administrative design clearance.",
  //   },
  // ];


   const servicesData: ServiceData[] = [
  {
    "id": 1,
    "slug": "engineering-infrastructure-consultancy",
    "title": "Engineering & Infrastructure Consultancy",
    "imageSrc": "/images/services/service1.png",
    "description": "REDCon Ltd. provides multidisciplinary engineering and infrastructure consultancy services covering the planning, design, development, implementation, and management of infrastructure projects. Our engineering team combines technical expertise, practical field experience, and cost-effective design approaches to deliver safe, sustainable, and implementable infrastructure solutions.",
    "coreCapabilities": [
      "Feasibility & Technical Studies",
      "Civil & Structural Engineering Design",
      "Infrastructure Planning & Master Planning",
      "Detailed Engineering Design & Technical Specifications",
      "Technical Drawings & Design Documentation",
      "Bill of Quantities (BoQ) & Cost Estimation",
      "Construction Supervision & Quality Control",
      "Operation & Maintenance Planning"
    ]
  },
  {
    "id": 2,
    "slug": "environmental-consultancy",
    "title": "Environmental Consultancy",
    "imageSrc": "/images/services/service2.png",
    "description": "REDCon Ltd. provides comprehensive environmental consultancy services to support environmentally responsible project planning, development, implementation and compliance. Our multidisciplinary approach integrates environmental assessment, monitoring, resource management and regulatory requirements to minimize environmental risks and promote sustainable development.",
    "coreCapabilities": [
      "Environmental Impact Assessment (EIA)",
      "Initial Environmental Examination (IEE)",
      "Environmental Management Plan (EMP)",
      "Environmental Compliance Assessment",
      "Environmental Monitoring & Post-EIA Assessment",
      "Water & Soil Quality Assessment",
      "Wastewater & Effluent Assessment",
      "Environmental Risk Assessment",
      "Environmental Management & Mitigation Planning",
      "Regulatory & Environmental Compliance Support"
    ]
  },
  {
    "id": 3,
    "slug": "water-sanitation-waste-management",
    "title": "Water, Sanitation & Waste Management",
    "imageSrc": "/images/services/service3.png",
    "description": "REDCon Ltd. provides integrated water, sanitation, wastewater, and waste management consultancy services for communities, institutions, industries, and development projects. Our services focus on sustainable resource management, appropriate treatment technologies, environmental protection, and resilient WASH infrastructure.",
    "coreCapabilities": [
      "Water Supply System Planning & Design",
      "Water Treatment & Purification Systems",
      "Reverse Osmosis (RO) System Assessment & Planning",
      "Groundwater Assessment",
      "Water Quality Assessment & Monitoring",
      "Wastewater & Effluent Treatment Plant (ETP) Assessment",
      "Wastewater Management & Treatment Planning",
      "Solid Waste Management",
      "Brine, Sludge & Residual Waste Management",
      "WASH Infrastructure Planning & Development"
    ]
  },
  {
    "id": 4,
    "slug": "climate-change-resilience",
    "title": "Climate Change & Resilience",
    "imageSrc": "/images/services/service4.png",
    "description": "REDCon Ltd. provides climate change, resilience, and disaster risk management services to help communities, institutions, and infrastructure systems respond effectively to current and future climate risks. Our approach combines climate risk assessment, adaptation planning, resilient infrastructure, and nature-based solutions to support sustainable and climate-responsive development.",
    "coreCapabilities": [
      "Climate Risk & Vulnerability Assessment",
      "Climate Adaptation Planning",
      "Climate-Resilient Infrastructure Planning",
      "Disaster Risk Reduction (DRR)",
      "Climate-Smart Agriculture",
      "Resilient Water Resource Management",
      "Coastal & Salinity Risk Assessment",
      "Climate Impact & Risk Analysis",
      "Nature-Based Solutions",
      "Climate Resilience Strategy & Action Planning"
    ]
  },
  {
    "id": 5,
    "slug": "social-safeguard-gender-consultancy",
    "title": "Social Safeguard & Gender Consultancy",
    "imageSrc": "/images/services/service5.png",
    "description": "REDCon Ltd. provides social safeguard, gender, and social development consultancy services to promote inclusive, equitable, and socially responsible project development. Our services integrate stakeholder perspectives, social risk management, gender equality, community participation, and protection of vulnerable groups throughout the project cycle.",
    "coreCapabilities": [
      "Social Impact Assessment",
      "Social Safeguard Assessment",
      "Gender Analysis & Gender Mainstreaming",
      "Stakeholder Engagement & Consultation",
      "Community Consultation & Participation",
      "Resettlement & Livelihood Assessment",
      "Social Risk & Vulnerability Assessment",
      "Gender-Based Violence (GBV) Risk Assessment",
      "Social Inclusion & Vulnerability Analysis",
      "Social Safeguard Planning & Monitoring"
    ]
  },
  {
    "id": 6,
    "slug": "research-survey-evaluation",
    "title": "Research, Survey & Evaluation",
    "imageSrc": "/images/services/service6.png",
    "description": "REDCon Ltd. provides research, survey, baseline, evaluation, and evidence-generation services to support informed decision-making, program me design, policy development and project improvement. Our multidisciplinary research teams apply robust quantitative and qualitative methodologies to generate reliable, actionable, and context-specific evidence.",
    "coreCapabilities": [
      "Baseline & Endline Studies",
      "Impact & Outcome Assessments",
      "Needs & Situation Assessments",
      "Feasibility & Diagnostic Studies",
      "Socioeconomic & Household Surveys",
      "Quantitative & Qualitative Research",
      "Key Informant Interviews (KII)",
      "Focus Group Discussions (FGD)",
      "Monitoring & Evaluation (M&E)",
      "Research Tool & Questionnaire Development",
      "Data Analysis & Interpretation",
      "Evidence-Based Reporting & Recommendations"
    ]
  },
  {
    "id": 7,
    "slug": "project-management-technical-support",
    "title": "Project Management & Technical Support",
    "imageSrc": "/images/services/service7.png",
    "description": "REDCon Ltd. provides project management and technical assistance services to support clients throughout the project lifecycle—from planning and procurement to implementation, monitoring, quality assurance, and completion. Our services are designed to strengthen project performance, improve coordination, and ensure effective delivery against technical, financial, and institutional objectives.",
    "coreCapabilities": [
      "Project Planning & Management",
      "Project Implementation Support",
      "Technical Assistance & Advisory Services",
      "Procurement & Contract Management Support",
      "Project Monitoring & Performance Assessment",
      "Quality Assurance & Quality Control",
      "Institutional Strengthening",
      "Capacity Building & Training",
      "Technical Reporting & Documentation",
      "Project Coordination & Stakeholder Management"
    ]
  },
  {
    "id": 8,
    "slug": "gis-remote-sensing-data-analytics",
    "title": "GIS, Remote Sensing & Data Analytics",
    "imageSrc": "/images/services/service8.png",
    "description": "REDCon Ltd. provides geospatial, remote sensing, and data analytics services to support evidence-based planning, infrastructure development, environmental assessment, resource management, and decision-making. Our capabilities integrate spatial data, field survey information, statistical analysis, and visualization to transform complex datasets into practical insights.",
    "coreCapabilities": [
      "GIS Mapping & Cartographic Services",
      "Spatial Analysis & Geospatial Modelling",
      "Remote Sensing & Satellite Data Analysis",
      "Land Use & Land Cover (LULC) Analysis",
      "Route & Site Selection Analysis",
      "Geospatial Database Development",
      "GPS & Field Survey Data Management",
      "Statistical Data Analysis",
      "Data Visualization & Interactive Dashboards",
      "Spatial Decision Support & Mapping",
      "Survey Data Management & Quality Control",
      "GIS-Based Planning & Monitoring"
    ]
  }
]


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
