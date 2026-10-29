"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ListMusic, Pause, Play, Search, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { songs, type Song } from "@/lib/hsr-data";
import { usePlayer } from "@/lib/player-store";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { MvModal } from "./mv-modal";

const FILTERS = [
  { id: "all", label: "Semua" },
] as const;

export function Music() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const [mvSong, setMvSong] = useState<Song | null>(null);
  const playSong = usePlayer((s) => s.playSong);
  const currentId = usePlayer((s) => s.current.id);
  const playing = usePlayer((s) => s.playing);
  const toggle = usePlayer((s) => s.toggle);
  const show = usePlayer((s) => s.show);

  const filtered = useMemo(() => {
    return songs.filter((s) => {
      const matchFilter =
        filter === "all" ||
        (filter === "mv" && s.type === "mv") ||
        (filter === "single" && s.type === "single");
      const matchQuery =
        !query ||
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        (s.album ?? "").toLowerCase().includes(query.toLowerCase());
      return matchFilter && matchQuery;
    });
  }, [filter, query]);

  const handlePlay = (id: number) => {
    if (id === currentId) {
      toggle();
    } else {
      playSong(id);
    }
    show();
  };

  return (
    <section id="musik" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-ember/15 blur-[140px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="Diskografi"
          title="Koleksi lagu"
          accent="yang penuh cerita"
          description="26 lagu resmi dari tiga album penuh. Klik untuk memutar lewat pemutar bawaan, atau tonton official music video-nya di YouTube."
        />

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter lagu">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold transition-all",
                  filter === f.id
                    ? "border-gold bg-gold text-primary-foreground shadow-lg shadow-gold/25"
                    : "border-border bg-secondary/50 text-foreground/75 hover:border-gold/40 hover:text-foreground"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul atau album…"
              aria-label="Cari lagu"
              className="h-11 rounded-full border-border bg-secondary/50 pl-10 focus-visible:ring-gold/50"
            />
          </div>
        </div>

        {/* Track list */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card/50 backdrop-blur-sm">
          <div className="slim-scroll max-h-[560px] overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-card/95 text-[11px] uppercase tracking-wider text-muted-foreground backdrop-blur">
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-3.5 font-medium">#</th>
                  <th scope="col" className="px-5 py-3.5 font-medium">Judul</th>
                  <th scope="col" className="hidden px-5 py-3.5 font-medium md:table-cell">Album</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => {
                  const isCurrent = s.id === currentId;
                  return (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true, margin: "20px" }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.02, 0.3) }}
                      className={cn(
                        "group border-b border-border/50 transition-colors last:border-0 hover:bg-secondary/50",
                        isCurrent && "bg-gold/8"
                      )}
                    >
                      <td className="w-12 px-5 py-3.5">
                        <button
                          onClick={() => handlePlay(s.id)}
                          aria-label={isCurrent && playing ? `Jeda ${s.title}` : `Putar ${s.title}`}
                          className={cn(
                            "grid h-9 w-9 place-items-center rounded-full transition-all",
                            isCurrent
                              ? "bg-gold text-primary-foreground shadow-md shadow-gold/30"
                              : "bg-secondary/70 text-foreground/70 group-hover:bg-gold group-hover:text-primary-foreground"
                          )}
                        >
                          {isCurrent && playing ? (
                            <Pause className="h-4 w-4 fill-current" />
                          ) : (
                            <Play className="h-4 w-4 fill-current" />
                          )}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {isCurrent && playing ? (
                            <span className="flex h-4 w-4 shrink-0 items-end gap-[2px]" aria-hidden>
                              {[0, 1, 2].map((b) => (
                                <span
                                  key={b}
                                  className="eq-bar h-full w-[3px] rounded-sm bg-gold"
                                  style={{ animationDelay: `${b * 0.18}s` }}
                                />
                              ))}
                            </span>
                          ) : (
                            <span className={cn("mono-label w-4 shrink-0", isCurrent ? "text-gold" : "text-muted-foreground")}>
                              {String(s.id).padStart(2, "0")}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className={cn("truncate font-semibold", isCurrent && "text-gold-soft")}>{s.title}</p>
                            <p className="truncate text-xs text-muted-foreground md:hidden">{s.album}</p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden px-5 py-3.5 md:table-cell">
                        <span className="text-xs text-muted-foreground">{s.album}</span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setMvSong(s)}
                          aria-label={`Tonton video ${s.title}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground/80 transition-all hover:border-[#ff4e45]/50 hover:text-[#ff6b63]"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">MV</span>
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-14 text-center text-muted-foreground">
                      <ListMusic className="mx-auto mb-3 h-8 w-8 opacity-40" aria-hidden />
                      Tidak ada lagu yang cocok dengan pencarian “{query}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border bg-secondary/40 px-5 py-3">
            <Badge variant="outline" className="border-gold/30 text-gold-soft">
              {filtered.length} lagu
            </Badge>
            <p className="text-xs text-muted-foreground">Streaming via SoundCloud · Video via YouTube</p>
          </div>
        </div>
      </div>

      <MvModal song={mvSong} onClose={() => setMvSong(null)} />
    </section>
  );
}
