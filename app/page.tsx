import { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Mero Tech - Building Intelligent Systems for Modern Businesses",
  description: "AI Automation. Internal Tools. Scalable Infrastructure. Expert development services in AI automation, web applications, and cloud infrastructure based in Mt Pleasant, Harare.",
  keywords: ["AI automation", "web development", "cloud infrastructure", "internal tools", "AI agents", "DevOps", "Harare", "Zimbabwe"],
  openGraph: {
    title: "Mero Tech - Building Intelligent Systems for Modern Businesses",
    description: "AI Automation. Internal Tools. Scalable Infrastructure.",
    type: "website",
    url: "https://merotech.com",
    siteName: "Mero Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mero Tech - Building Intelligent Systems for Modern Businesses",
    description: "AI Automation. Internal Tools. Scalable Infrastructure.",
  },
};

export default function Home() {
  return <HomeClient />;
}
