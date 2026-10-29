"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Mail, Music2, Youtube } from "lucide-react";
import { SectionHeading } from "./section-heading";

const CONTACTS = [
  { t: "Booking & Management", d: "booking@hsrmusicid.id" },
  { t: "Kolaborasi & Label", d: "label@hsrmusicid.id" },
  { t: "Media & Pers", d: "media@hsrmusicid.id" },
];

const LINKS = [
  { icon: Youtube, label: "YouTube", sub: "Official MV & live session", href: "https://www.youtube.com/@HSRmusicID" },
  { icon: Instagram, label: "Instagram", sub: "Kabar terbaru & behind the scenes", href: "https://www.instagram.com/hsrmusicid/" },
  { icon: Music2, label: "Spotify", sub: "Dengarkan semua rilisan", href: "https://open.spotify.com/artist/4YqIicU1fOtoPP67q7KkDA" },
];

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Kontak & Booking"
              title="Mari buat"
              accent="sesuatu bersama"
              description="Untuk booking panggung, kolaborasi musik, lisensi lagu, atau sekadar menyapa — hubungi kami lewat email atau media sosial."
            />
            <div className="space-y-4">
              {CONTACTS.map((c) => (
                <a
                  key={c.t}
                  href={`mailto:${c.d}`}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4 transition-colors hover:border-gold/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{c.t}</p>
                    <p className="text-sm text-muted-foreground">{c.d}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8"
          >
            <p className="mono-label mb-6 text-gold">Temukan kami di</p>
            <div className="space-y-4">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-secondary/40 p-4 transition-all hover:border-gold/50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
                    <l.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="flex-1">
                    <p className="text-base font-bold">{l.label}</p>
                    <p className="text-sm text-muted-foreground">{l.sub}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-gold" aria-hidden />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
