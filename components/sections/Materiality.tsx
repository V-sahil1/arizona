import Link from "next/link";
import Icon from "../Icon";
import { Img, Kicker, SectionTitle, gutters, sectionY } from "../ui";
import { materials } from "@/lib/data";
import MaterialBoard from "../three/MaterialBoard";

export default function Materiality() {
  return (
    <section className={`w-full bg-background ${gutters} ${sectionY}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl md:mb-16">
          <Kicker>Tectonic Spec Archive</Kicker>
          <SectionTitle className="mb-4 leading-tight">Materiality &amp; Tectonic Anatomy</SectionTitle>
          <p data-lines className="text-body-md text-on-surface-variant md:text-body-lg">
            Our design philosophy is anchored in regional geologies and honest patinas that age gracefully in the South
            Asian climate. We test, age, and curate every sample in our physical workshop.
          </p>
        </div>

        <MaterialBoard samples={materials.map(({ code, title, right }) => ({ code, title, right }))} />

        <div data-tiles className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m) => (
            <div
              key={m.code}
              className="group flex flex-col justify-between bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div>
                <div className="relative mb-6 aspect-square overflow-hidden bg-surface-container">
                  <Img src={m.image} alt={m.title} className="transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-surface-bright/90 px-2.5 py-1 text-label-sm tracking-wider text-primary uppercase">
                    {m.code}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-headline-sm text-primary">{m.title}</h3>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">{m.body}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-outline-variant/30 pt-6 text-label-sm tracking-wider text-outline uppercase">
                <span>{m.left}</span>
                <span className="font-semibold text-secondary">{m.right}</span>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-12 flex flex-col items-start justify-between gap-6 bg-surface-container-high p-6 shadow-sm md:p-8 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-primary text-on-primary">
              <Icon name="architecture" />
            </div>
            <div>
              <h4 className="font-serif text-headline-sm text-primary">Comprehensive Material Spec Drawer</h4>
              <p className="text-body-sm text-on-surface-variant">
                Access our complete CAD details, 2700K cove lighting junction specs, and stone dry-lay guidelines.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="bg-primary px-6 py-3 text-label-sm tracking-wider whitespace-nowrap text-on-primary uppercase transition-colors hover:bg-secondary"
          >
            Request Specification Folder
          </Link>
        </div>
      </div>
    </section>
  );
}
