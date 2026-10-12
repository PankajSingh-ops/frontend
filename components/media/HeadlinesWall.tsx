"use client";

import { PRESS_HEADLINES } from "@/lib/media-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";

export function HeadlinesWall() {
  return (
    <section
      aria-labelledby="headlines-wall-heading"
      className="relative py-20 md:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-2 mb-12 md:mb-16">
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase">
              {"// WIRE HEADLINES & CHRONICLES"}
            </span>
            <SectionHeading id="headlines-wall-heading">
              Headlines Wall
            </SectionHeading>
            <p className="font-sans text-muted text-sm sm:text-base max-w-xl">
              National press chronicles, state dailies, and broadcast coverage documenting cyber initiatives across India.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {PRESS_HEADLINES.map((item, idx) => (
            <Reveal key={item.id} delay={Math.min(idx * 50, 400)}>
              <a
                href={item.href}
                className="group relative block p-5 sm:p-6 rounded-2xl glass-card border border-line/60 hover:border-primary/60 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Hover light sweep effect */}
                <div
                  className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-out"
                  aria-hidden="true"
                />

                {/* Subtle corner bracket on hover */}
                <div className="pointer-events-none absolute top-2 left-2 w-2 h-2 border-t border-l border-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="pointer-events-none absolute bottom-2 right-2 w-2 h-2 border-b border-r border-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-mono text-xs text-primary font-bold tracking-wider uppercase mb-2">
                      {item.outlet}
                    </div>
                    {/* Rendered as plain text: no quotes, no dates */}
                    <p className="font-sans font-medium text-white/95 text-base sm:text-lg group-hover:text-primary-glow transition-colors duration-200 leading-snug">
                      {item.headline}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-surface-2 border border-line flex items-center justify-center text-muted group-hover:text-primary group-hover:bg-primary/10 group-hover:border-primary/40 transition-all duration-300 shrink-0 mt-0.5">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
