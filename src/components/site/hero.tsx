"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Disc3, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { genreTags, stats } from "@/lib/hsr-data";
import { usePlayer } from "@/lib/player-store";

const MARQUEE_WORDS = [
  "Sisi Lelaki",
  "Runtuh",
  "Sisi Wanita",
  "Akhir Kita",
  "Cerita Kita",
  "Sabar Menanti",
  "Pop Ballad Indonesia",
  "Official Artist",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const playSong = usePlayer((s) => s.playSong);

  return (
    <section ref={ref} id="beranda" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Parallax backdrop */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <Image
          src="/artist/hero-live.png"
          alt="HSRmusicID tampil live di panggung dengan cahaya tembaga"
          fill
          priority
          className="object-cover object-center opacity-55"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,9,8,0.75)_100%)]" />
        {/* floating orbs */}
        <div className="animate-float-slow absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-gold/15 blur-[120px]" />
        <div className="animate-float-slow absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-ember/25 blur-[100px] [animation-delay:-6s]" />
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-24 pt-32 sm:px-6 lg:px-8"
      >
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-soft backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            Official Artist Channel
          </span>
          <span className="mono-label hidden text-muted-foreground sm:block">EST. 2023 — MEDAN, ID</span>
        </motion.div>

        {/* Giant display type */}
        <h1 className="font-display font-extrabold leading-[0.92] tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block text-[9vw] lg:text-[8.25rem]"
          >
            HSR<span className="gold-text">MUSIC</span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="text-stroke block text-[9vw] lg:text-[8.25rem]"
            aria-hidden
          >
            INDONESIA
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          Pop ballad yang jujur — ditulis dari sisi-sisi kecil hidup: rindu,
          kehilangan, dan harapan. Tiga album penuh,{" "}
          <span className="font-semibold text-gold-soft">26 lagu resmi</span>,
          satu suara yang membuatmu merasa ditemani.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button
            size="lg"
            onClick={() => playSong(1)}
            className="animate-pulse-ring group h-14 rounded-full bg-gold px-8 text-base font-bold text-primary-foreground shadow-2xl shadow-gold/30 transition-all hover:scale-[1.03] hover:bg-gold-soft"
          >
            <Play className="mr-2 h-5 w-5 fill-current transition-transform group-hover:scale-110" />
            Dengarkan Sekarang
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-14 rounded-full border-foreground/25 bg-background/40 px-8 text-base font-semibold text-foreground backdrop-blur-md transition-all hover:border-gold/60 hover:text-gold-soft"
          >
            <a href="#musik">
              <Disc3 className="mr-2 h-5 w-5" />
              Jelajahi Diskografi
            </a>
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-background/70 px-5 py-4 backdrop-blur-md">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-extrabold text-gold-soft sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Bottom marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="relative border-y border-border/70 bg-background/60 py-4 backdrop-blur-md"
      >
        <div className="marquee-paused flex overflow-hidden" aria-hidden>
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8" style={{ "--marquee-duration": "36s" } as React.CSSProperties}>
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
              <span key={i} className="flex items-center gap-8 whitespace-nowrap">
                <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-foreground/60">
                  {w}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
              </span>
            ))}
          </div>
        </div>
        <span className="sr-only">{genreTags.join(", ")}</span>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#partner"
        aria-label="Gulir ke bagian partner"
        className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.a>
    </section>
  );
}
