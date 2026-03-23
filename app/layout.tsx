import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import { TrackingProvider } from "@/components/tracking-provider";
import { siteContent } from "@/content/site-content";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  keywords: [...siteContent.meta.keywords],
  icons: {
    icon: "/favicon.png"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteContent.meta.ogTitle,
    description: siteContent.meta.ogDescription,
    siteName: siteContent.brand.name,
    locale: "es_AR",
    images: [
      {
        url: absoluteUrl("/hero-poster.jpg"),
        width: 1200,
        height: 630,
        alt: siteContent.brand.name
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.ogTitle,
    description: siteContent.meta.ogDescription,
    images: [absoluteUrl("/hero-poster.jpg")]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={manrope.variable}>
      <body className="bg-bg font-sans text-text antialiased">
        <Script id="tripmood-datalayer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="tripmood-gtag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = window.gtag || gtag;
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', { send_page_view: true });
              `}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <Script id="tripmood-meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s){
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)
              }(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        ) : null}
        <TrackingProvider />
        {children}
      </body>
    </html>
  );
}


