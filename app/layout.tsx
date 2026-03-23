import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luxeleadpro.com"),
  title: {
    default: "LuxeLeadPro | AI Lead Scoring for Luxury Real Estate",
    template: "%s | LuxeLeadPro",
  },
  description:
    "Close 2x more luxury deals with AI-powered lead scoring. Know your best prospects every morning. TCPA/DNC compliant. Built for $1M+ markets.",
  openGraph: {
    title: "LuxeLeadPro | AI Lead Scoring for Luxury Real Estate",
    description:
      "Close 2x more luxury deals with AI-powered lead scoring. Know your best prospects every morning. TCPA/DNC compliant. Built for $1M+ markets.",
    url: "https://www.luxeleadpro.com",
    siteName: "LuxeLeadPro",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "LuxeLeadPro - AI Lead Scoring for Luxury Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxeLeadPro | AI Lead Scoring for Luxury Real Estate",
    description:
      "Close 2x more luxury deals with AI-powered lead scoring. TCPA/DNC compliant. Built for $1M+ markets.",
    images: ["/twitter-image"],
  },
  alternates: {
    canonical: "https://www.luxeleadpro.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-white text-gray-900`}
      >
        <AuthProvider>
          {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
              />
              <Script id="ga4-init" strategy="afterInteractive">
                {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `}
              </Script>
            </>
          )}
          {process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID && (
            <Script id="crisp-widget" strategy="afterInteractive">
              {`window.$crisp=[];window.CRISP_WEBSITE_ID="${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
            </Script>
          )}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
