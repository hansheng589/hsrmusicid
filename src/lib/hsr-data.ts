export type Album = {
  id: string;
  initials: string;
  title: string;
  description: string;
  year: string;
  trackCount: number;
  url: string;
  cover: string;
  mood: string;
};

export type Song = {
  id: number;
  title: string;
  meta: string;
  duration?: string;
  type: "mv" | "lyric" | "single";
  collaborator?: string;
  url: string;
  lyrics?: string;
  plays?: string;
  album?: string;
  /** YouTube video ID (for the MV modal). */
  youtubeId: string;
  /** SoundCloud track slug (last URL segment). Null = fall back to artist profile widget. */
  scSlug?: string;
  /** Spotify track ID (22-char base62). Used when no SoundCloud slug exists. */
  spotifyId?: string;
};

const SC_PROFILE = "https://soundcloud.com/hsrmusicid_official";
export const SPOTIFY_ARTIST_ID = "4YqIicU1fOtoPP67q7KkDA";

/** Describes how a song should be embedded for playback. */
export type EmbedSource =
  | { kind: "soundcloud"; url: string }
  | { kind: "spotify-track"; id: string }
  | { kind: "spotify-artist"; id: string };

/**
 * Resolve the best available embed source for a song:
 * 1. SoundCloud track (if a slug is known) — specific song, controllable via Widget API
 * 2. Spotify track (if a track ID is known) — specific song, controllable via Spotify iFrame API
 * 3. Spotify artist (fallback) — full catalog player so the user still hears real audio
 */
export function getEmbedSource(song: Pick<Song, "scSlug" | "spotifyId">): EmbedSource {
  if (song.scSlug) {
    return { kind: "soundcloud", url: `${SC_PROFILE}/${song.scSlug}` };
  }
  if (song.spotifyId) {
    return { kind: "spotify-track", id: song.spotifyId };
  }
  return { kind: "spotify-artist", id: SPOTIFY_ARTIST_ID };
}

/**
 * Build a SoundCloud widget embed URL for a song.
 * If the song has a verified slug, embed that exact track; otherwise embed the
 * artist profile widget so the user still hears real HSRmusicID audio.
 */
export function scEmbedUrl(song: Pick<Song, "scSlug">, opts?: { autoPlay?: boolean }): string {
  const trackUrl = song.scSlug
    ? `${SC_PROFILE}/${song.scSlug}`
    : SC_PROFILE;
  const params = new URLSearchParams({
    url: trackUrl,
    color: "%23c98f5a",
    auto_play: opts?.autoPlay ? "true" : "false",
    show_artwork: "true",
    show_user: "true",
    hide_related: "true",
    show_comments: "false",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

/** Build a Spotify embed iframe src for a track or artist. */
export function spotifyEmbedUrl(source: Extract<EmbedSource, { kind: "spotify-track" | "spotify-artist" }>): string {
  const uri = source.kind === "spotify-track" ? `track:${source.id}` : `artist:${source.id}`;
  const params = new URLSearchParams({
    utm_source: "hsrmusicid",
    theme: "0", // dark
  });
  return `https://open.spotify.com/embed/${uri}?${params.toString()}`;
}

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export type Platform = {
  name: string;
  icon: string;
  handle: string;
  url: string;
  accent: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const albums: Album[] = [
  {
    id: "sisi-lelaki",
    initials: "SL",
    title: "Sisi Lelaki",
    description: "Full Album · Pop Ballad Indonesia",
    year: "2026",
    trackCount: 12,
    url: "https://www.youtube.com/@HSRmusicID",
    cover: "/artist/album-sisi-lelaki-v3.png",
    mood: "Hujan malam, kejujuran, dan keberanian untuk mengaku.",
  },
  {
    id: "sisi-wanita",
    initials: "SW",
    title: "Sisi Wanita",
    description: "Full Album · Top 12 Playlist Music",
    year: "2026",
    trackCount: 12,
    url: "https://www.youtube.com/@HSRmusicID",
    cover: "/artist/album-sisi-wanita.png",
    mood: "Lembut tapi kuat — perspektif dari sisi yang lain.",
  },
  {
    id: "cerita-kita",
    initials: "CK",
    title: "Cerita Kita",
    description: "Full Album · Official Playlist Nostalgia Version",
    year: "2026",
    trackCount: 12,
    url: "https://www.youtube.com/@HSRmusicID",
    cover: "/artist/album-cerita-kita.png",
    mood: "Nostalgia senja: lagu untuk setiap babak perjalanan kita.",
  },
];

/** Label, media & partner wall — logos live in /public/partners. */
export type Partner = {
  id: string;
  name: string;
  logo: string;
  role: string;
  url?: string;
  /** Approximate intrinsic aspect ratio (w/h) for layout stability. */
  ratio: number;
  /** Use img tag (bitmap) vs inline svg. */
  bitmap: boolean;
};

export const partners: Partner[] = [
  { id: "sony", name: "Sony Music Indonesia", logo: "/partners/sony_music.png", role: "Label & Distribusi", ratio: 1.07, bitmap: true },
  { id: "wami", name: "Wahana Musik Indonesia", logo: "/partners/wami.png", role: "Label Kemitraan", ratio: 3.07, bitmap: true },
  { id: "transtv", name: "Trans TV", logo: "/partners/transtv.png", role: "Media Partner", ratio: 6.58, bitmap: true },
  { id: "trans7", name: "Trans7", logo: "/partners/trans7.png", role: "Media Partner", ratio: 3.37, bitmap: true },
  { id: "cnn", name: "CNN Indonesia", logo: "/partners/cnnindonesia.png", role: "Media Partner", ratio: 1.42, bitmap: true },
  { id: "creates", name: "Creates Indonesia", logo: "/partners/creates.svg", role: "Creative Partner", ratio: 3.83, bitmap: false },
  { id: "mahapustaka", name: "Mahapustaka Indonesia", logo: "/partners/mahapustaka.svg", role: "Publishing Partner", ratio: 4.33, bitmap: false },
];

export const songs: Song[] = [
  { id: 1, title: "Runtuh", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "k6vi1EQk9WY", scSlug: "runtuh-6", url: "https://www.youtube.com/watch?v=k6vi1EQk9WY" },
  { id: 2, title: "Akhir Kita", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "GXvEqVhnMlI", scSlug: "akhir-kita-1", url: "https://www.youtube.com/watch?v=GXvEqVhnMlI" },
  { id: 3, title: "Biar Ku Lepas", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "94dWqMpyvKg", scSlug: "biar-ku-lepas", url: "https://www.youtube.com/watch?v=94dWqMpyvKg" },
  { id: 4, title: "Teganya Kau", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "MW-n-o0Iv0Q", scSlug: "teganya-kau-10", url: "https://www.youtube.com/watch?v=MW-n-o0Iv0Q" },
  { id: 5, title: "Bertahan", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "X0KYahs5bWo", scSlug: "bertahan", url: "https://www.youtube.com/watch?v=X0KYahs5bWo" },
  { id: 6, title: "Aku Hancur", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "wTtPx-3PPZk", scSlug: "aku-hancur-1", url: "https://www.youtube.com/watch?v=wTtPx-3PPZk" },
  { id: 7, title: "Cukup Kamu Saja", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "euXeP0rM5_U", scSlug: "cukup-kamu-saja-1", url: "https://www.youtube.com/watch?v=euXeP0rM5_U" },
  { id: 8, title: "Paling Ku Sayangi", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "MZV2EhdFECQ", scSlug: "paling-ku-sayangi", url: "https://www.youtube.com/watch?v=MZV2EhdFECQ" },
  { id: 9, title: "Hilang", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "JJRnnXm0bK4", scSlug: "hilang", url: "https://www.youtube.com/watch?v=JJRnnXm0bK4" },
  { id: 10, title: "Kecewa", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "i0zURDMoFeU", scSlug: "kecewa-4", url: "https://www.youtube.com/watch?v=i0zURDMoFeU" },
  { id: 11, title: "Tentang Kita", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "3mvhxn6Bb1s", scSlug: "tentang-kita-7", url: "https://www.youtube.com/watch?v=3mvhxn6Bb1s" },
  { id: 12, title: "Kisah Kita", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "XCnwTye0OW4", scSlug: "kisah-kita-3", url: "https://www.youtube.com/watch?v=XCnwTye0OW4" },
  { id: 13, title: "Sabar Menanti", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "aSN6xss-i0o", scSlug: "sabar-menanti", url: "https://www.youtube.com/watch?v=aSN6xss-i0o" },
  { id: 14, title: "Lembaran Kita", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "JgPzfPblMOI", scSlug: "lembaran-kita-2", url: "https://www.youtube.com/watch?v=JgPzfPblMOI" },
  { id: 15, title: "Bayangmu", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "_LYSSqiK8wc", scSlug: "bayangmu", url: "https://www.youtube.com/watch?v=_LYSSqiK8wc" },
  { id: 16, title: "Arah Hati", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "X2qqoWtjdXs", scSlug: "arah-hati", url: "https://www.youtube.com/watch?v=X2qqoWtjdXs" },
  { id: 17, title: "Cinta Sejati", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "VNI2autQ0XU", scSlug: "cinta-sejati-2", url: "https://www.youtube.com/watch?v=VNI2autQ0XU" },
  { id: 18, title: "Tirai Sandiwara", meta: "Official MV · 2026", type: "mv", album: "Sisi Wanita", youtubeId: "jO45bxsw04o", scSlug: "tirai-sandiwara-9", url: "https://www.youtube.com/watch?v=jO45bxsw04o" },
  { id: 19, title: "Mundur Perlahan", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "uDvvsq5VFJg", scSlug: "mundur-perlahan-5", url: "https://www.youtube.com/watch?v=uDvvsq5VFJg" },
  { id: 20, title: "Masih Terasa", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "4oyiwUxLfFE", scSlug: "masih-terasa-4", url: "https://www.youtube.com/watch?v=4oyiwUxLfFE" },
  { id: 21, title: "Ruang Hati", meta: "Official MV · 2026", type: "mv", album: "Cerita Kita", youtubeId: "ckQs1P-BOeU", scSlug: "ruang-hati-5", url: "https://www.youtube.com/watch?v=ckQs1P-BOeU" },
  { id: 22, title: "Satu Janji", meta: "Official MV · 2026", type: "mv", album: "Sisi Lelaki", youtubeId: "Dw6zOFGYdbI", scSlug: "satu-janji-7", url: "https://www.youtube.com/watch?v=Dw6zOFGYdbI" },
  { id: 23, title: "Sudahi Saja", meta: "Official MV · 2026", type: "mv", album: "Single", youtubeId: "P0h_Tp2im3o", scSlug: "sudahi-saja", url: "https://www.youtube.com/watch?v=P0h_Tp2im3o" },
  { id: 24, title: "Batas Waktu", meta: "Official MV · 2026", type: "mv", album: "Single", youtubeId: "84CTCcr0PcI", scSlug: "batas-waktu", url: "https://www.youtube.com/watch?v=84CTCcr0PcI" },
  { id: 25, title: "Tak Peduli", meta: "Official MV · 2026", type: "mv", album: "Single", youtubeId: "q1jDqox3FYE", scSlug: "tak-peduli", url: "https://www.youtube.com/watch?v=q1jDqox3FYE" },
  { id: 26, title: "Sudahi Saja (Cover)", meta: "Cover · 2026", type: "single", album: "Single", youtubeId: "agFFRJvMLDI", scSlug: "sudahi-saja-cover", url: "https://www.youtube.com/watch?v=agFFRJvMLDI" },
];

export const platforms: Platform[] = [
  { name: "Spotify", icon: "spotify", handle: "Artist resmi", url: "https://open.spotify.com/artist/4YqIicU1fOtoPP67q7KkDA", accent: "#1DB954" },
  { name: "Apple Music", icon: "apple", handle: "Artist resmi", url: "https://music.apple.com/us/artist/hsrmusicid/1895415395", accent: "#fa2d48" },
  { name: "YouTube Music", icon: "youtube-music", handle: "Channel resmi", url: "https://music.youtube.com/@HSRmusicID", accent: "#ff0000" },
  { name: "SoundCloud", icon: "soundcloud", handle: "36 tracks", url: "https://soundcloud.com/hsrmusicid_official", accent: "#ff5500" },
  { name: "TikTok", icon: "tiktok", handle: "@hsrmusicid.official", url: "https://www.tiktok.com/@hsrmusicid.official", accent: "#69C9D0" },
  { name: "Instagram", icon: "instagram", handle: "@hsrmusicid", url: "https://www.instagram.com/hsrmusicid/", accent: "#e1306c" },
  { name: "Facebook", icon: "facebook", handle: "hsrmusicid.official", url: "https://www.facebook.com/hsrmusicid.official", accent: "#1877f2" },
  { name: "YouTube", icon: "youtube", handle: "Official Artist Channel", url: "https://www.youtube.com/@HSRmusicID", accent: "#ff0000" },
  { name: "Audiomack", icon: "audiomack", handle: "@hsrmusicid", url: "https://audiomack.com/hsrmusicid", accent: "#ffa200" },
  { name: "Tidal", icon: "tidal", handle: "@hsrmusicid", url: "https://tidal.com/@hsrmusicid", accent: "#e8e8e8" },
  { name: "Amazon Music", icon: "amazon-music", handle: "HSRmusicID", url: "https://music.amazon.co.uk/artists/B0GSSGHB99/hsrmusicid", accent: "#25d1da" },
  { name: "Deezer", icon: "deezer", handle: "Artist resmi", url: "https://www.deezer.com/us/artist/386960631", accent: "#a238ff" },
];

export const stats: Stat[] = [
  { value: "15K+", label: "Subscriber YouTube" },
  { value: "47", label: "Video Resmi" },
  { value: "3", label: "Album Full" },
  { value: "12", label: "Platform Digital" },
];

export const genreTags: string[] = [
  "Indonesian Pop",
  "Ballad",
  "Folk",
  "Acoustic",
];

export const navLinks = [
  { label: "Tentang", href: "#tentang" },
  { label: "Musik", href: "#musik" },
  { label: "Album", href: "#album" },
  { label: "Partner", href: "#partner" },
  { label: "Kontak", href: "#kontak" },
];

/** Career milestones for the journey timeline. */
export const journey = [
  { year: "2023", title: "Awal Mula", desc: "Single akustik pertama dirilis dari kamar kos di Medan." },
  { year: "2024", title: "Merangkak Pelan", desc: "Lagu demi lagu dirilis dari studio kamar dan mulai dikenal pendengar setia di berbagai kota." },
  { year: "2025", title: "Masuk Industri", desc: "Bekerja sama dengan label & distributor musik nasional." },
  { year: "2026", title: "Trilogi Album", desc: "Sisi Lelaki, Sisi Wanita, dan Cerita Kita rilis serentak." },
];

export const testimonials: Testimonial[] = [
  { id: "r1", name: "Dimas Pratama", role: "Pendengar setia", rating: 5, quote: "Lagu-lagu HSRmusicID jadi soundtrack hidupku. Liriknya selalu kena di hati." },
  { id: "r2", name: "Siti Rahmawati", role: "Music blogger", rating: 5, quote: "Produksi yang jujur dan melodi yang mendalam. Indonesia bangga punya HSR." },
  { id: "r3", name: "Andi Wijaya", role: "Subscriber YouTube", rating: 5, quote: "Setiap rilisan selalu ditunggu. Voice yang menenangkan dan penuh emosi." },
  { id: "r4", name: "Maya Lestari", role: "Fans akustik", rating: 5, quote: "Folk-akustiknya bikin nyaman. Cocok banget buat nemenin sore-sore." },
];

export const featuredSongId = 1; // "Runtuh"
