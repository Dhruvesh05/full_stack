import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import TopButton from '@/components/TopButton';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shubh Construction | Civil & Industrial Construction Company",
    template: "%s | Shubh Construction",
  },
  description:
    "Shubh Construction is a trusted civil and industrial construction company in Bharuch, Gujarat, delivering quality projects on time.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ConstructionCompany"],

      "name": "Shubh Construction",
      "url": "https://shubhconstructions.com",
      "logo": "https://shubhconstructions.com/shubh-construction-logo.png",

      "telephone": "+919601940724",
      "email": "J.talpada@shubhconstructions.com",

      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office No. C-408, Narayan Luxuria, Umraj",
        "addressLocality": "Bharuch",
        "addressRegion": "Gujarat",
        "postalCode": "392015",
        "addressCountry": "IN",
      },

      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Gujarat",
      },

      "sameAs": [
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
        <TopButton/>
      </body>
    </html>
  );
}
