"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { motionVariants } from "@/app/design-system/";
import { apiFetch } from "@/app/src/lib/apiClient";
import Button from "@/app/src/components/atoms/Button/Button";
import GoldenGlow from "@/app/src/components/atoms/GoldenGlow/GoldenGlow";

import { z } from "zod";
import animationData from "@/assets/lotties/Cleantooth.json";

// Zod schema for simple validation
const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(
			/^[A-Za-z0-9!@#$%^&*()_+=-]+$/,
			"Password contains invalid characters"
		),
});

export default function LoginPage() {
	const router = useRouter();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [glowActive, setGlowActive] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");
	const [validationErrors, setValidationErrors] = useState<{
		email?: string;
		password?: string;
	}>({});

	// Validate each field on change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));

		try {
			loginSchema.pick({ [name]: true }).parse({ [name]: value });
			setValidationErrors((prev) => ({ ...prev, [name]: undefined }));
		} catch (err) {
			if (err instanceof z.ZodError) {
				setValidationErrors((prev) => ({
					...prev,
					[name]: err.issues[0].message,
				}));
			}
		}
	};

	const isFormValid =
		!validationErrors.email &&
		!validationErrors.password &&
		formData.email &&
		formData.password;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setGlowActive(true);
		setErrorMessage("");

		try {
			const result = loginSchema.safeParse(formData);
			if (!result.success) {
				setErrorMessage("Please correct the highlighted fields.");
				setLoading(false);
				setGlowActive(false);
				return;
			}

			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				const data = await res.json();
				setErrorMessage(data?.message || "Invalid credentials");
				setLoading(false);
				setGlowActive(false);
				return;
			}
			const data = await res.json();
			localStorage.setItem("accessToken", data.data.accessToken);
			const meRes = await apiFetch("/api/users/me", {
				headers: {
					Authorization: `Bearer ${data.data.accessToken}`,
				},
			});

			if (!meRes.ok) {
				setErrorMessage("Failed to fetch user info");
				return;
			}

			const meData = await meRes.json();
			const role = meData?.data?.user?.role;

			switch (role) {
				case "ADMIN":
					router.push("/dashboard/admin");
					break;
				case "CLIENT":
					router.push("/");
					break;
			}
		} catch {
			setErrorMessage("Something went wrong. Try again.");
		} finally {
			setLoading(false);
			setGlowActive(false);
		}
	};

	return (
		<div className="min-h-[90] flex flex-col lg:flex-row items-center justify-center bg-[#FDFBF7] p-8">
			<GoldenGlow isActive={glowActive} intensity="medium" />

			<motion.div
				className="w-full max-w-md bg-white p-12 rounded-2xl shadow-xl relative z-10 mx-auto lg:mx-4"
				//{...motionVariants.fadeInUp(0.2)}
			>
				<h1 className="text-3xl font-bold text-gray-900 text-left mb-2">
					Welcome Back
				</h1>
				<p className="text-gray-600 mb-8 text-left">
					Start your journey with us. Fill in the details to get started.
				</p>

				<form onSubmit={handleSubmit} className="flex flex-col space-y-6">
					<div>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							autoComplete="mail"
							autoFocus
							className="w-full p-3 rounded-xl bg-white text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#E4B441] focus:ring-1 focus:ring-[#E4B441]"
						/>
						{validationErrors.email && (
							<p className="text-red-600 text-sm mt-1">
								{validationErrors.email}
							</p>
						)}
					</div>

					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							autoComplete="password"
							onChange={handleChange}
							className="w-full p-3 rounded-xl bg-white text-gray-800 border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#E4B441] focus:ring-1 focus:ring-[#E4B441]"
						/>
						{validationErrors.password && (
							<p className="text-red-600 text-sm mt-1">
								{validationErrors.password}
							</p>
						)}
					</div>

					<div className="flex justify-end">
						<a href="#" className="text-[#886D2D] text-sm hover:underline">
							Forgot password?
						</a>
					</div>

					<Button
						type="submit"
						variant="primary"
						className="w-full"
						disabled={loading || !isFormValid}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</form>

				{errorMessage && (
					<p className="text-red-600 text-center mt-4 text-sm">
						{errorMessage}
					</p>
				)}
			</motion.div>

			<div className="w-full max-w-md h-[400px] lg:h-[650px] bg-[#F9F5EE] p-12 rounded-2xl flex flex-col justify-center items-center text-center mx-auto lg:mx-4 mt-8 lg:mt-0">
				<div className="w-full max-w-xs mb-4">
					<Lottie animationData={animationData} loop autoplay />
				</div>

				<h2 className="text-xl font-bold text-[#886D2D] mt-4 mb-3">
					Your Security is Our Priority
				</h2>
				<p className="text-sm text-gray-700">
					By logging in, you acknowledge that **manual verification** is
					required for security and compliance purposes. We l notify you once
					your account is activated.
				</p>
			</div>
		</div>
	);
}
