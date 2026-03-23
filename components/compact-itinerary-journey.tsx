"use client";

import { cn } from "@/lib/utils";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const cardConfig = [
  {
    bgClass: "border-[#153657] bg-gradient-to-br from-[#0A2540] via-[#143454] to-[#1A3D63]",
    numberClass: "text-white/10 group-hover:text-white/18",
    iconBgClass: "bg-white/14",
    iconColorClass: "text-white",
    titleClass: "text-white",
    descClass: "text-white/80",
    materialIcon: "lightbulb"
  },
  {
    bgClass: "border-[#2B5476] bg-gradient-to-br from-[#1A3D63] via-[#345A7B] to-[#4A7290]",
    numberClass: "text-white/12 group-hover:text-white/18",
    iconBgClass: "bg-white/14",
    iconColorClass: "text-white",
    titleClass: "text-white",
    descClass: "text-white",
    materialIcon: "brush"
  },
  {
    bgClass: "border-[#A8C2D6] bg-gradient-to-br from-[#5C87A8] via-[#7B9FBA] to-[#A3BED1]",
    numberClass: "text-white/22 group-hover:text-white/32",
    iconBgClass: "bg-white/50",
    iconColorClass: "text-brand-primary",
    titleClass: "text-brand-primary",
    descClass: "text-brand-primary/82",
    materialIcon: "tune"
  },
  {
    bgClass: "border-[#D2EFEB] bg-gradient-to-br from-[#DFF6F2] via-[#ECFBF8] to-[#F7FFFD]",
    numberClass: "text-brand-primary/10 group-hover:text-brand-primary/16",
    iconBgClass: "bg-brand-primary",
    iconColorClass: "text-white",
    titleClass: "text-brand-primary",
    descClass: "text-brand-primary/78",
    materialIcon: "explore"
  }
] as const;

export function CompactItineraryJourney() {
  return (
    <section id="como-funciona" className="section-space py-24">
      <div className="section-shell">
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow-light">Como funciona</span>
            <h2 className="text-5xl font-semibold tracking-tight text-brand-primary md:text-7xl">
              {siteContent.howItWorks.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
              {siteContent.howItWorks.description}
            </p>
          </div>

          <a
            href={buildWhatsAppUrl("Quiero empezar mi viaje por WhatsApp.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("how_it_works_whatsapp_click", { ctaLocation: "how_it_works" })}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-accent px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary transition duration-300 hover:scale-[1.02] hover:bg-[#24c0ae] hover:text-brand-primary"
          >
            Empezar mi viaje
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {siteContent.howItWorks.steps.map((step, index) => {
            const config = cardConfig[index] ?? cardConfig[0];

            return (
              <article
                key={step.title}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border p-8 shadow-soft transition-all duration-500 hover:-translate-y-2",
                  config.bgClass
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-4 -top-8 select-none text-[9rem] font-semibold tracking-[-0.08em] transition-colors duration-500",
                    config.numberClass
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div
                  className={cn(
                    "relative z-10 flex h-16 w-16 items-center justify-center rounded-full shadow-sm",
                    config.iconBgClass
                  )}
                >
                  <span className={cn("material-symbols-outlined text-3xl", config.iconColorClass)}>
                    {config.materialIcon}
                  </span>
                </div>

                <div className="relative z-10 mt-12">
                  <h3 className={cn("text-2xl font-semibold leading-tight", config.titleClass)}>{step.title}</h3>
                  <p className={cn("mt-4 text-base leading-7", config.descClass)}>{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
