import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getAllGalleryImages } from "@/lib/gallery-data";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryShowcase } from "@/components/gallery/GalleryShowcase";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryStats } from "@/components/gallery/GalleryStats";
import { GalleryCTA } from "@/components/gallery/GalleryCTA";

export const metadata: Metadata = {
  title: "Gallery & Milestones | Ankur Chandrakant",
  description:
    "Explore photo archives of TEDx talks, cybersecurity awards, The Better Planet Ride expedition, and national digital literacy workshops by Ankur Chandrakant.",
  openGraph: {
    title: "Gallery & Milestones | Ankur Chandrakant",
    description:
      "A cinematic visual archive spanning keynotes, honors, humanitarian rides, and cybersecurity bootcamps across India and beyond.",
    type: "website",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  // Discovered at build time via node:fs in Server Component
  const allImages = getAllGalleryImages();

  // Curate first 5 images for the showcase strip (preferring awards and tedx)
  const awards = allImages["awards"] || [];
  const tedx = allImages["tedx"] || [];
  const socialImpact = allImages["social-impact"] || [];
  const training = allImages["training"] || [];
  const podcasts = allImages["podcasts"] || [];
  const moments = allImages["moments"] || [];

  const featuredCandidates = [
    ...awards,
    ...tedx,
    ...socialImpact,
    ...training,
    ...podcasts,
    ...moments,
  ];

  const featuredImages = featuredCandidates.slice(0, 5);

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-bg text-text">
        {/* 1. GalleryHero */}
        <GalleryHero />

        {/* 2. GalleryShowcase */}
        <GalleryShowcase images={featuredImages} />

        {/* 3. GalleryGrid */}
        <GalleryGrid allImages={allImages} />

        {/* 4. GalleryStats */}
        <GalleryStats />

        {/* 5. GalleryCTA */}
        <GalleryCTA />
      </main>
      <Footer />
    </>
  );
}
