import { BrandMark } from "@/components/brand-mark";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg pb-28 pt-12 md:pb-12">
      <div className="section-shell grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)] lg:items-start">
        <div className="flex flex-col items-start text-left">
          <BrandMark />
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            Una forma diferente de planear y vivir tus viajes.
          </p>
        </div>

        <div className="flex flex-col items-start text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">Contacto</p>
          <div className="mt-4 space-y-3 text-sm text-text">
            <a
              href={`mailto:${siteContent.brand.email}`}
              className="flex items-start justify-start gap-2 break-all text-text transition hover:text-brand-accent"
            >
              <SiteIcon name="mail" className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{siteContent.brand.email}</span>
            </a>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-start gap-2 text-text transition hover:text-brand-accent"
            >
              <SiteIcon name="whatsapp" className="h-4 w-4 shrink-0" />
              <span>{siteContent.brand.whatsappDisplay}</span>
            </a>
            <p className="text-text">{siteContent.brand.legajo}</p>
          </div>
        </div>

        <div className="flex flex-col items-start text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">Instagram</p>
          <a
            href={siteContent.brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-start gap-2 text-sm text-text transition hover:text-brand-accent"
          >
            <SiteIcon name="instagram" className="h-4 w-4 shrink-0" />
            {siteContent.brand.instagramHandle}
          </a>
        </div>

        <div className="flex flex-col items-start text-left">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-muted">Accesos rapidos</p>
          <nav className="mt-4 flex flex-col items-start gap-3 text-sm text-text">
            {siteContent.footer.quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-text transition hover:text-brand-accent">
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              className="mt-2 inline-flex w-fit items-center justify-start rounded-full bg-brand-primary px-4 py-2 text-white transition hover:bg-brand-secondary"
            >
              Ir a contacto
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
