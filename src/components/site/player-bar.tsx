"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ListMusic,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { scEmbedUrl, songs } from "@/lib/hsr-data";
import { usePlayer } from "@/lib/player-store";
import { cn } from "@/lib/utils";

/* ---- SoundCloud Widget API typings (minimal) ---- */
type SCWidget = {
  bind: (event: string, handler: () => void) => void;
  isPaused: (cb: (paused: boolean) => void) => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  seekTo: (ms: number) => void;
  setVolume: (v: number) => void;
  getDuration: (cb: (ms: number) => void) => void;
  getPosition: (cb: (ms: number) => void) => void;
};
declare global {
  interface Window {
    SC?: {
      Widget: new (el: HTMLIFrameElement) => SCWidget;
      WidgetEvents: Record<string, string>;
    };
  }
}

let scLoader: Promise<void> | null = null;
function loadSoundCloudApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.SC) return Promise.resolve();
  if (!scLoader) {
    scLoader = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "https://w.soundcloud.com/player/api.js";
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("Gagal memuat SoundCloud Widget API"));
      document.head.appendChild(s);
    });
  }
  return scLoader;
}

function fmt(ms: number): string {
  if (!ms || !isFinite(ms)) return "0:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const sec = total % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function PlayerBar() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<SCWidget | null>(null);

  const open = usePlayer((s) => s.open);
  const playing = usePlayer((s) => s.playing);
  const current = usePlayer((s) => s.current);
  const srcKey = usePlayer((s) => s.srcKey);
  const position = usePlayer((s) => s.position);
  const duration = usePlayer((s) => s.duration);
  const volume = usePlayer((s) => s.volume);
  const queueOpen = usePlayer((s) => s.queueOpen);

  const toggle = usePlayer((s) => s.toggle);
  const next = usePlayer((s) => s.next);
  const prev = usePlayer((s) => s.prev);
  const playSong = usePlayer((s) => s.playSong);
  const hide = usePlayer((s) => s.hide);
  const setPlaying = usePlayer((s) => s.setPlaying);
  const setPosition = usePlayer((s) => s.setPosition);
  const setDuration = usePlayer((s) => s.setDuration);
  const setVolume = usePlayer((s) => s.setVolume);
  const toggleQueue = usePlayer((s) => s.toggleQueue);

  /* Create / recreate the widget whenever the track (srcKey) changes. */
  useEffect(() => {
    if (!open || !iframeRef.current) return;
    let cancelled = false;

    loadSoundCloudApi()
      .then(() => {
        if (cancelled || !window.SC || !iframeRef.current) return;
        const widget = new window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        const EVENTS = window.SC.WidgetEvents;

        widget.bind(EVENTS.PLAY, () => {
          setPlaying(true);
          widget.getDuration((d) => setDuration(d));
        });
        widget.bind(EVENTS.PAUSE, () => setPlaying(false));
        widget.bind(EVENTS.FINISH, () => {
          usePlayer.getState().next();
        });
        widget.bind(EVENTS.PLAY_PROGRESS, (payload?: { currentProgress?: number }) => {
          if (payload && typeof payload.currentProgress === "number") {
            widget.getDuration((d) => {
              setDuration(d);
              setPosition(payload.currentProgress! * d);
            });
          }
        });
        widget.setVolume(volume / 100);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [srcKey, open]);

  /* Keep widget volume in sync. */
  useEffect(() => {
    widgetRef.current?.setVolume(volume / 100);
  }, [volume]);

  const handleToggle = useCallback(() => {
    const w = widgetRef.current;
    if (!w) {
      toggle();
      return;
    }
    w.isPaused((paused) => {
      if (paused) w.play();
      else w.pause();
    });
    toggle();
  }, [toggle]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const target = ratio * duration;
    setPosition(target);
    widgetRef.current?.seekTo(target);
  };

  const progressPct = duration > 0 ? (position / duration) * 100 : 0;

  return (
    <>
      {/* Hidden SoundCloud widget that actually plays audio */}
      <iframe
        ref={iframeRef}
        key={srcKey}
        title="Pemutar audio SoundCloud"
        src={open ? scEmbedUrl(current, { autoPlay: playing }) : undefined}
        allow="autoplay"
        className="pointer-events-none fixed bottom-0 left-0 h-0 w-0 opacity-0"
      />

      {/* Queue side panel */}
      <AnimatePresence>
        {queueOpen && open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed bottom-[88px] right-3 z-[55] flex max-h-[60vh] w-[320px] flex-col overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-2xl shadow-black/60 backdrop-blur-xl sm:w-[360px]"
            aria-label="Antrean lagu"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="mono-label text-gold">Antrean · {songs.length} lagu</p>
              <button onClick={toggleQueue} aria-label="Tutup antrean" className="rounded-full p-1.5 hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="slim-scroll flex-1 overflow-y-auto p-2">
              {songs.map((s) => {
                const isCur = s.id === current.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => playSong(s.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                      isCur ? "bg-gold/15 text-gold-soft" : "hover:bg-secondary"
                    )}
                  >
                    <span className="mono-label w-6 shrink-0 text-[10px] text-muted-foreground">
                      {String(s.id).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block truncate text-sm font-semibold", isCur && "text-gold-soft")}>
                        {s.title}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">{s.album}</span>
                    </span>
                    {isCur && playing && (
                      <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
                        {[0, 1, 2].map((b) => (
                          <span
                            key={b}
                            className="eq-bar h-full w-[3px] rounded-sm bg-gold"
                            style={{ animationDelay: `${b * 0.15}s` }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Player bar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="pb-safe fixed inset-x-0 bottom-0 z-[56] px-3 pb-3"
            role="region"
            aria-label="Pemutar musik"
          >
            <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-popover/95 shadow-2xl shadow-black/70 backdrop-blur-xl">
              {/* seek bar */}
              <div
                onClick={seek}
                className="group relative h-1.5 w-full cursor-pointer bg-secondary"
                role="slider"
                aria-label="Posisi lagu"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progressPct)}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember to-gold transition-[width] duration-150"
                  style={{ width: `${progressPct}%` }}
                />
                <div
                  className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-gold-soft opacity-0 shadow transition-opacity group-hover:opacity-100"
                  style={{ left: `calc(${progressPct}% - 6px)` }}
                />
              </div>

              <div className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                {/* artwork */}
                <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-gold/80 to-ember shadow-inner">
                  <span className="font-display text-sm font-extrabold text-primary-foreground">
                    {current.title.slice(0, 2).toUpperCase()}
                  </span>
                  {playing && <span className="absolute inset-0 animate-vinyl rounded-xl bg-[radial-gradient(circle,transparent_55%,rgba(0,0,0,0.35)_56%,transparent_60%,rgba(0,0,0,0.3)_61%,transparent_66%,rgba(0,0,0,0.25)_71%,transparent_76%)]" />}
                </div>

                {/* meta */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{current.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">
                    HSRmusicID · {current.album}
                  </p>
                </div>

                {/* controls */}
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <button onClick={toggleQueue} aria-label="Buka antrean lagu" className={cn("rounded-full p-2 transition-colors hover:bg-secondary", queueOpen && "text-gold")}>
                    <ListMusic className="h-4.5 w-4.5" />
                  </button>
                  <button onClick={prev} aria-label="Lagu sebelumnya" className="rounded-full p-2 transition-colors hover:bg-secondary">
                    <SkipBack className="h-4.5 w-4.5 fill-current" />
                  </button>
                  <button
                    onClick={handleToggle}
                    aria-label={playing ? "Jeda" : "Putar"}
                    className="grid h-11 w-11 place-items-center rounded-full bg-gold text-primary-foreground shadow-lg shadow-gold/30 transition-transform hover:scale-105"
                  >
                    {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="ml-0.5 h-5 w-5 fill-current" />}
                  </button>
                  <button onClick={next} aria-label="Lagu berikutnya" className="rounded-full p-2 transition-colors hover:bg-secondary">
                    <SkipForward className="h-4.5 w-4.5 fill-current" />
                  </button>
                </div>

                {/* time + volume (desktop) */}
                <div className="hidden items-center gap-3 lg:flex">
                  <span className="mono-label w-20 text-center text-[10px] text-muted-foreground">
                    {fmt(position)} / {fmt(duration)}
                  </span>
                  <button
                    onClick={() => setVolume(volume === 0 ? 75 : 0)}
                    aria-label={volume === 0 ? "Aktifkan suara" : "Bisukan"}
                    className="rounded-full p-2 hover:bg-secondary"
                  >
                    {volume === 0 ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    aria-label="Volume"
                    className="accent-gold w-24"
                  />
                </div>

                <button onClick={hide} aria-label="Tutup pemutar" className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Spacer that keeps page content clear of the fixed player bar. */
export function PlayerSpacer() {
  const open = usePlayer((s) => s.open);
  return <div className={cn("transition-[height] duration-500", open ? "h-24" : "h-0")} aria-hidden />;
}
