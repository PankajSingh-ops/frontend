"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { PressClippingItem } from "@/lib/gallery-data";
import { Lightbox, LightboxImage } from "@/components/ui/Lightbox";
import { FilterTabs } from "@/components/ui/FilterTabs";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Maximize2, Newspaper } from "lucide-react";

interface PressClippingsProps {
  clippings: PressClippingItem[];
}

// 8 varied aspect ratio placeholder definitions
const PLACEHOLDER_ASPECTS = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[16/10]",
  "aspect-[3/2]",
  "aspect-[4/5]",
  "aspect-[16/9]",
  "aspect-[1/1]",
];

export function PressClippings({ clippings }: PressClippingsProps) {
  const [activeOutlet, setActiveOutlet] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Check if any clipping has an outlet extracted (from "outlet__title.jpg")
  const hasOutletPrefixes = useMemo(() => {
    const outletsWithValues = clippings.filter((c) => Boolean(c.outlet));
    return outletsWithValues.length > 0;
  }, [clippings]);

  // Extract distinct outlets for filtering
  const outletTabs = useMemo(() => {
    if (!hasOutletPrefixes) return [];

    const outletSet = new Set<string>();
    clippings.forEach((c) => {
      if (c.outlet) outletSet.add(c.outlet);
    });

    const list = Array.from(outletSet).sort();
    return [
      { id: "all", label: "All Outlets", count: clippings.length },
      ...list.map((outlet) => ({
        id: outlet,
        label: outlet,
        count: clippings.filter((c) => c.outlet === outlet).length,
      })),
    ];
  }, [clippings, hasOutletPrefixes]);

  // Filter clippings if outlet filtering is active
  const filteredClippings = useMemo(() => {
    if (!hasOutletPrefixes || activeOutlet === "all") {
      return clippings;
    }
    return clippings.filter((c) => c.outlet === activeOutlet);
  }, [clippings, hasOutletPrefixes, activeOutlet]);

  // Map to lightbox format
  const lightboxImages: LightboxImage[] = useMemo(() => {
    return filteredClippings.map((c) => ({
      src: c.src,
      alt: c.alt,
      caption: c.caption,
      category: c.outlet || "Press Clipping",
    }));
  }, [filteredClippings]);

  return (
    <section
      aria-labelledby="press-clippings-heading"
      className="relative py-20 md:py-28 border-t border-line/40 bg-bg/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-2 mb-8 md:mb-12">
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase">
              {"// ARCHIVED COVERAGE"}
            </span>
            <SectionHeading id="press-clippings-heading">
              Press Clippings
            </SectionHeading>
            <p className="font-sans text-muted text-sm sm:text-base max-w-xl">
              Archived print newspaper articles, digital portal highlights, and investigative features covering cyber awareness campaigns.
            </p>
          </div>
        </Reveal>

        {/* Optional Outlet Tabs if filenames have outlet prefix */}
        {hasOutletPrefixes && outletTabs.length > 1 && (
          <div className="mb-10">
            <FilterTabs
              tabs={outletTabs}
              activeTab={activeOutlet}
              onChange={setActiveOutlet}
              ariaLabel="Filter Press Clippings by Outlet"
            />
          </div>
        )}

        {/* Empty state / Placeholders when no real images are in the folder */}
        {clippings.length === 0 ? (
          <div>
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-surface-2 border border-line text-muted font-mono text-xs">
              <Newspaper className="w-3.5 h-3.5 text-primary" />
              <span>Awaiting image drop in /public/images/media/news/</span>
            </div>

            {/* Masonry of 8 diverse aspect-ratio placeholder tiles */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
              {PLACEHOLDER_ASPECTS.map((aspectClass, idx) => (
                <div
                  key={`placeholder-news-${idx}`}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    className={`relative ${aspectClass} w-full rounded-2xl glass-card border border-line/60 overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none group`}
                  >
                    {/* Background subtle grid & gradient */}
                    <div
                      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-surface-2/40 pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Corner HUD accent */}
                    <div className="pointer-events-none absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-primary/30" />
                    <div className="pointer-events-none absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-primary/30" />

                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-surface-2/80 border border-line flex items-center justify-center text-primary/70">
                        <Newspaper className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-primary/80 uppercase tracking-widest font-semibold">
                        {"// ADD IMAGE: news"}
                      </span>
                      <span className="font-mono text-[10px] text-muted/60">
                        Drop .jpg/.png/.webp in /media/news
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Real Discovered Images in Masonry Grid */
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
            {filteredClippings.map((item, idx) => {
              const isFirstRow = idx < 4;

              return (
                <div
                  key={item.id}
                  className="break-inside-avoid mb-6"
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    aria-label={`Open image: ${item.caption}`}
                    className="group relative w-full block rounded-2xl glass-card border border-line/60 hover:border-primary/60 transition-all duration-300 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {/* Natural aspect ratio image */}
                    <div className="relative w-full overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={1200}
                        height={0}
                        style={{ width: "100%", height: "auto" }}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        priority={isFirstRow}
                        loading={isFirstRow ? "eager" : "lazy"}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />

                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5" />

                      {/* Hover details */}
                      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                        {item.outlet && (
                          <span className="inline-block font-mono text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 font-semibold">
                            {item.outlet}
                          </span>
                        )}
                        <p className="font-sans text-sm font-medium text-white line-clamp-2">
                          {item.caption}
                        </p>
                      </div>

                      {/* Quick view icon badge */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-2/90 border border-line text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                        <Maximize2 className="w-4 h-4 text-primary" />
                      </div>

                      {/* Corner HUD brackets on hover */}
                      <div className="pointer-events-none absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="pointer-events-none absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="pointer-events-none absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="pointer-events-none absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(newIndex) => setLightboxIndex(newIndex)}
      />
    </section>
  );
}
