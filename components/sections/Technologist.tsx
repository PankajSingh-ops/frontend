import { CONTENT } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { MediaImage } from "../ui/MediaImage";

export function Technologist() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 lg:py-36 bg-surface-2 relative border-y border-line"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Image */}
        <Reveal className="relative max-w-[500px] w-full mx-auto aspect-[4/5] rounded-3xl overflow-hidden group border border-transparent">
          <div className="absolute inset-0 border-2 border-primary translate-x-4 translate-y-4 rounded-3xl -z-10 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
          <MediaImage
            imageKey="aboutSpeaking"
            alt="Ankur speaking"
            className="rounded-3xl"
          />
        </Reveal>

        {/* Right Content */}
        <div className="flex flex-col items-start">
          <Reveal delay={100}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-8 uppercase">
              {CONTENT.technologist.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-muted text-lg leading-relaxed mb-10">
              {CONTENT.technologist.paragraph}
            </p>
          </Reveal>

          <div className="flex flex-col gap-4 w-full">
            {CONTENT.technologist.worlds.map((world, i) => (
              <Reveal key={world} delay={300 + i * 100}>
                <div className="glass-card rounded-full px-6 py-4 flex items-center gap-4 hover:bg-surface transition-colors border border-line hover:border-primary/50 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {i + 1}
                  </div>
                  <span className="text-white font-medium text-lg relative z-10">
                    {world}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
