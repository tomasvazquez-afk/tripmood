"use client";

import { startTransition, useMemo, useRef, useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/content/site-content";
import { trackEvent } from "@/lib/analytics";
import { getTrackingContext } from "@/lib/utm";
import { cn } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const EMAIL_DOMAINS = ["@gmail.com", "@hotmail.com", "@outlook.com", "@yahoo.com", "@icloud.com"];

type FormValues = {
  name: string;
  email: string;
  whatsapp: string;
  tripType: string;
  travelersCount: string;
  travelDateEstimate: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  whatsapp: "",
  tripType: "",
  travelersCount: "",
  travelDateEstimate: "",
  message: ""
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) errors.name = "Contanos tu nombre y apellido.";
  if (!values.email.trim()) {
    errors.email = "Necesitamos tu email para responderte.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Revisa el formato del email.";
  }

  if (!values.whatsapp.trim()) errors.whatsapp = "Sumemos un WhatsApp para contactarte rapido.";
  if (!values.tripType.trim()) errors.tripType = "Elegi el tipo de viaje que mas se acerca a tu idea.";
  if (!values.travelersCount.trim()) errors.travelersCount = "Decinos cuantas personas viajarian.";
  if (!values.travelDateEstimate.trim()) errors.travelDateEstimate = "Indicanos una fecha estimada para viajar.";

  return errors;
}

export function BriefForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const hasTrackedStart = useRef(false);

  const submitLabel = useMemo(() => {
    return isSubmitting ? "Enviando formulario..." : "Quiero empezar a planificar mi viaje";
  }, [isSubmitting]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));

    if (field === "email") {
      const atIndex = value.indexOf("@");
      if (atIndex !== -1) {
        const afterAt = value.slice(atIndex + 1).toLowerCase();
        const prefix = value.slice(0, atIndex);
        const suggestions = EMAIL_DOMAINS
          .filter((domain) => domain.slice(1).startsWith(afterAt) && afterAt !== domain.slice(1))
          .map((domain) => `${prefix}${domain}`);
        setEmailSuggestions(suggestions);
      } else {
        setEmailSuggestions([]);
      }
    }
  };

  const handleEmailSuggestionMouseDown = (event: React.MouseEvent, suggestion: string) => {
    event.preventDefault();
    setValues((current) => ({ ...current, email: suggestion }));
    setErrors((current) => ({ ...current, email: undefined }));
    setEmailSuggestions([]);
  };

  const handleStart = () => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    trackEvent("brief_form_started", { ctaLocation: "brief_form" });
  };

  const handleSubmit = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const tracking = getTrackingContext();

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lead: {
            name: values.name.trim(),
            email: values.email.trim(),
            whatsapp: values.whatsapp.trim(),
            trip_type: values.tripType.trim(),
            travel_date_estimate: values.travelDateEstimate.trim(),
            travelers_count: values.travelersCount === "15+" ? 16 : Number(values.travelersCount),
            message: values.message.trim() || null,
            utm_source: tracking.utm_source,
            utm_medium: tracking.utm_medium,
            utm_campaign: tracking.utm_campaign,
            utm_content: tracking.utm_content,
            referrer: tracking.referrer,
            landing_path: tracking.landing_path
          }
        })
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as
          | { error?: string; debug?: Record<string, unknown> }
          | null;

        const errorMessage = errorBody?.error || "No se pudo enviar el brief.";
        const debugCode =
          typeof errorBody?.debug?.code === "string" ? ` (codigo: ${errorBody.debug.code})` : "";
        const debugMessage =
          typeof errorBody?.debug?.message === "string" ? ` - ${errorBody.debug.message}` : "";

        throw new Error(`${errorMessage}${debugCode}${debugMessage}`);
      }

      trackEvent("brief_form_submitted", {
        ctaLocation: "brief_form",
        metadata: {
          trip_type: values.tripType
        }
      });

      startTransition(() => {
        setIsSuccess(true);
        setValues(initialValues);
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : null;
      setServerError(message || "Hubo un problema al enviar tu brief. Proba de nuevo o escribinos por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (field: keyof FormValues) =>
    cn(
      "mt-2 w-full rounded-[1.35rem] border bg-white/90 px-4 py-3.5 text-sm text-ink transition placeholder:text-mist/60",
      errors[field] ? "border-[#d14343]" : "border-border focus:border-brand-accent"
    );

  return (
    <section id="brief" className="section-space bg-white/35">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={siteContent.brief.eyebrow}
              title={siteContent.brief.title}
              description={siteContent.brief.description}
            />
          </div>

          <div className="surface-panel rounded-[2.25rem] p-6 sm:p-8">
            {isSuccess ? (
              <div className="rounded-[1.7rem] border border-border bg-surface p-8">
                <h3 className="text-3xl text-ink">Formulario recibido</h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{siteContent.brief.success}</p>
                <a
                  href={buildWhatsAppUrl("Ya complete el brief y quiero seguir por WhatsApp.")}
                  target="_blank"
                  rel="noreferrer"
                  className="button-tertiary mt-8"
                >
                  Continuar por WhatsApp
                </a>
              </div>
            ) : (
              <form className="grid gap-5" onSubmit={handleSubmit} onFocusCapture={handleStart} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-medium text-text">
                    Nombre y apellido
                    <input
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => handleChange("name", event.target.value)}
                      className={fieldClass("name")}
                    />
                    {errors.name && <span className="mt-2 block text-xs text-[#d14343]">{errors.name}</span>}
                  </label>

                  <label className="relative text-sm font-medium text-text">
                    Email
                    <input
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => handleChange("email", event.target.value)}
                      placeholder="tunombre@gmail.com"
                      className={fieldClass("email")}
                    />
                    {emailSuggestions.length > 0 && (
                      <ul className="absolute left-0 right-0 z-10 mt-1 overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                        {emailSuggestions.map((suggestion) => (
                          <li key={suggestion}>
                            <button
                              type="button"
                              onMouseDown={(event) => handleEmailSuggestionMouseDown(event, suggestion)}
                              className="w-full px-4 py-2.5 text-left text-sm text-ink hover:bg-surface"
                            >
                              {suggestion}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {errors.email && <span className="mt-2 block text-xs text-[#d14343]">{errors.email}</span>}
                  </label>

                  <label className="text-sm font-medium text-text">
                    WhatsApp
                    <input
                      type="tel"
                      autoComplete="tel"
                      value={values.whatsapp}
                      onChange={(event) => handleChange("whatsapp", event.target.value)}
                      placeholder="+54 9 11 1234-5678"
                      className={fieldClass("whatsapp")}
                    />
                    {errors.whatsapp && <span className="mt-2 block text-xs text-[#d14343]">{errors.whatsapp}</span>}
                  </label>

                  <label className="text-sm font-medium text-text">
                    Tipo de viaje
                    <select
                      value={values.tripType}
                      onChange={(event) => handleChange("tripType", event.target.value)}
                      className={fieldClass("tripType")}
                    >
                      <option value="">Seleccionar</option>
                      {siteContent.formOptions.tripTypes.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.tripType && <span className="mt-2 block text-xs text-[#d14343]">{errors.tripType}</span>}
                  </label>

                  <label className="text-sm font-medium text-text">
                    Cantidad de viajeros
                    <select
                      value={values.travelersCount}
                      onChange={(event) => handleChange("travelersCount", event.target.value)}
                      className={fieldClass("travelersCount")}
                    >
                      <option value="">Seleccionar</option>
                      {Array.from({ length: 15 }, (_, index) => index + 1).map((count) => (
                        <option key={count} value={String(count)}>
                          {count}
                        </option>
                      ))}
                      <option value="15+">15 o mas</option>
                    </select>
                    {errors.travelersCount && (
                      <span className="mt-2 block text-xs text-[#d14343]">{errors.travelersCount}</span>
                    )}
                  </label>

                  <label className="text-sm font-medium text-text">
                    Fecha estimada
                    <input
                      type="text"
                      value={values.travelDateEstimate}
                      onChange={(event) => handleChange("travelDateEstimate", event.target.value)}
                      placeholder="Enero 2027"
                      className={fieldClass("travelDateEstimate")}
                    />
                    {errors.travelDateEstimate && (
                      <span className="mt-2 block text-xs text-[#d14343]">{errors.travelDateEstimate}</span>
                    )}
                  </label>
                </div>

                <label className="text-sm font-medium text-text">
                  Mensajes
                  <textarea
                    rows={5}
                    value={values.message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    className={fieldClass("message")}
                    placeholder="Contanos cualquier detalle importante sobre tu idea, ritmo de viaje o preferencias."
                  />
                </label>

                {serverError && <p className="text-sm text-[#d14343]">{serverError}</p>}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-6 text-muted">
                    Guardamos tus datos, UTMs y contexto de llegada para responderte con una propuesta mas afinada.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="button-primary min-w-[19rem] disabled:cursor-wait disabled:opacity-75"
                  >
                    {submitLabel}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
