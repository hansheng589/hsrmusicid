"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/hsr-data";
import { SectionHeading } from "./section-heading";

export function Testimonials() {
  const row = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Kata Mereka"
          title="Cerita dari"
          accent="pendengar setia"
          align="center"
        />
      </div>

      <div className="marquee-paused relative flex overflow-hidden">
        <div
          className="animate-marquee flex shrink-0 gap-5 pr-5"
          style={{ "--marquee-duration": "48s" } as React.CSSProperties}
        >
          {row.map((t, i) => (
            <motion.figure
              key={`${t.id}-${i}`}
              className="relative w-[320px] shrink-0 rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-sm transition-colors hover:border-gold/35 sm:w-[380px]"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-gold/15" aria-hidden />
              <div className="mb-4 flex gap-1" aria-label={`Rating ${t.rating} dari 5`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-gold text-gold" aria-hidden />
                ))}
              </div>
              <blockquote className="text-sm leading-relaxed text-foreground/85">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-gold/70 to-ember font-display text-sm font-extrabold text-primary-foreground">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </span>
                <span>
                  <span className="block text-sm font-bold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
