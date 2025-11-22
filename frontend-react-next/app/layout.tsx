import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/QueryProvider";
import { AuthProvider } from "./src/context/AuthContext";
import Provider from "./provider";
import { LoadingProvider } from "./src/contexts/LoadingContext";
import GlobalLoader from "./src/components/GlobalLoader";



const playfair = Playfair_Display({
	variable: "--font-playfair",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Avante Dental Lab",

	description:
		"Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
      <body className={`${playfair.variable} antialiased`}>
        <Provider>
          <QueryProvider>
            <AuthProvider>
              <LoadingProvider>
                <GlobalLoader />
                {children}
              </LoadingProvider>
            </AuthProvider>
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
