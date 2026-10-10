import { CONTENT, ImageMap } from "@/lib/content";
import { MediaImage } from "../ui/MediaImage";

export function MediaMarquee() {
  const repeatedLogos = [...CONTENT.mediaOutlets, ...CONTENT.mediaOutlets];

  return (
    <section className="py-8 bg-surface-2 border-y border-line overflow-hidden flex flex-col items-center">
      <p className="text-xs text-muted font-medium tracking-widest uppercase mb-6">
        As featured in
      </p>
      <div className="relative w-full flex group">
        {/* Fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-2 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-2 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 min-w-max animate-marquee group-hover:[animation-play-state:paused] items-center">
          {repeatedLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="opacity-50 hover:opacity-100 transition-opacity flex items-center justify-center grayscale hover:grayscale-0"
            >
              <div className="w-[120px] h-[40px] relative flex items-center justify-center">
                <MediaImage
                  imageKey={logo.imageKey as keyof ImageMap}
                  alt={logo.name}
                  fill={false}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
