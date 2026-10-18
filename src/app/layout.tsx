import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono, Caveat } from "next/font/google";
import "./globals.css";
import { NoiseOverlay } from "../components/NoiseOverlay";
import { SmoothScrolling } from "../components/SmoothScrolling";
import { CustomCursor } from "../components/CustomCursor";
import { Inkwell } from "../components/Inkwell";

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
  metadataBase: new URL("https://anubhavgupta.dev"),
  title: "Anubhav Gupta | Backend Engineer",
  description: "I build backends that don't break under pressure, and the interfaces that make them feel effortless. Specialized in Java, Spring Boot, and Node.js.",
  keywords: ["Backend Engineer", "Java", "Spring Boot", "Node.js", "Full Stack", "React Native", "PostgreSQL"],
  authors: [{ name: "Anubhav Gupta", url: "https://github.com/Anubhavg04" }],
  creator: "Anubhav Gupta",
  openGraph: {
    title: "Anubhav Gupta | Backend Engineer",
    description: "I build backends that don't break under pressure, and the interfaces that make them feel effortless.",
    url: "https://anubhavgupta.dev",
    siteName: "Anubhav Gupta Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Assuming an OG image exists here
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
    images: ["/og-image.jpg"],
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
  url: "https://anubhavgupta.dev", // Replace with actual URL if known
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
        <SmoothScrolling>
          <NoiseOverlay />
          <CustomCursor />
          {children}
          <Inkwell />
        </SmoothScrolling>
      </body>
    </html>
  );
}
