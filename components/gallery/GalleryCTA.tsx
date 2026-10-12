"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Shield, Newspaper, ArrowRight } from "lucide-react";

export function GalleryCTA() {
  return (
    <section
      aria-label="Continue Mission"
      className="relative py-20 md:py-28 overflow-hidden bg-bg"
    >
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/12 rounded-full blur-[130px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl glass-card border border-line p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            {/* Background grid accent */}
            <div
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(120,160,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,160,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Corner HUD accents */}
            <div className="pointer-events-none absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="pointer-events-none absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-primary" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-mono text-xs sm:text-sm text-primary tracking-widest uppercase mb-4">
                {"// BECOME PART OF THE CHRONICLE"}
              </span>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase max-w-2xl leading-tight mb-5">
                Protecting India&apos;s Digital Frontier
              </h2>

              <p className="font-sans text-muted text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                Whether you want to train as a cyber defense cadet or examine our investigative media coverage, the journey continues.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button
                  href="/cyber-warrior"
                  variant="primary"
                  className="gap-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Join the Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button
                  href="/media"
                  variant="outline"
                  className="gap-2"
                >
                  <Newspaper className="w-4 h-4 text-primary" />
                  <span>See Press Coverage</span>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
