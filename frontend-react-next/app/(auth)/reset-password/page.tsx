"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Lottie from "lottie-react";
import ScrollAnimation from "@/app/design-system/components/ScrollAnimation";
import Button from "@/app/src/components/atoms/Button/Button";
import animationData from "@/assets/lotties/teeth.json";
import { apiFetch } from "@/app/src/lib/apiClient";

export default function ResetPasswordPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<string | null>(null);

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!token) {
			setError("Invalid or missing reset token.");
			return;
		}
		if (password !== confirm) return setError("Passwords do not match.");

		setLoading(true);
		setMessage("");
		setError(null);

		try {
			const res = await apiFetch("/api/auth/reset-password", {
				method: "POST",
				body: JSON.stringify({
					token,
					newPassword: password,
				}),
				retryOn401: false, 
			});

			if (!res.ok) {
				setError("Failed to reset password. Please try again.");
				return;
			}

			setMessage(
				"Password reset successfully. You will be redirected to login."
			);
			setTimeout(() => router.push("/auth/login"), 2000);
		} catch (err) {
			console.error("Reset password error:", err);
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
							Reset Your <span className="text-[#d8a832]">Password</span>
						</h1>
						<p className="text-sm text-gray-600">
							Enter a strong new password. Your password should contain at least
							8 characters, including uppercase, lowercase, numbers, and special
							symbols.
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
						onSubmit={handleReset}
						className="space-y-4 flex flex-col items-center w-full max-w-md"
					>
						<input
							type="password"
							placeholder="New Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							disabled={loading}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 text-gray-900"
						/>
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirm}
							onChange={(e) => setConfirm(e.target.value)}
							required
							disabled={loading}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 text-gray-900"
						/>

						<Button
							type="submit"
							disabled={loading}
							className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 rounded-lg shadow-md disabled:opacity-50"
						>
							{loading ? "Resetting..." : "Reset Password"}
						</Button>

						{/* Additional content under button */}
						<div className="mt-4 text-gray-700 space-y-2 text-center text-sm">
							<p>
								After resetting your password, you will be redirected to the
								login page automatically.
							</p>
							<p>Keep your password secure and do not share it with anyone.</p>
							<p>
								If you experience any issues logging in, you can request a new
								reset link.
							</p>
							<p>
								Ensure your email inbox is accessible to receive future
								notifications.
							</p>
							<p>
								For assistance, contact our{" "}
								<a href="/support" className="text-yellow-500 underline">
									Support Team
								</a>
								.
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
						We take your account security seriously. Make sure your password is
						strong and never share it with anyone.
					</p>

					<div className="mt-4 text-xs text-center text-[#d8a832]">
						Need help? Contact support.
					</div>
				</div>
			</div>
		</main>
	);
}