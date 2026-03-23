import { createClient } from "@supabase/supabase-js";

export type LeadInsert = {
  name: string;
  email: string;
  whatsapp: string;
  trip_type: string;
  destination: string;
  travel_date_estimate: string;
  travelers_count: number | null;
  budget_range: string;
  message: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  landing_path?: string | null;
  status?: string;
};

export type BookingInsert = {
  name?: string | null;
  email?: string | null;
  whatsapp?: string | null;
  booking_tool: string;
  booking_datetime?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  landing_path?: string | null;
  status?: string;
};

export type ConversionEventInsert = {
  session_id: string;
  event_name: string;
  cta_location?: string | null;
  page_path?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  referrer?: string | null;
  metadata?: Record<string, unknown> | null;
};

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY?.trim();

  if (!url) {
    return null;
  }

  const key = serviceRoleKey || anonKey;

  if (!key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

