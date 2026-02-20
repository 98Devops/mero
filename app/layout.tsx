import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/navigation/Header";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Mero Tech - Building Intelligent Systems for Modern Businesses",
    template: "%s | Mero Tech",
  },
  description: "AI Automation. Internal Tools. Scalable Infrastructure. Expert development services in AI automation, web applications, and cloud infrastructure based in Mt Pleasant, Harare.",
  keywords: ["AI automation", "web development", "cloud infrastructure", "internal tools", "AI agents", "DevOps", "Harare", "Zimbabwe"],
  authors: [{ name: "Mero Tech" }],
  creator: "Mero Tech",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://merotech.com",
    title: "Mero Tech - Building Intelligent Systems for Modern Businesses",
    description: "AI Automation. Internal Tools. Scalable Infrastructure.",
    siteName: "Mero Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mero Tech - Building Intelligent Systems for Modern Businesses",
    description: "AI Automation. Internal Tools. Scalable Infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mero Tech",
    "url": "https://merotech.com",
    "logo": "https://merotech.com/logo.png",
    "description": "AI Automation. Internal Tools. Scalable Infrastructure. Expert development services in AI automation, web applications, and cloud infrastructure.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mt Pleasant",
      "addressRegion": "Harare",
      "addressCountry": "ZW"
    },
    "sameAs": [
      "https://twitter.com/merotech",
      "https://linkedin.com/company/merotech"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Business Inquiries",
      "url": "https://merotech.com/contact"
    }
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={inter.className}>
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
