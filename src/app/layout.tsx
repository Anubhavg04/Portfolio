import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "../components/NoiseOverlay";
import { SmoothScrolling } from "../components/SmoothScrolling";
import { CustomCursor } from "../components/CustomCursor";
import { Inkwell } from "../components/Inkwell";
import { SITE_URL } from "../lib/constants";
import { Analytics } from "@vercel/analytics/next";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces"
});
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument"
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anubhav Gupta | Backend Engineer",
  description: "I build backends that don't break under pressure, and the interfaces that make them feel effortless. Specialized in Java, Spring Boot, and Node.js.",
  keywords: ["Backend Engineer", "Java", "Spring Boot", "Node.js", "Full Stack", "System Design", "PostgreSQL"],
  authors: [{ name: "Anubhav Gupta", url: "https://github.com/Anubhavg04" }],
  creator: "Anubhav Gupta",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Anubhav Gupta | Backend Engineer",
    description: "I build backends that don't break under pressure, and the interfaces that make them feel effortless.",
    url: SITE_URL,
    siteName: "Anubhav Gupta Portfolio",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Anubhav Gupta — Backend Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anubhav Gupta | Backend Engineer",
    description: "I build backends that don't break under pressure, and the interfaces that make them feel effortless.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Anubhav Gupta",
  url: SITE_URL,
  jobTitle: "Backend Engineer",
  sameAs: [
    "https://github.com/Anubhavg04",
    "https://linkedin.com/in/Anubhavg23",
    "https://x.com/Dev_code_04"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${instrument.variable} ${jetbrains.variable} ${caveat.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased selection:bg-accent selection:text-white relative font-sans overflow-x-hidden min-h-screen">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <SmoothScrolling>
          <NoiseOverlay />
          <CustomCursor />
          {children}
          <Inkwell />
        </SmoothScrolling>
        <Analytics />
      </body>
    </html>
  );
}
