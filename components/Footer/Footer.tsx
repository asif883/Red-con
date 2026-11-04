import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { siteContact, socialLinks } from "@/lib/site";
import { servicesData } from "@/app/(home)/services/_sections/services-data";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About REDCon", href: "/about-us" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Our Team", href: "/our-team" },
  { name: "Life at REDCon", href: "/life-at-redcon" },
  { name: "News & Events", href: "/news-events" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#030303] pt-20 pb-8 px-4 md:px-8 lg:px-16 flex flex-col items-center justify-center border-t border-neutral-900 overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col gap-12">

        {/* TOP MULTI-COLUMN LINK GRID MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start w-full">

          {/* Column 1: Brand Identifier & Descriptive Profile */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-40 h-10 shrink-0">
                <Image
                  src="/logo/logo.png"
                  alt="REDCon Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <p className="text-white/60  font-normal text-[12px] leading-[19.5px] max-w-[320px]">
              Research Engineering & Development Consultant Limited (REDCon Ltd.) is a premier multidisciplinary engineering consultancy partner based in Bangladesh.
            </p>
          </div>

          {/* Column 2: Quick Links Directory (SPAN 2) */}
          {/* <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              QUICK LINKS
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={`quick-${link.name}`}>
                  <Link href={link.href} className="text-white/60  font-normal text-[12px] leading-[16px] hover:text-[#16A34A] transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Column 3: Functional Services Area (SPAN 4) */}
          {/* <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              SERVICES
            </h4>
            <ul className="flex flex-col gap-2.5">
              {servicesData.map((service) => (
                <li key={`service-${service.slug}`}>
                  <Link href={`/services/${service.slug}`} className="text-white/60  font-normal text-[12px] leading-[16px] hover:text-[#16A34A] transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}

            

          {/* Column 2: Direct Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              CONTACT DETAILS
            </h4>
            <ul className="flex flex-col gap-3 text-white/60  font-normal text-[12px] leading-[16px]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <div className="flex flex-col gap-1">
                  {siteContact.addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <a href={`mailto:${siteContact.email}`} className="hover:text-[#16A34A] transition-colors">
                  {siteContact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <div className="flex flex-col gap-1">
                  {siteContact.phones.map((phone) => (
                    <a key={phone.tel} href={`tel:${phone.tel}`} className="hover:text-[#16A34A] transition-colors">
                      {phone.display}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-white/40">
                <Clock className="w-4 h-4 shrink-0 text-[#16A34A]" />
                <span>{siteContact.businessHours[0]}</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Profiles */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[#16A34A]  font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase  ">
              FOLLOW US
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REDCon on Facebook"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-all"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="REDCon on LinkedIn"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-white/70 hover:text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-all"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>


        {/* BOTTOM UTILITY REGISTRATION FOOTER BAR */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-white/[0.03]">

          {/* Left Area: Dynamic Copyright Statement */}
          <span className="text-white/40  font-medium text-[12px] leading-[16px] text-center md:text-left  ">
            © {new Date().getFullYear()} REDCon Ltd. All rights reserved.
          </span>

          {/* Right Area: Policy Agreements and Platform Credits */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link href="/privacy-policy" className="text-white/40  font-medium text-[12px] leading-[16px] hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>

            {/* Creator Attribution Tag Integration */}
            <Link href="https://webbriks.com" target="_blank" className="flex items-center gap-2  ">
              <span className="text-white  font-bold text-[10px] leading-[16.5px] tracking-wide" style={{ fontFamily: "var(--font-montserrat), Montserrat, sans-serif" }}>
                Made by
              </span>
              <div className="relative w-16 h-4 opacity-90 hover:opacity-100 transition-opacity">
                <Image
                  src="/logo/webbriks.png"
                  alt="Webbriks Logo"
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
