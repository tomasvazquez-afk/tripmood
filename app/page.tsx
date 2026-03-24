import { AboutSection } from "@/components/about-section";
import { BriefForm } from "@/components/brief-form";
import { CompactItineraryJourney } from "@/components/compact-itinerary-journey";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { InspirationGrid } from "@/components/inspiration-grid";
import { MobileStickyCta } from "@/components/mobile-sticky-cta";
import { SeoJsonLd } from "@/components/seo-json-ld";
import { TrustPulseCards } from "@/components/trust-pulse-cards";
export default function HomePage() {
  return (
    <>
      <SeoJsonLd />
      <Header />
      <main className="relative overflow-hidden">
        <Hero />
        <AboutSection />
        <CompactItineraryJourney />
        <TrustPulseCards />
        <InspirationGrid />
        <FinalCta />
        <BriefForm />
      </main>
      <Footer />
      <MobileStickyCta />
    </>
  );
}
