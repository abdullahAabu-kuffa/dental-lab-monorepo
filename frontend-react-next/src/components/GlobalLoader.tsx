"use client";

import Lottie from "lottie-react";
import animationData from "../../assets/lotties/Loading text.json";
import { useLoading } from "../contexts/LoadingContext";

export default function GlobalLoader() {
	const { isLoading } = useLoading();

	if (!isLoading) return null;

	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<div className="w-full flex justify-center">
				<Lottie
					animationData={animationData}
					loop
					autoplay
					style={{ width: 300, height: 300 }}
				/>
			</div>
		</div>
	);
}
