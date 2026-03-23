import { normalizePhone } from "@/lib/utils";

const baseMessage = "Hola TripMood, quiero empezar a planificar un viaje a medida.";

export function buildWhatsAppMessage(extra?: string) {
  return [baseMessage, extra].filter(Boolean).join(" ");
}

export function buildWhatsAppUrl(extra?: string) {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491100000000";
  const phone = normalizePhone(rawNumber);
  const message = buildWhatsAppMessage(extra);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
