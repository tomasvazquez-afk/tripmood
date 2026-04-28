import { siteContent } from "@/content/site-content";
import type { LeadInsert } from "@/lib/supabase";

type LeadNotificationPayload = LeadInsert & {
  lead_id: string | null;
};

type LeadNotificationResult =
  | { ok: true; skipped: false }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; skipped: false; reason: string };

function formatValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Sin especificar";
  return String(value);
}

function escapeHtml(value: unknown) {
  return formatValue(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizeEmailEnvValue(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  const first = trimmed[0];
  const last = trimmed[trimmed.length - 1];

  if ((first === `"` && last === `"`) || (first === "'" && last === "'")) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function buildRows(lead: LeadNotificationPayload) {
  return [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["WhatsApp", lead.whatsapp],
    ["Tipo de viaje", lead.trip_type],
    ["Destino", lead.destination],
    ["Fecha estimada", lead.travel_date_estimate],
    ["Cantidad de viajeros", lead.travelers_count],
    ["Presupuesto", lead.budget_range],
    ["Mensaje", lead.message || "Sin mensaje"],
    ["Origen UTM", lead.utm_source],
    ["Medio UTM", lead.utm_medium],
    ["Campania UTM", lead.utm_campaign],
    ["Contenido UTM", lead.utm_content],
    ["Referrer", lead.referrer],
    ["Landing path", lead.landing_path],
    ["Lead ID", lead.lead_id]
  ];
}

function buildTextEmail(lead: LeadNotificationPayload) {
  return [
    "Nuevo lead desde el formulario de HaruTravel",
    "",
    ...buildRows(lead).map(([label, value]) => `${label}: ${formatValue(value)}`)
  ].join("\n");
}

function buildHtmlEmail(lead: LeadNotificationPayload) {
  const rows = buildRows(lead)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#4e1f30;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#2f2830;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#2f2830;">
      <h1 style="margin:0 0 16px;color:#4e1f30;font-size:22px;">Nuevo lead desde HaruTravel</h1>
      <p style="margin:0 0 20px;">Una persona completo el formulario de brief en la web.</p>
      <table style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #eee;">
        <tbody>${rows}</tbody>
      </table>
    </div>`;
}

export async function sendLeadNotificationEmail(
  lead: LeadNotificationPayload
): Promise<LeadNotificationResult> {
  const apiKey = normalizeEmailEnvValue(process.env.RESEND_API_KEY);
  const from = normalizeEmailEnvValue(process.env.LEAD_NOTIFICATION_FROM);
  const to = normalizeEmailEnvValue(process.env.LEAD_NOTIFICATION_TO) || siteContent.brand.email;

  if (!apiKey) {
    return { ok: false, skipped: true, reason: "RESEND_API_KEY no configurada." };
  }

  if (!from) {
    return { ok: false, skipped: true, reason: "LEAD_NOTIFICATION_FROM no configurada." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: lead.email,
      subject: `Nuevo lead HaruTravel - ${lead.name}`,
      text: buildTextEmail(lead),
      html: buildHtmlEmail(lead)
    })
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    return {
      ok: false,
      skipped: false,
      reason: details || `Resend respondio con status ${response.status}.`
    };
  }

  return { ok: true, skipped: false };
}
