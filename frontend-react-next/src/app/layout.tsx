import type { Metadata } from "next";
// import { Playfair_Display } from "next/font/google";
import "./[locale]/globals.css";
import { QueryProvider } from "../../QueryProvider";
import Provider from "./[locale]/provider";
import { LoadingProvider } from "@/contexts/LoadingContext";
import GlobalLoader from "@/components/GlobalLoader";
import { TokenRefreshInitializer } from "@/components/TokenRefreshInitializer";
import NavbarWrapper from "@/components/organisms/Navbar/NavbarWrapper";
import FooterWrapper from "@/components/organisms/Footer/FooterWrapper";

// const playfair = Playfair_Display({
// 	variable: "--font-playfair",
// 	subsets: ["latin"],
// 	weight: ["400", "500", "600", "700", "800", "900"],
// });

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
	return (
		<html lang="en">
			<body>
				<Provider>
					<QueryProvider>
						<TokenRefreshInitializer />
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
