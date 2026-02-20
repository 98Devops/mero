import { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Explore our successful projects in AI automation, web development, and cloud infrastructure. See how we've helped businesses transform through intelligent technology solutions.",
  keywords: ["portfolio", "projects", "AI automation", "web applications", "cloud infrastructure", "case studies", "Harare"],
  openGraph: {
    title: "Our Portfolio | Mero Tech",
    description: "Explore our successful projects and see how we've helped businesses transform.",
    type: "website",
    url: "https://merotech.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio | Mero Tech",
    description: "Explore our successful projects and see how we've helped businesses transform.",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
