import { CONTENT } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Credibility() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-bg relative">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionHeading className="mb-6">{CONTENT.credibility.title}</SectionHeading>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-muted text-lg max-w-2xl mb-20">
            {CONTENT.credibility.intro}
          </p>
        </Reveal>

        <div className="relative">
          {/* Animated line drawing on scroll (simulated with CSS width/height on reveal) */}
          <div className="absolute left-[15px] md:left-0 md:top-[24px] w-[2px] h-full md:w-full md:h-[2px] bg-line z-0" />

          <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-4">
            {CONTENT.credibility.timeline.map((item, i) => {
              const isHighlight = item.year === "2016";
              return (
                <Reveal
                  key={i}
                  delay={200 + i * 150}
                  className="relative z-10 flex flex-row md:flex-col items-start gap-6 md:w-1/4"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-bg border-2 transition-all duration-500 mt-[-2px] md:mt-0 ${
                      isHighlight
                        ? "border-highlight shadow-[0_0_20px_rgba(227,182,47,0.5)] scale-125"
                        : "border-primary"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isHighlight ? "bg-highlight" : "bg-primary"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-display text-3xl tracking-wide mb-2 ${
                        isHighlight ? "text-highlight" : "text-white"
                      }`}
                    >
                      {item.year}
                    </h3>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-sm text-muted">{item.description}</p>
                    )}
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
