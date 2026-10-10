import { CONTENT, ImageMap } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { MediaImage } from "../ui/MediaImage";

export function TedxStage() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-surface-2 relative border-y border-line">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <Reveal>
          <SectionHeading className="mb-16 text-center">
            {CONTENT.tedx.title}
          </SectionHeading>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CONTENT.tedx.cards.map((card, i) => (
            <Reveal
              key={card.title}
              delay={100 + i * 150}
              className="group cursor-pointer"
            >
              <div className="block w-full h-full">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 glass-card group-hover:shadow-[0_0_30px_rgba(var(--primary),0.2)] transition-shadow duration-500">
                  <iframe
                    src={`https://www.youtube.com/embed/${(card as any).videoUrl.split('v=')[1]}`}
                    title={card.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  ></iframe>
                  {/* TEDx Tag */}
                  <div className="absolute top-4 left-4 bg-[#eb0028] text-white text-xs font-bold px-3 py-1 rounded z-10 pointer-events-none shadow-lg">
                    {card.location}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
