"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import Icon from "../Icon";
import { Img, Kicker, SectionTitle, gutters, sectionY } from "../ui";
import { Flip, ScrollTrigger, gsap } from "@/lib/gsap";
import { filters, gallery, projects, type Category } from "@/lib/data";

type FlipState = ReturnType<typeof Flip.getState>;

export default function SelectedWorks() {
  const [filter, setFilter] = useState<"all" | Category>("all");
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<FlipState | null>(null);

  const choose = (key: "all" | Category) => {
    if (key === filter || !gridRef.current) return;
    flipState.current = Flip.getState(gridRef.current.querySelectorAll("[data-card]"));
    setFilter(key);
  };

  // Re-arrange the grid like furniture being moved within a room
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;
    Flip.from(state, {
      duration: 0.9,
      ease: "power3.inOut",
      absolute: true,
      stagger: 0.04,
      onEnter: (els) => gsap.fromTo(els, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.7, delay: 0.25 }),
      onLeave: (els) => gsap.to(els, { autoAlpha: 0, scale: 0.95, duration: 0.4 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  return (
    <section id="selected-works" className={`w-full scroll-mt-24 bg-surface-container-low ${gutters} ${sectionY}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-6 border-b border-outline-variant/40 pb-6 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <Kicker>Portfolio Directory</Kicker>
            <SectionTitle>Selected Works</SectionTitle>
            <p className="mt-2 text-body-md text-on-surface-variant md:hidden">
              A collection of spaces shaped by material, light, and purpose.
            </p>
          </div>
          <div
            data-reveal-stagger
            className="-mx-5 flex items-center gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 lg:gap-3"
          >
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => choose(f.key)}
                aria-pressed={filter === f.key}
                className={`shrink-0 px-4 py-2 text-label-sm tracking-widest uppercase transition-colors ${
                  filter === f.key
                    ? "border border-primary bg-primary text-on-primary"
                    : "border border-outline-variant/30 bg-surface-bright text-on-surface-variant hover:text-primary"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-1 gap-8 md:grid-cols-12">
          {projects.map((p) => {
            const visible = filter === "all" || p.category === filter;
            return (
              <Link
                key={p.slug}
                data-card
                data-flip-id={p.slug}
                href={`/works/${p.slug}`}
                className={`group flex-col ${visible ? "flex" : "hidden"} ${filter === "all" ? p.span : "md:col-span-6"}`}
              >
                <div
                  data-panel={p.span.includes("col-span-4") || p.span.includes("col-span-5") ? "up" : "left"}
                  className={`relative mb-4 overflow-hidden bg-surface ${filter === "all" ? p.aspect : "aspect-[16/11]"}`}
                >
                  <Img src={p.image} alt={p.alt} className="transition-transform duration-700 ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-active:opacity-100">
                    <span className="bg-surface-bright/95 px-5 py-3 text-label-sm tracking-widest text-primary uppercase shadow-md">
                      View Case File
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-primary/80 px-3 py-1 text-label-sm tracking-wider text-on-primary uppercase backdrop-blur-sm">
                    Project {p.number} / {p.city}
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-2">
                  <div>
                    <h3 className="font-serif text-headline-sm text-primary transition-colors group-hover:text-secondary">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-body-sm text-on-surface-variant">{p.summary}</p>
                  </div>
                  <span className="shrink-0 text-label-sm tracking-widest text-outline uppercase">{p.tag}</span>
                </div>
              </Link>
            );
          })}
          {gallery.map((g) => {
            const visible = filter === "all" || g.category === filter;
            return (
              <figure
                key={g.image}
                data-card
                data-flip-id={g.image}
                className={`group flex-col ${visible ? "flex" : "hidden"} ${filter === "all" ? g.span : "md:col-span-6"}`}
              >
                <div
                  data-panel="up"
                  className={`relative mb-4 overflow-hidden bg-surface ${filter === "all" ? g.aspect : "aspect-[16/11]"}`}
                >
                  <Img src={g.image} alt={g.alt} className="transition-transform duration-700 ease-out group-hover:scale-105" />
                </div>
                <figcaption className="flex items-baseline justify-between gap-4 pt-2">
                  <h3 className="font-serif text-headline-sm text-primary">{g.title}</h3>
                  <span className="shrink-0 text-label-sm tracking-widest text-outline uppercase">{g.tag}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div data-reveal className="mt-12 border-t border-outline-variant/30 pt-8 text-center md:mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 text-label-lg tracking-widest text-primary uppercase transition-colors hover:text-secondary"
          >
            <span>Request Complete Monograph Archive (PDF Catalogue, 140 Pages)</span>
            <Icon name="download" className="text-sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
