"use client";

import { useRef, useState, useEffect } from "react";

export function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({});
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Respect reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const card = cardRef.current;
    if (!card) return;

    let requestRef: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt (max 6deg)
      const tiltX = ((centerY - y) / centerY) * 6;
      const tiltY = ((x - centerX) / centerX) * 6;

      requestRef = requestAnimationFrame(() => {
        setTiltStyle({
          transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.04, 1.04, 1.04)`,
          "--x": `${x}px`,
          "--y": `${y}px`,
        });
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      requestAnimationFrame(() => {
        setTiltStyle({
          transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        });
      });
    };

    // Only apply on desktop (fine pointer)
    const isDesktop = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (isDesktop) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (isDesktop) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (requestRef) cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative transition-transform duration-300 ease-out will-change-transform z-10 ${className}`}
      style={{
        ...tiltStyle,
        zIndex: isHovering ? 20 : 10,
      }}
    >
      {/* Spotlight and sweep layers */}
      <div
        className="pointer-events-none absolute inset-0 z-50 rounded-3xl opacity-0 transition-opacity duration-300 ease-in-out mix-blend-overlay"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />
      <div
        className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl opacity-0 transition-opacity duration-300 ease-in-out"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), rgba(47,123,255,0.8), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
