import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "../projects/_sections/project";

export interface BackendProject {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  description: string | null;
  metric1Title: string | null;
  metric1Value: string | null;
  metric2Title: string | null;
  metric2Value: string | null;
  thumbnail: string | null;
  gallery: string[];
  status: "DRAFT" | "PUBLISHED";
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
  };
}

export default function Projects() {
  const featuredProjects = projects.slice(0, 6);

  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ background: "rgba(22, 101, 52, 0.08)" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-32 h-[581px] w-[1488px] max-w-none -translate-x-1/2 rounded-full bg-[linear-gradient(270deg,rgba(0,151,56,0.30)_0%,rgba(255,0,0,0.30)_100%)] blur-[250px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-8 rounded-full bg-[#166534]" />
            <span className="text-[16px] font-bold uppercase leading-6 tracking-[3.2px] text-[#EF4444]">
              projects
            </span>
          </div>

          <h2 className="text-3xl font-semibold tracking-[-1.2px] text-white sm:text-4xl lg:text-[48px] lg:leading-[1.1]">
            Transforming Ideas into{" "}
            <span className="bg-[linear-gradient(270deg,#FF0000_35.58%,#16A34A_100%)] bg-clip-text italic text-transparent">
              Impactful Projects
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 transition-colors duration-300 hover:border-[#16A34A]/40"
            >
              <Link
                href={`/projects/${project.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-neutral-900"
                aria-label={`View ${project.title}`}
              >
                <Image
                  src={project.imageMain}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.status}
                </span>
              </Link>

              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#34D399]">
                  {project.category}
                </p>
                <h3 className="line-clamp-2 min-h-14 text-lg font-semibold leading-7 text-white">
                  {project.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-6 text-white/60">
                  {project.description}
                </p>
                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <span className="flex min-w-0 items-center gap-2 text-sm text-white/60">
                    <MapPin className="h-4 w-4 shrink-0 text-[#34D399]" aria-hidden="true" />
                    <span className="truncate">{project.location}</span>
                  </span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#34D399] transition-colors hover:text-white"
                  >
                    Details
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all hover:border-[#16A34A]/60 hover:bg-[#16A34A]/10"
          >
            View all projects
            <ArrowRight className="h-4 w-4 text-[#34D399] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
