import { siteContent } from "@/content/site-content";
import { normalizePhone } from "@/lib/utils";

const baseMessage = "Hola! Quiero empezar a planear un viaje y me gustaría recibir más información :)";

export function buildWhatsAppMessage(extra?: string) {
  void extra;
  return baseMessage;
}

export function buildWhatsAppUrl(extra?: string) {
  const rawNumber = siteContent.brand.whatsappDisplay;
  const phone = normalizePhone(rawNumber);
  const message = buildWhatsAppMessage(extra);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
