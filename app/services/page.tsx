import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive technology solutions including AI automation, web development, cloud infrastructure, and DevOps engineering. Expert services tailored to your business needs.",
  keywords: ["AI automation", "web development", "cloud infrastructure", "DevOps", "API integration", "internal tools", "AI consulting", "Harare"],
  openGraph: {
    title: "Our Services | Mero Tech",
    description: "Comprehensive technology solutions to accelerate your business growth.",
    type: "website",
    url: "https://merotech.com/services",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Mero Tech",
    description: "Comprehensive technology solutions to accelerate your business growth.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
