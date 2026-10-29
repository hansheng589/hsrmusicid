"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Disc3, Play } from "lucide-react";
import { albums } from "@/lib/hsr-data";
import { usePlayer } from "@/lib/player-store";
import { SectionHeading } from "./section-heading";

function AlbumCard({ album, index }: { album: (typeof albums)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const playSong = usePlayer((s) => s.playSong);
  const show = usePlayer((s) => s.show);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 180, damping: 20 });

  const firstSongId = index * 12 + 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onMouseLeave={() => {
          mx.set(0.5);
          my.set(0.5);
          setHover(false);
        }}
        onMouseEnter={() => setHover(true)}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
        className="sheen group relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl shadow-black/50 transition-shadow duration-500 hover:shadow-gold/15"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={album.cover}
            alt={`Cover album ${album.title} — ${album.description}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 90vw, 420px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />

          {/* year chip */}
          <span className="mono-label absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-[10px] text-gold-soft backdrop-blur">
            {album.year} · {album.trackCount} Tracks
          </span>

          {/* vinyl peek */}
          <div
            className="absolute -right-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full border border-white/10 bg-[radial-gradient(circle,#1a1512_28%,#0a0908_30%)] opacity-0 shadow-2xl transition-all duration-700 group-hover:right-[-56px] group-hover:opacity-100"
            aria-hidden
          >
            <div className="absolute inset-0 animate-vinyl rounded-full [background:repeating-radial-gradient(circle,#141110_0_2px,#0b0a09_2px_4px)]">
              <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold text-[9px] font-extrabold text-primary-foreground">
                HSR
              </span>
            </div>
          </div>

          {/* bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-6" style={{ transform: "translateZ(30px)" }}>
            <p className="mono-label mb-2 text-gold">{album.initials}</p>
            <h3 className="font-display text-2xl font-extrabold sm:text-3xl">{album.title}</h3>
            <p className="mt-1 text-xs font-medium text-muted-foreground">{album.description}</p>
            <p className={cnMood(hover)}>{album.mood}</p>
            <div className="mt-4 flex items-center gap-2.5">
              <button
                onClick={() => {
                  playSong(firstSongId);
                  show();
                }}
                className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-foreground shadow-lg shadow-gold/30 transition-transform hover:scale-105"
                aria-label={`Putar album ${album.title}`}
              >
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </button>
              <a
                href={album.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-5 text-sm font-semibold backdrop-blur transition-colors hover:border-gold/60 hover:text-gold-soft"
              >
                <Disc3 className="h-4 w-4" /> Playlist
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function cnMood(hover: boolean) {
  return `mt-2 text-xs leading-relaxed text-foreground/70 transition-all duration-500 ${
    hover ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
  } overflow-hidden`;
}

export function Albums() {
  return (
    <section id="album" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Trilogi Album"
          title="Tiga sisi,"
          accent="satu perjalanan"
          description="Dirilis sebagai satu kesatuan cerita — sisi lelaki, sisi wanita, dan kisah yang mereka tulis bersama."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {albums.map((a, i) => (
            <AlbumCard key={a.id} album={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
