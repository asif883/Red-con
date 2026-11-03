// Board of Directors shown on the About / Our Team pages.
// imageSrc is optional — members without a photo show their initials.
export interface BoardMember {
  name: string;
  role: string;
  imageSrc?: string;
  bio: string[];
}

export const boardMembers: BoardMember[] = [
  {
    name: "Md Nurul Bari Sarker",
    role: "Chairman",
    imageSrc: "/images/teams/nurul.png",
    bio: [
      "Md. Nurul Bari Sarker serves as the Chairman of Research Engineering & Development Consultant Ltd. (REDCon Ltd.). With an academic background in social sciences, political science, and education, he brings a multidisciplinary perspective to social development and infrastructure consultancy.",
      "He holds a Bachelor of Political Science and a Master of Political Science from the University of Dhaka, Bangladesh. He also holds a Bachelor of Education from the National University, Bangladesh, and a Master of Education from Northern University, Bangladesh.",
      "His professional experience includes assignments as a Social Expert and Social Specialist across a range of infrastructure development and consultancy projects in Bangladesh. His work has covered feasibility studies, land acquisition and resettlement action planning, environmental monitoring, post-environmental-impact assessment, urban infrastructure development, and transport-related projects.",
      "His listed assignments include social specialist roles in the feasibility study and master planning for Bangladesh University of Professionals, land acquisition and resettlement planning associated with the Mirpur-12 Metro Rail Uttara South Station Road, environmental monitoring under the Improving Urban Governance & Infrastructure Program, and the feasibility study for Crime Prevention Company Complex construction for the Rapid Action Battalion (RAB).",
      "His additional professional development includes training in teaching quality improvement, digital learning, and subject-based online training, as well as experience as a Head Examiner for the Dhaka Education Board.",
      "As Chairman of REDCon Ltd., Md. Nurul Bari Sarker represents the company's leadership and its commitment to professional consultancy services. His multidisciplinary background provides a foundation for understanding the social dimensions of development projects and the importance of integrating social considerations into infrastructure planning and implementation.",
    ],
  },
  {
    name: "Md Amin-Uzz-Zaman Madani",
    role: "Managing Director",
    imageSrc: "/images/teams/amin.jpeg",
    bio: [
      "Engr. Md. Amin-Uzz-Zaman Madani is a civil engineer and environmental management professional with multidisciplinary expertise in engineering consultancy, project coordination, feasibility studies, environmental assessment, and infrastructure development. As the Managing Director of Research Engineering & Development Consultant Limited (REDCon Ltd.), he provides technical leadership and strategic direction, supporting the company's commitment to delivering innovative, sustainable, and evidence-based engineering solutions.",
      "He holds a Bachelor of Science in Civil Engineering from Ahsanullah University of Science and Technology (AUST) and a Master of Science in Environmental Science and Management from Jahangirnagar University. He is also a registered professional civil engineer and a member of the Institution of Engineers, Bangladesh (IEB).",
      "His professional experience encompasses feasibility studies, infrastructure planning, environmental and social impact assessments, disaster risk reduction, GIS-based spatial analysis, field survey coordination, and technical reporting. He has contributed to multidisciplinary assignments involving public infrastructure, institutional facilities, climate-resilient development, and environmental management, working with projects associated with organizations such as the Bangladesh Coast Guard, Bangladesh University of Professionals (BUP), Local Government Engineering Department (LGED), and other development partners.",
      "With proficiency in modern engineering and data-management tools, including ArcGIS Pro, AutoCAD, Civil 3D, KoboToolbox, SPSS, and Microsoft Project, he integrates technical analysis, field-level evidence, and practical project management to support informed decision-making.",
      "Under his leadership, REDCon Ltd. strives to strengthen its capabilities in engineering consultancy, research, feasibility assessment, environmental management, and infrastructure development. His professional approach emphasizes technical integrity, client-focused service, multidisciplinary collaboration, and sustainable development, positioning the company to deliver practical solutions to complex engineering and development challenges.",
    ],
  },
  {
    name: "Jannatun Nayeem Rahman",
    role: "Director",
    imageSrc: "/images/teams/jannatun.jpeg",
    bio: [
      "Jannatun Nayeem is the Director of Research Engineering & Development Consultant Limited (REDCon Ltd.), bringing over six years of professional experience in civil engineering, infrastructure development, environmental assessment, and engineering consultancy. He holds a B.Sc. in Civil Engineering from the University of Asia Pacific and has completed his M.Sc. in Geography and Environmental Development at Jahangirnagar University.",
      "His multidisciplinary academic background and professional experience contribute to REDCon's consultancy services, project development, and business growth, with an emphasis on technical excellence, environmental responsibility, and sustainable infrastructure development in Bangladesh.",
    ],
  },
  {
    name: "Md Sazzadul Bari Sarker",
    role: "Chief Executive Officer",
    imageSrc: "/images/teams/sarkar.jpeg",
    bio: [
      "Engr. Sazzadul Bari Sarker, Chief Executive Officer (CEO) of Research Engineering & Development Consultant Ltd. (REDCon Ltd.), is a Civil Engineer with multidisciplinary expertise in infrastructure development, feasibility studies, urban drainage, environmental management, and data analytics. He holds a BSc in Civil Engineering from Ahsanullah University of Science and Technology (AUST) and an MBA in International Business from the University of Dhaka, and is pursuing a Postgraduate Diploma in Business Information Technology at BUET.",
      "His professional experience includes working on infrastructure and municipal development projects associated with organizations and development partners such as LGED, ADB, AFD, GIZ, and FAO. His expertise spans technical feasibility assessments, civil infrastructure evaluation, solid waste management, environmental safeguards, and project analysis. As CEO of REDCon Ltd., he brings together engineering knowledge, business insight, and data-driven approaches to support sustainable infrastructure development and professional consultancy services.",
    ],
  },
];
