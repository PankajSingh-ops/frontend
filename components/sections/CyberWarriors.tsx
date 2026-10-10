import { CONTENT } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { Button } from "../ui/Button";

export function CyberWarriors() {
  return (
    <section
      id="cyber-warrior"
      className="py-24 md:py-36 bg-bg relative overflow-hidden border-t border-line"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[800px] h-[800px] border-[1px] border-primary rounded-full absolute mix-blend-screen" />
        <div className="w-[600px] h-[600px] border-[1px] border-accent-cyan rounded-full absolute mix-blend-screen" />
        <div className="w-[400px] h-[400px] border-[1px] border-primary-glow rounded-full absolute mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        <Reveal>
          <h2 className="font-display text-[12vw] md:text-[150px] leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
            {CONTENT.cyberWarriors.number}
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-[-2vw] md:mt-[-40px]">
          <h3 className="font-display text-4xl md:text-6xl text-primary tracking-widest uppercase mb-6">
            {CONTENT.cyberWarriors.title}
          </h3>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-xl md:text-2xl text-white font-medium mb-8 max-w-4xl">
            {CONTENT.cyberWarriors.tagline}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-muted text-lg max-w-3xl mb-12">
            {CONTENT.cyberWarriors.body}
          </p>
        </Reveal>

        <Reveal delay={400} className="mb-12">
          <div className="glass-card rounded-xl px-6 py-4 border border-accent-cyan/30 bg-accent-cyan/5">
            <span className="text-accent-cyan font-semibold">
              {CONTENT.cyberWarriors.badge}
            </span>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <Button
            href="#"
            variant="primary"
            className="!px-10 !py-4 text-lg border-2 border-primary-glow relative group overflow-visible"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-cyan rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-cyan rounded-full" />
            REGISTER NOW
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
