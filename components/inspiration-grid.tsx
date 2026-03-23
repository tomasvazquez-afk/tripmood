"use client";

import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  beach: "from-[#8fd4d0] via-[#68adc8] to-[#3b6b8f]",
  city: "from-[#8f9fc4] via-[#6b7fa8] to-[#3f557b]",
  snow: "from-[#8ca2b6] via-[#6f859a] to-[#4b6079]",
  nature: "from-[#6e9074] via-[#53755f] to-[#355246]",
  cruise: "from-[#f1b36a] via-[#cd8a48] to-[#8a5632]"
};

const layoutClasses = [
  "lg:col-span-7 lg:min-h-[19rem]",
  "lg:col-span-5 lg:min-h-[19rem]",
  "lg:col-span-4 lg:min-h-[17rem]",
  "lg:col-span-4 lg:min-h-[17rem]",
  "lg:col-span-4 lg:min-h-[17rem]"
];

export function InspirationGrid() {
  return (
    <section id="inspiracion" className="section-space pt-8">
      <div className="section-shell">
        <SectionHeading
          eyebrow={siteContent.inspiration.eyebrow}
          title={siteContent.inspiration.title}
          description={siteContent.inspiration.description}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          {siteContent.inspiration.items.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-[2.2rem] border border-border bg-gradient-to-br p-6 shadow-soft transition duration-300 hover:-translate-y-1",
                toneClasses[item.tone] || "from-[#dce8ff] via-[#f7fbff] to-[#bfd7ff]",
                layoutClasses[index]
              )}
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 45vw, 100vw"
                />
              ) : null}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,37,64,0.24)_0%,rgba(10,37,64,0.46)_45%,rgba(10,37,64,0.72)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_32%)]" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div>
                  <h3 className="text-3xl leading-tight text-white">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white">{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <a
            href={buildWhatsAppUrl("Quiero contarles qué tipo de viaje estoy soñando.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("inspiration_cta_click", { ctaLocation: "inspiration" })}
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3.5 text-sm font-semibold text-brand-primary shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#24c0ae] hover:text-brand-primary hover:shadow-md active:translate-y-0 active:scale-[0.99]"
          >
            Contanos qué tipo de viaje soñás
            <span className="ml-2"><SiteIcon name="arrow" /></span>
          </a>
        </div>
      </div>
    </section>
  );
}
