"use client";

import { FEATURED_COVERAGE } from "@/lib/media-content";
import { TiltCard } from "@/components/ui/TiltCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function FeaturedCoverage() {
  return (
    <section
      aria-labelledby="featured-coverage-heading"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-2 mb-12 md:mb-16">
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase">
              {"// EDITORIAL SPOTLIGHT"}
            </span>
            <SectionHeading id="featured-coverage-heading">
              Featured Coverage
            </SectionHeading>
            <p className="font-sans text-muted text-sm sm:text-base max-w-xl">
              Major national features spotlighting breakthrough cyber defense initiatives, humanitarian expeditions, and youth literacy missions.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FEATURED_COVERAGE.map((item, idx) => {
            const isHighlight = item.highlight;

            return (
              <Reveal key={item.id} delay={idx * 150} className="h-full">
                <TiltCard className="h-full">
                  <article
                    className={`relative h-full flex flex-col justify-between p-7 sm:p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 group overflow-hidden ${
                      isHighlight
                        ? "bg-surface/80 border border-[#e3b62f]/40 shadow-[0_0_35px_rgba(227,182,47,0.12)] hover:border-[#e3b62f]/70"
                        : "bg-surface/60 border border-line hover:border-primary/50 shadow-[0_0_30px_rgba(47,123,255,0.06)]"
                    }`}
                  >
                    {/* Corner HUD brackets */}
                    <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
                    <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />
                    <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary/40 group-hover:border-primary transition-colors" />
                    <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />

                    {/* Header info */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-5">
                        <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-surface-2 border border-line text-primary font-semibold tracking-wider">
                          {item.outlet}
                        </span>

                        {isHighlight ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#e3b62f] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#e3b62f]/10 border border-[#e3b62f]/30 font-medium">
                            <Sparkles className="w-3 h-3" />
                            {item.tag}
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-muted uppercase tracking-wider">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      {/* Editorial headline as plain text */}
                      <h3 className="font-sans font-semibold text-xl sm:text-2xl text-white group-hover:text-primary-glow transition-colors duration-200 leading-snug mb-4">
                        {item.headline}
                      </h3>

                      <p className="font-sans text-sm text-muted leading-relaxed mb-6">
                        {item.summary}
                      </p>
                    </div>

                    {/* Bottom action link */}
                    <div className="pt-5 border-t border-line/40 flex items-center justify-between text-muted group-hover:text-white transition-colors">
                      <span className="font-mono text-xs uppercase tracking-wider">
                        Full Feature
                      </span>
                      <div className="w-8 h-8 rounded-full bg-surface-2 border border-line flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
