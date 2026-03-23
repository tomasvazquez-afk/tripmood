import { captureTrackingContext } from "@/lib/utm";

export const VALID_EVENT_NAMES = [
  "hero_whatsapp_click",
  "hero_call_click",
  "hero_brief_click",
  "trust_whatsapp_click",
  "how_it_works_whatsapp_click",
  "inspiration_cta_click",
  "calendar_booking_started",
  "calendar_booking_completed",
  "brief_form_started",
  "brief_form_submitted",
  "final_cta_whatsapp_click",
  "final_cta_call_click",
  "final_cta_brief_click",
  "mobile_sticky_whatsapp_click",
  "mobile_sticky_call_click",
  "mobile_sticky_brief_click",
] as const;

export type TrackEventName = (typeof VALID_EVENT_NAMES)[number];

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const SESSION_KEY = "tripmood_session_id";

function createSessionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `tm_${Math.random().toString(36).slice(2)}_${Date.now()}`;
}

export function getSessionId() {
  if (typeof window === "undefined") return "server";

  const existing = window.localStorage.getItem(SESSION_KEY);
  if (existing) return existing;

  const nextId = createSessionId();
  window.localStorage.setItem(SESSION_KEY, nextId);
  return nextId;
}

export function bootstrapAnalytics() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  captureTrackingContext();
  getSessionId();
}

type TrackOptions = {
  ctaLocation?: string;
  metadata?: Record<string, unknown>;
  persist?: boolean;
};

export function trackEvent(eventName: TrackEventName, options: TrackOptions = {}) {
  if (typeof window === "undefined") return;

  const trackingContext = captureTrackingContext();
  const payload = {
    event_name: eventName,
    session_id: getSessionId(),
    cta_location: options.ctaLocation,
    page_path: window.location.pathname,
    utm_source: trackingContext.utm_source,
    utm_medium: trackingContext.utm_medium,
    utm_campaign: trackingContext.utm_campaign,
    utm_content: trackingContext.utm_content,
    referrer: trackingContext.referrer,
    metadata: options.metadata ?? null
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...payload });

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      cta_location: payload.cta_location,
      page_path: payload.page_path
    });
  }

  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", eventName, {
      cta_location: payload.cta_location,
      page_path: payload.page_path
    });
  }

  if (options.persist === false) return;

  const body = JSON.stringify(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  }).catch(() => null);
}
