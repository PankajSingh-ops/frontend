import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MatrixCanvas } from "@/components/cyber/MatrixCanvas";
import { CyberHero } from "@/components/cyber/CyberHero";
import { MediaMentions } from "@/components/cyber/MediaMentions";
import { MissionStats } from "@/components/cyber/MissionStats";
import { ThreatMatrix } from "@/components/cyber/ThreatMatrix";
import { WarriorPath } from "@/components/cyber/WarriorPath";
import { RegisterSection } from "@/components/cyber/RegisterSection";

export const metadata: Metadata = {
  title: "1 Million Cyber Warriors | Ankur Chandrakant & TBPS",
  description:
    "Join Mission 1 Million Cyber Warriors by The Better Planet Society (TBPS) & Ankur Chandrakant. Free nationwide training equipping students, women, and citizens to detect, deflect, and report digital fraud.",
  openGraph: {
    title: "1 Million Cyber Warriors | Mission Digital Kavach",
    description:
      "103K+ registrations in 90 days. Free cybersecurity & AI self-defense training for vulnerable internet users across India.",
    type: "website",
    url: "/cyber-warrior",
    images: [
      {
        url: "/ankur logo.webp",
        width: 800,
        height: 600,
        alt: "Mission 1 Million Cyber Warriors",
      },
    ],
  },
};

export default function CyberWarriorPage() {
  return (
    <>
      <Navbar />
      <MatrixCanvas />
      <main className="relative z-10 overflow-hidden">
        <CyberHero />
        <MediaMentions />
        <MissionStats />
        <ThreatMatrix />
        <WarriorPath />
        <RegisterSection />
      </main>
      <Footer />
    </>
  );
}
