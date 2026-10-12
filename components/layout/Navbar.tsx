"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "../ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const isInnerPage = pathname !== "/" && pathname !== "";

  const navLinks = [
    { name: "HOME", href: isInnerPage ? "/#home" : "#home" },
    { name: "ABOUT", href: isInnerPage ? "/#about" : "#about" },
    { name: "MEDIA", href: "/media" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CYBER WARRIOR", href: "/cyber-warrior" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (isOpen) {
      const prevBodyOverflow = document.body.style.overflow;
      const prevHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const isLinkActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3.5 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-line lg:py-3"
          : "bg-transparent lg:py-5"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo lockup */}
        <a href={isInnerPage ? "/#home" : "#home"} className="flex items-center gap-3 group z-50 relative">
          <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded bg-transparent">
            <Image src="/ankur logo.webp" alt="Ankur Chandrakant Logo" fill className="object-contain drop-shadow-md" sizes="40px" />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-all relative group flex items-center ${
                  active
                    ? "text-white font-semibold drop-shadow-[0_0_8px_rgba(47,123,255,0.7)]"
                    : "text-muted hover:text-white"
                }`}
              >
                {active && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-cyan shadow-[0_0_8px_#22d3ee] mr-2 animate-pulse" />
                )}
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                    active ? "w-full shadow-[0_0_10px_#2f7bff]" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
          <Button href={isInnerPage ? "/#contact" : "#contact"} variant="primary">LET&apos;S TALK</Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white min-w-[44px] min-h-[44px] flex flex-col justify-center gap-[6px] items-end z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-8"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-6"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-4"}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 h-screen h-dvh bg-bg/95 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center touch-none overscroll-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`font-display text-4xl tracking-wider hover:scale-105 transition-all flex items-center gap-3 ${
                  active
                    ? "text-primary drop-shadow-[0_0_18px_rgba(47,123,255,0.8)]"
                    : "text-muted hover:text-white"
                }`}
              >
                {active && (
                  <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan shadow-[0_0_12px_#22d3ee] animate-pulse" />
                )}
                {link.name}
              </a>
            );
          })}
          <Button href={isInnerPage ? "/#contact" : "#contact"} variant="primary" className="mt-4" onClick={() => setIsOpen(false)}>
            LET&apos;S TALK
          </Button>
        </nav>
      </div>
    </header>
  );
}
