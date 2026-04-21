"use client";

import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { SiteIcon } from "@/components/site-icon";
import { siteContent } from "@/content/site-content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerClass = menuOpen
    ? "border-white/10 bg-brand-primary text-white shadow-soft backdrop-blur-xl"
    : scrolled
      ? "border-border bg-surface shadow-soft backdrop-blur-xl"
      : "border-white/15 bg-brand-primary/20 text-white backdrop-blur-sm";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={cn(
          "section-shell flex items-center justify-between rounded-full border px-4 py-3 transition duration-300 sm:px-5",
          headerClass
        )}
      >
        <a href="#inicio" aria-label="Ir al inicio" className="shrink-0">
          <BrandMark light={menuOpen || !scrolled} compact />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteContent.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition hover:text-brand-accent",
                scrolled && !menuOpen ? "text-text" : "text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#brief"
            className={cn(
              "hidden rounded-full border px-4 py-2 text-sm font-semibold transition lg:inline-flex",
              scrolled && !menuOpen
                ? "border-brand-primary/12 bg-white text-brand-primary hover:border-brand-accent hover:bg-brand-accent/8 hover:text-brand-primary"
                : "border-white/30 bg-white/12 text-white hover:bg-white/18"
            )}
          >
            Completa el formulario
          </a>
          <a
            href={buildWhatsAppUrl("Quiero hablar con HaruTravel por WhatsApp.")}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "hidden rounded-full px-4 py-2 text-sm font-semibold transition sm:inline-flex",
              scrolled && !menuOpen
                ? "bg-brand-accent text-brand-primary hover:bg-brand-secondary hover:text-white"
                : "bg-white text-brand-primary hover:bg-brand-accent"
            )}
          >
            WhatsApp
          </a>
          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden",
              menuOpen
                ? "bg-white/12 text-white"
                : scrolled
                  ? "bg-brand-primary text-white"
                  : "bg-white/14 text-white backdrop-blur"
            )}
          >
            <SiteIcon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="section-shell mt-3 rounded-[2rem] border border-white/10 bg-brand-primary p-5 text-white shadow-soft backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {siteContent.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={buildWhatsAppUrl("Quiero hablar con HaruTravel por WhatsApp.")}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-primary transition hover:bg-brand-secondary hover:text-white"
          >
            Escribinos por WhatsApp
          </a>
          <a
            href="#brief"
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center rounded-full border border-white/30 bg-white/12 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Completa el formulario
          </a>
        </div>
      ) : null}
    </header>
  );
}
