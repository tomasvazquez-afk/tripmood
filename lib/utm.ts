export type TrackingContext = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
  session_id?: string;
};

const STORAGE_KEY = "tripmood_tracking_context";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

function isBrowser() {
  return typeof window !== "undefined";
}

function loadStoredContext(): TrackingContext {
  if (!isBrowser()) return {};

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as TrackingContext) : {};
  } catch {
    return {};
  }
}

function saveStoredContext(context: TrackingContext) {
  if (!isBrowser()) return;

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(context));
}

export function captureTrackingContext(): TrackingContext {
  if (!isBrowser()) return {};

  const stored = loadStoredContext();
  const url = new URL(window.location.href);
  const nextContext: TrackingContext = { ...stored };

  UTM_KEYS.forEach((key) => {
    const value = url.searchParams.get(key);
    if (value) {
      nextContext[key] = value;
    }
  });

  if (!nextContext.referrer && document.referrer) {
    nextContext.referrer = document.referrer;
  }

  if (!nextContext.landing_path) {
    nextContext.landing_path = `${window.location.pathname}${window.location.search}`;
  }

  saveStoredContext(nextContext);
  return nextContext;
}

export function getTrackingContext() {
  return captureTrackingContext();
}
