import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "./src/components/organisms/Navbar/Navbar";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {

  title: "Egypt's First Digital Dental Lab",
  description: "Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${notoSansArabic.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
