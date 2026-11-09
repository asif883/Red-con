import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lightbulb, TrendingUp, Users2 } from "lucide-react";
import PageHero from "@/components/PageHero/PageHero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Life at REDCon",
  description:
    "Inside REDCon Ltd.: our culture, our people and the values that guide how we work.",
  path: "/life-at-redcon",
});

const pillars = [
  { icon: Users2, title: "Teamwork", text: "A professional and collaborative environment built on mutual respect." },
  { icon: Lightbulb, title: "Innovation", text: "We encourage our people to share ideas and contribute to meaningful projects." },
  { icon: TrendingUp, title: "Continuous Learning", text: "Opportunities to develop expertise and grow professionally." },
];

export default function LifeAtRedconPage() {
  return (
    <div>
      <PageHero tag="our culture" title="Life at REDCon" />

      <section className="relative w-full py-14 md:py-16 lg:py-24 overflow-hidden bg-black">
        <div className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-0 w-[1488px] h-[581px] rounded-full bg-[rgba(0,151,56,0.15)] blur-[250px]" />

        <div className="max-w-[1440px] w-full mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                life at REDCon
              </span>
            </div>
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Empowering Our People to{" "}
              <span className="text-[#16A34A]">Deliver Excellence</span>
            </h2>
            <p className="text-white/70 text-base sm:text-[18px] leading-[30px]">
              At REDCon, we foster a professional and collaborative work environment where teamwork, innovation, and continuous learning drive our success. We encourage our people to share ideas, develop their expertise, and contribute to meaningful engineering and consultancy projects. Built on a foundation of quality, integrity, and mutual respect, our workplace promotes professional growth, effective collaboration, and a shared commitment to excellence. At REDCon, we believe that empowering our people is essential to delivering quality services, building lasting client relationships, and creating sustainable value through engineering and development consultancy.
            </p>
            <Link
              href="/careers"
              className="group w-fit inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#16A34A]/60 hover:bg-[#16A34A]/10"
            >
              View open positions
              <ArrowRight className="h-4 w-4 text-[#34D399] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="lg:col-span-5 relative w-full aspect-[4/5] rounded-[24px] overflow-hidden border border-[#16A34A]/40">
            <Image
              src="/images/about.png"
              alt="REDCon team at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </div>
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-[24px] border border-[rgba(22,163,74,0.25)] bg-[linear-gradient(45deg,rgba(2,44,34,0.40)_0%,rgba(2,44,34,0.40)_100%)] p-6 sm:p-8 flex flex-col gap-4"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[rgba(16,185,129,0.20)] bg-[rgba(16,185,129,0.10)]">
                <Icon className="w-5 h-5 text-[#10B981]" />
              </div>
              <h3 className="text-white text-[18px] font-bold">{title}</h3>
              <p className="text-white/60 text-[14px] leading-[22px]">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
