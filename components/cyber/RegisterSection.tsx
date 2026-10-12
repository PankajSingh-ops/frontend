"use client";

import { CYBER_CONTENT } from "@/lib/cyber-content";
import { RegisterForm } from "./RegisterForm";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";
import { SectionHeading } from "../ui/SectionHeading";
import { Shield, CheckCircle2, Zap } from "lucide-react";

export function RegisterSection() {
  return (
    <section
      id="register"
      aria-labelledby="register-section-heading"
      className="py-20 md:py-28 lg:py-36 bg-bg relative overflow-hidden"
    >
      {/* Background radial glow */}
      <div
        className="absolute bottom-10 right-1/4 w-[600px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Mission Briefing (Sticky on lg) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <Reveal>
              <div className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm text-accent-cyan tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  {"// RECRUITMENT PROTOCOL INITIATED"}
                </span>

                <SectionHeading id="register-section-heading" className="mb-4 text-left">
                  <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                    MISSION
                  </span>
                  <br />
                  <span className="text-white">BRIEFING</span>
                </SectionHeading>

                <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">
                  India is facing a surge in high-velocity cyber extortion. Project Cyber Warriors arms you with practical, verified knowledge to secure your personal data, bank accounts, and loved ones.
                </p>

                {/* Seats Claimed HUD Counter Widget */}
                <div className="cyber-panel p-6 rounded-2xl mb-8 relative overflow-hidden">
                  <div className="flex items-center justify-between font-mono text-xs text-muted mb-2">
                    <span className="text-accent-cyan font-bold">SEATS CLAIMED (90 DAYS)</span>
                    <span className="flex items-center gap-1.5 text-highlight">
                      <span className="w-2 h-2 rounded-full bg-highlight animate-ping" />
                      LIVE
                    </span>
                  </div>

                  <div className="font-display text-4xl sm:text-5xl text-white tracking-wide mb-1 flex items-baseline">
                    <CountUp end={103} suffix="K+" />
                    <span className="text-sm font-mono text-muted ml-3">/ 1,000,000 GOAL</span>
                  </div>

                  <div className="w-full bg-surface-2 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-primary to-accent-cyan h-full w-[10.3%] rounded-full shadow-[0_0_8px_#22d3ee]" />
                  </div>
                </div>

                {/* 3 Benefit Lines */}
                <div className="flex flex-col gap-4 mb-8">
                  {CYBER_CONTENT.form.briefingPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-3.5 rounded-xl bg-surface/50 border border-line/60"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                      <span className="text-sm text-text/90 font-medium leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Hologram / Shield Orbital Graphic */}
                <div
                  className="w-full h-44 rounded-2xl bg-surface/40 border border-line relative overflow-hidden flex items-center justify-center"
                  aria-hidden="true"
                >
                  {/* Concentric rotating orbital rings */}
                  <div className="absolute w-36 h-36 rounded-full border border-primary/25 animate-radar-sweep [animation-duration:12s]" />
                  <div className="absolute w-28 h-28 rounded-full border border-accent-cyan/20 border-dashed animate-radar-sweep [animation-duration:6s] [animation-direction:reverse]" />
                  <div className="absolute w-20 h-20 rounded-full bg-primary/10 blur-md" />

                  {/* Holographic Shield Center */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-surface-2/90 border border-primary-glow flex items-center justify-center text-accent-cyan shadow-[0_0_20px_rgba(47,123,255,0.4)]">
                    <Shield className="w-8 h-8" />
                  </div>

                  {/* Corner tags */}
                  <span className="absolute bottom-2 left-3 font-mono text-[10px] text-muted">
                    TBPS_DEFENCE_LABS
                  </span>
                  <span className="absolute top-2 right-3 font-mono text-[10px] text-accent-cyan">
                    HOLO_SCAN: PASS
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Registration Form Card */}
          <div className="lg:col-span-7 w-full">
            <Reveal delay={150}>
              <RegisterForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
