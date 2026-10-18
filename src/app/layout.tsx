import type { Metadata, Viewport } from "next";
import { Courgette, Figtree, Fraunces, Quicksand } from "next/font/google";
import Script from "next/script";
import { LogoDefs } from "@/components/brand/Logo";
import { MobileCallBar, ScrollProgress } from "@/components/layout/Chrome";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Providers } from "@/components/layout/Providers";
import { allServices } from "@/lib/services";
import { site } from "@/lib/site";
import "./globals.css";

// Variable weight axis only — the optional SOFT/WONK/opsz axes roughly doubled the font payload.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const courgette = Courgette({ subsets: ["latin"], weight: "400", variable: "--font-courgette", display: "swap" });
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-quicksand",
  display: "swap",
  preload: false,
});

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Home Health & Home Care in FL`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  ...(GOOGLE_VERIFICATION ? { verification: { google: GOOGLE_VERIFICATION } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#60349f",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.name,
  url: site.url,
  description: site.description,
  telephone: "+1-321-430-8194",
  faxNumber: "+1-855-257-1340",
  foundingDate: String(site.founded),
  founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: site.areas.map((a) => ({ "@type": "AdministrativeArea", name: `${a.county}, Florida` })),
  sameAs: [site.social.facebook, site.social.linkedin],
  identifier: { "@type": "PropertyValue", propertyID: "NPI", value: site.npi },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Home health & home care services",
    itemListElement: allServices.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name } })),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${courgette.variable} ${quicksand.variable}`}
      suppressHydrationWarning
    >
      <body>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        <LogoDefs />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCallBar />
        </Providers>
        {GTM_ID && (
          <Script id="gtm" strategy="lazyOnload">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </body>
    </html>
  );
}
