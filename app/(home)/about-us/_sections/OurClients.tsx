"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clients } from "../../_sections/clients-data";

const AUTO_SWIPE_MS = 3000;

const OurClients = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Scrolls one card in the given direction, wrapping around at either end.
  const swipe = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth / 2;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === 1 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else if (direction === -1 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      track.scrollBy({ left: step * direction, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => swipe(1), AUTO_SWIPE_MS);
    return () => clearInterval(timer);
  }, [isPaused, swipe]);

  return (
    <section
      id="our-clients"
      className="relative w-full py-14 md:py-16 lg:py-24 overflow-hidden bg-black scroll-mt-24"
    >
      <div className="absolute pointer-events-none left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[1445px] h-[200px] rounded-full bg-[rgba(0,151,56,0.35)] blur-[250px]" />

      <div className="max-w-[1440px] w-full mx-auto px-4 relative z-10 flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] rounded-full bg-[#166534]" />
              <span className="text-[#16A34A] font-bold text-[16px] leading-[24px] tracking-[3.2px] uppercase">
                our clients
              </span>
            </div>
            <h2 className="text-white font-semibold text-3xl sm:text-4xl lg:text-[48px] lg:leading-[50px] tracking-[-1.2px]">
              Trusted by <span className="text-[#16A34A]">Major Clients</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => swipe(-1)}
              aria-label="Previous clients"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swipe(1)}
              aria-label="Next clients"
              className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:bg-[#16A34A] hover:border-[#16A34A] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-lenis-prevent
        >
          {clients.map((client) => (
            <div
              key={client.logo}
              className="snap-start shrink-0 w-[calc(50%-12px)] sm:w-[calc(33.333%-16px)] lg:w-[calc(20%-19.2px)] h-[150px] rounded-[20px] border border-white/10 bg-white flex items-center justify-center p-6"
            >
              <div className="relative w-full h-full">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
