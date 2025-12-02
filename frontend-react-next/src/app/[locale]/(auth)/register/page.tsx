"use client";

import { useState } from "react";
import {
	registerSchema,
	type RegisterInput,
} from "../../../../../lib/validation/registerSchema";

import Lottie from "lottie-react";

import animationData from "../../../../../assets/lotties/teeth.json";

import PendingPage from "./pending";

export default function RegisterPage() {
	const [form, setForm] = useState<RegisterInput>({
		fullName: "",
		email: "",
		password: "",
		phoneNumber: "",
		clinicName: "",
		clinicAddress: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [submitting, setSubmitting] = useState(false);
	const [generalError, setGeneralError] = useState<string | null>(null);
	const [submitted, setSubmitted] = useState(false);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name as keyof RegisterInput]: value }));
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setGeneralError(null);
		setErrors({});

		const parsed = registerSchema.safeParse(form);
		if (!parsed.success) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of parsed.error.issues) {
				const key = issue.path.join(".") || "form";
				if (!fieldErrors[key]) fieldErrors[key] = issue.message;
			}
			setErrors(fieldErrors);
			return;
		}

		setSubmitting(true);
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(parsed.data),
				}
			);

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				const message =
					typeof data?.error === "string" ? data.error : "Registration failed";
				setGeneralError(message);
				setForm((p) => ({ ...p, password: "" }));
				setSubmitting(false);
				return;
			}
			// Show the Pending component inside the same page
			setSubmitted(true);
			setSubmitting(false);
			// success → redirect to pending page
			//router.push("/auth/pending");
		} catch {
			setGeneralError("Network error. Please try again.");
			setSubmitting(false);
		}
	}
	if (submitted) {
		return <PendingPage />;
	}
	return (
		<main className=" flex items-center justify-center p-4 sm:p-6 bg-gray-50/50 overflow-hidden">
			<div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/50 -z-10"></div>

			<div className="w-full max-w-5xl h-[90%] grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
				<div className="p-4 sm:p-6 space-y-3 overflow-hidden flex flex-col justify-between">
					<div className="shrink-0 space-y-2">
						<h1 className="text-3xl font-extrabold text-gray-900">
							Create Your <span className="text-[#d8a832]">Account</span>
						</h1>
						<p className="text-sm text-gray-600">
							Start your journey with us. Fill in the details to get started.
						</p>

						{generalError && (
							<div
								className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg"
								role="alert"
							>
								<p className="text-xs font-medium">{generalError}</p>
							</div>
						)}
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-2 grow overflow-y-auto pr-2"
						noValidate
					>
						<div className="space-y-1">
							<label
								htmlFor="fullName"
								className="block text-xs font-medium text-gray-700"
							>
								Full name <span className="text-red-500">*</span>
							</label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								autoComplete="name"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.fullName}
								onChange={handleChange}
								disabled={submitting}
								required
							/>
							{errors.fullName && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.fullName}
								</p>
							)}
						</div>

						<div className="space-y-1">
							<label
								htmlFor="email"
								className="block text-xs font-medium text-gray-700"
							>
								Email <span className="text-red-500">*</span>
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.email}
								onChange={handleChange}
								disabled={submitting}
								required
							/>
							{errors.email && (
								<p className="text-[10px] text-red-600 mt-1">{errors.email}</p>
							)}
						</div>

						<div className="space-y-1">
							<label
								htmlFor="password"
								className="block text-xs font-medium text-gray-700"
							>
								Password <span className="text-red-500">*</span>
							</label>
							<input
								id="password"
								name="password"
								type="password"
								autoComplete="new-password"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.password}
								onChange={handleChange}
								disabled={submitting}
								required
							/>
							{errors.password && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.password}
								</p>
							)}
						</div>

						<div className="space-y-1">
							<label
								htmlFor="phoneNumber"
								className="block text-xs font-medium text-gray-700"
							>
								Phone number
							</label>
							<input
								id="phoneNumber"
								name="phoneNumber"
								type="tel"
								autoComplete="tel"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.phoneNumber ?? ""}
								onChange={handleChange}
								disabled={submitting}
							/>
							{errors.phoneNumber && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.phoneNumber}
								</p>
							)}
						</div>

						<div className="space-y-1">
							<label
								htmlFor="clinicName"
								className="block text-xs font-medium text-gray-700"
							>
								Clinic/Lab name
							</label>
							<input
								id="clinicName"
								name="clinicName"
								type="text"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.clinicName ?? ""}
								onChange={handleChange}
								disabled={submitting}
							/>
							{errors.clinicName && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.clinicName}
								</p>
							)}
						</div>

						<div className="space-y-1">
							<label
								htmlFor="clinicAddress"
								className="block text-xs font-medium text-gray-700"
							>
								Clinic/Lab address
							</label>
							<input
								id="clinicAddress"
								name="clinicAddress"
								type="text"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-[#d8a832] focus:border-[#d8a832] disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-900"
								value={form.clinicAddress ?? ""}
								onChange={handleChange}
								disabled={submitting}
							/>
							{errors.clinicAddress && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.clinicAddress}
								</p>
							)}
						</div>
						<div className="shrink-0 pt-4">
							<button
								type="submit"
								className="w-full flex justify-center items-center rounded-lg px-4 py-3 border border-transparent text-lg font-semibold bg-[#d8a832] text-white shadow-md hover:bg-yellow-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={submitting}
							>
								{submitting ? (
									<>
										<svg
											className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
										>
											<circle
												className="opacity-25"
												cx="12"
												cy="12"
												r="10"
												stroke="currentColor"
												strokeWidth="4"
											></circle>
											<path
												className="opacity-75"
												fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
											></path>
										</svg>
										Creating account...
									</>
								) : (
									"Create account"
								)}
							</button>
						</div>
					</form>

					{/* Submit button fixed at the bottom */}
				</div>

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
						By creating an account, you acknowledge that **manual approval is
						required** for security and compliance purposes. We will notify you
						once your account is activated.
					</p>

					<div className="mt-4 text-xs text-center text-[#d8a832]">
						Need help? Contact support.
					</div>
				</div>
			</div>
		</main>
	);
}
