"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
	registerSchema,
	type RegisterInput,
} from "@/lib/validation/registerSchema";

export default function RegisterPage() {
	const router = useRouter();
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

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
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
			const res = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(parsed.data),
			});

			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				const message =
					typeof data?.error === "string" ? data.error : "Registration failed";
				setGeneralError(message);
				setSubmitting(false);
				return;
			}
			// success → redirect to pending page
			router.push("/auth/pending");
		} catch {
			setGeneralError("Network error. Please try again.");
			setSubmitting(false);
		}
	}

	return (
		<main className="min-h-screen flex items-center justify-center p-6">
			<div className="w-full max-w-md border rounded-xl p-6 space-y-4">
				<h1 className="text-2xl font-semibold">Create your account</h1>

				{generalError && <p className="text-sm text-red-600">{generalError}</p>}

				<form onSubmit={handleSubmit} className="space-y-4" noValidate>
					<div className="space-y-1">
						<label htmlFor="fullName" className="block text-sm">
							Full name
						</label>
						<input
							id="fullName"
							name="fullName"
							type="text"
							autoComplete="name"
							className="w-full border rounded-md px-3 py-2"
							value={form.fullName}
							onChange={handleChange}
							disabled={submitting}
							required
						/>
						{errors.fullName && (
							<p className="text-xs text-red-600">{errors.fullName}</p>
						)}
					</div>
					{/* ---------------------------------- */}
					<div className="space-y-1">
						<label htmlFor="email" className="block text-sm">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							className="w-full border rounded-md px-3 py-2"
							value={form.email}
							onChange={handleChange}
							disabled={submitting}
							required
						/>
						{errors.email && (
							<p className="text-xs text-red-600">{errors.email}</p>
						)}
					</div>
					{/* ---------------------------------- */}

					<div className="space-y-1">
						<label htmlFor="password" className="block text-sm">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="new-password"
							className="w-full border rounded-md px-3 py-2"
							value={form.password}
							onChange={handleChange}
							disabled={submitting}
							required
						/>
						{errors.password && (
							<p className="text-xs text-red-600">{errors.password}</p>
						)}
					</div>
					{/* ---------------------------------- */}

					{/* ---------------------------------- */}
					<div className="space-y-1">
						<label htmlFor="phoneNumber" className="block text-sm">
							phone number
						</label>
						<input
							id="phoneNumber"
							name="phoneNumber"
							type="tel"
							autoComplete="tel"
							className="w-full border rounded-md px-3 py-2"
							value={form.phoneNumber ?? ""}
							onChange={handleChange}
							disabled={submitting}
						/>
						{errors.phoneNumber && (
							<p className="text-xs text-red-600">{errors.phoneNumber}</p>
						)}
					</div>
					{/* ---------------------------------- */}

					<div className="space-y-1">
						<label htmlFor="clinicName" className="block text-sm">
							Clinic/Lab name
						</label>
						<input
							id="clinicName"
							name="clinicName"
							type="text"
							className="w-full border rounded-md px-3 py-2"
							value={form.clinicName ?? ""}
							onChange={handleChange}
							disabled={submitting}
						/>
						{errors.clinicName && (
							<p className="text-xs text-red-600">{errors.clinicName}</p>
						)}
					</div>
					{/* ---------------------------------- */}

					<div className="space-y-1">
						<label htmlFor="clinicAddress" className="block text-sm">
							Clinic/Lab address
						</label>
						<input
							id="clinicAddress"
							name="clinicAddress"
							type="text"
							className="w-full border rounded-md px-3 py-2"
							value={form.clinicAddress ?? ""}
							onChange={handleChange}
							disabled={submitting}
						/>
						{errors.clinicAddress && (
							<p className="text-xs text-red-600">{errors.clinicAddress}</p>
						)}
					</div>
					{/* ---------------------------------- */}

					<motion.button
						type="submit"
						className="w-full rounded-md px-3 py-2 border bg-black text-white disabled:opacity-60"
						disabled={submitting}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						transition={{ type: "spring", stiffness: 400, damping: 17 }}
					>
						{submitting ? "Creating account..." : "Create account"}
					</motion.button>
				</form>

				<p className="text-sm text-gray-600">
					By creating an account, you acknowledge manual approval is required.
				</p>
			</div>
		</main>
	);
}
