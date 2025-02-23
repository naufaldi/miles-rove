import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/app/providers/react-query";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Award ASIAN Flight Search",
  description: "Award ASIAN Flight Search",
  metadataBase: new URL('https://miles-rove.vercel.app'),
  authors: [{ name: 'Award ASIAN Flight Search Development Team' }],
  keywords: ['Award ASIAN Flight Search', 'Flight Search', 'Award ASIAN', 'Flight'],

  // Favicon and icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miles-rove.vercel.app',
    siteName: 'Award ASIAN Flight Search',
    title: 'Award ASIAN Flight Search',
    description: 'Award ASIAN Flight Search',
    images: [
      {
        url: 'https://miles-rove.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Award ASIAN Flight Search',
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Award ASIAN Flight Search',
    description: 'Award ASIAN Flight Search',
    creator: '@awardasian',
    images: ['https://miles-rove.vercel.app/twitter-image.png'],
  },


};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
