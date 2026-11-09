"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Stat } from "@/lib/api/stats";

const COUNT_DURATION = 2000;

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/** Fires once when the element enters the viewport. */
function useInViewOnce<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
}

/** Animates every target from 0 -> value. Skips animation for reduced-motion users. */
function useCountUp(targets: number[], active: boolean, duration = COUNT_DURATION) {
  const [counts, setCounts] = useState<number[]>(() => targets.map(() => 0));

  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCounts(targets);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutQuart(progress);
      setCounts(targets.map((t) => Math.floor(t * eased)));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCounts(targets);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, targets, duration]);

  return counts;
}

function StatItem({
  stat,
  count,
  className = "",
}: {
  stat: Stat;
  count: number;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center lg:mb-24 lg:last:mb-0 ${className}`}
    >
      <p className="text-4xl font-medium tabular-nums tracking-tight text-[#0B9D41] md:text-5xl lg:text-[50px]">
        {/* Animated value is decorative; screen readers get the final number */}
        <span aria-hidden="true">
          {count}
          {stat.suffix}
        </span>
        <span className="sr-only">
          {stat.value}
          {stat.suffix}
        </span>
      </p>

      <p className="mt-2 max-w-[220px] text-sm font-medium leading-6 text-white md:text-base">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection({ stats }: { stats: Stat[] }) {
  const [sectionRef, isVisible] = useInViewOnce<HTMLElement>(0.2);
  const targets = useMemo(() => stats.map((s) => s.value), [stats]);
  const counts = useCountUp(targets, isVisible);

  const leftStats = stats.filter((s) => s.order <= 3);
  const rightStats = stats.filter((s) => s.order > 3);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="impact-heading"
      className="relative w-full overflow-hidden pt-12 md:pt-16"
    >
    <h2 
        className="text-white  font-semibold text-3xl sm:text-4xl  lg:leading-[50px] tracking-[-1.2px] text-center pb-8 lg:pb-0 px-2 md:px-0"
    >
        Transforming Sustainable <span className="text-[#16A34A]">Bangladesh</span>
      </h2>

      {/*
        Mobile: one 2-col grid (image on top, 6 stats below, no orphans).
        Desktop: 3 columns. The column wrappers use `contents` below lg so
        their children flow straight into the parent grid.
      */}
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 items-center gap-x-6 gap-y-10 px-5 md:px-10 lg:mt-10 lg:grid-cols-[1fr_1.5fr_1fr] lg:gap-0 lg:px-12">
        {/* Left stats */}
        <div className="contents lg:flex lg:flex-col lg:justify-center">
          {leftStats.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              count={counts[stats.indexOf(stat)]}
              className={i === 1 ? "lg:translate-x-8" : ""}
            />
          ))}
        </div>

        {/* Center image */}
        <div className="relative order-first col-span-2 flex h-[350px] items-end justify-center lg:order-none lg:col-span-1 lg:h-[550px]">
          <div
            className={`relative h-full w-full max-w-[550px] transition-all duration-[1500ms] ease-out motion-reduce:transition-none ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-32 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
            }`}
          >
            <Image
              src="/images/total-map.png"
              alt="Map of the districts we cover"
              fill
              sizes="(min-width: 1024px) 550px, 100vw"
              className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* Right stats */}
        <div className="contents lg:flex lg:flex-col lg:justify-center">
          {rightStats.map((stat, i) => (
            <StatItem
              key={stat.id}
              stat={stat}
              count={counts[stats.indexOf(stat)]}
              className={i === 1 ? "lg:-translate-x-8" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}