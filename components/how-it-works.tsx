"use client";

import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const stepDecor = [
  {
    icon: "chat" as const,
    iconWrap: "bg-brand-accent/16 text-brand-primary",
    card: "border-border bg-white"
  },
  {
    icon: "tailor" as const,
    iconWrap: "bg-brand-secondary/14 text-brand-secondary",
    card: "border-border bg-[#edf4ff]"
  },
  {
    icon: "spark" as const,
    iconWrap: "bg-brand-primary/10 text-brand-primary",
    card: "border-border bg-white"
  },
  {
    icon: "shield" as const,
    iconWrap: "bg-brand-secondary text-white",
    card: "border-brand-primary/90 bg-brand-primary text-white"
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="section-space">
      <div className="section-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={siteContent.howItWorks.eyebrow}
            title={siteContent.howItWorks.title}
            description={siteContent.howItWorks.description}
          />

          <a
            href={buildWhatsAppUrl("Quiero empezar a definir mi viaje por WhatsApp.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("how_it_works_whatsapp_click", { ctaLocation: "how_it_works" })}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary hover:text-white"
          >
            Empezar mi viaje
          </a>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.howItWorks.steps.map((step, index) => {
            const decor = stepDecor[index] ?? stepDecor[0];
            const isDark = index === 3;

            return (
              <article
                key={step.title}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border p-8 shadow-soft transition duration-500 hover:-translate-y-2",
                  decor.card
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-3 -top-8 select-none text-[7rem] font-semibold tracking-[-0.08em] transition duration-500 sm:text-[8.5rem]",
                    isDark ? "text-white/10 group-hover:text-white/20" : "text-brand-primary/6 group-hover:text-brand-primary/10"
                  )}
                >
                  0{index + 1}
                </span>

                <div
                  className={cn(
                    "relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-sm",
                    decor.iconWrap
                  )}
                >
                  <SiteIcon name={decor.icon} className="h-6 w-6" />
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className={cn("text-[1.75rem] leading-tight", isDark ? "text-white" : "text-brand-primary")}>
                    {step.title}
                  </h3>
                  <p className={cn("mt-4 text-base leading-7", isDark ? "text-white/76" : "text-muted")}>
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
