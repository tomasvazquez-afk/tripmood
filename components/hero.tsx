"use client";

import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { scrollToId } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  const highlightPhrase = "destino a tu manera";
  const headline = siteContent.hero.headline;
  const headlineLower = headline.toLowerCase();
  const highlightStart = headlineLower.indexOf(highlightPhrase);

  const headlineBefore =
    highlightStart >= 0 ? headline.slice(0, highlightStart) : headline;
  const headlineHighlight =
    highlightStart >= 0
      ? headline.slice(highlightStart, highlightStart + highlightPhrase.length)
      : "";
  const headlineAfter =
    highlightStart >= 0
      ? headline.slice(highlightStart + highlightPhrase.length)
      : "";

  const onBriefClick = () => {
    trackEvent("hero_brief_click", { ctaLocation: "hero" });
    scrollToId("brief");
  };

  return (
    <section id="inicio" data-sticky-tone="dark" className="relative isolate min-h-[100svh] overflow-hidden bg-brand-primary text-white">
      <video
        className="hero-video pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        aria-hidden="true"
        poster={siteContent.video.poster}
      >
        <source src={siteContent.video.src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(78,31,48,0.16)_0%,rgba(78,31,48,0.22)_40%,rgba(78,31,48,0.38)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_left_center,rgba(255,100,156,0.08),transparent_32%)]" />

      <div className="section-shell relative z-10 flex min-h-[100svh] items-center py-20 pt-28 sm:py-32 lg:py-36">
        <div className="w-full max-w-3xl">
          <span className="eyebrow">{siteContent.hero.eyebrow}</span>
          <h1 className="max-w-4xl text-[2.85rem] leading-[0.96] text-white sm:text-6xl lg:text-7xl">
            {headlineBefore}
            {headlineHighlight ? <span className="text-brand-secondary">{headlineHighlight}</span> : null}
            {headlineAfter}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
            {siteContent.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={buildWhatsAppUrl("Vengo desde el hero y quiero empezar a planificar mi viaje.")}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("hero_whatsapp_click", { ctaLocation: "hero" })}
              className="button-primary"
            >
              <span className="mr-2"><SiteIcon name="whatsapp" /></span>
              Escribinos por WhatsApp
            </a>
            <button type="button" onClick={onBriefClick} className="button-secondary">
              Completá el formulario
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-white/80 sm:flex-row sm:flex-wrap sm:gap-5">
            {siteContent.hero.trust.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white">
                  <SiteIcon name="check" className="h-3.5 w-3.5" />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
