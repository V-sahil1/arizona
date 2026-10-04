import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Inquiry from "@/components/sections/Inquiry";
import Vignettes from "@/components/sections/Vignettes";
import { Kicker, gutters, sectionY } from "@/components/ui";
import { IMAGES } from "@/lib/data";

export const metadata: Metadata = { title: "Contact" };

const studios = [
  {
    name: "Ahmedabad Flagship",
    coords: "23.0225° N, 72.5714° E",
    lines: ["42 Bodakdev Sanctuary Road", "Ahmedabad, Gujarat 380054"],
    email: "ahmedabad@arizonainteriors.com",
  },
  {
    name: "Mumbai Studio",
    coords: "19.0760° N, 72.8777° E",
    lines: ["Kala Ghoda Heritage Loft 4B", "Fort, Mumbai 400001"],
    email: "mumbai@arizonainteriors.com",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Private Commission Intake"
        title="Let’s Create"
        accent="Your Space."
        description="We welcome a limited number of select commissions each season. Share your brief and our studio principal will respond within 24 hours."
        image={IMAGES.livingSalon}
        crumb={[{ href: "/contact", label: "Contact" }]}
      />
      <Inquiry />
      <section className={`w-full bg-background ${gutters} ${sectionY}`}>
        <div data-reveal-stagger className="mx-auto grid max-w-7xl grid-cols-1 gap-gutter md:grid-cols-3">
          {studios.map((s) => (
            <div key={s.name} className="border-t-2 border-primary bg-surface-container-low p-6 md:p-8">
              <Kicker>{s.coords}</Kicker>
              <h3 className="mb-3 font-serif text-headline-sm text-primary">{s.name}</h3>
              <p className="text-body-sm leading-relaxed text-on-surface-variant">
                {s.lines[0]}
                <br />
                {s.lines[1]}
              </p>
              <a href={`mailto:${s.email}`} className="mt-4 inline-block border-b border-secondary pb-0.5 text-body-sm text-primary hover:text-secondary">
                {s.email}
              </a>
            </div>
          ))}
          <div className="border-t-2 border-secondary bg-surface-container-low p-6 md:p-8">
            <Kicker>Private Inquiries</Kicker>
            <h3 className="mb-3 font-serif text-headline-sm text-primary">Direct Line</h3>
            <p className="text-body-sm leading-relaxed text-on-surface-variant">Monday – Saturday, 10:00 – 19:00 IST</p>
            <a href="tel:+917926850123" className="mt-4 block text-body-md font-medium text-primary hover:text-secondary">
              +91 79 2685 0123
            </a>
          </div>
        </div>
      </section>
      <Vignettes />
    </>
  );
}
