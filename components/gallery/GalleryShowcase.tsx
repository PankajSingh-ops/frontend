"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/gallery-data";
import { Reveal } from "@/components/ui/Reveal";
import { Sparkles, Maximize2 } from "lucide-react";

interface GalleryShowcaseProps {
  images: GalleryItem[];
  onOpenLightbox?: (item: GalleryItem) => void;
}

export function GalleryShowcase({ images, onOpenLightbox }: GalleryShowcaseProps) {
  const [mouseShift, setMouseShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const isFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFinePointer) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = (e.clientX / window.innerWidth - 0.5) * 12;
      const yPct = (e.clientY / window.innerHeight - 0.5) * 8;
      rafId = requestAnimationFrame(() => {
        setMouseShift({ x: xPct, y: yPct });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Ensure we have exactly 5 slots for the bento layout
  const slots: (GalleryItem | null)[] = [
    images[0] || null,
    images[1] || null,
    images[2] || null,
    images[3] || null,
    images[4] || null,
  ];

  const renderTile = (
    item: GalleryItem | null,
    idx: number,
    isLarge: boolean = false
  ) => {
    if (!item) {
      // Placeholder tile
      return (
        <div
          key={`showcase-placeholder-${idx}`}
          className={`relative w-full h-full rounded-2xl glass-card border border-line/60 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none group min-h-[220px] ${
            isLarge ? "min-h-[300px] lg:min-h-full" : ""
          }`}
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-surface-2/40 pointer-events-none"
            aria-hidden="true"
          />

          {/* Corner brackets */}
          <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t border-l border-primary/40" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b border-r border-primary/40" />

          <div className="relative z-10 flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#e3b62f]" />
              {isLarge ? "// FEATURED SPOTLIGHT" : `// SHOWCASE #${idx + 1}`}
            </span>
            <span className="font-mono text-[11px] text-muted/60">
              Drop images in /awards or /tedx
            </span>
          </div>
        </div>
      );
    }

    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onOpenLightbox?.(item)}
        aria-label={`Open featured image: ${item.caption}`}
        className={`group relative w-full h-full rounded-2xl glass-card border border-line/60 hover:border-primary/70 transition-all duration-300 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          isLarge ? "min-h-[300px] lg:min-h-full" : "min-h-[220px]"
        }`}
      >
        {/* Parallax Shift Image Container */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            transform: `translate(${mouseShift.x * (isLarge ? 0.7 : 0.4)}px, ${
              mouseShift.y * (isLarge ? 0.7 : 0.4)
            }px) scale(1.06)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes={
              isLarge
                ? "(max-width: 1024px) 100vw, 50vw"
                : "(max-width: 1024px) 100vw, 25vw"
            }
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </div>

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/30 to-transparent group-hover:via-bg/20 transition-all duration-300" />

        {/* Corner HUD brackets on hover */}
        <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Maximize Icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-2/80 border border-line flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          <Maximize2 className="w-4 h-4" />
        </div>

        {/* Bottom Caption Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-mono text-[11px] text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded uppercase tracking-wider font-semibold">
              {item.category}
            </span>
            {isLarge && (
              <span className="font-mono text-[10px] text-[#e3b62f] bg-[#e3b62f]/10 border border-[#e3b62f]/30 px-2 py-0.5 rounded uppercase tracking-wider font-medium">
                Featured
              </span>
            )}
          </div>
          <h3
            className={`font-sans font-semibold text-white drop-shadow-sm group-hover:text-primary-glow transition-colors ${
              isLarge ? "text-lg sm:text-2xl" : "text-sm sm:text-base line-clamp-2"
            }`}
          >
            {item.caption}
          </h3>
        </div>
      </button>
    );
  };

  return (
    <section
      aria-labelledby="gallery-showcase-heading"
      className="relative py-16 md:py-24 border-b border-line/40 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-2 mb-8 md:mb-10">
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase">
              {"// CURATED HIGHLIGHTS"}
            </span>
            <h2
              id="gallery-showcase-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase"
            >
              Featured Moments
            </h2>
          </div>
        </Reveal>

        {/* Desktop Bento Grid (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-4 lg:gap-5 h-[520px]">
          {/* Main Large Bento Item (Tile 0) */}
          <div className="lg:col-span-2 lg:row-span-2 relative h-full">
            {renderTile(slots[0], 0, true)}
          </div>

          {/* 4 Smaller Bento Items */}
          <div className="relative h-full">{renderTile(slots[1], 1, false)}</div>
          <div className="relative h-full">{renderTile(slots[2], 2, false)}</div>
          <div className="relative h-full">{renderTile(slots[3], 3, false)}</div>
          <div className="relative h-full">{renderTile(slots[4], 4, false)}</div>
        </div>

        {/* Mobile & Tablet Horizontal Scroll-Snap Strip */}
        <div className="flex lg:hidden overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6">
          {slots.map((item, idx) => (
            <div
              key={`mobile-slot-${idx}`}
              className="snap-center shrink-0 w-[84vw] sm:w-[55vw] h-[320px] relative"
            >
              {renderTile(item, idx, idx === 0)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
