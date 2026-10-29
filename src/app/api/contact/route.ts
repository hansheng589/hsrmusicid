import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

// 1. TAMBAHKAN BARIS INI: Memberi tahu Next.js agar file ini berjalan di Edge Runtime Cloudflare
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(120),
  email: z.string().trim().email("Email tidak valid").max(180),
  subject: z.string().trim().max(180).optional().nullable(),
  message: z.string().trim().min(5, "Pesan minimal 5 karakter").max(4000),
  type: z.enum(["contact", "booking", "collab"]).default("contact"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
        { status: 400 }
      );
    }

    const { name, email, subject, message, type } = parsed.data;
    const saved = await db.message.create({
      data: { name, email, subject: subject || null, message, type },
    });

    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await db.message.count();
    return NextResponse.json({ ok: true, total: count });
  } catch {
    return NextResponse.json({ ok: false, total: 0 }, { status: 500 });
  }
}
