"use client";

import { useEffect, useRef, useState } from "react";
import { CYBER_CONTENT } from "@/lib/cyber-content";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { SectionHeading } from "../ui/SectionHeading";
import { Target, TrendingUp, ShieldCheck } from "lucide-react";

export function MissionStats() {
  const [progressWidth, setProgressWidth] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate progress bar fill to 10.3%
          setTimeout(() => {
            setProgressWidth(CYBER_CONTENT.mission.progressPercentage);
          }, 300);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mission-stats"
      ref={sectionRef}
      aria-labelledby="mission-stats-heading"
      className="py-20 md:py-28 bg-surface/30 relative border-y border-line overflow-hidden"
    >
      {/* Background cyber grid */}
      <div
        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(47,123,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,123,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <span className="font-mono text-xs sm:text-sm text-accent-cyan tracking-widest uppercase mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              {"// REAL-TIME IMPACT DASHBOARD"}
            </span>
            <SectionHeading id="mission-stats-heading" className="text-center">
              <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                MISSION METRICS
              </span>{" "}
              <span className="text-white">&amp; TRAJECTORY</span>
            </SectionHeading>
          </div>
        </Reveal>

        {/* 1,000,000 Target Progress HUD Card */}
        <Reveal delay={150} className="w-full max-w-4xl mb-12">
          <div className="cyber-panel-glow p-6 sm:p-8 rounded-2xl relative overflow-hidden">
            {/* Top HUD info bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary-glow">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide">
                    1,000,000 MISSION TARGET
                  </h3>
                  <p className="font-mono text-xs text-muted">
                    {CYBER_CONTENT.mission.progressLabel}: Nationwide recruitment phase 1
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 font-mono text-right">
                <div>
                  <div className="text-accent-cyan text-lg sm:text-xl font-bold">
                    103,000 / 1,000,000
                  </div>
                  <div className="text-xs text-muted flex items-center justify-end gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-accent-cyan" />
                    <span>10.3% ENLISTED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-surface-2/90 border border-line rounded-xl h-6 sm:h-7 p-1 relative overflow-hidden">
              {/* Animated Fill Bar */}
              <div
                className="h-full rounded-lg bg-gradient-to-r from-primary via-primary-glow to-accent-cyan relative transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                style={{ width: `${progressWidth}%` }}
              >
                {/* Glowing leading scan point */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-r-lg shadow-[0_0_10px_#ffffff]" />
              </div>
            </div>

            {/* Progress Milestone Markers */}
            <div className="flex justify-between font-mono text-[11px] sm:text-xs text-muted mt-3">
              <span>0 (START)</span>
              <span className="text-accent-cyan font-semibold">103K (CURRENT)</span>
              <span>500K</span>
              <span>1 MILLION (GOAL)</span>
            </div>
          </div>
        </Reveal>

        {/* 6 Grid Metric Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CYBER_CONTENT.mission.stats.map((stat, idx) => (
            <Reveal key={stat.id} delay={100 + idx * 75}>
              <div
                className={`cyber-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden group hover:border-primary/50 transition-all duration-300 h-full flex flex-col justify-between ${
                  stat.highlight ? "border-primary/40 bg-surface-2/70 shadow-[0_0_25px_rgba(47,123,255,0.12)]" : ""
                }`}
              >
                {/* Corner indicator */}
                <div className="flex items-center justify-between font-mono text-xs text-muted mb-4">
                  <span className="text-accent-cyan tracking-wider">
                    {`SYS // 0${idx + 1}`}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 group-hover:bg-accent-cyan group-hover:shadow-[0_0_6px_#22d3ee] transition-all" />
                </div>

                {/* Metric Display */}
                <div>
                  <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide mb-2 group-hover:text-primary-glow transition-colors flex items-baseline">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-text mb-2">
                    {stat.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {stat.detail}
                  </p>
                </div>

                {/* Bottom subtle accent line */}
                <div className="w-full h-[1px] bg-line group-hover:bg-primary/50 transition-colors mt-6" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
