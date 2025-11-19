import React from "react";
import Navbar from "../src/components/organisms/Navbar/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<main>{children}</main>
		</>
	);
};

export default Layout;
