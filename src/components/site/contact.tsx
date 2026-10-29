"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Mail, Send, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { cn } from "@/lib/utils";

const TYPES = [
  { id: "contact", label: "Umum" },
  { id: "booking", label: "Booking Show" },
  { id: "collab", label: "Kolaborasi" },
] as const;

export function Contact() {
  const { toast } = useToast();
  const [type, setType] = useState<(typeof TYPES)[number]["id"]>("contact");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
          type,
        }),
      });
      if (!res.ok) throw new Error("Gagal mengirim pesan");
      toast({
        title: "Pesan terkirim ✦",
        description: "Terima kasih! Tim HSRmusicID akan membalas via email 1–2 hari kerja.",
      });
      form.reset();
    } catch {
      toast({
        title: "Gagal mengirim",
        description: "Periksa koneksi internetmu lalu coba lagi, ya.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="kontak" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              kicker="Kontak & Booking"
              title="Mari buat"
              accent="sesuatu bersama"
              description="Untuk booking panggung, kolaborasi musik, lisensi lagu, atau sekadar menyapa — kirim pesan dan tim kami akan merespons secepatnya."
            />
            <div className="space-y-4">
              {[
                { t: "Booking & Management", d: "booking@hsrmusicid.id" },
                { t: "Kolaborasi & Label", d: "label@hsrmusicid.id" },
                { t: "Media & Pers", d: "media@hsrmusicid.id" },
              ].map((c) => (
                <div key={c.t} className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/12 text-gold">
                    <Mail className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-bold">{c.t}</p>
                    <p className="text-sm text-muted-foreground">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={onSubmit}
            className="rounded-3xl border border-border bg-card/70 p-6 backdrop-blur-sm sm:p-8"
            aria-label="Formulir kontak"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  aria-pressed={type === t.id}
                  className={cn(
                    "rounded-full border px-4 py-1.5 text-xs font-bold transition-all",
                    type === t.id
                      ? "border-gold bg-gold text-primary-foreground shadow-md shadow-gold/25"
                      : "border-border text-foreground/70 hover:border-gold/40"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <div className="relative">
                  <User2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <Input id="name" name="name" required placeholder="Nama kamu" className="h-12 rounded-xl bg-secondary/50 pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  <Input id="email" name="email" type="email" required placeholder="nama@email.com" className="h-12 rounded-xl bg-secondary/50 pl-10" />
                </div>
              </div>
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="subject">Subjek</Label>
              <Input id="subject" name="subject" placeholder="Tentang apa pesan ini?" className="h-12 rounded-xl bg-secondary/50" />
            </div>
            <div className="mt-5 space-y-2">
              <Label htmlFor="message">Pesan</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Ceritakan kebutuhanmu — tanggal, lokasi, jenis kolaborasi, dll."
                className="resize-none rounded-xl bg-secondary/50"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="mt-6 h-13 w-full rounded-xl bg-gold py-3.5 text-base font-bold text-primary-foreground shadow-xl shadow-gold/25 transition-all hover:bg-gold-soft"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Mengirim…
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" /> Kirim Pesan
                </>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
