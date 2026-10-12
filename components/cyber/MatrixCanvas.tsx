"use client";

import { useEffect, useRef } from "react";

export function MatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches || window.innerWidth < 640) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lastDrawTime = 0;
    const fps = 28; // Throttled to 28fps for battery efficiency
    const interval = 1000 / fps;
    let isVisible = true;
    let isTabActive = true;

    // Characters: hex, binary, and cyber glyphs
    const chars = "0101010123456789ABCDEF01X#<>{}[]::ΔΩ".split("");
    const fontSize = 14;
    let columns = 0;
    let drops: number[] = [];

    const handleResize = () => {
      if (window.innerWidth < 640 || !canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / (fontSize * 1.5));
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }
    };

    handleResize();

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (!isVisible || !isTabActive) return;

      const delta = currentTime - lastDrawTime;
      if (delta < interval) return;
      lastDrawTime = currentTime - (delta % interval);

      // Trailing phosphor fade effect
      ctx.fillStyle = "rgba(6, 13, 26, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize * 1.5;
        const y = drops[i] * fontSize;

        const isLeadingChar = Math.random() > 0.88;
        if (isLeadingChar) {
          ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
        } else {
          ctx.fillStyle = "rgba(47, 123, 255, 0.16)";
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    if (containerRef.current) observer.observe(containerRef.current);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Static cyber grid fallback on mobile & reduced motion */}
      <div className="absolute inset-0 opacity-20 block sm:hidden motion-reduce:block bg-[linear-gradient(to_right,rgba(47,123,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,123,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <canvas ref={canvasRef} className="absolute inset-0 hidden sm:block motion-reduce:hidden w-full h-full" />
      {/* Vignette and scanlines overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(6,13,26,0.85)_85%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none opacity-25" />
    </div>
  );
}
