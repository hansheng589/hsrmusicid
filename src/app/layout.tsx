import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://hsrmusic.my.id"),
  title: "HSRmusicID — Official Artist Site | Indonesian Pop Ballad",
  description:
    "Situs resmi HSRmusicID — penyanyi & penulis lagu pop ballad Indonesia. Dengarkan 3 album full (Sisi Lelaki, Sisi Wanita, Cerita Kita) dan 26 lagu resmi. Didukung Sony Music Indonesia, Wahana Musik Indonesia, Trans Media.",
  keywords: [
    "HSRmusicID",
    "HSR music",
    "HSRmusic",
    "hsrmusicid",
    "musisi Indonesia",
    "penyanyi Indonesia",
    "pop ballad Indonesia",
    "musik pop ballad",
    "Sisi Lelaki",
    "Sisi Wanita",
    "Cerita Kita",
    "musik Indonesia",
    "lagu Indonesia",
    "HSRmusicID official",
    "artist Indonesia",
    "pop ballad Medan",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: "HSRmusicID" }],
  openGraph: {
    title: "HSRmusicID — Official Artist Site",
    description:
      "Musik pop ballad Indonesia yang jujur dan menyentuh. Dengarkan album Sisi Lelaki, Sisi Wanita & Cerita Kita.",
    type: "website",
    locale: "id_ID",
    url: "https://hsrmusic.my.id",
    siteName: "HSRmusicID",
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
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5449621047590978"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body
        className={`${syne.variable} ${manrope.variable} ${jetbrains.variable} antialiased bg-background text-foreground grain`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "HSRmusicID",
              url: "https://hsrmusic.my.id",
              genre: ["Pop", "Ballad", "Folk", "Acoustic"],
              description:
                "Penyanyi & penulis lagu pop ballad Indonesia. 3 album full, 26 lagu resmi.",
              sameAs: [
                "https://www.youtube.com/@HSRmusicID",
                "https://www.instagram.com/hsrmusicid/",
                "https://open.spotify.com/artist/4YqIicU1fOtoPP67q7KkDA",
              ],
            }),
          }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
