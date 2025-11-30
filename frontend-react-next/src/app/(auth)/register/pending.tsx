"use client";
import { Clock, CheckCircle } from "lucide-react";

export default function PendingPage() {
	return (
		<main className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
			<div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-8 text-center transition-all duration-300 transform hover:shadow-2xl">
				<div className="flex justify-center">
					<Clock className="w-16 h-16 text-yellow-500 animate-pulse" />
				</div>

				<h1 className="text-3xl font-extrabold text-gray-900">
					Registration Under Review
				</h1>

				<p className="text-lg text-gray-600 leading-relaxed">
					Thank you for registering! Your account submission is **currently
					pending approval** by our team.
				</p>

				<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg text-left">
					<div className="flex items-start">
						<div className="shrink-0">
							<CheckCircle className="h-5 w-5 text-yellow-400 mt-1" />
						</div>
						<div className="ml-3">
							<h3 className="text-md font-semibold text-yellow-800">
								What Happens Next?
							</h3>
							<p className="mt-1 text-sm text-yellow-700">
								We are reviewing your details and aim to complete the process
								within **1-2 business days**. You will receive an **email
								notification** at your registered address once your account is
								active.
							</p>
						</div>
					</div>
				</div>

				<div className="pt-4 border-t border-gray-100">
					<p className="text-sm text-gray-500">
						Need help? Visit our{" "}
						<a
							href="/support"
							className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
						>
							support center
						</a>{" "}
						or check your email spam folder.
					</p>
				</div>
			</div>
		</main>
	);
}
