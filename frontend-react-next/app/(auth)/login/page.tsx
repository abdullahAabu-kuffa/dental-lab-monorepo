"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
	typography,
	gradients,
	motionVariants,
} from "@/app/design-system/variables";

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
			// Final validation before submit
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

			router.push("/dashboard");
		} catch {
			setErrorMessage("Something went wrong. Try again.");
		} finally {
			setLoading(false);
			setGlowActive(false);
		}
	};

	return (
		<div
			className=" flex items-center justify-center bg-black overflow-hidden px-4 mt-18"
			style={{ background: gradients.darkBg }}
		>
			{/* Full width animation at top */}

			<GoldenGlow isActive={glowActive} intensity="medium" />

			<motion.div
				className="w-full max-w-lg bg-[#141414] backdrop-blur-md p-8 rounded-3xl shadow-lg  relative z-10"
				{...motionVariants.fadeInUp(0.2)}
			>
				<h1
					className={`${typography.hero} text-transparent bg-clip-text text-center mb-6`}
					style={{ backgroundImage: gradients.goldText }}
				>
					Welcome Back
				</h1>

				<form onSubmit={handleSubmit} className="flex flex-col space-y-5">
					<div>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-3 rounded-xl bg-[#151515] text-white border border-[#E4B441]/40 focus:outline-none focus:border-[#E4B441]"
						/>
						{validationErrors.email && (
							<p className="text-red-400 text-sm mt-1">
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
							onChange={handleChange}
							className="w-full p-3 rounded-xl bg-[#151515] text-white border border-[#E4B441]/40 focus:outline-none focus:border-[#E4B441]"
						/>
						{validationErrors.password && (
							<p className="text-red-400 text-sm mt-1">
								{validationErrors.password}
							</p>
						)}
					</div>

					<div className="flex justify-end">
						<a href="#" className="text-[#E4B441] text-sm hover:underline">
							Forgot password?
						</a>
					</div>

					<Button
						type="submit"
						variant="solid"
						className="w-full"
						disabled={loading || !isFormValid}
					>
						{loading ? "Logging in..." : "Login"}
					</Button>
				</form>

				{/* API error message */}
				{errorMessage && (
					<p className="text-red-400 text-center mt-4 text-sm">
						{errorMessage}
					</p>
				)}
			</motion.div>
			<div className="w-full max-w-md  mb-4">
				<Lottie animationData={animationData} loop autoplay />
			</div>
		</div>
	);
}
