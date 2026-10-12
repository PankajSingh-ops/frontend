"use client";

import { CYBER_CONTENT } from "@/lib/cyber-content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ShieldAlert,
  Video,
  Bot,
  Smartphone,
  Landmark,
  Fingerprint,
  Radio,
  AlertTriangle,
} from "lucide-react";

const ICON_MAP = {
  ShieldAlert,
  Video,
  Bot,
  Smartphone,
  Landmark,
  Fingerprint,
};

export function ThreatMatrix() {
  return (
    <section
      id="threat-matrix"
      aria-labelledby="threat-matrix-heading"
      className="py-20 md:py-28 lg:py-36 bg-bg relative overflow-hidden border-b border-line"
    >
      {/* Background Soft Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[130px] rounded-full pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16 max-w-3xl">
            <span className="font-mono text-xs sm:text-sm text-accent-cyan tracking-widest uppercase mb-3 flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              {"// DEPLOYING COUNTERMEASURES"}
            </span>
            <SectionHeading id="threat-matrix-heading" className="text-center">
              <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                KNOW THE THREATS.
              </span>
              <br />
              <span className="text-white">BECOME THE DEFENCE.</span>
            </SectionHeading>
            <p className="text-muted text-sm sm:text-base mt-4 max-w-xl">
              {CYBER_CONTENT.threatMatrix.subheading}
            </p>
          </div>
        </Reveal>

        {/* 6 Threat Cards Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CYBER_CONTENT.threatMatrix.cards.map((threat, idx) => {
            const IconComponent = ICON_MAP[threat.iconName];
            const isCritical = threat.threatLevel === "CRITICAL";

            return (
              <Reveal key={threat.id} delay={idx * 100}>
                <div className="cyber-panel p-6 sm:p-7 rounded-2xl relative overflow-hidden group hover:border-primary/60 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-[0_0_30px_rgba(47,123,255,0.15)]">
                  {/* Laser Scanning Line on hover */}
                  <div
                    className="absolute inset-x-0 -top-24 h-24 bg-gradient-to-b from-transparent via-accent-cyan/15 to-transparent pointer-events-none group-hover:animate-cyber-scan"
                    aria-hidden="true"
                  />

                  {/* Top Bar: Code + Status Tag */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <span className="font-mono text-xs text-accent-cyan tracking-wider font-semibold">
                        {threat.code}
                      </span>
                      <span
                        className={`font-mono text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                          isCritical
                            ? "bg-red-500/15 border border-red-500/30 text-red-400 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                            : "bg-primary/15 border border-primary/30 text-accent-cyan"
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        THREAT LEVEL: {threat.threatLevel}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-2 border border-line flex items-center justify-center text-primary group-hover:text-accent-cyan group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all shrink-0">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl text-white tracking-wide group-hover:text-primary-glow transition-colors">
                        {threat.title}
                      </h3>
                    </div>

                    {/* Description Line */}
                    <p className="text-muted text-sm sm:text-base leading-relaxed">
                      {threat.description}
                    </p>
                  </div>

                  {/* Corner Accent Detail */}
                  <div className="pt-6 mt-6 border-t border-line/60 flex items-center justify-between font-mono text-[11px] text-muted/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan/70" />
                      COUNTERMEASURE ACTIVE
                    </span>
                    <span className="text-primary/80 group-hover:text-accent-cyan transition-colors">
                      [ARMOUR_ON]
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
