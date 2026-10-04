"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

let lenis: Lenis | null = null;
export const getLenis = () => lenis;

/** Weighted, unhurried scrolling (Lenis) kept in sync with GSAP ScrollTrigger. */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    lenis = new Lenis({ duration: 1.25, easing: (t) => 1 - Math.pow(1 - t, 4), anchors: { offset: -96 } });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  // new page → start at the top (unless navigating to an anchor)
  useEffect(() => {
    if (!window.location.hash) lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
