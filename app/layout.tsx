import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { PageTransition } from "@/components/effects/PageTransition";
import { FloatingNav } from "@/components/navigation/FloatingNav";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Akshat Kumar — Developer, DevRel & Community Builder",
  description: "Akshat Kumar is a developer, Developer Relations professional and community builder working across AI, software engineering, open source and developer ecosystems.",
  keywords: ["Akshat Kumar", "Developer Relations", "Community Builder", "AI", "Software Engineer", "Open Source"],
  openGraph: {
    title: "Akshat Kumar — Developer, DevRel & Community Builder",
    description: "Building products, communities and moments around technology.",
    type: "website",
    locale: "en_US",
    siteName: "Akshat Kumar",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Akshat Kumar — Developer, DevRel & Community Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akshat Kumar — Developer, DevRel & Community Builder",
    description: "Building products, communities and moments around technology.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Akshat Kumar",
    jobTitle: "Developer, Developer Relations and Community Builder",
    description: "Developer, Developer Relations professional and community builder working across AI, software engineering, open source and developer ecosystems.",
    email: "mailto:kumarakshat366@gmail.com",
    url: "https://github.com/AKR4PC",
    sameAs: ["https://www.linkedin.com/in/zob07", "https://github.com/AKR4PC"],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <PageTransition />
        <NoiseOverlay />
        <CustomCursor />
        <FloatingNav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
