"use client";

import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { scrollToId } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section id="contacto" data-sticky-tone="dark" className="section-space pb-28 sm:pb-32">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-brand-primary px-6 py-10 text-white shadow-float sm:px-10 sm:py-14">
          <SectionHeading
            eyebrow={siteContent.finalCta.eyebrow}
            title={siteContent.finalCta.title}
            description={siteContent.finalCta.description}
            invert
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={buildWhatsAppUrl("Quiero empezar hoy mismo a planificar mi viaje.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("final_cta_whatsapp_click", { ctaLocation: "final_cta" })}
              className="button-primary"
            >
              <span className="mr-2"><SiteIcon name="whatsapp" /></span>
              Escribinos por WhatsApp
            </a>
            <button
              type="button"
              onClick={() => {
                trackEvent("final_cta_brief_click", { ctaLocation: "final_cta" });
                scrollToId("brief");
              }}
              className="button-secondary"
            >
              Completá el formulario
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
