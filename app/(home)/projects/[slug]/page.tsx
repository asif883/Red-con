import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Calendar, Tag, User } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import { projects as portfolioProjects } from "../_sections/project";

/* ---------- HERO: text only, compact ---------- */
function ProjectHero({
  title,
  description,
  category,
  status,
}: {
  title: string;
  description: string;
  category?: string;
  status?: string;
}) {
  return (
    <section className="relative ">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(22,163,74,0.12),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-32">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All projects
        </Link>

        <div className="mt-8 max-w-5xl">
          <div className="flex flex-wrap gap-2">
            {category && (
              <span className="rounded-full border border-[#16A34A]/30 bg-[#16A34A]/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-200">
                {category}
              </span>
            )}
            {status && (
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                {status}
              </span>
            )}
          </div>

          <h1 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- COVER: small framed card ---------- */
function ProjectCover({ cover, title }: { cover: string; title: string }) {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <div className="relative -mt-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-2xl shadow-black/50">
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={cover}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1152px) 100vw, 1152px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}

function ProjectGallery({
  title,
  images,
  steps,
}: {
  title: string;
  images: string[];
  steps: string[];
}) {
  const validImages = images.filter(Boolean).slice(0, 3);

  if (validImages.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-8">
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Behind the Project
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60">
          Explore the key stages and visual highlights of {title}.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {validImages.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-colors duration-300 hover:border-[#16A34A]/30"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
              <Image
                src={image}
                alt={`${title} - ${steps[index] ?? `Step ${index + 1}`}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="flex flex-col p-4 sm:p-5">
              <span className="mb-[1px] shrink-0 font-mono text-xs tracking-wider text-[#16A34A]">
                STEP {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-medium text-white">
                {steps[index] ?? `Project Step ${index + 1}`}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- PAGE ---------- */
export default async function ProjectDetailsPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;

  // শুধু static portfolio থেকে খোঁজো
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  const details = [
    { icon: User, label: "Client", value: project.client },
    { icon: MapPin, label: "Location", value: project.location },
    { icon: Tag, label: "Category", value: project.category },
    {
      icon: Calendar,
      label: "Timeline",
      value:
        project.endDate && project.endDate !== "Ongoing"
          ? `${project.startDate} – ${project.endDate}`
          : `${project.startDate} – Ongoing`,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* 1. Text hero */}
      <ProjectHero
        title={project.title}
        description={project.description}
        category={project.category}
      />

      {/* 2. Small framed cover */}
      <ProjectCover cover={project.imageMain} title={project.title} />

      {/* 3. Details */}
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-12 sm:px-8">
        {/* Info strip */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {details.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-[#16A34A]/40"
            >
              <div className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-[#16A34A]" />
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {label}
                </p>
              </div>
              <p className="mt-2 text-sm font-medium leading-6 text-white">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Two content blocks */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
              Project scope
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              What we delivered
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/65">
              {project.scopeOfWork}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#16A34A]">
              Engineering
            </p>
            <h2 className="mt-2 text-xl font-semibold text-white">
              Project highlights
            </h2>
            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-white/65">
              {project.engineeringHighlights}
            </p>
          </div>
        </section>

        {/* Gallery */}
        <ProjectGallery
          title={project.title}
          images={[project.stepImg1, project.stepImg2, project.stepImg3]}
          steps={project.steps}
        />
      </div>
    </main>
  );
}