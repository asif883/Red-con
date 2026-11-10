"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

interface SmoothScrollerProps {
  children: React.ReactNode;
}

const SmoothScroller: React.FC<SmoothScrollerProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const isHistoryNavigation = useRef(false);

  useEffect(() => {
    // Initialize Lenis with smooth momentum scrolling properties
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky smooth exponential out easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoRaf: true, // Automatically links to browser requestAnimationFrame
      anchors: true,
    });

    lenisRef.current = lenis;

    // Back/forward should restore the previous scroll position, not jump to the top
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("popstate", onPopState);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Next.js keeps the old scroll position when part of the new page is already in the
  // viewport, and Lenis keeps animating toward its old target. Together they made new pages
  // open scrolled down. Every link navigation now starts at the top of the page.
  useLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }
    if (window.location.hash) return; // let anchor links scroll to their section

    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default SmoothScroller;
