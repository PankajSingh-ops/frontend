"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Mail, ArrowRight, Radio } from "lucide-react";

export function MediaCTA() {
  const mediaEmail = "info@ankurchandrakant.com";

  return (
    <section
      aria-label="Media Inquiries Contact"
      className="relative py-20 md:py-28 border-t border-line/40 overflow-hidden bg-bg"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/15 rounded-full blur-[130px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative rounded-3xl glass-card border border-primary/30 p-8 sm:p-12 md:p-16 text-center overflow-hidden shadow-[0_0_50px_rgba(47,123,255,0.08)]">
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-2 border border-line text-primary font-mono text-xs uppercase tracking-widest mb-6">
                <Radio className="w-3.5 h-3.5 animate-pulse text-accent-cyan" />
                <span>FOR MEDIA ENQUIRIES</span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-wide uppercase max-w-2xl leading-tight mb-5">
                Press Briefings & Keynote Inquiries
              </h2>

              <p className="font-sans text-muted text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
                For interview requests, expert commentary on cyber incidents, panel moderation, or feature profiles, reach out directly to the communications desk.
              </p>

              {/* Direct Mailto Badge */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href={`mailto:${mediaEmail}`}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-surface-2/80 hover:bg-surface-2 border border-line hover:border-primary/50 text-white font-mono text-sm tracking-wide transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{mediaEmail}</span>
                </a>

                <Button
                  href={`mailto:${mediaEmail}?subject=Media%20Enquiry%20-%20Ankur%20Chandrakant`}
                  variant="primary"
                  className="gap-2"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
