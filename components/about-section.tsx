import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="sobre-tripmood" className="section-space">
      <div className="section-shell space-y-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <SectionHeading eyebrow={siteContent.about.eyebrow} title={siteContent.about.title} />

          <div className="space-y-5">
            {siteContent.about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-base leading-8 text-mist sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-4 rounded-[2rem] border border-brand-primary bg-brand-primary p-5 shadow-float sm:p-6 lg:grid-cols-3">
          {siteContent.about.highlights.map((item) => (
            <div key={item.label} className="flex min-h-[132px] flex-col justify-between rounded-[1.5rem] border border-white/10 bg-white/6 p-5 backdrop-blur-sm">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white">{item.label}</p>

              {item.label === "Mail de contacto" ? (
                <a
                  href={`mailto:${item.value}`}
                  className="mt-3 text-lg leading-8 text-white transition hover:text-brand-accent"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 text-lg leading-8 text-white">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
