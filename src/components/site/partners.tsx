"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Building2, Handshake, Megaphone, PenTool } from "lucide-react";
import { partners } from "@/lib/hsr-data";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const ROLE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Label & Distribusi": BadgeCheck,
  "Label Kemitraan": Handshake,
  "Media Partner": Megaphone,
  "Creative Partner": PenTool,
  "Publishing Partner": Building2,
};

const LABEL_PARTNERS = partners.filter((p) => p.id === "sony" || p.id === "wami");
const OTHER_PARTNERS = partners.filter((p) => p.id !== "sony" && p.id !== "wami");

export function PartnerLogo({
  logo,
  name,
  bitmap,
  className,
  imgClassName,
}: {
  logo: string;
  name: string;
  bitmap: boolean;
  className?: string;
  imgClassName?: string;
}) {
  if (bitmap) {
    return (
      <img
        src={logo}
        alt={`Logo ${name}`}
        loading="lazy"
        className={cn("h-full w-auto object-contain", imgClassName)}
      />
    );
  }
  return (
    <img src={logo} alt={`Logo ${name}`} loading="lazy" className={cn("h-full w-auto object-contain", imgClassName)} />
  );
}

export function Partners() {
  return (
    <section id="partner" className="relative overflow-hidden py-24 md:py-32">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gold/8 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Label & Mitra Industri"
          title="Berkolaborasi dengan"
          accent="nama-nama besar"
          description="Musik HSRmusicID didukung dan didistribusikan bersama label, media, serta kreator terpercaya di industri musik dan media Indonesia."
          align="center"
        />

        {/* Featured label cards */}
        <div className="mb-10 grid gap-5 md:grid-cols-2">
          {LABEL_PARTNERS.map((p, i) => {
            const Icon = ROLE_ICONS[p.role] ?? Handshake;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="sheen group relative flex min-h-[180px] items-center gap-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/40 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_60px_-15px_rgba(201,143,90,0.35)] md:p-9"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />
                <div className="grid h-24 w-32 shrink-0 place-items-center rounded-2xl bg-white/6 p-3 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-[1.04] sm:h-28 sm:w-40">
                  <PartnerLogo
                    logo={p.logo}
                    name={p.name}
                    bitmap={p.bitmap}
                    className="h-full w-full"
                    imgClassName="[filter:brightness(0)_invert(1)] max-h-full"
                  />
                </div>
                <div className="min-w-0">
                  <p className="mono-label mb-2 flex items-center gap-2 text-gold">
                    <Icon className="h-3.5 w-3.5" />
                    {p.role}
                  </p>
                  <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">{p.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {p.id === "sony"
                      ? "Distribusi digital & promosi katalog ke jaringan streaming global Sony Music Entertainment."
                      : "Kemitraan label legendaris musik Indonesia untuk pengembangan katalog dan royalti."}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Marquee partner wall */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="marquee-paused relative overflow-hidden rounded-3xl border border-border bg-card/60 py-8 backdrop-blur-sm"
        >
          <p className="mono-label mb-6 text-center text-muted-foreground">
            Trans Media Group · Creative & Publishing Partners
          </p>
          <div className="relative flex overflow-hidden">
            <div
              className="animate-marquee flex shrink-0 items-center gap-14 pr-14"
              style={{ "--marquee-duration": "42s" } as React.CSSProperties}
            >
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  title={p.name}
                  className="group flex h-11 shrink-0 items-center opacity-45 transition-all duration-300 hover:scale-105 hover:opacity-100 sm:h-14"
                >
                  <PartnerLogo
                    logo={p.logo}
                    name={p.name}
                    bitmap={p.bitmap}
                    imgClassName={cn(
                      "[filter:brightness(0)_invert(1)] group-hover:[filter:none]",
                      p.id === "sony" && "max-h-[64px]"
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-center text-xs text-muted-foreground"
        >
          Logo merek pihak ketiga adalah milik pemegang hak masing-masing —
          ditampilkan untuk keperluan informasi kemitraan.
        </motion.p>
      </div>
    </section>
  );
}
