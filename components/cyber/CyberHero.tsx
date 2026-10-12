"use client";

import { useState, useEffect } from "react";
import { CYBER_CONTENT } from "@/lib/cyber-content";
import { Reveal } from "../ui/Reveal";
import { Shield, ArrowRight, Activity, Terminal } from "lucide-react";

export function CyberHero() {
  const [terminalIndex, setTerminalIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for terminal HUD line
  useEffect(() => {
    const lines = CYBER_CONTENT.hero.terminalLines;
    const currentLine = lines[terminalIndex % lines.length];
    const typingSpeed = isDeleting ? 30 : 60;
    const pauseTime = 2200;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText === currentLine) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setTerminalIndex((prev) => (prev + 1) % lines.length);
      }, 300);
    } else {
      timeout = setTimeout(() => {
        const nextText = isDeleting
          ? currentLine.substring(0, displayedText.length - 1)
          : currentLine.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, terminalIndex]);

  return (
    <section
      aria-labelledby="cyber-hero-heading"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 md:py-32 overflow-hidden"
    >
      {/* Perspective Grid Floor */}
      <div
        className="absolute inset-x-0 bottom-0 h-[45%] pointer-events-none opacity-20 overflow-hidden"
        aria-hidden="true"
      >
        <div className="w-full h-full [transform:perspective(500px)_rotateX(62deg)_translateY(-10%)] origin-bottom bg-[linear-gradient(to_right,rgba(47,123,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,123,255,0.25)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_100%)]" />
      </div>

      {/* Cyber Radar / Sweeping concentric rings behind headline */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[540px] md:w-[720px] lg:w-[860px] aspect-square rounded-full pointer-events-none -z-10 opacity-30 select-none"
        aria-hidden="true"
      >
        {/* Concentric rings */}
        <div className="absolute inset-0 rounded-full border border-primary/20" />
        <div className="absolute inset-[15%] rounded-full border border-primary/25 border-dashed" />
        <div className="absolute inset-[32%] rounded-full border border-accent-cyan/20" />
        <div className="absolute inset-[48%] rounded-full border border-primary/30" />
        {/* Crosshairs */}
        <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-primary/20 -translate-x-1/2" />
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-primary/20 -translate-y-1/2" />
        {/* Sweeping radar beam */}
        <div className="absolute inset-0 rounded-full animate-radar-sweep origin-center bg-[conic-gradient(from_0deg,transparent_0deg,transparent_310deg,rgba(34,211,238,0.2)_360deg)]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 w-full flex flex-col items-center text-center">
        {/* Corner HUD framing brackets on outer container */}
        <div className="w-full max-w-4xl relative pt-4 pb-2">
          {/* Top Left Bracket */}
          <div
            className="hidden sm:block absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-accent-cyan/60 pointer-events-none"
            aria-hidden="true"
          />
          {/* Top Right Bracket */}
          <div
            className="hidden sm:block absolute -top-4 -right-4 w-6 h-6 border-t-2 border-r-2 border-accent-cyan/60 pointer-events-none"
            aria-hidden="true"
          />
          {/* Bottom Left Bracket */}
          <div
            className="hidden sm:block absolute -bottom-4 -left-4 w-6 h-6 border-b-2 border-l-2 border-primary/60 pointer-events-none"
            aria-hidden="true"
          />
          {/* Bottom Right Bracket */}
          <div
            className="hidden sm:block absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-primary/60 pointer-events-none"
            aria-hidden="true"
          />

          {/* Eyebrow & Live status */}
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-2/90 border border-line text-[11px] sm:text-xs font-mono text-muted tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                {"// MISSION PROTOCOL: KAVACH"}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-[11px] sm:text-xs font-mono text-accent-cyan tracking-wider uppercase">
                <Activity className="w-3.5 h-3.5 text-accent-cyan" />
                {"SYS.ONLINE // RECRUITING"}
              </span>
            </div>
          </Reveal>

          {/* Mission Mission Organization Badge */}
          <Reveal delay={100}>
            <p className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase mb-4 font-semibold">
              {CYBER_CONTENT.hero.eyebrow}
            </p>
          </Reveal>

          {/* Main Giant Headline */}
          <Reveal delay={150}>
            <div className="relative mb-2">
              <h1
                id="cyber-hero-heading"
                className="font-display text-[15vw] sm:text-[13vw] md:text-8xl lg:text-9xl leading-[0.95] tracking-tight text-white select-none inline-block animate-cyber-glitch"
              >
                <span className="bg-gradient-to-b from-white via-text to-muted bg-clip-text text-transparent">
                  {CYBER_CONTENT.hero.headlineNum}
                </span>
              </h1>
              <div className="block font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-accent-cyan mt-1 drop-shadow-[0_0_20px_rgba(34,211,238,0.4)] uppercase">
                {CYBER_CONTENT.hero.headlineText}
              </div>
            </div>
          </Reveal>

          {/* Tagline */}
          <Reveal delay={200}>
            <p className="font-mono text-xs sm:text-sm md:text-base font-semibold tracking-wider text-text/90 max-w-2xl mx-auto mt-4 uppercase">
              {CYBER_CONTENT.hero.tagline}
            </p>
          </Reveal>

          {/* Terminal / HUD Typewriter Bar */}
          <Reveal delay={250}>
            <div
              className="mt-6 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface/90 border border-line font-mono text-xs sm:text-sm text-accent-cyan max-w-xl mx-auto shadow-inner"
              aria-hidden="true"
            >
              <Terminal className="w-4 h-4 text-primary shrink-0" />
              <span className="truncate">{displayedText || "> initializing mission..."}</span>
              <span className="inline-block w-2 h-4 bg-accent-cyan animate-pulse shrink-0" />
            </div>
          </Reveal>

          {/* Mission Body Copy */}
          <Reveal delay={300}>
            <p className="text-muted text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              {CYBER_CONTENT.hero.body}
            </p>
          </Reveal>

          {/* Live Highlight Badge (with Gold Accent #e3b62f) */}
          <Reveal delay={350}>
            <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-xl bg-surface-2/80 backdrop-blur-md border border-line relative overflow-hidden mb-10 max-w-lg shadow-[0_0_25px_rgba(47,123,255,0.08)]">
              {/* Rare Gold highlight corner */}
              <div
                className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-highlight/40 to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="w-2.5 h-2.5 rounded-full bg-highlight shrink-0 shadow-[0_0_8px_#e3b62f]" />
              <p className="font-mono text-xs sm:text-sm text-text text-left font-medium">
                {CYBER_CONTENT.hero.liveBadge}
              </p>
            </div>
          </Reveal>

          {/* Hero CTAs */}
          <Reveal delay={400}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mx-auto">
              {/* Primary Enlist Button */}
              <a
                href="#register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-mono font-bold text-sm text-white bg-primary hover:bg-primary-glow shadow-[0_0_25px_rgba(47,123,255,0.5)] border border-primary-glow/60 transition-all duration-300 relative group overflow-hidden active:scale-95"
              >
                <Shield className="w-4 h-4 text-accent-cyan" />
                <span>{CYBER_CONTENT.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                {/* Animated light sweep */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none transition-transform"
                  aria-hidden="true"
                />
              </a>

              {/* Secondary See Mission Button */}
              <a
                href="#mission-stats"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-mono text-sm text-muted hover:text-white bg-surface-2/60 hover:bg-surface-2 border border-line hover:border-primary/50 transition-all duration-300"
              >
                <span>{CYBER_CONTENT.hero.ctaSecondary}</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Floating HUD chips (Desktop only, decorative) */}
        <div
          className="hidden xl:block absolute top-24 left-8 p-3 rounded-lg bg-surface/70 border border-line font-mono text-xs text-muted backdrop-blur-md pointer-events-none"
          aria-hidden="true"
        >
          <div className="text-accent-cyan font-bold mb-1">{"// DEFENCE_STATUS"}</div>
          <div>THREAT DEFLECTION: 99.4%</div>
          <div>ENCRYPTION: AES-256</div>
        </div>

        <div
          className="hidden xl:block absolute top-24 right-8 p-3 rounded-lg bg-surface/70 border border-line font-mono text-xs text-muted backdrop-blur-md pointer-events-none text-right"
          aria-hidden="true"
        >
          <div className="text-highlight font-bold mb-1">{"// ENLISTMENT_QUOTA"}</div>
          <div>TARGET: 1,000,000</div>
          <div>REMAINING: 897,000</div>
        </div>
      </div>
    </section>
  );
}
