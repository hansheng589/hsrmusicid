import { SiteNav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Partners } from "@/components/site/partners";
import { About } from "@/components/site/about";
import { Music } from "@/components/site/music";
import { Albums } from "@/components/site/albums";
import { Testimonials } from "@/components/site/testimonials";
import { Platforms } from "@/components/site/platforms";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { PlayerBar, PlayerSpacer } from "@/components/site/player-bar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Partners />
        <About />
        <Music />
        <Albums />
        <Testimonials />
        <Platforms />
        <Contact />
      </main>
      <Footer />
      <PlayerSpacer />
      <PlayerBar />
    </div>
  );
}
