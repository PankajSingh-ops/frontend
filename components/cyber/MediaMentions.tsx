"use client";

import { CYBER_CONTENT } from "@/lib/cyber-content";
import { Reveal } from "../ui/Reveal";
import { Newspaper, Quote } from "lucide-react";

export function MediaMentions() {
  const { quote, source, outlets } = CYBER_CONTENT.mediaMentions;

  return (
    <section
      aria-label="National media coverage"
      className="py-12 md:py-16 bg-surface/40 border-y border-line/80 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Quote Highlight */}
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left mb-8 max-w-3xl px-4 py-3 rounded-2xl bg-surface-2/60 border border-line">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-accent-cyan shrink-0">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <blockquote className="font-sans text-sm sm:text-base text-text font-medium italic">
                &ldquo;{quote}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-xs text-primary font-semibold mt-1">
                — {source}
              </figcaption>
            </div>
          </div>
        </Reveal>

        {/* Media Outlets Wordmarks Strip */}
        <div className="w-full flex flex-col items-center">
          <div className="font-mono text-[11px] text-muted tracking-widest uppercase mb-4 flex items-center gap-2">
            <Newspaper className="w-3.5 h-3.5 text-accent-cyan" />
            <span>{"// FEATURED IN LEADING NATIONAL PUBLICATIONS"}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 max-w-4xl opacity-75 hover:opacity-100 transition-opacity">
            {outlets.map((outlet) => (
              <span
                key={outlet}
                className="font-display text-base sm:text-lg md:text-xl tracking-wider text-muted hover:text-white transition-colors uppercase whitespace-nowrap"
              >
                {outlet}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
