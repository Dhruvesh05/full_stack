import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Shubh Construction | Civil & Industrial Construction Company",
    template: "%s | Shubh Construction",
  },

  description:
    "Shubh Construction is a trusted civil and industrial construction company in Bharuch, Gujarat, delivering quality projects on time.",

  openGraph: {
    title: "Shubh Construction",
    description: "Civil & industrial construction company in Bharuch, Gujarat",
    url: SITE_URL,
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png", // ✅ now resolves correctly
        width: 1200,
        height: 630,
        alt: "Shubh Construction",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ConstructionCompany"],
      name: "Shubh Construction",
      url: SITE_URL,
      logo: `${SITE_URL}/shubh-construction-logo.png`,
      telephone: "+919601940724",
      email: "J.talpada@shubhconstructions.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Office No. C-408, Narayan Luxuria, Umraj",
        addressLocality: "Bharuch",
        addressRegion: "Gujarat",
        postalCode: "392015",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Gujarat",
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
