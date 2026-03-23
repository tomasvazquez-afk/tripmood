"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/section-heading";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { buildCalEmbedUrl } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

function safeParseMessage(data: unknown) {
  if (typeof data === "string") {
    try {
      return JSON.parse(data) as Record<string, unknown>;
    } catch {
      return { raw: data };
    }
  }

  if (typeof data === "object" && data !== null) {
    return data as Record<string, unknown>;
  }

  return null;
}

export function BookingSection() {
  const startedRef = useRef(false);
  const completedRef = useRef(false);
  const calLink = buildCalEmbedUrl(process.env.NEXT_PUBLIC_CAL_LINK);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!event.origin.includes("cal.com")) return;

      const data = safeParseMessage(event.data);
      if (!data) return;

      // Cal.com embed SDK sends events as { type: "CAL:eventName", ... }
      const calType = typeof data.type === "string" ? data.type : "";

      const isStarted =
        calType === "CAL:timeslotSelected" ||
        calType === "CAL:eventTypeSelected" ||
        // fallback for undocumented variants
        (!calType && JSON.stringify(data).toLowerCase().includes("timeslot"));

      const isCompleted =
        calType === "CAL:bookingSuccessful" ||
        calType === "CAL:rescheduleBookingSuccessful" ||
        // fallback for undocumented variants
        (!calType && JSON.stringify(data).toLowerCase().includes("booking_successful"));

      if (!startedRef.current && isStarted) {
        startedRef.current = true;
        trackEvent("calendar_booking_started", {
          ctaLocation: "booking_section",
          metadata: data
        });
      }

      if (!completedRef.current && isCompleted) {
        completedRef.current = true;
        trackEvent("calendar_booking_completed", {
          ctaLocation: "booking_section",
          metadata: data
        });
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return (
    <section id="agenda" className="section-space">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={siteContent.booking.eyebrow}
              title={siteContent.booking.title}
              description={siteContent.booking.description}
            />
            <ul className="mt-8 space-y-4">
              {siteContent.booking.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-muted">
                  <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent/15 text-brand-primary">
                    <SiteIcon name="check" className="h-4 w-4" />
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppUrl("Antes de agendar quiero hacer una consulta por WhatsApp.")}
              target="_blank"
              rel="noreferrer"
              className="button-tertiary mt-8"
            >
              <span className="mr-2"><SiteIcon name="whatsapp" /></span>
              {siteContent.booking.alternateCta}
            </a>
            <p className="mt-4 max-w-md text-xs leading-6 text-muted">
              Placeholder listo para reemplazar por tu URL real de Cal.com desde `NEXT_PUBLIC_CAL_LINK`.
            </p>
          </div>

          <div className="surface-panel overflow-hidden rounded-[2.25rem] border border-border p-3 sm:p-4">
            <div className="rounded-[1.6rem] border border-border bg-surface p-2 shadow-sm">
              <iframe
                title="Agenda TripMood"
                src={calLink}
                loading="lazy"
                className="h-[760px] w-full rounded-[1.2rem] border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
