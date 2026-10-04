"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Icon from "./Icon";
import { getLenis } from "./SmoothScroll";
import { IMAGES, navItems } from "@/lib/data";

const LOGO_MARK = "/images/logo-mark.png";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(headerRef.current, { yPercent: -100, duration: 1.1, ease: "power3.out", delay: 0.1 });
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const drawerLink = (active: boolean) =>
    `font-serif transition-colors ${
      active ? "text-headline-md text-secondary" : "text-headline-md-mobile text-on-surface-variant hover:text-primary"
    }`;

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 bg-background/90 shadow-[0_1px_8px_rgba(0,0,0,0.03)] backdrop-blur-md">
        <div className="flex h-20 w-full items-center justify-between px-5 md:px-8 lg:h-24 lg:px-margin">
          <Link href="/" aria-label="Arizona Interior/Exterior Company — Home" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_MARK} alt="" className="h-11 w-auto lg:h-14" />
            <span className="flex flex-col">
              <span className="font-serif text-[19px] leading-7 whitespace-nowrap tracking-[0.12em] text-primary sm:text-headline-sm">
                ARIZONA
              </span>
              <span className="text-label-sm tracking-widest text-on-surface-variant uppercase">
                <span className="md:hidden">Interior / Exterior</span>
                <span className="hidden md:inline">Interior / Exterior Company</span>
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 xl:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-label-lg tracking-wider uppercase transition-colors ${
                  isActive(item.href)
                    ? "text-primary underline decoration-secondary underline-offset-8"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden flex-col text-right lg:flex">
              <span className="text-label-sm tracking-widest text-on-surface-variant uppercase">Private Inquiries</span>
              <a href="tel:+917926850123" className="text-body-sm text-primary transition-colors hover:text-secondary">
                +91 79 2685 0123
              </a>
            </div>
            <Link
              href="/contact"
              className="hidden items-center gap-2 bg-primary-container px-6 py-3 text-label-lg tracking-wider text-on-primary uppercase transition-colors hover:bg-primary md:flex"
            >
              <span>Start a Project</span>
              <span className="text-secondary-fixed-dim">→</span>
            </Link>
            <Link
              href="/contact"
              className="flex min-h-[44px] items-center justify-center rounded-full bg-primary-container px-4 text-label-md tracking-wider text-surface uppercase transition-opacity hover:opacity-90 md:hidden"
            >
              Consult
            </Link>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMAGES.avatar} alt="Profile" className="hidden h-8 w-8 rounded-full object-cover md:block" />
            <span className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary min-[380px]:flex md:hidden">
              <Icon name="person" className="text-[18px] text-on-primary" />
            </span>
            <button
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center text-primary xl:hidden"
            >
              <Icon name="menu" className="text-[24px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen editorial drawer (mobile & tablet) */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-surface transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] xl:hidden ${
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="flex h-20 items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={LOGO_MARK} alt="" className="h-11 w-auto" />
            <div className="flex flex-col">
              <span className="font-serif text-headline-sm tracking-wider text-primary uppercase">Arizona</span>
              <span className="text-label-sm tracking-[0.16em] text-secondary uppercase">Interior / Exterior Company</span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="flex h-11 w-11 items-center justify-center text-primary"
          >
            <Icon name="close" className="text-[24px]" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-between overflow-y-auto px-8 py-6">
          <div className="flex flex-col space-y-4">
            <Link href="/" onClick={() => setOpen(false)} className={drawerLink(pathname === "/")}>
              Home
            </Link>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={drawerLink(isActive(item.href))}>
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 pt-8">
            <span className="text-label-sm tracking-widest text-on-surface-variant uppercase">Ahmedabad • Mumbai</span>
            <span className="text-body-sm text-on-surface-variant">Spatial Artistry &amp; Monograph Folios</span>
          </div>
        </nav>
      </div>
    </>
  );
}
