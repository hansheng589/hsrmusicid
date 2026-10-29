import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

const NewsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Email tidak valid").max(180),
  source: z.enum(["footer", "hero"]).default("footer"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = NewsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Data tidak valid" },
        { status: 400 }
      );
    }

    const { email, source } = parsed.data;

    const existing = await db.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    try {
      await db.newsletterSubscriber.create({ data: { email, source } });
      return NextResponse.json({ ok: true, alreadySubscribed: false }, { status: 201 });
    } catch (err) {
      // Race: another request created the same email between findUnique and create.
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
        return NextResponse.json({ ok: true, alreadySubscribed: true });
      }
      throw err;
    }
  } catch (err) {
    console.error("[/api/newsletter] error:", err);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan server. Coba lagi nanti." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const total = await db.newsletterSubscriber.count();
    return NextResponse.json({ ok: true, total });
  } catch {
    return NextResponse.json({ ok: false, total: 0 }, { status: 500 });
  }
}
