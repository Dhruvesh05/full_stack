import type { Metadata } from "next";
import { buildUrl } from "@/utils/config";

export const metadata: Metadata = {
  title: "Careers | Join Shubh Construction Team",
  description:
    "Build your career with Shubh Construction. We're hiring talented professionals for civil and industrial construction projects. Join our growing team in Gujarat.",
  keywords: [
    "careers",
    "jobs",
    "job opportunities",
    "construction jobs",
    "Bharuch jobs",
    "career opportunities",
    "construction company careers",
    "work with us",
    "hiring",
  ],
  alternates: {
    canonical: buildUrl("/careers"),
  },
  openGraph: {
    title: "Careers at Shubh Construction | Join Our Team",
    description:
      "Explore career opportunities with Shubh Construction. Join a team dedicated to excellence in civil and industrial construction.",
    url: buildUrl("/careers"),
    siteName: "Shubh Construction",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Careers at Shubh Construction – Join Our Team",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers at Shubh Construction",
    description:
      "Join our team and build a career in civil and industrial construction with Shubh Construction.",
    images: ["/og-image.png"],
  },
};

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
