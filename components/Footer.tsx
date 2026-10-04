"use client";

import Link from "next/link";
import { useState } from "react";

const index = [
  { href: "/works", label: "Selected Works" },
  { href: "/studio", label: "The Studio" },
  { href: "/services", label: "Practice & Disciplines" },
  { href: "/process", label: "Artisanal Methodology" },
  { href: "/materiality", label: "Material Spec Archive" },
  { href: "/journal", label: "Monograph Journal" },
  { href: "/contact", label: "Consultation Appointments" },
];

export default function Footer() {
  const [joined, setJoined] = useState(false);

  return (
    <footer className="w-full bg-surface-container-low pt-space-xl pb-28 md:pb-space-lg">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-margin">
        <div className="grid grid-cols-1 gap-gutter pb-space-lg md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col justify-between lg:col-span-4">
            <div className="space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-full.png" alt="Arizona Interior/Exterior Company" className="h-40 w-auto" />
              <p className="max-w-sm text-body-sm leading-relaxed text-on-surface-variant">
                An architectural interior monograph practice engaging spatial rhythm, unpolished natural limestone,
                hand-troweled slaked lime, and patinated brass elements.
              </p>
            </div>
            <div className="mt-8">
              <span className="mb-1 block text-label-sm tracking-widest text-secondary uppercase">Press Distinction</span>
              <p className="text-body-sm text-on-surface">Featured in Architectural Digest AD100 &amp; Elle Décor</p>
            </div>
          </div>

          <div className="flex flex-col space-y-3 lg:col-span-2">
            <span className="mb-2 text-label-sm tracking-widest text-on-surface-variant uppercase">Locations</span>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-label-md text-primary uppercase">Ahmedabad Flagship</p>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">
                  42 Bodakdev Sanctuary Road
                  <br />
                  Ahmedabad, Gujarat 380054
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-label-md text-primary uppercase">Mumbai Studio</p>
                <p className="text-body-sm leading-relaxed text-on-surface-variant">
                  Kala Ghoda Heritage Loft 4B
                  <br />
                  Fort, Mumbai 400001
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 lg:col-span-2">
            <span className="mb-2 text-label-sm tracking-widest text-on-surface-variant uppercase">Index</span>
            {index.map((l) => (
              <Link key={l.href} href={l.href} className="text-body-sm text-on-surface-variant transition-colors hover:text-primary">
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col justify-between lg:col-span-4">
            <div className="space-y-3">
              <span className="block text-label-sm tracking-widest text-on-surface-variant uppercase">Monograph Gazette</span>
              <p className="text-body-sm text-on-surface-variant">
                Receive biannual printed folios, architectural dissertations, and private vernissage invitations.
              </p>
              {joined ? (
                <p className="mt-4 bg-secondary-fixed px-4 py-3 text-label-md tracking-wider text-on-secondary-fixed uppercase">
                  Thank you — you are on the list.
                </p>
              ) : (
                <form
                  className="mt-4 flex items-stretch"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setJoined(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your correspondence email"
                    aria-label="Email address"
                    className="w-full bg-surface-container-lowest px-4 py-3 text-body-sm text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:ring-1 focus:ring-secondary"
                  />
                  <button
                    type="submit"
                    className="bg-primary px-6 text-label-sm tracking-wider text-on-primary uppercase transition-colors hover:bg-primary-container"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {["Instagram", "Pinterest", "ArchDaily", "AD Pro"].map((s) => (
                <a key={s} href="#" className="text-label-sm tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/30 pt-space-md text-on-surface-variant/80 md:flex-row">
          <p className="text-center text-body-sm md:text-left">
            © 2026 Arizona Interior / Exterior Company. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["Legal & Provenance", "Client Portal", "Privacy Statement"].map((s) => (
              <a key={s} href="#" className="text-label-sm tracking-wider uppercase transition-colors hover:text-on-surface">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
