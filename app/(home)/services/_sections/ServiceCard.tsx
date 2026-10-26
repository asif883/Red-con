import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

export interface ServiceData {
  id: number;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  coreCapabilities: string[];
}

interface ServiceCardProps {
  service: ServiceData;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const index = String(service.id).padStart(2, "0");
  const capCount = String(service.coreCapabilities.length).padStart(2, "0");
  const isEvenService = service.id % 2 === 0;

  return (
    <article className="group/card w-full mt-12">
      {/* Main Card Container */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 lg:p-10 transition-all duration-500 hover:border-[#16A34A]/40 hover:shadow-[0_0_60px_-20px_rgba(22,163,74,0.35)]">
        {/* Decorative gradient glow on hover */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#16A34A]/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover/card:opacity-100" />

        <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* LEFT COLUMN */}
          <div
            className={`order-1 flex flex-col gap-6 lg:col-span-5 ${
              isEvenService ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="flex flex-col gap-3">
              {/* Index Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center rounded-full border border-[#16A34A]/30 bg-[#16A34A]/10 px-3 py-1 font-mono text-[11px] font-bold tracking-[0.2em] text-[#16A34A]">
                  {index}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#16A34A]/40 to-transparent" />
              </div>

              {/* Title */}
              <h3 className="text-white font-semibold text-3xl lg:text-[40px] lg:leading-[1.05] tracking-[-0.02em]">
                {service.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-white/65 text-[14.5px] leading-[1.7] max-w-md">
              {service.description}
            </p>

            {/* Actions — Primary + Secondary hierarchy */}
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <a
                href="#contact"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-[#16A34A] px-6 py-3 text-white text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:bg-[#15803d] hover:shadow-[0_8px_30px_-8px_rgba(22,163,74,0.6)]"
              >
                Request Quote
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>

              <Link href={`/services/${service.slug}`} className="group/details inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.02] px-5 py-2.5 text-white text-[12px] font-semibold uppercase tracking-[0.08em] transition-all duration-300 hover:border-[#16A34A] hover:bg-[#16A34A]/10">
                <span>View Details</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover/details:bg-[#16A34A] group-hover/details:rotate-45">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN — Image */}
          <div
            className={`order-2 w-full lg:col-span-7 ${
              isEvenService ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="group/image relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900/40 ring-1 ring-white/10">
              <Image
                src={service.imageSrc}
                alt={`${service.title} process visualization`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Floating tag on image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-md">
                  {capCount} Capabilities
                </span>
                <span className="hidden sm:inline-flex rounded-full border border-[#16A34A]/40 bg-[#16A34A]/20 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#86efac] backdrop-blur-md">
                  Service {index}
                </span>
              </div>
            </div>
          </div>

          {/* CAPABILITIES — Full width row */}
          <div className="order-3 lg:order-3 lg:col-span-12">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">
                Core capabilities
              </h4>
              <span className="font-mono text-xs text-white/40">{capCount} areas</span>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {service.coreCapabilities.map((item, idx) => (
                <li
                  key={item}
                  className="group/cap flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[#16A34A]/50 hover:bg-[#16A34A]/[0.06] hover:-translate-y-0.5"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[#16A34A]/15 font-mono text-[10px] font-bold text-[#16A34A]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] leading-5 text-white/75 transition-colors group-hover/cap:text-white/95">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
