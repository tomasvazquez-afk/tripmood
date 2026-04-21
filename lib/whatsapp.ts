import { siteContent } from "@/content/site-content";
import { normalizePhone } from "@/lib/utils";

const baseMessage = "Hola HaruTravel, quiero empezar a planificar un viaje a medida.";

export function buildWhatsAppMessage(extra?: string) {
  return [baseMessage, extra].filter(Boolean).join(" ");
}

export function buildWhatsAppUrl(extra?: string) {
  const rawNumber = siteContent.brand.whatsappDisplay;
  const phone = normalizePhone(rawNumber);
  const message = buildWhatsAppMessage(extra);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
