import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/QueryProvider";
import Provider from "./provider";
import { LoadingProvider } from "./src/contexts/LoadingContext";
import GlobalLoader from "./src/components/GlobalLoader";
import { getSession } from "./src/lib/dal/session";
import { TokenRefreshInitializer } from "./src/components/TokenRefreshInitializer";
import NavbarWrapper from "./src/components/organisms/Navbar/NavbarWrapper";
import FooterWrapper from "./src/components/organisms/Footer/FooterWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Avante Dental Lab",
  icons: { icon: `/search.png` },
  description:
    "Revolutionizing dental restoration with ExoCAD integration, real-time tracking, and instant online payments",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getSession();
  // console.log("user session : ", session);
  return (
    <html lang="en">
      <body>
        <Provider>
          <QueryProvider>
            <TokenRefreshInitializer />
            <NavbarWrapper />
            {/* <AuthProvider> */}
            <LoadingProvider>
              <GlobalLoader />
              {children}
            </LoadingProvider>
            <FooterWrapper />
            {/* </AuthProvider> */}
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}
