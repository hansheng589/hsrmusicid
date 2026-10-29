import type { Metadata, Viewport } from "next";
import { Syne, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HSRmusicID — Official Artist Site | Indonesian Pop Ballad",
  description:
    "Situs resmi HSRmusicID — penyanyi & penulis lagu pop ballad Indonesia. 3 album full, 26 lagu resmi, didukung Sony Music Indonesia, Wahana Musik Indonesia, Trans Media, dan partner industri lainnya.",
  keywords: [
    "HSRmusicID",
    "musisi Indonesia",
    "pop ballad",
    "Sisi Lelaki",
    "Sisi Wanita",
    "Cerita Kita",
    "musik Indonesia",
  ],
  authors: [{ name: "HSRmusicID" }],
  openGraph: {
    title: "HSRmusicID — Official Artist Site",
    description:
      "Musik pop ballad Indonesia yang jujur dan menyentuh. Dengarkan album Sisi Lelaki, Sisi Wanita & Cerita Kita.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "HSRmusicID — Official Artist Site",
    description: "Musik pop ballad Indonesia yang jujur dan menyentuh.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${syne.variable} ${manrope.variable} ${jetbrains.variable} antialiased bg-background text-foreground grain`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
