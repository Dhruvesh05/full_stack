import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TopButton from '@/components/TopButton';
import CallButton from "@/components/CallButton";
import AnimationProvider from "@/components/AnimationProvider";
import { SITE_URL } from "@/utils/config";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Shubh Construction | Leading Civil & Industrial Builders in Bharuch",
    template: "%s | Shubh Construction",
  },

  description:
    "Shubh Construction is a premier civil and industrial construction company in Bharuch, Gujarat. We deliver quality infrastructure projects with expertise, reliability, and proven excellence since 2017.",

  keywords: [
    "civil construction",
    "industrial construction",
    "construction company",
    "Bharuch contractors",
    "Gujarat builders",
    "factory construction",
    "warehouse construction",
    "infrastructure projects",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Shubh Construction | Civil & Industrial Excellence",
    description: "Premier construction partner for industrial facilities and infrastructure projects across India",
    url: SITE_URL,
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shubh Construction - Civil & Industrial Builders",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shubh Construction | Civil & Industrial Builders",
    description: "Delivering excellence in civil and industrial construction projects",
    images: ["/og-image.png"],
    creator: "@shubhconstructions",
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ConstructionCompany"],
      name: "Shubh Construction",
      url: SITE_URL,
      logo: `${SITE_URL}/shubh-construction-logo.png`,
      image: `${SITE_URL}/og-image.png`,
      description: "Premier civil and industrial construction company delivering quality projects",
      telephone: "+919106286479",
      email: "J.talpada@shubhconstructions.com",
      foundingDate: "2017",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        telephone: "+919106286479",
        availableLanguage: ["en", "hi", "gu"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. C-408, Narayan Luxuria, Umraj",
        addressLocality: "Bharuch",
        addressRegion: "Gujarat",
        postalCode: "392001",
        addressCountry: "IN",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Gujarat",
        },
        {
          "@type": "AdministrativeArea",
          name: "India",
        },
      ],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "90",
      },
      sameAs: [
        "https://www.facebook.com/shubhconstruction2017/",
        "https://in.linkedin.com/in/shubh-construction-85850791",
      ],
    }),
  },
};





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Raleway:ital,wght@0,100..900;1,100..900&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${dmSans.variable} antialiased`}
      >
        <AnimationProvider>
          <Navbar />
          {children}
          <Footer />
          <TopButton/>
          <CallButton />
        </AnimationProvider>
      </body>
    </html>
  );
}
