// News & Events entries. Add a new object to publish an item — the card
// appears on /news-events and clicking it opens /news-events/<slug>.
//
// Example:
// {
//   slug: "site-visit-mirpur-12",
//   title: "Site Visit at Mirpur-12 Metro Rail",
//   date: "2026-08-24",
//   category: "News",
//   image: "/images/project-showcase/project1.png",
//   content: [
//     "First paragraph of the story...",
//     "Second paragraph...",
//   ],
// },
export interface NewsItem {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  category: "News" | "Event";
  image: string;
  content: string[];
}

export const newsItems: NewsItem[] = [];

export const formatNewsDate = (date: string) => {
  const d = new Date(`${date}T00:00:00`);
  return {
    day: d.getDate(),
    monthYear: d.toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    full: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
  };
};
