"use client";

import Image from "next/image";
import { MEDIA_OUTLETS, MediaOutlet } from "@/lib/media-content";

interface OutletMarqueeProps {
  logoMap?: Record<string, string>;
}

export function OutletMarquee({ logoMap = {} }: OutletMarqueeProps) {
  // Split outlets into two balanced rows
  const mid = Math.ceil(MEDIA_OUTLETS.length / 2);
  const row1 = MEDIA_OUTLETS.slice(0, mid);
  const row2 = MEDIA_OUTLETS.slice(mid);

  // Duplicate for seamless infinite loop
  const loopRow1 = [...row1, ...row1, ...row1, ...row1];
  const loopRow2 = [...row2, ...row2, ...row2, ...row2];

  const renderOutlet = (outlet: MediaOutlet, index: number) => {
    const slugKey = outlet.slug.replace(/[-_]+/g, "").toLowerCase();
    const logoSrc = logoMap[slugKey] || logoMap[outlet.slug];

    return (
      <div
        key={`${outlet.slug}-${index}`}
        className="flex items-center justify-center shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-surface/50 border border-line/40 hover:border-primary/50 hover:bg-surface-2/60 transition-all duration-300 group select-none"
      >
        {logoSrc ? (
          <div className="relative h-7 sm:h-8 w-28 sm:w-32 flex items-center justify-center">
            <Image
              src={logoSrc}
              alt={`${outlet.name} logo`}
              width={120}
              height={32}
              className="max-h-full max-w-full object-contain filter brightness-90 group-hover:brightness-110 transition-all"
            />
          </div>
        ) : (
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-muted group-hover:text-white uppercase transition-colors whitespace-nowrap flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
            {outlet.name}
          </span>
        )}
      </div>
    );
  };

  return (
    <section
      aria-label="Media Outlets & Publications"
      className="relative py-12 md:py-16 border-b border-line/40 overflow-hidden bg-bg/50"
    >
      {/* Edge Gradients for smooth fade */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 md:w-48 bg-gradient-to-r from-bg to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 md:w-48 bg-gradient-to-l from-bg to-transparent z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <span className="font-mono text-[11px] sm:text-xs text-muted/70 tracking-widest uppercase">
          {"// FEATURED & QUOTED ACROSS NATIONAL CHANNELS"}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4 overflow-hidden">
        {/* Row 1 - Leftward scrolling */}
        <div className="flex w-fit animate-marquee [animation-duration:45s] sm:[animation-duration:28s] hover:[animation-play-state:paused] gap-3 sm:gap-4">
          {loopRow1.map((outlet, i) => renderOutlet(outlet, i))}
        </div>

        {/* Row 2 - Rightward scrolling */}
        <div className="flex w-fit animate-marquee-reverse [animation-duration:48s] sm:[animation-duration:30s] hover:[animation-play-state:paused] gap-3 sm:gap-4">
          {loopRow2.map((outlet, i) => renderOutlet(outlet, i))}
        </div>
      </div>
    </section>
  );
}
