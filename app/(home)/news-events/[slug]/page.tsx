import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar/Navbar";
import { fetchPublishedNewsBySlug, formatNewsDate, newsParagraphs } from "@/lib/api/news";
import { imageUrl } from "@/lib/api/projects";
import type { Metadata } from "next";
import { buildMetadata, toDescription } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/news-events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = await fetchPublishedNewsBySlug(slug);
  if (!item) return { title: "News not found", robots: { index: false } };

  return buildMetadata({
    title: item.title,
    description: toDescription(newsParagraphs(item.content)[0], `${item.category} from REDCon Ltd.: ${item.title}`),
    path: `/news-events/${item.slug}`,
    image: imageUrl(item.image) ?? undefined,
    type: "article",
    publishedTime: item.date,
  });
}

export default async function NewsDetailsPage({
  params,
}: PageProps<"/news-events/[slug]">) {
  const { slug } = await params;
  const item = await fetchPublishedNewsBySlug(slug);

  if (!item) notFound();

  const date = formatNewsDate(item.date);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <article className="mx-auto max-w-4xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <Link href="/news-events" className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All news & events
        </Link>

        <div className="mt-8 flex items-center gap-3 text-sm">
          <span className="rounded-full border border-[#16A34A]/60 px-3 py-0.5 text-[#34D399]">{item.category}</span>
          <span className="text-white/50">{date.full}</span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{item.title}</h1>

        {item.image && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl(item.image)!} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
          </div>
        )}

        <div className="mt-10 flex flex-col gap-5">
          {newsParagraphs(item.content).map((paragraph, i) => (
            <p key={i} className="text-white/70 text-[16px] leading-[28px]">{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
