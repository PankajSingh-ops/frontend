"use client";

import { useState, useRef } from "react";
import { CONTENT, ImageMap } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { MediaImage } from "../ui/MediaImage";

export function IndustryVoices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".industry-card");
    if (!cards.length) return;

    const containerCenter = container.getBoundingClientRect().left + container.offsetWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
  };

  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cards = container.querySelectorAll(".industry-card");
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setActiveIndex(index);
    }
  };

  return (
    <section
      aria-labelledby="industry-voices-heading"
      className="py-14 sm:py-20 md:py-28 lg:py-36 bg-bg relative overflow-hidden border-y border-line"
    >
      {/* Giant Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] z-0">
        <h2 className="font-display text-[22vw] leading-none text-stroke text-transparent whitespace-nowrap">
          VOICES
        </h2>
      </div>

      {/* Radial soft blue glow behind the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[800px] h-[300px] md:h-[400px] bg-primary/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        <Reveal>
          <SectionHeading
            id="industry-voices-heading"
            className="mb-8 sm:mb-12 md:mb-16 text-center"
          >
            <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
              Words from
            </span>
            <br />
            <span className="text-white">Industry People</span>
          </SectionHeading>
        </Reveal>

        {/* Carousel / Grid container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="w-full flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 pt-4 pb-6 md:pt-6 md:pb-8 snap-x snap-mandatory hide-scrollbar group/section px-3 sm:px-4 md:px-0"
        >
          {CONTENT.industryVoices.map((voice, i) => {
            const isCenter = i === 1;

            return (
              <Reveal
                key={voice.name}
                delay={i * 150}
                className={`industry-card w-[82vw] max-w-[340px] sm:w-[320px] md:w-auto md:max-w-none snap-center shrink-0 flex flex-col ${
                  isCenter ? "md:-translate-y-6 md:scale-105" : ""
                }`}
              >
                <TiltCard className="w-full h-full flex flex-col relative group/card">
                  {/* Glass frame of the card - starts below to let the head pop out cleanly */}
                  <div className="absolute top-10 md:top-12 inset-x-0 bottom-0 bg-surface-2/40 backdrop-blur-xl border border-line rounded-2xl md:rounded-3xl overflow-hidden glass-card transition-colors group-hover/card:border-primary/40 group-hover/card:bg-surface-2/60 z-0">
                    {/* Ghost text of the person's name behind them */}
                    <div className="absolute top-6 md:top-10 -left-2 md:-left-4 w-[150%] text-left pointer-events-none opacity-10">
                      <span className="font-display text-5xl md:text-7xl text-stroke-primary text-transparent whitespace-nowrap">
                        {voice.name.split(" ")[0].toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* SVG Quote Icon */}
                  <div className="absolute top-14 left-5 md:top-16 md:left-8 text-primary/20 z-10 w-8 h-8 md:w-12 md:h-12 pointer-events-none">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Portrait (stands with head naturally extending above the card frame) */}
                  <div className="relative w-full h-[230px] sm:h-[260px] md:h-auto md:aspect-[4/5] z-10 flex items-end justify-center pt-2">
                    <div className="relative w-[85%] md:w-[90%] h-full max-h-full">
                      <MediaImage
                        imageKey={voice.imageKey as keyof ImageMap}
                        alt={`Portrait of ${voice.name}`}
                        fill
                        className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover/card:scale-105"
                      />
                    </div>
                  </div>

                  {/* Gradient Overlay & Text Content */}
                  <div className="relative z-20 flex flex-col items-center flex-grow p-5 md:p-8 pt-2 md:pt-4 text-center rounded-b-2xl md:rounded-b-3xl">
                    <figure className="flex flex-col items-center gap-3 md:gap-4 mt-auto w-full">
                      <blockquote className="text-white font-sans text-sm md:text-[16px] leading-relaxed tracking-wide min-h-[50px] md:min-h-[72px] flex items-center justify-center">
                        <p className="animated-quote">
                          {voice.quote.split(" ").map((word, wIdx) => (
                            <span
                              key={wIdx}
                              className="inline-block opacity-0 animate-[fadeInWord_0.5s_ease_forwards]"
                              style={{ animationDelay: `${wIdx * 0.1 + 0.5}s` }}
                            >
                              {word}&nbsp;
                            </span>
                          ))}
                        </p>
                      </blockquote>
                      <div className="w-8 h-[2px] bg-primary rounded-full my-1 md:my-1.5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white translate-x-[-100%] animate-[slideRight_2s_ease-in-out_infinite]" />
                      </div>
                      <figcaption className="flex flex-col items-center">
                        <span className="font-display text-lg md:text-xl text-primary tracking-widest uppercase">
                          {voice.name}
                        </span>
                        <span className="text-[11px] md:text-xs text-muted font-medium mt-0.5 md:mt-1">
                          Industry Voice
                        </span>
                      </figcaption>
                    </figure>
                  </div>

                  {/* Outer Glow for Center Card */}
                  {isCenter && (
                    <div className="absolute top-10 md:top-12 -inset-x-2 bottom-0 bg-primary/20 blur-2xl rounded-[40px] -z-20 md:opacity-100 opacity-0 pointer-events-none" />
                  )}
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Mobile Navigation Controls */}
        <div className="md:hidden flex items-center justify-center gap-4 mt-2 mb-2 z-20">
          <button
            onClick={() => scrollToCard(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="w-9 h-9 rounded-full border border-line bg-surface/80 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Previous voice"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {CONTENT.industryVoices.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToCard(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === dotIdx
                    ? "w-7 bg-primary shadow-[0_0_10px_#2f7bff]"
                    : "w-2 bg-muted/30 hover:bg-muted/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToCard(activeIndex + 1)}
            disabled={activeIndex === CONTENT.industryVoices.length - 1}
            className="w-9 h-9 rounded-full border border-line bg-surface/80 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            aria-label="Next voice"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Decorative Connecting Line (lg+) */}
        <div
          className="hidden md:block relative w-full max-w-4xl h-[1px] bg-line mt-12 mb-4"
          aria-hidden="true"
        >
          <div className="absolute left-[16.666%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_10px_#5aa0ff]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_#22d3ee]" />
          <div className="absolute right-[16.666%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_10px_#5aa0ff]" />
        </div>
      </div>
    </section>
  );
}
