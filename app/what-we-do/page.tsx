import { Metadata } from "next";
import WhatWeDoClient from "./WhatWeDoClient";

export const metadata: Metadata = {
  title: "What We Do",
  description: "Building intelligent systems that transform how businesses operate. Learn about our approach to AI automation, web development, and cloud infrastructure.",
  keywords: ["AI automation", "business transformation", "intelligent systems", "cloud infrastructure", "web development", "Harare"],
  openGraph: {
    title: "What We Do | Mero Tech",
    description: "Building intelligent systems that transform how businesses operate.",
    type: "website",
    url: "https://merotech.com/what-we-do",
  },
  twitter: {
    card: "summary_large_image",
    title: "What We Do | Mero Tech",
    description: "Building intelligent systems that transform how businesses operate.",
  },
};

export default function WhatWeDo() {
  return <WhatWeDoClient />;
}
