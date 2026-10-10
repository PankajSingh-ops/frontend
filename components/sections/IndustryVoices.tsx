import { CONTENT, ImageMap } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TiltCard } from "../ui/TiltCard";
import { MediaImage } from "../ui/MediaImage";

export function IndustryVoices() {
  return (
    <section
      aria-labelledby="industry-voices-heading"
      className="py-20 md:py-28 lg:py-36 bg-bg relative overflow-hidden border-y border-line"
    >
      {/* Giant Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none opacity-[0.03] z-0">
        <h2 className="font-display text-[22vw] leading-none text-stroke text-transparent whitespace-nowrap">
          VOICES
        </h2>
      </div>

      {/* Radial soft blue glow behind the whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <Reveal>
          <SectionHeading
            id="industry-voices-heading"
            className="mb-16 text-center"
          >
            <span className="bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
              Words from
            </span>
            <br />
            <span className="text-white">Industry People</span>
          </SectionHeading>
        </Reveal>

        {/* Carousel / Grid container */}
        <div className="w-full flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 pb-8 snap-x snap-mandatory hide-scrollbar group/section">
          {CONTENT.industryVoices.map((voice, i) => {
            // Center card logic
            const isCenter = i === 1;

            return (
              <Reveal
                key={voice.name}
                delay={i * 150}
                className={`min-w-[82vw] sm:min-w-[60vw] md:min-w-0 snap-center shrink-0 flex flex-col pt-12 ${
                  isCenter ? "md:-translate-y-6 md:scale-105" : ""
                }`}
              >
                <TiltCard className="w-full h-full flex flex-col relative group/card">
                  {/* The actual frame of the card */}
                  <div className="absolute inset-0 bg-surface-2/40 backdrop-blur-xl border border-line rounded-3xl overflow-hidden glass-card transition-colors group-hover/card:border-primary/40 group-hover/card:bg-surface-2/60 z-0">
                    {/* Ghost text of the person's name behind them */}
                    <div className="absolute top-10 -left-4 w-[150%] text-left pointer-events-none opacity-10">
                      <span className="font-display text-7xl text-stroke-primary text-transparent whitespace-nowrap">
                        {voice.name.split(" ")[0].toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* SVG Quote Icon */}
                  <div className="absolute top-8 left-8 text-primary/20 z-10 w-12 h-12">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Portrait (allowed to overflow top visually if it's a cutout) */}
                  <div className="relative w-full aspect-[4/5] z-10 flex items-end justify-center rounded-t-3xl mt-[-40px]">
                    <div className="absolute bottom-0 w-[90%] h-[110%] max-h-[110%]">
                      <MediaImage
                        imageKey={voice.imageKey as keyof ImageMap}
                        alt={`Portrait of ${voice.name}`}
                        fill
                        className="object-contain object-bottom drop-shadow-2xl transition-transform duration-500 group-hover/card:scale-105"
                      />
                    </div>
                  </div>

                  {/* Gradient Overlay & Text Content */}
                  <div className="relative z-20 flex flex-col items-center flex-grow p-8 pt-0 text-center rounded-b-3xl">
                    <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-bg via-bg/80 to-transparent rounded-b-3xl -z-10" />

                    <figure className="flex flex-col items-center gap-4 mt-auto">
                      <blockquote className="text-white font-sans text-[16px] leading-relaxed tracking-wide min-h-[80px] flex items-end justify-center">
                        <p className="animated-quote">
                          {voice.quote.split(" ").map((word, wIdx) => (
                            <span
                              key={wIdx}
                              className="inline-block opacity-0 animate-[fadeInWord_0.5s_ease_forwards]"
                              style={{ animationDelay: `${wIdx * 0.1 + 0.5}s` }}
                            >
                              {word}&nbsp;
                            </span>
                          ))}
                        </p>
                      </blockquote>
                      <div className="w-8 h-[2px] bg-primary rounded-full my-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white translate-x-[-100%] animate-[slideRight_2s_ease-in-out_infinite]" />
                      </div>
                      <figcaption className="flex flex-col items-center">
                        <span className="font-display text-xl text-primary tracking-widest uppercase">
                          {voice.name}
                        </span>
                        <span className="text-xs text-muted font-medium mt-1">
                          Industry Voice
                        </span>
                      </figcaption>
                    </figure>
                  </div>

                  {/* Outer Glow for Center Card */}
                  {isCenter && (
                    <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-[40px] -z-20 md:opacity-100 opacity-0 pointer-events-none" />
                  )}
                </TiltCard>
              </Reveal>
            );
          })}
        </div>

        {/* Decorative Connecting Line (lg+) */}
        <div
          className="hidden md:block relative w-full max-w-4xl h-[1px] bg-line mt-12 mb-4"
          aria-hidden="true"
        >
          <div className="absolute left-[16.666%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_10px_#5aa0ff]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent-cyan shadow-[0_0_15px_#22d3ee]" />
          <div className="absolute right-[16.666%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_10px_#5aa0ff]" />
        </div>
      </div>

    </section>
  );
}
