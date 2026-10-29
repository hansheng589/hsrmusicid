"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Music2, Sparkles } from "lucide-react";
import { genreTags, journey } from "@/lib/hsr-data";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="tentang" className="relative overflow-clip py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md lg:sticky lg:top-28"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-black/60">
              <Image
                src="/artist/about-portrait.png"
                alt="Potret HSRmusicID dengan cahaya amber dramatis"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="mono-label text-gold">Artist</p>
                  <p className="font-display text-2xl font-bold">HSRmusicID</p>
                </div>
                <span className="rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[11px] font-semibold text-gold-soft backdrop-blur">
                  Pop Ballad
                </span>
              </div>
            </div>
            {/* floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute right-2 -top-6 rounded-2xl border border-gold/30 bg-card/90 px-5 py-3 shadow-xl shadow-gold/10 backdrop-blur-md sm:-right-8"
            >
              <p className="font-display text-2xl font-extrabold text-gold">3×</p>
              <p className="text-[11px] font-medium text-muted-foreground">Album Full</p>
            </motion.div>
          </motion.div>

          {/* Copy + timeline */}
          <div>
            <SectionHeading
              kicker="Tentang Artis"
              title="Suara di balik"
              accent="setiap cerita"
              description="HSRmusicID adalah proyek musik pop ballad asal Indonesia yang tumbuh dari panggung-panggung kecil menjadi katalog tiga album penuh. Setiap lagu ditulis dengan pendekatan yang sama: jujur, personal, dan menyentuh sisi manusiawi pendengarnya."
            />

            <div className="mb-10 flex flex-wrap gap-2">
              {genreTags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-gold/25 bg-gold/8 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-soft"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Music2, k: "Fokus", v: "Ballad & Akustik" },
                { icon: MapPin, k: " Basis", v: "Medan, Indonesia" },
                { icon: Sparkles, k: "Bahasa", v: "Indonesia" },
              ].map((f) => (
                <div key={f.k} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm">
                  <f.icon className="mb-2 h-5 w-5 text-gold" aria-hidden />
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.k.trim()}</p>
                  <p className="mt-0.5 text-sm font-semibold">{f.v}</p>
                </div>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="mt-12">
              <p className="mono-label mb-6 text-gold">Perjalanan</p>
              <ol className="relative space-y-8 border-l border-border pl-8">
                {journey.map((j, i) => (
                  <motion.li
                    key={j.year}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="relative"
                  >
                    <span className="absolute -left-[41px] top-1 grid h-5 w-5 place-items-center rounded-full border border-gold/50 bg-background">
                      <span className="h-2 w-2 rounded-full bg-gold" />
                    </span>
                    <p className="mono-label text-gold-soft">{j.year}</p>
                    <h3 className="mt-1 font-display text-lg font-bold">{j.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{j.desc}</p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
