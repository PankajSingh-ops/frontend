"use client";

import { PageHero } from "@/components/ui/PageHero";
import { CountUp } from "@/components/ui/CountUp";
import { MEDIA_OUTLETS } from "@/lib/media-content";
import { Newspaper, Users, Globe2 } from "lucide-react";

export function MediaHero() {
  const outletCount = MEDIA_OUTLETS.length;

  return (
    <PageHero
      eyebrow="// PRESS & MEDIA"
      title="MEDIA"
      ghostWord="PRESS"
      intro="From national newspapers to news channels, Ankur's work on cybersecurity, digital safety and social change has been featured across India's leading media."
      breadcrumbLabel="Media"
    >
      {/* Stat Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl">
        {/* Outlets Count */}
        <div className="glass-card p-4 rounded-xl border border-line flex items-center gap-3.5 hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Newspaper className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-white tracking-wide flex items-center">
              <CountUp end={outletCount} suffix="+" />
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-muted uppercase tracking-wider">
              National Outlets
            </div>
          </div>
        </div>

        {/* Monthly Reach */}
        <div className="glass-card p-4 rounded-xl border border-line flex items-center gap-3.5 hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-white tracking-wide">
              5-6M+
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-muted uppercase tracking-wider">
              Monthly Reach
            </div>
          </div>
        </div>

        {/* Followers */}
        <div className="glass-card p-4 rounded-xl border border-line flex items-center gap-3.5 hover:border-primary/50 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display text-2xl sm:text-3xl text-white tracking-wide flex items-center">
              <CountUp end={185} suffix="K+" />
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-muted uppercase tracking-wider">
              Followers
            </div>
          </div>
        </div>
      </div>
    </PageHero>
  );
}
