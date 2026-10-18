"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { onReveal } from "@/lib/intro";
import { createDust } from "@/lib/three/dust";

/** Dust motes turning in the afternoon light over the hero film; they drift with the pointer. */
export default function HeroDust() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767.98px)").matches;
    const dust = createDust(ref.current!, { count: mobile ? 120 : 260, size: mobile ? 28 : 36, opacity: 0 });
    if (!dust) return;
    let tween: gsap.core.Tween | undefined;
    const off = onReveal(() => {
      tween = gsap.to(dust.uniforms.uOpacity, { value: 1, duration: 2.5, delay: 1.4, ease: "power1.inOut" });
    });
    return () => {
      off();
      tween?.kill();
      dust.dispose();
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 mix-blend-screen" />;
}
