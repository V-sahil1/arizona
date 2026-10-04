import { Img } from "../ui";
import { dayMoments } from "@/lib/data";

/**
 * "A Day in The Earth House": pinned horizontal journey from dawn to night on every screen size.
 * The sun travels a sun-path arc and the room's palette shifts with the hour.
 * Driven by `dayOfLight()` in lib/story.ts.
 */
export default function DayOfLight() {
  return (
    <section data-story-day className="relative w-full overflow-hidden">
      {/* colours live on this inner canvas: the pinned section itself has its inline styles managed by ScrollTrigger */}
      <div
        data-day-canvas
        className="relative bg-(--day-bg) text-(--day-fg) [--day-bg:#efe7da] [--day-fg:#241b14]"
      >
      {/* Heading + sun path (fixed while the day scrolls by); top padding clears the fixed site header */}
      <div className="absolute inset-x-0 top-0 z-10 px-5 pt-24 md:px-8 md:pt-28 lg:px-margin">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div>
            <span className="mb-2 block text-label-sm font-semibold tracking-[0.2em] uppercase opacity-70">
              A Day of Light
            </span>
            <h2 className="font-serif text-headline-md-mobile md:text-headline-lg">A Day in The Earth House</h2>
          </div>
          <span className="hidden text-label-sm tracking-widest uppercase opacity-60 md:block">Scroll to move the sun →</span>
        </div>
        <div className="relative mx-auto mt-3 max-w-7xl md:mt-6">
          {/* a low, wide arc: its height grows with screen width, so it stays shallow to leave room for the panels */}
          <svg viewBox="0 0 1000 60" className="h-auto w-full overflow-visible" aria-hidden="true">
            <line x1="0" y1="55" x2="1000" y2="55" stroke="currentColor" strokeOpacity="0.25" />
            <path data-sun-arc d="M20 55 Q500 -35 980 55" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="4 6" />
            <circle data-sun r="11" cx="0" cy="0" fill="#fddfa9" />
            <circle data-sun-halo r="26" cx="0" cy="0" fill="#fddfa9" opacity="0.18" />
          </svg>
          <div className="mt-1 flex justify-between text-label-sm tracking-widest uppercase opacity-60 md:mt-2">
            {dayMoments.map((m) => (
              <span key={m.time}>{m.time}</span>
            ))}
          </div>
        </div>
      </div>

      <div data-day-track className="flex h-[100svh] w-max flex-row">
        {dayMoments.map((m, i) => (
          <article
            key={m.time}
            data-day-panel
            data-bg={m.bg}
            data-fg={m.fg}
            className="flex h-full w-screen items-center px-5 pt-[236px] pb-[88px] md:px-8 md:pt-80 md:pb-12 lg:px-margin"
          >
            <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 md:grid-cols-12 md:gap-gutter">
              <div className="relative overflow-hidden md:col-span-7">
                <div className="h-[clamp(120px,24svh,280px)] md:h-[min(52vh,560px)]">
                  <Img data-day-img src={m.image} alt={`${m.phase} — ${m.title}`} className="scale-110" />
                </div>
                <span className="absolute top-3 left-3 bg-black/30 px-3 py-1 text-label-sm tracking-widest text-white uppercase backdrop-blur-sm md:top-4 md:left-4">
                  {String(i + 1).padStart(2, "0")} / {String(dayMoments.length).padStart(2, "0")}
                </span>
              </div>
              <div data-day-text className="md:col-span-5 md:pl-6">
                <div className="flex items-baseline gap-3 md:block">
                  <span className="block font-serif text-[40px] leading-none md:text-[88px]">{m.time}</span>
                  <span className="block text-label-md tracking-[0.3em] uppercase opacity-70 md:mt-3 md:mb-4">{m.phase}</span>
                </div>
                <h3 className="mt-2 mb-1 font-serif text-headline-sm md:mt-0 md:mb-3 md:text-headline-md">{m.title}</h3>
                <p className="line-clamp-3 max-w-md text-body-sm leading-relaxed opacity-80 md:line-clamp-none md:text-body-md">{m.body}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
