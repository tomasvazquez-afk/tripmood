import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  type BookingInsert,
  type ConversionEventInsert
} from "@/lib/supabase";
import { VALID_EVENT_NAMES } from "@/lib/analytics";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

function toNullableString(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`events:${ip}`, 120, 60 * 1000)) {
    return NextResponse.json({ error: "Demasiadas solicitudes." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);

  if (!body?.event_name || !body?.session_id) {
    return NextResponse.json({ error: "Payload invalido." }, { status: 400 });
  }

  if (!(VALID_EVENT_NAMES as readonly string[]).includes(body.event_name)) {
    return NextResponse.json({ error: "Evento desconocido." }, { status: 400 });
  }

  const eventPayload: ConversionEventInsert = {
    session_id: String(body.session_id),
    event_name: String(body.event_name),
    cta_location: toNullableString(body.cta_location),
    page_path: toNullableString(body.page_path),
    utm_source: toNullableString(body.utm_source),
    utm_medium: toNullableString(body.utm_medium),
    utm_campaign: toNullableString(body.utm_campaign),
    utm_content: toNullableString(body.utm_content),
    referrer: toNullableString(body.referrer),
    metadata: typeof body.metadata === "object" && body.metadata !== null ? body.metadata : null
  };

  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ ok: true, simulated: true });
  }

  const { error } = await supabase.from("conversion_events").insert(eventPayload);

  if (error) {
    return NextResponse.json({ error: "No se pudo guardar el evento." }, { status: 500 });
  }

  if (eventPayload.event_name === "calendar_booking_completed" && eventPayload.metadata) {
    const metadata = eventPayload.metadata as Record<string, unknown>;
    const booking = (metadata.booking as Record<string, unknown> | undefined) || metadata;

    const bookingPayload: BookingInsert = {
      name: toNullableString(booking.name),
      email: toNullableString(booking.email),
      whatsapp: toNullableString(booking.whatsapp),
      booking_tool: "cal.com",
      booking_datetime: toNullableString(booking.startTime) || toNullableString(booking.booking_datetime),
      utm_source: eventPayload.utm_source,
      utm_medium: eventPayload.utm_medium,
      utm_campaign: eventPayload.utm_campaign,
      utm_content: eventPayload.utm_content,
      referrer: eventPayload.referrer,
      landing_path: eventPayload.page_path,
      status: "confirmed"
    };

    await supabase.from("bookings").insert(bookingPayload);
  }

  return NextResponse.json({ ok: true });
}
