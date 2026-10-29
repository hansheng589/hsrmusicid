"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/hsr-data";
import { usePlayer } from "@/lib/player-store";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const playSong = usePlayer((s) => s.playSong);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-ember via-gold to-gold-soft"
      />
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex h-16 md:h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        {/* Brand */}
        <a href="#" className="group flex items-center gap-3" aria-label="HSRmusicID — beranda">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-gold to-ember shadow-lg shadow-gold/25 transition-transform duration-500 group-hover:rotate-[10deg]">
            <span className="font-display text-base font-extrabold text-primary-foreground">H</span>
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-bold tracking-tight">
              HSR<span className="text-gold">music</span>ID
            </span>
            <span className="mono-label text-[9px] text-muted-foreground">Official Artist Site</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => playSong(1)}
            className="hidden h-10 rounded-full bg-gold px-5 font-semibold text-primary-foreground shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft hover:shadow-gold/40 sm:inline-flex"
          >
            <Play className="mr-1.5 h-4 w-4 fill-current" /> Putar Musik
          </Button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/60 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium hover:bg-secondary"
                  >
                    {l.label}
                    <span className="mono-label text-[10px] text-gold">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
