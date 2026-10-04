import { Img, gutters, sectionY } from "../ui";
import { IMAGES } from "@/lib/data";

export default function Studio() {
  return (
    <section className={`w-full bg-primary text-on-primary ${gutters} ${sectionY}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <div data-lights className="relative aspect-[4/3] overflow-hidden bg-primary-container shadow-2xl md:aspect-[4/5]">
              <Img
                data-lights-img
                src={IMAGES.studioEvening}
                alt="Evening studio with walnut walls, a black marble table covered in plans and brass samples, and a glowing brass pendant"
                className="scale-110 object-[50%_20%] opacity-90"
              />
              <div
                data-lights-glow
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_56%_39%,rgba(255,196,120,0.55),transparent_38%)] opacity-0 mix-blend-screen md:bg-[radial-gradient(circle_at_56%_31%,rgba(255,196,120,0.55),transparent_38%)]"
              />
              <div className="absolute right-4 bottom-4 border border-surface-container-highest/20 bg-surface-container-lowest/10 px-5 py-3 text-right backdrop-blur-md md:right-6 md:bottom-6">
                <span className="block text-label-sm tracking-widest text-secondary-fixed uppercase">Kala Ghoda Studio Loft</span>
                <span className="text-body-sm text-surface-container-high">Late Night Material Reviews</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8 lg:col-span-6 lg:pl-10">
            <div>
              <span data-type className="mb-3 block text-label-sm font-semibold tracking-[0.25em] text-secondary-fixed uppercase">
                The Studio · Ahmedabad &amp; Mumbai
              </span>
              <h2 data-split className="font-serif text-headline-lg-mobile leading-[1.1] text-surface-bright md:text-headline-lg lg:text-display">
                “We Design How People Live.”
              </h2>
            </div>
            <p data-lines className="text-body-md leading-relaxed text-surface-container-high md:text-body-lg">
              We believe exceptional interiors are never defined by fleeting trends. They are born of disciplined
              proportions, honest materials that gain character with age, natural ventilation, and deep intimacy with the
              people who inhabit them.
            </p>
            <div className="border-y border-outline-variant/20 py-6">
              <div data-reveal-stagger className="flex flex-wrap items-center justify-between gap-3 text-label-md tracking-[0.3em] text-secondary-fixed uppercase">
                {["Space", "Light", "Material", "Detail", "Life"].map((w, i) => (
                  <span key={w} className="flex items-center gap-3">
                    {i > 0 && <span>·</span>}
                    <span>{w}</span>
                  </span>
                ))}
              </div>
            </div>
            <div data-reveal className="space-y-2">
              <blockquote className="font-serif text-headline-sm text-surface-bright italic">
                “Every detail has a reason. If it does not serve peace of mind, it does not belong in the room.”
              </blockquote>
              <p className="text-label-sm tracking-widest text-surface-variant uppercase">— Arizona Founding Principles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
