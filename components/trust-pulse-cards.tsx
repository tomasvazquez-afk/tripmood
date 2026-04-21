"use client";

import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/site-content";
import { cn } from "@/lib/utils";

const pulseAnimation = `
@keyframes pulse-glow {
  0%, 100% { opacity: 0.45; transform: scale(1); }
  50% { opacity: 0.82; transform: scale(1.02); }
}

.animate-pulse-glow {
  animation: pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;

const gradientClasses = [
  "from-brand-accent/12 via-brand-primary/4 to-transparent",
  "from-brand-accent/10 via-brand-secondary/6 to-transparent",
  "from-brand-accent/14 via-brand-primary/6 to-transparent",
  "from-brand-accent/12 via-brand-secondary/4 to-transparent"
];

const emojis = ["🎯", "🤝", "🛟", "✨"];

export function TrustPulseCards() {
  return (
    <>
      <style>{pulseAnimation}</style>
      <section id="por-que-elegirnos" className="section-space">
        <div className="section-shell">
          <SectionHeading
            eyebrow={siteContent.differentiators.eyebrow}
            title={siteContent.differentiators.title}
            description={siteContent.differentiators.description}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {siteContent.differentiators.items.map((item, index) => (
              <article
                key={item.title}
                className="group relative overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,100,156,0.08)_100%)] p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/30"
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    gradientClasses[index] ?? gradientClasses[0]
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-20 animate-pulse-glow",
                    gradientClasses[index] ?? gradientClasses[0]
                  )}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/18 text-2xl">
                    {emojis[index] ?? "✈️"}
                  </div>

                  <h3 className="text-xl font-semibold leading-tight text-brand-primary">{item.title}</h3>
                  <p className="text-sm leading-6 text-muted">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
