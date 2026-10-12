"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { GalleryItem } from "@/lib/gallery-data";
import { GALLERY_CATEGORIES } from "@/lib/gallery-content";
import { FilterTabs, TabItem } from "@/components/ui/FilterTabs";
import { Lightbox, LightboxImage } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import { Maximize2, Image as ImageIcon, ChevronDown } from "lucide-react";

interface GalleryGridProps {
  allImages: Record<string, GalleryItem[]>;
  initialCategory?: string;
  externalLightboxItem?: GalleryItem | null;
  onClearExternalLightbox?: () => void;
}

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

const INITIAL_VISIBLE_COUNT = 24;

export function GalleryGrid({
  allImages,
  initialCategory = "all",
  externalLightboxItem = null,
  onClearExternalLightbox,
}: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all items for "all" category
  const allFlattened = useMemo(() => {
    const list: GalleryItem[] = [];
    Object.values(allImages).forEach((items) => {
      list.push(...items);
    });
    return list;
  }, [allImages]);

  // Build filter tabs with real count numbers
  const tabs: TabItem[] = useMemo(() => {
    return GALLERY_CATEGORIES.map((cat) => {
      const count =
        cat.id === "all"
          ? allFlattened.length
          : (allImages[cat.id] || []).length;
      return {
        id: cat.id,
        label: cat.label,
        count,
      };
    });
  }, [allFlattened.length, allImages]);

  // Active items based on selected category
  const currentCategoryItems = useMemo(() => {
    if (activeCategory === "all") {
      return allFlattened;
    }
    return allImages[activeCategory] || [];
  }, [activeCategory, allFlattened, allImages]);

  // Current category metadata
  const currentCategoryMeta = useMemo(() => {
    return (
      GALLERY_CATEGORIES.find((c) => c.id === activeCategory) ||
      GALLERY_CATEGORIES[0]
    );
  }, [activeCategory]);

  // Sliced items for client-side pagination
  const visibleItems = useMemo(() => {
    return currentCategoryItems.slice(0, visibleCount);
  }, [currentCategoryItems, visibleCount]);

  const hasMore = visibleCount < currentCategoryItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + INITIAL_VISIBLE_COUNT);
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  // Lightbox dataset
  const lightboxImages: LightboxImage[] = useMemo(() => {
    return currentCategoryItems.map((item) => ({
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      category: item.category,
    }));
  }, [currentCategoryItems]);

  // Handle external lightbox request from Showcase
  const activeLightboxIndex = useMemo(() => {
    if (externalLightboxItem) {
      const foundIdx = lightboxImages.findIndex(
        (img) => img.src === externalLightboxItem.src
      );
      return foundIdx !== -1 ? foundIdx : 0;
    }
    return lightboxIndex;
  }, [externalLightboxItem, lightboxImages, lightboxIndex]);

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
    onClearExternalLightbox?.();
  };

  return (
    <section
      aria-labelledby="gallery-grid-heading"
      className="relative py-20 md:py-28 overflow-hidden bg-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-2 mb-8">
            <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase">
              {"// VISUAL CHRONICLES"}
            </span>
            <h2
              id="gallery-grid-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase"
            >
              Archive & Catalog
            </h2>
            <p className="font-sans text-muted text-sm sm:text-base max-w-2xl">
              {currentCategoryMeta.description}
            </p>
          </div>
        </Reveal>

        {/* Filter Tabs */}
        <div className="mb-12">
          <FilterTabs
            tabs={tabs}
            activeTab={activeCategory}
            onChange={handleCategoryChange}
            ariaLabel="Gallery Categories"
          />
        </div>

        {/* When Category Has NO Images: Render 8 Beautiful Placeholders */}
        {currentCategoryItems.length === 0 ? (
          <div>
            <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-line text-muted font-mono text-xs">
              <ImageIcon className="w-3.5 h-3.5 text-primary" />
              <span>
                Awaiting images in /public/images/gallery/
                {activeCategory === "all" ? "[categories]" : activeCategory}/
              </span>
            </div>

            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
              {PLACEHOLDER_ASPECTS.map((aspectClass, idx) => (
                <div
                  key={`placeholder-grid-${idx}`}
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
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-xs text-primary/90 uppercase tracking-widest font-semibold">
                        {`// ADD IMAGE: ${activeCategory === "all" ? "gallery" : activeCategory}`}
                      </span>
                      <span className="font-mono text-[10px] text-muted/60">
                        PNG / JPG / WEBP / AVIF
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Real Discovered Images Masonry Grid */
          <div>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
              {visibleItems.map((item, idx) => {
                const isFirstRow = idx < 4;

                return (
                  <div
                    key={item.id}
                    className="break-inside-avoid mb-6 transition-all duration-300"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      aria-label={`Open image: ${item.caption}`}
                      className="group relative w-full block rounded-2xl glass-card border border-line/60 hover:border-primary/60 transition-all duration-300 overflow-hidden text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                    >
                      {/* Natural Aspect Ratio Image */}
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

                        {/* Hover Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5" />

                        {/* Hover Caption Details */}
                        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10">
                          <span className="inline-block font-mono text-[10px] text-primary bg-primary/10 border border-primary/25 px-2 py-0.5 rounded uppercase tracking-wider mb-1.5 font-semibold">
                            {item.category}
                          </span>
                          <p className="font-sans text-sm font-medium text-white line-clamp-2">
                            {item.caption}
                          </p>
                        </div>

                        {/* Maximize Icon Badge */}
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-2/90 border border-line text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                          <Maximize2 className="w-4 h-4 text-primary" />
                        </div>

                        {/* Corner HUD Brackets appearing on hover */}
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

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 text-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-surface-2 hover:bg-surface-2/80 border border-line hover:border-primary/50 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer hover:shadow-[0_0_25px_rgba(47,123,255,0.2)]"
                >
                  <span>Load More Images</span>
                  <ChevronDown className="w-4 h-4 text-primary" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={
          externalLightboxItem
            ? [
                {
                  src: externalLightboxItem.src,
                  alt: externalLightboxItem.alt,
                  caption: externalLightboxItem.caption,
                  category: externalLightboxItem.category,
                },
              ]
            : lightboxImages
        }
        currentIndex={activeLightboxIndex}
        onClose={handleCloseLightbox}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </section>
  );
}
