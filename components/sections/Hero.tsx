"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/lib/content";
import { Button } from "../ui/Button";
import { MediaImage } from "../ui/MediaImage";
import { Reveal } from "../ui/Reveal";

export function Hero() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Parallax logic honoring prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setOffsetY(window.scrollY);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background parallax text */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none opacity-5 z-0"
        style={{ transform: `translate(-50%, ${offsetY * 0.4}px)` }}
      >
        <h1 className="font-display text-[15vw] leading-none text-stroke text-transparent whitespace-nowrap">
          CYBER SAFETY
        </h1>
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="flex flex-col items-start gap-6 pt-10">
          <Reveal delay={0}>
            <span className="text-primary font-medium tracking-wide text-xs sm:text-sm uppercase bg-primary/10 py-2 px-4 rounded-full border border-primary/20 inline-block">
              {CONTENT.hero.eyebrow}
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.9] text-white">
              {CONTENT.hero.headlineLine1}
              <br />
              <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                {CONTENT.hero.headlineLine2}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-muted text-base md:text-lg max-w-xl">
              {CONTENT.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Button href="#about" variant="primary">Explore his work</Button>
              <Button href="#contact" variant="ghost">Let&apos;s Talk</Button>
            </div>
          </Reveal>
        </div>

        {/* Right: Portrait & Glow */}
        <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[600px] mt-8 lg:mt-0">
          {/* Radial blue glow */}
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-screen z-0 max-w-[400px] max-h-[400px] m-auto" />
          
          <Reveal delay={400} className="relative z-10 w-full max-w-[450px] aspect-[3/4]">
            <MediaImage
              imageKey="heroPortrait"
              alt="Ankur Chandrakant"
              priority
              className="drop-shadow-[0_0_40px_rgba(47,123,255,0.3)]"
            />
          </Reveal>

          {/* Floating Glass Chips */}
          {CONTENT.hero.badges.map((badge, i) => (
            <div
              key={badge}
              className="hidden md:flex absolute glass-card px-4 py-3 rounded-xl z-20 items-center gap-3 animate-[float_4s_ease-in-out_infinite_alternate]"
              style={{
                top: `${20 + i * 30}%`,
                left: i % 2 === 0 ? "-10%" : "auto",
                right: i % 2 !== 0 ? "-10%" : "auto",
                animationDelay: `${i}s`,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span className="text-sm font-medium text-white">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
