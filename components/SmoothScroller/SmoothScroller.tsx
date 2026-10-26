"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollerProps {
  children: React.ReactNode;
}

const SmoothScroller: React.FC<SmoothScrollerProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

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

    // Optional: Sync with external animation frames if needed (e.g. GSAP)
    // lenis.on('scroll', (e) => console.log(e));

    return () => {
      // Clean up the instance on component unmount
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroller;