"use client";

import { SiteIcon } from "@/components/site-icon";
import { Card } from "@/components/ui/card";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function TrustBar() {
  return (
    <section className="relative z-20 -mt-8 pb-6 sm:-mt-12 sm:pb-10">
      <div className="section-shell">
        <div className="grid gap-4 lg:grid-cols-4 lg:gap-5">
          {siteContent.trustBar.map((item) => (
            <Card key={item.title} className="rounded-[1.75rem] bg-surface/88 p-5 backdrop-blur-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-primary text-white">
                <SiteIcon name={item.icon} />
              </span>
              <h2 className="mt-4 text-xl text-text">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href={buildWhatsAppUrl("Quiero avanzar con un viaje a medida.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("trust_whatsapp_click", { ctaLocation: "trust_bar" })}
            className="button-tertiary"
          >
            <span className="mr-2"><SiteIcon name="whatsapp" className="h-4 w-4" /></span>
            Escribinos por Whatsapp
          </a>
        </div>
      </div>
    </section>
  );
}
