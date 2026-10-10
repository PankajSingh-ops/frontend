"use client";

import { CONTENT, ImageMap } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { MediaImage } from "../ui/MediaImage";

export function ThreeWorlds() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-surface-2 relative border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionHeading className="mb-6 max-w-3xl">
            {CONTENT.threeWorlds.title}
          </SectionHeading>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted text-lg max-w-2xl mb-16">
            {CONTENT.threeWorlds.intro}
          </p>
        </Reveal>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
          {CONTENT.threeWorlds.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={200 + i * 100}
              className="min-w-[80vw] sm:min-w-[40vw] lg:min-w-0 snap-center group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden glass-card cursor-pointer">
                <MediaImage
                  imageKey={card.imageKey as keyof ImageMap}
                  alt={card.title}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display tracking-wide">
                    {card.title}
                  </h3>
                  <div className="w-10 h-1 bg-primary mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100" />
                  <p className="text-sm text-muted opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    {card.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
