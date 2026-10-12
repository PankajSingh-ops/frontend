import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getPressClippings, getOutletLogos } from "@/lib/gallery-data";
import { MediaHero } from "@/components/media/MediaHero";
import { OutletMarquee } from "@/components/media/OutletMarquee";
import { FeaturedCoverage } from "@/components/media/FeaturedCoverage";
import { PressClippings } from "@/components/media/PressClippings";
import { HeadlinesWall } from "@/components/media/HeadlinesWall";
import { MediaCTA } from "@/components/media/MediaCTA";

export const metadata: Metadata = {
  title: "Media & Press Coverage | Ankur Chandrakant",
  description:
    "National press features, television news commentary, and print clippings on cybersecurity, forensic intelligence, and social missions by Ankur Chandrakant.",
  openGraph: {
    title: "Media & Press Coverage | Ankur Chandrakant",
    description:
      "Explore national press coverage, news broadcasts, and editorial features documenting Ankur Chandrakant's cybersecurity and community leadership.",
    type: "website",
    url: "/media",
  },
};

export default function MediaPage() {
  // Discovered at build time via node:fs in Server Component
  const clippings = getPressClippings();
  const outletLogos = getOutletLogos();

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-bg text-text">
        {/* 1. MediaHero */}
        <MediaHero />

        {/* 2. OutletMarquee */}
        <OutletMarquee logoMap={outletLogos} />

        {/* 3. FeaturedCoverage */}
        <FeaturedCoverage />

        {/* 4. PressClippings */}
        <PressClippings clippings={clippings} />

        {/* 5. HeadlinesWall */}
        <HeadlinesWall />

        {/* 6. MediaCTA */}
        <MediaCTA />
      </main>
      <Footer />
    </>
  );
}
