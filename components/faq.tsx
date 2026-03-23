import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";

export function Faq() {
  return (
    <section className="section-space bg-white/35">
      <div className="section-shell">
        <SectionHeading eyebrow={siteContent.faq.eyebrow} title={siteContent.faq.title} description="Respuestas breves para ayudarte a avanzar con claridad." />

        <div className="mt-12 space-y-4">
          {siteContent.faq.items.map((item) => (
            <details key={item.question} className="group surface-panel rounded-[1.8rem] p-1 transition open:bg-white/85 open:shadow-md">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-[1.4rem] px-5 py-5 text-left text-lg text-ink transition hover:bg-white/60">
                <span>{item.question}</span>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-primary transition-transform duration-300 group-open:rotate-90">
                  <SiteIcon name="arrow" className="h-4 w-4" />
                </span>
              </summary>
              <div className="px-5 pb-5 pt-1 text-sm leading-7 text-mist">{item.answer}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

