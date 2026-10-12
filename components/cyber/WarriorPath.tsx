"use client";

import { useEffect, useRef, useState } from "react";
import { CYBER_CONTENT } from "@/lib/cyber-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { UserCheck, BookOpen, ShieldAlert, Share2, Compass } from "lucide-react";

const STEP_ICONS = [UserCheck, BookOpen, ShieldAlert, Share2];

export function WarriorPath() {
  const sectionRef = useRef<HTMLElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress between entering viewport and leaving
      const totalScrollable = rect.height + windowHeight;
      const currentScroll = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / (totalScrollable * 0.75)));
      setLineProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="warrior-path"
      ref={sectionRef}
      aria-labelledby="warrior-path-heading"
      className="py-20 md:py-28 lg:py-36 bg-surface-2/30 relative border-b border-line overflow-hidden"
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl">
            <span className="font-mono text-xs sm:text-sm text-accent-cyan tracking-widest uppercase mb-3 flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              {"// 4-STAGE RECRUITMENT PROTOCOL"}
            </span>
            <SectionHeading id="warrior-path-heading" className="text-center">
              <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                YOUR PATH TO BECOME
              </span>
              <br />
              <span className="text-white">A CYBER WARRIOR</span>
            </SectionHeading>
            <p className="text-muted text-sm sm:text-base mt-4 max-w-xl">
              {CYBER_CONTENT.warriorPath.subheading}
            </p>
          </div>
        </Reveal>

        {/* Desktop Horizontal Path (lg+) */}
        <div className="hidden lg:block w-full relative mb-12">
          {/* Background Track Line */}
          <div
            className="absolute top-[48px] left-[10%] right-[10%] h-[2px] bg-line/60 -z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Animated Progress Line */}
          <div
            className="absolute top-[48px] left-[10%] h-[2px] bg-gradient-to-r from-primary via-primary-glow to-accent-cyan transition-all duration-300 ease-out -z-0 shadow-[0_0_12px_#2f7bff] pointer-events-none"
            style={{ width: `${lineProgress * 80}%` }}
            aria-hidden="true"
          />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-4 gap-8 relative z-10">
            {CYBER_CONTENT.warriorPath.steps.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx];
              const isPassed = lineProgress >= (idx + 0.5) / 4;

              return (
                <Reveal key={step.step} delay={idx * 150} className="flex flex-col items-center text-center">
                  {/* Step Node Circle */}
                  <div
                    className={`w-24 h-24 rounded-2xl p-1 mb-8 transition-all duration-500 relative flex items-center justify-center ${
                      isPassed
                        ? "bg-primary/20 border-2 border-accent-cyan shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                        : "bg-surface-2 border border-line"
                    }`}
                  >
                    <div className="w-full h-full rounded-xl bg-surface flex flex-col items-center justify-center relative overflow-hidden">
                      <StepIcon
                        className={`w-7 h-7 mb-1 transition-colors ${
                          isPassed ? "text-accent-cyan" : "text-muted"
                        }`}
                      />
                      <span className="font-mono text-[10px] text-muted font-bold">
                        0{step.step}
                      </span>
                    </div>

                    {/* Glowing pulse ring for active/passed node */}
                    {isPassed && (
                      <span className="absolute -inset-1 rounded-2xl border border-accent-cyan/40 animate-ping pointer-events-none" />
                    )}
                  </div>

                  {/* Card Info */}
                  <div className="cyber-panel p-6 rounded-2xl w-full h-full flex flex-col items-center justify-between border-t-2 border-t-primary/30">
                    <span className="font-mono text-xs text-accent-cyan font-semibold mb-2">
                      {step.code}
                    </span>
                    <h3 className="font-display text-2xl text-white tracking-wide mb-1">
                      {step.title}
                    </h3>
                    <p className="font-mono text-xs text-muted mb-3 font-medium">
                      {step.tagline}
                    </p>
                    <p className="text-sm text-muted/90 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile & Tablet Vertical Path (< lg) */}
        <div className="lg:hidden w-full max-w-lg relative pl-8 sm:pl-10">
          {/* Vertical Track Line */}
          <div
            className="absolute top-6 bottom-6 left-4 sm:left-5 w-[2px] bg-line/60 -z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Vertical Animated Progress Line */}
          <div
            className="absolute top-6 left-4 sm:left-5 w-[2px] bg-gradient-to-b from-primary via-primary-glow to-accent-cyan transition-all duration-300 ease-out -z-0 shadow-[0_0_12px_#2f7bff] pointer-events-none"
            style={{ height: `${lineProgress * 90}%` }}
            aria-hidden="true"
          />

          {/* Vertical Steps List */}
          <div className="flex flex-col gap-8">
            {CYBER_CONTENT.warriorPath.steps.map((step, idx) => {
              const StepIcon = STEP_ICONS[idx];
              const isPassed = lineProgress >= (idx + 0.3) / 4;

              return (
                <Reveal key={step.step} delay={idx * 100}>
                  <div className="relative">
                    {/* Node Dot on vertical line */}
                    <div
                      className={`absolute -left-8 sm:-left-10 top-6 -translate-x-1/2 w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isPassed
                          ? "bg-primary border border-accent-cyan text-white shadow-[0_0_15px_#2f7bff]"
                          : "bg-surface-2 border border-line text-muted"
                      }`}
                    >
                      <span className="font-mono text-xs font-bold">
                        0{step.step}
                      </span>
                    </div>

                    {/* Step Card */}
                    <div className="cyber-panel p-5 sm:p-6 rounded-2xl ml-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-accent-cyan">
                          <StepIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="font-mono text-[11px] text-accent-cyan font-semibold block">
                            {step.code}
                          </span>
                          <h3 className="font-display text-xl text-white tracking-wide">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="font-mono text-xs text-muted mb-2 font-medium">
                        {step.tagline}
                      </p>
                      <p className="text-sm text-muted/90 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
