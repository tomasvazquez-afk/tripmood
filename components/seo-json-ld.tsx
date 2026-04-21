import { siteContent } from "@/content/site-content";
import { absoluteUrl, normalizePhone } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function SeoJsonLd() {
  const organizationId = `${siteUrl}#organization`;
  const websiteId = `${siteUrl}#website`;
  const webpageId = `${siteUrl}#webpage`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: siteContent.brand.name,
      alternateName: "HaruTravel",
      url: siteUrl,
      logo: absoluteUrl("/Logo%20Oscuro%20II.png"),
      image: absoluteUrl("/hero-poster.jpg"),
      description:
        "Agencia de viajes en Argentina especializada en viajes a medida y viajes personalizados con atención cercana por WhatsApp.",
      email: siteContent.brand.email,
      telephone: `+${normalizePhone(siteContent.brand.whatsappDisplay)}`,
      sameAs: [siteContent.brand.instagramUrl],
      areaServed: {
        "@type": "Country",
        name: "Argentina"
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: siteContent.brand.email,
          telephone: `+${normalizePhone(siteContent.brand.whatsappDisplay)}`,
          availableLanguage: ["es-AR", "es"],
          areaServed: "AR"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": websiteId,
      url: siteUrl,
      name: siteContent.brand.name,
      inLanguage: "es-AR",
      publisher: {
        "@id": organizationId
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": webpageId,
      url: siteUrl,
      name: siteContent.meta.title,
      description: siteContent.meta.description,
      inLanguage: "es-AR",
      isPartOf: {
        "@id": websiteId
      },
      about: {
        "@id": organizationId
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Viajes a medida y viajes personalizados",
      name: "Planificación de viajes personalizados",
      description:
        "Diseño de viajes a medida, itinerarios personalizados y asesoramiento de viajes con atención cercana.",
      provider: {
        "@id": organizationId
      },
      areaServed: {
        "@type": "Country",
        name: "Argentina"
      },
      availableLanguage: ["es-AR", "es"],
      audience: {
        "@type": "Audience",
        audienceType: "Viajeros que buscan viajes personalizados"
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas)
      }}
    />
  );
}
