// Shared company contact details used by the navbar, footer and contact sections.
export const siteContact = {
  email: "info.redconbd@gmail.com",
  phones: [
    { display: "+880 1989-211290", tel: "+8801989211290" },
    { display: "+880 1521-213391", tel: "+8801521213391" },
  ],
  addressLines: ["4/20 Happy House, Humayun Road,", "Mohammadpur, Dhaka-1207"],
  businessHours: ["Saturday - Thursday: 9:00 AM - 6:00 PM", "Friday: Closed"],
};

export const socialLinks = {
  facebook: "https://www.facebook.com/share/1KXaQmZVaW/",
  linkedin: "https://www.linkedin.com/company/redconbd/",
};

// SEO / metadata defaults. Set NEXT_PUBLIC_SITE_URL in the deploy env to the real public domain.
export const siteConfig = {
  name: "REDCon Ltd.",
  shortName: "REDCon",
  fullName: "Research Engineering & Development Consultant Limited",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://redconbd.com").replace(/\/$/, ""),
  description:
    "REDCon Ltd. delivers multidisciplinary engineering, infrastructure, environmental, WASH and development consultancy across Bangladesh, from feasibility studies and design to supervision, GIS and research.",
  keywords: [
    "REDCon",
    "REDCon Ltd",
    "engineering consultancy Bangladesh",
    "infrastructure consultancy",
    "environmental consultancy",
    "EIA Bangladesh",
    "water sanitation and waste management",
    "WASH",
    "GIS and remote sensing",
    "construction supervision",
    "development consultancy",
    "Dhaka",
  ],
  ogImage: "/images/hero.png",
  locale: "en_BD",
};
