"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const prevTriggerRef = useRef<HTMLElement | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handlePrev = useCallback(() => {
    if (currentIndex === null || total <= 1) return;
    const nextIdx = (currentIndex - 1 + total) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex === null || total <= 1) return;
    const nextIdx = (currentIndex + 1) % total;
    onNavigate(nextIdx);
  }, [currentIndex, total, onNavigate]);

  // Save previously focused element to restore on close
  useEffect(() => {
    if (isOpen) {
      prevTriggerRef.current = document.activeElement as HTMLElement;
      // Focus close button on open
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Lock body scroll
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        prevTriggerRef.current?.focus();
      };
    }
  }, [isOpen]);

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Tab") {
        // Focus trap inside lightbox
        if (!overlayRef.current) return;
        const focusableElements = overlayRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    // Minimum swipe threshold 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentImage) return null;

  const prevIdx = (currentIndex - 1 + total) % total;
  const nextIdx = (currentIndex + 1) % total;
  const prevImage = total > 1 ? images[prevIdx] : null;
  const nextImage = total > 1 ? images[nextIdx] : null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-2xl transition-all duration-300 animate-fadeIn select-none"
    >
      {/* Background click to close */}
      <div
        className="absolute inset-0 cursor-zoom-out"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Preload adjacent images */}
      {prevImage && (
        <link rel="prefetch" href={prevImage.src} as="image" />
      )}
      {nextImage && (
        <link rel="prefetch" href={nextImage.src} as="image" />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-bg/90 to-transparent pointer-events-auto">
        <div className="font-mono text-xs sm:text-sm text-accent-cyan tracking-wider flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
          <span>
            {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          {currentImage.category && (
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-surface-2 border border-line text-[11px] uppercase text-muted">
              {currentImage.category}
            </span>
          )}
        </div>

        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-surface-2/80 hover:bg-surface-2 border border-line text-white hover:text-accent-cyan hover:border-primary/50 transition-all cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation: Prev Button */}
      {total > 1 && (
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center rounded-full bg-surface-2/80 hover:bg-surface-2 border border-line text-white hover:text-accent-cyan hover:border-primary/50 transition-all cursor-pointer shadow-xl backdrop-blur-md active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Center Image Container */}
      <div
        className="relative z-10 max-w-[90vw] max-h-[75vh] sm:max-h-[80vh] flex flex-col items-center justify-center p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden border border-line/60 shadow-[0_0_50px_rgba(47,123,255,0.2)] bg-surface max-w-full max-h-full">
          <Image
            src={currentImage.src}
            alt={currentImage.alt || currentImage.caption || "Gallery image"}
            width={1200}
            height={0}
            priority
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 1200px"
            className="w-auto h-auto max-w-[90vw] max-h-[68vh] sm:max-h-[74vh] object-contain block mx-auto transition-transform duration-300"
          />
        </div>

        {/* Caption */}
        {currentImage.caption && (
          <div className="mt-4 px-4 py-2 rounded-xl bg-surface-2/80 border border-line/60 backdrop-blur-md text-center max-w-xl">
            <p className="font-sans text-xs sm:text-sm text-text font-medium leading-relaxed">
              {currentImage.caption}
            </p>
          </div>
        )}
      </div>

      {/* Navigation: Next Button */}
      {total > 1 && (
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 min-w-[44px] min-h-[44px] w-12 h-12 flex items-center justify-center rounded-full bg-surface-2/80 hover:bg-surface-2 border border-line text-white hover:text-accent-cyan hover:border-primary/50 transition-all cursor-pointer shadow-xl backdrop-blur-md active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Bottom Keyboard hint */}
      <div className="hidden sm:block absolute bottom-4 inset-x-0 text-center font-mono text-[11px] text-muted/60 pointer-events-none">
        Use Arrow keys to navigate · Esc to close · Swipe on mobile
      </div>
    </div>
  );
}
