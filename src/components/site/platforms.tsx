"use client";

import { motion } from "framer-motion";
import {
  Apple,
  ArrowUpRight,
  Facebook,
  Instagram,
  Music2,
  Play,
  Youtube,
} from "lucide-react";
import { platforms } from "@/lib/hsr-data";
import { SectionHeading } from "./section-heading";

function PlatformGlyph({ icon }: { icon: string }) {
  switch (icon) {
    case "spotify":
      return <Music2 className="h-6 w-6" aria-hidden />;
    case "apple":
      return <Apple className="h-6 w-6" aria-hidden />;
    case "youtube-music":
      return <Play className="h-6 w-6" aria-hidden />;
    case "soundcloud":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M1.5 13.5v4h1v-4h-1Zm2-1.5v5.5h1V12h-1Zm2-1v6.5h1V11h-1Zm2-.5v7h1v-7h-1Zm2-1.5v8.5h1V9h-1Zm2-.75v9.25h1V8.25h-1Zm2-.75v10h1V7.5h-1Zm2 .5v9.5h3.5a4.5 4.5 0 0 0 .5-8.97c-.86-.04-1.73.14-2.5.52-.6-1.63-2.1-2.8-4-2.8v.75Z"/></svg>;
    case "tiktok":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden><path d="M16.6 3c.36 1.98 1.73 3.55 3.9 3.74v3.03c-1.5.05-2.86-.4-3.9-1.16v6.64A6.25 6.25 0 1 1 9.6 9v3.2a3.06 3.06 0 1 0 3.06 3.06V3h3.94Z"/></svg>;
    case "instagram":
      return <Instagram className="h-6 w-6" aria-hidden />;
    case "facebook":
      return <Facebook className="h-6 w-6" aria-hidden />;
    case "audiomack":
      return <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M2 13.2h3.1l2.2-6.4 3.3 11.4 3.1-14.4 2.5 9.4h5.8" /></svg>;
    case "tidal":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M12 3.6 9.3 6.3 12 9l2.7-2.7L12 3.6Z" />
          <path d="M6.6 9 3.9 11.7 6.6 14.4 9.3 11.7 6.6 9Z" />
          <path d="M17.4 9l-2.7 2.7 2.7 2.7 2.7-2.7L17.4 9Z" />
          <path d="M12 14.4 9.3 17.1 12 19.8l2.7-2.7-2.7-2.7Z" />
        </svg>
      );
    case "amazon-music":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 15.5v-8l9-2v8" fill="none" />
          <circle cx="6.8" cy="15.6" r="2.3" fill="currentColor" stroke="none" />
          <circle cx="15.8" cy="13.6" r="2.3" fill="currentColor" stroke="none" />
          <path d="M4.5 19.2c2.2 1.5 4.8 2.3 7.5 2.3s5.3-.8 7.5-2.3" />
          <path d="m17.6 20.6 1.9-.9-.4 2.1" />
        </svg>
      );
    case "deezer":
      return (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <rect x="3" y="13.2" width="3.6" height="2.6" rx="0.6" />
          <rect x="8.1" y="10.4" width="3.6" height="5.4" rx="0.6" />
          <rect x="13.2" y="7.4" width="3.6" height="8.4" rx="0.6" />
          <rect x="18.3" y="4.6" width="3.6" height="11.2" rx="0.6" />
          <rect x="3" y="17.4" width="3.6" height="2" rx="0.6" opacity="0.55" />
          <rect x="8.1" y="17.4" width="3.6" height="2" rx="0.6" opacity="0.55" />
          <rect x="13.2" y="17.4" width="3.6" height="2" rx="0.6" opacity="0.55" />
          <rect x="18.3" y="17.4" width="3.6" height="2" rx="0.6" opacity="0.55" />
        </svg>
      );
    default:
      return <Youtube className="h-6 w-6" aria-hidden />;
  }
}

export function Platforms() {
  return (
    <section id="platform" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-gold/8 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Streaming"
          title="Dengarkan di"
          accent="platform favoritmu"
          description="Katalog lengkap HSRmusicID tersedia di semua platform streaming utama — pilih tempat berkumpulmu."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {platforms.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/45 hover:shadow-xl hover:shadow-gold/10"
            >
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                style={{ backgroundColor: p.accent }}
                aria-hidden
              />
              <div className="mb-4 flex items-start justify-between">
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${p.accent}1f`, color: p.accent }}
                >
                  <PlatformGlyph icon={p.icon} />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold" aria-hidden />
              </div>
              <p className="font-display text-base font-bold">{p.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{p.handle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
