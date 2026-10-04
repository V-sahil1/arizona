import Icon from "../Icon";
import { Img, gutters } from "../ui";
import { vignettes } from "@/lib/data";

export default function Vignettes() {
  return (
    <section className={`w-full bg-background py-8 md:py-space-lg ${gutters}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between gap-4 border-b border-outline-variant/30 pb-4 md:mb-8">
          <div className="flex items-center gap-3">
            <Icon name="photo_camera" className="text-xl text-secondary" />
            <span className="text-label-sm font-semibold tracking-widest text-primary uppercase">
              Studio Vignettes · @arizona.interiors
            </span>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-label-sm tracking-widest text-outline uppercase transition-colors hover:text-primary"
          >
            <span className="hidden sm:inline">Follow Journal on </span>Instagram →
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-4 md:gap-4">
          {vignettes.map((v, i) => (
            <div
              key={v.label}
              data-panel={["up", "left", "right", "center"][i]}
              className={`group relative aspect-square overflow-hidden bg-surface-container ${i === 3 ? "hidden md:block" : ""}`}
            >
              <Img src={v.image} alt={v.label} className="transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-center justify-center bg-primary/30 text-center text-label-sm tracking-widest text-on-primary uppercase opacity-0 transition-opacity group-hover:opacity-100 group-active:opacity-100">
                {v.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
