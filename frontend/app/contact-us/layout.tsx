import type { Metadata } from "next";
import { buildUrl } from "@/utils/config";

export const metadata: Metadata = {
  title: "Contact Us | Shubh Construction – Get in Touch",
  description:
    "Contact Shubh Construction for your civil and industrial construction projects. Reach out to discuss your requirements and get expert consultation from our experienced team.",
  keywords: [
    "contact us",
    "construction company contact",
    "get in touch",
    "construction consultation",
    "project inquiry",
    "Shubh Construction contact",
    "Bharuch construction company",
  ],
  alternates: {
    canonical: buildUrl("/contact-us"),
  },
  openGraph: {
    title: "Contact Shubh Construction | Civil & Industrial Experts",
    description:
      "Get in touch with Shubh Construction for your construction projects. We're ready to discuss your requirements and provide expert consultation.",
    url: buildUrl("/contact-us"),
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Shubh Construction – Civil & Industrial Builders",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Shubh Construction",
    description:
      "Reach out to us for civil and industrial construction project consultations.",
    images: ["/og-image.png"],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
