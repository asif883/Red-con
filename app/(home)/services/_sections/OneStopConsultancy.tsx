"use client";

import {
  Leaf,
  Droplets,
  CloudSun,
  Users,
  Search,
  BriefcaseBusiness,
  MapPinned,
  DraftingCompass,
  ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { servicesData } from "./services-data";

const serviceIcons: LucideIcon[] = [
  DraftingCompass,
  Leaf,
  Droplets,
  CloudSun,
  Users,
  Search,
  BriefcaseBusiness,
  MapPinned,
];

export default function OneStopConsultancy() {
  const services = servicesData;

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-black py-20 text-white sm:py-24">
      {/* Background atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[1000px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-[linear-gradient(45deg,rgba(52,211,153,0.10)_0%,rgba(10,10,10,0.20)_50%,rgba(244,63,94,0.10)_100%)] blur-[75px] mix-blend-screen"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:gap-16 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 rounded-full bg-[#166534]" />
            <span className="text-[12px] font-bold uppercase leading-6 tracking-[3.2px] text-[#EF4444] sm:text-[16px]">
              One-stop consultancy
            </span>
          </div>

          <h2 className="max-w-[950px] text-3xl font-semibold tracking-[-1.2px] text-white sm:text-4xl lg:text-[48px] lg:leading-[1.08]">
            Transforming ambitious ideas into{" "}
            <span className="italic text-[#16A34A]">
              sustainable structures &amp; data-driven solutions
            </span>
          </h2>
        </div>

        {/* Services are rendered from ServiceData.json */}
        <div className="mt-2 grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = serviceIcons[index] ?? ClipboardList;

            return (
              <article
                key={service.id}
                className="group flex w-full flex-col items-center justify-center gap-4 rounded-[16px] border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-white/10 hover:bg-[rgba(5,150,105,0.30)] sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-white/10 bg-white/5 text-white/60 transition-all duration-300 group-hover:border-white/30 group-hover:bg-[#16A34A] group-hover:text-white">
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="text-[12px] font-bold uppercase leading-5 tracking-[0.6px] text-white/80 transition-colors duration-300 group-hover:text-white sm:text-[13px]">
                  {service.title}
                </h3>

                {/* <p className="line-clamp-3 text-sm leading-6 text-white/55">
                  {service.description}
                </p> */}

                {/* <span className="mt-1 text-[11px] font-semibold uppercase tracking-[1.5px] text-[#16A34A]">
                  {service.coreCapabilities.length} Core Capabilities
                </span> */}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
