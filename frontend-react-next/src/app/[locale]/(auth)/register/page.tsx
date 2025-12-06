"use client";

import { useState } from "react";
import {
	registerSchema,
	type RegisterInput,
} from "../../../../../lib/validation/registerSchema";
import Link from "next/link";

import Lottie from "lottie-react";
import animationData from "../../../../../assets/lotties/Dentistٌُ RES.json";
import PendingPage from "./pending";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

export default function RegisterPage() {
	const t = useTranslations();
	const [form, setForm] = useState<RegisterInput>({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		clinicName: "",
		clinicAddress: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

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
		const { confirmPassword, ...payload } = parsed.data;

		setSubmitting(true);
		try {
			const res = await fetch(`/api/auth/register`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				const message =
					typeof data?.error === "string"
						? data.error
						: t("registrationFailed");
				setGeneralError(message);
				setForm((p) => ({ ...p, password: "", confirmPassword: "" }));
				setSubmitting(false);
				return;
			}

			setSubmitted(true);
			setSubmitting(false);
		} catch {
			setGeneralError(t("networkError"));
			setSubmitting(false);
		}
	}

	if (submitted) return <PendingPage />;

	return (
		<main className="flex items-center justify-center p-4 sm:p-6 bg-[#FDFBF7] overflow-hidden">
			<div className="absolute inset-0 bg-linear-to-br from-indigo-50/50 via-white to-blue-50/50 -z-10" />

			<div className="w-full max-w-5xl h-[90%] grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden bg-white/95 backdrop-blur-sm">
				<div className="p-4 sm:p-6 space-y-3 overflow-hidden flex flex-col justify-between">
					<div className="shrink-0 space-y-2">
						<h1 className="text-3xl font-extrabold text-gray-900">
							{t("createYourAccount").split(" ").slice(0, -1).join(" ")}{" "}
							<span className="text-[#d8a832]">
								{t("createYourAccount").split(" ").pop()}
							</span>
						</h1>

						{generalError && (
							<div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg">
								<p className="text-xs font-medium">{generalError}</p>
							</div>
						)}
					</div>

					<form
						onSubmit={handleSubmit}
						className="space-y-2 grow overflow-y-auto pr-2"
						noValidate
					>
						{/* Full Name */}
						<div className="space-y-1">
							<label
								htmlFor="fullName"
								className="block text-xs font-medium text-gray-700"
							>
								{t("fullName")} <span className="text-red-500">*</span>
							</label>
							<input
								id="fullName"
								name="fullName"
								type="text"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d8a832]"
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

						{/* Email */}
						<div className="space-y-1">
							<label
								htmlFor="email"
								className="block text-xs font-medium text-gray-700"
							>
								{t("email")} <span className="text-red-500">*</span>
							</label>
							<input
								id="email"
								name="email"
								type="email"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d8a832]"
								value={form.email}
								onChange={handleChange}
								disabled={submitting}
								required
							/>
							{errors.email && (
								<p className="text-[10px] text-red-600 mt-1">{errors.email}</p>
							)}
						</div>

						{/* Password */}
						<div className="space-y-1 relative">
							<label
								htmlFor="password"
								className="block text-xs font-medium text-gray-700"
							>
								{t("password")} <span className="text-red-500">*</span>
							</label>

							<input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d8a832]"
								value={form.password}
								onChange={handleChange}
								disabled={submitting}
								required
							/>

							<button
								type="button"
								className="absolute right-3 top-[30px] text-gray-600"
								onClick={() => setShowPassword((prev) => !prev)}
								tabIndex={-1}
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>

							{errors.password && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.password}
								</p>
							)}
						</div>

						{/* Confirm Password */}
						<div className="space-y-1 relative">
							<label
								htmlFor="confirmPassword"
								className="block text-xs font-medium text-gray-700"
							>
								{t("confirmPassword")} <span className="text-red-500">*</span>
							</label>

							<input
								id="confirmPassword"
								name="confirmPassword"
								type={showConfirm ? "text" : "password"}
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d8a832]"
								value={form.confirmPassword}
								onChange={handleChange}
								disabled={submitting}
								required
							/>

							<button
								type="button"
								className="absolute right-3 top-[30px] text-gray-600"
								onClick={() => setShowConfirm((prev) => !prev)}
								tabIndex={-1}
							>
								{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>

							{errors.confirmPassword && (
								<p className="text-[10px] text-red-600 mt-1">
									{errors.confirmPassword}
								</p>
							)}
						</div>

						{/* Phone */}
						<div className="space-y-1">
							<label
								htmlFor="phoneNumber"
								className="block text-xs font-medium text-gray-700"
							>
								{t("phoneNumber")}
							</label>
							<input
								id="phoneNumber"
								name="phoneNumber"
								type="tel"
								className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#d8a832]"
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

						{/* Clinic Name */}
						<div className="space-y-1">
							<label
								htmlFor="clinicName"
								className="block text-xs font-medium text-gray-700"
							>
								{t("clinicLabName")}
							</label>
							<input
								id="clinicName"
								name="clinicName"
								type="text"
								className="w-full border border-gray-300 rounded-lg px-3 py-2"
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

						{/* Clinic Address */}
						<div className="space-y-1">
							<label
								htmlFor="clinicAddress"
								className="block text-xs font-medium text-gray-700"
							>
								{t("clinicLabAddress")}
							</label>
							<input
								id="clinicAddress"
								name="clinicAddress"
								type="text"
								className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
								className="w-full flex justify-center items-center rounded-lg px-4 py-3 text-lg font-semibold bg-[#d8a832] text-white hover:bg-yellow-700 transition duration-300 disabled:opacity-50"
								disabled={submitting}
							>
								{submitting ? t("creatingAccount") : t("createAccount")}
							</button>
							<div className="text-center mt-4 text-sm text-gray-600">
								{t("alreadyHaveAccount")} <Link href="/login" className="text-[#d8a832] font-semibold hover:underline">{t("login")}</Link>
							</div>
						</div>
					</form>
				</div>

<div className="hidden md:flex flex-col justify-center items-center p-8 bg-[#d8a832]/10 border-l-2 border-[#d8a832]/30">
  <div className="w-full max-w-md mb-6 p-4 bg-white/80 rounded-3xl shadow-xl">
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className="w-full h-[400px]"
    />
  </div>

  <div className="text-center mt-4">
    <p className="text-sm font-medium text-gray-700 max-w-xs">
      {t("registerNowText")}
    </p>
  </div>
</div>

			</div>
		</main>
	);
}
