import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "./src/components/organisms/Navbar/Navbar";
import Sidebar from "./dashboard/_components/@sidebar";
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
      >
        {/* <Sidebar /> */}
        {/* <Navbar /> */}
        {children} 
      </body>
    </html>
  );
}
