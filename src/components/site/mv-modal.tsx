"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Youtube } from "lucide-react";
import type { Song } from "@/lib/hsr-data";

export function MvModal({ song, onClose }: { song: Song | null; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {song && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-black/85 p-4 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Memutar video musik ${song.title}`}
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Youtube className="h-5 w-5 text-[#ff4e45]" aria-hidden />
                <span className="font-semibold">{song.title}</span>
                <span className="text-muted-foreground">· {song.meta}</span>
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup pemutar video"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/80 transition-colors hover:bg-secondary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/70">
              <iframe
                key={song.youtubeId}
                src={`https://www.youtube.com/embed/${song.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`Official Music Video — ${song.title}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
