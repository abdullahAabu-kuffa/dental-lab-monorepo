"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/apiClient";

import Lottie from "lottie-react";
import ScrollAnimation from "@/app/design-system/components/ScrollAnimation";
import Button from "@/components/atoms/Button/Button";
import animationData from "../../../../assets/lotties/teeth.json";

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");
		setError(null);

		try {
			const res = await apiFetch("/api/auth/forgot-password", {
				method: "POST",
				body: JSON.stringify({ email }),
				retryOn401: false,
			});
			setMessage("Reset link sent to your email (if it exists).");

			if (!res.ok) {
				setError("Failed to send reset link. Please try again.");
				return;
			}

			setMessage("Reset link sent to your email (if it exists).");
		} catch {
			setError("An unexpected error occurred.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-50/50 overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-blue-50/50 -z-10"></div>

			<div className="w-full max-w-5xl h-[90%] grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
				{/* FORM SECTION */}
				<div className="p-6 flex flex-col justify-center items-center space-y-6">
					<div className="flex-shrink-0 space-y-2 text-center w-full max-w-md">
						<h1 className="text-3xl font-extrabold text-gray-900">
							Forgot Your <span className="text-[#d8a832]">Password?</span>
						</h1>
						<p className="text-sm text-gray-600">
							Enter your email below and we’ll send a secure link to reset your
							password.
						</p>

						{error && (
							<div
								className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg mt-2"
								role="alert"
							>
								<p className="text-xs font-medium">{error}</p>
							</div>
						)}
						{message && (
							<div
								className="p-2 bg-green-100 border border-green-400 text-green-700 rounded-lg mt-2"
								role="alert"
							>
								<p className="text-xs font-medium">{message}</p>
							</div>
						)}
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-4 flex flex-col items-center w-full max-w-md"
					>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loading}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 text-gray-900"
							placeholder="Enter your email address"
						/>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md disabled:opacity-50"
						>
							{loading ? "Sending..." : "Send Reset Link"}
						</Button>

						{/* Additional content under button */}
						<div className="mt-4 text-gray-700 space-y-2 text-center text-sm">
							<p>
								If the link expires or you face any issues, you can request a
								new reset link anytime.
							</p>
							<p>
								For assistance, contact our{" "}
								<a href="/support" className="text-yellow-500 underline">
									Support Team
								</a>
								.
							</p>
							<p>
								We take your account security seriously. Never share your
								password with anyone.
							</p>
						</div>
					</form>
				</div>

				{/* ANIMATION & INFO ASIDE */}
				<div className="hidden md:flex flex-col justify-center items-center p-8 bg-[#d8a832]/10 border-l border-[#d8a832]/20">
					<div className="w-full max-w-xs mb-6 p-4 bg-white/80 rounded-3xl shadow-xl">
						<Lottie
							animationData={animationData}
							loop
							autoplay
							className="w-full h-auto"
							aria-hidden
						/>
					</div>

					<h3 className="text-2xl font-bold text-[#d8a832] mb-3 text-center">
						Your Security is Our Priority
					</h3>

					<p className="text-sm text-center text-gray-700 max-w-sm">
						We’ll send a secure link to your email. Make sure your inbox is
						accessible and check spam folders if necessary.
					</p>

					<div className="mt-4 text-xs text-center text-[#d8a832]">
						Need help? Contact support.
					</div>
				</div>
			</div>
		</main>
	);
}
