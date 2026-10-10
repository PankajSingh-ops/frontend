"use client";

import { CONTENT } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";

export function ImpactStrip() {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-r from-primary via-accent-cyan to-primary bg-[length:200%_auto] animate-[gradient_8s_ease_infinite]">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/20">
          {CONTENT.impactStrip.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 100}
              className="flex flex-col items-center text-center px-4"
            >
              <span className="font-display text-5xl md:text-6xl text-white mb-2 drop-shadow-md">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs sm:text-sm font-bold text-white/90 uppercase tracking-wider">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
}
