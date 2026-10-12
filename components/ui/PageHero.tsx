"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  ghostWord: string;
  intro: string;
  breadcrumbLabel: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  ghostWord,
  intro,
  breadcrumbLabel,
  children,
  className = "",
}: PageHeroProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const deltaX = (e.clientX - centerX) / centerX;
      const deltaY = (e.clientY - centerY) / centerY;

      rafId = requestAnimationFrame(() => {
        setOffset({
          x: deltaX * 18,
          y: deltaY * 12,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header
      className={`relative pt-32 sm:pt-36 md:pt-40 pb-16 sm:pb-20 md:pb-24 overflow-hidden border-b border-line/60 ${className}`}
    >
      {/* Background Grid & Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-10"
        aria-hidden="true"
      >
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.06)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

        {/* Ambient Electric Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-primary/18 rounded-full blur-[110px]" />
        <div className="absolute top-1/3 left-1/4 w-[280px] h-[280px] bg-accent-cyan/10 rounded-full blur-[90px]" />

        {/* Scanline line overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.25)_51%)] bg-[size:100%_4px] opacity-30 pointer-events-none" />
      </div>

      {/* Ghost Outline Word with Parallax Drift */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-0 select-none overflow-hidden max-w-full"
        aria-hidden="true"
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
          transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <span className="block font-display text-[5rem] sm:text-[9rem] md:text-[13rem] lg:text-[17rem] uppercase tracking-wider text-stroke opacity-15 md:opacity-20 whitespace-nowrap">
          {ghostWord}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb Navigation */}
        <Reveal delay={50}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-mono text-xs text-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5 text-line" />
              </li>
              <li className="text-white font-medium" aria-current="page">
                {breadcrumbLabel}
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Eyebrow Label */}
        <Reveal delay={100}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2/80 border border-line text-primary font-mono text-xs sm:text-sm tracking-widest uppercase mb-4 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>{eyebrow}</span>
          </div>
        </Reveal>

        {/* Main H1 Title */}
        <Reveal delay={150}>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight uppercase leading-[0.95] mb-6 drop-shadow-sm">
            {title}
          </h1>
        </Reveal>

        {/* Intro Paragraph */}
        <Reveal delay={200}>
          <p className="font-sans text-muted text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            {intro}
          </p>
        </Reveal>

        {/* Optional Stat Chips or Custom Children */}
        {children && (
          <Reveal delay={250} className="mt-8">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  );
}
