export default function PendingPage() {
	return (
		<main className="min-h-screen flex items-center justify-center p-6">
			<div className="w-full max-w-md border rounded-xl p-6 space-y-4">
				<h1 className="text-2xl font-semibold">Registration submitted</h1>
				<p className="text-gray-700">
					Your account is pending approval. You will notified once it is
					approved.
				</p>
			</div>
		</main>
	);
}
