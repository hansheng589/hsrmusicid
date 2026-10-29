"use client";

import { create } from "zustand";
import { songs, type Song, scEmbedUrl } from "@/lib/hsr-data";

type PlayerState = {
  /** Currently active song (drives the SoundCloud widget src). */
  current: Song;
  /** Whether the widget should be auto-playing. */
  playing: boolean;
  /** Incremented whenever the track changes, so the iframe re-mounts cleanly. */
  srcKey: number;
  /** Whether the player bar is visible. */
  open: boolean;
  /** Playback position in milliseconds (synced from the SoundCloud widget). */
  position: number;
  /** Track duration in milliseconds. */
  duration: number;
  /** Master volume 0..100. */
  volume: number;
  /** Whether the side queue panel is open. */
  queueOpen: boolean;
  /** Play a specific song by id (auto-plays). */
  playSong: (id: number) => void;
  /** Toggle play / pause. */
  toggle: () => void;
  /** Next / previous track. */
  next: () => void;
  prev: () => void;
  /** Show the player bar. */
  show: () => void;
  /** Hide the player bar. */
  hide: () => void;
  /** Sync playing state from the SoundCloud widget events. */
  setPlaying: (v: boolean) => void;
  /** Update playback position (ms). */
  setPosition: (ms: number) => void;
  /** Update track duration (ms). */
  setDuration: (ms: number) => void;
  /** Set master volume 0..100. */
  setVolume: (v: number) => void;
  /** Toggle the side queue panel. */
  toggleQueue: () => void;
  /** Whether the left sidebar is collapsed (icon-only). */
  sidebarCollapsed: boolean;
  /** Toggle the left sidebar collapsed/expanded. */
  toggleSidebar: () => void;
};

export const usePlayer = create<PlayerState>((set, get) => ({
  current: songs[0],
  playing: false,
  srcKey: 0,
  open: false,
  position: 0,
  duration: 0,
  volume: 75,
  queueOpen: false,
  sidebarCollapsed: false,

  playSong: (id) => {
    const idx = songs.findIndex((s) => s.id === id);
    const song = idx >= 0 ? songs[idx] : songs[0];
    set({
      current: song,
      playing: true,
      open: true,
      srcKey: get().srcKey + 1,
      position: 0,
      duration: 0,
    });
  },

  toggle: () => set((s) => ({ playing: !s.playing })),

  next: () =>
    set((s) => {
      const idx = songs.findIndex((x) => x.id === s.current.id);
      const song = songs[(idx + 1) % songs.length];
      return {
        current: song,
        playing: true,
        srcKey: s.srcKey + 1,
        position: 0,
        duration: 0,
      };
    }),

  prev: () =>
    set((s) => {
      const idx = songs.findIndex((x) => x.id === s.current.id);
      const song = songs[(idx - 1 + songs.length) % songs.length];
      return {
        current: song,
        playing: true,
        srcKey: s.srcKey + 1,
        position: 0,
        duration: 0,
      };
    }),

  show: () => set({ open: true }),
  hide: () => set({ open: false, playing: false }),
  setPlaying: (v) => set({ playing: v }),
  setPosition: (ms) => set({ position: ms }),
  setDuration: (ms) => set({ duration: ms }),
  setVolume: (v) => set({ volume: Math.max(0, Math.min(100, v)) }),
  toggleQueue: () => set((s) => ({ queueOpen: !s.queueOpen })),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
}));

/** Convenience selector for the current SoundCloud embed URL. */
export function useCurrentEmbedUrl(autoPlay: boolean) {
  return usePlayer((s) => scEmbedUrl(s.current, { autoPlay }));
}
