import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MediaMarquee } from "@/components/sections/MediaMarquee";
import { VoiceStats } from "@/components/sections/VoiceStats";
import { Technologist } from "@/components/sections/Technologist";
import { Credibility } from "@/components/sections/Credibility";
import { ThreeWorlds } from "@/components/sections/ThreeWorlds";
import { ContentReach } from "@/components/sections/ContentReach";
import { TedxStage } from "@/components/sections/TedxStage";
import { IndustryVoices } from "@/components/sections/IndustryVoices";
import { ImpactStrip } from "@/components/sections/ImpactStrip";
import { CyberWarriors } from "@/components/sections/CyberWarriors";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MediaMarquee />
        <VoiceStats />
        <Technologist />
        <Credibility />
        <ThreeWorlds />
        <ContentReach />
        <TedxStage />
        <IndustryVoices />
        <ImpactStrip />
        <CyberWarriors />
      </main>
      <Footer />
    </>
  );
}
