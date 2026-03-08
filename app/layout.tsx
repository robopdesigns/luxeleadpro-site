import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxe Lead AI Pro",
    description:
      "AI-powered lead management for luxury real estate agents.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
