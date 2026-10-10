import { CONTENT } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { CountUp } from "../ui/CountUp";

export function VoiceStats() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center">
        <Reveal>
          <h2 className="text-sm font-medium tracking-widest text-primary uppercase text-center mb-8">
            A Voice That Has Travelled Beyond The Cybersecurity Industry
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-2xl md:text-3xl text-center text-white font-medium max-w-4xl leading-relaxed mb-16">
            {CONTENT.voiceStats.paragraph}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 w-full">
          {CONTENT.voiceStats.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={200 + i * 100} className="w-full">
              <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full hover:-translate-y-2 transition-transform duration-300">
                <span className="font-display text-4xl md:text-5xl text-white mb-2 tracking-wide">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs md:text-sm text-muted font-medium">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
