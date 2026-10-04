import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: {
    default: "Arizona — Interior / Exterior Company",
    template: "%s · Arizona",
  },
  description:
    "Considered interior architecture where geological materiality, silent proportions, deep light, and everyday Indian life converge into enduring calm.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
        <noscript>
          <style>{`[data-anim-hide]{visibility:visible!important}[data-curtain]{display:none}`}</style>
        </noscript>
      </head>
      <body className="bg-background font-sans text-body-md text-on-surface antialiased">
        <Header />
        <main className="min-h-screen w-full bg-background pt-20 lg:pt-24">{children}</main>
        <Footer />
        <MobileCta />
        <SmoothScroll />
      </body>
    </html>
  );
}
