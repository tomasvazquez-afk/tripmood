"use client";

import { useEffect, useRef, useState } from "react";
import { SiteIcon } from "@/components/site-icon";
import { trackEvent } from "@/lib/analytics";
import { scrollToId } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function MobileStickyCta() {
  const barRef = useRef<HTMLDivElement>(null);
  const [isDarkContext, setIsDarkContext] = useState(true);

  useEffect(() => {
    let frameId = 0;

    const detectContext = () => {
      const barHeight = barRef.current?.offsetHeight ?? 90;
      const sampleY = Math.max(8, window.innerHeight - barHeight - 8);
      const sampleX = Math.floor(window.innerWidth / 2);

      const elementUnderBar = document.elementFromPoint(sampleX, sampleY) as HTMLElement | null;
      const toneSection = elementUnderBar?.closest<HTMLElement>("[data-sticky-tone]");
      setIsDarkContext(toneSection?.dataset.stickyTone === "dark");
    };

    const scheduleDetect = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(detectContext);
    };

    scheduleDetect();
    window.addEventListener("scroll", scheduleDetect, { passive: true });
    window.addEventListener("resize", scheduleDetect);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleDetect);
      window.removeEventListener("resize", scheduleDetect);
    };
  }, []);

  const wrapperClass = isDarkContext
    ? "border-white/20 bg-brand-primary/84 text-white shadow-[0_-16px_36px_rgba(10,37,64,0.38)]"
    : "border-border/85 bg-white/92 text-brand-primary shadow-[0_-14px_30px_rgba(10,37,64,0.14)]";

  const buttonBase =
    "flex flex-col items-center justify-center rounded-2xl px-3 py-3 text-xs font-semibold shadow-sm transition duration-300 hover:brightness-[1.06] active:scale-[0.98]";

  const whatsappClass = isDarkContext
    ? "border border-white/60 bg-brand-accent text-brand-primary"
    : "bg-brand-primary text-white";

  const briefClass = isDarkContext
    ? "border border-white/35 bg-white/14 text-white"
    : "bg-brand-secondary text-white";

  return (
    <div
      ref={barRef}
      className={`fixed inset-x-0 bottom-0 z-50 border-t px-4 py-3 backdrop-blur-xl transition-colors duration-300 md:hidden ${wrapperClass}`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto grid max-w-xs grid-cols-2 gap-2">
        <a
          href={buildWhatsAppUrl("Quiero hablar por WhatsApp desde mobile.")}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("mobile_sticky_whatsapp_click", { ctaLocation: "mobile_sticky" })}
          className={`${buttonBase} ${whatsappClass}`}
        >
          <SiteIcon name="whatsapp" className="mb-1 h-4 w-4" />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => {
            trackEvent("mobile_sticky_brief_click", { ctaLocation: "mobile_sticky" });
            scrollToId("brief");
          }}
          className={`${buttonBase} ${briefClass}`}
        >
          <SiteIcon name="brief" className="mb-1 h-4 w-4" />
          Formulario
        </button>
      </div>
    </div>
  );
}
