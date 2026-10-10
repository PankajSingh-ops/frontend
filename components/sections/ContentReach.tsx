"use client";

import { CONTENT, LINKS } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { CountUp } from "../ui/CountUp";
import { MediaImage } from "../ui/MediaImage";

export function ContentReach() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Content */}
        <div>
          <Reveal>
            <SectionHeading className="mb-6">
              {CONTENT.contentReach.title}
            </SectionHeading>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-muted text-lg mb-10 max-w-lg">
              {CONTENT.contentReach.copy}
            </p>
          </Reveal>

          <div className="flex gap-10 mb-10">
            {CONTENT.contentReach.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={200 + i * 100}>
                <div className="flex flex-col">
                  <span className="font-display text-5xl text-white mb-1">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-sm font-medium text-primary uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="flex flex-wrap gap-4">
              <Button href={LINKS.instagram} variant="primary">
                Follow on Instagram
              </Button>
              <Button href={LINKS.youtube} variant="outline">
                Subscribe on YouTube
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Right: Phone Mockup */}
        <div className="relative flex items-center justify-center min-h-[500px]">
          {/* Decorative background cards */}
          <Reveal
            delay={200}
            className="absolute w-[200px] h-[300px] bg-surface-2 border border-line rounded-2xl rotate-[-15deg] -translate-x-16 -translate-y-12 opacity-50 blur-[2px]"
          />
          <Reveal
            delay={300}
            className="absolute w-[200px] h-[300px] bg-surface-2 border border-line rounded-2xl rotate-[15deg] translate-x-20 translate-y-12 opacity-50 blur-[2px]"
          />

          <Reveal
            delay={500}
            className="relative z-10 w-[260px] h-[540px] bg-black rounded-[40px] border-[6px] border-surface-2 shadow-2xl overflow-hidden animate-[float_5s_ease-in-out_infinite_alternate] flex"
          >
            {/* Phone Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-surface-2 w-32 mx-auto rounded-b-xl z-20" />
            <MediaImage imageKey="instagramPhone" alt="Instagram content" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
