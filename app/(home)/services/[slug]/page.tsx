import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import { servicesData } from "../_sections/services-data";

export default async function ServiceDetailsPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = servicesData.find((item) => item.slug === slug);

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(22,163,74,0.16),_transparent_55%)]" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/services" className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            All services
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#16A34A]">
                <span className="h-px w-8 bg-[#16A34A]" /> REDCon service
              </p>
              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
                {service.description}
              </p>
              <Link href="/services#contact" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#16A34A] px-6 py-3 text-sm font-semibold transition hover:bg-[#15803d]">
                Discuss your project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
              <Image src={service.imageSrc} alt={service.title} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-8 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#16A34A]">What we do</p>
              <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Core capabilities</h2>
            </div>
            <span className="font-mono text-sm text-white/40">{String(service.coreCapabilities.length).padStart(2, "0")} areas</span>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.coreCapabilities.map((capability) => (
              <li key={capability} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/30 p-4 text-sm leading-6 text-white/75">
                <Check className="mt-1 h-4 w-4 shrink-0 text-[#16A34A]" />
                {capability}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
