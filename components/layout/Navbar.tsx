"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";

const navLinks = [
  { name: "HOME", href: "#home" },
  { name: "ABOUT", href: "#about" },
  { name: "MEDIA", href: "#media" },
  { name: "GALLERY", href: "#gallery" },
  { name: "CYBER WARRIOR", href: "#cyber-warrior" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-bg/80 backdrop-blur-md border-b border-line py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo lockup */}
        <a href="#home" className="flex items-center gap-3 group z-50 relative">
          <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded bg-transparent">
            <Image src="/ankur logo.webp" alt="Ankur Chandrakant Logo" fill className="object-contain drop-shadow-md" sizes="40px" />
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
          <Button href="#contact" variant="primary">LET&apos;S TALK</Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white min-w-[44px] min-h-[44px] flex flex-col justify-center gap-[6px] items-end z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 rotate-45 translate-y-[8px]" : "w-8"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-6"}`} />
          <span className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-6 -rotate-45 -translate-y-[8px]" : "w-4"}`} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-bg/95 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-4xl tracking-wider text-muted hover:text-white hover:scale-105 transition-all"
            >
              {link.name}
            </a>
          ))}
          <Button href="#contact" variant="primary" className="mt-4" onClick={() => setIsOpen(false)}>
            LET&apos;S TALK
          </Button>
        </nav>
      </div>
    </header>
  );
}
