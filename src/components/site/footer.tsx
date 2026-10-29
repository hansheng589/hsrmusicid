"use client";

import { useState } from "react";
import { Instagram, Loader2, Music2, Send, Youtube } from "lucide-react";
import { navLinks, partners } from "@/lib/hsr-data";
import { useToast } from "@/hooks/use-toast";
import { PartnerLogo } from "./partners";

function AudiomackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 13.2h3.1l2.2-6.4 3.3 11.4 3.1-14.4 2.5 9.4h5.8" />
    </svg>
  );
}

function TidalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3.6 9.3 6.3 12 9l2.7-2.7L12 3.6Z" />
      <path d="M6.6 9 3.9 11.7 6.6 14.4 9.3 11.7 6.6 9Z" />
      <path d="M17.4 9l-2.7 2.7 2.7 2.7 2.7-2.7L17.4 9Z" />
      <path d="M12 14.4 9.3 17.1 12 19.8l2.7-2.7-2.7-2.7Z" />
    </svg>
  );
}

function AmazonMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 15.5v-8l9-2v8" fill="none" />
      <circle cx="6.8" cy="15.6" r="2.3" fill="currentColor" stroke="none" />
      <circle cx="15.8" cy="13.6" r="2.3" fill="currentColor" stroke="none" />
      <path d="M4.5 19.2c2.2 1.5 4.8 2.3 7.5 2.3s5.3-.8 7.5-2.3" />
      <path d="m17.6 20.6 1.9-.9-.4 2.1" />
    </svg>
  );
}

function DeezerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <rect x="3" y="13.2" width="3.6" height="2.6" rx="0.6" />
      <rect x="8.1" y="10.4" width="3.6" height="5.4" rx="0.6" />
      <rect x="13.2" y="7.4" width="3.6" height="8.4" rx="0.6" />
      <rect x="18.3" y="4.6" width="3.6" height="11.2" rx="0.6" />
    </svg>
  );
}

const SOCIALS = [
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@HSRmusicID" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/hsrmusicid/" },
  { icon: Music2, label: "Spotify", href: "https://open.spotify.com/artist/4YqIicU1fOtoPP67q7KkDA" },
  { icon: AudiomackIcon, label: "Audiomack", href: "https://audiomack.com/hsrmusicid" },
  { icon: TidalIcon, label: "Tidal", href: "https://tidal.com/@hsrmusicid" },
  { icon: AmazonMusicIcon, label: "Amazon Music", href: "https://music.amazon.co.uk/artists/B0GSSGHB99/hsrmusicid" },
  { icon: DeezerIcon, label: "Deezer", href: "https://www.deezer.com/us/artist/386960631" },
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const value = email.trim();
    if (!value || loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, source: "footer" }),
      });
      const data = (await res.json()) as { ok: boolean; alreadySubscribed?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Gagal berlangganan");
      if (data.alreadySubscribed) {
        toast({
          title: "Kamu sudah terdaftar ✦",
          description: "Email ini sudah terdaftar di newsletter HSRmusicID. Sampai jumpa di rilisan berikutnya!",
        });
      } else {
        toast({
          title: "Berhasil berlangganan ✦",
          description: "Terima kasih! Kamu akan jadi yang pertama tahu soal rilisan baru HSRmusicID.",
        });
      }
      form.reset();
      setEmail("");
    } catch {
      toast({
        title: "Gagal berlangganan",
        description: "Periksa kembali emailmu lalu coba lagi, ya.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="mt-auto border-t border-border bg-[#070605]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter band */}
        <div className="grid gap-6 border-b border-border/60 py-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12">
          <div>
            <p className="mono-label mb-3 flex items-center gap-3 text-gold">
              <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
              Newsletter
              <span className="inline-block h-px w-8 bg-gold/60" aria-hidden />
            </p>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">
              Nikmati <span className="text-gold">rilisan terbaru</span> lebih dulu
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Daftarkan emailmu untuk dapat kabar single baru, album, dan momen spesial
              langsung dari HSRmusicID — tanpa spam, kapan saja berhenti.
            </p>
          </div>
          <form onSubmit={subscribe} className="w-full" aria-label="Formulir newsletter">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">
                Alamat email untuk newsletter
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@kamu.com"
                autoComplete="email"
                className="h-12 flex-1 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gold px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-gold/25 transition-all hover:bg-gold-soft disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Memproses…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden /> Berlangganan
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr_1.5fr]">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3" aria-label="HSRmusicID — kembali ke atas">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold to-ember shadow-lg shadow-gold/25">
                <span className="font-display text-base font-extrabold text-primary-foreground">H</span>
              </span>
              <span className="font-display text-lg font-bold">
                HSR<span className="text-gold">music</span>ID
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Official artist site. Pop ballad Indonesia yang jujur dan menyentuh —
              didukung label & media terpercaya.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/50 text-foreground/70 transition-all hover:border-gold/50 hover:text-gold"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav aria-label="Navigasi footer">
            <p className="mono-label mb-4 text-gold">Jelajahi</p>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Partners */}
          <div>
            <p className="mono-label mb-4 text-gold">Mitra</p>
            <ul className="space-y-2.5">
              {partners.slice(0, 6).map((p) => (
                <li key={p.id} className="text-sm text-muted-foreground">
                  {p.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini logo wall */}
          <div>
            <p className="mono-label mb-4 text-gold">Didukung Oleh</p>
            <div className="grid grid-cols-3 items-center gap-3 opacity-60">
              {partners.slice(0, 6).map((p) => (
                <div key={p.id} className="flex h-8 items-center" title={p.name}>
                  <PartnerLogo logo={p.logo} name={p.name} bitmap={p.bitmap} imgClassName="[filter:brightness(0)_invert(1)] max-h-8" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/60 py-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 HSRmusicID. Seluruh hak cipta dilindungi.
          </p>
          <p className="mono-label text-[9px] text-muted-foreground/70">
            Crafted with ♥ in Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
