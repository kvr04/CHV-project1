import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXORIA PALACE | Cinematic Luxury Hotel & Private Retreat",
  description:
    "Enter a realm where architecture, comfort, and emotion become one timeless experience. Explore curated suites, custom private spa, and elite fine dining at Luxoria Palace.",
  keywords: [
    "Luxoria Palace",
    "luxury hotel",
    "Aman Resorts style",
    "Four Seasons Retreat",
    "premium hospitality",
    "architectural experience",
    "cinematic hotel website",
  ],
  authors: [{ name: "Luxoria Palace Royal Hospitality" }],
  openGraph: {
    title: "LUXORIA PALACE | Cinematic Luxury Hotel & Private Retreat",
    description:
      "Enter a realm where architecture, comfort, and emotion become one timeless experience. Explore curated suites, custom private spa, and elite fine dining.",
    type: "website",
    locale: "en_US",
    siteName: "Luxoria Palace",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUXORIA PALACE | Cinematic Luxury Hotel",
    description: "Discover modern architectural luxury hospitality at Luxoria Palace.",
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
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-background text-ink selection:bg-champagne selection:text-white">
        {children}
      </body>
    </html>
  );
}
