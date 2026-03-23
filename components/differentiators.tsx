import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";

export function Differentiators() {
  return (
    <section id="por-que-elegirnos" className="section-space bg-white/30">
      <div className="section-shell">
        <SectionHeading
          eyebrow={siteContent.differentiators.eyebrow}
          title={siteContent.differentiators.title}
          description={siteContent.differentiators.description}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {siteContent.differentiators.items.map((item) => (
            <Card key={item.title} className="rounded-[2rem]">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-secondary/10 text-brand-primary">
                <SiteIcon name={item.icon} />
              </span>
              <h3 className="mt-5 text-2xl text-text">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
