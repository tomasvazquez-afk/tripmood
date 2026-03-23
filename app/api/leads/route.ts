import { NextResponse } from "next/server";
import { sendLeadToSheets } from "@/lib/sheets";
import { createSupabaseServerClient, type LeadInsert } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function toNullableString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`leads:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intentá de nuevo en unos minutos." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const rawLead = body?.lead as Partial<LeadInsert> | undefined;

  if (!rawLead) {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  const lead: LeadInsert = {
    name: toNullableString(rawLead.name) || "",
    email: toNullableString(rawLead.email) || "",
    whatsapp: toNullableString(rawLead.whatsapp) || "",
    trip_type: toNullableString(rawLead.trip_type) || "",
    destination: toNullableString(rawLead.destination) || "Sin especificar",
    travel_date_estimate: toNullableString(rawLead.travel_date_estimate) || "",
    travelers_count: typeof rawLead.travelers_count === "number" ? rawLead.travelers_count : null,
    budget_range: toNullableString(rawLead.budget_range) || "Sin especificar",
    message: toNullableString(rawLead.message),
    utm_source: toNullableString(rawLead.utm_source),
    utm_medium: toNullableString(rawLead.utm_medium),
    utm_campaign: toNullableString(rawLead.utm_campaign),
    utm_content: toNullableString(rawLead.utm_content),
    referrer: toNullableString(rawLead.referrer),
    landing_path: toNullableString(rawLead.landing_path),
    status: "new"
  };

  if (!lead.name || !lead.email || !lead.whatsapp || !lead.trip_type || !lead.travel_date_estimate) {
    return NextResponse.json({ error: "Faltan campos obligatorios." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  let leadId: string | null = null;

  if (!supabase) {
    return NextResponse.json(
      {
        error: "Configuracion de Supabase incompleta en el servidor.",
        debug:
          process.env.NODE_ENV === "development"
            ? {
                missing: [
                  !process.env.NEXT_PUBLIC_SUPABASE_URL ? "NEXT_PUBLIC_SUPABASE_URL" : null,
                  !process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
                    ? "SUPABASE_SERVICE_ROLE_KEY o NEXT_PUBLIC_SUPABASE_ANON_KEY"
                    : null
                ].filter(Boolean)
              }
            : undefined
      },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.from("leads").insert(lead).select("id").single();

    if (error) {
      console.error("[leads] supabase insert error", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      const debug = process.env.NODE_ENV === "development"
        ? {
            code: error.code,
            details: error.details,
            hint: error.hint,
            message: error.message
          }
        : undefined;

      return NextResponse.json(
        {
          error: "No se pudo guardar el lead en Supabase.",
          debug
        },
        { status: 500 }
      );
    }

    leadId = data?.id ?? null;

  let sheets: { ok: boolean; skipped: boolean } | null = null;

  if (process.env.NODE_ENV === "development") {
    sheets = await sendLeadToSheets({
      type: "lead_brief",
      lead_id: leadId,
      ...lead
    }).catch(() => ({ ok: false, skipped: false }));
  } else {
    void sendLeadToSheets({
      type: "lead_brief",
      lead_id: leadId,
      ...lead
    }).catch(() => null);
  }

  return NextResponse.json({ ok: true, leadId, simulated: !supabase, sheets });
}

