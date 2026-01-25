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
  title: "Nepali Year Progress | Track Your Year in Nepali Calendar",
  description:
    "Track your progress through the Nepali year with beautiful visualizations. See how many days have passed in the Nepali calendar year with daily updates.",
  keywords:
    "Nepali year progress, Nepali calendar, Bikram Sambat, year tracker, Nepali date converter",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nepali Year Progress | Track Your Year in Nepali Calendar",
    description:
      "Track your progress through the Nepali year with beautiful visualizations. See how many days have passed in the Nepali calendar year with daily updates.",
    siteName: "Nepali Year Progress",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nepali Year Progress",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nepali Year Progress | Track Your Year in Nepali Calendar",
    description:
      "Track your progress through the Nepali year with beautiful visualizations. See how many days have passed in the Nepali calendar year with daily updates.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/logo.svg",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
