"use client";

import { GALLERY_STATS } from "@/lib/gallery-content";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function GalleryStats() {
  return (
    <section
      aria-label="Gallery Impact Statistics"
      className="relative py-16 md:py-24 border-t border-b border-line/40 bg-surface/30 overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/10 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {GALLERY_STATS.map((stat, idx) => {
            const isHighlight = stat.highlight;

            return (
              <Reveal key={stat.label} delay={idx * 100}>
                <div
                  className={`relative p-6 sm:p-8 rounded-2xl backdrop-blur-md border transition-all duration-300 group ${
                    isHighlight
                      ? "bg-surface/70 border-[#e3b62f]/35 shadow-[0_0_25px_rgba(227,182,47,0.08)]"
                      : "bg-surface/50 border-line/50 hover:border-primary/40 shadow-sm"
                  }`}
                >
                  {/* Subtle HUD brackets */}
                  <div
                    className={`pointer-events-none absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l ${
                      isHighlight ? "border-[#e3b62f]/50" : "border-primary/30"
                    }`}
                  />
                  <div
                    className={`pointer-events-none absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r ${
                      isHighlight ? "border-[#e3b62f]/50" : "border-primary/30"
                    }`}
                  />

                  <div
                    className={`font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-2 ${
                      isHighlight ? "text-[#e3b62f]" : "text-white"
                    }`}
                  >
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </div>

                  <p className="font-mono text-xs sm:text-sm text-muted uppercase tracking-wider leading-snug">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
