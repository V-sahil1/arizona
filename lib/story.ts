"use client";

import { gsap, ScrollTrigger, SplitText } from "./gsap";

const pad = (n: number) => String(n).padStart(2, "0");
const all = <T extends Element = HTMLElement>(scope: ParentNode, sel: string) => Array.from(scope.querySelectorAll<T>(sel));

/**
 * Scroll-driven storytelling chapters. Pinned scenes are created first (in page order) so every
 * trigger further down the page measures its position with the pin spacing already in place.
 */
export function initStory(root: HTMLElement, desktop: boolean) {
  all(root, "[data-story-blueprint]").forEach((el) => blueprintStory(el, desktop));
  all(root, "[data-story-manifesto]").forEach((el) => manifesto(el, desktop));
  all(root, "[data-story-day]").forEach((el) => dayOfLight(el));
  storyRail(root);
}

/* ------------------------------------------------------------------ */
/* Chapter: From Line to Living                                         */
/* ------------------------------------------------------------------ */
function blueprintStory(el: HTMLElement, desktop: boolean) {
  const steps = all(el, "[data-bs-step]");
  const bars = all(el, "[data-bs-bar]");
  const photo = el.querySelector("[data-bs-photo]");
  const img = el.querySelector("[data-bs-img]");
  const counter = el.querySelector("[data-bs-count]");
  const n = steps.length;

  gsap.set(steps.slice(1), { autoAlpha: 0, y: 40 });
  gsap.set(bars, { scaleX: 0 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: desktop ? "+=320%" : "+=240%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        if (counter) counter.textContent = pad(Math.min(n, Math.floor(self.progress * n * 0.999) + 1));
      },
    },
  });

  // 1 · The Plan — every wall, door swing and dimension is drafted
  tl.to(all(el, "[data-plan]"), { strokeDashoffset: 0, duration: 0.9, stagger: 0.04 }, 0)
    .to(all(el, "[data-plan-label]"), { autoAlpha: 1, duration: 0.25, stagger: 0.05 }, 0.6);

  // 2 · The Material — the drawing becomes stone (photo wipes in, still colourless)
  tl.fromTo(
    photo,
    { clipPath: "inset(0% 100% 0% 0%)", filter: "grayscale(1) contrast(0.85) brightness(1.1)" },
    { clipPath: "inset(0% 0% 0% 0%)", duration: 1 },
    1,
  ).to(el.querySelector("[data-bs-plan]"), { opacity: 0.35, duration: 1 }, 1);

  // 3 · The Light — colour and warmth arrive, the drawing dissolves
  tl.to(photo, { filter: "grayscale(0) contrast(1) brightness(1)", duration: 1 }, 2)
    .to(el.querySelector("[data-bs-warm]"), { opacity: 1, duration: 1 }, 2)
    .to(el.querySelector("[data-bs-plan]"), { opacity: 0, duration: 0.7 }, 2.2);

  // 4 · The Life — a slow step into the room, and a moment is captioned
  tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.2 }, 2.6).to(
    el.querySelector("[data-bs-tag]"),
    { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
    3.3,
  );

  // narrative captions hand over from one chapter to the next
  steps.forEach((s, i) => {
    if (!i) return;
    tl.to(steps[i - 1], { autoAlpha: 0, y: -40, duration: 0.2 }, i - 0.12).to(s, { autoAlpha: 1, y: 0, duration: 0.2 }, i + 0.02);
  });
  bars.forEach((b, i) => tl.to(b, { scaleX: 1, duration: 1 }, i));
  tl.to({}, { duration: 0.35 }); // a short hold on the finished home
}

/* ------------------------------------------------------------------ */
/* Chapter: Manifesto                                                   */
/* ------------------------------------------------------------------ */
function manifesto(el: HTMLElement, desktop: boolean) {
  const text = el.querySelector<HTMLElement>("[data-fill]");
  if (text) {
    const split = SplitText.create(text, { type: "words" });
    gsap.fromTo(
      split.words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: desktop
          ? { trigger: el, start: "top top", end: "+=140%", pin: true, scrub: true, anticipatePin: 1 }
          : { trigger: text, start: "top 80%", end: "bottom 45%", scrub: true },
      },
    );
  }

  all(el, "[data-count]").forEach((c) => {
    const target = Number(c.dataset.count);
    const counter = { v: 0 };
    c.textContent = "0";
    gsap.to(counter, {
      v: target,
      duration: 2.2,
      ease: "power2.out",
      onUpdate: () => (c.textContent = String(Math.round(counter.v))),
      scrollTrigger: { trigger: c, start: "top 92%", once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Chapter: A Day of Light                                              */
/* ------------------------------------------------------------------ */
function dayOfLight(el: HTMLElement) {
  const track = el.querySelector<HTMLElement>("[data-day-track]");
  const panels = all(el, "[data-day-panel]");
  const canvas = el.querySelector<HTMLElement>("[data-day-canvas]");
  if (!track || !canvas || !panels.length) return;
  gsap.set(canvas, { "--day-bg": panels[0].dataset.bg, "--day-fg": panels[0].dataset.fg });

  // same pinned sideways journey on every screen size
  // layout width, not scrollWidth: captions waiting offscreen to slide in would otherwise overshoot the last hour
  const distance = () => track.offsetWidth - window.innerWidth;
  const trigger = {
    trigger: el,
    start: "top top",
    end: () => "+=" + distance(),
    scrub: 1,
    invalidateOnRefresh: true,
  };

  // the day scrolls sideways while the section is pinned
  const scrollTween = gsap.to(track, {
    x: () => -distance(),
    ease: "none",
    scrollTrigger: { ...trigger, pin: true, anticipatePin: 1 },
  });

  // light: palette shifts through the hours; the sun follows its path, then becomes the moon
  const light = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: trigger });
  panels.slice(1).forEach((p, i) => {
    const prev = panels[i].dataset;
    light.fromTo(
      canvas,
      { "--day-bg": prev.bg, "--day-fg": prev.fg },
      { "--day-bg": p.dataset.bg, "--day-fg": p.dataset.fg, duration: 1, immediateRender: false },
      i,
    );
  });
  const arc = el.querySelector("[data-sun-arc]");
  const bodies = all(el, "[data-sun], [data-sun-halo]");
  if (arc && bodies.length) {
    const path = arc as SVGPathElement;
    const motion = { path, align: path, alignOrigin: [0.5, 0.5] as [number, number] };
    gsap.set(bodies, { motionPath: { ...motion, end: 0 } }); // sunrise, before any scrolling
    light.to(bodies, { motionPath: motion, duration: panels.length - 1 }, 0);
    light.fromTo(bodies, { attr: { fill: "#fddfa9" } }, { attr: { fill: "#f3f0ea" }, duration: 1, immediateRender: false }, panels.length - 2);
  }

  // each hour's story slides in as its panel arrives
  panels.forEach((p, i) => {
    const img = p.querySelector("[data-day-img]");
    if (img) {
      gsap.fromTo(
        img,
        { xPercent: -6 },
        {
          xPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: p, containerAnimation: scrollTween, start: "left right", end: "right left", scrub: true },
        },
      );
    }
    if (i) {
      gsap.from(p.querySelector("[data-day-text]"), {
        autoAlpha: 0,
        x: 90,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: p, containerAnimation: scrollTween, start: "left 60%", toggleActions: "play none none reverse" },
      });
    }
  });
}

/* ------------------------------------------------------------------ */
/* Reading progress + chapter index                                     */
/* ------------------------------------------------------------------ */
function storyRail(root: HTMLElement) {
  const progress = root.querySelector("[data-progress]");
  const pageTrigger = { trigger: document.documentElement, start: "top top", end: "bottom bottom", scrub: 0.3 };
  if (progress) gsap.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: pageTrigger });

  const rail = root.querySelector("[data-rail]");
  const chapters = all(root, "[data-chapter]");
  if (!rail || !chapters.length) return;

  const num = rail.querySelector("[data-rail-num]");
  const label = rail.querySelector("[data-rail-label]");
  const total = rail.querySelector("[data-rail-total]");
  if (total) total.textContent = "/ " + pad(chapters.length);
  gsap.to(rail, { autoAlpha: 1, duration: 0.8, delay: 1.2 });
  gsap.fromTo(rail.querySelector("[data-rail-fill]"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: pageTrigger });

  let current = -1;
  const setActive = (i: number) => {
    if (i === current || !num || !label) return;
    const dir = i > current ? 1 : -1;
    current = i;
    num.textContent = pad(i + 1);
    label.textContent = chapters[i].dataset.chapter ?? "";
    gsap.fromTo(label, { yPercent: -60 * dir, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" });
  };
  chapters.forEach((c, i) =>
    ScrollTrigger.create({ trigger: c, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setActive(i) }),
  );
  setActive(0);
}
