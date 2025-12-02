"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import HeroHeading from "@/app/[locale]/design-system/components/HeroHeading";

export default function CasesPage() {
	return (
		<>
			<div className="absolute inset-0 -z-10 bg-white"></div>
			<section className="relative w-full pt-4 pb-2 md:pt-6 md:pb-3 text-center">
				<div className="max-w-4xl mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
					>
						<HeroHeading
							primaryText="Dental Cases"
							gradientText=" Collection"
							variant="black"
							className="!mb-1 drop-shadow-lg"
						/>
					</motion.div>
				</div>
			</section>

			<section className="relative w-full py-4 md:py-6">
				<div className="max-w-7xl mx-auto px-6 grid gap-8 items-start md:grid-cols-2">
					{/* Left Side - Content Blocks */}
					<motion.div
						className="space-y-6"
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.3 }}
					>
						{/* Info Blocks */}
						<div className="space-y-5">
							{/* Block 1 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.5 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									Restorative Dentistry Cases
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>Cavity Restoration:</strong> Treating cavities using
										dental fillings, crowns, or inlays.
									</li>
									<li>
										<strong>Endodontic Treatment:</strong> Root canals where
										students practice removing infected tissue and sealing it.
									</li>
									<li>
										<strong>Composite Bonding:</strong> Repairing chipped or
										cracked teeth with tooth-colored resins.
									</li>
								</ul>
							</motion.div>

							{/* Block 2 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.7 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									Orthodontic Cases
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>Braces and Aligners:</strong> Designing braces or
										aligners to correct misalignment issues.
									</li>
									<li>
										<strong>Retention Plans:</strong> Creating retainers for
										maintaining teeth alignment after braces.
									</li>
								</ul>
							</motion.div>

							{/* Block 3 */}
							<motion.div
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: 0.9 }}
							>
								<h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 tracking-tight">
									Periodontics Cases
								</h3>
								<ul className="space-y-2 text-base md:text-lg text-gray-700 leading-relaxed font-light">
									<li>
										<strong>Gum Disease Treatment:</strong> Scaling and root
										planning procedures to treat gum disease.
									</li>
									<li>
										<strong>Soft Tissue Grafting:</strong> Reconstructing gums
										to treat gum recession.
									</li>
								</ul>
							</motion.div>
						</div>
					</motion.div>

					{/* Right Side - Image */}
					<motion.div
						initial={{ opacity: 0, x: 60 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="flex justify-center md:justify-end order-first md:order-none"
					>
						<div className="relative">
							<Image
								src="/caseback.jpg"
								alt="Dental Cases"
								width={550}
								height={450}
								className="relative rounded-2xl shadow-2xl ring-1 ring-white/50"
								priority
								unoptimized={true}
							/>
						</div>
					</motion.div>
				</div>
			</section>
		</>
	);
}
