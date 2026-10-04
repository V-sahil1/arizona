import Link from "next/link";
import Icon from "../Icon";
import { gutters } from "../ui";
import { Curtains, Sunbeam } from "../HeroDecor";
import { IMAGES } from "@/lib/data";

export default function Hero() {
  return (
    <section
      data-hero
      className={`relative -mt-20 flex min-h-[660px] w-full flex-col justify-end overflow-hidden bg-primary pt-28 pb-12 text-on-primary md:justify-between md:pb-10 lg:-mt-24 lg:min-h-[942px] lg:pt-32 ${gutters}`}
    >
      <div className="absolute inset-0 z-0">
        {/* Silent background film; the living-salon still shows while it loads.
            Anchored top-left and slightly enlarged so the generator's watermark in the bottom-right corner is cropped off. */}
        <video
          data-hero-img
          className="h-full w-full origin-top-left scale-110 object-cover object-left-top"
          src="/images/bg.mp4"
          poster={IMAGES.livingSalon}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Light scrims: just enough behind the type (left and bottom) to keep it legible, the film stays clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
        <Sunbeam />
        <Curtains />
      </div>

      {/* Top kicker bar */}
      <div data-hero-item data-anim-hide className="relative z-10 hidden w-full items-center justify-between pb-6 md:flex">
        <span data-hero-line className="absolute inset-x-0 bottom-0 h-px bg-outline-variant/20" />
        <div className="flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-secondary" />
          <span className="text-label-sm tracking-[0.2em] text-surface-variant uppercase">
            Interior Architecture &amp; Bespoke Spatial Practice · Est. 2018
          </span>
        </div>
        <div className="hidden items-center gap-6 text-label-sm tracking-widest text-surface-variant uppercase lg:flex">
          <span>
            Folio Vol. <span data-scramble>VIII</span>
          </span>
          <span>·</span>
          <span>Private Residential &amp; Monograph Editions</span>
        </div>
      </div>

      <div data-hero-content className="relative z-10 max-w-5xl md:py-12 lg:py-20">
        <div data-hero-item data-anim-hide className="mb-3 inline-flex items-center gap-2 md:hidden">
          <span className="h-2 w-2 rounded-full bg-secondary-fixed" />
          <span className="text-label-sm tracking-[0.2em] text-secondary-fixed uppercase">
            Interior Architecture &amp; Design Studio
          </span>
        </div>
        <h1 data-hero-split data-anim-hide className="mb-4 font-serif text-display-mobile tracking-tight text-surface-bright md:mb-8 md:text-headline-lg lg:text-display lg:leading-[1.08]">
          <span data-split-part>Spaces That</span>{" "}
          <span
            data-rotator
            data-rotator-words="Tell Stories.|Hold Light.|Age Gracefully.|Feel Like Home."
            className="inline-block text-secondary-fixed italic [perspective:600px]"
          >
            <span data-split-accent className="brass-shimmer pr-[0.12em]">
              Tell Stories.
            </span>
          </span>
        </h1>
        <p data-hero-lines data-anim-hide className="mb-8 max-w-2xl text-body-md leading-relaxed text-surface-container-high md:mb-12 md:text-body-lg">
          We orchestrate considered interior architecture where geological materiality, silent proportions, deep light,
          and everyday Indian life converge into enduring calm.
        </p>
        <div data-hero-item data-anim-hide className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:gap-6">
          <Link
            href="/works"
            className="flex items-center justify-center gap-3 bg-surface-bright px-8 py-4 text-label-lg tracking-widest text-primary uppercase shadow-md transition-all duration-300 hover:bg-secondary-fixed hover:text-on-secondary-fixed"
          >
            <span>Explore Works (18 Projects)</span>
            <Icon name="south" className="text-[18px]" />
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-3 border border-surface-container-high/40 bg-transparent px-8 py-4 text-label-lg tracking-widest text-surface-bright uppercase transition-all duration-300 hover:bg-surface-container-high/10"
          >
            <span>Request Consultation</span>
            <Icon name="arrow_forward" className="text-[18px]" />
          </Link>
        </div>
        <a data-hero-item data-anim-hide href="#featured" className="mt-10 flex items-center gap-3 text-surface-container-highest/70 md:hidden">
          <span className="text-label-sm tracking-widest uppercase">Scroll To Explore</span>
          <Icon name="arrow_downward" className="animate-bounce text-[14px]" />
        </a>
      </div>

      {/* Bottom coordinates bar */}
      <div data-hero-item data-anim-hide className="relative z-10 hidden w-full items-center justify-between gap-4 pt-6 text-label-sm tracking-widest text-surface-variant uppercase md:flex">
        <span data-hero-line className="absolute inset-x-0 top-0 h-px bg-outline-variant/20" />
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-secondary-fixed">LOC.01</span>
            <span>
              Ahmedabad Studio: <span data-scramble>23.0225° N, 72.5714° E</span>
            </span>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="text-secondary-fixed">LOC.02</span>
            <span>
              Mumbai Practice: <span data-scramble>19.0760° N, 72.8777° E</span>
            </span>
          </div>
        </div>
        <a href="#featured" className="flex items-center gap-3 hover:text-secondary-fixed">
          <span>Scroll to Explore</span>
          <Icon name="expand_more" className="animate-bounce text-sm" />
        </a>
      </div>
    </section>
  );
}
