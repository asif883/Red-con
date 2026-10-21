import React from "react";
import TeamCard from "./TeamCard";

export interface DBTeamMember {
  id: string;
  name: string;
  role: string;
  edu: string | null;
  expertise: string | null;
  memberOf: string | null;
  email: string;
  phone: string;
  imageUrl: string;
  linkedinUrl: string | null;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface DBTeamCategory {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  members: DBTeamMember[];
}

async function getTeamCategories(): Promise<DBTeamCategory[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  try {
    // Direct real-time fetch pipeline bypassing Next.js server caching tracks completely
    const response = await fetch(`${baseUrl}/teams/categories`, {
      cache: "no-store", // Guarantees fresh database data on every page reload
    });

    if (!response.ok) {
      throw new Error(`HTTP network loop failure: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      "[Server Component Fetch Error] Failed to aggregate organizational chart:",
      error,
    );
    return [];
  }
}

export default async function Teams() {
  const categories = await getTeamCategories();

  return (
    <section className="relative w-full py-24 overflow-hidden bg-[#050505] text-white">
      {/* Background Ambient Vector Glow Shapes */}
      <div className="absolute pointer-events-none   mix-blend-screen left-1/4 top-1/4 w-[800px] h-[500px] rounded-full bg-[linear-gradient(270deg,rgba(0,151,56,0.06)_0%,rgba(255,0,0,0.06)_100%)] blur-[150px]" />
      <div className="absolute pointer-events-none   mix-blend-screen right-1/4 bottom-1/4 w-[800px] h-[500px] rounded-full bg-[linear-gradient(270deg,rgba(0,151,56,0.06)_0%,rgba(255,0,0,0.06)_100%)] blur-[150px]" />

      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-20">
        {/* Main Section Header */}
        <div className="flex flex-col gap-4 max-w-4xl text-left  ">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: "32px",
                height: "2px",
                borderRadius: "9999px",
                background: "#166534",
              }}
            />
            <span
              style={{
                color: "#EF4444",
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
                letterSpacing: "3.2px",
                textTransform: "uppercase",
              }}
            >
              executive boards
            </span>
          </div>

          <h2
            className="text-white text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]"
            style={{ fontFamily: "Inter, sans-serif", fontWeight: 600 }}
          >
            Guiding development projects with{" "}
            <span className="italic text-[#16A34A]">
              accuracy & structural precision
            </span>
          </h2>
        </div>

        {/* DYNAMIC CATEGORY LOOP CHANNELS */}
        {categories.length > 0 ? (
          categories.map((category) => {
            // Protect layout view structure bounds by skipping empty structural tiers
            if (!category.members || category.members.length === 0) return null;

            return (
              <div
                key={category.id}
                className="flex flex-col gap-10 first:mt-0 mt-6 animate-fadeIn"
              >
                {/* Dynamic Group Block Line Heading Header */}
                <div className="flex items-center gap-3  ">
                  <div
                    style={{
                      width: "32px",
                      height: "2px",
                      borderRadius: "9999px",
                      background: "#166534",
                    }}
                  />
                  <h3
                    className="text-2xl sm:text-3xl tracking-[3.2px] bg-clip-text text-transparent italic font-semibold uppercase"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      backgroundImage:
                        "linear-gradient(270deg, #FF0000 0%, #16A34A 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {category.name}
                  </h3>
                </div>

                {/* Subgrid Card Collection Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {category.members.map((member) => (
                    <TeamCard key={member.id} member={member} />
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full py-24 border border-dashed border-neutral-800 rounded-[32px] flex flex-col items-center justify-center text-white/30 text-sm font-semibold tracking-wider   uppercase">
            No dynamic workforce team profiles currently live on server notes.
          </div>
        )}
      </div>
    </section>
  );
}
