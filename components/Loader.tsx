"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { reveal } from "@/lib/intro";
import { getLenis } from "./SmoothScroll";
import { IMAGES } from "@/lib/data";
import { createDust } from "@/lib/three/dust";

const BRAND = "ARIZONA";

/**
 * First-visit loading screen, staged like arriving at the house:
 *  1. the monogram is drawn in brass on the dark ground while assets load
 *  2. an arched doorway rises behind it and its two leaves swing open onto the room and the name
 *  3. the doorway expands past the viewport, and the monogram flies to its place in the header
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current!;
      const $ = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
      const logo = el.querySelector<HTMLElement>("[data-l-logo]")!;
      const headerLogo = document.querySelector<HTMLElement>("[data-header-logo]");
      const html = document.documentElement;

      window.scrollTo(0, 0);
      html.style.overflow = "hidden";
      requestAnimationFrame(() => getLenis()?.stop());
      if (headerLogo) gsap.set(headerLogo, { opacity: 0 });

      // brass dust hanging in the dark, drawn in through the doorway as it opens
      const dust = createDust(el.querySelector<HTMLElement>("[data-l-dust]")!, { count: 750, size: 30, opacity: 0, alwaysRender: true });
      const dustU = dust?.uniforms;

      const loaded = new Promise<void>((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", () => resolve(), { once: true });
        setTimeout(resolve, 6000); // never hold the visitor hostage to a slow asset
      });

      // 1. Monogram drawn upward, progress counts while the page loads
      const counter = { v: 0 };
      const count = $("[data-l-count]")[0];
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .fromTo(logo, { clipPath: "inset(100% 0 0 0)", y: 16 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: 1.3, ease: "power3.inOut" })
        .fromTo($("[data-l-progress]"), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.3)
        .to(counter, {
          v: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            count.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.2)
        .fromTo($("[data-l-bar]"), { scaleX: 0 }, { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0.2);
      if (dustU) intro.to(dustU.uOpacity, { value: 0.9, duration: 2, ease: "power1.inOut" }, 0);

      Promise.all([loaded, intro.then()]).then(() => open());

      function open() {
        const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: finish });

        // 2. The doorway rises, its leaves swing open onto the room and the name
        tl.to($("[data-l-progress]"), { autoAlpha: 0, y: -10, duration: 0.5, ease: "power2.in" })
          .fromTo($("[data-l-arch]"), { yPercent: 100, autoAlpha: 1 }, { yPercent: 0, duration: 1.2 }, 0.2)
          .fromTo($("[data-l-ring]"), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.3, stagger: 0.08 }, 0.25)
          .to($('[data-l-door="l"]'), { rotateY: -104, duration: 1.6 }, 1.45)
          .to($('[data-l-door="r"]'), { rotateY: 104, duration: 1.6 }, 1.45)
          .fromTo($("[data-l-img]"), { scale: 1.3 }, { scale: 1, duration: 2.4, ease: "power2.out" }, 1.45)
          .from($("[data-l-char]"), { yPercent: 110, duration: 1, stagger: 0.06, ease: "power4.out" }, 1.85)
          .from($("[data-l-tag]"), { autoAlpha: 0, y: 12, duration: 0.8, ease: "power2.out" }, 2.4);
        // the doors swinging open stir the air
        if (dustU) tl.to(dustU.uWarp, { value: 0.25, duration: 1.4, ease: "power2.out" }, 1.45).to(dustU.uWarp, { value: 0.08, duration: 1.4, ease: "sine.inOut" }, 2.85);

        // 3. The doorway opens onto the site; the monogram takes its seat in the header
        const exitAt = 3.6;
        tl.call(reveal, [], exitAt)
          .to($("[data-l-name]"), { autoAlpha: 0, y: -24, duration: 0.6, ease: "power2.in" }, exitAt - 0.1)
          .to($("[data-l-arch]"), { scale: 2.6, transformOrigin: "50% 100%", duration: 1.3, ease: "power3.in" }, exitAt)
          .to($("[data-l-ring]"), { scale: 1.6, autoAlpha: 0, transformOrigin: "50% 100%", duration: 1, ease: "power2.in" }, exitAt)
          .to($("[data-l-bg]"), { autoAlpha: 0, duration: 0.9, ease: "power1.inOut" }, exitAt + 0.5)
          .to($("[data-l-arch]"), { autoAlpha: 0, duration: 0.7, ease: "power1.inOut" }, exitAt + 0.8);
        if (dustU) {
          tl.to(dustU.uWarp, { value: 1.3, duration: 1.4, ease: "power2.in" }, exitAt).to(dustU.uOpacity, { value: 0, duration: 0.6, ease: "power1.in" }, exitAt + 0.9);
        }

        if (headerLogo) {
          // follow the header live: it is still sliding in while the monogram flies
          const from = logo.getBoundingClientRect();
          gsap.set(logo, { position: "fixed", left: from.left, top: from.top, right: "auto", bottom: "auto", width: from.width, height: from.height, y: 0, margin: 0 });
          const p = { t: 0 };
          tl.to(p, {
            t: 1,
            duration: 1.5,
            ease: "power3.inOut",
            onUpdate: () => {
              const to = headerLogo.getBoundingClientRect();
              const lerp = (a: number, b: number) => a + (b - a) * p.t;
              gsap.set(logo, { left: lerp(from.left, to.left), top: lerp(from.top, to.top), width: lerp(from.width, to.width), height: lerp(from.height, to.height) });
            },
          }, exitAt + 0.15)
            .to(logo, { backgroundColor: "#241b14", duration: 1.1, ease: "power1.inOut" }, exitAt + 0.5)
            .set(headerLogo, { opacity: 1 })
            .set(logo, { autoAlpha: 0 });
        } else {
          tl.to(logo, { autoAlpha: 0, duration: 0.6 }, exitAt);
        }
      }

      function finish() {
        html.style.overflow = "";
        getLenis()?.start();
        setDone(true);
      }

      return () => dust?.dispose();
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      data-loader
      aria-hidden
      className="pointer-events-none fixed inset-0 z-100 overflow-hidden [--arch-h:86svh] [--arch-w:min(84vw,60svh)] [--logo-h:clamp(72px,13svh,128px)]"
    >
      <div data-l-bg className="pointer-events-auto absolute inset-0 bg-primary" />

      {/* concentric hairline arches framing the doorway */}
      {[2, 1].map((n) => (
        <div
          key={n}
          data-l-ring
          className="invisible absolute inset-x-0 bottom-0 mx-auto rounded-t-full border border-b-0 border-secondary-fixed-dim/15"
          style={{ width: `calc(var(--arch-w) + ${n * 64}px)`, height: `calc(var(--arch-h) + ${n * 32}px)` }}
        />
      ))}

      {/* the doorway */}
      <div
        data-l-arch
        className="invisible absolute inset-x-0 bottom-0 mx-auto h-(--arch-h) w-(--arch-w) overflow-hidden rounded-t-full perspective-[1600px]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img data-l-img src={IMAGES.livingSalon} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-primary/60 via-primary/25 to-primary/70" />

        <div
          data-l-name
          className="absolute inset-x-0 flex flex-col items-center gap-3 text-center"
          style={{ top: "calc(50svh - (100svh - var(--arch-h)) + var(--logo-h) / 2 + 28px)" }}
        >
          <span className="flex overflow-hidden font-serif text-[min(10vw,7.5svh)] leading-[1.1] tracking-[0.16em] text-surface">
            {BRAND.split("").map((c, i) => (
              <span key={i} data-l-char className="inline-block">
                {c}
              </span>
            ))}
          </span>
          <span data-l-tag className="text-label-sm tracking-[0.3em] text-secondary-fixed uppercase">
            Interior / Exterior Company
          </span>
        </div>

        <div data-l-door="l" className="door absolute inset-y-0 left-0 w-1/2 origin-left" />
        <div data-l-door="r" className="door absolute inset-y-0 right-0 w-1/2 origin-right" />
      </div>

      {/* WebGL brass dust (Three.js) */}
      <div data-l-dust className="absolute inset-0" />

      {/* the monogram — later flies to the header */}
      <div
        data-l-logo
        className="absolute inset-0 m-auto bg-secondary-fixed"
        style={{
          height: "var(--logo-h)",
          width: "calc(var(--logo-h) * 357 / 437)",
          WebkitMask: "url(/images/logo-mark.png) center / contain no-repeat",
          mask: "url(/images/logo-mark.png) center / contain no-repeat",
          clipPath: "inset(100% 0 0 0)",
        }}
      />

      <div data-l-progress className="invisible absolute inset-x-0 bottom-10 flex flex-col items-center gap-3 md:bottom-14">
        <span className="text-label-sm tracking-[0.3em] text-secondary-fixed-dim/80 uppercase">
          Arizona <span className="mx-2 text-secondary-fixed-dim/40">·</span> <span data-l-count>000</span>
        </span>
        <span className="h-px w-40 bg-secondary-fixed-dim/15">
          <span data-l-bar className="block h-full w-full origin-left scale-x-0 bg-secondary-fixed-dim" />
        </span>
      </div>
    </div>
  );
}
