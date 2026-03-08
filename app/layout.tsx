import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

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
    default: "Luxe Lead AI Pro | AI Lead Management for Luxury Real Estate",
    template: "%s | Luxe Lead AI Pro",
  },
  description:
    "AI-powered lead management for luxury real estate agents. Automate nurture, follow-up, and pipeline workflows to close more high-end deals.",
  openGraph: {
    title: "Luxe Lead AI Pro",
    description:
      "AI-powered lead management for luxury real estate agents to increase consults, bookings, and closings.",
    url: "https://www.luxeleadpro.com",
    siteName: "Luxe Lead AI Pro",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Luxe Lead AI Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Lead AI Pro",
    description:
      "AI-powered lead management for luxury real estate agents.",
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
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
        {children}
      </body>
    </html>
  );
}
