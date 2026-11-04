import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/config/site";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackgroundCanvas from "@/components/ui/BackgroundCanvas";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const viewport: Viewport = {
  width: "device-width", initialScale: 1, viewportFit: "cover",
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#fbf8ff" }, { media: "(prefers-color-scheme: dark)", color: "#0f1123" }],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | Awais Naseer" },
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.fullName, url: SITE.url }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE.url, title: SITE.title, description: SITE.description, siteName: SITE.name },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Person", name: SITE.fullName, url: SITE.url, jobTitle: "Principal Software Engineer", email: SITE.email, sameAs: [SITE.linkedin, SITE.github] },
    { "@type": "ProfessionalService", name: `${SITE.name} – Software Engineering & Architecture`, url: SITE.url, description: SITE.description },
  ],
};
const themeInit = `try{if(localStorage.getItem("theme")!=="light")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <BackgroundCanvas />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand focus:px-4 focus:py-2 focus:text-on">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
