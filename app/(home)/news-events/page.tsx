import Link from "next/link";
import PageHero from "@/components/PageHero/PageHero";
import { fetchPublishedNews, formatNewsDate } from "@/lib/api/news";
import { imageUrl } from "@/lib/api/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "News & Events",
  description:
    "The latest news, site visits and events from REDCon Ltd., covering our projects and activities across Bangladesh.",
  path: "/news-events",
});

export default async function NewsEventsPage() {
  const items = await fetchPublishedNews();

  return (
    <div>
      <PageHero
        tag="what's happening"
        title="News & Events"
        description="Updates on our activities, projects and events."
      />

      <section className="w-full py-12 md:py-14 lg:py-20 bg-black">
        <div className="max-w-[1440px] mx-auto px-4">
          {items.length === 0 ? (
            <div className="w-full py-16 rounded-[16px] bg-white/[0.04] border border-white/10 text-center text-white/70 font-semibold">
              No News or Events Yet
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => {
                const date = formatNewsDate(item.date);
                return (
                  <Link
                    key={item.slug}
                    href={`/news-events/${item.slug}`}
                    className="group flex flex-col rounded-[16px] overflow-hidden border border-white/10 bg-[rgba(13,92,63,0.12)] hover:border-[#16A34A]/50 transition-colors"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                      {item.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl(item.image)!}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    <div className="relative px-6 pb-6 pt-2 flex flex-col gap-4">
                      <div className="flex items-end justify-between gap-4 -mt-10">
                        <div className="flex items-end gap-2">
                          <span className="text-white text-[72px] leading-[0.85] font-light tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                            {date.day}
                          </span>
                          <span className="text-white/70 text-[13px] pb-1">{date.monthYear}</span>
                        </div>
                        <span className="rounded-full border border-white/40 px-3 py-0.5 text-[12px] text-white/80">
                          {item.category}
                        </span>
                      </div>
                      <h2 className="text-white text-[18px] font-medium leading-[26px] group-hover:text-[#34D399] transition-colors">
                        {item.title}
                      </h2>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
